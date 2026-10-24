import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, ChevronDown, Shield, User, CheckCircle2, LogOut, ArrowRightLeft, Sparkles } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';
import { useApp } from '../../context/AppContext';

export default function Navbar({ onToggleSidebar, isSidebarCollapsed }) {
  const { currentUser, activeRole, setActiveRole, requests } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roleLabels = {
    holder: 'Holder Account',
    verifier: 'Verifier Account',
    issuer: 'Issuer Account'
  };

  const handleRoleSwitch = (newRole) => {
    setActiveRole(newRole);
    setDropdownOpen(false);
    if (newRole === 'holder') navigate('/dashboard');
    else if (newRole === 'verifier') navigate('/verifier');
    else if (newRole === 'issuer') navigate('/issuer');
  };

  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-white/95 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sm:px-6 transition-all duration-200">
      {/* Left: Sidebar Toggle & Brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Sidebar"
          className="p-2 -ml-1 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-200"
        >
          <Menu className="w-5 h-5 stroke-[1.75]" />
        </button>

        <BrandLogo size="sm" />
      </div>

      {/* Center: Search Field (as seen in Image 1) */}
      <div className="hidden md:flex items-center max-w-md w-full mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 stroke-[1.75]" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full h-9 pl-10 pr-4 text-xs bg-surface-soft border border-border rounded-full text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-all shadow-subtle"
          />
          <kbd className="hidden lg:inline-flex absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] text-neutral-400 bg-white border border-neutral-200 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Quick Role Switcher Pill */}
        <div className="hidden sm:flex items-center bg-surface-soft border border-border rounded-full p-1 text-xs">
          <button
            onClick={() => handleRoleSwitch('holder')}
            className={`px-3 py-1 rounded-full transition-all font-medium ${
              activeRole === 'holder'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Holder
          </button>
          <button
            onClick={() => handleRoleSwitch('verifier')}
            className={`px-3 py-1 rounded-full transition-all font-medium ${
              activeRole === 'verifier'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Verifier
          </button>
          <button
            onClick={() => handleRoleSwitch('issuer')}
            className={`px-3 py-1 rounded-full transition-all font-medium ${
              activeRole === 'issuer'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Issuer
          </button>
        </div>

        {/* Notifications Icon with dot */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5 stroke-[1.75]" />
            {requests.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-2xl shadow-floating py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-900">Notifications</span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 font-medium rounded-full">
                  {requests.length} pending
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-neutral-100">
                {requests.map((req) => (
                  <div key={req.id} className="p-3 hover:bg-neutral-50 transition-colors">
                    <p className="text-xs font-medium text-neutral-800">{req.organization}</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Requested: {req.conditionLabel}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400">{req.timeAgo}</span>
                      <Link
                        to="/requests"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-[11px] font-medium text-neutral-900 hover:underline"
                      >
                        Review →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Info Dropdown (matching Image 1) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-1.5 rounded-full hover:bg-surface-soft transition-colors focus:outline-none"
            aria-expanded={dropdownOpen}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-border shadow-xs"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-8 h-8 rounded-full bg-neutral-900 text-white font-medium text-xs items-center justify-center">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-neutral-900 leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[11px] text-neutral-500 leading-tight">
                {roleLabels[activeRole]}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 stroke-[2] ml-0.5" />
          </button>

          {/* User Menu Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-border rounded-2xl shadow-floating py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-xs font-semibold text-neutral-900">{currentUser.name}</p>
                <p className="text-[11px] text-neutral-500 truncate">{currentUser.email}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-neutral-100 rounded-full text-[10px] text-neutral-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active: {roleLabels[activeRole]}
                </div>
              </div>

              <div className="py-1">
                <div className="px-3 py-1 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Switch Workspace
                </div>
                <button
                  onClick={() => handleRoleSwitch('holder')}
                  className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 ${
                    activeRole === 'holder' ? 'font-semibold text-neutral-900 bg-neutral-50' : 'text-neutral-600'
                  }`}
                >
                  <span>Holder Portal</span>
                  {activeRole === 'holder' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
                <button
                  onClick={() => handleRoleSwitch('verifier')}
                  className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 ${
                    activeRole === 'verifier' ? 'font-semibold text-neutral-900 bg-neutral-50' : 'text-neutral-600'
                  }`}
                >
                  <span>Verifier Portal</span>
                  {activeRole === 'verifier' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
                <button
                  onClick={() => handleRoleSwitch('issuer')}
                  className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 ${
                    activeRole === 'issuer' ? 'font-semibold text-neutral-900 bg-neutral-50' : 'text-neutral-600'
                  }`}
                >
                  <span>Issuer Portal</span>
                  {activeRole === 'issuer' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              </div>

              <div className="border-t border-border pt-1">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5" />
                  Profile & Security
                </Link>
                <Link
                  to="/tamper-lab"
                  onClick={() => setDropdownOpen(false)}
                  className="px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Live Tampering Lab
                </Link>
                <Link
                  to="/login"
                  onClick={() => setDropdownOpen(false)}
                  className="px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
