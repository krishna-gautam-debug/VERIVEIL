import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Share2,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  GraduationCap,
  User,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateZKPProof } from '../../utils/crypto';

export default function GenerateProofPage() {
  const { credentials, currentUser } = useApp();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCredId, setSelectedCredId] = useState(credentials[0]?.credentialId || '');
  const [selectedCondition, setSelectedCondition] = useState({
    attribute: 'marksPercentage',
    operator: '>=',
    threshold: 75,
    label: 'Marks ≥ 75%'
  });

  const [verifierName, setVerifierName] = useState('Merit Scholarship Portal');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProof, setGeneratedProof] = useState(null);
  const [copied, setCopied] = useState(false);

  const selectedCred = credentials.find(c => c.credentialId === selectedCredId) || credentials[0];

  // Conditions available per credential type
  const conditionsMap = {
    'Academic Record': [
      { attribute: 'marksPercentage', operator: '>=', threshold: 75, label: 'Academic Marks ≥ 75%' },
      { attribute: 'marksPercentage', operator: '>=', threshold: 80, label: 'Academic Marks ≥ 80%' },
      { attribute: 'gpa', operator: '>=', threshold: 3.5, label: 'Grade Point Average (GPA) ≥ 3.5' }
    ],
    'Age Credential': [
      { attribute: 'age', operator: '>=', threshold: 18, label: 'Age Eligibility (Age ≥ 18)' },
      { attribute: 'age', operator: '>=', threshold: 21, label: 'Higher Age Gate (Age ≥ 21)' }
    ],
    'Residency Proof': [
      { attribute: 'jurisdiction', operator: '==', threshold: 'Metro District', label: 'Permanent Resident of Metro District' },
      { attribute: 'residencyDurationYears', operator: '>=', threshold: 2, label: 'Residency Duration ≥ 2 Years' }
    ]
  };

  const handleCredentialChange = (id) => {
    setSelectedCredId(id);
    const cred = credentials.find(c => c.credentialId === id);
    if (cred && conditionsMap[cred.credentialType]) {
      setSelectedCondition(conditionsMap[cred.credentialType][0]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const proof = await generateZKPProof({
        credential: selectedCred,
        attributeName: selectedCondition.attribute,
        operator: selectedCondition.operator,
        threshold: selectedCondition.threshold,
        verifierId: verifierName,
        requestNonce: `nonce_${Date.now().toString(36)}`
      });

      setGeneratedProof(proof);
      setCurrentStep(4);
    } catch (err) {
      alert(`Proof generation failed: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyProof = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedProof, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero-Knowledge Proof Generator</span>
          </div>
          <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
            Generate Verification Proof
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Prove your eligibility criteria to any organization without sharing your private source documents.
          </p>
        </div>
      </div>

      {/* Stepper Progress */}
      <div className="bg-white border border-border rounded-2xl p-4 shadow-subtle flex items-center justify-between">
        {[
          { step: 1, title: 'Select Credential' },
          { step: 2, title: 'Choose Condition' },
          { step: 3, title: 'Privacy Disclosure' },
          { step: 4, title: 'Proof Receipt' }
        ].map((s) => (
          <div key={s.step} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
              currentStep === s.step
                ? 'bg-neutral-900 text-white'
                : currentStep > s.step
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-neutral-100 text-neutral-400'
            }`}>
              {currentStep > s.step ? '✓' : s.step}
            </div>
            <span className={`text-xs hidden sm:inline ${
              currentStep === s.step ? 'font-semibold text-neutral-900' : 'text-neutral-500'
            }`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content Card */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
        {/* STEP 1: Select Credential */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-neutral-900">
              1. Choose a digitally signed credential
            </h2>
            <p className="text-xs text-neutral-500">
              Select which verified record from your digital wallet you want to generate a proof from:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {credentials.map((cred) => (
                <div
                  key={cred.credentialId}
                  onClick={() => handleCredentialChange(cred.credentialId)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedCredId === cred.credentialId
                      ? 'border-neutral-900 bg-surface-soft shadow-card ring-1 ring-neutral-900'
                      : 'border-border bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-surface-warm flex items-center justify-center text-neutral-800">
                      {cred.iconType === 'academic' && <GraduationCap className="w-4 h-4" />}
                      {cred.iconType === 'user' && <User className="w-4 h-4" />}
                      {cred.iconType === 'location' && <MapPin className="w-4 h-4" />}
                    </div>
                    {selectedCredId === cred.credentialId && (
                      <span className="w-2 h-2 rounded-full bg-neutral-900"></span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-neutral-900 mt-3 truncate">{cred.credentialType}</h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5 truncate">{cred.issuer}</p>

                  <div className="mt-4 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                    <span className="text-emerald-700 font-semibold">✓ {cred.status}</span>
                    <span className="text-neutral-400">{cred.validTill}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 flex items-center gap-2"
              >
                Continue to Condition <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Choose Condition */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-neutral-900">
              2. Select the condition to prove
            </h2>
            <p className="text-xs text-neutral-500">
              Pick the specific requirement threshold for <span className="font-semibold text-neutral-900">{selectedCred?.credentialType}</span>:
            </p>

            <div className="space-y-3 pt-2">
              {(conditionsMap[selectedCred?.credentialType] || []).map((cond, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCondition(cond)}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    selectedCondition.label === cond.label
                      ? 'border-neutral-900 bg-surface-soft ring-1 ring-neutral-900'
                      : 'border-border bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-neutral-300 flex items-center justify-center">
                      {selectedCondition.label === cond.label && (
                        <div className="w-3 h-3 rounded-full bg-neutral-900"></div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">{cond.label}</div>
                      <div className="text-[11px] text-neutral-500">Target Field: {cond.attribute}</div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-500">
                    Threshold: {cond.threshold}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                Requesting Verifier / Organization Name
              </label>
              <input
                type="text"
                value={verifierName}
                onChange={(e) => setVerifierName(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-400"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-full border border-border text-neutral-700 text-xs font-medium hover:bg-neutral-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 flex items-center gap-2"
              >
                Review Disclosure <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Privacy Disclosure Review */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-neutral-900">
              3. Privacy Disclosure & Informed Consent
            </h2>
            <p className="text-xs text-neutral-500">
              VERIVEIL ensures total selective disclosure transparency before you generate your proof:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* What will be revealed */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                  <Eye className="w-4 h-4 text-emerald-700" />
                  What Will Be Proved
                </div>
                <ul className="text-xs text-emerald-800 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>That you satisfy condition: <strong className="font-semibold">{selectedCondition.label}</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Issuer signature is authentic ({selectedCred?.issuer})</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Single-use nullifier bound to {verifierName}</span>
                  </li>
                </ul>
              </div>

              {/* What remains confidential */}
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider">
                  <EyeOff className="w-4 h-4 text-neutral-700" />
                  What Stays Strictly Private
                </div>
                <ul className="text-xs text-neutral-600 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span>✗</span>
                    <span>Your exact score (82.5%), GPA, or grade distribution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✗</span>
                    <span>Full academic transcript or document PDF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✗</span>
                    <span>National identity / Aadhaar / Social Security number</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-full border border-border text-neutral-700 text-xs font-medium hover:bg-neutral-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-7 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                {isGenerating ? 'Computing ZKP...' : 'Authorize & Generate Proof →'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Proof Receipt */}
        {currentStep === 4 && generatedProof && (
          <div className="space-y-5 animate-in fade-in">
            <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-950">
                    Zero-Knowledge Proof Generated Successfully
                  </h3>
                  <p className="text-xs text-emerald-800">
                    Condition verified mathematically. Zero sensitive records leaked.
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyProof}
                className="px-4 py-2 rounded-full bg-white border border-emerald-300 text-xs font-semibold text-emerald-900 hover:bg-emerald-100/50 flex items-center gap-1.5 shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Proof Package'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900 text-neutral-200 text-xs font-mono overflow-x-auto max-h-72">
              <pre>{JSON.stringify(generatedProof, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2 rounded-full border border-border text-xs font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Generate Another Proof
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
