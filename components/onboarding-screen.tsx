"use client";

import { useState } from "react";
import {
  Home,
  ArrowRight,
  Search,
  Handshake,
  Wallet,
  Scale,
  ClipboardCheck,
  Truck,
  CheckCircle2,
  FileText,
  Building2,
  MapPin,
  BookOpen,
  FolderOpen,
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
  { label: "House Hunting", id: "guide-house-hunting", icon: Search, duration: "Weeks to months" },
  { label: "Making an Offer", id: "guide-making-an-offer", icon: Handshake, duration: "1-2 weeks" },
  { label: "Prepare for Legal & Financial", id: "guide-prep-legal-financial", icon: Wallet, duration: "2-4 weeks" },
  { label: "Legal & Conveyancing", id: "guide-legal-and-conveyancing", icon: Scale, duration: "Often 6-12 weeks" },
  { label: "Surveys", id: "guide-surveys", icon: ClipboardCheck, duration: "2-4 weeks" },
  { label: "Moving Day", id: "guide-moving", icon: Truck, duration: "1-2 weeks" },
];

const STAGE_CONTENT: Record<string, { subtext: string; checklist: { label: string; icon: React.ElementType }[] }> = {
  "guide-house-hunting": {
    subtext: "Typically 1–3 months",
    checklist: [
      { label: "Mortgage in principle secured", icon: FileText },
      { label: "Must-haves defined", icon: CheckCircle2 },
      { label: "Viewings booked", icon: Search },
      { label: "Comparisons made", icon: ClipboardCheck },
    ],
  },
  "guide-making-an-offer": {
    subtext: "1-2 weeks",
    checklist: [
      { label: "Offer Submitted", icon: FileText },
      { label: "Mortgage approval", icon: Building2 },
      { label: "Conveyancer Appointed", icon: Scale },
      { label: "Memorandum of sale issued", icon: FileText },
    ],
  },
  "guide-prep-legal-financial": {
    subtext: "Typically 2–4 weeks",
    checklist: [
      { label: "Mortgage application submitted", icon: Building2 },
      { label: "Solicitor instructed", icon: Scale },
      { label: "Documents gathered", icon: FileText },
      { label: "Costs understood", icon: Wallet },
    ],
  },
  "guide-legal-and-conveyancing": {
    subtext: "Typically 8–12 weeks",
    checklist: [
      { label: "Searches ordered", icon: FileText },
      { label: "Contract received", icon: ClipboardCheck },
      { label: "Enquiries raised", icon: Scale },
      { label: "Ready for exchange", icon: CheckCircle2 },
    ],
  },
  "guide-surveys": {
    subtext: "Typically 2–4 weeks",
    checklist: [
      { label: "Survey booked", icon: ClipboardCheck },
      { label: "Survey completed", icon: CheckCircle2 },
      { label: "Report received", icon: FileText },
      { label: "Issues addressed", icon: Scale },
    ],
  },
  "guide-moving": {
    subtext: "Typically 1–2 weeks",
    checklist: [
      { label: "Removals booked", icon: Truck },
      { label: "Utilities arranged", icon: Home },
      { label: "Insurance in place", icon: FileText },
      { label: "Keys collected", icon: CheckCircle2 },
    ],
  },
};

