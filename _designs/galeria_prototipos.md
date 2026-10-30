# Galeria de Protótipos Interativos (`/generative_ui`) — Super App CAGP UFMG

> **Escopo e Governança:** Registro oficial da **Etapa 3** do protocolo exploratório. Os três artefatos HTML abaixo rodam isolados em sandbox (`/generative_ui`), sem modificar nenhum arquivo de produção do repositório.

---

## Mapa Rápido dos Artefatos

| Protótipo | Artefato Interativo (`/generative_ui`) | Dores Auditadas Cobertas | Hipóteses EGM Testáveis |
| :--- | :--- | :--- | :--- |
| **Protótipo A** | [prototipo_a_espelho_n20229.html](file:///home/gsathler/.gemini/antigravity/brain/4f266f80-b81d-4f1d-b19b-1907e1b23e6e/prototipo_a_espelho_n20229.html) | Falha de `window.print()` (9 páginas A4, `484 KB`, `<textarea>` truncada em 78,5%, códigos SIGA legados e WebViews mudas) | **Hipótese I.D** (`@page A4` + Isolamento DOM + Códigos `DCP186`–`DCP208` + Canhoto `RECIBO` + Minuta `<pre>` SEI + `Web Share API`) |
| **Protótipo B** | [prototipo_b_dobra1_subviews.html](file:///home/gsathler/.gemini/antigravity/brain/4f266f80-b81d-4f1d-b19b-1907e1b23e6e/prototipo_b_dobra1_subviews.html) | Overflow horizontal de `.cagp-workspace-bar` (0 abas inteiras em `360px`), consumo da 1ª dobra (`y = 1.332px` a `2.272px`), *over-boxing* e falha Alto Contraste AAA | **Hipóteses II.B**, **III.A vs. III.B vs. III.C** e **IV.A vs. IV.B vs. IV.C (+ AAA `#000`/`#FF0`)** em `documentos.qmd` e `acg.qmd` |
| **Protótipo C** | [prototipo_c_navegacao_superapp.html](file:///home/gsathler/.gemini/antigravity/brain/4f266f80-b81d-4f1d-b19b-1907e1b23e6e/prototipo_c_navegacao_superapp.html) | Orfandade de 10/14 rotas no PWA Standalone, duplicação do botão `Passaporte`, ausência de Central de Notificações no cabeçalho e densidade da Home | **Hipóteses V.B (Frequência + `"Todos"`) vs. V.A (5 Eixos 1:1)**, Benchmarks A (`1000361583.jpg`) e B (`6cff1478-c95b-4dc2-a175-5aafe64af947.jpeg`) |

---

## 1. Protótipo A — Folha de Rosto & Espelho Consolidado N-20229 (A4 / SEI / Sala F-2039)

- **Link Direto:** [prototipo_a_espelho_n20229.html](file:///home/gsathler/.gemini/antigravity/brain/4f266f80-b81d-4f1d-b19b-1907e1b23e6e/prototipo_a_espelho_n20229.html)
- **Referências cruzadas:** [diagnostico_auditoria.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/diagnostico_auditoria.md) (Seção 1) e [propostas_brainstorm_egm.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/propostas_brainstorm_egm.md) (Eixo I).

### Funcionalidades Implementadas no Sandbox
1. **Geometria A4 Vetorial sem Dependências Externas (`0 KB`):** Declara `@page { size: A4 portrait; margin: 12mm 14mm; }`, `thead { display: table-header-group; }`, `tfoot { display: table-footer-group; }` e `break-inside: avoid` nas linhas e blocos de assinatura, ocultando 100% da interface de controle (`.no-print`) ao acionar `Imprimir / Salvar PDF A4`.
2. **Reconciliação com o Formulário Oficial [requerimento-atividade-integralizadora-credito-v20229.pdf](file:///home/gsathler/Nextcloud/Projects/cagp/documentos/requerimento-atividade-integralizadora-credito-v20229.pdf):**
   - Quadro `I. Identificação do(a) Discente Requerente` com campos efêmeros opcionais (`Nome`, `Nº de Matrícula UFMG`, `E-mail & Telefone`, **sem CPF**) que geram linhas sublinhadas para preenchimento manuscrito quando deixados em branco, sem gravar dados pessoais em `cagp_calc_ext_aac_v1`.
   - Separação explícita entre componentes integralizados por **Matrícula SIGA** (`DCP 195` e `DCP 196`) e atividades acreditadas via **Requerimento N-20229** com códigos oficiais vigentes (`DCP186` a `DCP208`).
   - Cálculo explícito de corte por teto regimental (`<tfoot>` exibindo `Soma Bruta`, `Aproveitado: 300h` e `Excedente não aproveitado`) e **Canhoto Destacável `RECIBO`** na base da folha A4 para protocolo presencial na Sala F-2039.
3. **Minuta Textual SEI Auto-Expansível e Degradação em WebViews:** Substitui a `<textarea rows="5">` truncada por um bloco `<pre>` integral com cópia em 1 clique, integração com `navigator.share` e simulação do banner contextual para navegadores embutidos do Instagram/WhatsApp.

### Roteiro de Verificação pelo Usuário
- Alternar o seletor *Cenário de Carga Horária* entre `Típico (420h)`, `Excedente Regimental (690h brutas → 600h)`, `Guardião 120 Dias (6 certificados)` e `Estado Vazio (0h)`.
- Marcar `Laser P&B (Sem gráficos de fundo)` para confirmar que nenhum cabeçalho de tabela fica com texto branco sobre fundo branco.
- Marcar `Simular WebView Instagram/WhatsApp` para validar a orientação de fallback quando `window.print()` é bloqueado.
- Clicar em `🖨️ Imprimir / Salvar PDF A4` para inspecionar a pré-visualização nativa do navegador em 1 página A4 limpa.

---

## 2. Protótipo B — 1ª Dobra Limpa (`y < 280px`), Sub-Views sem Corte e Descompressão Visual

- **Link Direto:** [prototipo_b_dobra1_subviews.html](file:///home/gsathler/.gemini/antigravity/brain/4f266f80-b81d-4f1d-b19b-1907e1b23e6e/prototipo_b_dobra1_subviews.html)
- **Referências cruzadas:** [diagnostico_auditoria.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/diagnostico_auditoria.md) (Seções 2, 3, 4 e 6) e [propostas_brainstorm_egm.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/propostas_brainstorm_egm.md) (Eixos II, III e IV).

### Funcionalidades Implementadas no Sandbox
1. **Medidor Real de Coordenada Vertical (`y`) em `360×740px` e `412×820px`:** Calcula via `getBoundingClientRect()` a posição exata da primeira ação real dentro do frame móvel (`y ≈ 238px–264px`), exibindo uma linha-guia pontilhada em `y = 280px` e comparando com a linha de base de produção (`1.332px` em `documentos.html` e `2.272px` em `acg.html`).
2. **Comparador Ao Vivo das 3 Hipóteses de Barra `.cagp-workspace-bar` (Eixo III):**
   - `III.A`: Abas Secundárias Full-Bleed Adesivas (`48px` de altura, indicador inferior `3px` `#9E2424`, 3/3 abas 100% visíveis em `360px`).
   - `III.B`: Controle Segmentado em grade (`0px` de rolagem horizontal em qualquer largura).
   - `III.C`: Trilho de pílulas com *peek* visível da 3ª aba e `mask-image` de gradiente lateral.
3. **Comparador Ao Vivo dos 4 Modos de Contenção Visual (Eixo IV):**
   - `IV.C`: *Híbrido Editorial Acadêmico* (papel `#F6F4EF`, cards `#FDFCF9`, filete `1px`, zero sombras duras).
   - `IV.B`: *Super App Tonal Clean* (superfícies frias `#FFFFFF` sobre `#F5F6F8`).
   - `IV.A`: *Brite Institucional Refinado* (sombra deslocada `2px` restrita ao CTA primário).
   - `AAA`: *Modo Alto Contraste `#000000` / `#FFFF00`* corrigido (comprovando ausência de cards brancos vazando sob texto amarelo).
4. **Prova de Zero Supressão Factual:** O bloco `<details>` logo abaixo do `H1` único conserva todas as referências normativas (`Res. CEPE 10/2019`, `Art. 14`, `Art. 15 § 4º`, `Sala F-2039`, `coordgestaopublica@gmail.com`) sem empurrar os PDFs ou a calculadora para fora da 1ª dobra.

### Roteiro de Verificação pelo Usuário
- Alternar o seletor *1. Rota Auditada* entre `documentos.qmd` (testando filtro em tempo real de PDFs/formulários) e `acg.qmd` (clicando em `-15`/`+15` e `-90`/`+90` com atualização instantânea do HUD adesivo de 600h).
- Alternar entre `III.A`, `III.B` e `III.C` em `360px` para escolher a ergonomia preferida de sub-views.
- Alternar entre `IV.C`, `IV.B`, `IV.A` e `AAA` para comparar legibilidade e identidade visual CAGP.

---

## 3. Protótipo C — Navegação Global, Home, Sino de Alertas e Diretório `"Todos"`

- **Link Direto:** [prototipo_c_navegacao_superapp.html](file:///home/gsathler/.gemini/antigravity/brain/4f266f80-b81d-4f1d-b19b-1907e1b23e6e/prototipo_c_navegacao_superapp.html)
- **Referências cruzadas:** [diagnostico_auditoria.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/diagnostico_auditoria.md) (Seção 5), Benchmarks [`1000361583.jpg`](file:///home/gsathler/Nextcloud/Projects/cagp/1000361583.jpg) e [`6cff1478-c95b-4dc2-a175-5aafe64af947.jpeg`](file:///home/gsathler/Nextcloud/Projects/cagp/6cff1478-c95b-4dc2-a175-5aafe64af947.jpeg), e [propostas_brainstorm_egm.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/propostas_brainstorm_egm.md) (Eixo V).

### Funcionalidades Implementadas no Sandbox
1. **Topbar Unificada com Alvos `44×44px` e Avatar Único:** Posiciona Busca (`🔍`), Sino de Alertas (`🔔` com contador) e Avatar do Passaporte (`GS`) exclusivamente no cabeçalho superior direito, eliminando a duplicação do botão `Passaporte` na 5ª aba inferior do PWA Standalone.
2. **Home `"Hoje"` Destilada (Benchmark A):** Saudação compacta com percurso vigente + pílula de status ao vivo do campus noturno (`18h20` RU II aberto / `22h25` alerta do último Circular Setorial II / `14h30` Secretaria F-2039), barra de busca em destaque (`⌘K`), card duplo de integralização (`420h/600h` e `18/27 obrigatórias`) e Bento Grid de micro-apps.
3. **Diretório Completo `"Todos"` das 14 Rotas nos 5 Eixos (Benchmark B):** Campo de filtro instantâneo, 4 blocos de atalho rápido (`Calouros`, `Optativas`, `Estágio`, `Ouvidoria`) e lista agrupada nos 5 Eixos Canônicos com chevrons `›`, tornando todas as 14 rotas alcançáveis em 1–2 toques inclusive no PWA instalado.
4. **Comparador de Topologia da Barra Inferior (`Hipótese V.B` vs. `Hipótese V.A`):** Permite testar lado a lado a barra orientada a frequência (`Hoje | Percurso | Horas 600h | Docs | Todos`) contra a barra simétrica por eixo (`Hoje | Curso | Currículo | Acervo | O CAGP`) com pílulas contextuais entre rotas-irmãs do mesmo eixo.
5. **Central de Notificações Zero-Storage-Novo & Confirmação em 2 Toques no Cofre:** O sino abre o sheet combinando prazos de 120 dias, status do campus e toggles da chave existente `cagp_notifications_prefs_v1`; o Passaporte demonstra a trava de 2 toques antes de limpar o `localStorage`.
