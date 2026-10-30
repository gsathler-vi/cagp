# Relatório de Compreensibilidade — Super App CAGP UFMG

* **Documento Auditado:** [modernizacao_superapp_cagp.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md)
* **Revisor:** Naive Reader (Comprehension Goldfish)
* **Data:** 2026-10-29

---

## What this proposes

The document proposes a usability, navigation, and visual overhaul for the Super App CAGP UFMG (a static PWA for evening public administration undergraduate students built with Quarto). It resolves horizontal overflow and clipping on mobile screens (360px–412px) by converting sub-navigation tabs into zero-scroll segmented controls, while lifting core interactive elements into the initial mobile viewport fold (y < 300px) through single-header compaction and collapsible details. Crucially, it completely removes a broken, obsolete client-side print/form mirror in `acg.qmd` in favor of direct links to official Colegiado PDF/DOCX templates, unifies web and standalone PWA navigation around five symmetric canonical axes, and adopts an accessible "Brite Institucional Refinado" theme conforming to WCAG AA/AAA contrast guidelines.

---

## How the existing system works, per this document

Per the document, the existing system is a client-side progressive web app compiled from Quarto `.qmd` files that operates entirely offline without a backend server, relying on a Service Worker cache of eight normative PDFs and nine `localStorage` keys (with Base64 backup export/import). On mobile viewports, nested containers and 112px paddings strangle the sub-view tab bar down to 248px, pushing secondary navigation tabs completely off-screen, while multi-tiered headers and open banners force users to scroll up to 2,272px to reach interactive controls. In `acg.qmd`, an unisolated `window.print()` trigger and a truncated textarea attempt to assemble an informal transcript/form mirror for accreditation form N-20229, resulting in chaotic 9-page printouts that conflict with course secretariat requirements. Finally, installing the app as a standalone PWA conceals top navigation menus and misplaces settings buttons, stranding 10 of the app's 14 academic routes.

---

## Audit Findings

### 🔴 Blocker

#### 1. Inconsistência Contratual e Especificação Incompleta das 9 Chaves Canônicas de `localStorage`
* **Affected Scope:** Overview (Linha 15), Non-Goal 3 (Linha 47), Technical Plan Diagram / ClientState (Linhas 114–121), Detailed Plan (Linha 353), Verification Plan (Linhas 473–476).
* **Discrepancy Description & Rationale:** O documento estipula compatibilidade retroativa rigorosa com "9 chaves canônicas de `localStorage`" e proíbe alterações fora desse conjunto (Non-Goal 3). Contudo, o texto especifica nominalmente apenas 5 chaves (`cagp_calc_ext_aac_v1`, `cagp_aac_120d_certs_v1`, `cagp_notifications_prefs_v1`, `cagp_student_profile_v1`, `cagp_a11y_prefs_v2`), omitindo as outras 4 chaves operacionais existentes (`cagp_calouro_checklist_v1`, `cagp_percurso_quiz_v1`, `cagp_minha_grade_v1`, `cagp_art41_checklist_v1`). Sem a listagem completa, um engenheiro recém-chegado não consegue validar migrações, blindar backups Base64 `CAGP1:...` ou implementar suítes de teste de persistência.

---

### 🟡 Major

#### 2. Acrônimos de Domínio Acadêmico e Conceitos Curriculares Indefinidos (`ACG` vs. `AAC`, `DCP`, `DRCA`, `SEI`)
* **Affected Scope:** Overview (Linhas 15, 17), Goals (Linhas 35, 36), CUJ 2 (Linhas 65–68), Technical Plan (Linhas 101, 140, 144, 179, 224, 276), Detailed Plan (Linhas 348, 413–421).
* **Discrepancy Description & Rationale:** O documento utiliza termos institucionais críticos sem defini-los previamente:
  - **`acg.qmd`**: Não explica o significado de ACG (*Atividades Complementares de Graduação* / *Atividades Curriculares em Gestão*).
  - **`AAC`**: Usado lado a lado com Extensão ("600h Extensão/AAC"), mas a sigla não é expandida (*Atividades Acadêmicas Complementares*), gerando confusão se ACG e AAC são a mesma entidade.
  - **`DCP` (`DCP 195`, `DCP 186`)**: Citados como "primeira disciplina prática", sem esclarecer que correspondem a códigos de disciplinas do *Departamento de Ciência Política*.
  - **`DRCA`**: Referenciado como "Guia DRCA" sem definir o *Departamento de Registro e Controle Acadêmico*.
  - **`SEI`**: Citado como "SEI da UFMG" sem definir o *Sistema Eletrônico de Informações*.
  Recomenda-se adicionar um breve glossário ou expandir as siglas na primeira menção.

