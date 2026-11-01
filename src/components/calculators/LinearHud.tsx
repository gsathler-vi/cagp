import React, { useState, useEffect } from 'react';
import { getVaultItem, type VaultData } from '../../lib/storage/studentVault';

export const LinearHud: React.FC = () => {
  const [calcData, setCalcData] = useState<VaultData<'cagp_calc_ext_aac_v1'>>({});

  const refresh = () => {
    setCalcData(getVaultItem('cagp_calc_ext_aac_v1'));
  };

  useEffect(() => {
    refresh();
    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail?.key === 'cagp_calc_ext_aac_v1') {
        setCalcData(custom.detail.value);
      }
    };
    window.addEventListener('cagp:vault-updated', handleUpdate);
    return () => window.removeEventListener('cagp:vault-updated', handleUpdate);
  }, []);

  // Compute totals
  let totalExt = 0;
  let totalAac = 0;
  for (const [k, v] of Object.entries(calcData)) {
    if (k.startsWith('ext_')) totalExt += Number(v) || 0;
    if (k.startsWith('aac_')) totalAac += Number(v) || 0;
  }
  const capExt = Math.min(totalExt, 300);
  const capAac = Math.min(totalAac, 300);
  const total = capExt + capAac;
  const pct = Math.min(100, Math.round((total / 600) * 100));

  return (
    <div
      id="cagp-calc-hud-linear"
      className="sticky top-14 z-[1020] bg-white border border-[#DFDBD2] rounded-xl p-3 shadow-sm mb-4"
    >
      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-['Oswald'] font-bold text-sm uppercase text-[#0A0A0A]">
            Meta 600h:
          </span>
          <span className="font-['JetBrains_Mono'] text-sm font-bold text-[#8B1E2D]">
            {total}h / 600h
          </span>
          {total >= 600 && (
            <span className="cagp-stamp-badge is-deferido text-[10px] py-0.5 px-2">
              <i className="bi bi-patch-check-fill" aria-hidden="true" />
              <span>INTEGRALIZAÇÃO APTA</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="bg-[#8B1E2D]/10 text-[#8B1E2D] px-2 py-0.5 rounded font-semibold">
            Ext: {capExt}h/300h
          </span>
          <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-semibold">
            AAC: {capAac}h/300h
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-[#F7F5F0] rounded-full h-2.5 overflow-hidden border border-[#DFDBD2]">
        <div
          className="bg-[#8B1E2D] h-full transition-all duration-300 rounded-full"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={total}
          aria-valuemin={0}
          aria-valuemax={600}
        />
      </div>
    </div>
  );
};
