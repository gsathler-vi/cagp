import React, { useState, useEffect } from 'react';
import { getVaultItem, setVaultItem, type VaultData } from '../../lib/storage/studentVault';

const ART41_CRITERIA = [
  { id: 'crit_1', label: 'Atuação profissional em gestão pública ou terceiro setor por no mínimo 1 ano', icon: 'bi-briefcase-fill' },
  { id: 'crit_2', label: 'Cópia da CTPS assinada ou Termo de Posse / Portaria em Diário Oficial', icon: 'bi-file-earmark-person-fill' },
  { id: 'crit_3', label: 'Relatório circunstanciado de atividades com carimbo e assinatura da chefia', icon: 'bi-file-earmark-check-fill' },
  { id: 'crit_4', label: 'Chefia imediata possui diploma de nível superior reconhecido', icon: 'bi-mortarboard-fill' },
  { id: 'crit_5', label: 'Preenchimento do Requerimento Oficial de Integralização por Experiência', icon: 'bi-pencil-square' },
];

const EMPLOYMENT_MODES = [
  { label: 'Servidor Efetivo', icon: 'bi-shield-check' },
  { label: 'Empregado CLT', icon: 'bi-file-text' },
  { label: 'Cargo Comissionado', icon: 'bi-person-badge' },
  { label: 'Contrato OSC / Terceiro Setor', icon: 'bi-building-check' },
];

export const Art41Simulator: React.FC = () => {
  const [checks, setChecks] = useState<VaultData<'cagp_art41_checklist_v1'>>({});

  useEffect(() => {
    setChecks(getVaultItem('cagp_art41_checklist_v1'));
  }, []);

  const toggle = (id: string) => {
    const updated = { ...checks, [id]: !checks[id] };
    setChecks(updated);
    setVaultItem('cagp_art41_checklist_v1', updated);
  };

  const completedCount = ART41_CRITERIA.filter((c) => checks[c.id]).length;
  const isEligible = completedCount === ART41_CRITERIA.length;

  return (
    <div className="bg-[#FBF8F3] border-2 border-[#0A0A0A] rounded-[6px] shadow-[2px_2px_0px_#0A0A0A] p-4 space-y-4">
      <div className="border-b border-[#DFDBD2] pb-2.5 flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <i className="bi bi-briefcase-fill text-[#8B1E2D] text-lg" aria-hidden="true" />
            <h3 className="font-['Oswald'] text-base font-bold uppercase text-[#0A0A0A]">
              Simulador de Dispensa de Estágio (Art. 41)
            </h3>
          </div>
          <p className="text-xs text-gray-600 mt-0.5">
            Estudantes com atuação profissional comprovada na área pública podem solicitar dispensa dos estágios A (180h) e B (120h).
          </p>
        </div>
        <span className="cagp-badge cagp-badge-red font-mono">
          300h: DCP 135 + DCP 136
        </span>
      </div>

      {/* Categorias Elegíveis */}
      <div className="p-3 bg-white rounded-[6px] border border-[#DFDBD2]">
        <span className="font-['Oswald'] font-bold text-xs uppercase text-gray-700 block mb-1.5">
          Vínculos Profissionais Reconhecidos pelo Colegiado:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {EMPLOYMENT_MODES.map((mode) => (
            <span key={mode.label} className="cagp-badge">
              <i className={`bi ${mode.icon} text-[#8B1E2D]`} aria-hidden="true" />
              <span>{mode.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {ART41_CRITERIA.map((c) => {
          const isDone = !!checks[c.id];
          return (
            <label
              key={c.id}
              className={`flex items-start gap-3 p-3 rounded-[6px] border-2 cursor-pointer transition-all shadow-[1px_1px_0_#0A0A0A] ${
                isDone ? 'bg-[#DCFCE7]/60 border-[#15803D]' : 'bg-white border-[#DFDBD2] hover:border-[#0A0A0A]'
              }`}
            >
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => toggle(c.id)}
                className="mt-0.5 w-4 h-4 text-[#8B1E2D] rounded-[4px] border-[#DFDBD2] focus:ring-[#8B1E2D] accent-[#8B1E2D]"
              />
              <div className="w-7 h-7 rounded-[4px] bg-[#F7F5F0] border border-[#DFDBD2] flex items-center justify-center text-[#8B1E2D] shrink-0">
                <i className={`bi ${c.icon} text-sm`} aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold text-[#0A0A0A] select-none flex-1 leading-snug pt-0.5">
                {c.label}
              </span>
            </label>
          );
        })}
      </div>

      {/* Eligibility Result Box */}
      <div
        className={`p-4 rounded-[6px] border-2 shadow-[2px_2px_0px_#0A0A0A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isEligible
            ? 'bg-[#DCFCE7] border-[#15803D] text-[#15803D]'
            : 'bg-[#FEF3C7] border-[#B45309] text-[#B45309]'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`cagp-stamp-badge ${
                isEligible ? 'is-deferido' : 'is-homologado'
              }`}
            >
              <i
                className={`bi ${
                  isEligible ? 'bi-check-all' : 'bi-hourglass-split'
                }`}
              ></i>
              {isEligible ? 'Elegível Art. 41' : 'Pendente de Comprovação'}
            </span>
            <span className="font-['Oswald'] font-bold text-xs uppercase text-[#0A0A0A]">
              {completedCount} de {ART41_CRITERIA.length} Requisitos Cumpridos
            </span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            {isEligible
              ? 'Você cumpre todos os requisitos do Art. 41 do Regulamento N-20229. Junte a documentação comprobatória e protocole na Secretaria Sala F-2039 com Norma Guedes.'
              : 'Marque todos os requisitos acima conforme sua documentação para certificar a viabilidade do pedido de dispensa.'}
          </p>
        </div>

        {isEligible && (
          <a
            href="/documentos/estagio-requerimento-integralizacao-experiencia-profissional.pdf"
            download
            className="cagp-btn-primary text-xs py-2 px-3 no-underline inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap"
          >
            <i className="bi bi-file-earmark-pdf" aria-hidden="true" />
            Baixar Requerimento Art. 41 (PDF)
          </a>
        )}
      </div>
    </div>
  );
};