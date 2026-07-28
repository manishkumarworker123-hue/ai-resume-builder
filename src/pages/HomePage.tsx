import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, Layers, BarChart } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export const HomePage: React.FC = () => {
  const { t } = useLanguageStore();

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-bold text-xs border border-brand-200 dark:border-brand-800 mb-8 animate-pulse-slow">
            <Sparkles className="w-4 h-4 text-brand-500" />
            100% Free & Offline Operating Model • Zero Paid API Required
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Build <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">ATS-Friendly Resumes</span> That Land You 10x More Interviews
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('heroSubtitle')}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/builder"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-glow hover:scale-105 transition-all"
            >
              <span>{t('heroCtaStart')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/templates"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all"
            >
              {t('heroCtaTemplates')}
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur border border-slate-200 dark:border-slate-700">
              <p className="text-2xl font-black text-brand-600 dark:text-brand-400">100%</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Free & Offline</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur border border-slate-200 dark:border-slate-700">
              <p className="text-2xl font-black text-brand-600 dark:text-brand-400">8</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Design Templates</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur border border-slate-200 dark:border-slate-700">
              <p className="text-2xl font-black text-brand-600 dark:text-brand-400">0 - 100</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">ATS Checker</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur border border-slate-200 dark:border-slate-700">
              <p className="text-2xl font-black text-brand-600 dark:text-brand-400">EN / HI</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Multi-Language</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need to Stand Out
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            Engineered with modern SaaS UI aesthetics inspired by Linear, Stripe, and Vercel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
              <BarChart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Rule-Based ATS Checker</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Get an instant 0-100 score analyzing action verbs, bullet metrics, keyword density, section completion, and contact validity 100% offline.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">8 Unique Templates</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Switch seamlessly between Modern, Minimal, Professional, Creative, Executive, Student, Fresher, and Corporate layouts with custom color palettes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Multi-Format Exports</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Download clean PDF documents, plain text ATS files, standalone HTML resumes, or JSON backup files anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Target Role Samples SEO Grid */}
      <section className="bg-slate-50 dark:bg-slate-850 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Targeted Role Resume Presets
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Select your job target and load a pre-written, ATS-optimized starter resume in one click.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: 'Software Engineer', path: '/software-engineer-resume', desc: 'React, Node, Go, Microservices' },
              { title: 'Fresher / Graduate', path: '/fresher-resume', desc: 'Projects, Hackathons, Core CS' },
              { title: 'Student Resume', path: '/student-resume', desc: 'Education first, Internships' },
              { title: 'Teacher Resume', path: '/teacher-resume', desc: 'Curriculum, Mentorship' },
              { title: 'Nurse Resume', path: '/nurse-resume', desc: 'Patient Care, Healthcare' },
              { title: 'Accountant Resume', path: '/accountant-resume', desc: 'Financial Analysis, Audit' },
              { title: 'Graphic Designer', path: '/graphic-designer-resume', desc: 'UI/UX, Figma, Creative' },
              { title: 'Product Manager', path: '/builder', desc: 'Roadmaps, Metrics, Agile' },
            ].map((role) => (
              <Link
                key={role.title}
                to={role.path}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all text-left group"
              >
                <h3 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                  {role.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{role.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white text-center shadow-glow relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Land Your Dream Job?</h2>
          <p className="mt-3 text-sm text-blue-100 max-w-xl mx-auto font-medium">
            Join thousands of developers, designers, product managers, and students building resumes today.
          </p>
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-xl bg-white text-slate-900 font-extrabold text-sm hover:bg-slate-100 transition-transform active:scale-95 shadow-lg"
          >
            <span>Start Building Now Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
