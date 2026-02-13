"use client";

import React from "react"

import { ArrowLeft, ArrowRight, Home, Search, FileText, ClipboardCheck, Truck, CheckCircle2, Handshake, Scale, Wallet } from "lucide-react";
import { Footer } from "@/components/footer";
import { ChatEntryPoint } from "@/components/chat-entry-point";
import { GuideNavigation } from "@/components/GuideNavigation";

interface PageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

// =====================
// GUIDES OVERVIEW PAGE
// =====================
const GUIDE_STAGES = [
  { stage: 1, title: "House Hunting", href: "guide-house-hunting", summary: "How to find the right home without feeling overwhelmed. Know your budget, set your priorities, and view properties with confidence." },
  { stage: 2, title: "Making an Offer", href: "guide-making-an-offer", summary: "What happens when you decide to move forward. Learn what an offer means, what you will be asked for, and what to expect if it is accepted or not." },
  { stage: 3, title: "Prepare for Legal & Financial", href: "guide-prep-legal-financial", summary: "Get your finances and legal team in order before the process begins. Mortgage in principle, choosing a solicitor, and understanding the full costs." },
  { stage: 4, title: "Legal & Conveyancing", href: "guide-legal-and-conveyancing", summary: "What the legal stage involves and why it often feels slow. Searches, contracts, enquiries, and what to expect during the paperwork phase." },
  { stage: 5, title: "Surveys", href: "guide-surveys", summary: "How to choose the right survey and what to do with the results. Understand what surveys reveal and how they protect you." },
  { stage: 6, title: "Moving Day", href: "guide-moving", summary: "How to plan for a smooth transition to your new home. From removals and utilities to settling in." },
];

const SHORTCUT_LINKS = [
  { label: "I'm viewing properties", href: "guide-house-hunting" },
  { label: "I've had an offer accepted", href: "guide-prep-legal-financial" },
  { label: "I'm waiting on surveys", href: "guide-surveys" },
  { label: "I'm close to completion", href: "guide-moving" },
];

