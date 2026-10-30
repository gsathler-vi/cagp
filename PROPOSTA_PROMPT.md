# META-PROMPT & PROTOCOLO DE AUDITORIA DIAGNÓSTICA E BRAINSTORMING EXPLORATÓRIO DO SUPER APP CAGP UFMG

> **⚠️ TRAVA ABSOLUTA DE NÃO-INTERVENÇÃO (NÃO ALTERE O CÓDIGO DE PRODUÇÃO):**
> Este protocolo é estritamente de **diagnóstico factual, auditoria de usabilidade e geração de hipóteses conceituais**.
> Você está **TERMINANTEMENTE PROIBIDO** de editar, criar ou deletar qualquer arquivo do código de produção (`./*.qmd`, `./styles.css`, `./_variables.scss`, `./sw.js`, `./manifest.webmanifest`, `./_quarto.yml`, `./_brand.yml`, `./_includes/*`).
> Qualquer hipótese visual ou funcional deve ser desenvolvida **exclusivamente** em artefatos de documentação em `./_designs/` e protótipos interativos em sandbox via `/generative_ui`.
> Ao concluir as 4 etapas deste documento, você DEVE **PARAR E ACIONAR O `/grill-me`** para validação humana passo a passo de todas as propostas antes de qualquer avanço para `/egm-draft` ou implementação.

---

## 1. MAPA DO REPOSITÓRIO, FONTES DE VERDADE E AMBIENTE

Utilize este mapa de caminhos relativos a partir da raiz do projeto (`./`):

### 1.1 Configuração Global, Estilos e PWA na Raiz (`./`)
- `./_quarto.yml` — Configuração do Quarto CLI (`output-dir: docs`, `lang: pt-BR`, `resources`, headers/footers).
- `./_brand.yml` — Tokens canônicos de identidade visual CAGP (paleta, tipografia `Oswald` + `Inter` + `JetBrains Mono`, logos).
- `./_variables.scss` — Variáveis SCSS do Bootstrap 5.3 e tema Brite.
- `./styles.css` — Folha de estilos principal (tokens CSS, casca do Super App, Workspaces, componentes, animações spring e modos de acessibilidade).
- `./sw.js` — Service Worker v2 (estratégia *Network-First* para HTML/CSS/JS e *Cache-First* para o cofre `cagp-pdfs-oficiais-v1`).
- `./manifest.webmanifest` — Manifesto PWA (`display: standalone`, ícones e shortcuts).
- **Binário do Quarto para compilação:** `/usr/share/positron/resources/app/quarto/bin/quarto` (ou `quarto` no PATH).

