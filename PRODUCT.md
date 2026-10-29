# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

1. **Estudantes do Bacharelado em Gestão Pública da FAFICH/UFMG (Turno Noturno — 1º ao 10º Período):**
   - **Calouros Ingressantes (1º e 2º períodos):** Chegam ao Campus Pampulha à noite (aulas das `19h00` às `22h35`), frequentemente conciliando trabalho diurno e transporte público. Precisam resolver tarefas urgentes de sobrevivência universitária no celular com uma só mão: localizar salas na FAFICH/CAD, verificar se o Jantar do **RU II Setorial** (`17h30`–`19h00`, `R$ 5,60` geral / `R$ 2,90` FUMP IV / gratuito FUMP I–III) ou as linhas do **Circular Interno** (`Linhas 1 e 4` até `23h05`) estão operando, cumprir o checklist dos primeiros 30 dias (cadastro no MinhaUFMG, carteirinha, FUMP, Office 365) e acionar o plantão noturno do **CEAG FAFICH** (aberto até `22h00`) ou a **Secretaria do Colegiado** (`Sala F-2039`, secretária Norma Guedes, tel. `(31) 3409-3828`).
   - **Veteranos em Planejamento e Integralização Curricular (3º ao 10º períodos):** Precisam planejar sua trajetória entre os **3 percursos curriculares oficiais** (`01-01 Geral`, `01-02 Complementar/Transversal 300h` a partir do 5ºP, `01-03 Avançado/Pós PPGCP` a partir do 7ºP), consultar pré-requisitos e ementas das **27 disciplinas obrigatórias** e **68 optativas**, calcular com precisão regimental suas **300h de Extensão Obrigatória** + até **300h de Atividades Acadêmicas Complementares (AAC — Art. 15)** sem perder o **prazo decadencial fatal de 120 dias corridos** para protocolo de certificados de eventos/anais, verificar elegibilidade para **dispensa de Estágio Supervisionado via Art. 41** (`300h`: `DCP 135` 180h + `DCP 136` 120h) e baixar formulários do **TCC** (`DCP 089` + `DCP 137`).
2. **Comunidade Acadêmica, Docentes (DCP, SOA, ECN, EST) e Avaliadores Institucionais:**
   - Consultam o regimento interno do CAGP (aprovado em `14/10/2024`), a estrutura de governança em **7 Diretorias Estatutárias** (`DIPRE`, `DIJUR`, `DIFI`, `DIAC`, `DIAP`, `DICULT`, `DIMAC`), a **Soberana Assembleia Geral**, a **Junta Eleitoral Permanente**, a prestação de contas ativa (**RREO mensal** com acesso garantido em até `3 dias úteis`) e o catálogo dos **11 Grupos de Pesquisa do DCP/FAFICH**.

## Product Purpose

O **Portal Institucional & Super App Discente do CAGP (FAFICH/UFMG)** transforma um acervo normativo denso e fragmentado (PPC 2020, Regulamento Versão `N-20229`, resoluções do CEPE, formulários administrativos e horários de campus) em uma **plataforma pública de autoatendimento acadêmico instantâneo, auditável e 100% funcional offline (PWA)**.

Seu propósito é eliminar a assimetria informacional e o indeferimento burocrático na graduação noturna em Gestão Pública:
- Garantir que nenhum estudante perca créditos por desconhecer o prazo de `120 dias` de AAC (Art. 15, § 4º) ou o limite do `2º período` para aproveitamento de estudos (Res. CEPE nº 06/2019);
- Oferecer utilitários interativos que calculam tetos de horas, simulam percursos, avaliam dispensa de estágio e guardam os PDFs normativos no aparelho para consulta sem internet nos corredores e subsolos da FAFICH;
- Servir como bem público estudantil perene da comunidade de Gestão Pública da UFMG, independentemente da chapa eleita.

## Positioning

Diferente de páginas acadêmicas estáticas ou links dispersos em redes sociais (`Linktree` / pastas de Drive desorganizadas), o Portal CAGP opera sob uma **Arquitetura Híbrida de Dupla Camada (Web Institucional + Super App PWA Local-First)**:

