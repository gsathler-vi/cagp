import React, { useState, useEffect } from 'react';
import { getVaultItem, setVaultItem, type VaultData } from '../../lib/storage/studentVault';

const AAC_FIELDS = [
  { key: 'aac_ic', label: 'Iniciação Científica (IC / PRPq)', max: 90, icon: 'bi-search' },
  { key: 'aac_monitoria', label: 'Monitoria de Graduação FAFICH', max: 90, icon: 'bi-person-video3' },
  { key: 'aac_eventos', label: 'Participação em Congressos / Seminários (120 dias)', max: 60, icon: 'bi-calendar2-week-fill' },
  { key: 'aac_cursos', label: 'Cursos Livres e Certificações Complementares', max: 60, icon: 'bi-journal-bookmark-fill' },
  { key: 'aac_gestao', label: 'Representação Discente / Centro Acadêmico (CAGP)', max: 60, icon: 'bi-people-fill' },
  { key: 'aac_publicacoes', label: 'Artigos Publicados em Periódicos / Anais', max: 90, icon: 'bi-file-earmark-richtext-fill' },
] as const;

export const AacForm: React.FC = () => {
  const [data, setData] = useState<VaultData<'cagp_calc_ext_aac_v1'>>({});

  useEffect(() => {
    setData(getVaultItem('cagp_calc_ext_aac_v1'));
  }, []);

  const handleChange = (key: string, val: number, max: number) => {
    const clamped = Math.max(0, Math.min(val, max));
    const updated = { ...data, [key]: clamped };
    setData(updated);
    setVaultItem('cagp_calc_ext_aac_v1', updated);
  };

  const totalAac = AAC_FIELDS.reduce((acc, f) => acc + (Number(data[f.key]) || 0), 0);
  const cappedAac = Math.min(300, totalAac);

  return (
    <div className="bg-[#FBF8F3] border-2 border-[#0A0A0A] rounded-[6px] shadow-[2px_2px_0px_#0A0A0A] p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-[#DFDBD2] pb-2.5 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <i className="bi bi-mortarboard-fill text-[#8B1E2D] text-lg" aria-hidden="true" />
            <h3 className="font-['Oswald'] text-base font-bold uppercase text-[#0A0A0A]">
              2. Atividades Complementares (AAC — até 300h)
            </h3>
          </div>
          <p className="text-xs text-gray-600 mt-0.5">
            Regulamento do Curso N-20229, Art. 15. Submissão via formulário autêntico.
          </p>
        </div>
        <span className="font-['JetBrains_Mono'] text-sm font-bold text-[#8B1E2D] bg-[#8B1E2D]/10 px-2.5 py-1 rounded-[4px] border border-[#8B1E2D]/30">
          {cappedAac}h / 300h
        </span>
      </div>

      <div className="space-y-2.5">
        {AAC_FIELDS.map((f) => {
          const currentVal = Number(data[f.key]) || 0;
          return (
            <div key={f.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-[6px] bg-white border border-[#DFDBD2] hover:border-[#0A0A0A] transition-colors shadow-[1px_1px_0_#0A0A0A]">
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <div className="w-7 h-7 rounded-[4px] bg-[#F7F5F0] border border-[#DFDBD2] flex items-center justify-center text-[#8B1E2D] shrink-0 mt-0.5">
                  <i className={`bi ${f.icon} text-sm`} aria-hidden="true" />
                </div>
                <div>
                  <label htmlFor={f.key} className="block text-xs font-semibold text-[#0A0A0A]">
                    {f.label}
                  </label>
                  <span className="text-xs text-gray-500 font-mono">Limite de cômputo: até {f.max}h</span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                {currentVal >= f.max && (
                  <span className="cagp-stamp-badge is-homologado text-xs py-0.5 px-1.5 shrink-0" title="Limite máximo atingido">
                    <i className="bi bi-shield-check" aria-hidden="true" />
                    <span>TETO</span>
                  </span>
                )}
                <input
                  id={f.key}
                  type="number"
                  min={0}
                  max={f.max}
                  value={currentVal === 0 ? '' : currentVal}
                  placeholder="0"
                  onChange={(e) => handleChange(f.key, parseInt(e.target.value, 10) || 0, f.max)}
                  className="w-24 bg-[#F7F5F0] border border-[#DFDBD2] p-1.5 rounded-[4px] text-base sm:text-xs text-right font-mono focus:border-[#8B1E2D] focus:bg-white focus:outline-none"
                />
                <span className="text-xs font-mono text-gray-500">h</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};