# Relatório de Revisão Zoom Out — Super App CAGP UFMG

* **Documento Auditado:** [modernizacao_superapp_cagp.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md)
* **Padrão Aplicado:** [zoom-out-standard.md](file:///home/gsathler/.gemini/config/plugins/egm/resources/document_standards/zoom-out-standard.md)
* **Revisor:** Skeptical Architect (Zoom Out Goldfish)
* **Data:** 2026-10-29

---

## 1. Executive Summary of Architectural Posture

A postura arquitetural apresentada no plano de modernização do Super App CAGP UFMG é **sólida, pragmática e altamente disciplinada**. O projeto demonstra maturidade de engenharia e respeito ao princípio YAGNI ao:

1. **Rejeitar complexidade desnecessária:** Elimina a proposta de motores client-side de compilação PDF (`jsPDF`, `html2pdf.js`), poupando até `750 KB` de overhead de JavaScript offline, e substitui uma rotina quebrada de espelho sintético pelo direcionamento direto aos formulários oficiais autênticos da Secretaria F-2039.
2. **Atacar as causas-raiz:** Resolve a oclusão das sub-views em viewports móveis de `360px` através do Controle Segmentado (Hipótese III.B), destila o topo para garantir a 1ª dobra útil (`y < 300px`) e unifica a navegação nos 5 Eixos Canônicos 1:1, eliminando a armadilha do PWA Standalone.
3. **Preservar os pilares essenciais:** Mantém a arquitetura estática via Quarto 1.9, autonomia 100% offline via Service Worker no subsolo da FAFICH e compatibilidade estrita com o cofre de 9 chaves de `localStorage` e backups Base64 `CAGP1:...`.

O documento passa com louvor nas dimensões de **Context Sufficiency (0)**, **Root Problem Focus (1)** e **Multiformat Adaptive UI (5)**.

Não foram identificados **🔴 Blockers** arquiteturais (nenhum dead-end estrutural ou dependência inviável). Contudo, foram identificados **3 achados 🟡 Major** (inconsistência no alvo de poda de estado local, referência errônea à importação de fontes duplicada e desacoplamento na cadeia de autoridade de tokens `_brand.yml` vs. `_variables.scss`) e **2 achados 🟢 Nit** (queda de altitude nos pilares conceituais e salvaguarda defensiva no roteador SPA).

---

## 2. Categorized Findings & Recommendations

### 🔴 Blocker
*Nenhum blocker identificado.* O plano não introduz acoplamentos fatais, dependências externas inadequadas ou dead-ends arquiteturais.

---

### 🟡 Major

#### Achado 1: Poda FIFO no Alvo Incorreto (`cagp_notifications_prefs_v1`) com Risco de Loops de Disparo
* **Affected Scope:**
  - [modernizacao_superapp_cagp.md#L245](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L245) (Pilar 5)
  - [modernizacao_superapp_cagp.md#L347](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L347) (Tabela de Arquivos)
  - [modernizacao_superapp_cagp.md#L411](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L411) (Especificação de `pwa-install.html`)
* **Simplicity & Architectural Rationale:**
  - O texto propõe: *"Poda FIFO estrita (máximo de 25 registros lidos/dispensados) em `cagp_notifications_prefs_v1` para garantir que o payload de backup Base64 `CAGP1:...` não ultrapasse o teto de 65 KB de mensagens coladas no WhatsApp."*
  - Na implementação real do Super App ([pwa-install.html#L1845-L1865](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L1845-L1865)), a chave `cagp_notifications_prefs_v1` **não é uma lista histórica de notificações**. Ela armazena apenas 4 campos de configuração: `{ ru1815: false, circular2230: false, aac120d: true, lastFired: {} }` (ocupando menos de 120 bytes).
  - Truncar `lastFired` em FIFO eliminará o registro de horários de notificações já emitidas. Quando a rotina periódica `setInterval(checkScheduledAlerts, 60000)` ([pwa-install.html#L2059](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L2059)) rodar, a ausência da chave causará re-disparo imediato do mesmo alerta a cada minuto, criando um **loop de spam sonoro/visual** para o estudante.
  - Além disso, o que realmente ameaça o teto de 65 KB do WhatsApp no payload `CAGP1:...` é `cagp_student_profile_v1.photoDataUrl` (foto em Canvas/WebP que pode pesar de 15 a 30 KB) ou um acúmulo descontrolado de certificados em `cagp_aac_120d_certs_v1`.
* **Recomendação Arquitetural:**
  1. Suprimir a instrução de poda FIFO em `cagp_notifications_prefs_v1`. Manter a chave estritamente como dicionário de preferências e travas de disparo.
  2. Caso seja necessário blindar o teto de 65 KB do backup `CAGP1:...`, posicionar a trava no gerador de backup `cagpSync.generateCode()` ([pwa-install.html#L2110](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L2110)), garantindo que a foto do passaporte seja comprimida (`<= 15 KB`) e que `cagp_aac_120d_certs_v1` possua limite razoável de entradas.

---

#### Achado 2: Referência Incorreta da Importação Duplicada de Fontes (`styles.css#L7` vs. `_variables.scss#L5`)
* **Affected Scope:**
  - [modernizacao_superapp_cagp.md#L203](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L203) (Pilar 4)
  - [modernizacao_superapp_cagp.md#L344](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L344) (Tabela de Arquivos)
  - [modernizacao_superapp_cagp.md#L381](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L381) (Especificação de `styles.css`)
* **Simplicity & Architectural Rationale:**
  - O documento afirma: *"Remover a importação duplicada `@import url('https://fonts.googleapis.com/...')` em `styles.css#L7`, delegando o carregamento otimizado de fontes ao Quarto CLI via `_brand.yml`."*
  - A linha 7 de [styles.css#L7](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L7) é `:root {` (não há nenhuma regra `@import` em todo o `styles.css`).
  - A importação bloqueante de fontes via Google Fonts está localizada em [_variables.scss#L5](file:///home/gsathler/Nextcloud/Projects/cagp/_variables.scss#L5):
    `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&family=Oswald:wght@500;600;700&display=swap');`
  - Se a especificação for seguida textualmente, o desenvolvedor não encontrará o que remover em `styles.css`, e a importação redundante permanecerá ativa no SCSS compilado pelo Quarto, gerando requisições CSS duplicadas na inicialização móvel.
* **Recomendação Arquitetural:**
  - Corrigir a referência no documento: a exclusão da regra `@import` deve ser executada em [_variables.scss#L5](file:///home/gsathler/Nextcloud/Projects/cagp/_variables.scss#L5), delegando integralmente o carregamento de fontes ao Quarto CLI via [_brand.yml#L38-L48](file:///home/gsathler/Nextcloud/Projects/cagp/_brand.yml#L38-L48).

---

#### Achado 3: Desacoplamento na Cadeia de Autoridade de Tokens (`_brand.yml` vs. `_variables.scss` vs. `styles.css`)
* **Affected Scope:**
  - [modernizacao_superapp_cagp.md#L192-L202](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L192-L202) (Pilar 4)
  - [modernizacao_superapp_cagp.md#L341-L343](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L341-L343) (Tabela de Arquivos)
  - [modernizacao_superapp_cagp.md#L359-L376](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L359-L376) (Especificação de `_quarto.yml`, `_brand.yml` e `_variables.scss`)
* **Simplicity & Architectural Rationale:**
  - O documento elege o [_brand.yml](file:///home/gsathler/Nextcloud/Projects/cagp/_brand.yml) como "fonte primária de tokens".
  - Todavia, em [_variables.scss#L25-L26](file:///home/gsathler/Nextcloud/Projects/cagp/_variables.scss#L25-L26), as variáveis `$cagp-red: #9e2424;` e `$cagp-dark: #0a0a0a;` estão declaradas **sem a diretiva `!default`**.
  - No Quarto 1.9, ao configurar `theme: [brand, _variables.scss]`, os tokens do `_brand.yml` são injetados como variáveis Sass antes do SCSS customizado. Qualquer atribuição no `_variables.scss` que não use `!default` sobrescreve incondicionalmente o que foi emitido pelo `_brand.yml`.
  - Simultaneamente, [styles.css#L8-L40](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L8-L40) define suas próprias variáveis CSS `:root` (`--cagp-red: #9e2424;`, etc.) de forma desacoplada.
  - Isso gera um anti-padrão de "falsa autoridade única": alterar um valor em `_brand.yml` não altera nem os botões gerados pelo SCSS nem os estilos do `styles.css`.
* **Recomendação Arquitetural:**
  - Padronizar [_variables.scss](file:///home/gsathler/Nextcloud/Projects/cagp/_variables.scss) para respeitar os tokens do `_brand.yml`:
    - Adicionar `!default` em todas as cores fundamentais ou mapear `$primary: $brand-color-cagp-red !default;`.
  - Definir formalmente a hierarquia de camadas: `_brand.yml` alimenta as variáveis base do Quarto Sass → `_variables.scss` personaliza componentes Bootstrap → `styles.css` expõe os tokens em `:root` para os micro-apps e componentes JS nativos.

---

### 🟢 Nit

#### Achado 4: Queda de Altitude nos Pilares Arquiteturais (Weeds vs. Architecture)
* **Affected Scope:**
  - [modernizacao_superapp_cagp.md#L209-L215](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L209-L215) (Pilar 4)
  - [modernizacao_superapp_cagp.md#L243-L246](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L243-L246) (Pilar 5)
* **Simplicity & Architectural Rationale:**
  - A seção "Technical Plan / Detalhamento dos 5 Pilares Arquiteturais" deve focar em fronteiras de componentes, interfaces, contratos de dados e arquitetura de layout.
  - A inserção de valores hexadecimais pontuais (`#16A34A` → `#15803D`, `#E8A317` → `#B45309`), remoção de linha isolada de código (`else totalHours += val` em `pwa-install.html#L986`) e detalhamento de cancelamento de `closeTimerId` (`220ms`) dentro dos pilares conceituais caracteriza uma queda prematura de altitude ("weeds").
* **Recomendação Arquitetural:**
  - Manter os 5 Pilares focados estritamente na arquitetura macro (Estratégia de Acessibilidade WCAG, Contrato de Estado das 9 Chaves, Modelo de Transição SPA).
  - Alocar hexadecimais específicos e micro-correções de código exclusivamente na seção 3 do plano ("Detailed Implementation Plan / Racional e Especificação Detalhada por Arquivo").

---

#### Achado 5: Ausência de Fallback Defensivo na Taxonomia do Roteador SPA
* **Affected Scope:**
  - [modernizacao_superapp_cagp.md#L220-L227](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L220-L227) (Pilar 5)
  - [modernizacao_superapp_cagp.md#L400](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L400) (Especificação de `super-app-router.html`)
* **Simplicity & Architectural Rationale:**
  - O plano estabelece que `window.CAGP_TAXONOMY_V1` será declarado em `_includes/super-app-header.html` e consumido por `_includes/super-app-router.html`.
  - Embora a ordem de injeção em `_quarto.yml` coloque o header antes dos scripts do rodapé, se uma rota for renderizada isoladamente ou em testes unitários automatizados onde o header não esteja presente, chamadas como `window.CAGP_TAXONOMY_V1[route]` lançarão exceções fatais (`TypeError: Cannot read properties of undefined`).
* **Recomendação Arquitetural:**
  - No roteador SPA ([super-app-router.html](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-router.html)), instanciar um dicionário fallback defensivo caso `window.CAGP_TAXONOMY_V1` não esteja no escopo global (`const taxonomy = window.CAGP_TAXONOMY_V1 || DEFAULT_FALLBACK_TAXONOMY;`).

---

## 3. Conclusão e Próximos Passos

O documento [modernizacao_superapp_cagp.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md) cumpre com excelência o propósito de um design robusto, contido e aderente ao problema real dos discentes da UFMG.

Os 3 achados 🟡 Major e os 2 🟢 Nits requerem apenas pequenos ajustes de calibração editorial e técnica no documento antes ou durante a fase de implementação, sem necessidade de reabertura da RFC ou mudanças estruturais na arquitetura pactuada. Aprovado para prosseguimento com as salvaguardas apontadas.
