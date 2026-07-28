import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store/useResumeStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { parseResumeFile } from '../services/resumeParser';
import { Plus, Upload, FileText, Trash2, Edit3, Sparkles, Clock } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { resumes, activeResumeId, setActiveResumeId, createNewResume, deleteResume, importResume, loadSamplePreset } = useResumeStore();
  const { t } = useLanguageStore();

  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState('');

  const resumeList = Object.values(resumes);

  const handleCreateNew = () => {
    const newId = createNewResume('My New Resume');
    setActiveResumeId(newId);
    navigate('/builder');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImporting(true);
      setImportError('');
      try {
        const parsedData = await parseResumeFile(file);
        if (parsedData) {
          importResume(parsedData as any);
          navigate('/builder');
        }
      } catch (err: any) {
        setImportError(err.message || 'Error parsing file.');
      } finally {
        setImporting(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{t('navDashboard')}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage your saved resumes, recent downloads, and starter templates.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* File Upload Import Button */}
          <label className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold text-xs text-slate-700 dark:text-slate-200 flex items-center gap-2 cursor-pointer transition-colors shadow-sm">
            <Upload className="w-4 h-4 text-brand-500" />
            <span>{importing ? 'Importing...' : t('btnImportResume')}</span>
            <input type="file" accept=".json,.docx,.txt,.pdf" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Create New Resume */}
          <button
            onClick={handleCreateNew}
            className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-glow active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('btnCreateResume')}</span>
          </button>
        </div>
      </div>

      {importError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {importError}
        </div>
      )}

      {/* Saved Resumes Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Saved Resumes ({resumeList.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resumeList.map((res) => (
            <div
              key={res.id}
              className={`p-6 rounded-2xl bg-white dark:bg-slate-800 border transition-all flex flex-col justify-between ${
                activeResumeId === res.id
                  ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-glow'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  {resumeList.length > 1 && (
                    <button
                      onClick={() => deleteResume(res.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      title="Delete Resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white truncate">{res.title}</h3>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">{res.personalInfo.jobTitle || 'No Title'}</p>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated {new Date(res.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-700/60 mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setActiveResumeId(res.id);
                    navigate('/builder');
                  }}
                  className="flex-1 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Resume
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preset Starters */}
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-500" />
          Starter Preset Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { key: 'software-engineer', title: 'Software Engineer', desc: 'Pre-filled with React, Node, Go, & System Architecture experience.' },
            { key: 'product-manager', title: 'Product Manager', desc: 'Pre-filled with ARR metrics, CSPO, and roadmapping skills.' },
            { key: 'fresher-resume', title: 'Fresher Graduate', desc: 'Pre-filled with Smart India Hackathon wins and academic projects.' },
          ].map((preset) => (
            <div key={preset.key} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">{preset.title}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{preset.desc}</p>
              </div>
              <button
                onClick={() => {
                  loadSamplePreset(preset.key);
                  navigate('/builder');
                }}
                className="mt-3 py-1.5 px-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-xs text-brand-600 dark:text-brand-400 hover:bg-brand-50 transition-colors w-fit"
              >
                Load Preset →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