export function GuidesOverviewPage({ onBack, onNavigate }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pb-24">
        <header className="mb-12">
          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            Your home buying roadmap
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Everything you need to know, in the order it actually happens.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {GUIDE_STAGES.map(({ stage, title, href, summary }) => (
            <button
              key={href}
              type="button"
              onClick={() => onNavigate(href)}
              className="group relative text-left rounded-xl p-6 md:p-7 bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 hover:border-slate-600/80 hover:shadow-lg hover:shadow-slate-900/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="absolute top-5 right-5 text-2xl font-light text-slate-600/50">{stage}</span>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Stage {stage}</p>
              <h2 className="text-xl font-semibold text-white mb-3 pr-8">{title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{summary}</p>
              <div className="flex justify-end">
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-teal-400 transition-colors" />
              </div>
            </button>
          ))}
        </div>

        <section className="mt-16 pt-10 border-t border-slate-700/60">
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 p-6 md:p-8">
            <h3 className="text-base font-medium text-white mb-2">Not sure where you are?</h3>
            <p className="text-sm text-slate-400 mb-6">Jump to the guide that matches your stage:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SHORTCUT_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  type="button"
                  onClick={() => onNavigate(href)}
                  className="text-left text-sm text-teal-400 hover:text-teal-300 transition-colors py-1"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <p className="mt-12 text-sm text-slate-500 leading-relaxed">
          You do not need to read everything at once. Use this as a reference as your purchase moves forward.
        </p>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// Shared guide layout component
interface GuideSection {
  title: string;
  content: string;
  bullets?: string[];
  whyThisMatters?: string;
}

interface GuideLayoutProps {
  title: string;
  icon: React.ElementType;
  subtitle: string;
  intro: string;
  reassurance?: string;
  sections: GuideSection[];
  commonQuestions: { q: string; a: string }[];
  whatCatchesPeopleOut?: string[];
  onBack: () => void;
  onNavigate: (page: string) => void;
  previous?: { title: string; href: string };
  next?: { title: string; href: string };
}

function GuideLayout({
  title,
  icon: Icon,
  subtitle,
  intro,
  reassurance,
  sections,
  commonQuestions,
  whatCatchesPeopleOut,
  onBack,
  onNavigate,
  previous,
  next,
}: GuideLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => onNavigate("guides")}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            Guides
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">{title}</span>
        </nav>

        <button
          type="button"
          onClick={() => onNavigate("tracker")}
          className="w-full mb-6 flex items-center justify-between gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors text-left"
        >
          <span className="text-sm text-slate-300">This stage is part of your home-buying journey.</span>
          <span className="text-sm text-teal-400 shrink-0">View your progress</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <p className="text-slate-400 mt-1">{subtitle}</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-slate-300 text-lg leading-relaxed mb-4">{intro}</p>
          {reassurance && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <p className="text-slate-300 leading-relaxed">{reassurance}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <section key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">{index + 1}. {section.title}</h2>
              <p className="text-slate-300 leading-relaxed mb-4">{section.content}</p>
              {section.bullets && (
                <ul className="space-y-2 mb-4">
                  {section.bullets.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.whyThisMatters && (
                <p className="text-slate-400 text-sm leading-relaxed italic">{section.whyThisMatters}</p>
              )}
            </section>
          ))}
        </div>

        {whatCatchesPeopleOut && whatCatchesPeopleOut.length > 0 && (
          <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mt-8 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">What catches people out at this stage</h2>
            <ul className="space-y-2">
              {whatCatchesPeopleOut.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mt-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Common questions at this stage</h2>
          <div className="space-y-4">
            {commonQuestions.map((item, i) => (
              <div key={i}>
                <h3 className="text-teal-400 font-medium text-sm mb-1">{item.q}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <GuideNavigation previous={previous} next={next} onNavigate={onNavigate} />
      </div>
      <Footer onNavigate={onNavigate} />
      <ChatEntryPoint onOpenChat={() => onNavigate("chat")} label="Need help understanding this?" />
    </div>
  );
}

// =====================
// HOUSE HUNTING GUIDE
// =====================
export function HouseHuntingGuide({ onBack, onNavigate }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-16">
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => onNavigate("guides")}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            Guides
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">House Hunting</span>
        </nav>

        <button
          type="button"
          onClick={() => onNavigate("tracker")}
          className="w-full mb-6 flex items-center justify-between gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors text-left"
        >
          <span className="text-sm text-slate-300">This stage is part of your home-buying journey.</span>
          <span className="text-sm text-teal-400 shrink-0">View your progress</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
            <Search className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">House hunting</h1>
            <p className="text-slate-400 mt-1">How to find the right home without feeling overwhelmed</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            House hunting is often the most emotional part of buying a home. This guide helps you focus on what matters, what you can ignore, and how to stay realistic.
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <p className="text-slate-300 leading-relaxed">
              Feeling unsure is completely normal. Most first-time buyers only start to feel confident after several viewings.
            </p>
          </div>
        </div>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">1. Know what you can afford</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Before you book viewings, understand what you can realistically afford, not just the asking price. The listing price is not the full picture. Buying a home comes with ongoing monthly costs too.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Get a mortgage in principle to understand your likely budget</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Think about your deposit, monthly mortgage payments, and day-to-day living costs</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Factor in council tax, utilities, and maintenance</span>
            </li>
          </ul>
          <p className="text-slate-400 text-sm leading-relaxed italic">Setting clear guardrails helps you avoid wasting time on homes that stretch you too far.</p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">2. Must-haves vs nice-to-haves</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            It is easy to want everything, but very few first homes tick every box. Focus on must-haves: what works for your daily life (location, size, layout), what is affordable long-term, and what suits your plans over the next few years. Nice-to-haves might include a big garden, a brand-new kitchen, or a home office.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed italic">You can often change a kitchen later. You cannot change the location.</p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">3. Viewing properties</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Viewing homes is exciting, but first viewings are rarely the one. Take your time and stay objective. Go prepared: ask about recent repairs, check the age of key systems (boiler, electrics), and ask about the neighbourhood and nearby developments. Watch out for damp smells, large cracks, or fresh paint that might hide problem areas.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed italic">If something feels rushed or brushed off, it is okay to walk away.</p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">4. Making comparisons</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            After a few viewings, homes can start to blur together. Make short notes immediately after each viewing. Compare homes based on facts, not first impressions. Revisit listings later; they often look different once emotions settle.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed italic">Many buyers only realise what matters after comparing a few homes side by side.</p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">5. Market reality</h2>
          <p className="text-slate-300 leading-relaxed">
            In busy areas you may miss out on homes you like, need to view quickly, or compete with other buyers. This is frustrating, but normal. Missing out does not mean you failed. It happens to most buyers at some point.
          </p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">What catches people out at this stage</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Viewing without knowing your budget, then falling for a property you cannot afford</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Comparing homes in your head without writing notes, so they blur together</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Focusing on cosmetic features instead of location and structural condition</span>
            </li>
          </ul>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Common questions at this stage</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-teal-400 font-medium text-sm mb-1">How many viewings should I do before making an offer?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">There is no magic number. Some buyers know quickly; others need ten or more viewings to feel clear. Trust your own pace and do not rush because the market feels fast.</p>
            </div>
            <div>
              <h3 className="text-teal-400 font-medium text-sm mb-1">Should I make an offer on the first property I like?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">It depends. If it ticks your must-haves and you can afford it, making an offer is reasonable. If you are unsure, viewing a few more properties can help you compare. An offer is not legally binding until much later.</p>
            </div>
            <div>
              <h3 className="text-teal-400 font-medium text-sm mb-1">What if I keep missing out on properties?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Missing out is common and does not mean you are doing anything wrong. Consider whether your criteria are realistic for your budget, and whether you need to move faster or broaden your search area.</p>
            </div>
          </div>
        </section>

        <GuideNavigation next={{ title: "Making an Offer", href: "guide-making-an-offer" }} onNavigate={onNavigate} />
      </div>

      <Footer onNavigate={onNavigate} />
      <ChatEntryPoint onOpenChat={() => onNavigate("chat")} label="Need help understanding this?" />
    </div>
  );
}

// =====================
// MAKING AN OFFER GUIDE
// =====================
export function MakingAnOfferGuide({ onBack, onNavigate }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-16">
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => onNavigate("guides")}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            Guides
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Making an Offer</span>
        </nav>

        <button
          type="button"
          onClick={() => onNavigate("tracker")}
          className="w-full mb-6 flex items-center justify-between gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors text-left"
        >
          <span className="text-sm text-slate-300">This stage is part of your home-buying journey.</span>
          <span className="text-sm text-teal-400 shrink-0">View your progress</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
            <Handshake className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Making an offer</h1>
            <p className="text-slate-400 mt-1">What happens when you decide to move forward, and what is normal to expect</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            As a first-time buyer, making an offer can feel like a big moment. This guide explains what it means, what happens next, and what you do not need to worry about yet.
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <p className="text-slate-300 leading-relaxed">
              An offer is not legally binding. At this stage, nothing is final, and it is okay to change your mind.
            </p>
          </div>
        </div>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">1. What making an offer means</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Making an offer is simply telling the seller what you are willing to pay. It is the start of a conversation, not a commitment.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Offers are usually made through the estate agent</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>The seller can accept, reject, or counter your offer</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Nothing is legally binding until much later in the process</span>
            </li>
          </ul>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">2. What you will usually be asked for</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            When you make an offer, the estate agent may ask for basic information such as proof of deposit, mortgage in principle, and your position (for example, first-time buyer or chain-free). This is normal and does not mean anything has been agreed yet.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed italic">This helps the seller assess how proceedable you are.</p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">3. If your offer is accepted</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            If the seller accepts, the property is usually marked as sold subject to contract. The legal process is about to begin, but things can still change. You will be asked to instruct a solicitor, surveys will be arranged, and legal checks and searches will begin.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed italic">You might not hear much for a while. That is normal.</p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">4. If your offer is not accepted</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Having an offer rejected is disappointing, but very common. Most buyers miss out on at least one property before succeeding. Sellers may receive multiple offers. Timing and circumstances often matter as much as price. You can choose to increase your offer, walk away, or keep looking.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed italic">It does not mean you did anything wrong.</p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">5. Offers can fall through</h2>
          <p className="text-slate-300 leading-relaxed">
            Even after an offer is accepted, sales can fall through. It is disappointing, but it happens for many reasons outside your control.
          </p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">What catches people out at this stage</h2>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Thinking an accepted offer means the purchase is guaranteed</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Not having proof of deposit and mortgage in principle ready when asked</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Assuming silence means something has gone wrong when delays are normal</span>
            </li>
          </ul>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Common questions at this stage</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-teal-400 font-medium text-sm mb-1">Can I change my mind after my offer is accepted?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Before contracts are exchanged, you can withdraw without penalty. Your offer is not legally binding until exchange. Bear in mind that you may lose money already spent on surveys or legal fees.</p>
            </div>
            <div>
              <h3 className="text-teal-400 font-medium text-sm mb-1">Why is the estate agent asking for so much information?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Estate agents want to know you are a serious, proceedable buyer. Proof of deposit and mortgage in principle show the seller you can complete the purchase. This is standard practice.</p>
            </div>
            <div>
              <h3 className="text-teal-400 font-medium text-sm mb-1">How long does it take to hear back after making an offer?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">It varies. Some sellers respond within hours; others take days, especially if they have multiple offers or need to consult others. The estate agent will usually give you an idea of the timeline.</p>
            </div>
          </div>
        </section>

        <GuideNavigation
          previous={{ title: "House Hunting", href: "guide-house-hunting" }}
          next={{ title: "Prepare for Legal & Financial", href: "guide-prep-legal-financial" }}
          onNavigate={onNavigate}
        />
      </div>

      <Footer onNavigate={onNavigate} />
      <ChatEntryPoint onOpenChat={() => onNavigate("chat")} label="Need help understanding this?" />
    </div>
  );
}

// =====================
// LEGAL & CONVEYANCING GUIDE
// =====================
export function LegalAndConveyancingGuide({ onBack, onNavigate }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-16">
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => onNavigate("guides")}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            Guides
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Legal & Conveyancing</span>
        </nav>

        <button
          type="button"
          onClick={() => onNavigate("tracker")}
          className="w-full mb-6 flex items-center justify-between gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors text-left"
        >
          <span className="text-sm text-slate-300">This stage is part of your home-buying journey.</span>
          <span className="text-sm text-teal-400 shrink-0">View your progress</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
            <Scale className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Legal & conveyancing</h1>
            <p className="text-slate-400 mt-1">What the legal stage involves, and why it often feels slow</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            Legal and conveyancing is the part of the process where the paperwork happens. It is often the longest stage, with the fewest visible updates. This guide explains what is going on behind the scenes and what is normal to expect.
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <p className="text-slate-300 leading-relaxed">
              Long periods of silence are common at this stage. It usually means work is happening in the background.
            </p>
          </div>
        </div>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">1. What conveyancing is</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Conveyancing is the legal work that transfers ownership of a property from the seller to you. Your solicitor handles this process on your behalf.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Checking the legal title</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Reviewing contracts</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Raising and answering legal enquiries</span>
            </li>
          </ul>
          <p className="text-slate-400 text-sm leading-relaxed italic">This stage is detailed and methodical by design.</p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">2. Searches and checks</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Your solicitor will order searches (such as local authority, water and drainage, and environmental) to uncover information about the property and the local area. Searches can take several weeks, depending on the local council.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed italic">These checks protect you from unknown issues that could affect the property.</p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">3. Surveys and enquiries</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            While legal checks are ongoing, surveys are usually carried out. See our{" "}
            <button type="button" onClick={() => onNavigate("guide-surveys")} className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
              Surveys guide
            </button>{" "}
            for more on what they involve. Survey results may lead to further questions or negotiations. Issues found do not automatically mean the purchase will fail. Your solicitor may raise additional enquiries.
          </p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">4. Why this stage feels slow</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Many different parties are involved: solicitors, surveyors, and local authorities. Progress depends on responses from several organisations. Slow progress is usual here. It does not mean there is a problem.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed italic">Patience at this stage is normal and expected.</p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">5. Things can still change</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Until contracts are exchanged, either side can still withdraw. This uncertainty is frustrating, but it is part of the process. Try not to make irreversible plans until exchange has taken place.
          </p>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">What catches people out at this stage</h2>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Delaying responses to solicitor requests, which slows the whole chain</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Booking removals before exchange, when dates are still provisional</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Assuming slow progress means a problem when third-party delays are common</span>
            </li>
          </ul>
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Common questions at this stage</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-teal-400 font-medium text-sm mb-1">Why is my solicitor taking so long to respond?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Solicitors are often waiting on third parties such as councils, water companies, or the seller solicitor. You can ask for an update, but delays are often outside their control. A polite chase every two weeks is reasonable.</p>
            </div>
            <div>
              <h3 className="text-teal-400 font-medium text-sm mb-1">What are legal enquiries?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Enquiries are questions your solicitor raises about the property or the contract. The seller solicitor responds, and this back and forth can take several weeks. It is how your solicitor protects your interests.</p>
            </div>
            <div>
              <h3 className="text-teal-400 font-medium text-sm mb-1">When will I know my completion date?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">The completion date is agreed at exchange, when contracts become legally binding. Before that, any dates discussed are provisional. Do not book removals until exchange has happened.</p>
            </div>
          </div>
        </section>

        <GuideNavigation
          previous={{ title: "Prepare for Legal & Financial", href: "guide-prep-legal-financial" }}
          next={{ title: "Surveys", href: "guide-surveys" }}
          onNavigate={onNavigate}
        />
      </div>

      <Footer onNavigate={onNavigate} />
      <ChatEntryPoint onOpenChat={() => onNavigate("chat")} label="Need help understanding this?" />
    </div>
  );
}

