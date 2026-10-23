# Portal do CAGP — Gestão Pública UFMG

Site do **Centro Acadêmico de Gestão Pública (CAGP) — FAFICH / UFMG**, com guia do calouro, percurso curricular, estágio e TCC, extensão e AAC, documentos oficiais e dúvidas frequentes. Todo o conteúdo é baseado nos documentos oficiais do curso.

> [!NOTE]
> Este portal é uma **proposta de chapa** para a gestão do CAGP. Independentemente do resultado da eleição, o projeto será disponibilizado à gestão vencedora.

🌐 **Site:** <https://cagp-ufmg.github.io>

## Estrutura

```text
cagp/
├── index.qmd … sobre.qmd   # as 8 páginas do site (ficam na raiz: o caminho define a URL)
├── _quarto.yml             # configuração do site (navbar, rodapé, páginas, recursos)
├── _brand.yml              # cores, fontes e logos da marca
├── _variables.scss         # tema Bootswatch Brite adaptado ao CAGP
├── styles.css              # componentes visuais próprios (.cagp-*)
├── documentos/             # PDFs oficiais para download
├── logos/                  # marcas: cagp/ (publicado) + subpastas de terceiros (uso referencial)
├── imagens/                # fotos e imagens de conteúdo
├── docs/                   # site gerado (não editar à mão)
├── _referencias/           # material de apoio, não publicado
│   ├── documentos-oficiais/  # transcrições .md dos documentos oficiais
│   ├── identidade-visual/    # manuais de identidade visual (CAGP, UFMG, minhaUFMG)
│   ├── sites-informacoes-oficiais/       # capturas do site do Colegiado GP e do Guia Viver UFMG
│   ├── plataformas-e-acessos-externos/   # material de serviços externos (ex.: Interno Rotas)
│   ├── tema-brite-original/  # Bootswatch Brite original (referência)
│   └── memorial-tecnico.md   # histórico completo do desenvolvimento
├── AGENTS.md               # regras do projeto para agentes de IA
├── PRODUCT.md / DESIGN.md  # contexto de produto e design (skill impeccable)
└── .agents/skills/         # skills de IA do workspace
```

## Como rodar

Pré-requisito: [Quarto](https://quarto.org/) ≥ 1.6. Ele também vem com o Positron em `/usr/share/positron/resources/app/quarto/bin/quarto`.

```bash
quarto preview   # pré-visualização local com live-reload
quarto render    # gera o site em docs/
```

Para limpar arquivos órfãos do site gerado: `rm -rf docs && quarto render`.

## Publicação

O GitHub Pages publica a pasta `/docs` da branch `main` (**Settings → Pages → Deploy from a branch → `main` / `/docs`**). Depois de renderizar, basta commitar e dar push.

## Desenvolvimento com IA

O projeto é mantido com o Google Antigravity e quatro skills em `.agents/skills/`:

| Skill | Acionada quando |
| :--- | :--- |
| `impeccable` | Qualquer trabalho de interface: design, crítica, auditoria, acabamento (lê `PRODUCT.md` e `DESIGN.md`) |
| `quarto-authoring` | Edição de `.qmd` e `_quarto.yml`: estrutura das páginas, callouts, divs e navegação |
| `brand-yml` | Mudanças de cores, fontes ou logos em `_brand.yml` |
| `alt-text` | Textos alternativos acessíveis para imagens e logos |

O agente escolhe a skill sozinho, seguindo a seção "Roteamento de Skills" do `AGENTS.md`. A `impeccable` está versionada no repositório (`.agents/skills/impeccable/`, v4.7.0).

As regras do projeto, as fontes de verdade e as convenções de pastas estão em [`AGENTS.md`](AGENTS.md). O histórico de decisões fica em [`_referencias/memorial-tecnico.md`](_referencias/memorial-tecnico.md).
