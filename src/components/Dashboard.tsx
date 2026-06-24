/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Dumbbell, Calendar, BarChart2, Flame, Play, Trophy, CheckCircle, ArrowRight } from "lucide-react";
import { PresetSpreadsheet } from "../data/spreadsheets";

interface DashboardProps {
  userName: string;
  streak: number;
  weeklyProgress: { completed: number; target: number };
  activeSpreadsheet: PresetSpreadsheet | null;
  scheduledToday: { dayName: string; exercisesCount: number } | null;
  onNavigate: (tab: string) => void;
  onStartWorkout: () => void;
  completedWorkoutsCount: number;
}

export default function Dashboard({
  userName,
  streak,
  weeklyProgress,
  activeSpreadsheet,
  scheduledToday,
  onNavigate,
  onStartWorkout,
  completedWorkoutsCount
}: DashboardProps) {
  // Calculate percentage of weekly progress
  const progressPercent = Math.min(
    100,
    Math.round((weeklyProgress.completed / weeklyProgress.target) * 100)
  );

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 text-white bg-[#0A0A0A] relative pb-20">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#00FF7F]/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header Greeting & Streak */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#00FF7F] font-bold uppercase tracking-wider">FOCO & DISCIPLINA</span>
          <h2 className="text-2xl font-black tracking-tight text-white mt-0.5">
            Olá, <span className="text-gray-100">{userName}</span>!
          </h2>
        </div>
        
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 bg-[#171717] border border-orange-500/10 px-3.5 py-1.5 rounded-2xl shadow-lg">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
          <div className="text-left">
            <p className="text-[10px] text-gray-500 font-bold leading-none uppercase">STREAK</p>
            <p className="text-sm font-black text-orange-400 leading-none mt-0.5">{streak} {streak === 1 ? "dia" : "dias"}</p>
          </div>
        </div>
      </div>

      {/* Weekly Progress Bar Card */}
      <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 shadow-xl">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-xs font-bold text-gray-400">Meta Semanal</span>
          <span className="text-xs font-black text-[#00FF7F]">{weeklyProgress.completed}/{weeklyProgress.target} Treinos</span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00FF7F] to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        
        <p className="text-[10px] text-gray-500 mt-2 font-medium">
          {progressPercent === 100
            ? "🏆 Meta semanal alcançada! Excelente trabalho."
            : `Faltam ${weeklyProgress.target - weeklyProgress.completed} treinos para fechar a semana.`}
        </p>
      </div>

      {/* Workout of the Day (Treino do Dia) Card */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#141414] to-[#0E0E0E] border border-white/5 rounded-2xl p-5 shadow-2xl">
        {/* Decorative corner tag */}
        <div className="absolute top-0 right-0 bg-[#00FF7F] text-black text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
          Hoje
        </div>

        <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">TREINO RECOMENDADO</span>
        
        {scheduledToday ? (
          <div className="mt-2 mb-4">
            <h3 className="text-lg font-black tracking-tight text-white uppercase">{scheduledToday.dayName}</h3>
            <p className="text-xs text-gray-400 mt-1">
              Foco muscular específico • <span className="text-[#00FF7F] font-bold">{scheduledToday.exercisesCount} exercícios</span> cadastrados.
            </p>
          </div>
        ) : (
          <div className="mt-2 mb-4">
            <h3 className="text-lg font-black tracking-tight text-white uppercase">
              {activeSpreadsheet ? "Treino Personalizado" : "Corpo Inteiro (Calistenia)"}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {activeSpreadsheet
                ? `Planilha Ativa: ${activeSpreadsheet.name}`
                : "Sem planilha ativa. Comece um treino rápido para manter o streak."}
            </p>
          </div>
        )}

        <button
          onClick={onStartWorkout}
          className="w-full bg-[#00FF7F] hover:bg-[#00E572] text-black font-extrabold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,127,0.15)] transform active:scale-98"
        >
          <Play className="w-4 h-4 fill-black" />
          <span>Iniciar Treino Agora</span>
        </button>
      </div>

      {/* Bento Grid Quick Shortcuts */}
      <div className="space-y-3">
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Atalhos Rápidos</h4>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Planilhas */}
          <button
            onClick={() => onNavigate("spreadsheets")}
            className="flex flex-col items-start p-4 bg-[#121212] border border-white/5 rounded-2xl hover:border-[#00FF7F]/20 transition-all text-left group"
          >
            <div className="p-2.5 bg-zinc-900 rounded-xl mb-3 border border-white/5 group-hover:border-[#00FF7F]/30 transition-colors">
              <Dumbbell className="w-5 h-5 text-[#00FF7F]" />
            </div>
            <span className="text-sm font-black text-white">Planilhas</span>
            <span className="text-[10px] text-gray-500 mt-1">Biblioteca & Customizadas</span>
          </button>

          {/* Exercícios */}
          <button
            onClick={() => onNavigate("exercises")}
            className="flex flex-col items-start p-4 bg-[#121212] border border-white/5 rounded-2xl hover:border-[#00FF7F]/20 transition-all text-left group"
          >
            <div className="p-2.5 bg-zinc-900 rounded-xl mb-3 border border-white/5 group-hover:border-[#00FF7F]/30 transition-colors">
              <CheckCircle className="w-5 h-5 text-[#00FF7F]" />
            </div>
            <span className="text-sm font-black text-white">Exercícios</span>
            <span className="text-[10px] text-gray-500 mt-1">+100 Guias de Execução</span>
          </button>

          {/* Agenda */}
          <button
            onClick={() => onNavigate("schedule")}
            className="flex flex-col items-start p-4 bg-[#121212] border border-white/5 rounded-2xl hover:border-[#00FF7F]/20 transition-all text-left group"
          >
            <div className="p-2.5 bg-zinc-900 rounded-xl mb-3 border border-white/5 group-hover:border-[#00FF7F]/30 transition-colors">
              <Calendar className="w-5 h-5 text-[#00FF7F]" />
            </div>
            <span className="text-sm font-black text-white">Agenda</span>
            <span className="text-[10px] text-gray-500 mt-1">Calendário & Notificações</span>
          </button>

          {/* Progresso */}
          <button
            onClick={() => onNavigate("progress")}
            className="flex flex-col items-start p-4 bg-[#121212] border border-white/5 rounded-2xl hover:border-[#00FF7F]/20 transition-all text-left group"
          >
            <div className="p-2.5 bg-zinc-900 rounded-xl mb-3 border border-white/5 group-hover:border-[#00FF7F]/30 transition-colors">
              <BarChart2 className="w-5 h-5 text-[#00FF7F]" />
            </div>
            <span className="text-sm font-black text-white">Progresso</span>
            <span className="text-[10px] text-gray-500 mt-1">Gráficos & Conquistas</span>
          </button>
        </div>
      </div>

      {/* Mini Progress Stats Footer */}
      <div className="bg-zinc-950/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00FF7F]/10 border border-[#00FF7F]/20 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-[#00FF7F]" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase leading-none">TREINOS CONCLUÍDOS</p>
            <p className="text-base font-black text-white leading-none mt-1">{completedWorkoutsCount}</p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate("progress")}
          className="text-gray-400 hover:text-[#00FF7F] transition-colors p-1"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
