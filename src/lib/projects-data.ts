'use client';

// Lucide icon names to be used dynamically
export type IconName =
  | 'BookOpen' | 'Code' | 'Palette' | 'Zap' | 'Users' | 'Lock'
  | 'Video' | 'CreditCard' | 'LayoutDashboard' | 'Brain' | 'Activity'
  | 'MessageSquare' | 'Search' | 'Database' | 'Cloud' | 'Shield'
  | 'Smartphone' | 'Globe' | 'Terminal' | 'GitBranch' | 'Layers'
  | 'Sparkles' | 'Eye' | 'Target' | 'Settings' | 'Timer'
  | 'PenTool' | 'Share2' | 'CheckCircle' | 'TrendingUp' | 'BarChart3'
  | 'Cpu' | 'Server' | 'Workflow' | 'FileCode' | 'Gauge';

export interface ProjectFeature {
  icon: IconName;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  thumbnail: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl: string;
  featured?: boolean;
  category: 'fullstack' | 'ai' | 'tool' | 'extension';
  features: ProjectFeature[];
  impact?: string; // Short impact statement
}

export const projects: Project[] = [
  {
    id: 'ergosmart',
    title: 'ErgoSmart - AI Posture Coach',
    description: 'Real-time AI posture analysis using browser-based machine learning',
    longDescription: 'A production-ready posture correction app leveraging TensorFlow.js and MediaPipe for real-time skeletal tracking. Achieves 30fps inference entirely client-side, with intelligent alerts and posture scoring.',
    thumbnail: '/assests/ergoLogo.png',
    images: ['/assests/ergoLogo.png'],
    techStack: ['React 18', 'TensorFlow.js', 'MediaPipe BlazePose', 'WebGL', 'TailwindCSS'],
    liveUrl: 'https://ergosmart.vercel.app/',
    githubUrl: 'https://github.com/princesinghrajput/ergoSmart',
    featured: true,
    category: 'ai',
    impact: '30fps real-time inference • Zero backend dependency',
    features: [
      {
        icon: 'Brain',
        title: 'Real-time Pose Estimation',
        description: 'MediaPipe BlazePose model running at 30fps with 33 body landmarks detection for accurate skeletal tracking'
      },
      {
        icon: 'Cpu',
        title: 'Client-side ML Processing',
        description: 'TensorFlow.js with WebGL acceleration - zero server dependency, runs entirely in browser for privacy'
      },
      {
        icon: 'Activity',
        title: 'Smart Posture Scoring',
        description: 'Calculates spine angle, shoulder alignment, and head position to generate real-time posture health scores'
      },
      {
        icon: 'Timer',
        title: 'Break Reminders & Analytics',
        description: 'Intelligent break scheduling with session-wise posture analytics and improvement tracking'
      }
    ]
  },
  {
    id: 'drawio',
    title: 'DrawIO - Collaborative Whiteboard',
    description: 'Real-time collaborative infinite canvas with live synchronization',
    longDescription: 'A full-featured Eraser.io clone with real-time collaboration, infinite canvas, and instant sync. Built with ConvexDB for real-time updates and optimistic UI for seamless drawing experience.',
    thumbnail: '/assests/drawio.png',
    images: ['/assests/drawio.png'],
    techStack: ['Next.js 14', 'TypeScript', 'ConvexDB', 'React Flow', 'TailwindCSS', 'ShadCN UI'],
    liveUrl: 'https://erasor-clone.vercel.app/',
    githubUrl: 'https://github.com/princesinghrajput/drawio',
    featured: true,
    category: 'tool',
    impact: 'Real-time sync • Infinite canvas • Multi-user',
    features: [
      {
        icon: 'Users',
        title: 'Live Collaboration',
        description: 'Real-time multi-user drawing with live cursor tracking, conflict-free replicated data types (CRDT)'
      },
      {
        icon: 'Layers',
        title: 'Infinite Canvas Engine',
        description: 'Pan/zoom with hardware acceleration, efficient viewport culling for rendering 1000+ elements'
      },
      {
        icon: 'Cloud',
        title: 'Instant Sync with ConvexDB',
        description: 'Optimistic updates with automatic sync - changes appear instantly with background persistence'
      },
      {
        icon: 'PenTool',
        title: 'Rich Drawing Tools',
        description: 'Freehand, shapes, arrows, sticky notes, text annotations with custom styling and layers'
      }
    ]
  },
  {
    id: 'dev-overflow',
    title: 'DevOverflow - Q&A Platform',
    description: 'Full-stack Stack Overflow clone with voting, search, and rich text editing',
    longDescription: 'A production-grade Q&A platform with OAuth authentication, MongoDB aggregation for complex queries, and TinyMCE for rich formatting. Features tag-based filtering and reputation system.',
    thumbnail: '/assests/devoverflow.png',
    images: ['/assests/devoverflow.png'],
    techStack: ['Next.js 14', 'MongoDB', 'TypeScript', 'NextAuth.js', 'TinyMCE', 'Zod', 'Server Actions'],
    liveUrl: 'https://nextjs14-devoverflow.vercel.app/',
    githubUrl: 'https://github.com/princesinghrajput/dev-overflow',
    featured: true,
    category: 'fullstack',
    impact: 'OAuth integration • Aggregation pipelines • Server Actions',
    features: [
      {
        icon: 'Lock',
        title: 'Secure OAuth Authentication',
        description: 'NextAuth.js with GitHub/Google OAuth providers, session management, and protected API routes'
      },
      {
        icon: 'Database',
        title: 'MongoDB Aggregation Pipelines',
        description: 'Complex queries for reputation, hot questions, related posts using MongoDB aggregation framework'
      },
      {
        icon: 'TrendingUp',
        title: 'Reputation & Voting System',
        description: 'Stack Overflow-style reputation with upvotes/downvotes affecting user scores and badge system'
      },
      {
        icon: 'FileCode',
        title: 'Rich Text with Code Highlighting',
        description: 'TinyMCE editor with syntax highlighting, markdown support, and code block formatting'
      }
    ]
  },
  {
    id: 'studybuddy',
    title: 'StudyBuddy - Study Room Platform',
    description: 'Discord-inspired study rooms with real-time messaging and topic communities',
    longDescription: 'A community-driven platform for students to create study rooms, join topic-based groups, and collaborate in real-time. Features Django Channels for WebSocket messaging and topic-based room discovery.',
    thumbnail: '/assests/studybud.png',
    images: ['/assests/studybud.png'],
    techStack: ['Django', 'Django Channels', 'SQLite3', 'WebSockets', 'HTML/CSS', 'JavaScript'],
    githubUrl: 'https://github.com/princesinghrajput/StudyBud',
    category: 'fullstack',
    impact: 'WebSocket messaging • Room discovery • User activity tracking',
    features: [
      {
        icon: 'MessageSquare',
        title: 'Real-time Chat Engine',
        description: 'Django Channels WebSocket implementation for instant messaging with typing indicators'
      },
      {
        icon: 'Users',
        title: 'Topic-based Study Rooms',
        description: 'Create/join rooms by subject - participants can share resources and discuss topics'
      },
      {
        icon: 'Search',
        title: 'Smart Room Discovery',
        description: 'Search by topic, filter by activity level, browse trending rooms with member counts'
      },
      {
        icon: 'BarChart3',
        title: 'Activity Dashboard',
        description: 'Track participation, message counts, room activity streaks, and study time analytics'
      }
    ]
  },
  {
    id: 'twitter-restrictor',
    title: 'Twitter Restrictor 🚫',
    description: 'Chrome extension for productivity-focused Twitter usage control',
    longDescription: 'A personal productivity tool built as a Chrome extension. Tracks time spent on Twitter, enforces daily limits with override protection, and provides usage insights to help reduce doomscrolling.',
    thumbnail: '/assests/twitter-restrictor.png',
    images: ['/assests/twitter-restrictor.png'],
    techStack: ['JavaScript ES6', 'Chrome Extensions API', 'Chrome Storage API', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/princesinghrajput/twitter-restrictor',
    category: 'extension',
    impact: 'Background service workers • Storage sync • Content scripts',
    features: [
      {
        icon: 'Timer',
        title: 'Precise Time Tracking',
        description: 'Background service worker tracks active tab time with pause detection and session logging'
      },
      {
        icon: 'Shield',
        title: 'Enforced Blocking Mode',
        description: 'Content script injection blocks site access when limit reached - with optional 5-min override'
      },
      {
        icon: 'BarChart3',
        title: 'Usage Analytics Dashboard',
        description: 'Daily/weekly charts showing usage patterns, peak hours, and trend comparisons'
      },
      {
        icon: 'Settings',
        title: 'Customizable Limits',
        description: 'Set daily limits, schedule "focus hours", whitelist specific pages, sync across devices'
      }
    ]
  }
];

// Helper functions
export const getFeaturedProjects = (count: number = 4): Project[] => {
  return projects.filter(p => p.featured).slice(0, count);
};

export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(p => p.category === category);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};

export const getAllCategories = (): Project['category'][] => {
  return ['fullstack', 'ai', 'tool', 'extension'];
};

export const categoryLabels: Record<Project['category'], { label: string; color: string; bgColor: string }> = {
  fullstack: {
    label: 'Full Stack',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20'
  },
  ai: {
    label: 'AI/ML',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/20'
  },
  tool: {
    label: 'Tool',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/20'
  },
  extension: {
    label: 'Extension',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/20'
  }
};
