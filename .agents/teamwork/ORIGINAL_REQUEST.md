# Original User Request

## 2026-10-21T22:32:32Z

Atualizar o site institucional do Centro Acadêmico de Gestão Pública (CAGP - FAFICH / UFMG), desenvolvido em Quarto CLI, adequando todo o conteúdo acadêmico aos fatos oficiais contidos nos documentos da pasta `documentos_oficiais_do_curso/` (Regulamento de Graduação, PPC, Ementário e Matriz Curricular N-20229) e disponibilizando os PDFs originais para download e consulta.

Working directory: /home/gsathler/Nextcloud/Projects/cagp
Integrity mode: development

## Requirements

### R1. Disponibilização dos PDFs Originais e Central de Documentos
Copiar os 6 PDFs oficiais de `documentos_oficiais_do_curso/pdfs_originais/` para um diretório estático público (`documentos/`) e configurar `_quarto.yml` para copiar para `docs/documentos/` através do campo `resources: ["documentos/**"]`. Criar uma página `documentos.qmd` com descrição e botões de download de cada arquivo (Regulamento, PPC, Ementário, Percurso Geral, Percurso Complementar e Percurso Avançado). Adicionar link no navbar para 'Documentos'.

### R2. Reestruturação do Percurso Curricular (Fatos Reais N-20229)
Atualizar `percurso.qmd` para refletir as diretrizes curriculares oficiais:
- Duração: 10 semestres padrão (mínimo de 8, máximo de 17 semestres).
- Turno: Noturno (com eventuais estágios/optativas diurnas).
- Carga horária total: 3.000 horas mínimas de integralização (1 crédito = 15 horas).
- Abas interativas (`panel-tabset`) apresentando os 3 Percursos Oficiais:
  1. Percurso Padrão (Núcleo Geral + Específico) com linha do tempo de 1º ao 10º período e códigos reais das disciplinas (ex.: DCP032, DCP123, ECN140).
  2. Percurso com Núcleo Complementar (Formação Transversal / Aberta de 300h a partir do 5º período).
  3. Percurso com Núcleo Avançado (Articulação com Pós-graduação de 300h a partir do 7º período).
- Detalhar Estágio Curricular Obrigatório A (180h / 12 cr no 7º período) e B (120h / 8 cr no 8º período).
- Detalhar TCC I - Projeto (`DCP089` - 60h / 4 cr no 9º período) e TCC II - Defesa (`DCP137` - 120h / 8 cr no 10º período).
- Incluir botões contextuais para download dos relatórios de percurso e ementário em PDF.

### R3. Atividades Complementares (AAC) & Formação em Extensão
Atualizar `acg.qmd` para refletir a terminologia e normas oficiais:
- Seção 1: Formação em Extensão Obrigatória de 300 horas (10% da carga total - Resolução CEPE 10/2019), incluindo disciplinas laboratoriais (`DCP195` / `DCP196`) e atividades de extensão.
- Seção 2: Atividades Acadêmicas Complementares (AAC) com tabela oficial de equivalências (1 crédito = 15 horas), códigos SIGA (`DCP186` a `DCP208`), tetos e prazos regimentais (ex.: 120 dias para comprovação de eventos).
- Incluir botão contextual para download do Regulamento Oficial em PDF.

### R4. Calouros e Página Inicial
Atualizar `calouros.qmd` e `index.qmd` para incluir a informação do turno Noturno, dados do colegiado (FAFICH 2º andar) e atualizar as estatísticas-chave no hero e cards (10 semestres, 3.000 horas, turno noturno, 3 percursos disponíveis).

### R5. Preservação Visual, Animações e Acessibilidade
Manter a identidade visual neo-brutalista do tema Brite adaptado em `styles.css` e `_variables.scss` (cores #0A0A0A, #FFFFFF, #9E2424, sombras duras e bordas de 2px), garantindo total responsividade em smartphones e conformidade com WCAG e `prefers-reduced-motion`. O navbar deve manter o logotipo `logos/10_simbolo_transparente_positivo.svg` e a sigla "CAGP".

## Acceptance Criteria

### Compilação e Estrutura
- [ ] O comando `/usr/share/positron/resources/app/quarto/bin/quarto render` executa com sucesso sem erros para a pasta `docs/`.
- [ ] A pasta `docs/documentos/` contém os 6 PDFs oficiais copiados e acessíveis via HTTP/local.
- [ ] Todos os links de download nos botões das páginas funcionam e apontam para os arquivos PDF correspondentes.

### Conteúdo e Fidelidade
- [ ] A página `percurso.html` exibe a matriz de 10 semestres com os códigos oficiais das disciplinas e abas para os 3 percursos.
- [ ] A página `acg.html` documenta a Formação em Extensão de 300h e a tabela de AACs com códigos do departamento (DCP).
- [ ] A barra de navegação inclui o link para `documentos.html` com o símbolo e a sigla CAGP preservados.
- [ ] As informações de turno Noturno e carga de 3.000h estão refletidas nas páginas de Início e Calouros.