#### 3. Identificador Documental Opaco: "Formulário N-20229"
* **Affected Scope:** The Problem (Linha 27), Goals (Linha 35), Pilar 1 (Linhas 156–164), Alternatives Considered (Linhas 290–298), Detailed Plan (Linhas 348, 413–419, 445), Verification Plan (Linhas 466–468).
* **Discrepancy Description & Rationale:** O Pilar 1 centraliza-se na remoção do espelho para o "Formulário N-20229" (`requerimento-atividade-integralizadora-credito-v20229.pdf`). Para um leitor externo, "N-20229" parece arbitrário. É necessário explicitar que se trata do formulário oficial de requerimento individual de integralização de créditos para que se compreenda por que agregá-lo num espelho sintético gerava recusas na Secretaria.

#### 4. Regra de Negócio Não-Explicada: "Guardião de 120 Dias" e Prazos Decadenciais
* **Affected Scope:** Overview (Linha 15), Technical Plan (Linhas 73, 116, 145, 186, 240), Detailed Plan (Linha 410).
* **Discrepancy Description & Rationale:** O documento cita o "Guardião de 120 Dias", mas não explicita qual resolução estabelece esse prazo, a partir de qual data o relógio começa a correr (emissão do certificado vs. realização da atividade) e qual a consequência da perda do prazo (caducidade da validade para conversão em créditos).

#### 5. Omissão dos "8 PDFs Normativos Essenciais" do Cofre Offline
* **Affected Scope:** Overview (Linha 15), CUJ 1 (Linha 63), Pilar 2 (Linha 178), Pilar 3 (Linha 186), Matrix (Linha 277), Detailed Plan (Linhas 425, 445).
* **Discrepancy Description & Rationale:** O documento cita repetidamente o cofre de "8 PDFs normativos essenciais", mas apenas um arquivo é explicitamente nomeado (`requerimento-atividade-integralizadora-credito-v20229.pdf`). Os outros 7 caminhos de arquivo devem ser listados na seção do Service Worker.

#### 6. Referência Pendurada de Ativo: "Benchmark A (`1000361583.jpg`)"
* **Affected Scope:** Detailed Plan: `index.qmd` (Linha 437).
* **Discrepancy Description & Rationale:** A seção de implementação da Home instrui a aplicar a densidade do "Benchmark A (`1000361583.jpg`)", porém não indica o caminho no repositório (`./1000361583.jpg`), link ou descrição das métricas visuais desejadas.

#### 7. Diretivas Vagas de Correção de Bugs e Listeners
* **Affected Scope:** Detailed Plan: `documentos.qmd` (Linha 428) e `acg.qmd` (Linha 420).
* **Discrepancy Description & Rationale:** "Corrigir os IDs DOM órfãos identificados nas linhas 834–863" e "Adicionar limpeza de listeners no evento `cagp:navigated`" pressupõem conhecimento histórico implícito de sessões anteriores. Devem ser especificados quais IDs e quais listeners.

---

### 🟢 Nit

#### 8. Metáfora Interna de Projeto: "Passaporte"
* **Affected Scope:** The Problem (Linha 29), Goals (Linha 39), Architecture (Linhas 88, 118), Detailed Plan (Linhas 232–234, 407, 475).
* **Discrepancy Description & Rationale:** Esclarecer em uma sentença que "Passaporte" é a gaveta de perfil discente local (`cagp-settings-sheet`) e cofre de preferências, sem envolvimento de serviços externos de autenticação.

#### 9. Dependência de Jargão de Brainstorm ("Hipóteses III.B, IV.A, V.A")
* **Affected Scope:** Goals (Linhas 37–39), Pilares 3–5, Alternatives Considered.
* **Discrepancy Description & Rationale:** O documento usa códigos como "Hipótese III.B" como designadores primários, forçando o leitor a consultar notas de ideação. Priorizar o nome da solução ("Controle Segmentado").

#### 10. Contexto Geográfico de Prédios e Salas da UFMG
* **Affected Scope:** Goals (Linha 35), Non-Goal 2 (Linha 46), Pilar 1 (Linha 164), Alternatives (Linha 297).
* **Discrepancy Description & Rationale:** Contextualizar brevemente que FAFICH é o prédio da Faculdade de Filosofia e Ciências Humanas e que a Sala F-2039 abriga a Secretaria do Colegiado.
