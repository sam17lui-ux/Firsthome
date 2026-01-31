"use client";

import React from "react"

import { ArrowLeft, Home, Search, FileText, ClipboardCheck, Truck, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/footer";

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
  onNavigate 
}: { 
  title: string;
  icon: React.ElementType;
  intro: string;
  sections: { title: string; content: string; tips?: string[] }[];
  onBack: () => void;
  onNavigate: (page: string) => void;
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
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// =====================
// HOUSE HUNTING GUIDE
// =====================
export function HouseHuntingGuide({ onBack, onNavigate }: PageProps) {
  return (
    <GuideLayout
      title="House Hunting Guide"
      icon={Search}
      intro="Finding the right home takes time and patience. This guide will help you search smarter, view effectively, and make confident offers."
      onBack={onBack}
      onNavigate={onNavigate}
      sections={[
        {
          title: "Before You Start Searching",
          content: "Get your finances in order first. Know your budget, have a mortgage in principle, and be clear on what you can realistically afford including all the extra costs. Create a list of must-haves vs nice-to-haves to help focus your search.",
          tips: [
            "Set up alerts on Rightmove, Zoopla, and OnTheMarket",
            "Register with local estate agents in your target areas",
            "Be realistic about your budget - leave room for unexpected costs",
          ],
        },
        {
          title: "Researching Areas",
          content: "Don't just fall in love with a house - research the area thoroughly. Visit at different times of day and week. Check transport links, local amenities, school catchments (even if you don't have children - it affects resale value), and crime statistics.",
          tips: [
            "Walk around the neighbourhood in the evening",
            "Check flood risk on the Environment Agency website",
            "Look at sold prices for similar properties in the area",
          ],
        },
        {
          title: "Viewing Properties",
          content: "Try to view at least 10-15 properties before making an offer. Take photos, make notes, and don't be afraid to ask questions. Look beyond the staging - check windows, electrics, signs of damp, and the condition of the roof from outside.",
          tips: [
            "Bring a checklist to every viewing",
            "Ask why the seller is moving and how long it's been on the market",
            "Request a second viewing for any property you're serious about",
          ],
        },
        {
          title: "Making an Offer",
          content: "Most properties sell below asking price, so don't be afraid to negotiate. Research what similar properties have sold for recently. Consider your position - being chain-free as a first-time buyer is attractive to sellers and can strengthen your offer.",
          tips: [
            "Start below your maximum to leave room for negotiation",
            "Put your offer in writing and state your buying position",
            "Be prepared to walk away if the price doesn't work for you",
          ],
        },
      ]}
    />
  );
}

// =====================
// MORTGAGES GUIDE
// =====================
export function MortgagesGuide({ onBack, onNavigate }: PageProps) {
  return (
    <GuideLayout
      title="Mortgages Explained"
      icon={Home}
      intro="Understanding mortgages doesn't have to be complicated. Here's everything you need to know about borrowing to buy your home."
      onBack={onBack}
      onNavigate={onNavigate}
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
