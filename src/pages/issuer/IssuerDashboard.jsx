import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileSpreadsheet,
  PlusCircle,
  KeyRound,
  ShieldCheck,
  AlertOctagon,
  ArrowRight,
  GraduationCap,
  User,
  MapPin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function IssuerDashboard() {
  const { credentials, revokeCredential } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Authorized Authority Console</span>
          </div>
          <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
            Issuer Authority Center
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Issue cryptographically signed credentials and manage public key registries.
          </p>
        </div>

        <Link
          to="/issuer/issue"
          className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 shadow-xs flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Issue New Credential
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
          <span className="text-xs text-neutral-500 font-medium">Total Issued Credentials</span>
          <div className="text-3xl font-bold text-neutral-900 font-sans mt-2">{credentials.length}</div>
          <span className="text-[11px] text-neutral-400 mt-1 block">Active digital signatures</span>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
          <span className="text-xs text-neutral-500 font-medium">Active & Valid</span>
          <div className="text-3xl font-bold text-neutral-900 font-sans mt-2">
            {credentials.filter(c => !c.revoked).length}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Verified on-chain/ledger</span>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
          <span className="text-xs text-neutral-500 font-medium">Revoked Credentials</span>
          <div className="text-3xl font-bold text-neutral-900 font-sans mt-2">
            {credentials.filter(c => c.revoked).length}
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">Revocation list updated</span>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
          <span className="text-xs text-neutral-500 font-medium">Signing Key Status</span>
          <div className="text-xl font-bold text-emerald-700 font-sans mt-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Active (Ed25519)
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">KEY-XYZ-PUB-2024</span>
        </div>
      </div>

      {/* Issued Credentials Table */}
      <div className="bg-white border border-border rounded-3xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900 font-sans">
            Registry of Issued Credentials
          </h2>
          <span className="text-xs text-neutral-400 font-mono">
            {credentials.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-soft border-b border-border text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Credential</th>
                <th className="py-3 px-4">Holder</th>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Expiration</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {credentials.map((cred) => (
                <tr key={cred.credentialId} className="hover:bg-surface-soft/60">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">
                    {cred.credentialType}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-700">
                    {cred.holderName}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-500">
                    {cred.credentialRef}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      cred.revoked
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {cred.revoked ? 'Revoked' : 'Active'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500 font-mono text-[11px]">
                    {cred.validTill}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {!cred.revoked && (
                      <button
                        onClick={() => revokeCredential(cred.credentialId)}
                        className="px-3 py-1 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-medium"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
