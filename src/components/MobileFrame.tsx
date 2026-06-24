/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Smartphone, Monitor, Wifi, Battery, ShieldCheck } from "lucide-react";

interface MobileFrameProps {
  children: React.ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  const [isMobileMode, setIsMobileMode] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  // Update clock in phone status bar
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, "0");
      let minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isMobileMode) {
    // Desktop Fullscreen view, with a floating switcher
    return (
      <div className="min-h-screen bg-[#0A0A0A] relative text-white">
        {children}

        {/* Floating View Switcher */}
        <div className="fixed bottom-6 right-6 bg-[#171717] border border-[#00FF7F]/20 p-2.5 rounded-2xl flex items-center gap-2 shadow-2xl z-50">
          <button
            onClick={() => setIsMobileMode(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black text-[#00FF7F] text-xs font-bold border border-[#00FF7F]/10 transition-all"
          >
            <Smartphone className="w-4 h-4" />
            <span>Ver no Simulador Mobile</span>
          </button>
          <div className="w-px h-5 bg-white/10"></div>
          <span className="text-[10px] text-gray-400 font-mono">Modo Tela Cheia</span>
        </div>
      </div>
    );
  }

  // Mobile Mockup Frame centered
  return (
    <div className="min-h-screen bg-[#070707] flex flex-col items-center justify-center p-4 md:py-8 font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00FF7F]/3 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00FF7F]/3 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Frame Selector Header */}
      <div className="mb-4 bg-white/5 border border-white/5 rounded-2xl p-1.5 flex items-center gap-1 z-10 shadow-lg">
        <button
          onClick={() => setIsMobileMode(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171717] text-[#00FF7F] text-xs font-bold shadow-md"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Device</span>
        </button>
        <button
          onClick={() => setIsMobileMode(false)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-gray-400 hover:text-white text-xs font-bold transition-all"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Tela Cheia</span>
        </button>
      </div>

      {/* Smartphone Chassis Container */}
      <div className="relative w-full max-w-[400px] h-[830px] rounded-[52px] bg-black border-[12px] border-[#1C1C1E] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),_0_0_40px_rgba(0,255,127,0.04)] flex flex-col overflow-hidden z-10 ring-4 ring-black/40">
        
        {/* Dynamic Island / Speaker */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[110px] h-[28px] bg-[#0E0E0E] rounded-2xl flex items-center justify-center z-40">
          {/* Simulated camera lens dot */}
          <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full border border-zinc-800 absolute right-4"></div>
          {/* Subtle green indicator if "active" */}
          <div className="w-1.5 h-1.5 bg-[#00FF7F] rounded-full absolute left-4 animate-pulse"></div>
        </div>

        {/* Status Bar */}
        <div className="h-10 bg-black text-white flex items-center justify-between px-7 pt-1.5 text-xs font-bold font-mono tracking-tight z-30 select-none">
          {/* Clock */}
          <span>{currentTime || "12:33"}</span>
          
          {/* Status Icons */}
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] text-white">5G</span>
            <div className="w-5 h-2.5 border border-white/40 rounded-sm p-0.5 flex items-center justify-start">
              <div className="h-full w-4 bg-[#00FF7F] rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Application Content Window */}
        <div className="flex-1 overflow-hidden relative flex flex-col bg-[#0A0A0A]">
          {children}
        </div>

        {/* Home Indicator Bottom Line */}
        <div className="h-5 bg-black flex items-center justify-center z-30 select-none pb-1">
          <div className="w-32 h-1 bg-white/40 rounded-full"></div>
        </div>
      </div>

      {/* Device Specifications Footnote */}
      <div className="mt-4 text-[11px] text-gray-500 font-medium tracking-wide flex items-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5 text-[#00FF7F]" />
        <span>Simulador FitPlan Pro • Visualizador Mobile Ativo</span>
      </div>
    </div>
  );
}
