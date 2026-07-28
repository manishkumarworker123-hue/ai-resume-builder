import React, { useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { analyzeATSScore } from '../services/atsAnalyzer';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { ShieldCheck, AlertTriangle, Zap, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ATSPage: React.FC = () => {
  const { getActiveResume } = useResumeStore();
  const { t } = useLanguageStore();
  const { recordATSCheck } = useAnalyticsStore();
  const resume = getActiveResume();

  const [jobDescription, setJobDescription] = useState('');

  const result = analyzeATSScore(resume, jobDescription);

  const handleRunAnalysis = () => {
    recordATSCheck(result.overallScore);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Offline Rule-Based ATS Engine
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{t('atsHeadline')}</h1>
          <p className="text-xs text-slate-300 max-w-xl">{t('atsSubhead')}</p>
        </div>

        {/* Score Radial Badge */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/20">
          <div className="text-center">
            <p className="text-4xl font-black text-white">{result.overallScore}</p>
            <p className="text-[10px] uppercase font-bold text-slate-300">Out of 100</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center font-black text-xl shadow-glow">
            {result.grade}
          </div>
        </div>
      </div>

      {/* Job Description Target Input */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <label className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-brand-500" />
          Target Job Description (Optional for Keyword Matching)
        </label>
        <textarea
          rows={3}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description text here to analyze keyword matching..."
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
        />
        <button
          onClick={handleRunAnalysis}
          className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-glow"
        >
          <Zap className="w-4 h-4" />
          <span>Analyze Resume ATS Match</span>
        </button>
      </div>

      {/* Category Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          result.contactScore,
          result.sectionsScore,
          result.experienceScore,
          result.skillsScore,
          result.formattingScore,
          result.grammarScore,
          result.keywordsScore,
        ].map((cat) => (
          <div key={cat.name} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">{cat.name}</h3>
              <span className={`text-xs font-black px-2 py-0.5 rounded ${
                cat.score >= 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {cat.score}/100
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  cat.score >= 80 ? 'bg-emerald-500' : cat.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${cat.score}%` }}
              />
            </div>
            {cat.feedback.map((fb, idx) => (
              <p key={idx} className="text-[11px] text-slate-500 dark:text-slate-400">{fb}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Optimization Recommendations List */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          {t('suggestionsTitle')} ({result.suggestions.length})
        </h3>

        <div className="space-y-3">
          {result.suggestions.map((s, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
                s.priority === 'high'
                  ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-200'
                  : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200'
              }`}
            >
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded shrink-0 ${
                s.priority === 'high' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
              }`}>
                {s.priority}
              </span>
              <div>
                <span className="font-bold">{s.category}: </span>
                <span>{s.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
          <Link
            to="/builder"
            className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs flex items-center gap-2"
          >
            <span>Edit Resume to Fix Recommendations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
