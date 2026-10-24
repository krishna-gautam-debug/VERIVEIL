import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, KeyRound, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export default function DocumentationPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
          How VERIVEIL Works
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Cryptographic fundamentals, zero-knowledge proofs, and selective disclosure architecture.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-neutral-800" />
            1. Zero-Knowledge Proofs (ZKP) Explained
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            In traditional verification, an applicant must hand over full photocopies of diplomas, transcripts,
            or tax returns. The verifier only wanted to answer: <em>"Does this person have marks ≥ 75%?"</em>,
            yet they received exact percentages, student roll numbers, home addresses, and private personal history.
          </p>
          <p className="text-xs text-neutral-600 leading-relaxed">
            VERIVEIL replaces document sharing with mathematical proofs. Using Pedersen commitments and range checks,
            the student generates a cryptographic receipt proving that their score satisfies the threshold condition
            without revealing the underlying numerical score.
          </p>
        </div>

        <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-neutral-800" />
            2. Canonical SHA-256 Digest & Ed25519 Signatures
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Every credential payload is deterministically sorted (canonical JSON) and hashed with SHA-256 before being
            signed by the accredited issuing authority (e.g., XYZ University). Any alteration to any field invalidates
            the digital signature immediately.
          </p>
          <div className="pt-2">
            <Link
              to="/tamper-lab"
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:underline"
            >
              Test this live in our Interactive Tampering Lab →
            </Link>
          </div>
        </div>

        <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-neutral-800" />
            3. Scoped Nullifiers & Replay Attack Defense
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            To prevent verifiers from tracking an individual across multiple websites or replaying the same proof,
            VERIVEIL generates unique, scoped nullifiers. Each nullifier binds the holder’s private secret with the
            specific verifier ID and request nonce.
          </p>
        </div>
      </div>
    </div>
  );
}
