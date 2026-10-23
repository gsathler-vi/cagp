# AGENTS.md — Regras do Projeto CAGP UFMG

Site institucional do Centro Acadêmico de Gestão Pública (CAGP — FAFICH/UFMG), feito com **Quarto** (website), publicado no GitHub Pages a partir de `docs/`. Idioma do conteúdo: **português do Brasil**.

## Mapa de pastas

| Caminho | Papel | Publicado? |
| :--- | :--- | :--- |
| `*.qmd` (raiz) | As 8 páginas do site. **Não mover**: o caminho define a URL pública | ✅ (renderizado) |
| `_quarto.yml` | Configuração do projeto: navbar, rodapé, anúncio da chapa, `render:` e `resources:` | — |
| `_brand.yml` | Tokens de marca (cores, fontes, logos), detectado automaticamente pelo Quarto na raiz | — |
| `_variables.scss` | Tema SCSS: Brite adaptado ao CAGP (`scss:defaults` + `scss:rules`) | — |
| `styles.css` | Componentes próprios do CAGP (`.cagp-*`, callouts) | ✅ |
| `documentos/` | PDFs oficiais para download (nomes kebab-case sem acento) | ✅ |
| `logos/` | Acervo de marcas, **uma subpasta por entidade** (`cagp/`, `ufmg/`, `minhaufmg/`, `siga/`, `fump/`, `interno-rotas/`) | ⚠️ só `logos/cagp/**` por padrão (ver regra 4) |
| `imagens/` | Fotos e imagens de conteúdo | ✅ |
| `docs/` | **Saída do render. Nunca editar à mão** | ✅ (é o site) |
| `_referencias/` | Material de apoio, ignorado pelo Quarto | ❌ |
| `_referencias/sites-informacoes-oficiais/` | Capturas dos sites oficiais do Colegiado GP (`colegiado-gp/`) e do Guia Viver UFMG (`guia-viver-ufmg/`). HTML bruto fica fora do git | ❌ |
| `_referencias/plataformas-e-acessos-externos/` | Material de serviços externos linkados no portal (ex.: `interno-rotas/`, licença MIT) | ❌ |
| `PRODUCT.md`, `DESIGN.md`, `.impeccable/` | Contexto de produto e design da skill impeccable. **Manter na raiz** | ❌ |
| `.agents/skills/` | Skills do workspace (impeccable, brand-yml, quarto-authoring, alt-text). Uso automático em "Roteamento de Skills" | ❌ |

## Fontes de verdade (consultar ANTES de escrever ou estilizar)

**Conteúdo acadêmico, regimental e operacional**, em ordem de precedência:

1. **Normas** (cargas horárias, códigos de disciplina, prazos regimentais) → `_referencias/documentos-oficiais/*.md` (transcrições). O **PDF** em `documentos/` prevalece. Na página, cite e linke sempre o PDF. Nunca invente regras, cargas horárias ou códigos de disciplina.
2. **Informação operacional e mutável** (horários, salas, contatos, passo a passo, formulários) → site oficial do Colegiado em `_referencias/sites-informacoes-oficiais/colegiado-gp/`. Na página, linke a **URL oficial viva** e indique a **data da captura**. Se o site e um PDF divergirem em informação operacional, vale o mais recente, e o conflito deve ser sinalizado ao responsável.
3. **Complemento institucional da UFMG** → `_referencias/sites-informacoes-oficiais/guia-viver-ufmg/`. Quando o Guia Viver UFMG e o Colegiado tratarem do mesmo tema, mescle as informações, mas **prevalece o que é específico do curso/Colegiado**.

Demais fontes:

- **Produto, público e tom** → `PRODUCT.md`.
- **Sistema visual** → `DESIGN.md`.
- **Linguagem visual Brite** → `_referencias/tema-brite-original/`. É a referência obrigatória para criar ou ajustar componentes no estilo Brite (bordas pretas, sombras duras, cantos retos). Leia o `README.md` da pasta.
- **Marca do CAGP** → `_brand.yml` + `_referencias/identidade-visual/manual-de-identidade-visual-cagp-ufmg.md`.
- **Marcas de terceiros** → `_referencias/identidade-visual/manual-de-identidade-visual-ufmg.md` e `manual-de-identidade-visual-minhaufmg.md` (versões, áreas de proteção e usos por fundo).
- **Histórico de decisões** → `_referencias/memorial-tecnico.md`.

## Roteamento de Skills

