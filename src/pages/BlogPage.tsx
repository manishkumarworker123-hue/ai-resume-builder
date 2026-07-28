import React, { useState } from 'react';
import type { BlogPost } from '../types/blog';
import { BookOpen, Clock, Search, ArrowRight } from 'lucide-react';

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'ats-optimization-guide-2026',
    title: 'Complete ATS Resume Optimization Guide for 2026',
    description: 'Learn how modern Applicant Tracking Systems parse resume documents and how to structure your sections for maximum callback rates.',
    content: `
# Complete ATS Resume Optimization Guide for 2026

Applicant Tracking Systems (ATS) are used by over 98% of Fortune 500 companies to filter resumes before human recruiters ever read them. Here is how to pass the filter every single time.

## 1. Use Simple Formatting
- Stick to clean standard fonts like Inter, Roboto, or Arial.
- Avoid table overlays or complex graphic shapes for critical text.
- Use standard section titles: *Work Experience, Education, Technical Skills*.

## 2. Quantify Achievements
Instead of writing "Responsible for managing servers", write:
"Engineered distributed microservices handling 50k requests/sec with 99.99% uptime."

## 3. Include Relevant Action Verbs
Start every bullet point with a strong action verb like *Spearheaded, Optimized, Scaled, Architected, Automated*.
    `,
    category: 'ATS Guide',
    author: 'Sarah Jenkins',
    readTime: '5 min read',
    publishedAt: '2026-07-15',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    tags: ['ATS', 'Resume Tips', 'Job Search']
  },
  {
    id: 'post-2',
    slug: 'crack-software-engineer-interview',
    title: 'How to Crack Any Software Engineering Resume Screen',
    description: 'Key technical projects, system design highlights, and metrics that tech recruiters look for in full-stack and backend roles.',
    content: `
# How to Crack Any Software Engineering Resume Screen

Tech recruiters spend on average 6 seconds on an initial resume skim. Here is how to capture their attention.

## Highlight High-Impact Tech Stacks
Group your technologies clearly into *Languages, Frontend, Backend, Databases, Cloud & DevOps*.

## Showcase GitHub & Open Source
Link directly to production projects with live URLs or GitHub repositories with star counts.
    `,
    category: 'Resume Tips',
    author: 'Alex Vance',
    readTime: '4 min read',
    publishedAt: '2026-07-20',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    tags: ['Software Engineer', 'Tech Careers', 'Coding']
  },
  {
    id: 'post-3',
    slug: 'top-action-verbs-resumes-2026',
    title: 'Top 50 Power Action Verbs for Standout Resumes',
    description: 'Transform weak bullet points into high-impact accomplishment statements with these action verbs.',
    content: `
# Top 50 Power Action Verbs for Standout Resumes

Replace passive phrases like "helped with" or "worked on" with these power verbs:
- **Leadership**: *Spearheaded, Orchestrated, Navigated, Pioneered*
- **Technical**: *Architected, Engineered, Deployed, Automated*
- **Growth**: *Accelerated, Scaled, Boosted, Expanded*
    `,
    category: 'Career Guide',
    author: 'Rohan Sharma',
    readTime: '3 min read',
    publishedAt: '2026-07-22',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    tags: ['Action Verbs', 'Resume Writing']
  }
];

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState('');

  const filteredPosts = BLOG_POSTS.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-bold text-xs border border-brand-200 dark:border-brand-800 mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          Career Blog & ATS Insights
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Career Guides & Resume Tips</h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
          Expert articles on beating ATS screeners, writing bullet points, and cracking tech interviews.
        </p>

        {/* Search */}
        <div className="mt-6 relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guides..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Article Detail View */}
      {selectedPost ? (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-3xl mx-auto space-y-6">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            ← Back to all articles
          </button>
          <div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950/60 uppercase">
              {selectedPost.category}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">{selectedPost.title}</h1>
            <p className="text-xs text-slate-400 mt-1">By {selectedPost.author} • {selectedPost.readTime} • {selectedPost.publishedAt}</p>
          </div>

          <div className="prose dark:prose-invert text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line border-t border-slate-100 dark:border-slate-700 pt-6">
            {selectedPost.content}
          </div>
        </div>
      ) : (
        /* Blog Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 overflow-hidden shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <img src={post.image} alt={post.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="font-bold text-brand-600 dark:text-brand-400 uppercase">{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center text-xs font-bold text-brand-500 group-hover:gap-2 transition-all">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
