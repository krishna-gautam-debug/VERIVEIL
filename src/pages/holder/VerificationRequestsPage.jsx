import React, { useState } from 'react';
import {
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function VerificationRequestsPage() {
  const { requests, approveRequest, rejectRequest } = useApp();
  const [selectedReq, setSelectedReq] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const handleApprove = async (req) => {
    const proof = await approveRequest(req.id);
    if (proof) {
      setToastMessage(`Proof approved and verified for ${req.organization}!`);
      setTimeout(() => setToastMessage(null), 4000);
      setSelectedReq(null);
    }
  };

  const handleReject = (reqId) => {
    rejectRequest(reqId);
    setSelectedReq(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-floating flex items-center gap-3">
          <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Verification Approvals</span>
          </div>
          <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
            Verification Requests
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Review incoming verification requests from organizations and decide what to selectively disclose.
          </p>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="bg-white border border-border rounded-3xl p-12 text-center shadow-card space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">You're all caught up!</h3>
            <p className="text-xs text-neutral-500">
              There are no pending verification requests awaiting your review.
            </p>
          </div>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="bg-white border border-border rounded-3xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-neutral-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">{req.organization}</h3>
                  <div className="text-xs text-neutral-600 mt-0.5">
                    Requested condition: <span className="font-semibold text-neutral-900">{req.conditionLabel}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-400 mt-2">
                    <span>Source Credential: {req.credentialType}</span>
                    <span>•</span>
                    <span>Received {req.timeAgo}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end md:self-center">
                <button
                  onClick={() => setSelectedReq(req)}
                  className="px-4 py-2 rounded-full bg-white border border-border text-xs font-semibold text-neutral-800 hover:bg-neutral-50"
                >
                  Review Details
                </button>
                <button
                  onClick={() => handleApprove(req)}
                  className="px-5 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 shadow-xs"
                >
                  Approve Proof
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  className="px-3.5 py-2 rounded-full border border-border text-xs text-rose-600 hover:bg-rose-50"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Review Request Modal (Section 10.4) */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-floating space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Review Verification Request
                </h3>
                <p className="text-xs text-neutral-500">
                  From: {selectedReq.organization}
                </p>
              </div>
              <button
                onClick={() => setSelectedReq(null)}
                className="text-neutral-400 hover:text-neutral-900 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-surface-soft border border-border space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Requested Condition
                </span>
                <p className="text-sm font-bold text-neutral-900 font-sans">
                  {selectedReq.conditionLabel}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold">
                  <Eye className="w-3.5 h-3.5 text-emerald-700" />
                  What Will Be Disclosed
                </div>
                <p className="text-xs text-emerald-800">
                  {selectedReq.disclosureInfo.required}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                <div className="flex items-center gap-2 text-neutral-900 text-xs font-bold">
                  <EyeOff className="w-3.5 h-3.5 text-neutral-700" />
                  What Remains Private
                </div>
                <p className="text-xs text-neutral-600">
                  {selectedReq.disclosureInfo.keptPrivate}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <button
                onClick={() => handleReject(selectedReq.id)}
                className="px-4 py-2 rounded-full border border-border text-xs text-rose-600 hover:bg-rose-50"
              >
                Reject Request
              </button>

              <button
                onClick={() => handleApprove(selectedReq)}
                className="px-6 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 shadow-xs"
              >
                Approve & Share ZKP Proof
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