As skills em `.agents/skills/` só mostram nome e descrição até serem ativadas. **Ative-as por conta própria** seguindo esta seção, sem esperar o usuário pedir. Antes de ativar, leia o `SKILL.md` inteiro e abra apenas os `references/` que a tarefa exigir.

### Precedência

1. `AGENTS.md`, `PRODUCT.md` e `DESIGN.md` do projeto.
2. A skill acionada.
3. O padrão geral do agente.

A linguagem **Brite** (bordas pretas, sombras duras, cantos retos; ver `DESIGN.md`) é o *brief fixado* da `impeccable`: a skill manda honrar o brief mesmo quando ele conflita com suas proibições gerais. Exemplos genéricos das skills (ex.: `theme: cosmo`) **não valem** aqui.

### Matriz de decisão

| Se a tarefa é… | Skill | Como |
| :--- | :--- | :--- |
| Criar, redesenhar, revisar, polir ou auditar interface (layout, tipografia, cor, responsivo, UX copy, acessibilidade visual, componentes `.cagp-*`) | `impeccable` | Escolha o comando na tabela abaixo. Rode `.agents/skills/impeccable/scripts/impeccable context` uma vez por sessão |
| Escrever ou editar `.qmd`, `_quarto.yml`, callouts, divs, tabsets, layout, shortcodes, navbar, `render:` | `quarto-authoring` | `SKILL.md` e, conforme o caso, as referências `callouts`, `divs-and-spans`, `layout`, `shortcodes`, `yaml-front-matter`, `figures`, `tables`, `extensions` |
| Mudar cores, fontes ou logos da marca em `_brand.yml` | `brand-yml` | Só "Creating", "Modifying", "Troubleshooting" e `references/quarto.md` |
| Adicionar ou revisar `alt` de imagem ou logo | `alt-text` | Adaptada ao formato do portal (ver "Limites") |
| Dúvida sobre o Antigravity (CLI, IDE, slash commands) | `antigravity-guide` | Só quando perguntado |
| Criar ou ajustar skills, regras, hooks ou plugins do projeto | `agy-customizations` | Só quando pedido |
| Conteúdo acadêmico, regimental ou operacional | *(nenhuma)* | Siga "Fontes de verdade" |

### `impeccable`: qual comando, e quando

| Situação | Comando |
| :--- | :--- |
| Nova seção, página ou componente | `shape`, depois o fluxo "new-work" |
| `PRODUCT.md` ou `DESIGN.md` desatualizado | `init` ou `document`; `doctor` detecta desvios |
| Avaliar uma página existente | `critique <página>` (relatórios em `.impeccable/critique/`) |
| Problemas técnicos (a11y, desempenho, responsivo) | `audit <alvo>` |
| Acabamento antes de publicar | `polish <alvo>` |
| Página longa ou carregada | `distill` e `layout` |
| Hierarquia tipográfica | `typeset` |
| Textos, rótulos, mensagens | `clarify` |
| Mobile, tablet, desktop | `adapt` |
| Extrair tokens ou componentes de `styles.css` | `extract` |

Nunca rode comando sem argumento. Não use `overdrive`, `delight` nem `bolder` sem pedido (o tom é institucional e a marca já é forte). `live` e `generate` só com `quarto preview` rodando.

### Limites (o que **não** usar)

- `quarto-authoring`: ignore células de código, cache, citações/BibTeX, `engines` e as seis `references/conversion-*`. O portal é estático e não tem células executáveis.
- `brand-yml`: ignore `shiny-r`, `shiny-python` e `brand-yml-in-r`.
- `alt-text`: foi escrita para gráficos de dados e procura `#| label: fig-`, que não existe aqui. Aplique só o espírito: diga o tipo da imagem primeiro, o que ela mostra e por que está na página, sem "imagem de". Para logos: nome da entidade e função (ex.: "Logo do SIGA UFMG"). O texto vai em `alt=` no HTML e em `fig-alt=` no Markdown.

### Playbooks por tarefa

| Tarefa | Ordem |
| :--- | :--- |
| **Página nova** | `quarto-authoring` (criar `.qmd`, `render:` e navbar) → `impeccable shape` → `impeccable polish` → verificação |
| **Conteúdo novo ou corrigido** | "Fontes de verdade" (PDF > site do Colegiado > Guia Viver) → `quarto-authoring` → `impeccable clarify` → verificação |
| **Componente visual** | `impeccable shape` + `_referencias/tema-brite-original/` → editar `styles.css` ou `_variables.scss` → `impeccable audit` → verificação |
| **Logo ou imagem nova** | Regras 3 e 4 de manutenção → `alt-text` → verificação |
| **Mudança de marca** | `brand-yml` → conferir o manual → `impeccable document` se o `DESIGN.md` ficar desatualizado → verificação |
| **Revisão geral de uma página** | `impeccable critique` → `audit` → `polish` |