### 1.2 As 15 Páginas `.qmd` na Raiz (`./*.qmd` -> compiladas para `./docs/*.html`)
1. `./index.qmd` — Home / Hub Operacional ("Campus Hoje", Passaporte Acadêmico, Bússola, Micro-Apps e Sistemas UFMG).
2. `./curso.qmd` — O Curso de Gestão Pública (Histórico REUNI 2008/2009, CPC 4 MEC, Cientometria, Pesquisa de Egressos, Colegiado e Coordenação).
3. `./pesquisa.qmd` — Hub de Iniciação Científica, Programa de Imersão e os 11 Núcleos e Grupos de Pesquisa do DCP/FAFICH.
4. `./calouros.qmd` — Guia de Sobrevivência do Calouro Noturno (Checklist 30 dias, RU II Setorial, Circulares, Secretaria F-2039, CEAG F-2033, FUMP/PRAE/NAI).
5. `./percurso.qmd` — Percurso Curricular dos 10 Semestres, Grafo Interativo SVG/DAG das 27 obrigatórias e Termômetro dos 3 Percursos (`01-01`, `01-02`, `01-03`).
6. `./optativas.qmd` — Catálogo filtrável das 68 Disciplinas Optativas + 120h de Formação Livre.
7. `./acg.qmd` — Calculadora Interativa de 600h (300h Extensão Res. CEPE 10/2019 + 300h AAC Art. 15), Guardião de 120 Dias, Tabela das 9 Modalidades, Tutorial de Pinos e Gerador de Espelho A4 N-20229.
8. `./estagio.qmd` — Estágio Supervisionado 300h (`DCP 135` 180h + `DCP 136` 120h), Simulador de Dispensa Art. 41 e Tutorial do TCE.
9. `./tcc.qmd` — Trabalho de Conclusão de Curso 180h (`DCP 089` 60h + `DCP 137` 120h), 4 Modalidades Oficiais e Termo de Aceite.
10. `./estagio-tcc.qmd` — Hub rediretor de compatibilidade (`[data-cagp-redirect]`) para manter links legados intactos.
11. `./documentos.qmd` — Cofre Offline dos 8 PDFs Essenciais (`CacheStorage`) + Central de Formulários DRCA/Colegiado/Estágio + Legislação.
12. `./faq.qmd` — Dúvidas Frequentes com busca em tempo real, cards de urgência e declaração de Acessibilidade (`#acessibilidade`).
13. `./sobre.qmd` — O Centro Acadêmico (História, Bruno Giorgi, Regimento 14/10/2024, Princípios LIMPE, Assembleia Geral, Junta Eleitoral, 7 Diretorias e Representação Tripartite).
14. `./gestao.qmd` — Gestão em Exercício & Equipe (Organograma, 7 Diretorias Executivas, Transparência Ativa RREO e Ouvidoria).
15. `./mapa-do-site.qmd` — Mapa panorâmico das 14 rotas em 5 eixos com filtro instantâneo (WCAG 2.4.5).

### 1.3 Casca do Super App e Motores Client-Side (`./_includes/`)
- `./_includes/pwa-meta.html` — Meta tags mobile/PWA, `viewport-fit=cover` e theme-color.
- `./_includes/skip-links.html` — Skip links de acessibilidade (WCAG 2.4.1).
- `./_includes/super-app-header.html` — Barra superior Web (`#cagp-superapp-header`), Topbar Standalone (`#cagp-superapp-topbar`), Drawer Mobile (`#cagp-mobile-drawer`) e relógio/status do campus (`computeCagpCampusState`).
- `./_includes/super-app-router.html` — Roteador SPA client-side, prefetching, View Transitions API, controlador de Sub-Views (`.cagp-workspace-bar` / `.cagp-workspace-view`), skeletons e evento `cagp:navigated`.
- `./_includes/spotlight-search.html` — Busca global Spotlight (`⌘K` / `Ctrl+K`).
- `./_includes/accessibility.html` — Painel modal `#cagp-a11y-panel` (`Alt+A`), escala tipográfica, modo dislexia, régua de leitura, máscara TDAH e Alto Contraste AAA (`#000000` / `#FFFF00`).
- `./_includes/pwa-install.html` — Bottom Tab Bar (`#cagp-mobile-nav` e `#cagp-superapp-tabbar`), Bottom Sheet Global (`#cagp-global-bottom-sheet`), Sheet de Ajustes/Passaporte (`#cagp-settings-sheet`), Passaporte Acadêmico (`cagp_student_profile_v1`), Meu CAGP Sync (`.json` / Base64 `CAGP1:...`), exportação `.ics`, `Web Share API` e motor de notificações locais.
- `./_includes/back-to-top.html` — Botão voltar ao topo, delegação de cópia (`[data-copy]`) e Dynamic Island Toast (`#cagp-toast`).

