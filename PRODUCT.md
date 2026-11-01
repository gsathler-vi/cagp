# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Estudantes de graduação do Bacharelado em Gestão Pública da FAFICH/UFMG (turno noturno), desde calouros até formandos e egressos, além de lideranças do Centro Acadêmico (CAGP), colegiado do curso e docentes do Departamento de Ciência Política (DCP).

## Product Purpose

Portal Institucional e Super App Discente offline-first que centraliza a vida acadêmica do curso: percurso curricular (27 disciplinas obrigatórias e 68 optativas), calculadora de integralização de horas (3.000h totais, 600h de Extensão e AAC), simulador de dispensa de estágio (Art. 41), acervo documental oficial, rotina noturna no campus (RU II, circular, horários) e Passaporte Discente com identidade acadêmica e portabilidade local.

## Positioning

Super App discente que combina a autoridade institucional de um portal de curso federal com a velocidade e privacidade de uma aplicação moderna 100% estática e offline (PWA): zero-servidor, dados discentes guardados exclusivamente no dispositivo via cofre discente local, sem dependência de nuvem, banco de dados proprietário ou login corporativo.

## Operating Context

- Ambiente físico: Campus Pampulha da UFMG / FAFICH, com transição constante entre salas de aula, biblioteca, RU II Setorial e pontos do Circular Interno Noturno.
- Condições de rede: Conectividade intermitente ("lie-fi") nas salas da FAFICH e trajeto noturno de ônibus, exigindo cache estático robusto e persistência 100% local.
- Perfil de uso: Discentes trabalhadores do turno noturno que acessam o app em trânsito via smartphone (`360×640px` a `412×915px`) com necessidade de acesso imediato a dados acadêmicos, prazos e documentos.

## Capabilities and Constraints

- 15 rotas acadêmicas canônicas estruturadas em 5 eixos temáticos simétricos (`Hoje`, `Curso`, `Currículo`, `Acervo`, `O CAGP`).
- Persistência no navegador através de Cofre Discente em chaves canônicas de `localStorage`, com portabilidade e backup em string Base64 (`CAGP1:...`) com checksum CRC32.
- Compilação estática via Quarto CLI e roteador client-side SPA (`super-app-router.html`).
- Conformidade factual inegociável com o PPC 2020, Regulamento Versão `N-20229`, Regimento Interno do CAGP (14/10/2024) e resoluções do CEPE/UFMG.

## Brand Commitments

- Identidade Visual "Brite Institucional Refinado": Paleta oficial Borgonha (`#8B1E2D`), Vinho Candango (`#9E2424`), Preto Candango (`#0A0A0A`), Creme Papel (`#F7F5F0`), Amarelo Ouro (`#E8A317`).
- Tipografia oficial: Oswald em caixa-alta (títulos e display), Inter (texto e controles), JetBrains Mono (cargas horárias, códigos de matéria e hashes de backup).
- Símbolos: Escudo e monograma oficial do CAGP, monumento "Os Candangos" da Praça de Serviços da UFMG, pins de representatividade e orgulho estudantil.

## Evidence on Hand

- PPC 2020 e Regulamento do Curso Versão N-20229 autênticos.
- Regimento Interno do CAGP promulgado em 14/10/2024.
- 9 documentos e formulários oficiais autênticos em `documentos/`.
- Estrutura completa de 27 matérias obrigatórias e 68 optativas com ementas e pré-requisitos reais do Colegiado DCP.

## Product Principles

1. **Integridade Factual Absoluta:** Zero invenção, zero alteração e zero supressão de normas regimentais, cargas horárias ou prazos legais da UFMG.
2. **Soberania do Aluno e Zero-Servidor:** Os dados do estudante pertencem exclusivamente ao estudante; nenhum dado pessoal trafega para servidores externos.
3. **Ergonomia e Clareza Noturna:** Interface desenhada para legibilidade imediata, navegação rápida com uma mão em alvos `>= 44×44px` e controle rígido de densidade cognitiva.
4. **Resiliência Offline Total:** Todas as rotas essenciais, formulários e calculadoras funcionam sem internet após o primeiro acesso.

## Accessibility & Inclusion

- Conformidade com WCAG 2.1 AA e suporte a AAA para Alto Contraste (preto `#000000` e amarelo `#FFFF00`).
- Suíte universal integrada: tipografia para dislexia, régua visual de foco para TDAH, controle de redução de movimento e escala de fonte responsiva.
- Inclusão e visibilidade: suporte voluntário a pronomes e marcadores de diversidade e orgulho LGBTQIAPN+.
