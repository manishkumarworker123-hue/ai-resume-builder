import type { ResumeData } from '../types/resume';

export const sampleResumes: Record<string, ResumeData> = {
  'software-engineer': {
    id: 'sample-se-01',
    title: 'Senior Software Engineer Resume',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    personalInfo: {
      fullName: 'Alex Vance',
      jobTitle: 'Senior Full Stack Software Engineer',
      email: 'alex.vance@devmail.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      website: 'https://alexvance.dev',
      linkedin: 'https://linkedin.com/in/alexvance',
      github: 'https://github.com/alexvance',
      summary: 'High-impact Full Stack Engineer with 6+ years of experience architecting resilient microservices, high-frequency React UIs, and cloud infrastructure. Scaled distributed systems serving 5M+ active users with 99.99% uptime. Passionate about developer tooling and performance optimization.',
      showPhoto: false
    },
    experiences: [
      {
        id: 'exp-1',
        company: 'Veloce Tech Cloud',
        position: 'Lead Full Stack Engineer',
        location: 'San Francisco, CA',
        startDate: '2023-01',
        endDate: 'Present',
        current: true,
        highlights: [
          'Spearheaded the migration of monolith to Next.js & Go microservices, accelerating page load performance by 65%.',
          'Architected real-time collaboration canvas engine with WebSocket & WebRTC handling 50k concurrently active sessions.',
          'Mentored a team of 8 engineers and introduced automated CI/CD pipelines reducing deployment friction by 40%.'
        ]
      },
      {
        id: 'exp-2',
        company: 'Apex Data Systems',
        position: 'Software Engineer',
        location: 'Austin, TX',
        startDate: '2020-06',
        endDate: '2022-12',
        current: false,
        highlights: [
          'Engineered event-driven analytics pipeline with Kafka, PostgreSQL, and GraphQL reducing query latency from 1.2s to 180ms.',
          'Built reusable UI design system in React & Tailwind CSS utilized by over 30 internal product teams.',
          'Decreased cloud infrastructure costs by $120k annually by optimizing Kubernetes cluster auto-scaling.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'University of California, Berkeley',
        degree: 'B.S. in Computer Science',
        fieldOfStudy: 'Computer Science & Software Engineering',
        startDate: '2016-08',
        endDate: '2020-05',
        grade: '3.9 GPA / Magna Cum Laude'
      }
    ],
    skillCategories: [
      {
        id: 'sk-1',
        categoryName: 'Languages & Core',
        skills: ['TypeScript', 'JavaScript (ES6+)', 'Go (Golang)', 'Python', 'SQL', 'HTML5/CSS3']
      },
      {
        id: 'sk-2',
        categoryName: 'Frontend & UI',
        skills: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Redux / Zustand', 'GraphQL', 'WebSockets']
      },
      {
        id: 'sk-3',
        categoryName: 'Backend & Cloud',
        skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS (S3, Lambda, ECS)']
      }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'StreamGrid - Distributed Event Bus',
        description: 'Lightweight open-source message queue server built with Go and Raft consensus.',
        technologies: ['Go', 'gRPC', 'Docker', 'Prometheus'],
        github: 'https://github.com/alexvance/streamgrid',
        highlights: [
          'Achieved 120,000 requests/sec throughput under benchmark workloads.',
          'Starred by over 2,400 developers on GitHub.'
        ]
      }
    ],
    certificates: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        issueDate: '2023-04',
        credentialId: 'AWS-ASA-994821'
      }
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'Winner - SF DevHack 2024',
        description: 'First place out of 120 teams for building an offline-first distributed consensus notes app.'
      }
    ],
    languages: [
      { id: 'lang-1', language: 'English', proficiency: 'Native' },
      { id: 'lang-2', language: 'Spanish', proficiency: 'Intermediate' }
    ],
    references: [],
    publications: [],
    interests: ['Open Source', 'System Architecture', 'Algorithmic Trading', 'Cybersecurity'],
    hobbies: ['Mountain Biking', 'Mechanical Keyboards', 'Chess'],
    customSections: [],
    sectionOrder: ['personal', 'experience', 'education', 'skills', 'projects', 'certificates', 'achievements', 'languages']
  },
  'product-manager': {
    id: 'sample-pm-01',
    title: 'Product Manager Resume',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    personalInfo: {
      fullName: 'Sarah Jenkins',
      jobTitle: 'Senior Technical Product Manager',
      email: 'sarah.jenkins@producthub.io',
      phone: '+1 (555) 891-2345',
      location: 'New York, NY',
      linkedin: 'https://linkedin.com/in/sarahjenkins-pm',
      summary: 'Data-driven Senior Product Manager with 7+ years of experience leading cross-functional teams across fintech and SaaS platforms. Proven track record of launching 0-to-1 products generating $14M+ ARR and boosting active user retention by 38%.',
      showPhoto: false
    },
    experiences: [
      {
        id: 'pm-exp-1',
        company: 'Starlight Financial',
        position: 'Principal Product Manager',
        location: 'New York, NY',
        startDate: '2022-03',
        endDate: 'Present',
        current: true,
        highlights: [
          'Led product vision and execution for automated B2B checkout suite, driving $8.5M incremental ARR in FY24.',
          'Spearheaded user research with 80+ enterprise customers, prioritizing feature backlog to improve NPS score from +32 to +58.',
          'Managed cross-functional squad of 14 (Engineering, UX Design, Data Science, Growth).'
        ]
      }
    ],
    education: [
      {
        id: 'pm-edu-1',
        institution: 'NYU Stern School of Business',
        degree: 'MBA in Product Strategy & Finance',
        fieldOfStudy: 'Business Administration',
        startDate: '2018-09',
        endDate: '2020-05'
      }
    ],
    skillCategories: [
      {
        id: 'pm-sk-1',
        categoryName: 'Product Management',
        skills: ['Roadmapping', 'User Research', 'A/B Testing', 'Agile/Scrum', 'Feature Prioritization', 'Product Analytics']
      },
      {
        id: 'pm-sk-2',
        categoryName: 'Tools & Tech',
        skills: ['Jira', 'Linear', 'Mixpanel', 'Figma', 'SQL', 'Postman', 'Tableau']
      }
    ],
    projects: [],
    certificates: [
      {
        id: 'pm-cert-1',
        name: 'Certified Scrum Product Owner (CSPO)',
        issuer: 'Scrum Alliance',
        issueDate: '2021-08'
      }
    ],
    achievements: [],
    languages: [
      { id: 'pm-lang-1', language: 'English', proficiency: 'Native' },
      { id: 'pm-lang-2', language: 'Hindi', proficiency: 'Fluent' }
    ],
    references: [],
    publications: [],
    interests: ['Fintech Innovation', 'User Psychology', 'Design Thinking'],
    hobbies: ['Podcasting', 'Marathon Running'],
    customSections: [],
    sectionOrder: ['personal', 'experience', 'education', 'skills', 'certificates', 'languages']
  },
  'fresher-resume': {
    id: 'sample-fresher-01',
    title: 'Fresher Graduate Resume',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    personalInfo: {
      fullName: 'Rohan Sharma',
      jobTitle: 'Junior Associate Engineer / Graduate Developer',
      email: 'rohan.sharma2026@gmail.com',
      phone: '+91 98765 43210',
      location: 'Bangalore, India',
      linkedin: 'https://linkedin.com/in/rohansharma-dev',
      github: 'https://github.com/rohan-sharma',
      summary: 'Motivated Computer Science graduate with strong foundational knowledge in Data Structures, Algorithms, React, and Python. Winner of Smart India Hackathon 2025. Eager to contribute technical skills to a dynamic engineering team.',
      showPhoto: false
    },
    experiences: [
      {
        id: 'fr-exp-1',
        company: 'CodeCraft Labs',
        position: 'Frontend Developer Intern',
        location: 'Bangalore, India',
        startDate: '2025-06',
        endDate: '2025-12',
        current: false,
        highlights: [
          'Developed 12+ responsive web pages using React and Tailwind CSS for client dashboard.',
          'Fixed 25+ UI bug tickets and improved lighthouse performance score from 72 to 94.',
          'Collaborated closely with senior developers using Git version control and Agile methodology.'
        ]
      }
    ],
    education: [
      {
        id: 'fr-edu-1',
        institution: 'National Institute of Technology (NIT)',
        degree: 'B.Tech in Computer Science & Engineering',
        fieldOfStudy: 'Computer Science',
        startDate: '2022-08',
        endDate: '2026-05',
        grade: '8.8 CGPA'
      }
    ],
    skillCategories: [
      {
        id: 'fr-sk-1',
        categoryName: 'Technical Skills',
        skills: ['Java', 'Python', 'JavaScript', 'React.js', 'HTML/CSS', 'Git', 'SQL', 'Data Structures']
      }
    ],
    projects: [
      {
        id: 'fr-proj-1',
        name: 'AI Expense Tracker & Analytics App',
        description: 'Web application to track monthly expenses with category charts and budget alerts.',
        technologies: ['React', 'Chart.js', 'Node.js', 'MongoDB'],
        highlights: [
          'Implemented secure user authentication with JWT and bcrypt.',
          'Used by 500+ active university students.'
        ]
      }
    ],
    certificates: [],
    achievements: [
      {
        id: 'fr-ach-1',
        title: 'Winner - Smart India Hackathon 2025',
        description: 'Developed an offline emergency response application for rural disaster zones.'
      }
    ],
    languages: [
      { id: 'fr-lang-1', language: 'English', proficiency: 'Fluent' },
      { id: 'fr-lang-2', language: 'Hindi', proficiency: 'Native' }
    ],
    references: [],
    publications: [],
    interests: ['Web Development', 'Competitive Programming', 'Open Source'],
    hobbies: ['Badminton', 'Photography'],
    customSections: [],
    sectionOrder: ['personal', 'education', 'skills', 'projects', 'experience', 'achievements', 'languages']
  }
};