// =====================
// PREPARE FOR LEGAL & FINANCIAL GUIDE
// =====================
export function PrepareForLegalFinancialGuide({ onBack, onNavigate }: PageProps) {
  return (
    <GuideLayout
      title="Prepare for Legal & Financial"
      icon={Wallet}
      subtitle="What to sort out before the legal process begins"
      intro="Once your offer is accepted, you will need to get your finances and legal team in order. This stage can feel busy, but taking things step by step keeps you in control."
      reassurance="Feeling daunted by paperwork and costs is normal. Most people work through this stage without specialist knowledge."
      onBack={onBack}
      onNavigate={onNavigate}
      previous={{ title: "Making an Offer", href: "guide-making-an-offer" }}
      next={{ title: "Legal & Conveyancing", href: "guide-legal-and-conveyancing" }}
      sections={[
        {
          title: "Mortgage in principle",
          content: "Get a mortgage in principle before house hunting so you know your budget. After your offer is accepted, you will make a full application. Lenders typically offer 4 to 4.5 times your annual income, depending on your outgoings and credit score. A larger deposit usually means better rates.",
          bullets: [
            "Use online calculators for initial estimates",
            "Gather proof of income and bank statements early",
            "Avoid big financial changes during the application",
          ],
          whyThisMatters: "Knowing your budget early helps you focus on properties you can afford.",
        },
        {
          title: "Choosing a solicitor",
          content: "Your solicitor (or conveyancer) handles all the legal work: property searches, contract review, enquiries, and transferring ownership. Get quotes from three to four solicitors and check they are on your lender approved panel.",
          bullets: [
            "Ask about typical response times",
            "Check they specialise in residential conveyancing",
            "Understand their fee structure upfront",
          ],
          whyThisMatters: "A responsive solicitor can keep the process moving.",
        },
        {
          title: "Understanding the costs",
          content: "Beyond the deposit, budget for solicitor fees, searches, survey, stamp duty, and mortgage arrangement fees. Sometimes a higher rate with lower fees works out cheaper overall. Calculate the total cost, not just the mortgage rate.",
          bullets: [
            "Ask about fee-free mortgage options",
            "Searches typically cost £250 to £400 in total",
            "Check early repayment charges before committing",
          ],
          whyThisMatters: "Hidden costs can add up; planning ahead avoids surprises.",
        },
        {
          title: "Getting organised",
          content: "The legal stage works best when you respond quickly to requests. Have your ID, proof of address, and source of funds ready. Keep a record of all correspondence and ask your solicitor to explain anything you do not understand.",
          bullets: [
            "Respond promptly when your solicitor asks for information",
            "Create a folder for all property documents",
            "Know your deal-breakers before the process deepens",
          ],
        },
      ]}
      commonQuestions={[
        { q: "When do I need to instruct a solicitor?", a: "As soon as your offer is accepted. The sooner you instruct one, the sooner they can start searches and contract review. Estate agents usually ask for your solicitor details shortly after acceptance." },
        { q: "Do I need a mortgage broker?", a: "No, but brokers can access more products and help with applications. You can also apply directly to lenders. Choose what feels right for you." },
        { q: "How long does the mortgage application take?", a: "Typically two to four weeks from full application to offer. Delays can happen if documents are missing or the lender is busy. Providing everything promptly helps." },
      ]}
      whatCatchesPeopleOut={[
        "Forgetting to factor in stamp duty, searches, survey, and legal fees on top of the deposit",
        "Choosing a solicitor without checking they are on your lender approved panel",
        "Making big financial changes during the mortgage application, which can affect the offer",
      ]}
    />
  );
}

