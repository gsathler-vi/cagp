# Portal Institucional & Super App Discente — CAGP FAFICH/UFMG

Portal oficial e **Super App Discente (PWA Offline-First)** do **Centro Acadêmico de Gestão Pública (CAGP) — FAFICH / UFMG**. Reúne em uma arquitetura 100% estática e *client-side* (GitHub Pages) todo o acervo regimental verificado do Bacharelado em Gestão Pública (PPC 2020, Regulamento Versão `N-20229`, Regimento Interno do CAGP de `14/10/2024`, 27 disciplinas obrigatórias, 68 optativas e mais de 80 documentos oficiais) combinado a **App Workspaces Modulares**, **Passaporte Acadêmico com Foto Local** e micro-aplicativos utilitários para a sobrevivência no turno noturno.

> [!NOTE]
> Este portal e Super App foram desenvolvidos como **proposta de chapa** para a gestão do CAGP e constituem um bem público estudantil perpétuo: independentemente do resultado eleitoral, o código-fonte e o acervo permanecem integralmente à disposição da entidade e do corpo discente.

- **URL de Produção:** <https://cagp-ufmg.github.io>
- **Governança & Arquitetura:** [`AGENTS.md`](AGENTS.md) • [`PRODUCT.md`](PRODUCT.md) • [`DESIGN.md`](DESIGN.md) • [`RELATORIO.md`](RELATORIO.md)

---

## 1. Arquitetura Modular: 14 Rotas Canônicas (+ Rediretor) & Single-View App Workspaces

| Página Fonte (`.qmd`) | Rota Compilada (`docs/`) | Papel no Portal & Super App |
| :--- | :--- | :--- |
| [`index.qmd`](index.qmd) | `index.html` | **Hub Principal & Dashboard Inicial:** Passaporte Acadêmico CAGP (com foto `256×256` WebP + Pin LGBTQIAPN+), Bússola personalizada pelo período do aluno, Carrossel de Ações Rápidas, Status Ao Vivo do Campus Noturno e Catálogo de Micro-Apps. |
| [`curso.qmd`](curso.qmd) | `curso.html` | **O Curso de Gestão Pública:** Histórico institucional (REUNI 2008/2009, CPC/MEC 4), perfil do egresso, inserção profissional, departamentos parceiros (`DCP`, `SOA`, `ECN`, `EST`), Coordenação (`Sala F-4067`), Secretaria (`Sala F-2039` com Norma Guedes) e CEAG (`Sala F-2033`, 08h–22h). |
| [`pesquisa.qmd`](pesquisa.qmd) | `pesquisa.html` | **Pesquisa, Iniciação Científica & 11 Núcleos do DCP:** Catálogo filtrável dos 11 Grupos de Pesquisa do DCP/FAFICH em 3 eixos temáticos, integralização de IC (`até 90h` de AAC Modalidade V) e Programa de Imersão no Campo de Públicas. |
| [`calouros.qmd`](calouros.qmd) | `calouros.html` | **Workspace de Sobrevivência Noturna:** Sub-Views para Checklist interativo de 30 dias (6 passos), logística do jantar no RU Setorial II (`18h15`), Circulares Noturnos (`22h30`/`23h05`), FUMP/PRAE/NAI, MinhaUFMG e App Siga. |
| [`percurso.qmd`](percurso.qmd) | `percurso.html` | **Workspace do Percurso Curricular (10 Semestres):** Sub-Views para Grafo SVG/DAG interativo de pré-requisitos (destacando a trava formal `ECN 140 -> ECN 044` e o período atual do aluno), Linha do Tempo das **27 obrigatórias** sincronizada com *Minha Grade* e Simulador Vocacional (`01-01`, `01-02`, `01-03`). |
| [`optativas.qmd`](optativas.qmd) | `optativas.html` | **Catálogo das 68 Optativas & Formação Livre (120h):** Explorador pesquisável e filtrável por departamento (`DCP`, `ECN`, `SOA`, `EST`, `DEM`, `CIC`, `LET`) sincronizado com *Minha Grade* + guia das `120h` de Formação Livre. |
| [`acg.qmd`](acg.qmd) | `acg.html` | **Workspace 600h (Extensão + AAC):** Sub-Views para Calculadora Interativa de **300h de Extensão Obrigatória** + **300h de AAC (Art. 15)** com odômetro `rAF`, **Guardião do Prazo Fatal de 120 Dias Corridos** (Art. 15, § 4º), Tabela das 9 Modalidades e **Gerador de Espelho Oficial N-20229** com impressão A4. |
| [`estagio.qmd`](estagio.qmd) | `estagio.html` | **Workspace de Estágio Supervisionado (`300h`) & Art. 41:** Regras de Estágio A (`DCP 135`, 180h) e B (`DCP 136`, 120h), Simulador e Checklist persistente de **Dispensa por Atuação Profissional (Art. 41)** e tutorial anotado do TCE. |
| [`tcc.qmd`](tcc.qmd) | `tcc.html` | **Trabalho de Conclusão de Curso (`180h`):** Elaboração (`DCP 089`, 60h) e Defesa (`DCP 137`, 120h), as **4 modalidades oficiais de TCC** (Art. 26) e download do Termo de Aceite de Orientador. |
| [`estagio-tcc.qmd`](estagio-tcc.qmd) | `estagio-tcc.html` | **Ponte de Compatibilidade Regimental:** Redireciona instantaneamente links e `#hash` legados para `estagio.html` ou `tcc.html`. |
| [`documentos.qmd`](documentos.qmd) | `documentos.html` | **Workspace de Normas & Cofre Offline:** Sub-Views para o **Cofre Offline de 8 PDFs Essenciais** via `CacheStorage`, Central de Formulários Administrativos (+80 PDFs e DOCXs) e tutorial de requerimento DRCA. |
| [`faq.qmd`](faq.qmd) | `faq.html` | **Central Resolutiva de Dúvidas (FAQ):** Base regimental pesquisável com filtros por categoria e compartilhamento direto (`Web Share API`). |
| [`sobre.qmd`](sobre.qmd) | `sobre.html` | **Identidade Perpétua do CAGP:** Regimento Interno (`14/10/2024`), Assembleia Geral, Junta Eleitoral, 7 Diretorias Estatutárias, Colegiado/NDE, representação tripartite CAGP/DA/DCE e história d'*Os Candangos* (Bruno Giorgi). |
| [`gestao.qmd`](gestao.qmd) | `gestao.html` | **Gestão em Exercício & Transparência:** Organograma das 7 Diretorias e 6 Comissões, instrumentos de transparência ativa (RREO mensal, acesso em até 3 dias úteis — Art. 15, V) e ouvidoria discente. |
| [`mapa-do-site.qmd`](mapa-do-site.qmd) | `mapa-do-site.html` | **Visão Panorâmica WCAG 2.4.5:** Índice estruturado das 14 rotas canônicas em 5 eixos com filtro instantâneo em tempo real. |