### Verificação obrigatória

Depois de mexer em `.qmd`, `styles.css`, `_variables.scss` ou `_quarto.yml`:

```bash
quarto render
.agents/skills/impeccable/scripts/impeccable detect --json docs/*.html
```

Corrija o que o detector apontar antes de dar a tarefa por concluída. Exceção conhecida: o aviso `overused-font` para **Inter** é esperado, pois a tipografia (Oswald + Inter) faz parte da marca fixada em `_brand.yml` e `DESIGN.md`; não troque a fonte por causa dele. Não ative o hook do detector sem pedido.

### Skills built-in e dependências

- `plugin`, `automation` e `generative_ui` só sob pedido explícito. `migrate-workflows` e `ui-plugin-navigation` não se aplicam.
- A `impeccable` está **versionada em `.agents/skills/impeccable/`** (v4.7.0, com binário Linux x64; em outro sistema a própria skill baixa o binário na primeira execução). Para atualizar, use `impeccable update` e registre a versão no memorial.

## Regras de manutenção

1. **Página nova**: crie o `.qmd` na raiz e adicione-o em `project.render` **e** na navbar de `_quarto.yml`. A lista `render:` é explícita de propósito: impede que `README.md`, `AGENTS.md`, `PRODUCT.md` etc. virem páginas.
2. **PDF novo**: vai em `documentos/` (kebab-case, sem acento). Se houver transcrição, ela fica em `_referencias/documentos-oficiais/` com o mesmo nome-base, registrada na tabela do README da pasta.
3. **Imagem nova**: vai em `imagens/`, sempre com `fig-alt` descritivo (skill alt-text).
4. **Logo novo**: vai em `logos/<entidade>/`.
   - **CAGP** (`logos/cagp/`): somente SVG. É a única subpasta publicada por padrão (`resources: logos/cagp/**` em `_quarto.yml`).
   - **Terceiros** (UFMG, minhaUFMG, SIGA, FUMP, Interno Rotas): só uso **referencial**, para identificar um serviço ou sistema. Use o arquivo sem alterar (sem recolorir, distorcer ou cortar), com `alt` descritivo e respeitando o manual da marca. Um logo de terceiro só vai para `docs/` quando uma página o referencia (o Quarto copia automaticamente), sem entrar em `resources`.
   - A **marca UFMG nunca aparece em cabeçalho, navbar, rodapé ou hero**, para não sugerir que o portal é institucional.
   - **Interno Rotas** (MIT): onde o app for citado, linke `https://internorotas.com/` e mantenha o crédito. A licença fica em `_referencias/plataformas-e-acessos-externos/interno-rotas/LICENSE`.
5. **Nomes de arquivos e pastas**: kebab-case, **sem acento e sem espaço** (ex.: `manual-de-identidade-visual-minhaufmg.md`). Exceções: as variações oficiais do CAGP em `logos/cagp/` (`NN_nome.svg`, catalogadas no manual), `README`/`LICENSE`, e os HTML brutos capturados, que mantêm o nome original.
6. **Capturas de sites**: não versione HTML bruto nem as pastas `*_files/` (~120 MB). O `.gitignore` já cobre `_referencias/sites-informacoes-oficiais/`. Versione só transcrições `.md` e PDFs. Ao capturar de novo, registre origem e data em `_referencias/sites-informacoes-oficiais/README.md`.
7. **Estilos**: variáveis e regras do tema em `_variables.scss`; componentes em `styles.css`. **Nunca** edite nem importe os arquivos de `_referencias/tema-brite-original/`.
8. **Não editar `docs/`**: rode o render. Para limpar arquivos órfãos, use `rm -rf docs && quarto render`.
9. Ao concluir um ciclo relevante de mudanças, registre-o em `_referencias/memorial-tecnico.md`, incluindo mudanças nas skills (versão da `impeccable`, skills novas ou ajustes de roteamento).

## Comandos

```bash
quarto preview   # servidor local com live-reload
quarto render    # gera docs/ para publicação
```
