"use client";

import { MessageCircle } from "lucide-react";

interface ChatEntryPointProps {
  onOpenChat: () => void;
  /** Optional label. Default: "Questions? Ask us" */
  label?: string;
}

/**
 * Small, unobtrusive floating button that opens the chat.
 * Used on Landing, How it works, and Guides pages.
 * Does not auto-open or show pop-ups; user must click.
 */
export function ChatEntryPoint({ onOpenChat, label = "Questions? Ask us" }: ChatEntryPointProps) {
  return (
    <button
      type="button"
      onClick={onOpenChat}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-800/90 px-4 py-2.5 text-sm text-slate-300 shadow-lg backdrop-blur-sm transition-colors hover:border-slate-500 hover:bg-slate-700/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
      aria-label={label}
    >
      <MessageCircle className="h-4 w-4 shrink-0 text-teal-400" aria-hidden />
      <span>{label}</span>
    </button>
  );
}
