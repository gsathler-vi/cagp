# Sites Oficiais Capturados

Cópias locais de páginas oficiais, usadas para **consulta ao redigir o conteúdo operacional** do portal (horários, secretaria, estágio, programas, assistência estudantil).

> [!IMPORTANT]
> Os arquivos `.html` e as pastas `*_files/` (~120 MB) **não são versionados** (ver `.gitignore`). Só entram no git as transcrições `.md` e os PDFs. Para ter a captura completa, refaça-a no navegador (Salvar página como…) nas mesmas subpastas.

## Origem

| Subpasta | Site de origem |
| :--- | :--- |
| `colegiado-gp/` | Graduação em Gestão Pública da UFMG — <https://www.fafich.ufmg.br/gestaopublica/> |
| `guia-viver-ufmg/` | Guia Viver UFMG — <https://www.ufmg.br/viverufmg/> |

Data da captura: **até 23/10/2026** (data dos arquivos locais; a data exata de cada página não foi registrada). Cada HTML traz a URL de origem no comentário `saved from url=` do início do arquivo. Ao recapturar, atualize esta data.

## Mapa

| Subpasta | Conteúdo |
| :--- | :--- |
| `colegiado-gp/colegiado`, `nde` | Coordenação, membros e NDE (síntese em `nde-e-colegiado.md`) |
| `colegiado-gp/estagio` | Configuração, passo a passo e modelos de estágio (síntese em `estagio-curricular.md`) |
| `colegiado-gp/normas` | Normas da graduação, regulamento e resoluções |
| `colegiado-gp/o-curso` | Forma de ingresso, núcleos de pesquisa, perfil do gestor, perguntas frequentes |
| `colegiado-gp/programas` | Apoio ao aluno, mobilidade acadêmica, programa de imersão |
| `colegiado-gp/secretaria` | Formulários, funcionamento e procedimentos (síntese em `secretaria-e-procedimentos.md`) |
| `colegiado-gp/vida-academica` | Grade de horários |
| `colegiado-gp/recepcao-ingressantes-2024-2.pdf` e `transcricao-recepcao-ingressantes-2024-2.md` | Apresentação da Coordenação aos ingressantes de 2024/2 e sua transcrição |
| `guia-viver-ufmg/01-primeiros-passos` | Acessos, carteira, Wi-Fi, biblioteca, glossário (síntese em `sistemas-e-primeiros-passos.md`) |
| `guia-viver-ufmg/02-vida-academica`, `03-assistencia-estudantil` | Calendário, direitos humanos, saúde mental, acessibilidade (síntese em `vida-academica-e-servicos.md`) |
| `fump/` | Assistência estudantil, questionário socioeconômico e funcionamento dos RUs (síntese em `assistencia-estudantil-e-alimentacao.md`) |

## Regra de precedência

1. Normas: o **PDF** em `../../documentos/` prevalece.
2. Informação operacional: vale o site do **Colegiado** capturado. Na página do portal, linke a URL viva e indique a data da captura.
3. O **Guia Viver UFMG** complementa. Havendo o mesmo tema nos dois, mescle, mas prevalece o específico do curso.
4. Em conflito, vale a fonte mais recente e o conflito deve ser sinalizado.
