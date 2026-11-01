// src/lib/navigationRegistry.ts — Registro Central de Navegação, Eixos e Micro-Apps (Super App CAGP UFMG)
import { route } from './paths';

export type AxisId = 'hoje' | 'curso' | 'curriculo' | 'acervo' | 'cagp';
export type FeatureType = 'hub' | 'overview' | 'page' | 'tool' | 'guide' | 'catalog';

export interface NavigationItem {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  icon: string;
  description: string;
  type: FeatureType;
  isOverview?: boolean;
  badge?: string;
  match: string[];
}

export interface AxisOverviewHighlight {
  id: string;
  title: string;
  desc: string;
  icon: string;
  href: string;
  actionLabel: string;
  statKey?: string;
}

export interface AxisConfig {
  id: AxisId;
  number: number;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  rootHref: string;
  items: NavigationItem[];
  overviewHighlights: AxisOverviewHighlight[];
}

export const AXIS_REGISTRY: AxisConfig[] = [
  {
    id: 'hoje',
    number: 1,
    name: 'Hoje',
    tagline: 'Rotina do Campus, RU & Bússola Discente',
    icon: 'bi-compass',
    color: '#8B1E2D',
    rootHref: route('/'),
    items: [
      {
        id: 'hoje-overview',
        label: 'Visão Geral',
        shortLabel: 'Hoje',
        href: route('/'),
        icon: 'bi-compass',
        description: 'Bússola discente, avisos em tempo real e status do campus.',
        type: 'hub',
        isOverview: true,
        match: ['^/$', '^/index\\.html$'],
      },
      {
        id: 'hoje-calouros',
        label: 'Calouros',
        shortLabel: 'Calouros',
        href: route('/calouros'),
        icon: 'bi-backpack',
        description: 'Checklist de 30 dias e guia de sobrevivência na FAFICH.',
        type: 'guide',
        match: [],
      },
      {
        id: 'hoje-campus',
        label: 'RU & Circular',
        shortLabel: 'Campus',
        href: '#campus',
        icon: 'bi-clock-history',
        description: 'Horários do RU II Setorial e linhas do Circular Noturno.',
        type: 'tool',
        match: [],
      },
      {
        id: 'hoje-passaporte',
        label: 'Passaporte',
        shortLabel: 'Passaporte',
        href: '#passaporte',
        icon: 'bi-person-badge',
        description: 'Identidade estudantil e anel de integralização local.',
        type: 'tool',
        match: [],
      },
    ],
    overviewHighlights: [
      {
        id: 'hl-passaporte',
        title: 'Passaporte Discente',
        desc: 'Seu progresso acadêmico salvo 100% no cofre local seguro.',
        icon: 'bi-person-badge',
        href: '#passaporte',
        actionLabel: 'Abrir Passaporte',
      },
      {
        id: 'hl-campus',
        title: 'Campus no Agora',
        desc: 'Cardápios e horários do RU II Setorial e Circular Noturno da UFMG.',
        icon: 'bi-clock-history',
        href: '#campus',
        actionLabel: 'Ver Horários',
      },
    ],
  },
  {
    id: 'curso',
    number: 2,
    name: 'Curso',
    tagline: 'Colegiado DCP, PPC 2020 e Regulamento do Curso',
    icon: 'bi-mortarboard',
    color: '#005A9C',
    rootHref: route('/curso'),
    items: [
      {
        id: 'curso-overview',
        label: 'Visão Geral',
        shortLabel: 'Geral',
        href: route('/curso'),
        icon: 'bi-layout-text-window-reverse',
        description: 'Sumário executivo do curso, Colegiado DCP e matriz acadêmica.',
        type: 'overview',
        isOverview: true,
        match: ['^/curso$', '^/curso/$', '^/curso/index\\.html$'],
      },
      {
        id: 'curso-calouros',
        label: 'Guia do Calouro',
        shortLabel: 'Calouros',
        href: route('/calouros'),
        icon: 'bi-backpack',
        description: 'Checklist interativo de 30 dias e recepção FAFICH.',
        type: 'guide',
        match: ['^/calouros'],
      },
      {
        id: 'curso-normas',
        label: 'PPC & Normas',
        shortLabel: 'Normas',
        href: route('/curso') + '#regulamento',
        icon: 'bi-file-earmark-text',
        description: 'Regulamento N-20229, PPC 2020 e Resoluções CEPE.',
        type: 'page',
        match: [],
      },
      {
        id: 'curso-pesquisa',
        label: 'Pesquisa & Grupos',
        shortLabel: 'Pesquisa',
        href: route('/pesquisa'),
        icon: 'bi-lightbulb',
        description: 'Laboratórios, linhas do DCP e oportunidades de iniciação científica.',
        type: 'page',
        match: ['^/pesquisa'],
      },
    ],
    overviewHighlights: [
      {
        id: 'hl-calouro',
        title: 'Checklist do Calouro',
        desc: 'Tarefas essenciais dos primeiros 30 dias na UFMG.',
        icon: 'bi-backpack',
        href: route('/calouros'),
        actionLabel: 'Abrir Guia do Calouro',
        statKey: 'cagp_calouro_checklist_v1',
      },
      {
        id: 'hl-secretaria',
        title: 'Colegiado Sala F-2039',
        desc: 'Atendimento presencial com Norma Guedes e coordgestaopublica@gmail.com.',
        icon: 'bi-geo-alt',
        href: route('/curso') + '#atendimento',
        actionLabel: 'Ver Contatos',
      },
    ],
  },
  {
    id: 'curriculo',
    number: 3,
    name: 'Currículo',
    tagline: 'Grade 10P, Grafo Interativo, 600h ACG, Estágio e TCC',
    icon: 'bi-diagram-3',
    color: '#15803D',
    rootHref: route('/percurso'),
    items: [
      {
        id: 'curriculo-overview',
        label: 'Visão Geral',
        shortLabel: 'Geral',
        href: route('/percurso'),
        icon: 'bi-layout-text-window-reverse',
        description: 'Dashboard integrado com simuladores de horas, estágio e grade.',
        type: 'overview',
        isOverview: true,
        match: ['^/percurso$', '^/percurso/$', '^/percurso/index\\.html$'],
      },
      {
        id: 'curriculo-grade',
        label: 'Grade & Grafo',
        shortLabel: 'Grade',
        href: route('/percurso') + '#grade',
        icon: 'bi-diagram-3',
        description: 'Matriz curricular de 10 períodos e mapa de pré-requisitos.',
        type: 'page',
        match: [],
      },
      {
        id: 'curriculo-acg',
        label: 'Calculadora 600h',
        shortLabel: 'Calc 600h',
        href: route('/acg'),
        icon: 'bi-calculator',
        description: 'Simulador das 300h de Extensão Obrigatória e até 300h de AAC.',
        type: 'tool',
        match: ['^/acg'],
      },
      {
        id: 'curriculo-guardiao',
        label: 'Guardião 120d',
        shortLabel: '120 Dias',
        href: route('/acg') + '#guardiao-120-dias',
        icon: 'bi-shield-check',
        description: 'Guardião de prazo fatal de 120 dias para certificados de AAC.',
        type: 'tool',
        match: [],
      },
      {
        id: 'curriculo-estagio',
        label: 'Estágio (Art. 41)',
        shortLabel: 'Estágio',
        href: route('/estagio'),
        icon: 'bi-briefcase',
        description: 'Simulador de elegibilidade e dispensa pelo Art. 41.',
        type: 'tool',
        match: ['^/estagio', '^/estagio-tcc'],
      },
      {
        id: 'curriculo-tcc',
        label: 'TCC & Monografia',
        shortLabel: 'TCC',
        href: route('/tcc'),
        icon: 'bi-journal-check',
        description: 'Guia de defesa, orientação e prazos regimentais de TCC A e B.',
        type: 'guide',
        match: ['^/tcc'],
      },
      {
        id: 'curriculo-optativas',
        label: '68 Optativas',
        shortLabel: 'Optativas',
        href: route('/optativas'),
        icon: 'bi-collection',
        description: 'Catálogo oficial de disciplinas optativas com busca instantânea.',
        type: 'catalog',
        match: ['^/optativas'],
      },
    ],
    overviewHighlights: [
      {
        id: 'hl-calc',
        title: 'Calculadora 600h',
        desc: 'Simule sua integralização de Extensão (300h) e AAC (300h).',
        icon: 'bi-calculator',
        href: route('/acg'),
        actionLabel: 'Calcular Horas',
        statKey: 'cagp_calc_ext_aac_v1',
      },
      {
        id: 'hl-art41',
        title: 'Dispensa de Estágio (Art. 41)',
        desc: 'Verifique se seu trabalho na gestão pública dispensa Estágio A e B.',
        icon: 'bi-briefcase',
        href: route('/estagio'),
        actionLabel: 'Simular Art. 41',
        statKey: 'cagp_art41_checklist_v1',
      },
      {
        id: 'hl-guardiao',
        title: 'Guardião dos 120 Dias',
        desc: 'Não perca seus certificados por expiração do prazo regimental.',
        icon: 'bi-shield-check',
        href: route('/acg') + '#guardiao-120-dias',
        actionLabel: 'Ver Certificados',
        statKey: 'cagp_aac_120d_certs_v1',
      },
    ],
  },
  {
    id: 'acervo',
    number: 4,
    name: 'Acervo',
    tagline: 'Repositório de Documentos Oficiais, FAQ e Transcrições',
    icon: 'bi-folder2-open',
    color: '#B45309',
    rootHref: route('/documentos'),
    items: [
      {
        id: 'acervo-overview',
        label: 'Visão Geral',
        shortLabel: 'Geral',
        href: route('/documentos'),
        icon: 'bi-layout-text-window-reverse',
        description: 'Acesso rápido aos regulamentos, resoluções e busca de dúvidas.',
        type: 'overview',
        isOverview: true,
        match: ['^/documentos$', '^/documentos/$', '^/documentos/index\\.html$'],
      },
      {
        id: 'acervo-docs',
        label: 'Repositório Oficial',
        shortLabel: 'PDFs',
        href: route('/documentos') + '#acervo-arquivos',
        icon: 'bi-file-earmark-pdf',
        description: 'PPC 2020, Regulamento N-20229 e formulários para download.',
        type: 'page',
        match: [],
      },
      {
        id: 'acervo-faq',
        label: 'FAQ & Ajuda',
        shortLabel: 'FAQ',
        href: route('/faq'),
        icon: 'bi-question-circle',
        description: '22 respostas oficiais sobre procedimentos acadêmicos.',
        type: 'guide',
        match: ['^/faq'],
      },
      {
        id: 'acervo-transcricoes',
        label: 'Transcrições',
        shortLabel: 'Aulas',
        href: route('/documentos') + '#transcricoes',
        icon: 'bi-mic',
        description: 'Registros das recepções de calouros e eventos discentes.',
        type: 'catalog',
        match: [],
      },
    ],
    overviewHighlights: [
      {
        id: 'hl-faq',
        title: 'Perguntas Frequentes',
        desc: 'Respostas rápidas sobre matrícula, aproveitamento de estudos e trancamento.',
        icon: 'bi-question-circle',
        href: route('/faq'),
        actionLabel: 'Buscar Dúvida',
      },
      {
        id: 'hl-ppc',
        title: 'PPC 2020 & Regulamento',
        desc: 'Documentos canônicos com a carga de 3.000 horas do curso.',
        icon: 'bi-file-earmark-pdf',
        href: route('/documentos') + '#acervo-arquivos',
        actionLabel: 'Baixar PDFs',
      },
    ],
  },
  {
    id: 'cagp',
    number: 5,
    name: 'O CAGP',
    tagline: 'Representação Estudantil, Estatuto e Chapa Semente',
    icon: 'bi-people',
    color: '#0A0A0A',
    rootHref: route('/sobre'),
    items: [
      {
        id: 'cagp-overview',
        label: 'Visão Geral',
        shortLabel: 'Geral',
        href: route('/sobre'),
        icon: 'bi-layout-text-window-reverse',
        description: 'História do CAGP, diretoria empossada e canais de contato.',
        type: 'overview',
        isOverview: true,
        match: ['^/sobre$', '^/sobre/$', '^/sobre/index\\.html$'],
      },
      {
        id: 'cagp-historia',
        label: 'Sobre & Estatuto',
        shortLabel: 'Estatuto',
        href: route('/sobre') + '#estatuto',
        icon: 'bi-building',
        description: 'Estatuto do CAGP aprovado em 14/10/2024 e princípios da entidade.',
        type: 'page',
        match: [],
      },
      {
        id: 'cagp-gestao',
        label: 'Gestão Semente',
        shortLabel: 'Gestão',
        href: route('/gestao'),
        icon: 'bi-award',
        description: 'Membros da diretoria, prestação de contas e atas.',
        type: 'page',
        match: ['^/gestao'],
      },
      {
        id: 'cagp-talentos',
        label: 'Banco de Talentos',
        shortLabel: 'Talentos',
        href: route('/gestao') + '#talentos',
        icon: 'bi-stars',
        description: 'Conecte suas habilidades aos projetos da gestão discente.',
        type: 'tool',
        match: [],
      },
    ],
    overviewHighlights: [
      {
        id: 'hl-gestao',
        title: 'Chapa Semente 2026',
        desc: 'Diretoria executiva e propostas para a graduação em Gestão Pública.',
        icon: 'bi-award',
        href: route('/gestao'),
        actionLabel: 'Conhecer Gestão',
      },
      {
        id: 'hl-talentos',
        title: 'Banco de Talentos',
        desc: 'Cadastre suas aptidões e participe das comissões do CAGP.',
        icon: 'bi-stars',
        href: route('/gestao') + '#talentos',
        actionLabel: 'Cadastrar Perfil',
      },
    ],
  },
];

