"use client";

import { useState } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";

interface GuideAccordionProps {
  id: string;
  title: string;
  sectionNumber?: number;
  icon?: LucideIcon;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  scrollId?: string;
  children: React.ReactNode;
}

export function GuideAccordion({
  id,
  title,
  sectionNumber,
  icon: Icon,
  open: controlledOpen,
  onOpenChange,
  scrollId,
  children,
}: GuideAccordionProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen;

  return (
    <div
      id={scrollId}
      className="rounded-xl border border-slate-700/60 bg-slate-800/50 overflow-hidden flex"
      role="region"
      aria-labelledby={`${id}-header`}
    >
      {/* Left accent bar */}
      <div
        className="w-[4px] min-h-full shrink-0 rounded-r bg-gradient-to-b from-purple-500/60 via-indigo-500/50 to-blue-500/60"
        aria-hidden
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <button
          id={`${id}-header`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left hover:bg-slate-800/70 transition-colors"
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
        >
          <span className="flex items-center gap-3 min-w-0">
            {Icon && (
              <span className="w-7 h-7 shrink-0 rounded-lg bg-purple-500/[0.07] flex items-center justify-center">
                <Icon className="w-[18px] h-[18px] text-slate-400" strokeWidth={1.5} aria-hidden />
              </span>
            )}
            <span className="flex items-center gap-2 min-w-0">
              {sectionNumber != null && (
                <span className="text-slate-500 text-sm shrink-0">{sectionNumber}.</span>
              )}
              <span className="font-semibold text-white truncate">{title}</span>
            </span>
          </span>
          <ChevronDown
            className="w-5 h-5 text-slate-500 shrink-0 transition-transform duration-150 ease-out"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            aria-hidden
          />
        </button>
        <div
          id={`${id}-panel`}
          role="region"
          className="grid transition-[grid-template-rows] duration-[220ms] ease-out"
          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="px-4 pb-5 pt-4 border-t border-slate-700/40">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
