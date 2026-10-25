---
target: portal-cagp-completo
total_score: 38
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
p2_count: 3
target_identity: "file:/home/gsathler/Nextcloud/Projects/cagp/portal-cagp-completo"
timestamp: 2026-10-25T04-59-15Z
slug: portal-cagp-completo
---
# Critique Snapshot: Portal Discente e Institucional CAGP UFMG (Site Completo)

**Data da Avaliação:** 25 de Outubro de 2026  
**Alvo:** `portal-cagp-completo` (Todas as 11 páginas + Sistema de Design Neo-Brutalista Brite)  
**Escopo:** `index.qmd`, `curso.qmd`, `calouros.qmd`, `percurso.qmd`, `estagio-tcc.qmd`, `acg.qmd`, `documentos.qmd`, `faq.qmd`, `sobre.qmd`, `gestao.qmd`, `mapa-do-site.qmd`  
**Modo da Superfície:** Híbrido (Read / Operate / Persuade)  
**Pontuação Global:** 38 / 40 (95% — Excellent / Nível Superior de Artesania Visual e Normativa)

---

## 1. Veredito de Especificidade de Design (Design Specificity)

O portal do Centro Acadêmico de Gestão Pública da FAFICH/UFMG consolida uma identidade visual e institucional singular (Out-of-Distribution Craft). Em contraste com templates genéricos de portais acadêmicos ou blogs institucionais padronizados, o projeto incorpora com maestria a linguagem **Neo-Brutalista Brite**: bordas sólidas pretas de 2px a 3px (`#0A0A0A`), sombras duras ortogonais sem desfoque (0px blur), tipografia dual marcante (Oswald nos títulos e Inter no corpo) e uma paleta cromática ancorada no Vinho Candango (`#9E2424`) e no Ouro FAFICH (`#E8A317`).

A semiótica de *"Os Candangos (Dois Guerreiros)"* de Bruno Giorgi (1959) e o conceito do "Prumo Republicano" conferem dignidade cívica ao portal, espelhando com precisão o estudante do turno noturno da UFMG: trabalhador, combativo, rigoroso e comprometido com o interesse público. A recente separação entre a certidão institucional soberana (`sobre.qmd`) e a equipe transitória de mandato (`gestao.qmd`), alinhada às 7 diretorias canônicas regimentais, estabelece um marco de maturidade pública e respeito à impessoalidade administrativa.

---

## 2. Pontuação das Heurísticas de Usabilidade (Nielsen 10)

