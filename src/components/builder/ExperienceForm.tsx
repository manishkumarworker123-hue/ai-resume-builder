import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Briefcase, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export const ExperienceForm: React.FC = () => {
  const { getActiveResume, addExperience, updateExperience, deleteExperience, reorderExperiences } = useResumeStore();
  const { t } = useLanguageStore();
  const resume = getActiveResume();

  return (
    <div className="space-y-6 text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-brand-500" />
            {t('tabExperience')}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5">Detail your past employment and key metric wins.</p>
        </div>
        <button
          onClick={addExperience}
          className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addExperience')}</span>
        </button>
      </div>

      <div className="space-y-4">
        {resume.experiences.map((exp, index) => (
          <div key={exp.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-200"># {index + 1} Position</span>
              <div className="flex items-center gap-1">
                <button
                  disabled={index === 0}
                  onClick={() => reorderExperiences(index, index - 1)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  disabled={index === resume.experiences.length - 1}
                  onClick={() => reorderExperiences(index, index + 1)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="p-1 text-rose-500 hover:text-rose-600 ml-2"
                  title="Delete Position"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Position / Job Title</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  placeholder="e.g. 2023-01"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                <input
                  type="text"
                  disabled={exp.current}
                  value={exp.current ? 'Present' : exp.endDate}
                  onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Highlights List */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Bullet Achievements (One per line)</label>
              <textarea
                rows={3}
                value={exp.highlights.join('\n')}
                onChange={(e) => updateExperience(exp.id, { highlights: e.target.value.split('\n').filter(Boolean) })}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none leading-relaxed"
                placeholder="Spearheaded project X resulting in 40% growth..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
