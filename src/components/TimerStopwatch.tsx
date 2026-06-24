/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Timer, Play, Pause, RotateCcw, Volume2, ShieldCheck, Zap, Layers, BellRing } from "lucide-react";

export default function TimerStopwatch() {
  const [activeTab, setActiveTab] = useState<"timer" | "stopwatch">("timer");

  // --- TIMER (Countdown) STATES ---
  const [timerPreset, setTimerPreset] = useState(60); // Default 60 seconds
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- STOPWATCH STATES ---
  const [stopwatchMs, setStopwatchMs] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<string[]>([]);
  const stopwatchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Synthesizer Web Audio API Alarm
  const playAlarmSound = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      const audioCtx = new AudioCtxClass();
      
      const playBeep = (timeOffset: number, frequency: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime + timeOffset);
        
        gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime + timeOffset);
        gainNode.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + timeOffset + duration);
        
        osc.start(audioCtx.currentTime + timeOffset);
        osc.stop(audioCtx.currentTime + timeOffset + duration);
      };

      // Play double retro-synth workout chime
      playBeep(0, 660, 0.15);
      playBeep(0.2, 660, 0.15);
      playBeep(0.4, 980, 0.35);
    } catch (e) {
      console.warn("Could not play alarm sound: browser interaction restrictions.", e);
    }
  };

  // --- TIMER LOGIC ---
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            playAlarmSound();
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return timerPreset; // Reset to preset
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, timerPreset]);

  // Handle setting a custom preset
  const handleSetTimerPreset = (secs: number) => {
    setIsTimerRunning(false);
    setTimerPreset(secs);
    setTimerSecondsLeft(secs);
  };

  const handleAdjustPreset = (amount: number) => {
    setIsTimerRunning(false);
    const newVal = Math.max(5, timerPreset + amount);
    setTimerPreset(newVal);
    setTimerSecondsLeft(newVal);
  };

  const formatTimerTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // --- STOPWATCH LOGIC ---
  useEffect(() => {
    if (isStopwatchRunning) {
      const startTime = Date.now() - stopwatchMs;
      stopwatchIntervalRef.current = setInterval(() => {
        setStopwatchMs(Date.now() - startTime);
      }, 10);
    } else {
      if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current);
    }

    return () => {
      if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current);
    };
  }, [isStopwatchRunning]);

  const formatStopwatch = (msTotal: number) => {
    const minutes = Math.floor(msTotal / 60000);
    const seconds = Math.floor((msTotal % 60000) / 1000);
    const centiseconds = Math.floor((msTotal % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const handleAddLap = () => {
    const formatted = formatStopwatch(stopwatchMs);
    setLaps([formatted, ...laps]);
  };

  const handleResetStopwatch = () => {
    setIsStopwatchRunning(false);
    setStopwatchMs(0);
    setLaps([]);
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 bg-[#0A0A0A] text-white relative pb-20">
      
      {/* Tab Selectors */}
      <div className="bg-[#121212] p-1.5 rounded-2xl flex border border-white/5">
        <button
          onClick={() => setActiveTab("timer")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            activeTab === "timer"
              ? "bg-black text-[#00FF7F] border border-[#00FF7F]/10"
              : "text-gray-400"
          }`}
        >
          <Timer className="w-4 h-4" />
          <span>Timer de Descanso</span>
        </button>
        <button
          onClick={() => setActiveTab("stopwatch")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            activeTab === "stopwatch"
              ? "bg-black text-[#00FF7F] border border-[#00FF7F]/10"
              : "text-gray-400"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Cronômetro</span>
        </button>
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeTab === "timer" ? (
        // TIMER TAB
        <div className="space-y-6 animate-fadeIn">
          
          {/* Main Visual Clock */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-56 h-56 rounded-full bg-[#121212] border-[3px] border-white/5 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,255,127,0.02)]">
              {/* Dynamic visual loader border ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="112"
                  cy="112"
                  r="106"
                  stroke="#00FF7F"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={666}
                  strokeDashoffset={666 - (666 * timerSecondsLeft) / timerPreset}
                  className="transition-all duration-1000 ease-linear"
                  strokeLinecap="round"
                />
              </svg>

              {/* Central text */}
              <span className="text-4xl font-black font-mono tracking-tighter text-white">
                {formatTimerTime(timerSecondsLeft)}
              </span>
              <span className="text-[10px] text-[#00FF7F] font-black uppercase tracking-widest mt-1">
                {isTimerRunning ? "SÉRIE CONCLUÍDA" : "DESCANSO CONGELADO"}
              </span>
            </div>
          </div>

          {/* Core Controls */}
          <div className="flex justify-center items-center gap-4">
            {/* Minus 10s */}
            <button
              onClick={() => handleAdjustPreset(-10)}
              className="w-12 h-12 rounded-2xl bg-[#121212] border border-white/5 text-gray-400 hover:text-white font-bold text-sm flex items-center justify-center transition-colors"
            >
              -10s
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`w-18 h-18 rounded-full flex items-center justify-center transition-all ${
                isTimerRunning
                  ? "bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "bg-[#00FF7F] hover:bg-[#00E572] text-black shadow-[0_0_20px_rgba(0,255,127,0.2)]"
              }`}
            >
              {isTimerRunning ? <Pause className="w-8 h-8 fill-black" /> : <Play className="w-8 h-8 fill-black ml-1" />}
            </button>

            {/* Plus 10s */}
            <button
              onClick={() => handleAdjustPreset(10)}
              className="w-12 h-12 rounded-2xl bg-[#121212] border border-white/5 text-gray-400 hover:text-white font-bold text-sm flex items-center justify-center transition-colors"
            >
              +10s
            </button>
          </div>

          {/* Quick presets buttons */}
          <div className="space-y-2">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block text-center mb-1">
              Atalhos de Descanso Rápido
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[30, 45, 60, 90, 120, 180].map((secs) => (
                <button
                  key={secs}
                  onClick={() => handleSetTimerPreset(secs)}
                  className={`py-2.5 rounded-xl border font-bold text-xs transition-all ${
                    timerPreset === secs
                      ? "bg-[#00FF7F]/10 border-[#00FF7F]/40 text-[#00FF7F]"
                      : "bg-[#121212] border-white/5 text-gray-400"
                  }`}
                >
                  {secs < 60 ? `${secs}s` : `${secs / 60} min`}
                </button>
              ))}
            </div>
          </div>

          {/* Alarm Demo sound check */}
          <button
            onClick={playAlarmSound}
            className="w-full bg-white/5 hover:bg-white/10 text-xs font-bold py-3 rounded-2xl flex items-center justify-center gap-2 border border-white/5 transition-colors"
          >
            <BellRing className="w-4 h-4 text-[#00FF7F]" />
            <span>Testar Alarme Sonoro do App</span>
          </button>
        </div>
      ) : (
        // STOPWATCH TAB
        <div className="space-y-6 animate-fadeIn">
          
          {/* Main stopwatch display */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-5xl font-black font-mono tracking-tighter text-white tabular-nums">
              {formatStopwatch(stopwatchMs)}
            </div>
            <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest mt-2">
              {isStopwatchRunning ? "CRONÔMETRO ATIVO" : "TEMPO PAUSADO"}
            </span>
          </div>

          {/* Action buttons controls */}
          <div className="grid grid-cols-3 gap-3">
            {/* Split lap button */}
            <button
              onClick={handleAddLap}
              disabled={!isStopwatchRunning}
              className="py-3 bg-[#121212] disabled:opacity-40 border border-white/5 rounded-2xl text-xs font-bold text-gray-300 flex items-center justify-center gap-1 hover:border-white/20 transition-all"
            >
              <Layers className="w-4 h-4" />
              <span>Lap</span>
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
              className={`py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-1 transition-all ${
                isStopwatchRunning
                  ? "bg-amber-500 hover:bg-amber-400 text-black"
                  : "bg-[#00FF7F] hover:bg-[#00E572] text-black"
              }`}
            >
              {isStopwatchRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-black" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black" />
                  <span>Iniciar</span>
                </>
              )}
            </button>

            {/* Reset */}
            <button
              onClick={handleResetStopwatch}
              className="py-3 bg-[#121212] border border-white/5 rounded-2xl text-xs font-bold text-gray-300 flex items-center justify-center gap-1 hover:border-white/20 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Zerar</span>
            </button>
          </div>

          {/* Laps split listing panel */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Laps / Tempos Intermediários</h4>
            
            {laps.length === 0 ? (
              <div className="text-center py-8 bg-[#121212] rounded-2xl border border-dashed border-white/5">
                <p className="text-gray-500 text-xs">Nenhum lap registrado neste treino.</p>
              </div>
            ) : (
              <div className="bg-[#121212] border border-white/5 rounded-2xl divide-y divide-white/5 max-h-[180px] overflow-y-auto">
                {laps.map((lap, idx) => (
                  <div key={idx} className="p-3 flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-bold">Volta {laps.length - idx}</span>
                    <span className="font-mono font-black text-white">{lap}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
