"use client";

import React from "react"

import { ArrowLeft, ArrowRight, Home, Search, FileText, ClipboardCheck, Truck, CheckCircle2, Handshake, Scale, Wallet, AlertTriangle } from "lucide-react";
import { Footer } from "@/components/footer";
import { ChatEntryPoint } from "@/components/chat-entry-point";
import { GuideNavigation } from "@/components/GuideNavigation";
import { GuideAccordion } from "@/components/GuideAccordion";

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
  content: React.ReactNode;
  bullets?: string[];
  tips?: string[];
  whyThisMatters?: string;
}

interface GuideLayoutProps {
  title: string;
  icon: React.ElementType;
  subtitle: string;
  intro: string;
  reassurance?: string;
  atAGlance?: string[];
  sections: GuideSection[];
      commonQuestions?: { q: string; a: string }[];
  whatCatchesPeopleOut?: string[];
  onBack: () => void;
  onNavigate: (page: string) => void;
  previous?: { title: string; href: string };
  next?: { title: string; href: string };
}

function HelperNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 pl-4 border-l-2 border-slate-600/60 bg-slate-800/40 rounded-r-lg py-3 pr-4">
      <p className="text-slate-400 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function GuideLayout({
  title,
  icon: Icon,
  subtitle,
  intro,
  reassurance,
  atAGlance,
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

      <div className="max-w-3xl mx-auto px-6 py-8 pb-32">
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

        {atAGlance && atAGlance.length > 0 && (
          <div className="mb-8 rounded-xl border border-slate-700/60 bg-slate-800/50 p-5">
            <h2 className="text-base font-semibold text-white mb-3">At a glance</h2>
            <ul className="space-y-2">
              {atAGlance.slice(0, 4).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-4">
          {sections.map((section, index) => (
            <GuideAccordion
              key={index}
              id={`section-${index}`}
              title={section.title}
              sectionNumber={index + 1}
            >
              <p className="text-slate-300 leading-relaxed mb-4">{section.content}</p>
              {(section.bullets || section.tips) && (
                <ul className="space-y-3 mb-4">
                  {(section.bullets || section.tips || []).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.whyThisMatters && (
                <HelperNote>{section.whyThisMatters}</HelperNote>
              )}
            </GuideAccordion>
          ))}
        </div>

        {whatCatchesPeopleOut && whatCatchesPeopleOut.length > 0 && (
          <section className="mt-8 mb-6 rounded-xl border-2 border-slate-600/60 bg-slate-800/60 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-slate-400 shrink-0" strokeWidth={1.5} aria-hidden />
              <h2 className="text-xl font-semibold text-white">What catches people out at this stage</h2>
            </div>
            <ul className="space-y-3">
              {whatCatchesPeopleOut.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {commonQuestions.length > 0 && (
        <section className="mt-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Common questions at this stage</h2>
          <div className="space-y-2">
            {commonQuestions.map((item, i) => (
              <GuideAccordion
                key={i}
                id={`faq-${i}`}
                title={item.q}
              >
                <p className="text-slate-300 text-sm leading-relaxed">{item.a}</p>
              </GuideAccordion>
            ))}
          </div>
        </section>
        )}

        <GuideNavigation previous={previous} next={next} onNavigate={onNavigate} />
      </div>

      {next && (
        <div className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between gap-4 px-4 py-3 bg-slate-900/95 backdrop-blur border-t border-slate-700/60">
          <span className="text-sm text-slate-400">Next stage: {next.title}</span>
          <button
            type="button"
            onClick={() => onNavigate(next.href)}
            className="shrink-0 px-4 py-2 text-sm font-medium bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            Continue to next stage
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

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
    <GuideLayout
      title="House hunting"
      icon={Search}
      subtitle="How to find the right home without feeling overwhelmed"
      intro="House hunting is often the most emotional part of buying a home. This guide helps you focus on what matters, what you can ignore, and how to stay realistic."
      reassurance="Feeling unsure is completely normal. Most first-time buyers only start to feel confident after several viewings."
      atAGlance={[
        "Know your real budget before viewing",
        "Define must-haves vs nice-to-haves",
        "Take structured notes during viewings",
        "Expect competition in busy markets",
      ]}
      onBack={onBack}
      onNavigate={onNavigate}
      next={{ title: "Making an Offer", href: "guide-making-an-offer" }}
      sections={[
        {
          title: "Know what you can afford",
          content: "Before you book viewings, understand what you can realistically afford, not just the asking price. The listing price is not the full picture. Buying a home comes with ongoing monthly costs too.",
          bullets: [
            "Get a mortgage in principle to understand your likely budget",
            "Think about your deposit, monthly mortgage payments, and day-to-day living costs",
            "Factor in council tax, utilities, and maintenance",
          ],
          whyThisMatters: "Setting clear guardrails helps you avoid wasting time on homes that stretch you too far.",
        },
        {
          title: "Must-haves vs nice-to-haves",
          content: "It is easy to want everything, but very few first homes tick every box. Focus on must-haves: what works for your daily life (location, size, layout), what is affordable long-term, and what suits your plans over the next few years. Nice-to-haves might include a big garden, a brand-new kitchen, or a home office.",
          whyThisMatters: "You can often change a kitchen later. You cannot change the location.",
        },
        {
          title: "Viewing properties",
          content: "Viewing homes is exciting, but first viewings are rarely the one. Take your time and stay objective. Go prepared: ask about recent repairs, check the age of key systems (boiler, electrics), and ask about the neighbourhood and nearby developments. Watch out for damp smells, large cracks, or fresh paint that might hide problem areas.",
          whyThisMatters: "If something feels rushed or brushed off, it is okay to walk away.",
        },
        {
          title: "Making comparisons",
          content: "After a few viewings, homes can start to blur together. Make short notes immediately after each viewing. Compare homes based on facts, not first impressions. Revisit listings later; they often look different once emotions settle.",
          whyThisMatters: "Many buyers only realise what matters after comparing a few homes side by side.",
        },
        {
          title: "Market reality",
          content: "In busy areas you may miss out on homes you like, need to view quickly, or compete with other buyers. This is frustrating, but normal. Missing out does not mean you failed. It happens to most buyers at some point.",
        },
      ]}
      whatCatchesPeopleOut={[
        "Viewing without knowing your budget, then falling for a property you cannot afford",
        "Comparing homes in your head without writing notes, so they blur together",
        "Focusing on cosmetic features instead of location and structural condition",
      ]}
      commonQuestions={[
        { q: "How many viewings should I do before making an offer?", a: "There is no magic number. Some buyers know quickly; others need ten or more viewings to feel clear. Trust your own pace and do not rush because the market feels fast." },
        { q: "Should I make an offer on the first property I like?", a: "It depends. If it ticks your must-haves and you can afford it, making an offer is reasonable. If you are unsure, viewing a few more properties can help you compare. An offer is not legally binding until much later." },
        { q: "What if I keep missing out on properties?", a: "Missing out is common and does not mean you are doing anything wrong. Consider whether your criteria are realistic for your budget, and whether you need to move faster or broaden your search area." },
      ]}
    />
  );
}

// =====================
// MAKING AN OFFER GUIDE
// =====================
export function MakingAnOfferGuide({ onBack, onNavigate }: PageProps) {
  return (
    <GuideLayout
      title="Making an offer"
      icon={Handshake}
      subtitle="What happens when you decide to move forward, and what is normal to expect"
      intro="As a first-time buyer, making an offer can feel like a big moment. This guide explains what it means, what happens next, and what you do not need to worry about yet."
      reassurance="An offer is not legally binding. At this stage, nothing is final, and it is okay to change your mind."
      atAGlance={[
        "An offer is the start of a conversation, not a commitment",
        "Have proof of deposit and mortgage in principle ready",
        "Silence after acceptance is normal while solicitors work",
        "Sales can fall through before exchange",
      ]}
      onBack={onBack}
      onNavigate={onNavigate}
      previous={{ title: "House Hunting", href: "guide-house-hunting" }}
      next={{ title: "Prepare for Legal & Financial", href: "guide-prep-legal-financial" }}
      sections={[
        {
          title: "What making an offer means",
          content: "Making an offer is simply telling the seller what you are willing to pay. It is the start of a conversation, not a commitment.",
          bullets: [
            "Offers are usually made through the estate agent",
            "The seller can accept, reject, or counter your offer",
            "Nothing is legally binding until much later in the process",
          ],
        },
        {
          title: "What you will usually be asked for",
          content: "When you make an offer, the estate agent may ask for basic information such as proof of deposit, mortgage in principle, and your position (for example, first-time buyer or chain-free). This is normal and does not mean anything has been agreed yet.",
          whyThisMatters: "This helps the seller assess how proceedable you are.",
        },
        {
          title: "If your offer is accepted",
          content: "If the seller accepts, the property is usually marked as sold subject to contract. The legal process is about to begin, but things can still change. You will be asked to instruct a solicitor, surveys will be arranged, and legal checks and searches will begin.",
          whyThisMatters: "You might not hear much for a while. That is normal.",
        },
        {
          title: "If your offer is not accepted",
          content: "Having an offer rejected is disappointing, but very common. Most buyers miss out on at least one property before succeeding. Sellers may receive multiple offers. Timing and circumstances often matter as much as price. You can choose to increase your offer, walk away, or keep looking.",
          whyThisMatters: "It does not mean you did anything wrong.",
        },
        {
          title: "Offers can fall through",
          content: "Even after an offer is accepted, sales can fall through. It is disappointing, but it happens for many reasons outside your control.",
        },
      ]}
      whatCatchesPeopleOut={[
        "Thinking an accepted offer means the purchase is guaranteed",
        "Not having proof of deposit and mortgage in principle ready when asked",
        "Assuming silence means something has gone wrong when delays are normal",
      ]}
      commonQuestions={[
        { q: "Can I change my mind after my offer is accepted?", a: "Before contracts are exchanged, you can withdraw without penalty. Your offer is not legally binding until exchange. Bear in mind that you may lose money already spent on surveys or legal fees." },
        { q: "Why is the estate agent asking for so much information?", a: "Estate agents want to know you are a serious, proceedable buyer. Proof of deposit and mortgage in principle show the seller you can complete the purchase. This is standard practice." },
        { q: "How long does it take to hear back after making an offer?", a: "It varies. Some sellers respond within hours; others take days, especially if they have multiple offers or need to consult others. The estate agent will usually give you an idea of the timeline." },
      ]}
    />
  );
}

// =====================
// LEGAL & CONVEYANCING GUIDE
// =====================
export function LegalAndConveyancingGuide({ onBack, onNavigate }: PageProps) {
  return (
    <GuideLayout
      title="Legal & conveyancing"
      icon={Scale}
      subtitle="What the legal stage involves, and why it often feels slow"
      intro="Legal and conveyancing is the part of the process where the paperwork happens. It is often the longest stage, with the fewest visible updates. This guide explains what is going on behind the scenes and what is normal to expect."
      reassurance="Long periods of silence are common at this stage. It usually means work is happening in the background."
      atAGlance={[
        "Your solicitor handles title checks, contracts, and enquiries",
        "Searches can take several weeks depending on the council",
        "Slow progress is usual and does not mean a problem",
        "Do not book removals until after exchange",
      ]}
      onBack={onBack}
      onNavigate={onNavigate}
      previous={{ title: "Prepare for Legal & Financial", href: "guide-prep-legal-financial" }}
      next={{ title: "Surveys", href: "guide-surveys" }}
      sections={[
        {
          title: "What conveyancing is",
          content: "Conveyancing is the legal work that transfers ownership of a property from the seller to you. Your solicitor handles this process on your behalf.",
          bullets: [
            "Checking the legal title",
            "Reviewing contracts",
            "Raising and answering legal enquiries",
          ],
          whyThisMatters: "This stage is detailed and methodical by design.",
        },
        {
          title: "Searches and checks",
          content: "Your solicitor will order searches (such as local authority, water and drainage, and environmental) to uncover information about the property and the local area. Searches can take several weeks, depending on the local council.",
          whyThisMatters: "These checks protect you from unknown issues that could affect the property.",
        },
        {
          title: "Surveys and enquiries",
          content: (
            <>
              While legal checks are ongoing, surveys are usually carried out. See our{" "}
              <button type="button" onClick={() => onNavigate("guide-surveys")} className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
                Surveys guide
              </button>{" "}
              for more on what they involve. Survey results may lead to further questions or negotiations. Issues found do not automatically mean the purchase will fail. Your solicitor may raise additional enquiries.
            </>
          ),
        },
        {
          title: "Why this stage feels slow",
          content: "Many different parties are involved: solicitors, surveyors, and local authorities. Progress depends on responses from several organisations. Slow progress is usual here. It does not mean there is a problem.",
          whyThisMatters: "Patience at this stage is normal and expected.",
        },
        {
          title: "Things can still change",
          content: "Until contracts are exchanged, either side can still withdraw. This uncertainty is frustrating, but it is part of the process. Try not to make irreversible plans until exchange has taken place.",
        },
      ]}
      whatCatchesPeopleOut={[
        "Delaying responses to solicitor requests, which slows the whole chain",
        "Booking removals before exchange, when dates are still provisional",
        "Assuming slow progress means a problem when third-party delays are common",
      ]}
      commonQuestions={[
        { q: "Why is my solicitor taking so long to respond?", a: "Solicitors are often waiting on third parties such as councils, water companies, or the seller solicitor. You can ask for an update, but delays are often outside their control. A polite chase every two weeks is reasonable." },
        { q: "What are legal enquiries?", a: "Enquiries are questions your solicitor raises about the property or the contract. The seller solicitor responds, and this back and forth can take several weeks. It is how your solicitor protects your interests." },
        { q: "When will I know my completion date?", a: "The completion date is agreed at exchange, when contracts become legally binding. Before that, any dates discussed are provisional. Do not book removals until exchange has happened." },
      ]}
    />
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
      atAGlance={[
        "Get a mortgage in principle before house hunting",
        "Get quotes from three to four solicitors",
        "Budget for legal fees, searches, survey, and stamp duty",
        "Respond promptly to solicitor requests",
      ]}
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
      subtitle="Everything you need to know about borrowing to buy your home"
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
      subtitle="Understanding what your solicitor does and how the legal process works"
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
      atAGlance={[
        "A survey protects you beyond the lender valuation",
        "Level 2 (HomeBuyer Report) suits most properties",
        "Focus on red and amber items in the report",
        "Use findings to negotiate or plan repairs",
      ]}
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
      atAGlance={[
        "Book removals as soon as you have a completion date",
        "Set up mail redirection and notify contacts early",
        "Take meter readings at both properties on moving day",
        "Pack a first night box with essentials",
      ]}
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
