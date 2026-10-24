import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Award,
  FileCheck2,
  Share2,
  QrCode,
  History,
  UserCheck,
  Settings,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  PlusCircle,
  ScanLine,
  CheckCircle,
  KeyRound,
  FileSpreadsheet,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar({ isOpen, isCollapsed, onCloseMobile }) {
  const { activeRole, requests } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items grouped by role
  const holderMenu = [
    {
      group: null,
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      group: 'CREDENTIALS',
      items: [
        { label: 'My Credentials', path: '/credentials', icon: Award },
        { label: 'Verification Requests', path: '/requests', icon: FileCheck2, badge: requests.length },
        { label: 'Generate Proof', path: '/generate-proof', icon: Share2 },
        { label: 'QR & Verification Code', path: '/qr-code', icon: QrCode },
        { label: 'History', path: '/history', icon: History }
      ]
    },
    {
      group: 'ACCOUNT',
      items: [
        { label: 'Profile & Security', path: '/profile', icon: UserCheck },
        { label: 'Settings', path: '/settings', icon: Settings }
      ]
    }
  ];

  const verifierMenu = [
    {
      group: null,
      items: [
        { label: 'Dashboard', path: '/verifier', icon: LayoutDashboard }
      ]
    },
    {
      group: 'WORKSPACE',
      items: [
        { label: 'Create Request', path: '/verifier/create-request', icon: PlusCircle },
        { label: 'Verify QR / Code', path: '/verifier/verify', icon: ScanLine },
        { label: 'Verification Results', path: '/verifier/results', icon: CheckCircle },
        { label: 'Live Tampering Lab', path: '/tamper-lab', icon: ShieldAlert, highlight: true },
        { label: 'Request History', path: '/history', icon: History }
      ]
    },
    {
      group: 'ORGANISATION',
      items: [
        { label: 'Organisation Profile', path: '/profile', icon: UserCheck },
        { label: 'Settings', path: '/settings', icon: Settings }
      ]
    }
  ];

  const issuerMenu = [
    {
      group: null,
      items: [
        { label: 'Dashboard', path: '/issuer', icon: LayoutDashboard }
      ]
    },
    {
      group: 'WORKSPACE',
      items: [
        { label: 'Issue Credential', path: '/issuer/issue', icon: PlusCircle },
        { label: 'Issued Credentials', path: '/issuer/credentials', icon: FileSpreadsheet },
        { label: 'Cryptographic Keys', path: '/issuer/keys', icon: KeyRound },
        { label: 'Issuance History', path: '/history', icon: History }
      ]
    },
    {
      group: 'ORGANISATION',
      items: [
        { label: 'Settings', path: '/settings', icon: Settings }
      ]
    }
  ];

  const currentMenu = activeRole === 'verifier' ? verifierMenu : activeRole === 'issuer' ? issuerMenu : holderMenu;

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-neutral-900/30 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 bg-white border-r border-border transition-all duration-300 flex flex-col justify-between overflow-y-auto ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation Items */}
        <div className="p-4 space-y-6">
          {/* Mobile close button header */}
          <div className="flex lg:hidden items-center justify-between pb-2 border-b border-border">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Navigation</span>
            <button
              onClick={onCloseMobile}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {currentMenu.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {section.group && !isCollapsed && (
                <div className="px-3 pb-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider select-none">
                  {section.group}
                </div>
              )}

              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onCloseMobile}
                    title={isCollapsed ? item.label : undefined}
                    className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-neutral-100/80 text-neutral-900 font-semibold shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    } ${item.highlight ? 'text-amber-800 hover:text-amber-900' : ''}`}
                  >
                    {/* Active bar indicator on left (exact match of Image 1) */}
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-neutral-900 rounded-r-full" />
                    )}

                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 stroke-[1.8] ${
                        isActive ? 'text-neutral-900' : 'text-neutral-500'
                      }`}
                    />

                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge > 0 && (
                      <span className="ml-auto px-1.5 py-0.5 text-[10px] bg-neutral-900 text-white rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Area: Privacy Banner (from Image 1) & Logout */}
        <div className="p-4 space-y-3 border-t border-border">
          {/* Privacy Guarantee Card (Image 1 bottom left) */}
          {!isCollapsed && (
            <div className="relative overflow-hidden p-3.5 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100/80 border border-border/80 shadow-xs">
              <div className="absolute right-0 bottom-0 translate-x-2 translate-y-2 opacity-15 pointer-events-none">
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                  <path d="M10 80 C40 40 60 70 90 20 C70 50 40 50 10 80 Z" fill="#171717" />
                </svg>
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center text-white">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                <span className="text-xs font-semibold text-neutral-900">Your data Stays Private</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Zero-knowledge proofs. Total control.
              </p>
            </div>
          )}

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-neutral-600 hover:text-rose-600 hover:bg-rose-50 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-4 h-4 stroke-[1.8]" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
