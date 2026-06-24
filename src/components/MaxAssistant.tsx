import React, { useState, useEffect, useRef } from "react";
import { Send, User, Bot, Dumbbell, Sparkles, AlertCircle, RefreshCw, Flame, Lightbulb, Zap } from "lucide-react";
import { Exercise } from "../data/exercises";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

interface MaxAssistantProps {
  embeddedExercise?: Exercise | null;
  onCloseEmbedded?: () => void;
}

export function getLocalCoaching(exerciseName: string, category: string, primaryMuscles: string[], secondaryMuscles: string[]) {
  return `### **Execução Passo a Passo**
1. **Posicionamento Inicial**: Posicione-se firmemente com apoio adequado. Mantenha os pés bem plantados e o abdômen rígido (core ativo) para dar estabilidade.
2. **Fase Excêntrica (Descida/Alongamento)**: Controle a descida do peso ou do seu próprio corpo inspirando pelo nariz. Leve cerca de 2 a 3 segundos para completar essa fase. Sinta as fibras musculares alongando.
3. **Ponto Crítico**: Evite o rebote e impulsos mecânicos. Faça uma micro-pausa controlada no ponto de maior alongamento.
4. **Fase Concêntrica (Subida/Contração)**: Empurre ou puxe de forma explosiva contra a gravidade, soltando o ar pela boca. Concentre toda a força no músculo alvo.
5. **Pico de Contração**: Aperte a musculatura no topo do movimento por 1 segundo inteiro antes de iniciar a descida controlada.

### **Músculos Ativados**
* **Músculo Alvo Principal**: ${primaryMuscles.join(", ")}. Esse grupo absorve mais de 70% da tensão mecânica gerada.
* **Sinergistas/Estabilizadores**: ${secondaryMuscles.length > 0 ? secondaryMuscles.join(", ") : "Estabilizadores do tronco e core"}. Auxiliam a manter a trajetória correta e previnem lesões articulares.

### **Erros Mais Comuns e Como Evitar**
1. **Perda de Cadência**: Despencar a carga na descida. *Como evitar*: Faça a excêntrica contando mentalmente até 3. O músculo cresce muito na descida!
2. **Roubo com o Quadril/Tronco**: Balançar o corpo para mover a carga. *Como evitar*: Cole as costas no banco ou estabilize os cotovelos. Se precisar balançar, reduza a carga em 10%.
3. **Amplitude de Meio-Movimento**: Encurtar a descida por ego de carga. *Como evitar*: Realize o curso completo do movimento. Amplitude máxima gera hipertrofia até 2x maior.

### **Dicas para Aumentar a Carga com Segurança**
* **Regra das 2 Repetições**: Se você conseguir realizar 2 repetições a mais do que sua meta na última série por dois treinos seguidos, aumente a carga em 2% a 5% no próximo treino.
* **Aquecimento Específico**: Faça uma série de 10 repetições com metade do peso de treino antes de começar as séries de trabalho para lubrificar as articulações e recrutar fibras nervosas.

### **Variações do Exercício**
* **Para Iniciantes**: Executar a variação articulada em máquina ou com cabos, garantindo segurança na trajetória do movimento e diminuindo riscos de falhas.
* **Para Avançados**: Adicionar técnicas de alta intensidade como *Myo-Reps*, *Rest-Pause* (descanso de 15 segundos na falha e mais 3-4 reps) ou *Excêntricas Lentas* de 5 segundos.`;
}

