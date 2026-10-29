# Portal Institucional & Super App Discente — CAGP FAFICH/UFMG

Portal oficial e **Super App Discente (PWA Offline-First)** do **Centro Acadêmico de Gestão Pública (CAGP) — FAFICH / UFMG**. Reúne em uma arquitetura 100% estática e *client-side* (GitHub Pages) todo o acervo regimental verificado do Bacharelado em Gestão Pública (PPC 2020, Regulamento Versão `N-20229`, Regimento Interno do CAGP de `14/10/2024`, 27 disciplinas obrigatórias, 68 optativas e mais de 80 documentos oficiais) combinado a micro-aplicativos utilitários para a sobrevivência no turno noturno.

> [!NOTE]
> Este portal e Super App foram desenvolvidos como **proposta de chapa** para a gestão do CAGP e constituem um bem público estudantil perpétuo: independentemente do resultado eleitoral, o código-fonte e o acervo permanecem integralmente à disposição da entidade e do corpo discente.

- **URL de Produção:** <https://cagp-ufmg.github.io>
- **Governança & Arquitetura:** [`AGENTS.md`](AGENTS.md) • [`PRODUCT.md`](PRODUCT.md) • [`DESIGN.md`](DESIGN.md) • [`RELATORIO.md`](RELATORIO.md)

---

## 1. Arquitetura das 11 Páginas & Micro-Apps

| Página Fonte (`.qmd`) | Rota Compilada (`docs/`) | Papel no Portal & Super App |
| :--- | :--- | :--- |
| [`index.qmd`](index.qmd) | `index.html` | **Hub Principal & Dashboard Inicial:** Carteira Acadêmica do Aluno (Nubank/Inter style), Carrossel de Ações Rápidas, Status Ao Vivo do Campus Noturno e Catálogo dos 8 Micro-Apps. |
| [`curso.qmd`](curso.qmd) | `curso.html` | **Vitrine de Excelência do Curso:** Cientometria, Carreiras/Salários, Coordenação (`Sala F-4067`), Secretaria (`Sala F-2039` com Norma Guedes), CEAG (`Sala F-2033`, 08h–22h) e os 11 Núcleos de Pesquisa do DCP. |
| [`calouros.qmd`](calouros.qmd) | `calouros.html` | **Guia de Sobrevivência Noturna:** Checklist interativo de 30 dias (6 passos), logística do jantar no RU Setorial II (`17h10–19h30`, fila estratégica às `18h15`), Circulares Noturnos (última saída às `22h45`), FUMP, MinhaUFMG e App Siga. |
| [`percurso.qmd`](percurso.qmd) | `percurso.html` | **Percurso Curricular, Grafo SVG & "Minha Grade":** Termômetro Vocacional (`01-01`, `01-02`, `01-03`), Grafo SVG interativo de pré-requisitos (destacando a trava formal `ECN 140 -> ECN 044`), catálogo E-commerce das **27 obrigatórias** e **68 optativas**, barra de conclusão da graduação e inspeção de ementas em Bottom Sheet. |
| [`acg.qmd`](acg.qmd) | `acg.html` | **Calculadora 600h, Guardião de 120 Dias & Espelho N-20229:** Simulador de **300h de Extensão Obrigatória** + **300h de AAC (Art. 15)**, **Guardião do Prazo Fatal de 120 Dias Corridos** (Art. 15, § 4º para Modalidades III e VII) e **Gerador de Espelho Oficial N-20229** com impressão A4 e cópia pronta para o SEI. |
| [`estagio-tcc.qmd`](estagio-tcc.qmd) | `estagio-tcc.html` | **Estágio Supervisionado, Dispensa Art. 41 & TCC:** Simulador de elegibilidade para Dispensa de Estágio por Experiência Profissional (Art. 41), checklist documental persistente, tutorial visual do TCE e as 4 modalidades de TCC (Art. 26). |
| [`documentos.qmd`](documentos.qmd) | `documentos.html` | **Central de Normas & Cofre Offline:** Mais de 80 documentos oficiais (PDF e DOCX), tutorial visual de mudança de percurso DRCA e **Cofre Offline de 8 PDFs Essenciais** via `CacheStorage`. |
| [`faq.qmd`](faq.qmd) | `faq.html` | **Central Resolutiva de Dúvidas (FAQ) & Acessibilidade:** Perguntas críticas com busca instantânea, compartilhamento nativo (`Web Share API`) e declaração de conformidade WCAG 2.2 AA/AAA. |
| [`sobre.qmd`](sobre.qmd) | `sobre.html` | **Identidade Perpétua do CAGP:** Regimento Interno (`14/10/2024`), Assembleia Geral, Junta Eleitoral, Colegiado/NDE, distinção tripartite CAGP/DA/DCE e história d'*Os Candangos* (Bruno Giorgi). |
| [`gestao.qmd`](gestao.qmd) | `gestao.html` | **Gestão em Exercício & Transparência:** Segmented Control Apple HIG, organograma das 7 Diretorias Canônicas, prestação de contas e chamada de voluntários. |
| [`mapa-do-site.qmd`](mapa-do-site.qmd) | `mapa-do-site.html` | **Visão Panorâmica WCAG 2.4.5:** Árvore completa das 11 páginas e todas as seções ancoradas com filtro instantâneo. |

---

## 2. Exclusividades do Super App (100% Client-Side PWA)