// =====================
// MORTGAGES GUIDE (kept for footer/deep links)
// =====================
// =====================
export function MortgagesGuide({ onBack, onNavigate }: PageProps) {
  return (
    <GuideLayout
      title="Mortgages Explained"
      icon={Home}
      intro="Understanding mortgages doesn't have to be complicated. Here's everything you need to know about borrowing to buy your home."
      onBack={onBack}
      onNavigate={onNavigate}
      previous={{ title: "Prepare for Legal & Financial", href: "guide-prep-legal-financial" }}
      next={{ title: "Legal & Conveyancing", href: "guide-legal-and-conveyancing" }}
      sections={[
        {
          title: "Types of Mortgage",
          content: "Fixed-rate mortgages lock in your interest rate for a set period (typically 2-5 years), giving you payment certainty. Variable rates can go up or down with the market. Tracker mortgages follow the Bank of England base rate, while standard variable rates are set by your lender.",
          tips: [
            "Fixed rates offer certainty - popular for first-time buyers",
            "Consider how long you plan to stay when choosing your term",
            "Remember to budget for when your fixed period ends",
          ],
        },
        {
          title: "How Much Can You Borrow?",
          content: "Lenders typically offer 4-4.5 times your annual income, but this depends on your outgoings, credit score, deposit size, and the lender's criteria. A larger deposit usually means better rates and more borrowing options.",
          tips: [
            "Use online calculators for initial estimates",
            "Get a mortgage in principle before house hunting",
            "Consider speaking to a mortgage broker for wider options",
          ],
        },
        {
          title: "The Application Process",
          content: "After your offer is accepted, you'll make a full mortgage application. You'll need to provide proof of income (payslips, tax returns), bank statements, ID, and details of your outgoings. The lender will value the property and conduct affordability checks.",
          tips: [
            "Gather your documents early to avoid delays",
            "Don't make any big financial changes during the application",
            "Be honest about your finances - lenders will check",
          ],
        },
        {
          title: "Mortgage Fees",
          content: "Beyond the interest rate, consider arrangement fees (£0-£2,000), valuation fees (often included), and early repayment charges if you pay off early or remortgage during the fixed period. Sometimes a higher rate with lower fees works out cheaper overall.",
          tips: [
            "Calculate the total cost over the mortgage term, not just the rate",
            "Ask about fee-free mortgage options",
            "Check early repayment charges before committing",
          ],
        },
      ]}
    />
  );
}

