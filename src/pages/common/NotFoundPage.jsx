import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import BrandLogo from '../../components/common/BrandLogo';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-6">
      <BrandLogo size="md" />

      <div className="max-w-md w-full mx-auto text-center space-y-4 my-auto">
        <div className="w-16 h-16 rounded-3xl bg-surface-soft border border-border flex items-center justify-center text-neutral-800 mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-serif font-normal text-neutral-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs text-neutral-500 leading-relaxed">
          The requested verification route does not exist or has been relocated within the secure enclave.
        </p>
        <div className="pt-2">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Dashboard
          </Link>
        </div>
      </div>

      <div className="text-center text-xs text-neutral-400">
        VERIVEIL Privacy Platform
      </div>
    </div>
  );
}
