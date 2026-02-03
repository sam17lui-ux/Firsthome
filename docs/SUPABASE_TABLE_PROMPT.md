# Supabase AI Prompt: Create user_journey Table

Copy the prompt below and paste it into Supabase's AI assistant (or SQL Editor) to create the table that stores user emails and their journey progress.

---

## Prompt for Supabase

```
Create a table called `user_journey` in the public schema with the following requirements:

1. **Columns:**
   - `id` — uuid, primary key, default `gen_random_uuid()`
   - `user_id` — uuid, not null, unique, references `auth.users(id)` on delete cascade
   - `journey_data` — jsonb, not null, default `'{"stages":[]}'::jsonb`
   - `updated_at` — timestamptz, default `now()`

2. **journey_data structure** — The JSONB column stores an object with a `stages` array. Each stage has:
   - `id` (number)
   - `status` (text: "completed" | "in-progress" | "upcoming")
   - `userMarkedComplete` (optional boolean)
   - `checklistItems` (array of objects with: `id` string, `completed` boolean, `note` string)

3. **Row Level Security (RLS):**
   - Enable RLS on the table
   - Policy: Users can SELECT only their own row (`auth.uid() = user_id`)
   - Policy: Users can INSERT only their own row (`auth.uid() = user_id`)
   - Policy: Users can UPDATE only their own row (`auth.uid() = user_id`)

4. **Optional trigger:** Add a trigger to auto-update `updated_at` on row update.
```

---

## Alternative: Raw SQL

If you prefer to run SQL directly in the SQL Editor:

```sql
create table public.user_journey (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  journey_data jsonb not null default '{"stages":[]}'::jsonb,
  updated_at timestamptz default now()
);

alter table public.user_journey enable row level security;

create policy "Users can view own journey"
  on public.user_journey for select
  using (auth.uid() = user_id);

create policy "Users can insert own journey"
  on public.user_journey for insert
  with check (auth.uid() = user_id);

create policy "Users can update own journey"
  on public.user_journey for update
  using (auth.uid() = user_id);

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.user_journey
  for each row
  execute function public.handle_updated_at();
```

---

## Change Password & Delete Account — Supabase AI Prompts

These prompts assume **Supabase Auth is enabled and connected** in your project.

---

### Verify Auth is Connected — Prompt for Supabase

```
Verify that Supabase Auth is properly set up and connected for my project:

1. Confirm Authentication is enabled in the project.
2. Confirm the Email provider is enabled under Authentication → Providers.
3. Confirm auth.users table exists and is populated when users sign up.
4. List any configuration needed for the client to use supabase.auth.signUp(), signInWithPassword(), signOut(), and updateUser(). Include any CORS or Auth URL settings if relevant.
5. Confirm that after a user signs in, auth.uid() is available for RLS policies on tables that reference auth.users(id).
```

---

### Change Password — Prompt for Supabase

```
I need to implement change password for my app. Supabase Auth must be connected.

1. Confirm that Auth is enabled and the Email provider is configured under Authentication → Providers.

2. The app will call supabase.auth.updateUser({ password: newPassword }) from the client when the user submits a valid new password. The user must be signed in. No server-side SQL is required for password updates — Auth handles this.

3. If there are any RLS policies or Auth config that could block password updates, list them. Otherwise confirm that updateUser for password change works with the default Auth setup.

4. After a successful password change, should the user be signed out? Supabase typically keeps the session. If we want to force re-login after password change, the app will call supabase.auth.signOut() after updateUser succeeds.
```

---

### Delete Account — Prompt for Supabase

```
I need to implement delete account for my app. Supabase Auth must be connected.

1. Confirm that Auth is enabled and that auth.users exists.

2. When a user deletes their account, we need to:
   a) Delete their row from user_journey (if it exists) — cascade from auth.users will handle this if user_journey.user_id references auth.users(id) on delete cascade.
   b) Delete the user from auth.users.

3. For deleting the user from auth.users: The client cannot delete its own user directly. We need a Postgres function or Edge Function. Provide a secure approach:
   - Option A: A Postgres function that auth.users can call (if RPC is exposed) to delete their own user.
   - Option B: An Edge Function that uses the service role key to call auth.admin.deleteUser(userId) — the client would call this Edge Function, passing the current user's ID, and the function verifies the caller is that user before deleting.
   - Option C: Use Supabase's built-in approach if one exists.

4. Ensure that when auth.users is deleted, the user_journey row is removed (cascade). Confirm the user_journey table has: user_id uuid references auth.users(id) on delete cascade.
```

---

### Create delete-user Edge Function — Prompt for Supabase

```
Create a Supabase Edge Function named `delete-user` that allows an authenticated user to delete their own account.

Requirements:
1. The function receives a POST request with body `{ userId: string }`.
2. The client sends the request with the Supabase session (Authorization: Bearer <jwt>). Use the JWT to verify the caller.
3. Verify that the JWT's user id matches the requested userId — users can only delete their own account.
4. Use a Supabase client created with SUPABASE_SERVICE_ROLE_KEY to call auth.admin.deleteUser(userId).
5. Return { error: "message" } on failure, or {} on success.
6. The user_journey row will be removed automatically via on delete cascade when auth.users is deleted.

Provide the full Edge Function code for supabase/functions/delete-user/index.ts
```

---

### delete-user Edge Function — Code (if creating manually)

Create `supabase/functions/delete-user/index.ts`:

```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const jwt = authHeader.replace("Bearer ", "");
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(jwt);
  if (userError || !user) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json().catch(() => ({})) as { userId?: string };
  const userId = body?.userId;
  if (!userId || userId !== user.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
```

Deploy with: `supabase functions deploy delete-user`
