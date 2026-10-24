import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileCode,
  ArrowRight,
  Fingerprint,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { sha256, verifySignature, canonicalJsonString, verifyCredential } from '../../utils/crypto';
import { useApp } from '../../context/AppContext';

export default function LiveTamperingLab() {
  const { credentials } = useApp();

  // Pick the Academic Record as baseline
  const baseCred = credentials.find(c => c.credentialType === 'Academic Record') || credentials[0];

  const [activePayload, setActivePayload] = useState(null);
  const [originalSignature, setOriginalSignature] = useState('');
  const [originalDigest, setOriginalDigest] = useState('');

  // Editing state
  const [tamperedField, setTamperedField] = useState('marksPercentage');
  const [tamperedValue, setTamperedValue] = useState('99.0');
  const [isTampered, setIsTampered] = useState(false);

  // Live verification metrics
  const [verificationOutput, setVerificationOutput] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Initialize with authentic credential
  useEffect(() => {
    if (baseCred) {
      const clonedPayload = JSON.parse(JSON.stringify(baseCred.payload));
      setActivePayload(clonedPayload);
      setOriginalSignature(baseCred.signature);
      setOriginalDigest(baseCred.payloadDigest);
      runVerification(clonedPayload, baseCred.signature, baseCred.payloadDigest);
    }
  }, [baseCred]);

  // Real cryptographic verification
  const runVerification = async (payload, signature, storedDigest) => {
    setIsVerifying(true);
    try {
      // 1. Recompute SHA-256 hash of current canonical payload
      const calculatedDigest = await sha256(payload);

      // 2. Test signature validity against the payload
      const isSignatureValid = await verifySignature(payload, signature);

      const digestMatched = calculatedDigest === storedDigest;
      const passed = digestMatched && isSignatureValid;

      setVerificationOutput({
        valid: passed,
        digestMatched,
        isSignatureValid,
        calculatedDigest,
        storedDigest,
        error: !digestMatched
          ? 'Integrity Violation: Calculated SHA-256 digest does not match original digest.'
          : !isSignatureValid
          ? 'Cryptographic Failure: Digital signature invalid for current payload.'
          : null,
        timestamp: new Date().toLocaleTimeString()
      });
    } catch (err) {
      setVerificationOutput({
        valid: false,
        error: `Cryptographic engine exception: ${err.message}`
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Trigger Tampering Action
  const handleTamper = async () => {
    if (!activePayload) return;
    const modified = JSON.parse(JSON.stringify(activePayload));

    if (tamperedField === 'marksPercentage') {
      modified.attributes.marksPercentage = parseFloat(tamperedValue) || 99.0;
    } else if (tamperedField === 'degree') {
      modified.degree = tamperedValue || 'Ph.D. in Advanced Artificial Intelligence';
    } else if (tamperedField === 'holderId') {
      modified.holderId = 'usr_forged_impostor_999';
    }

    setActivePayload(modified);
    setIsTampered(true);

    // Run real verification on modified payload while retaining original signature!
    await runVerification(modified, originalSignature, originalDigest);
  };

  // Restore Original
  const handleRestore = async () => {
    if (!baseCred) return;
    const original = JSON.parse(JSON.stringify(baseCred.payload));
    setActivePayload(original);
    setIsTampered(false);
    await runVerification(original, originalSignature, originalDigest);
  };

  if (!activePayload) {
    return <div className="p-8 text-center text-xs text-neutral-400">Loading cryptographic laboratory...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Fingerprint className="w-3.5 h-3.5" />
            <span>Interactive Security Sandbox</span>
          </div>
          <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
            Live Cryptographic Tampering Lab
          </h1>
          <p className="text-xs text-neutral-500 mt-1 max-w-xl">
            Test how VeriVeil’s SHA-256 canonical hashing and Ed25519 digital signatures mathematically
            detect and reject unauthorized modifications in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isTampered ? (
            <button
              onClick={handleRestore}
              className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restore Original Credential
            </button>
          ) : (
            <button
              onClick={handleTamper}
              className="px-5 py-2.5 rounded-full bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors shadow-xs flex items-center gap-2"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Test Tampering Now
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Payload Editor & Verification Verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Signed Payload Inspection & Mutator (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-border rounded-3xl p-6 shadow-card space-y-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-neutral-800" />
              <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Canonical Signed Payload (JSON)
              </h2>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
              isTampered ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {isTampered ? '⚠️ Payload Tampered' : '✓ Original Untouched'}
            </span>
          </div>

          {/* Tamper Control Panel */}
          <div className="p-4 rounded-2xl bg-surface-soft border border-border space-y-3">
            <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider block">
              Inject Unauthorized Mutation
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-neutral-500 block mb-1">Target Field</span>
                <select
                  disabled={isTampered}
                  value={tamperedField}
                  onChange={(e) => setTamperedField(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl bg-white border border-border text-neutral-800 focus:outline-none focus:border-neutral-400"
                >
                  <option value="marksPercentage">attributes.marksPercentage (Score)</option>
                  <option value="degree">degree (Qualification Title)</option>
                  <option value="holderId">holderId (Identity Assignment)</option>
                </select>
              </div>

              <div>
                <span className="text-[10px] text-neutral-500 block mb-1">Tampered Value to Inject</span>
                <input
                  type="text"
                  disabled={isTampered}
                  value={tamperedValue}
                  onChange={(e) => setTamperedValue(e.target.value)}
                  placeholder="e.g. 99.0"
                  className="w-full text-xs p-2 rounded-xl bg-white border border-border text-neutral-800 focus:outline-none focus:border-neutral-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-neutral-400">
                Original value: {tamperedField === 'marksPercentage' ? '82.5%' : 'B.Tech in Computer Science'}
              </span>

              {!isTampered ? (
                <button
                  onClick={handleTamper}
                  className="px-4 py-1.5 rounded-full bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 transition-colors"
                >
                  Apply Mutation →
                </button>
              ) : (
                <button
                  onClick={handleRestore}
                  className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
                >
                  Reset to Original
                </button>
              )}
            </div>
          </div>

          {/* Raw JSON viewer */}
          <div className="relative">
            <pre className="p-4 rounded-2xl bg-neutral-900 text-neutral-200 text-[11px] font-mono overflow-x-auto max-h-72 leading-relaxed">
              {JSON.stringify(activePayload, null, 2)}
            </pre>
          </div>

          {/* Issuer Signature Attachment */}
          <div className="p-3.5 rounded-xl bg-surface-soft border border-border space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-neutral-700">Root Issuer Digital Signature:</span>
              <span className="text-neutral-400 font-mono">Ed25519-HMAC</span>
            </div>
            <p className="text-[10px] font-mono text-neutral-500 break-all">
              {originalSignature}
            </p>
          </div>
        </div>

        {/* Right Column: Mathematical Verification Engine Verdict (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className={`rounded-3xl p-6 border transition-all ${
            verificationOutput?.valid
              ? 'bg-emerald-50/50 border-emerald-200 shadow-card'
              : 'bg-rose-50/50 border-rose-200 shadow-card'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                verificationOutput?.valid ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}>
                {verificationOutput?.valid ? (
                  <CheckCircle2 className="w-6 h-6 stroke-[2]" />
                ) : (
                  <XCircle className="w-6 h-6 stroke-[2]" />
                )}
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Verification Verdict
                </span>
                <h3 className={`text-xl font-bold font-sans ${
                  verificationOutput?.valid ? 'text-emerald-950' : 'text-rose-950'
                }`}>
                  {verificationOutput?.valid ? 'Authentic & Valid' : 'TAMPERING DETECTED'}
                </h3>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              {verificationOutput?.valid
                ? 'All cryptographic signatures and SHA-256 payload digests match the issuer’s public certificate. The credential integrity is guaranteed.'
                : 'The calculated SHA-256 payload hash does not correspond to the digital signature created by the issuing authority.'}
            </p>

            {/* Cryptographic breakdown */}
            <div className="space-y-3 pt-3 border-t border-black/5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">SHA-256 Digest Integrity:</span>
                <span className={`font-semibold flex items-center gap-1 ${
                  verificationOutput?.digestMatched ? 'text-emerald-700' : 'text-rose-700'
                }`}>
                  {verificationOutput?.digestMatched ? '✓ Match' : '✗ Digest Mismatch'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Digital Signature Valid:</span>
                <span className={`font-semibold flex items-center gap-1 ${
                  verificationOutput?.isSignatureValid ? 'text-emerald-700' : 'text-rose-700'
                }`}>
                  {verificationOutput?.isSignatureValid ? '✓ Valid' : '✗ Forgery / Mismatch'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Issuer Authority:</span>
                <span className="font-semibold text-neutral-900">XYZ University (Trusted)</span>
              </div>
            </div>

            {verificationOutput?.error && (
              <div className="mt-4 p-3 rounded-xl bg-white/80 border border-rose-200 text-[11px] text-rose-800 font-mono">
                {verificationOutput.error}
              </div>
            )}
          </div>

          {/* Digest Comparison Card */}
          <div className="bg-white border border-border rounded-3xl p-6 shadow-card space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Mathematical Digest Comparison
            </h4>

            <div className="space-y-2">
              <div>
                <span className="text-[10px] text-neutral-400 block font-mono">Stored Original SHA-256 Digest:</span>
                <p className="text-[10px] font-mono text-neutral-600 bg-surface-soft p-2 rounded-lg break-all">
                  {originalDigest}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-neutral-400 block font-mono">Recomputed SHA-256 Digest:</span>
                <p className={`text-[10px] font-mono p-2 rounded-lg break-all ${
                  verificationOutput?.digestMatched
                    ? 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                    : 'text-rose-800 bg-rose-50 border border-rose-200 font-bold'
                }`}>
                  {verificationOutput?.calculatedDigest}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 pt-1">
              Notice: Because SHA-256 is collision-resistant and avalanche-effect driven, changing a single character entirely scrambles the 256-bit hash, immediately exposing any falsification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
