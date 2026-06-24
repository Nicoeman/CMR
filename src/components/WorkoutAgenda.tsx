/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Calendar, Bell, Clock, Check, Flame, Trophy, Plus, ChevronRight, AlertCircle } from "lucide-react";

interface CompletedWorkout {
  id: string;
  name: string;
  date: string;
  durationMin: number;
  exercisesCount: number;
}

interface WorkoutAgendaProps {
  streak: number;
  completedWorkouts: CompletedWorkout[];
  scheduledDays: string[]; // ['Monday', 'Wednesday'...]
  onToggleScheduleDay: (day: string) => void;
  onTriggerNotificationTest: (title: string, message: string) => void;
}

export default function WorkoutAgenda({
  streak,
  completedWorkouts,
  scheduledDays,
  onToggleScheduleDay,
  onTriggerNotificationTest
}: WorkoutAgendaProps) {
  const [scheduledTime, setScheduledTime] = useState("19:00");
  const [showNotificationScheduler, setShowNotificationScheduler] = useState(false);

  const daysOfWeek = [
    { key: "Monday", label: "SEG", fullName: "Segunda-feira" },
    { key: "Tuesday", label: "TER", fullName: "Terça-feira" },
    { key: "Wednesday", label: "QUA", fullName: "Quarta-feira" },
    { key: "Thursday", label: "QUI", fullName: "Quinta-feira" },
    { key: "Friday", label: "SEX", fullName: "Sexta-feira" },
    { key: "Saturday", label: "SÁB", fullName: "Sábado" },
    { key: "Sunday", label: "DOM", fullName: "Domingo" }
  ];

  const handleTestNotification = () => {
    onTriggerNotificationTest(
      "⏰ Hora de Esmagar! FitPlan Pro",
      `Seu treino agendado para as ${scheduledTime} está pronto. Vamos começar?`
    );
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 bg-[#0A0A0A] text-white relative pb-20">
      
      {/* Header title */}
      <div>
        <span className="text-[10px] text-[#00FF7F] font-bold uppercase tracking-wider">ORGANIZAÇÃO</span>
        <h2 className="text-xl font-black tracking-tight uppercase">Agenda de Treinos</h2>
        <p className="text-[10px] text-gray-500 mt-0.5">Planeje sua semana e mantenha a constância ativa.</p>
      </div>

      {/* Streak Dashboard Highlight */}
      <div className="bg-gradient-to-r from-orange-600/10 via-[#121212] to-orange-600/10 border border-orange-500/20 rounded-3xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center">
            <Flame className="w-6 h-6 text-orange-500 fill-orange-500 animate-pulse" />
          </div>
          <div>
            <span className="text-[9px] text-orange-400 font-black uppercase tracking-wider">SEQUÊNCIA ATIVA</span>
            <h4 className="text-base font-black text-white">{streak} dias seguidos</h4>
            <p className="text-[9px] text-gray-500 font-medium">Treine hoje para proteger seu recorde!</p>
          </div>
        </div>
        <div className="text-right">
          <Trophy className="w-6 h-6 text-[#00FF7F]" />
        </div>
      </div>

      {/* Weekly Interactive Calendar Planner */}
      <div className="bg-[#121212] border border-white/5 rounded-3xl p-5 space-y-4">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-[#00FF7F]" />
          <span>Planejador Semanal</span>
        </h3>
        
        <p className="text-[10px] text-gray-400 leading-snug">
          Toque nos dias abaixo para marcar em quais dias da semana você deseja treinar.
        </p>

        {/* Days grid selection */}
        <div className="grid grid-cols-7 gap-1.5 py-1">
          {daysOfWeek.map((day) => {
            const isScheduled = scheduledDays.includes(day.key);
            return (
              <button
                key={day.key}
                onClick={() => onToggleScheduleDay(day.key)}
                className={`flex flex-col items-center py-3 rounded-xl border transition-all ${
                  isScheduled
                    ? "bg-[#00FF7F]/10 border-[#00FF7F]/40 text-[#00FF7F] font-black"
                    : "bg-black/40 border-white/5 text-gray-400 hover:border-white/10"
                }`}
              >
                <span className="text-[9px] font-bold tracking-wider">{day.label}</span>
                {isScheduled ? (
                  <Check className="w-3.5 h-3.5 text-[#00FF7F] mt-2.5 bg-[#00FF7F]/10 rounded-full p-0.5" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-gray-600 mt-2.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Summary scheduled */}
        <div className="bg-black/30 p-3 rounded-2xl border border-white/5 text-[10px] text-gray-400">
          <p className="leading-normal">
            <strong className="text-white">Agendamento ativo:</strong>{" "}
            {scheduledDays.length === 0
              ? "Sem treinos planejados. Selecione dias acima!"
              : `${scheduledDays.length} treinos nesta semana (${scheduledDays.map(d => daysOfWeek.find(w => w.key === d)?.label).join(", ")})`}
          </p>
        </div>
      </div>

      {/* Push Notifications Configuration */}
      <div className="bg-[#121212] border border-white/5 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-[#00FF7F]" />
            <span>Notificações Push</span>
          </h3>
          <button
            onClick={() => setShowNotificationScheduler(!showNotificationScheduler)}
            className="text-[10px] text-[#00FF7F] font-bold hover:underline"
          >
            {showNotificationScheduler ? "Ocultar Ajuste" : "Configurar"}
          </button>
        </div>

        <p className="text-[10px] text-gray-400 leading-snug">
          O aplicativo envia avisos para lembrar você de treinar no seu horário configurado.
        </p>

        {showNotificationScheduler && (
          <div className="bg-black/40 p-3.5 rounded-2xl border border-white/5 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-gray-400 font-bold">Definir Horário de Alerta:</span>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs outline-none focus:border-[#00FF7F]"
                />
              </div>
            </div>

            <button
              onClick={handleTestNotification}
              className="w-full bg-[#00FF7F]/10 hover:bg-[#00FF7F]/25 text-[#00FF7F] font-black text-xs py-2 rounded-xl border border-[#00FF7F]/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Disparar Notificação de Teste</span>
            </button>
          </div>
        )}
      </div>

      {/* Workout History Log */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Histórico de Treinos</h3>

        {completedWorkouts.length === 0 ? (
          <div className="text-center py-8 bg-[#121212] rounded-3xl border border-dashed border-white/5">
            <AlertCircle className="w-5 h-5 text-gray-600 mx-auto mb-2" />
            <p className="text-gray-500 text-xs">Nenhum treino concluído registrado ainda.</p>
            <p className="text-[10px] text-gray-600 mt-1">Inicie um treino hoje para inaugurar seu histórico.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {completedWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-[#121212] border border-white/5 p-4 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-black text-white uppercase">{workout.name}</h4>
                  <p className="text-[9px] text-gray-500 font-bold mt-1">
                    {workout.date} • {workout.durationMin} Minutos de treino • {workout.exercisesCount} Exercícios
                  </p>
                </div>
                
                <div className="w-6 h-6 rounded-full bg-[#00FF7F]/10 border border-[#00FF7F]/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-[#00FF7F]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
