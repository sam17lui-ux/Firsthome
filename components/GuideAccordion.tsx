"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface GuideAccordionProps {
  id: string;
  title: string;
  sectionNumber?: number;
  children: React.ReactNode;
}

export function GuideAccordion({
  id,
  title,
  sectionNumber,
  children,
}: GuideAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="rounded-xl border border-slate-700/60 bg-slate-800/50 overflow-hidden"
      role="region"
      aria-labelledby={`${id}-header`}
    >
      <button
        id={`${id}-header`}
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-800/70 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
      >
        <span className="flex items-center gap-2">
          {sectionNumber != null && (
            <span className="text-slate-500 text-sm">{sectionNumber}.</span>
          )}
          <span className="font-semibold text-white">{title}</span>
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 pb-5 pt-4 border-t border-slate-700/40">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
