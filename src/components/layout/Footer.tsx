import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Heart } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

export const Footer: React.FC = () => {
  const { t } = useLanguageStore();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1 Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">AI Resume PRO</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* Col 2 SEO Role Landing Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Popular Role Resumes</h4>
            <ul className="space-y-2 font-medium">
              <li><Link to="/software-engineer-resume" className="hover:text-white transition-colors">Software Engineer Resume</Link></li>
              <li><Link to="/fresher-resume" className="hover:text-white transition-colors">Fresher Resume</Link></li>
              <li><Link to="/student-resume" className="hover:text-white transition-colors">Student Resume</Link></li>
              <li><Link to="/graphic-designer-resume" className="hover:text-white transition-colors">Graphic Designer Resume</Link></li>
              <li><Link to="/teacher-resume" className="hover:text-white transition-colors">Teacher Resume</Link></li>
              <li><Link to="/nurse-resume" className="hover:text-white transition-colors">Nurse Resume</Link></li>
              <li><Link to="/accountant-resume" className="hover:text-white transition-colors">Accountant Resume</Link></li>
            </ul>
          </div>

          {/* Col 3 Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Product & Tools</h4>
            <ul className="space-y-2 font-medium">
              <li><Link to="/builder" className="hover:text-white transition-colors">Resume Builder</Link></li>
              <li><Link to="/templates" className="hover:text-white transition-colors">Resume Templates</Link></li>
              <li><Link to="/ats-checker" className="hover:text-white transition-colors">Offline ATS Checker</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Saved Resumes</Link></li>
              <li><Link to="/analytics" className="hover:text-white transition-colors">Analytics Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 4 Blog & Guides */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Career Resources</h4>
            <ul className="space-y-2 font-medium">
              <li><Link to="/blog" className="hover:text-white transition-colors">Resume Writing Guide 2026</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">How to Beat ATS Software</Link></li>
              <li><Link to="/settings" className="hover:text-white transition-colors">Settings & Backup</Link></li>
              <li><Link to="/admin" className="text-brand-400 hover:text-white transition-colors font-bold">🔒 Admin Control Panel</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>{t('copyright')}</p>
          <p className="flex items-center gap-1">
            Designed for peak career growth <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