export function OnboardingScreen({ onBegin, onOpenLogin, onLogout, onNavigateToAccount, userEmail, onNavigate }: OnboardingScreenProps) {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @keyframes guideCardFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .onboarding-bg {
          background: linear-gradient(to bottom, #0f172a, #1e293b, #0f172a);
        }
        .onboarding-bg::before {
          content: "";
          position: fixed;
          inset: 0;
          background-image: 
            radial-gradient(ellipse 60% 40% at 20% 25%, rgba(100, 116, 139, 0.05) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 85% 70%, rgba(71, 85, 105, 0.04) 0%, transparent 55%),
            radial-gradient(ellipse 70% 30% at 50% 90%, rgba(148, 163, 184, 0.03) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }
        .arch-illus {
          pointer-events: none;
          z-index: 1;
          opacity: 0.07;
          mask-image: radial-gradient(ellipse 80% 80% at 100% 0%, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 100% 0%, black 20%, transparent 70%);
        }
        .arch-illus-roadmap {
          pointer-events: none;
          z-index: 1;
          opacity: 0.06;
          mask-image: radial-gradient(ellipse 80% 80% at 0% 100%, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 0% 100%, black 20%, transparent 70%);
        }
        @media (max-width: 767px) {
          .arch-illus { opacity: 0.05; }
          .arch-illus-roadmap { opacity: 0.05; }
        }
      `}</style>
    <div className="onboarding-bg min-h-screen text-white flex flex-col relative">
      <div className="relative z-10 flex flex-col flex-1">
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
        <section className="relative flex flex-col items-center text-center px-6 pt-10 pb-20 overflow-hidden">
          <div
            className="arch-illus absolute top-6 right-4 md:top-4 md:right-8 w-48 h-48 md:w-72 md:h-72"
            aria-hidden
          >
            <svg viewBox="0 0 120 100" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M60 8 L110 38 L110 92 L10 92 L10 38 Z" />
              <path d="M10 38 L60 8 L110 38" />
              <path d="M50 92 L50 55 L70 55 L70 92" />
              <path d="M25 55 L25 70 M35 55 L35 70 M85 55 L85 70 M95 55 L95 70" />
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto w-full space-y-10">
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Home className="w-8 h-8 text-white" />
              </div>
              <span className="text-xl text-white font-medium tracking-wide">FirstHome</span>
            </div>

            <h1 className="text-3xl md:text-4xl leading-tight text-white font-medium text-balance">
              Buying your first home shouldn&apos;t feel like a mystery.
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl mx-auto">
              Track your progress, understand what&apos;s happening in plain English, and stay organised.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                onClick={onBegin}
                className="w-full sm:w-auto min-w-[220px] h-12 text-base bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                Start your journey
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => onNavigate?.("guides")}
                variant="outline"
                className="w-full sm:w-auto min-w-[220px] h-12 text-base border border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800/50 hover:text-slate-200 hover:border-slate-500 rounded-xl"
              >
                Explore the guides
              </Button>
            </div>
          </div>
        </section>

        {/* Where are you in the process? */}
        <section className="relative px-6 pt-4 pb-24 overflow-hidden">
          <div
            className="arch-illus-roadmap absolute bottom-12 left-4 md:bottom-16 md:left-8 w-48 h-48 md:w-64 md:h-64"
            aria-hidden
          >
            <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <rect x="8" y="12" width="48" height="60" />
              <line x1="8" y1="32" x2="56" y2="32" />
              <line x1="8" y1="48" x2="56" y2="48" />
              <rect x="62" y="8" width="30" height="42" />
              <line x1="62" y1="24" x2="92" y2="24" />
              <line x1="62" y1="32" x2="92" y2="32" />
              <path d="M70 58 L70 85 L84 85 L84 58" />
            </svg>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-xl font-semibold text-white">Where are you in the process?</h2>
            </div>

            {/* Desktop: horizontal timeline with card-style stages */}
            <div className="hidden md:block">
              <div className="flex items-stretch gap-px">
                {JOURNEY_STAGES.map((stage, idx) => {
                  const isActive = selectedStage === stage.id;
                  const content = STAGE_CONTENT[stage.id];
                  const Icon = stage.icon;
                  return (
                    <div key={stage.id} className="flex-1 min-w-0 flex flex-col items-stretch group/stage">
                      <div className="flex items-stretch flex-1">
                        <button
                          type="button"
                          onClick={() => setSelectedStage(stage.id)}
                          className={`group flex flex-col items-center flex-1 min-w-0 py-4 px-3 rounded-xl border transition-all duration-200 ease-in-out ${
                            isActive
                              ? "border-purple-500/60 bg-slate-800/70 shadow-sm -translate-y-0.5"
                              : "border-slate-700/60 bg-slate-800/30 hover:border-slate-600 hover:-translate-y-[2px] hover:shadow-sm"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 shrink-0 mb-2 ${
                              isActive ? "text-purple-400" : "text-slate-500 group-hover:text-slate-400"
                            }`}
                            aria-hidden
                          />
                          <span
                            className={`text-xs font-medium text-center leading-tight transition-colors ${
                              isActive ? "text-slate-100" : "text-slate-400"
                            }`}
                          >
                            {stage.label}
                          </span>
                          <span className="text-[10px] text-slate-500 mt-1 text-center">
                            {stage.duration}
                          </span>
                        </button>
                        {idx < JOURNEY_STAGES.length - 1 && (
                          <div
                            className={`flex-shrink-0 w-6 h-px self-center ${isActive ? "bg-purple-500/40" : "bg-slate-700/60"}`}
                            aria-hidden
                          />
                        )}
                      </div>
                      {/* Hover preview panel */}
                      {content && (
                        <div className="mt-3 px-3 py-3 rounded-lg border border-slate-700/60 bg-slate-800/40 opacity-0 group-hover/stage:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <p className="text-[10px] text-slate-500 mb-2">{content.subtext}</p>
                          <ul className="space-y-1">
                            {content.checklist.slice(0, 3).map((item, i) => (
                              <li key={i} className="text-xs text-slate-400">• {item.label}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: vertical stacked steps */}
            <div className="md:hidden space-y-2">
              {JOURNEY_STAGES.map((stage) => {
                const isActive = selectedStage === stage.id;
                const Icon = stage.icon;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setSelectedStage(stage.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 ease-in-out active:-translate-y-0.5 ${
                      isActive
                        ? "border-purple-500/50 bg-slate-800/60"
                        : "border-slate-700/60 bg-slate-800/30 hover:border-slate-600"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 ${isActive ? "text-purple-400" : "text-slate-500"}`}
                      aria-hidden
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-slate-300 block">{stage.label}</span>
                      <span className="text-xs text-slate-500">{stage.duration}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic content card */}
            {selectedStage && STAGE_CONTENT[selectedStage] && (
              <div
                key={selectedStage}
                className="mt-8 rounded-xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm p-6"
                style={{
                  animation: "guideCardFadeIn 0.22s ease-out forwards",
                }}
              >
                {(() => {
                  const stage = JOURNEY_STAGES.find((s) => s.id === selectedStage);
                  const content = STAGE_CONTENT[selectedStage];
                  if (!stage || !content) return null;
                  return (
                    <>
                      <div className="flex items-baseline justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">{stage.label}</h3>
                        <p className="text-xs text-slate-500">{content.subtext}</p>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {content.checklist.map((item, i) => {
                          const ItemIcon = item.icon;
                          return (
                            <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                              <ItemIcon className="w-4 h-4 text-slate-500 shrink-0" aria-hidden />
                              {item.label}
                            </li>
                          );
                        })}
                      </ul>
                      <button
                        type="button"
                        onClick={() => onNavigate?.(selectedStage)}
                        className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        View full guide
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </section>

        {/* Why FirstHome exists */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-white text-center mb-12">Why FirstHome exists</h2>
            <div className="max-w-[700px] mx-auto text-center mb-14">
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Buying your first home is not just paperwork.
                It is weeks of waiting.
                Emails you do not fully understand.
                Conversations that feel one step ahead of you.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                You are not behind. The process is simply opaque.
              </p>
              <p className="text-slate-300 text-sm font-medium">
                FirstHome exists to make it visible.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-white/10 bg-slate-800/30 p-5 transition-transform duration-200 hover:-translate-y-[2px] hover:border-slate-600/60">
                <MapPin className="w-5 h-5 text-slate-500 mb-3" strokeWidth={1.5} aria-hidden />
                <h3 className="text-white font-medium mb-2">See where you are</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Understand exactly which stage you are in and what should be happening right now.
                  No guessing. No relying on memory.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-800/30 p-5 transition-transform duration-200 hover:-translate-y-[2px] hover:border-slate-600/60">
                <BookOpen className="w-5 h-5 text-slate-500 mb-3" strokeWidth={1.5} aria-hidden />
                <h3 className="text-white font-medium mb-2">Know what happens next</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Clear explanations in plain English so you know what each step means before someone asks you to sign something.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-800/30 p-5 transition-transform duration-200 hover:-translate-y-[2px] hover:border-slate-600/60">
                <FolderOpen className="w-5 h-5 text-slate-500 mb-3" strokeWidth={1.5} aria-hidden />
                <h3 className="text-white font-medium mb-2">Keep everything together</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Track progress, questions, notes, and timelines in one place instead of scattered emails and half-remembered conversations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer onNavigate={onNavigate} />
      {onNavigate && <ChatEntryPoint onOpenChat={() => onNavigate("chat")} />}
      </div>
    </div>
    </>
  );
}
