# Brief de Conceito & Arquitetura (EGM Brainstorm): Unificação Passaporte/Perfil Discente & Nova Página de Configurações

* **Projeto:** Super App Discente CAGP UFMG (FAFICH/UFMG)
* **Data:** 2026-10-30
* **Autores / Lentes:** Antigravity + EGM Multi-Lens (Contrarian, Economics, UX Ergonomics, Backward Compatibility, Observability, Maintenance)
* **Contexto e Benchmark:** Análise das telas de benchmark (Banco Inter: Perfil segmented `[Cadastro|Forum]` com avatar e edição rápida, e Configurações categorizada em `Termos`, `Funcionalidades`, `Sistema`).

---

## 1. Overview (Visão Geral)

Este documento estabelece o refinamento arquitetural da interface discente do Super App CAGP, resolvendo a sobrecarga cognitiva e a mistura indevida de papéis hoje existente no modal `#cagp-settings-sheet`:
1. **Unificação Integral de "Passaporte Acadêmico" e "Perfil Discente":** O aluno passa a ter uma área única, coesa e moderna para identificação acadêmica, progresso curricular e cadastro de seus dados, incluindo **Áreas de Interesse**, competências e links profissionais, preparando a base estrutural para o futuro **Banco de Talentos Discentes da Gestão Pública UFMG**.
2. **Criação da Página Autônoma de Configurações (`configuracoes.qmd`):** Desacoplamento completo das opções de sistema, governança de dados e ferramentas operacionais. A nova rota centraliza as preferências de **Acessibilidade Universal** (sem necessidade de abrir modais aninhados), alertas de sobrevivência noturna no campus (RU II e Circular), ferramentas de backup do cofre (`Meu CAGP Sync`), alternador de modo de visualização e links regimentais.

---

## 2. Análise Multi-Lente EGM (Stress-Testing)

### Lente 1: Contrarian / YAGNI (Minimalismo e Evitar Complexidade Ociosa)
* **Provocação:** *Precisamos criar um backend para o "Banco de Talentos" agora?*
* **Veredito:** **Não.** Criar banco de dados ou endpoints agora violaria a cláusula pétrea de "Operação Estática e 100% Offline" e as regras de privacidade LGPD. O escopo correto para esta fase é preparar **estruturalmente** o modelo de dados local (`cagp_student_profile_v1`), os campos de entrada, chips de seleção de áreas de interesse e consentimento discente. Quando o CAGP deliberar o backend institucional de talentos, os dados já estarão prontos para exportação/sincronização voluntária.

### Lente 2: Economia de Armazenamento & Quota Base64 (Token/Storage Economics)
* **Provocação:** *Adicionar áreas de interesse, mini-bio e links profissionais vai estourar o backup `CAGP1:...` (limite de 65.536 caracteres para envio via WhatsApp)?*
* **Veredito:** O payload Base64 atual consome até ~60 KB quando há foto WebP `256×256` embutida. Áreas de interesse salvas como array de identificadores curtos (ex.: `["pol_pub", "orcamento", "govtech"]`) e textos limitados (`bio` até 280 caracteres, `linkedin` até 100 caracteres) adicionam menos de 600 bytes comprimidos. O limite do WhatsApp permanece plenamente seguro.

### Lente 3: UX & Ergonomia Noturna (Apple HIG & Benchmark Mobile)
* **Provocação:** *Como apresentar o Passaporte e o Perfil sem criar um formulário maçante de 20 campos?*
* **Veredito:** Inspirado no benchmark da imagem de Perfil anexada pelo usuário:
  - Cabeçalho com Avatar circular com badge de câmera/edição, Nome discente e badge de período/percurso.
  - Controle segmentado interno:
    - **Aba 1 (Passaporte & Carteira):** O Crachá Acadêmico institucional visual, barras de 27 obrigatórias e 600h AAC, anel de integralização e marcadores de diversidade.
    - **Aba 2 (Perfil & Banco de Talentos):** Grupos sanfonados ou limpos para Dados Pessoais/Contato, Áreas de Interesse (chips tocáveis com feedback tátil), Habilidades em Gestão Pública, Links (LinkedIn/Lattes) e Declaração de Participação no Banco de Talentos.

### Lente 4: Compatibilidade Retroativa & Migração Segura (Backward Compatibility)
* **Provocação:** *O que acontece com os dados dos alunos que já salvaram foto, nome ou período em `cagp_student_profile_v1`?*
* **Veredito:** `cagp_student_profile_v1` é estendido com campos opcionais via padrão `Object.assign({}, defaults, parsed)`. Se as novas chaves (`interests`, `bio`, `linkedin`, `skills`, `talentPoolConsent`) estiverem ausentes no `localStorage`, valores padrão neutros (`[]`, `""`, `false`) são preenchidos sem quebra de integridade.

### Lente 5: Manutenibilidade a Longo Prazo & Taxonomia das 15 Rotas
* **Provocação:** *A nova rota `configuracoes.html` quebra o contrato dos 5 Eixos Canônicos do AGENTS.md?*
* **Veredito:** Não. Assim como `mapa-do-site.qmd` atua como página utilitária subordinada ao Eixo Acervo/Sistema (`axis-4` ou utilitário global na topbar), `configuracoes.qmd` entra como utilitário institucional de sistema acessível pelo ícone de engrenagem no cabeçalho e menu off-canvas, sem alterar a simetria 1:1 dos 5 Eixos na barra de navegação inferior (`Hoje | Curso | Currículo | Acervo | O CAGP`).

