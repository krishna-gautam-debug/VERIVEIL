import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  GraduationCap,
  User,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  FileCode,
  Eye,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CredentialsPage() {
  const { credentials } = useApp();
  const [selectedCred, setSelectedCred] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Digital Identity Wallet</span>
          </div>
          <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
            My Verified Credentials
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Tamper-evident, issuer-signed credentials stored securely under your cryptographic control.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/forgot-code"
            className="text-xs text-neutral-500 hover:text-neutral-900 font-medium underline"
          >
            Forgot Credential Code?
          </Link>
          <Link
            to="/generate-proof"
            className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
          >
            Generate ZKP Proof →
          </Link>
        </div>
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credentials.map((cred) => (
          <div
            key={cred.credentialId}
            className="bg-white border border-border rounded-3xl p-6 shadow-card flex flex-col justify-between hover:border-neutral-300 transition-all card-hover-effect"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-surface-soft border border-border flex items-center justify-center text-neutral-800 shadow-xs">
                  {cred.iconType === 'academic' && <GraduationCap className="w-6 h-6 stroke-[1.75]" />}
                  {cred.iconType === 'user' && <User className="w-6 h-6 stroke-[1.75]" />}
                  {cred.iconType === 'location' && <MapPin className="w-6 h-6 stroke-[1.75]" />}
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                  cred.revoked
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                }`}>
                  {cred.revoked ? 'Revoked' : '✓ Verified'}
                </span>
              </div>

              <h2 className="text-base font-bold text-neutral-900 mt-4">
                {cred.credentialType}
              </h2>

              <p className="text-xs text-neutral-500 mt-0.5">
                Issued by <span className="font-semibold text-neutral-800">{cred.issuer}</span>
              </p>

              {/* Reference Code Box */}
              <div className="mt-4 p-2.5 rounded-xl bg-surface-soft border border-border flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500 text-[10px]">Ref:</span>
                <span className="font-bold text-neutral-800">{cred.credentialRef}</span>
                <button
                  onClick={() => handleCopy(cred.credentialRef, cred.credentialId)}
                  className="p-1 text-neutral-400 hover:text-neutral-900"
                  title="Copy reference code"
                >
                  {copiedCode === cred.credentialId ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Key attributes summary */}
              <div className="mt-4 space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Issue Date:</span>
                  <span className="font-medium text-neutral-700">{cred.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Expiration:</span>
                  <span className="font-medium text-neutral-700">{cred.validTill}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedCred(cred)}
                className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> View Cryptographic Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cryptographic Details Modal */}
      {selectedCred && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-floating space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  {selectedCred.credentialType} — Security Specification
                </h3>
                <p className="text-xs text-neutral-500">
                  Credential ID: {selectedCred.credentialId}
                </p>
              </div>
              <button
                onClick={() => setSelectedCred(null)}
                className="text-neutral-400 hover:text-neutral-900 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Cryptographic Properties */}
            <div className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-neutral-700 block mb-1">
                  Canonical SHA-256 Digest
                </span>
                <div className="p-3 bg-surface-soft rounded-xl font-mono text-[11px] text-neutral-800 break-all border border-border">
                  {selectedCred.payloadDigest}
                </div>
              </div>

              <div>
                <span className="font-semibold text-neutral-700 block mb-1">
                  Issuer Digital Signature (Ed25519)
                </span>
                <div className="p-3 bg-surface-soft rounded-xl font-mono text-[11px] text-neutral-800 break-all border border-border">
                  {selectedCred.signature}
                </div>
              </div>

              <div>
                <span className="font-semibold text-neutral-700 block mb-1">
                  Canonical Payload Structure
                </span>
                <pre className="p-4 bg-neutral-900 text-neutral-200 rounded-xl font-mono text-[11px] overflow-x-auto max-h-56">
                  {JSON.stringify(selectedCred.payload, null, 2)}
                </pre>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCred(null)}
                className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
