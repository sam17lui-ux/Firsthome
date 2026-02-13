"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  Calculator,
  PoundSterling,
  Calendar,
  Home,
  FileText,
  Key,
  Truck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/footer";

interface PageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

// =====================
// FAQs PAGE
// =====================
const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How much deposit do I need to buy a house?",
        a: "Most lenders require a minimum deposit of 5-10% of the property price. However, a larger deposit (15-20%) typically gets you better mortgage rates. For a £250,000 home, you'd need £12,500-£50,000 depending on your target deposit percentage.",
      },
      {
        q: "What is a mortgage in principle (MIP)?",
        a: "A Mortgage in Principle (also called Agreement in Principle or Decision in Principle) is a statement from a lender indicating how much they'd likely lend you. It's based on a soft credit check and your financial details. While not a guarantee, it shows estate agents you're a serious buyer.",
      },
      {
        q: "How long does it take to buy a house?",
        a: "On average, it takes 12-16 weeks from having an offer accepted to completion. However, this can vary significantly based on the chain length, survey issues, and legal complexities. First-time buyers in a chain-free situation often complete faster.",
      },
    ],
  },
  {
    category: "Mortgages & Finance",
    questions: [
      {
        q: "What's the difference between fixed and variable rate mortgages?",
        a: "A fixed-rate mortgage locks in your interest rate for a set period (typically 2-5 years), giving you payment certainty. Variable rates can go up or down with the market, potentially saving money but carrying more risk. Most first-time buyers choose fixed rates for budget predictability.",
      },
      {
        q: "What fees should I budget for when buying a house?",
        a: "Beyond the deposit, budget for: Stamp Duty (if applicable), solicitor fees (£1,000-£1,500), survey costs (£300-£700), mortgage arrangement fees (£0-£2,000), moving costs (£500-£1,500), and an emergency fund for immediate repairs or furnishing.",
      },
      {
        q: "Can I get help with my first home purchase?",
        a: "Yes! Several schemes exist for first-time buyers: Lifetime ISA (25% government bonus up to £1,000/year), Help to Buy ISA (closing to new applicants), Shared Ownership (buy a share and pay rent on the rest), and First Homes scheme (30-50% discount on new builds).",
      },
    ],
  },
  {
    category: "The Legal Process",
    questions: [
      {
        q: "What does a solicitor/conveyancer do?",
        a: "Your solicitor handles all legal aspects: conducting property searches, reviewing contracts, liaising with the seller's solicitor, arranging the transfer of funds, and registering you as the new owner with the Land Registry. They protect your interests throughout the transaction.",
      },
      {
        q: "What are property searches and why are they important?",
        a: "Searches check for issues that could affect the property: local authority searches reveal planning applications, environmental searches check for flood risk or contamination, and water/drainage searches confirm connections. They typically cost £250-£400 but can save you from expensive surprises.",
      },
      {
        q: "What happens on exchange and completion?",
        a: "Exchange is when contracts are signed and you pay your deposit (usually 10%) - the sale becomes legally binding. Completion is when the remaining money transfers, you get the keys, and the property is officially yours. These are usually 1-4 weeks apart.",
      },
    ],
  },
  {
    category: "Surveys & Inspections",
    questions: [
      {
        q: "Do I need a survey?",
        a: "While not legally required, a survey is highly recommended. The lender's valuation only confirms the property is worth the loan amount - it doesn't check for defects. A proper survey can identify issues that could cost thousands to fix.",
      },
      {
        q: "What types of survey are available?",
        a: "Three main types: Level 1 (Condition Report, £300+) for newer homes in good condition; Level 2 (HomeBuyer Report, £400-£600) the most popular choice for conventional properties; Level 3 (Building Survey, £600+) for older, larger, or unusual properties.",
      },
      {
        q: "What if the survey finds problems?",
        a: "Don't panic - most surveys find some issues. Your options include: negotiating a price reduction, asking the seller to fix issues before completion, getting specialist reports for specific concerns, or walking away if issues are too severe (you'll lose survey costs but avoid bigger problems).",
      },
    ],
  },
];

