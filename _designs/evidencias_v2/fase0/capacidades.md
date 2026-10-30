# Relatório de Capacidades de Emulação e Auditoria do Navegador — Fase 0

**Data:** 2026-10-29  
**Ambiente:** Servidor HTTP Local (`python3 -m http.server 8080 -d docs`) + Subagente Nativo `/browser`  
**Escopo:** Homologação prévia de métodos de emulação para a execução das 152 células da matriz multiformato.

---

## 1. Tabela de Capacidades, Métodos e Mapeamento para Anexo C

| Capacidade Auditada | Método de Execução Principal | Método de Fallback no `/browser` | Item de Validação Física (Anexo C) | Status de Homologação |
| :--- | :--- | :--- | :---: | :---: |
| **Redimensionamento de Viewport (280px a 1440px)** | Emulação de dispositivo com `viewport={width, height}` | Redimensionamento da janela do navegador | `C4` (Foldable real 280px/700px) | Homologado (Suporte Total) |
| **Execução de JS no DOM e Retorno JSON** | Execução verbatim de `_designs/evidencias_v2/audit.js` no console da página | Extração via DOM Evaluation API | — | Homologado (Suporte Total) |
| **Modo PWA Standalone (F2)** | Leitura de `sessionStorage['cagp_force_app_mode'] = 'true'` + `cagpSyncViewportMeta(true)` | Injeção da classe `cagp-is-standalone` em `document.documentElement` | `C3` (Instalação real PWA) | Homologado (Suporte Total) |
| **Modo Offline & Cache SW (F2)** | Desconexão de rede via emulação (`offline: true`) | Bloqueio de requisições de rede no contexto do browser | `C3` (Modo avião em smartphone) | Homologado (Suporte Total) |
| **Mídia de Impressão (`@media print` - F5)** | Emulação de mídia CSS (`emulateMedia({ media: 'print' })`) | Injeção temporária da folha de estilos de impressão | — | Homologado (Suporte Total) |
| **Alto Contraste AAA (F4)** | Ativação via `localStorage.setItem('cagp_a11y_prefs_v2', JSON.stringify({ contrast: 'high' }))` e recarga | Atributo `document.documentElement.setAttribute('data-a11y-contrast', 'high')` | — | Homologado (Suporte Total) |
| **Dislexia (F4)** | `localStorage` com `{ dyslexia: true }` | Atributo `document.documentElement.setAttribute('data-a11y-dyslexia', 'true')` | — | Homologado (Suporte Total) |
| **Escala de Fonte Ampliada (`font-lg`, `font-xl` - F4)** | `localStorage` com `{ font: 'xl' }` | Atributo `document.documentElement.setAttribute('data-a11y-font', 'xl')` | — | Homologado (Suporte Total) |
| **Movimento Reduzido (F4)** | Emulação de preferência `prefers-reduced-motion: reduce` | `localStorage` com `{ motion: 'reduced' }` e atributo `data-a11y-motion="reduced"` | `C5` (Gestos e animações) | Homologado (Suporte Total) |
| **Dark Defensivo (F4)** | Emulação de preferência `prefers-color-scheme: dark` | Injeção via DevTools protocol | — | Homologado (Suporte Total) |
| **Zoom 200% (F4)** | Device Scale Factor = 2.0 com viewport reduzido à metade | Zoom de página via script de visualViewport | — | Homologado (Suporte Total) |
| **Navegação por Teclado (F6)** | Disparo sequencial de teclas `Tab` e setas direcionais | Roving tabindex e verificação de `:focus-visible` | — | Homologado (Suporte Total) |
| **Toque e Multitoque (F6/F7)** | Emulação de Touch Events (`hasTouch: true`) | Injeção de eventos de toque | `C5` / `C6` (Hardware real) | Homologado (Suporte Total) |
| **WebView Mobile (Instagram / WhatsApp - F2)** | — (Não emulável com fidelidade em Chromium de desktop) | Emulação de User-Agent restrito | `C1` (Hardware real obrigatório) | Transferido para Anexo C1 |
| **Leitor de Tela Nativo (VoiceOver / TalkBack - F5)** | — (Exige subsistema de acessibilidade de SO real) | Inspeção de acessibilidade ARIA no DOM (`accessibility tree`) | `C2` (Hardware real obrigatório) | Transferido para Anexo C2 |

---

## 2. Parâmetros de Inicialização do Servidor Local

- **Comando Padronizado:** `quarto render && (python3 -m http.server 8080 -d docs &)`
- **Porta:** `8080` (necessária para que o Service Worker opere sob escopo `localhost` sem restrições de certificado).
- **Diretório Raiz:** `docs/`.
