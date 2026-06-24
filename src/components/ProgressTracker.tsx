/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Award, Plus, Calendar, Dumbbell, Ruler, TrendingUp, Check, Scale, Eye, HelpCircle } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";

interface WeightRecord {
  date: string;
  weight: number;
}

interface MeasurementsRecord {
  date: string;
  peito: number;
  cintura: number;
  braco: number;
  coxa: number;
  panturrilha: number;
}

interface LoadRecord {
  date: string;
  loadKg: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export default function ProgressTracker() {
  const [activeTab, setActiveTab] = useState<"weight" | "loads" | "achievements">("weight");

  // --- MOCK PERSISTED DATA STATES ---
  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>([
    { date: "01/05", weight: 82.5 },
    { date: "08/05", weight: 81.9 },
    { date: "15/05", weight: 81.2 },
    { date: "22/05", weight: 80.8 },
    { date: "29/05", weight: 80.1 },
    { date: "05/06", weight: 79.5 },
    { date: "12/06", weight: 79.0 }
  ]);

  const [measurementsHistory, setMeasurementsHistory] = useState<MeasurementsRecord[]>([
    { date: "01/05", peito: 102, cintura: 88, braco: 37, coxa: 58, panturrilha: 38 },
    { date: "12/06", peito: 104, cintura: 84, braco: 38, coxa: 59, panturrilha: 38.5 }
  ]);

  // Load progression history for select exercises
  const [selectedLoadExercise, setSelectedLoadExercise] = useState("Supino Reto");
  const [loadHistoryMap, setLoadHistoryMap] = useState<{ [exercise: string]: LoadRecord[] }>({
    "Supino Reto": [
      { date: "01/05", loadKg: 60 },
      { date: "15/05", loadKg: 65 },
      { date: "29/05", loadKg: 70 },
      { date: "12/06", loadKg: 76 }
    ],
    "Agachamento Livre": [
      { date: "01/05", loadKg: 80 },
      { date: "15/05", loadKg: 85 },
      { date: "29/05", loadKg: 95 },
      { date: "12/06", loadKg: 105 }
    ],
    "Levantamento Terra": [
      { date: "01/05", loadKg: 90 },
      { date: "15/05", loadKg: 100 },
      { date: "29/05", loadKg: 110 },
      { date: "12/06", loadKg: 125 }
    ]
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "ach-1", title: "Primeira Semana Concluída", description: "Concluiu todos os treinos planejados na primeira semana.", icon: "🔥", unlocked: true, unlockedDate: "10/05/2026" },
    { id: "ach-2", title: "1 Mês de Treino Firme", description: "Manteve a consistência por 30 dias ininterruptos.", icon: "💪", unlocked: true, unlockedDate: "01/06/2026" },
    { id: "ach-3", title: "Carga Dobrada", description: "Dobrou a carga em relação ao peso inicial de supino/agachamento.", icon: "⚡", unlocked: false },
    { id: "ach-4", title: "Mestre da Calistenia", description: "Concluiu todas as variações de barra fixa e paralela da biblioteca.", icon: "🤸", unlocked: false },
    { id: "ach-5", title: "Disciplina de Aço", description: "Completou 5 treinos em uma única semana planejada.", icon: "🏅", unlocked: true, unlockedDate: "15/06/2026" },
    { id: "ach-6", title: "Foco no Alvo", description: "Registrou medidas corporais e pesos por 5 semanas seguidas.", icon: "🎯", unlocked: false }
  ]);

  // --- LOGGING INPUT STATES ---
  const [newWeight, setNewWeight] = useState("");
  const [newLoadKg, setNewLoadKg] = useState("");

  // Body measurements input states
  const [newPeito, setNewPeito] = useState("");
  const [newCintura, setNewCintura] = useState("");
  const [newBraco, setNewBraco] = useState("");
  const [newCoxa, setNewCoxa] = useState("");
  const [newPanturrilha, setNewPanturrilha] = useState("");