1. **Sistema Híbrido de Notificações & Guardião de 120 Dias (`Notifications API` + `Service Worker` + `Badging API` + `.ics`):**
   - Alertas configuráveis em **Ajustes (`#cagp-settings-sheet`)** para o **Jantar no RU II (`18h15`)**, **Último Circular Noturno (`22h30`)** e **Prazo Fatal de 120 Dias das AAC**.
   - Cálculo automático da contagem regressiva dos **120 dias corridos (Art. 15, § 4º)** em `acg.qmd#guardiao-120-dias` com carimbos brutais (**Verde `> 30d`**, **Âmbar `<= 30d`**, **Vermelho Crítico `<= 10d` / Vencido**) e atualização automática do `navigator.setAppBadge` no ícone do aplicativo.
2. **Gerador de Espelho Oficial para o Requerimento N-20229 (`acg.qmd`):**
   - Converte automaticamente as horas simuladas em créditos (`15h = 1 crédito`) respeitando os tetos regimentais, monta a ficha oficial no `#cagp-global-bottom-sheet` e em folha A4 (`@media print`) e gera o texto pronto para colar no SEI.
3. **Agenda Nativa (`.ics`) & `Web Share API`:**
   - Geração dinâmica de arquivos `.ics` (`window.cagpCalendar.downloadIcs`) para plantões da Coordenação/Secretaria, alarmes recorrentes do turno noturno e vencimentos de certificados.
   - Compartilhamento nativo (`window.cagpShare`) em ementas de disciplinas, documentos oficiais e respostas do FAQ.
4. **"Meu CAGP Sync" — Backup e Portabilidade Zero-Servidor:**
   - Exportação e importação completa da Carteira Acadêmica entre PC e celular via arquivo `.json` (`meu-cagp-backup-YYYY-MM-DD.json`) ou código compacto Base64 (`CAGP1:...`), sincronizando as **8 chaves canônicas do `localStorage`**:
     - `cagp_calc_ext_aac_v1` (Calculadora 600h)
     - `cagp_aac_120d_certs_v1` (Guardião de 120 Dias das AAC)
     - `cagp_notifications_prefs_v1` (Alertas de Sobrevivência Noturna)
     - `cagp_calouro_checklist_v1` (Checklist de 30 Dias do Calouro)
     - `cagp_percurso_quiz_v1` (Termômetro Vocacional)
     - `cagp_minha_grade_v1` (27 Obrigatórias Cursadas + 68 Optativas Favoritas)
     - `cagp_art41_checklist_v1` (Checklist Dispensa de Estágio Art. 41)
     - `cagp_a11y_prefs_v2` (Preferências da Suíte Universal de Acessibilidade)

---

## 3. Governança de Design em 3 Camadas

O sistema visual obedece à arbitragem em 3 camadas documentada em [`AGENTS.md`](AGENTS.md) e [`DESIGN.md`](DESIGN.md):
- **Camada 1 — Pele, Geometria e Marca (Soberana: 100% Neo-Brutalismo Brite / CAGP):** Bordas sólidas `#0A0A0A` (`2px`–`3px`), sombras duras deslocadas com **`0px` de blur**, cantos retos (`0px`–`4px`), zero glassmorphism (`100%` opaco), paleta Vinho Candango `#9E2424` / Ouro `#E8A317` / Creme Papel `#FBF8F3` e tipografia `Oswald` + `Inter` + `JetBrains Mono`.
- **Camada 2 — Ergonomia Espacial e Física (`apple-design`):** Respeito às *Safe Areas* (`viewport-fit=cover`), alvos de toque mínimos de `44px`–`48px`, Top Command Bar (`52px`), Bottom Tab Bar (`60px` no mobile; doca flutuante centralizada de `max-width: 520px` em foldables/tablets), Spotlight adaptativo ao teclado virtual (`window.visualViewport`) e curvas de mola física (`cubic-bezier(0.32, 0.72, 0, 1)`).
- **Camada 3 — Contenção e Densidade Operacional (`m3-expressive`):** Hierarquia tonal de superfícies (`--cagp-surface-base`, `--cagp-surface-card`, `--cagp-surface-low`, `--cagp-surface-high`) com **proibição estrita de `nested-cards`**, barras de chips deslizantes no mobile e carimbos brutais de estado.

---

## 4. Como Compilar e Verificar (Tríade Oficial `AGENTS.md` § 5)

Pré-requisito: [Quarto](https://quarto.org/) ≥ 1.6.

```bash
# 1. Passo A — Build Limpo & Auditoria Impeccable CLI
rm -rf docs && quarto render
.agents/skills/impeccable/scripts/impeccable doctor
.agents/skills/impeccable/scripts/impeccable detect --json docs/*.html

# 2. Passo B — Validação de Links, Ativos e Âncoras (#hash) via Python
python3 /home/gsathler/.gemini/antigravity/brain/a9fadf78-dc56-4e87-9eca-5b488552da75/scratch/verify_links_and_assets.py

# 3. Passo C — Servidor Local + Auditoria Multi-Viewport e Runtime com Subagente /browser
python3 -m http.server 8765 --directory docs --bind 127.0.0.1
```

## 5. Publicação no GitHub Pages

O GitHub Pages serve diretamente a pasta `/docs` da branch `main` (**Settings → Pages → Deploy from a branch → `main` / `/docs`**). Após executar a Tríade Oficial de Verificação sem erros, basta commitar as alterações (incluindo `docs/`) e realizar `git push`.
