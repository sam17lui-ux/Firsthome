import { createClient } from "@supabase/supabase-js";
import type { PersistedJourney } from "./journey-storage";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase env vars missing. Auth and journey sync will fall back to local.");
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export async function fetchJourney(userId: string): Promise<PersistedJourney | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("user_journey")
    .select("journey_data")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data?.journey_data) return null;
  const j = data.journey_data as unknown;
  if (j && typeof j === "object" && "stages" in j && Array.isArray((j as { stages: unknown }).stages)) {
    return { stages: (j as { stages: PersistedJourney["stages"] }).stages };
  }
  return null;
}

export async function upsertJourney(userId: string, journey: PersistedJourney): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from("user_journey").upsert(
    { user_id: userId, journey_data: journey, updated_at: new Date().toISOString() },
    { onConflict: "user_id" }
  );
  return !error;
}
