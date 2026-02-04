import { supabase } from "./supabase";

export type AuthUser = { id: string; email: string };

export async function getSession(): Promise<AuthUser | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  const u = data.session?.user;
  if (!u?.id || !u?.email) return null;
  return { id: u.id, email: u.email };
}

export function onAuthChange(cb: (user: AuthUser | null) => void): () => void {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
    const u = session?.user;
    cb(u?.id && u?.email ? { id: u.id, email: u.email } : null);
  });
  return () => data.subscription.unsubscribe();
}

export async function signIn(email: string, password: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local" };
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { error: error?.message ?? null };
}

export async function signUp(email: string, password: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local" };
  const { error } = await supabase.auth.signUp({ email, password });
  return { error: error?.message ?? null };
}

export async function signOut(): Promise<void> {
  if (supabase) await supabase.auth.signOut();
}

export async function updatePassword(newPassword: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase is not configured" };
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  return { error: error?.message ?? null };
}

export async function deleteAccount(): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase is not configured" };
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.id) return { error: "Not signed in" };
    const { data, error } = await supabase.functions.invoke("delete-user", {
      body: { userId: user.id },
    });
    if (error) return { error: error.message ?? "Failed to delete account" };
    const err = (data as { error?: string })?.error;
    if (err) return { error: err };
    await signOut();
    return { error: null };
  } catch (e) {
    return { error: (e as Error).message ?? "Failed to delete account" };
  }
}
