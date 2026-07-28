export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: 'Resume Tips' | 'Interview Tips' | 'Career Guide' | 'ATS Guide';
  author: string;
  readTime: string;
  publishedAt: string;
  image: string;
  tags: string[];
}
