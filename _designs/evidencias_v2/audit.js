/**
 * audit.js - Script de Auditoria Empírica de DOM e Usabilidade (M1 a M8)
 * Executado no contexto da página pelo subagente /browser ou script de automação.
 * Retorna exclusivamente uma string JSON pura com o resultado.
 */
(() => {
  const result = {};

  // M1: Transbordamento Horizontal no documentElement
  const docEl = document.documentElement;
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  result.M1 = docEl.scrollWidth <= winW + 1; // 1px rounding tolerance

  // M2: Contenção de Abas da Barra (.cagp-workspace-bar)
  const bar = document.querySelector('.cagp-workspace-bar');
  if (bar) {
    const tabs = Array.from(document.querySelectorAll('.cagp-workspace-tab, .cagp-workspace-viewall'));
    const barFit = bar.scrollWidth <= bar.clientWidth + 1;
    let tabsFit = true;
    for (const t of tabs) {
      const r = t.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        if (r.left < -1 || r.right > winW + 1) {
          tabsFit = false;
          break;
        }
      }
    }
    result.M2 = barFit && tabsFit;
  } else {
    result.M2 = true; // Rotas sem barra atendem
  }

  // M3: Coordenadas da 1ª Dobra (bar_top e first_ctrl)
  const m3 = { bar_top: null, first_ctrl: null };
  if (bar) {
    const br = bar.getBoundingClientRect();
    m3.bar_top = Math.round(br.top);
  }
  const activeView = document.querySelector('.cagp-workspace-view.is-active, .cagp-workspace-view:not([hidden])');
  const scope = activeView || document.querySelector('#quarto-document-content') || document.body;
  if (scope) {
    const firstInteractive = scope.querySelector('button, input, select, textarea, .cagp-calc-btn, .cagp-doc-card a, .cagp-tool-box, .cagp-calc-hud-linear, .cagp-offline-strip, [tabindex="0"]');
    if (firstInteractive) {
      const ir = firstInteractive.getBoundingClientRect();
      m3.first_ctrl = Math.round(ir.top);
    }
  }
  result.M3 = m3;

  // M4: Alvos de Toque Mínimos (>= 43.9px) em elementos interativos
  // Isenções normativas (WCAG 2.5.8 / Apple HIG): links inline em parágrafos e itens de lista corrida
  const interactiveSel = 'button, summary, [role="tab"], [role="button"], input, select, textarea, .cagp-btn, .cagp-workspace-tab, .cagp-workspace-viewall, a.btn, a.cagp-btn';
  const candidates = Array.from(document.querySelectorAll(interactiveSel));
  let m4Count = 0;
  for (const el of candidates) {
    if (el.closest('p, li, td') && el.tagName.toLowerCase() === 'a' && !el.classList.contains('btn') && !el.classList.contains('cagp-btn')) {
      continue;
    }
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0 && (r.top < winH && r.bottom > 0)) {
      if (r.width < 43.9 || r.height < 43.9) {
        m4Count++;
      }
    }
  }
  result.M4 = m4Count;

  // M5: Exatamente 1 <h1> visível
  const h1s = Array.from(document.querySelectorAll('h1')).filter(h => {
    const s = window.getComputedStyle(h);
    return s.display !== 'none' && s.visibility !== 'hidden' && h.offsetWidth > 0 && h.offsetHeight > 0;
  });
  result.M5 = h1s.length;

  // M6: Erros de console rastreados
  result.M6 = window.__cagp_console_errors ? window.__cagp_console_errors.length : 0;

  // M7: Contraste Cromático e Alto Contraste
  const m7 = [];
  const testItems = [
    { name: 'btn-done', sel: '.cagp-a11y-btn-done' },
    { name: 'status-open', sel: '.cagp-status-open' },
    { name: 'btn-calc-reset', sel: '#btn-calc-reset' },
    { name: 'app-logo-bu', sel: '.cagp-app-logo-bu' }
  ];
  for (const it of testItems) {
    const el = document.querySelector(it.sel);
    if (el) {
      const s = window.getComputedStyle(el);
      m7.push({ sel: it.sel, fg: s.color, bg: s.backgroundColor });
    }
  }
  const isHighContrast = document.documentElement.getAttribute('data-a11y-contrast') === 'high' || document.documentElement.classList.contains('cagp-high-contrast');
  result.M7 = { isHighContrast, samples: m7 };

  // M8: Contenção de Over-Boxing (máximo 4 elementos com borda >= 2px ou sombra dura na 1ª dobra)
  if (isHighContrast) {
    result.M8 = { n: 0, els: ['Isento no modo Alto Contraste'] };
  } else {
    const allEls = Array.from(document.querySelectorAll('body *'));
    const heavyEls = [];
    for (const el of allEls) {
      const r = el.getBoundingClientRect();
      if (r.top < winH && r.bottom > 0 && r.width > 20 && r.height > 20) {
        const s = window.getComputedStyle(el);
        const bw = parseFloat(s.borderTopWidth) || 0;
        const bs = s.boxShadow;
        const hasHardShadow = bs && bs !== 'none' && !bs.includes('rgba(0, 0, 0, 0)');
        if (bw >= 2 || hasHardShadow) {
          // Excluir elementos primários autorizados e a aba ativa
          const isPrimary = el.classList.contains('cagp-btn-primary') || el.classList.contains('btn-primary') || el.classList.contains('is-active');
          if (!isPrimary) {
            heavyEls.push(el.className || el.tagName);
          }
        }
      }
    }
    result.M8 = { n: heavyEls.length, els: heavyEls.slice(0, 10) };
  }

  return JSON.stringify(result);
})();
