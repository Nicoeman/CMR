/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, ChevronRight, Info, Heart, ArrowLeft, Award, Flame, Dumbbell, Sparkles } from "lucide-react";
import { EXERCISE_DATABASE, Exercise } from "../data/exercises";
import MaxAssistant from "./MaxAssistant";
import { getExerciseImageUrl } from "../utils/exerciseImages";

type MuscleCategory = "Todos" | "Peito" | "Costas" | "Ombro" | "Bíceps" | "Tríceps" | "Pernas" | "Glúteos" | "Abdômen" | "Calistenia";

export default function ExerciseLibrary() {
  const [activeCategory, setActiveCategory] = useState<MuscleCategory>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Muscle groups for categorization tabs
  const categories: MuscleCategory[] = [
    "Todos", "Peito", "Costas", "Ombro", "Bíceps", "Tríceps", "Pernas", "Glúteos", "Abdômen", "Calistenia"
  ];

  // Filtering
  const filteredExercises = EXERCISE_DATABASE.filter((ex) => {
    const matchesCategory = activeCategory === "Todos" || ex.category === activeCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.primaryMuscles.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          ex.secondaryMuscles.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Render a beautiful, styled, CSS-based schematic representating active muscle area
  const renderMuscleSchematic = (category: string) => {
    let color = "bg-[#00FF7F]";
    let label = category;

    switch (category) {
      case "Peito":
        color = "from-emerald-500 to-[#00FF7F]";
        break;
      case "Costas":
        color = "from-blue-600 to-indigo-500";
        break;
      case "Ombro":
        color = "from-purple-600 to-pink-500";
        break;
      case "Bíceps":
      case "Tríceps":
        color = "from-orange-500 to-amber-400";
        break;
      case "Pernas":
      case "Glúteos":
        color = "from-teal-500 to-[#00FF7F]";
        break;
      case "Abdômen":
        color = "from-yellow-500 to-orange-400";
        break;
      case "Calistenia":
        color = "from-zinc-400 to-zinc-200";
        break;
    }

    return (
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center border border-white/10 shadow-lg text-black font-black text-xs`}>
        {label.substring(0, 2).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-[#0A0A0A] text-white font-sans relative pb-16">
      
      {selectedExercise ? (
        // Detailed View of a Single Exercise
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 animate-slideLeft">
          
          {/* Back button */}
          <button
            onClick={() => setSelectedExercise(null)}
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#00FF7F] transition-colors py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Biblioteca</span>
          </button>

          {/* Demonstration Execution Image */}
          <div className="relative h-48 w-full rounded-3xl overflow-hidden border border-white/5 bg-zinc-950">
            <img
              src={getExerciseImageUrl(selectedExercise.id, selectedExercise.category)}
              alt={selectedExercise.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
            <div className="absolute bottom-3.5 left-4 right-4 flex justify-between items-end">
              <span className="text-[9px] text-white font-extrabold bg-black/60 px-2.5 py-1 rounded-lg border border-white/10 uppercase tracking-widest">
                Realização Recomendada
              </span>
            </div>
          </div>

          {/* Exercise Hero Card */}
          <div className="bg-[#121212] border border-white/5 rounded-3xl p-5 space-y-4">
            
            {/* Title & Badge */}
            <div className="flex items-center gap-3">
              {renderMuscleSchematic(selectedExercise.category)}
              <div>
                <span className="text-[9px] text-[#00FF7F] font-black uppercase tracking-wider bg-[#00FF7F]/10 px-2 py-0.5 rounded">
                  {selectedExercise.category}
                </span>
                <h3 className="text-lg font-black text-white mt-1 tracking-tight leading-tight">{selectedExercise.name}</h3>
              </div>
            </div>

            {/* Prescriptions */}
            <div className="grid grid-cols-2 gap-3 bg-black/40 p-3.5 rounded-2xl border border-white/5 text-xs">
              <div>
                <p className="text-gray-500 font-bold uppercase text-[9px]">Séries Recomendadas</p>
                <p className="font-extrabold text-white text-sm mt-0.5">{selectedExercise.defaultSets} Séries</p>
              </div>
              <div>
                <p className="text-gray-500 font-bold uppercase text-[9px]">Repetições Alvo</p>
                <p className="font-extrabold text-[#00FF7F] text-sm mt-0.5">{selectedExercise.defaultReps} Reps</p>
              </div>
            </div>
          </div>

          {/* Muscle Targets Details */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Músculos Ativados</h4>
            
            <div className="bg-[#121212] border border-white/5 p-4 rounded-2xl space-y-2.5">
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Foco Principal:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedExercise.primaryMuscles.map((muscle, idx) => (
                    <span key={idx} className="bg-[#00FF7F]/15 border border-[#00FF7F]/30 text-[#00FF7F] text-xs font-bold px-2.5 py-1 rounded-lg">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedExercise.secondaryMuscles.length > 0 && (
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Músculos Secundários:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedExercise.secondaryMuscles.map((muscle, idx) => (
                      <span key={idx} className="bg-zinc-800 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-lg border border-white/5">
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Execution step-by-step instructions */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Execução Passo a Passo</h4>
            <div className="bg-[#121212] border border-white/5 p-5 rounded-2xl text-sm text-gray-300 leading-relaxed space-y-3">
              <p>{selectedExercise.description}</p>
            </div>
          </div>

          {/* Executive Tips list */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Dicas do Personal Pro</h4>
            <div className="space-y-2">
              {selectedExercise.tips.map((tip, idx) => (
                <div key={idx} className="flex gap-3 items-start p-3 bg-[#121212] border-l-2 border-[#00FF7F] rounded-r-xl">
                  <Info className="w-4 h-4 text-[#00FF7F] shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-300 leading-normal">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Coach Max Detailed Guidance Module */}
          <div className="space-y-2.5 border-t border-white/5 pt-4">
            <h4 className="text-xs font-black text-[#00FF7F] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Instruções de IA por Coach Max</span>
            </h4>
            <MaxAssistant embeddedExercise={selectedExercise} />
          </div>
        </div>
      ) : (
        // Catalog Directory View
        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          
          {/* Header Title with Counts */}
          <div className="px-5 pt-4">
            <span className="text-[10px] text-[#00FF7F] font-bold uppercase tracking-wider">BIBLIOTECA COLETIVA</span>
            <h2 className="text-xl font-black tracking-tight uppercase">Exercícios Catalogados</h2>
            <p className="text-[10px] text-gray-500 mt-0.5">Explore {EXERCISE_DATABASE.length} exercícios com guias de execução completos.</p>
          </div>

          {/* Search bar */}
          <div className="px-5">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar por nome ou grupo muscular..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121212] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#00FF7F]/30 outline-none"
              />
            </div>
          </div>

          {/* Muscle Group Categorization Tab bar */}
          <div className="flex gap-2 overflow-x-auto px-5 py-1 scrollbar-none select-none shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-black uppercase tracking-wider py-2 px-3.5 rounded-xl border whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-[#00FF7F] border-[#00FF7F] text-black shadow-[0_0_12px_rgba(0,255,127,0.15)]"
                    : "bg-[#121212] border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Exercises scroll list */}
          <div className="flex-1 overflow-y-auto px-5 space-y-2 pb-12">
            {filteredExercises.length === 0 ? (
              <div className="text-center py-12 bg-[#121212] rounded-3xl border border-dashed border-white/5">
                <p className="text-gray-500 text-xs">Nenhum exercício encontrado para esta busca.</p>
              </div>
            ) : (
              filteredExercises.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExercise(ex)}
                  className="w-full flex items-center justify-between p-3.5 bg-[#121212] border border-white/5 hover:border-[#00FF7F]/20 rounded-2xl text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 relative bg-zinc-950 shrink-0">
                      <img
                        src={getExerciseImageUrl(ex.id, ex.category)}
                        alt={ex.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white group-hover:text-[#00FF7F] transition-colors line-clamp-1">{ex.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{ex.category}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        <span className="text-[8px] text-gray-400 font-bold">{ex.defaultSets}x{ex.defaultReps}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-1.5 bg-zinc-900 border border-white/5 rounded-xl group-hover:border-[#00FF7F]/30 transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#00FF7F] transition-colors" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
