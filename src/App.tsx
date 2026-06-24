/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import MobileFrame from "./components/MobileFrame";
import AuthScreen from "./components/AuthScreen";
import Dashboard from "./components/Dashboard";
import Spreadsheets from "./components/Spreadsheets";
import ExerciseLibrary from "./components/ExerciseLibrary";
import WorkoutAgenda from "./components/WorkoutAgenda";
import TimerStopwatch from "./components/TimerStopwatch";
import MyBody from "./components/MyBody";
import MyDiet from "./components/MyDiet";
import WeeklySpreadsheet from "./components/WeeklySpreadsheet";
import MaxAssistant from "./components/MaxAssistant";
import Calculators from "./components/Calculators";
import ProfileView from "./components/ProfileView";
import ActiveWorkoutSession from "./components/ActiveWorkoutSession";

import { Home, Dumbbell, Play, Timer as TimerIcon, BarChart2, Calendar, LayoutGrid, Award, ShieldAlert, X, Bell, Utensils, Sparkles, MessageSquare } from "lucide-react";
import { PresetSpreadsheet } from "./data/spreadsheets";

export default function App() {
  // --- USER AUTHENTICATION STATE ---
  const [user, setUser] = useState<{ email: string; name: string } | null>(() => {
    const stored = localStorage.getItem("fitplan_user");
    return stored ? JSON.parse(stored) : null;
  });

  // --- NAVIGATION TAB ROUTE ---
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [showMenuHub, setShowMenuHub] = useState(false);

  // --- APPLICATION GLOBAL STATES ---
  const [streak, setStreak] = useState<number>(() => {
    const stored = localStorage.getItem("fitplan_streak");
    return stored ? parseInt(stored, 10) : 3; // Default 3 days for motivation
  });

  const [activeSpreadsheet, setActiveSpreadsheet] = useState<PresetSpreadsheet | null>(() => {
    const stored = localStorage.getItem("fitplan_active_sheet");
    return stored ? JSON.parse(stored) : null;
  });

  const [customSpreadsheets, setCustomSpreadsheets] = useState<PresetSpreadsheet[]>(() => {
    const stored = localStorage.getItem("fitplan_custom_sheets");
    return stored ? JSON.parse(stored) : [];
  });

  const [completedWorkouts, setCompletedWorkouts] = useState<any[]>(() => {
    const stored = localStorage.getItem("fitplan_completed_workouts");
    return stored ? JSON.parse(stored) : [
      { id: "comp-1", name: "Treino A - Peito e Tríceps", date: "22/06/2026", durationMin: 45, exercisesCount: 7 },
      { id: "comp-2", name: "Treino B - Costas e Bíceps", date: "23/06/2026", durationMin: 50, exercisesCount: 7 }
    ];
  });

  const [scheduledDays, setScheduledDays] = useState<string[]>(() => {
    const stored = localStorage.getItem("fitplan_scheduled_days");
    return stored ? JSON.parse(stored) : ["Monday", "Wednesday", "Friday"]; // Default days
  });

  const [profileStats, setProfileStats] = useState(() => {
    const stored = localStorage.getItem("fitplan_profile_stats");
    return stored ? JSON.parse(stored) : { weight: 78, height: 175, objective: "Hipertrofia" };
  });

  // Active workout overlay trigger
  const [isActiveWorkoutActive, setIsActiveWorkoutActive] = useState(false);

  // Simulated push-notification toast banner state
  const [toastNotification, setToastNotification] = useState<{ title: string; message: string } | null>(null);

  // Save states to LocalStorage on change
  useEffect(() => {
    if (user) localStorage.setItem("fitplan_user", JSON.stringify(user));
    else localStorage.removeItem("fitplan_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("fitplan_streak", streak.toString());
  }, [streak]);

  useEffect(() => {
    if (activeSpreadsheet) localStorage.setItem("fitplan_active_sheet", JSON.stringify(activeSpreadsheet));
    else localStorage.removeItem("fitplan_active_sheet");
  }, [activeSpreadsheet]);

  useEffect(() => {
    localStorage.setItem("fitplan_custom_sheets", JSON.stringify(customSpreadsheets));
  }, [customSpreadsheets]);

  useEffect(() => {
    localStorage.setItem("fitplan_completed_workouts", JSON.stringify(completedWorkouts));
  }, [completedWorkouts]);

  useEffect(() => {
    localStorage.setItem("fitplan_scheduled_days", JSON.stringify(scheduledDays));
  }, [scheduledDays]);

  useEffect(() => {
    localStorage.setItem("fitplan_profile_stats", JSON.stringify(profileStats));
  }, [profileStats]);

  // --- CORE WORKFLOW HANDLERS ---
  const handleLoginSuccess = (email: string, name: string) => {
    setUser({ email, name });
    setCurrentTab("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentTab("home");
  };

  const handleSetActiveSpreadsheet = (sheet: PresetSpreadsheet) => {
    setActiveSpreadsheet(sheet);
  };

  const handleAddCustomSpreadsheet = (sheet: PresetSpreadsheet) => {
    setCustomSpreadsheets([sheet, ...customSpreadsheets]);
    setActiveSpreadsheet(sheet); // Auto-activate
  };

  const handleDeleteCustomSpreadsheet = (id: string) => {
    const updated = customSpreadsheets.filter(s => s.id !== id);
    setCustomSpreadsheets(updated);
    if (activeSpreadsheet?.id === id) {
      setActiveSpreadsheet(null);
    }
  };

  const handleToggleScheduleDay = (day: string) => {
    if (scheduledDays.includes(day)) {
      setScheduledDays(scheduledDays.filter(d => d !== day));
    } else {
      setScheduledDays([...scheduledDays, day]);
    }
  };

  const handleTriggerNotificationTest = (title: string, message: string) => {
    setToastNotification({ title, message });
    // Auto-dismiss after 6 seconds
    setTimeout(() => {
      setToastNotification(null);
    }, 6000);
  };

  const handleCompleteActiveWorkout = (workoutName: string, durationMin: number, exercisesCount: number) => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`;
    
    const newRecord = {
      id: `completed-wrk-${Date.now()}`,
      name: workoutName,
      date: formattedDate,
      durationMin,
      exercisesCount
    };

    setCompletedWorkouts([newRecord, ...completedWorkouts]);
    setStreak(prev => prev + 1); // Increment streak on completion!
    setIsActiveWorkoutActive(false);

    // Show achievement unlock alert if applicable!
    handleTriggerNotificationTest(
      "🏆 Treino Concluído!",
      `Parabéns por completar o ${workoutName}! Seu streak agora é de ${streak + 1} dias.`
    );
  };

  const handleUpdateProfileStats = (name: string, weight: number, height: number, objective: string) => {
    if (user) {
      setUser({ ...user, name });
    }
    setProfileStats({ weight, height, objective });
  };

  // Check if today is a scheduled day to display on Dashboard
  const getTodayScheduledWorkout = () => {
    const daysMap: { [key: number]: string } = {
      0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"
    };
    const todayDayOfWeek = daysMap[new Date().getDay()];
    
    if (scheduledDays.includes(todayDayOfWeek)) {
      if (activeSpreadsheet) {
        // Fetch matching day exercises
        const activeDayWorkout = activeSpreadsheet.days[0] || { dayName: "Treino Personalizado", exercises: [] };
        return {
          dayName: activeDayWorkout.dayName,
          exercisesCount: activeDayWorkout.exercises.length
        };
      } else {
        return {
          dayName: "Treino Geral Fullbody",
          exercisesCount: 4
        };
      }
    }
    return null;
  };

  // Calculate current weekly target completion counts
  const getWeeklyProgressData = () => {
    const target = Math.max(3, scheduledDays.length);
    // Count workouts completed in the last 7 days
    const completedThisWeek = completedWorkouts.filter(w => {
      try {
        const parts = w.date.split("/");
        const dateObj = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        const diffDays = (new Date().getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays <= 7;
      } catch (e) {
        return false;
      }
    }).length;

    return {
      completed: Math.min(target, completedThisWeek),
      target
    };
  };

  const handleNavigateFromDashboardShortcut = (tabId: string) => {
    setCurrentTab(tabId);
  };

  // Auth Screen check
  if (!user) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#0A0A0A]">
        
        {/* TOP STATUS BAR APPLET NOTIFICATION TOAST OVERLAY */}
        {toastNotification && (
          <div className="absolute top-4 left-4 right-4 bg-[#141414]/95 backdrop-blur-md border border-[#00FF7F]/30 p-4 rounded-2xl flex items-start gap-3 z-50 shadow-[0_15px_30px_rgba(0,0,0,0.5),_0_0_20px_rgba(0,255,127,0.05)] animate-slideDown">
            <div className="w-9 h-9 bg-[#00FF7F]/10 rounded-xl flex items-center justify-center border border-[#00FF7F]/20 shrink-0">
              <Bell className="w-5 h-5 text-[#00FF7F] animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-black text-white">{toastNotification.title}</h4>
              <p className="text-[10px] text-gray-400 mt-1 leading-normal">{toastNotification.message}</p>
            </div>
            <button
              onClick={() => setToastNotification(null)}
              className="text-gray-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ACTIVE WORKOUT PANEL */}
        {isActiveWorkoutActive && (
          <ActiveWorkoutSession
            activeSpreadsheet={activeSpreadsheet}
            onCompleteWorkout={handleCompleteActiveWorkout}
            onClose={() => setIsActiveWorkoutActive(false)}
          />
        )}

        {/* CURRENT SCREEN CONTENT */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentTab === "home" && (
            <Dashboard
              userName={user.name}
              streak={streak}
              weeklyProgress={getWeeklyProgressData()}
              activeSpreadsheet={activeSpreadsheet}
              scheduledToday={getTodayScheduledWorkout()}
              onNavigate={handleNavigateFromDashboardShortcut}
              onStartWorkout={() => setIsActiveWorkoutActive(true)}
              completedWorkoutsCount={completedWorkouts.length}
            />
          )}

          {currentTab === "spreadsheets" && (
            <Spreadsheets
              activeSpreadsheet={activeSpreadsheet}
              onSetActiveSpreadsheet={handleSetActiveSpreadsheet}
              customSpreadsheets={customSpreadsheets}
              onAddCustomSpreadsheet={handleAddCustomSpreadsheet}
              onDeleteCustomSpreadsheet={handleDeleteCustomSpreadsheet}
            />
          )}

          {currentTab === "exercises" && (
            <ExerciseLibrary />
          )}

          {currentTab === "timer" && (
            <TimerStopwatch />
          )}

          {currentTab === "schedule" && (
            <WorkoutAgenda
              streak={streak}
              completedWorkouts={completedWorkouts}
              scheduledDays={scheduledDays}
              onToggleScheduleDay={handleToggleScheduleDay}
              onTriggerNotificationTest={handleTriggerNotificationTest}
            />
          )}

          {currentTab === "progress" && (
            <MyBody />
          )}

          {currentTab === "diet" && (
            <MyDiet />
          )}

          {currentTab === "weekly_split" && (
            <WeeklySpreadsheet
              activeSpreadsheet={activeSpreadsheet}
              userObjective={profileStats.objective}
            />
          )}

          {currentTab === "max" && (
            <MaxAssistant />
          )}

          {currentTab === "calculators" && (
            <Calculators />
          )}

          {currentTab === "profile" && (
            <ProfileView
              userName={user.name}
              userEmail={user.email}
              onLogout={handleLogout}
              completedWorkoutsCount={completedWorkouts.length}
              streak={streak}
              onUpdateProfile={handleUpdateProfileStats}
              initialWeight={profileStats.weight}
              initialHeight={profileStats.height}
              initialObjective={profileStats.objective}
            />
          )}
        </div>

        {/* MENU HUB EXPANDED OVERLAY */}
        {showMenuHub && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-45 flex flex-col justify-end animate-fadeIn">
            
            {/* Click outside to close */}
            <div className="flex-1" onClick={() => setShowMenuHub(false)}></div>

            {/* Hub Sheet */}
            <div className="bg-[#121212] rounded-t-3xl border-t border-white/5 p-6 space-y-6 max-h-[70%] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-[#00FF7F]" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">Painel FitPlan Pro</h3>
                </div>
                <button
                  onClick={() => setShowMenuHub(false)}
                  className="p-1 bg-black/30 rounded-full border border-white/5"
                >
                  <X className="w-4 h-4 text-gray-500 hover:text-white" />
                </button>
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-2 gap-3.5">
                
                {/* Assistente Max */}
                <button
                  onClick={() => {
                    setCurrentTab("max");
                    setShowMenuHub(false);
                  }}
                  className="p-4 bg-black/50 border border-white/5 rounded-2xl flex flex-col items-start hover:border-[#00FF7F]/30 transition-all text-left"
                >
                  <div className="p-2 bg-zinc-900 rounded-lg text-[#00FF7F] mb-3">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-white">Coach Virtual Max</span>
                  <span className="text-[9px] text-gray-500 mt-0.5">Chat, Dicas & Execução</span>
                </button>

                {/* Minha Dieta */}
                <button
                  onClick={() => {
                    setCurrentTab("diet");
                    setShowMenuHub(false);
                  }}
                  className="p-4 bg-black/50 border border-white/5 rounded-2xl flex flex-col items-start hover:border-[#00FF7F]/30 transition-all text-left"
                >
                  <div className="p-2 bg-zinc-900 rounded-lg text-[#00FF7F] mb-3">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-white">Minha Dieta</span>
                  <span className="text-[9px] text-gray-500 mt-0.5">Macros & Pratos Gerados</span>
                </button>

                {/* Planilha Semanal */}
                <button
                  onClick={() => {
                    setCurrentTab("weekly_split");
                    setShowMenuHub(false);
                  }}
                  className="p-4 bg-black/50 border border-white/5 rounded-2xl flex flex-col items-start hover:border-[#00FF7F]/30 transition-all text-left"
                >
                  <div className="p-2 bg-zinc-900 rounded-lg text-[#00FF7F] mb-3">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-white">Planilha Semanal</span>
                  <span className="text-[9px] text-gray-500 mt-0.5">Cronograma de Seg a Dom</span>
                </button>

                {/* Agenda */}
                <button
                  onClick={() => {
                    setCurrentTab("schedule");
                    setShowMenuHub(false);
                  }}
                  className="p-4 bg-black/50 border border-white/5 rounded-2xl flex flex-col items-start hover:border-[#00FF7F]/30 transition-all text-left"
                >
                  <div className="p-2 bg-zinc-900 rounded-lg text-[#00FF7F] mb-3">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-white">Dias de Treino</span>
                  <span className="text-[9px] text-gray-500 mt-0.5">Configurar Dias Úteis</span>
                </button>

                {/* Progresso / Meu Corpo */}
                <button
                  onClick={() => {
                    setCurrentTab("progress");
                    setShowMenuHub(false);
                  }}
                  className="p-4 bg-black/50 border border-white/5 rounded-2xl flex flex-col items-start hover:border-[#00FF7F]/30 transition-all text-left"
                >
                  <div className="p-2 bg-zinc-900 rounded-lg text-[#00FF7F] mb-3">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-white">Meu Corpo</span>
                  <span className="text-[9px] text-gray-500 mt-0.5">Histórico, Gráficos & Fotos</span>
                </button>

                {/* Calculadoras */}
                <button
                  onClick={() => {
                    setCurrentTab("calculators");
                    setShowMenuHub(false);
                  }}
                  className="p-4 bg-black/50 border border-white/5 rounded-2xl flex flex-col items-start hover:border-[#00FF7F]/30 transition-all text-left"
                >
                  <div className="p-2 bg-zinc-900 rounded-lg text-[#00FF7F] mb-3">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-white">Calculadoras</span>
                  <span className="text-[9px] text-gray-500 mt-0.5">IMC, Calorias & Macros</span>
                </button>

                {/* Perfil */}
                <button
                  onClick={() => {
                    setCurrentTab("profile");
                    setShowMenuHub(false);
                  }}
                  className="p-4 bg-black/50 border border-white/5 rounded-2xl flex flex-col items-start hover:border-[#00FF7F]/30 transition-all text-left"
                >
                  <div className="p-2 bg-zinc-900 rounded-lg text-[#00FF7F] mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-white">Minha Conta</span>
                  <span className="text-[9px] text-gray-500 mt-0.5">Estatísticas & Cadastro</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION TABS BAR */}
        <div className="h-16 bg-[#121212]/95 border-t border-white/5 px-4 flex items-center justify-between z-30 select-none backdrop-blur-sm">
          
          {/* Home */}
          <button
            onClick={() => {
              setCurrentTab("home");
              setShowMenuHub(false);
            }}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
              currentTab === "home" ? "text-[#00FF7F]" : "text-gray-500"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase mt-1 tracking-wider">Home</span>
          </button>

          {/* Spreadsheets */}
          <button
            onClick={() => {
              setCurrentTab("spreadsheets");
              setShowMenuHub(false);
            }}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
              currentTab === "spreadsheets" ? "text-[#00FF7F]" : "text-gray-500"
            }`}
          >
            <Dumbbell className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase mt-1 tracking-wider">Treinos</span>
          </button>

          {/* Quick Start Floating action */}
          <button
            onClick={() => setIsActiveWorkoutActive(true)}
            className="w-11 h-11 bg-[#00FF7F] hover:bg-[#00E572] rounded-full flex items-center justify-center text-black shadow-[0_0_15px_rgba(0,255,127,0.3)] transform -translate-y-2 select-none active:scale-90 transition-all border-4 border-[#0a0a0a]"
          >
            <Play className="w-4 h-4 fill-black ml-0.5" />
          </button>

          {/* Exercises Library */}
          <button
            onClick={() => {
              setCurrentTab("exercises");
              setShowMenuHub(false);
            }}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
              currentTab === "exercises" ? "text-[#00FF7F]" : "text-gray-500"
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase mt-1 tracking-wider">Guias</span>
          </button>

          {/* Menu Hub Trigger */}
          <button
            onClick={() => setShowMenuHub(true)}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
              showMenuHub ? "text-[#00FF7F]" : "text-gray-500"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase mt-1 tracking-wider">Mais</span>
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}
