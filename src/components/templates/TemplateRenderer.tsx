import React from 'react';
import type { ResumeData, ThemeConfig } from '../../types/resume';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { StudentTemplate } from './StudentTemplate';
import { FresherTemplate } from './FresherTemplate';
import { CorporateTemplate } from './CorporateTemplate';

interface TemplateRendererProps {
  data: ResumeData;
  theme: ThemeConfig;
  containerId?: string;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data, theme, containerId = 'resume-preview-container' }) => {
  const getFontFamilyClass = (font: ThemeConfig['fontFamily']) => {
    switch (font) {
      case 'jakarta': return 'font-sans';
      case 'roboto': return 'font-sans';
      case 'merriweather': return 'font-serif';
      case 'playfair': return 'font-serif';
      default: return 'font-sans';
    }
  };

  const renderTemplate = () => {
    switch (theme.templateId) {
      case 'minimal':
        return <MinimalTemplate data={data} theme={theme} />;
      case 'professional':
        return <ProfessionalTemplate data={data} theme={theme} />;
      case 'creative':
        return <CreativeTemplate data={data} theme={theme} />;
      case 'executive':
        return <ExecutiveTemplate data={data} theme={theme} />;
      case 'student':
        return <StudentTemplate data={data} theme={theme} />;
      case 'fresher':
        return <FresherTemplate data={data} theme={theme} />;
      case 'corporate':
        return <CorporateTemplate data={data} theme={theme} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} theme={theme} />;
    }
  };

  return (
    <div id={containerId} className={`w-full max-w-[800px] mx-auto transition-all ${getFontFamilyClass(theme.fontFamily)}`}>
      {renderTemplate()}
    </div>
  );
};
