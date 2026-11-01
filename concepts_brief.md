# Brief de Conceitos e Síntese Arquitetural (RFC): Migração Integral do Super App CAGP para Astro 7, React, Tailwind & Ergonomia Apple HIG

* **Author:** EGM Multi-Lens Synthesizer & Antigravity
* **Date:** 2026-10-30
* **Repository Target:** [CAGP UFMG Super App](file:///home/gsathler/Nextcloud/Projects/cagp)
* **Base Template:** [violet-velocity/](file:///home/gsathler/Nextcloud/Projects/cagp/violet-velocity) (Astro 7.4.4 + `@astrojs/react` + Tailwind CSS)
* **Target Engine / LLM:** Gemini 3.8 Flash (High Thinking) no Google Antigravity
* **Design Standards:** Apple Human Interface Guidelines (HIG 2026), Brite Institucional CAGP ([_brand.yml](file:///home/gsathler/Nextcloud/Projects/cagp/_brand.yml)), WCAG 2.2 AAA
* **Status:** Síntese Multi-Lentes Concluída e Aprovada

---

## 1. Overview

O portal discente do Centro Acadêmico de Gestão Pública (CAGP FAFICH/UFMG) será integralmente refatorado, migrando da geração estática com **Quarto** para uma aplicação web moderna baseada em **Astro 7**, **React (TypeScript)** e **Tailwind CSS**.

A refatoração resolve o atrito crítico de desenvolvimento e manutenção enfrentado por agentes autônomos de IA (especificamente **Gemini 3.8 Flash High Thinking**) e desenvolvedores humanos, substituindo arquivos monolíticos de 140 KB com scripts embutidos por uma arquitetura desacoplada, modular e imune à perda de contexto.

O design adota os padrões de ergonomia, física e acabamento do **Apple Human Interface Guidelines (HIG 2026)**, sintetizados com a identidade visual **Brite Institucional Refinado** do CAGP. A aplicação mantém hospedagem com custo zero no **GitHub Pages** e operação **100% offline via PWA**.

---

## 2. Analysis: Síntese Consolidada das 6 Lentes Especializadas

### 2.1. Lente 1: Design & Ergonomia Apple HIG (`egm-design`)
- **Bottom Sheets com Detents Nativos:**
  - Adoção mandatória do padrão iOS com 2 detents naturais: **Medium (~50% viewport)** para leitura rápida (Alertas do Campus, Resumo de Horas AAC) e **Large (~90% viewport)** para fluxos densos (Edição do Passaporte Discente, Configurações de Acessibilidade, Filtro Avançado de Optativas);
  - *Grabber handle* tátil (barra arredondada centralizada de 36×5px, cor `#DFDBD2`, alvo de toque expandido virtual de 44×24px), física de retorno elástico amortecido (`cubic-bezier(0.32, 0.72, 0, 1)`) e descarte por arrasto vertical (*drag-to-dismiss*).
- **Ergonomia Tátil e Regra Anti-Zoom do iOS:**
  - **Font-size >= 16px (`text-base`):** Proibição estrita de campos `<input>`, `<select>` ou `<textarea>` menores que 16px no mobile, eliminando o zoom automático intrusivo do iOS Safari;
  - **Alvos de Toque:** Rigoroso cumprimento de `>= 44×44px` (ideal `48×48px`) para todos os botões, abas, links e nós interativos;
  - **Latência Zero:** `touch-action: manipulation` e metatag `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` sem uso de `user-scalable=no` (preservando o critério WCAG SC 1.4.4).
- **Camada de Marca (Soberania Brite Institucional CAGP):**
  - **Veto a Glassmorphism:** Sem fundos difusos (`backdrop-filter: blur`). Superfícies 100% opacas em Creme Papel (`#FBF8F3`), Superfície (`#F4F1EA`) e Branco Puro (`#FFFFFF`) para máxima legibilidade sob sol aberto no pátio da FAFICH;
  - **Bordas e Sombras:** Bordas estruturais de `1px solid #DFDBD2`. Borda espessa de `2px solid #0A0A0A` e sombra dura `2px 2px 0 #0A0A0A` (sem blur) restritas a: (1) botões primários, (2) aba ativa do controle segmentado e (3) modais/sheets em foco;
  - **Microinterações:** Micro-press elástico (`active:scale-[0.98]`) com fallback instantâneo em `prefers-reduced-motion: reduce`.

### 2.2. Lente 2: Engenharia de Código & Stack Astro 7 (`egm-codebase-details`)
- **Astro `<ClientRouter />` e View Transitions:**
  - Decomissionamento sumário de `super-app-router.html` (33 KB de JS frágil);
  - A barra inferior dos 5 eixos (`Hoje · Curso · Currículo · Acervo · O CAGP`) recebe `transition:persist="main-bottom-nav"`, eliminando qualquer remontagem ou piscar de tela entre navegações;
  - Transições de página com animações de deslize horizontal contextual baseadas na direção do eixo (Avanço = slide esquerda; Recuo = slide direita), respeitando `data-a11y-motion="reduced"`.
- **Ilhas React Reativas vs. Content Collections Estáticas:**
  - **Content Collections (`src/content/`):** 27 disciplinas obrigatórias, 68 optativas, artigos estatutários e normas regimentais validados via Schemas Zod (`z.object({...})`), impedindo compilação com dados corrompidos;
  - **Ilhas React (`client:idle` / `client:visible`):** Isoladas exclusivamente nas ferramentas com estado dinâmico: Calculadora 600h (`Calculator600h.tsx`), Guardião 120 Dias (`Guardian120d.tsx`), Simulador Art. 41 (`Art41Simulator.tsx`) e Grafo SVG (`CurriculumGraph.tsx`). O restante das 15 páginas é gerado em puro HTML estático pelo Astro, reduzindo o bundle JS inicial em > 75%.
- **PWA & Estratégia Anti-Lie-Fi:**
  - Service Worker com timeout estrito de **2.5 segundos** na rede antes de recorrer ao cache local, garantindo resposta instantânea quando a rede Wi-Fi do campus estiver instável ("Lie-Fi").

### 2.3. Lente 3: Arquitetura Sistêmica & YAGNI (`egm-zoom-out`)
- **Justificativa Estratégica do Pivot Quarto -> Astro:**
  - O Quarto foi projetado para relatórios computacionais. Forçá-lo a operar como SPA gerou acúmulo de hacks imperativos e scripts de 1.000 linhas;
  - O Astro é nativo para conteúdo com ilhas de hidratação, entregando custo zero no GitHub Pages sem dependência de servidores Node/Edge, preservando a autonomia financeira do CAGP.
- **Mitigação de Complexidade:**
  - Rejeição de gerenciadores globais pesados (Redux/Zustand complexo). O estado é puramente: (1) dados imutáveis do curso via Astro Collections e (2) dados privados do aluno no Cofre Discente em `localStorage`. Nano stores compartilhadas atendem com zero boilerplate.

### 2.4. Lente 4: Experiência Discente & Compreensão (`egm-comprehension`)
- **Modelos Mentais do Estudante da FAFICH:**
  - Acesso móvel em situações de pressa: fila do RU II, Circular Noturno das 22h30, cálculo de certificados AAC prestes a vencer ou checagem do Art. 41 de estágio. Respostas imediatas nos primeiros **300px da 1ª dobra visual** (`360×640px`).
- **Revelação Progressiva:**
  - Textos jurídicos extensos (PPC 2020, Regulamento N-20229) encapsulados em `<details class="cagp-normative-details">` com sumário objetivo;
  - Feedback operacional claro: barra de progresso visual com metas explícitas na Calculadora 600h e badges de prazo coloridos no Guardião 120 Dias (Verde > 30d, Âmbar 15-30d, Vermelho < 15d, Cinza Expirado).

### 2.5. Lente 5: Governança do Gemini 3.8 Flash High Thinking (`egm-implementation-readiness`)
- **Diretriz de Modularidade Saudável & Riqueza de Detalhes:** Arquivos têm total liberdade de extensão para acomodar complexidade visual, templates semânticos completos e acessibilidade, priorizando coesão arquitetural e responsabilidade única sobre limites arbitrários de linhas.
- **Decomposição Atômica da Calculadora 600h:**
  1. `src/components/calculators/Calculator600h.tsx` (Orquestrador ~120 linhas);
  2. `src/components/calculators/LinearHud.tsx` (HUD de progresso 64px ~80 linhas);
  3. `src/components/calculators/ExtensionForm.tsx` (Extensão 300h ~180 linhas);
  4. `src/components/calculators/AacForm.tsx` (AAC 300h ~200 linhas);
  5. `src/lib/storage/calculatorStorage.ts` (Leitura, validação Zod e escrita em `localStorage` ~90 linhas).
- **Validação em Loop Fechado:** O agente deve obrigatoriamente executar `pnpm typecheck` -> `pnpm lint` -> `pnpm build` -> testes antes de concluir qualquer tarefa.

### 2.6. Lente 6: Integridade Factual e Estrutural (`egm-structural`)
- **Zero Invenção / Zero Supressão:**
  - Cargas horárias preservadas: 3.000h totais, 2.880h específicas, 120h livres, 300h extensão, até 300h AAC, 300h estágio (DCP 135 180h + DCP 136 120h), 180h TCC;
  - 27 obrigatórias e 68 optativas autênticas;
  - Prazos: 120 dias corridos para protocolo de AAC (Art. 15, § 4º) e final do 2º período para aproveitamento de estudos (Res. CEPE 06/2019).
- **Simetria dos 5 Eixos e 15 Rotas:**
  - Eixo 1 (`Hoje`): `src/pages/index.astro`
  - Eixo 2 (`Curso`): `src/pages/curso.astro`, `calouros.astro`, `pesquisa.astro`
  - Eixo 3 (`Currículo`): `src/pages/percurso.astro`, `optativas.astro`, `acg.astro`, `estagio.astro`, `tcc.astro`
  - Eixo 4 (`Acervo`): `src/pages/documentos.astro`, `faq.astro`, `mapa-do-site.astro`
  - Eixo 5 (`O CAGP`): `src/pages/sobre.astro`, `gestao.astro`
  - Rota Ponte Legada: `src/pages/estagio-tcc.astro` (`isLegacyBridge: true`)
- **Contrato Imutável das 9 Chaves do Cofre Discente:**
  - Manter compatibilidade com `cagp_calc_ext_aac_v1`, `cagp_aac_120d_certs_v1`, `cagp_notifications_prefs_v1`, `cagp_calouro_checklist_v1`, `cagp_percurso_quiz_v1`, `cagp_minha_grade_v1`, `cagp_art41_checklist_v1`, `cagp_a11y_prefs_v2`, `cagp_student_profile_v1` e formato de backup Base64 `CAGP1:...` com checksum CRC32.

---

## 3. Goals vs. Non-Goals

### Objetivos (Goals)
1. Promover Astro 7 (`violet-velocity`) para a raiz do repositório, configurando Tailwind CSS com tokens do `_brand.yml`.
2. Migrar integralmente as 15 rotas acadêmicas para páginas `.astro`, preservando os 5 eixos canônicos.
3. Adotar Astro View Transitions (`<ClientRouter />`) com barra inferior persistente (`transition:persist`).
4. Reconstruir calculadoras e ferramentas em componentes React isolados (< 300 linhas) tipados com TypeScript e Zod.
5. Implementar Bottom Sheets modais com *detents* (50% e 90%) e física de molas conforme Apple HIG.
6. Garantir PWA 100% funcional em modo offline para o campus da UFMG, mantendo deploy estático no GitHub Pages.
7. Atualizar `AGENTS.md` com diretrizes para o modelo Gemini 3.8 Flash (High Thinking).

### Não-Objetivos (Non-Goals)
1. **Não alterar regras acadêmicas ou inventar dados curriculares.**
2. **Não bloquear pinch-to-zoom com `user-scalable=no`.**
3. **Não introduzir servidores backend ou bancos de dados pagos.**
4. **Não manter o diretório `astro-main/` (já removido).**
5. **Não adotar glassmorphism difuso que degrade o contraste.**

---

## 4. Alternatives Weighed

| Stack Arquitetural | Ergonomia Agêntica | Suporte Offline PWA | Animações & Transições | Custo de Hospedagem | Veredito |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Astro 7 + React (TypeScript) + Tailwind** | **Máxima** (arquivos atômicos < 300 linhas, Zod schemas, validação estática `tsc`) | **Alto** (estático, Service Worker nativo/Workbox sem conflito de hidratação) | **Máximo** (Astro View Transitions nativas com persistência de estado e molas Apple) | **Zero** (GitHub Pages estático) | **Opção Selecionada** |
| **Next.js (App Router)** | Alta, mas com alto atrito de SSR/Client boundaries e sobrecarga de dependências | Complexo (payloads binários `_rsc` quebram facilmente em Lie-Fi) | Bom, mas exige biblioteca externa pesada e roteamento de servidor | Zero apenas se exportado estaticamente, perdendo 70% das funções | **Descartada** |
| **Status Quo (Quarto)** | Baixa (arquivos de 140 KB, sem tipos, DOM scripting imperativo) | Instável (roteador SPA manual de 33 KB com DOM swapping frágil) | Limitado (CSS manual, recargas parciais com flicker) | Zero (GitHub Pages estático) | **Descartada** |

---

## 5. Key Decisions & Staging for Next Steps (Passagem para /egm-draft)

1. **Gate G0 — Fundação & Estrutura Base:** Promover a raiz com Astro 7, `@astrojs/react`, Tailwind CSS e schemas Zod do cofre discente.
2. **Gate G1 — Casca Global & Bottom Sheet:** `BaseLayout.astro`, `<ClientRouter />`, Topbar, BottomNav 5 eixos persistente e `BottomSheet.tsx` com detents (50%/90%).
3. **Gate G2 — Migração de Conteúdo:** `src/content/` com as 27 obrigatórias e 68 optativas e 15 rotas respeitando a 1ª dobra (`y <= 300px`).
4. **Gate G3 — Ilhas Reativas:** Calculadora 600h modularizada (< 300 linhas), Guardião 120 Dias, Simulador Art. 41 e Grafo SVG.
5. **Gate G4 — PWA Offline, Auditoria & Homologação:** Service Worker anti-Lie-Fi (timeout 2.5s), auditoria empírica de toque e contraste, atualização formal de `AGENTS.md`.
