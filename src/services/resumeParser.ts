import mammoth from 'mammoth';
import type { ResumeData } from '../types/resume';

export async function parseResumeFile(file: File): Promise<Partial<ResumeData>> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.json')) {
    const text = await file.text();
    try {
      const parsed = JSON.parse(text);
      if (parsed.personalInfo) {
        return parsed as ResumeData;
      }
    } catch {
      throw new Error('Invalid JSON resume format.');
    }
  }

  let extractedText = '';

  if (fileName.endsWith('.docx')) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    extractedText = result.value;
  } else if (fileName.endsWith('.txt')) {
    extractedText = await file.text();
  } else if (fileName.endsWith('.pdf')) {
    extractedText = await file.text();
  } else {
    throw new Error('Unsupported file format. Please upload .docx, .json, or .txt file.');
  }

  return parseTextToResumeData(extractedText, file.name);
}

function parseTextToResumeData(text: string, originalFileName: string): Partial<ResumeData> {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  let name = lines[0] || 'Imported Candidate';
  if (name.length > 40) name = 'Imported Candidate';

  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const linkedinMatch = text.match(/https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/);

  const skillsFound: string[] = [];
  const commonTech = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'SQL', 'HTML', 'CSS', 'Docker', 'AWS', 'Git'];
  commonTech.forEach(tech => {
    if (new RegExp(`\\b${tech}\\b`, 'i').test(text)) {
      skillsFound.push(tech);
    }
  });

  return {
    title: `Imported - ${originalFileName}`,
    personalInfo: {
      fullName: name,
      jobTitle: 'Professional',
      email: emailMatch ? emailMatch[0] : 'email@example.com',
      phone: phoneMatch ? phoneMatch[0] : '',
      location: 'City, Country',
      summary: lines.slice(1, 4).join(' ').substring(0, 300) || 'Extracted summary from imported document.',
      linkedin: linkedinMatch ? linkedinMatch[0] : '',
      showPhoto: false,
    },
    skillCategories: [
      {
        id: 'imported-sk-1',
        categoryName: 'Extracted Skills',
        skills: skillsFound.length > 0 ? skillsFound : ['Management', 'Communication', 'Problem Solving'],
      }
    ],
    experiences: [
      {
        id: 'imp-exp-1',
        company: 'Previous Company',
        position: 'Professional Role',
        startDate: '2022-01',
        endDate: 'Present',
        current: true,
        highlights: [
          lines.find(l => l.length > 30) || 'Extracted work highlight statement from resume document.'
        ]
      }
    ],
    education: [],
    projects: [],
    certificates: [],
    achievements: [],
    languages: [{ id: 'lang-1', language: 'English', proficiency: 'Fluent' }],
    references: [],
    publications: [],
    interests: [],
    hobbies: [],
    customSections: [],
    sectionOrder: ['personal', 'experience', 'education', 'skills'],
  };
}
