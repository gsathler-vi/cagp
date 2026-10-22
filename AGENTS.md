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
| `logos/` | **Somente** os SVG de logo do CAGP | ✅ |
| `imagens/` | Fotos e imagens de conteúdo | ✅ |
| `docs/` | **Saída do render. Nunca editar à mão** | ✅ (é o site) |
| `_referencias/` | Material de apoio, ignorado pelo Quarto | ❌ |
| `PRODUCT.md`, `DESIGN.md`, `.impeccable/` | Contexto de produto e design da skill impeccable. **Manter na raiz** | ❌ |
| `.agents/skills/` | Skills do workspace (impeccable, brand-yml, quarto-authoring, alt-text) | ❌ |

## Fontes de verdade (consultar ANTES de escrever ou estilizar)

- **Conteúdo acadêmico e regimental** → `_referencias/documentos-oficiais/*.md` (transcrições). Na página, cite e linke sempre o **PDF** correspondente em `documentos/`. Nunca invente regras, cargas horárias ou códigos de disciplina.
- **Produto, público e tom** → `PRODUCT.md`.
- **Sistema visual** → `DESIGN.md`.
- **Linguagem visual Brite** → `_referencias/tema-brite-original/`. É a referência obrigatória para criar ou ajustar componentes no estilo Brite (bordas pretas, sombras duras, cantos retos). Leia o `README.md` da pasta.
- **Marca** → `_brand.yml` + `_referencias/identidade-visual/manual-de-identidade-visual-cagp-ufmg.md`.
- **Histórico de decisões** → `_referencias/memorial-tecnico.md`.

## Regras de manutenção

1. **Página nova**: crie o `.qmd` na raiz e adicione-o em `project.render` **e** na navbar de `_quarto.yml`. A lista `render:` é explícita de propósito: impede que `README.md`, `AGENTS.md`, `PRODUCT.md` etc. virem páginas.
2. **PDF novo**: vai em `documentos/` (kebab-case, sem acento). Se houver transcrição, ela fica em `_referencias/documentos-oficiais/` com o mesmo nome-base, registrada na tabela do README da pasta.
3. **Imagem nova**: vai em `imagens/`, sempre com `fig-alt` descritivo (skill alt-text). **Logo novo**: vai em `logos/` (SVG).
4. **Estilos**: variáveis e regras do tema em `_variables.scss`; componentes em `styles.css`. **Nunca** edite nem importe os arquivos de `_referencias/tema-brite-original/`.
5. **Não editar `docs/`**: rode o render. Para limpar arquivos órfãos, use `rm -rf docs && quarto render`.
6. Ao concluir um ciclo relevante de mudanças, registre-o em `_referencias/memorial-tecnico.md`.

## Comandos

```bash
quarto preview   # servidor local com live-reload
quarto render    # gera docs/ para publicação
```
