import { Home, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStartNow: () => void;
  onTrackProgress: () => void;
}

export function WelcomeScreen({ onStartNow, onTrackProgress }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Safe area padding for mobile */}
      <div className="px-6 py-8 pb-12">
        <div className="max-w-md mx-auto space-y-10">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 pt-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-white">FirstHome</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 pt-8">
            <h1 className="text-4xl leading-tight text-white">
              Helping first-time buyers feel confident, not confused
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              We simplify your homebuying journey with clear updates, document summaries, and step-by-step guidance.
            </p>
          </div>

          {/* Why We Built Section */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-3xl p-6 border border-slate-700/50">
            <h2 className="text-xl text-white mb-5">
              Why we built FirstHome
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-base text-gray-300">
                  Homebuying in the UK is slow and unclear
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-base text-gray-300">
                  Documents are overwhelming
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-base text-gray-300">
                  Buyers feel left in the dark
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 pt-4">
            <Button
              onClick={onStartNow}
              className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg shadow-blue-500/20"
            >
              Start My Journey
            </Button>
            <Button
              onClick={onTrackProgress}
              variant="outline"
              className="w-full h-14 text-lg border-2 border-slate-600 bg-slate-800/50 text-gray-200 hover:bg-slate-700/50 hover:border-slate-500 rounded-2xl"
            >
              View My Progress
            </Button>
          </div>

          {/* Footer text */}
          <p className="text-sm text-gray-500 text-center pt-4">
            Built for UK first-time buyers
          </p>
        </div>
      </div>
    </div>
  );
}
