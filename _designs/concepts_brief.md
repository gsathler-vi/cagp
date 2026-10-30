# Brief de Conceitos e Síntese Arquitetural (RFC) — Super App CAGP UFMG

> **Status:** Conceito Validado na Entrevista Passo a Passo (`/grill-me` Concluído — Pronto para `/egm-draft`).
> **Fontes de Evidência:** [diagnostico_auditoria.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/diagnostico_auditoria.md), [propostas_brainstorm_egm.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/propostas_brainstorm_egm.md) e [galeria_prototipos.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/galeria_prototipos.md).

---

## 1. Overview (Visão Geral)

O **Super App CAGP UFMG** reúne 14 rotas acadêmicas ativas (mais 1 rota-ponte legada `estagio-tcc.html`), motores offline em Service Worker ([sw.js](file:///home/gsathler/Nextcloud/Projects/cagp/sw.js)) e 9 módulos persistentes em `localStorage` para atender discentes do Bacharelado Noturno em Gestão Pública da FAFICH/UFMG.

A auditoria empírica em DOM real (`360px`, `375px`, `412px`, `768px`, `1440px` e motor de impressão PDF) demonstrou que a riqueza funcional do sistema está prejudicada por cinco gargalos estruturais:
1. **Presença de funcionalidade quebrada e obsoleta de Espelho N-20229** ([acg.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd)), que tenta imprimir um formulário sintético via `window.print()` vazando 9 páginas da interface web, trunca 78,5% do texto em uma `<textarea rows="5">` e diverge do formulário oficial do Colegiado. Conforme decisão do usuário, esta funcionalidade será **completamente removida/decomissionada**, direcionando o discente aos formulários oficiais autênticos (PDF/DOCX) e limpando o código;
2. **Corte horizontal crônico de `.cagp-workspace-bar`** em 14/14 rotas a `360px` (`0` abas inteiras visíveis, restando apenas `248px` úteis após `112px` de paddings e bordas aninhadas);
3. **Empurramento do conteúdo acionável para fora da 1ª dobra** (`y = 1.332px` em `documentos.html`, `y = 2.272px` em `acg.html`, `y = 2.856px` em `percurso.html`);
4. **Saturação de caixas aninhadas (*over-boxing*) e falhas pontuais de acessibilidade** (14 a 22 caixas com bordas `2px` e sombras duras na 1ª dobra, 5 reprovações WCAG AA, vazamento de texto amarelo `#FFFF00` sobre fundo branco `#FFFFFF` no modo Alto Contraste e alvos de toque `< 44×44px`);
5. **Fragmentação de navegação entre Web e PWA Standalone**, onde 10 das 14 rotas ficam sem menu global quando o app é instalado na tela inicial e o gatilho `Passaporte` aparece duplicado no topo e na 5ª aba inferior.

Este RFC sintetiza as alternativas arquiteturais avaliadas e organiza as decisões humanas necessárias antes de qualquer plano de escrita em código de produção.

---

## 2. Analysis (Análise de Causa-Raiz e Restrições do Sistema)

1. **Arquitetura de Impressão e Ambientes Móveis Hostis:** Em [styles.css#L9639-L9648](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L9639-L9648), `@media print` força `.cagp-workspace-view[hidden] { display: block !important }` sem ocultar `#quarto-content`. Além disso, `window.print()` é um *no-op* silencioso nas WebViews embutidas do Instagram e WhatsApp, e o evento `afterprint` não dispara de forma garantida no retorno do Print Spooler do Android WebAPK. Logo, o isolamento de impressão deve ocorrer por nó içado diretamente em `document.body` governado **apenas** por `@media print`, combinado com cópia textual SEI e `Web Share API` ([`window.cagpShare()`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L1746-L1788)).
2. **Restrições do Roteador SPA e Pipeline Quarto/Brand:** O Quarto injeta `include-before-body` dentro de `<main id="quarto-document-content">`, exigindo *DOM hoisting* explícito e registro em `shellIdsToRemove` ([super-app-router.html#L266-L286](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-router.html#L266-L286)). Em `applyPageSwap()`, `document.body.className` é sobrescrito a cada navegação, obrigando classes persistentes de estado a residirem em `<html>`. Em [_quarto.yml#L29-L31](file:///home/gsathler/Nextcloud/Projects/cagp/_quarto.yml#L29-L31), a ausência de `theme: [brand, _variables.scss]` impede que [`_brand.yml`](file:///home/gsathler/Nextcloud/Projects/cagp/_brand.yml) atue como fonte primária formal de tokens.
3. **Riscos Ocultos no Contrato das 9 Chaves `localStorage`:** Em [pwa-install.html#L982-L988](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L982-L988), `refreshVaultData()` possui um ramo `else totalHours += val` que somaria qualquer chave não prefixada por `ext_`/`aac_` (como um número de matrícula) ao total de horas do aluno. Já `cagp_student_profile_v1` usa `Object.assign({}, defaults, parsed)` com merge parcial, sendo seguro para campos opcionais sob opt-in. Por fim, o código de sincronização `CAGP1:...` já consome até `~60 KB` quando há foto WebP `256×256` salva, exigindo que qualquer metadado em `cagp_notifications_prefs_v1` ocupe `< 600 bytes` para não estourar o limite de truncamento de `65.536` caracteres do WhatsApp.

---

## 3. Goals vs. Non-Goals (Escopo e Invariantes)

### Objetivos (Goals)
- **Remoção Integral da Funcionalidade de Espelho em [acg.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd):** Decomissionar os botões `#btn-gerar-resumo-n20229`, o modal, o container `#cagp-n20229-print-sheet`, o `<textarea>` cortado e as regras quebradas de `@media print` em [styles.css](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css). Direcionar o estudante de forma limpa e direta aos formulários oficiais (PDF e DOCX) já hospedados em [documentos.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/documentos.qmd) e [acg.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd), garantindo protocolo autêntico no Colegiado (Sala F-2039) e eliminando ~200 linhas de código frágil.
- Trazer o primeiro controle interativo real de páginas operacionais (`documentos.qmd`, `acg.qmd`, `percurso.qmd`, `index.qmd`) para **`y < 300px`** em telas móveis de `360px`, eliminando o empilhamento triplo de títulos (`H1` + `H2` + `H3`).
- Eliminar 100% do corte horizontal sem affordance em `.cagp-workspace-bar` entre `360px` e `1440px`, adotando **Controle Segmentado (Hipótese III.B: 100% visível, 0 scroll)** e mantendo compatibilidade integral com deep-links e `cagpActivateWorkspaceView()`.
- Reduzir o *over-boxing* na 1ª dobra adotando **Brite Institucional Refinado (Hipótese IV.A)**, corrigir as 5 falhas de contraste WCAG AA, blindar o modo Alto Contraste AAA (`#000000`/`#FFFF00`), elevar alvos de toque para `>= 44×44px` e remover jargões técnicos da interface pública.
- Unificar a navegação Web Mobile e PWA Standalone em **Simetria 1:1 dos 5 Eixos Canônicos (Hipótese V.A)** (`Hoje | Curso | Currículo | Acervo | O CAGP`) com faixa contextual de pílulas entre rotas-irmãs, **Avatar único no topo direito** (`>= 44×44px`, com confirmação em 2 toques no cofre) e **Sino de Notificações** acoplado a `cagpOpenCampusSheet()` + `cagp_notifications_prefs_v1` (zero nova chave `localStorage`).

### Não-Objetivos e Invariantes Rígidos (Non-Goals)
- **Zero Espelho Sintético:** Não implementar, exportar ou manter formulários client-side sintéticos para N-20229; o discente deve utilizar os modelos institucionais oficiais fornecidos pela Secretaria/Colegiado.
- **Zero Supressão Factual:** Nenhum artigo regimental, carga horária, ementa, e-mail (`coordgestaopublica@gmail.com`), sala (`F-2039`, `F-2033`), telefone, modalidade ou link de PDF/DOCX será removido.
- **Zero Quebra ou Adição de Chaves Fora do Contrato:** Nenhuma das 9 chaves de `localStorage`, o formato `CAGP1:...` ou o cache `cagp-pdfs-oficiais-v1` terão seu contrato quebrado; não serão criadas novas chaves de `localStorage` nem backend externo.

---

## 4. Alternatives Weighed (Alternativas Ponderadas)

| Dimensão | Opções Avaliadas | Síntese dos Trade-offs |
| :--- | :--- | :--- |
| **1. Funcionalidade de Espelho N-20229** | Manter e reformular via folha A4 dedicada (Hipótese I.D) vs. **Remoção/Decomissionamento Integral** | Optou-se pela **Remoção/Decomissionamento Integral** da funcionalidade de espelho: elimina ~200 linhas de código legado frágil em `acg.qmd` e `styles.css`, extingue o bug de impressão de 9 páginas sem criar dependências client-side e direciona o estudante aos formulários oficiais autênticos (PDF/DOCX) da Sala F-2039. |
| **2. Barra de Sub-Views Móveis** ([Protótipo B](file:///home/gsathler/.gemini/antigravity/brain/4f266f80-b81d-4f1d-b19b-1907e1b23e6e/prototipo_b_dobra1_subviews.html)) | **III.A** Abas Full-Bleed Adesivas • **III.B** Controle Segmentado (100% visível, 0 scroll) • **III.C** Trilho com Peek 25% | Aprovada a **Hipótese III.B (Controle Segmentado)**: 100% das sub-views visíveis simultaneamente sem scroll nem corte horizontal em qualquer tela. |
| **3. Linguagem Visual & Contenção** ([Protótipo B](file:///home/gsathler/.gemini/antigravity/brain/4f266f80-b81d-4f1d-b19b-1907e1b23e6e/prototipo_b_dobra1_subviews.html)) | **IV.A** Brite Institucional Refinado • **IV.B** Super App Tonal Clean • **IV.C** Híbrido Editorial Acadêmico | Aprovada a **Hipótese IV.A (Brite Refinado)**: preserva o DNA Brite (Oswald caixa-alta, bordas 1px), elimina caixas redundantes e restringe sombra 2px aos botões primários. |
| **4. Topologia da Barra Inferior (5 Abas)** ([Protótipo C](file:///home/gsathler/.gemini/antigravity/brain/4f266f80-b81d-4f1d-b19b-1907e1b23e6e/prototipo_c_navegacao_superapp.html)) | **V.A** Simetria 1:1 dos 5 Eixos (`Hoje | Curso | Currículo | Acervo | O CAGP`) vs. **V.B** Frequência + `"Todos"` | Aprovada a **Hipótese V.A (Simetria 1:1 dos 5 Eixos)**: coerência taxonômica total com breadcrumbs, eliminando orfandade de rotas no PWA Standalone. |

---

## 5. Key Decisions & Staging for Next Steps (Decisões Consolidadas no `/grill-me`)

### Decisões Validadas e Travadas pelo Usuário (`/grill-me`)
1. **Remoção e Decomissionamento do Espelho N-20229 em [acg.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd):**
   - Eliminar os botões `#btn-gerar-resumo-n20229`, `#btn-gerar-resumo-n20229-bottom`, o modal, o container `#cagp-n20229-print-sheet`, a `<textarea id="cagp-n20229-sei-textarea">` e as funções JS `openResumoN20229Modal()`, `buildResumoN20229Data()`, `renderMirrorHtml()` e `syncPrintSheet()`.
   - Limpar regras poluídas de `@media print` em [styles.css](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css) (linhas 9618–9653), restabelecendo impressão nativa limpa.
   - Manter [acg.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd) focado e sólido em sua tríade essencial: (1) Calculadora 600h interativa, (2) Guardião de 120 Dias, e (3) Guia oficial com links diretos aos formulários PDF e DOCX autênticos do Colegiado.
2. **Linguagem Visual e Fim do Over-Boxing (Eixo IV — Hipótese IV.A: *Brite Institucional Refinado*):**
   - Preserva o DNA Brite (`Oswald` caixa-alta nos títulos e bordas estruturais `1px` escuras), eliminando caixas aninhadas redundantes e restringindo borda `2px` + sombra deslocada exclusivamente aos botões de ação primária.
   - Declara explicitamente `brand: _brand.yml` e `theme: [brand, _variables.scss]` em [_quarto.yml](file:///home/gsathler/Nextcloud/Projects/cagp/_quarto.yml), remove jargões técnicos da interface pública, corrige o grafo SVG/pinos órfãos, sana as 5 falhas WCAG AA e blinda o modo Alto Contraste AAA (`#000000` / `#FFFF00`).
3. **Sub-Views Móveis `.cagp-workspace-bar` (Eixo III — Hipótese III.B: *Controle Segmentado 100% Visível, 0 Scroll*):**
   - Substitui o trilho cortado por controle segmentado / grade compacta com **100% das sub-views visíveis simultaneamente e zero rolagem horizontal** entre `360px` e `1440px`, mantendo intactos os seletores `.cagp-workspace-bar`, `.cagp-workspace-tab[data-ws-tab]` e `.cagp-workspace-view[data-ws-view]` do roteador SPA.
4. **Destilação da 1ª Dobra `y < 300px` e Hierarquia Single-Header (Eixo II — Hipótese II.B Completa):**
   - Banner `#quarto-announcement` compacto por padrão em `< 768px`, Regra do Cabeçalho Único (eliminando `H1 + H2 + H3` e adotando Fenced Divs Quarto), notas normativas longas recolhidas em `<details>` com sumário autoexplicativo (**Zero Supressão Factual**), faixa offline inline de 1 linha substituindo `#cagp-spotify-vault` em [documentos.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/documentos.qmd) e HUD compacto de 2 barras substituindo o painel de `420px` no topo de [acg.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd).
5. **Navegação Global Unificada, Avatar Único e Central de Alertas (Eixo V — Hipótese V.A: *Simetria 1:1 dos 5 Eixos Canônicos*):**
   - Unifica a barra inferior entre Web Mobile e PWA Standalone nos **5 Eixos Canônicos** (`Hoje | Curso | Currículo | Acervo | O CAGP`) alimentados por fonte única de taxonomia, com faixa contextual de pílulas entre páginas irmãs do mesmo eixo (eliminando a orfandade de 10/14 rotas no PWA Standalone).
   - Fixa o Avatar do Passaporte exclusivamente no canto superior direito (`>= 44×44px`, com confirmação em 2 toques para limpar o cofre), adiciona o Sino de Alertas no cabeçalho reutilizando [`window.cagpOpenCampusSheet()`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-header.html#L521-L576) + `cagp_notifications_prefs_v1` (zero nova chave `localStorage`) e aplica a blindagem matemática/XSS em `refreshVaultData()` e `restoreFromPayload()`.

### Fases de Implementação Técnica
- **Fase 1 (Fundação Brand/CSS, Hardening de Estado & Casca Global 5 Eixos):** `_quarto.yml` (`[brand, _variables.scss]`), Brite Institucional Refinado em `_variables.scss`/`styles.css`, correções WCAG AA/AAA, blindagem de `refreshVaultData()` / `restoreFromPayload()`, Topbar unificada (`>= 44×44px`), Sino de Alertas e Barra Inferior Simétrica dos 5 Eixos + faixa de pílulas irmãs.
- **Fase 2 (Destilação da 1ª Dobra & Controle Segmentado III.B nas Rotas `.qmd`):** Aplicação do template canônico com Fenced Divs, Controle Segmentado zero-scroll e `<details>` sem supressão factual em `documentos.qmd`, `percurso.qmd`, `index.qmd` e páginas irmãs.
- **Fase 3 (Saneamento de `acg.qmd` & Decomissionamento do Espelho):** Remoção completa do modal de espelho, `#cagp-n20229-print-sheet`, funções de geração de texto SEI e limpeza de CSS de impressão; implantação do HUD compacto de 2 barras para a calculadora 600h e links oficiais diretos para os formulários PDF/DOCX.
- **Fase 4 (Resiliência Offline & Validação Automatizada):** Service Worker `sw.js` com timeout `AbortController` `3500ms`, suíte de testes Playwright para verificar layout mobile `360px`, `412px`, `1440px`, contraste e persistência íntegra das 9 chaves de `localStorage`.
