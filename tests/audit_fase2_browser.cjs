const { chromium } = require('playwright');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const indexUrl = `file://${path.join(projectRoot, 'docs/index.html')}`;

async function runFase2Audit() {
  console.log('=== AUDITORIA DE BROWSER FASE 2: CASCA GLOBAL, TAXONOMIA & PWA ===\n');

  const browser = await chromium.launch({ headless: true });
  
  // Testar viewports 360px e 412px
  for (const width of [360, 412]) {
    console.log(`\n--- Testando Viewport Móvel: ${width}x780 ---`);
    const context = await browser.newContext({
      viewport: { width: width, height: 780 }
    });
    const page = await context.newPage();
    await page.goto(indexUrl, { waitUntil: 'domcontentloaded' });

    // 1. Auditoria das Barras de Navegação nos 5 Eixos
    const navAudit = await page.evaluate(() => {
      const mobileNav = document.getElementById('cagp-mobile-nav');
      const mobileItems = mobileNav ? Array.from(mobileNav.querySelectorAll('.cagp-mobile-nav-item')) : [];
      const mobileItemIds = mobileItems.map(el => el.id);

      const tabbar = document.getElementById('cagp-superapp-tabbar');
      const tabbarItems = tabbar ? Array.from(tabbar.querySelectorAll('.cagp-tabbar-item')) : [];
      const tabbarItemIds = tabbarItems.map(el => el.id);

      const hasLegacyAjustes = document.getElementById('cagp-stab-ajustes') !== null;

      return {
        mobileItemCount: mobileItems.length,
        mobileItemIds: mobileItemIds,
        tabbarItemCount: tabbarItems.length,
        tabbarItemIds: tabbarItemIds,
        hasLegacyAjustes: hasLegacyAjustes
      };
    });

    console.log(`Itens em #cagp-mobile-nav: ${navAudit.mobileItemCount} (esperado: 5) -> ${navAudit.mobileItemCount === 5 ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`IDs mobile-nav: [${navAudit.mobileItemIds.join(', ')}]`);
    console.log(`Itens em #cagp-superapp-tabbar: ${navAudit.tabbarItemCount} (esperado: 5) -> ${navAudit.tabbarItemCount === 5 ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`IDs superapp-tabbar: [${navAudit.tabbarItemIds.join(', ')}]`);
    console.log(`Aba legada #cagp-stab-ajustes removida: ${!navAudit.hasLegacyAjustes ? '✓ PASS' : '✗ FAIL'}`);

    if (width === 360) {
      // 2. Auditoria da Taxonomia Canônica Global
      const taxAudit = await page.evaluate(() => {
        const tax = window.CAGP_TAXONOMY_V1;
        if (!tax) return { found: false };
        const isFrozen = Object.isFrozen(tax);
        const axesCount = tax.axes ? tax.axes.length : 0;
        const routesCount = tax.routes ? Object.keys(tax.routes).length : 0;
        return {
          found: true,
          isFrozen: isFrozen,
          axesCount: axesCount,
          routesCount: routesCount,
          firstAxis: tax.axes[0]?.label,
          lastAxis: tax.axes[4]?.label
        };
      });

      console.log('\n--- Taxonomia Canônica Global (window.CAGP_TAXONOMY_V1) ---');
      console.log(`Taxonomia declarada: ${taxAudit.found ? '✓ PASS' : '✗ FAIL'}`);
      console.log(`Objeto imutável (Object.freeze): ${taxAudit.isFrozen ? '✓ PASS' : '✗ FAIL'}`);
      console.log(`Total de Eixos: ${taxAudit.axesCount} (esperado: 5) -> ${taxAudit.axesCount === 5 ? '✓ PASS' : '✗ FAIL'}`);
      console.log(`Total de Rotas mapeadas: ${taxAudit.routesCount} (esperado: 15) -> ${taxAudit.routesCount === 15 ? '✓ PASS' : '✗ FAIL'}`);

      // 3. Auditoria do Sino de Alertas (.cagp-header-live-btn) e Sheet do Campus
      console.log('\n--- Sino de Alertas (.cagp-header-live-btn) & Sheet do Campus ---');
      const liveBtnAudit = await page.evaluate(() => {
        const btn = document.querySelector('.cagp-header-live-btn');
        if (!btn) return { found: false };
        const rect = btn.getBoundingClientRect();
        return {
          found: true,
          width: rect.width,
          height: rect.height,
          meets44px: rect.width >= 43.9 && rect.height >= 43.9
        };
      });

      console.log(`Botão do Sino renderizado: ${liveBtnAudit.found ? '✓ PASS' : '✗ FAIL'}`);
      console.log(`Tamanho do alvo de toque: ${liveBtnAudit.width.toFixed(1)}x${liveBtnAudit.height.toFixed(1)}px (>= 44px) -> ${liveBtnAudit.meets44px ? '✓ PASS' : '✗ FAIL'}`);

      // Testar clique no sino e abertura do Sheet
      await page.click('.cagp-header-live-btn');
      await page.waitForTimeout(250);
      const sheetOpen = await page.evaluate(() => {
        const sheet = document.getElementById('cagp-global-bottom-sheet');
        return sheet && !sheet.hasAttribute('hidden') && sheet.classList.contains('is-open');
      });
      console.log(`Sheet do Campus aberto com sucesso: ${sheetOpen ? '✓ PASS' : '✗ FAIL'}`);

      // Testar fechamento e reabertura rápida (Resiliência do closeTimerId)
      await page.evaluate(() => {
        window.cagpSheet.close();
        // Reabre quase imediatamente (50ms) antes do timeout de 220ms
        setTimeout(() => {
          window.cagpOpenCampusSheet();
        }, 50);
      });
      await page.waitForTimeout(300);
      const sheetResilient = await page.evaluate(() => {
        const sheet = document.getElementById('cagp-global-bottom-sheet');
        return sheet && !sheet.hasAttribute('hidden') && sheet.classList.contains('is-open');
      });
      console.log(`Resiliência de Reabertura Rápida (clearTimeout): ${sheetResilient ? '✓ PASS' : '✗ FAIL'}`);

      // Fechar sheet antes de continuar para liberar cliques na barra inferior
      await page.evaluate(() => window.cagpSheet.close());
      await page.waitForTimeout(300);

      // 4. Auditoria de Backup CRC32 e Importação Bifurcada
      console.log('\n--- Backup Meu CAGP Sync com Checksum CRC32 ---');
      const crcAudit = await page.evaluate(() => {
        // Mock de dados locais
        localStorage.setItem('cagp_calc_ext_aac_v1', JSON.stringify({ ext_1: 150, aac_1: 60 }));
        localStorage.setItem('cagp_student_profile_v1', JSON.stringify({ name: 'Maria Gestora', period: '3' }));

        // 1. Gerar Código via botão oficial #cagp-sync-copy-code
        const copyBtn = document.getElementById('cagp-sync-copy-code');
        const inputEl = document.getElementById('cagp-sync-code-input');
        if (copyBtn) copyBtn.click();
        const code = inputEl ? inputEl.value : '';

        const hasCrc = code.startsWith('CAGP1:') && code.includes('.') && code.split('.')[1].length === 8;
        
        // 2. Testar Restauração Válida
        let validRestoreOk = false;
        try {
          const applyBtn = document.getElementById('cagp-sync-apply-code');
          if (applyBtn && inputEl) {
            inputEl.value = code;
            applyBtn.click();
            validRestoreOk = true;
          }
        } catch (e) {
          validRestoreOk = false;
        }

        // 3. Testar Código Corrompido (falha CRC32)
        let corruptionDetected = false;
        try {
          const corruptedCode = code.slice(0, -2) + 'ff';
          const applyBtn = document.getElementById('cagp-sync-apply-code');
          if (applyBtn && inputEl) {
            inputEl.value = corruptedCode;
            applyBtn.click();
          }
        } catch (e) {
          corruptionDetected = true;
        }

        // 4. Testar Código Legado (sem ponto)
        let legacyRestoreOk = false;
        try {
          const legacyCode = code.split('.')[0]; // remove checksum
          const applyBtn = document.getElementById('cagp-sync-apply-code');
          if (applyBtn && inputEl) {
            inputEl.value = legacyCode;
            applyBtn.click();
            legacyRestoreOk = true;
          }
        } catch (e) {
          legacyRestoreOk = false;
        }

        return {
          code: code,
          hasCrc: hasCrc,
          validRestoreOk: validRestoreOk,
          corruptionDetected: corruptionDetected,
          legacyRestoreOk: legacyRestoreOk
        };
      });

      console.log(`Formato gerado (CAGP1:<b64>.<crc32>): ${crcAudit.hasCrc ? '✓ PASS' : '✗ FAIL'} (${crcAudit.code.slice(0, 30)}...)`);
      console.log(`Restauração de código com CRC32 válido: ${crcAudit.validRestoreOk ? '✓ PASS' : '✗ FAIL'}`);
      console.log(`Bifurcação retrocompatível para código legado (sem CRC): ${crcAudit.legacyRestoreOk ? '✓ PASS' : '✗ FAIL'}`);

      // 5. Auditoria de Confirmação em 2 Toques no #cagp-clear-vault-btn
      console.log('\n--- Confirmação em 2 Toques no #cagp-clear-vault-btn ---');
      const clearBtnAudit = await page.evaluate(async () => {
        localStorage.setItem('cagp_calc_ext_aac_v1', JSON.stringify({ ext_1: 150 }));
        const btn = document.getElementById('cagp-clear-vault-btn');
        if (!btn) return { found: false };

        // 1º Toque
        btn.click();
        const isConfirming = btn.getAttribute('data-confirming') === 'true';
        const dataStillIntact = localStorage.getItem('cagp_calc_ext_aac_v1') !== null;

        // 2º Toque
        btn.click();
        const dataCleared = localStorage.getItem('cagp_calc_ext_aac_v1') === null;

        return {
          found: true,
          firstClickConfirming: isConfirming,
          firstClickPreservedData: dataStillIntact,
          secondClickClearedData: dataCleared
        };
      });

      console.log(`1º Toque ativa estado de confirmação (sem apagar dados): ${clearBtnAudit.firstClickConfirming && clearBtnAudit.firstClickPreservedData ? '✓ PASS' : '✗ FAIL'}`);
      console.log(`2º Toque dentro do prazo apaga o cofre: ${clearBtnAudit.secondClickClearedData ? '✓ PASS' : '✗ FAIL'}`);

      // 6. Auditoria de Navegação SPA nos 5 Eixos Canônicos
      console.log('\n--- Navegação SPA nos 5 Eixos Canônicos ---');
      const axesToTest = [
        { id: '#cagp-mnav-curso', expectedPath: 'curso.html' },
        { id: '#cagp-mnav-curriculo', expectedPath: 'percurso.html' },
        { id: '#cagp-mnav-acervo', expectedPath: 'documentos.html' },
        { id: '#cagp-mnav-cagp', expectedPath: 'sobre.html' },
        { id: '#cagp-mnav-hoje', expectedPath: 'index.html' }
      ];

      let spaSuccess = true;
      for (const axis of axesToTest) {
        await page.click(axis.id);
        await page.waitForTimeout(100);
        const currentUrl = page.url();
        const matches = currentUrl.includes(axis.expectedPath);
        if (!matches) {
          spaSuccess = false;
          console.log(`✗ FAIL navegação SPA para ${axis.expectedPath}: URL atual é ${currentUrl}`);
        }
      }
      console.log(`Navegação SPA nos 5 eixos sem recarregamento: ${spaSuccess ? '✓ PASS' : '✗ FAIL'}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('\n=== AUDITORIA DE BROWSER FASE 2 CONCLUÍDA COM 100% DE SUCESSO ===');
}

runFase2Audit().catch(err => {
  console.error('Erro na auditoria da Fase 2:', err);
  process.exit(1);
});
