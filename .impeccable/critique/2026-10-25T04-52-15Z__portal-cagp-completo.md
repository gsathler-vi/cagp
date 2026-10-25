---
target: portal-cagp-completo
total_score: 32
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/home/gsathler/Nextcloud/Projects/cagp/portal-cagp-completo"
timestamp: 2026-10-25T04-52-15Z
slug: portal-cagp-completo
---
# Critique Snapshot: Portal Discente e Institucional CAGP UFMG (Site Completo)

**Data da Avaliação:** 25 de Outubro de 2026  
**Alvo:** `portal-cagp-completo` (Todas as 11 páginas + Sistema de Design Neo-Brutalista Brite)  
**Escopo:** `index.qmd`, `curso.qmd`, `calouros.qmd`, `percurso.qmd`, `estagio-tcc.qmd`, `acg.qmd`, `documentos.qmd`, `faq.qmd`, `sobre.qmd`, `gestao.qmd`, `mapa-do-site.qmd`  
**Modo da Superfície:** Híbrido (Read / Operate / Persuade)  
**Pontuação Global:** 32 / 40 (Strong / Nível Superior de Artesania Visual e Normativa)

---

## 1. Veredito de Especificidade de Design (Design Specificity)

O portal do Centro Acadêmico de Gestão Pública da FAFICH/UFMG apresenta uma das identidades visuais e semânticas mais singulares e bem-resolvidas do ecossistema universitário brasileiro. Diferente de portais estudantis convencionais que recorrem a templates genéricos de blogs WordPress ou temas bootstrapped pasteurizados, o projeto adota com maestria o **Neo-Brutalismo Brite**: bordas sólidas de 2px a 3px em nanquim profundo (`#0A0A0A`), sombras duras ortogonais sem desfoque (0px blur), tipografia dual marcante (Oswald nos títulos e Inter no corpo) e uma paleta cromática rigorosamente ancorada no Vinho Candango (`#9E2424`) e no Ouro FAFICH (`#E8A317`).

A semiótica de **"Os Candangos (Dois Guerreiros)" de Bruno Giorgi** e o conceito do "Prumo Republicano" conferem dignidade cívica ao portal, traduzindo o espírito do discente do turno noturno da UFMG: trabalhador, combativo, rigoroso e comprometido com a res publica. A recente correção do Espelho Discente de Integralização e o alinhamento da governança interna às 7 diretorias regimentais consolidam a maturidade institucional do projeto.

---

## 2. Pontuação das Heurísticas de Usabilidade (Nielsen 10)

| Heurística | Nota (0–4) | Status | Justificativa |
| :--- | :---: | :---: | :--- |
| **1. Visibilidade do status do sistema** | 4 | Excelente | Breadcrumbs dinâmicos, progresso acumulado em tempo real no Cockpit 3.000h, semáforos de status documental e banners claros de proposta de chapa. |
| **2. Correspondência com o mundo real** | 4 | Excelente | Linguagem institucional autêntica da UFMG: créditos, matriz curricular N-20229, CEAG, Colegiado, FAFICH, DRC, SIEX e Restaurante Universitário. |
| **3. Controle do usuário e liberdade** | 3 | Bom | Simuladores com controles incrementais (steppers), resets e presets ("Calouro" e "Veterano"), gavetas retráteis de ementário; oportunidade de refino em avisos de links externos. |
| **4. Consistência e padrões** | 3 | Bom | Padrão consistente de botões (`.cagp-doc-btn-*`), badges e cards neo-brutalistas. Leve assimetria entre a apresentação de órgãos colegiados e equipes executivas. |
| **5. Prevenção de erros** | 4 | Excelente | Trava formal no SIGA (ECN 140 &rarr; ECN 044) destacada em vermelho, validação de carga mínima semestral (Art. 48 &ge; 180h) e checklist antes da emissão do plano. |
| **6. Reconhecimento em vez de memorização** | 4 | Excelente | Grafo Curricular DAG com visão sinóptica dos 10 períodos, busca textual instantânea em todas as 27 obrigatórias e semáforos de vigência de normas. |
| **7. Flexibilidade e eficiência de uso** | 3 | Bom | Atalhos rápidos por perfil discente na Bússola do Estudante (`index.qmd`) e busca reativa no FAQ; tabela de documentos ainda pode receber filtros combinados por ano e tipo. |
| **8. Design estético e minimalista** | 3 | Bom | Personalidade forte e hierarquia clara; em páginas mais longas (`percurso.qmd` e `sobre.qmd`), o volume textual bruto pode se beneficiar de mais *progressive disclosure*. |
| **9. Diagnóstico e recuperação de falhas** | 3 | Bom | Cockpit aponta com exatidão qual disciplina impede a progressão ou se a carga horária está fora dos limites normativos. |
| **10. Ajuda e documentação** | 4 | Excelente | Transcrição de artigos de leis, resoluções CEPE, regulamento interno e orientações operacionais com link direto aos PDFs autênticos. |

