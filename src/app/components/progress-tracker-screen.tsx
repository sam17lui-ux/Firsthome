import { useState } from "react";
import { ArrowLeft, CheckCircle2, Circle, Clock, ChevronRight, Info, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProgressTrackerScreenProps {
  onBack: () => void;
}

interface Stage {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "upcoming";
  tips?: string[];
}

const STAGES: Stage[] = [
  {
    id: 1,
    title: "Offer Accepted",
    status: "completed",
    tips: [
      "Congratulations! Your offer has been accepted.",
      "You'll need to pay a reservation fee or deposit soon.",
      "Make sure you have your finances in order."
    ]
  },
  {
    id: 2,
    title: "Survey",
    status: "completed",
    tips: [
      "A surveyor will inspect the property for any issues.",
      "Common surveys: Basic valuation, HomeBuyer Report, or Full Building Survey.",
      "Survey results may affect your mortgage or give you negotiation power."
    ]
  },
  {
    id: 3,
    title: "Mortgage Confirmed",
    status: "in-progress",
    tips: [
      "Your mortgage lender is finalizing your loan approval.",
      "Keep your financial situation stable — avoid big purchases.",
      "You should receive a formal mortgage offer soon."
    ]
  },
  {
    id: 4,
    title: "Searches Complete",
    status: "upcoming",
    tips: [
      "Your solicitor will conduct local authority and environmental searches.",
      "These searches reveal planning permissions, flood risks, and local developments.",
      "This usually takes 2-4 weeks."
    ]
  },
  {
    id: 5,
    title: "Exchange",
    status: "upcoming",
    tips: [
      "You and the seller will exchange signed contracts.",
      "You'll pay your deposit (typically 10% of purchase price).",
      "After exchange, both parties are legally committed to the sale."
    ]
  },
  {
    id: 6,
    title: "Completion",
    status: "upcoming",
    tips: [
      "The final step! You'll receive the keys to your new home.",
      "Remaining funds are transferred to the seller.",
      "Make sure utilities and insurance are set up before moving in."
    ]
  }
];

export function ProgressTrackerScreen({ onBack }: ProgressTrackerScreenProps) {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [showAboutTracker, setShowAboutTracker] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-700/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-200" />
          </button>
          <h2 className="text-xl text-white">Your Progress</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8 pb-12">
        {/* Progress Overview */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg text-white">Overall Progress</h3>
            <span className="text-sm text-gray-400">33% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-lg shadow-blue-500/30" style={{ width: "33%" }}></div>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            You're making great progress on your homebuying journey!
          </p>
        </div>

        {/* About This Tracker */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-5 mb-6">
          <button
            onClick={() => setShowAboutTracker(!showAboutTracker)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-400" />
              <span className="text-base text-white">About this tracker</span>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
              showAboutTracker ? "rotate-90" : ""
            }`} />
          </button>
          
          {showAboutTracker && (
            <div className="mt-4 pt-4 border-t border-slate-700 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <p className="text-sm text-gray-300 leading-relaxed">
                This tracker shows the typical stages of buying a home in the UK. Each step includes helpful information and tips.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Your journey may vary slightly, but this gives you a clear overview of what to expect.
              </p>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg text-white mb-6">Journey Timeline</h3>
          <div className="space-y-0">
            {STAGES.map((stage, index) => (
              <div key={stage.id} className="flex gap-4">
                {/* Timeline Line & Icon */}
                <div className="flex flex-col items-center">
                  {/* Icon */}
                  <div className={`relative z-10 flex-shrink-0 ${
                    stage.status === "completed"
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30"
                      : stage.status === "in-progress"
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30"
                      : "bg-slate-700"
                  } w-11 h-11 rounded-full flex items-center justify-center`}>
                    {stage.status === "completed" && (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    )}
                    {stage.status === "in-progress" && (
                      <Clock className="w-5 h-5 text-white" />
                    )}
                    {stage.status === "upcoming" && (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  {/* Vertical Line */}
                  {index < STAGES.length - 1 && (
                    <div className={`w-0.5 h-24 ${
                      stage.status === "completed" ? "bg-green-500/30" : "bg-slate-700"
                    }`}></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <button
                    onClick={() => setSelectedStage(selectedStage?.id === stage.id ? null : stage)}
                    className="w-full text-left group"
                  >
                    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-700/30 transition-colors">
                      <div className="flex-1">
                        <h4 className="text-base text-white mb-1">
                          {stage.title}
                        </h4>
                        <span className={`text-sm ${
                          stage.status === "completed"
                            ? "text-green-400"
                            : stage.status === "in-progress"
                            ? "text-blue-400"
                            : "text-gray-500"
                        }`}>
                          {stage.status === "completed" && "✓ Complete"}
                          {stage.status === "in-progress" && "In Progress"}
                          {stage.status === "upcoming" && "Upcoming"}
                        </span>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                        selectedStage?.id === stage.id ? "rotate-90" : ""
                      }`} />
                    </div>
                  </button>

                  {/* Expanded Tips */}
                  {selectedStage?.id === stage.id && stage.tips && (
                    <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-blue-400">
                          <Info className="w-4 h-4" />
                          <span className="text-sm">What you need to know:</span>
                        </div>
                        <ul className="space-y-2 ml-6">
                          {stage.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-gray-300 list-disc leading-relaxed">
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Ask About This Step CTA */}
                      <Button
                        variant="outline"
                        className="w-full border-2 border-slate-600 bg-slate-800/50 text-gray-200 hover:bg-slate-700/50 hover:border-blue-500/50 rounded-xl flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Ask about this step
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20">
          <h3 className="text-lg mb-2">Questions about your journey?</h3>
          <p className="text-sm mb-4 text-blue-50">
            Our assistant is here to help you understand each step in plain English — no confusing legal terms.
          </p>
          <Button
            variant="outline"
            className="bg-white text-blue-600 hover:bg-blue-50 border-0 rounded-xl"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat with Assistant
          </Button>
        </div>
      </div>
    </div>
  );
}
