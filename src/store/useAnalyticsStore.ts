import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AnalyticsData } from '../types/analytics';

interface AnalyticsState extends AnalyticsData {
  incrementResumeCount: () => void;
  recordDownload: (resumeTitle: string, format: 'PDF' | 'HTML' | 'JSON' | 'TXT', templateId: string) => void;
  recordATSCheck: (score: number) => void;
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set) => ({
      resumeCount: 1,
      downloadCount: 0,
      templateUsage: {
        modern: 5,
        minimal: 3,
        professional: 4,
        creative: 2,
        executive: 1,
        student: 3,
        fresher: 4,
        corporate: 2,
      },
      atsAverageScore: 82,
      recentDownloadsHistory: [],

      incrementResumeCount: () => set((state) => ({ resumeCount: state.resumeCount + 1 })),
      
      recordDownload: (resumeTitle, format, templateId) => set((state) => {
        const newUsage = { ...state.templateUsage };
        newUsage[templateId] = (newUsage[templateId] || 0) + 1;
        
        const newHistoryItem = {
          id: 'dl-' + Date.now(),
          resumeTitle,
          format,
          downloadedAt: new Date().toISOString(),
        };

        return {
          downloadCount: state.downloadCount + 1,
          templateUsage: newUsage,
          recentDownloadsHistory: [newHistoryItem, ...state.recentDownloadsHistory.slice(0, 19)],
        };
      }),

      recordATSCheck: (score) => set((state) => {
        const currentAvg = state.atsAverageScore || 80;
        const updatedAvg = Math.round((currentAvg + score) / 2);
        return { atsAverageScore: updatedAvg };
      }),
    }),
    {
      name: 'ai-resume-analytics-storage',
    }
  )
);
