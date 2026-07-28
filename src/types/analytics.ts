export interface AnalyticsData {
  resumeCount: number;
  downloadCount: number;
  templateUsage: Record<string, number>;
  atsAverageScore: number;
  recentDownloadsHistory: {
    id: string;
    resumeTitle: string;
    format: 'PDF' | 'HTML' | 'JSON' | 'TXT';
    downloadedAt: string;
  }[];
}
