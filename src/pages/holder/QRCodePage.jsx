import React, { useState, useEffect, useRef } from 'react';
import {
  QrCode,
  Copy,
  Check,
  RefreshCw,
  Clock,
  ShieldCheck,
  Smartphone,
  Info
} from 'lucide-react';
import QRCode from 'qrcode';
import { useApp } from '../../context/AppContext';

export default function QRCodePage() {
  const { activeSession, setActiveSession, currentUser } = useApp();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  // Generate QR Canvas
  useEffect(() => {
    if (canvasRef.current) {
      const qrData = JSON.stringify({
        protocol: "VERIVEIL_SESSION_v1",
        sessionCode: activeSession.rawCode,
        holderId: currentUser.id,
        created: activeSession.createdTime,
        endpoint: "https://veriveil.io/api/verify-session"
      });

      QRCode.toCanvas(
        canvasRef.current,
        qrData,
        {
          width: 240,
          margin: 1.5,
          color: {
            dark: '#171717',
            light: '#FFFFFF'
          }
        },
        (error) => {
          if (error) console.error("QR Code generation error:", error);
        }
      );
    }
  }, [activeSession, currentUser.id]);

  // Expiry countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSession.rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRegenerate = () => {
    const newRaw = Math.floor(100000 + Math.random() * 900000).toString();
    const formatted = `${newRaw.slice(0, 3)} ${newRaw.slice(3)}`;
    setActiveSession({
      code: formatted,
      rawCode: newRaw,
      expiresInSeconds: 300,
      status: 'Active',
      createdTime: new Date().toISOString()
    });
    setTimeLeft(300);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-1">
          <QrCode className="w-3.5 h-3.5" />
          <span>Live In-Person & Remote Session</span>
        </div>
        <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
          QR & Verification Code
        </h1>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          Present this one-time cryptographic session to any authorized VeriVeil verifier terminal or scanner.
        </p>
      </div>

      {/* Main QR Card */}
      <div className="bg-white border border-border rounded-3xl p-8 shadow-card flex flex-col items-center space-y-6">
        {/* Session Status & Timer Bar */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-border text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${timeLeft > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="font-semibold text-neutral-800">
              {timeLeft > 0 ? 'Session Active' : 'Session Expired'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-neutral-500 bg-surface-soft px-3 py-1 rounded-full border border-border">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Expires in {formatTimer(timeLeft)}</span>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="relative p-5 bg-white border border-border rounded-3xl shadow-subtle group">
          <canvas ref={canvasRef} className="rounded-xl mx-auto" />
          {timeLeft === 0 && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-xs rounded-3xl flex flex-col items-center justify-center p-4 text-center">
              <span className="text-xs font-bold text-rose-700">Session Expired</span>
              <p className="text-[11px] text-neutral-500 mt-1 mb-3">This verification token has timed out for security.</p>
              <button
                onClick={handleRegenerate}
                className="px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold"
              >
                Start New Session
              </button>
            </div>
          )}
        </div>

        {/* 6-Character Verification Code */}
        <div className="w-full space-y-2 text-center">
          <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold block">
            Manual Verification Code
          </span>
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-surface-soft border border-border">
            <span className="text-2xl font-mono font-bold tracking-widest text-neutral-900">
              {activeSession.code}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-200/60 transition-colors"
              title="Copy session code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          {copied && (
            <p className="text-[10px] text-emerald-600 font-medium">Copied to clipboard!</p>
          )}
        </div>

        {/* Regenerate Action */}
        <button
          onClick={handleRegenerate}
          className="px-5 py-2.5 rounded-full border border-border text-xs font-medium text-neutral-700 hover:bg-surface-soft transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Regenerate New Session Code
        </button>

        {/* Privacy Note */}
        <div className="w-full p-4 rounded-2xl bg-surface-soft border border-border text-[11px] text-neutral-500 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Scanning this code does not grant access to your underlying identity documents. The verifier will only receive the proof criteria you explicitly approved.
          </p>
        </div>
      </div>
    </div>
  );
}
