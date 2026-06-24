/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpreadsheetWorkoutItem {
  exerciseId: string;
  sets: number;
  reps: string;
  restSecs: number;
}

export interface PresetSpreadsheet {
  id: string;
  name: string;
  type: 'Academia' | 'Calistenia';
  objective: 'Hipertrofia' | 'Emagrecimento' | 'Força' | 'Resistência' | 'Definição';
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  durationWeeks: number;
  daysSplit: string;
  musclesTargeted: string[];
  days: {
    dayName: string;
    exercises: SpreadsheetWorkoutItem[];
  }[];
}

export const PRESET_SPREADSHEETS: PresetSpreadsheet[] = [
  {
    id: "sheet-1",
    name: "Hipertrofia Alpha (ABC 3x)",
    type: "Academia",
    objective: "Hipertrofia",
    level: "Intermediário",
    durationWeeks: 8,
    daysSplit: "A (Peito/Tríceps/Ombro), B (Costas/Bíceps/Antebraço), C (Pernas/Glúteos/Abs)",
    musclesTargeted: ["Peito", "Costas", "Bíceps", "Tríceps", "Ombro", "Pernas"],
    days: [
      {
        dayName: "Treino A - Peito, Ombro e Tríceps",
        exercises: [
          { exerciseId: "peito-1", sets: 4, reps: "8-10", restSecs: 90 },
          { exerciseId: "peito-2", sets: 4, reps: "10-12", restSecs: 90 },
          { exerciseId: "peito-5", sets: 3, reps: "12", restSecs: 60 },
          { exerciseId: "ombro-1", sets: 4, reps: "10", restSecs: 90 },
          { exerciseId: "ombro-2", sets: 4, reps: "12-15", restSecs: 60 },
          { exerciseId: "triceps-1", sets: 4, reps: "10-12", restSecs: 60 },
          { exerciseId: "triceps-3", sets: 3, reps: "10", restSecs: 90 }
        ]
      },
      {
        dayName: "Treino B - Costas e Bíceps",
        exercises: [
          { exerciseId: "costas-1", sets: 4, reps: "10-12", restSecs: 90 },
          { exerciseId: "costas-2", sets: 4, reps: "8-10", restSecs: 90 },
          { exerciseId: "costas-3", sets: 3, reps: "10-12", restSecs: 60 },
          { exerciseId: "ombro-5", sets: 3, reps: "12-15", restSecs: 60 },
          { exerciseId: "biceps-1", sets: 4, reps: "10", restSecs: 90 },
          { exerciseId: "biceps-2", sets: 3, reps: "12", restSecs: 60 },
          { exerciseId: "biceps-3", sets: 3, reps: "10-12", restSecs: 60 }
        ]
      },
      {
        dayName: "Treino C - Pernas, Glúteos e Abs",
        exercises: [
          { exerciseId: "pernas-1", sets: 4, reps: "8-12", restSecs: 120 },
          { exerciseId: "pernas-2", sets: 3, reps: "12-15", restSecs: 90 },
          { exerciseId: "pernas-3", sets: 3, reps: "15", restSecs: 60 },
          { exerciseId: "pernas-4", sets: 4, reps: "10-12", restSecs: 60 },
          { exerciseId: "gluteos-1", sets: 3, reps: "10-12", restSecs: 90 },
          { exerciseId: "abdomen-1", sets: 4, reps: "20", restSecs: 45 },
          { exerciseId: "abdomen-3", sets: 3, reps: "60 seg", restSecs: 45 }
        ]
      }
    ]
  },
  {
    id: "sheet-2",
    name: "Calistenia Spartan (Full Body)",
    type: "Calistenia",
    objective: "Resistência",
    level: "Iniciante",
    durationWeeks: 6,
    daysSplit: "Fullbody 3 dias na semana",
    musclesTargeted: ["Peito", "Costas", "Tríceps", "Bíceps", "Ombro", "Pernas", "Abdômen"],
    days: [
      {
        dayName: "Treino Integrado Calistênico",
        exercises: [
          { exerciseId: "calistenia-11", sets: 4, reps: "10-12", restSecs: 90 },
          { exerciseId: "peito-9", sets: 4, reps: "Submáximo", restSecs: 90 },
          { exerciseId: "peito-10", sets: 3, reps: "12-15", restSecs: 60 },
          { exerciseId: "calistenia-9", sets: 3, reps: "10", restSecs: 90 },
          { exerciseId: "triceps-10", sets: 3, reps: "Submáximo", restSecs: 60 },
          { exerciseId: "pernas-9", sets: 3, reps: "20 passos", restSecs: 90 },
          { exerciseId: "abdomen-3", sets: 3, reps: "45 seg", restSecs: 45 }
        ]
      }
    ]
  },
  {
    id: "sheet-3",
    name: "Força Bruta 5x5",
    type: "Academia",
    objective: "Força",
    level: "Avançado",
    durationWeeks: 12,
    daysSplit: "Divisão ABA/BAB alternando",
    musclesTargeted: ["Pernas", "Peito", "Costas", "Ombro", "Core"],
    days: [
      {
        dayName: "Treino A",
        exercises: [
          { exerciseId: "pernas-1", sets: 5, reps: "5", restSecs: 180 },
          { exerciseId: "peito-1", sets: 5, reps: "5", restSecs: 180 },
          { exerciseId: "costas-2", sets: 5, reps: "5", restSecs: 180 },
          { exerciseId: "triceps-6", sets: 3, reps: "8", restSecs: 90 },
          { exerciseId: "abdomen-6", sets: 3, reps: "10", restSecs: 90 }
        ]
      },
      {
        dayName: "Treino B",
        exercises: [
          { exerciseId: "pernas-1", sets: 5, reps: "5", restSecs: 180 },
          { exerciseId: "ombro-4", sets: 5, reps: "5", restSecs: 180 },
          { exerciseId: "costas-4", sets: 1, reps: "5", restSecs: 180 },
          { exerciseId: "calistenia-1", sets: 3, reps: "Submáximo", restSecs: 120 },
          { exerciseId: "abdomen-3", sets: 3, reps: "60 seg", restSecs: 60 }
        ]
      }
    ]
  },
  {
    id: "sheet-4",
    name: "Escultura Feminina Pro",
    type: "Academia",
    objective: "Definição",
    level: "Intermediário",
    durationWeeks: 10,
    daysSplit: "Membros Inferiores (A/C) e Membros Superiores (B)",
    musclesTargeted: ["Glúteos", "Pernas", "Ombro", "Costas", "Abdômen"],
    days: [
      {
        dayName: "Treino A - Coxas e Glúteos",
        exercises: [
          { exerciseId: "pernas-1", sets: 4, reps: "10-12", restSecs: 90 },
          { exerciseId: "pernas-5", sets: 3, reps: "10", restSecs: 90 },
          { exerciseId: "gluteos-1", sets: 4, reps: "10-12", restSecs: 90 },
          { exerciseId: "pernas-3", sets: 3, reps: "15", restSecs: 60 },
          { exerciseId: "gluteos-2", sets: 4, reps: "12", restSecs: 60 },
          { exerciseId: "gluteos-7", sets: 4, reps: "15", restSecs: 60 }
        ]
      },
      {
        dayName: "Treino B - Superiores e Abdômen",
        exercises: [
          { exerciseId: "costas-1", sets: 4, reps: "12", restSecs: 60 },
          { exerciseId: "ombro-2", sets: 4, reps: "15", restSecs: 60 },
          { exerciseId: "peito-2", sets: 3, reps: "12", restSecs: 60 },
          { exerciseId: "biceps-2", sets: 3, reps: "12", restSecs: 60 },
          { exerciseId: "triceps-2", sets: 3, reps: "12", restSecs: 60 },
          { exerciseId: "abdomen-1", sets: 4, reps: "20", restSecs: 45 },
          { exerciseId: "abdomen-2", sets: 4, reps: "15", restSecs: 45 }
        ]
      },
      {
        dayName: "Treino C - Foco em Posterior de Coxa e Glúteos",
        exercises: [
          { exerciseId: "pernas-6", sets: 4, reps: "10", restSecs: 90 },
          { exerciseId: "pernas-4", sets: 4, reps: "12", restSecs: 60 },
          { exerciseId: "gluteos-1", sets: 3, reps: "12", restSecs: 90 },
          { exerciseId: "gluteos-3", sets: 3, reps: "15", restSecs: 60 },
          { exerciseId: "pernas-11", sets: 4, reps: "20", restSecs: 45 }
        ]
      }
    ]
  },
  {
    id: "sheet-5",
    name: "Calistenia Beast Mode",
    type: "Calistenia",
    objective: "Hipertrofia",
    level: "Avançado",
    durationWeeks: 12,
    daysSplit: "Push, Pull, Legs Calistênico",
    musclesTargeted: ["Ombros", "Tríceps", "Peito", "Costas", "Bíceps", "Pernas", "Core"],
    days: [
      {
        dayName: "Dia 1 - Puxar (Pull)",
        exercises: [
          { exerciseId: "calistenia-1", sets: 5, reps: "Submáximo", restSecs: 120 },
          { exerciseId: "calistenia-3", sets: 4, reps: "3-5", restSecs: 150 },
          { exerciseId: "calistenia-15", sets: 4, reps: "Submáximo", restSecs: 90 },
          { exerciseId: "calistenia-11", sets: 4, reps: "12", restSecs: 90 },
          { exerciseId: "calistenia-4", sets: 4, reps: "8 seg", restSecs: 120 }
        ]
      },
      {
        dayName: "Dia 2 - Empurrar (Push)",
        exercises: [
          { exerciseId: "calistenia-2", sets: 4, reps: "12-15", restSecs: 90 },
          { exerciseId: "calistenia-7", sets: 4, reps: "6", restSecs: 120 },
          { exerciseId: "calistenia-13", sets: 3, reps: "10", restSecs: 90 },
          { exerciseId: "peito-11", sets: 3, reps: "15", restSecs: 90 },
          { exerciseId: "calistenia-12", sets: 4, reps: "10 seg", restSecs: 120 }
        ]
      },
      {
        dayName: "Dia 3 - Pernas e Core",
        exercises: [
          { exerciseId: "calistenia-10", sets: 4, reps: "6", restSecs: 90 },
          { exerciseId: "pernas-9", sets: 4, reps: "24 passos", restSecs: 90 },
          { exerciseId: "calistenia-14", sets: 3, reps: "8", restSecs: 120 },
          { exerciseId: "abdomen-8", sets: 3, reps: "12", restSecs: 90 },
          { exerciseId: "abdomen-10", sets: 3, reps: "30 seg", restSecs: 45 }
        ]
      }
    ]
  },
  {
    id: "sheet-6",
    name: "Emagrecimento Express",
    type: "Academia",
    objective: "Emagrecimento",
    level: "Iniciante",
    durationWeeks: 6,
    daysSplit: "Circuito Metabólico",
    musclesTargeted: ["Todo o Corpo", "Cardio", "Resistência"],
    days: [
      {
        dayName: "Circuito Queima de Gordura",
        exercises: [
          { exerciseId: "peito-9", sets: 3, reps: "12", restSecs: 45 },
          { exerciseId: "pernas-9", sets: 3, reps: "20 passos", restSecs: 45 },
          { exerciseId: "costas-5", sets: 3, reps: "12", restSecs: 45 },
          { exerciseId: "abdomen-1", sets: 3, reps: "20", restSecs: 30 },
          { exerciseId: "ombro-2", sets: 3, reps: "15", restSecs: 45 },
          { exerciseId: "abdomen-4", sets: 3, reps: "20", restSecs: 30 }
        ]
      }
    ]
  }
];
