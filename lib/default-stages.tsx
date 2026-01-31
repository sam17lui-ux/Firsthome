"use client";

import React from "react";
import {
  Calculator,
  FileText,
  HelpCircle,
  Home as HomeIcon,
  ClipboardCheck,
  HandCoins,
  Scale,
  Building2,
  SearchCheck,
  FileSearch,
  AlertCircle,
  Shield,
  CalendarCheck,
  Key,
  Lightbulb,
  Zap,
  Settings,
} from "lucide-react";

export interface ChecklistItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  completed: boolean;
  note: string;
}

export interface Stage {
  id: number;
  stageNumber: string;
  title: string;
  status: "completed" | "in-progress" | "upcoming";
  conversationalHeader: string;
  checklistItems: ChecklistItem[];
  warning?: string;
  /** When true, stage displays as Done even if not all items are complete */
  userMarkedComplete?: boolean;
}

const icon = (C: React.ComponentType<{ className?: string }>) => (
  <C className="w-5 h-5" />
);

export function getDefaultStages(): Stage[] {
  return [
    {
      id: 0,
      stageNumber: "Stage 0",
      title: "Get Ready",
      status: "upcoming",
      conversationalHeader: "Have you done your homework?",
      checklistItems: [
        { id: "check-affordability", label: "Check affordability", icon: icon(Calculator), completed: false, note: "" },
        { id: "mortgage-in-principle", label: "Get mortgage in principle", icon: icon(FileText), completed: false, note: "" },
        { id: "understand-deposit", label: "Understand deposit + costs", icon: icon(HelpCircle), completed: false, note: "" },
        { id: "register-portals", label: "Register on property portals", icon: icon(HomeIcon), completed: false, note: "" },
      ],
    },
    {
      id: 1,
      stageNumber: "Stage 1",
      title: "Make an Offer",
      status: "upcoming",
      conversationalHeader: "Ready to find your place?",
      checklistItems: [
        { id: "viewing-questions", label: "Questions to ask at viewings", icon: icon(ClipboardCheck), completed: false, note: "" },
        { id: "how-to-negotiate", label: "How to negotiate", icon: icon(HandCoins), completed: false, note: "" },
        { id: "after-offer-accepted", label: "What happens after offer accepted?", icon: icon(HelpCircle), completed: false, note: "" },
      ],
    },
    {
      id: 2,
      stageNumber: "Stage 2",
      title: "Prepare for Legal & Financial",
      status: "in-progress",
      conversationalHeader: "Have you got your team sorted?",
      checklistItems: [
        { id: "find-solicitor", label: "Find a solicitor/conveyancer", icon: icon(Scale), completed: false, note: "" },
        { id: "mortgage-application", label: "Start mortgage application", icon: icon(Building2), completed: false, note: "" },
        { id: "book-survey", label: "Book property survey", icon: icon(SearchCheck), completed: false, note: "" },
        { id: "id-documents", label: "What ID do I need?", icon: icon(FileText), completed: false, note: "" },
      ],
    },
    {
      id: 3,
      stageNumber: "Stage 3",
      title: "Legal & Searches",
      status: "upcoming",
      conversationalHeader: "Are searches underway?",
      checklistItems: [
        { id: "what-are-searches", label: "What are searches?", icon: icon(FileSearch), completed: false, note: "" },
        { id: "review-contract", label: "Review your contract", icon: icon(ClipboardCheck), completed: false, note: "" },
        { id: "chase-solicitor", label: "Chase your solicitor", icon: icon(AlertCircle), completed: false, note: "" },
        { id: "mortgage-offer", label: "When will mortgage offer arrive?", icon: icon(HelpCircle), completed: false, note: "" },
      ],
      warning: "This stage can take 6-12 weeks. Don't be afraid to chase your solicitor for updates.",
    },
    {
      id: 4,
      stageNumber: "Stage 4",
      title: "Exchange Contracts",
      status: "upcoming",
      conversationalHeader: "Are you ready to commit?",
      checklistItems: [
        { id: "what-is-exchange", label: "What happens at exchange?", icon: icon(Scale), completed: false, note: "" },
        { id: "buildings-insurance", label: "Get buildings insurance", icon: icon(Shield), completed: false, note: "" },
        { id: "completion-date", label: "Agree completion date", icon: icon(CalendarCheck), completed: false, note: "" },
      ],
    },
    {
      id: 5,
      stageNumber: "Stage 5",
      title: "Completion Day",
      status: "upcoming",
      conversationalHeader: "Is today the big day?",
      checklistItems: [
        { id: "completion-checklist", label: "Completion day checklist", icon: icon(ClipboardCheck), completed: false, note: "" },
        { id: "when-keys", label: "When do I get the keys?", icon: icon(Key), completed: false, note: "" },
        { id: "moving-tips", label: "Moving day tips", icon: icon(Lightbulb), completed: false, note: "" },
      ],
    },
    {
      id: 6,
      stageNumber: "Final",
      title: "You're a Homeowner!",
      status: "upcoming",
      conversationalHeader: "Congrats! Now what?",
      checklistItems: [
        { id: "setup-utilities", label: "Set up utilities", icon: icon(Zap), completed: false, note: "" },
        { id: "council-tax", label: "Register with council tax", icon: icon(Building2), completed: false, note: "" },
        { id: "maintenance-tips", label: "First maintenance tips", icon: icon(Settings), completed: false, note: "" },
      ],
    },
  ];
}