| Heurística | Nota (0–4) | Status | Justificativa |
| :--- | :---: | :---: | :--- |
| **1. Visibilidade do status do sistema** | 3 | Bom | Breadcrumbs semânticos em 10 das 11 páginas (`index` omitido corretamente), contadores dinâmicos nos filtros em tempo real ("Exibindo X de Y"), barras de progresso no Checklist e na Calculadora 600h, além de anúncio permanente de proposta de chapa. |
| **2. Correspondência com o mundo real** | 4 | Excelente | Alinhamento exemplar com a linguagem e a cultura da UFMG: siglas departamentais (`DCP`, `ECN`, `SOA`, `EST`), percursos curriculares (`01-01`, `01-02`, `01-03`), normas do CEPE, órgãos institucionais (`CEAG`, `FUMP`, `DRCA`) e princípios constitucionais do `LIMPE`. |
| **3. Controle do usuário e liberdade** | 4 | Excelente | Amplo controle sobre o estado e ferramentas: botões de "Desmarcar tudo" no Checklist, "Zerar Simulação" e "Exemplo (360h)" na Calculadora de AAC, "Expandir todos / Recolher todos" em gavetas retráteis de ementas, diretorias e FAQ, além de atalho de fuga "Voltar ao topo" em todas as páginas. |
| **4. Consistência e padrões** | 4 | Excelente | Padrão consistente de botões (`.cagp-doc-btn-*`), badges e cards neo-brutalistas. O vocabulário das 7 diretorias canônicas (`DIPRE`, `DIJUR`, `DIFI`, `DIAC`, `DIAP`, `DICULT`, `DIMAC`) agora é uniforme e rigoroso em todo o portal. |
| **5. Prevenção de erros** | 4 | Excelente | Destaque explícito para a **única trava formal no SIGA** (`ECN 140` &rarr; `ECN 044`), alertas sobre o prazo decadencial de 120 dias das AAC (Art. 15) e o limite do 2º período para aproveitamento de estudos, e travas de teto na calculadora de 600h. |
| **6. Reconhecimento em vez de memorização** | 4 | Excelente | Grafo Curricular DAG em SVG com visão sinóptica dos 10 períodos, busca textual instantânea nas 27 obrigatórias e 68 optativas, e presets temáticos em 1 clique. |
| **7. Flexibilidade e eficiência de uso** | 4 | Excelente | Atende perfeitamente calouros (checklist passo a passo) e veteranos (atalhos de urgência no FAQ, busca em formulários SEI, atalhos Escape nos buscadores). |
| **8. Design estético e minimalista** | 3 | Bom | Gravidade solene e elegância tátil do tema Brite. Em páginas muito densas (`percurso.qmd`), o volume de conteúdo exige disciplina de agrupamento e progressive disclosure em telas móveis. |
| **9. Diagnóstico e recuperação de falhas** | 4 | Excelente | Simulador do Art. 41 aponta com exatidão a elegibilidade para dispensa de estágio; FAQ cobre as principais dúvidas em trancamentos, pré-requisitos e prazos. |
| **10. Ajuda e documentação** | 4 | Excelente | Respaldo documental de 100% dos dados com base em 8 PDFs digitalizados oficiais, citação explícita dos artigos dos regulamentos, formulários editáveis para download e Mapa do Site completo (WCAG 2.4.5). |

**Total:** 38 / 40 (95% — *Strong / Excellent*)

---

## 3. Avaliação de Carga Cognitiva & Jornada Emocional

- **Carga Cognitiva:**  
  - *Pontos Positivos:* O agrupamento da jornada acadêmica em trilhas (Calouro &rarr; Percurso &rarr; Estágio/TCC &rarr; Extensão/AAC) reduz drasticamente a ansiedade do estudante novato.
  - *Áreas de Atenção:* A página `percurso.qmd` possui alta densidade de informação regulamentar. O uso de gavetas dobráveis (`<details>`) e presets de busca mitigou a rolagem infinita.
- **Jornada Emocional:**  
  - O estudante do turno noturno frequentemente chega à universidade cansado da jornada de trabalho. A interface transmite acolhimento, solidez e previsibilidade. A clareza dos simuladores produz um sentimento de controle e segurança jurídica.

---

## 4. Problemas Prioritários Classificados

### P1 — Alta Prioridade
1. **Otimização de Rolagem & Carga Visual em Telas Móveis (`percurso.qmd`):** Garantir que a transição entre o Grafo Curricular e a grade de 27 disciplinas e 68 optativas seja fluida e não sobrecarregue a navegação no celular.

### P2 — Média Prioridade
2. **Padronização dos Estados Vazios (*Empty States*) nos Buscadores:** Garantir que o container `.cagp-empty-state` padronizado esteja ativo em todos os 5 buscadores com mensagem amigável e botão tátil de restauração em 1 clique.
3. **Sinalização Visual de Links Externos (`target="_blank"`):** Inserir micro-ícones semânticos consistentes (`bi-box-arrow-up-right`) em links que levam para fora do portal institucional da UFMG com atributos de acessibilidade.
4. **Ergonomia e Touch Targets Mínimos (44x44px):** Calibrar em `styles.css` a altura mínima dos botões táteis e chips para conformidade estrita com as diretrizes de toque móvel da WCAG 2.1.

### P3 — Baixa Prioridade / Polimento
5. **Ritmo Vertical e Espaçamento dos Cabeçalhos:** Alinhar com precisão métrica a margem superior dos cabeçalhos secundários e caixas de ferramentas em todas as 11 páginas.
6. **Otimização de Impressão (`@media print`):** Refinar as regras de impressão para que o ementário oficial e o grafo possam ser impressos de forma limpa em papel A4 sem cortar bordas ou cabeçalhos.
