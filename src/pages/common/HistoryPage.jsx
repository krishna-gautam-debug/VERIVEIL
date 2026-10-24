import React, { useState } from 'react';
import {
  History,
  CheckCircle2,
  XCircle,
  Filter,
  GraduationCap,
  User,
  MapPin,
  Lock,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HistoryPage() {
  const { recentVerifications } = useApp();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = recentVerifications.filter(item => {
    const matchesFilter =
      filterStatus === 'all'
        ? true
        : filterStatus === 'eligible'
        ? item.statusType === 'eligible'
        : item.statusType === 'not-eligible';

    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.condition.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Audit & Verification Ledger</span>
          </div>
          <h1 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight">
            Verification Activity History
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Complete record of all selective disclosure proofs generated and verified.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-surface-soft border border-border rounded-full p-1 text-xs">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-full transition-all font-medium ${
              filterStatus === 'all' ? 'bg-neutral-900 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            All Activity
          </button>
          <button
            onClick={() => setFilterStatus('eligible')}
            className={`px-3 py-1.5 rounded-full transition-all font-medium ${
              filterStatus === 'eligible' ? 'bg-neutral-900 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Eligible Only
          </button>
          <button
            onClick={() => setFilterStatus('not-eligible')}
            className={`px-3 py-1.5 rounded-full transition-all font-medium ${
              filterStatus === 'not-eligible' ? 'bg-neutral-900 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Not Eligible
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-border rounded-2xl p-3 shadow-subtle flex items-center gap-3">
        <Search className="w-4 h-4 text-neutral-400 ml-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by verifier name or condition (e.g. Scholarship, Marks ≥ 75%)..."
          className="w-full text-xs bg-transparent focus:outline-none text-neutral-900 placeholder-neutral-400"
        />
      </div>

      {/* History Table */}
      <div className="bg-white border border-border rounded-3xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-soft border-b border-border text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Organization / Verifier</th>
                <th className="py-3.5 px-6">Requirement Tested</th>
                <th className="py-3.5 px-6">Outcome</th>
                <th className="py-3.5 px-6">Timestamp</th>
                <th className="py-3.5 px-6 text-right">Data Disclosure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-neutral-400">
                    No verification records match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-soft/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-surface-warm border border-border flex items-center justify-center text-neutral-800">
                          {item.icon === 'academic' && <GraduationCap className="w-4 h-4" />}
                          {item.icon === 'user' && <User className="w-4 h-4" />}
                          {item.icon === 'lock' && <Lock className="w-4 h-4" />}
                          {item.icon === 'home' && <MapPin className="w-4 h-4" />}
                        </div>
                        <span className="font-semibold text-neutral-900">{item.title}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-medium text-neutral-700">
                      {item.condition}
                    </td>

                    <td className="py-4 px-6">
                      {item.statusType === 'eligible' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Eligible
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60 inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Not Eligible
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-neutral-400 font-mono text-[11px]">
                      {item.timeAgo}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500 font-medium">
                        Zero data leaked ✓
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
