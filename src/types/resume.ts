export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
  summary: string;
  photoUrl?: string;
  showPhoto?: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
  description?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade?: string;
  location?: string;
  highlights?: string[];
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
  highlights: string[];
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  description: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Proficient' | 'Intermediate' | 'Basic';
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  link?: string;
  description?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  bulletPoints?: string[];
}

export interface CustomSection {
  id: string;
  sectionTitle: string;
  items: CustomSectionItem[];
}

export type SectionType = 
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certificates'
  | 'achievements'
  | 'languages'
  | 'references'
  | 'publications'
  | 'custom';

export interface ResumeData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  achievements: AchievementItem[];
  languages: LanguageItem[];
  references: ReferenceItem[];
  publications: PublicationItem[];
  interests: string[];
  hobbies: string[];
  customSections: CustomSection[];
  sectionOrder: SectionType[];
}

export type TemplateId = 
  | 'modern'
  | 'minimal'
  | 'professional'
  | 'creative'
  | 'executive'
  | 'student'
  | 'fresher'
  | 'corporate';

export interface ThemeConfig {
  templateId: TemplateId;
  primaryColor: string;
  secondaryColor?: string;
  accentColor: string;
  fontFamily: 'inter' | 'jakarta' | 'roboto' | 'merriweather' | 'playfair';
  fontSize: 'sm' | 'md' | 'lg';
  lineSpacing: 'tight' | 'normal' | 'relaxed';
  pageMargin: 'compact' | 'normal' | 'spacious';
  showIcons: boolean;
}