/**
 * Normaliza pathname removendo o base path do GitHub Pages para conferência de rotas.
 */
export function normalizePathname(pathname: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  let clean = pathname;
  if (base && clean.startsWith(base)) {
    clean = clean.slice(base.length);
  }
  clean = clean.replace(/\/index\.html$/, '');
  if (!clean.startsWith('/')) clean = `/${clean}`;
  return clean || '/';
}

/**
 * Retorna o eixo correspondente a um ID canônico.
 */
export function getAxisById(id: AxisId): AxisConfig | undefined {
  return AXIS_REGISTRY.find((axis) => axis.id === id);
}

/**
 * Retorna o eixo correspondente a uma URL/pathname do site.
 */
export function getAxisByPath(pathname: string): AxisConfig | undefined {
  const clean = normalizePathname(pathname);

  // Eixo 1: Home
  if (clean === '/' || clean === '/index.html') {
    return AXIS_REGISTRY[0];
  }

  // Tenta encontrar por regex de correspondência nos itens
  for (const axis of AXIS_REGISTRY) {
    for (const item of axis.items) {
      if (item.match && item.match.length > 0) {
        for (const pattern of item.match) {
          if (new RegExp(pattern).test(clean)) {
            return axis;
          }
        }
      }
    }
  }

  // Fallback baseado no primeiro segmento da URL
  if (clean.startsWith('/curso')) return AXIS_REGISTRY[1];
  if (clean.startsWith('/calouros') || clean.startsWith('/pesquisa')) return AXIS_REGISTRY[1];
  if (clean.startsWith('/percurso') || clean.startsWith('/acg') || clean.startsWith('/estagio') || clean.startsWith('/tcc') || clean.startsWith('/optativas')) {
    return AXIS_REGISTRY[2];
  }
  if (clean.startsWith('/documentos') || clean.startsWith('/faq') || clean.startsWith('/mapa-do-site')) {
    return AXIS_REGISTRY[3];
  }
  if (clean.startsWith('/sobre') || clean.startsWith('/gestao')) {
    return AXIS_REGISTRY[4];
  }

  return undefined;
}

/**
 * Retorna o ID do item ativo dentro de um eixo para o pathname fornecido.
 */
export function getActiveItemId(axis: AxisConfig, pathname: string, hash: string = ''): string {
  const clean = normalizePathname(pathname);

  // Se houver hash específico que coincida com algum item
  if (hash) {
    const hashItem = axis.items.find((item) => item.href.includes(hash));
    if (hashItem) return hashItem.id;
  }

  // Confere primeiro por correspondência exata de rota
  for (const item of axis.items) {
    if (item.match && item.match.length > 0) {
      for (const pattern of item.match) {
        if (new RegExp(pattern).test(clean)) {
          return item.id;
        }
      }
    }
  }

  // Fallback: primeiro item do eixo (Visão Geral)
  return axis.items[0]?.id || '';
}

/**
 * Retorna todos os 5 Eixos.
 */
export function getAllAxes(): AxisConfig[] {
  return AXIS_REGISTRY;
}
