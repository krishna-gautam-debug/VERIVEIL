import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle2, Shield, Building2, KeyRound } from 'lucide-react';
import BrandLogo from '../../components/common/BrandLogo';
import { useApp } from '../../context/AppContext';

export default function SignupPage() {
  const { setCurrentUser, setActiveRole } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('holder'); // 'holder', 'verifier', 'issuer'
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      username,
      email,
      role,
      memberSince: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      privacyMode: true
    };

    setCurrentUser(newUser);
    setActiveRole(role);
    setIsSuccess(true);

    setTimeout(() => {
      if (role === 'holder') navigate('/dashboard');
      else if (role === 'verifier') navigate('/verifier');
      else if (role === 'issuer') navigate('/issuer');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <BrandLogo size="md" />
        <Link to="/" className="text-xs text-neutral-500 hover:text-neutral-900 font-medium">
          ← Back to Homepage
        </Link>
      </div>

      <div className="max-w-xl w-full mx-auto my-8 bg-white border border-border rounded-3xl p-8 sm:p-10 shadow-card space-y-6">
        <div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Create Account
          </span>
          <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight mt-1">
            Join VERIVEIL
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Choose your role to get started with zero-knowledge credentials.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {error}
          </div>
        )}

        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-emerald-950">Account Created!</h3>
            <p className="text-xs text-emerald-800">Redirecting to your workspace...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Account Type Selection (Section 8) */}
            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('holder')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    role === 'holder'
                      ? 'border-neutral-900 bg-surface-soft ring-1 ring-neutral-900'
                      : 'border-border bg-white hover:bg-surface-soft'
                  }`}
                >
                  <Shield className="w-4 h-4 text-neutral-800" />
                  <span className="text-xs font-bold text-neutral-900">Holder</span>
                  <span className="text-[10px] text-neutral-400">Individuals</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('verifier')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    role === 'verifier'
                      ? 'border-neutral-900 bg-surface-soft ring-1 ring-neutral-900'
                      : 'border-border bg-white hover:bg-surface-soft'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-neutral-800" />
                  <span className="text-xs font-bold text-neutral-900">Verifier</span>
                  <span className="text-[10px] text-neutral-400">Portals & Orgs</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('issuer')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    role === 'issuer'
                      ? 'border-neutral-900 bg-surface-soft ring-1 ring-neutral-900'
                      : 'border-border bg-white hover:bg-surface-soft'
                  }`}
                >
                  <KeyRound className="w-4 h-4 text-neutral-800" />
                  <span className="text-xs font-bold text-neutral-900">Issuer</span>
                  <span className="text-[10px] text-neutral-400">Institutions</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-neutral-800 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Krishna Gautam"
                  className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-800 block mb-1">
                  Unique Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="krishnag"
                  className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-800 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-neutral-800 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-800 block mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-border bg-surface-soft text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-subtle mt-2"
            >
              Create {role.charAt(0).toUpperCase() + role.slice(1)} Account →
            </button>
          </form>
        )}

        <p className="text-center text-xs text-neutral-500 pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-neutral-900 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>

      <div className="max-w-7xl w-full mx-auto text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} VERIVEIL Platform. Prove Privately. Empower Everyone.
      </div>
    </div>
  );
}