### 1.4 Imagens e Arquivos de Evidência Anexados na Raiz
- `./a0bca2e3-1b49-4e71-898b-60a330800baa.jpeg` (**Evidência Factual de Problema - Imagem 3**): Print real do celular em `documentos.html` documentando overflow horizontal nas abas, poluição visual (over-boxing) e consumo indevido da 1ª dobra por blocos explicativos.
- `./1000361583.jpg` (**Estudo Ergonômico de Benchmark A - Imagem 1**): Benchmark de densidade de super app (header compacto, avatar/perfil, barra de busca em destaque, card de etapas/jornada, métrica limpa com pílulas horizontais e bento grid).
- `./6cff1478-c95b-4dc2-a175-5aafe64af947.jpeg` (**Estudo Ergonômico de Benchmark B - Imagem 2**): Benchmark de navegação secundária / menu 'Todos' (busca contextual, blocos de atalho e lista categorizada com chevrons).

---

## 2. REQUISITOS INEGOCIÁVEIS DE PRESERVAÇÃO

Antes de qualquer ideação ou análise, fixe estes invariantes:

1. **Zero Supressão Factual:** Nenhum dado factual pode ser removido ou alterado (ementas, artigos regimentais, telefones, e-mails de colegiado/secretarias, cargas horárias, modalidades, regras de integralização e links de formulários/PDFs).
2. **Contrato de Estado Intacto (`localStorage` + `CacheStorage`):** Nenhuma alteração pode corromper ou invalidar os dados salvos pelos estudantes nas 9 chaves:
   - `cagp_calc_ext_aac_v1`
   - `cagp_aac_120d_certs_v1`
   - `cagp_notifications_prefs_v1`
   - `cagp_calouro_checklist_v1`
   - `cagp_percurso_quiz_v1`
   - `cagp_minha_grade_v1`
   - `cagp_art41_checklist_v1`
   - `cagp_a11y_prefs_v2`
   - `cagp_student_profile_v1`
   - Cache offline `cagp-pdfs-oficiais-v1`

---

## 3. CATÁLOGO DAS DORES REAIS E DEFEITOS IDENTIFICADOS

O objetivo primordial do processo é auditar e propor soluções para as seguintes dores concretas:

### 3.1 Falha Crítica na Exportação do Espelho Oficial N-20229 (`acg.qmd`)
- **Comportamento Atual Problemático:** O botão *"Gerar Resumo para Formulário N-20229"* abre um modal e oferece a opção *"Imprimir / Salvar PDF"*, que simplesmente executa `window.print()`. A tentativa de impressão captura a página de forma crua, desorganizada e feia, trazendo restos de interface, backdrops e quebras de página inadequadas.
- **Necessidade Real do Aluno:** O estudante necessita de um espelho formal e limpo para anexar ao processo SEI ou protocolar no Colegiado (Sala F-2039), com formatação institucional A4 (cabeçalho oficial, dados do discente, tabela de horas/créditos calculados por categoria, teto regimental e campo de validação). O brainstorm deve investigar saídas profissionais (ex.: folha `@media print` A4 rigorosamente isolada, gerador de PDF vetorial client-side ou visualizador estruturado para impressão/cópia).

### 3.2 Overflow Horizontal e Oclusão de Abas Móveis (`documentos.qmd` e outros)
- **Evidência:** Conforme comprovado em `./a0bca2e3-1b49-4e71-898b-60a330800baa.jpeg`, a barra `.cagp-workspace-bar` corta elementos para fora da tela (ex.: botão de atos normativos e abas secundárias escondidas sem scroll indicator ou affordance visual clara em telas de `360px` a `412px`).

### 3.3 Consumo Excessivo da 1ª Dobra (Falta de Conteúdo Imediato)
- Páginas como `documentos.qmd`, `acg.qmd` e `percurso.qmd` gastam praticamente todo o primeiro viewport móvel com muros de texto explicativo, badges redundantes e metadados técnicos (como nomes de chaves de cache), forçando o aluno a rolar extensivamente para acessar os PDFs ou a calculadora.

### 3.4 Over-boxing e Poluição Visual
- Excesso de caixas aninhadas dentro de caixas, com bordas pretas pesadas e sombras duras em todos os elementos secundários, gerando cansaço visual e sufocamento da interface em telas móveis.