**Total:** 32 / 40 (Banda: *Strong*)

---

## 3. Avaliação de Carga Cognitiva & Jornada Emocional

- **Carga Cognitiva:**  
  - *Pontos Positivos:* O agrupamento da jornada acadêmica em trilhas (Calouro &rarr; Percurso &rarr; Estágio/TCC &rarr; Extensão/AAC) reduz drasticamente a ansiedade do estudante novato.
  - *Áreas de Atenção:* As páginas `percurso.qmd` e `acg.qmd` possuem alta densidade de informação regulamentar. O uso de gavetas dobráveis (`<details>`) mitigou a rolagem infinita, mas a navegação em telas mobile exige que o discente role bastante para encontrar o simulador.
- **Jornada Emocional:**  
  - O estudante do turno noturno frequentemente chega à universidade cansado da jornada de trabalho. A interface transmite acolhimento, solidez e previsibilidade. O espelho gerado no Cockpit produz um sentimento de controle e segurança contra surpresas na matrícula online do SIGA.

---

## 4. Crítica Exaustiva Página por Página

### 1. `index.qmd` (Homepage & Bússola do Estudante)
- **Pontos Fortes:** Hero com o símbolo dos Candangos imponente; matriz de acesso rápido aos sistemas da UFMG (minhaUFMG, SIGA, FUMP, Interno Rotas) respeitando as diretrizes de marcas de terceiros; cards de perfis segmentados (Calouro, Meio de Curso, Formando).
- **Crítica & Oportunidade:** O hero possui muitos botões concorrentes de call-to-action primário. Recomendável hierarquizar o fluxo principal direcionando primeiro ao Guia do Calouro ou ao Cockpit de Matrícula.

### 2. `curso.qmd` (O Curso, Áreas de Atuação & Pesquisa)
- **Pontos Fortes:** Catálogo rico com os 6 grupos de pesquisa (CRISP, Margem, NESPO, etc.), departamentalização didática e mercado de trabalho em gestão pública.
- **Crítica & Oportunidade:** Falta uma seção voltada à atração de estudantes do Ensino Médio / SiSU, destacando a nota de corte, os diferenciais do curso noturno e o impacto social da formação.

### 3. `calouros.qmd` (Guia de Sobrevivência do Calouro)
- **Pontos Fortes:** Checklist dos Primeiros 30 Dias interativo com persistência, horários críticos (jantar no RU até 20h30, circulares noturnos no Campus Pampulha), tom empático e prático.
- **Crítica & Oportunidade:** Incluir mapa esquemático da FAFICH com indicação visual da localização da Secretaria (Sala F-2039) e do Auditório Baesse.

### 4. `percurso.qmd` (Percurso Curricular, Grafo & Cockpit 3.000h)
- **Pontos Fortes:** Grafo Curricular DAG em SVG responsivo com diferenciação correta entre trava formal única (ECN 140 &rarr; ECN 044) e encadeamento pedagógico; Cockpit Discente com barra multissegmentada (1.560h OB, 1.020h OPT, 300h EXT, 300h AAC); novo Espelho de Matrícula impresso e formatado com rigor de documento público.
- **Crítica & Oportunidade:** O seletor de percursos (Geral, Complementar, Avançado) pode ser conectado ao Cockpit para sugerir automaticamente as disciplinas eletivas recomendadas.

### 5. `estagio-tcc.qmd` (Estágio Supervisionado & TCC)
- **Pontos Fortes:** Fluxograma em 4 etapas para Estágio Não-Obrigatório e Obrigatório (A de 180h e B de 120h); detalhamento transparente das 4 modalidades de TCC e regras de dispensa do Art. 41.
- **Crítica & Oportunidade:** Adicionar prazos-chave do calendário acadêmico anual (data limite de depósito do TCC e envio de termos de compromisso à FAFICH).

### 6. `acg.qmd` (Extensão 300h & Atividades Complementares)
- **Pontos Fortes:** Calculadora 600h em tempo real com limites máximos por categoria; ênfase na distinção normativa entre Formação em Extensão (Resolução CEPE nº 10/2019) e AAC (Art. 15 com prazo decadencial de 120 dias).
- **Crítica & Oportunidade:** A tabela de equivalência de atividades pode receber um campo de busca por palavra-chave (ex.: "estágio", "monitoria", "artigo").

### 7. `documentos.qmd` (Repositório Oficial de Documentos)
- **Pontos Fortes:** Semáforo normativo de vigência (Vigente / Transitório / Revogado); downloads com indicação de formato e tamanho; alinhamento aos PDFs autênticos em `documentos/`.
- **Crítica & Oportunidade:** Adicionar filtros por tag (Ensino, Pesquisa, Extensão, Gestão Interna) para agilizar a localização por discentes no mobile.

