"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface GuideNavigationProps {
  previous?: { title: string; href: string };
  next?: { title: string; href: string };
  onNavigate: (screen: string) => void;
}

export function GuideNavigation({ previous, next, onNavigate }: GuideNavigationProps) {
  return (
    <nav
      className="mt-10 pt-8 border-t border-slate-700/80"
      aria-label="Guide navigation"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {previous ? (
          <button
            type="button"
            onClick={() => onNavigate(previous.href)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-left group"
          >
            <ArrowLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-0.5 transition-transform" aria-hidden />
            <span className="text-sm">
              <span className="text-slate-500">Previous:</span> {previous.title}
            </span>
          </button>
        ) : (
          <div />
        )}
        {next ? (
          <button
            type="button"
            onClick={() => onNavigate(next.href)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-left sm:text-right group sm:ml-auto"
          >
            <span className="text-sm">
              <span className="text-slate-500">See what happens next:</span> {next.title}
            </span>
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden />
          </button>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
