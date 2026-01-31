import { Home, ArrowRight, Clock, MessageSquare, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingScreenProps {
  onBegin: () => void;
}

export function OnboardingScreen({ onBegin }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-md mx-auto space-y-10">
          {/* Logo/Brand */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
              <Home className="w-10 h-10 text-white" />
            </div>
            <span className="text-2xl text-white">FirstHome</span>
          </div>

          {/* Main Headline - More Human */}
          <div className="text-center space-y-5">
            <h1 className="text-4xl leading-tight text-white">
              Buying your first home shouldn't feel like a mystery
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              We're here to cut through the confusion, keep you updated, and make sure you know exactly what's happening at every step.
            </p>
          </div>

          {/* Problem Points */}
          <div className="space-y-4">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 flex gap-4">
              <Clock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white mb-1">It takes forever</h3>
                <p className="text-sm text-gray-400">
                  3-9 months on average. That's too long to be left in the dark.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 flex gap-4">
              <MessageSquare className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white mb-1">Nobody tells you what's happening</h3>
                <p className="text-sm text-gray-400">
                  Endless emails to solicitors. Chasing updates. It's exhausting.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 flex gap-4">
              <Eye className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white mb-1">You deserve transparency</h3>
                <p className="text-sm text-gray-400">
                  Real-time updates. Clear next steps. Actual answers.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onBegin}
            className="w-full h-16 text-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3"
          >
            Get Started
            <ArrowRight className="w-6 h-6" />
          </Button>

          {/* Trust Message */}
          <p className="text-sm text-gray-400 text-center leading-relaxed">
            Built by people who've been through this nightmare and want to make it better for you.
          </p>
        </div>
      </div>
    </div>
  );
}