### 3.5 Inconsistências de Navegação e Perfil
- Duplicação do avatar do usuário em diferentes pontos sem papel ergonômico claro, ausência de uma Central de Notificações acessível no cabeçalho e ausência de uma visualização agregadora ("Todos / Menu Completo") para acesso rápido às 14 rotas.

---

## 4. MATRIZ DE ORQUESTRAÇÃO: EGM BRAINSTORM, SKILLS E FERRAMENTAS

O `/egm-brainstorm` atuará como maestro da ideação, operando através de uma **Orquestração Matricial** onde subagentes especializados assumem lentes que consultam as skills locais em `.agents/skills/` e as ferramentas de ambiente:

| Subagente EGM (Lente) | Skills & Referências Associadas (`.agents/skills/`) | Missão e Foco de Análise |
| :--- | :--- | :--- |
| **`egm-design`** | `impeccable` (`SKILL.md`, `references/shape.md`, `references/distill.md`), `apple-design` (`SKILL.md`, `references/hig/layout.md`, `materials.md`, `sheets.md`), `m3-expressive` (`tokens.md`, `shape.md`, `containment.md`) | Avaliar ergonomia de super app, hierarquia visual, contenção tonal vs. over-boxing, áreas de toque (min 44x44pt) e transição de estados. |
| **`egm-zoom-out`** | `impeccable` (`references/distill.md`, `references/quieter.md`), `apple-design` (`design-principles.md`) | Eliminar excesso de complexidade e ornamentação inútil. Questionar a necessidade de cada caixa, badge e texto redundante na primeira dobra. Princípio YAGNI. |
| **`egm-codebase-details`** | `quarto-authoring` (`SKILL.md`, `references/layout.md`), `brand-yml` (`SKILL.md`, `_brand.yml`, `_variables.scss`) | Garantir compatibilidade absoluta com o pipeline do Quarto CLI v1.9+, integridade dos tokens SCSS/CSS existentes e aderência à marca oficial CAGP. |
| **`egm-structural`** | `quarto-authoring` (`references/divs-and-spans.md`), `impeccable` (`references/typeset.md`, `references/layout.md`) | Estrutura de documentos, hierarquia de cabeçalhos semânticos (`h1`-`h4`), fluxo de renderização e organização modular das sub-views. |
| **`egm-comprehension`** | `alt-text` (`SKILL.md`), `apple-design` (`references/hig/accessibility.md`) | Acessibilidade cognitiva, WCAG AAA, clareza de redação discente, redução de jargões técnicos expostos (ex.: `cagp-pdfs-oficiais-v1`) e garantia de textos alternativos. |
| **`egm-implementation-readiness`** | `impeccable` (`references/harden.md`), `m3-expressive` (`references/platforms.md`) | Viabilidade técnica imediata, tolerância a falhas offline, tratamento de exceções e clareza de execução sem pontas soltas. |
| **Ferramenta `/browser`** | Auditoria Empírica de DOM | Inspecionar `./docs/` em viewports reais (`360px`, `375px`, `412px`, `768px`, `1440px`), capturando a realidade do layout, cortes horizontais e falha do `window.print()`. |
| **Ferramenta `/generative_ui`**| Sandbox de Prototipagem Interativa | Gerar artefatos HTML isolados (com Tailwind CSS) para testar na prática soluções interativas para as dores levantadas (ex.: novo espelho A4, primeira dobra limpa, navegação). |

---

## 5. ROTEIRO DE EXECUÇÃO EM 4 ETAPAS (COM OS 4 ENTREGÁVEIS)

Execute estritamente o roteiro abaixo, produzindo os **4 entregáveis isolados** na pasta `./_designs/` (para não poluir o build do Quarto) e parando no Gate Final:

