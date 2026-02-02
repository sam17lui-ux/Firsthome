"use client";

import {
  Home,
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  BookOpen,
  FolderOpen,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

interface HowItWorksScreenProps {
  onBegin: () => void;
  onBack?: () => void;
  onOpenLogin?: () => void;
  userEmail?: string | null;
  onNavigate?: (screen: string) => void;
}

const FEATURE_CARDS = [
  {
    id: "track",
    icon: CalendarCheck,
    iconClass: "text-blue-400",
    title: "Track your journey",
    copy: "Watch your progress unfold with a clear, step-by-step timeline that shows what's done and what's up next.",
    hasPreview: "journey" as const,
  },
  {
    id: "understand",
    icon: BookOpen,
    iconClass: "text-purple-400",
    title: "Understand each stage",
    copy: "Learn what's required from you in plain English. No legal jargon, no guesswork.",
    hasPreview: false,
  },
  {
    id: "organised",
    icon: FolderOpen,
    iconClass: "text-green-400",
    title: "Stay organised",
    copy: "Store updates, notes, and reminders in one secure place, so nothing gets lost along the way.",
    hasPreview: "checklist" as const,
  },
  {
    id: "private",
    icon: Lock,
    iconClass: "text-slate-400",
    title: "Private by design",
    copy: "Your data stays private. No accounts, no sharing, and no tracking — everything is saved locally.",
    hasPreview: false,
  },
];

function JourneyPreviewMini() {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <div className="rounded-xl px-2.5 py-1.5 bg-slate-100 text-slate-800 text-xs font-medium flex items-center gap-1.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" aria-hidden />
        Get Ready
      </div>
      <div className="w-4 h-px border-t border-dashed border-slate-400" aria-hidden />
      <div className="rounded-xl px-2.5 py-1.5 bg-slate-800/80 border border-slate-600 text-slate-200 text-xs font-medium flex items-center gap-1.5">
        <span
          className="w-3.5 h-3.5 rounded-full border-2 border-dashed border-slate-500 shrink-0"
          aria-hidden
        />
        Make an Offer
      </div>
    </div>
  );
}

function ChecklistPreviewMini() {
  const items = [
    { label: "Find a solicitor", done: true },
    { label: "Book survey", done: true },
    { label: "Review contract", done: false },
  ];
  return (
    <div className="shrink-0 space-y-1.5">
      {items.map(({ label, done }) => (
        <div
          key={label}
          className="flex items-center gap-2 text-xs text-slate-300"
        >
          {done ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" aria-hidden />
          ) : (
            <span
              className="w-3.5 h-3.5 rounded-full border border-slate-500 shrink-0"
              aria-hidden
            />
          )}
          <span className={done ? "text-slate-300" : "text-slate-500"}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function HowItWorksScreen({ onBegin, onBack, onOpenLogin, userEmail, onNavigate }: HowItWorksScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-20 shrink-0">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 -ml-2 hover:bg-slate-700/50 rounded-full transition-colors"
                aria-label="Back to home"
              >
                <ArrowLeft className="w-6 h-6 text-gray-200" />
              </button>
            )}
          </div>
          {onOpenLogin && (
            userEmail ? (
              <span className="text-sm text-gray-300">My journey</span>
            ) : (
              <button
                type="button"
                onClick={onOpenLogin}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                Log in
              </button>
            )
          )}
        </div>
      </header>
      <div className="flex-1 flex flex-col">
        {/* Header / Hero */}
        <section className="flex flex-col items-center text-center px-6 pt-12 pb-10">
          <div className="max-w-2xl mx-auto w-full space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Home className="w-10 h-10 text-white" />
              </div>
              <span className="text-2xl text-white font-medium">FirstHome</span>
            </div>

            <h1 className="text-4xl md:text-5xl leading-tight text-white font-medium text-balance">
              How it works
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
              See where you're going and feel confident at every step.
            </p>
          </div>
        </section>

        {/* Feature cards */}
        <section className="px-6 pb-12">
          <div className="max-w-3xl mx-auto space-y-6">
            {FEATURE_CARDS.map(({ id, icon: Icon, iconClass, title, copy, hasPreview }) => (
              <div
                key={id}
                className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 shadow-sm"
              >
                <div className="flex gap-4 sm:gap-5 flex-1 min-w-0">
                  <Icon
                    className={`w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 mt-0.5 ${iconClass}`}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <h2 className="text-lg font-medium text-white mb-1.5">{title}</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">{copy}</p>
                  </div>
                </div>
                {hasPreview === "journey" && (
                  <div className="sm:pt-1 pl-14 sm:pl-0 sm:border-l sm:border-slate-700/50 sm:pl-6 shrink-0">
                    <JourneyPreviewMini />
                  </div>
                )}
                {hasPreview === "checklist" && (
                  <div className="sm:pt-1 pl-14 sm:pl-0 sm:border-l sm:border-slate-700/50 sm:pl-6 shrink-0">
                    <ChecklistPreviewMini />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Primary CTA */}
        <section className="px-6 pb-16">
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={onBegin}
              className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              Let's begin
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
