import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import BrandLogo from '../../components/common/BrandLogo';
import { useApp } from '../../context/AppContext';

export default function LoginPage() {
  const { setCurrentUser, setActiveRole } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('krishna.gautam@veriveil.io');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [role, setRole] = useState('holder'); // 'holder', 'verifier', 'issuer'
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setActiveRole(role);
      if (role === 'holder') navigate('/dashboard');
      else if (role === 'verifier') navigate('/verifier');
      else if (role === 'issuer') navigate('/issuer');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Bar */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <BrandLogo size="md" />
        <Link
          to="/"
          className="text-xs text-neutral-500 hover:text-neutral-900 font-medium"
        >
          ← Back to Homepage
        </Link>
      </div>

      {/* Main Login Card with Split Editorial Design */}
      <div className="max-w-4xl w-full mx-auto my-8 bg-white border border-border rounded-3xl shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Authentication
            </span>
            <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight mt-1">
              Welcome back
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Enter your credentials to access your private identity space.
            </p>
          </div>

          {/* Role selector buttons */}
          <div>
            <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
              Select Workspace Access
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'holder', label: 'Holder' },
                { id: 'verifier', label: 'Verifier' },
                { id: 'issuer', label: 'Issuer' }
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    role === r.id
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-border bg-surface-soft text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1">
                Email or Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all shadow-subtle"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-neutral-800">
                  Password
                </label>
                <Link
                  to="/forgot-code"
                  className="text-[11px] text-neutral-500 hover:text-neutral-900"
                >
                  Forgot credential code?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-10 pr-10 py-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all shadow-subtle"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-neutral-400 hover:text-neutral-700 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border text-neutral-900 focus:ring-0"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-subtle flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : `Enter as ${role.charAt(0).toUpperCase() + role.slice(1)} →`}
            </button>
          </form>

          <p className="text-center text-xs text-neutral-500 pt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="text-neutral-900 font-semibold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Right Side: Privacy Brand Panel (5 cols) */}
        <div className="lg:col-span-5 bg-surface-warm/50 border-t lg:border-t-0 lg:border-l border-border p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-neutral-900 shadow-xs mb-6">
              <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
            </div>

            <h3 className="text-2xl font-serif font-normal text-neutral-900 tracking-tight leading-snug">
              Prove Privately. <br />
              Empower Everyone.
            </h3>

            <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
              Your credentials are cryptographically bound to you. When you prove eligibility,
              only the boolean outcome is confirmed. Zero sensitive documents are exposed.
            </p>
          </div>

          <div className="pt-8 border-t border-border/80 text-[11px] text-neutral-500 space-y-1">
            <div className="font-semibold text-neutral-700">Client-Side ZKP Verification</div>
            <div>Ed25519 digital signatures & SHA-256 integrity</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl w-full mx-auto text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} VERIVEIL Platform. Zero-Knowledge Eligibility Engine.
      </div>
    </div>
  );
}
