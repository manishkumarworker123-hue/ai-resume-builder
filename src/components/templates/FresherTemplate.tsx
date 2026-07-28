import React from 'react';
import type { ResumeData, ThemeConfig } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const FresherTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, education, skillCategories, projects } = data;
  const primaryColor = theme.primaryColor || '#059669';

  return (
    <div className="w-full bg-white text-slate-900 p-8 sm:p-12 font-sans">
      <div className="border-l-4 pl-4 pb-2 mb-6" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{personalInfo.fullName}</h1>
        <p className="text-sm font-bold uppercase tracking-wider mt-0.5" style={{ color: primaryColor }}>{personalInfo.jobTitle}</p>
        <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-600 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-6 text-xs text-slate-700 leading-relaxed bg-emerald-50/40 p-3 rounded border border-emerald-100">
          {personalInfo.summary}
        </div>
      )}

      {/* Skills Showcase */}
      {skillCategories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider mb-3 text-emerald-800 border-b pb-1">
            Core Competencies & Tools
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skillCategories.flatMap(c => c.skills).map((skill, sIdx) => (
              <span key={sIdx} className="text-xs px-2.5 py-1 rounded bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider mb-3 text-emerald-800 border-b pb-1">
            Projects & Hackathons
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-slate-50 p-3 rounded">
                <h3 className="font-bold text-xs text-slate-900">{proj.name}</h3>
                <p className="text-xs text-slate-600 mt-0.5">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider mb-2 text-emerald-800 border-b pb-1">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="text-xs mb-2">
              <div className="flex justify-between font-bold">
                <span>{edu.degree}</span>
                <span className="text-slate-500 font-normal">{edu.startDate} – {edu.endDate}</span>
              </div>
              <p className="text-slate-600">{edu.institution} {edu.grade ? `(${edu.grade})` : ''}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
