// _designs/evidencias_v2/audit_onda3a.js
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

function loadCamadaCCells() {
  const lines = fs.readFileSync('_designs/evidencias_v2/matriz_celulas.csv', 'utf-8').split('\n');
  const cells = [];
  for (const line of lines) {
    const parts = line.trim().split(',');
    if (parts.length >= 7 && parts[1] === 'C') {
      cells.push({
        id: parts[0],
        camada: parts[1],
        rota: parts[2],
        w: parseInt(parts[3], 10),
        h: parseInt(parts[4], 10),
        modo: parts[5],
        prefs: parts[6]
      });
    }
  }
  return cells;
}

async function run() {
  fs.mkdirSync('_designs/evidencias_v2/fase3', { recursive: true });
  const auditJs = fs.readFileSync('_designs/evidencias_v2/audit.js', 'utf-8');
  const findingsStream = fs.createWriteStream('_designs/evidencias_v2/fase3/findings_3a.jsonl');
  const cells = loadCamadaCCells();

  console.log(`Iniciando auditoria da Onda 3a: ${cells.length} células da Camada C`);

  let passed = 0;
  let failed = 0;

  for (const c of cells) {
    const tab = await putNewTab('http://localhost:8080/' + c.rota + '.html');
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = msgId++;
        const handler = (evt) => {
          const d = JSON.parse(evt.data);
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

    const scale = c.prefs === 'zoom200' ? 2 : 1;
    await send('Emulation.setDeviceMetricsOverride', {
      width: c.w,
      height: c.h,
      deviceScaleFactor: scale,
      mobile: c.w < 768
    });

    if (c.modo === 'standalone') {
      await send('Runtime.evaluate', {
        expression: `sessionStorage.setItem("cagp_force_app_mode", "true"); cagpSyncViewportMeta(true);`
      });
    } else if (c.modo === 'offline') {
      await send('Network.enable');
      await send('Network.emulateNetworkConditions', {
        offline: true,
        latency: 0,
        downloadThroughput: 0,
        uploadThroughput: 0
      });
    }

    if (c.prefs === 'contrast') {
      await send('Runtime.evaluate', {
        expression: `document.documentElement.setAttribute('data-a11y-contrast', 'high'); document.documentElement.classList.add('cagp-high-contrast');`
      });
    } else if (c.prefs === 'dyslexia') {
      await send('Runtime.evaluate', {
        expression: `document.documentElement.setAttribute('data-a11y-dyslexia', 'true');`
      });
    } else if (c.prefs === 'font-xl') {
      await send('Runtime.evaluate', {
        expression: `document.documentElement.setAttribute('data-a11y-font', 'xl');`
      });
    } else if (c.prefs === 'reduced-motion') {
      await send('Emulation.setEmulatedMedia', {
        media: 'screen',
        features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
      });
    } else if (c.prefs === 'dark') {
      await send('Emulation.setEmulatedMedia', {
        media: 'screen',
        features: [{ name: 'prefers-color-scheme', value: 'dark' }]
      });
    } else if (c.prefs === 'print') {
      await send('Emulation.setEmulatedMedia', { media: 'print' });
    }

    await new Promise(r => setTimeout(r, 400));

    const res = await send('Runtime.evaluate', { expression: auditJs, returnByValue: true });
    let val = {};
    try {
      val = typeof res.result.value === 'string' ? JSON.parse(res.result.value) : (res.result.value || {});
    } catch (e) {
      val = res.result.value || {};
    }

    // Critérios de conformidade
    const m1Pass = val.M1 === true;
    const m2Pass = val.M2 === true;
    const m5Pass = val.M5 === 1;
    const m6Pass = val.M6 === 0;
    const isApproved = m1Pass && m2Pass && m5Pass && m6Pass;

    if (isApproved) {
      passed++;
    } else {
      failed++;
    }

    const record = {
      fase: 'fase3_onda3a',
      camada: c.camada,
      id: c.id,
      rota: c.rota,
      largura: c.w,
      altura: c.h,
      modo: c.modo,
      prefs: c.prefs,
      M1: val.M1,
      M2: val.M2,
      M3: val.M3,
      M4: val.M4,
      M5: val.M5,
      M6: val.M6,
      M7: val.M7,
      M8: val.M8,
      resultado: isApproved ? 'APROVADO' : 'PENDENTE'
    };

    findingsStream.write(JSON.stringify(record) + '\n');
    console.log(`[${c.id}] ${c.rota} (${c.w}x${c.h} ${c.modo} ${c.prefs}): M1=${val.M1} M2=${val.M2} M3=${JSON.stringify(val.M3)} M5=${val.M5} M6=${val.M6} => ${record.resultado}`);

    ws.close();
    await closeTab(tab.id);
  }

  findingsStream.end();
  console.log(`\n========================================`);
  console.log(`RESUMO ONDA 3a: ${passed} APROVADAS / ${failed} PENDENTES de ${cells.length} células`);
  console.log(`Evidências salvas em _designs/evidencias_v2/fase3/findings_3a.jsonl`);
}

run().catch(console.error);
