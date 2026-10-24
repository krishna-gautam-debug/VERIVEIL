import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, Mail, CheckCircle2, ArrowRight, Copy, Check, QrCode } from 'lucide-react';
import BrandLogo from '../../components/common/BrandLogo';
import { useApp } from '../../context/AppContext';

export default function ForgotCodePage() {
  const { credentials } = useApp();
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter OTP, 3: Show recovered credentials
  const [email, setEmail] = useState('krishna.gautam@veriveil.io');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const handleSendRecovery = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 700);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 700);
  };

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <BrandLogo size="md" />
        <Link to="/login" className="text-xs text-neutral-500 hover:text-neutral-900 font-medium">
          ← Back to Login
        </Link>
      </div>

      <div className="max-w-lg w-full mx-auto my-8 bg-white border border-border rounded-3xl p-8 sm:p-10 shadow-card space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Secure Account Recovery</span>
          </div>
          <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
            Recover Credential Code
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Forgot your reference code? Verify your registered email to retrieve your active credentials.
          </p>
        </div>

        {/* STEP 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleSendRecovery} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-subtle disabled:opacity-50"
            >
              {isLoading ? 'Sending Security OTP...' : 'Send Verification OTP →'}
            </button>
          </form>
        )}

        {/* STEP 2: Enter OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3 bg-surface-soft rounded-2xl border border-border text-xs text-neutral-600">
              A 6-digit one-time passcode was dispatched to <strong className="font-semibold text-neutral-900">{email}</strong>.
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1">
                Enter 6-Digit Security Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="e.g. 492015"
                className="w-full text-center text-xl font-mono font-bold tracking-widest p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
              <span className="text-[10px] text-neutral-400 mt-1 block text-center">
                (Demo mode: enter any 6 numbers to verify)
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-subtle disabled:opacity-50"
            >
              {isLoading ? 'Validating Token...' : 'Verify Email & Access Credentials →'}
            </button>
          </form>
        )}

        {/* STEP 3: Recovered Credentials */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Identity verified. Retrieved {credentials.length} authorized credentials:</span>
            </div>

            <div className="space-y-3">
              {credentials.map((cred) => (
                <div
                  key={cred.credentialId}
                  className="p-4 rounded-2xl border border-border bg-surface-soft flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">{cred.credentialType}</h4>
                    <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                      Ref: <span className="font-bold text-neutral-900">{cred.credentialRef}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(cred.credentialRef, cred.credentialId)}
                    className="p-2 rounded-xl bg-white border border-border hover:bg-neutral-100 text-neutral-700 flex items-center gap-1.5 text-xs font-medium"
                    title="Copy reference code"
                  >
                    {copiedCode === cred.credentialId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === cred.credentialId ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/dashboard"
                className="w-full py-3 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 flex items-center justify-center gap-2"
              >
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl w-full mx-auto text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} VERIVEIL Platform. Cryptographic Recovery Service.
      </div>
    </div>
  );
}