---

## 2. Exclusividades do Super App (100% Client-Side PWA)

1. **Passaporte Acadêmico & Identidade Discente Persistente (`cagp_student_profile_v1`):**
   - Upload e recorte quadrado (`1:1`) `100%` *client-side* via `<canvas>` HTML5 em `256×256px` WebP (`~12–25 KB`, zero servidor), 4 avatares ilustrados Brite e **Pin/Tag de Orgulho LGBTQIAPN+** (9 bandeiras).
   - Painel global (`#cagp-settings-sheet`) içado diretamente na raiz de `document.body` com delegação global de eventos: clicar no avatar do cabeçalho ou da Topbar em **qualquer página** abre imediatamente o Passaporte com todos os controles de foto e perfil visíveis em primeiro plano.
2. **Sistema Híbrido de Notificações & Guardião de 120 Dias (`Notifications API` + `Service Worker` + `Badging API` + `.ics`):**
   - Alertas configuráveis para o **Jantar no RU II (`18h15`)**, **Último Circular Noturno (`22h30`)** e **Prazo Fatal de 120 Dias das AAC**.
   - Contagem regressiva automática dos **120 dias corridos (Art. 15, § 4º)** em `acg.qmd#guardiao-120-dias` com carimbos brutais (**Verde `> 30d`**, **Âmbar `<= 30d`**, **Vermelho Crítico `<= 10d` / Vencido**) e `navigator.setAppBadge`.
3. **Gerador de Espelho Oficial para o Requerimento N-20229 (`acg.qmd`):**
   - Converte automaticamente as horas simuladas em créditos (`15h = 1 crédito`) respeitando os tetos regimentais, pré-preenche o cabeçalho com os dados do Passaporte Acadêmico, monta a ficha oficial no `#cagp-global-bottom-sheet` e em folha A4 (`@media print`) e gera o texto pronto para o SEI.