1. **No Navegador Web (Desktop/Mobile):** Atua como o Portal Institucional e Enciclopédia Regimental do curso e do Centro Acadêmico, com indexação completa, trilha estruturada nas 11 páginas e busca global instantânea (`Cmd/Ctrl + K`).
2. **Quando Instalado na Tela Inicial (`display: standalone` / `html.cagp-is-standalone`):** Comporta-se como um **Super App Universitário Nativo**, ocultando banners promocionais de campanha (`#quarto-announcement` e `#cagp-chapa-banner`), ativando uma Top Command Bar nativa (`52px`), Bottom Tab Bar ergonômica (`60px` + safe-area), transições SPA instantâneas sem recarregamento de tela, **Cofre Acadêmico Local (`localStorage`)** e **Cofre de Documentos Offline (`CacheStorage`)**.

## Operating Context

- **Ambiente Físico e Conectividade:** Usado majoritariamente à noite (`18h00` às `23h00`) no prédio da FAFICH, anexos CAD, pontos do ônibus Circular e Restaurante Universitário no Campus Pampulha (Belo Horizonte/MG, fuso `America/Sao_Paulo` UTC-3), onde o sinal de dados móveis frequentemente oscila.
- **Ecossistema Oficial da UFMG:** Conecta-se como camada de orientação e pré-validação aos sistemas oficiais da universidade: **SIGA UFMG** (matrículas e histórico), **MinhaUFMG** (acesso único e Moodle), **Moodle UFMG**, **SEI! UFMG** (peticionamento eletrônico), **Interno Rotas** (GPS dos circulares), **Catálogo Pergamum / BU** e **FUMP / PRAE**.
- **Rituais Acadêmicos Críticos:** Matrícula semestral no SIGA (mínimo `180h` / `12 créditos` por período), opção formal de mudança de percurso (`01-02` a partir do 5ºP; `01-03` a partir do 7ºP), protocolo de certificados de AAC na Coordenação (`coordgestaopublica@gmail.com`) e entrega impressa na Secretaria (`Sala F-2039`), assinatura de TCE de estágio e depósito do Termo de Aceite de Orientação de TCC.

## Capabilities and Constraints

