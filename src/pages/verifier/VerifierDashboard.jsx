import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  PlusCircle,
  ScanLine,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  Users,
  Search,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function VerifierDashboard() {
  const { recentVerifications, currentUser } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Organization Verifier Terminal</span>
          </div>
          <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
            Verifier Operations Center
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Request, scan, and mathematically verify applicant qualifications without touching raw sensitive documents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/verifier/create-request"
            className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 shadow-xs flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Create Verification Request
          </Link>
          <Link
            to="/verifier/verify"
            className="px-5 py-2.5 rounded-full bg-white border border-border text-neutral-800 text-xs font-semibold hover:bg-surface-soft shadow-xs flex items-center gap-2"
          >
            <ScanLine className="w-4 h-4" /> Verify QR / Code
          </Link>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
          <span className="text-xs text-neutral-500 font-medium">Total Requests Created</span>
          <div className="text-3xl font-bold text-neutral-900 font-sans mt-2">18</div>
          <span className="text-[11px] text-neutral-400 mt-1 block">Across 4 requirement profiles</span>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
          <span className="text-xs text-neutral-500 font-medium">Pending Applicant Responses</span>
          <div className="text-3xl font-bold text-neutral-900 font-sans mt-2">2</div>
          <span className="text-[11px] text-amber-600 font-medium mt-1 block">Awaiting holder approval</span>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
          <span className="text-xs text-neutral-500 font-medium">Completed Verifications</span>
          <div className="text-3xl font-bold text-neutral-900 font-sans mt-2">15</div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">100% cryptographic certainty</span>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
          <span className="text-xs text-neutral-500 font-medium">Rejected / Ineligible</span>
          <div className="text-3xl font-bold text-neutral-900 font-sans mt-2">1</div>
          <span className="text-[11px] text-neutral-400 mt-1 block">Threshold unmet</span>
        </div>
      </div>

      {/* Main Row: Quick Tools & Recent Checks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Quick Actions & Live Tampering Sandbox Callout (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Tamper Lab Promotion Banner */}
          <div className="p-6 rounded-3xl bg-neutral-900 text-white shadow-floating space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Security Test</span>
            </div>

            <h2 className="text-2xl font-serif font-normal text-white tracking-tight">
              Live Tampering Demonstration
            </h2>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Experience firsthand how altering a single byte of applicant data in memory immediately causes SHA-256 and Ed25519 signature checks to fail.
            </p>

            <Link
              to="/tamper-lab"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-neutral-900 text-xs font-semibold hover:bg-neutral-100 shadow-xs"
            >
              Open Tampering Lab <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Verifier Workflow Guides */}
          <div className="bg-white border border-border rounded-3xl p-6 shadow-card space-y-3">
            <h3 className="text-sm font-bold text-neutral-900">How to Verify Proofs</h3>
            <div className="space-y-3 text-xs text-neutral-600">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-800 font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                <span>Select or generate a specific qualification requirement (e.g. Marks ≥ 75%).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-800 font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                <span>The applicant scans your request and computes a local zero-knowledge proof.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-800 font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                <span>Scan applicant QR or input their 6-digit code to receive boolean verification with zero privacy risk.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Results (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-border rounded-3xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900 font-sans">
              Recent Verification Audits
            </h2>
            <Link
              to="/history"
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
            >
              View Full History <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {recentVerifications.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-surface-soft border border-border flex items-center justify-center text-neutral-800">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">{item.title}</div>
                    <div className="text-[11px] text-neutral-500 font-medium">Tested: {item.condition}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {item.statusType === 'eligible' ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Eligible (Pass)
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                      Not Eligible (Fail)
                    </span>
                  )}
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {item.timeAgo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