  // Handle logging new weight
  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newWeight);
    if (!val || isNaN(val)) return;

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}`;
    
    setWeightHistory([...weightHistory, { date: formattedDate, weight: val }]);
    setNewWeight("");
  };

  // Handle logging new load progression
  const handleAddLoad = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newLoadKg);
    if (!val || isNaN(val)) return;

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}`;

    const currentHistory = loadHistoryMap[selectedLoadExercise] || [];
    const updatedHistory = [...currentHistory, { date: formattedDate, loadKg: val }];

    setLoadHistoryMap({
      ...loadHistoryMap,
      [selectedLoadExercise]: updatedHistory
    });
    setNewLoadKg("");

    // Trigger achievement check if load is high!
    if (val >= 100) {
      setAchievements(prev => prev.map(ach => {
        if (ach.id === "ach-3") {
          return { ...ach, unlocked: true, unlockedDate: formattedDate };
        }
        return ach;
      }));
    }
  };

  // Handle logging new measurements
  const handleAddMeasurements = (e: React.FormEvent) => {
    e.preventDefault();
    const peitoVal = parseFloat(newPeito) || 0;
    const cinturaVal = parseFloat(newCintura) || 0;
    const bracoVal = parseFloat(newBraco) || 0;
    const coxaVal = parseFloat(newCoxa) || 0;
    const panturrilhaVal = parseFloat(newPanturrilha) || 0;

    if (!peitoVal && !cinturaVal && !bracoVal && !coxaVal && !panturrilhaVal) return;

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}`;

    setMeasurementsHistory([
      ...measurementsHistory,
      {
        date: formattedDate,
        peito: peitoVal || (measurementsHistory[measurementsHistory.length - 1]?.peito || 0),
        cintura: cinturaVal || (measurementsHistory[measurementsHistory.length - 1]?.cintura || 0),
        braco: bracoVal || (measurementsHistory[measurementsHistory.length - 1]?.braco || 0),
        coxa: coxaVal || (measurementsHistory[measurementsHistory.length - 1]?.coxa || 0),
        panturrilha: panturrilhaVal || (measurementsHistory[measurementsHistory.length - 1]?.panturrilha || 0)
      }
    ]);

    // Clear inputs
    setNewPeito("");
    setNewCintura("");
    setNewBraco("");
    setNewCoxa("");
    setNewPanturrilha("");
  };

  const currentMeasurements = measurementsHistory[measurementsHistory.length - 1] || {
    peito: 0, cintura: 0, braco: 0, coxa: 0, panturrilha: 0
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 bg-[#0A0A0A] text-white relative pb-20 font-sans">
      
      {/* Tab select header */}
      <div className="bg-[#121212] p-1 rounded-2xl flex border border-white/5 shrink-0">
        <button
          onClick={() => setActiveTab("weight")}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
            activeTab === "weight" ? "bg-black text-[#00FF7F]" : "text-gray-400"
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Corporal</span>
        </button>
        <button
          onClick={() => setActiveTab("loads")}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
            activeTab === "loads" ? "bg-black text-[#00FF7F]" : "text-gray-400"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Cargas</span>
        </button>
        <button
          onClick={() => setActiveTab("achievements")}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
            activeTab === "achievements" ? "bg-black text-[#00FF7F]" : "text-gray-400"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Conquistas</span>
        </button>
      </div>

      {/* TAB 1: BODYWEIGHT & MEASUREMENTS */}
      {activeTab === "weight" && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Chart Card */}
          <div className="bg-[#121212] border border-white/5 p-4 rounded-3xl space-y-3 shadow-xl">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Evolução do Peso Corporal</h3>
            
            {/* Recharts Area Chart */}
            <div className="w-full h-44 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weightHistory} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FF7F" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#00FF7F" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="date" stroke="#666" fontSize={9} />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#666" fontSize={9} />
                  <Tooltip contentStyle={{ backgroundColor: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "10px" }} />
                  <Area type="monotone" dataKey="weight" name="Peso (Kg)" stroke="#00FF7F" strokeWidth={2.5} fillOpacity={1} fill="url(#colorWeight)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* New weight logger */}
          <div className="bg-[#121212] border border-white/5 p-4 rounded-2xl">
            <form onSubmit={handleAddWeight} className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Novo Peso Corporal (Kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder="Ex: 78.5"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 outline-none focus:border-[#00FF7F]/40"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#00FF7F] hover:bg-[#00E572] text-black font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Salvar</span>
              </button>
            </form>
          </div>

          {/* Measurements highlight list */}
          <div className="bg-[#121212] border border-white/5 p-4 rounded-3xl space-y-4">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-[#00FF7F]" />
              <span>Últimas Medidas Corporais (cm)</span>
            </h4>

            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[8px] text-gray-500 font-bold uppercase block">Peito</span>
                <span className="text-xs font-black text-white mt-1 block">{currentMeasurements.peito}</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[8px] text-gray-500 font-bold uppercase block">Cintura</span>
                <span className="text-xs font-black text-[#00FF7F] mt-1 block">{currentMeasurements.cintura}</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[8px] text-gray-500 font-bold uppercase block">Braço</span>
                <span className="text-xs font-black text-white mt-1 block">{currentMeasurements.braco}</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[8px] text-gray-500 font-bold uppercase block">Coxa</span>
                <span className="text-xs font-black text-white mt-1 block">{currentMeasurements.coxa}</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[8px] text-gray-500 font-bold uppercase block">Pantu.</span>
                <span className="text-xs font-black text-white mt-1 block">{currentMeasurements.panturrilha}</span>
              </div>
            </div>

            {/* Quick Logging Measurements form collapsible */}
            <form onSubmit={handleAddMeasurements} className="pt-2 border-t border-white/5 space-y-3">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">Registrar Novas Medidas</span>
              
              <div className="grid grid-cols-5 gap-2">
                <input
                  type="number"
                  placeholder="Peito"
                  value={newPeito}
                  onChange={(e) => setNewPeito(e.target.value)}
                  className="bg-black border border-white/5 rounded-lg py-1 px-1.5 text-[10px] text-center text-white outline-none placeholder-gray-700"
                />
                <input
                  type="number"
                  placeholder="Cintu."
                  value={newCintura}
                  onChange={(e) => setNewCintura(e.target.value)}
                  className="bg-black border border-white/5 rounded-lg py-1 px-1.5 text-[10px] text-center text-white outline-none placeholder-gray-700"
                />
                <input
                  type="number"
                  placeholder="Braço"
                  value={newBraco}
                  onChange={(e) => setNewBraco(e.target.value)}
                  className="bg-black border border-white/5 rounded-lg py-1 px-1.5 text-[10px] text-center text-white outline-none placeholder-gray-700"
                />
                <input
                  type="number"
                  placeholder="Coxa"
                  value={newCoxa}
                  onChange={(e) => setNewCoxa(e.target.value)}
                  className="bg-black border border-white/5 rounded-lg py-1 px-1.5 text-[10px] text-center text-white outline-none placeholder-gray-700"
                />
                <input
                  type="number"
                  placeholder="Pantu."
                  value={newPanturrilha}
                  onChange={(e) => setNewPanturrilha(e.target.value)}
                  className="bg-black border border-white/5 rounded-lg py-1 px-1.5 text-[10px] text-center text-white outline-none placeholder-gray-700"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/5 text-[10px] font-bold py-2 rounded-xl transition-colors"
              >
                Salvar Medidas Corporais
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: EXERCISE WORKOUT LOADS */}
      {activeTab === "loads" && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Selector header dropdown */}
          <div className="flex gap-2 items-center justify-between">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Selecione o Exercício</h4>
            
            <select
              value={selectedLoadExercise}
              onChange={(e) => setSelectedLoadExercise(e.target.value)}
              className="bg-[#121212] border border-white/5 text-xs font-bold text-[#00FF7F] rounded-xl px-3 py-2.5 outline-none focus:border-[#00FF7F]/40"
            >
              <option value="Supino Reto">Supino Reto</option>
              <option value="Agachamento Livre">Agachamento Livre</option>
              <option value="Levantamento Terra">Levantamento Terra</option>
            </select>
          </div>

          {/* Loads progressions chart */}
          <div className="bg-[#121212] border border-white/5 p-4 rounded-3xl space-y-3">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Progressão de Carga Max (1RM) • {selectedLoadExercise}
            </h3>

            <div className="w-full h-44 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loadHistoryMap[selectedLoadExercise] || []} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="date" stroke="#666" fontSize={9} />
                  <YAxis stroke="#666" fontSize={9} />
                  <Tooltip contentStyle={{ backgroundColor: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "10px" }} />
                  <Line type="monotone" dataKey="loadKg" name="Carga (Kg)" stroke="#00FF7F" strokeWidth={3} dot={{ fill: "#00FF7F", r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Logging load form */}
          <div className="bg-[#121212] border border-white/5 p-4 rounded-2xl">
            <form onSubmit={handleAddLoad} className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                  Carga Levantada (kg) - {selectedLoadExercise}
                </label>
                <input
                  type="number"
                  value={newLoadKg}
                  onChange={(e) => setNewLoadKg(e.target.value)}
                  placeholder="Ex: 80"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 outline-none focus:border-[#00FF7F]/40"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#00FF7F] hover:bg-[#00E572] text-black font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Salvar</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: GAMIFIED ACHIEVEMENTS */}
      {activeTab === "achievements" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Conquistas Desbloqueáveis</h4>
            <span className="text-[10px] font-bold text-[#00FF7F] bg-[#00FF7F]/10 px-2 py-0.5 rounded">
              {achievements.filter(a => a.unlocked).length}/{achievements.length} Liberadas
            </span>
          </div>

          {/* Grid list of achievements */}
          <div className="grid grid-cols-1 gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-4 rounded-3xl border flex items-center gap-4 relative overflow-hidden transition-all ${
                  ach.unlocked
                    ? "bg-[#121212] border-[#00FF7F]/30"
                    : "bg-[#121212]/50 border-white/5 opacity-50"
                }`}
              >
                {/* Achievement Badge visual icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl border ${
                  ach.unlocked
                    ? "bg-black border-[#00FF7F]/20 text-[#00FF7F]"
                    : "bg-black/50 border-white/5 text-gray-600"
                }`}>
                  {ach.icon}
                </div>

                <div className="flex-1">
                  <h4 className="text-xs font-black text-white">{ach.title}</h4>
                  <p className="text-[10px] text-gray-500 mt-1 leading-snug">{ach.description}</p>
                  
                  {ach.unlocked && ach.unlockedDate && (
                    <span className="text-[8px] text-[#00FF7F] font-black uppercase mt-1.5 block">
                      ✓ Desbloqueado em {ach.unlockedDate}
                    </span>
                  )}
                </div>

                {ach.unlocked && (
                  <div className="absolute top-3 right-3">
                    <Check className="w-4 h-4 text-[#00FF7F]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
