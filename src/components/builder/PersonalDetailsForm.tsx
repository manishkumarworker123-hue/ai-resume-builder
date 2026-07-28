import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { User, Mail, Phone, MapPin, Globe, Camera, Trash2 } from 'lucide-react';

export const PersonalDetailsForm: React.FC = () => {
  const { getActiveResume, updatePersonalInfo } = useResumeStore();
  const { t } = useLanguageStore();
  const resume = getActiveResume();
  const { personalInfo } = resume;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ photoUrl: reader.result as string, showPhoto: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header Info */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-4 h-4 text-brand-500" />
          {t('tabPersonal')}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-0.5">Enter your basic contact details and professional headline.</p>
      </div>

      {/* Photo Upload Card */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-brand-500/30">
          {personalInfo.photoUrl ? (
            <img src={personalInfo.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-slate-400" />
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold flex items-center gap-1.5 cursor-pointer transition-colors">
              <Camera className="w-3.5 h-3.5" />
              <span>{t('uploadPhoto')}</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
            {personalInfo.photoUrl && (
              <button
                onClick={() => updatePersonalInfo({ photoUrl: '', showPhoto: false })}
                className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                title="Remove Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={personalInfo.showPhoto || false}
              onChange={(e) => updatePersonalInfo({ showPhoto: e.target.checked })}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span>{t('showPhoto')}</span>
          </label>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">{t('fullName')}</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="e.g. Alex Vance"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">{t('jobTitle')}</label>
          <input
            type="text"
            value={personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
            placeholder="e.g. Senior Software Engineer"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">{t('email')}</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="alex@domain.com"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">{t('phone')}</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">{t('location')}</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="San Francisco, CA"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">{t('linkedin')}</label>
          <input
            type="url"
            value={personalInfo.linkedin || ''}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">{t('github')}</label>
          <input
            type="url"
            value={personalInfo.github || ''}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">{t('website')}</label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="url"
              value={personalInfo.website || ''}
              onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div>
        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">{t('summary')}</label>
        <textarea
          rows={4}
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none leading-relaxed"
          placeholder="Write 3-4 impactful sentences summarizing your key experience, skills, and value..."
        />
      </div>
    </div>
  );
};
