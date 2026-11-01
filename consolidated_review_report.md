# Relatório Consolidado de Revisão Integral (Uninterrupted Full Flow Review)

**Documento Auditado:** [`_designs/refatoracao_astro7_superapp_cagp.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/refatoracao_astro7_superapp_cagp.md) (476 linhas)  
**Divisão Semântica:** FeatureRange (linhas 1..336) | DetailedRange (linhas 337..475)  
**Avaliador:** EGM Synthesizer Persona (Multi-Lens Orchestrator)  
**Status:** Revisão Concluída — Zero Glazing / Rigor Técnico Absoluto  

---

## Sumário Executivo do Review

| Métrica | Valor |
| :--- | :--- |
| **Estágios Executados** | 5 de 5 (Stage 5, Stage 6, Stage 7, Stage 8, Stage 9) |
| **Lentes Ativadas** | `egm-zoom-out`, `egm-comprehension`, `egm-design`, `egm-structural`, `egm-codebase-details`, `egm-implementation-readiness`, `egm-style` |
| **Total de Achados Únicos** | **14 Achados** |
| 🔴 **Blockers (Impeditivos)** | **4 Achados** |
| 🟡 **Major (Alto Risco)** | **6 Achados** |
| 🟢 **Nit (Polimento & Clareza)** | **4 Achados** |
| **Veredito Geral** | **Aprovado com Ressalvas Críticas (Requer Resolução dos 4 Blockers antes do Gate G0)** |

---

# PARTE 1: RELATÓRIOS INDIVIDUAIS POR ESTÁGIO

---

## 1. Stage 5: Initial Zoom Out Report (`zoom_out_report.md`)
**Lente:** `egm-zoom-out`  
**Escopo:** Documento Completo (linhas 1..476)  

### Visão Panorâmica & Alinhamento Estratégico
O RFC propõe a substituição estrutural do Quarto pelo framework Astro 7, motivado pela saturação de contexto do modelo Gemini 3.8 Flash High Thinking diante de arquivos monolíticos (144 KB) e pela fragilidade do roteador SPA manual em JavaScript puro (`super-app-router.html`).
Estrategicamente, a escolha do Astro 7 é sólida: preserva o custo zero de hospedagem no GitHub Pages, mantém a geração estática como pilar e elimina servidores ativos, atendendo aos princípios inegociáveis de governança discente do CAGP.

### Achados Estratégicos Críticos:
1. **[BLK-01] Vácuo Técnico no Precaching do Service Worker para Bundles Hashed do Vite:**
   - O RFC prescreve um Service Worker artesanal em `public/sw.js` com precaching estático de assets e timeout de rede de 2.5s (Meta 5, linhas 46-47, 252-260 e Gate G4, linhas 464-465).
   - O Quarto gerava assets estáticos com nomes imutáveis (`styles.css`, `site_libs/...`). Em contraste radical, o Astro 7 compila via Vite, gerando hashes de conteúdo dinâmicos nos nomes de arquivos (ex.: `/_astro/index.B8x19a.js`, `/_astro/Calculator600h.9c3f2.css`).
   - Um arquivo `public/sw.js` cru não possui conhecimento dos hashes em tempo de build. Sem uma integração formal (como `@vite-pwa/astro` ou script pós-build de injeção de manifesto de assets), o Service Worker falhará no precache dos chunks React e do CSS, quebrando completamente a operação offline no campus da UFMG sob condição de Lie-Fi.
2. **[BLK-02] Quebra da Taxonomia Canônica: Invenção da 16ª Rota (`configuracoes.astro`):**
   - O AGENTS.md (Cláusula Pétrea 2 e Seção 3.1) e o próprio RFC (Meta 1, linhas 38 e 78-83) estabelecem estritamente a **simetria de 15 rotas** (14 ativas + 1 rota-ponte legada `estagio-tcc.html`).
   - Todavia, na Seção 7.2 (linha 206) e Seção 9.3 (linha 422), surge um arquivo novo: `src/pages/configuracoes.astro` (Passaporte Discente e Painel de Acessibilidade), totalizando 16 rotas.
   - Isso quebra o teste de contagem do `mapa-do-site.astro` ("14 Páginas ativas"), rompe a simetria dos 5 Eixos e colide frontalmente com a arquitetura descrita nas linhas 26-28 do RFC anterior e linha 216 do RFC atual, onde Configurações e Passaporte foram definidos como **Bottom Sheets modais acionados globalmente pela Topbar** (`#cagp-settings-sheet`, `#cagp-a11y-panel`), e não rotas de página inteira.
3. **[MAJ-05] Risco de Deploy no GitHub Pages: Conflito de Pasta de Build (`dist/` vs `docs/`):**
   - Na linha 475, o documento anota: `site estático gerado em docs/ (ou dist/)`.
   - Se o repositório estiver configurado no GitHub para servir a branch `main` na pasta `/docs`, o build padrão do Astro (que gera em `dist/`) deixará o site desatualizado ou em branco. O RFC precisa travar expressamente `outDir: './docs'` ou atualizar o workflow do GitHub Actions.

---

## 2. Stage 6: Comprehension Test Report (`comprehension_report.md`)
**Lente:** `egm-comprehension`  
**Escopo:** FeatureRange (linhas 1..336) & DetailedRange (linhas 337..475)  

### Análise de Carga Cognitiva & Interpretabilidade
O documento é técnico, bem escrito e contextualizado na realidade discente da FAFICH. Contudo, foram identificadas ambiguidades críticas que forçarão agentes autônomos ou desenvolvedores a adivinhar intenções de design.

### Achados de Compreensão:
1. **[MAJ-04] Indefinição das Diretivas de Hidratação das Ilhas (`client:load` vs `client:idle` vs `client:visible`):**
   - Na linha 122 e linha 45 do brief, as ilhas reativas são rotuladas genericamente como `client:idle / client:visible`.
   - Na Seção 9.4 (linhas 433-454), não há especificação precisa para cada componente:
     - `BottomSheet.tsx`: Se hidratado com `client:idle`, um toque imediato do estudante no Sino de Alertas ou Avatar logo após o carregamento da página pode falhar por falta de listener tátil ativo. Deve ser `client:load`.
     - `LinearHud.tsx`: Precisa estar disponível no topo imediatamente na aba da calculadora (`client:load`).
     - `CurriculumGraph.tsx`: Sendo um nó SVG pesado, deve carregar com `client:visible` para evitar bloqueio da thread principal, mas com esqueleto de layout para prevenir Cumulative Layout Shift (CLS).
2. **[MAJ-02] Falha de Ergonomia nos Detents: Unidade `vh` vs `dvh` e Safe Area no iOS Safari:**
   - As linhas 42 e 216 prescrevem detents em `50vh` e `90vh`.
   - Em dispositivos móveis (especialmente iOS Safari em modo navegador e PWA), o uso de `vh` ignora a barra de endereços retrátil dinâmica e causa saltos bruscos na altura da folha modal. A unidade correta obrigatória é `dvh` (`50dvh` e `90dvh`).
   - Além disso, falta a exigência de `padding-bottom: env(safe-area-inset-bottom)` no container da folha para afastar os botões de ação da barra de navegação gestual do iPhone (Home Indicator).
3. **[NIT-03] Omissão da Estratégia de Ícones:**
   - O documento menciona "Sino de Alertas", "Avatar 44px" e os ícones dos 5 eixos (`bi-compass`, `bi-mortarboard`, etc.), mas não detalha se os ícones serão importados via CSS do Bootstrap Icons (como no Quarto), via pacote `astro-icon`, `lucide-react` ou SVGs embutidos.

---

## 3. Stage 7: Critic Review Report (`critic_report.md`)
**Lentes:** `egm-design`, `egm-structural`, `egm-style`  
**Escopo:** FeatureRange (linhas 1..336)  

### 3.1. Crítica de Design e Ergonomia (`egm-design`)
- **Conformidade Apple HIG:** A especificação de alvos de toque `>= 44×44px` (ideal `48×48px`), inputs com `font-size: 16px` (`text-base`) para bloquear auto-zoom e curva de física `cubic-bezier(0.32, 0.72, 0, 1)` está exemplar.
- **Microinterações:** A menção de `active:scale-[0.98]` (linha 75) deve vir acompanhada da restrição de aceleração por hardware (`transform: scale(...)` com `will-change: transform`) para não induzir recálculo de layout no bento grid de `index.astro`.

### 3.2. Crítica Estrutural e Integridade de Domínio (`egm-structural`)
- **[MAJ-01] Incompatibilidade de Schemas Zod com o Cofre Discente (AGENTS.md):**
  - Na tabela da Seção 7.6 (linhas 265-275):
    - `cagp_notifications_prefs_v1` foi simplificado para `z.object({ ru1815, circular2230, aac120d })`, omitindo a propriedade obrigatória `lastFired` (usada no Service Worker para rate limiting de notificações de horário do Circular e RU).
    - `cagp_student_profile_v1` omite campos complementares previstos no AGENTS.md.
    - `cagp_art41_checklist_v1` define `z.record(z.string(), z.boolean())`, mas não amarra as chaves exatas dos itens de dispensa (`disp_1` a `disp_4`), arriscando corromper a persistência existente.
  - **Impacto Severo:** Se o schema Zod do Astro for mais estrito ou diferente do formato gravado pelo portal legado no `localStorage`, a função `safeParse()` falhará e resetará os dados salvos do discente, violando a Cláusula Pétrea de compatibilidade retroativa.

### 3.3. Crítica de Estilo e Padrões (`egm-style`)
- **[NIT-04] Mistura de Idiomas nos Cabeçalhos:**
  - Títulos de seção misturam inglês técnico ("Overview", "The Problem", "Goals", "Non-Goals", "Critical User Journeys") com texto e subtítulos em português formal. Para aderência ao padrão institucional do CAGP, recomenda-se unificar ou manter padrão bilíngue explícito.

---

## 4. Stage 8: Intermediate Zoom Out Report (`intermediate_zoom_out_report.md`)
**Lente:** `egm-zoom-out`  
**Escopo:** Documento Completo (linhas 1..476)  

### Reavaliação Pós-Crítica & Riscos de Transição
1. **[MAJ-06] Complexidade YAGNI do Módulo `pointerGestures.ts` (< 140 linhas):**
   - Implementar uma máquina de estados de arrasto tátil para *bottom sheets* com inércia, detents, limiar de velocidade (*velocity flick* de 0.5 px/ms) e bloqueio de scroll nativo em menos de 140 linhas sem bibliotecas é altamente arriscado.
   - O risco de travar o scroll vertical de listas longas (como na seleção de optativas) dentro da folha modal é elevado.
   - *Recomendação:* Utilizar uma solução desacoplada headless comprovada no ecossistema React (como `vaul` adaptado ou padrão com CSS scroll-snap) ou delimitar rigidamente o escopo de `pointerGestures.ts`.
2. **[MAJ-03] Extravio de Documentos e PDFs Estáticos (`documentos/`):**
   - O portal hospeda formulários oficiais e termos em PDF (ex.: `termo-aceite-orientador-tcc.pdf`, N-20229, requerimentos). No Quarto, eles ficavam na pasta `documentos/`.
   - No Astro, arquivos estáticos servidos sem compilação **devem residir na pasta `public/`**.
   - O plano omite a instrução de migrar `documentos/` para `public/documentos/`. Sem isso, todos os links de download nas páginas `documentos.astro`, `tcc.astro` e `acg.astro` retornarão erro 404.

---

## 5. Stage 9: Implementation Readiness Test Report (`implementation_readiness_report.md`)
**Lentes:** `egm-implementation-readiness`, `egm-codebase-details`, `egm-style`  
**Escopo:** DetailedRange (linhas 337..475)  

### Viabilidade dos Gates e Execução Zero-Decisão
1. **[BLK-03] Violação da Regra de Zero-Decisão: Indecisão na Integração Tailwind:**
   - Na linha 358, o plano dita: `"@tailwindcss/vite (ou @astrojs/tailwind)"`.
   - Na linha 230, a folha `global.css` usa a sintaxe `@theme { ... }` (exclusiva do **Tailwind CSS v4**).
   - O `@astrojs/tailwind` suporta apenas Tailwind v3 e exige `tailwind.config.mjs`. Se o desenvolvedor instalar `@astrojs/tailwind`, o build quebrará imediatamente ao processar `@theme`.
   - **Resolução mandatória:** Eliminar a conjunção alternativa ("ou"). Travar estritamente no **Tailwind v4 via `@tailwindcss/vite`** como plugin do Vite no `astro.config.mjs`, ou no Tailwind v3 com `@astrojs/tailwind`. A sintaxe `@theme` exige `@tailwindcss/vite`.
2. **[BLK-04] Ausência de Dependências e Scripts para Homologação dos Gates:**
   - O Gate G3 (linha 455) estipula: *"Testes unitários comprovam persistência e recuperação correta dos dados do cofre"*.
   - No entanto, a lista de dependências de `package.json` (linha 358) **não inclui `vitest`**, `@testing-library/react` nem biblioteca de CRC32 (ou declaração de função pura zero-dep).
   - Os scripts em `package.json` listam apenas `dev`, `build`, `preview`, `typecheck`. Faltam os scripts `"test": "vitest run"` e `"lint": "eslint ."`.
3. **[NIT-01] Risco de Estouro de Orçamento de Linhas em `CurriculumGraph.tsx` (< 240 linhas):**
   - O Grafo Curricular SVG possui 27 nós, lógica de foco com setas do teclado (*roving tabindex*), cálculo de pré-requisitos e destaque visual de linhas conectoras.
   - Forçar tudo em um único arquivo de 240 linhas pressionará o Gemini 3.8 Flash a compactar código e omitir acessibilidade.
   - *Recomendação:* Decompor em `CurriculumGraph.tsx` (Canvas SVG + navegação ~140 linhas), `CourseNode.tsx` (nó individual ~80 linhas) e `graphLayout.ts` (coordenadas estáticas ~70 linhas).
4. **[NIT-02] Caminho do Arquivo de Configuração do Content Layer no Astro 7:**
   - A linha 368 indica `src/content/config.ts`.
   - No Astro 7 / Content Layer API, a convenção oficial e preferencial é `src/content.config.ts` (na raiz de `src/`).

---

# PARTE 2: DELIVERABLE CONSOLIDADO FINAL

---

## Prioritized Findings (Blockers -> Major -> Nits)

### [BLK-01] Falha de Precaching do Service Worker para Chunks Hashed do Vite
* **Severidade:** 🔴 Blocker
* **Lentes:** `egm-zoom-out`, `egm-codebase-details`, `egm-implementation-readiness`
* **Escopo Afetado:** Linhas 46-47, 138-143, 252-260, 464-465.
* **Descrição da Discrepância:** O Astro 7 gera bundles JavaScript e CSS com sufixos de hash de conteúdo variáveis (ex.: `_astro/chunk.A1b2c3.js`). A especificação de um arquivo `public/sw.js` artesanal com lista de cache estática não consegue mapear esses hashes em tempo de compilação, tornando impossível o precache dos componentes React e das folhas de estilo, o que inutiliza o PWA em modo offline e em conexões Lie-Fi no campus da UFMG.
* **Recomendação & Correção:** Incorporar uma estratégia formal de geração de Service Worker baseada em build, adotando `@vite-pwa/astro` ou criando um script de pós-build (`scripts/generate-sw-manifest.mjs`) que lê o diretório `dist/` gerado e injeta a lista completa de assets hashed no `sw.js` antes do deploy.

---

### [BLK-02] Quebra da Simetria Canônica de 15 Rotas: Invenção de `configuracoes.astro`
* **Severidade:** 🔴 Blocker
* **Lentes:** `egm-structural`, `egm-design`, `egm-zoom-out`
* **Escopo Afetado:** Linhas 38, 78-83, 107-114, 206, 422.
* **Descrição da Discrepância:** O documento introduz a página `src/pages/configuracoes.astro`, elevando a contagem para 16 rotas (15 ativas + 1 ponte), violando a Cláusula Pétrea de simetria 1:1 dos 5 Eixos e a contagem de 14 páginas ativas verificada estaticamente por `mapa-do-site.astro`. Além disso, Passaporte Discente e Acessibilidade já possuem contrato firmado como **Bottom Sheets globais** acionadas pelo Avatar e Topbar (`#cagp-settings-sheet`, `#cagp-a11y-panel`).
* **Recomendação & Correção:** Excluir `src/pages/configuracoes.astro` do plano de páginas. Implementar o Passaporte Discente e os Ajustes de Acessibilidade exclusivamente como Bottom Sheets modais (`PassportSheet.tsx` e `A11ySheet.tsx`) invocadas a partir de `SuperAppHeader.astro`, restaurando o total exato de 14 rotas ativas + 1 rota-ponte = 15 rotas canônicas.

---

### [BLK-03] Indecisão Arquitetural na Integração Tailwind (Quebra da Regra de Zero-Decisão)
* **Severidade:** 🔴 Blocker
* **Lentes:** `egm-codebase-details`, `egm-implementation-readiness`
* **Escopo Afetado:** Linhas 228-248, 358.
* **Descrição da Discrepância:** A linha 358 declara `"@tailwindcss/vite (ou @astrojs/tailwind)"`, forçando o agente de IA a tomar uma decisão arquitetural não guiada. Pior: a folha `global.css` apresentada na linha 230 utiliza a diretiva `@theme`, que é exclusiva do Tailwind v4 e incompatível com `@astrojs/tailwind` (Tailwind v3).
* **Recomendação & Correção:** Eliminar a ambiguidade. Travar expressamente a stack no **Tailwind CSS v4** utilizando a integração `@tailwindcss/vite` como plugin no `astro.config.mjs`, removendo qualquer referência a `@astrojs/tailwind` e `tailwind.config.mjs`.

---

### [BLK-04] Omissão de Dependências de Teste e Validação para o Gate G3
* **Severidade:** 🔴 Blocker
* **Lentes:** `egm-implementation-readiness`, `egm-codebase-details`
* **Escopo Afetado:** Linhas 358, 455, 474.
* **Descrição da Discrepância:** O Gate G3 exige testes unitários automatizados para comprovar a persistência das 9 chaves do `localStorage` e a integridade do algoritmo CRC32 de backup. Contudo, `package.json` não prevê `vitest`, utilitários de DOM/Storage mock nem script `"test"`, inviabilizando o cumprimento formal do critério de aprovação.
* **Recomendação & Correção:** Adicionar `vitest` e `@types/node` às dependências de desenvolvimento em `package.json`, incluir o script `"test": "vitest run"` e documentar a inclusão da função autônoma leve de CRC32 (ou pacote `crc-32`) em `backupVault.ts`.

---

### [MAJ-01] Divergência de Schemas Zod com o Contrato Canônico de `localStorage`
* **Severidade:** 🟡 Major
* **Lentes:** `egm-structural`, `egm-implementation-readiness`
* **Escopo Afetado:** Linhas 265-276, 434-435.
* **Descrição da Discrepância:** A tabela de schemas omite a propriedade essencial `lastFired` na chave `cagp_notifications_prefs_v1` e omite atributos do `cagp_student_profile_v1` presentes no AGENTS.md Seção 4.6. Caso esses campos faltem na validação, o Zod rejeitará dados válidos de alunos existentes no navegador.
* **Recomendação & Correção:** Alinhar rigorosamente todos os schemas Zod de `studentVault.ts` à tabela canônica de 9 chaves do AGENTS.md, garantindo que campos opcionais utilizem `.optional()` ou `.default()` para máxima resiliência retroativa.

---

### [MAJ-02] Falha de Ergonomia e Safe Areas na Folha Modal do iOS Safari
* **Severidade:** 🟡 Major
* **Lentes:** `egm-design`, `egm-comprehension`
* **Escopo Afetado:** Linhas 42-45, 214-225, 387-388.
* **Descrição da Discrepância:** O uso de `vh` nos detents (`50vh`, `90vh`) gera saltos verticais quando a barra de endereços do Safari mobile retrai. Além disso, a ausência de especificação para Safe Area inferior faz com que botões e rodapés da gaveta fiquem sobrepostos pela barra Home Indicator do iPhone.
* **Recomendação & Correção:** Substituir unidades `vh` por `dvh` (`50dvh` e `90dvh`) nas regras de estilo do `BottomSheet.tsx` e injetar explicitamente `padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px))`.

---

### [MAJ-03] Extravio de Formulários Oficiais e PDFs em Rota Estática
* **Severidade:** 🟡 Major
* **Lentes:** `egm-codebase-details`, `egm-structural`
* **Escopo Afetado:** Linhas 403-406, 469-471.
* **Descrição da Discrepância:** No Quarto, os arquivos PDF de formulários e termos residem na pasta raiz `documentos/`. No Astro, o roteador estático serve arquivos não compilados a partir de `public/`. A ausência de instrução para migrar `documentos/` para `public/documentos/` causará links quebrados em toda a plataforma.
* **Recomendação & Correção:** Adicionar à Fase 0 e Fase 2 a tarefa explícita de mover o acervo factual para `public/documentos/`, garantindo que URLs como `/documentos/termo-aceite-orientador-tcc.pdf` continuem respondendo perfeitamente.

---

### [MAJ-04] Indefinição das Diretivas de Hidratação das Ilhas Reativas
* **Severidade:** 🟡 Major
* **Lentes:** `egm-codebase-details`, `egm-comprehension`
* **Escopo Afetado:** Linhas 122-127, 387-388, 440-454.
* **Descrição da Discrepância:** A falta de mapeamento individual de diretivas (`client:load`, `client:idle`, `client:visible`) causa inconsistência na experiência. Se a gaveta modal `BottomSheet.tsx` aguardar `client:idle`, um clique rápido do aluno no Sino do Campus imediatamente após o carregamento da página será ignorado.
* **Recomendação & Correção:** Fixar a matriz de hidratação:
  - `BottomSheet.tsx`: `client:load`
  - `LinearHud.tsx`: `client:load`
  - `ExtensionForm.tsx` & `AacForm.tsx`: `client:idle`
  - `Guardian120d.tsx`: `client:visible`
  - `CurriculumGraph.tsx`: `client:visible`
  - `Art41Simulator.tsx`: `client:visible`

---

### [MAJ-05] Conflito de Pasta de Destino do Build para o GitHub Pages (`dist/` vs `docs/`)
* **Severidade:** 🟡 Major
* **Lentes:** `egm-zoom-out`, `egm-implementation-readiness`
* **Escopo Afetado:** Linhas 38, 359-361, 475.
* **Descrição da Discrepância:** O texto oscila entre `docs/ (ou dist/)`. Em deploys no GitHub Pages, divergências na pasta de saída provocam páginas 404 imediatas após o push para a branch de produção.
* **Recomendação & Correção:** Fixar a configuração `outDir: './dist'` em `astro.config.mjs` e padronizar o pipeline de publicação via GitHub Actions oficial (`actions/deploy-pages@v4`), aposentando a publicação legada por pasta de branch.

---

### [MAJ-06] Risco de Usabilidade e Conflito de Gestos em `pointerGestures.ts`
* **Severidade:** 🟡 Major
* **Lentes:** `egm-zoom-out`, `egm-design`
* **Escopo Afetado:** Linhas 188, 224, 438-439.
* **Descrição da Discrepância:** Criar um mecanismo customizado de captura de ponteiro para física de arrasto e detents em menos de 140 linhas frequentemente colide com o scroll nativo de formulários e listas longas no mobile.
* **Recomendação & Correção:** Restringir o manipulador de arrasto vertical exclusivamente à área do *grabber handle* da folha (`.cagp-sheet-grabber`) através da propriedade CSS `touch-action: none`, permitindo que o corpo do modal mantenha `touch-action: pan-y` com rolagem nativa suave e sem conflito de eventos.

---

### [NIT-01] Decomposição do Componente do Grafo Curricular (`CurriculumGraph.tsx`)
* **Severidade:** 🟢 Nit
* **Lentes:** `egm-implementation-readiness`, `egm-style`
* **Escopo Afetado:** Linhas 172, 450-451.
* **Descrição & Recomendação:** A estimativa de 240 linhas para gerenciar o SVG dos 27 nós, o *roving tabindex* e o destaque de pré-requisitos é apertada. Recomenda-se modularizar em `CurriculumGraph.tsx` (~130 linhas), `CourseNode.tsx` (~80 linhas) e `curriculumData.ts` (~80 linhas).

---

### [NIT-02] Padronização do Arquivo de Configuração do Content Layer
* **Severidade:** 🟢 Nit
* **Lentes:** `egm-codebase-details`
* **Escopo Afetado:** Linhas 179, 368.
* **Descrição & Recomendação:** O documento menciona `src/content/config.ts`. No Astro 7, o padrão canônico para a Content Layer API é `src/content.config.ts`. Ajustar o caminho para evitar avisos de depreciação do Astro.

---

### [NIT-03] Especificação Formal da Origem dos Ícones
* **Severidade:** 🟢 Nit
* **Lentes:** `egm-style`, `egm-design`
* **Escopo Afetado:** Linhas 102, 162-164, 384-386.
* **Descrição & Recomendação:** Deixar explícito no `BaseLayout.astro` que a biblioteca Bootstrap Icons continuará sendo importada (via pacote npm ou folha CSS estática) para manter total paridade com as classes canônicas (`bi-*`).

---

### [NIT-04] Harmonização Idiomática dos Cabeçalhos
* **Severidade:** 🟢 Nit
* **Lentes:** `egm-style`
* **Escopo Afetado:** Seções 1, 2, 3, 4, 5, 6, 7, 8, 9.
* **Descrição & Recomendação:** Traduzir os títulos em inglês técnico ("Overview", "The Problem", etc.) para seus equivalentes em português formal ("1. Visão Geral", "2. Diagnóstico do Problema"), alinhando o tom ao AGENTS.md.

---

## Traceability Matrix (Matriz de Rastreabilidade Técnica)

| ID | Achado | Severidade | Estágios / Lentes | Seção / Linhas | Cláusula / Requisito Canônico | Ação Recomendada |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **BLK-01** | SW Precache falha com bundles hashed do Vite | 🔴 Blocker | Stage 5 & 9 (`zoom-out`, `codebase-details`) | Linhas 46-47, 252-260, 464-465 | Cláusula Pétrea 2 (Operação Offline Resiliente) | Integrar `@vite-pwa/astro` ou manifest injection no build |
| **BLK-02** | Invenção da 16ª Rota (`configuracoes.astro`) | 🔴 Blocker | Stage 5 & 7 (`structural`, `design`) | Linhas 38, 78-83, 206, 422 | Cláusula Pétrea 2 (Simetria 1:1 dos 5 Eixos / 15 Rotas) | Remover rota e converter para Bottom Sheets globais |
| **BLK-03** | Indecisão Tailwind: `@tailwindcss/vite` ou `@astrojs/tailwind` | 🔴 Blocker | Stage 9 (`implementation-readiness`, `codebase-details`) | Linhas 228-248, 358 | Cláusula Pétrea 4 (Regra de Zero-Decisão) | Travar estritamente em Tailwind v4 via `@tailwindcss/vite` |
| **BLK-04** | Omissão de `vitest` e scripts de teste no Gate G3 | 🔴 Blocker | Stage 9 (`implementation-readiness`) | Linhas 358, 455, 474 | Governança de Qualidade (Gates Formais G0..G4) | Adicionar `vitest`, `crc-32` e script `"test"` no `package.json` |
| **MAJ-01** | Schemas Zod divergentes do AGENTS.md | 🟡 Major | Stage 7 (`structural`) | Linhas 265-276, 434-435 | Cláusula Pétrea 2 (Cofre Discente 9 Chaves) | Alinhar contratos Zod e incluir campos como `lastFired` |
| **MAJ-02** | Unidades `vh` e Safe Area no iOS Safari | 🟡 Major | Stage 6 & 7 (`design`, `comprehension`) | Linhas 42-45, 214-225 | Camada 2 Apple HIG (Ergonomia Mobile) | Adotar `dvh` e padding inferior com `env(safe-area-inset-bottom)` |
| **MAJ-03** | Arquivos estáticos e PDFs fora de `public/` | 🟡 Major | Stage 8 (`zoom-out`, `codebase-details`) | Linhas 403-406, 469-471 | Cláusula Pétrea 1 (Integridade Factual dos PDFs) | Mover `documentos/` para `public/documentos/` |
| **MAJ-04** | Falta de mapeamento estrito das diretivas `client:*` | 🟡 Major | Stage 6 & 9 (`codebase-details`, `comprehension`) | Linhas 122-127, 440-454 | Performance & Hidratação Seletiva | Travar `client:load` para sheets/HUD e `client:visible` no grafo |
| **MAJ-05** | Ambiguidade no output de deploy (`dist/` vs `docs/`) | 🟡 Major | Stage 5 & 9 (`zoom-out`, `implementation-readiness`) | Linhas 38, 359, 475 | Hospedagem Custo Zero GitHub Pages | Fixar `outDir: './dist'` e workflow GitHub Actions |
| **MAJ-06** | Conflito de eventos de toque em `pointerGestures.ts` | 🟡 Major | Stage 8 (`zoom-out`, `design`) | Linhas 188, 224, 438-439 | Camada 2 Apple HIG (Interação Tátil Fluida) | Isolar arrasto no *grabber handle* com `touch-action: none` |
| **NIT-01** | Orçamento de linhas apertado em `CurriculumGraph.tsx` | 🟢 Nit | Stage 9 (`implementation-readiness`) | Linhas 172, 450-451 | Regra de Ouro (< 300 Linhas p/ LLM Context) | Decompor em `CurriculumGraph`, `CourseNode` e `layout` |
| **NIT-02** | Caminho depreciado do Content Layer (`src/content/config.ts`) | 🟢 Nit | Stage 9 (`codebase-details`) | Linhas 179, 368 | Padrões Arquiteturais Astro 7 | Atualizar para `src/content.config.ts` |
| **NIT-03** | Omissão da fonte de ícones Bootstrap | 🟢 Nit | Stage 6 (`style`) | Linhas 102, 162, 384 | Identidade Visual Brite Institucional | Declarar import de Bootstrap Icons no `BaseLayout.astro` |
| **NIT-04** | Mistura bilíngue de cabeçalhos de seção | 🟢 Nit | Stage 7 (`style`) | Cabeçalhos Seções 1 a 9 | Clareza e Documentação Institucional | Harmonizar títulos em português formal |

---

## Conclusão e Próximos Passos Recomendados

O documento de design técnico `refatoracao_astro7_superapp_cagp.md` possui excelente profundidade conceitual e acerta no diagnóstico de transição da stack Quarto para Astro 7.
Contudo, para garantir uma implementação 100% autônoma, segura e sem regressões pelo Gemini 3.8 Flash High Thinking, é **mandatório incorporar as correções dos 4 Blockers** diretamente no documento antes da abertura da branch de trabalho e execução do Gate G0.
