import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeData, ThemeConfig, SectionType } from '../types/resume';
import { sampleResumes } from '../services/sampleResumes';

interface HistoryState {
  past: ResumeData[];
  future: ResumeData[];
}

interface ResumeState {
  resumes: Record<string, ResumeData>;
  activeResumeId: string;
  themeConfig: ThemeConfig;
  history: HistoryState;
  
  // Active Resume Actions
  getActiveResume: () => ResumeData;
  setActiveResumeId: (id: string) => void;
  createNewResume: (title?: string) => string;
  loadSamplePreset: (presetKey: string) => void;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateResumeTitle: (title: string) => void;
  
  // Section Reordering
  updateSectionOrder: (newOrder: SectionType[]) => void;
  
  // Array Manipulations
  addExperience: () => void;
  updateExperience: (id: string, item: Partial<ResumeData['experiences'][0]>) => void;
  deleteExperience: (id: string) => void;
  reorderExperiences: (startIndex: number, endIndex: number) => void;
  
  addEducation: () => void;
  updateEducation: (id: string, item: Partial<ResumeData['education'][0]>) => void;
  deleteEducation: (id: string) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;
  
  addSkillCategory: () => void;
  updateSkillCategory: (id: string, categoryName: string, skills: string[]) => void;
  deleteSkillCategory: (id: string) => void;
  reorderSkillCategories: (startIndex: number, endIndex: number) => void;
  
  addProject: () => void;
  updateProject: (id: string, item: Partial<ResumeData['projects'][0]>) => void;
  deleteProject: (id: string) => void;
  
  addCertificate: () => void;
  updateCertificate: (id: string, item: Partial<ResumeData['certificates'][0]>) => void;
  deleteCertificate: (id: string) => void;

  addAchievement: () => void;
  updateAchievement: (id: string, item: Partial<ResumeData['achievements'][0]>) => void;
  deleteAchievement: (id: string) => void;

  addLanguage: (language: string, proficiency: ResumeData['languages'][0]['proficiency']) => void;
  deleteLanguage: (id: string) => void;
  
  updateInterests: (interests: string[]) => void;
  updateHobbies: (hobbies: string[]) => void;

  // Custom Sections
  addCustomSection: (title: string) => void;
  deleteCustomSection: (sectionId: string) => void;
  addCustomItem: (sectionId: string) => void;
  updateCustomItem: (sectionId: string, itemId: string, item: Partial<ResumeData['customSections'][0]['items'][0]>) => void;
  deleteCustomItem: (sectionId: string, itemId: string) => void;

  // Full Replacement / Import
  importResume: (data: ResumeData) => void;
  deleteResume: (id: string) => void;

  // Theme & Styling
  updateThemeConfig: (config: Partial<ThemeConfig>) => void;

  // Undo / Redo
  undo: () => void;
  redo: () => void;
}

const defaultThemeConfig: ThemeConfig = {
  templateId: 'modern',
  primaryColor: '#0c70f2',
  accentColor: '#3691fc',
  fontFamily: 'inter',
  fontSize: 'md',
  lineSpacing: 'normal',
  pageMargin: 'normal',
  showIcons: true,
};