4. **"Meu CAGP Sync" — Backup e Portabilidade Zero-Servidor (9 Chaves Canônicas):**
   - Exportação e restauração completa entre PC e celular via arquivo `.json` (`meu-cagp-backup-YYYY-MM-DD.json`) ou código compacto Base64 (`CAGP1:...`), sincronizando as **9 chaves canônicas do `localStorage`**:
     - `cagp_calc_ext_aac_v1` (Calculadora 600h)
     - `cagp_aac_120d_certs_v1` (Guardião de 120 Dias das AAC)
     - `cagp_notifications_prefs_v1` (Alertas de Sobrevivência Noturna)
     - `cagp_calouro_checklist_v1` (Checklist de 30 Dias do Calouro)
     - `cagp_percurso_quiz_v1` (Termômetro Vocacional)
     - `cagp_minha_grade_v1` (27 Obrigatórias Cursadas + 68 Optativas Favoritas)
     - `cagp_art41_checklist_v1` (Checklist Dispensa de Estágio Art. 41)
     - `cagp_a11y_prefs_v2` (Preferências da Suíte Universal de Acessibilidade)
     - `cagp_student_profile_v1` (Perfil, Foto `256×256` WebP & Passaporte Acadêmico CAGP)

---

## 3. Governança de Design em 3 Camadas

O sistema visual obedece à arbitragem em 3 camadas documentada em [`AGENTS.md`](AGENTS.md) e [`DESIGN.md`](DESIGN.md):
- **Camada 1 — Pele, Geometria e Marca (Soberana: 100% Neo-Brutalismo Brite / CAGP):** Bordas sólidas `#0A0A0A` (`2px`–`3px`), sombras duras deslocadas com **`0px` de blur**, cantos retos (`0px`–`4px`), zero glassmorphism (`100%` opaco), paleta Vinho Candango `#9E2424` / Ouro `#E8A317` / Creme Papel `#FBF8F3` e tipografia `Oswald` + `Inter` + `JetBrains Mono`.
- **Camada 2 — Ergonomia Espacial e Física (`apple-design`):** Respeito às *Safe Areas* (`viewport-fit=cover`), alvos de toque confortáveis (`44px`–`48px`), Top Command Bar & Standalone Topbar deduplicadas (Logo Candangos + `CAGP` + indicador contextual de seção à esquerda; Spotlight `⌘K`, Acessibilidade `Alt+A` e Avatar/Passaporte à direita), Bottom Tab Bar (`60px` com 5 abas canônicas), Spotlight adaptativo ao teclado virtual (`window.visualViewport`) e curvas de mola física (`cubic-bezier(0.32, 0.72, 0, 1)`).
- **Camada 3 — Contenção e Densidade Operacional (`m3-expressive`):** Hierarquia tonal de superfícies (`--cagp-surface-base`, `--cagp-surface-card`, `--cagp-surface-low`, `--cagp-surface-high`) com **proibição estrita de `nested-cards`**, Workspaces de Sub-Views, barras de chips deslizantes no mobile, odômetro `rAF` (`280ms`) e carimbos brutais de estado.

---

## 4. Como Compilar e Verificar (Tríade Oficial `AGENTS.md` § 5)

Pré-requisito: [Quarto](https://quarto.org/) ≥ 1.6.

```bash
# 1. Passo A — Build Limpo & Auditoria Impeccable CLI
rm -rf docs && quarto render
.agents/skills/impeccable/scripts/impeccable doctor
.agents/skills/impeccable/scripts/impeccable detect --json docs/*.html

# 2. Passo B — Validação de Links, Ativos, Rotas de Workspaces e Âncoras (#hash) via Python
python3 -c "import glob; assert len(glob.glob('docs/*.html')) == 15"

# 3. Passo C — Servidor Local + Auditoria Multi-Viewport e Runtime com Subagente Nativo /browser
python3 -m http.server 8765 --directory docs --bind 127.0.0.1
```

## 5. Publicação no GitHub Pages

O GitHub Pages serve diretamente a pasta `/docs` da branch `main` (**Settings → Pages → Deploy from a branch → `main` / `/docs`**). Após executar a Tríade Oficial de Verificação sem erros, basta commitar as alterações (incluindo `docs/`) e realizar `git push`.
