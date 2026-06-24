/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Calculator, Scale, Flame, Dumbbell, Apple, Info, ShieldCheck } from "lucide-react";

type CalcTab = "imc" | "calories" | "onerm";

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<CalcTab>("imc");

  // --- IMC (BMI) STATE & LOGIC ---
  const [imcWeight, setImcWeight] = useState("75");
  const [imcHeight, setImcHeight] = useState("175");
  const [imcResult, setImcResult] = useState<number | null>(24.5);
  const [imcClass, setImcClass] = useState("Peso Normal");

  const calculateIMC = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(imcWeight);
    const h = parseFloat(imcHeight) / 100; // cm to m
    if (!w || !h) return;

    const score = w / (h * h);
    const rounded = Math.round(score * 10) / 10;
    setImcResult(rounded);

    let classification = "Peso Normal";
    if (rounded < 18.5) classification = "Abaixo do Peso";
    else if (rounded >= 18.5 && rounded < 25) classification = "Peso Normal";
    else if (rounded >= 25 && rounded < 30) classification = "Sobrepeso";
    else classification = "Obesidade";

    setImcClass(classification);
  };

  // --- CALORIES & MACROS STATE & LOGIC ---
  const [gender, setGender] = useState<"M" | "F">("M");
  const [calWeight, setCalWeight] = useState("75");
  const [calHeight, setCalHeight] = useState("175");
  const [calAge, setCalAge] = useState("25");
  const [activityLevel, setActivityLevel] = useState("1.55"); // Moderate Activity factor
  const [goal, setGoal] = useState<"emagrecer" | "manter" | "ganhar">("ganhar");

  const [tdee, setTdee] = useState<number | null>(2700);
  const [bmr, setBmr] = useState<number | null>(1750);
  const [macros, setMacros] = useState<{ protein: number; carbs: number; fat: number } | null>({
    protein: 150,
    carbs: 350,
    fat: 75
  });

  const calculateCaloriesAndMacros = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(calWeight);
    const h = parseFloat(calHeight);
    const a = parseFloat(calAge);
    const act = parseFloat(activityLevel);

    if (!w || !h || !a) return;

    // BMR using Mifflin-St Jeor Equation
    let bmrScore = 10 * w + 6.25 * h - 5 * a;
    if (gender === "M") bmrScore += 5;
    else bmrScore -= 161;

    const calculatedBmr = Math.round(bmrScore);
    setBmr(calculatedBmr);

    // TDEE (Daily Calories)
    let calculatedTdee = Math.round(bmrScore * act);
    
    // Adjust based on goal
    let targetCalories = calculatedTdee;
    if (goal === "emagrecer") targetCalories -= 450;
    else if (goal === "ganhar") targetCalories += 400;

    setTdee(targetCalories);

    // Macros Calculation (E.g. Protein 2g/kg, Fat 1g/kg, rest is carbs)
    let pGrams = Math.round(2.0 * w); // Protein
    let fGrams = Math.round(1.0 * w); // Fat
    
    // Remaining calories for carbs (Protein = 4kcal/g, Fat = 9kcal/g, Carb = 4kcal/g)
    const currentKcal = pGrams * 4 + fGrams * 9;
    let cGrams = Math.max(50, Math.round((targetCalories - currentKcal) / 4));

    // Simple constraints if goal is extreme
    if (goal === "emagrecer") {
      pGrams = Math.round(2.2 * w); // Higher protein to preserve mass
      fGrams = Math.round(0.8 * w);
      cGrams = Math.max(50, Math.round((targetCalories - (pGrams * 4 + fGrams * 9)) / 4));
    }

    setMacros({
      protein: pGrams,
      carbs: cGrams,
      fat: fGrams
    });
  };

  // --- 1RM (MAX LOAD) STATE & LOGIC ---
  const [liftWeight, setLiftWeight] = useState("80");
  const [liftReps, setLiftReps] = useState("6");
  const [oneRm, setOneRm] = useState<number | null>(96);

  const calculateOneRM = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(liftWeight);
    const r = parseInt(liftReps);

    if (!w || !r) return;

    // Epley Formula: 1RM = w * (1 + r/30)
    let estimatedMax = w;
    if (r > 1) {
      estimatedMax = w * (1 + r / 30);
    }
    
    setOneRm(Math.round(estimatedMax));
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 bg-[#0A0A0A] text-white relative pb-20 font-sans">
      
      {/* Category header tabs */}
      <div className="bg-[#121212] p-1 rounded-2xl flex border border-white/5 shrink-0">
        <button
          onClick={() => setActiveTab("imc")}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
            activeTab === "imc" ? "bg-black text-[#00FF7F]" : "text-gray-400"
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>IMC</span>
        </button>
        <button
          onClick={() => setActiveTab("calories")}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
            activeTab === "calories" ? "bg-black text-[#00FF7F]" : "text-gray-400"
          }`}
        >
          <Apple className="w-3.5 h-3.5" />
          <span>Calorias & Macros</span>
        </button>
        <button
          onClick={() => setActiveTab("onerm")}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
            activeTab === "onerm" ? "bg-black text-[#00FF7F]" : "text-gray-400"
          }`}
        >
          <Dumbbell className="w-3.5 h-3.5" />
          <span>1RM (Max)</span>
        </button>
      </div>

      {/* TAB 1: IMC (BMI) CALCULATOR */}
      {activeTab === "imc" && (
        <div className="space-y-5 animate-fadeIn">
          
          <div className="bg-[#121212] border border-white/5 p-5 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#00FF7F]" />
              <span>Calculadora de Índice de Massa Corporal</span>
            </h3>

            <form onSubmit={calculateIMC} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Seu Peso (Kg)</label>
                  <input
                    type="number"
                    value={imcWeight}
                    onChange={(e) => setImcWeight(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#00FF7F]/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Sua Altura (cm)</label>
                  <input
                    type="number"
                    value={imcHeight}
                    onChange={(e) => setImcHeight(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#00FF7F]/40"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#00FF7F] hover:bg-[#00E572] text-black font-extrabold text-xs py-3 rounded-xl transition-all"
              >
                Calcular IMC Corporal
              </button>
            </form>
          </div>

          {/* IMC Result Display */}
          {imcResult !== null && (
            <div className="bg-[#121212] border border-[#00FF7F]/20 rounded-3xl p-5 text-center space-y-3">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Resultado do Seu IMC</span>
              <div className="text-4xl font-black text-[#00FF7F] font-mono tracking-tighter">
                {imcResult}
              </div>
              
              <div className="inline-block px-4 py-1.5 rounded-full bg-black text-xs font-extrabold border border-white/5 uppercase">
                Classificação: <span className="text-white">{imcClass}</span>
              </div>

              {/* Graphical Scale indication */}
              <div className="pt-2">
                <div className="w-full h-2.5 bg-zinc-900 rounded-full flex overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "25%" }} title="Abaixo do peso"></div>
                  <div className="h-full bg-[#00FF7F]" style={{ width: "25%" }} title="Normal"></div>
                  <div className="h-full bg-amber-500" style={{ width: "25%" }} title="Sobrepeso"></div>
                  <div className="h-full bg-red-500" style={{ width: "25%" }} title="Obesidade"></div>
                </div>
                
                {/* Pointer marker */}
                <div className="flex justify-between text-[8px] text-gray-500 mt-1 uppercase font-bold px-1">
                  <span>Abaixo</span>
                  <span>Normal</span>
                  <span>Sobrepeso</span>
                  <span>Obeso</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DAILY CALORIES & MACRONUTRIENTS */}
      {activeTab === "calories" && (
        <div className="space-y-5 animate-fadeIn">
          
          <div className="bg-[#121212] border border-white/5 p-5 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#00FF7F]" />
              <span>Gasto Calórico e Macros Recomendados</span>
            </h3>

            <form onSubmit={calculateCaloriesAndMacros} className="space-y-4">
              {/* Gender toggle selector */}
              <div>
                <span className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Gênero</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender("M")}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                      gender === "M" ? "bg-[#00FF7F]/10 border-[#00FF7F]/40 text-[#00FF7F]" : "bg-black/30 border-white/5 text-gray-400"
                    }`}
                  >
                    Masculino
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("F")}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                      gender === "F" ? "bg-[#00FF7F]/10 border-[#00FF7F]/40 text-[#00FF7F]" : "bg-black/30 border-white/5 text-gray-400"
                    }`}
                  >
                    Feminino
                  </button>
                </div>
              </div>

              {/* Weight, Height, Age */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Peso (kg)</label>
                  <input
                    type="number"
                    value={calWeight}
                    onChange={(e) => setCalWeight(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-2 py-2 text-xs text-white text-center"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Alt (cm)</label>
                  <input
                    type="number"
                    value={calHeight}
                    onChange={(e) => setCalHeight(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-2 py-2 text-xs text-white text-center"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Idade</label>
                  <input
                    type="number"
                    value={calAge}
                    onChange={(e) => setCalAge(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-2 py-2 text-xs text-white text-center"
                    required
                  />
                </div>
              </div>

              {/* Activity Level and Fitness Goal */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Nível de Atividade</label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white"
                  >
                    <option value="1.2">Sedentário</option>
                    <option value="1.375">Levemente Ativo</option>
                    <option value="1.55">Moderadamente Ativo</option>
                    <option value="1.725">Altamente Ativo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Seu Objetivo</label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value as any)}
                    className="w-full bg-black border border-white/10 rounded-xl px-2.5 py-2 text-xs text-[#00FF7F]"
                  >
                    <option value="emagrecer">Secar (Emagrecer)</option>
                    <option value="manter">Manter o Peso</option>
                    <option value="ganhar">Crescer (Hipertrofia)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#00FF7F] hover:bg-[#00E572] text-black font-extrabold text-xs py-3 rounded-xl transition-all"
              >
                Calcular Metabolismo & Macros
              </button>
            </form>
          </div>

          {/* Results Area calories */}
          {tdee !== null && macros !== null && (
            <div className="bg-[#121212] border border-white/5 rounded-3xl p-5 space-y-4">
              <div className="text-center">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest block">Meta Calórica Diária Alvo</span>
                <span className="text-3xl font-black text-[#00FF7F] font-mono tracking-tighter block mt-1">{tdee} Kcal</span>
                <span className="text-[9px] text-gray-400 mt-1 block">Metabolismo Basal (BMR): {bmr} Kcal/dia</span>
              </div>

              {/* Progress Macros display */}
              <div className="space-y-3 pt-2 border-t border-white/5">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Divisão Sugerida de Macronutrientes</span>
                
                {/* Protein */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Proteína (Reconstrução)</span>
                    <span className="text-white">{macros.protein}g</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00FF7F] rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>

                {/* Carbs */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Carboidratos (Energia)</span>
                    <span className="text-white">{macros.carbs}g</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "50%" }}></div>
                  </div>
                </div>

                {/* Fat */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Gorduras (Hormonal)</span>
                    <span className="text-white">{macros.fat}g</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: "30%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: 1RM (MAX LOAD ESTIMATOR) */}
      {activeTab === "onerm" && (
        <div className="space-y-5 animate-fadeIn">
          
          <div className="bg-[#121212] border border-white/5 p-5 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#00FF7F]" />
              <span>Calculadora de Carga Máxima (1RM)</span>
            </h3>

            <form onSubmit={calculateOneRM} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Peso Levantado (Kg)</label>
                  <input
                    type="number"
                    value={liftWeight}
                    onChange={(e) => setLiftWeight(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Repetições (Max 10)</label>
                  <input
                    type="number"
                    value={liftReps}
                    onChange={(e) => setLiftReps(e.target.value)}
                    min={1}
                    max={12}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#00FF7F] hover:bg-[#00E572] text-black font-extrabold text-xs py-3 rounded-xl transition-all"
              >
                Estimar Minha Carga Máxima (1RM)
              </button>
            </form>
          </div>

          {/* 1RM Output & Scales */}
          {oneRm !== null && (
            <div className="bg-[#121212] border border-[#00FF7F]/20 rounded-3xl p-5 space-y-4">
              <div className="text-center">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest block">Sua 1RM Estimada</span>
                <span className="text-3xl font-black text-[#00FF7F] font-mono tracking-tighter block mt-1">{oneRm} kg</span>
                <span className="text-[9px] text-gray-400 mt-1 block">A maior carga que você consegue erguer para uma única repetição.</span>
              </div>

              {/* Percent scale guidelines */}
              <div className="pt-2 border-t border-white/5 space-y-2">
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Escala de Treinamento (% de 1RM)</span>
                
                <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400">
                  <div className="bg-black/40 p-2 rounded-xl flex justify-between">
                    <span>95% (Força Pura)</span>
                    <strong className="text-white">{Math.round(oneRm * 0.95)} kg</strong>
                  </div>
                  <div className="bg-black/40 p-2 rounded-xl flex justify-between">
                    <span>90% (Força/Potência)</span>
                    <strong className="text-white">{Math.round(oneRm * 0.9)} kg</strong>
                  </div>
                  <div className="bg-black/40 p-2 rounded-xl flex justify-between">
                    <span>85% (Hipertrofia Baixa)</span>
                    <strong className="text-[#00FF7F]">{Math.round(oneRm * 0.85)} kg</strong>
                  </div>
                  <div className="bg-black/40 p-2 rounded-xl flex justify-between">
                    <span>80% (Hipertrofia Clássica)</span>
                    <strong className="text-[#00FF7F]">{Math.round(oneRm * 0.80)} kg</strong>
                  </div>
                  <div className="bg-black/40 p-2 rounded-xl flex justify-between">
                    <span>75% (Hipertrofia Alta)</span>
                    <strong className="text-[#00FF7F]">{Math.round(oneRm * 0.75)} kg</strong>
                  </div>
                  <div className="bg-black/40 p-2 rounded-xl flex justify-between">
                    <span>70% (Resistência)</span>
                    <strong className="text-white">{Math.round(oneRm * 0.70)} kg</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
