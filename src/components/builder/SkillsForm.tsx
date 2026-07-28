import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Wrench, Plus, Trash2, X } from 'lucide-react';

export const SkillsForm: React.FC = () => {
  const { getActiveResume, addSkillCategory, updateSkillCategory, deleteSkillCategory } = useResumeStore();
  const { t } = useLanguageStore();
  const resume = getActiveResume();
  const [newSkillInput, setNewSkillInput] = useState<Record<string, string>>({});

  const handleAddSkill = (catId: string, currentSkills: string[]) => {
    const val = newSkillInput[catId]?.trim();
    if (val && !currentSkills.includes(val)) {
      const updated = [...currentSkills, val];
      const category = resume.skillCategories.find(c => c.id === catId);
      if (category) {
        updateSkillCategory(catId, category.categoryName, updated);
        setNewSkillInput(prev => ({ ...prev, [catId]: '' }));
      }
    }
  };

  const handleRemoveSkill = (catId: string, currentSkills: string[], skillToRemove: string) => {
    const updated = currentSkills.filter(s => s !== skillToRemove);
    const category = resume.skillCategories.find(c => c.id === catId);
    if (category) {
      updateSkillCategory(catId, category.categoryName, updated);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-brand-500" />
            {t('tabSkills')}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5">Group technical, soft, and domain skills into clear categories.</p>
        </div>
        <button
          onClick={addSkillCategory}
          className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addSkill')} Category</span>
        </button>
      </div>

      <div className="space-y-4">
        {resume.skillCategories.map((cat) => (
          <div key={cat.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={cat.categoryName}
                onChange={(e) => updateSkillCategory(cat.id, e.target.value, cat.skills)}
                className="font-bold text-sm text-slate-900 dark:text-white bg-transparent border-b border-slate-200 dark:border-slate-700 pb-0.5 outline-none"
                placeholder="Category Name"
              />
              <button
                onClick={() => deleteSkillCategory(cat.id)}
                className="p-1 text-rose-500 hover:text-rose-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Pill Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold border border-brand-200 dark:border-brand-800 flex items-center gap-1.5"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(cat.id, cat.skills, skill)}
                    className="text-brand-400 hover:text-rose-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add Tag Input */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newSkillInput[cat.id] || ''}
                onChange={(e) => setNewSkillInput(prev => ({ ...prev, [cat.id]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(cat.id, cat.skills);
                  }
                }}
                placeholder="Type skill & press Enter..."
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
              <button
                onClick={() => handleAddSkill(cat.id, cat.skills)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