---

## 3. Goals vs. Non-Goals

### Objetivos (Goals)
1. **Unificar Passaporte e Perfil:** Fundir a apresentação da identidade discente, foto 256×256, marcadores de orgulho, progresso acadêmico e dados complementares em uma interface fluida com abas segmentadas (`Passaporte & Carteira` e `Perfil & Banco de Talentos`).
2. **Implementar Campos do Banco de Talentos:** Adicionar seleção de áreas temáticas de interesse em Gestão Pública, mini-bio, competências operacionais e links profissionais com salvamento local imediato.
3. **Criar a Página `configuracoes.qmd`:** Desenvolver a página completa com seções categorizadas inspiradas no benchmark (Acessibilidade integrada na página, Alertas do Campus, Meu CAGP Sync, Modo de Visualização e Termos/Regimento).
4. **Despoluir o Header e o Avatar:** O Avatar foca estritamente em Passaporte e Perfil; o botão/ícone de Configurações no cabeçalho ou menu leva diretamente à nova página `configuracoes.html`.

### Não-Objetivos (Non-Goals)
1. Não implementar banco de dados centralizado ou envio compulsório de dados para servidores externos.
2. Não alterar as chaves canônicas de `localStorage` ou o padrão criptográfico do backup `CAGP1:...`.
3. Não quebrar a simetria dos 5 Eixos principais da barra inferior móvel.

---

## 4. Matriz de Áreas de Interesse para Gestão Pública (Taxonomia Proposta)

1. **Políticas Públicas & Planejamento Governamental** (Formulação, monitoramento e análise de políticas)
2. **Orçamento, Finanças & Contabilidade Pública** (PPA, LDO, LOA, gestão fiscal e auditoria)
3. **Gestão de Pessoas no Setor Público** (Carreiras públicas, liderança, dimensionamento e desenvolvimento)
4. **Licitações, Contratos & Compras Públicas** (Nova Lei de Licitações 14.133, editais e compras sustentáveis)
5. **Cidades, Habitação & Políticas Urbanas** (Mobilidade urbana, plano diretor e governança metropolitana)
6. **Saúde Pública & Gestão do SUS** (Redes de atenção, regulação e governança do SUS)
7. **Educação Pública & Gestão Educacional** (Políticas de ensino, Fundeb e gestão universitária)
8. **Tecnologia Pública, Inovação & GovTech** (Governo digital, transformação digital e dados abertos)
9. **Avaliação de Impacto & Ciência de Dados Governamental** (Métodos quantitativos, evidências e R/Python/Power BI)
10. **Terceiro Setor, Parcerias & ESG Público** (OSCs, MROSC, fundações e sustentabilidade)
11. **Relações Institucionais, Legislativo & Advocacy** (Assessoria parlamentar, processo legislativo e controle social)
12. **Meio Ambiente, Clima & Transição Ecológica** (Sustentabilidade, recursos hídricos e políticas climáticas)

---

## 5. Estrutura Proposta da Nova Rota `configuracoes.qmd`

```
┌────────────────────────────────────────────────────────┐
│ < CONFIGURAÇÕES                                        │
├────────────────────────────────────────────────────────┤
│ ACESSIBILIDADE UNIVERSAL (Controles Ativos na Página) │
│ • Tamanho do Texto (Escala A- / A / A+ / A++)         │
│ • Tipografia para Dislexia (Switch)                    │
│ • Régua Visual de Foco / Leitura (Switch)              │
│ • Modo Alto Contraste AAA (#000000 / #FFFF00) (Switch) │
│ • Pausar Animações & Redução de Movimento (Switch)     │
├────────────────────────────────────────────────────────┤
│ ALERTAS DO CAMPUS & SOBREVIVÊNCIA NOTURNA              │
│ • Jantar no RU II Setorial (18h15) [Switch] [.ics]     │
│ • Último Circular Noturno FAFICH (22h30) [Switch][.ics]│
│ • Guardião de 120 Dias das AAC [Switch]               │
├────────────────────────────────────────────────────────┤
│ MEU CAGP SYNC & COFRE DISCENTE                         │
│ • Exportar / Importar Backup (.json)                   │
│ • Código Portátil Rápido (CAGP1:...)                   │
│ • Limpar Dados Locais do Dispositivo                   │
├────────────────────────────────────────────────────────┤
│ SISTEMA & ARMAZENAMENTO OFFLINE                        │
│ • Alternar Modo Visual (Super App vs. Portal Web)      │
│ • Status do Cache PWA e Service Worker                 │
│ • Redefinir Tour e Dicas de Boas-Vindas                │
├────────────────────────────────────────────────────────┤
│ REGIMENTOS, ATOS & TRANSPARÊNCIA                       │
│ • Regimento Interno do CAGP (14/10/2024) >             │
│ • Regulamento do Curso Versão N-20229 >                │
│ • Sobre o Super App CAGP (v2.2 Open Source) >          │
└────────────────────────────────────────────────────────┘
```
