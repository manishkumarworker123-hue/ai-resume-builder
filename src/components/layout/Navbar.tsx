import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, LayoutDashboard, Sparkles, BookOpen, BarChart3, Languages, Sun, Moon, Download, Menu, X } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useResumeStore } from '../../store/useResumeStore';
import { exportToPDF, exportToJSON, exportToTXT, exportToHTML } from '../../services/exporter';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguageStore();
  const { getActiveResume, themeConfig } = useResumeStore();
  const { recordDownload } = useAnalyticsStore();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeResume = getActiveResume();

  const handleExportPDF = async () => {
    await exportToPDF('resume-preview-container', `${activeResume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    recordDownload(activeResume.title, 'PDF', themeConfig.templateId);
    setShowExportMenu(false);
  };

  const handleExportJSON = () => {
    exportToJSON(activeResume, `${activeResume.title}.json`);
    recordDownload(activeResume.title, 'JSON', themeConfig.templateId);
    setShowExportMenu(false);
  };

  const handleExportTXT = () => {
    exportToTXT(activeResume, `${activeResume.title}.txt`);
    recordDownload(activeResume.title, 'TXT', themeConfig.templateId);
    setShowExportMenu(false);
  };

  const handleExportHTML = () => {
    exportToHTML('resume-preview-container', `${activeResume.title}.html`);
    recordDownload(activeResume.title, 'HTML', themeConfig.templateId);
    setShowExportMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
            <FileText className="w-5.5 h-5.5" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              AI Resume <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold border border-brand-500/20">PRO</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/builder"
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              location.pathname === '/builder'
                ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-brand-500" />
            {t('navBuilder')}
          </Link>

          <Link
            to="/templates"
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              location.pathname === '/templates'
                ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t('navTemplates')}
          </Link>

          <Link
            to="/ats-checker"
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              location.pathname === '/ats-checker'
                ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t('navATSChecker')}
          </Link>

          <Link
            to="/dashboard"
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              location.pathname === '/dashboard'
                ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            {t('navDashboard')}
          </Link>

          <Link
            to="/blog"
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              location.pathname.startsWith('/blog')
                ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {t('navBlog')}
          </Link>

          <Link
            to="/analytics"
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              location.pathname === '/analytics'
                ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            {t('navAnalytics')}
          </Link>
        </nav>

        {/* Right Tools (Language, Dark Mode, Export Button) */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="p-2 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            title="Switch Language"
          >
            <Languages className="w-4 h-4 text-brand-500" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(prev => !prev)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Download / Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(prev => !prev)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-glow transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{t('btnExport')}</span>
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
                <button
                  onClick={handleExportPDF}
                  className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-700 flex items-center justify-between"
                >
                  <span>PDF Document</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 font-bold">Standard</span>
                </button>
                <button
                  onClick={handleExportTXT}
                  className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-700 flex items-center justify-between"
                >
                  <span>Plain Text (.txt)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 font-bold">ATS Raw</span>
                </button>
                <button
                  onClick={handleExportHTML}
                  className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-700"
                >
                  Standalone HTML (.html)
                </button>
                <button
                  onClick={handleExportJSON}
                  className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-700"
                >
                  JSON Backup (.json)
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-2">
          <Link to="/builder" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">{t('navBuilder')}</Link>
          <Link to="/templates" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">{t('navTemplates')}</Link>
          <Link to="/ats-checker" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">{t('navATSChecker')}</Link>
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">{t('navDashboard')}</Link>
          <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">{t('navBlog')}</Link>
          <Link to="/analytics" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">{t('navAnalytics')}</Link>
        </div>
      )}
    </header>
  );
};
