"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp } from "@/lib/supabase-auth";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultMode: "login" | "create";
  onLogin: (email: string) => void;
  onCreateAccount: (email: string) => void;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getEmailError(email: string, touched: boolean): string | undefined {
  if (!touched) return undefined;
  if (!email.trim()) return "Please enter a valid email address.";
  return isValidEmail(email) ? undefined : "Please enter a valid email address.";
}

function getPasswordError(password: string, touched: boolean): string | undefined {
  if (!touched) return undefined;
  if (!password) return "Password must be at least 8 characters.";
  return password.length >= 8 ? undefined : "Password must be at least 8 characters.";
}

export function AuthModal({
  open,
  onClose,
  defaultMode,
  onLogin,
  onCreateAccount,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "create">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setMode(defaultMode);
      setEmail("");
      setPassword("");
      setTouched({ email: false, password: false });
      setAuthError(null);
    }
  }, [open, defaultMode]);

  if (!open) return null;

  const emailError = getEmailError(email, touched.email);
  const passwordError = getPasswordError(password, touched.password);
  const isValid =
    email.trim().length > 0 &&
    password.length > 0 &&
    isValidEmail(email) &&
    password.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setAuthError(null);
    if (!isValid) return;

    setLoading(true);
    const { error } = mode === "login"
      ? await signIn(email, password)
      : await signUp(email, password);
    setLoading(false);

    if (error) {
      setAuthError(error);
      return;
    }
    onLogin(email);
    onClose();
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setTouched({ email: false, password: false });
    setMode(defaultMode);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-md bg-slate-800 border border-slate-700/50 rounded-2xl shadow-xl p-6">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 -m-2 text-gray-400 hover:text-white rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 id="auth-modal-title" className="text-xl font-medium text-white mb-2 pr-8">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          {mode === "login"
            ? "Sign in to continue your journey."
            : "Sign up to save your progress across all your devices."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {authError && (
            <p className="text-sm text-red-400 bg-red-900/20 border border-red-800/50 rounded-lg px-4 py-3">
              {authError}
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="auth-email" className="text-slate-300">
              Email address
            </Label>
            <Input
              id="auth-email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              className="h-12 bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500 rounded-xl"
              autoComplete="email"
              aria-invalid={!!emailError}
            />
            {emailError && (
              <p className="text-sm text-red-400">{emailError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="auth-password" className="text-slate-300">
              Password
            </Label>
            <Input
              id="auth-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              className="h-12 bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500 rounded-xl"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              aria-invalid={!!passwordError}
            />
            {passwordError && (
              <p className="text-sm text-red-400">{passwordError}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!isValid || loading}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
          </Button>
        </form>

        <p className="text-center mt-6">
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "create" : "login");
              setTouched({ email: false, password: false });
            }}
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            {mode === "login"
              ? "Don't have an account? Create account →"
              : "Already have an account? Log in →"}
          </button>
        </p>

        {mode === "create" && (
          <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
            By signing up, you agree to our Terms and Privacy Policy.
          </p>
        )}
      </div>
    </div>
  );
}
