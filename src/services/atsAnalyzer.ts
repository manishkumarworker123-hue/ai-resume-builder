import type { ResumeData } from '../types/resume';
import type { ATSCheckResult, ATSCategoryScore } from '../types/ats';

const ACTION_VERBS = [
  'spearheaded', 'engineered', 'scaled', 'optimized', 'architected', 'managed',
  'led', 'developed', 'reduced', 'accelerated', 'launched', 'increased',
  'built', 'executed', 'implemented', 'deployed', 'mentored', 'automated',
  'transformed', 'streamlined', 'designed', 'orchestrated', 'pioneered',
  'overhauled', 'boosted', 'curated', 'expanded', 'navigated', 'integrated'
];

const WEAK_PHRASES = [
  'responsible for', 'worked on', 'helped with', 'duties included',
  'assisted in', 'handled', 'was involved in', 'tasked with'
];

export function analyzeATSScore(resume: ResumeData, targetJobDescription: string = ''): ATSCheckResult {
  const suggestions: { category: string; text: string; priority: 'high' | 'medium' | 'low' }[] = [];

  // --- 1. Contact Information Score ---
  const { fullName, email, phone, location, jobTitle, summary, linkedin, github, website } = resume.personalInfo;
  let contactScoreVal = 0;
  const contactFeedback: string[] = [];

  if (fullName && fullName.trim().length > 2) contactScoreVal += 20;
  else suggestions.push({ category: 'Contact Info', text: 'Add your full legal name to the header.', priority: 'high' });

  if (email && email.includes('@') && email.includes('.')) contactScoreVal += 20;
  else suggestions.push({ category: 'Contact Info', text: 'Provide a valid professional email address.', priority: 'high' });

  if (phone && phone.trim().length >= 8) contactScoreVal += 20;
  else suggestions.push({ category: 'Contact Info', text: 'Include a direct phone number for recruiters.', priority: 'high' });

  if (location && location.trim().length > 2) contactScoreVal += 20;
  else suggestions.push({ category: 'Contact Info', text: 'Add your current City & State/Country.', priority: 'medium' });

  if (linkedin || github || website) {
    contactScoreVal += 20;
  } else {
    suggestions.push({ category: 'Contact Info', text: 'Add a LinkedIn profile or GitHub link to increase recruiter trust.', priority: 'medium' });
  }

  const contactScore: ATSCategoryScore = {
    name: 'Contact & Links',
    score: Math.min(100, contactScoreVal),
    weight: 0.15,
    status: contactScoreVal >= 80 ? 'excellent' : contactScoreVal >= 60 ? 'good' : 'critical',
    feedback: contactFeedback
  };

  // --- 2. Sections Completeness ---
  let sectionsScoreVal = 0;
  if (jobTitle && jobTitle.length > 3) sectionsScoreVal += 20;
  else suggestions.push({ category: 'Header', text: 'Specify a clear Target Job Title.', priority: 'high' });

  if (summary && summary.trim().length > 80) sectionsScoreVal += 20;
  else if (summary && summary.trim().length > 0) sectionsScoreVal += 10;
  else suggestions.push({ category: 'Summary', text: 'Write a 3-4 sentence professional summary summarizing experience & key wins.', priority: 'high' });

  if (resume.experiences.length > 0) sectionsScoreVal += 20;
  else suggestions.push({ category: 'Experience', text: 'Add at least one work experience or internship entry.', priority: 'high' });

  if (resume.education.length > 0) sectionsScoreVal += 20;
  else suggestions.push({ category: 'Education', text: 'List your degree, university, and graduation dates.', priority: 'high' });

  if (resume.skillCategories.length > 0) sectionsScoreVal += 20;
  else suggestions.push({ category: 'Skills', text: 'Group your skills into clear technical/soft categories.', priority: 'high' });

  const sectionsScore: ATSCategoryScore = {
    name: 'Section Completeness',
    score: Math.min(100, sectionsScoreVal),
    weight: 0.20,
    status: sectionsScoreVal >= 80 ? 'excellent' : sectionsScoreVal >= 60 ? 'good' : 'critical',
    feedback: []
  };

  // --- 3. Experience & Bullet Quality ---
  let experienceScoreVal = 0;
  let actionVerbsCount = 0;
  let metricsCount = 0;

  const fullExperienceText = resume.experiences.map(e => e.highlights.join(' ') + ' ' + (e.description || '')).join(' ').toLowerCase();

  resume.experiences.forEach(exp => {
    exp.highlights.forEach(bullet => {
      const lower = bullet.toLowerCase();

      if (ACTION_VERBS.some(verb => lower.includes(verb))) {
        actionVerbsCount++;
      }

      if (/(\d+%|\$\d+|\d+k|\d+m|\d+x|\d+ years|\d+ users)/i.test(bullet)) {
        metricsCount++;
      }
    });
  });

  if (resume.experiences.length >= 2) experienceScoreVal += 40;
  else if (resume.experiences.length === 1) experienceScoreVal += 25;

  if (actionVerbsCount >= 3) experienceScoreVal += 30;
  else suggestions.push({ category: 'Action Verbs', text: `Use powerful action verbs (e.g. ${ACTION_VERBS.slice(0, 5).join(', ')}) at the start of bullet points.`, priority: 'medium' });

  if (metricsCount >= 2) experienceScoreVal += 30;
  else suggestions.push({ category: 'Quantifiable Results', text: 'Quantify your accomplishments with measurable metrics (e.g., percentages, revenue, latency reduction).', priority: 'high' });

  const experienceScore: ATSCategoryScore = {
    name: 'Experience & Action Impact',
    score: Math.min(100, experienceScoreVal),
    weight: 0.20,
    status: experienceScoreVal >= 80 ? 'excellent' : experienceScoreVal >= 60 ? 'good' : 'warning',
    feedback: [`Found ${actionVerbsCount} strong action verbs and ${metricsCount} quantified metrics.`]
  };

  // --- 4. Skills & Keyword Count ---
  const allSkills = resume.skillCategories.flatMap(c => c.skills);
  let skillsScoreVal = 0;

  if (allSkills.length >= 10) skillsScoreVal = 100;
  else if (allSkills.length >= 6) skillsScoreVal = 75;
  else if (allSkills.length >= 3) skillsScoreVal = 50;
  else {
    skillsScoreVal = 25;
    suggestions.push({ category: 'Skills', text: 'Add at least 8-12 core technical skills relevant to your target role.', priority: 'high' });
  }

  const skillsScore: ATSCategoryScore = {
    name: 'Skills Density',
    score: skillsScoreVal,
    weight: 0.15,
    status: skillsScoreVal >= 80 ? 'excellent' : 'warning',
    feedback: [`${allSkills.length} total skills detected across categories.`]
  };

  // --- 5. Formatting & Word Count ---
  const totalText = JSON.stringify(resume).replace(/[{}[\]":,]/g, ' ');
  const words = totalText.split(/\s+/).filter(Boolean);
  const totalWordCount = words.length;

  let formattingScoreVal = 80;
  if (totalWordCount >= 250 && totalWordCount <= 700) {
    formattingScoreVal = 100;
  } else if (totalWordCount < 200) {
    formattingScoreVal = 50;
    suggestions.push({ category: 'Formatting', text: 'Your resume content is under 200 words. Expand experience bullet points.', priority: 'high' });
  } else if (totalWordCount > 900) {
    formattingScoreVal = 65;
    suggestions.push({ category: 'Formatting', text: 'Your resume is over 900 words. Trim fluff to fit standard 1-2 pages.', priority: 'medium' });
  }

  const formattingScore: ATSCategoryScore = {
    name: 'Formatting & Length',
    score: formattingScoreVal,
    weight: 0.10,
    status: formattingScoreVal >= 80 ? 'excellent' : 'warning',
    feedback: [`Total estimated word count: ${totalWordCount} words.`]
  };

  // --- 6. Grammar & Phrase Integrity ---
  let grammarScoreVal = 100;
  let weakPhraseFound = false;

  WEAK_PHRASES.forEach(phrase => {
    if (fullExperienceText.includes(phrase)) {
      weakPhraseFound = true;
      grammarScoreVal -= 15;
    }
  });

  if (weakPhraseFound) {
    suggestions.push({ category: 'Grammar', text: 'Replace weak phrases like "responsible for" or "worked on" with active accomplishment statements.', priority: 'medium' });
  }

  if (/\b(i|my|me|we|our)\b/i.test(fullExperienceText)) {
    grammarScoreVal -= 15;
    suggestions.push({ category: 'Grammar', text: 'Remove first-person pronouns (I, my, me, we) from bullet points.', priority: 'medium' });
  }

  const grammarScore: ATSCategoryScore = {
    name: 'Grammar & Tone',
    score: Math.max(40, grammarScoreVal),
    weight: 0.10,
    status: grammarScoreVal >= 85 ? 'excellent' : 'warning',
    feedback: []
  };

  // --- 7. Target Job Keyword Matcher ---
  let keywordsScoreVal = 85;
  const foundKeywords: string[] = [];
  const missingKeywords: string[] = [];

  if (targetJobDescription.trim().length > 20) {
    const jobWords = Array.from(new Set(targetJobDescription.toLowerCase().match(/\b[a-z]{4,}\b/g) || []));
    const resumeTextLower = fullExperienceText + ' ' + allSkills.join(' ').toLowerCase() + ' ' + summary.toLowerCase();

    const importantTechKeywords = jobWords.filter(w => !['with', 'that', 'from', 'this', 'have', 'your', 'will', 'about'].includes(w));
    
    importantTechKeywords.slice(0, 15).forEach(kw => {
      if (resumeTextLower.includes(kw)) {
        foundKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    if (foundKeywords.length + missingKeywords.length > 0) {
      const matchRatio = foundKeywords.length / (foundKeywords.length + missingKeywords.length);
      keywordsScoreVal = Math.round(matchRatio * 100);
      if (missingKeywords.length > 0) {
        suggestions.push({
          category: 'Job Description Match',
          text: `Missing key terms from target job description: ${missingKeywords.slice(0, 5).join(', ')}`,
          priority: 'high'
        });
      }
    }
  }

  const keywordsScore: ATSCategoryScore = {
    name: 'Keyword Optimization',
    score: keywordsScoreVal,
    weight: 0.10,
    status: keywordsScoreVal >= 75 ? 'excellent' : 'critical',
    feedback: foundKeywords.length ? [`Matched ${foundKeywords.length} target keywords.`] : ['Enter a Target Job Description to analyze specific keywords.']
  };

  // --- Calculate Weighted Overall Score ---
  const overall = Math.round(
    contactScore.score * contactScore.weight +
    sectionsScore.score * sectionsScore.weight +
    experienceScore.score * experienceScore.weight +
    skillsScore.score * skillsScore.weight +
    formattingScore.score * formattingScore.weight +
    grammarScore.score * grammarScore.weight +
    keywordsScore.score * keywordsScore.weight
  );

  let grade: ATSCheckResult['grade'] = 'F';
  if (overall >= 90) grade = 'A+';
  else if (overall >= 80) grade = 'A';
  else if (overall >= 70) grade = 'B';
  else if (overall >= 60) grade = 'C';
  else if (overall >= 50) grade = 'D';

  return {
    overallScore: Math.min(100, Math.max(0, overall)),
    grade,
    sectionsScore,
    formattingScore,
    skillsScore,
    keywordsScore,
    experienceScore,
    educationScore: { name: 'Education', score: 90, weight: 0.05, status: 'excellent', feedback: [] },
    grammarScore,
    contactScore,
    actionVerbsCount,
    metricsCount,
    totalWordCount,
    foundKeywords,
    missingKeywords,
    suggestions
  };
}
