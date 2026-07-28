import React from 'react';
import type { ResumeData, ThemeConfig } from '../../types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certificates } = data;
  const primaryColor = theme.primaryColor || '#0c70f2';

  return (
    <div className="w-full bg-white text-slate-800 p-8 sm:p-12 shadow-sm rounded-sm font-sans" style={{ fontSize: theme.fontSize === 'sm' ? '13px' : theme.fontSize === 'lg' ? '16px' : '14px' }}>
      {/* Header */}
      <div className="border-b-2 pb-6 mb-6" style={{ borderColor: primaryColor }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{personalInfo.fullName}</h1>
            <p className="text-lg font-semibold mt-1" style={{ color: primaryColor }}>{personalInfo.jobTitle}</p>
          </div>
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="w-20 h-20 rounded-full object-cover border-2" style={{ borderColor: primaryColor }} />
          )}
        </div>

        <p className="mt-4 text-slate-600 leading-relaxed text-sm">{personalInfo.summary}</p>

        {/* Contact Strip */}
        <div className="flex flex-wrap gap-4 mt-4 text-xs font-medium text-slate-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" style={{ color: primaryColor }} />{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" style={{ color: primaryColor }} />{personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />{personalInfo.location}</span>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline"><Globe className="w-3.5 h-3.5" style={{ color: primaryColor }} />Portfolio</a>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="space-y-6">
        {/* Experience Section */}
        {experiences.length > 0 && (
          <div>
            <h2 className="text-sm uppercase tracking-wider font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-4 py-0.5" style={{ borderColor: '#e2e8f0' }}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="font-bold text-slate-900 text-base">{exp.position}</h3>
                    <span className="text-xs font-semibold text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-700">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
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

        {/* Skills Section */}
        {skillCategories.length > 0 && (
          <div>
            <h2 className="text-sm uppercase tracking-wider font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              Technical & Core Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="bg-slate-50 p-3 rounded border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 mb-1.5">{cat.categoryName}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-xs px-2 py-0.5 rounded font-medium bg-white border border-slate-200 text-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-sm uppercase tracking-wider font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-50/70 p-3 rounded border border-slate-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 text-sm">{proj.name}</h3>
                    <div className="flex gap-2">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-200/80 font-mono text-slate-700 px-1.5 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {education.length > 0 && (
            <div>
              <h2 className="text-sm uppercase tracking-wider font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <h3 className="font-bold text-slate-900 text-xs">{edu.degree}</h3>
                  <p className="text-xs text-slate-600">{edu.institution}</p>
                  <span className="text-[11px] text-slate-500">{edu.startDate} – {edu.endDate} {edu.grade ? `(${edu.grade})` : ''}</span>
                </div>
              ))}
            </div>
          )}

          {certificates.length > 0 && (
            <div>
              <h2 className="text-sm uppercase tracking-wider font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                Certifications
              </h2>
              {certificates.map((cert) => (
                <div key={cert.id} className="mb-2">
                  <h3 className="font-bold text-slate-900 text-xs">{cert.name}</h3>
                  <p className="text-xs text-slate-600">{cert.issuer} ({cert.issueDate})</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
