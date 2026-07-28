import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, EyeOff, BarChart3, Settings, AlertCircle, RefreshCw, CheckCircle2, Globe, Megaphone } from 'lucide-react';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { useResumeStore } from '../store/useResumeStore';

export const AdminPage: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState('');

  const { metrics, resetAnalytics } = useAnalyticsStore();
  const { resumes } = useResumeStore();

  const ADMIN_PASSCODE = 'admin123'; // Default admin passcode

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setError('');
    } else {
      setError('Incorrect Admin Passcode!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-500 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Owner Admin Login</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Enter your master passcode to access the AI Resume PRO management panel.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Passcode</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (default: admin123)"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && <p className="text-[11px] text-rose-500 font-semibold mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow transition-all active:scale-95"
            >
              Access Admin Panel
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-center">
            <span className="text-[11px] text-slate-400">Default Passcode: <code className="bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded font-mono font-bold text-brand-500">admin123</code></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            <h1 className="text-xl font-bold tracking-tight">AI Resume PRO — Admin Control Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Manage app monetization, user metrics, deployment status, and system configurations.</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors"
        >
          Logout Admin
        </button>
      </div>

      {/* Grid Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Total Resumes Created</span>
            <BarChart3 className="w-4 h-4 text-brand-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{resumes.length || 1}</p>
          <span className="text-[11px] text-emerald-500 font-semibold">Active in browser state</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Total Downloads</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{metrics.totalDownloads}</p>
          <span className="text-[11px] text-slate-400">PDF, TXT & JSON</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Monetag Status</span>
            <Megaphone className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active (Push Ads)
          </p>
          <span className="text-[11px] text-slate-400">Zone ID: 264613</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Netlify Status</span>
            <Globe className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">Production Live</p>
          <span className="text-[11px] text-slate-400">GitHub Auto-Deploy Connected</span>
        </div>
      </div>

      {/* Admin Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monetag Config Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-brand-500" />
            Monetag Monetization Settings
          </h3>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Verification Tag:</span>
              <span className="font-mono text-emerald-600 font-bold">bdaf39...544</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Push Ad Zone:</span>
              <span className="font-mono text-brand-500 font-bold">264613</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Script Status:</span>
              <span className="font-bold text-emerald-500">Embedded in index.html</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ad revenues can be monitored directly inside your <a href="https://publishers.monetag.com" target="_blank" rel="noreferrer" className="text-brand-500 underline font-semibold">Monetag Publisher Dashboard</a>.
          </p>
        </div>

        {/* System Diagnostics */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-brand-500" />
            App Health & Reset Tools
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Reset Analytics Metrics</p>
                <p className="text-[11px] text-slate-500">Clears local download and usage counts</p>
              </div>
              <button
                onClick={resetAnalytics}
                className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 font-semibold text-xs border border-rose-200 dark:border-rose-900 hover:bg-rose-100 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
