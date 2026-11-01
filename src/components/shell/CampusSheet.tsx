import React, { useState, useEffect } from 'react';
import { BottomSheet } from './BottomSheet';
import { getVaultItem, setVaultItem, type VaultData } from '../../lib/storage/studentVault';

interface CampusSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampusSheet: React.FC<CampusSheetProps> = ({ isOpen, onClose }) => {
  const [prefs, setPrefs] = useState<VaultData<'cagp_notifications_prefs_v1'>>({
    ru1815: false,
    circular2230: false,
    aac120d: true,
  });

  useEffect(() => {
    if (isOpen) {
      setPrefs(getVaultItem('cagp_notifications_prefs_v1'));
    }
  }, [isOpen]);

  const togglePref = (key: 'ru1815' | 'circular2230' | 'aac120d') => {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    setVaultItem('cagp_notifications_prefs_v1', updated);
  };

  return (
    <BottomSheet id="cagp-campus-sheet" isOpen={isOpen} onClose={onClose} title="Status Operacional do Campus" initialDetent="medium">
      <div className="space-y-4 text-[#0A0A0A]">
        {/* RU II Setorial */}
        <div className="bg-[#F7F5F0] p-3 rounded-lg border border-[#DFDBD2] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Oswald'] font-bold text-sm uppercase">RU II Setorial</span>
              <span className="text-[10px] bg-[#15803D]/10 text-[#15803D] font-bold px-1.5 py-0.5 rounded border border-[#15803D]/30">Aberto</span>
            </div>
            <p className="text-xs text-gray-600 mt-0.5">Almoço: 11h–14h · Jantar: 17h30–19h30</p>
          </div>
          <button
            type="button"
            onClick={() => togglePref('ru1815')}
            className={`text-xs px-2.5 py-1.5 rounded font-['Oswald'] font-semibold uppercase border transition-colors ${prefs.ru1815 ? 'bg-[#8B1E2D] text-white border-[#0A0A0A]' : 'bg-white text-gray-700 border-[#DFDBD2]'}`}
          >
            {prefs.ru1815 ? 'Aviso 18h15 Ativo' : 'Lembrar 18h15'}
          </button>
        </div>

        {/* Circular Noturno */}
        <div className="bg-[#F7F5F0] p-3 rounded-lg border border-[#DFDBD2] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Oswald'] font-bold text-sm uppercase">Circular Noturno</span>
              <span className="text-[10px] bg-[#B45309]/10 text-[#B45309] font-bold px-1.5 py-0.5 rounded border border-[#B45309]/30">Atenção Horário</span>
            </div>
            <p className="text-xs text-gray-600 mt-0.5">Últimas viagens saindo da FAFICH: 22h30 e 22h45</p>
          </div>
          <button
            type="button"
            onClick={() => togglePref('circular2230')}
            className={`text-xs px-2.5 py-1.5 rounded font-['Oswald'] font-semibold uppercase border transition-colors ${prefs.circular2230 ? 'bg-[#8B1E2D] text-white border-[#0A0A0A]' : 'bg-white text-gray-700 border-[#DFDBD2]'}`}
          >
            {prefs.circular2230 ? 'Aviso 22h30 Ativo' : 'Lembrar 22h30'}
          </button>
        </div>

        {/* Secretaria do Colegiado */}
        <div className="bg-[#F7F5F0] p-3 rounded-lg border border-[#DFDBD2]">
          <div className="flex items-center gap-2">
            <span className="font-['Oswald'] font-bold text-sm uppercase">Colegiado de Gestão Pública</span>
            <span className="text-[10px] bg-gray-200 text-gray-800 font-bold px-1.5 py-0.5 rounded">Sala F-2039</span>
          </div>
          <p className="text-xs text-gray-600 mt-0.5">Atendimento presencial com Norma Guedes · 08h às 20h</p>
          <p className="text-xs text-[#8B1E2D] font-mono mt-1 font-semibold">coordgestaopublica@gmail.com</p>
        </div>

        {/* CEAG FAFICH */}
        <div className="bg-[#F7F5F0] p-3 rounded-lg border border-[#DFDBD2]">
          <div className="flex items-center gap-2">
            <span className="font-['Oswald'] font-bold text-sm uppercase">CEAG FAFICH</span>
            <span className="text-[10px] bg-gray-200 text-gray-800 font-bold px-1.5 py-0.5 rounded">Prédio FAFICH</span>
          </div>
          <p className="text-xs text-gray-600 mt-0.5">Suporte acadêmico e salas de aula · 08h às 22h</p>
        </div>
      </div>
    </BottomSheet>
  );
};
