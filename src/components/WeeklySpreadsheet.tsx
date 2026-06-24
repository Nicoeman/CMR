import React, { useState, useEffect } from "react";
import { Calendar, Dumbbell, Sparkles, Edit3, Check, RefreshCw, X, AlertCircle, ArrowRight, Zap } from "lucide-react";
import { PresetSpreadsheet } from "../data/spreadsheets";
import { generateExpandedWorkouts } from "../data/expandedWorkouts";
import { EXERCISE_DATABASE } from "../data/exercises";
import { getExerciseImageUrl } from "../utils/exerciseImages";

interface WeeklyDayWorkout {
  dayId: string;
  dayName: string; // Segunda, Terça...
  workoutTitle: string; // ex: "Treino A - Peito e Tríceps" ou "Descanso"
  focus: string; // ex: "Peito, Tríceps, Ombros"
  durationMins: number;
  isRest: boolean;
  exerciseIds: string[];
}

const DEFAULT_DAYS = [
  { dayId: "seg", dayName: "Segunda-feira" },
  { dayId: "ter", dayName: "Terça-feira" },
  { dayId: "qua", dayName: "Quarta-feira" },
  { dayId: "qui", dayName: "Quinta-feira" },
  { dayId: "sex", dayName: "Sexta-feira" },
  { dayId: "sab", dayName: "Sábado" },
  { dayId: "dom", dayName: "Domingo" }
];

interface WeeklySpreadsheetProps {
  activeSpreadsheet: PresetSpreadsheet | null;
  userObjective: string;
}

