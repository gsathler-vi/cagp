import React, { useState, useEffect } from 'react';
import { getVaultItem, type VaultData } from '../../lib/storage/studentVault';

export const HomeHeroHub: React.FC = () => {
  const [profile, setProfile] = useState<VaultData<'cagp_student_profile_v1'>>({
    name: 'Estudante de Gestão Pública',
    period: '1º Período',
    pronouns: '',
    semester: '2026/1',
    pathway: '01-01',
    avatarPreset: 'candangos',
    prideChoice: 'none',
    interests: [],
  });

  const [obrigCount, setObrigCount] = useState<number>(0);
  const [extHours, setExtHours] = useState<number>(0);
  const [activePill, setActivePill] = useState<'passport' | 'campus'>('passport');

  const loadData = () => {
    if (typeof window === 'undefined') return;
    setProfile(getVaultItem('cagp_student_profile_v1'));

    const calcData = getVaultItem('cagp_calc_ext_aac_v1');
    const sum = Object.values(calcData).reduce((a, b) => a + (Number(b) || 0), 0);
    setExtHours(Math.min(600, sum));

    const grade = getVaultItem('cagp_minha_grade_v1');
    setObrigCount(grade.savedCourses ? grade.savedCourses.length : 0);
  };

  useEffect(() => {
    loadData();

    const handleVaultUpdated = () => {
      loadData();
    };

    window.addEventListener('cagp:vault-updated', handleVaultUpdated);
    window.addEventListener('focus', loadData);

    return () => {
      window.removeEventListener('cagp:vault-updated', handleVaultUpdated);
      window.removeEventListener('focus', loadData);
    };
  }, []);

  const openPassportSheet = () => {
    window.dispatchEvent(new CustomEvent('cagp:open-passport'));
  };

  const openCampusSheet = () => {
    window.dispatchEvent(new CustomEvent('cagp:open-campus'));
    window.dispatchEvent(new CustomEvent('cagp:open-campus-sheet'));
  };

  const obrigPct = Math.min(100, Math.round((obrigCount / 27) * 100));
  const extPct = Math.min(100, Math.round((extHours / 600) * 100));
  const globalPct = Math.round((obrigPct + extPct) / 2);

  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const stampLabel = `${profile.period.toUpperCase()} • ATIVO`;

  return (
    <div className="cagp-home-hero-hub mb-3 select-none">
      {/* ========================================================
          1. CONTROLE DE PÍLULAS NO MOBILE (< lg) - Apple HIG
          ======================================================== */}
      <div className="lg:hidden mb-2">
        <nav
          className="bg-[#F7F5F0] p-1 rounded-[8px] border-2 border-[#0A0A0A] flex items-center gap-1 shadow-[2px_2px_0px_#0A0A0A]"
          role="tablist"
          aria-label="Alternar informações principais"
        >
          {/* Pílula 1: Passaporte Discente (Principal) */}
          <button
            type="button"
            role="tab"
            id="hero-tab-passport"
            aria-selected={activePill === 'passport'}
            aria-controls="hero-panel-passport"
            onClick={() => setActivePill('passport')}
            className={`w-1/2 py-2 px-2.5 rounded-[6px] font-['Oswald'] text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer ${
              activePill === 'passport'
                ? 'bg-[#8B1E2D] text-white shadow-[1.5px_1.5px_0_#0A0A0A] border border-[#0A0A0A]'
                : 'text-gray-700 hover:text-black hover:bg-white/60 border border-transparent'
            }`}
          >
            <i className="bi bi-person-badge-fill text-sm" aria-hidden="true" />
            <span className="truncate">Passaporte</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                activePill === 'passport'
                  ? 'bg-white/20 text-white'
                  : 'bg-[#DFDBD2] text-gray-700'
              }`}
            >
              {globalPct}%
            </span>
          </button>

          {/* Pílula 2: UFMG no Agora / Plantão Noturno (Secundário) */}
          <button
            type="button"
            role="tab"
            id="hero-tab-campus"
            aria-selected={activePill === 'campus'}
            aria-controls="hero-panel-campus"
            onClick={() => setActivePill('campus')}
            className={`w-1/2 py-2 px-2.5 rounded-[6px] font-['Oswald'] text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer ${
              activePill === 'campus'
                ? 'bg-[#8B1E2D] text-white shadow-[1.5px_1.5px_0_#0A0A0A] border border-[#0A0A0A]'
                : 'text-gray-700 hover:text-black hover:bg-white/60 border border-transparent'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#15803D] cagp-pulse-indicator shrink-0" />
            <span className="truncate">UFMG no Agora</span>
            <i className="bi bi-clock-history text-xs opacity-80" aria-hidden="true" />
          </button>
        </nav>

        {/* Painel Mobile: Passaporte Discente */}
        {activePill === 'passport' && (
          <div
            id="hero-panel-passport"
            role="tabpanel"
            aria-labelledby="hero-tab-passport"
            className="cagp-passport-card animate-in fade-in duration-150"
          >
            <div className="cagp-passport-topbar">
              <div className="cagp-passport-inst">
                <i className="bi bi-bank2 text-[#E8A317]" aria-hidden="true" />
                <span className="truncate">UFMG • FAFICH • CAGP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="cagp-passport-stamp">{stampLabel}</span>
                <button
                  type="button"
                  onClick={openPassportSheet}
                  className="text-[11px] font-['Oswald'] uppercase font-bold text-white hover:text-[#FFE082] bg-white/10 hover:bg-white/20 border border-white/30 rounded px-2 py-0.5 transition-colors cursor-pointer inline-flex items-center gap-1 min-h-[30px]"
                  aria-label="Editar Passaporte Discente e Foto"
                >
                  <i className="bi bi-pencil-square" aria-hidden="true" />
                  <span>Editar</span>
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openPassportSheet}
                className="relative group p-0 bg-transparent border-0 cursor-pointer shrink-0"
                aria-label="Trocar foto de perfil do Passaporte"
              >
                <div className="cagp-avatar-frame cagp-avatar-frame--lg">
                  {profile.photoDataUrl ? (
                    <img
                      src={profile.photoDataUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : profile.avatarPreset === 'monogram' ? (
                    <span className="font-['Oswald'] text-2xl font-black text-[#8B1E2D]">
                      {initials || 'GP'}
                    </span>
                  ) : (
                    <i className="bi bi-person-fill text-3xl text-gray-500" aria-hidden="true" />
                  )}

                  {profile.prideChoice && profile.prideChoice !== 'none' && (
                    <span
                      className={`cagp-pride-pin cagp-pride-swatch--${profile.prideChoice}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span className="cagp-avatar-cam-badge group-hover:bg-[#E8A317] transition-colors">
                  <i className="bi bi-camera-fill" aria-hidden="true" />
                </span>
              </button>

              <div className="flex-1 min-w-[170px]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-['Oswald'] text-lg font-bold uppercase text-[#0A0A0A] leading-tight m-0">
                    {profile.name}
                  </h3>
                  {profile.pronouns && (
                    <span className="text-xs text-gray-500 font-mono">
                      ({profile.pronouns})
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1 mt-1">
                  <span className="cagp-badge cagp-badge-red">{profile.period}</span>
                  <span className="cagp-badge cagp-badge-dark font-mono">{profile.semester || '2026/1'}</span>
                  <span className="cagp-badge cagp-badge-blue">{profile.pathway || '01-01'}</span>
                </div>
              </div>

              <div
                className="cagp-metric-ring shrink-0"
                style={{ '--ring-pct': globalPct } as React.CSSProperties}
                title="Índice Médio de Integralização"
              >
                <div className="cagp-metric-ring-inner">{globalPct}%</div>
              </div>
            </div>

            <div className="cagp-passport-progress-grid mb-1 px-3 sm:px-4 pb-3">
              <div className="cagp-passport-progress-item">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-['Oswald'] font-bold uppercase text-[11px] text-gray-700">
                    27 Obrigatórias
                  </span>
                  <span className="font-mono font-bold text-[11px] text-[#005A9C]">
                    {obrigCount}/27 ({obrigPct}%)
                  </span>
                </div>
                <div className="cagp-passport-mini-track" aria-hidden="true">
                  <div
                    className="cagp-passport-mini-fill is-obrig"
                    style={{ width: `${obrigPct}%` }}
                  />
                </div>
              </div>

              <div className="cagp-passport-progress-item">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-['Oswald'] font-bold uppercase text-[11px] text-gray-700">
                    Extensão & AAC (600h)
                  </span>
                  <span className="font-mono font-bold text-[11px] text-[#15803D]">
                    {extHours}h/600h ({extPct}%)
                  </span>
                </div>
                <div className="cagp-passport-mini-track" aria-hidden="true">
                  <div
                    className="cagp-passport-mini-fill is-acg"
                    style={{ width: `${extPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Painel Mobile: UFMG no Agora / Plantão Noturno */}
        {activePill === 'campus' && (
          <div
            id="hero-panel-campus"
            role="tabpanel"
            aria-labelledby="hero-tab-campus"
            className="bg-white border-2 border-[#0A0A0A] rounded-md p-3 shadow-[3px_3px_0px_#0A0A0A] animate-in fade-in duration-150"
          >
            <div className="flex items-center justify-between border-b border-[#DFDBD2] pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#15803D]/10 border border-[#15803D]/30 text-[#15803D] font-mono font-bold text-xs uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#15803D] cagp-pulse-indicator" />
                  Plantão Noturno
                </span>
                <span className="font-['Oswald'] font-bold text-xs uppercase text-[#0A0A0A]">
                  FAFICH / Campus Pampulha
                </span>
              </div>

              <button
                type="button"
                onClick={openCampusSheet}
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#8B1E2D] hover:underline cursor-pointer"
                aria-label="Abrir detalhes operacionais do Campus"
              >
                <span>Ver Horários</span>
                <i className="bi bi-chevron-right text-xs" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2 p-2 rounded-[4px] bg-[#F7F5F0] border border-[#DFDBD2]">
                <i className="bi bi-cup-hot-fill text-[#8B1E2D] text-base mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-['Oswald'] font-bold uppercase text-[#0A0A0A] block">RU II Setorial</span>
                  <span className="text-gray-600 block">Jantar: <strong>17h30 às 19h45</strong></span>
                  <span className="font-mono text-gray-500 text-[11px]">Bandejão: R$ 5,60</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 rounded-[4px] bg-[#F7F5F0] border border-[#DFDBD2]">
                <i className="bi bi-bus-front-fill text-[#005A9C] text-base mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-['Oswald'] font-bold uppercase text-[#0A0A0A] block">Circular Noturno</span>
                  <span className="text-gray-600 block">Últimas saídas: <strong>22h15 / 22h35</strong></span>
                  <span className="font-mono text-gray-500 text-[11px]">Praça de Serviços</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 rounded-[4px] bg-[#F7F5F0] border border-[#DFDBD2]">
                <i className="bi bi-building text-[#15803D] text-base mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-['Oswald'] font-bold uppercase text-[#0A0A0A] block">Secretaria F-2039</span>
                  <span className="text-gray-600 block">Colegiado Gestão Pública</span>
                  <span className="font-mono text-gray-500 text-[11px]">CEAG: 08h às 22h</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 rounded-[4px] bg-[#F7F5F0] border border-[#DFDBD2]">
                <i className="bi bi-shield-check text-[#B45309] text-base mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-['Oswald'] font-bold uppercase text-[#0A0A0A] block">Prazos de AAC</span>
                  <span className="text-gray-600 block">Guardião: <strong>120 dias</strong></span>
                  <span className="font-mono text-gray-500 text-[11px]">Art. 15, § 4º</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          2. EXIBIÇÃO PANORÂMICA NO DESKTOP (lg+) - 2 Colunas Lado a Lado
          ======================================================== */}
      <div className="hidden lg:grid grid-cols-12 gap-3.5 items-stretch">
        {/* Coluna Esquerda (7 colunas): Passaporte Discente */}
        <div className="col-span-7 cagp-passport-card m-0 flex flex-col justify-between">
          <div>
            <div className="cagp-passport-topbar">
              <div className="cagp-passport-inst">
                <i className="bi bi-bank2 text-[#E8A317]" aria-hidden="true" />
                <span>UFMG • FAFICH • CENTRO ACADÊMICO DE GESTÃO PÚBLICA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="cagp-passport-stamp">{stampLabel}</span>
                <button
                  type="button"
                  onClick={openPassportSheet}
                  className="text-[11px] font-['Oswald'] uppercase font-bold text-white hover:text-[#FFE082] bg-white/10 hover:bg-white/20 border border-white/30 rounded px-2.5 py-0.5 transition-colors cursor-pointer inline-flex items-center gap-1 min-h-[28px]"
                  aria-label="Editar Passaporte Discente e Foto"
                >
                  <i className="bi bi-pencil-square" aria-hidden="true" />
                  <span>Editar Perfil</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={openPassportSheet}
                  className="relative group p-0 bg-transparent border-0 cursor-pointer shrink-0"
                  aria-label="Trocar foto de perfil do Passaporte"
                >
                  <div className="cagp-avatar-frame cagp-avatar-frame--lg">
                    {profile.photoDataUrl ? (
                      <img
                        src={profile.photoDataUrl}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : profile.avatarPreset === 'monogram' ? (
                      <span className="font-['Oswald'] text-2xl font-black text-[#8B1E2D]">
                        {initials || 'GP'}
                      </span>
                    ) : (
                      <i className="bi bi-person-fill text-3xl text-gray-500" aria-hidden="true" />
                    )}

                    {profile.prideChoice && profile.prideChoice !== 'none' && (
                      <span
                        className={`cagp-pride-pin cagp-pride-swatch--${profile.prideChoice}`}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <span className="cagp-avatar-cam-badge group-hover:bg-[#E8A317] transition-colors">
                    <i className="bi bi-camera-fill" aria-hidden="true" />
                  </span>
                </button>

                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-['Oswald'] text-lg font-bold uppercase text-[#0A0A0A] leading-tight m-0">
                      {profile.name}
                    </h3>
                    {profile.pronouns && (
                      <span className="text-xs text-gray-500 font-mono">
                        ({profile.pronouns})
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1 mt-1.5">
                    <span className="cagp-badge cagp-badge-red">{profile.period}</span>
                    <span className="cagp-badge cagp-badge-dark font-mono">Ingresso {profile.semester || '2026/1'}</span>
                    <span className="cagp-badge cagp-badge-blue">{profile.pathway || '01-01'} • Geral</span>
                  </div>
                </div>
              </div>

              <div
                className="cagp-metric-ring shrink-0"
                style={{ '--ring-pct': globalPct } as React.CSSProperties}
                title="Índice Médio de Integralização"
              >
                <div className="cagp-metric-ring-inner">{globalPct}%</div>
              </div>
            </div>
          </div>

          <div className="cagp-passport-progress-grid px-3.5 pb-3 pt-1 border-t border-[#DFDBD2]/60">
            <div className="cagp-passport-progress-item">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-['Oswald'] font-bold uppercase text-[11px] text-gray-700">
                  Disciplinas Obrigatórias (27)
                </span>
                <span className="font-mono font-bold text-[11px] text-[#005A9C]">
                  {obrigCount}/27 ({obrigPct}%)
                </span>
              </div>
              <div className="cagp-passport-mini-track" aria-hidden="true">
                <div
                  className="cagp-passport-mini-fill is-obrig"
                  style={{ width: `${obrigPct}%` }}
                />
              </div>
            </div>

            <div className="cagp-passport-progress-item">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-['Oswald'] font-bold uppercase text-[11px] text-gray-700">
                  Extensão & AAC (600h)
                </span>
                <span className="font-mono font-bold text-[11px] text-[#15803D]">
                  {extHours}h/600h ({extPct}%)
                </span>
              </div>
              <div className="cagp-passport-mini-track" aria-hidden="true">
                <div
                  className="cagp-passport-mini-fill is-acg"
                  style={{ width: `${extPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita (5 colunas): UFMG no Agora & Plantão Noturno */}
        <div className="col-span-5 bg-white border-2 border-[#0A0A0A] rounded-md p-3.5 shadow-[3px_3px_0px_#0A0A0A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#DFDBD2] pb-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#15803D]/10 border border-[#15803D]/30 text-[#15803D] font-mono font-bold text-xs uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#15803D] cagp-pulse-indicator" />
                  UFMG no Agora
                </span>
                <span className="font-['Oswald'] font-bold text-xs uppercase text-[#0A0A0A]">
                  Plantão Noturno
                </span>
              </div>

              <button
                type="button"
                onClick={openCampusSheet}
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#8B1E2D] hover:underline cursor-pointer"
                aria-label="Abrir detalhes operacionais do Campus"
              >
                <span>Ver Ônibus & RU</span>
                <i className="bi bi-chevron-right text-xs" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2 p-2 rounded-[4px] bg-[#F7F5F0] border border-[#DFDBD2]">
                <i className="bi bi-cup-hot-fill text-[#8B1E2D] text-base mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-['Oswald'] font-bold uppercase text-[#0A0A0A] block">RU II Setorial</span>
                  <span className="text-gray-600 block">Jantar: <strong>17h30–19h45</strong></span>
                  <span className="font-mono text-gray-500 text-[11px]">R$ 5,60</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 rounded-[4px] bg-[#F7F5F0] border border-[#DFDBD2]">
                <i className="bi bi-bus-front-fill text-[#005A9C] text-base mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-['Oswald'] font-bold uppercase text-[#0A0A0A] block">Circular Noturno</span>
                  <span className="text-gray-600 block">Até <strong>22h35</strong></span>
                  <span className="font-mono text-gray-500 text-[11px]">Praça Serviços</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 rounded-[4px] bg-[#F7F5F0] border border-[#DFDBD2]">
                <i className="bi bi-building text-[#15803D] text-base mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-['Oswald'] font-bold uppercase text-[#0A0A0A] block">Secretaria Sala F-2039</span>
                  <span className="text-gray-600 block">Norma Guedes</span>
                  <span className="font-mono text-gray-500 text-[11px]">CEAG: 08h–22h</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 rounded-[4px] bg-[#F7F5F0] border border-[#DFDBD2]">
                <i className="bi bi-shield-check text-[#B45309] text-base mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-['Oswald'] font-bold uppercase text-[#0A0A0A] block">Prazos de AAC</span>
                  <span className="text-gray-600 block">Limite: <strong>120 dias</strong></span>
                  <span className="font-mono text-gray-500 text-[11px]">Art. 15, § 4º</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#DFDBD2] flex items-center justify-between text-[11px] text-gray-500 font-mono">
            <span>Colegiado DCP • FAFICH</span>
            <span className="text-[#15803D] font-bold flex items-center gap-1">
              <i className="bi bi-check-circle-fill text-[10px]" /> Operação Normal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
