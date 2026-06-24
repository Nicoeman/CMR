import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, Coffee, Utensils, Award, Flame, Scale, ChevronRight, RefreshCw, Info, ThumbsUp, AlertCircle } from "lucide-react";

interface FoodItem {
  name: string;
  quantity: string;
  protein: number;
  carb: number;
  fat: number;
}

interface Meal {
  name: string;
  time: string;
  foods: FoodItem[];
  protein: number;
  carb: number;
  fat: number;
}

interface DietPlan {
  totalKcal: number;
  totalProtein: number;
  totalCarb: number;
  totalFat: number;
  meals: Meal[];
}

// Generate an elegant, mathematically tailored meal plan locally as fallback or immediate response
export function generateLocalDiet(weight: number, height: number, objective: string, mealsCount: number, restrictions: string): DietPlan {
  // Base scale factor based on weight (standard base is 75kg)
  let baseFactor = weight / 75;

  // Modify factor based on objective
  let carbFactor = 1.0;
  let proteinFactor = 1.0;
  let fatFactor = 1.0;

  if (objective === "hipertrofia") {
    carbFactor = 1.25;
    proteinFactor = 1.1;
    fatFactor = 1.1;
  } else if (objective === "emagrecimento") {
    carbFactor = 0.65;
    proteinFactor = 1.2; // keep protein high to preserve muscle
    fatFactor = 0.7;
  } else if (objective === "definição") {
    carbFactor = 0.8;
    proteinFactor = 1.15;
    fatFactor = 0.8;
  }

  // Meal naming based on count
  const mealNames: string[] = [];
  if (mealsCount === 3) {
    mealNames.push("Café da Manhã", "Almoço", "Jantar");
  } else if (mealsCount === 4) {
    mealNames.push("Café da Manhã", "Almoço", "Lanche da Tarde", "Jantar");
  } else if (mealsCount === 5) {
    mealNames.push("Café da Manhã", "Colação (Manhã)", "Almoço", "Lanche da Tarde", "Jantar");
  } else {
    mealNames.push("Café da Manhã", "Colação (Manhã)", "Almoço", "Lanche da Tarde", "Jantar", "Ceia (Noite)");
  }

  const mealTimes = ["07:30", "10:30", "13:00", "16:30", "20:00", "22:30"];

  const meals: Meal[] = mealNames.map((name, idx) => {
    // Generate foods based on name, objective, and restrictions
    const foods: FoodItem[] = [];
    const lowerRest = restrictions.toLowerCase();
    
    const hasEggRest = lowerRest.includes("ovo");
    const hasMilkRest = lowerRest.includes("leite") || lowerRest.includes("lactose");
    const hasGlutenRest = lowerRest.includes("gluten") || lowerRest.includes("glúten");
    const isVegetarian = lowerRest.includes("veg") || lowerRest.includes("carne");

    // We define base foods
    const baseFoods: { name: string; baseQty: number; unit: string; p: number; c: number; f: number }[] = [];

    if (name.includes("Café") || name.includes("Colação") || name.includes("Ceia")) {
      // Breakfast / snacks
      if (isVegetarian) {
        baseFoods.push({ name: "Aveia em Flocos Inteiros", baseQty: 50, unit: "g", p: 7, c: 32, f: 3.5 });
        baseFoods.push({ name: hasMilkRest ? "Leite de Amêndoas" : "Leite Desnatado", baseQty: 200, unit: "ml", p: 6, c: 10, f: 1 });
        baseFoods.push({ name: "Pasta de Amendoim Integral", baseQty: 15, unit: "g", p: 4, c: 2.5, f: 7.5 });
      } else {
        if (!hasEggRest) {
          baseFoods.push({ name: "Ovos Inteiros Mexidos", baseQty: 100, unit: "g", p: 13, c: 1, f: 10 });
        } else {
          baseFoods.push({ name: "Queijo de Minas Frescal Light", baseQty: 60, unit: "g", p: 10, c: 1.5, f: 5 });
        }
        baseFoods.push({ name: hasGlutenRest ? "Tapioca" : "Pão de Forma Integral", baseQty: 50, unit: "g", p: 5, c: 24, f: 1.5 });
        baseFoods.push({ name: "Fruta da Época (Mamão/Banana)", baseQty: 100, unit: "g", p: 1, c: 15, f: 0 });
      }
    } else {
      // Lunch / Dinner (Almoço / Jantar)
      if (isVegetarian) {
        baseFoods.push({ name: "Arroz Integral Cozido", baseQty: 120, unit: "g", p: 3, c: 30, f: 1 });
        baseFoods.push({ name: "Feijão Preto Carioca", baseQty: 100, unit: "g", p: 5, c: 14, f: 0.5 });
        baseFoods.push({ name: "Tofu Grelhado Firme", baseQty: 100, unit: "g", p: 13, c: 1.5, f: 5 });
        baseFoods.push({ name: "Salada Verde Mix + Azeite de Oliva", baseQty: 80, unit: "g", p: 1, c: 3, f: 7 });
      } else {
        baseFoods.push({ name: "Filé de Peito de Frango Grelhado", baseQty: 120, unit: "g", p: 30, c: 0, f: 3.5 });
        baseFoods.push({ name: "Batata Doce Cozida", baseQty: 120, unit: "g", p: 2, c: 28, f: 0.5 });
        baseFoods.push({ name: "Brócolis Vaporizados", baseQty: 80, unit: "g", p: 2, c: 5, f: 0 });
        baseFoods.push({ name: "Azeite de Oliva Extra Virgem", baseQty: 8, unit: "ml", p: 0, c: 0, f: 8 });
      }
    }

    // Now scale each base food based on the calculated factors
    baseFoods.forEach(bf => {
      // Scale qty
      let scaledQtyVal = bf.baseQty * baseFactor;
      // Adjust scaledQtyVal slightly for the objective
      if (bf.name.includes("Frango") || bf.name.includes("Ovos") || bf.name.includes("Queijo") || bf.name.includes("Tofu")) {
        scaledQtyVal *= proteinFactor;
      } else if (bf.name.includes("Arroz") || bf.name.includes("Batata") || bf.name.includes("Pão") || bf.name.includes("Tapioca") || bf.name.includes("Aveia")) {
        scaledQtyVal *= carbFactor;
      } else if (bf.name.includes("Azeite") || bf.name.includes("Pasta")) {
        scaledQtyVal *= fatFactor;
      }
      
      const qtyRounded = Math.round(scaledQtyVal);
      const displayQty = `${qtyRounded}${bf.unit}`;

      // Scale macros
      const pScaled = Math.round(bf.p * baseFactor * proteinFactor);
      const cScaled = Math.round(bf.c * baseFactor * carbFactor);
      const fScaled = Math.round(bf.f * baseFactor * fatFactor);

      foods.push({
        name: bf.name,
        quantity: displayQty,
        protein: pScaled,
        carb: cScaled,
        fat: fScaled
      });
    });

    const subProt = foods.reduce((acc, f) => acc + f.protein, 0);
    const subCarb = foods.reduce((acc, f) => acc + f.carb, 0);
    const subFat = foods.reduce((acc, f) => acc + f.fat, 0);

    return {
      name,
      time: mealTimes[idx] || "12:00",
      foods,
      protein: subProt,
      carb: subCarb,
      fat: subFat
    };
  });

  const totalProtein = meals.reduce((acc, m) => acc + m.protein, 0);
  const totalCarb = meals.reduce((acc, m) => acc + m.carb, 0);
  const totalFat = meals.reduce((acc, m) => acc + m.fat, 0);
  const totalKcal = totalProtein * 4 + totalCarb * 4 + totalFat * 9;

  return {
    totalKcal,
    totalProtein,
    totalCarb,
    totalFat,
    meals
  };
}

