import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ScanLine,
  Keyboard,
  Camera,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function VerifyCodePage() {
  const { activeSession, credentials } = useApp();
  const navigate = useNavigate();

  const [mode, setMode] = useState('code'); // 'code' or 'scan'
  const [inputCode, setInputCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationVerdict, setVerificationVerdict] = useState(null);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);

      const cleaned = inputCode.replace(/\s+/g, '');

      // Check if matches active demo session or valid mock codes
      if (cleaned === activeSession.rawCode || cleaned === '782914' || cleaned === '123456') {
        setVerificationVerdict({
          status: 'eligible',
          condition: 'Academic Marks ≥ 75%',
          issuer: 'XYZ University',
          timestamp: new Date().toLocaleTimeString(),
          nullifier: '0x9b4f2c018a3e74d8e120f5c9',
          zkpStatus: 'Pedersen Range Proof Verified'
        });
      } else if (cleaned === '000000') {
        setVerificationVerdict({
          status: 'not-eligible',
          condition: 'Academic Marks ≥ 85%',
          issuer: 'XYZ University',
          timestamp: new Date().toLocaleTimeString(),
          error: 'Threshold criteria not satisfied by applicant credential'
        });
      } else {
        setVerificationVerdict({
          status: 'invalid',
          error: 'Session code not found or expired. Please ask the applicant to generate a fresh QR session.'
        });
      }
    }, 800);
  };

  const handleReset = () => {
    setVerificationVerdict(null);
    setInputCode('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-1">
          <ScanLine className="w-3.5 h-3.5" />
          <span>Verification Terminal</span>
        </div>
        <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
          Verify Applicant Qualification
        </h1>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          Scan the applicant’s presented QR code or enter their 6-digit session code to verify eligibility.
        </p>
      </div>

      {/* Main Terminal Card */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
        {/* Mode Selector Tabs (Section 11.4) */}
        {!verificationVerdict && (
          <div className="flex p-1 bg-surface-soft border border-border rounded-2xl max-w-xs mx-auto text-xs font-semibold">
            <button
              onClick={() => setMode('code')}
              className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
                mode === 'code' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Keyboard className="w-4 h-4" /> Enter Code
            </button>
            <button
              onClick={() => setMode('scan')}
              className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
                mode === 'scan' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Camera className="w-4 h-4" /> Scan QR
            </button>
          </div>
        )}

        {/* INPUT MODE: Enter Code */}
        {!verificationVerdict && mode === 'code' && (
          <div className="space-y-4 max-w-sm mx-auto text-center pt-2">
            <label className="text-xs font-semibold text-neutral-700 block">
              Enter 6-Digit Session Code
            </label>
            <input
              type="text"
              maxLength={7}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="e.g. 782 914"
              className="w-full text-2xl font-mono font-bold text-center tracking-widest p-4 rounded-2xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all shadow-subtle"
            />
            <p className="text-[11px] text-neutral-400">
              Demo tip: Enter <span className="font-mono font-semibold text-neutral-700">{activeSession.code}</span> (or 782914) to test successful verification!
            </p>

            <button
              onClick={handleVerify}
              disabled={!inputCode || isVerifying}
              className="w-full py-3 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs disabled:opacity-40"
            >
              {isVerifying ? 'Running Cryptographic Verification...' : 'Verify Qualification →'}
            </button>
          </div>
        )}

        {/* SCANNER MODE: Camera Simulation */}
        {!verificationVerdict && mode === 'scan' && (
          <div className="space-y-4 max-w-md mx-auto text-center pt-2">
            <div className="relative aspect-video rounded-2xl bg-neutral-900 text-white flex flex-col items-center justify-center p-6 overflow-hidden border border-neutral-800">
              {/* Scan box frame */}
              <div className="w-40 h-40 border-2 border-emerald-400/80 rounded-2xl relative flex items-center justify-center">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400"></div>

                <div className="w-full h-0.5 bg-emerald-400/80 absolute animate-pulse"></div>
              </div>

              <span className="text-xs text-neutral-400 mt-4 font-mono">
                Position applicant QR code within frame
              </span>
            </div>

            <button
              onClick={() => {
                setInputCode(activeSession.rawCode);
                handleVerify();
              }}
              className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
            >
              Simulate QR Scan (Active Session)
            </button>
          </div>
        )}

        {/* VERIFICATION RESULT SCREEN (Section 11.5) */}
        {verificationVerdict && (
          <div className="space-y-6 animate-in zoom-in-95 duration-200">
            {verificationVerdict.status === 'eligible' && (
              <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    Cryptographic Result
                  </span>
                  <h2 className="text-2xl font-bold text-emerald-950 font-sans mt-0.5">
                    Eligible (Verified)
                  </h2>
                  <p className="text-xs text-emerald-800 mt-1">
                    The applicant mathematically satisfies the requirement: <strong className="font-semibold">{verificationVerdict.condition}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-emerald-200 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Issuing Authority:</span>
                    <span className="font-semibold text-neutral-800">{verificationVerdict.issuer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">ZKP Protocol:</span>
                    <span className="font-mono text-[11px] text-neutral-800">{verificationVerdict.zkpStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Scoped Nullifier:</span>
                    <span className="font-mono text-[11px] text-neutral-800">{verificationVerdict.nullifier}</span>
                  </div>
                </div>

                {/* Privacy Guarantee Notice */}
                <div className="p-3 bg-emerald-100/50 rounded-xl text-[11px] text-emerald-900 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Exact student marks, date of birth, and identity records remain 100% private.</span>
                </div>
              </div>
            )}

            {verificationVerdict.status === 'not-eligible' && (
              <div className="p-6 rounded-3xl bg-rose-50/70 border border-rose-200 space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <XCircle className="w-8 h-8 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider">
                    Cryptographic Result
                  </span>
                  <h2 className="text-2xl font-bold text-rose-950 font-sans mt-0.5">
                    Not Eligible
                  </h2>
                  <p className="text-xs text-rose-800 mt-1">
                    The presented credential does not satisfy the requested condition.
                  </p>
                </div>
              </div>
            )}

            {verificationVerdict.status === 'invalid' && (
              <div className="p-6 rounded-3xl bg-neutral-100 border border-neutral-300 space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-neutral-700 text-white flex items-center justify-center mx-auto shadow-sm">
                  <AlertCircle className="w-8 h-8 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                    Session Error
                  </span>
                  <h2 className="text-xl font-bold text-neutral-900 font-sans mt-0.5">
                    Invalid or Expired Session
                  </h2>
                  <p className="text-xs text-neutral-600 mt-1">
                    {verificationVerdict.error}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 flex items-center gap-2 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Verify Another Applicant
              </button>
              <button
                onClick={() => navigate('/verifier')}
                className="px-5 py-2.5 rounded-full border border-border text-neutral-800 text-xs font-semibold hover:bg-surface-soft"
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
