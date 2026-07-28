import React from 'react';
import type { ResumeData, ThemeConfig } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data, theme: _theme }) => {
  const { personalInfo, experiences, education } = data;

  return (
    <div className="w-full bg-white text-slate-900 p-10 sm:p-14 font-serif leading-relaxed">
      {/* Header */}
      <div className="text-center border-b-2 border-slate-900 pb-6 mb-8">
        <h1 className="text-3xl font-extrabold uppercase tracking-widest text-slate-900">{personalInfo.fullName}</h1>
        <p className="text-sm font-sans font-bold uppercase tracking-widest text-slate-600 mt-1">{personalInfo.jobTitle}</p>
        
        <div className="flex justify-center flex-wrap gap-4 mt-3 text-xs font-sans text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-8 italic text-xs text-slate-700 text-center max-w-2xl mx-auto font-sans leading-relaxed">
          "{personalInfo.summary}"
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-sans font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-4 text-slate-900">
            Executive Leadership & Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-sans">
                  <h3 className="font-bold text-sm text-slate-900">{exp.position}</h3>
                  <span className="text-xs font-semibold text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs font-bold text-slate-700 italic">{exp.company} — {exp.location}</p>
                <ul className="mt-2 list-disc list-inside text-xs text-slate-700 font-sans space-y-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 className="text-sm font-sans font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 text-slate-900">
            Academic Background
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                <p className="text-slate-600">{edu.institution}</p>
                <span className="text-[11px] text-slate-400">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
