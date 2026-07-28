import React from 'react';
import type { ResumeData, ThemeConfig } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const CorporateTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories } = data;
  const primaryColor = theme.primaryColor || '#1e3a8a';

  return (
    <div className="w-full bg-white text-slate-900 font-sans grid grid-cols-1 md:grid-cols-3 min-h-[900px]">
      {/* Sidebar */}
      <div className="p-6 text-white space-y-6" style={{ backgroundColor: primaryColor }}>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{personalInfo.fullName}</h1>
          <p className="text-xs font-semibold text-blue-200 uppercase mt-1">{personalInfo.jobTitle}</p>
        </div>

        {/* Contact Info */}
        <div className="text-xs space-y-2 border-t border-blue-400/40 pt-4 text-blue-100">
          {personalInfo.email && <p className="truncate">✉ {personalInfo.email}</p>}
          {personalInfo.phone && <p>📞 {personalInfo.phone}</p>}
          {personalInfo.location && <p>📍 {personalInfo.location}</p>}
          {personalInfo.linkedin && <p className="truncate">🔗 {personalInfo.linkedin}</p>}
        </div>

        {/* Skills */}
        {skillCategories.length > 0 && (
          <div className="border-t border-blue-400/40 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Skills</h3>
            <div className="space-y-2 text-xs">
              {skillCategories.map((c) => (
                <div key={c.id}>
                  <p className="font-semibold text-white">{c.categoryName}</p>
                  <p className="text-blue-200 text-[11px] mt-0.5">{c.skills.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="border-t border-blue-400/40 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="text-xs mb-2">
                <p className="font-bold text-white">{edu.degree}</p>
                <p className="text-blue-200">{edu.institution}</p>
                <p className="text-[10px] text-blue-300">{edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="md:col-span-2 p-8 space-y-6">
        {personalInfo.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1 mb-2">Profile</h2>
            <p className="text-xs text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1 mb-4">Experience</h2>
            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline text-xs">
                    <h3 className="font-bold text-slate-900 text-sm">{exp.position}</h3>
                    <span className="text-slate-500 font-semibold">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">{exp.company}</p>
                  <ul className="mt-2 list-disc list-inside text-xs text-slate-600 space-y-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