export default function MyDiet() {
  // Input states
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [objective, setObjective] = useState<"hipertrofia" | "emagrecimento" | "definição">("hipertrofia");
  const [mealsCount, setMealsCount] = useState<number>(4);
  const [restrictions, setRestrictions] = useState<string>("");

  // Plan states
  const [activePlan, setActivePlan] = useState<DietPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUsingAI, setIsUsingAI] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("fitplan_pro_diet");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.totalKcal === 'number' && !isNaN(parsed.totalKcal)) {
          setActivePlan(parsed);
        } else {
          localStorage.removeItem("fitplan_pro_diet");
        }
      } catch (e) {
        localStorage.removeItem("fitplan_pro_diet");
      }
    }
  }, []);

  const handleGenerateDiet = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsUsingAI(false);

    try {
      const response = await fetch("/api/generate-diet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight,
          height,
          objective: objective === "hipertrofia" ? "Hipertrofia Muscular" : objective === "emagrecimento" ? "Emagrecimento / Deficit" : "Definição Muscular Extrema",
          mealsPerDay: mealsCount,
          restrictions
        })
      });

      if (!response.ok) throw new Error("Chave de API ausente ou falha.");

      const data = await response.json();
      if (data && data.meals) {
        setActivePlan(data);
        setIsUsingAI(true);
        localStorage.setItem("fitplan_pro_diet", JSON.stringify(data));
      } else {
        throw new Error();
      }
    } catch (err) {
      // Local highly detailed math layout fallback
      const fallbackPlan = generateLocalDiet(weight, height, objective, mealsCount, restrictions);
      setActivePlan(fallbackPlan);
      setIsUsingAI(false);
      localStorage.setItem("fitplan_pro_diet", JSON.stringify(fallbackPlan));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetDiet = () => {
    setActivePlan(null);
    localStorage.removeItem("fitplan_pro_diet");
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 bg-[#0A0A0A] text-white relative pb-20 font-sans">
      
      {/* Header title */}
      <div>
        <span className="text-[10px] text-[#00FF7F] font-bold uppercase tracking-wider">MÓDULO NUTRICIONAL</span>
        <h2 className="text-xl font-black tracking-tight uppercase">Minha Dieta</h2>
        <p className="text-[10px] text-gray-500 mt-0.5">Monte um plano alimentar hiperpersonalizado de acordo com seu biotipo e objetivo.</p>
      </div>

      {!activePlan ? (
        // Form wizard
        <form onSubmit={handleGenerateDiet} className="space-y-4 bg-[#121212] p-5 rounded-3xl border border-white/5 animate-fadeIn">
          
          {/* Weight & Height inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Peso Atual (kg)</label>
              <div className="flex items-center bg-black border border-white/10 rounded-xl px-3 py-1">
                <Scale className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
                <input
                  type="number"
                  min={30}
                  max={250}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-white font-extrabold py-2.5 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Altura (cm)</label>
              <div className="flex items-center bg-black border border-white/10 rounded-xl px-3 py-1">
                <span className="text-xs text-gray-500 font-bold mr-2 shrink-0">CM</span>
                <input
                  type="number"
                  min={100}
                  max={250}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-white font-extrabold py-2.5 outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Objective Select */}
          <div>
            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Objetivo Principal</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "hipertrofia", label: "Hipertrofia", desc: "Ganho Massa" },
                { id: "emagrecimento", label: "Emagrecimento", desc: "Perda de Peso" },
                { id: "definição", label: "Definição", desc: "Manter Músculo" }
              ].map((obj) => (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => setObjective(obj.id as any)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    objective === obj.id
                      ? "bg-[#00FF7F]/10 border-[#00FF7F] text-[#00FF7F]"
                      : "bg-black/40 border-white/5 text-gray-400"
                  }`}
                >
                  <span className="block text-xs font-black">{obj.label}</span>
                  <span className="block text-[8px] font-bold mt-0.5 opacity-65">{obj.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Meal Frequency Selection slider/counter */}
          <div>
            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Refeições Diárias ({mealsCount})</label>
            <div className="grid grid-cols-4 gap-2">
              {[3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setMealsCount(num)}
                  className={`py-2.5 rounded-xl border text-center transition-all text-xs font-extrabold ${
                    mealsCount === num
                      ? "bg-[#00FF7F]/10 border-[#00FF7F]/30 text-[#00FF7F]"
                      : "bg-black/30 border-white/5 text-gray-400"
                  }`}
                >
                  {num} Refeições
                </button>
              ))}
            </div>
          </div>

          {/* Dietary restrictions / Allergies */}
          <div>
            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Restrições ou Preferências (Opcional)</label>
            <input
              type="text"
              value={restrictions}
              onChange={(e) => setRestrictions(e.target.value)}
              placeholder="Ex: sem lactose, vegetariano, sem glúten, sem ovo"
              className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white placeholder-gray-600 outline-none focus:border-[#00FF7F]/30"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00FF7F] hover:bg-[#00E572] disabled:opacity-50 text-black font-extrabold text-xs py-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-[0_0_20px_rgba(0,255,127,0.1)] mt-4 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Gerando Plano Dietético...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Gerar Meu Plano de Dieta</span>
              </>
            )}
          </button>
        </form>
      ) : (
        // Meal plan presentation layout
        <div className="space-y-5 animate-slideUp">
          
          {/* Top Quick Status stats card */}
          <div className="bg-[#121212] border border-white/5 p-5 rounded-3xl relative overflow-hidden shadow-xl">
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#00FF7F]/5 to-transparent pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[9px] text-[#00FF7F] font-black uppercase tracking-wider bg-[#00FF7F]/10 px-2.5 py-1 rounded-md">
                  {isUsingAI ? "Plano Alimentar de IA" : "Plano Pro-Mapeado"}
                </span>
                <h3 className="text-sm font-black text-white mt-1.5">Estatísticas Diárias Alvo</h3>
              </div>
              
              <button
                onClick={handleResetDiet}
                className="text-[10px] font-black text-red-400 hover:underline flex items-center gap-1"
              >
                Refazer Dieta
              </button>
            </div>

            {/* Total caloric values */}
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-3xl font-black text-white tracking-tighter">{activePlan?.totalKcal ?? 0}</span>
              <span className="text-xs font-bold text-gray-400">kcal / dia</span>
            </div>

            {/* Macro splits bars & tags */}
            <div className="grid grid-cols-3 gap-2.5 text-center pt-2 border-t border-white/5 text-[10px]">
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[8px] text-gray-500 font-bold uppercase block">Proteína</span>
                <span className="text-xs font-black text-[#00FF7F] mt-1 block">{activePlan?.totalProtein ?? 0}g</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[8px] text-gray-500 font-bold uppercase block">Carboidrato</span>
                <span className="text-xs font-black text-white mt-1 block">{activePlan?.totalCarb ?? 0}g</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[8px] text-gray-500 font-bold uppercase block">Gordura</span>
                <span className="text-xs font-black text-white mt-1 block">{activePlan?.totalFat ?? 0}g</span>
              </div>
            </div>
          </div>

          {/* Meals detail list */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-[#00FF7F]" />
              <span>Menu de Refeições Planejadas</span>
            </h4>

            {(activePlan?.meals || []).map((meal, idx) => (
              <div key={idx} className="bg-[#121212] border border-white/5 rounded-3xl p-4.5 space-y-3.5">
                
                {/* Meal header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-black text-xs font-black flex items-center justify-center border border-white/5 text-[#00FF7F]">
                      {idx + 1}
                    </span>
                    <h5 className="text-xs font-black text-white uppercase tracking-tight">{meal?.name || "Refeição"}</h5>
                  </div>
                  <span className="text-[9px] font-black text-gray-400 bg-black/60 px-2 py-0.5 rounded-lg border border-white/5">
                    {meal?.time || "12:00"}
                  </span>
                </div>

                {/* Foods list */}
                <div className="space-y-2">
                  {(meal?.foods || []).map((food, fIdx) => (
                    <div key={fIdx} className="flex justify-between items-start bg-black/30 p-2.5 rounded-xl border border-white/5 text-[10px]">
                      <div>
                        <p className="font-extrabold text-white">{food?.name || "Alimento"}</p>
                        <p className="text-[9px] text-gray-500 font-bold mt-0.5">Quantidade: {food?.quantity || "A gosto"}</p>
                      </div>
                      <div className="text-right text-gray-400 font-bold text-[9px] shrink-0">
                        <span>P: {food?.protein ?? 0}g</span>
                        <span className="mx-1.5">•</span>
                        <span>C: {food?.carb ?? 0}g</span>
                        <span className="mx-1.5">•</span>
                        <span>G: {food?.fat ?? 0}g</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Meal macros summary */}
                <div className="flex justify-between items-center text-[9px] text-gray-500 font-black uppercase pt-1 px-1">
                  <span>Macros Refeição:</span>
                  <div className="space-x-2 text-white">
                    <span className="bg-[#00FF7F]/10 border border-[#00FF7F]/15 text-[#00FF7F] px-1.5 py-0.5 rounded">P: {meal?.protein ?? 0}g</span>
                    <span className="bg-zinc-800 px-1.5 py-0.5 rounded">C: {meal?.carb ?? 0}g</span>
                    <span className="bg-zinc-800 px-1.5 py-0.5 rounded">G: {meal?.fat ?? 0}g</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick coaching notice */}
          <div className="p-3.5 bg-black rounded-2xl border border-white/5 flex gap-2.5 items-start">
            <Info className="w-4 h-4 text-[#00FF7F] shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-400 leading-normal font-medium">
              Beba de 35ml a 45ml de água por kg de peso corporal todos os dias. Mantenha os horários das refeições o mais regular possível para otimizar o metabolismo e a síntese proteica.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
