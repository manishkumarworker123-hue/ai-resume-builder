import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { exportToJSON } from '../services/exporter';
import { Download, Languages, RefreshCcw } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { getActiveResume } = useResumeStore();
  const { language, setLanguage } = useLanguageStore();
  const activeResume = getActiveResume();

  const handleBackup = () => {
    exportToJSON(activeResume, 'All_Resumes_Backup.json');
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset local storage? This will revert resumes to default sample presets.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Settings & Data Management</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Configure language, theme, and data backups.</p>
      </div>

      <div className="space-y-6">
        {/* Language */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Languages className="w-5 h-5 text-brand-500" />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">App Language</h3>
              <p className="text-xs text-slate-500">Switch UI language between English and Hindi.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                language === 'en' ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                language === 'hi' ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              हिन्दी (Hindi)
            </button>
          </div>
        </div>

        {/* Backup JSON */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-indigo-500" />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Full JSON Data Backup</h3>
              <p className="text-xs text-slate-500">Export your local resume database as a JSON backup file.</p>
            </div>
          </div>
          <button
            onClick={handleBackup}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs"
          >
            Export Backup
          </button>
        </div>

        {/* Reset Local Data */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/50 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RefreshCcw className="w-5 h-5 text-rose-500" />
            <div>
              <h3 className="font-bold text-sm text-rose-900 dark:text-rose-200">Reset Local Storage</h3>
              <p className="text-xs text-slate-500">Wipe local storage and reset to default factory presets.</p>
            </div>
          </div>
          <button
            onClick={handleResetData}
            className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs"
          >
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
};