### Arquitetura das 14 Rotas Canônicas (`*.qmd`) + Rediretor de Compatibilidade
1. **[`index.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/index.qmd) — Início (Hub Operacional, Passaporte Acadêmico & Bússola do Estudante):** Painel ao vivo *"Campus Hoje"* (status em tempo real no fuso de Brasília para RU II, Circular, CEAG e Secretaria F-2039), **Passaporte Acadêmico CAGP** (com foto persistente `256×256px` WebP, pin de orgulho LGBTQIAPN+, progresso de curso e carimbo dinâmico), Bússola Interativa por perfil (com seleção automática pelo período do estudante), Catálogo dos 8 Micro-Apps e Central de Sistemas UFMG.
2. **[`curso.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/curso.qmd) — O Curso de Gestão Pública:** Histórico institucional (criado em `19/08/2008` via REUNI, início em `2009`, nota `4` no CPC/MEC), perfil do egresso, dados de inserção profissional (Pesquisa de Egressos 2023), departamentos parceiros (`DCP`, `SOA`, `ECN`, `EST`) e diretoria/secretaria do Colegiado.
3. **[`pesquisa.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/pesquisa.qmd) — Pesquisa, Iniciação Científica & 11 Núcleos do DCP:** Catálogo completo dos **11 Grupos de Pesquisa do DCP/FAFICH** em 3 eixos temáticos (`PUBLICUS`, `CEPPI`, `NESTH`, `CEL`, `Rede Femjusp`, `MARGEM & OJB`, `RIPPERP`, `PRODEP`, `INCT/IDDC`, `NEPEM`, `CECOMP`), guia de integralização de Iniciação Científica (`até 90h` de AAC Modalidade V) e Programa de Imersão no Campo de Públicas.
4. **[`calouros.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/calouros.qmd) — Guia de Sobrevivência do Calouro:** Checklist interativo persistente dos primeiros 30 dias (`6 passos`), guia da rotina noturna (RU II, cantinas, circulares), mapa de serviços (Secretaria F-2039 com escala de Norma Guedes e CEAG até 22h), bibliotecas e assistência estudantil (FUMP, PRAE e NAI).
5. **[`percurso.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/percurso.qmd) — Percurso Curricular & Ementas (10 Semestres):** **Grafo Cartográfico Interativo (SVG/DAG)** das 27 disciplinas obrigatórias (destacando a única trava formal no SIGA: `ECN 140 -> ECN 044`, além dos encadeamentos pedagógicos recomendados e do período atual do estudante), linha do tempo filtrável dos 10 períodos com ementas completas e simulador vocacional dos 3 percursos oficiais (`01-01`, `01-02`, `01-03`).
6. **[`optativas.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/optativas.qmd) — Catálogo de 68 Optativas & Formação Livre (120h):** Explorador pesquisável e filtrável das **68 disciplinas optativas** do PPC N-20229 por departamento (`DCP`, `ECN`, `SOA`, `EST`, `DEM`, `CIC`, `LET`), sincronizado com a carteira *Minha Grade*, mais guia completo das **120h de Formação Livre**.
7. **[`acg.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd) — Extensão Obrigatória (300h) & Horas AAC (Até 300h):** **Calculadora Interativa de 600h** com travas automáticas de teto por categoria (Res. CEPE 10/2019 e Art. 15 do Regulamento), gavetas explicativas *"O que conta / O que não conta"*, **Guardião de 120 Dias**, tabela pesquisável das 9 modalidades de AAC, tutorial visual com pinos numerados do Requerimento `N-20229` e gerador de Espelho Oficial A4 pré-preenchido com o perfil do estudante.
8. **[`estagio.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/estagio.qmd) — Estágio Supervisionado (`300h`) & Dispensa Art. 41:** Regras do Estágio Obrigatório (`DCP 135` Estágio A 180h no 7ºP + `DCP 136` Estágio B 120h no 8ºP), Estágio Não-Obrigatório, **Simulador de Dispensa por Atuação Profissional (Art. 41)** e tutorial anotado do TCE / Seguro UFMG.
9. **[`tcc.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/tcc.qmd) — Trabalho de Conclusão de Curso (`180h`):** Regras de Elaboração (`DCP 089`, `60h`) e Defesa (`DCP 137`, `120h`), **4 modalidades oficiais de TCC** (`Monografia`, `Artigo Científico`, `Relatório Técnico`, `Projeto de Intervenção`) e download do Termo de Aceite de Orientador.
10. **[`estagio-tcc.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/estagio-tcc.qmd) — Hub Rediretor de Compatibilidade:** Mantém redirecionamento instantâneo (`[data-cagp-redirect]`) de âncoras legadas para `estagio.html` e `tcc.html`.
11. **[`documentos.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/documentos.qmd) — Documentos & Formulários Oficiais:** **Cofre Offline de 8 PDFs Essenciais** via `CacheStorage`, busca instantânea com atalhos e Central de Formulários Administrativos dividida em 4 abas (Vida Acadêmica/Colegiado, Estágio Supervisionado, Apoio/Inclusão/Sistemas e Legislação Superior), mais tutorial anotado do requerimento DRCA.
12. **[`faq.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/faq.qmd) — Dúvidas Frequentes (FAQ com Busca):** Base de conhecimento regimental pesquisável por palavras-chave e categorias (Matrícula, Trancamento, Quebra de Pré-requisito, Percursos, Horas AAC, Estágio e TCC).
13. **[`sobre.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/sobre.qmd) — O Centro Acadêmico (História, Símbolo e Regimento):** Semiótica do monumento *"Os Candangos"* (Bruno Giorgi, 1959), princípios constitucionais da Administração Pública (**LIMPE** — Art. 8º, III) e suprapartidarismo (Art. 4º), Soberana Assembleia Geral, Junta Eleitoral Permanente, atribuições das 7 Diretorias, linha sucessória (Art. 26), composição do Colegiado/NDE e representação tripartite (`CAGP` x `DA FAFICH` x `DCE UFMG`).
14. **[`gestao.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/gestao.qmd) — Gestão em Exercício & Equipe:** Organograma hierárquico interativo da Chapa C.A. Vivo (2025/2026), quadros das 7 diretorias e 6 comissões (18 integrantes), instrumentos de transparência ativa (RREO mensal, Livro de Atas aberto, acesso às contas em até 3 dias úteis — Art. 15, V) e ouvidoria discente.
15. **[`mapa-do-site.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/mapa-do-site.qmd) — Mapa do Site:** Índice estruturado das 14 rotas em 5 eixos com filtro instantâneo em tempo real (conformidade WCAG 2.4.5 — Multiple Ways).

### Contrato de Persistência Local (`localStorage` & `CacheStorage`)
- `cagp_calc_ext_aac_v1`: Estado JSON das horas simuladas na Calculadora 600h (`acg.qmd` <-> Cofre PWA).
- `cagp_aac_120d_certs_v1`: Array JSON de certificados monitorados no Guardião de 120 Dias (`acg.qmd` <-> Cofre PWA).
- `cagp_notifications_prefs_v1`: Preferências de alertas noturnos (RU II 18h15, Circular 22h30 e Prazo 120d).
- `cagp_calouro_checklist_v1`: Array/Objeto JSON dos 6 passos concluídos no Guia do Calouro (`calouros.qmd` <-> Cofre PWA).
- `cagp_percurso_quiz_v1`: Código do percurso recomendado/selecionado (`"01-01"`, `"01-02"`, `"01-03"` em `percurso.qmd` <-> Cofre PWA).
- `cagp_minha_grade_v1`: Objeto JSON com disciplinas obrigatórias concluídas (`completed`) e optativas favoritas (`favorites`).
- `cagp_art41_checklist_v1`: Objeto JSON com requisitos marcados no Simulador de Dispensa de Estágio Art. 41 (`estagio.qmd`).
- `cagp_a11y_prefs_v2`: Preferências de acessibilidade (`accessibility.html`).
- `cagp_student_profile_v1`: Objeto JSON com identidade local do estudante (`name`, `pronouns`, `period`, `entrySemester`, `pathway`, `avatarMode`, `avatarPreset`, `photoDataUrl` `256×256px` WebP, `prideFlag`), sincronizado no **Passaporte Acadêmico CAGP**, Top Bar, Bússola, Percurso, Espelho N-20229 e **Meu CAGP Sync**.
- `cagp-pdfs-oficiais-v1` (`CacheStorage`): Armazenamento offline dos 8 PDFs normativos essenciais em `documentos.qmd`.

### Restrições Técnicas e Regimentais Inegociáveis
- **Compilação Estática Quarto (`docs/`):** Todo o portal é compilado via Quarto (`_quarto.yml`, `lang: pt-BR`) para HTML estático servido via GitHub Pages em `docs/`, sem dependência de backend proprietário.
- **Privacidade Absoluta (Zero Servidor / Zero Rastreamento):** Nenhum dado acadêmico simulado pelo estudante sai do seu dispositivo.
- **Fidelidade Documental:** Zero alteração em números de resoluções, artigos do regulamento, cargas horárias, nomes de docentes/secretaria ou arquivos da pasta `documentos/`.

## Brand Commitments

- **Entidade:** Centro Acadêmico de Gestão Pública (CAGP) — FAFICH / UFMG.
- **Símbolo Institucional:** Inspirado na escultura *"Os Candangos"* (*Dois Guerreiros*, 1959), de Bruno Giorgi, representando trabalho coletivo, prumo republicano e pilares democráticos.
- **Voz e Tom:** Público, republicano, acolhedor com o estudante trabalhador do turno noturno, juridicamente preciso (sempre citando o artigo ou resolução correspondente) e estritamente suprapartidário (Arts. 3º e 4º do Regimento Interno).
- **Compromisso de Transição Democrática:** O aviso institucional registra que o portal é um projeto colocado integralmente à disposição da gestão eleita do CAGP, pois a transparência e o acesso à informação pertencem a todo o corpo discente.
- **Identidade Visual:** Neo-Brutalismo Brite / CAGP ([`_brand.yml`](file:///home/gsathler/Nextcloud/Projects/cagp/_brand.yml) e [`manual-de-identidade-visual-cagp-ufmg.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/identidade-visual/manual-de-identidade-visual-cagp-ufmg.md)).

