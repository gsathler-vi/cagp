# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Calouros de Gestão Pública (Noturno):** Recém-ingressantes na UFMG via SiSU ou transferências. Precisam de acolhimento imediato, compreensão da dinâmica do turno noturno (19h00 às 22h30 na FAFICH), rotinas de sobrevivência universitária (emissão de carteirinha, jantar no Restaurante Universitário até 20h30, ônibus circulares noturnos no Campus Pampulha) e entendimento da matrícula mínima obrigatória de 180 horas (12 créditos).
- **Veteranos de Gestão Pública (Noturno):** Discentes em progressão curricular do 2º ao 10º período. Necessitam de planejamento semestral com segurança, compreensão das 27 matérias obrigatórias e suas ementas, escolha formal de um dos 3 percursos oficiais (Geral `01-01`, Complementar `01-02` a partir do 5º período, Avançado `01-03` a partir do 7º período), cumprimento das 300h de Extensão Obrigatória (Resolução CEPE nº 10/2019) e até 300h de Atividades Acadêmicas Complementares (AAC, Art. 15 com prazo de 120 dias), execução do Estágio Supervisionado A e B com possibilidade de dispensa profissional (Art. 41 do Regulamento) e elaboração/defesa do TCC nas 4 modalidades aceitas.
- **Corpo Docente e Colegiado do Curso de Gestão Pública:** Professores do Departamento de Ciência Política (DCP) e departamentos parceiros (ECN, EST, SOA) e a coordenação didática, que utilizam o portal como referência centralizada e transparente de atos normativos e ementas.

## Product Purpose

- **Missão:** Centralizar, democratizar e desmistificar todas as informações pedagógicas, administrativas e normativas do curso de Gestão Pública da FAFICH/UFMG em um ambiente digital intuitivo, moderno e acolhedor.
- **Por que existe:** Para combater a desinformação, a perda de prazos regimentais fatais, a retenção curricular desnecessária e o isolamento dos estudantes do turno noturno, aproximando a representação discente da realidade cotidiana dos discentes.
- **Critérios de Sucesso:** Calouros ambientados sem perder prazos de ajuste de matrícula; veteranos orientados quanto à curricularização da extensão e AAC sem perdas por prazo decadencial; discentes cientes da dispensa profissional de estágio (Art. 41); acesso direto e irrestrito aos PDFs originais dos atos regulamentares; experiência fluida tanto em celulares quanto em desktops.

## Positioning

- O portal não é um mero mural estático de avisos, mas um instrumento pedagógico ativo de governança discente, transparência republicana e emancipação acadêmica.
- É uma iniciativa formulada pela **Chapa [Nome da Chapa a Definir]** com o compromisso ético e público irrevogável de que, independentemente do resultado eleitoral para a gestão do CAGP, todo o portal estruturado, código-fonte e repositório de dados serão entregues e transferidos para a gestão vencedora, por ser um patrimônio coletivo de interesse de todos os estudantes.

## Operating Context

- **Instituição:** Universidade Federal de Minas Gerais (UFMG) — Campus Pampulha, Belo Horizonte/MG.
- **Unidade Acadêmica:** Faculdade de Filosofia e Ciências Humanas (FAFICH), sediado no Departamento de Ciência Política (DCP).
- **Turno:** Noturno (aulas presenciais das 19h00 às 22h30, divididas em blocos de 2h/aula).
- **Sistemas Acadêmicos Oficiais Conexos:**
  - *SIGA-UFMG:* Matrícula semestral online, trancamento e histórico escolar.
  - *MinhaUFMG:* Portal de autenticação unificada, carteirinha digital e e-mail institucional.
  - *SEI-UFMG (Sistema Eletrônico de Informações):* Protocolo digital obrigatório para requerimentos de AAC, aproveitamento de estudos e dispensa de estágio.
  - *PROEX / SIEX:* Registro e validação de horas de extensão universitária.
  - *Equalitas Consultoria Jr.:* Empresa júnior oficial de Gestão Pública da UFMG vinculada ao curso.

## Capabilities and Constraints

- **Páginas e Módulos Estruturados:**
  - `index.qmd`: Hub principal com Card de Emblema Hero oficial dos Candangos, indicadores do curso, ações rápidas e banner documental.
  - `calouros.qmd`: Guia de acolhimento e sobrevivência específico para a rotina noturna na FAFICH.
  - `percurso.qmd`: Linha do tempo interativa dos 10 períodos com 27 ementas oficiais completas em gavetas retráteis `<details>` e comparativo dos 3 percursos curriculares.
  - `estagio-tcc.qmd`: Guia completo de Estágio Supervisionado A (180h) e B (120h), regras de dispensa por trabalho público (Art. 41) e as 4 modalidades de TCC.
  - `acg.qmd`: Distinção regimental estrita entre Formação em Extensão Obrigatória (300h) e AAC (até 300h em 9 categorias com prazo decadencial de 120 dias).
  - `documentos.qmd`: Repositório oficial digitalizado de 6 arquivos normativos originais em PDF com download direto.
  - `faq.qmd`: Perguntas frequentes regimentais com accordions acessíveis.
  - `sobre.qmd`: História da representação discente, relação com o DCP/FAFICH e semiótica da escultura "Os Candangos".
- **Limitações Técnicas:** Site 100% estático compilado via Quarto CLI e publicado na pasta `docs/` para GitHub Pages. Sem backend ou banco de dados relacional.
- **Aviso Permanente:** Banner superior fixo não dispensável (`website.announcement` com `dismissable: false`) informando a autoria e compromisso ético da chapa.
- **Ergonomia Balanceada:** Igualdade de prioridade entre visualização mobile (acesso rápido no campus e transporte) e desktop (leitura densa de regulamentos e ementas).

