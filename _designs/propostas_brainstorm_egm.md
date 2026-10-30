# Matriz de Hipóteses e Brainstorming Multi-Lente EGM — Super App CAGP UFMG

> **Escopo e Governança:** Documento conceitual da **Etapa 2** gerado por orquestração paralela de 6 subagentes especialistas (`egm-design`, `egm-zoom-out`, `egm-codebase-details`, `egm-structural`, `egm-comprehension`, `egm-implementation-readiness`), fundamentado nas skills locais em [`.agents/skills/`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills) e nas métricas empíricas de [diagnostico_auditoria.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/diagnostico_auditoria.md). Nenhum arquivo de produção foi alterado.

---

## 1. Síntese da Matriz de Lentes e Restrições Descobertas

| Lente EGM | Skills Consultadas | Achado Estruturante para a Ideação |
| :--- | :--- | :--- |
| **`egm-design`** | [`impeccable`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/impeccable/SKILL.md) (`distill`, `quieter`, `shape`), [`apple-design`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/apple-design/SKILL.md), [`m3-expressive`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/m3-expressive/SKILL.md) | A fadiga visual decorre da aplicação uniforme de bordas `2px solid #0A0A0A` e sombras duras (`4px 4px 0`) sobre 4–5 níveis de wrappers. A primeira dobra móvel exige teto estrito de `y < 300px` até o primeiro controle acionável. |
| **`egm-zoom-out`** | Arquitetura Minimalista & Reuso | O código atual já contém motores prontos subutilizados: [`window.cagpOpenCampusSheet()`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-header.html#L521-L576) agrega status do RU II, Circular, Secretaria F-2039 e alertas de 120 dias; [`window.cagpShare()`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L1746-L1788) encapsula `Web Share API` com fallback de área de transferência; [mapa-do-site.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/mapa-do-site.qmd) já cataloga as 14 rotas em 5 eixos com busca instantânea. |
| **`egm-codebase-details`** | [`quarto-authoring`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/quarto-authoring/SKILL.md), [`brand-yml`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/brand-yml/SKILL.md) | [_quarto.yml](file:///home/gsathler/Nextcloud/Projects/cagp/_quarto.yml#L29-L31) não declara `brand: _brand.yml` nem `[brand, _variables.scss]`, gerando dupla importação de fontes e deriva de tokens. O roteador SPA ([super-app-router.html](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-router.html#L238-L295)) sobrescreve `document.body.className` a cada troca de página e exige *hoisting* explícito de elementos de casca para `document.body` + registro em `shellIdsToRemove`. |
| **`egm-structural`** | [`divs-and-spans.md`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/quarto-authoring/references/divs-and-spans.md), [`typeset.md`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/impeccable/reference/typeset.md), [`layout.md`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/impeccable/reference/layout.md) | A comparação direta com o PDF oficial [requerimento-atividade-integralizadora-credito-v20229.pdf](file:///home/gsathler/Nextcloud/Projects/cagp/documentos/requerimento-atividade-integralizadora-credito-v20229.pdf) revelou divergência nos códigos SIGA (`DCP 040`/`041` legados vs. `DCP108`–`DCP208` vigentes), fusão indevida de `DCP204` (30h) + `DCP205` (30h) em `aac_4` travada em 30h, ausência do canhoto destacável `RECIBO` e mistura entre disciplinas curriculares SIGA (`DCP 195`/`196`) e acreditação complementar N-20229 (teto global de 300h / 20 cr). |
| **`egm-comprehension`** | [`alt-text`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/alt-text/SKILL.md), WCAG 2.2 AA/AAA, UX Copy | Identificadas 5 reprovações diretas WCAG AA, bug severo no modo Alto Contraste (`html[data-a11y-contrast="high"]` pinta texto `#FFFF00` sobre cards `#FFFFFF` = `1.07:1`), armadilha de foco de 27 paradas em `<svg id="cagp-grafo-svg" aria-hidden="true">`, botões `.cagp-doc-pin` mortos sem listener JS e vazamento de jargão interno (`cagp-pdfs-oficiais-v1`, `Canvas 256×256 WebP`, `Sub-View:`, `CAGP1:`). |
| **`egm-implementation-readiness`** | [`harden.md`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/impeccable/reference/harden.md), [`platforms.md`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/m3-expressive/references/platforms.md) | `window.print()` é um *no-op* silencioso nas WebViews do Instagram/WhatsApp e não dispara `afterprint` de forma confiável no Android WebAPK. Em [pwa-install.html#L986](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L986), `else totalHours += val` soma qualquer campo extra de `cagp_calc_ext_aac_v1` (como matrícula) às horas do aluno. Em [sw.js#L35-L44](file:///home/gsathler/Nextcloud/Projects/cagp/sw.js#L35-L44), o PDF `v20229` não está pré-cacheado e falta timeout `AbortController` contra *lie-fi* no subsolo da FAFICH. |

---

## 2. Eixo I — Emissão, Verificação e Exportação A4 do Espelho Oficial N-20229 ([acg.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd))

### 2.1 Hipóteses Arquiteturais Avaliadas

#### Hipótese I.A — Isolamento Puro `@media print` In-Page com Hoisting no `<body>`
- **Mecanismo:** Manter o fluxo atual de botão único, mas içar `<div id="cagp-n20229-print-root">` para filho direto de `document.body` e aplicar `body.is-printing-n20229 > *:not(#cagp-n20229-print-root) { display: none !important; }` estritamente dentro de `@media print`, com `@page { size: A4 portrait; margin: 12mm 14mm; }`.
- **Vantagens:** `0 KB` de dependências externas, execução instantânea offline, texto 100% vetorial e selecionável para anexação no SEI, zero risco de tela congelada no Android caso `afterprint` falhe (pois nenhuma regra altera `@media screen`).
- **Contra-argumentos e Limites:** Quando o estudante abre o link do CAGP pela bio do Instagram (`@cagp.ufmg`) ou de um grupo de WhatsApp (WebViews in-app), `window.print()` é ignorado silenciosamente pelo sistema operacional. Além disso, sem uma tela prévia fiel à folha A4, o aluno não consegue revisar ou preencher campos de emissão (Matrícula UFMG, E-mail institucional) antes de acionar o spooler.

#### Hipótese I.B — Janela Popup (`window.open`) ou `<iframe>` Oculto Isolado
- **Mecanismo:** Gerar um documento HTML limpo em memória e injetá-lo em `window.open('', '_blank')` ou `<iframe hidden>` chamando `contentWindow.print()`.
- **Vantagens:** Isola o CSS do Espelho das regras de Bootstrap, Brite e modos de acessibilidade (`data-a11y-contrast="high"`, `data-a11y-font="xl"`).
- **Contra-argumentos e Limites (Rejeitada por `egm-implementation-readiness`):** `window.open` rompe o modo `display: standalone` em PWAs instalados no iOS/Android e é bloqueado em WebViews. Já `iframe.contentWindow.print()` com `display: none` falha no Safari/WebKit e, em diversas builds do Chrome Android, imprime a `top.window` em vez do `iframe`.

#### Hipótese I.C — Gerador Client-Side de Binário PDF (`jsPDF` / `pdfmake` / `html2pdf.js`)
- **Mecanismo:** Desenhar programaticamente o arquivo `.pdf` no navegador e disparar `<a download="espelho-n20229.pdf">`.
- **Vantagens:** Entrega um arquivo `.pdf` direto na pasta Downloads em navegadores desktop e Android Chrome sem depender da caixa de diálogo de impressão do sistema.
- **Contra-argumentos e Limites (Rejeitada por `egm-zoom-out` e `egm-implementation-readiness`):**
  1. Adiciona `350 KB` a `750 KB` de JavaScript + `~150 KB` de fonte TTF Unicode Base64 (as fontes padrão WinAnsi do `jsPDF` corrompem caracteres acentuados e símbolos regimentais `§`, `º`, `•`).
  2. Se carregado via CDN externo, falha 100% offline porque [sw.js#L140](file:///home/gsathler/Nextcloud/Projects/cagp/sw.js#L140) ignora origens externas; se embutido em `CORE_ASSETS`, infla o pré-cache inicial em redes móveis 4G.
  3. Abordagens via `html2canvas` geram imagem rasterizada borrada e sem texto selecionável para auditoria no SEI; downloads `blob:` falham na WebView do Instagram no iOS.

#### Hipótese I.D — Modo Preview A4 Institucional + `@media print` Hoisted + Cópia SEI + `Web Share API` + Fallback Offline
- **Mecanismo:** Ao clicar em *"Gerar Espelho Oficial N-20229"*, abrir um visualizador estruturado em proporção A4 contendo:
  1. **Campos efêmeros opcionais de protocolo** no topo (`Nº de Matrícula UFMG`, `E-mail @ufmg.br`, `Telefone`, `Observação`), com opção explícita (opt-in) de lembrar matrícula/e-mail em `cagp_student_profile_v1` sem jamais tocar em `cagp_calc_ext_aac_v1`.
  2. **Renderização A4 Institucional Monocromática-Segura** sincronizada com `<div id="cagp-n20229-print-root">` içado no `document.body`, com reset soberano em `@media print` que neutraliza Alto Contraste (`#FFFF00`), zoom `130%` e régua de leitura `#cagp-reading-ruler`.
  3. **Três saídas resilientes simultâneas:**
     - `Imprimir / Salvar PDF A4` (`window.print()` isolado por `body.is-printing-n20229` com destravamento quádruplo: `afterprint`, `matchMedia('print')`, `window.focus` e `cagp:navigated`).
     - `Copiar Minuta Oficial SEI` (bloco `<pre>` auto-expansível sem `<textarea>` truncada).
     - `Compartilhar / Enviar` reutilizando [`window.cagpShare()`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L1746-L1788) (`navigator.share` nativo para WhatsApp/E-mail institucional), acrescido de aviso automático quando detectada WebView in-app (`Instagram` / `WhatsApp`).
- **Contra-argumentos e Limites:** No iOS Safari/Standalone, salvar em PDF via AirPrint exige tocar no ícone de compartilhamento dentro da folha do AirPrint (comportamento nativo da Apple); uma micro-instrução contextual de 1 linha em dispositivos iOS elimina essa fricção.

### 2.2 Reconciliação Normativa Obrigatória do Documento A4 (`egm-structural` + `egm-implementation-readiness`)

Independentemente do layout escolhido, a auditoria do PDF oficial [requerimento-atividade-integralizadora-credito-v20229.pdf](file:///home/gsathler/Nextcloud/Projects/cagp/documentos/requerimento-atividade-integralizadora-credito-v20229.pdf) impõe 5 correções documentais e de resiliência:
1. **Posicionamento Jurídico Correto:** A Página 1 do PDF oficial do Colegiado é um formulário **individual por certificado**; o documento gerado pelo Super App deve intitular-se **Folha de Rosto e Espelho Consolidado de Instrução Processual (Versão Curricular N-20229)**, acompanhado de atalho offline para o formulário oficial.
2. **Alinhamento aos Códigos SIGA Vigentes (`DCP108`–`DCP208`) e Separação de Canais:**
   - Separar **(A) Componentes Curriculares de Extensão via Matrícula SIGA** (`DCP 195` Lab A 90h e `DCP 196` Lab B 90h) de **(B) Acreditação de Atividades Complementares via Requerimento N-20229** (`DCP197`, `DCP199/200`, `DCP193/194`, `DCP187` em Extensão; `DCP186`, `DCP198`, `DCP201/202`, `DCP203`, `DCP204`, `DCP205`, `DCP206`, `DCP207`, `DCP208`, `DCP108–111` em AAC), substituindo os códigos legados `DCP 040` / `DCP 041` de [acg.qmd#L1783-L1784](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd#L1783-L1784) e respeitando o limite global de `300h (20 cr)` de acreditação por requerimento N-20229.
   - Desmembrar `DCP204` (*Grupos de Estudo*, teto 30h) de `DCP205` (*Pesquisa Bibliográfica*, teto 30h), hoje fundidos em `aac_4` com teto único de 30h ([acg.qmd#L1790](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd#L1790)), preservando `aac_4` intacta e adicionando chave opcional retrocompatível `aac_6` para Pesquisa Bibliográfica.
3. **Explicitação Matemática de Excedente Regimental:** Quando a soma bruta ultrapassar `300h` num eixo (até `540h` possíveis em Extensão e `450h` em AAC), imprimir `<tfoot>` discriminando `Soma Bruta Lançada`, `Aproveitamento Máximo Regimental (300h = 20 cr)` e `Excedente não aproveitado por teto (vedada compensação entre eixos)`.
4. **Cabeçalhos Monocromáticos e Canhoto `RECIBO` Destacável:** Substituir `<thead class="table-dark">` (que desaparece quando o navegador desmarca *"Gráficos de segundo plano"*) por cabeçalhos com fundo transparente/claro e filete `1.5pt solid #000`, `thead { display: table-header-group }`, `tr { break-inside: avoid }`, e incluir no rodapé a linha tracejada do canhoto **`RECIBO`** idêntico ao protocolo presencial da Sala F-2039.
5. **Pré-Cache Offline do PDF `v20229` em [sw.js](file:///home/gsathler/Nextcloud/Projects/cagp/sw.js):** Adicionar `'documentos/requerimento-atividade-integralizadora-credito-v20229.pdf'` a `OFFICIAL_PDFS` dentro de `cagp-pdfs-oficiais-v1` (sem alterar a lista `CANONICAL_PDFS` de 8 itens em `documentos.qmd`), adicionar `.catch()` offline para PDFs não cacheados e `AbortController` de `3500ms` no fetch Network-First contra *lie-fi* da rede `eduroam`.

---

## 3. Eixo II — Destilação da 1ª Dobra (`y < 300px`) e Hierarquia Single-Header

### 3.1 Hipóteses Estruturais Avaliadas

#### Hipótese II.A — Compactação Incremental dos Blocos Atuais
- **Mecanismo:** Reduzir `padding`, `font-size` e margens de `.cagp-workspace-header`, `#cagp-spotify-vault` e `#cagp-hours-bank-dashboard`, mantendo todos os cards abertos na posição atual.
- **Vantagens:** Mudança mínima no HTML dos arquivos `.qmd`.
- **Contra-argumentos e Limites:** Mesmo reduzindo paddings em 35%, a presença simultânea do banner `#quarto-announcement` aberto (`128px`), breadcrumbs, 3–4 badges, título `H1`, parágrafo `.cagp-workspace-lead`, barra de abas, `## H2` duplicado, `.cagp-tool-header > h3` triplicado e dashboards de `250px–420px` mantém o primeiro controle acionável em `y ≈ 780px–1.250px` (ainda fora da 1ª dobra móvel de `740px`).

#### Hipótese II.B — Regra do Cabeçalho Único + Barra Inline de 1 Linha + Revelação Progressiva (`<details>`)
- **Mecanismo:** Reestruturar o topo das páginas operacionais seguindo [`distill.md`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/impeccable/reference/distill.md) e [`divs-and-spans.md`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/quarto-authoring/references/divs-and-spans.md):
  1. **Banner Superior (`#quarto-announcement`):** Iniciar em estado compacto de 1 linha (`36px`) por padrão em viewports `< 768px`, expansível sob toque.
  2. **Cabeçalho Único Compacto (`.cagp-workspace-header` ≤ `96px` no mobile):** Em `< 768px`, ocultar a trilha redundante de breadcrumbs e badges decorativos; exibir `<h1>` conciso + 1 subtítulo curto (`line-clamp` opcional ou `<details class="cagp-normative-note">` para notas regimentais longas, garantindo **Zero Supressão Factual**).
  3. **Eliminação do Empilhamento Triplo de Títulos (`H1` → `H2` → `H3`):** Remover o `## H2` redundante em Markdown que antecede `.cagp-tool-box` e promover o título interno de `.cagp-tool-header` a `<h2>` semântico único da sub-view, migrando os wrappers `.cagp-workspace-view` para Fenced Divs nativas do Quarto (`::: {#ws-panel-v1 .cagp-workspace-view ...}`).
  4. **Em [documentos.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/documentos.qmd):** Substituir a caixa `#cagp-spotify-vault` (`256px` de altura, com IDs JS órfãos nas linhas `834-863` e trilha branca vazia que parece campo de busca) por uma **Faixa Inline de Status Offline (`44px`)** integrada logo acima/abaixo do campo de busca (`"8/8 PDFs disponíveis sem internet • [Atualizar acervo]"`), movendo-a para dentro das views `v1`/`v2` (para não poluir o tutorial DRCA da `v3`) e corrigindo a chamada `window.cagpActivateWorkspaceView('v2', { scroll: false })` ([documentos.qmd#L715](file:///home/gsathler/Nextcloud/Projects/cagp/documentos.qmd#L715)). Resultado: busca em `y ≈ 185px` e **1º PDF oficial visível em `y ≈ 255px`** (contra `1.332px` hoje).
  5. **Em [acg.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd):** Condensar `#cagp-hours-bank-dashboard` (`420px`) em um **HUD Adesivo Compacto (`64px`)** com duas barras lineares lado a lado (`Extensão: 0/300h` | `AAC: 0/300h`) + botão direto `Espelho N-20229`, trazendo a 1ª linha da calculadora (`DCP 195`) para **`y ≈ 265px`** (contra `2.272px` hoje).
  6. **Em [percurso.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/percurso.qmd):** Recolher o callout regimental de 145 palavras em um `<details>` com sumário de 1 linha (`"Regra Oficial N-20229: 27 obrigatórias iguais nos 3 percursos — Ler detalhes"`), trazendo os filtros e o grafo/lista para a 1ª dobra.
- **Contra-argumentos e Limites:** Textos orientativos recolhidos em `<details>` têm menor leitura passiva por calouros de 1ª viagem; mitiga-se mantendo o sumário autoexplicativo com a regra-chave já explícita no `<summary>` (ex.: *"15h = 1 crédito • Teto: 300h Extensão + 300h AAC — Ver base legal"*).

---

## 4. Eixo III — Sub-Views Móveis sem Overflow ou Corte Horizontal (`.cagp-workspace-bar`)

> **Invariante do Roteador SPA:** Qualquer solução deve preservar os seletores `.cagp-workspace-bar`, `.cagp-workspace-tab[data-ws-tab]` e `.cagp-workspace-view[data-ws-view]` exigidos por [super-app-header.html#L599-L661](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-header.html#L599-L661) e pela regra `body:has(.cagp-workspace-bar) .cagp-subnav` ([styles.css#L9842](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L9842)).

| Critério | Hipótese III.A — Abas Secundárias Full-Bleed Adesivas (`48px`, Underline `3px`) | Hipótese III.B — Controle Segmentado / Grade Compacta Sem Scroll (`flex-wrap` / Grid) | Hipótese III.C — Trilho de Pílulas com Peek `25%`, Fade Mask e `scroll-snap: proximity` |
| :--- | :--- | :--- | :--- |
| **Geometria em `360px`** | Remove os `112px` de paddings/bordas laterais; ocupa `360px` inteiros (`sticky`), com abas de rótulo curto (`12–16 chars`) e indicador inferior `3px` Borgonha `#9E2424`. | Distribui 2 a 4 sub-views em grade `2×2` ou controle segmentado `100%` visível, zero rolagem horizontal. | Mantém pílulas horizontais em `336px` úteis (`12px` margem lateral), rótulos concisos, `mask-image` de gradiente à direita e 3ª aba sempre ~25% visível (*peek affordance*). |
| **Visibilidade Imediata** | 3 abas cabem 100% sem scroll em `360px` (`documentos`, `acg`, `percurso`); páginas com 4+ abas usam scroll suave com *peek*. | **100% das abas visíveis simultaneamente** em qualquer tela (`360px` a `1440px`), impossibilitando oclusão. | Aba 1 e Aba 2 100% visíveis + metade da Aba 3 visível indicando continuidade horizontal. |
| **Custo Vertical na 1ª Dobra** | Mínimo (`48px` fixos). | `44px` para 2–3 abas; sobe para `84px` (`2×2`) quando há 4 abas (ou 3 abas + `"Ver Tudo"`). | Baixo (`46px` fixos). |
| **Contra-argumento** | Em páginas com 5 pílulas (como `index.qmd`), ainda requer rolagem horizontal se não houver redução do número de abas. | Em zoom A11y `130%` (`data-a11y-font="xl"`), uma grade `2×2` ocupa `~104px` verticais. | Depende de gesto horizontal (`touch-action: pan-x`); usuários com baixa destreza motora preferem opções 100% visíveis sem arraste. |

**Correção comum obrigatória às 3 hipóteses:** Remover o prefixo redundante `"Sub-View:"` (`.cagp-workspace-bar-label`) e os badges internos longos dentro dos botões de aba no mobile, encurtar rótulos verbosos (ex.: `"1. Cofre Offline & Atos (8 PDFs)"` → `"Acervo (8 PDFs)"` | `"Formulários"` | `"Guia DRCA"`), trocar `scroll-snap-type: x mandatory` por `x proximity` com `touch-action: pan-x` e acionar `tab.scrollIntoView({ inline: 'nearest', block: 'nearest' })` na ativação.

---

## 5. Eixo IV — Linguagem Visual, Descompressão do Over-Boxing, `_brand.yml` e Acessibilidade

### 5.1 Três Hipóteses de Identidade Visual e Contenção

#### Hipótese IV.A — *Brite Institucional Refinado* (Evolução Conservadora)
- **Direção:** Preservar a assinatura gráfica editorial/universitária do tema Brite (`Oswald` caixa-alta nos títulos principais + acento Borgonha `#9E2424`), mas reservar borda `2px` e sombra deslocada (`2px 2px 0`) **exclusivamente** a botões de ação primária (`.cagp-btn-primary`) e modais ativos. Containers estruturais descem para `1px solid #D6D3CD` sem sombra, e itens internos usam divisores `1px` (`hairlines`) sem caixas aninhadas.
- **Prós:** Baixo risco de regressão em CSS existente; mantém personalidade própria distinta de apps corporativos genéricos.
- **Contras:** Ainda retém maior peso gráfico de bordas que os benchmarks móveis contemporâneos (`1000361583.jpg`).

#### Hipótese IV.B — *Super App Tonal Clean* (Alinhado aos Benchmarks A e B)
- **Direção:** Inspirada diretamente em [`1000361583.jpg`](file:///home/gsathler/Nextcloud/Projects/cagp/1000361583.jpg), [`6cff1478-c95b-4dc2-a175-5aafe64af947.jpeg`](file:///home/gsathler/Nextcloud/Projects/cagp/6cff1478-c95b-4dc2-a175-5aafe64af947.jpeg) e [`m3-expressive/containment.md`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/m3-expressive/references/components/containment.md): substituir bordas pretas e sombras duras por **hierarquia tonal de superfícies** (fundo base `#F6F5F2`, cards brancos `#FFFFFF` com borda sutil `1px solid rgba(15,23,42,0.08)` e raio `16px`, listas agrupadas com chevrons `›` e divisores internos suaves, tipografia `Inter` predominante com `Oswald` restrita a números/KPIs).
- **Prós:** Reduz drasticamente o ruído cognitivo em telas de `360px`, maximiza área útil de leitura e aproxima a experiência de apps nativos iOS/Android de alta densidade.
- **Contras:** Descaracteriza parcialmente o DNA visual Brite definido originalmente em [`_variables.scss`](file:///home/gsathler/Nextcloud/Projects/cagp/_variables.scss); em projetores de sala de aula mal calibrados na FAFICH, contrastes puramente tonais (`#FFFFFF` sobre `#F6F5F2`) podem perder definição se não acompanhados de filete `1px` perceptível.

#### Hipótese IV.C — *Híbrido Editorial Acadêmico* (Superfícies Tonais + Acentos Estruturais CAGP)
- **Direção:** Combinar a contenção limpa de **IV.B** nos fluxos operacionais densos (listas de PDFs, linhas da calculadora 600h, menu `"Todos"`, formulários — zero sombras duras, agrupamento por superfície `#FFFFFF` sobre papel quente `#F4F1EA` com borda `1px solid #DCD7CD`) com a autoridade tipográfica institucional do CAGP (`Oswald` sem `text-transform: uppercase` forçado em textos longos, filete superior/lateral Borgonha `#8B1E2D` `3px` marcando seções ativas e foco tátil nítido em CTAs).
- **Prós:** Resolve 100% do *over-boxing* documentado em [`a0bca2e3-1b49-4e71-898b-60a330800baa.jpeg`](file:///home/gsathler/Nextcloud/Projects/cagp/a0bca2e3-1b49-4e71-898b-60a330800baa.jpeg) sem transformar o portal estudantil num template genérico sem identidade UFMG/CAGP.
- **Contras:** Exige disciplina clara de tokens em [`_brand.yml`](file:///home/gsathler/Nextcloud/Projects/cagp/_brand.yml) e [`_variables.scss`](file:///home/gsathler/Nextcloud/Projects/cagp/_variables.scss) para que novos componentes saibam quando usar superfície tonal vs. filete de destaque.

### 5.2 Saneamento Técnico Quarto/Brand e Acessibilidade (`egm-codebase-details` + `egm-comprehension`)
1. **Unificação da Pipeline `_brand.yml` → Quarto 1.9:** Declarar explicitamente `brand: _brand.yml` e `theme: [brand, _variables.scss]` em [`_quarto.yml`](file:///home/gsathler/Nextcloud/Projects/cagp/_quarto.yml#L29-L31), removendo o `@import` duplicado do Google Fonts em [`styles.css#L7`](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L7).
2. **Correção das 5 Falhas WCAG AA e Hardening Alto Contraste AAA:**
   - Ajustar `.cagp-a11y-btn-done` (`#16A34A` → `#15803D`, contraste `5.02:1` com branco), status SVG `"✓ Aberto"` (`#059669` → `#047857`, `5.48:1`), `#btn-calc-reset` (`#6B7280` sobre `#F4F5F7` → `#374151`, `9.32:1`), aresta ativa SVG (`#E8A317` → `#B45309`, `5.02:1`) e `.cagp-app-logo-bu` (`#D97706` → `#B45309`).
   - Corrigir `html[data-a11y-contrast="high"]` ([styles.css#L4861-L4898](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L4861-L4898)) incluindo `.cagp-workspace-header`, `.cagp-tool-box`, `.cagp-calc-row`, `.cagp-doc-card` e nós SVG para impedir texto amarelo `#FFFF00` invisível sobre fundo branco `#FFFFFF`, e garantindo bordas explícitas `2px solid #FFFF00` nesse modo mesmo que o tema padrão adote superfícies tonais.
   - Remover `aria-hidden="true"` conflitante de `<svg id="cagp-grafo-svg">` ([percurso.qmd#L156](file:///home/gsathler/Nextcloud/Projects/cagp/percurso.qmd#L156)) ou gerenciar foco por *roving tabindex* (1 parada de Tab em vez de 27).
   - Elevar todos os alvos de toque do cabeçalho/topbar (`32px–36px`) para **`>= 44×44px`** (`48×48px` ideal), religar ou converter em legenda estática os botões `.cagp-doc-pin` sem listener em `acg.qmd`/`estagio.qmd`, e remover jargões técnicos da interface pública (`cagp-pdfs-oficiais-v1`, `Canvas 256×256 WebP`, `Sub-View:`, `CAGP1:`).

---

## 6. Eixo V — Navegação Global, Perfil Único, Central de Notificações e Aba `"Todos"`

### 6.1 Hipóteses de Topologia da Barra Inferior (5 Slots)

#### Hipótese V.A — Simetria Taxonômica Estrita 1:1 com os 5 Eixos Canônicos
- **Abas Inferiores (Web Mobile + PWA Standalone unificados):** `1. Hoje` (`index.html`) | `2. Curso` (`curso.html`) | `3. Currículo` (`percurso.html`) | `4. Acervo` (`documentos.html`) | `5. O CAGP` (`sobre.html`), acompanhadas de um botão de Menu/Diretório no cabeçalho ou faixa de pílulas irmãs no topo de cada eixo (`Grade • Optativas • 600h AAC • Estágio • TCC`).
- **Vantagens:** Coerência 100% entre Breadcrumbs, Dropdowns Desktop, `mapa-do-site.qmd` e Barra Inferior; elimina o falso destaque de `Estágio`/`TCC` sob `"Horas ACG"` e acaba com a orfandade de `sobre.html`/`gestao.html` no PWA Standalone.
- **Contra-argumentos:** Retira a Calculadora 600h (`acg.html`) do acesso direto de 1 toque na barra inferior (passa a exigir 2 toques: `Currículo` → `600h AAC`), embora seja uma das ferramentas mais acionadas ao longo do semestre.

#### Hipótese V.B — Barra Orientada a Tarefas Frequentes + 5ª Aba Agregadora `"Todos"` (Estilo Benchmark B)
- **Abas Inferiores (Web Mobile + PWA Standalone unificados):** `1. Hoje` (`index.html`) | `2. Percurso` (`percurso.html`) | `3. Horas 600h` (`acg.html`, corrigindo a sigla legada `ACG` → `600h` / `AAC`) | `4. Documentos` (`documentos.html`) | `5. Todos` (abre o **Diretório Completo das 14 Rotas** inspirado em [`6cff1478-c95b-4dc2-a175-5aafe64af947.jpeg`](file:///home/gsathler/Nextcloud/Projects/cagp/6cff1478-c95b-4dc2-a175-5aafe64af947.jpeg), com busca contextual no topo, grade de atalhos rápidos e lista categorizada nos 5 Eixos com chevrons `›` — ou navega instantaneamente para `mapa-do-site.html` destilado).
- **Vantagens:** Mantém acesso de **1 toque** às 4 ferramentas operacionais mais usadas pelo discente noturno (`Hoje`, `Percurso`, `Horas 600h`, `Documentos`) e resolve simultaneamente a descoberta universal das 14 rotas no Web Mobile e no PWA Standalone através do hub `"Todos"` (padrão consolidado em super apps móveis e no Apple HIG / M3 Navigation Bar).Quando o aluno estiver em uma rota secundária (ex.: `estagio.html`, `pesquisa.html`, `gestao.html`), a aba `"Todos"` (ou o eixo correspondente, se mapeado de forma transparente) indica localização sem sequestrar um modal de configurações.
- **Contra-argumentos:** Como a barra inferior destaca 4 destinos de alta frequência + `"Todos"`, é essencial que `resolveMobileTabId()` ([super-app-router.html#L76](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-router.html#L76)) destaque `"Todos"` para as 10 rotas não-primárias (em vez de destacar `"Horas 600h"` quando o aluno está em `estagio.html` ou `tcc.html`), evitando dissonância com o breadcrumb.

### 6.2 Convergência Ergonômica de Cabeçalho, Perfil, Notificações e Hardening de Estado

1. **Avatar Único no Topo Direito (`Passaporte Acadêmico`):** Remover o botão duplicado `#cagp-stab-ajustes` da 5ª aba de `#cagp-superapp-tabbar` ([pwa-install.html#L57-L60](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L57-L60)) e manter o Avatar do Passaporte exclusivamente no slot direito do cabeçalho (`>= 44×44px`), tanto em Web quanto em PWA Standalone (espelhando o Benchmark A [`1000361583.jpg`](file:///home/gsathler/Nextcloud/Projects/cagp/1000361583.jpg)).
2. **Central de Notificações Sem Nova Chave de `localStorage` (`Reuso de Código`):** Adicionar o ícone de Sino (`bi-bell`, `44×44px`) com ponto indicador semântico ao lado da Busca e do Avatar no cabeçalho, invocando [`window.cagpOpenCampusSheet()`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-header.html#L521-L576) enriquecida com:
   - Alertas urgentes do Guardião de 120 dias (`cagpGet120dSummary()`);
   - Status ao vivo do campus noturno (`computeCagpCampusState()`: Bandejão RU II 17h30–19h00, último Circular 22h45, expediente Secretaria F-2039);
   - Toggles diretos de lembretes lendo/gravando na chave existente `cagp_notifications_prefs_v1` (com controle opcional `readAt`/`dismissedAt` podado por FIFO estrito de 25 entradas `< 600 bytes`, protegendo o código Base64 `CAGP1:` do limite de truncamento de `65.536` caracteres do WhatsApp).
3. **Blindagem das 9 Chaves `localStorage` e Ciclo de Vida SPA (`egm-implementation-readiness`):**
   - Remover o ramo `else totalHours += val` em [`refreshVaultData()`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L986);
   - Sanitizar via `escapeHtml()` todas as strings interpoladas em `renderMirrorHtml()` e `renderGuardiao120d()`, e validar tipos estruturais em [`restoreFromPayload()`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L2115-L2153);
   - Exigir confirmação em 2 toques (`4s`) no botão destrutivo `#cagp-clear-vault-btn` ([pwa-install.html#L1453](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L1453));
   - Cancelar o `setTimeout` de `220ms` em `window.cagpSheet.open()/close()` ([super-app-header.html#L498](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-header.html#L498)) e limpar listeners/print-root no evento `cagp:navigated`.