## Evidence on Hand

- **Acervo Documental Real (`documentos/` — 53 arquivos `.pdf` e `.docx`):** Inclui [`ppc-gestao-publica-ufmg.pdf`](file:///home/gsathler/Nextcloud/Projects/cagp/documentos/ppc-gestao-publica-ufmg.pdf), [`regulamento-gestao-publica-ufmg.pdf`](file:///home/gsathler/Nextcloud/Projects/cagp/documentos/regulamento-gestao-publica-ufmg.pdf), [`ementario-gestao-publica-ufmg.pdf`](file:///home/gsathler/Nextcloud/Projects/cagp/documentos/ementario-gestao-publica-ufmg.pdf), as 3 matrizes curriculares (`percurso-bacharelado-nucleo-geral.pdf`, `-complementar.pdf`, `-avancado.pdf`), [`regimento-interno-cagp-ufmg.pdf`](file:///home/gsathler/Nextcloud/Projects/cagp/documentos/regimento-interno-cagp-ufmg.pdf), [`termo-aceite-orientador-tcc.pdf`](file:///home/gsathler/Nextcloud/Projects/cagp/documentos/termo-aceite-orientador-tcc.pdf), requerimentos de AAC (`v20229` e `v20152`), modelos de TCE/relatórios de estágio e resoluções CEPE/UFMG.
- **Ativos Visuais Oficiais (`logos/` e `imagens/`):** Vetores oficiais do CAGP (`logos/cagp/`), marcas dos sistemas UFMG (`logos/ufmg/`), fotografia histórica de *Os Candangos* (`imagens/os-candangos.jpg`), ícones PWA (`imagens/pwa/`) e capturas reais anotadas dos formulários da FAFICH (`imagens/tutoriais/`).
- **Fatos em Aberto (Não Fabricar):** Os nomes individuais dos estudantes ocupantes da Presidência e Vice-Presidência na página `gestao.qmd` estão marcados como *"Membro a Definir"* até a homologação e posse formal perante a Soberana Assembleia Geral, e o nome da chapa no aviso de topo permanece parametrizado como `Chapa [Nome da Chapa a Definir]`. Nenhum nome fictício deve ser inventado.

## Product Principles

1. **Utilidade Operacional Acima de Burocracia:** Toda regra regimental complexa (Art. 3º, Art. 15, Art. 41) deve ser acompanhada de uma ferramenta interativa (simulador, calculadora ou árvore de decisão) que dê a resposta prática em segundos.
2. **Respeito Absoluto à Rotina do Estudante Noturno:** Informações críticas de tempo real (RU II, Circular, CEAG, Secretaria) e atalhos de bolso têm prioridade máxima de acesso no celular.
3. **Fidelidade Legal e Rastreabilidade:** Toda orientação exibida na interface deve indicar sua fonte normativa exata (artigo do Regulamento, Resolução CEPE ou Regimento) e oferecer o botão direto para baixar o PDF oficial.
4. **Autonomia Offline e Privacidade Local-First:** Os cálculos de horas, checklists, escolhas de percurso e PDFs essenciais devem funcionar sem conexão à internet e permanecer salvos exclusivamente no aparelho do aluno.

## Accessibility & Inclusion

- **Padrão Exigido:** Conformidade **WCAG 2.1 Nível AAA** em contraste textual e navegação assistiva.
- **Suíte Nativa de Acessibilidade ([`_includes/accessibility.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/accessibility.html)):**
  - Escalonamento tipográfico até `200%` (`100%`, `115%`, `130%`, `150%`);
  - Modos de contraste dedicados (**Alto Contraste AAA**, **Modo Noturno Escuro** e **Sépia / Leitura Longa**);
  - Tipografia amigável para **Dislexia** e ajuste de espaçamento de leitura;
  - ** Destaque de Links**, **Pausa de Animações** (sincronizada com `prefers-reduced-motion: reduce`), **Régua de Leitura** e **Máscara de Foco Cognitivo (TDAH)**;
  - Alvos de toque mínimos de `48x48px`, suporte completo a teclado (`Tab`, `Escape`, `Cmd/Ctrl + K`, *Skip Links*) e declaração de idioma `lang="pt-BR"`.
