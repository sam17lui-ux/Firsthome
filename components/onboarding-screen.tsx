"use client";

import {
  Home,
  ArrowRight,
  Clock,
  MessageSquare,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

interface OnboardingScreenProps {
  onBegin: () => void;
  onOpenLogin?: () => void;
  userEmail?: string | null;
  onNavigate?: (screen: string) => void;
}

const JOURNEY_STAGES = [
  { id: "get-ready", label: "Get Ready", status: "active" as const, icon: CheckCircle2 },
  { id: "make-offer", label: "Make an Offer", status: "completed" as const, icon: CheckCircle2 },
  { id: "completion", label: "Completion", status: "upcoming" as const },
];

const PAIN_CARDS = [
  {
    icon: Clock,
    iconClass: "text-blue-400",
    title: "It takes forever",
    subtext:
      "3–9 months is normal. We help you see what's happening and what's next — even when nothing's moving.",
  },
  {
    icon: MessageSquare,
    iconClass: "text-purple-400",
    title: "Nobody tells you what's going on",
    subtext:
      "We break down each step in plain English, so you always know where you stand.",
  },
  {
    icon: FolderOpen,
    iconClass: "text-green-400",
    title: "Everything lives in different places",
    subtext:
      "Track progress, notes, and questions in one place — no more scattered emails.",
  },
];

export function OnboardingScreen({ onBegin, onOpenLogin, userEmail, onNavigate }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {onOpenLogin && (
        <header className="shrink-0 flex justify-end items-center px-6 py-4">
          {userEmail ? (
            <span className="text-sm text-gray-300">My journey</span>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              Log in
            </button>
          )}
        </header>
      )}
      <div className="flex-1 flex flex-col">
        {/* Hero */}
        <section className="flex flex-col items-center text-center px-6 pt-12 pb-10">
          <div className="max-w-2xl mx-auto w-full space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                <Home className="w-10 h-10 text-white" />
              </div>
              <span className="text-2xl text-white font-medium">FirstHome</span>
            </div>

            <h1 className="text-4xl md:text-5xl leading-tight text-white font-medium text-balance">
              Buying your first home shouldn't feel like a mystery
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
              Track every stage of your purchase, understand what's happening in plain English, and
              stay organised — even when updates are slow.
            </p>

            <Button
              onClick={onBegin}
              className="w-full max-w-sm mx-auto h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              Start your journey
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Journey preview (web-style, horizontal pills + dotted line) */}
        <section className="px-6 pb-14">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              {JOURNEY_STAGES.map((stage, idx) => {
                const Icon = "icon" in stage ? stage.icon : null;
                const isActive = stage.status === "active";
                const isCompleted = stage.status === "completed";
                const isUpcoming = stage.status === "upcoming";
                return (
                  <div key={stage.id} className="flex items-center flex-1 max-w-[200px]">
                    <div
                      className={`
                        flex items-center justify-center gap-2 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 w-full
                        transition-all
                        ${isActive ? "bg-slate-100 text-slate-900 ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900 shadow-lg shadow-blue-500/20" : ""}
                        ${isCompleted ? "bg-slate-800/60 border border-slate-700/50" : ""}
                        ${isUpcoming ? "bg-slate-800/60 border border-slate-700/50 border-dashed" : ""}
                      `}
                    >
                      {isCompleted && Icon && (
                        <Icon className="w-5 h-5 text-purple-400 shrink-0" aria-hidden />
                      )}
                      {isActive && Icon && (
                        <Icon className="w-5 h-5 text-blue-500 shrink-0" aria-hidden />
                      )}
                      {isUpcoming && (
                        <span className="w-5 h-5 rounded-full border-2 border-dashed border-gray-500 shrink-0" aria-hidden />
                      )}
                      <span className="text-sm font-medium truncate">{stage.label}</span>
                    </div>
                    {idx < JOURNEY_STAGES.length - 1 && (
                      <div
                        className="flex-shrink-0 w-6 sm:w-10 h-px border-t border-dashed border-slate-500/70"
                        aria-hidden
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pain → Resolution cards */}
        <section className="px-6 pb-14">
          <div className="max-w-2xl mx-auto space-y-4">
            {PAIN_CARDS.map(({ icon: Icon, iconClass, title, subtext }) => (
              <div
                key={title}
                className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 flex gap-4"
              >
                <Icon className={`w-6 h-6 flex-shrink-0 mt-1 ${iconClass}`} aria-hidden />
                <div>
                  <h3 className="text-white font-medium mb-1">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What you get */}
        <section className="px-6 pb-16">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-3xl text-white font-medium">
              What you get
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
              Built for UK first-time buyers. Designed to work alongside your solicitor — not replace
              them.
            </p>
          </div>
        </section>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
