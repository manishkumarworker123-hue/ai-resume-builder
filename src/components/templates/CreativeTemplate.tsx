import React from 'react';
import type { ResumeData, ThemeConfig } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, skillCategories } = data;
  const primaryColor = theme.primaryColor || '#9333ea';

  return (
    <div className="w-full bg-white text-slate-900 font-sans shadow-lg rounded-lg overflow-hidden">
      {/* Header Banner */}
      <div className="p-8 sm:p-10 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #4f46e5 100%)` }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{personalInfo.fullName}</h1>
            <p className="text-lg font-medium opacity-90 mt-1">{personalInfo.jobTitle}</p>
          </div>
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="w-24 h-24 rounded-full border-4 border-white/30 object-cover shadow-md" />
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-6 text-xs opacity-90 font-medium">
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="p-8 sm:p-10 space-y-6">
        {personalInfo.summary && (
          <p className="text-sm text-slate-700 leading-relaxed font-medium bg-purple-50/50 p-4 rounded-xl border border-purple-100">
            {personalInfo.summary}
          </p>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }} />
              Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-sm">{exp.position}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: primaryColor }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">{exp.company}</p>
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

        {/* Skills */}
        {skillCategories.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }} />
              Superpowers & Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillCategories.flatMap(c => c.skills).map((skill, idx) => (
                <span key={idx} className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 shadow-sm">
                  ⚡ {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