// =====================
// SOLICITORS GUIDE
// =====================
export function SolicitorsGuide({ onBack, onNavigate }: PageProps) {
  return (
    <GuideLayout
      title="Solicitors & Legal"
      icon={FileText}
      intro="Your solicitor (or conveyancer) handles all the legal work of buying a property. Understanding what they do helps you stay informed throughout the process."
      onBack={onBack}
      onNavigate={onNavigate}
      previous={{ title: "Prepare for Legal & Financial", href: "guide-prep-legal-financial" }}
      next={{ title: "Legal & Conveyancing", href: "guide-legal-and-conveyancing" }}
      sections={[
        {
          title: "What Does a Solicitor Do?",
          content: "Your solicitor conducts property searches, reviews the contract, raises enquiries with the seller's solicitor, handles the transfer of funds, and registers you as the new owner. They protect your legal interests throughout the transaction.",
          tips: [
            "Get quotes from 3-4 solicitors before choosing",
            "Check they're on your mortgage lender's approved panel",
            "Ask about their typical response times",
          ],
        },
        {
          title: "Property Searches",
          content: "Searches check for issues that could affect the property. Local authority searches reveal planning applications and road schemes. Environmental searches check for flood risk or contamination. Water and drainage searches confirm the property's connections.",
          tips: [
            "Searches typically cost £250-£400 in total",
            "They can take 2-6 weeks depending on the council",
            "Don't skip searches to save time - they protect you",
          ],
        },
        {
          title: "Contracts and Enquiries",
          content: "Your solicitor reviews the contract and property information provided by the seller. They'll raise enquiries about anything unclear or concerning. This process can take several weeks as questions go back and forth between solicitors.",
          tips: [
            "Respond quickly when your solicitor asks for information",
            "Ask them to explain anything you don't understand",
            "Keep a record of all correspondence",
          ],
        },
        {
          title: "Exchange and Completion",
          content: "At exchange, contracts are signed and you pay your deposit (usually 10%). The sale becomes legally binding - neither party can back out without penalty. Completion is when the remaining money transfers and you get the keys.",
          tips: [
            "Make sure you have buildings insurance from exchange",
            "Confirm the completion date works for all parties",
            "Plan your move before exchange to avoid last-minute stress",
          ],
        },
      ]}
    />
  );
}

