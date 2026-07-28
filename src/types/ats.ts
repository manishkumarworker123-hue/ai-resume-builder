export interface ATSCategoryScore {
  name: string;
  score: number; // 0-100
  weight: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  feedback: string[];
}

export interface ATSCheckResult {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  sectionsScore: ATSCategoryScore;
  formattingScore: ATSCategoryScore;
  skillsScore: ATSCategoryScore;
  keywordsScore: ATSCategoryScore;
  experienceScore: ATSCategoryScore;
  educationScore: ATSCategoryScore;
  grammarScore: ATSCategoryScore;
  contactScore: ATSCategoryScore;
  actionVerbsCount: number;
  metricsCount: number;
  totalWordCount: number;
  foundKeywords: string[];
  missingKeywords: string[];
  suggestions: {
    category: string;
    text: string;
    priority: 'high' | 'medium' | 'low';
  }[];
}
