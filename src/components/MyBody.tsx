import React, { useState, useEffect } from "react";
import { Scale, Ruler, TrendingUp, Plus, Camera, Eye, HelpCircle, Calendar, Grid, Check, Image as ImageIcon, Trash2, ArrowRight, AlertCircle } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface WeightLog {
  date: string;
  weight: number;
}

interface MeasurementLog {
  date: string;
  peito: number;
  cintura: number;
  abdomen: number;
  quadril: number;
  bracoD: number;
  bracoE: number;
  coxaD: number;
  coxaE: number;
  panturrilha: number;
}

export default function MyBody() {
  const [activeTab, setActiveTab] = useState<"weight" | "measurements" | "compare">("weight");

  // --- PERSISTED STATE ---
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [measurementLogs, setMeasurementLogs] = useState<MeasurementLog[]>([]);
  const [chartMetric, setChartMetric] = useState<string>("weight");

  // Before & After image states
  const [beforePhoto, setBeforePhoto] = useState<string>("");
  const [afterPhoto, setAfterPhoto] = useState<string>("");
  const [beforeDate, setBeforeDate] = useState<string>("Início");
  const [afterDate, setAfterDate] = useState<string>("Hoje");

  // Form input states
  const [inputWeight, setInputWeight] = useState("");
  const [inputPeito, setInputPeito] = useState("");
  const [inputCintura, setInputCintura] = useState("");
  const [inputAbdomen, setInputAbdomen] = useState("");
  const [inputQuadril, setInputQuadril] = useState("");
  const [inputBracoD, setInputBracoD] = useState("");
  const [inputBracoE, setInputBracoE] = useState("");
  const [inputCoxaD, setInputCoxaD] = useState("");
  const [inputCoxaE, setInputCoxaE] = useState("");
  const [inputPanturrilha, setInputPanturrilha] = useState("");

  // Load from localStorage
  useEffect(() => {
    const savedWeight = localStorage.getItem("fitplan_pro_weight_logs");
    const savedMeasurements = localStorage.getItem("fitplan_pro_measurement_logs");
    const savedPhotos = localStorage.getItem("fitplan_pro_compare_photos");

    if (savedWeight) {
      try { setWeightLogs(JSON.parse(savedWeight)); } catch (e) {}
    } else {
      // Seed data if empty
      const initialWeights = [
        { date: "01/05", weight: 82.5 },
        { date: "15/05", weight: 81.3 },
        { date: "01/06", weight: 79.8 },
        { date: "15/06", weight: 78.5 }
      ];
      setWeightLogs(initialWeights);
      localStorage.setItem("fitplan_pro_weight_logs", JSON.stringify(initialWeights));
    }

    if (savedMeasurements) {
      try { setMeasurementLogs(JSON.parse(savedMeasurements)); } catch (e) {}
    } else {
      // Seed measurements
      const initialMeasurements = [
        { date: "01/05", peito: 102, cintura: 88, abdomen: 92, quadril: 104, bracoD: 37, bracoE: 36.8, coxaD: 58, coxaE: 57.5, panturrilha: 38 },
        { date: "15/06", peito: 104, cintura: 82, abdomen: 84, quadril: 101, bracoD: 38.2, bracoE: 38.1, coxaD: 59, coxaE: 58.8, panturrilha: 38.5 }
      ];
      setMeasurementLogs(initialMeasurements);
      localStorage.setItem("fitplan_pro_measurement_logs", JSON.stringify(initialMeasurements));
    }

    if (savedPhotos) {
      try {
        const parsed = JSON.parse(savedPhotos);
        setBeforePhoto(parsed.beforePhoto || "");
        setAfterPhoto(parsed.afterPhoto || "");
        setBeforeDate(parsed.beforeDate || "Início");
        setAfterDate(parsed.afterDate || "Hoje");
      } catch (e) {}
    }
  }, []);

  const handleSavePhotos = (bPhoto: string, aPhoto: string, bDate: string, aDate: string) => {
    const obj = { beforePhoto: bPhoto, afterPhoto: aPhoto, beforeDate: bDate, afterDate: aDate };
    localStorage.setItem("fitplan_pro_compare_photos", JSON.stringify(obj));
  };

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputWeight);
    if (!val || isNaN(val)) return;

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}`;

    const updated = [...weightLogs, { date: formattedDate, weight: val }];
    setWeightLogs(updated);
    localStorage.setItem("fitplan_pro_weight_logs", JSON.stringify(updated));
    setInputWeight("");
  };

  const handleAddMeasurements = (e: React.FormEvent) => {
    e.preventDefault();
    const peito = parseFloat(inputPeito) || 0;
    const cintura = parseFloat(inputCintura) || 0;
    const abdomen = parseFloat(inputAbdomen) || 0;
    const quadril = parseFloat(inputQuadril) || 0;
    const bracoD = parseFloat(inputBracoD) || 0;
    const bracoE = parseFloat(inputBracoE) || 0;
    const coxaD = parseFloat(inputCoxaD) || 0;
    const coxaE = parseFloat(inputCoxaE) || 0;
    const panturrilha = parseFloat(inputPanturrilha) || 0;

    if (!peito && !cintura && !abdomen && !quadril && !bracoD && !bracoE && !coxaD && !coxaE && !panturrilha) return;

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}`;

    const prev = measurementLogs[measurementLogs.length - 1] || {
      peito: 0, cintura: 0, abdomen: 0, quadril: 0, bracoD: 0, bracoE: 0, coxaD: 0, coxaE: 0, panturrilha: 0
    };

    const newLog: MeasurementLog = {
      date: formattedDate,
      peito: peito || prev.peito,
      cintura: cintura || prev.cintura,
      abdomen: abdomen || prev.abdomen,
      quadril: quadril || prev.quadril,
      bracoD: bracoD || prev.bracoD,
      bracoE: bracoE || prev.bracoE,
      coxaD: coxaD || prev.coxaD,
      coxaE: coxaE || prev.coxaE,
      panturrilha: panturrilha || prev.panturrilha
    };

    const updated = [...measurementLogs, newLog];
    setMeasurementLogs(updated);
    localStorage.setItem("fitplan_pro_measurement_logs", JSON.stringify(updated));

    // Reset inputs
    setInputPeito("");
    setInputCintura("");
    setInputAbdomen("");
    setInputQuadril("");
    setInputBracoD("");
    setInputBracoE("");
    setInputCoxaD("");
    setInputCoxaE("");
    setInputPanturrilha("");
  };

  const handleDeleteWeightLog = (idx: number) => {
    const updated = weightLogs.filter((_, i) => i !== idx);
    setWeightLogs(updated);
    localStorage.setItem("fitplan_pro_weight_logs", JSON.stringify(updated));
  };

  const handleDeleteMeasurementLog = (idx: number) => {
    const updated = measurementLogs.filter((_, i) => i !== idx);
    setMeasurementLogs(updated);
    localStorage.setItem("fitplan_pro_measurement_logs", JSON.stringify(updated));
  };

  // Prepare chart data based on selected metric
  const chartData = chartMetric === "weight" 
    ? weightLogs.map(w => ({ date: w.date, value: w.weight }))
    : measurementLogs.map(m => ({ date: m.date, value: (m as any)[chartMetric] || 0 }));

  const currentMeasurements = measurementLogs[measurementLogs.length - 1] || {
    peito: 0, cintura: 0, abdomen: 0, quadril: 0, bracoD: 0, bracoE: 0, coxaD: 0, coxaE: 0, panturrilha: 0
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 bg-[#0A0A0A] text-white relative pb-20 font-sans">
      
      {/* Tab Select Panel */}
      <div className="bg-[#121212] p-1 rounded-2xl flex border border-white/5 shrink-0 select-none">
        <button
          onClick={() => setActiveTab("weight")}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
            activeTab === "weight" ? "bg-black text-[#00FF7F]" : "text-gray-400"
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Peso</span>
        </button>
        <button
          onClick={() => setActiveTab("measurements")}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
            activeTab === "measurements" ? "bg-black text-[#00FF7F]" : "text-gray-400"
          }`}
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>Medidas</span>
        </button>
        <button
          onClick={() => setActiveTab("compare")}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
            activeTab === "compare" ? "bg-black text-[#00FF7F]" : "text-gray-400"
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Comparativo</span>
        </button>
      </div>

      {/* Evolution Graph Section */}
      {activeTab !== "compare" && (
        <div className="bg-[#121212] border border-white/5 p-4.5 rounded-3xl space-y-3 shadow-xl animate-fadeIn">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#00FF7F]" />
              <span>Gráfico de Evolução</span>
            </h3>

            <select
              value={chartMetric}
              onChange={(e) => setChartMetric(e.target.value)}
              className="bg-black border border-white/5 text-[10px] font-bold text-[#00FF7F] rounded-xl px-2.5 py-1.5 outline-none"
            >
              <option value="weight">Peso (kg)</option>
              <option value="peito">Peitoral (cm)</option>
              <option value="cintura">Cintura (cm)</option>
              <option value="abdomen">Abdômen (cm)</option>
              <option value="quadril">Quadril (cm)</option>
              <option value="bracoD">Braço Direito (cm)</option>
              <option value="bracoE">Braço Esquerdo (cm)</option>
              <option value="coxaD">Coxa Direita (cm)</option>
              <option value="coxaE">Coxa Esquerda (cm)</option>
              <option value="panturrilha">Panturrilha (cm)</option>
            </select>
          </div>

          <div className="w-full h-44 mt-2">
            {chartData.length < 2 ? (
              <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-white/5 rounded-2xl gap-1 text-[10px] text-gray-500">
                <AlertCircle className="w-4 h-4" />
                <span>Registre pelo menos 2 pontos de dados para plotar o gráfico.</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                  <XAxis dataKey="date" stroke="#666" fontSize={8} />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#666" fontSize={8} />
                  <Tooltip contentStyle={{ backgroundColor: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "10px" }} />
                  <Line type="monotone" dataKey="value" stroke="#00FF7F" strokeWidth={3} dot={{ fill: "#00FF7F", r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}

      {/* TAB 1: DAILY WEIGHT LOGS */}
      {activeTab === "weight" && (
        <div className="space-y-4 animate-fadeIn">
          {/* Add log form */}
          <div className="bg-[#121212] border border-white/5 p-4 rounded-3xl">
            <form onSubmit={handleAddWeight} className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Novo Peso Corporal (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputWeight}
                  onChange={(e) => setInputWeight(e.target.value)}
                  placeholder="Ex: 79.5"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-600 outline-none focus:border-[#00FF7F]/40"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#00FF7F] hover:bg-[#00E572] text-black font-extrabold text-xs px-4 py-3 rounded-xl flex items-center gap-1 shrink-0 h-[42px]"
              >
                <Plus className="w-4 h-4" />
                <span>Salvar</span>
              </button>
            </form>
          </div>

          {/* Weight logs list */}
          <div className="space-y-2">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Histórico de Pesagens</span>
            
            <div className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
              {weightLogs.length === 0 ? (
                <p className="text-center py-6 text-xs text-gray-500">Nenhum peso registrado.</p>
              ) : (
                [...weightLogs].reverse().map((log, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 px-4 text-xs">
                    <span className="text-gray-400 font-medium flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      {log.date}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-white">{log.weight} kg</span>
                      <button
                        onClick={() => handleDeleteWeightLog(weightLogs.length - 1 - idx)}
                        className="text-gray-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEASUREMENTS */}
      {activeTab === "measurements" && (
        <div className="space-y-4 animate-fadeIn">
          {/* Last measurements grid highlights */}
          <div className="bg-[#121212] border border-white/5 p-4.5 rounded-3xl space-y-3 shadow-md">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Últimas Medidas Registradas (cm)</span>
            
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-gray-500 font-bold block">Peitoral</span>
                <span className="text-xs font-black text-white mt-0.5 block">{currentMeasurements.peito} cm</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-gray-500 font-bold block">Cintura</span>
                <span className="text-xs font-black text-[#00FF7F] mt-0.5 block">{currentMeasurements.cintura} cm</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-gray-500 font-bold block">Abdômen</span>
                <span className="text-xs font-black text-white mt-0.5 block">{currentMeasurements.abdomen} cm</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-gray-500 font-bold block">Quadril</span>
                <span className="text-xs font-black text-white mt-0.5 block">{currentMeasurements.quadril} cm</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-gray-500 font-bold block">Braço Direito</span>
                <span className="text-xs font-black text-white mt-0.5 block">{currentMeasurements.bracoD} cm</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-gray-500 font-bold block">Braço Esquerdo</span>
                <span className="text-xs font-black text-white mt-0.5 block">{currentMeasurements.bracoE} cm</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-gray-500 font-bold block">Coxa Direita</span>
                <span className="text-xs font-black text-white mt-0.5 block">{currentMeasurements.coxaD} cm</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-gray-500 font-bold block">Coxa Esquerda</span>
                <span className="text-xs font-black text-white mt-0.5 block">{currentMeasurements.coxaE} cm</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-gray-500 font-bold block">Panturrilha</span>
                <span className="text-xs font-black text-white mt-0.5 block">{currentMeasurements.panturrilha} cm</span>
              </div>
            </div>
          </div>

          {/* Add measurements log form */}
          <div className="bg-[#121212] border border-white/5 p-4 rounded-3xl">
            <form onSubmit={handleAddMeasurements} className="space-y-3">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Registrar Novas Medidas</span>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-gray-500">Peito</span>
                  <input type="number" step="0.1" placeholder="Ex: 102" value={inputPeito} onChange={e => setInputPeito(e.target.value)} className="w-full bg-black border border-white/5 rounded-lg py-1.5 text-xs text-center text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-gray-500">Cintura</span>
                  <input type="number" step="0.1" placeholder="Ex: 88" value={inputCintura} onChange={e => setInputCintura(e.target.value)} className="w-full bg-black border border-white/5 rounded-lg py-1.5 text-xs text-center text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-gray-500">Abdômen</span>
                  <input type="number" step="0.1" placeholder="Ex: 92" value={inputAbdomen} onChange={e => setInputAbdomen(e.target.value)} className="w-full bg-black border border-white/5 rounded-lg py-1.5 text-xs text-center text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-gray-500">Quadril</span>
                  <input type="number" step="0.1" placeholder="Ex: 104" value={inputQuadril} onChange={e => setInputQuadril(e.target.value)} className="w-full bg-black border border-white/5 rounded-lg py-1.5 text-xs text-center text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-gray-500">Braço D</span>
                  <input type="number" step="0.1" placeholder="Ex: 37" value={inputBracoD} onChange={e => setInputBracoD(e.target.value)} className="w-full bg-black border border-white/5 rounded-lg py-1.5 text-xs text-center text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-gray-500">Braço E</span>
                  <input type="number" step="0.1" placeholder="Ex: 36.8" value={inputBracoE} onChange={e => setInputBracoE(e.target.value)} className="w-full bg-black border border-white/5 rounded-lg py-1.5 text-xs text-center text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-gray-500">Coxa D</span>
                  <input type="number" step="0.1" placeholder="Ex: 58" value={inputCoxaD} onChange={e => setInputCoxaD(e.target.value)} className="w-full bg-black border border-white/5 rounded-lg py-1.5 text-xs text-center text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-gray-500">Coxa E</span>
                  <input type="number" step="0.1" placeholder="Ex: 57.5" value={inputCoxaE} onChange={e => setInputCoxaE(e.target.value)} className="w-full bg-black border border-white/5 rounded-lg py-1.5 text-xs text-center text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-gray-500">Pantu.</span>
                  <input type="number" step="0.1" placeholder="Ex: 38" value={inputPanturrilha} onChange={e => setInputPanturrilha(e.target.value)} className="w-full bg-black border border-white/5 rounded-lg py-1.5 text-xs text-center text-white" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white/5 hover:bg-white/10 text-[#00FF7F] border border-white/5 text-[10px] font-black uppercase py-2.5 rounded-xl transition-colors"
              >
                Salvar Medidas Semanais
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: BEFORE & AFTER COMPARISON */}
      {activeTab === "compare" && (
        <div className="space-y-5 animate-fadeIn">
          
          {/* Side by side visual layout */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Before side */}
            <div className="bg-[#121212] rounded-3xl p-4 border border-white/5 flex flex-col items-center justify-center min-h-[220px] text-center relative overflow-hidden">
              {beforePhoto ? (
                <img src={beforePhoto} alt="Antes" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center mx-auto text-gray-400">
                    <ImageIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Antes</span>
                  <p className="text-[9px] text-gray-600">Sem foto adicionada</p>
                </div>
              )}
              {/* Bottom tag */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/85 backdrop-blur-sm p-1.5 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-wider text-center">
                {beforeDate}
              </div>
            </div>

            {/* After side */}
            <div className="bg-[#121212] rounded-3xl p-4 border border-white/5 flex flex-col items-center justify-center min-h-[220px] text-center relative overflow-hidden">
              {afterPhoto ? (
                <img src={afterPhoto} alt="Depois" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center mx-auto text-gray-400">
                    <ImageIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="block text-[10px] font-black text-[#00FF7F] uppercase tracking-widest">Depois</span>
                  <p className="text-[9px] text-gray-600">Sem foto adicionada</p>
                </div>
              )}
              {/* Bottom tag */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#00FF7F]/90 p-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider text-black text-center shadow-[0_0_10px_rgba(0,255,127,0.2)]">
                {afterDate}
              </div>
            </div>
          </div>

          {/* Edit photo form settings */}
          <div className="bg-[#121212] border border-white/5 p-4 rounded-3xl space-y-4">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Configurar Fotos de Evolução</span>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">URL da Foto Antes</label>
                <input
                  type="text"
                  value={beforePhoto}
                  onChange={(e) => {
                    setBeforePhoto(e.target.value);
                    handleSavePhotos(e.target.value, afterPhoto, beforeDate, afterDate);
                  }}
                  placeholder="Insira uma URL de imagem (ex: imgur, unsplash)"
                  className="w-full bg-black border border-white/5 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Legenda/Data Antes</label>
                <input
                  type="text"
                  value={beforeDate}
                  onChange={(e) => {
                    setBeforeDate(e.target.value);
                    handleSavePhotos(beforePhoto, afterPhoto, e.target.value, afterDate);
                  }}
                  className="w-full bg-black border border-white/5 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="border-t border-white/5 pt-3">
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">URL da Foto Depois</label>
                <input
                  type="text"
                  value={afterPhoto}
                  onChange={(e) => {
                    setAfterPhoto(e.target.value);
                    handleSavePhotos(beforePhoto, e.target.value, beforeDate, afterDate);
                  }}
                  placeholder="Insira uma URL de imagem"
                  className="w-full bg-black border border-white/5 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Legenda/Data Depois</label>
                <input
                  type="text"
                  value={afterDate}
                  onChange={(e) => {
                    setAfterDate(e.target.value);
                    handleSavePhotos(beforePhoto, afterPhoto, beforeDate, e.target.value);
                  }}
                  className="w-full bg-black border border-white/5 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
