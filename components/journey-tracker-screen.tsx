"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  HelpCircle,
  ChevronRight,
  Info,
  X,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { taskContent, stageInfoTooltips } from "@/lib/task-content";
import { Footer } from "@/components/footer";
import { SignupPromptModal } from "@/components/signup-prompt-modal";
import { getDefaultStages, type Stage, type ChecklistItem } from "@/lib/default-stages";
import { loadJourney, saveJourney, toPersisted, mergePersisted, deriveStageStatus } from "@/lib/journey-storage";
import { fetchJourney, upsertJourney } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const LAYOUT = {
  screen: "min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col",
  header:
    "bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-20 shrink-0",
  headerInner: "max-w-2xl mx-auto px-6 py-4 flex items-center gap-4",
  backBtn: "p-2 hover:bg-slate-700/50 rounded-full transition-colors",
  content: "flex-1 overflow-y-auto min-h-0",
  contentInner: "max-w-2xl mx-auto px-6 py-6 pb-32",
} as const;

function getSelectedTask(
  stages: Stage[],
  taskKey: { stageId: number; itemId: string } | null
): { stageId: number; item: ChecklistItem } | null {
  if (!taskKey) return null;
  const stage = stages.find((s) => s.id === taskKey.stageId);
  if (!stage) return null;
  const item = stage.checklistItems.find((i) => i.id === taskKey.itemId);
  return item ? { stageId: stage.id, item } : null;
}

function CheckboxCircle({
  completed,
  onClick,
  "aria-label": ariaLabel,
  asButton = true,
}: {
  completed: boolean;
  onClick?: (e: React.MouseEvent) => void;
  "aria-label"?: string;
  asButton?: boolean;
}) {
  const cn = `w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
    completed ? "bg-green-500 border-green-500" : "border-slate-500 hover:border-blue-400"
  }`;
  const inner = completed ? <Check className="w-5 h-5 text-white" /> : null;
  if (asButton && onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel} className={cn}>
        {inner}
      </button>
    );
  }
  return <div className={cn} aria-hidden>{inner}</div>;
}

function JourneyLayout({
  onBack,
  headerCenter,
  headerRight,
  children,
  footer,
  contentClassName,
}: {
  onBack: () => void;
  headerCenter: React.ReactNode;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <div className={LAYOUT.screen}>
      <header className={LAYOUT.header}>
        <div className={LAYOUT.headerInner}>
          <button onClick={onBack} className={LAYOUT.backBtn} aria-label="Back">
            <ArrowLeft className="w-6 h-6 text-gray-200" />
          </button>
          <div className="flex-1 min-w-0">{headerCenter}</div>
          {headerRight}
        </div>
      </header>
      <div className={LAYOUT.content}>
        <div className={cn(LAYOUT.contentInner, contentClassName)}>{children}</div>
      </div>
      {footer}
    </div>
  );
}

interface JourneyTrackerScreenProps {
  onBack: () => void;
  onOpenChat: () => void;
  onNavigate?: (screen: string) => void;
  onOpenLogin?: () => void;
  onOpenCreateAccount?: () => void;
  onLogout?: () => void;
  onNavigateToAccount?: () => void;
  userEmail?: string | null;
  userId?: string | null;
}