export function FAQsPage({ onBack, onNavigate }: PageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.a.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

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
        <h1 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h1>
        <p className="text-slate-400 mb-8">
          Everything you need to know about buying your first home
        </p>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-12 rounded-xl"
          />
        </div>

        <div className="space-y-8">
          {filteredFaqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-lg font-semibold text-teal-400 mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((item, qIndex) => {
                  const id = `${catIndex}-${qIndex}`;
                  const isOpen = openItems.includes(id);
                  return (
                    <div
                      key={id}
                      className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left"
                      >
                        <span className="text-white font-medium pr-4">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4">
                          <p className="text-slate-300 leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// =====================
// GLOSSARY PAGE
// =====================
const glossaryData = [
  { term: "Agreement in Principle (AIP)", definition: "A statement from a lender showing how much they would potentially lend you, based on a credit check and your financial situation. Also called Decision in Principle or Mortgage in Principle." },
  { term: "Bridging Loan", definition: "A short-term loan used to 'bridge' the gap when buying a new property before selling your current one. Usually has higher interest rates." },
  { term: "Chain", definition: "A series of linked property transactions where each sale depends on another. Being 'chain-free' (as a first-time buyer) is attractive to sellers." },
  { term: "Completion", definition: "The final stage of buying a house when the money is transferred, ownership changes hands, and you get the keys." },
  { term: "Conveyancing", definition: "The legal process of transferring property ownership from seller to buyer. Handled by a solicitor or licensed conveyancer." },
  { term: "Deposit", definition: "The upfront amount you pay towards the property price. Typically 5-20% of the purchase price for first-time buyers." },
  { term: "Equity", definition: "The portion of your property that you own outright - the value minus any outstanding mortgage." },
  { term: "Exchange of Contracts", definition: "The point when both parties sign contracts and the buyer pays the deposit. The sale becomes legally binding." },
  { term: "Freehold", definition: "Complete ownership of property and land indefinitely. Most houses are freehold." },
  { term: "Gazumping", definition: "When a seller accepts a higher offer from another buyer after already accepting yours. Legal but frustrating." },
  { term: "Gazundering", definition: "When a buyer lowers their offer at the last minute, usually just before exchange." },
  { term: "Help to Buy ISA", definition: "A savings account where the government adds 25% bonus (up to £3,000) for first-time buyers. Now closed to new applicants." },
  { term: "Land Registry", definition: "The government department that records property ownership in England and Wales." },
  { term: "Leasehold", definition: "Ownership of a property for a set period (the lease term), but not the land it sits on. Common for flats." },
  { term: "Lifetime ISA (LISA)", definition: "A savings account for 18-39 year olds where the government adds 25% bonus (up to £1,000/year) for first home purchase or retirement." },
  { term: "LTV (Loan to Value)", definition: "The mortgage amount as a percentage of the property value. Lower LTV usually means better rates." },
  { term: "Mortgage Offer", definition: "A formal offer from a lender confirming they will lend you a specific amount for a specific property." },
  { term: "Negative Equity", definition: "When your property is worth less than your outstanding mortgage. Can make it difficult to move or remortgage." },
  { term: "Searches", definition: "Checks conducted by your solicitor on the property, including local authority, environmental, and drainage searches." },
  { term: "Stamp Duty Land Tax", definition: "A tax paid on property purchases over certain thresholds. First-time buyers have higher thresholds and potential relief." },
  { term: "Survey", definition: "An inspection of the property's condition. Different levels available from basic to comprehensive." },
  { term: "Title Deeds", definition: "Legal documents proving ownership of a property." },
  { term: "Valuation", definition: "An assessment of a property's value, usually conducted for the lender to ensure it's worth the loan amount." },
];

export function GlossaryPage({ onBack, onNavigate }: PageProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = glossaryData.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const letter = term.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, typeof glossaryData>);

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
        <h1 className="text-3xl font-bold text-white mb-2">Homebuying Glossary</h1>
        <p className="text-slate-400 mb-8">
          Plain English definitions for all those confusing property terms
        </p>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-12 rounded-xl"
          />
        </div>

        <div className="space-y-8">
          {Object.entries(groupedTerms)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, terms]) => (
              <div key={letter}>
                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-teal-400 font-bold text-lg">{letter}</span>
                </div>
                <div className="space-y-3">
                  {terms.map((item, index) => (
                    <div
                      key={index}
                      className="bg-slate-800/50 border border-slate-700 rounded-xl p-5"
                    >
                      <h3 className="text-white font-semibold mb-2">{item.term}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// Parse currency input: digits only, no leading zeros
function parseCurrencyInput(value: string): number {
  const digits = value.replace(/\D/g, "");
  if (digits === "") return 0;
  return parseInt(digits, 10);
}

// =====================
// COST CALCULATOR PAGE
// =====================
export function CostCalculatorPage({ onBack, onNavigate }: PageProps) {
  const [propertyPrice, setPropertyPrice] = useState(250000);
  const [deposit, setDeposit] = useState(25000);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(true);

  const handlePropertyPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseCurrencyInput(e.target.value);
    setPropertyPrice(val);
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseCurrencyInput(e.target.value);
    setDeposit(val);
  };

  // UK Stamp Duty: England and Northern Ireland. First-time buyers: 0% up to £300,000;
  // 5% on portion between £300,001 and £500,000. Above £500k, standard rates apply.
  const getStampDutyIndicative = (): { amount: number; label: string } => {
    if (propertyPrice <= 0) return { amount: 0, label: "Indicative" };
    if (isFirstTimeBuyer && propertyPrice <= 300000) {
      return { amount: 0, label: "Indicative (0% up to £300k for first-time buyers)" };
    }
    if (isFirstTimeBuyer && propertyPrice <= 500000) {
      const portionOver300k = propertyPrice - 300000;
      const duty = portionOver300k * 0.05;
      return { amount: duty, label: "Indicative (5% on £300,001 to £500k portion)" };
    }
    // Standard rates (simplified for indicative purposes)
    let duty = 0;
    if (propertyPrice > 250000) {
      duty += Math.min(propertyPrice - 250000, 675000) * 0.05;
    }
    if (propertyPrice > 925000) {
      duty += Math.min(propertyPrice - 925000, 575000) * 0.1;
    }
    if (propertyPrice > 1500000) {
      duty += (propertyPrice - 1500000) * 0.12;
    }
    return { amount: duty, label: "Indicative (standard residential rates)" };
  };

  const stampDutyResult = getStampDutyIndicative();
  const mortgageAmount = Math.max(0, propertyPrice - deposit);
  const ltv = propertyPrice > 0 ? ((mortgageAmount / propertyPrice) * 100).toFixed(0) : "0";

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(value);
  };

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
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-8 h-8 text-teal-400" />
          <h1 className="text-3xl font-bold text-white">Cost Calculator</h1>
        </div>
        <p className="text-slate-400 mb-8">
          Understand what costs exist and what typically catches you out. These are indicative only, not exact quotes.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4">Property Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Property Price</label>
                  <div className="relative">
                    <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={propertyPrice || ""}
                      onChange={handlePropertyPriceChange}
                      placeholder="e.g. 310000"
                      className="pl-11 bg-slate-900/50 border-slate-600 text-white h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Your Deposit</label>
                  <div className="relative">
                    <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={deposit || ""}
                      onChange={handleDepositChange}
                      placeholder="e.g. 31000"
                      className="pl-11 bg-slate-900/50 border-slate-600 text-white h-12 rounded-xl"
                    />
                  </div>
                  {propertyPrice > 0 && (
                    <p className="text-slate-500 text-xs mt-1">
                      {((deposit / propertyPrice) * 100).toFixed(1)}% of property price
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-300 text-sm">First-time buyer?</span>
                  <button
                    onClick={() => setIsFirstTimeBuyer(!isFirstTimeBuyer)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      isFirstTimeBuyer ? "bg-teal-500" : "bg-slate-600"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        isFirstTimeBuyer ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-6">
              <h2 className="text-teal-400 font-semibold mb-4">Estimated Costs</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-slate-300">
                  <span>Deposit</span>
                  <span className="text-white font-medium">{formatCurrency(deposit)}</span>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300">
                    <span>Stamp Duty ({stampDutyResult.label})</span>
                    <span className="text-white font-medium">{formatCurrency(stampDutyResult.amount)}</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1">
                    Applies in England and Northern Ireland. First-time buyers pay 0% up to £300,000. For properties up to £500,000, 5% applies to the portion between £300,001 and £500,000. Above this, standard residential rates apply.
                  </p>
                </div>

                <div>
                  <div className="text-slate-300 font-medium mb-1">Legal and conveyancing costs</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Legal fees (typical range)</span>
                      <span className="text-white">£700 to £1,800</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Disbursements (typical range)</span>
                      <span className="text-white">£300 to £600</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs mt-2">
                    Costs vary by provider, property type, and complexity. Leasehold properties often require additional legal work, which can add £300 to £800.
                  </p>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Survey (typical range)</span>
                  <span className="text-white">£300 to £700</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Mortgage fees (typical range)</span>
                  <span className="text-white">£0 to £2,000</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Moving costs (typical range)</span>
                  <span className="text-white">£500 to £1,500</span>
                </div>
                
                <div className="border-t border-slate-700 pt-3 mt-3">
                  <p className="text-slate-400 text-sm">
                    Total upfront will depend on your choices. Use this as a guide to understand what costs exist, not as a fixed quote.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-3">Mortgage Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Mortgage amount</span>
                  <span className="text-white">{formatCurrency(mortgageAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Loan to Value (LTV)</span>
                  <span className="text-white">{ltv}%</span>
                </div>
              </div>
              {Number(ltv) > 90 && (
                <p className="text-amber-400 text-xs mt-3">
                  High LTV mortgages (over 90%) typically have higher interest rates
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="text-slate-500 text-xs mt-6">
          These figures are indicative only. Actual costs may vary. Stamp Duty applies in England and Northern Ireland. Always get professional advice for your specific situation.
        </p>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// =====================
// TIMELINE GUIDE PAGE
// =====================
const timelineStages = [
  {
    icon: Calculator,
    title: "Get Ready",
    duration: "2-6 months before",
    description: "Save for deposit, check credit score, research areas",
    tasks: [
      "Save for deposit (aim for 10-20%)",
      "Check and improve your credit score",
      "Get a mortgage in principle",
      "Research areas you want to live",
      "Create a budget for additional costs",
    ],
  },
  {
    icon: Search,
    title: "Find Your Home",
    duration: "1-3 months",
    description: "Search properties, attend viewings, make an offer",
    tasks: [
      "Set up property alerts",
      "Attend viewings (aim for 10-15 properties)",
      "Research the local area",
      "Make an offer below asking price",
      "Negotiate until offer accepted",
    ],
  },
  {
    icon: FileText,
    title: "Mortgage Application",
    duration: "2-4 weeks",
    description: "Apply for mortgage, provide documentation",
    tasks: [
      "Choose a mortgage product",
      "Complete full mortgage application",
      "Provide proof of income and ID",
      "Lender conducts valuation",
      "Receive mortgage offer",
    ],
  },
  {
    icon: Home,
    title: "Surveys & Checks",
    duration: "1-2 weeks",
    description: "Commission survey, review results",
    tasks: [
      "Choose appropriate survey level",
      "Book and attend survey",
      "Review survey findings",
      "Get quotes for any issues found",
      "Renegotiate if necessary",
    ],
  },
  {
    icon: FileText,
    title: "Legal Work",
    duration: "4-8 weeks",
    description: "Solicitor conducts searches and reviews contracts",
    tasks: [
      "Instruct a solicitor",
      "Solicitor orders searches",
      "Review property information",
      "Raise enquiries",
      "Review contracts",
    ],
  },
  {
    icon: Key,
    title: "Exchange & Complete",
    duration: "1-4 weeks",
    description: "Sign contracts, transfer funds, get keys",
    tasks: [
      "Agree completion date",
      "Sign contracts",
      "Pay deposit (10%)",
      "Transfer remaining funds",
      "Collect keys!",
    ],
  },
  {
    icon: Truck,
    title: "Moving Day",
    duration: "Completion day",
    description: "Move into your new home",
    tasks: [
      "Book removal company",
      "Redirect post",
      "Set up utilities",
      "Take meter readings",
      "Update your address everywhere",
    ],
  },
];

export function TimelineGuidePage({ onBack, onNavigate }: PageProps) {
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
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-8 h-8 text-teal-400" />
          <h1 className="text-3xl font-bold text-white">Timeline Guide</h1>
        </div>
        <p className="text-slate-400 mb-8">
          A typical homebuying journey from start to finish
        </p>

        <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 mb-8 flex items-center gap-3">
          <Clock className="w-5 h-5 text-teal-400 flex-shrink-0" />
          <p className="text-slate-300 text-sm">
            <span className="text-white font-medium">Average total time: 3-6 months</span> from starting your search to getting the keys
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700" />

          <div className="space-y-6">
            {timelineStages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div key={index} className="relative pl-16">
                  {/* Timeline dot */}
                  <div className="absolute left-0 w-12 h-12 bg-slate-800 border-2 border-teal-500 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-teal-400" />
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-semibold">{stage.title}</h3>
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
                        {stage.duration}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">{stage.description}</p>
                    <ul className="space-y-2">
                      {stage.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-center gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
