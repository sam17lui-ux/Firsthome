"use client";

import {
  Home,
  ArrowRight,
  Clock,
  MessageSquare,
  FolderOpen,
  Search,
  Handshake,
  Scale,
  ClipboardCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { ChatEntryPoint } from "@/components/chat-entry-point";

interface OnboardingScreenProps {
  onBegin: () => void;
  onOpenLogin?: () => void;
  onLogout?: () => void;
  onNavigateToAccount?: () => void;
  userEmail?: string | null;
  onNavigate?: (screen: string) => void;
}

const JOURNEY_STAGES = [
  { label: "House Hunting", icon: Search },
  { label: "Making an Offer", icon: Handshake },
  { label: "Legal & Conveyancing", icon: Scale },
  { label: "Surveys", icon: ClipboardCheck },
  { label: "Moving Day", icon: Truck },
];

const PAIN_CARDS = [
  {
    icon: Clock,
    iconClass: "text-blue-400",
    cardClass: "border-blue-500/20",
    title: "It takes forever",
    subtext:
      "3–9 months is normal. We help you see what's happening and what's next, even when nothing's moving.",
  },
  {
    icon: MessageSquare,
    iconClass: "text-purple-400",
    cardClass: "border-purple-500/20",
    title: "Nobody tells you what's going on",
    subtext:
      "We break down each step in plain English, so you always know where you stand.",
  },
  {
    icon: FolderOpen,
    iconClass: "text-emerald-400",
    cardClass: "border-emerald-500/20",
    title: "Everything lives in different places",
    subtext:
      "Track progress, notes, and questions in one place, no more scattered emails.",
  },
];

export function OnboardingScreen({ onBegin, onOpenLogin, onLogout, onNavigateToAccount, userEmail, onNavigate }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {(onOpenLogin || onLogout) && (
        <header className="shrink-0 flex justify-end items-center gap-3 px-6 py-4">
          {userEmail ? (
            <>
              <button
                type="button"
                onClick={onNavigateToAccount}
                className="text-sm text-gray-300 hover:text-white truncate max-w-[160px] text-left"
                title={userEmail}
              >
                {userEmail}
              </button>
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Log out
                </button>
              )}
            </>
          ) : (
            onOpenLogin && (
              <button
                type="button"
                onClick={onOpenLogin}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                Log in
              </button>
            )
          )}
        </header>
      )}
      <div className="flex-1 flex flex-col">
        {/* Hero */}
        <section className="flex flex-col items-center text-center px-6 pt-16 pb-16">
          <div className="max-w-2xl mx-auto w-full space-y-10">
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Home className="w-8 h-8 text-white" />
              </div>
              <span className="text-xl text-white font-medium tracking-wide">FirstHome</span>
            </div>

            <h1 className="text-3xl md:text-4xl leading-tight text-white font-medium text-balance">
              Buying your first home shouldn&apos;t feel like a mystery.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl mx-auto">
              Track your progress, understand what&apos;s happening in plain English, and stay organised.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                onClick={onBegin}
                className="w-full sm:w-auto min-w-[180px] h-12 text-base bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                Start your journey
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => onNavigate?.("guides")}
                variant="outline"
                className="w-full sm:w-auto min-w-[180px] h-12 text-base border border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800/50 hover:text-slate-200 hover:border-slate-500 rounded-xl"
              >
                Explore the guides
              </Button>
            </div>
          </div>
        </section>

        {/* Journey overview */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-6 text-center">Your journey</p>
            <div className="flex items-center justify-center overflow-x-auto">
              <div className="flex items-center shrink-0">
                {JOURNEY_STAGES.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isFirst = idx === 0;
                  return (
                    <div key={stage.label} className="flex items-center">
                      <div className={`flex items-center gap-2 rounded-lg px-3 py-2 border bg-slate-800/40 hover:border-slate-600/60 transition-colors shrink-0 ${isFirst ? "border-blue-500/30" : "border-slate-700/60"}`}>
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isFirst ? "text-blue-400" : "text-slate-500"}`} aria-hidden />
                        <span className="text-sm text-slate-300 whitespace-nowrap">{stage.label}</span>
                      </div>
                      {idx < JOURNEY_STAGES.length - 1 && (
                        <div className="w-4 h-px bg-slate-600/50 mx-1 flex-shrink-0" aria-hidden />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Problem cards */}
        <section className="px-6 pb-20">
          <div className="max-w-2xl mx-auto space-y-6">
            {PAIN_CARDS.map(({ icon: Icon, iconClass, cardClass, title, subtext }) => (
              <div
                key={title}
                className={`border rounded-xl p-6 flex gap-5 bg-slate-800/40 ${cardClass}`}
              >
                <Icon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${iconClass}`} aria-hidden />
                <div>
                  <h3 className="text-white font-medium mb-1.5">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What you get */}
        <section className="px-6 pb-24">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-xl font-semibold text-white">
              What you get
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
              Built for UK first-time buyers. Designed to work alongside your solicitor, not replace them.
            </p>
          </div>
        </section>
      </div>

      <Footer onNavigate={onNavigate} />
      {onNavigate && <ChatEntryPoint onOpenChat={() => onNavigate("chat")} />}
    </div>
  );
}
