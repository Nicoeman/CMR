/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { X, Play, Check, ChevronRight, ArrowRight, Timer, PlayCircle, Award, Volume2, Info } from "lucide-react";
import { PresetSpreadsheet } from "../data/spreadsheets";
import { EXERCISE_DATABASE } from "../data/exercises";
import { getExerciseImageUrl } from "../utils/exerciseImages";

interface ActiveWorkoutSessionProps {
  activeSpreadsheet: PresetSpreadsheet | null;
  onCompleteWorkout: (workoutName: string, durationMin: number, exercisesCount: number) => void;
  onClose: () => void;
}

export default function ActiveWorkoutSession({
  activeSpreadsheet,
  onCompleteWorkout,
  onClose
}: ActiveWorkoutSessionProps) {
  // Determine active workout day
  const defaultWorkoutDayName = "Treino Geral";
  
  const currentDay = activeSpreadsheet?.days[0] || {
    dayName: "Treino Rápido Fullbody",
    exercises: [
      { exerciseId: "peito-9", sets: 3, reps: "12-15", restSecs: 60 },
      { exerciseId: "calistenia-11", sets: 3, reps: "10-12", restSecs: 60 },
      { exerciseId: "pernas-9", sets: 3, reps: "20 passos", restSecs: 60 },
      { exerciseId: "abdomen-1", sets: 3, reps: "15-20", restSecs: 45 }
    ]
  };

  // Keep track of checked sets: { [exerciseId_setIndex]: boolean }
  const [checkedSets, setCheckedSets] = useState<{ [key: string]: boolean }>({});
  
  // Rest Timer states
  const [restSeconds, setRestSeconds] = useState(60);
  const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);
  const [activeRestPreset, setActiveRestPreset] = useState(60);
  const restTimerRef = useRef<NodeJS.Timeout | null>(null);

  // General duration stopwatch
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  
  useEffect(() => {
    const mainTimer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(mainTimer);
  }, []);

  // Countdown timer for rests
  useEffect(() => {
    if (isRestTimerRunning) {
      restTimerRef.current = setInterval(() => {
        setRestSeconds((prev) => {
          if (prev <= 1) {
            setIsRestTimerRunning(false);
            playBeepAlarm();
            if (restTimerRef.current) clearInterval(restTimerRef.current);
            return activeRestPreset;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    }

    return () => {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    };
  }, [isRestTimerRunning, activeRestPreset]);

  // Clean play beep chimer
  const playBeepAlarm = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  };

  const handleToggleSet = (exerciseId: string, setIndex: number, restDuration: number) => {
    const key = `${exerciseId}_${setIndex}`;
    const newState = !checkedSets[key];
    
    setCheckedSets({
      ...checkedSets,
      [key]: newState
    });

    // If checked -> initiate rest timer!
    if (newState) {
      setRestSeconds(restDuration);
      setActiveRestPreset(restDuration);
      setIsRestTimerRunning(true);
    }
  };

  const handleFinishWorkout = () => {
    const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
    onCompleteWorkout(
      currentDay.dayName,
      durationMinutes,
      currentDay.exercises.length
    );
  };

  const formatElapsedTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="absolute inset-0 bg-[#0A0A0A] text-white flex flex-col z-40 animate-slideUp">
      
      {/* Session Top bar */}
      <div className="px-5 py-4 bg-[#121212] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider">{currentDay.dayName}</h3>
            <span className="text-[10px] text-gray-500 font-mono">Duração: {formatElapsedTime(elapsedSeconds)}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 bg-black/40 border border-white/5 rounded-xl text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Embedded Rest Timer Floating Banner */}
      {isRestTimerRunning && (
        <div className="bg-[#00FF7F] text-black px-4 py-3 flex items-center justify-between font-black shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-black animate-spin" />
            <span className="text-xs uppercase tracking-wider">RESTA DE DESCANSO ATIVA</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-base tracking-tight">{restSeconds}s</span>
            <button
              onClick={() => setIsRestTimerRunning(false)}
              className="text-[10px] bg-black text-[#00FF7F] px-2.5 py-1 rounded-lg uppercase"
            >
              Pular
            </button>
          </div>
        </div>
      )}

      {/* Exercises workflow list */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 pb-24">
        <p className="text-[10px] text-gray-500 leading-snug">
          Execute cada exercício e marque os conjuntos conforme os conclui. Ativa o cronômetro de descanso automaticamente!
        </p>

        {currentDay.exercises.map((item, idx) => {
          const exInfo = EXERCISE_DATABASE.find(e => e.id === item.exerciseId);
          // Instead of returning null, we render a generic fallback
          const name = exInfo?.name || "Exercício Desconhecido";
          const category = exInfo?.category || "Geral";
          const target = exInfo?.primaryMuscles?.[0] || "Corpo Todo";
          const imageUrl = exInfo ? getExerciseImageUrl(exInfo.id, exInfo.category) : "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&h=400&q=80";

          return (
            <div key={idx} className="bg-[#121212] border border-white/5 rounded-3xl p-4.5 space-y-3">
              
              {/* Exercise Header info */}
              <div className="flex gap-3.5 items-start">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 relative bg-zinc-950 shrink-0">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[8px] text-[#00FF7F] font-black uppercase tracking-wider bg-[#00FF7F]/10 px-2 py-0.5 rounded">
                    {category}
                  </span>
                  <h4 className="text-sm font-black text-white mt-1 leading-tight line-clamp-1">{name}</h4>
                  <p className="text-[9px] text-gray-500 font-medium mt-0.5 line-clamp-1">Alvo: {target}</p>
                </div>
                
                <span className="text-[10px] text-gray-400 font-bold bg-black/40 px-2.5 py-1 rounded-lg shrink-0">
                  {item.sets}x {item.reps}
                </span>
              </div>

              {/* Interactive sets checkpoints */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/5">
                {Array.from({ length: item.sets }).map((_, setIdx) => {
                  const setKey = `${item.exerciseId}_${setIdx}`;
                  const isChecked = checkedSets[setKey];

                  return (
                    <button
                      key={setIdx}
                      onClick={() => handleToggleSet(item.exerciseId, setIdx, item.restSecs)}
                      className={`py-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        isChecked
                          ? "bg-[#00FF7F]/10 border-[#00FF7F]/40 text-[#00FF7F] font-extrabold"
                          : "bg-black/40 border-white/5 text-gray-500 hover:border-white/10"
                      }`}
                    >
                      <span className="text-[9px] font-bold">SET {setIdx + 1}</span>
                      <div className="mt-1">
                        {isChecked ? (
                          <Check className="w-3.5 h-3.5 text-[#00FF7F] bg-[#00FF7F]/10 rounded-full p-0.5" />
                        ) : (
                          <span className="text-[8px] font-mono font-medium text-gray-600">{item.reps}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action complete footer bar */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/95 to-transparent border-t border-white/5">
        <button
          onClick={handleFinishWorkout}
          className="w-full bg-[#00FF7F] hover:bg-[#00E572] text-black font-extrabold text-sm py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,255,127,0.2)] transform active:scale-98 transition-all"
        >
          <Award className="w-4 h-4 fill-black" />
          <span>Finalizar e Salvar Treino</span>
        </button>
      </div>
    </div>
  );
}
