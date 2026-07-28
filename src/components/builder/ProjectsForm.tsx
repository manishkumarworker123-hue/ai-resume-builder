import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';

export const ProjectsForm: React.FC = () => {
  const { getActiveResume, addProject, updateProject, deleteProject } = useResumeStore();
  const { t } = useLanguageStore();
  const resume = getActiveResume();

  return (
    <div className="space-y-6 text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-brand-500" />
            {t('tabProjects')}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5">Highlight major open-source, personal, or corporate projects.</p>
        </div>
        <button
          onClick={addProject}
          className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addProject')}</span>
        </button>
      </div>

      <div className="space-y-4">
        {resume.projects.map((proj, idx) => (
          <div key={proj.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-200"># {idx + 1} Project</span>
              <button
                onClick={() => deleteProject(proj.id)}
                className="p-1 text-rose-500 hover:text-rose-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Technologies Used (comma separated)</label>
                <input
                  type="text"
                  value={proj.technologies.join(', ')}
                  onChange={(e) => updateProject(proj.id, { technologies: e.target.value.split(',').map(x => x.trim()).filter(Boolean) })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  placeholder="React, TypeScript, Go"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Project Summary / Description</label>
              <textarea
                rows={2}
                value={proj.description}
                onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
