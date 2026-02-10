"use client";

import React from "react"

import { ArrowLeft, Home, Search, FileText, ClipboardCheck, Truck, CheckCircle2, Handshake, Scale, Wallet } from "lucide-react";
import { Footer } from "@/components/footer";
import { ChatEntryPoint } from "@/components/chat-entry-point";
import { GuideNavigation } from "@/components/GuideNavigation";

interface PageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

// Shared guide layout component
function GuideLayout({
  title,
  icon: Icon,
  intro,
  sections,
  onBack,
  onNavigate,
  previous,
  next,
}: {
  title: string;
  icon: React.ElementType;
  intro: string;
  sections: { title: string; content: string; tips?: string[] }[];
  onBack: () => void;
  onNavigate: (page: string) => void;
  previous?: { title: string; href: string };
  next?: { title: string; href: string };
}) {
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
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-teal-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>

        <p className="text-slate-300 text-lg leading-relaxed mb-8">{intro}</p>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
              <p className="text-slate-300 leading-relaxed mb-4">{section.content}</p>
              {section.tips && (
                <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
                  <h4 className="text-teal-400 font-medium text-sm mb-2">Top Tips</h4>
                  <ul className="space-y-2">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

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
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
            <Search className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">House hunting</h1>
            <p className="text-slate-400 mt-1">How to find the right home without feeling overwhelmed</p>
          </div>
        </div>

        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          House hunting is often the most emotional part of buying a home.
          This guide helps you focus on what really matters, what you can ignore, and how to stay realistic, especially if this is your first time.
        </p>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 mb-8">
          <p className="text-slate-300 leading-relaxed">
            <span className="font-medium text-white">Feeling unsure is completely normal.</span>
            <br />
            Most first-time buyers only start to feel confident after several viewings.
          </p>
        </div>

        {/* Section 1 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Know what you can afford (before you fall in love)</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Before you book viewings, it's important to understand what you can realistically afford, not just the asking price.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            The price on the listing isn't the full picture. Buying a home comes with ongoing monthly costs too.
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
              <span>Factor in costs beyond the mortgage, such as: Council tax, Utilities, Maintenance and repairs</span>
            </li>
          </ul>
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
            <p className="text-slate-300 text-sm"><span className="font-medium text-teal-400">Helper note:</span> Think of this as setting guardrails. It helps you avoid wasting time on homes that stretch you too far.</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Must-haves vs nice-to-haves</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            It's easy to want everything, but very few first homes tick every box.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-medium text-teal-400 mb-2">Must-haves</h3>
              <ul className="space-y-1 text-slate-300 text-sm">
                <li>• Works for your daily life (location, size, layout)</li>
                <li>• Affordable long-term</li>
                <li>• Suitable for your plans over the next few years</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-teal-400 mb-2">Nice-to-haves</h3>
              <ul className="space-y-1 text-slate-300 text-sm">
                <li>• Big garden</li>
                <li>• Brand-new kitchen</li>
                <li>• Home office</li>
              </ul>
            </div>
          </div>
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
            <p className="text-slate-300 text-sm"><span className="font-medium text-teal-400">Tip:</span> You can often change a kitchen later. You can't change the location.</p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Viewing properties</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Viewing homes is exciting, but first viewings are rarely "the one".
            Take your time and try to stay objective.
          </p>
          <div className="space-y-4 mb-4">
            <div>
              <h3 className="text-sm font-medium text-teal-400 mb-2">Go prepared</h3>
              <ul className="space-y-1 text-slate-300 text-sm">
                <li>• Ask about recent repairs or upgrades</li>
                <li>• Check the age of key systems (like the boiler or electrics)</li>
                <li>• Ask about the neighbourhood, parking, and nearby developments</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-teal-400 mb-2">Watch out for red flags</h3>
              <ul className="space-y-1 text-slate-300 text-sm">
                <li>• Damp smells or visible mould</li>
                <li>• Large cracks in walls or ceilings</li>
                <li>• Fresh paint or furniture hiding problem areas</li>
              </ul>
            </div>
          </div>
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
            <p className="text-slate-300 text-sm"><span className="font-medium text-teal-400">Note:</span> If something feels rushed or brushed off, it's okay to walk away.</p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Making comparisons (this really helps later)</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            After a few viewings, homes can start to blur together.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Make short notes immediately after each viewing</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Compare homes based on facts, not first impressions</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Revisit listings later. They often look different once emotions settle</span>
            </li>
          </ul>
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
            <p className="text-slate-300 text-sm"><span className="font-medium text-teal-400">Helper note:</span> Many buyers only realise what actually matters after comparing a few homes side by side.</p>
          </div>
        </section>

        {/* Optional Section */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Market reality check</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            In busy areas, you may:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-1 mb-4">
            <li>Miss out on homes you like</li>
            <li>Need to view quickly</li>
            <li>Compete with other buyers</li>
          </ul>
          <p className="text-slate-300 leading-relaxed mb-4">
            This is frustrating, but normal.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Missing out doesn&apos;t mean you failed. It happens to most buyers at some point.
          </p>
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
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
            <Handshake className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Making an offer</h1>
            <p className="text-slate-400 mt-1">What happens when you decide to move forward, and what's normal to expect</p>
          </div>
        </div>

        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          Making an offer can feel like a big moment, especially the first time.
          This guide explains what making an offer actually means, what happens next, and what you don&apos;t need to worry about yet.
        </p>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 mb-8">
          <p className="text-slate-300 leading-relaxed">
            <span className="font-medium text-white">An offer is not legally binding.</span>
            <br />
            At this stage, nothing is final, and it&apos;s okay to change your mind.
          </p>
        </div>

        {/* Section 1 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">What &quot;making an offer&quot; really means</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Making an offer is simply telling the seller what you&apos;re willing to pay for the property.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            It&apos;s the start of a conversation, not a commitment.
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

        {/* Section 2 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">What you&apos;ll usually be asked for</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            When you make an offer, the estate agent may ask for some basic information.
            This is normal and doesn&apos;t mean anything has been agreed yet.
          </p>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-teal-400 mb-2">Common requests</h3>
            <ul className="space-y-1 text-slate-300 text-sm">
              <li>• Proof of deposit</li>
              <li>• Mortgage in principle</li>
              <li>• Your position (for example, first-time buyer or chain-free)</li>
            </ul>
          </div>
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
            <p className="text-slate-300 text-sm"><span className="font-medium text-teal-400">Note:</span> This helps the seller assess how proceedable you are.</p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">If your offer is accepted</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            If the seller accepts your offer, the property is usually marked as &quot;sold subject to contract&quot;.
            This means the legal process is about to begin, but things can still change.
          </p>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-teal-400 mb-2">What usually happens next</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>You&apos;ll be asked to instruct a solicitor</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>Surveys are arranged</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>Legal checks and searches begin</span>
              </li>
            </ul>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-300 text-sm"><span className="font-medium text-white">Reassurance:</span> You might not hear much for a while. That&apos;s normal.</p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">If your offer isn&apos;t accepted</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Having an offer rejected is disappointing, but very common.
            Most buyers miss out on at least one property before succeeding.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Sellers may receive multiple offers</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Timing and circumstances often matter as much as price</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>You can choose to increase your offer, walk away, or keep looking</span>
            </li>
          </ul>
        </section>

        {/* Optional Section */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Offers can fall through</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Even after an offer is accepted, sales can fall through.
            It&apos;s disappointing, but it happens for many reasons outside your control.
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-300 text-sm"><span className="font-medium text-white">Reassurance:</span> It doesn&apos;t mean you did anything wrong.</p>
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
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
            <Scale className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Legal & conveyancing</h1>
            <p className="text-slate-400 mt-1">What the legal stage involves, and why it often feels slow</p>
          </div>
        </div>

        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          Legal and conveyancing is the part of the process where the paperwork happens.
          It&apos;s often the longest stage, and the one with the fewest visible updates.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          This guide explains what&apos;s going on behind the scenes and what&apos;s normal to expect.
        </p>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 mb-8">
          <p className="text-slate-300 leading-relaxed">
            <span className="font-medium text-white">Long periods of silence are common at this stage.</span>
            <br />
            It usually means work is happening in the background.
          </p>
        </div>

        {/* Section 1 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">What conveyancing actually is</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Conveyancing is the legal work that transfers ownership of a property from the seller to you.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            Your solicitor handles this process on your behalf.
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
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
            <p className="text-slate-300 text-sm"><span className="font-medium text-teal-400">Helper note:</span> This stage is detailed and methodical by design.</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Searches and checks</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Your solicitor will order searches (such as local authority, water and drainage, and environmental) to uncover information about the property and the local area.
            Searches can take several weeks, depending on the local council.
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Surveys and enquiries</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            While legal checks are ongoing, surveys are usually carried out.{" "}
            <button type="button" onClick={() => onNavigate("guide-surveys")} className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
              see our Surveys guide
            </button>{" "}
            for more on what they involve.
            Survey results may lead to further questions or negotiations.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Issues found don&apos;t automatically mean the purchase will fail</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>Your solicitor may raise additional enquiries</span>
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Why this stage feels slow</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Many different parties are involved at this point:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-1 mb-4">
            <li>Solicitors</li>
            <li>Surveyors</li>
            <li>Local authorities</li>
          </ul>
          <p className="text-slate-300 leading-relaxed mb-4">
            Progress depends on responses from several organisations.
            Slow progress is usual here. It doesn&apos;t mean there&apos;s a problem.
          </p>
        </section>

        {/* Optional Section */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Things can still change</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Until contracts are exchanged, either side can still withdraw.
            This uncertainty is frustrating, but it&apos;s part of the process.
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-300 text-sm"><span className="font-medium text-white">Reassurance:</span> Try not to make irreversible plans until exchange has taken place.</p>
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
      intro="Once your offer is accepted, you'll need to get your finances and legal team in order. This guide covers what to sort out before the legal process begins."
      onBack={onBack}
      onNavigate={onNavigate}
      previous={{ title: "Making an Offer", href: "guide-making-an-offer" }}
      next={{ title: "Legal & Conveyancing", href: "guide-legal-and-conveyancing" }}
      sections={[
        {
          title: "Mortgage in Principle",
          content: "Get a mortgage in principle before house hunting so you know your budget. After your offer is accepted, you'll make a full application. Lenders typically offer 4-4.5 times your annual income, depending on your outgoings and credit score. A larger deposit usually means better rates.",
          tips: [
            "Use online calculators for initial estimates",
            "Gather proof of income and bank statements early",
            "Don't make big financial changes during the application",
          ],
        },
        {
          title: "Choosing a Solicitor",
          content: "Your solicitor (or conveyancer) handles all the legal work: property searches, contract review, enquiries, and transferring ownership. Get quotes from 3-4 solicitors and check they're on your lender's approved panel.",
          tips: [
            "Ask about typical response times",
            "Check they specialise in residential conveyancing",
            "Understand their fee structure upfront",
          ],
        },
        {
          title: "Understanding the Costs",
          content: "Beyond the deposit, budget for solicitor fees, searches, survey, stamp duty, and mortgage arrangement fees. Sometimes a higher rate with lower fees works out cheaper overall. Calculate the total cost, not just the mortgage rate.",
          tips: [
            "Ask about fee-free mortgage options",
            "Searches typically cost £250-£400 in total",
            "Check early repayment charges before committing",
          ],
        },
        {
          title: "Getting Organised",
          content: "The legal stage works best when you respond quickly to requests. Have your ID, proof of address, and source of funds ready. Keep a record of all correspondence and ask your solicitor to explain anything you don't understand.",
          tips: [
            "Respond promptly when your solicitor asks for information",
            "Create a folder for all property documents",
            "Know your deal-breakers before the process deepens",
          ],
        },
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
      intro="A survey can reveal hidden problems that could cost thousands to fix. Here's how to choose the right survey and what to do with the results."
      onBack={onBack}
      onNavigate={onNavigate}
      previous={{ title: "Legal & Conveyancing", href: "guide-legal-and-conveyancing" }}
      next={{ title: "Moving Day", href: "guide-moving" }}
      sections={[
        {
          title: "Why Get a Survey?",
          content: "The mortgage lender's valuation only confirms the property is worth the loan amount - it doesn't check for defects. A proper survey inspects the property's condition and can identify problems with the structure, roof, electrics, plumbing, and more.",
          tips: [
            "A survey could save you thousands in unexpected repairs",
            "It gives you negotiating power if issues are found",
            "Consider it essential, not optional",
          ],
        },
        {
          title: "Types of Survey",
          content: "Level 1 (Condition Report, £300+) is basic, suitable for newer properties. Level 2 (HomeBuyer Report, £400-£600) is the most popular, covering most conventional properties. Level 3 (Building Survey, £600+) is comprehensive, best for older, larger, or unusual properties.",
          tips: [
            "For most first-time buyers, a Level 2 survey is appropriate",
            "Consider Level 3 for properties over 50 years old",
            "Ask your surveyor which level they recommend",
          ],
        },
        {
          title: "Understanding the Results",
          content: "Surveys use a traffic light system: green (no immediate action), amber (defects requiring repair), and red (serious issues needing urgent attention). Don't panic if there are amber items - most properties have some issues.",
          tips: [
            "Focus on red and amber items first",
            "Get quotes for any significant repairs",
            "Ask the surveyor to clarify anything unclear",
          ],
        },
        {
          title: "What to Do If Problems Are Found",
          content: "You have options: negotiate a price reduction to cover repair costs, ask the seller to fix issues before completion, get specialist reports for specific concerns (e.g., damp, electrics), or walk away if issues are too severe.",
          tips: [
            "Use survey findings as negotiation leverage",
            "Get quotes before asking for a price reduction",
            "Know your deal-breakers before viewing the survey",
          ],
        },
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
      title="Moving Day Guide"
      icon={Truck}
      intro="After months of preparation, moving day is finally here. Good planning makes the difference between a stressful day and a smooth transition to your new home."
      onBack={onBack}
      onNavigate={onNavigate}
      previous={{ title: "Surveys", href: "guide-surveys" }}
      sections={[
        {
          title: "Before Moving Day",
          content: "Start planning at least 4 weeks before completion. Get quotes from removal companies, start decluttering, and begin packing non-essential items. Notify important contacts of your change of address and set up mail redirection with Royal Mail.",
          tips: [
            "Book removals early - good companies get booked up",
            "Label boxes by room and contents",
            "Create an inventory of valuable items",
          ],
        },
        {
          title: "Utilities and Services",
          content: "Contact utility providers to close old accounts and open new ones. Take meter readings at both properties on moving day. Set up broadband in advance as it can take 2 weeks to activate. Update your address with your bank, employer, DVLA, and GP.",
          tips: [
            "Photograph meter readings for your records",
            "Consider switching providers for better deals",
            "Keep a list of everyone you need to notify",
          ],
        },
        {
          title: "Moving Day Checklist",
          content: "On the day, keep important documents, valuables, and essentials in a separate bag. Do a final check of your old property before leaving. Take meter readings, collect all keys, and lock up properly. At the new property, check everything works before the removers leave.",
          tips: [
            "Pack a 'first night' box with essentials",
            "Keep phone chargers and snacks accessible",
            "Have cash on hand to tip removal workers",
          ],
        },
        {
          title: "Settling In",
          content: "Once you're in, locate the stopcock, fuse box, and gas meter. Test smoke alarms and consider changing the locks. Take your time unpacking - focus on essential rooms first. Introduce yourself to neighbours when you're ready.",
          tips: [
            "Find the stopcock before you need it in an emergency",
            "Bleed radiators if the heating seems inefficient",
            "Keep important receipts for any home improvements",
          ],
        },
      ]}
    />
  );
}
