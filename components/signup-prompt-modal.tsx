"use client";

import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignupPromptModalProps {
  open: boolean;
  onClose: () => void;
  onCreateAccount: () => void;
  onContinueWithoutSaving: () => void;
}

const BULLETS = [
  "Free to use",
  "No spam or marketing emails",
  "Takes less than a minute",
];

export function SignupPromptModal({
  open,
  onClose,
  onCreateAccount,
  onContinueWithoutSaving,
}: SignupPromptModalProps) {
  if (!open) return null;

  const handleContinue = () => {
    onContinueWithoutSaving();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
    >
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-md bg-slate-800 border border-slate-700/50 rounded-2xl shadow-xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 -m-2 text-gray-400 hover:text-white rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2
          id="signup-modal-title"
          className="text-xl font-medium text-white mb-3 pr-8"
        >
          Save your journey
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          You've started adding your own notes to this journey. Create an
          account to keep them safe and access your progress on any device.
        </p>

        <ul className="space-y-2 mb-6">
          {BULLETS.map((text) => (
            <li key={text} className="flex items-center gap-2 text-sm text-gray-300">
              <Check className="w-4 h-4 text-green-500 shrink-0" aria-hidden />
              {text}
            </li>
          ))}
        </ul>

        <Button
          onClick={onCreateAccount}
          className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl mb-4"
        >
          Create free account
        </Button>

        <button
          onClick={handleContinue}
          className="w-full text-sm text-gray-400 hover:text-gray-300 transition-colors py-2"
        >
          Continue without saving
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Your progress is currently saved on this device only.
        </p>
      </div>
    </div>
  );
}
