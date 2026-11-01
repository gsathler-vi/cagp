// talentConstants.ts - Constantes do Banco de Talentos e Marcadores de Orgulho

export interface TalentCategory {
  key: string;
  label: string;
}

export const TALENT_CATEGORIES: readonly TalentCategory[] = [
  { key: 'pol_pub', label: 'Políticas Públicas & Planejamento' },
  { key: 'orcamento', label: 'Orçamento & Finanças Públicas' },
  { key: 'gestao_pessoas', label: 'Gestão de Pessoas no Setor Público' },
  { key: 'licitacoes', label: 'Licitações, Contratos & Compras' },
  { key: 'cidades', label: 'Cidades & Políticas Urbanas' },
  { key: 'saude', label: 'Saúde Pública & Gestão do SUS' },
  { key: 'educacao', label: 'Educação Pública & Fundeb' },
  { key: 'govtech', label: 'Tecnologia Pública & GovTech' },
  { key: 'dados', label: 'Ciência de Dados & Avaliação' },
  { key: 'terceiro_setor', label: 'Terceiro Setor & MROSC' },
  { key: 'rel_inst', label: 'Relações Institucionais & Legislativo' },
  { key: 'clima', label: 'Meio Ambiente & Sustentabilidade' },
] as const;

export interface PrideOption {
  key: string;
  label: string;
}

export const PRIDE_OPTIONS: readonly PrideOption[] = [
  { key: 'none', label: 'Nenhum' },
  { key: 'lgbt', label: 'LGBTQIAPN+' },
  { key: 'trans', label: 'Trans' },
  { key: 'gay', label: 'Gay' },
  { key: 'bisexual', label: 'Bissexual' },
  { key: 'lesbian', label: 'Lésbica' },
  { key: 'nonbinary', label: 'Não-Binárie' },
  { key: 'pansexual', label: 'Pansexual' },
  { key: 'asexual', label: 'Assexual' },
] as const;

export const AVATAR_PRESETS = [
  { id: 'preset_candango', label: 'Candango', bg: 'bg-[#8B1E2D]', text: 'GP' },
  { id: 'preset_coruja', label: 'Saber', bg: 'bg-[#005A9C]', text: 'UFMG' },
  { id: 'preset_arvore', label: 'Extensão', bg: 'bg-[#15803D]', text: 'EXT' },
  { id: 'preset_livro', label: 'FAFICH', bg: 'bg-[#0A0A0A]', text: 'FAF' },
] as const;