## Brand Commitments

- **Entidade:** Centro Acadêmico de Gestão Pública (CAGP) — FAFICH / UFMG.
- **Símbolo Oficial:** "Os Candangos (Dois Guerreiros)", monumento de Bruno Giorgi (1959), representando trabalho coletivo, soberania popular e o prumo da administração pública ética.
- **Paleta Canônica (Manual v2.0 & `_brand.yml`):**
  - *Vinho CAGP / Bordeaux:* `#8B1E2D` / `#9E2424` (cor primária de identidade e liderança discente).
  - *Ouro / Mostarda:* `#E8A317` / `#D97706` (cor secundária de destaque, alertas de veteranos e acolhimento).
  - *Preto Sólido:* `#0A0A0A` / `#111111` (bordas, sombras duras e contraste de autoridade).
  - *Off-white Quente:* `#FBF8F3` (fundo de cards de acolhimento e destaque).
  - *Azul Institucional UFMG:* `#1E3F66` / `#0D6EFD` (identidade universitária e atos do colegiado).
- **Tipografia:**
  - *Títulos e Manchetes:* `Oswald` (Google Fonts), peso 700 bold, caixa alta.
  - *Corpo e Leitura:* `Inter` (Google Fonts), pesos 400 a 600, alta legibilidade.
- **Estética Visual:** Tema Bootswatch Brite (Neo-Brutalismo com bordas pretas de 3px, cantos retos `border-radius: 0px`, sombras duras de 4px a 6px e sem gradientes pastéis suaves).

## Evidence on Hand

- **Documentos Normativos Oficiais (`documentos/` e `documentos_oficiais_do_curso/`):**
  - Regimento Interno Oficial do Centro Acadêmico de Gestão Pública (CAGP) — Aprovado em 14/10/2024 (`documentos/regimento-interno-cagp-ufmg.pdf` • 307 KB e `documentos_oficiais_do_curso/regimento_interno_do_centro_acad_mico_de_gest_o_p_blica_cagp.md`).
  - Projeto Pedagógico do Curso (PPC) — Versão Curricular N-20229 (`ppc-gestao-publica-ufmg.pdf` • 3.3 MB).
  - Regulamento Oficial do Curso de Graduação em Gestão Pública (`regulamento-gestao-publica-ufmg.pdf` • 2.0 MB).
  - Ementário Oficial das Disciplinas Obrigatórias dos Departamentos DCP, ECN, EST e SOA (`ementario-gestao-publica-ufmg.pdf` • 3.0 MB).
  - Relatórios Oficiais de Percurso: Bacharelado Núcleo Geral (`percurso-bacharelado-nucleo-geral.pdf`), Núcleo Complementar (`percurso-bacharelado-nucleo-complementar.pdf`) e Núcleo Avançado (`percurso-bacharelado-nucleo-avancado.pdf`).
  - Termo de Aceite de Orientador de TCC — Formulário Oficial do Colegiado (`logos/TERMO-DE-ACEITE-ORIENTADOR-TCC.pdf` • 401 KB).
- **Ativos Vetoriais (`logos/`):**
  - Símbolo puro oficial dos Candangos com dimensões intrínsecas fixas (`logos/10_simbolo_transparente_positivo.svg`).
  - Fotografia histórica da escultura de Bruno Giorgi em Brasília (`logos/Os_Candangos.jpg`).
  - Logotipos institucionais horizontais e verticais em múltiplos contrastes.
- **Registro Técnico:** Histórico completo dos 9 ciclos de desenvolvimento documentado no `README.md`.

## Product Principles

1. **Rigor e Fidelidade Documental:** Nenhuma informação curricular, administrativa ou regimental pode ser fruto de especulação. Tudo deve ser referenciado estritamente nos atos aprovados pelo Colegiado de Gestão Pública, FAFICH e CEPE/UFMG.
2. **Ética, Transparência e Bem Coletivo:** O interesse da formação acadêmica dos estudantes sobrepõe-se a qualquer disputa eleitoral. O portal é um instrumento construído para a comunidade acadêmica e será entregue pronto à gestão que assumir o CAGP.
3. **Clareza Didática Sem Paternalismo:** Traduzir a burocracia universitária para uma linguagem acessível e acolhedora, fornecendo ferramentas analíticas práticas para que o discente assuma a autonomia do seu próprio percurso curricular.
4. **Ergonomia Neo-brutalista Funcional:** A estética neo-brutalista (Brite) deve conferir firmeza, contraste tátil e autoridade visual, sem nunca comprometer o tempo de carregamento, a navegação em telas pequenas ou a scanabilidade do conteúdo.
5. **Universalidade e Acessibilidade:** Garantir que todo conteúdo textual, gráfico e normativo seja acessível a todos os estudantes, com contraste rigoroso (WCAG AAA), semântica estrutural e suporte completo a tecnologias assistivas.

## Accessibility & Inclusion

- Conformidade com os critérios **WCAG 2.1 níveis AA e AAA** em taxas de contraste de texto e componentes interativos.
- Atributos `alt` semânticos e informativos em 100% das imagens e ilustrações.
- Suporte a navegação por teclado com estados de foco nítidos (`focus-visible`).
- Drawers e accordions com atributos semânticos adequados para leitura de tela (`aria-expanded`, `<details>`/`<summary>`).
- Textos em links descritivos, evitando rótulos genéricos descontextualizados.
