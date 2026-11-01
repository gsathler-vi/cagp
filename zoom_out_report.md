# Stage 5: Initial Zoom Out Review Report

* **Documento Auditado:** [`_designs/refatoracao_astro7_superapp_cagp.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/refatoracao_astro7_superapp_cagp.md)
* **Lente:** `egm-zoom-out`
* **Escopo:** Documento Completo (linhas 1..476)
* **Status:** Concluído

## Visão Panorâmica & Alinhamento Estratégico
O RFC propõe a substituição estrutural do Quarto pelo framework Astro 7, motivado pela saturação de contexto do modelo Gemini 3.8 Flash High Thinking diante de arquivos monolíticos (144 KB) e pela fragilidade do roteador SPA manual em JavaScript puro (`super-app-router.html`).
Estrategicamente, a escolha do Astro 7 é sólida: preserva o custo zero de hospedagem no GitHub Pages, mantém a geração estática como pilar e elimina servidores ativos, atendendo aos princípios inegociáveis de governança discente do CAGP.

## Achados Críticos:
1. **[BLK-01] Vácuo Técnico no Precaching do Service Worker para Bundles Hashed do Vite:**
   - O RFC prescreve um Service Worker artesanal em `public/sw.js` com precaching estático de assets e timeout de rede de 2.5s.
   - O Astro 7 compila via Vite, gerando hashes de conteúdo dinâmicos nos nomes de arquivos (ex.: `/_astro/index.B8x19a.js`, `/_astro/Calculator600h.9c3f2.css`).
   - Um arquivo `public/sw.js` cru não possui conhecimento dos hashes em tempo de build. Sem uma integração formal (como `@vite-pwa/astro` ou script pós-build de injeção de manifesto de assets), o Service Worker falhará no precache dos chunks React e do CSS, quebrando completamente a operação offline no campus da UFMG sob condição de Lie-Fi.
2. **[BLK-02] Quebra da Taxonomia Canônica: Invenção da 16ª Rota (`configuracoes.astro`):**
   - O AGENTS.md e o próprio RFC estabelecem estritamente a simetria de 15 rotas (14 ativas + 1 rota-ponte legada `estagio-tcc.html`).
   - Na Seção 7.2 e 9.3 surge `src/pages/configuracoes.astro`, totalizando 16 rotas. Quebra a contagem estática de 14 páginas do mapa do site e contradiz a arquitetura de Bottom Sheets globais.
3. **[MAJ-05] Risco de Deploy no GitHub Pages: Conflito de Pasta de Build (`dist/` vs `docs/`):**
   - O texto anota `site estático gerado em docs/ (ou dist/)`. O RFC precisa travar expressamente `outDir: './dist'` com workflow oficial do GitHub Actions.
