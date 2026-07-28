import React, { useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { analyzeATSScore } from '../services/atsAnalyzer';
import { PersonalDetailsForm } from '../components/builder/PersonalDetailsForm';
import { ExperienceForm } from '../components/builder/ExperienceForm';
import { EducationForm } from '../components/builder/EducationForm';
import { SkillsForm } from '../components/builder/SkillsForm';
import { ProjectsForm } from '../components/builder/ProjectsForm';
import { ExtraSectionsForm } from '../components/builder/ExtraSectionsForm';
import { ThemeCustomizerBar } from '../components/ui/ThemeCustomizerBar';
import { TemplateRenderer } from '../components/templates/TemplateRenderer';
import type { TemplateId } from '../types/resume';
import { User, Briefcase, GraduationCap, Wrench, FolderGit2, Eye, Palette, Award, BarChart3, RefreshCw } from 'lucide-react';

export const BuilderPage: React.FC = () => {
  const { getActiveResume, themeConfig, updateThemeConfig, loadSamplePreset } = useResumeStore();
  const { t } = useLanguageStore();
  const resume = getActiveResume();

  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'extra' | 'customize'>('personal');
  const [mobilePreviewModal, setMobilePreviewModal] = useState(false);

  const atsResult = analyzeATSScore(resume);

  const TEMPLATES_LIST: { id: TemplateId; name: string }[] = [
    { id: 'modern', name: 'Modern (Linear)' },
    { id: 'minimal', name: 'Minimal (Notion)' },
    { id: 'professional', name: 'Professional (Corporate)' },
    { id: 'creative', name: 'Creative (Stripe)' },
    { id: 'executive', name: 'Executive' },
    { id: 'student', name: 'Student' },
    { id: 'fresher', name: 'Fresher' },
    { id: 'corporate', name: 'Corporate 2-Col' },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Controls Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={resume.title}
            onChange={(e) => useResumeStore.getState().updateResumeTitle(e.target.value)}
            className="font-extrabold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 text-sm focus:border-brand-500 outline-none pb-0.5"
          />
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            {t('saveDraft')}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Preset Loader */}
          <button
            onClick={() => loadSamplePreset('software-engineer')}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Load Sample Preset
          </button>

          {/* Template Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <Palette className="w-4 h-4 text-brand-500" />
            <select
              value={themeConfig.templateId}
              onChange={(e) => updateThemeConfig({ templateId: e.target.value as TemplateId })}
              className="bg-transparent font-bold text-xs text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
            >
              {TEMPLATES_LIST.map((t) => (
                <option key={t.id} value={t.id} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Realtime ATS Score Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400">
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs font-bold">{t('atsScore')}: {atsResult.overallScore}/100</span>
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-brand-500 text-white">{atsResult.grade}</span>
          </div>

          {/* Mobile Preview Trigger */}
          <button
            onClick={() => setMobilePreviewModal(true)}
            className="lg:hidden px-3 py-1.5 rounded-lg bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>
      </div>

      {/* Main Builder Grid (Editor Left, Live Preview Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Stepper & Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Navigation Tabs Header */}
          <div className="flex overflow-x-auto gap-1 bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm no-scrollbar">
            {[
              { id: 'personal', label: t('tabPersonal'), icon: User },
              { id: 'experience', label: t('tabExperience'), icon: Briefcase },
              { id: 'education', label: t('tabEducation'), icon: GraduationCap },
              { id: 'skills', label: t('tabSkills'), icon: Wrench },
              { id: 'projects', label: t('tabProjects'), icon: FolderGit2 },
              { id: 'extra', label: t('tabExtra'), icon: Award },
              { id: 'customize', label: t('tabCustomize'), icon: Palette },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                    activeTab === tab.id
                      ? 'bg-brand-500 text-white shadow-glow'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            {activeTab === 'personal' && <PersonalDetailsForm />}
            {activeTab === 'experience' && <ExperienceForm />}
            {activeTab === 'education' && <EducationForm />}
            {activeTab === 'skills' && <SkillsForm />}
            {activeTab === 'projects' && <ProjectsForm />}
            {activeTab === 'extra' && <ExtraSectionsForm />}
            {activeTab === 'customize' && <ThemeCustomizerBar />}
          </div>
        </div>

        {/* Right Column: Live Interactive Desktop Preview (5 Cols) */}
        <div className="hidden lg:block lg:col-span-5 space-y-4 sticky top-24 h-fit">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-brand-500" />
              Live Resume Preview
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">Standard A4 Format</span>
          </div>

          <div className="bg-slate-200 dark:bg-slate-900 p-4 rounded-2xl border border-slate-300 dark:border-slate-800 max-h-[82vh] overflow-y-auto shadow-inner">
            <TemplateRenderer data={resume} theme={themeConfig} containerId="resume-preview-container" />
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Modal Preview */}
      {mobilePreviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md p-4 overflow-y-auto flex flex-col">
          <div className="flex justify-between items-center mb-4 text-white">
            <h3 className="font-extrabold text-sm">Resume Preview</h3>
            <button
              onClick={() => setMobilePreviewModal(false)}
              className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold"
            >
              Close
            </button>
          </div>
          <div className="bg-white rounded-xl p-2 flex-1">
            <TemplateRenderer data={resume} theme={themeConfig} containerId="resume-preview-container-mobile" />
          </div>
        </div>
      )}
    </div>
  );
};