export default function MaxAssistant({ embeddedExercise, onCloseEmbedded }: MaxAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseCoaching, setExerciseCoaching] = useState<string>("");
  const [loadingCoaching, setLoadingCoaching] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          text: "E aí campeão! Eu sou o Max, seu personal trainer virtual. Sou direto, focado em resultado e não aceito desculpas! Estou aqui para ajustar sua execução, tirar dúvidas técnicas e te puxar para o próximo nível. Sem moleza! \n\nO que vamos esmagar hoje? Digite sua dúvida sobre treinos, cargas ou dieta!",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Handle embedded exercise explaining triggered on open
  useEffect(() => {
    if (embeddedExercise) {
      setLoadingCoaching(true);
      setExerciseCoaching("");

      // Attempt server explain
      fetch("/api/explain-exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseName: embeddedExercise.name,
          category: embeddedExercise.category,
          description: embeddedExercise.description,
          tips: embeddedExercise.tips
        })
      })
        .then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(data => {
          if (data.explanation) {
            setExerciseCoaching(data.explanation);
          } else {
            // Local fallback
            setExerciseCoaching(getLocalCoaching(
              embeddedExercise.name,
              embeddedExercise.category,
              embeddedExercise.primaryMuscles,
              embeddedExercise.secondaryMuscles
            ));
          }
        })
        .catch(() => {
          setExerciseCoaching(getLocalCoaching(
            embeddedExercise.name,
            embeddedExercise.category,
            embeddedExercise.primaryMuscles,
            embeddedExercise.secondaryMuscles
          ));
        })
        .finally(() => {
          setLoadingCoaching(false);
        });
    }
  }, [embeddedExercise]);

  // Scroll to bottom on messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsgText = input;
    setInput("");

    const newUserMsg: Message = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      text: userMsgText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat-max", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsgText,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) throw new Error();

      const data = await response.json();
      
      const coachMsg: Message = {
        id: `msg-${Date.now()}-coach`,
        role: "model",
        text: data.text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, coachMsg]);
    } catch (err) {
      // Offline / error fallback response
      setTimeout(() => {
        const fallbackResponses = [
          "Bora campeão! A chave é manter a carga sob tensão constante. Reduz esse descanso e foca na contração!",
          "Musculação é paciência e consistência. Não adianta inventar moda, o arroz com feijão bem feito (supino, agachamento, terra, puxadas) constrói 90% do seu físico!",
          "Dieta alinhada e sono regenerador são fundamentais. Se você não dorme pelo menos 7 a 8 horas por dia, sua recuperação muscular cai pela metade. Ajusta isso!",
          "Para ganhar massa muscular (hipertrofia), você precisa comer mais calorias do que gasta, mantendo pelo menos 1.6g a 2.2g de proteína por kg de peso corporal. Foco no plano!",
          "Se o exercício está fácil na última repetição, a carga está leve! Você precisa treinar próximo à falha concêntrica para estimular a síntese de novas fibras musculares. Aumenta esse peso com segurança!"
        ];
        const randomAnswer = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        
        const coachMsg: Message = {
          id: `msg-${Date.now()}-coach`,
          role: "model",
          text: `[Coach Max]: ${randomAnswer}\n\n*(Nota: O servidor de IA está operando em modo de resposta autônoma local)*`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, coachMsg]);
      }, 800);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0A0A0A] text-white">
      {/* Exercise Coach Mode Explainer Detail Popup */}
      {embeddedExercise && (
        <div className="border-b border-white/5 bg-[#121212]/80 backdrop-blur-md p-4 space-y-4 animate-fadeIn shrink-0 max-h-[50%] overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-[#00FF7F]" />
              <div>
                <span className="text-[9px] text-[#00FF7F] font-bold uppercase tracking-wider">MÓDULO TÉCNICO EXCLUSIVO</span>
                <h3 className="text-sm font-black text-white leading-tight">Coach Max Explica: {embeddedExercise.name}</h3>
              </div>
            </div>
            {onCloseEmbedded && (
              <button
                onClick={onCloseEmbedded}
                className="bg-zinc-800 text-gray-400 hover:text-white px-2.5 py-1 text-[10px] font-black rounded-lg transition-colors border border-white/5 uppercase"
              >
                Fechar Guia
              </button>
            )}
          </div>

          {loadingCoaching ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2 text-xs text-gray-500 font-bold">
              <RefreshCw className="w-5 h-5 animate-spin text-[#00FF7F]" />
              <span>Max está analisando a mecânica do movimento...</span>
            </div>
          ) : (
            <div className="text-xs text-gray-300 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5 space-y-3 prose prose-invert max-w-none">
              {exerciseCoaching.split("\n\n").map((para, pIdx) => {
                if (para.startsWith("###")) {
                  return (
                    <h4 key={pIdx} className="text-[#00FF7F] font-black text-xs uppercase tracking-wide border-b border-white/5 pb-1 mt-4 first:mt-0 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      {para.replace(/###\s*/, "")}
                    </h4>
                  );
                }
                if (para.startsWith("*") || para.startsWith("-") || para.match(/^\d+\./)) {
                  return (
                    <ul key={pIdx} className="list-disc pl-4 space-y-1 mt-2">
                      {para.split("\n").map((line, lIdx) => (
                        <li key={lIdx} className="text-gray-300">
                          {line.replace(/^[\s*\-\d\.]+\s*/, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return <p key={pIdx} className="mt-2 text-gray-300">{para}</p>;
              })}
            </div>
          )}
        </div>
      )}

      {/* Standalone Chat Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-[85%] ${
              m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar icon */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${
              m.role === "user" 
                ? "bg-zinc-800 border-white/10 text-white" 
                : "bg-[#00FF7F]/10 border-[#00FF7F]/20 text-[#00FF7F]"
            }`}>
              {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className={`rounded-2xl p-3.5 text-xs leading-relaxed ${
              m.role === "user"
                ? "bg-zinc-900 border border-white/5 text-white"
                : "bg-[#121212] border border-[#00FF7F]/10 text-gray-200"
            }`}>
              {m.role === "model" && m.id === "welcome" && (
                <div className="flex items-center gap-1.5 mb-2 bg-[#00FF7F]/5 border border-[#00FF7F]/15 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase text-[#00FF7F] tracking-wide w-fit">
                  <Flame className="w-3.5 h-3.5 fill-[#00FF7F]" />
                  <span>Personal Pro Ativo</span>
                </div>
              )}
              <p className="whitespace-pre-line font-medium">{m.text}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 max-w-[85%] mr-auto">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center border bg-[#00FF7F]/10 border-[#00FF7F]/20 text-[#00FF7F] shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF7F] animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF7F] animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF7F] animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat input form */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/5 bg-[#121212] flex gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte sobre exercícios, cargas, repetições..."
          className="flex-1 bg-black border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white placeholder-gray-500 outline-none focus:border-[#00FF7F]/40"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-[#00FF7F] hover:bg-[#00E572] disabled:opacity-50 text-black font-extrabold px-4 py-3 rounded-xl flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,255,127,0.1)]"
          disabled={isLoading || !input.trim()}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
