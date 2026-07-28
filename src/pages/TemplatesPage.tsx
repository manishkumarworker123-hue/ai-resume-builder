import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store/useResumeStore';
import type { TemplateId } from '../types/resume';
import { Check, Sparkles } from 'lucide-react';

export const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { themeConfig, updateThemeConfig } = useResumeStore();

  const TEMPLATES: { id: TemplateId; title: string; category: string; description: string; previewBg: string }[] = [
    { id: 'modern', title: 'Modern Tech', category: 'SaaS / Engineering', description: 'Clean Vercel/Linear dark header styling with precise spacing.', previewBg: 'from-blue-500 to-indigo-600' },
    { id: 'minimal', title: 'Minimal Notion', category: 'Minimalist', description: 'Monospaced headers with clean typography for minimalists.', previewBg: 'from-slate-700 to-slate-900' },
    { id: 'professional', title: 'Professional Corporate', category: 'Business / Enterprise', description: 'Classic 2-column layout tailored for enterprise roles.', previewBg: 'from-blue-700 to-blue-900' },
    { id: 'creative', title: 'Creative Gradient', category: 'Design / Product', description: 'Vibrant Stripe-style gradient headers with bold tags.', previewBg: 'from-purple-600 to-indigo-600' },
    { id: 'executive', title: 'Executive Leadership', category: 'C-Suite / Director', description: 'Authoritative serif typography tailored for senior leaders.', previewBg: 'from-slate-800 to-stone-900' },
    { id: 'student', title: 'Academic Student', category: 'University / Intern', description: 'Education-forward layout highlighting GPA & projects.', previewBg: 'from-sky-500 to-blue-600' },
    { id: 'fresher', title: 'Fresher Starter', category: 'Entry-Level', description: 'Emphasizes skills, hackathons, and certifications.', previewBg: 'from-emerald-500 to-teal-700' },
    { id: 'corporate', title: 'Corporate 2-Column', category: 'Executive Sidebar', description: 'Dense multi-column resume layout for extensive experience.', previewBg: 'from-indigo-800 to-slate-900' },
  ];

  const handleSelectTemplate = (id: TemplateId) => {
    updateThemeConfig({ templateId: id });
    navigate('/builder');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-bold text-xs border border-brand-200 dark:border-brand-800 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          8 Startup-Grade Design Layouts
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Choose Your Resume Template</h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
          All templates are 100% free, ATS-friendly, and customizable with custom font and accent colors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEMPLATES.map((t) => (
          <div
            key={t.id}
            className={`group rounded-2xl bg-white dark:bg-slate-800 border transition-all overflow-hidden flex flex-col justify-between ${
              themeConfig.templateId === t.id
                ? 'border-brand-500 ring-2 ring-brand-500/30 shadow-glow'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
            }`}
          >
            {/* Visual Thumbnail Card */}
            <div className={`h-40 bg-gradient-to-tr ${t.previewBg} p-4 flex flex-col justify-between text-white relative`}>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/30 backdrop-blur w-fit uppercase tracking-wider">
                {t.category}
              </span>
              <div>
                <h3 className="font-extrabold text-lg leading-tight">{t.title}</h3>
              </div>
              {themeConfig.templateId === t.id && (
                <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white text-brand-600 flex items-center justify-center font-bold shadow">
                  <Check className="w-4 h-4" />
                </span>
              )}
            </div>

            {/* Info Footer */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.description}
              </p>
              <button
                onClick={() => handleSelectTemplate(t.id)}
                className={`w-full py-2.5 rounded-xl font-extrabold text-xs transition-colors ${
                  themeConfig.templateId === t.id
                    ? 'bg-brand-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-brand-500 hover:text-white'
                }`}
              >
                {themeConfig.templateId === t.id ? 'Active Template' : 'Use Template'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
