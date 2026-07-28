import React from 'react';
import type { ResumeData, ThemeConfig } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories } = data;
  const primaryColor = theme.primaryColor || '#000000';

  return (
    <div className="w-full bg-white text-slate-900 p-8 sm:p-14 font-mono leading-relaxed">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-black">{personalInfo.fullName}</h1>
        <p className="text-xs uppercase font-semibold text-slate-500 mt-1">{personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] text-slate-600 border-t border-b border-slate-200 py-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>

        {personalInfo.summary && (
          <p className="mt-4 text-xs text-slate-700 leading-normal font-sans">{personalInfo.summary}</p>
        )}
      </div>

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest font-bold border-b border-black pb-1 mb-4" style={{ color: primaryColor }}>
            [ EXPERIENCE ]
          </h2>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline text-xs font-bold">
                  <span>{exp.position} // {exp.company}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}</span>
                </div>
                <ul className="mt-2 list-dash list-inside text-xs text-slate-700 font-sans space-y-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>- {h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillCategories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest font-bold border-b border-black pb-1 mb-3" style={{ color: primaryColor }}>
            [ SKILLS ]
          </h2>
          <div className="space-y-2 text-xs font-sans">
            {skillCategories.map((cat) => (
              <div key={cat.id}>
                <span className="font-bold text-slate-900 font-mono text-[11px]">{cat.categoryName}: </span>
                <span className="text-slate-700">{cat.skills.join(' • ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs uppercase tracking-widest font-bold border-b border-black pb-1 mb-3" style={{ color: primaryColor }}>
            [ EDUCATION ]
          </h2>
          <div className="space-y-2 text-xs">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold">{edu.degree}</span> in {edu.fieldOfStudy}
                  <p className="text-[11px] text-slate-600 font-sans">{edu.institution}</p>
                </div>
                <span className="text-[10px] text-slate-500">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
