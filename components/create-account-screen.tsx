"use client";

import { useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateAccountScreenProps {
  onSuccess: () => void;
  onClose: () => void;
  onNavigateToLogin: () => void;
  onNavigate?: (screen: string) => void;
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

export function CreateAccountScreen({
  onSuccess,
  onClose,
  onNavigateToLogin,
  onNavigate,
}: CreateAccountScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError = getEmailError(email, touched.email);
  const passwordError = getPasswordError(password, touched.password);

  const isValid =
    email.trim().length > 0 &&
    password.length > 0 &&
    isValidEmail(email) &&
    password.length >= 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isValid) return;

    // Simulate account creation - local data remains in localStorage
    // In a real app, we would migrate/sync local data to the new account
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-20 shrink-0">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700/50 rounded-full transition-colors"
            aria-label="Close"
          >
            <ArrowLeft className="w-6 h-6 text-gray-200" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Home className="w-10 h-10 text-white" />
            </div>
            <span className="text-2xl text-white font-medium">FirstHome</span>
          </div>

          <h1 className="text-2xl font-medium text-white mb-2 text-center">
            Create your account
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Sign up to save your progress across all your devices.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="create-email" className="text-slate-300">
                Email address
              </Label>
              <Input
                id="create-email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className="h-12 bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500 rounded-xl focus:border-blue-500 focus:ring-blue-500/50"
                autoComplete="email"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "create-email-error" : undefined}
              />
              {emailError && (
                <p id="create-email-error" className="text-sm text-red-400">
                  {emailError}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-password" className="text-slate-300">
                Password
              </Label>
              <Input
                id="create-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                className="h-12 bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500 rounded-xl focus:border-blue-500 focus:ring-blue-500/50"
                autoComplete="new-password"
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? "create-password-error" : undefined}
              />
              {passwordError && (
                <p id="create-password-error" className="text-sm text-red-400">
                  {passwordError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isValid}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create account
            </Button>
          </form>

          <p className="text-center mt-6">
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              Already have an account? Log in →
            </button>
          </p>

          <p className="text-xs text-gray-500 text-center mt-8 leading-relaxed">
            By signing up, you agree to our{" "}
            <button
              type="button"
              onClick={() => onNavigate?.("terms")}
              className="text-gray-400 hover:text-gray-300 underline"
            >
              Terms
            </button>{" "}
            and{" "}
            <button
              type="button"
              onClick={() => onNavigate?.("privacy")}
              className="text-gray-400 hover:text-gray-300 underline"
            >
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
