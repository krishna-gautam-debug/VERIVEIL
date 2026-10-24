import React, { useState } from 'react';
import {
  User,
  Shield,
  KeyRound,
  CheckCircle2,
  Lock,
  Mail,
  Fingerprint,
  Calendar,
  Save,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ProfilePage() {
  const { currentUser, setCurrentUser, activeRole } = useApp();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [privacyMode, setPrivacyMode] = useState(currentUser.privacyMode ?? true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name,
      email,
      privacyMode
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Account & Identity Settings</span>
          </div>
          <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
            Profile & Security
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage your personal profile and local cryptographic privacy preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card & Avatar (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-surface-soft shadow-card"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900">{currentUser.name}</h2>
            <p className="text-xs text-neutral-500">{currentUser.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-surface-soft border border-border rounded-full text-xs font-semibold text-neutral-800 capitalize">
              <Shield className="w-3 h-3 text-neutral-900" />
              {activeRole} Account
            </div>
          </div>

          <div className="w-full pt-4 border-t border-neutral-100 space-y-2 text-left text-xs text-neutral-600">
            <div className="flex justify-between">
              <span className="text-neutral-400">Member Since:</span>
              <span className="font-medium text-neutral-800">{currentUser.memberSince}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Account ID:</span>
              <span className="font-mono text-[11px] text-neutral-800">{currentUser.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">ZKP Key Material:</span>
              <span className="font-semibold text-emerald-700">Initialized & Healthy</span>
            </div>
          </div>
        </div>

        {/* Edit Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="border-b border-border pb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Personal Information
            </h3>
            {saved && (
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                ✓ Changes Saved
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1">
                Full Display Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="pt-2">
              <label className="text-xs font-semibold text-neutral-800 block mb-2">
                Privacy Enforcement
              </label>
              <div className="p-4 rounded-2xl bg-surface-soft border border-border flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">Strict Privacy Mode</span>
                  <span className="text-[11px] text-neutral-500">Automatically refuse unmasked disclosure requests</span>
                </div>
                <input
                  type="checkbox"
                  checked={privacyMode}
                  onChange={(e) => setPrivacyMode(e.target.checked)}
                  className="w-4 h-4 rounded text-neutral-900 focus:ring-0"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" /> Save Profile Preferences
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
