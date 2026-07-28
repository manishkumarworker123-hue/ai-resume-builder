import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Award, Trophy, Languages as LangIcon, Heart, Plus, Trash2 } from 'lucide-react';

export const ExtraSectionsForm: React.FC = () => {
  const {
    getActiveResume,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    addLanguage,
    deleteLanguage,
    updateHobbies,
  } = useResumeStore();
  const resume = getActiveResume();

  return (
    <div className="space-y-8 text-xs">
      {/* 1. Certifications */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-brand-500" />
            Certifications & Licenses
          </h3>
          <button
            onClick={addCertificate}
            className="px-2.5 py-1 rounded-lg bg-brand-500 text-white font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Cert
          </button>
        </div>

        <div className="space-y-3">
          {resume.certificates.map((cert) => (
            <div key={cert.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center gap-3">
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCertificate(cert.id, { name: e.target.value })}
                placeholder="Certificate Title"
                className="flex-1 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateCertificate(cert.id, { issuer: e.target.value })}
                placeholder="Issuer (AWS/Google)"
                className="w-36 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <button onClick={() => deleteCertificate(cert.id)} className="text-rose-500 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Achievements */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-brand-500" />
            Honors & Achievements
          </h3>
          <button
            onClick={addAchievement}
            className="px-2.5 py-1 rounded-lg bg-brand-500 text-white font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Award
          </button>
        </div>

        <div className="space-y-3">
          {resume.achievements.map((ach) => (
            <div key={ach.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={ach.title}
                  onChange={(e) => updateAchievement(ach.id, { title: e.target.value })}
                  placeholder="Achievement Title / Award Name"
                  className="font-bold w-full bg-transparent border-b border-slate-200 dark:border-slate-700 outline-none pb-0.5 text-slate-900 dark:text-white"
                />
                <button onClick={() => deleteAchievement(ach.id)} className="text-rose-500 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                value={ach.description}
                onChange={(e) => updateAchievement(ach.id, { description: e.target.value })}
                placeholder="Brief description of the award..."
                className="w-full px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Languages */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <LangIcon className="w-4 h-4 text-brand-500" />
          Languages
        </h3>
        <div className="flex flex-wrap gap-2">
          {resume.languages.map((lang) => (
            <span key={lang.id} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2">
              {lang.language} ({lang.proficiency})
              <button onClick={() => deleteLanguage(lang.id)} className="text-slate-400 hover:text-rose-500">
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => addLanguage('English', 'Native')}
            className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
          >
            + English
          </button>
          <button
            onClick={() => addLanguage('Hindi', 'Fluent')}
            className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
          >
            + Hindi
          </button>
          <button
            onClick={() => addLanguage('Spanish', 'Intermediate')}
            className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
          >
            + Spanish
          </button>
        </div>
      </div>

      {/* 4. Hobbies */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Heart className="w-4 h-4 text-brand-500" />
          Interests & Hobbies
        </h3>
        <input
          type="text"
          value={resume.hobbies.join(', ')}
          onChange={(e) => updateHobbies(e.target.value.split(',').map(x => x.trim()).filter(Boolean))}
          placeholder="e.g. Mountain Biking, Open Source, Chess"
          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
        />
      </div>
    </div>
  );
};