const initialSample = sampleResumes['software-engineer'];

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumes: {
        [initialSample.id]: initialSample,
      },
      activeResumeId: initialSample.id,
      themeConfig: defaultThemeConfig,
      history: { past: [], future: [] },

      getActiveResume: () => {
        const { resumes, activeResumeId } = get();
        return resumes[activeResumeId] || initialSample;
      },

      setActiveResumeId: (id: string) => {
        if (get().resumes[id]) {
          set({ activeResumeId: id });
        }
      },

      createNewResume: (title = 'Untitled Resume') => {
        const id = 'resume-' + Date.now();
        const newResume: ResumeData = {
          id,
          title,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          personalInfo: {
            fullName: 'Your Name',
            jobTitle: 'Professional Title',
            email: 'email@domain.com',
            phone: '+1 (555) 000-0000',
            location: 'City, Country',
            summary: 'A concise professional summary highlighting your key background, strengths, and career goals.',
            showPhoto: false,
          },
          experiences: [],
          education: [],
          skillCategories: [
            { id: 'sk-new-1', categoryName: 'Core Skills', skills: ['Problem Solving', 'Teamwork', 'Communication'] }
          ],
          projects: [],
          certificates: [],
          achievements: [],
          languages: [{ id: 'lang-1', language: 'English', proficiency: 'Native' }],
          references: [],
          publications: [],
          interests: [],
          hobbies: [],
          customSections: [],
          sectionOrder: ['personal', 'experience', 'education', 'skills', 'projects', 'certificates'],
        };

        set((state) => ({
          resumes: { ...state.resumes, [id]: newResume },
          activeResumeId: id,
        }));
        return id;
      },

      loadSamplePreset: (presetKey: string) => {
        const preset = sampleResumes[presetKey];
        if (preset) {
          const newId = 'preset-' + Date.now();
          const cloneData: ResumeData = {
            ...preset,
            id: newId,
            title: `${preset.title} (Copy)`,
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({
            resumes: { ...state.resumes, [newId]: cloneData },
            activeResumeId: newId,
          }));
        }
      },

      updatePersonalInfo: (info) => {
        const active = get().getActiveResume();
        const updated: ResumeData = {
          ...active,
          updatedAt: new Date().toISOString(),
          personalInfo: { ...active.personalInfo, ...info },
        };
        set((state) => ({
          resumes: { ...state.resumes, [active.id]: updated },
        }));
      },

      updateResumeTitle: (title: string) => {
        const active = get().getActiveResume();
        const updated: ResumeData = { ...active, title, updatedAt: new Date().toISOString() };
        set((state) => ({
          resumes: { ...state.resumes, [active.id]: updated },
        }));
      },

      updateSectionOrder: (newOrder: SectionType[]) => {
        const active = get().getActiveResume();
        const updated: ResumeData = { ...active, sectionOrder: newOrder, updatedAt: new Date().toISOString() };
        set((state) => ({
          resumes: { ...state.resumes, [active.id]: updated },
        }));
      },

      // Experiences
      addExperience: () => {
        const active = get().getActiveResume();
        const newItem = {
          id: 'exp-' + Date.now(),
          company: 'Company Name',
          position: 'Job Title',
          startDate: '2023-01',
          endDate: 'Present',
          current: true,
          highlights: ['Accomplished key metric X by implementing initiative Y.'],
        };
        const updated: ResumeData = {
          ...active,
          experiences: [newItem, ...active.experiences],
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      updateExperience: (id, item) => {
        const active = get().getActiveResume();
        const updatedExperiences = active.experiences.map((exp) =>
          exp.id === id ? { ...exp, ...item } : exp
        );
        const updated: ResumeData = { ...active, experiences: updatedExperiences, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      deleteExperience: (id) => {
        const active = get().getActiveResume();
        const updated: ResumeData = {
          ...active,
          experiences: active.experiences.filter((exp) => exp.id !== id),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      reorderExperiences: (startIndex, endIndex) => {
        const active = get().getActiveResume();
        const result = Array.from(active.experiences);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        const updated: ResumeData = { ...active, experiences: result, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      // Education
      addEducation: () => {
        const active = get().getActiveResume();
        const newItem = {
          id: 'edu-' + Date.now(),
          institution: 'University Name',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          startDate: '2020-09',
          endDate: '2024-05',
        };
        const updated: ResumeData = { ...active, education: [newItem, ...active.education], updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      updateEducation: (id, item) => {
        const active = get().getActiveResume();
        const updatedEducation = active.education.map((edu) =>
          edu.id === id ? { ...edu, ...item } : edu
        );
        const updated: ResumeData = { ...active, education: updatedEducation, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      deleteEducation: (id) => {
        const active = get().getActiveResume();
        const updated: ResumeData = {
          ...active,
          education: active.education.filter((edu) => edu.id !== id),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      reorderEducation: (startIndex, endIndex) => {
        const active = get().getActiveResume();
        const result = Array.from(active.education);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        const updated: ResumeData = { ...active, education: result, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      // Skills
      addSkillCategory: () => {
        const active = get().getActiveResume();
        const newCat = {
          id: 'skcat-' + Date.now(),
          categoryName: 'Technical Skills',
          skills: ['Skill 1', 'Skill 2'],
        };
        const updated: ResumeData = { ...active, skillCategories: [...active.skillCategories, newCat], updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      updateSkillCategory: (id, categoryName, skills) => {
        const active = get().getActiveResume();
        const updatedCats = active.skillCategories.map((cat) =>
          cat.id === id ? { ...cat, categoryName, skills } : cat
        );
        const updated: ResumeData = { ...active, skillCategories: updatedCats, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      deleteSkillCategory: (id) => {
        const active = get().getActiveResume();
        const updated: ResumeData = {
          ...active,
          skillCategories: active.skillCategories.filter((cat) => cat.id !== id),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      reorderSkillCategories: (startIndex, endIndex) => {
        const active = get().getActiveResume();
        const result = Array.from(active.skillCategories);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        const updated: ResumeData = { ...active, skillCategories: result, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      // Projects
      addProject: () => {
        const active = get().getActiveResume();
        const newProj = {
          id: 'proj-' + Date.now(),
          name: 'Project Title',
          description: 'Short impactful description of the project objective.',
          technologies: ['React', 'TypeScript', 'Node.js'],
          highlights: ['Achieved 50% performance speedup.'],
        };
        const updated: ResumeData = { ...active, projects: [newProj, ...active.projects], updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      updateProject: (id, item) => {
        const active = get().getActiveResume();
        const updatedProjects = active.projects.map((p) => (p.id === id ? { ...p, ...item } : p));
        const updated: ResumeData = { ...active, projects: updatedProjects, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      deleteProject: (id) => {
        const active = get().getActiveResume();
        const updated: ResumeData = {
          ...active,
          projects: active.projects.filter((p) => p.id !== id),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      // Certificates
      addCertificate: () => {
        const active = get().getActiveResume();
        const newCert = {
          id: 'cert-' + Date.now(),
          name: 'Certification Title',
          issuer: 'Issuing Organization',
          issueDate: '2023-01',
        };
        const updated: ResumeData = { ...active, certificates: [newCert, ...active.certificates], updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      updateCertificate: (id, item) => {
        const active = get().getActiveResume();
        const updatedCert = active.certificates.map((c) => (c.id === id ? { ...c, ...item } : c));
        const updated: ResumeData = { ...active, certificates: updatedCert, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      deleteCertificate: (id) => {
        const active = get().getActiveResume();
        const updated: ResumeData = {
          ...active,
          certificates: active.certificates.filter((c) => c.id !== id),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      // Achievements
      addAchievement: () => {
        const active = get().getActiveResume();
        const newAch = {
          id: 'ach-' + Date.now(),
          title: 'Achievement Title',
          description: 'Detailed description of the honor, award, or competition won.',
        };
        const updated: ResumeData = { ...active, achievements: [newAch, ...active.achievements], updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      updateAchievement: (id, item) => {
        const active = get().getActiveResume();
        const updatedAch = active.achievements.map((a) => (a.id === id ? { ...a, ...item } : a));
        const updated: ResumeData = { ...active, achievements: updatedAch, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      deleteAchievement: (id) => {
        const active = get().getActiveResume();
        const updated: ResumeData = {
          ...active,
          achievements: active.achievements.filter((a) => a.id !== id),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      // Languages
      addLanguage: (language, proficiency) => {
        const active = get().getActiveResume();
        const newLang = { id: 'lang-' + Date.now(), language, proficiency };
        const updated: ResumeData = { ...active, languages: [...active.languages, newLang], updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      deleteLanguage: (id) => {
        const active = get().getActiveResume();
        const updated: ResumeData = {
          ...active,
          languages: active.languages.filter((l) => l.id !== id),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      updateInterests: (interests) => {
        const active = get().getActiveResume();
        const updated: ResumeData = { ...active, interests, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      updateHobbies: (hobbies) => {
        const active = get().getActiveResume();
        const updated: ResumeData = { ...active, hobbies, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      // Custom Sections
      addCustomSection: (title) => {
        const active = get().getActiveResume();
        const newSec = {
          id: 'custom-' + Date.now(),
          sectionTitle: title || 'Custom Section',
          items: [],
        };
        const updated: ResumeData = {
          ...active,
          customSections: [...active.customSections, newSec],
          sectionOrder: [...active.sectionOrder, 'custom' as SectionType],
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      deleteCustomSection: (sectionId) => {
        const active = get().getActiveResume();
        const updated: ResumeData = {
          ...active,
          customSections: active.customSections.filter((cs) => cs.id !== sectionId),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      addCustomItem: (sectionId) => {
        const active = get().getActiveResume();
        const updatedCustoms = active.customSections.map((cs) => {
          if (cs.id === sectionId) {
            return {
              ...cs,
              items: [
                ...cs.items,
                { id: 'citem-' + Date.now(), title: 'Item Title', description: 'Item detail or description.' },
              ],
            };
          }
          return cs;
        });
        const updated: ResumeData = { ...active, customSections: updatedCustoms, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      updateCustomItem: (sectionId, itemId, item) => {
        const active = get().getActiveResume();
        const updatedCustoms = active.customSections.map((cs) => {
          if (cs.id === sectionId) {
            return {
              ...cs,
              items: cs.items.map((it) => (it.id === itemId ? { ...it, ...item } : it)),
            };
          }
          return cs;
        });
        const updated: ResumeData = { ...active, customSections: updatedCustoms, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      deleteCustomItem: (sectionId, itemId) => {
        const active = get().getActiveResume();
        const updatedCustoms = active.customSections.map((cs) => {
          if (cs.id === sectionId) {
            return {
              ...cs,
              items: cs.items.filter((it) => it.id !== itemId),
            };
          }
          return cs;
        });
        const updated: ResumeData = { ...active, customSections: updatedCustoms, updatedAt: new Date().toISOString() };
        set((state) => ({ resumes: { ...state.resumes, [active.id]: updated } }));
      },

      importResume: (data) => {
        const newId = data.id || 'imported-' + Date.now();
        const importedData: ResumeData = {
          ...data,
          id: newId,
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          resumes: { ...state.resumes, [newId]: importedData },
          activeResumeId: newId,
        }));
      },

      deleteResume: (id) => {
        const { resumes, activeResumeId } = get();
        const keys = Object.keys(resumes);
        if (keys.length <= 1) return;

        const newResumes = { ...resumes };
        delete newResumes[id];
        const nextId = activeResumeId === id ? Object.keys(newResumes)[0] : activeResumeId;

        set({ resumes: newResumes, activeResumeId: nextId });
      },

      updateThemeConfig: (config) => {
        set((state) => ({
          themeConfig: { ...state.themeConfig, ...config },
        }));
      },

      undo: () => {},
      redo: () => {},
    }),
    {
      name: 'ai-resume-builder-storage',
    }
  )
);
