import React from 'react';
import type { ResumeData, ThemeConfig } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certificates } = data;
  const primaryColor = theme.primaryColor || '#0a3071';

  return (
    <div className="w-full bg-white text-slate-900 p-8 sm:p-12 font-sans border-t-8" style={{ borderColor: primaryColor }}>
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight" style={{ color: primaryColor }}>{personalInfo.fullName}</h1>
          <p className="text-base font-semibold text-slate-600 uppercase tracking-wide mt-0.5">{personalInfo.jobTitle}</p>
        </div>
        <div className="text-xs text-right space-y-1 text-slate-600 mt-4 sm:mt-0 font-medium">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
          {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6 bg-slate-50 p-4 rounded border-l-4" style={{ borderColor: primaryColor }}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>Executive Summary</h2>
          <p className="text-xs text-slate-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* 2 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="md:col-span-2 space-y-6">
          {experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-4" style={{ color: primaryColor, borderColor: primaryColor }}>
                Work History
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-sm text-slate-900">{exp.position}</h3>
                      <span className="text-[11px] font-semibold text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 italic mb-1.5">{exp.company} | {exp.location}</p>
                    <ul className="list-disc list-outside ml-4 text-xs text-slate-600 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-3" style={{ color: primaryColor, borderColor: primaryColor }}>
                Key Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="text-xs">
                    <h3 className="font-bold text-slate-900">{proj.name}</h3>
                    <p className="text-slate-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {skillCategories.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-3" style={{ color: primaryColor, borderColor: primaryColor }}>
                Skills & Expertise
              </h2>
              <div className="space-y-3">
                {skillCategories.map((cat) => (
                  <div key={cat.id}>
                    <h4 className="text-[11px] font-bold text-slate-800 uppercase">{cat.categoryName}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{cat.skills.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-3" style={{ color: primaryColor, borderColor: primaryColor }}>
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2 text-xs">
                  <p className="font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-slate-600">{edu.institution}</p>
                  <p className="text-[10px] text-slate-400">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {certificates.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-3" style={{ color: primaryColor, borderColor: primaryColor }}>
                Certifications
              </h2>
              {certificates.map((c) => (
                <div key={c.id} className="mb-2 text-xs">
                  <p className="font-bold text-slate-900">{c.name}</p>
                  <p className="text-[11px] text-slate-500">{c.issuer} ({c.issueDate})</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
