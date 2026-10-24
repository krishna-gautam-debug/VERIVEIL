import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function IssueCredentialPage() {
  const { issueNewCredential } = useApp();
  const navigate = useNavigate();

  const [holderName, setHolderName] = useState('Krishna Gautam');
  const [holderEmail, setHolderEmail] = useState('krishna.gautam@veriveil.io');
  const [credentialType, setCredentialType] = useState('Academic Record');
  const [marksPercentage, setMarksPercentage] = useState('85.0');
  const [degree, setDegree] = useState('Bachelor of Science in Engineering');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const attributes =
        credentialType === 'Academic Record'
          ? { marksPercentage: parseFloat(marksPercentage), degree, status: 'Graduated With Honors' }
          : { verified: true, classification: 'Level 1 Tier' };

      const cred = await issueNewCredential({
        holderName,
        holderEmail,
        credentialType,
        attributes
      });

      setSuccessResult(cred);
    } catch (err) {
      alert(`Issuance failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Credential Issuance Console</span>
        </div>
        <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
          Issue Digitally Signed Credential
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Sign and persist an authentic credential to a holder’s VeriVeil identity.
        </p>
      </div>

      {!successResult ? (
        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1.5">
                Holder Full Name
              </label>
              <input
                type="text"
                required
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1.5">
                Holder Email Address
              </label>
              <input
                type="email"
                required
                value={holderEmail}
                onChange={(e) => setHolderEmail(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-800 block mb-1.5">
              Credential Type
            </label>
            <select
              value={credentialType}
              onChange={(e) => setCredentialType(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-400"
            >
              <option value="Academic Record">Academic Record</option>
              <option value="Age Credential">Age Credential</option>
              <option value="Residency Proof">Residency Proof</option>
              <option value="Income Credential">Income Credential</option>
            </select>
          </div>

          {credentialType === 'Academic Record' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-surface-soft border border-border">
              <div>
                <label className="text-xs font-semibold text-neutral-800 block mb-1.5">
                  Academic Marks Percentage (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={marksPercentage}
                  onChange={(e) => setMarksPercentage(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-border bg-white text-neutral-900 focus:outline-none focus:border-neutral-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-800 block mb-1.5">
                  Degree / Program Title
                </label>
                <input
                  type="text"
                  required
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-border bg-white text-neutral-900 focus:outline-none focus:border-neutral-400"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs disabled:opacity-40"
            >
              {isSubmitting ? 'Computing SHA-256 & Signing with Ed25519...' : 'Sign & Issue Credential →'}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card space-y-5 animate-in fade-in">
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-emerald-950">Credential Issued Successfully!</h3>
              <p className="text-xs text-emerald-800">
                The payload has been canonically hashed and cryptographically signed.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-soft border border-border space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-500">Credential ID:</span>
              <span className="font-mono font-semibold text-neutral-900">{successResult.credentialId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Reference Code:</span>
              <span className="font-mono font-bold text-neutral-900">{successResult.credentialRef}</span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">SHA-256 Digest:</span>
              <span className="font-mono text-[10px] text-neutral-600 break-all bg-white p-2 rounded-lg block border border-border">
                {successResult.payloadDigest}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setSuccessResult(null)}
              className="px-5 py-2.5 rounded-full border border-border text-xs font-medium text-neutral-700 hover:bg-surface-soft"
            >
              Issue Another
            </button>
            <button
              onClick={() => navigate('/issuer')}
              className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
            >
              Return to Issuer Console
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
