"use client";

import { useState } from "react";
import { ArrowLeft, Key, Trash2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/footer";
import { updatePassword, deleteAccount } from "@/lib/supabase-auth";

interface AccountScreenProps {
  userEmail: string;
  userId?: string | null;
  onBack: () => void;
  onLogout: () => void;
  onNavigate?: (screen: string) => void;
}

export function AccountScreen({ userEmail, userId, onBack, onLogout, onNavigate }: AccountScreenProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [changePasswordTouched, setChangePasswordTouched] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordTouched(true);
    setChangePasswordError(null);
    if (newPassword.length < 8 || newPassword !== confirmPassword) return;

    setChangePasswordLoading(true);
    const { error } = await updatePassword(newPassword);
    setChangePasswordLoading(false);
    if (error) {
      setChangePasswordError(error);
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setChangePasswordTouched(false);
    setChangePasswordSuccess(true);
    onLogout();
  };

  const handleDeleteAccount = async () => {
    setDeleteError(null);
    setDeleteLoading(true);
    const { error } = await deleteAccount();
    setDeleteLoading(false);
    if (error) {
      setDeleteError(error);
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("firsthome-journey");
    }
    onLogout();
    onBack();
  };

  const newPasswordValid = newPassword.length >= 8;
  const passwordsMatch = newPassword === confirmPassword;
  const changePasswordValid = currentPassword && newPasswordValid && passwordsMatch;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-16">
        <h1 className="text-3xl font-bold text-white mb-2">Account</h1>
        <p className="text-slate-400 mb-8">{userEmail}</p>

        {/* Change password */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Change password</h2>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Update your password to keep your account secure. You&apos;ll need to sign in again after changing it.
          </p>
          {changePasswordSuccess && (
            <p className="text-sm text-teal-400 mb-4">Password updated. Please sign in again.</p>
          )}
          {changePasswordError && (
            <p className="text-sm text-red-400 mb-4">{changePasswordError}</p>
          )}
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <Label htmlFor="current-password" className="text-slate-300">Current password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 bg-slate-900/50 border-slate-600 text-white"
                placeholder="Enter current password"
                autoComplete="current-password"
              />
            </div>
            <div>
              <Label htmlFor="new-password" className="text-slate-300">New password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 bg-slate-900/50 border-slate-600 text-white"
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
              {changePasswordTouched && !newPasswordValid && newPassword && (
                <p className="text-sm text-red-400 mt-1">Password must be at least 8 characters.</p>
              )}
            </div>
            <div>
              <Label htmlFor="confirm-password" className="text-slate-300">Confirm new password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 bg-slate-900/50 border-slate-600 text-white"
                placeholder="Confirm new password"
                autoComplete="new-password"
              />
              {changePasswordTouched && newPassword && !passwordsMatch && (
                <p className="text-sm text-red-400 mt-1">Passwords do not match.</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={!changePasswordValid || changePasswordLoading}
              className="bg-teal-600 hover:bg-teal-500 text-white rounded-xl"
            >
              {changePasswordLoading ? "Updating…" : "Update password"}
            </Button>
          </form>
        </section>

        {/* Log out */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <LogOut className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-semibold text-white">Log out</h2>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Sign out of your account on this device. Your progress stays saved.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={onLogout}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl"
          >
            Log out
          </Button>
        </section>

        {/* Delete account */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Delete account</h2>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Permanently delete your account and all saved journey progress. This cannot be undone.
          </p>
          {!showDeleteConfirm ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteConfirm(true)}
              className="border-red-900/50 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-xl"
            >
              Delete account
            </Button>
          ) : (
            <div className="space-y-3">
              {deleteError && <p className="text-sm text-red-400">{deleteError}</p>}
              <p className="text-sm text-slate-300">Are you sure? This will remove all your data.</p>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setShowDeleteConfirm(false); setDeleteError(null); }}
                  disabled={deleteLoading}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
                >
                  {deleteLoading ? "Deleting…" : "Yes, delete my account"}
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>

      {onNavigate && <Footer onNavigate={onNavigate} />}
    </div>
  );
}
