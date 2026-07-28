import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const { getActiveResume, addEducation, updateEducation, deleteEducation } = useResumeStore();
  const { t } = useLanguageStore();
  const resume = getActiveResume();

  return (
    <div className="space-y-6 text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-brand-500" />
            {t('tabEducation')}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5">List your degrees, universities, and GPA achievements.</p>
        </div>
        <button
          onClick={addEducation}
          className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addEducation')}</span>
        </button>
      </div>

      <div className="space-y-4">
        {resume.education.map((edu, idx) => (
          <div key={edu.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-200"># {idx + 1} Degree</span>
              <button
                onClick={() => deleteEducation(edu.id)}
                className="p-1 text-rose-500 hover:text-rose-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Degree / Qualification</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  placeholder="e.g. B.S. in Computer Science"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Institution / University</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Dates</label>
                <input
                  type="text"
                  value={`${edu.startDate} – ${edu.endDate}`}
                  onChange={(e) => {
                    const [s, eDate] = e.target.value.split('–').map(x => x.trim());
                    updateEducation(edu.id, { startDate: s || '2020-08', endDate: eDate || '2024-05' });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  placeholder="2020-08 – 2024-05"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">GPA / Grade (Optional)</label>
                <input
                  type="text"
                  value={edu.grade || ''}
                  onChange={(e) => updateEducation(edu.id, { grade: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  placeholder="e.g. 3.9 GPA"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
