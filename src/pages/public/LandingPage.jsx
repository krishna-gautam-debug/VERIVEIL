import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  ArrowRight,
  Play,
  CheckCircle2,
  Shield,
  FileCheck,
  Zap,
  GraduationCap,
  Building2,
  Users,
  Scroll,
  Landmark,
  EyeOff,
  KeyRound,
  Check,
  ChevronRight,
  Sparkles,
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import BrandLogo from '../../components/common/BrandLogo';

export default function LandingPage() {
  const navigate = useNavigate();
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [activeStepDemo, setActiveStepDemo] = useState(1);

  // Social avatars for trust strip
  const trustAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-neutral-900 selection:text-white">
      {/* 7.1 TOP NAVIGATION BAR (Exact match of Reference Image 2) */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-8">
            <BrandLogo size="md" />
          </div>

          {/* Center Links with subtle underline */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-600">
            <a href="#hero" className="text-neutral-900 font-semibold relative py-1">
              Home
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full"></span>
            </a>
            <a href="#how-it-works" className="hover:text-neutral-900 transition-colors py-1">
              How It Works
            </a>
            <a href="#use-cases" className="hover:text-neutral-900 transition-colors py-1">
              Use Cases
            </a>
            <a href="#security" className="hover:text-neutral-900 transition-colors py-1">
              Security
            </a>
            <a href="#about" className="hover:text-neutral-900 transition-colors py-1">
              About
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              aria-label="Search"
              className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              to="/login"
              className="px-4 py-2 text-xs font-semibold text-neutral-800 hover:text-neutral-950 transition-colors"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-subtle flex items-center gap-1.5"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 7.2 HERO SECTION (Exact match of Reference Image 2) */}
      <section id="hero" className="relative pt-12 pb-20 overflow-hidden">
        {/* Subtle architectural background gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-gradient-to-bl from-surface-warm/40 via-surface-soft/20 to-transparent pointer-events-none rounded-bl-full opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Zone: Editorial Headline & Copy */}
            <div className="lg:col-span-6 space-y-6">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border shadow-xs text-xs font-medium text-neutral-700">
                <Lock className="w-3.5 h-3.5 text-neutral-900 stroke-[2]" />
                <span>Privacy-Preserving Verification</span>
              </div>

              {/* Main Headline in Editorial Serif */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-normal text-text-primary tracking-tight leading-[1.08]">
                Prove Privately. <br />
                <span className="italic font-serif">Empower</span> Everyone.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl font-sans">
                Verify your eligibility without sharing your sensitive documents. Trusted credentials.
                Zero-knowledge proofs. A more private digital world.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/signup"
                  className="px-7 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold transition-all shadow-subtle flex items-center gap-2 group"
                >
                  Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="px-6 py-3.5 rounded-full bg-white border border-border hover:bg-neutral-50 text-neutral-800 text-sm font-semibold transition-all shadow-xs flex items-center gap-2.5"
                >
                  <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                  Watch Demo
                </button>
              </div>

              {/* Trust Indicators & Handwritten note (Image 2) */}
              <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {trustAvatars.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="User"
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">
                    Trusted by students, institutions and organizations
                  </span>
                </div>

                {/* Hand-drawn scribble arrow matching Image 2 */}
                <div className="hidden sm:flex items-center gap-2 text-xs font-serif italic text-neutral-600">
                  <svg width="40" height="24" viewBox="0 0 50 30" fill="none" className="rotate-[-10deg]">
                    <path d="M5 25 C15 5, 35 5, 45 20 M38 14 L46 21 L37 25" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="leading-tight">Same Opportunities.<br />More Privacy. ♡</span>
                </div>
              </div>
            </div>

            {/* Right Zone: Layered 3D Credential & ZKP Visual (Exact match of Reference Image 2) */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg p-6">
                {/* Background architectural tablet/surface */}
                <div className="absolute inset-0 bg-gradient-to-tr from-surface-warm/80 via-white to-surface-soft/90 rounded-[2.5rem] border border-border shadow-card transform rotate-1 scale-95 pointer-events-none"></div>

                {/* Botanical / organic decorative accent */}
                <div className="absolute -top-6 -left-6 w-32 h-32 opacity-25 pointer-events-none">
                  <svg viewBox="0 0 100 100" fill="none">
                    <path d="M20 90 C30 50 60 40 90 20 C70 50 50 70 20 90 Z" fill="#171717" />
                    <path d="M40 90 C50 60 70 50 95 35" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Card 1: Digitally Signed Academic Credential */}
                  <div className="glass-floating rounded-2xl p-5 border border-border max-w-sm ml-auto transform -rotate-1 hover:rotate-0 transition-transform">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-surface-soft flex items-center justify-center text-neutral-900 border border-border">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-neutral-900">Academic Credential</div>
                          <div className="text-[10px] text-neutral-500">Issued by XYZ University</div>
                        </div>
                      </div>
                      <BrandLogo size="sm" showTagline={false} />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white font-medium flex items-center gap-1">
                        ✓ Digitally Signed
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                        ✓ Verified
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Zero-Knowledge Proof (Floating Card) */}
                  <div className="glass-floating rounded-2xl p-5 border border-border max-w-xs transform rotate-2 hover:rotate-0 transition-transform shadow-floating">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">ZKP Proof</span>
                      <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                        <Lock className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-[11px] text-neutral-500">Proves:</div>
                      <div className="text-base font-bold text-neutral-900 font-sans">Marks ≥ 75%</div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        ✓ Valid
                      </span>
                      <span className="text-neutral-400 font-mono">Pedersen Commitment</span>
                    </div>
                  </div>

                  {/* Card 3: Result for Verifier (White Floating Pill) */}
                  <div className="glass-floating rounded-2xl p-4 border border-border max-w-sm ml-8 shadow-floating transform -rotate-2 hover:rotate-0 transition-transform">
                    <div className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider mb-1">
                      Result for Verifier
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-neutral-900">Eligible</div>
                        <div className="text-[11px] text-neutral-500">(Exact marks not shared)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Bullet Points (from Image 2) */}
                <div className="mt-6 pt-4 border-t border-border flex flex-col gap-2 text-xs text-neutral-700">
                  <div className="font-serif italic font-normal text-sm text-neutral-900">
                    Your Identity. Your Data. Your Control.
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-neutral-600">
                      <Shield className="w-3.5 h-3.5 text-neutral-900" />
                      <span>No data leakage</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-600">
                      <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
                      <span>Zero-knowledge proofs</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-600">
                      <FileCheck className="w-3.5 h-3.5 text-neutral-900" />
                      <span>Trusted credentials</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-600">
                      <Zap className="w-3.5 h-3.5 text-neutral-900" />
                      <span>Instant verification</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE PILL BANNER (Exact match of Reference Image 2) */}
      <section className="py-6 border-y border-border/80 bg-surface-soft/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-2">
            <div className="text-xs font-serif italic text-neutral-900 text-center lg:text-left">
              Built for a more equal digital world.
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-medium text-neutral-600">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-neutral-900" />
                <span>Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-neutral-900" />
                <span>Educational Institutions</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-neutral-900" />
                <span>Organizations</span>
              </div>
              <div className="flex items-center gap-2">
                <Scroll className="w-4 h-4 text-neutral-900" />
                <span>Scholarship Portals</span>
              </div>
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-neutral-900" />
                <span>Government Programs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.4 HOW IT WORKS — "From Credentials to Confidence" (Exact match of Reference Image 2) */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider">
              HOW IT WORKS
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-normal text-text-primary tracking-tight">
              From Credentials to Confidence
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed font-sans">
              A simple, secure and private way to prove what matters.
            </p>
          </div>

          {/* 5-Step Connected Horizontal Timeline (Desktop) & Vertical (Mobile) */}
          <div className="relative">
            {/* Connecting horizontal line on desktop */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-neutral-200 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {/* Step 01 */}
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-14 h-14 rounded-full bg-white border border-border shadow-card flex items-center justify-center text-neutral-900 group-hover:scale-105 group-hover:border-neutral-900 transition-all">
                  <FileCheck className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="text-[11px] font-mono text-neutral-400">01</div>
                <h3 className="text-sm font-bold text-neutral-900">Credential Issuance</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  A trusted issuer verifies your data and issues a digital credential.
                </p>
              </div>

              {/* Step 02 */}
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-14 h-14 rounded-full bg-white border border-border shadow-card flex items-center justify-center text-neutral-900 group-hover:scale-105 group-hover:border-neutral-900 transition-all">
                  <Scroll className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="text-[11px] font-mono text-neutral-400">02</div>
                <h3 className="text-sm font-bold text-neutral-900">Requirement Request</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  A website or organization requests a specific condition (e.g., marks ≥ 75%).
                </p>
              </div>

              {/* Step 03 */}
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-14 h-14 rounded-full bg-white border border-border shadow-card flex items-center justify-center text-neutral-900 group-hover:scale-105 group-hover:border-neutral-900 transition-all">
                  <Users className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="text-[11px] font-mono text-neutral-400">03</div>
                <h3 className="text-sm font-bold text-neutral-900">User Consent</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  You review the request and approve what to share (without revealing actual data).
                </p>
              </div>

              {/* Step 04 */}
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-14 h-14 rounded-full bg-white border border-border shadow-card flex items-center justify-center text-neutral-900 group-hover:scale-105 group-hover:border-neutral-900 transition-all">
                  <Zap className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="text-[11px] font-mono text-neutral-400">04</div>
                <h3 className="text-sm font-bold text-neutral-900">ZKP Generation</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  A zero-knowledge proof is created for the requested condition.
                </p>
              </div>

              {/* Step 05 */}
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-14 h-14 rounded-full bg-white border border-border shadow-card flex items-center justify-center text-neutral-900 group-hover:scale-105 group-hover:border-neutral-900 transition-all">
                  <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="text-[11px] font-mono text-neutral-400">05</div>
                <h3 className="text-sm font-bold text-neutral-900">Proof Verification</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  The verifier checks the proof and gets an eligibility result — no sensitive data revealed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5 USE CASES SECTION */}
      <section id="use-cases" className="py-20 bg-surface-subtle/60 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-text-primary tracking-tight">
              Privacy-First Verification Scenarios
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Explore how selective disclosure transforms modern qualification processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Use Case 1 */}
            <div className="bg-white border border-border rounded-3xl p-6 shadow-card hover:border-neutral-300 card-hover-effect flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-surface-soft border border-border flex items-center justify-center text-neutral-900 mb-4">
                  <GraduationCap className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                  Active in Live Demo
                </div>
                <h3 className="text-base font-bold text-neutral-900">Academic Eligibility</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Prove marks are at least 75% for merit scholarships without sharing full transcripts, GPA, or rank.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] font-medium text-neutral-500 flex items-center justify-between">
                <span>XYZ University</span>
                <span>ZKP Range Proof</span>
              </div>
            </div>

            {/* Use Case 2 */}
            <div className="bg-white border border-border rounded-3xl p-6 shadow-card hover:border-neutral-300 card-hover-effect flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-surface-soft border border-border flex items-center justify-center text-neutral-900 mb-4">
                  <Users className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                  Active in Live Demo
                </div>
                <h3 className="text-base font-bold text-neutral-900">Age Verification</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Verify age ≥ 18 or ≥ 21 without revealing exact birth date, government ID numbers, or home address.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] font-medium text-neutral-500 flex items-center justify-between">
                <span>Govt Authority Mock</span>
                <span>Threshold Check</span>
              </div>
            </div>

            {/* Use Case 3 */}
            <div className="bg-white border border-border rounded-3xl p-6 shadow-card hover:border-neutral-300 card-hover-effect flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-surface-soft border border-border flex items-center justify-center text-neutral-900 mb-4">
                  <Landmark className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200 mb-2">
                  Supported Scheme
                </div>
                <h3 className="text-base font-bold text-neutral-900">Income Eligibility</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Qualify for financial aid or community subsidies under annual limits without uploading tax returns.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] font-medium text-neutral-500 flex items-center justify-between">
                <span>Revenue Authority</span>
                <span>Bound Nullifier</span>
              </div>
            </div>

            {/* Use Case 4 */}
            <div className="bg-white border border-border rounded-3xl p-6 shadow-card hover:border-neutral-300 card-hover-effect flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-surface-soft border border-border flex items-center justify-center text-neutral-900 mb-4">
                  <Building2 className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                  Active in Live Demo
                </div>
                <h3 className="text-base font-bold text-neutral-900">Residency Verification</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Confirm jurisdiction residency for regional programs without revealing your private home street address.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] font-medium text-neutral-500 flex items-center justify-between">
                <span>Municipal Council</span>
                <span>Jurisdiction Proof</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.6 PRIVACY & SECURITY ARCHITECTURE */}
      <section id="security" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider">
                CRYPTOGRAPHIC INTEGRITY
              </div>

              <h2 className="text-4xl sm:text-5xl font-serif font-normal text-text-primary tracking-tight leading-tight">
                Privacy-by-Design Architecture
              </h2>

              <p className="text-sm text-text-secondary leading-relaxed font-sans">
                VeriVeil bridges cryptographic trust with intuitive digital rights. Zero-Knowledge Proofs
                ensure that organizations can trust the validity of claims without accumulating toxic,
                vulnerable personal databases.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-surface-warm flex items-center justify-center text-neutral-900 shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">Share only the required eligibility result</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Verifiers receive boolean satisfaction proofs rather than underlying personal records.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-surface-warm flex items-center justify-center text-neutral-900 shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">Review verification requests before approval</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Explicit informed consent disclosure clarifies exactly what condition is being tested.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-surface-warm flex items-center justify-center text-neutral-900 shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">Verify credentials through trusted issuers</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Tamper-evident canonical digests signed with Ed25519 digital signatures ensure mathematical certainty.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/tamper-lab"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Launch Interactive Tampering Lab <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Technical Diagram Card */}
            <div className="lg:col-span-6">
              <div className="bg-surface-soft border border-border rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="text-xs font-mono text-neutral-500">ZKP_FLOW_SPECIFICATION_v2.1</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active Pipeline
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white border border-border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-900">1. Issuer Canonical Hash</span>
                      <span className="font-mono text-[10px] text-neutral-400">SHA-256 Digest</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 font-mono break-all">
                      hash = SHA256(canonicalize(payload))
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-900">2. Blinded Commitment & Nullifier</span>
                      <span className="font-mono text-[10px] text-neutral-400">Replay Protection</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 font-mono break-all">
                      nullifier = HMAC(holderSecret, verifierId + nonce)
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-900">3. Verification Output</span>
                      <span className="font-semibold text-emerald-700">Eligible: true</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Raw underlying scores or private records are never transmitted or stored.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.7 FINAL CALL TO ACTION */}
      <section className="py-20 bg-surface-warm/40 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-text-primary tracking-tight">
            Ready to verify without compromise?
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mx-auto">
            Experience the privacy-first standard for selective credential verification.
            Zero sensitive data leakage. Instant mathematical confidence.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-all shadow-subtle flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3.5 rounded-full bg-white border border-border text-neutral-800 text-sm font-semibold hover:bg-neutral-50 transition-all shadow-xs"
            >
              Explore Live Portal
            </Link>
          </div>
        </div>
      </section>

      {/* 7.8 FOOTER (Clean, professional, compliant with Section 7.8) */}
      <footer className="bg-white border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-100">
            <BrandLogo size="md" showTagline={true} />

            <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600">
              <a href="#hero" className="hover:text-neutral-900 transition-colors">Home</a>
              <a href="#how-it-works" className="hover:text-neutral-900 transition-colors">How It Works</a>
              <a href="#use-cases" className="hover:text-neutral-900 transition-colors">Use Cases</a>
              <a href="#security" className="hover:text-neutral-900 transition-colors">Security</a>
              <Link to="/tamper-lab" className="hover:text-neutral-900 transition-colors">Tampering Lab</Link>
              <Link to="/login" className="hover:text-neutral-900 transition-colors">Login</Link>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <div>
              © {new Date().getFullYear()} VERIVEIL Platform. Prove Privately. Empower Everyone.
            </div>
            <div className="flex items-center gap-4">
              <span>Zero-Knowledge Proofs</span>
              <span>•</span>
              <span>Ed25519 & SHA-256</span>
              <span>•</span>
              <span>Selective Disclosure</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-3xl max-w-lg w-full p-6 shadow-floating space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <BrandLogo size="sm" />
                <span className="text-xs font-semibold text-neutral-800">Interactive Verification Walkthrough</span>
              </div>
              <button
                onClick={() => setDemoModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-900 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>STEP {activeStepDemo} OF 3</span>
                <span>{activeStepDemo === 1 ? 'Credential Issuance' : activeStepDemo === 2 ? 'Requirement Request' : 'ZKP Verification Result'}</span>
              </div>

              {activeStepDemo === 1 && (
                <div className="p-4 rounded-2xl bg-surface-soft border border-border space-y-2">
                  <div className="text-xs font-bold text-neutral-900">Student Academic Record Issued</div>
                  <p className="text-xs text-neutral-600">
                    XYZ University issues Krishna Gautam a digitally signed academic credential containing exact score 82.5%.
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-neutral-200 text-[11px] font-mono text-neutral-700">
                    Digitally Signed: ✓ Ed25519 Verified
                  </div>
                </div>
              )}

              {activeStepDemo === 2 && (
                <div className="p-4 rounded-2xl bg-surface-soft border border-border space-y-2">
                  <div className="text-xs font-bold text-neutral-900">Scholarship Portal Requests Condition</div>
                  <p className="text-xs text-neutral-600">
                    The portal requires applicants to satisfy: <span className="font-semibold text-neutral-900">Marks ≥ 75%</span>.
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-neutral-200 text-[11px] text-neutral-700">
                    Holder prepares a Zero-Knowledge Proof without disclosing 82.5%.
                  </div>
                </div>
              )}

              {activeStepDemo === 3 && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Verifier Verification Outcome: Eligible
                  </div>
                  <p className="text-xs text-emerald-800">
                    The portal receives cryptographic certainty that condition is met. Exact marks and personal identity details remained completely private!
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                disabled={activeStepDemo === 1}
                onClick={() => setActiveStepDemo(p => p - 1)}
                className="px-4 py-2 text-xs font-medium text-neutral-600 disabled:opacity-30"
              >
                Previous
              </button>

              {activeStepDemo < 3 ? (
                <button
                  onClick={() => setActiveStepDemo(p => p + 1)}
                  className="px-5 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
                >
                  Next Step →
                </button>
              ) : (
                <Link
                  to="/dashboard"
                  onClick={() => setDemoModalOpen(false)}
                  className="px-5 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
                >
                  Enter Portal →
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