export default function WeeklySpreadsheet({ activeSpreadsheet, userObjective }: WeeklySpreadsheetProps) {
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklyDayWorkout[]>([]);
  const [editingDay, setEditingDay] = useState<WeeklyDayWorkout | null>(null);
  const [allPresets] = useState<PresetSpreadsheet[]>(() => generateExpandedWorkouts());

  // Modal search query for swap workout
  const [searchQuery, setSearchQuery] = useState("");

  // Load schedule on mount or spreadsheet change
  useEffect(() => {
    const saved = localStorage.getItem("fitplan_pro_weekly_schedule");
    
    if (saved) {
      try {
        setWeeklySchedule(JSON.parse(saved));
        return;
      } catch (e) {}
    }

    // Otherwise, generate auto schedule based on active spreadsheet or user objective
    const schedule = generateAutoSchedule(activeSpreadsheet, userObjective);
    setWeeklySchedule(schedule);
    localStorage.setItem("fitplan_pro_weekly_schedule", JSON.stringify(schedule));
  }, [activeSpreadsheet, userObjective]);

  // Generates automatic weekly split
  const generateAutoSchedule = (sheet: PresetSpreadsheet | null, objective: string): WeeklyDayWorkout[] => {
    const list: WeeklyDayWorkout[] = DEFAULT_DAYS.map(d => ({
      dayId: d.dayId,
      dayName: d.dayName,
      workoutTitle: "Descanso Ativo",
      focus: "Recuperação",
      durationMins: 0,
      isRest: true,
      exerciseIds: []
    }));

    if (sheet && sheet.days && sheet.days.length > 0) {
      // Map active spreadsheet days to weekdays (ABC split style)
      if (sheet.days.length === 1) {
        // Monday/Wednesday/Friday same workout
        const activeDay = sheet.days[0];
        const exIds = activeDay.exercises.map(e => e.exerciseId);
        
        list[0] = { dayId: "seg", dayName: "Segunda-feira", workoutTitle: sheet.name, focus: sheet.musclesTargeted.join(", "), durationMins: activeDay.exercises.length * 8 + 10, isRest: false, exerciseIds: exIds };
        list[2] = { dayId: "qua", dayName: "Quarta-feira", workoutTitle: sheet.name, focus: sheet.musclesTargeted.join(", "), durationMins: activeDay.exercises.length * 8 + 10, isRest: false, exerciseIds: exIds };
        list[4] = { dayId: "sex", dayName: "Sexta-feira", workoutTitle: sheet.name, focus: sheet.musclesTargeted.join(", "), durationMins: activeDay.exercises.length * 8 + 10, isRest: false, exerciseIds: exIds };
      } else if (sheet.days.length === 2) {
        // AB split: Mon/Thu = A, Tue/Fri = B
        const dayA = sheet.days[0];
        const dayB = sheet.days[1];

        list[0] = { dayId: "seg", dayName: "Segunda-feira", workoutTitle: dayA.dayName, focus: sheet.musclesTargeted.slice(0, 3).join(", "), durationMins: dayA.exercises.length * 8 + 10, isRest: false, exerciseIds: dayA.exercises.map(e => e.exerciseId) };
        list[1] = { dayId: "ter", dayName: "Terça-feira", workoutTitle: dayB.dayName, focus: sheet.musclesTargeted.slice(2).join(", "), durationMins: dayB.exercises.length * 8 + 10, isRest: false, exerciseIds: dayB.exercises.map(e => e.exerciseId) };
        list[3] = { dayId: "qui", dayName: "Quinta-feira", workoutTitle: dayA.dayName, focus: sheet.musclesTargeted.slice(0, 3).join(", "), durationMins: dayA.exercises.length * 8 + 10, isRest: false, exerciseIds: dayA.exercises.map(e => e.exerciseId) };
        list[4] = { dayId: "sex", dayName: "Sexta-feira", workoutTitle: dayB.dayName, focus: sheet.musclesTargeted.slice(2).join(", "), durationMins: dayB.exercises.length * 8 + 10, isRest: false, exerciseIds: dayB.exercises.map(e => e.exerciseId) };
      } else {
        // ABC split: Mon = A, Wed = B, Fri = C
        const dayA = sheet.days[0];
        const dayB = sheet.days[1];
        const dayC = sheet.days[2];

        list[0] = { dayId: "seg", dayName: "Segunda-feira", workoutTitle: dayA.dayName, focus: sheet.musclesTargeted.slice(0, 2).join(", ") || "Superiores", durationMins: dayA.exercises.length * 8 + 10, isRest: false, exerciseIds: dayA.exercises.map(e => e.exerciseId) };
        list[2] = { dayId: "qua", dayName: "Quarta-feira", workoutTitle: dayB.dayName, focus: sheet.musclesTargeted.slice(2, 4).join(", ") || "Costas/Bíceps", durationMins: dayB.exercises.length * 8 + 10, isRest: false, exerciseIds: dayB.exercises.map(e => e.exerciseId) };
        list[4] = { dayId: "sex", dayName: "Sexta-feira", workoutTitle: dayC.dayName, focus: sheet.musclesTargeted.slice(4).join(", ") || "Pernas/Abs", durationMins: dayC.exercises.length * 8 + 10, isRest: false, exerciseIds: dayC.exercises.map(e => e.exerciseId) };
      }
    } else {
      // Default objective based automatic split
      const isHyper = objective.toLowerCase().includes("hiper");
      const isWeight = objective.toLowerCase().includes("emag") || objective.toLowerCase().includes("perda");

      if (isHyper) {
        // Hypertrophy Mon/Wed/Fri lift, Tue/Thu rest
        list[0] = { dayId: "seg", dayName: "Segunda-feira", workoutTitle: "Hipertrofia - Peito & Tríceps", focus: "Peito, Tríceps", durationMins: 50, isRest: false, exerciseIds: ["peito-1", "peito-2", "triceps-1", "triceps-2"] };
        list[2] = { dayId: "qua", dayName: "Quarta-feira", workoutTitle: "Hipertrofia - Costas & Bíceps", focus: "Costas, Bíceps", durationMins: 50, isRest: false, exerciseIds: ["costas-1", "costas-2", "biceps-1", "biceps-2"] };
        list[4] = { dayId: "sex", dayName: "Sexta-feira", workoutTitle: "Hipertrofia - Pernas Completo", focus: "Pernas, Glúteos", durationMins: 60, isRest: false, exerciseIds: ["pernas-1", "pernas-2", "gluteos-1"] };
      } else if (isWeight) {
        // Weight loss Mon/Tue/Thu/Fri circuit cardio
        list[0] = { dayId: "seg", dayName: "Segunda-feira", workoutTitle: "HIIT Metabólico - Queima", focus: "Cardio, Pernas", durationMins: 40, isRest: false, exerciseIds: ["calistenia-9", "pernas-9", "abdomen-1"] };
        list[1] = { dayId: "ter", dayName: "Terça-feira", workoutTitle: "Resistência Superior", focus: "Peito, Costas, Braços", durationMins: 45, isRest: false, exerciseIds: ["peito-9", "costas-5", "triceps-10"] };
        list[3] = { dayId: "qui", dayName: "Quinta-feira", workoutTitle: "Circuito Abdômen de Aço", focus: "Core, Abs", durationMins: 35, isRest: false, exerciseIds: ["abdomen-1", "abdomen-3", "abdomen-4"] };
        list[4] = { dayId: "sex", dayName: "Sexta-feira", workoutTitle: "HIIT Explosivo - Cardio", focus: "Cardio", durationMins: 40, isRest: false, exerciseIds: ["calistenia-11", "pernas-9", "abdomen-3"] };
      } else {
        // Definition push/pull/legs
        list[0] = { dayId: "seg", dayName: "Segunda-feira", workoutTitle: "Definição - Empurrar (Push)", focus: "Peito, Ombros, Tríceps", durationMins: 45, isRest: false, exerciseIds: ["peito-2", "ombro-1", "triceps-1"] };
        list[2] = { dayId: "qua", dayName: "Quarta-feira", workoutTitle: "Definição - Puxar (Pull)", focus: "Costas, Bíceps, Abs", durationMins: 45, isRest: false, exerciseIds: ["costas-2", "biceps-1", "abdomen-1"] };
        list[4] = { dayId: "sex", dayName: "Sexta-feira", workoutTitle: "Definição - Pernas", focus: "Quadríceps, Glúteos", durationMins: 50, isRest: false, exerciseIds: ["pernas-1", "gluteos-2"] };
      }
    }

    return list;
  };

  const handleResetToAuto = () => {
    if (window.confirm("Deseja restaurar a divisão semanal recomendada pelo sistema? Suas alterações manuais serão perdidas.")) {
      const schedule = generateAutoSchedule(activeSpreadsheet, userObjective);
      setWeeklySchedule(schedule);
      localStorage.setItem("fitplan_pro_weekly_schedule", JSON.stringify(schedule));
    }
  };

  const handleSelectPresetForDay = (sheetPreset: PresetSpreadsheet) => {
    if (!editingDay) return;

    const mainDay = sheetPreset.days[0] || { exercises: [] };

    const updated = weeklySchedule.map(day => {
      if (day.dayId === editingDay.dayId) {
        return {
          ...day,
          workoutTitle: sheetPreset.name,
          focus: sheetPreset.musclesTargeted.join(", ") || "Geral",
          durationMins: mainDay.exercises.length * 8 + 10,
          isRest: false,
          exerciseIds: mainDay.exercises.map(e => e.exerciseId)
        };
      }
      return day;
    });

    setWeeklySchedule(updated);
    localStorage.setItem("fitplan_pro_weekly_schedule", JSON.stringify(updated));
    setEditingDay(null);
    setSearchQuery("");
  };

  const handleSetDayRest = (dayId: string) => {
    const updated = weeklySchedule.map(day => {
      if (day.dayId === dayId) {
        return {
          ...day,
          workoutTitle: "Descanso Ativo",
          focus: "Recuperação",
          durationMins: 0,
          isRest: true,
          exerciseIds: []
        };
      }
      return day;
    });

    setWeeklySchedule(updated);
    localStorage.setItem("fitplan_pro_weekly_schedule", JSON.stringify(updated));
    setEditingDay(null);
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 bg-[#0A0A0A] text-white relative pb-20 font-sans">
      
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#00FF7F] font-bold uppercase tracking-wider">ORGANIZADOR DE ROTINA</span>
          <h2 className="text-xl font-black tracking-tight uppercase">Planilha Semanal</h2>
          <p className="text-[10px] text-gray-500 mt-0.5">Sua rotina estruturada de segunda a domingo. Altere qualquer dia livremente.</p>
        </div>

        <button
          onClick={handleResetToAuto}
          className="bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 text-[9px] font-black uppercase px-2.5 py-2 rounded-xl flex items-center gap-1 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Restaurar Padrão</span>
        </button>
      </div>

      {/* Week Grid Layout */}
      <div className="space-y-3">
        {weeklySchedule.map((day) => (
          <div
            key={day.dayId}
            className={`rounded-2xl p-4 border flex items-center justify-between transition-all ${
              day.isRest
                ? "bg-[#121212]/40 border-white/5 opacity-70"
                : "bg-[#121212] border-white/5 shadow-md"
            }`}
          >
            <div className="space-y-1">
              {/* Day title & Tag */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white">{day.dayName}</span>
                {day.isRest ? (
                  <span className="bg-zinc-800 text-gray-400 text-[8px] font-black uppercase px-1.5 py-0.5 rounded">
                    DESCANSO
                  </span>
                ) : (
                  <span className="bg-[#00FF7F]/10 text-[#00FF7F] text-[8px] font-black uppercase px-1.5 py-0.5 rounded border border-[#00FF7F]/10">
                    TREINO ATIVO
                  </span>
                )}
              </div>

              {/* Workout Details */}
              <h4 className="text-sm font-extrabold text-white mt-1 leading-snug truncate max-w-[200px]">
                {day.workoutTitle}
              </h4>
              <p className="text-[10px] text-gray-500 font-bold leading-none">
                Músculos: <span className="text-gray-300 font-medium">{day.focus}</span>
                {!day.isRest && (
                  <span className="mx-2">• Dur. Est: <strong className="text-white font-extrabold">{day.durationMins} min</strong></span>
                )}
              </p>

              {day.exerciseIds && day.exerciseIds.length > 0 && (
                <div className="flex items-center gap-1.5 mt-2 overflow-x-auto py-0.5 scrollbar-none">
                  {day.exerciseIds.map((exId, exIdx) => {
                    const exObj = EXERCISE_DATABASE.find(e => e.id === exId);
                    const imgUrl = exObj ? getExerciseImageUrl(exObj.id, exObj.category) : "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&h=400&q=80";
                    const title = exObj?.name || "Exercício Desconhecido";
                    return (
                      <div key={exIdx} className="relative shrink-0 group" title={title}>
                        <img
                          src={imgUrl}
                          alt={title}
                          className="w-7 h-7 rounded-md object-cover border border-white/5 hover:border-[#00FF7F]/30 transition-all"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick edit button */}
            <button
              onClick={() => setEditingDay(day)}
              className="p-2.5 bg-black/60 hover:bg-black rounded-xl text-gray-400 hover:text-[#00FF7F] border border-white/5 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Coaching Box */}
      <div className="bg-[#121212] border border-[#00FF7F]/10 p-4 rounded-3xl relative overflow-hidden">
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-xl bg-[#00FF7F]/10 border border-[#00FF7F]/20 flex items-center justify-center text-[#00FF7F] shrink-0 font-black text-sm">
            M
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-[#00FF7F] font-black uppercase tracking-wider">COACH MAX RECOMENDA</span>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              "Para hipertrofia e definição máxima, respeite os dias de descanso! É no repouso que as fibras musculares se regeneram e crescem de verdade. Não treine o mesmo músculo em menos de 48 horas de intervalo campeão!"
            </p>
          </div>
        </div>
      </div>

      {/* Swapping / Editing Workout Day Modal Overlay */}
      {editingDay && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-end">
          <div className="bg-[#121212] rounded-t-3xl border-t border-white/10 max-h-[85%] flex flex-col overflow-hidden animate-slideUp">
            
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-[#00FF7F] font-black uppercase tracking-wider">EDITAR CRONOGRAMA</span>
                <h4 className="text-sm font-black text-white uppercase">{editingDay.dayName}</h4>
              </div>
              <button
                onClick={() => {
                  setEditingDay(null);
                  setSearchQuery("");
                }}
                className="p-1.5 bg-zinc-800 text-gray-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick rest option */}
            <div className="p-4 bg-black/30 border-b border-white/5">
              <button
                onClick={() => handleSetDayRest(editingDay.dayId)}
                className="w-full bg-zinc-900 hover:bg-zinc-850 text-gray-300 hover:text-[#00FF7F] border border-white/5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-center"
              >
                Definir como Dia de Descanso
              </button>
            </div>

            {/* Search filter presets catalog list */}
            <div className="p-4 flex flex-col space-y-3">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Ou Selecione um Treino do Nosso Catálogo</span>
              <input
                type="text"
                placeholder="Pesquisar treinos (peito, calistenia, hiit...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-[#00FF7F]/40"
              />
            </div>

            {/* Presets List scroll container */}
            <div className="flex-1 overflow-y-auto px-4 pb-12 space-y-2">
              {allPresets.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.musclesTargeted.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
                p.objective.toLowerCase().includes(searchQuery.toLowerCase())
              ).slice(0, 15).map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPresetForDay(preset)}
                  className="w-full flex items-center justify-between p-3.5 bg-black rounded-xl border border-white/5 hover:border-[#00FF7F]/20 text-left transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-black text-[#00FF7F] uppercase tracking-wider">
                      {preset.type} • {preset.objective}
                    </span>
                    <h5 className="text-xs font-extrabold text-white leading-tight">{preset.name}</h5>
                    <p className="text-[9px] text-gray-500 font-bold">
                      Músculos: <span className="text-gray-400 font-medium">{preset.musclesTargeted.join(", ")}</span>
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
