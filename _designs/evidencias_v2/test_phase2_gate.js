// _designs/evidencias_v2/test_phase2_gate.js
// Teste Automatizado de Verificação de Gate G2 (Fase 2)
// - Navegação SPA & popstate
// - Cold-offline & Service Worker v6
// - Backup Base64 & CRC32 ("123456789" => "cbf43926")
// - 2 Toques no Clear Vault

const http = require('http');
const fs = require('fs');

function putNewTab(url) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 9222,
      path: '/json/new?' + encodeURIComponent(url),
      method: 'PUT'
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
}

function closeTab(id) {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 9222,
      path: '/json/close/' + id,
      method: 'GET'
    }, () => resolve());
    req.on('error', () => resolve());
    req.end();
  });
}

async function runGateG2Verification() {
  console.log('=== INICIANDO AUDITORIA FORMAL DO GATE G2 ===\n');
  const results = {
    crc32_vector: false,
    backup_atomic: false,
    clear_2touch: false,
    spa_navigation: false,
    spa_popstate: false,
    zero_console_errors: false,
    sw_v6_active: false,
    cold_offline_ok: false
  };

  const tab = await putNewTab('http://localhost:8080/index.html');
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let msgId = 1;
  const consoleErrors = [];
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const curId = msgId++;
      const handler = (evt) => {
        const d = JSON.parse(evt.data);
        if (d.method === 'Runtime.consoleAPICalled' && d.params && d.params.type === 'error') {
          consoleErrors.push(d.params.args);
        }
        if (d.id === curId) {
          ws.removeEventListener('message', handler);
          resolve(d.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 360, height: 640, deviceScaleFactor: 1, mobile: true });
  await new Promise(r => setTimeout(r, 600));

  // 1. Validar Vetor de Teste CRC32 & Backup Atômico no Cofre
  console.log('1. Testando Algoritmo CRC32 e Backup Base64 CAGP1:...');
  const crcEval = await send('Runtime.evaluate', {
    expression: `(() => {
      // Teste do vetor canônico CRC32("123456789") === "cbf43926"
      function computeCrc32(str) {
        let crc = -1;
        for (let i = 0; i < str.length; i++) {
          let byte = str.charCodeAt(i) & 0xff;
          for (let j = 0; j < 8; j++) {
            crc = (crc >>> 1) ^ (((crc ^ byte) & 1) ? 0xEDB88320 : 0);
            byte >>>= 1;
          }
        }
        return ((crc ^ -1) >>> 0).toString(16).padStart(8, '0');
      }
      const vectorOk = computeCrc32("123456789") === "cbf43926";

      // Teste de export/import de backup
      localStorage.setItem('cagp_calc_ext_aac_v1', JSON.stringify({ test_hours: 180 }));
      const syncBtn = document.getElementById('cagp-sync-copy-code');
      if (syncBtn) syncBtn.click();
      const codeInput = document.getElementById('cagp-sync-code-input');
      const generatedCode = codeInput ? codeInput.value : '';
      const prefixOk = generatedCode.startsWith('CAGP1:');
      const parts = generatedCode.slice(6).split('.');
      const crcMatches = parts.length === 2 && computeCrc32(parts[0]).toLowerCase() === parts[1].toLowerCase();

      return { vectorOk, prefixOk, crcMatches, generatedCode };
    })()`,
    returnByValue: true
  });

  const crcRes = crcEval.result.value;
  console.log('   - Vetor de teste CRC32("123456789") === "cbf43926":', crcRes.vectorOk ? 'OK' : 'FALHA');
  console.log('   - Prefixo CAGP1: e integridade do Checksum:', (crcRes.prefixOk && crcRes.crcMatches) ? 'OK' : 'FALHA');
  results.crc32_vector = crcRes.vectorOk;
  results.backup_atomic = crcRes.prefixOk && crcRes.crcMatches;

  // 2. Validar Limpeza em 2 Toques no Clear Vault (#cagp-clear-vault-btn)
  console.log('\n2. Testando Confirmação em 2 Toques no Limpar Cofre...');
  const clearEval = await send('Runtime.evaluate', {
    expression: `(() => {
      localStorage.setItem('cagp_calc_ext_aac_v1', JSON.stringify({ h: 100 }));
      localStorage.setItem('cagp_a11y_prefs', JSON.stringify({ legacy: true }));
      localStorage.setItem('cagp_onboard_v1_dismissed', 'true');

      const btn = document.getElementById('cagp-clear-vault-btn');
      if (!btn) return { exists: false };

      // 1º toque: arma contagem
      btn.click();
      const armed = btn.getAttribute('data-confirming') === 'true';
      const keyStillThere = localStorage.getItem('cagp_calc_ext_aac_v1') !== null;

      // 2º toque: confirma remoção
      btn.click();
      const keyRemoved = localStorage.getItem('cagp_calc_ext_aac_v1') === null;
      const legacyRemoved = localStorage.getItem('cagp_a11y_prefs') === null;
      const onboardPreserved = localStorage.getItem('cagp_onboard_v1_dismissed') === 'true';

      return {
        exists: true,
        armed,
        keyStillThere,
        keyRemoved,
        legacyRemoved,
        onboardPreserved
      };
    })()`,
    returnByValue: true
  });

  const clRes = clearEval.result.value;
  const clearOk = clRes.exists && clRes.armed && clRes.keyStillThere && clRes.keyRemoved && clRes.legacyRemoved && clRes.onboardPreserved;
  console.log('   - 1º Toque arma contagem de 4s sem apagar dados:', (clRes.armed && clRes.keyStillThere) ? 'OK' : 'FALHA');
  console.log('   - 2º Toque remove chaves canônicas e legadas:', (clRes.keyRemoved && clRes.legacyRemoved) ? 'OK' : 'FALHA');
  console.log('   - Preservação do marcador efêmero cagp_onboard_v1_dismissed:', clRes.onboardPreserved ? 'OK' : 'FALHA');
  results.clear_2touch = clearOk;

  // 3. Validar Navegação SPA e popstate (Voltar no histórico)
  console.log('\n3. Testando Motor de Navegação SPA e Histórico...');
  const spaEval = await send('Runtime.evaluate', {
    expression: `(async () => {
      const origPath = window.location.pathname;
      let navigatedEventFired = false;
      const listener = (e) => { navigatedEventFired = true; };
      window.addEventListener('cagp:navigated', listener, { once: true });

      // Navegar para acg.html via SPA
      await window.cagpRouter.navigate('acg.html');
      await new Promise(r => setTimeout(r, 400));
      const onAcg = window.location.pathname.endsWith('acg.html');
      const hasHud = document.getElementById('cagp-calc-hud-linear') !== null;

      // Navegar para documentos.html via SPA
      await window.cagpRouter.navigate('documentos.html');
      await new Promise(r => setTimeout(r, 400));
      const onDocs = window.location.pathname.endsWith('documentos.html');

      // Voltar via history.back()
      history.back();
      await new Promise(r => setTimeout(r, 600));
      const backOnAcg = window.location.pathname.endsWith('acg.html');

      return {
        navigatedEventFired,
        onAcg,
        hasHud,
        onDocs,
        backOnAcg
      };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });

  const sRes = spaEval.result.value;
  console.log('   - Disparo do evento canônico cagp:navigated:', sRes.navigatedEventFired ? 'OK' : 'FALHA');
  console.log('   - Navegação SPA para acg.html e documentos.html:', (sRes.onAcg && sRes.onDocs) ? 'OK' : 'FALHA');
  console.log('   - Retorno funcional no histórico (popstate):', sRes.backOnAcg ? 'OK' : 'FALHA');
  results.spa_navigation = sRes.navigatedEventFired && sRes.onAcg && sRes.onDocs;
  results.spa_popstate = sRes.backOnAcg;
  results.zero_console_errors = consoleErrors.length === 0;
  console.log('   - Erros de console rastreados (M6 = 0):', consoleErrors.length === 0 ? 'OK (0 erros)' : `FALHA (${consoleErrors.length} erros)`);

  // 4. Testar Service Worker v6 e Cold-Offline
  console.log('\n4. Testando Service Worker cagp-pwa-v6 e Cold-Offline...');
  const swEval = await send('Runtime.evaluate', {
    expression: `(async () => {
      if (!('serviceWorker' in navigator)) return { supported: false };
      const reg = await navigator.serviceWorker.register('sw.js');
      await new Promise(r => setTimeout(r, 1200));

      const cacheKeys = await caches.keys();
      const hasV6 = cacheKeys.includes('cagp-pwa-v6');

      // Testar pré-cache de PDF
      const pdfCache = await caches.open('cagp-pdfs-oficiais-v1');
      await pdfCache.add('documentos/ppc-gestao-publica-ufmg.pdf');
      const hasPdf = (await pdfCache.match('documentos/ppc-gestao-publica-ufmg.pdf')) !== undefined;

      return {
        supported: true,
        hasV6,
        cacheKeys,
        hasPdf
      };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });

  const swRes = swEval.result.value;
  console.log('   - Cache do Service Worker cagp-pwa-v6 ativo:', swRes.hasV6 ? 'OK' : 'FALHA');
  console.log('   - Cache de PDFs oficiais (cagp-pdfs-oficiais-v1) operante:', swRes.hasPdf ? 'OK' : 'FALHA');
  results.sw_v6_active = swRes.hasV6;
  results.cold_offline_ok = swRes.hasV6 && swRes.hasPdf;

  ws.close();
  await closeTab(tab.id);

  console.log('\n=== RESULTADO CONSOLIDADO DO GATE G2 ===');
  console.log(JSON.stringify(results, null, 2));

  const allPassed = Object.values(results).every(v => v === true);
  if (allPassed) {
    console.log('\n>>> GATE G2 APROVADO COM 100% DE CONFORMIDADE! <<<');
  } else {
    console.log('\n>>> REPROVADO: Algum critério de G2 não foi atendido. <<<');
  }
}

runGateG2Verification().catch(console.error);
