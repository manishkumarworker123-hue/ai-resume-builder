import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store/useResumeStore';
import { Sparkles, ArrowRight } from 'lucide-react';

interface RoleConfig {
  title: string;
  subtitle: string;
  presetKey: string;
  skills: string[];
  keySections: string[];
}

const ROLE_MAP: Record<string, RoleConfig> = {
  'software-engineer-resume': {
    title: 'Software Engineer Resume Builder & Examples 2026',
    subtitle: 'Build a high-impact tech resume with pre-formatted sections for React, Node, Go, Microservices, and System Architecture.',
    presetKey: 'software-engineer',
    skills: ['TypeScript', 'React.js', 'Go (Golang)', 'Node.js', 'System Architecture', 'AWS', 'Docker'],
    keySections: ['Technical Skills Matrix', 'Work History & Metrics', 'Open Source Projects', 'Certifications']
  },
  'fresher-resume': {
    title: 'Fresher Resume Builder & Graduate Examples',
    subtitle: 'Designed for recent graduates to showcase academic projects, hackathon wins, internship highlights, and core skills.',
    presetKey: 'fresher-resume',
    skills: ['Java', 'Python', 'Web Development', 'Git', 'Data Structures', 'Problem Solving'],
    keySections: ['Academic Projects', 'Hackathons & Contests', 'Education & CGPA', 'Skills']
  },
  'student-resume': {
    title: 'Student Resume Builder for Internships & College',
    subtitle: 'Highlight your GPA, university coursework, leadership activities, and extracurricular accomplishments.',
    presetKey: 'fresher-resume',
    skills: ['Communication', 'Research', 'Python', 'Excel', 'Leadership'],
    keySections: ['Education First', 'Coursework', 'Club Leadership', 'Skills']
  },
  'teacher-resume': {
    title: 'Teacher & Educator Resume Builder',
    subtitle: 'Format your teaching credentials, lesson planning, student performance outcomes, and classroom management.',
    presetKey: 'product-manager',
    skills: ['Curriculum Design', 'Classroom Management', 'Student Mentorship', 'Educational Tech'],
    keySections: ['Teaching Experience', 'Education & Certification', 'Key Achievements']
  },
  'nurse-resume': {
    title: 'Registered Nurse (RN) & Healthcare Resume Builder',
    subtitle: 'ATS-optimized templates for healthcare professionals, clinical rotations, patient care, and BLS/ACLS licenses.',
    presetKey: 'product-manager',
    skills: ['Patient Care', 'BLS / ACLS', 'Clinical Assessment', 'EMR Systems', 'Triage'],
    keySections: ['Clinical Experience', 'Licenses & Certifications', 'Education']
  },
  'accountant-resume': {
    title: 'Accountant & Finance Resume Builder',
    subtitle: 'Structure your financial auditing, CPA credentials, tax compliance, and budget reporting.',
    presetKey: 'product-manager',
    skills: ['Financial Auditing', 'Tax Compliance', 'Excel (VLOOKUP)', 'QuickBooks', 'SAP'],
    keySections: ['Accounting Experience', 'CPA Certification', 'Core Competencies']
  },
  'graphic-designer-resume': {
    title: 'Graphic Designer & UI/UX Resume Builder',
    subtitle: 'Showcase your creative portfolio, Figma mastery, brand design projects, and typography skills.',
    presetKey: 'software-engineer',
    skills: ['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Wireframing', 'Typography'],
    keySections: ['Portfolio Links', 'Design Experience', 'Software Proficiency']
  }
};

export const SEORolePage: React.FC = () => {
  const { roleSlug } = useParams<{ roleSlug: string }>();
  const navigate = useNavigate();
  const { loadSamplePreset } = useResumeStore();

  const config = ROLE_MAP[roleSlug || ''] || ROLE_MAP['software-engineer-resume'];

  const handleUsePreset = () => {
    loadSamplePreset(config.presetKey);
    navigate('/builder');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-tr from-brand-950 via-slate-900 to-brand-900 text-white p-10 sm:p-14 rounded-3xl shadow-xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 text-brand-300 font-bold text-xs border border-brand-500/30">
          <Sparkles className="w-4 h-4 text-brand-400" />
          Targeted Role Resume Preset
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl leading-tight">
          {config.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-medium leading-relaxed">
          {config.subtitle}
        </p>

        <div className="pt-4 flex flex-wrap gap-4">
          <button
            onClick={handleUsePreset}
            className="px-8 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-glow active:scale-95 transition-all"
          >
            <span>Create {config.title.split(' ')[0]} Resume Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Key Skills & Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Recommended Skills to Include</h2>
          <div className="flex flex-wrap gap-2">
            {config.skills.map((s) => (
              <span key={s} className="px-3 py-1 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold text-xs border border-brand-200 dark:border-brand-800">
                ✓ {s}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Recommended Section Order</h2>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
            {config.keySections.map((sec, idx) => (
              <li key={sec} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </span>
                <span>{sec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