// =====================
// SURVEYS GUIDE
// =====================
export function SurveysGuide({ onBack, onNavigate }: PageProps) {
  return (
    <GuideLayout
      title="Surveys & Inspections"
      icon={ClipboardCheck}
      subtitle="How to choose the right survey and what to do with the results"
      intro="A survey can reveal hidden problems that could cost thousands to fix. This stage can feel nerve-wracking, but knowing what to expect helps."
      reassurance="Feeling anxious about survey results is common. Most properties have some minor issues; the survey helps you plan for them."
      onBack={onBack}
      onNavigate={onNavigate}
      previous={{ title: "Legal & Conveyancing", href: "guide-legal-and-conveyancing" }}
      next={{ title: "Moving Day", href: "guide-moving" }}
      sections={[
        {
          title: "Why get a survey",
          content: "The mortgage lender valuation only confirms the property is worth the loan amount. It does not check for defects. A proper survey inspects the property condition and can identify problems with the structure, roof, electrics, plumbing, and more.",
          bullets: [
            "A survey can save you thousands in unexpected repairs",
            "It gives you negotiating power if issues are found",
            "Consider it essential, not optional",
          ],
          whyThisMatters: "Hidden defects can be costly; a survey helps you make an informed decision.",
        },
        {
          title: "Types of survey",
          content: "Level 1 (Condition Report, £300+) is basic, suitable for newer properties. Level 2 (HomeBuyer Report, £400 to £600) is the most popular, covering most conventional properties. Level 3 (Building Survey, £600+) is comprehensive, best for older, larger, or unusual properties.",
          bullets: [
            "For most first-time buyers, a Level 2 survey is appropriate",
            "Consider Level 3 for properties over 50 years old",
            "Ask your surveyor which level they recommend",
          ],
          whyThisMatters: "The right level depends on the property type and age.",
        },
        {
          title: "Understanding the results",
          content: "Surveys use a traffic light system: green (no immediate action), amber (defects requiring repair), and red (serious issues needing urgent attention). Do not panic if there are amber items; most properties have some issues.",
          bullets: [
            "Focus on red and amber items first",
            "Get quotes for any significant repairs",
            "Ask the surveyor to clarify anything unclear",
          ],
        },
        {
          title: "What to do if problems are found",
          content: "You have options: negotiate a price reduction to cover repair costs, ask the seller to fix issues before completion, get specialist reports for specific concerns (for example, damp or electrics), or walk away if issues are too severe.",
          bullets: [
            "Use survey findings as negotiation leverage",
            "Get quotes before asking for a price reduction",
            "Know your deal-breakers before viewing the survey",
          ],
          whyThisMatters: "Survey findings inform your next steps; your solicitor can advise on renegotiation.",
        },
      ]}
      commonQuestions={[
        { q: "Do I need a survey if the lender has done a valuation?", a: "Yes. The lender valuation protects the lender, not you. It checks the property is worth the loan amount, not that it is in good condition. A survey is for your own peace of mind and protection." },
        { q: "What if the survey finds serious problems?", a: "You can negotiate a price reduction, ask the seller to fix issues, get specialist reports, or withdraw from the purchase. Your solicitor can help you decide. There is no obligation to proceed if you are not comfortable." },
        { q: "When should I book the survey?", a: "As soon as your offer is accepted. Surveys can take a few weeks to arrange and complete. Book early to avoid delays in the legal process." },
      ]}
      whatCatchesPeopleOut={[
        "Skipping a survey to save money, then discovering expensive problems after purchase",
        "Choosing the cheapest survey level when the property warrants a more thorough inspection",
        "Panicking at amber items without getting quotes or understanding what is urgent",
      ]}
    />
  );
}

