/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User, LogOut, Award, Calendar, Flame, Edit2, Check, Shield, Dumbbell, Sparkles } from "lucide-react";

interface ProfileViewProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
  completedWorkoutsCount: number;
  streak: number;
  onUpdateProfile: (name: string, weight: number, height: number, objective: string) => void;
  initialWeight?: number;
  initialHeight?: number;
  initialObjective?: string;
}

export default function ProfileView({
  userName,
  userEmail,
  onLogout,
  completedWorkoutsCount,
  streak,
  onUpdateProfile,
  initialWeight = 78,
  initialHeight = 175,
  initialObjective = "Hipertrofia"
}: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [tempWeight, setTempWeight] = useState(initialWeight.toString());
  const [tempHeight, setTempHeight] = useState(initialHeight.toString());
  const [tempObjective, setTempObjective] = useState(initialObjective);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(tempWeight) || initialWeight;
    const h = parseFloat(tempHeight) || initialHeight;
    onUpdateProfile(tempName || userName, w, h, tempObjective);
    setIsEditing(false);
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 bg-[#0A0A0A] text-white relative pb-20 font-sans">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF7F]/3 rounded-full blur-2xl pointer-events-none"></div>

      {/* Main Avatar Card header */}
      <div className="flex flex-col items-center text-center py-4 space-y-3 bg-[#121212] border border-white/5 rounded-3xl p-6">
        
        {/* Avatar Placeholder */}
        <div className="relative">
          <div className="w-20 h-20 bg-zinc-900 border border-[#00FF7F]/40 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,127,0.1)] relative overflow-hidden">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <span className="absolute bottom-0 right-0 bg-[#00FF7F] text-black text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider border-2 border-black">
            PRO
          </span>
        </div>

        {/* User Info */}
        <div className="space-y-1">
          <h3 className="text-lg font-black text-white uppercase tracking-tight">{userName}</h3>
          <p className="text-[10px] text-gray-500 font-mono tracking-tight">{userEmail}</p>
        </div>

        {/* Edit Toggle */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-[10px] text-[#00FF7F] font-bold flex items-center gap-1 hover:underline"
          >
            <Edit2 className="w-3 h-3" />
            <span>Editar Perfil</span>
          </button>
        )}
      </div>

      {/* Profile Edit Form Card */}
      {isEditing ? (
        <form onSubmit={handleSaveProfile} className="bg-[#121212] border border-[#00FF7F]/30 p-5 rounded-3xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <h4 className="text-xs font-black text-[#00FF7F] uppercase tracking-widest">Editar Meus Dados</h4>
            <span className="w-2 h-2 rounded-full bg-[#00FF7F] animate-pulse"></span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Nome de Exibição</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Peso (kg)</label>
                <input
                  type="number"
                  value={tempWeight}
                  onChange={(e) => setTempWeight(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Altura (cm)</label>
                <input
                  type="number"
                  value={tempHeight}
                  onChange={(e) => setTempHeight(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Objetivo Principal</label>
              <select
                value={tempObjective}
                onChange={(e) => setTempObjective(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Hipertrofia">Hipertrofia</option>
                <option value="Emagrecimento">Emagrecimento</option>
                <option value="Força">Força</option>
                <option value="Resistência">Resistência</option>
                <option value="Definição">Definição</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 bg-[#00FF7F] hover:bg-[#00E572] text-black font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1"
            >
              <Check className="w-4 h-4" />
              <span>Salvar</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTempName(userName);
                setTempWeight(initialWeight.toString());
                setTempHeight(initialHeight.toString());
                setTempObjective(initialObjective);
                setIsEditing(false);
              }}
              className="px-4 py-2.5 bg-zinc-900 border border-white/5 rounded-xl text-xs font-bold text-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        // Standard Bio stats display
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-[#121212] border border-white/5 p-3 rounded-2xl">
            <span className="block text-[8px] text-gray-500 font-bold uppercase">Peso Atual</span>
            <span className="font-extrabold text-white text-sm mt-1 block">{initialWeight} Kg</span>
          </div>
          <div className="bg-[#121212] border border-white/5 p-3 rounded-2xl">
            <span className="block text-[8px] text-gray-500 font-bold uppercase">Altura</span>
            <span className="font-extrabold text-white text-sm mt-1 block">{initialHeight} cm</span>
          </div>
          <div className="bg-[#121212] border border-white/5 p-3 rounded-2xl">
            <span className="block text-[8px] text-gray-500 font-bold uppercase">Objetivo</span>
            <span className="font-extrabold text-[#00FF7F] text-sm mt-1 block truncate">{initialObjective}</span>
          </div>
        </div>
      )}

      {/* Cumulative Training Stats */}
      <div className="bg-[#121212] border border-white/5 rounded-3xl p-5 space-y-4">
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Resumo das Estatísticas</h4>
        
        <div className="space-y-3.5">
          {/* Workouts total */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-zinc-900 border border-white/5 rounded-xl">
                <Dumbbell className="w-4 h-4 text-[#00FF7F]" />
              </div>
              <span className="font-bold text-gray-300">Total de Treinos Concluídos</span>
            </div>
            <strong className="text-white text-sm">{completedWorkoutsCount}</strong>
          </div>

          {/* Current streak */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-zinc-900 border border-white/5 rounded-xl">
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <span className="font-bold text-gray-300">Streak de Constância</span>
            </div>
            <strong className="text-white text-sm">{streak} dias</strong>
          </div>

          {/* Account authorization verification state */}
          <div className="flex items-center justify-between text-xs pt-3.5 border-t border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-zinc-900 border border-white/5 rounded-xl">
                <Shield className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="font-bold text-gray-300">Acesso Premium Vitalício</span>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-lg font-black uppercase">
              Autorizado
            </span>
          </div>
        </div>
      </div>

      {/* Safety Logout button */}
      <button
        onClick={onLogout}
        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-black text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200"
      >
        <LogOut className="w-4 h-4" />
        <span>Sair da Conta FitPlan Pro</span>
      </button>
    </div>
  );
}
