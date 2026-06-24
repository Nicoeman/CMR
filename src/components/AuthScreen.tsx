/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, Key, Mail, Sparkles, LogIn, ArrowRight, ExternalLink } from "lucide-react";

interface AuthScreenProps {
  onLoginSuccess: (email: string, userName: string) => void;
  userEmail?: string;
}

export default function AuthScreen({ onLoginSuccess, userEmail }: AuthScreenProps) {
  const [email, setEmail] = useState(userEmail || "ne9504371@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showBlockedScreen, setShowBlockedScreen] = useState(false);
  const [isDeveloperOpen, setIsDeveloperOpen] = useState(true);

  // Initial whitelisted emails
  const [whitelist, setWhitelist] = useState<string[]>([
    "ne9504371@gmail.com", // User's email from metadata
    "admin@fitplan.com",
    "demo@fitplan.com",
    "aluno@fitplan.com",
    "lucas@fitplan.com",
    "marcos@fitplan.com",
    "mariana@fitplan.com"
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Por favor, insira o seu e-mail.");
      return;
    }

    const cleanedEmail = email.trim().toLowerCase();
    
    // Check if email is in the whitelist
    if (whitelist.includes(cleanedEmail)) {
      // Determine default name
      let finalName = name.trim();
      if (!finalName) {
        if (cleanedEmail === "ne9504371@gmail.com") finalName = "Atleta";
        else if (cleanedEmail.includes("@")) {
          const part = cleanedEmail.split("@")[0];
          finalName = part.charAt(0).toUpperCase() + part.slice(1);
        } else {
          finalName = "Atleta";
        }
      }
      onLoginSuccess(cleanedEmail, finalName);
    } else {
      // Not whitelisted -> show payment redirect block
      setShowBlockedScreen(true);
    }
  };

  const handleGoogleLogin = () => {
    // Simulated Google Sign-In with predefined userEmail
    if (userEmail) {
      setEmail(userEmail);
    }
    const targetEmail = email.trim().toLowerCase() || "ne9504371@gmail.com";
    if (whitelist.includes(targetEmail)) {
      onLoginSuccess(targetEmail, "Atleta FitPlan");
    } else {
      setShowBlockedScreen(true);
    }
  };

  const handleSimulatePayment = () => {
    // For developer testing, add the current email to whitelist and login
    const targetEmail = email.trim().toLowerCase();
    if (!whitelist.includes(targetEmail)) {
      setWhitelist([...whitelist, targetEmail]);
    }
    setShowBlockedScreen(false);
    onLoginSuccess(targetEmail, name.trim() || "Atleta Convidado");
  };

  if (showBlockedScreen) {
    return (
      <div className="flex flex-col justify-between min-h-screen bg-[#0A0A0A] text-white p-6 relative overflow-hidden font-sans">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#00FF7F_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none"></div>

        {/* Header Blocked */}
        <div className="flex flex-col items-center text-center mt-12 z-10">
          <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/30 mb-6 animate-pulse">
            <ShieldAlert className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase md:text-3xl">
            Acesso <span className="text-amber-400">Pendente</span>
          </h1>
          <p className="text-gray-400 text-sm mt-3 max-w-sm">
            O e-mail <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded">{email}</span> não possui uma licença ativa do FitPlan Pro.
          </p>
        </div>

        {/* Core Sales Pitch inside Blocked Card */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 my-6 z-10 relative">
          <div className="absolute -top-3 left-6 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Exclusivo FitPlan Pro
          </div>
          
          <h3 className="font-bold text-white text-base mb-3">Ativação de Conta Vitalícia</h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-4">
            O FitPlan Pro é um aplicativo fechado para alunos e membros autorizados. Adquira seu acesso na nossa página de pagamento para liberar imediatamente as planilhas completas e calculators.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-[#00FF7F] text-xs">✓</span>
              <p className="text-gray-300 text-xs">Biblioteca com +100 Exercícios com execução guiada</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#00FF7F] text-xs">✓</span>
              <p className="text-gray-300 text-xs">Planilhas profissionais de Academia e Calistenia</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#00FF7F] text-xs">✓</span>
              <p className="text-gray-300 text-xs">Agenda, Cronômetros de Descanso e Histórico</p>
            </div>
          </div>

          <a
            href="https://checkout.fitplanpro.com/pay"
            target="_blank"
            rel="noopener noreferrer"
            id="btn-external-checkout"
            className="w-full bg-[#00FF7F] hover:bg-[#00E572] text-black font-extrabold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform active:scale-98 shadow-[0_0_20px_rgba(0,255,127,0.2)]"
          >
            <span>Ativar Meu Acesso Vitalício</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Interactive Simulator for Tester/Reviewer convenience */}
        <div className="bg-[#1E1E1E] border border-[#00FF7F]/20 rounded-2xl p-4 mb-6 z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF7F] animate-ping"></span>
            <span className="text-[11px] uppercase font-bold text-[#00FF7F] tracking-widest">Painel Simulador (Reviewer)</span>
          </div>
          <p className="text-[11px] text-gray-400 mb-3">
            Para testar e avaliar todas as telas do aplicativo sem pagar nada, clique abaixo para simular a aprovação de pagamento deste e-mail.
          </p>
          <button
            onClick={handleSimulatePayment}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-[#00FF7F]" />
            <span>Simular Liberação de E-mail Gratuitamente</span>
          </button>
        </div>

        {/* Back and Footer */}
        <div className="text-center z-10 mb-4">
          <button
            onClick={() => setShowBlockedScreen(false)}
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            ← Voltar para a tela de Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#0A0A0A] text-white p-6 relative overflow-hidden font-sans">
      {/* Visual Background Accent */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#00FF7F]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#00FF7F]/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Banner/Logo */}
      <div className="flex flex-col items-center mt-12 z-10 text-center">
        <div className="flex items-center justify-center w-14 h-14 bg-black border border-[#00FF7F] rounded-2xl mb-4 shadow-[0_0_15px_rgba(0,255,127,0.15)]">
          <span className="text-[#00FF7F] font-black text-2xl tracking-tighter">FP</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight uppercase">
          FitPlan <span className="text-[#00FF7F]">Pro</span>
        </h1>
        <p className="text-xs text-gray-400 font-medium tracking-wide mt-1">
          PLANILHAS DE TREINO EXCLUSIVAS & CALISTENIA
        </p>
      </div>

      {/* Login Form Container */}
      <div className="w-full max-w-sm mx-auto my-auto z-10 mt-8 mb-8">
        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">
              {isRegistering ? "Criar Conta" : "Fazer Login"}
            </h2>
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setErrorMessage("");
              }}
              className="text-xs text-[#00FF7F] font-bold hover:underline"
            >
              {isRegistering ? "Entrar com Conta" : "Criar nova conta"}
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Seu Nome
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Lucas Silva"
                    className="w-full bg-black border border-white/10 focus:border-[#00FF7F]/50 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                E-mail Cadastrado
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full bg-black border border-white/10 focus:border-[#00FF7F]/50 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 outline-none transition-colors font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha secreta"
                  className="w-full bg-black border border-white/10 focus:border-[#00FF7F]/50 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 outline-none transition-colors font-mono"
                  required
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-400 text-xs font-semibold bg-red-400/10 py-2 px-3 rounded-lg border border-red-400/20">
                ⚠️ {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#00FF7F] hover:bg-[#00E572] text-black font-extrabold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform active:scale-98 shadow-[0_0_15px_rgba(0,255,127,0.1)]"
            >
              <span>{isRegistering ? "Cadastrar & Acessar" : "Entrar no FitPlan Pro"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social login separator */}
          <div className="relative my-6 text-center">
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-white/5"></span>
            <span className="relative bg-[#121212] px-3 text-xs text-gray-500 font-semibold uppercase tracking-widest">Ou acesse com</span>
          </div>

          {/* Google Login button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.94 1 12 1 7.24 1 3.2 3.76 1.24 7.8l3.84 2.98C6.04 7.22 8.78 5.04 12 5.04z"
              />
              <path
                fill="#4285F4"
                d="M23.52 12.27c0-.8-.08-1.56-.22-2.27H12v4.51h6.48c-.28 1.48-1.12 2.73-2.38 3.58l3.71 2.88c2.17-2 3.71-4.94 3.71-8.7z"
              />
              <path
                fill="#FBBC05"
                d="M5.08 10.78c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28L1.24 7.24C.44 8.84 0 10.61 0 12.5s.44 3.66 1.24 5.26l3.84-2.98z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.71-2.88c-1.03.69-2.35 1.1-4.25 1.1-3.22 0-5.96-2.18-6.93-5.11l-3.84 2.98C3.2 19.24 7.24 23 12 23z"
              />
            </svg>
            <span>Login Rápido com Google / Gmail</span>
          </button>
        </div>
      </div>

      {/* Developer Tool: Whitelist Viewer & Simulator */}
      <div className="w-full max-w-sm mx-auto z-10 border border-white/5 rounded-2xl bg-[#141414] overflow-hidden mb-8 transition-all duration-300">
        <button
          onClick={() => setIsDeveloperOpen(!isDeveloperOpen)}
          className="w-full bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] uppercase tracking-wider py-2.5 px-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF7F]"></span>
            <span>Simulador de E-mails Autorizados</span>
          </div>
          <span>{isDeveloperOpen ? "Fechar ▲" : "Abrir ▼"}</span>
        </button>

        {isDeveloperOpen && (
          <div className="p-4 space-y-3">
            <p className="text-[10px] text-gray-400">
              O FitPlan Pro exige que o e-mail esteja na lista de autorizados. Abaixo estão os e-mails liberados de teste:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {whitelist.map((whitelistedEmail) => (
                <button
                  key={whitelistedEmail}
                  onClick={() => {
                    setEmail(whitelistedEmail);
                    setPassword("••••••••");
                  }}
                  className={`text-[10px] font-mono px-2 py-1 rounded transition-all flex items-center gap-1 ${
                    email.toLowerCase() === whitelistedEmail
                      ? "bg-[#00FF7F]/20 text-[#00FF7F] border border-[#00FF7F]/40"
                      : "bg-white/5 hover:bg-white/10 text-gray-300"
                  }`}
                >
                  {whitelistedEmail}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Liberar outro e-mail..."
                className="bg-black text-[10px] px-2 py-1.5 rounded flex-1 outline-none text-white border border-white/10 font-mono"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const inputEmail = e.currentTarget.value.trim().toLowerCase();
                    if (inputEmail && !whitelist.includes(inputEmail)) {
                      setWhitelist([...whitelist, inputEmail]);
                      setEmail(inputEmail);
                      e.currentTarget.value = "";
                    }
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  const inputEmail = input.value.trim().toLowerCase();
                  if (inputEmail && !whitelist.includes(inputEmail)) {
                    setWhitelist([...whitelist, inputEmail]);
                    setEmail(inputEmail);
                    input.value = "";
                  }
                }}
                className="bg-[#00FF7F] text-black font-bold text-[9px] px-2 rounded hover:bg-[#00E572]"
              >
                Adicionar
              </button>
            </div>
            <p className="text-[9px] text-gray-500 italic">
              * Clique em um e-mail da lista para preenchê-lo instantaneamente e testar o acesso livre! Qualquer outro e-mail causará bloqueio para demonstrar o fluxo de vendas.
            </p>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="text-center z-10 mb-4 text-xs text-gray-600 font-medium">
        FitPlan Pro © {new Date().getFullYear()} • Plataforma Fechada
      </div>
    </div>
  );
}
