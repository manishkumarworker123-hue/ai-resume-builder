import React from 'react';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { BarChart3, Download, FileText, Award, Clock } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { resumeCount, downloadCount, atsAverageScore, recentDownloadsHistory } = useAnalyticsStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Local Analytics Dashboard</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time local usage counters, template breakdown, and ATS score metrics.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Resumes Created</span>
            <FileText className="w-5 h-5 text-brand-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">{resumeCount}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Downloads</span>
            <Download className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">{downloadCount}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Avg ATS Score</span>
            <Award className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">{atsAverageScore}/100</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Top Template</span>
            <BarChart3 className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-3 capitalize">Modern</p>
        </div>
      </div>

      {/* Downloads History */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-500" />
          Recent Downloads History
        </h2>

        {recentDownloadsHistory.length === 0 ? (
          <p className="text-xs text-slate-500 py-4">No recent downloads yet. Export a resume to track download activity.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {recentDownloadsHistory.map((item) => (
              <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{item.resumeTitle}</span>
                  <p className="text-[11px] text-slate-400">{new Date(item.downloadedAt).toLocaleString()}</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-bold uppercase text-[10px]">
                  {item.format}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
