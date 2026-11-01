---
target_identity: "file:/home/gsathler/Nextcloud/Projects/cagp/src/components/calculators/Calculator600h.tsx"
target_fingerprint: "sha256:2c1c20e78b7801a2850e938376f0273126f36b878afca661a7cdad8af3ab9536"
target_path: /home/gsathler/Nextcloud/Projects/cagp/src/components/calculators/Calculator600h.tsx
timestamp: 2026-11-01T23-01-46Z
slug: src-components-calculators-calculator600h-tsx
---
# Design Critique & Auditoria: Calculadora 600h & Gavetas Normativas

**Method:** dual-agent (A: 8f7357c5-c328-45e9-853d-8f173413c44b · B: deterministic-scan)  
**Target:** `src/components/calculators/Calculator600h.tsx`  
**Surface Mode:** `Operate` (Super App Discente / Ferramenta Interativa)  

---

### Design Health Score (Nielsen's 10 Heuristics)

| # | Heuristic | Score (0–4) | Key Issue |
|---|---|:---:|---|
| 1 | **Visibility of System Status** | **4** | Atualizações reativas instantâneas, anel métrico percentual, conversão automática de créditos e selo TETO. |
| 2 | **Match System & Real World** | **4** | Terminologia oficial da UFMG (créditos 15h, SIEX, Colegiado F-2039 com Norma Guedes, SEI UFMG, Art. 15). |
| 3 | **User Control & Freedom** | **4** | Botões de passo (`+`/`−`), botão "Teto" instantâneo por modalidade, toggle "Expandir/Recolher Guias" e confirmação preventiva em 2 etapas no "Zerar". |
| 4 | **Consistency & Standards** | **4** | Identidade Neo-brutalista Brite alinhada; eliminação de conflito de namespace com menu off-canvas. |
| 5 | **Error Prevention** | **4** | Trava automática de tetos regimentais (PPC 2020 Quadro 7 e 8) impedindo extrapolação de horas permitidas. |
| 6 | **Recognition Rather Than Recall** | **4** | Gavetas normativas "O que conta nisso?" eliminam dúvidas regimentais exibindo critérios oficiais aceitos e rejeitados no próprio ponto de decisão. |
| 7 | **Flexibility & Efficiency** | **4** | Ações rápidas de 1 toque: "Exemplo (360h)", botão "Teto" por item e controle global de expansão de gavetas. |
| 8 | **Aesthetic & Minimalist Design** | **3** | Riqueza informativa alta; mitigado pela contenção em duas colunas simétricas e fechamento fluido das gavetas. |
| 9 | **Error Recovery** | **4** | Alerta regulamentar enfático para o prazo de 120 dias em Eventos I e Anais; botão de zerar com confirmação temporizada de 4s prevenindo perda acidental. |
| 10 | **Help & Documentation** | **4** | Documentação regulamentar profunda nas gavetas, download do Formulário N-20229 em PDF e gerador de lembrete de calendário (.ics). |
| **Total** | | **35 / 40** | **Strong (Design sólido, alta aderência regulamentar)** |

---

### Causa Raiz do Bug de Expansão das Gavetas & Resolução Técnica

1. **Causa Raiz 1 (Classe `.is-open` Ausente no Componente React):**
   - O CSS em `src/styles/components.css` definia `.cagp-calc-drawer { display: grid !important; grid-template-rows: 0fr; }` e exigia `.is-open` para expandir para `1fr`.
   - No JSX de `Calculator600h.tsx`, a div era montada com `className="cagp-calc-drawer"`, sem anexar a classe `.is-open` quando aberta. O navegador aplicava a regra `0fr`, colapsando a altura do conteúdo e renderizando apenas um filete das bordas/padding.
2. **Causa Raiz 2 (Colisão de Classes com o Menu Off-Canvas `drawer.css`):**
   - O arquivo `src/styles/drawer.css` definia `.cagp-drawer-header` e `.cagp-drawer-section` para o menu mobile lateral (com bordas e margens inferiores forçadas).
   - Isso colidia com o layout das caixas verde e vermelha da gaveta.
3. **Causa Raiz 3 (Vazamento de Foco e Leitores de Tela):**
   - Em gavetas fechadas (`0fr`), faltava `visibility: hidden;`, permitindo que navegadores e leitores de tela percorressem dezenas de itens invisíveis com a tecla `Tab`.

**Ações Executadas e Solução:**
- Harmonizado o interpolador fluido CSS com `grid-template-rows: 0fr -> 1fr`, `opacity: 0 -> 1` e `visibility: hidden -> visible`.
- Isolado o escopo CSS com o namespace `.cagp-calc-drawer-grid`, `.cagp-calc-drawer-section`, `.cagp-calc-drawer-header` e `.cagp-calc-drawer-alert`.
- No `Calculator600h.tsx`, as gavetas agora recebem `className={\`cagp-calc-drawer \${isDrawerOpen ? 'is-open' : ''}\`}` e `aria-controls={\`drawer-\${item.key}\`}`.
- Adicionado botão "Teto" rápido em cada card, botão global "Expandir Guias / Recolher Guias" e proteção de confirmação de 4 segundos no botão "Zerar".