### ETAPA 1: Auditoria Empírica com `/browser` e Scripts Técnicos
1. Suba o servidor local ou navegue pelas páginas compiladas em `./docs/` utilizando `/browser`.
2. Inspecione minuciosamente:
   - A página `docs/acg.html`: simule horas e acione o botão de resumo N-20229 e a rotina de impressão para registrar as falhas estruturais do `window.print()`.
   - A página `docs/documentos.html` nos viewports `360px` e `412px`: documente o corte da barra de abas e o consumo da primeira dobra (confrontando com `./a0bca2e3-1b49-4e71-898b-60a330800baa.jpeg`).
   - Analise os benchmarks `./1000361583.jpg` e `./6cff1478-c95b-4dc2-a175-5aafe64af947.jpeg` como padrões ergonômicos de estudo comparativo.
3. **ENTREGÁVEL 1:** Salve `./_designs/diagnostico_auditoria.md` com a evidência factual, métricas de corte, problemas de contraste e diagnóstico da ferramenta de exportação do espelho.

### ETAPA 2: Brainstorming Matricial com `/egm-brainstorm`
1. Acione o fluxo do `/egm-brainstorm` invocando a matriz de subagentes com suas respectivas skills associadas.
2. Formule hipóteses abertas para solucionar cada problema diagnosticado, considerando:
   - Como transformar o Espelho Oficial N-20229 em um documento institucional de padrão SEI/Colegiado impecável na impressão e no compartilhamento digital.
   - Como limpar a 1ª dobra das páginas centrais colocando o conteúdo útil acessível no primeiro olhar.
   - Como solucionar a navegação de abas móveis eliminando cortes horizontais.
   - Como estruturar o cabeçalho e navegação inferior ergonômica sem impor uma identidade única a priori.
3. **ENTREGÁVEL 2:** Salve `./_designs/propostas_brainstorm_egm.md` contendo as hipóteses geradas, os contrapontos dos subagentes e alternativas analisadas.

### ETAPA 3: Laboratório de Prototipagem Interativa com `/generative_ui`
1. Para as principais hipóteses emergentes, crie artefatos HTML ricos e isolados no diretório de artefatos Antigravity utilizando o `/generative_ui`.
2. Construa protótipos interativos focados nas dores resolvidas:
   - Protótipo A: Solução para visualização, conferência e exportação/impressão A4 do Espelho N-20229.
   - Protótipo B: Nova 1ª dobra e barra de sub-views sem corte para a página de Documentos e ACG.
   - Protótipo C: Alternativas conceituais para navegação e ergonomia do Super App (Home, Busca, Notificações e Menu Completo).
3. **ENTREGÁVEL 3:** Registre os links dos protótipos gerados e suas descrições funcionais em `./_designs/galeria_prototipos.md`.

### ETAPA 4: Síntese Consolidada do RFC
1. Consolide os aprendizados da auditoria, do brainstorming e dos protótipos em um documento formal de síntese RFC.
2. **ENTREGÁVEL 4:** Salve `./_designs/concepts_brief.md` seguindo a estrutura canônica do EGM (Visão Geral, Análise Matricial, Objetivos vs. Não-Objetivos, Alternativas Rejeitadas e Decisões Prontas para Avaliação).

---

## 6. GATE DE PARADA OBRIGATÓRIA (`/grill-me`)

Assim que os 4 entregáveis acima estiverem gerados e salvos em `./_designs/`:

1. **NÃO EDITE NENHUM ARQUIVO DE CÓDIGO.**
2. **NÃO AVANCE PARA O `/egm-draft`.**
3. **ACIONE O COMANDO `/grill-me` NA CONVERSA COM O USUÁRIO:**
   - Apresente um sumário claro dos 4 documentos produzidos.
   - Pergunte uma decisão de cada vez através do `ask_question`.
   - Colha a validação explícita do usuário sobre qual direção conceitual seguir, como resolver o espelho N-20229 e quais protótipos foram aprovados para a futura fase de especificação formal.
