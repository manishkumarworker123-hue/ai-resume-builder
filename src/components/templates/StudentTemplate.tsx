import React from 'react';
import type { ResumeData, ThemeConfig } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const StudentTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, education, projects, skillCategories } = data;
  const primaryColor = theme.primaryColor || '#2563eb';

  return (
    <div className="w-full bg-white text-slate-900 p-8 sm:p-12 font-sans">
      <div className="text-center border-b pb-6 mb-6">
        <h1 className="text-3xl font-extrabold" style={{ color: primaryColor }}>{personalInfo.fullName}</h1>
        <p className="text-sm font-semibold text-slate-600 mt-1">{personalInfo.jobTitle}</p>
        <p className="text-xs text-slate-500 mt-2">
          {personalInfo.email} • {personalInfo.phone} • {personalInfo.location}
        </p>
      </div>

      {/* Education First for Students */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider mb-2 border-b-2 pb-1" style={{ color: primaryColor, borderColor: primaryColor }}>
            Education & Academic Performance
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm text-slate-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                <span className="text-xs text-slate-500 font-medium">{edu.startDate} – {edu.endDate}</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">{edu.institution} {edu.grade ? `| GPA: ${edu.grade}` : ''}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider mb-2 border-b-2 pb-1" style={{ color: primaryColor, borderColor: primaryColor }}>
            Academic & Personal Projects
          </h2>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id}>
                <h3 className="font-bold text-xs text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-600">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillCategories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider mb-2 border-b-2 pb-1" style={{ color: primaryColor, borderColor: primaryColor }}>
            Technical & Soft Skills
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {skillCategories.map((c) => (
              <div key={c.id}>
                <span className="font-bold text-slate-800">{c.categoryName}: </span>
                <span className="text-slate-600">{c.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
