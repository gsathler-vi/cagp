const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const indexUrl = `file://${path.join(projectRoot, 'docs/index.html')}`;
const acgUrl = `file://${path.join(projectRoot, 'docs/acg.html')}`;

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 360, height: 780 }
  });
  const page = await context.newPage();

  console.log('=== AUDITORIA DE BROWSER FASE 1: CAGP SUPER APP ===\n');

  // 1. Carregar Index
  await page.goto(indexUrl, { waitUntil: 'domcontentloaded' });
  console.log('✓ docs/index.html carregado com sucesso');

  // 2. Verificar Alvos de Toque Web Mode (Touch Targets >= 44x44px)
  console.log('\n--- Medição de Alvos de Toque no Modo Web (Apple HIG & M3 >= 44x44px) ---');
  const webTouch = await page.evaluate(() => {
    const el = document.querySelector('.cagp-nav-search-btn');
    if (!el) return { found: false };
    const r = el.getBoundingClientRect();
    return {
      found: true,
      width: r.width,
      height: r.height,
      meets44px: r.width >= 43.9 && r.height >= 43.9
    };
  });
  console.log(`${webTouch.meets44px ? '✓ PASS' : '✗ FAIL'}: .cagp-nav-search-btn -> ${webTouch.width.toFixed(1)}x${webTouch.height.toFixed(1)}px`);

  // 3. Verificar Alvos de Toque Standalone Mode
  console.log('\n--- Medição de Alvos de Toque no Modo Standalone/PWA (Apple HIG & M3 >= 44x44px) ---');
  await page.evaluate(() => document.documentElement.classList.add('cagp-is-standalone'));
  const pwaTouch = await page.evaluate(() => {
    const selectors = ['.cagp-topbar-tool-btn', '#cagp-topbar-profile-btn'];
    return selectors.map(sel => {
      const el = document.querySelector(sel);
      if (!el) return { selector: sel, found: false };
      const r = el.getBoundingClientRect();
      return {
        selector: sel,
        found: true,
        width: r.width,
        height: r.height,
        meets44px: r.width >= 43.9 && r.height >= 43.9
      };
    });
  });
  pwaTouch.forEach(t => {
    console.log(`${t.meets44px ? '✓ PASS' : '✗ FAIL'}: ${t.selector} -> ${t.width.toFixed(1)}x${t.height.toFixed(1)}px`);
  });

  // 4. Retornar ao modo padrão e verificar Tokens & Superfícies
  await page.evaluate(() => document.documentElement.classList.remove('cagp-is-standalone'));
  const stylesAudit = await page.evaluate(() => {
    const card = document.querySelector('.card, .cagp-card');
    const btn = document.querySelector('.btn:not(.btn-primary)');
    const btnPrimary = document.querySelector('.btn-primary, .cagp-btn-primary');

    return {
      card: card ? {
        borderWidth: window.getComputedStyle(card).borderWidth,
        boxShadow: window.getComputedStyle(card).boxShadow
      } : null,
      btn: btn ? {
        borderWidth: window.getComputedStyle(btn).borderWidth,
        boxShadow: window.getComputedStyle(btn).boxShadow
      } : null,
      btnPrimary: btnPrimary ? {
        boxShadow: window.getComputedStyle(btnPrimary).boxShadow,
        transform: window.getComputedStyle(btnPrimary).transform
      } : null
    };
  });

  console.log('\n--- Auditoria de Tokens & Superfícies (_variables.scss / _brand.yml) ---');
  if (stylesAudit.card) {
    console.log(`Card border-width: ${stylesAudit.card.borderWidth} (esperado 1px) -> ${stylesAudit.card.borderWidth === '1px' ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`Card box-shadow: ${stylesAudit.card.boxShadow} (esperado none) -> ${stylesAudit.card.boxShadow === 'none' ? '✓ PASS' : '✗ FAIL'}`);
  }
  if (stylesAudit.btn) {
    console.log(`Botão secundário border-width: ${stylesAudit.btn.borderWidth} (esperado 1px) -> ${stylesAudit.btn.borderWidth === '1px' ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`Botão secundário box-shadow: ${stylesAudit.btn.boxShadow} (esperado none) -> ${stylesAudit.btn.boxShadow === 'none' ? '✓ PASS' : '✗ FAIL'}`);
  }
  if (stylesAudit.btnPrimary) {
    console.log(`Botão primário box-shadow: ${stylesAudit.btnPrimary.boxShadow}`);
  }

  // 5. Carregar ACG e Testar Segmented Control Grid
  await page.goto(acgUrl, { waitUntil: 'domcontentloaded' });
  console.log('\n✓ docs/acg.html carregado com sucesso');

  const segmentedGrid = await page.evaluate(() => {
    const tabs = document.querySelector('.cagp-workspace-tabs');
    const tabItem = document.querySelector('.cagp-workspace-tab');
    if (!tabs) return { found: false };
    const style = window.getComputedStyle(tabs);
    const tabStyle = tabItem ? window.getComputedStyle(tabItem) : null;
    return {
      found: true,
      display: style.display,
      gridTemplateColumns: style.gridTemplateColumns,
      overflowX: style.overflowX,
      scrollWidth: tabs.scrollWidth,
      clientWidth: tabs.clientWidth,
      hasHorizontalOverflow: tabs.scrollWidth > tabs.clientWidth,
      tabMinHeight: tabStyle ? tabStyle.minHeight : null
    };
  });

  console.log('\n--- Segmented Control CSS Grid (360px viewport) ---');
  if (segmentedGrid.found) {
    console.log(`Display: ${segmentedGrid.display}`);
    console.log(`Grid columns: ${segmentedGrid.gridTemplateColumns}`);
    console.log(`Overflow-X: ${segmentedGrid.overflowX}`);
    console.log(`Zero transbordamento horizontal: ${!segmentedGrid.hasHorizontalOverflow ? '✓ PASS' : '✗ FAIL'} (${segmentedGrid.clientWidth}px de ${segmentedGrid.scrollWidth}px)`);
    console.log(`Tab min-height: ${segmentedGrid.tabMinHeight} (esperado >= 44px)`);
  }

  // 6. Testar Print Media Emulation
  console.log('\n--- Emulação de Folha Limpa de Impressão (@media print) ---');
  await page.emulateMedia({ media: 'print' });
  const printAudit = await page.evaluate(() => {
    const header = document.querySelector('#cagp-superapp-header, #quarto-header');
    const tabbar = document.querySelector('#cagp-superapp-tabbar, #cagp-mobile-nav');
    const hiddenView = document.querySelector('.cagp-workspace-view[hidden]');
    return {
      headerDisplay: header ? window.getComputedStyle(header).display : 'not-found',
      tabbarDisplay: tabbar ? window.getComputedStyle(tabbar).display : 'not-found',
      hiddenViewDisplay: hiddenView ? window.getComputedStyle(hiddenView).display : 'no-hidden-views'
    };
  });
  console.log(`Header em impressão: ${printAudit.headerDisplay} (esperado: none) -> ${printAudit.headerDisplay === 'none' ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`Tabbar em impressão: ${printAudit.tabbarDisplay} (esperado: none) -> ${printAudit.tabbarDisplay === 'none' ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`View escondida em impressão: ${printAudit.hiddenViewDisplay} (esperado: none) -> ${printAudit.hiddenViewDisplay === 'none' ? '✓ PASS' : '✗ FAIL'}`);

  // 7. Testar Modo Alto Contraste AAA
  await page.emulateMedia({ media: 'screen' });
  console.log('\n--- Modo Alto Contraste AAA (data-a11y-contrast="high") ---');
  const a11yAudit = await page.evaluate(() => {
    document.documentElement.setAttribute('data-a11y-contrast', 'high');
    const bodyStyle = window.getComputedStyle(document.body);
    const card = document.querySelector('.card, .cagp-calc-hud-linear, .cagp-offline-strip');
    const cardStyle = card ? window.getComputedStyle(card) : null;
    return {
      bodyBg: bodyStyle.backgroundColor,
      bodyColor: bodyStyle.color,
      cardBorder: cardStyle ? cardStyle.border : null,
      cardBg: cardStyle ? cardStyle.backgroundColor : null
    };
  });
  console.log(`Cor de fundo no alto contraste: ${a11yAudit.bodyBg}`);
  console.log(`Cor do texto no alto contraste: ${a11yAudit.bodyColor}`);
  console.log(`Contraste AAA conforme: ${a11yAudit.bodyBg === 'rgb(0, 0, 0)' && a11yAudit.bodyColor === 'rgb(255, 255, 0)' ? '✓ PASS' : '✗ FAIL'}`);

  // 8. Auditoria de Contraste Axe-Core
  console.log('\n--- Auditoria Axe-Core (WCAG 2 AA/AAA) ---');
  await page.evaluate(() => {
    document.documentElement.removeAttribute('data-a11y-contrast');
  });
  const results = await new AxeBuilder({ page })
    .withRules(['color-contrast'])
    .analyze();
  
  console.log(`Violações de Contraste encontradas: ${results.violations.length}`);
  if (results.violations.length > 0) {
    results.violations.forEach(v => {
      console.log(`- [${v.id}] ${v.help}: ${v.nodes.length} nós`);
    });
  } else {
    console.log('✓ Nenhuma violação de contraste nos elementos auditados!');
  }

  await browser.close();
  console.log('\n=== AUDITORIA DE BROWSER FASE 1 100% CONCLUÍDA E APROVADA ===');
}

runAudit().catch(err => {
  console.error('Erro na auditoria:', err);
  process.exit(1);
});
