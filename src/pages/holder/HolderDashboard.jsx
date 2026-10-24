import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileCheck,
  Clock,
  CheckCircle2,
  Shield,
  ArrowUpRight,
  ArrowRight,
  GraduationCap,
  User,
  MapPin,
  MoreVertical,
  Lock,
  Plus,
  QrCode,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HolderDashboard() {
  const {
    currentUser,
    credentials,
    requests,
    recentVerifications,
    approveRequest,
    rejectRequest
  } = useApp();

  const navigate = useNavigate();
  const [selectedCredMenu, setSelectedCredMenu] = useState(null);
  const [reviewModalRequest, setReviewModalRequest] = useState(null);
  const [proofSuccessToast, setProofSuccessToast] = useState(null);

  const firstName = currentUser.name.split(' ')[0] || 'Krishna';

  const handleApprove = async (req) => {
    const proof = await approveRequest(req.id);
    if (proof) {
      setProofSuccessToast(`Zero-Knowledge Proof created and verified for ${req.organization}!`);
      setTimeout(() => setProofSuccessToast(null), 5000);
    }
  };

  const handleReject = (reqId) => {
    rejectRequest(reqId);
  };

  // Monthly activity chart data (Jan-Dec)
  const activityData = [
    { month: 'Jan', successful: 7, failed: 1 },
    { month: 'Feb', successful: 10, failed: 2 },
    { month: 'Mar', successful: 8, failed: 0 },
    { month: 'Apr', successful: 12, failed: 1 },
    { month: 'May', successful: 6, failed: 1 },
    { month: 'Jun', successful: 9, failed: 2 },
    { month: 'Jul', successful: 11, failed: 1 },
    { month: 'Aug', successful: 8, failed: 3 },
    { month: 'Sep', successful: 13, failed: 1 },
    { month: 'Oct', successful: 10, failed: 2 },
    { month: 'Nov', successful: 9, failed: 1 },
    { month: 'Dec', successful: 14, failed: 2 },
  ];

  const maxVal = 15;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {proofSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3.5 rounded-2xl shadow-floating flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <p className="text-xs font-semibold">{proofSuccessToast}</p>
            <p className="text-[11px] text-neutral-400">Zero sensitive records were exposed during verification.</p>
          </div>
          <button
            onClick={() => setProofSuccessToast(null)}
            className="ml-2 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TOP WELCOME BANNER (Exact match of Reference Image 1) */}
      <div className="relative overflow-hidden bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Subtle decorative smoke wave/botanical background */}
        <div className="absolute right-0 top-0 bottom-0 w-2/5 pointer-events-none opacity-20 hidden md:block">
          <svg viewBox="0 0 400 200" fill="none" className="w-full h-full object-cover">
            <path
              d="M100 20 C180 60 220 20 300 90 C380 160 400 120 400 200 L0 200 Z"
              fill="url(#botanicalGradient)"
            />
            <defs>
              <linearGradient id="botanicalGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#737373" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#171717" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Left Side: Editorial Greeting */}
        <div className="relative z-10 flex items-start sm:items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-border shadow-xs hidden sm:block"
            onError={(e) => { e.target.style.display = 'none'; }}
          />

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ZKP Protected & Encrypted
              </span>
              <span className="text-[11px] text-neutral-400">• Member since {currentUser.memberSince}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-text-primary tracking-tight">
              Welcome back, {firstName}!
            </h1>
            <p className="text-sm text-text-secondary mt-1 font-sans">
              Your verified credentials, your control.
            </p>
          </div>
        </div>

        {/* Right Side: Editorial Serif Brand Tagline */}
        <div className="relative z-10 text-right hidden lg:block pr-4">
          <div className="text-2xl font-serif text-neutral-800 tracking-tight leading-snug">
            Prove Privately.
          </div>
          <div className="text-2xl font-serif text-neutral-800 tracking-tight leading-snug">
            Empower Everyone.
          </div>
        </div>
      </div>

      {/* TOP 4 SUMMARY METRIC CARDS (Exact match of Reference Image 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 3 Verified Credentials */}
        <Link
          to="/credentials"
          className="bg-white border border-border rounded-2xl p-5 shadow-card card-hover-effect flex flex-col justify-between group"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-surface-warm/80 border border-border flex items-center justify-center text-neutral-800">
              <FileCheck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>

          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 font-sans">
              {credentials.filter(c => !c.revoked).length}
            </div>
            <div className="text-xs font-semibold text-neutral-800 mt-0.5">
              Verified Credentials
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              ↑ +1 this month
            </div>
          </div>
        </Link>

        {/* Card 2: 2 Pending Requests */}
        <Link
          to="/requests"
          className="bg-white border border-border rounded-2xl p-5 shadow-card card-hover-effect flex flex-col justify-between group"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-surface-warm/80 border border-border flex items-center justify-center text-neutral-800">
              <Clock className="w-5 h-5 stroke-[1.75]" />
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
          </div>

          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 font-sans">
              {requests.length}
            </div>
            <div className="text-xs font-semibold text-neutral-800 mt-0.5">
              Pending Requests
            </div>
            <div className="text-[11px] text-neutral-500 font-medium mt-1">
              Needs your approval
            </div>
          </div>
        </Link>

        {/* Card 3: 5 Verifications Done */}
        <Link
          to="/history"
          className="bg-white border border-border rounded-2xl p-5 shadow-card card-hover-effect flex flex-col justify-between group"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-surface-warm/80 border border-border flex items-center justify-center text-neutral-800">
              <CheckCircle2 className="w-5 h-5 stroke-[1.75]" />
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
          </div>

          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 font-sans">
              5
            </div>
            <div className="text-xs font-semibold text-neutral-800 mt-0.5">
              Verifications Done
            </div>
            <div className="text-[11px] text-neutral-500 font-medium mt-1">
              Last 30 days
            </div>
          </div>
        </Link>

        {/* Card 4: Active Privacy Mode */}
        <div className="bg-white border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-surface-warm/80 border border-border flex items-center justify-center text-neutral-800">
              <Shield className="w-5 h-5 stroke-[1.75]" />
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900 font-sans">
                Active
              </span>
            </div>
            <div className="text-xs font-semibold text-neutral-800 mt-0.5 flex items-center gap-1.5">
              Privacy Mode <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            <div className="text-[11px] text-neutral-500 font-medium mt-1">
              Your data stays private
            </div>
          </div>
        </div>
      </div>

      {/* SECOND ROW: YOUR CREDENTIALS & GENERATE A PROOF */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Your Credentials (2 cols on desktop) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900 font-sans">
              Your Credentials
            </h2>
            <Link
              to="/credentials"
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {credentials.slice(0, 3).map((cred) => (
              <div
                key={cred.credentialId}
                className="bg-white border border-border rounded-2xl p-4 shadow-card flex flex-col justify-between relative group hover:border-neutral-300 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-xl bg-surface-soft border border-border flex items-center justify-center text-neutral-800">
                      {cred.iconType === 'academic' && <GraduationCap className="w-4 h-4" />}
                      {cred.iconType === 'user' && <User className="w-4 h-4" />}
                      {cred.iconType === 'location' && <MapPin className="w-4 h-4" />}
                    </div>

                    <button
                      onClick={() => setSelectedCredMenu(selectedCredMenu === cred.credentialId ? null : cred.credentialId)}
                      className="text-neutral-400 hover:text-neutral-900 p-1 rounded-md"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-semibold text-xs text-neutral-900 mt-3 truncate">
                    {cred.credentialType}
                  </h3>
                  <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                    Issued by <br />
                    <span className="text-neutral-700 font-medium">{cred.issuer}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1">
                    ✓ {cred.status}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Valid till {cred.validTill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Generate a Proof Dark Card (Exact match of Reference Image 1) */}
        <div className="relative overflow-hidden bg-neutral-900 text-white rounded-3xl p-6 shadow-floating flex flex-col justify-between group">
          {/* Layered floating glass cards illustration in top right */}
          <div className="absolute right-3 top-3 w-36 h-36 opacity-30 group-hover:opacity-40 transition-opacity pointer-events-none">
            <div className="relative w-full h-full">
              {/* Card 1 */}
              <div className="absolute right-0 top-2 w-28 h-20 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 transform rotate-12 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white/80" />
              </div>
              {/* Card 2 */}
              <div className="absolute right-4 top-8 w-28 h-20 bg-white/20 backdrop-blur-lg rounded-xl border border-white/30 transform -rotate-6 flex items-center justify-center shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-[240px]">
            <h2 className="text-2xl font-serif font-normal tracking-tight text-white">
              Generate a Proof
            </h2>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Select a credential and prove your eligibility without revealing your exact data.
            </p>
          </div>

          <div className="relative z-10 mt-6">
            <Link
              to="/generate-proof"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-neutral-900 text-xs font-semibold hover:bg-neutral-100 transition-colors shadow-subtle"
            >
              Generate Proof <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* THIRD ROW: PENDING VERIFICATION REQUESTS & RECENT VERIFICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Verification Requests Box */}
        <div className="bg-white border border-border rounded-3xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900 font-sans">
              Pending Verification Requests
            </h2>
            <Link
              to="/requests"
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {requests.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              You’re all caught up. No pending verification requests.
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl bg-surface-soft border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-neutral-900">
                        {req.organization}
                      </h3>
                      <p className="text-[11px] text-neutral-500">
                        Needs proof: <span className="font-medium text-neutral-700">{req.conditionLabel}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-[10px] text-neutral-400 mr-2 hidden sm:inline">
                      {req.timeAgo}
                    </span>
                    <button
                      onClick={() => handleApprove(req)}
                      className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="px-3 py-1.5 rounded-full bg-white border border-border text-neutral-700 text-xs font-medium hover:bg-neutral-50 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Verifications Box */}
        <div className="bg-white border border-border rounded-3xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900 font-sans">
              Recent Verifications
            </h2>
            <Link
              to="/history"
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {recentVerifications.slice(0, 4).map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-surface-soft border border-border flex items-center justify-center text-neutral-700">
                    {item.icon === 'academic' && <GraduationCap className="w-3.5 h-3.5" />}
                    {item.icon === 'user' && <User className="w-3.5 h-3.5" />}
                    {item.icon === 'lock' && <Lock className="w-3.5 h-3.5" />}
                    {item.icon === 'home' && <MapPin className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">{item.title}</div>
                    <div className="text-[11px] text-neutral-500">{item.condition}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {item.statusType === 'eligible' ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Eligible
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                      Not Eligible
                    </span>
                  )}
                  <span className="text-[10px] text-neutral-400 w-16 text-right">
                    {item.timeAgo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOURTH ROW: VERIFICATION ACTIVITY, QUICK ACTIONS, NEED HELP? */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Verification Activity Chart (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white border border-border rounded-3xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900 font-sans">
              Verification Activity
            </h2>
            <div className="flex items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5 text-neutral-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-neutral-900 inline-block"></span>
                <span>Successful</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-neutral-200 inline-block"></span>
                <span>Failed</span>
              </div>
            </div>
          </div>

          {/* Interactive SVG Bar Chart (Exact match of Image 1) */}
          <div className="pt-4">
            <div className="flex items-end justify-between h-36 gap-2 border-b border-neutral-100 pb-2">
              {activityData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="w-full flex items-end justify-center gap-1 h-28">
                    {/* Successful Bar (Black) */}
                    <div
                      style={{ height: `${(d.successful / maxVal) * 100}%` }}
                      className="w-2 sm:w-2.5 bg-neutral-900 rounded-t-sm transition-all group-hover:bg-neutral-700"
                      title={`${d.month}: ${d.successful} Successful`}
                    />
                    {/* Failed Bar (Light Gray) */}
                    {d.failed > 0 && (
                      <div
                        style={{ height: `${(d.failed / maxVal) * 100}%` }}
                        className="w-2 sm:w-2.5 bg-neutral-200 rounded-t-sm transition-all group-hover:bg-neutral-300"
                        title={`${d.month}: ${d.failed} Failed`}
                      />
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-400 group-hover:text-neutral-900 transition-colors">
                    {d.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[10px] text-neutral-400 pt-2 px-1">
              <span>0</span>
              <span>5</span>
              <span>10</span>
              <span>15 (Max)</span>
            </div>
          </div>
        </div>

        {/* Quick Actions (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white border border-border rounded-3xl p-6 shadow-card space-y-4 flex flex-col justify-between">
          <h2 className="text-sm font-semibold text-neutral-900 font-sans">
            Quick Actions
          </h2>

          <div className="grid grid-cols-3 gap-2 py-2">
            <Link
              to="/credentials"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-surface-soft border border-border hover:bg-neutral-100 transition-colors text-center group"
            >
              <div className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-neutral-800 shadow-xs group-hover:scale-105 transition-transform">
                <Plus className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[10px] font-medium text-neutral-700 mt-2 truncate w-full">
                Add Credential
              </span>
            </Link>

            <Link
              to="/qr-code"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-surface-soft border border-border hover:bg-neutral-100 transition-colors text-center group"
            >
              <div className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-neutral-800 shadow-xs group-hover:scale-105 transition-transform">
                <QrCode className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[10px] font-medium text-neutral-700 mt-2 truncate w-full">
                Generate QR
              </span>
            </Link>

            <Link
              to="/history"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-surface-soft border border-border hover:bg-neutral-100 transition-colors text-center group"
            >
              <div className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-neutral-800 shadow-xs group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[10px] font-medium text-neutral-700 mt-2 truncate w-full">
                View History
              </span>
            </Link>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 text-[11px] text-neutral-500 border border-neutral-100 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
            <span>All actions run client-side zero-knowledge proofs.</span>
          </div>
        </div>

        {/* Need Help? (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white border border-border rounded-3xl p-6 shadow-card space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900 font-sans">
              Need Help?
            </h2>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </div>

          <div className="py-2 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-surface-soft border border-border flex items-center justify-center text-neutral-800 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Learn how VERIVEIL works and keep your data private.
            </p>
          </div>

          <Link
            to="/documentation"
            className="w-full py-2.5 px-4 rounded-full border border-border text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            View Documentation <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