export function JourneyTrackerScreen({ onBack, onOpenChat, onNavigate, onOpenLogin, onOpenCreateAccount, onLogout, onNavigateToAccount, userEmail, userId }: JourneyTrackerScreenProps) {
  const [stages, setStages] = useState<Stage[]>(() => getDefaultStages());
  const hasHydrated = useRef(false);
  const hasDismissedSignupThisSession = useRef(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [selectedStageId, setSelectedStageId] = useState<number | null>(null);
  const [selectedTaskKey, setSelectedTaskKey] = useState<{ stageId: number; itemId: string } | null>(null);
  const [showStageAbout, setShowStageAbout] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [noteValue, setNoteValue] = useState("");

  const selectedStage =
    selectedStageId !== null ? stages.find((s) => s.id === selectedStageId) ?? null : null;
  const selectedTask = getSelectedTask(stages, selectedTaskKey);

  useEffect(() => {
    let cancelled = false;
    async function hydrate() {
      if (userId) {
        const remote = await fetchJourney(userId);
        if (cancelled) return;
        setStages(mergePersisted(getDefaultStages(), remote ?? loadJourney()));
      } else {
        setStages(mergePersisted(getDefaultStages(), loadJourney()));
      }
      hasHydrated.current = true;
    }
    hydrate();
    return () => { cancelled = true; };
  }, [userId]);

  useEffect(() => {
    if (!hasHydrated.current) return;
    const data = toPersisted(stages);
    saveJourney(data);
    if (userId) {
      upsertJourney(userId, data);
    }
  }, [stages, userId]);

  useEffect(() => {
    if (selectedTaskKey) {
      const task = getSelectedTask(stages, selectedTaskKey);
      if (task) {
        setNoteValue(task.item.note);
        setEditingNote(false);
      }
    }
  }, [selectedTaskKey, stages]);

  const calculateProgress = () => {
    const total = stages.reduce((s, st) => s + st.checklistItems.length, 0);
    const done = stages.reduce((s, st) => s + st.checklistItems.filter((i) => i.completed).length, 0);
    return total ? Math.round((done / total) * 100) : 0;
  };

  const getStageProgress = (stage: Stage) => {
    const done = stage.checklistItems.filter((i) => i.completed).length;
    return `${done}/${stage.checklistItems.length}`;
  };

  const getStageDisplayStatus = (stage: Stage): "completed" | "in-progress" | "upcoming" =>
    deriveStageStatus(stage.checklistItems, stage.userMarkedComplete);

  const toggleItemCompleted = (stageId: number, itemId: string) => {
    setStages((prev) =>
      prev.map((s) => {
        if (s.id !== stageId) return s;
        const nextItems = s.checklistItems.map((i) =>
          i.id === itemId ? { ...i, completed: !i.completed } : i
        );
        const isUnchecking = s.checklistItems.find((i) => i.id === itemId)?.completed ?? false;
        const userMarkedComplete = isUnchecking ? false : s.userMarkedComplete;
        const status = deriveStageStatus(nextItems, userMarkedComplete);
        return { ...s, checklistItems: nextItems, userMarkedComplete, status };
      })
    );
  };

  const saveNote = (stageId: number, itemId: string, note: string) => {
    const countWithNotes = stages.reduce(
      (acc, s) => acc + s.checklistItems.filter((i) => (i.note ?? "").trim().length > 0).length,
      0
    );
    const isFirstNote = countWithNotes === 0 && note.trim().length > 0;

    setStages((prev) =>
      prev.map((s) =>
        s.id === stageId
          ? {
              ...s,
              checklistItems: s.checklistItems.map((i) => (i.id === itemId ? { ...i, note } : i)),
            }
          : s
      )
    );
    setEditingNote(false);

    if (isFirstNote && !hasDismissedSignupThisSession.current) {
      setShowSignupModal(true);
    }
  };

  const deleteNote = (stageId: number, itemId: string) => {
    saveNote(stageId, itemId, "");
    setNoteValue("");
  };

  const markStageAsDone = (stageId: number) => {
    setStages((prev) =>
      prev.map((s) =>
        s.id === stageId
          ? {
              ...s,
              status: "completed" as const,
              userMarkedComplete: true,
              checklistItems: s.checklistItems.map((i) => ({ ...i, completed: true })),
            }
          : s
      )
    );
    setSelectedStageId(null);
  };

  const markStageAsNotDone = (stageId: number) => {
    setStages((prev) =>
      prev.map((s) =>
        s.id === stageId
          ? {
              ...s,
              status: "upcoming" as const,
              userMarkedComplete: false,
              checklistItems: s.checklistItems.map((i) => ({ ...i, completed: false })),
            }
          : s
      )
    );
    setSelectedStageId(null);
  };

  const content = selectedTask ? taskContent[selectedTask.item.id] : null;

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
    hasDismissedSignupThisSession.current = true;
  };

  const modal = (
    <SignupPromptModal
      open={showSignupModal}
      onClose={handleCloseSignupModal}
      onCreateAccount={() => {
        handleCloseSignupModal();
        onOpenCreateAccount?.();
      }}
      onContinueWithoutSaving={handleCloseSignupModal}
    />
  );

  const headerLoginButton = (onOpenLogin || onLogout) && (
    userEmail ? (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onNavigateToAccount}
          className="text-sm text-gray-300 hover:text-white truncate max-w-[160px] text-left"
          title={userEmail}
        >
          {userEmail}
        </button>
        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            Log out
          </button>
        )}
      </div>
    ) : (
      onOpenLogin && (
        <button
          type="button"
          onClick={onOpenLogin}
          className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          Log in
        </button>
      )
    )
  );

  if (selectedTask && content) {
    return (
      <>
      <JourneyLayout
        onBack={() => setSelectedTaskKey(null)}
        headerCenter={
          <>
            <h2 className="text-lg text-white font-medium truncate">{selectedTask.item.label}</h2>
            <p className="text-xs text-gray-400">Learn, then take action</p>
          </>
        }
        headerRight={headerLoginButton}
      >
        <button
          onClick={() => toggleItemCompleted(selectedTask.stageId, selectedTask.item.id)}
          className="w-full flex items-center gap-4 p-4 bg-slate-800/60 border border-slate-700/50 rounded-2xl mb-6"
        >
          <CheckboxCircle completed={selectedTask.item.completed} asButton={false} />
          <span className="text-white font-medium">
            {selectedTask.item.completed ? "Completed" : "Mark as done"}
          </span>
        </button>

        <section className="mb-6">
          <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-3">What is this?</h3>
          <p className="text-gray-200 leading-relaxed">{content.explainer}</p>
        </section>

        <section className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5 mb-6">
          <h3 className="text-blue-300 font-medium mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Why it matters
          </h3>
          <p className="text-gray-300 leading-relaxed">{content.whyItMatters}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-3">What to do</h3>
          <div className="space-y-3">
            {content.actionableSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-gray-300 shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-gray-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-3">Your notes</h3>
          {editingNote ? (
            <div className="space-y-3">
              <Textarea
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
                placeholder={content.notePlaceholder}
                className="min-h-[100px] bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-purple-400 rounded-xl"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => saveNote(selectedTask.stageId, selectedTask.item.id, noteValue)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl"
                >
                  Save note
                </Button>
                <Button
                  onClick={() => {
                    setEditingNote(false);
                    setNoteValue(selectedTask.item.note);
                  }}
                  variant="outline"
                  className="bg-transparent border-slate-600 text-gray-300 hover:bg-slate-700 rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : selectedTask.item.note ? (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <p className="text-gray-200 leading-relaxed mb-3 whitespace-pre-wrap">
                {selectedTask.item.note}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setEditingNote(true)}
                  className="flex items-center gap-1.5 text-sm text-purple-300 hover:text-purple-200"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(selectedTask.stageId, selectedTask.item.id)}
                  className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setEditingNote(true)}
              className="w-full p-4 border-2 border-dashed border-slate-600 hover:border-purple-500/50 rounded-xl text-gray-400 hover:text-gray-300 transition-colors text-left"
            >
              + Add a note (e.g. {content.notePlaceholder.split(".")[0]}…)
            </button>
          )}
        </section>

        {content.partnerLinks && content.partnerLinks.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-sm text-gray-400 uppercase tracking-wide">Service providers</h3>
              <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full shrink-0">
                Partnership opportunity
              </span>
            </div>
            <div className="space-y-2">
              {content.partnerLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 p-3 bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-colors group"
                >
                  <div className="min-w-0">
                    <span className="text-gray-200 font-medium block truncate">{link.name}</span>
                    <span className="text-sm text-gray-500 truncate block">{link.description}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gray-400 shrink-0" />
                </a>
              ))}
            </div>
          </section>
        )}

        <button
          onClick={onOpenChat}
          className="w-full p-4 bg-slate-800/60 border border-slate-700/50 hover:border-purple-500/50 rounded-xl transition-colors text-left flex items-center gap-3"
        >
          <HelpCircle className="w-5 h-5 text-purple-400 shrink-0" />
          <span className="text-gray-300">Still confused? Ask me anything</span>
        </button>
      </JourneyLayout>
      {modal}
      </>
    );
  }

  if (selectedStage) {
    const tip = stageInfoTooltips[selectedStage.id];
    return (
      <>
      <JourneyLayout
        onBack={() => setSelectedStageId(null)}
        headerCenter={
          <>
            <p className="text-xs text-gray-400">{selectedStage.stageNumber}</p>
            <h2 className="text-xl text-white font-medium truncate">{selectedStage.title}</h2>
          </>
        }
        headerRight={
          <div className="flex items-center gap-2">
            {headerLoginButton}
            <button
              onClick={() => setShowStageAbout((b) => !b)}
              className={LAYOUT.backBtn}
              aria-expanded={showStageAbout}
              aria-label="What is this stage about?"
            >
              <Info className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        }
        footer={
          <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700/50 p-6 shrink-0">
            <div className="max-w-2xl mx-auto">
              {getStageDisplayStatus(selectedStage) === "completed" ? (
                <Button
                  onClick={() => markStageAsNotDone(selectedStage.id)}
                  variant="outline"
                  className="w-full h-14 text-lg bg-transparent border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white rounded-2xl"
                >
                  Mark as not done
                </Button>
              ) : (
                <Button
                  onClick={() => markStageAsDone(selectedStage.id)}
                  className="w-full h-14 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl shadow-xl shadow-green-500/20"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Mark this stage as done
                </Button>
              )}
            </div>
          </div>
        }
      >
        {showStageAbout && tip ? (
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-200 leading-relaxed flex-1">{tip}</p>
            <button
              onClick={() => setShowStageAbout(false)}
              className="p-1 hover:bg-blue-500/20 rounded"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-blue-300" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowStageAbout(true)}
            className="w-full mb-6 flex items-center gap-2 text-left text-sm text-gray-400 hover:text-gray-300 rounded-xl p-3 bg-slate-800/40 border border-slate-700/50 hover:border-slate-600"
          >
            <Info className="w-4 h-4 shrink-0" />
            What is this stage about?
          </button>
        )}

        {selectedStage.warning && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <span className="text-amber-400 text-sm font-medium shrink-0">Note:</span>
            <p className="text-sm text-amber-200 leading-relaxed">{selectedStage.warning}</p>
          </div>
        )}

        <div className="space-y-3">
          {selectedStage.checklistItems.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="w-full flex items-center gap-4 p-4 bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/50 rounded-2xl transition-all">
                <CheckboxCircle
                  completed={item.completed}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItemCompleted(selectedStage.id, item.id);
                  }}
                  aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
                />
                <button
                  type="button"
                  onClick={() => setSelectedTaskKey({ stageId: selectedStage.id, itemId: item.id })}
                  className="flex-1 flex items-center gap-3 min-w-0 text-left rounded-lg -m-1 p-1 hover:bg-slate-700/30"
                >
                  <div className="text-blue-400 shrink-0">{item.icon}</div>
                  <span
                    className={`text-white truncate ${item.completed ? "line-through opacity-60" : ""}`}
                  >
                    {item.label}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-500 shrink-0 ml-auto" />
                </button>
              </div>
              {item.note && (
                <div className="ml-12 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                  <p className="text-sm text-gray-400 truncate">{item.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </JourneyLayout>
      {modal}
      </>
    );
  }

  return (
    <>
    <JourneyLayout
      onBack={onBack}
      headerCenter={
        <>
          <h2 className="text-xl text-white font-medium">Your journey</h2>
          <p className="text-xs text-gray-400">Tap any stage to see your checklist</p>
        </>
      }
      headerRight={headerLoginButton}
      footer={<Footer onNavigate={onNavigate} />}
      contentClassName="py-8 pb-12"
    >
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 shadow-lg mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            {calculateProgress() === 0 ? (
              <>
                <h3 className="text-lg text-white font-medium">Getting started</h3>
                <p className="text-sm text-gray-400">This is where most first-time buyers begin.</p>
              </>
            ) : (
              <>
                <h3 className="text-lg text-white font-medium">You&apos;re {calculateProgress()}% there</h3>
                <p className="text-sm text-gray-400">Keep going — you&apos;ve got this</p>
              </>
            )}
          </div>
          <span className="text-3xl">
            {calculateProgress() === 100 ? "🎉" : calculateProgress() > 50 ? "💪" : calculateProgress() === 0 ? "" : "👏"}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-lg shadow-blue-500/30"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => {
          const displayStatus = getStageDisplayStatus(stage);
          return (
          <button
            key={stage.id}
            onClick={() => setSelectedStageId(stage.id)}
            className={`w-full text-left backdrop-blur-sm border rounded-2xl p-5 transition-all hover:scale-[1.01] ${
              displayStatus === "completed"
                ? "bg-green-900/20 border-green-500/30"
                : displayStatus === "in-progress"
                  ? "bg-blue-900/20 border-blue-500/30"
                  : "bg-slate-800/60 border-slate-700/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  displayStatus === "completed"
                    ? "bg-gradient-to-br from-green-500 to-emerald-600"
                    : displayStatus === "in-progress"
                      ? "bg-gradient-to-br from-blue-500 to-purple-600"
                      : "bg-slate-700"
                }`}
              >
                {displayStatus === "completed" && <CheckCircle2 className="w-6 h-6 text-white" />}
                {displayStatus === "in-progress" && <Clock className="w-5 h-5 text-white" />}
                {displayStatus === "upcoming" && <Circle className="w-5 h-5 text-gray-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{stage.stageNumber}</p>
                <h4 className="text-lg text-white font-medium">{stage.title}</h4>
                <p className="text-sm text-gray-400">{getStageProgress(stage)} tasks completed</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-500 shrink-0" />
            </div>
          </button>
          );
        })}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white shadow-2xl shadow-blue-500/20">
        <h3 className="text-lg font-medium mb-2">Stuck? Confused? Need help?</h3>
        <p className="text-sm mb-4 text-blue-50 leading-relaxed">
          I'm here to answer your questions in plain English. No legal jargon, no rubbish.
        </p>
        <Button
          onClick={onOpenChat}
          className="w-full bg-white text-blue-600 hover:bg-blue-50 border-0 rounded-xl h-12 font-medium"
        >
          Let's chat
        </Button>
      </div>
    </JourneyLayout>
    {modal}
    </>
  );
}
