const STORAGE_KEY = "firsthome-journey";

export function deriveStageStatus(
  checklistItems: { completed: boolean }[],
  userMarkedComplete?: boolean
): "completed" | "in-progress" | "upcoming" {
  if (userMarkedComplete) return "completed";
  const completed = checklistItems.filter((i) => i.completed).length;
  if (completed === 0) return "upcoming";
  if (completed === checklistItems.length) return "completed";
  return "in-progress";
}

export type PersistedStage = {
  id: number;
  status: "completed" | "in-progress" | "upcoming";
  userMarkedComplete?: boolean;
  checklistItems: { id: string; completed: boolean; note: string }[];
};

export type PersistedJourney = {
  stages: PersistedStage[];
};

export function loadJourney(): PersistedJourney | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedJourney;
    return parsed?.stages ? { stages: parsed.stages } : null;
  } catch {
    return null;
  }
}

export function saveJourney(data: PersistedJourney): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function toPersisted(stages: {
  id: number;
  status: "completed" | "in-progress" | "upcoming";
  userMarkedComplete?: boolean;
  checklistItems: { id: string; completed: boolean; note: string }[];
}[]): PersistedJourney {
  return {
    stages: stages.map((s) => {
      const status = deriveStageStatus(s.checklistItems, s.userMarkedComplete);
      return {
        id: s.id,
        status,
        userMarkedComplete: s.userMarkedComplete,
        checklistItems: s.checklistItems.map((i) => ({
          id: i.id,
          completed: i.completed,
          note: i.note ?? "",
        })),
      };
    }),
  };
}

export function mergePersisted<T extends { id: number; status: "completed" | "in-progress" | "upcoming"; userMarkedComplete?: boolean; checklistItems: { id: string; completed: boolean; note: string }[] }>(
  defaultStages: T[],
  persisted: PersistedJourney | null
): T[] {
  if (!persisted?.stages?.length) return defaultStages;
  const map = new Map(persisted.stages.map((s) => [s.id, s]));
  return defaultStages.map((stage) => {
    const p = map.get(stage.id);
    if (!p) return stage;
    const itemMap = new Map(p.checklistItems.map((i) => [i.id, i]));
    const checklistItems = stage.checklistItems.map((item) => {
      const pi = itemMap.get(item.id);
      return pi ? { ...item, completed: pi.completed, note: pi.note ?? "" } : item;
    });
    const status = deriveStageStatus(checklistItems, p.userMarkedComplete);
    return {
      ...stage,
      status,
      userMarkedComplete: p.userMarkedComplete,
      checklistItems,
    };
  }) as T[];
}
