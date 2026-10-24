import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  QrCode,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import QRCode from 'qrcode';

export default function CreateRequestPage() {
  const navigate = useNavigate();

  const [requestTitle, setRequestTitle] = useState('Merit Scholarship 2026 Qualification');
  const [credentialType, setCredentialType] = useState('Academic Record');
  const [attribute, setAttribute] = useState('marksPercentage');
  const [operator, setOperator] = useState('>=');
  const [threshold, setThreshold] = useState('75');
  const [expiryMinutes, setExpiryMinutes] = useState('60');

  const [generatedRequest, setGeneratedRequest] = useState(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const attributePresets = {
    'Academic Record': [
      { id: 'marksPercentage', label: 'Marks Percentage (%)', defaultThreshold: '75' },
      { id: 'gpa', label: 'GPA (4.0 scale)', defaultThreshold: '3.5' }
    ],
    'Age Credential': [
      { id: 'age', label: 'Applicant Age (Years)', defaultThreshold: '18' }
    ],
    'Income Credential': [
      { id: 'annualIncome', label: 'Annual Income (USD)', defaultThreshold: '45000' }
    ],
    'Residency Proof': [
      { id: 'jurisdiction', label: 'Jurisdiction District Name', defaultThreshold: 'Metro District' }
    ]
  };

  const handleCredentialTypeChange = (type) => {
    setCredentialType(type);
    const presets = attributePresets[type] || [];
    if (presets.length > 0) {
      setAttribute(presets[0].id);
      setThreshold(presets[0].defaultThreshold);
    }
  };

  const handleCreateRequest = () => {
    const nonce = `nonce_${Math.random().toString(36).substring(2, 9)}`;
    const requestId = `REQ-${Date.now().toString(36).toUpperCase()}`;

    const requestPackage = {
      requestId,
      requestTitle,
      verifier: 'National Scholarship Authority',
      credentialType,
      condition: {
        attribute,
        operator,
        threshold
      },
      nonce,
      expiryTimestamp: new Date(Date.now() + parseInt(expiryMinutes) * 60 * 1000).toISOString(),
      supportedProof: 'Pedersen-Commitment-Range-Proof-v1.4'
    };

    setGeneratedRequest(requestPackage);
  };

  useEffect(() => {
    if (generatedRequest && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        JSON.stringify(generatedRequest),
        {
          width: 200,
          margin: 1.5,
          color: {
            dark: '#171717',
            light: '#FFFFFF'
          }
        },
        (err) => {
          if (err) console.error(err);
        }
      );
    }
  }, [generatedRequest]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedRequest, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Requirement Builder</span>
        </div>
        <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
          Create Verification Request
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Specify the qualification predicate and cryptographic nonces for applicants to prove against.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card space-y-5">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1.5">
                Request Title / Purpose
              </label>
              <input
                type="text"
                value={requestTitle}
                onChange={(e) => setRequestTitle(e.target.value)}
                placeholder="e.g. Merit Scholarship Fall 2026"
                className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1.5">
                Target Credential Type
              </label>
              <select
                value={credentialType}
                onChange={(e) => handleCredentialTypeChange(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-400"
              >
                <option value="Academic Record">Academic Record (Grades & Degrees)</option>
                <option value="Age Credential">Age Credential (Legal Age Gate)</option>
                <option value="Income Credential">Income Credential (Financial Subsidy)</option>
                <option value="Residency Proof">Residency Proof (Regional Eligibility)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="text-xs font-semibold text-neutral-800 block mb-1.5">
                  Comparison
                </label>
                <select
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-400"
                >
                  <option value="&gt;=">{'≥ (At least)'}</option>
                  <option value="&lt;=">{'≤ (At most)'}</option>
                  <option value="==">{'== (Exactly equal)'}</option>
                  <option value="&gt;">{'> (Strictly greater)'}</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-neutral-800 block mb-1.5">
                  Threshold Value
                </label>
                <input
                  type="text"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  placeholder="e.g. 75"
                  className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1.5">
                Session Expiration (Minutes)
              </label>
              <input
                type="number"
                value={expiryMinutes}
                onChange={(e) => setExpiryMinutes(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-400"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleCreateRequest}
              className="w-full py-3 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
            >
              Generate Verification QR & Request Nonce →
            </button>
          </div>
        </div>

        {/* Output Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {generatedRequest ? (
            <div className="bg-white border border-border rounded-3xl p-6 shadow-card space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Generated Request QR
                </h3>
                <span className="text-[10px] font-mono text-neutral-400">
                  {generatedRequest.requestId}
                </span>
              </div>

              <div className="flex justify-center p-3 bg-surface-soft rounded-2xl border border-border">
                <canvas ref={canvasRef} className="rounded-xl" />
              </div>

              <div className="p-3 rounded-2xl bg-surface-soft border border-border space-y-1 text-xs">
                <div className="font-semibold text-neutral-900">{generatedRequest.requestTitle}</div>
                <div className="text-[11px] text-neutral-600">
                  Condition: <span className="font-bold text-neutral-900">{generatedRequest.condition.attribute} {generatedRequest.condition.operator} {generatedRequest.condition.threshold}</span>
                </div>
                <div className="text-[10px] font-mono text-neutral-400 pt-1">
                  Nonce: {generatedRequest.nonce}
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="w-full py-2.5 rounded-full border border-border text-xs font-semibold text-neutral-800 hover:bg-surface-soft flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied Request JSON!' : 'Copy Request Package'}
              </button>
            </div>
          ) : (
            <div className="bg-white border border-border rounded-3xl p-10 text-center shadow-card space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-surface-soft border border-border flex items-center justify-center text-neutral-400 mx-auto">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold text-neutral-700">Awaiting Configuration</h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Configure your predicate on the left and click generate to create a tamper-bound request QR.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
