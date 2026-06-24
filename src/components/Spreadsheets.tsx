/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, SlidersHorizontal, Dumbbell, Sparkles, Plus, Check, ArrowRight, Trash2, X, Info } from "lucide-react";
import { PresetSpreadsheet, PRESET_SPREADSHEETS } from "../data/spreadsheets";
import { EXERCISE_DATABASE, Exercise } from "../data/exercises";
import { generateExpandedWorkouts } from "../data/expandedWorkouts";
import { getObjectiveHeroImageUrl, getExerciseImageUrl } from "../utils/exerciseImages";

interface SpreadsheetsProps {
  activeSpreadsheet: PresetSpreadsheet | null;
  onSetActiveSpreadsheet: (sheet: PresetSpreadsheet) => void;
  customSpreadsheets: PresetSpreadsheet[];
  onAddCustomSpreadsheet: (sheet: PresetSpreadsheet) => void;
  onDeleteCustomSpreadsheet: (id: string) => void;
}

type ObjectiveType = "Todos" | "Hipertrofia" | "Emagrecimento" | "Força" | "Resistência" | "Definição";
type LevelType = "Todos" | "Iniciante" | "Intermediário" | "Avançado";
type CategoryTab = "Todos" | "Academia" | "Calistenia";

export default function Spreadsheets({
  activeSpreadsheet,
  onSetActiveSpreadsheet,
  customSpreadsheets,
  onAddCustomSpreadsheet,
  onDeleteCustomSpreadsheet
}: SpreadsheetsProps) {
  // Navigation tabs & filters
  const [activeTab, setActiveTab] = useState<CategoryTab>("Todos");
  const [filterObjective, setFilterObjective] = useState<ObjectiveType>("Todos");
  const [filterLevel, setFilterLevel] = useState<LevelType>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Custom spreadsheet creation states
  const [isCreating, setIsCreating] = useState(false);
  const [newSheetName, setNewSheetName] = useState("");
  const [newSheetType, setNewSheetType] = useState<"Academia" | "Calistenia">("Academia");
  const [newSheetObjective, setNewSheetObjective] = useState<ObjectiveType>("Hipertrofia");
  const [newSheetLevel, setNewSheetLevel] = useState<LevelType>("Iniciante");
  const [newSheetDuration, setNewSheetDuration] = useState(8);
  
  // Custom workout days state
  const [customDays, setCustomDays] = useState<{ dayName: string; exercises: { exerciseId: string; sets: number; reps: string; restSecs: number }[] }[]>([
    { dayName: "Treino A", exercises: [] }
  ]);
  
  // Selector popup for exercises during creation
  const [currentDayIndexToEdit, setCurrentDayIndexToEdit] = useState<number | null>(null);
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState("");

  // Programmatic 160+ workouts expansion
  const [expandedPresets] = useState<PresetSpreadsheet[]>(() => generateExpandedWorkouts());
  const allSpreadsheets = [...PRESET_SPREADSHEETS, ...expandedPresets, ...customSpreadsheets];

  // Filtering logic
  const filteredSpreadsheets = allSpreadsheets.filter((sheet) => {
    const matchesSearch = sheet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sheet.musclesTargeted.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTab = activeTab === "Todos" || sheet.type === activeTab;
    const matchesObjective = filterObjective === "Todos" || sheet.objective === filterObjective;
    const matchesLevel = filterLevel === "Todos" || sheet.level === filterLevel;

    return matchesSearch && matchesTab && matchesObjective && matchesLevel;
  });

  // Handle adding exercise to custom sheet day
  const handleAddExerciseToDay = (dayIndex: number, exercise: Exercise) => {
    const updated = [...customDays];
    updated[dayIndex].exercises.push({
      exerciseId: exercise.id,
      sets: exercise.defaultSets,
      reps: exercise.defaultReps,
      restSecs: 60
    });
    setCustomDays(updated);
    setCurrentDayIndexToEdit(null); // Close modal
    setExerciseSearchQuery("");
  };

  // Handle deleting exercise from custom day
  const handleRemoveExerciseFromDay = (dayIndex: number, exerciseIndex: number) => {
    const updated = [...customDays];
    updated[dayIndex].exercises.splice(exerciseIndex, 1);
    setCustomDays(updated);
  };

  // Handle changing sets/reps in creator
  const handleUpdateExerciseSpec = (dayIndex: number, exerciseIndex: number, field: "sets" | "reps" | "restSecs", value: any) => {
    const updated = [...customDays];
    updated[dayIndex].exercises[exerciseIndex] = {
      ...updated[dayIndex].exercises[exerciseIndex],
      [field]: value
    };
    setCustomDays(updated);
  };

  const handleAddWorkoutDay = () => {
    const nextLetter = String.fromCharCode(65 + customDays.length); // A, B, C...
    setCustomDays([...customDays, { dayName: `Treino ${nextLetter}`, exercises: [] }]);
  };

  const handleRemoveWorkoutDay = (dayIndex: number) => {
    if (customDays.length <= 1) return;
    const updated = [...customDays];
    updated.splice(dayIndex, 1);
    setCustomDays(updated);
  };

  const handleSaveCustomSpreadsheet = () => {
    if (!newSheetName.trim()) {
      alert("Por favor, digite um nome para a planilha.");
      return;
    }

    const totalExercises = customDays.reduce((acc, curr) => acc + curr.exercises.length, 0);
    if (totalExercises === 0) {
      alert("Adicione pelo menos um exercício na sua planilha personalizada.");
      return;
    }

    // Determine target muscles dynamically from selected exercises
    const muscles = new Set<string>();
    customDays.forEach(day => {
      day.exercises.forEach(item => {
        const found = EXERCISE_DATABASE.find(e => e.id === item.exerciseId);
        if (found) muscles.add(found.category);
      });
    });

    const newSpreadsheet: PresetSpreadsheet = {
      id: `custom-sheet-${Date.now()}`,
      name: newSheetName,
      type: newSheetType,
      objective: newSheetObjective === "Todos" ? "Hipertrofia" : (newSheetObjective as any),
      level: newSheetLevel === "Todos" ? "Iniciante" : (newSheetLevel as any),
      durationWeeks: newSheetDuration,
      daysSplit: customDays.map(d => `${d.dayName} (${d.exercises.length} Ex)`).join(", "),
      musclesTargeted: Array.from(muscles),
      days: customDays
    };

    onAddCustomSpreadsheet(newSpreadsheet);
    
    // Reset states
    setIsCreating(false);
    setNewSheetName("");
    setCustomDays([{ dayName: "Treino A", exercises: [] }]);
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 bg-[#0A0A0A] text-white relative pb-20">
      
      {/* Conditionally render custom spreadsheets creator wizard OR main catalog */}
      {isCreating ? (
        <div className="space-y-5 animate-fadeIn">
          {/* Header Creator */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <span className="text-[10px] text-[#00FF7F] font-bold uppercase tracking-wider">MODO DESIGNER</span>
              <h3 className="text-lg font-black text-white uppercase">Criar Planilha</h3>
            </div>
            <button
              onClick={() => setIsCreating(false)}
              className="p-1 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Basic details */}
          <div className="space-y-4 bg-[#121212] p-4 rounded-2xl border border-white/5">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Nome da Planilha</label>
              <input
                type="text"
                value={newSheetName}
                onChange={(e) => setNewSheetName(e.target.value)}
                placeholder="Ex: Treino Híbrido Avançado"
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#00FF7F]/50 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Tipo</label>
                <select
                  value={newSheetType}
                  onChange={(e) => setNewSheetType(e.target.value as any)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#00FF7F]/50 outline-none"
                >
                  <option value="Academia">Academia</option>
                  <option value="Calistenia">Calistenia</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Duração (Semanas)</label>
                <input
                  type="number"
                  value={newSheetDuration}
                  onChange={(e) => setNewSheetDuration(Number(e.target.value))}
                  min={1}
                  max={24}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#00FF7F]/50 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Objetivo</label>
                <select
                  value={newSheetObjective}
                  onChange={(e) => setNewSheetObjective(e.target.value as any)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#00FF7F]/50 outline-none"
                >
                  <option value="Hipertrofia">Hipertrofia</option>
                  <option value="Emagrecimento">Emagrecimento</option>
                  <option value="Força">Força</option>
                  <option value="Resistência">Resistência</option>
                  <option value="Definição">Definição</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Nível de Dificuldade</label>
                <select
                  value={newSheetLevel}
                  onChange={(e) => setNewSheetLevel(e.target.value as any)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#00FF7F]/50 outline-none"
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Days Section builder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Estruturação de Treinos</h4>
              <button
                type="button"
                onClick={handleAddWorkoutDay}
                className="text-[10px] font-bold text-[#00FF7F] flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Dia (Treino)
              </button>
            </div>

            {customDays.map((day, dIdx) => (
              <div key={dIdx} className="bg-[#121212] border border-white/5 rounded-2xl p-4 space-y-3 relative">
                
                {/* Remove Day Button */}
                {customDays.length > 1 && (
                  <button
                    onClick={() => handleRemoveWorkoutDay(dIdx)}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                {/* Day title */}
                <input
                  type="text"
                  value={day.dayName}
                  onChange={(e) => {
                    const updated = [...customDays];
                    updated[dIdx].dayName = e.target.value;
                    setCustomDays(updated);
                  }}
                  className="bg-transparent text-sm font-black text-white focus:border-b focus:border-[#00FF7F] outline-none pb-0.5 max-w-[200px]"
                />

                {/* Exercises in this day */}
                <div className="space-y-2">
                  {day.exercises.length === 0 ? (
                    <div className="text-center py-4 border border-dashed border-white/5 rounded-xl">
                      <p className="text-[10px] text-gray-500">Nenhum exercício adicionado a este dia.</p>
                    </div>
                  ) : (
                    day.exercises.map((item, eIdx) => {
                      const exInfo = EXERCISE_DATABASE.find(e => e.id === item.exerciseId);
                      return (
                        <div key={eIdx} className="flex flex-col gap-2 p-2.5 bg-black rounded-xl border border-white/5">
                          <div className="flex items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2 min-w-0">
                              {exInfo && (
                                <img
                                  src={getExerciseImageUrl(exInfo.id, exInfo.category)}
                                  alt={exInfo.name}
                                  className="w-8 h-8 rounded-lg object-cover border border-white/10 shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                              )}
                              <span className="text-xs font-bold text-white leading-tight truncate">
                                {exInfo?.name || "Exercício desconhecido"}
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveExerciseFromDay(dIdx, eIdx)}
                              className="text-gray-500 hover:text-red-400 transition-colors shrink-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          {/* Sets, Reps and Rest controls */}
                          <div className="grid grid-cols-3 gap-2 text-[10px]">
                            <div>
                              <span className="text-gray-500">Séries:</span>
                              <input
                                type="number"
                                value={item.sets}
                                onChange={(e) => handleUpdateExerciseSpec(dIdx, eIdx, "sets", Number(e.target.value))}
                                className="w-full bg-[#121212] rounded px-1.5 py-0.5 text-center text-white border border-white/5 mt-0.5"
                              />
                            </div>
                            <div>
                              <span className="text-gray-500">Reps:</span>
                              <input
                                type="text"
                                value={item.reps}
                                onChange={(e) => handleUpdateExerciseSpec(dIdx, eIdx, "reps", e.target.value)}
                                className="w-full bg-[#121212] rounded px-1.5 py-0.5 text-center text-white border border-white/5 mt-0.5"
                              />
                            </div>
                            <div>
                              <span className="text-gray-500">Descanso:</span>
                              <select
                                value={item.restSecs}
                                onChange={(e) => handleUpdateExerciseSpec(dIdx, eIdx, "restSecs", Number(e.target.value))}
                                className="w-full bg-[#121212] rounded px-1 py-0.5 text-center text-white border border-white/5 mt-0.5"
                              >
                                <option value={30}>30s</option>
                                <option value={45}>45s</option>
                                <option value={60}>60s</option>
                                <option value={90}>90s</option>
                                <option value={120}>2min</option>
                                <option value={180}>3min</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Add Exercise Trigger */}
                <button
                  type="button"
                  onClick={() => setCurrentDayIndexToEdit(dIdx)}
                  className="w-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 border border-white/5 transition-colors mt-2"
                >
                  <Plus className="w-4 h-4 text-[#00FF7F]" />
                  <span>Adicionar Exercício</span>
                </button>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-white/5 space-y-2">
            <button
              onClick={handleSaveCustomSpreadsheet}
              className="w-full bg-[#00FF7F] hover:bg-[#00E572] text-black font-extrabold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,127,0.1)]"
            >
              <span>Salvar e Habilitar Planilha</span>
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="w-full bg-transparent hover:bg-white/5 text-gray-400 font-bold text-xs py-2.5 rounded-xl transition-all"
            >
              Cancelar
            </button>
          </div>

          {/* Exercise Selection Modal Inside Creator */}
          {currentDayIndexToEdit !== null && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-end">
              <div className="bg-[#121212] rounded-t-3xl border-t border-white/10 max-h-[80%] flex flex-col overflow-hidden">
                
                {/* Modal Header */}
                <div className="p-5 border-b border-white/5 flex items-center justify-between">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Selecionar Exercício</h4>
                  <button
                    onClick={() => {
                      setCurrentDayIndexToEdit(null);
                      setExerciseSearchQuery("");
                    }}
                    className="p-1 text-gray-500 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search box inside modal */}
                <div className="p-4 bg-[#121212]">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Pesquisar exercícios..."
                      value={exerciseSearchQuery}
                      onChange={(e) => setExerciseSearchQuery(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:border-[#00FF7F]/40 outline-none"
                    />
                  </div>
                </div>

                {/* Scrollable list */}
                <div className="flex-1 overflow-y-auto px-4 pb-12 space-y-2">
                  {EXERCISE_DATABASE.filter(ex => 
                    ex.name.toLowerCase().includes(exerciseSearchQuery.toLowerCase()) ||
                    ex.category.toLowerCase().includes(exerciseSearchQuery.toLowerCase())
                  ).map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => handleAddExerciseToDay(currentDayIndexToEdit, ex)}
                      className="w-full flex items-center justify-between p-3 bg-black rounded-xl border border-white/5 hover:border-[#00FF7F]/30 transition-colors text-left"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{ex.name}</p>
                        <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mt-0.5">{ex.category}</p>
                      </div>
                      <Plus className="w-4 h-4 text-[#00FF7F]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Main view: Spreadsheets List
        <div className="space-y-5">
          
          {/* Header section with Create Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#00FF7F] font-bold uppercase tracking-wider">CONSTRUTOR</span>
              <h2 className="text-xl font-black tracking-tight uppercase">Planilhas de Treino</h2>
            </div>
            
            <button
              onClick={() => setIsCreating(true)}
              className="bg-white/5 hover:bg-white/10 text-[#00FF7F] font-black text-xs px-3 py-2 rounded-xl flex items-center gap-1 border border-[#00FF7F]/10 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Criar do Zero</span>
            </button>
          </div>

          {/* Search box & Filter Toggle */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar planilhas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121212] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#00FF7F]/30 outline-none"
              />
            </div>

            <button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`p-2.5 rounded-xl border transition-all ${
                showFiltersPanel
                  ? "bg-[#00FF7F]/20 border-[#00FF7F]/30 text-[#00FF7F]"
                  : "bg-[#121212] border-white/5 text-gray-400"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Expanded Filters Panel */}
          {showFiltersPanel && (
            <div className="bg-[#121212] border border-white/5 p-4 rounded-2xl space-y-4 animate-fadeIn">
              
              {/* Category selector type */}
              <div>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Ambiente</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Todos", "Academia", "Calistenia"] as CategoryTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[10px] font-black uppercase tracking-wider py-1.5 px-2 rounded-lg border transition-all ${
                        activeTab === tab
                          ? "bg-[#00FF7F]/10 border-[#00FF7F]/30 text-[#00FF7F]"
                          : "bg-black/30 border-white/5 text-gray-400"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal selector */}
              <div>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Objetivo</span>
                <div className="flex flex-wrap gap-1.5">
                  {(["Todos", "Hipertrofia", "Emagrecimento", "Força", "Resistência", "Definição"] as ObjectiveType[]).map((obj) => (
                    <button
                      key={obj}
                      onClick={() => setFilterObjective(obj)}
                      className={`text-[10px] font-medium py-1 px-2.5 rounded-full border transition-all ${
                        filterObjective === obj
                          ? "bg-white text-black border-white font-bold"
                          : "bg-black/40 border-white/5 text-gray-400"
                      }`}
                    >
                      {obj}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level selector */}
              <div>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Nível</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["Todos", "Iniciante", "Intermediário", "Avançado"] as LevelType[]).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setFilterLevel(lvl)}
                      className={`text-[9px] font-black uppercase tracking-wider py-1 px-1.5 rounded-lg border transition-all ${
                        filterLevel === lvl
                          ? "bg-[#00FF7F]/10 border-[#00FF7F]/30 text-[#00FF7F]"
                          : "bg-black/30 border-white/5 text-gray-400"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active sheet indicator */}
          {activeSpreadsheet && (
            <div className="bg-[#121212] border border-[#00FF7F]/20 rounded-2xl p-4 flex items-center justify-between shadow-lg relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-[#00FF7F]/2 blur-xl pointer-events-none"></div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00FF7F]/10 border border-[#00FF7F]/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#00FF7F]" />
                </div>
                <div>
                  <span className="text-[9px] text-[#00FF7F] font-black uppercase tracking-wider">PLANILHA ATIVA</span>
                  <h4 className="text-sm font-black text-white">{activeSpreadsheet.name}</h4>
                </div>
              </div>
              <span className="text-[9px] font-bold text-gray-500 uppercase px-2 py-0.5 bg-black rounded-lg">
                {activeSpreadsheet.type}
              </span>
            </div>
          )}

          {/* Spreadsheets Grid */}
          <div className="space-y-4">
            {filteredSpreadsheets.length === 0 ? (
              <div className="text-center py-12 bg-[#121212] rounded-3xl border border-dashed border-white/5">
                <p className="text-gray-500 text-xs">Nenhuma planilha encontrada com os filtros selecionados.</p>
              </div>
            ) : (
              filteredSpreadsheets.map((sheet) => {
                const isActive = activeSpreadsheet?.id === sheet.id;
                const isCustom = sheet.id.startsWith("custom-sheet-");
                
                return (
                  <div
                    key={sheet.id}
                    className={`bg-[#121212] rounded-3xl p-5 border transition-all overflow-hidden ${
                      isActive ? "border-[#00FF7F]/40 shadow-[0_0_15px_rgba(0,255,127,0.05)]" : "border-white/5"
                    }`}
                  >
                    {/* Header Program Cover Image */}
                    <div className="h-28 -mx-5 -mt-5 mb-4 relative bg-zinc-950 border-b border-white/5 overflow-hidden">
                      <img
                        src={getObjectiveHeroImageUrl(sheet.objective)}
                        alt={sheet.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    </div>

                    {/* Header: Name & Type & Custom Tag */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            sheet.type === "Academia" ? "bg-zinc-800 text-gray-300" : "bg-[#00FF7F]/10 text-[#00FF7F]"
                          }`}>
                            {sheet.type}
                          </span>
                          {isCustom && (
                            <span className="bg-purple-500/10 text-purple-400 text-[9px] font-black uppercase px-1.5 py-0.5 rounded">
                              Custom
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-black text-white mt-1.5 tracking-tight">{sheet.name}</h3>
                      </div>

                      {/* Delete Custom Button */}
                      {isCustom && (
                        <button
                          onClick={() => onDeleteCustomSpreadsheet(sheet.id)}
                          className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Meta stats: Duration, Level, Objective */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 my-3 text-[10px] text-gray-400">
                      <div>
                        <span className="block text-gray-500 text-[9px] uppercase font-black">Meta</span>
                        <span className="font-extrabold text-white">{sheet.objective}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500 text-[9px] uppercase font-black">Nível</span>
                        <span className="font-extrabold text-white">{sheet.level}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500 text-[9px] uppercase font-black">Duração</span>
                        <span className="font-extrabold text-white">{sheet.durationWeeks} Semanas</span>
                      </div>
                    </div>

                    {/* Split layout & Targeted muscles info */}
                    <div className="space-y-1.5 mb-2 text-[10px]">
                      <p className="text-gray-400">
                        <strong className="text-gray-500 uppercase tracking-wide text-[9px]">Dias:</strong> {sheet.days.length} Treinos distintos
                      </p>
                      <p className="text-gray-400 leading-snug">
                        <strong className="text-gray-500 uppercase tracking-wide text-[9px]">Músculos:</strong> {sheet.musclesTargeted.join(", ")}
                      </p>
                    </div>

                    {/* Exercise Thumbnails Row Preview */}
                    <div className="flex items-center gap-1.5 mb-4 overflow-x-auto py-1 scrollbar-none">
                      {sheet.days.flatMap(d => d.exercises || []).slice(0, 10).map((item, itemIdx) => {
                        const ex = EXERCISE_DATABASE.find(e => e.id === item.exerciseId);
                        const imgUrl = ex ? getExerciseImageUrl(ex.id, ex.category) : "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&h=400&q=80";
                        const title = ex?.name || "Exercício Desconhecido";
                        return (
                          <div key={itemIdx} className="w-7 h-7 rounded-md overflow-hidden border border-white/5 relative bg-zinc-950 shrink-0 group" title={title}>
                            <img
                              src={imgUrl}
                              alt={title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Activation button */}
                    {isActive ? (
                      <div className="w-full bg-[#00FF7F]/10 text-[#00FF7F] text-xs font-black py-2.5 rounded-xl text-center border border-[#00FF7F]/20">
                        ✓ Planilha Ativa no Seu Perfil
                      </div>
                    ) : (
                      <button
                        onClick={() => onSetActiveSpreadsheet(sheet)}
                        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-black py-2.5 rounded-xl transition-all border border-white/5 hover:border-white/10"
                      >
                        Ativar Esta Planilha
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
