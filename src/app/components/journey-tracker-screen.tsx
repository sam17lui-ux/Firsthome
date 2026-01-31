import { useState } from "react";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ExternalLink,
  HelpCircle,
  Calculator,
  FileSearch,
  Scale,
  Key,
  Home as HomeIcon,
  SearchCheck,
  ClipboardCheck,
  AlertCircle,
  Lightbulb,
  Building2,
  HandCoins,
  FileText,
  Shield,
  Zap,
  Settings,
  CalendarCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface JourneyTrackerScreenProps {
  onBack: () => void;
  onOpenChat: () => void;
}

interface Stage {
  id: number;
  stageNumber: string;
  title: string;
  status: "completed" | "in-progress" | "upcoming";
  conversationalHeader: string;
  summary: string;
  actionItems: ActionItem[];
  warning?: string;
}

interface ActionItem {
  label: string;
  icon: React.ReactNode;
  url?: string;
  type: "link" | "help";
}

export function JourneyTrackerScreen({ onBack, onOpenChat }: JourneyTrackerScreenProps) {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: 0,
      stageNumber: "Stage 0",
      title: "Get Ready",
      status: "completed",
      conversationalHeader: "Have you done your homework?",
      summary: "Before you start viewing properties, let's make sure you're financially prepared and know what you can afford.",
      actionItems: [
        {
          label: "Check affordability",
          icon: <Calculator className="w-4 h-4" />,
          url: "https://www.moneysavingexpert.com/mortgages/mortgage-affordability-calculator/",
          type: "link"
        },
        {
          label: "Get mortgage in principle",
          icon: <FileText className="w-4 h-4" />,
          url: "https://www.moneysupermarket.com/mortgages/agreement-in-principle/",
          type: "link"
        },
        {
          label: "Understand deposit + costs",
          icon: <HelpCircle className="w-4 h-4" />,
          type: "help"
        },
        {
          label: "Register on property portals",
          icon: <HomeIcon className="w-4 h-4" />,
          url: "https://www.rightmove.co.uk/",
          type: "link"
        }
      ]
    },
    {
      id: 1,
      stageNumber: "Stage 1",
      title: "Make an Offer",
      status: "completed",
      conversationalHeader: "Ready to find your place?",
      summary: "Time to view properties, ask the important questions, and put in an offer that works for you.",
      actionItems: [
        {
          label: "Questions to ask at viewings",
          icon: <ClipboardCheck className="w-4 h-4" />,
          type: "help"
        },
        {
          label: "How to negotiate",
          icon: <HandCoins className="w-4 h-4" />,
          type: "help"
        },
        {
          label: "What happens after offer accepted?",
          icon: <HelpCircle className="w-4 h-4" />,
          type: "help"
        }
      ]
    },
    {
      id: 2,
      stageNumber: "Stage 2",
      title: "Prepare for Legal & Financial",
      status: "in-progress",
      conversationalHeader: "Have you got your team sorted?",
      summary: "Now that your offer's accepted, it's time to line up your solicitor, get your mortgage moving, and book that survey.",
      actionItems: [
        {
          label: "Find a solicitor/conveyancer",
          icon: <Scale className="w-4 h-4" />,
          url: "https://www.which.co.uk/money/mortgages-and-property/conveyancing",
          type: "link"
        },
        {
          label: "Start mortgage application",
          icon: <Building2 className="w-4 h-4" />,
          type: "help"
        },
        {
          label: "Book property survey",
          icon: <SearchCheck className="w-4 h-4" />,
          url: "https://www.rics.org/find-a-surveyor",
          type: "link"
        },
        {
          label: "What ID do I need?",
          icon: <FileText className="w-4 h-4" />,
          type: "help"
        }
      ]
    },
    {
      id: 3,
      stageNumber: "Stage 3",
      title: "Legal & Searches",
      status: "upcoming",
      conversationalHeader: "Are searches underway?",
      summary: "This is the longest part — and where things often get stuck. Your solicitor is doing searches, reviewing contracts, and chasing paperwork. Stay on top of it.",
      actionItems: [
        {
          label: "What are searches?",
          icon: <FileSearch className="w-4 h-4" />,
          type: "help"
        },
        {
          label: "Review your contract",
          icon: <ClipboardCheck className="w-4 h-4" />,
          type: "help"
        },
        {
          label: "Chase your solicitor",
          icon: <AlertCircle className="w-4 h-4" />,
          type: "help"
        },
        {
          label: "When will mortgage offer arrive?",
          icon: <HelpCircle className="w-4 h-4" />,
          type: "help"
        }
      ],
      warning: "⏳ This stage can take 6-12 weeks. Don't be afraid to chase your solicitor for updates."
    },
    {
      id: 4,
      stageNumber: "Stage 4",
      title: "Exchange Contracts",
      status: "upcoming",
      conversationalHeader: "Are you ready to commit?",
      summary: "This is it — once you exchange, you're legally bound. Make sure you've got insurance sorted and a completion date locked in.",
      actionItems: [
        {
          label: "What happens at exchange?",
          icon: <Scale className="w-4 h-4" />,
          type: "help"
        },
        {
          label: "Get buildings insurance",
          icon: <Shield className="w-4 h-4" />,
          url: "https://www.moneysupermarket.com/home-insurance/",
          type: "link"
        },
        {
          label: "Agree completion date",
          icon: <CalendarCheck className="w-4 h-4" />,
          type: "help"
        }
      ]
    },
    {
      id: 5,
      stageNumber: "Stage 5",
      title: "Completion Day",
      status: "upcoming",
      conversationalHeader: "Is today the big day?",
      summary: "Final payments are being transferred. Once that's done, you'll get the keys. Time to celebrate! 🎉",
      actionItems: [
        {
          label: "Completion day checklist",
          icon: <ClipboardCheck className="w-4 h-4" />,
          type: "help"
        },
        {
          label: "When do I get the keys?",
          icon: <Key className="w-4 h-4" />,
          type: "help"
        },
        {
          label: "Moving day tips",
          icon: <Lightbulb className="w-4 h-4" />,
          type: "help"
        }
      ]
    },
    {
      id: 6,
      stageNumber: "Final",
      title: "You're a Homeowner!",
      status: "upcoming",
      conversationalHeader: "Congrats! Now what?",
      summary: "You did it! Now let's make sure everything's set up properly so you can actually enjoy your new home.",
      actionItems: [
        {
          label: "Set up utilities",
          icon: <Zap className="w-4 h-4" />,
          url: "https://www.uswitch.com/gas-electricity/",
          type: "link"
        },
        {
          label: "Register with council tax",
          icon: <Building2 className="w-4 h-4" />,
          url: "https://www.gov.uk/council-tax",
          type: "link"
        },
        {
          label: "First maintenance tips",
          icon: <Settings className="w-4 h-4" />,
          type: "help"
        }
      ]
    },
  ]);

  const calculateProgress = () => {
    const completed = stages.filter((s) => s.status === "completed").length;
    return Math.round((completed / stages.length) * 100);
  };

  const handleStatusChange = (stageId: number) => {
    setStages((prevStages) =>
      prevStages.map((stage) => {
        if (stage.id === stageId) {
          if (stage.status === "upcoming") return { ...stage, status: "in-progress" as const };
          if (stage.status === "in-progress") return { ...stage, status: "completed" as const };
          if (stage.status === "completed") return { ...stage, status: "upcoming" as const };
        }
        return stage;
      })
    );
  };

  const handleActionClick = (action: ActionItem) => {
    if (action.type === "link" && action.url) {
      window.open(action.url, "_blank");
    } else if (action.type === "help") {
      onOpenChat();
    }
  };

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
          <div>
            <h2 className="text-xl text-white">Your Journey</h2>
            <p className="text-xs text-gray-400">Track where you are, update as you go</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8 pb-12">
        {/* Progress Overview */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg text-white">You're {calculateProgress()}% there</h3>
              <p className="text-sm text-gray-400">Keep going — you've got this!</p>
            </div>
            <span className="text-3xl">
              {calculateProgress() === 100 ? "🎉" : calculateProgress() > 50 ? "💪" : "👏"}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-lg shadow-blue-500/30"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex gap-4">
              {/* Timeline Line & Icon */}
              <div className="flex flex-col items-center">
                {/* Icon - Clickable */}
                <button
                  onClick={() => handleStatusChange(stage.id)}
                  className={`relative z-10 flex-shrink-0 transition-all ${
                    stage.status === "completed"
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30"
                      : stage.status === "in-progress"
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30"
                      : "bg-slate-700"
                  } w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 hover:shadow-xl`}
                >
                  {stage.status === "completed" && (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  )}
                  {stage.status === "in-progress" && (
                    <Clock className="w-5 h-5 text-white animate-pulse" />
                  )}
                  {stage.status === "upcoming" && (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {/* Vertical Line */}
                {index < stages.length - 1 && (
                  <div
                    className={`w-0.5 flex-1 min-h-[100px] transition-colors ${
                      stage.status === "completed" ? "bg-green-500/30" : "bg-slate-700"
                    }`}
                  ></div>
                )}
              </div>

              {/* Content Card */}
              <div className="flex-1 pb-2">
                <div className={`backdrop-blur-sm border rounded-3xl p-5 shadow-lg ${
                  stage.id === 3 
                    ? "bg-amber-900/20 border-amber-500/30" 
                    : "bg-slate-800/60 border-slate-700/50"
                }`}>
                  {/* Stage Label */}
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    {stage.stageNumber}
                  </div>

                  {/* Header */}
                  <div className="mb-3">
                    <h4 className="text-lg text-white mb-1">{stage.title}</h4>
                  </div>

                  {/* Conversational Header */}
                  <div className="bg-slate-900/50 rounded-2xl p-4 mb-3">
                    <p className="text-base text-gray-300 italic">"{stage.conversationalHeader}"</p>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {stage.summary}
                  </p>

                  {/* Warning for Stage 3 */}
                  {stage.warning && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-200 leading-relaxed">
                        {stage.warning}
                      </p>
                    </div>
                  )}

                  {/* Action Items */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Quick Actions</p>
                    {stage.actionItems.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionClick(action)}
                        className="w-full flex items-center gap-3 p-3 bg-slate-900/30 hover:bg-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 rounded-xl transition-all text-left group"
                      >
                        <div className="text-blue-400">{action.icon}</div>
                        <span className="text-sm text-gray-300 group-hover:text-white flex-1">
                          {action.label}
                        </span>
                        {action.type === "link" && (
                          <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Status Badge */}
                  <div className="mt-4 flex justify-end">
                    <span
                      className={`text-xs px-3 py-1.5 rounded-full ${
                        stage.status === "completed"
                          ? "bg-green-500/20 text-green-300"
                          : stage.status === "in-progress"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-slate-700 text-gray-400"
                      }`}
                    >
                      {stage.status === "completed" && "✓ Done"}
                      {stage.status === "in-progress" && "Happening now"}
                      {stage.status === "upcoming" && "Not yet"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white shadow-2xl shadow-blue-500/20">
          <h3 className="text-lg mb-2">Stuck? Confused? Just need someone to explain it?</h3>
          <p className="text-sm mb-4 text-blue-50 leading-relaxed">
            I'm here to answer your questions in plain English. No legal jargon, no rubbish.
          </p>
          <Button
            onClick={onOpenChat}
            className="w-full bg-white text-blue-600 hover:bg-blue-50 border-0 rounded-xl h-12"
          >
            Let's Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