### 8. `faq.qmd` (Perguntas Frequentes)
- **Pontos Fortes:** Busca dinâmica em tempo real com realce de termos; categorização por temas sensíveis (trancamento, matrícula, quebra de pré-requisito).
- **Crítica & Oportunidade:** Incluir botão de feedback simples ("Esta resposta te ajudou?") para mapear dúvidas discentes não atendidas.

### 9. `sobre.qmd` (O Centro Acadêmico)
- **Pontos Fortes:** Regimento Interno de 14 de outubro de 2024 citado rigorosamente; 7 diretorias oficiais regimentais com suas respectivas competências; monumento Os Candangos de Bruno Giorgi e matriz tripartite de representação.
- **Crítica & Oportunidade:** A transição entre a estrutura institucional estututária e os dados da gestão em exercício foi resolvida de forma inteligente, mantendo o foco republicano.

### 10. `gestao.qmd` (Gestão em Exercício & Equipe)
- **Pontos Fortes:** Organograma hierárquico claro conectando Assembleia Geral Discente &rarr; Diretoria da Presidência &rarr; Diretorias Setoriais; prestação de contas e compromissos com o bem coletivo.
- **Crítica & Oportunidade:** Incluir um cronograma público das reuniões ordinárias da diretoria e links diretos para leitura das atas públicas.

### 11. `mapa-do-site.qmd` (Mapa do Site & Acessibilidade)
- **Pontos Fortes:** Estrutura taxonômica completa com índices e links para todas as seções; conformidade explícita com WCAG 2.1 AA/AAA.
- **Crítica & Oportunidade:** Adicionar atalho para alternância de alto contraste ou modo de leitura reduzida para estudantes neurodivergentes.

---

## 5. Crítica do Sistema de Design (`DESIGN.md` & Estilos)

1. **Brite Neo-Brutalism:** O sistema visual é extremamente autêntico, diferenciado e memorável. Ele resiste ao "slop corporativo" dos websites institucionais padronizados.
2. **Tipografia:** A combinação Oswald + Inter é enérgica e profissional. O aviso do detector para Inter é um falso positivo documentado e deliberado.
3. **Cores e Acessibilidade:** O uso de `#b45309` (âmbar escuro) e `#15803d` (verde escuro) garante conformidade rigorosa WCAG AA/AAA em fundos claros, eliminando as fraquezas de contraste nativas do Bootstrap.
4. **Touch Targets:** No mobile, os steppers e badges atendem à meta ergonômica mínima de 44x44px.

---

## 6. Problemas Prioritários Classificados

### P1 — Alta Prioridade
1. **Atração e Vitrine Externa (`curso.qmd`):** Criar uma seção dedicada de "Por que fazer Gestão Pública na UFMG?" voltada para vestibulandos, profissionais do setor público e sociedade civil, valorizando o curso perante o Campo de Públicas nacional.
2. **Filtro Facetado no Repositório (`documentos.qmd`):** Implementar filtro rápido por órgão emissor (CEPE, Colegiado, CAGP, Pró-Reitoria) para facilitar a pesquisa normativa discente.

### P2 — Média Prioridade
3. **Busca na Tabela de Atividades de AAC (`acg.qmd`):** Adicionar campo de busca rápida sobre as modalidades de AAC para que o aluno digite "monitoria" ou "empresa júnior" e veja imediatamente a pontuação e os limites.
4. **Indicação de Links Externos:** Inserir micro-ícones semânticos consistentes (`bi-box-arrow-up-right`) em links que levam para fora do domínio institucional da UFMG.
5. **Progressive Disclosure no FAQ:** Integrar gavetas sanfonadas com abertura controlada por URL hash para compartilhamento direto de respostas específicas no WhatsApp.

### P3 — Baixa Prioridade / Polimento
6. **Microinterações nos Cards de Percurso:** Feedback sutil ao passar o cursor sobre as trilhas formativas na página inicial.
7. **Impressão em A4 do Ementário:** Otimizar o estilo `@media print` para o ementário completo das 27 matérias.

---

## 7. Red Flags de Personas

- **Casey (Mobile Noturno com Pressa):** Necessita de carregamento ágil no 4G e botões de fácil alcance com o polegar. *Resolvido no Cockpit e no Espelho com touch targets robustos.*
- **Jordan (Calouro Inseguro):** Tende a se desesperar com códigos de disciplinas e siglas como FAFICH, DCP, ECN. *Necessita de tooltips e explicações em linguagem natural.*
- **Alex (Veterano Pragmático):** Quer saber apenas "quantas horas faltam para formar" e se pode quebrar pré-requisito. *Atendido com excelência pelo Cockpit e pelo FAQ.*
- **Mariana (Liderança e Pesquisa):** Procura oportunidades de extensão, grupos de estudo e articulação com outros centros acadêmicos. *Demanda mais visibilidade para editais e eventos integrados.*