// =====================
// MOVING DAY GUIDE
// =====================
export function MovingDayGuide({ onBack, onNavigate }: PageProps) {
  return (
    <GuideLayout
      title="Moving Day"
      icon={Truck}
      subtitle="How to plan for a smooth transition to your new home"
      intro="After months of preparation, moving day is finally here. Good planning makes the difference between a stressful day and a smooth transition."
      reassurance="Feeling excited and a little overwhelmed is normal. A clear checklist takes the pressure off."
      onBack={onBack}
      onNavigate={onNavigate}
      previous={{ title: "Surveys", href: "guide-surveys" }}
      sections={[
        {
          title: "Before moving day",
          content: "Start planning at least four weeks before completion. Get quotes from removal companies, start decluttering, and begin packing non-essential items. Notify important contacts of your change of address and set up mail redirection with Royal Mail.",
          bullets: [
            "Book removals early; good companies get booked up",
            "Label boxes by room and contents",
            "Create an inventory of valuable items",
          ],
          whyThisMatters: "Advance planning reduces last-minute stress.",
        },
        {
          title: "Utilities and services",
          content: "Contact utility providers to close old accounts and open new ones. Take meter readings at both properties on moving day. Set up broadband in advance as it can take two weeks to activate. Update your address with your bank, employer, DVLA, and GP.",
          bullets: [
            "Photograph meter readings for your records",
            "Consider switching providers for better deals",
            "Keep a list of everyone you need to notify",
          ],
        },
        {
          title: "Moving day checklist",
          content: "On the day, keep important documents, valuables, and essentials in a separate bag. Do a final check of your old property before leaving. Take meter readings, collect all keys, and lock up properly. At the new property, check everything works before the removers leave.",
          bullets: [
            "Pack a first night box with essentials",
            "Keep phone chargers and snacks accessible",
            "Have cash on hand for removals if needed",
          ],
          whyThisMatters: "Knowing where essentials are helps you feel settled quickly.",
        },
        {
          title: "Settling in",
          content: "Once you are in, locate the stopcock, fuse box, and gas meter. Test smoke alarms and consider changing the locks. Take your time unpacking; focus on essential rooms first. Introduce yourself to neighbours when you are ready.",
          bullets: [
            "Find the stopcock before you need it in an emergency",
            "Bleed radiators if the heating seems inefficient",
            "Keep important receipts for any home improvements",
          ],
        },
      ]}
      commonQuestions={[
        { q: "When should I book removals?", a: "As soon as you have exchanged contracts and have a completion date. Good removal companies get booked up, especially in summer. Avoid booking before exchange, as completion dates can change." },
        { q: "Do I need buildings insurance on completion day?", a: "Yes. Your solicitor will usually require evidence of buildings insurance from the day of exchange. Arrange this before exchange so you are covered as soon as the contract is binding." },
        { q: "What if something is wrong when I get the keys?", a: "Note any issues and inform your solicitor. Snagging problems (minor defects) are common in new builds. For older properties, check everything works and report urgent issues to your solicitor promptly." },
      ]}
      whatCatchesPeopleOut={[
        "Leaving mail redirection and address updates until the last minute",
        "Not taking meter readings at both properties on moving day",
        "Forgetting to locate the stopcock and fuse box in the new property on day one",
      ]}
    />
  );
}
