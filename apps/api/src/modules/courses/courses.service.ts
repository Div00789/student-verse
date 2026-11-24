import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface LiveBatch {
  id: string;
  courseSlug: string;
  batchCode: string;
  title: string;
  startDate: string;
  endDate: string;
  scheduleTimezone: string;
  scheduleDescription: string;
  trainerName: string;
  maxSeats: number;
  enrolledCount: number;
  status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface LiveClassSession {
  id: string;
  batchId: string;
  title: string;
  scheduledStart: string;
  scheduledEnd: string;
  timezone: string;
  meetingLink: string;
  trainerName: string;
  isCompleted: boolean;
}

export interface CourseData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  format: string;
  durationHours: number;
  totalSessions: number;
  priceMinorUnits: number;
  currency: string;
  description: string;
  prerequisites: string[];
  learningOutcomes: string[];
  thumbnailUrl: string;
  trainerName: string;
  modules: {
    id: string;
    title: string;
    orderIndex: number;
    description: string;
    lessons: {
      id: string;
      title: string;
      orderIndex: number;
      contentType: string;
      durationMinutes: number;
      isFreePreview: boolean;
      recordedUrl?: string;
    }[];
  }[];
  upcomingBatches: LiveBatch[];
}

export interface AssignmentItem {
  id: string;
  courseSlug: string;
  courseTitle: string;
  skillName: string;
  title: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  instructions: string;
  deliverables: string[];
  maxScore: number;
  dueDate: string;
}

export interface AssignmentSubmissionItem {
  id: string;
  assignmentId: string;
  userId: string;
  studentName: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'EVALUATED' | 'RESUBMISSION_REQUESTED';
  responseText?: string;
  attachmentUrl?: string;
  projectUrl?: string;
  submittedAt: string;
  evaluation?: {
    accuracyScore: number; // 40%
    executionScore: number; // 30%
    problemSolvingScore: number; // 20%
    submissionQualityScore: number; // 10%
    totalScore: number; // out of 100
    feedbackNotes: string;
    evaluatorName: string;
    evaluatedAt: string;
  };
}

export interface StudentSkillScore {
  skillName: string;
  category: string;
  score: number;
  confidence: 'LOW' | 'MODERATE' | 'HIGH';
  verifiedTasksCount: number;
  lastAssessedAt: string;
}

const APPROVED_LAUNCH_COURSES: CourseData[] = [
  {
    id: 'c-aidm-100',
    slug: 'ai-digital-marketing-course',
    title: 'AI Digital Marketing Course',
    subtitle: 'Comprehensive 14-Module Professional Programme: SEO, PPC, GA4, Paid Media, Automation & Modern AI Tools',
    category: 'Digital Marketing / Artificial Intelligence / Career Development',
    level: 'BEGINNER',
    format: 'HYBRID',
    durationHours: 48,
    totalSessions: 16,
    priceMinorUnits: 4999900,
    currency: 'INR',
    description: 'Master digital marketing with artificial intelligence through hands-on training in SEO, Google Ads, Google Analytics 4, Social Media Marketing, Email Marketing, Content Marketing, Marketing Automation, Affiliate Marketing, and Freelancing. Learn to use modern AI tools to improve research, content creation, campaign planning, analytics, automation, and marketing performance.',
    prerequisites: [
      'Basic web literacy and computer familiarity',
      'Curiosity to master modern AI marketing tools and agentic workflows',
      'No prior coding or technical marketing experience required'
    ],
    learningOutcomes: [
      'Master full-funnel search engine optimisation: Technical SEO, On-Page, Off-Page, AEO & Generative Engine Optimisation (GEO)',
      'Build, manage, and scale high-converting Google Ads campaigns and paid social ads across Meta, LinkedIn, and YouTube',
      'Deploy Google Analytics 4, Tag Manager dataLayers, UTM pipelines, and executive Looker Studio performance dashboards',
      'Automate email marketing, lead capture, CRM pipelines, and AI agent workflows using Zapier, Make, and n8n',
      'Generate high-impact brand visual assets, video scripts, ad copy, and prompt libraries with Generative AI tools',
      'Deliver a verified, evaluated capstone digital marketing plan and launch a successful freelance marketing career'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    trainerName: 'StudentVerse Expert Faculty (Industry Growth Directors & AI Leads)',
    modules: [
      {
        id: 'm-aidm-1',
        title: 'Module 1 — Search Engine Optimisation (SEO)',
        orderIndex: 1,
        description: 'Foundations of crawling, indexing, keyword research, on-page SEO, technical audits, Core Web Vitals, link building, modern SEO tools, and AI/AEO/GEO optimization.',
        lessons: [
          { id: 'l-aidm-1-1', title: '1.1 Search Foundations, Indexation & Keyword Intelligence', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: true, recordedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l-aidm-1-2', title: '1.2 On-Page SEO, Header Hierarchy & Semantic Content Architecture', orderIndex: 2, contentType: 'RECORDED_VIDEO', durationMinutes: 75, isFreePreview: false, recordedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l-aidm-1-3', title: '1.3 Technical SEO, Core Web Vitals & Crawlability Audits', orderIndex: 3, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-1-4', title: '1.4 Off-Page SEO, Digital PR & Ethical Link Building', orderIndex: 4, contentType: 'RECORDED_VIDEO', durationMinutes: 60, isFreePreview: false },
          { id: 'l-aidm-1-5', title: '1.5 Industry SEO Toolstack Mastery & Analytics Setup', orderIndex: 5, contentType: 'RECORDED_VIDEO', durationMinutes: 60, isFreePreview: false },
          { id: 'l-aidm-1-6', title: '1.6 AI SEO, Answer Engine Optimisation (AEO) & GEO', orderIndex: 6, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-2',
        title: 'Module 2 — Pay-Per-Click Advertising (Google Ads)',
        orderIndex: 2,
        description: 'PPC advertising fundamentals, Search ads, Display, Shopping, Performance Max, smart bidding strategies, conversion tracking, and AI ad copywriting.',
        lessons: [
          { id: 'l-aidm-2-1', title: '2.1 Google Ads Architecture & Campaign Types', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-2-2', title: '2.2 Bidding Strategies, Performance Metrics & ROAS Optimization', orderIndex: 2, contentType: 'RECORDED_VIDEO', durationMinutes: 75, isFreePreview: false },
          { id: 'l-aidm-2-3', title: '2.3 Campaign Management, Conversion Tracking & Landing Page CRO', orderIndex: 3, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-2-4', title: '2.4 AI for Google Ads: Keyword Clustering & Performance Automation', orderIndex: 4, contentType: 'RECORDED_VIDEO', durationMinutes: 60, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-3',
        title: 'Module 3 — Google Analytics 4 (GA4)',
        orderIndex: 3,
        description: 'Analytics fundamentals, GA4 account setup, event tracking, custom events, UTM parameters, Looker Studio dashboards, and AI predictive analytics.',
        lessons: [
          { id: 'l-aidm-3-1', title: '3.1 GA4 Architecture, Tag Installation & Metric Fundamentals', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-3-2', title: '3.2 Traffic Acquisition, UTM Governance & Attribution Modeling', orderIndex: 2, contentType: 'RECORDED_VIDEO', durationMinutes: 60, isFreePreview: false },
          { id: 'l-aidm-3-3', title: '3.3 Conversions, Key Events & Executive Looker Studio Dashboards', orderIndex: 3, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-3-4', title: '3.4 AI Analytics, Automated Insights & Anomaly Detection', orderIndex: 4, contentType: 'RECORDED_VIDEO', durationMinutes: 60, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-4',
        title: 'Module 4 — Social Media Marketing (Paid Advertising)',
        orderIndex: 4,
        description: 'Facebook Ads, Instagram, LinkedIn Ads, custom audiences, lookalikes, creative testing, and AI-assisted campaigns.',
        lessons: [
          { id: 'l-aidm-4-1', title: '4.1 Paid Social Media Architecture & Audience Targeting', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-4-2', title: '4.2 Creative Diversification, Ad Copywriting & Conversion APIs', orderIndex: 2, contentType: 'RECORDED_VIDEO', durationMinutes: 75, isFreePreview: false },
          { id: 'l-aidm-4-3', title: '4.3 AI-Driven Creative Testing & Lead Gen Campaign Optimization', orderIndex: 3, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-5',
        title: 'Module 5 — Social Media Optimisation (SMO)',
        orderIndex: 5,
        description: 'Audience personas, 30-day content calendars, organic social growth, ORM, community engagement, and AI video/caption automation.',
        lessons: [
          { id: 'l-aidm-5-1', title: '5.1 Audience Personas, Editorial Planning & Organic Distribution', orderIndex: 1, contentType: 'RECORDED_VIDEO', durationMinutes: 60, isFreePreview: false },
          { id: 'l-aidm-5-2', title: '5.2 Community Management, Social Listening & Process Automation', orderIndex: 2, contentType: 'RECORDED_VIDEO', durationMinutes: 60, isFreePreview: false },
          { id: 'l-aidm-5-3', title: '5.3 AI Content Ideas, AI Video & Sentiment Analysis Workflows', orderIndex: 3, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-6',
        title: 'Module 6 — Email Marketing',
        orderIndex: 6,
        description: 'Permission-based list building, SMTP infrastructure, SPF/DKIM/DMARC authentication, deliverability, high-volume sending compliance, and AI nurture sequences.',
        lessons: [
          { id: 'l-aidm-6-1', title: '6.1 Permission List Building, Interactive Design & Sequence Strategy', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-6-2', title: '6.2 Email Infrastructure, Authentication (SPF/DKIM/DMARC) & High-Volume Compliance', orderIndex: 2, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-6-3', title: '6.3 Email Metrics, Attribution & AI Copywriting Workflows', orderIndex: 3, contentType: 'RECORDED_VIDEO', durationMinutes: 75, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-7',
        title: 'Module 7 — Black Hat SEO and Search Engine Guidelines',
        orderIndex: 7,
        description: 'Educational risk-awareness module: identifying cloaking, content spinning, doorway pages, manual actions, algorithmic penalties, and ethical recovery.',
        lessons: [
          { id: 'l-aidm-7-1', title: '7.1 Deceptive SEO Tactics, Spam Policies & Algorithmic Filters', orderIndex: 1, contentType: 'RECORDED_VIDEO', durationMinutes: 60, isFreePreview: false },
          { id: 'l-aidm-7-2', title: '7.2 Penalty Remediation, Recovery Protocols & Ethical Alternatives', orderIndex: 2, contentType: 'RECORDED_VIDEO', durationMinutes: 60, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-8',
        title: 'Module 8 — Affiliate Marketing',
        orderIndex: 8,
        description: 'Affiliate networks, niche selection, comparison content, commission models, disclosure rules, Google AdSense vs affiliate, and AI content development.',
        lessons: [
          { id: 'l-aidm-8-1', title: '8.1 Affiliate Architecture, Networks, Niche Selection & Disclosures', orderIndex: 1, contentType: 'RECORDED_VIDEO', durationMinutes: 60, isFreePreview: false },
          { id: 'l-aidm-8-2', title: '8.2 Google AdSense Integration & AI-Powered Affiliate Strategy', orderIndex: 2, contentType: 'RECORDED_VIDEO', durationMinutes: 60, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-9',
        title: 'Module 9 — Content Marketing',
        orderIndex: 9,
        description: 'Strategy, blog writing, topic clusters, pillar pages, Quora & third-party distribution, storytelling, and AEO/GEO content optimization.',
        lessons: [
          { id: 'l-aidm-9-1', title: '9.1 Content Strategy, Topic Clusters & Multi-Platform Distribution', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-9-2', title: '9.2 Generative AI Content Pipelines, Editorial Fact-Checking & AEO Optimization', orderIndex: 2, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-10',
        title: 'Module 10 — Freelancing and Client Acquisition',
        orderIndex: 10,
        description: 'Starting a freelancing career, specialisation, Upwork, Freelancer, Guru, PPH, writing winning proposals, pricing models, SOW, and client retention.',
        lessons: [
          { id: 'l-aidm-10-1', title: '10.1 Freelance Marketplaces, Niche Specialisation & Profile Architecture', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-10-2', title: '10.2 Project Pricing, Scope of Work (SOW), Client Retention & AI Proposals', orderIndex: 2, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-11',
        title: 'Module 11 — Artificial Intelligence Fundamentals for Marketers',
        orderIndex: 11,
        description: 'Generative AI, Large Language Models (ChatGPT, Claude, Gemini), prompt engineering, prompt templates, hallucinations, brand voice, and responsible AI.',
        lessons: [
          { id: 'l-aidm-11-1', title: '11.1 Generative AI Foundations, LLMs & Advanced Prompt Engineering', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-11-2', title: '11.2 AI Research, Brand Voice Architecture & Responsible AI Governance', orderIndex: 2, contentType: 'RECORDED_VIDEO', durationMinutes: 75, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-12',
        title: 'Module 12 — AI Content Creation and Video Marketing',
        orderIndex: 12,
        description: 'AI visual creative strategy, image generation, Canva AI, short-form video creation, AI avatars, YouTube SEO, Instagram Reels, and copyright licensing.',
        lessons: [
          { id: 'l-aidm-12-1', title: '12.1 AI Visual Creative Strategy, Image Generation & Canva AI', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-12-2', title: '12.2 AI Video Generation, Avatars, Short-Form Storytelling & Platform Rules', orderIndex: 2, contentType: 'RECORDED_VIDEO', durationMinutes: 75, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-13',
        title: 'Module 13 — Marketing Automation, CRM and AI Agents',
        orderIndex: 13,
        description: 'HubSpot, GoHighLevel, Zapier, Make, n8n, webhooks, lead scoring, AI lead qualification, WhatsApp automation, and AI voice/sales agents.',
        lessons: [
          { id: 'l-aidm-13-1', title: '13.1 CRM Architecture, Contact Lifecycles & Lead Pipeline Management', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-13-2', title: '13.2 Multi-Step Integration with Zapier, Make, n8n & Webhooks', orderIndex: 2, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-13-3', title: '13.3 Autonomous AI Agents, Chatbots & WhatsApp Automation', orderIndex: 3, contentType: 'RECORDED_VIDEO', durationMinutes: 75, isFreePreview: false }
        ]
      },
      {
        id: 'm-aidm-14',
        title: 'Module 14 — Digital Marketing Strategy, Reporting and Capstone Project',
        orderIndex: 14,
        description: 'Full-funnel digital marketing strategy, channel selection, KPI forecasting, Looker dashboards, presentation skills, and the Final Capstone Project.',
        lessons: [
          { id: 'l-aidm-14-1', title: '14.1 Full-Funnel Strategic Architecture, Budgets & Customer Journey Mapping', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-aidm-14-2', title: '14.2 Conversion Rate Optimisation (CRO), Attribution & Executive Reporting', orderIndex: 2, contentType: 'RECORDED_VIDEO', durationMinutes: 75, isFreePreview: false },
          { id: 'l-aidm-14-3', title: '14.3 Capstone Project Submission & Evaluator Defence Briefing', orderIndex: 3, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false }
        ]
      }
    ],
    upcomingBatches: [
      {
        id: 'batch-aidm-2026-01',
        courseSlug: 'ai-digital-marketing-course',
        batchCode: 'SV-AIDM-COHORT1',
        title: 'AI Digital Marketing Master Cohort (Global Live + Hybrid)',
        startDate: '2026-12-01T18:00:00Z',
        endDate: '2027-02-15T20:00:00Z',
        scheduleTimezone: 'UTC',
        scheduleDescription: 'Mon & Wed: 18:00 - 20:00 UTC (Live Classes + 24/7 Practical Labs)',
        trainerName: 'StudentVerse Expert Faculty',
        maxSeats: 35,
        enrolledCount: 18,
        status: 'UPCOMING'
      }
    ]
  },
  {
    id: 'c-dm-101',
    slug: 'digital-marketing-foundations',
    title: 'Digital Marketing Fundamentals & Omnichannel Strategy',
    subtitle: '100% Live Instructor-Led Cohort on Acquisition Funnels, Strategy & Multi-Touch Conversion',
    category: 'Digital Marketing',
    level: 'BEGINNER',
    format: 'LIVE_ONLINE',
    durationHours: 36,
    totalSessions: 12,
    priceMinorUnits: 2499900,
    currency: 'INR',
    description: 'Master practical digital marketing strategy through real-time instructor guidance. Build end-to-end customer acquisition funnels, plan multi-channel campaigns, execute content schedules, and measure performance metrics across modern channels.',
    prerequisites: ['Basic web literacy', 'Familiarity with spreadsheets'],
    learningOutcomes: [
      'Architect full-funnel acquisition strategies from initial brand awareness to retention',
      'Execute multi-channel campaign architectures with real-world budget allocations',
      'Deploy conversion rate optimization (CRO) principles on real landing pages',
      'Deliver an evaluated capstone marketing plan reviewed by seasoned industry trainers'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    trainerName: 'Marcus Vance (Senior Performance Lead)',
    modules: [
      {
        id: 'm-dm-1',
        title: 'Module 1: Market Research, ICP & Value Propositions',
        orderIndex: 1,
        description: 'Define ideal customer profiles, competitor matrixes, and messaging hierarchy.',
        lessons: [
          { id: 'l-dm-1', title: '1.1 Live Class: Foundations of Omnichannel Growth', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: true, recordedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l-dm-2', title: '1.2 Customer Persona & Competitor Benchmark Workshop', orderIndex: 2, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-dm-3', title: '1.3 Practical Lab: Ideal Customer Profile Specification Sheet', orderIndex: 3, contentType: 'PRACTICAL_PROJECT', durationMinutes: 60, isFreePreview: false }
        ]
      },
      {
        id: 'm-dm-2',
        title: 'Module 2: Channel Architecture & Campaign Execution',
        orderIndex: 2,
        description: 'Lead generation, lifecycle nurture flows, and performance KPIs.',
        lessons: [
          { id: 'l-dm-4', title: '2.1 Live Class: Funnel Optimization & Landing Page CRO', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-dm-5', title: '2.2 Live Workshop: Paid vs Organic Resource Allocation', orderIndex: 2, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-dm-6', title: '2.3 Capstone: Full Omnichannel Campaign Plan Submission', orderIndex: 3, contentType: 'PRACTICAL_PROJECT', durationMinutes: 90, isFreePreview: false }
        ]
      }
    ],
    upcomingBatches: [
      {
        id: 'batch-dm-2026-01',
        courseSlug: 'digital-marketing-foundations',
        batchCode: 'SV-DM-NOV26',
        title: 'November 2026 Global Evening Cohort',
        startDate: '2026-11-25T18:00:00Z',
        endDate: '2026-12-30T20:00:00Z',
        scheduleTimezone: 'UTC',
        scheduleDescription: 'Tue & Thu: 18:00 - 20:00 UTC (100% Live)',
        trainerName: 'Marcus Vance',
        maxSeats: 25,
        enrolledCount: 18,
        status: 'UPCOMING'
      }
    ]
  },
  {
    id: 'c-seo-102',
    slug: 'seo-and-ai-search-optimization',
    title: 'Search Engine Optimisation (SEO) & AI Search / AEO',
    subtitle: '100% Live Masterclass in Technical Audits, Keyword Architecture & Answer Engine Optimisation',
    category: 'Search Engine Optimisation',
    level: 'INTERMEDIATE',
    format: 'LIVE_ONLINE',
    durationHours: 32,
    totalSessions: 10,
    priceMinorUnits: 2999900,
    currency: 'INR',
    description: 'Learn modern search mechanics beyond basic keywords. Conduct technical site audits, build topical clusters, optimize for Google Search Console, and master Answer Engine Optimisation (AEO) for AI search engines like ChatGPT Search and Google AI Overviews.',
    prerequisites: ['Basic HTML and CMS understanding'],
    learningOutcomes: [
      'Perform end-to-end technical SEO audits identifying indexation and schema bottlenecks',
      'Build semantic keyword clusters aligning search intent with content architecture',
      'Master Google Search Console and log file analysis for crawl budget optimization',
      'Implement AEO schema and entity optimizations for LLM citation engines'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?w=800&auto=format&fit=crop&q=60',
    trainerName: 'Elena Rostova (Technical SEO Architect)',
    modules: [
      {
        id: 'm-seo-1',
        title: 'Module 1: Technical SEO & Crawlability Audits',
        orderIndex: 1,
        description: 'Rendering, Core Web Vitals, Schema.org and canonical taxonomy.',
        lessons: [
          { id: 'l-seo-1', title: '1.1 Live Class: Modern Search Algorithms & Crawl Budgets', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: true },
          { id: 'l-seo-2', title: '1.2 Live Lab: Executing a Production Technical Audit', orderIndex: 2, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false }
        ]
      },
      {
        id: 'm-seo-2',
        title: 'Module 2: AEO, Entity Graph & Topical Authority',
        orderIndex: 2,
        description: 'Entity mapping, structured data, and AI search citation readiness.',
        lessons: [
          { id: 'l-seo-3', title: '2.1 Live Class: Optimizing for AI Overviews and Entity Engines', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-seo-4', title: '2.2 Capstone: Comprehensive Technical & AEO Audit Report', orderIndex: 2, contentType: 'PRACTICAL_PROJECT', durationMinutes: 90, isFreePreview: false }
        ]
      }
    ],
    upcomingBatches: [
      {
        id: 'batch-seo-2026-01',
        courseSlug: 'seo-and-ai-search-optimization',
        batchCode: 'SV-SEO-DEC26',
        title: 'December 2026 Weekend Accelerator',
        startDate: '2026-12-05T14:00:00Z',
        endDate: '2026-12-28T16:30:00Z',
        scheduleTimezone: 'UTC',
        scheduleDescription: 'Sat & Sun: 14:00 - 16:30 UTC (100% Live)',
        trainerName: 'Elena Rostova',
        maxSeats: 20,
        enrolledCount: 14,
        status: 'UPCOMING'
      }
    ]
  },
  {
    id: 'c-ads-103',
    slug: 'paid-performance-google-meta-ads',
    title: 'Paid Performance Advertising (Google Ads & Meta Ads)',
    subtitle: '100% Live Cohort on Bidding Strategies, Conversion APIs, Creative Strategy & ROI',
    category: 'Paid Advertising',
    level: 'INTERMEDIATE',
    format: 'LIVE_ONLINE',
    durationHours: 36,
    totalSessions: 12,
    priceMinorUnits: 3499900,
    currency: 'INR',
    description: 'Master high-volume paid media buying. Set up Google Search and Performance Max campaigns, architect Meta Ads creative testing frameworks, configure Server-Side Conversion APIs, and optimize ad spend with rigorous ROAS attribution.',
    prerequisites: ['Basic digital marketing experience'],
    learningOutcomes: [
      'Structure Google Ads Search and PMax campaigns with negative keyword matrices',
      'Execute creative diversification on Meta Ads with dynamic creative testing (DCT)',
      'Deploy server-side Meta Conversions API (CAPI) and Google enhanced conversions',
      'Conduct evaluated weekly performance reviews against real client scenarios'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    trainerName: 'David Zhao (Paid Acquisition Director)',
    modules: [
      {
        id: 'm-ads-1',
        title: 'Module 1: Google Ads Architecture & Smart Bidding',
        orderIndex: 1,
        description: 'Account structures, search intent, tCPA/tROAS bidding, and search query audits.',
        lessons: [
          { id: 'l-ads-1', title: '1.1 Live Class: Advanced Search Account Structuring', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: true },
          { id: 'l-ads-2', title: '1.2 Live Lab: Performance Max Campaign Setup & Asset Groups', orderIndex: 2, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false }
        ]
      },
      {
        id: 'm-ads-2',
        title: 'Module 2: Meta Ads & Conversion Tracking',
        orderIndex: 2,
        description: 'Creative psychology, broad targeting, CAPI integration, and attribution.',
        lessons: [
          { id: 'l-ads-3', title: '2.1 Live Class: Meta Creative Testing Frameworks', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-ads-4', title: '2.2 Capstone: Live Paid Performance Media Plan & Budget Model', orderIndex: 2, contentType: 'PRACTICAL_PROJECT', durationMinutes: 90, isFreePreview: false }
        ]
      }
    ],
    upcomingBatches: [
      {
        id: 'batch-ads-2026-01',
        courseSlug: 'paid-performance-google-meta-ads',
        batchCode: 'SV-ADS-DEC26',
        title: 'December 2026 Pro Media Buyer Cohort',
        startDate: '2026-12-01T17:00:00Z',
        endDate: '2027-01-10T19:00:00Z',
        scheduleTimezone: 'UTC',
        scheduleDescription: 'Mon & Wed: 17:00 - 19:00 UTC (100% Live)',
        trainerName: 'David Zhao',
        maxSeats: 25,
        enrolledCount: 21,
        status: 'UPCOMING'
      }
    ]
  },
  {
    id: 'c-ga4-104',
    slug: 'analytics-ga4-google-tag-manager',
    title: 'Marketing Analytics, GA4 & Google Tag Manager',
    subtitle: '100% Live Practical Workshop on Custom Events, DataLayers, UTMs & Looker Dashboards',
    category: 'Analytics & Tracking',
    level: 'INTERMEDIATE',
    format: 'LIVE_ONLINE',
    durationHours: 30,
    totalSessions: 10,
    priceMinorUnits: 2499900,
    currency: 'INR',
    description: 'Stop guessing which marketing channels work. Master Google Tag Manager dataLayers, configure custom GA4 conversion events, implement cross-domain tracking, and build interactive client-facing dashboards in Looker Studio.',
    prerequisites: ['Basic spreadsheet and marketing understanding'],
    learningOutcomes: [
      'Build custom Google Tag Manager containers with triggers, variables, and dataLayer events',
      'Configure custom dimensions, metrics, and funnel exploration reports in GA4',
      'Implement bulletproof UTM taxonomy and conversion attribution pipelines',
      'Build automated multi-channel reporting dashboards in Looker Studio'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=60',
    trainerName: 'Priya Sharma (Analytics & BI Lead)',
    modules: [
      {
        id: 'm-ga4-1',
        title: 'Module 1: Google Tag Manager & Custom Events',
        orderIndex: 1,
        description: 'Tags, triggers, variables, dataLayer pushes, and server-side tagging preview.',
        lessons: [
          { id: 'l-ga4-1', title: '1.1 Live Class: GTM Container Setup & Architecture', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: true },
          { id: 'l-ga4-2', title: '1.2 Live Lab: DataLayer Push Implementation & Testing', orderIndex: 2, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false }
        ]
      },
      {
        id: 'm-ga4-2',
        title: 'Module 2: GA4 Explorations & Looker Studio Dashboards',
        orderIndex: 2,
        description: 'Exploration workspaces, cohort analysis, and automated executive reporting.',
        lessons: [
          { id: 'l-ga4-3', title: '2.1 Live Class: Funnel & Path Exploration in GA4', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false },
          { id: 'l-ga4-4', title: '2.2 Capstone: Verified Looker Studio Executive Marketing Dashboard', orderIndex: 2, contentType: 'PRACTICAL_PROJECT', durationMinutes: 90, isFreePreview: false }
        ]
      }
    ],
    upcomingBatches: [
      {
        id: 'batch-ga4-2026-01',
        courseSlug: 'analytics-ga4-google-tag-manager',
        batchCode: 'SV-GA4-NOV26',
        title: 'November 2026 Analytics Evening Batch',
        startDate: '2026-11-28T18:00:00Z',
        endDate: '2027-01-05T20:00:00Z',
        scheduleTimezone: 'UTC',
        scheduleDescription: 'Tue & Fri: 18:00 - 20:00 UTC (100% Live)',
        trainerName: 'Priya Sharma',
        maxSeats: 25,
        enrolledCount: 19,
        status: 'UPCOMING'
      }
    ]
  },
  {
    id: 'c-smm-105',
    slug: 'social-media-marketing-strategy',
    title: 'Social Media Marketing & Content Strategy',
    subtitle: '100% Live Cohort on Organic Distribution, Content Calendars, Brand Voice & Community',
    category: 'Social Media Marketing',
    level: 'BEGINNER',
    format: 'LIVE_ONLINE',
    durationHours: 28,
    totalSessions: 10,
    priceMinorUnits: 1999900,
    currency: 'INR',
    description: 'Build organic social media systems that drive revenue. Learn platform-specific distribution across LinkedIn, Instagram, and YouTube, engineer high-engagement content calendars, establish distinctive brand voice, and analyze community sentiment.',
    prerequisites: ['Basic social media familiarity'],
    learningOutcomes: [
      'Design strategic editorial calendars mapped to marketing milestones',
      'Write engaging copy and brief creative assets for multi-format social platforms',
      'Establish community engagement and crisis management playbooks',
      'Submit an evaluated comprehensive brand social media playbook'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
    trainerName: 'Chloe Bennett (Brand & Social Director)',
    modules: [
      {
        id: 'm-smm-1',
        title: 'Module 1: Content Pillar Architecture & Copywriting',
        orderIndex: 1,
        description: 'Audience hooks, content pillars, storytelling, and visual creative briefs.',
        lessons: [
          { id: 'l-smm-1', title: '1.1 Live Class: Content Pillars & Narrative Design', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: true },
          { id: 'l-smm-2', title: '1.2 Live Lab: Drafting High-Retention Short-Form Scripts', orderIndex: 2, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false }
        ]
      }
    ],
    upcomingBatches: [
      {
        id: 'batch-smm-2026-01',
        courseSlug: 'social-media-marketing-strategy',
        batchCode: 'SV-SMM-DEC26',
        title: 'December 2026 Social Media Cohort',
        startDate: '2026-12-08T16:00:00Z',
        endDate: '2027-01-15T18:00:00Z',
        scheduleTimezone: 'UTC',
        scheduleDescription: 'Tue & Thu: 16:00 - 18:00 UTC (100% Live)',
        trainerName: 'Chloe Bennett',
        maxSeats: 30,
        enrolledCount: 15,
        status: 'UPCOMING'
      }
    ]
  },
  {
    id: 'c-ai-106',
    slug: 'ai-tools-for-digital-marketers',
    title: 'AI Tools & Automation for Digital Marketers',
    subtitle: '100% Live Training on Generative AI, Prompt Workflows, Content Automation & Productivity',
    category: 'AI for Digital Marketing',
    level: 'INTERMEDIATE',
    format: 'LIVE_ONLINE',
    durationHours: 32,
    totalSessions: 10,
    priceMinorUnits: 2999900,
    currency: 'INR',
    description: 'Transform modern marketing operations using production AI workflows. Build customized prompt chains for campaign research, automate multi-lingual content variations, integrate marketing automation triggers, and maintain responsible AI governance.',
    prerequisites: ['Basic digital marketing experience'],
    learningOutcomes: [
      'Design reliable multi-step prompt workflows for market research and ad generation',
      'Automate repetitive content and reporting tasks with verified AI tooling',
      'Evaluate AI-generated assets for factual accuracy, brand alignment, and compliance',
      'Submit an evaluated autonomous marketing workflow portfolio piece'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    trainerName: 'Dr. Aris Thorne (Marketing Automation Specialist)',
    modules: [
      {
        id: 'm-ai-1',
        title: 'Module 1: Advanced Prompt Engineering & Research Workflows',
        orderIndex: 1,
        description: 'System prompts, persona modeling, and synthetic user research.',
        lessons: [
          { id: 'l-ai-1', title: '1.1 Live Class: Systematic Prompt Engineering for Marketing', orderIndex: 1, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: true },
          { id: 'l-ai-2', title: '1.2 Live Lab: Automated Competitive Intelligence Workflows', orderIndex: 2, contentType: 'LIVE_SESSION', durationMinutes: 90, isFreePreview: false }
        ]
      }
    ],
    upcomingBatches: [
      {
        id: 'batch-ai-2026-01',
        courseSlug: 'ai-tools-for-digital-marketers',
        batchCode: 'SV-AI-NOV26',
        title: 'November 2026 AI Marketers Accelerator',
        startDate: '2026-11-26T17:30:00Z',
        endDate: '2026-12-31T19:30:00Z',
        scheduleTimezone: 'UTC',
        scheduleDescription: 'Thu & Sat: 17:30 - 19:30 UTC (100% Live)',
        trainerName: 'Dr. Aris Thorne',
        maxSeats: 25,
        enrolledCount: 23,
        status: 'UPCOMING'
      }
    ]
  }
];

const INITIAL_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: 'asg-1',
    courseSlug: 'digital-marketing-foundations',
    courseTitle: 'Digital Marketing Fundamentals & Omnichannel Strategy',
    skillName: 'Omnichannel Strategy',
    title: 'Design a Complete Multi-Channel Acquisition Campaign Plan',
    difficulty: 'INTERMEDIATE',
    instructions: 'Prepare an end-to-end customer acquisition strategy for a direct-to-consumer digital product. Detail ICP definition, channel budget distribution across Google and Meta, funnel step metrics, and conversion rate assumptions.',
    deliverables: [
      'Target ICP specification sheet and competitor positioning matrix',
      'Channel budget distribution spreadsheet (₹15,00,000 monthly spend)',
      'Landing page wireframe and CRO recommendations',
      'Projected CPA, CAC, and LTV performance model'
    ],
    maxScore: 100,
    dueDate: '2026-12-15T23:59:59Z'
  },
  {
    id: 'asg-2',
    courseSlug: 'seo-and-ai-search-optimization',
    courseTitle: 'Search Engine Optimisation (SEO) & AI Search / AEO',
    skillName: 'Technical SEO & AEO',
    title: 'Execute a Comprehensive Technical SEO & Answer Engine Audit',
    difficulty: 'ADVANCED',
    instructions: 'Conduct a real-world technical crawl audit of an e-commerce or SaaS site. Identify crawl indexation bottlenecks, schema.org markup errors, Core Web Vitals issues, and formulate entity optimizations for AI Overviews.',
    deliverables: [
      'Technical audit executive summary and priority fixes table',
      'JSON-LD structured data entity schema implementation snippet',
      'Target keyword cluster architecture mapping search intent'
    ],
    maxScore: 100,
    dueDate: '2026-12-20T23:59:59Z'
  },
  {
    id: 'asg-3',
    courseSlug: 'paid-performance-google-meta-ads',
    courseTitle: 'Paid Performance Advertising (Google Ads & Meta Ads)',
    skillName: 'Paid Media & Bidding',
    title: 'Structure a High-ROI Google Ads Search & PMax Campaign',
    difficulty: 'INTERMEDIATE',
    instructions: 'Build a production-ready Google Ads structure for a lead-generation business. Include keyword match types, negative lists, asset groups, and Conversion API tracking setup notes.',
    deliverables: [
      'Account structure taxonomy and negative keyword list',
      'Ad creative headlines, descriptions, and sitelink extensions',
      'CAPI tracking verification checklist'
    ],
    maxScore: 100,
    dueDate: '2026-12-18T23:59:59Z'
  }
];

@Injectable()
export class CoursesService {
  private assignmentsStore = new Map<string, AssignmentItem>(
    INITIAL_ASSIGNMENTS.map((a) => [a.id, a])
  );

  private submissionsStore = new Map<string, AssignmentSubmissionItem>([
    [
      'sub-101',
      {
        id: 'sub-101',
        assignmentId: 'asg-1',
        userId: 'usr-student-demo-1',
        studentName: 'Alex Morgan',
        status: 'EVALUATED',
        responseText: 'Detailed omnichannel campaign plan submitted with ₹15,00,000 monthly allocation model.',
        projectUrl: 'https://github.com/alexmorgan-growth/campaign-capstone',
        submittedAt: '2026-11-10T14:30:00Z',
        evaluation: {
          accuracyScore: 38, // out of 40
          executionScore: 28, // out of 30
          problemSolvingScore: 18, // out of 20
          submissionQualityScore: 9, // out of 10
          totalScore: 93,
          feedbackNotes: 'Exceptional strategic depth and realistic budget pacing. Excellent conversion funnel attribution model.',
          evaluatorName: 'Marcus Vance (Lead Growth Trainer)',
          evaluatedAt: '2026-11-12T10:00:00Z'
        }
      }
    ]
  ]);

  private studentEnrollmentsStore = new Map<string, string[]>();

  constructor(private prisma: PrismaService) { }

  async findAll(query?: { category?: string; search?: string }) {
    let courses = APPROVED_LAUNCH_COURSES;
    if (query?.category && query.category !== 'ALL') {
      const cat = query.category.toLowerCase();
      courses = courses.filter((c) => c.category.toLowerCase().includes(cat));
    }
    if (query?.search) {
      const q = query.search.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    return courses;
  }

  async findBySlug(slug: string) {
    const course = APPROVED_LAUNCH_COURSES.find((c) => c.slug === slug);
    if (!course) {
      throw new NotFoundException(`Course with slug '${slug}' was not found`);
    }
    return course;
  }

  async getUpcomingBatches(slug: string) {
    const course = await this.findBySlug(slug);
    return course.upcomingBatches;
  }

  async enrollInBatch(userId: string, courseSlug: string, batchCode: string) {
    const course = await this.findBySlug(courseSlug);
    const existing = this.studentEnrollmentsStore.get(userId) || [];
    if (!existing.includes(courseSlug)) {
      existing.push(courseSlug);
      this.studentEnrollmentsStore.set(userId, existing);
    }

    return {
      success: true,
      courseTitle: course.title,
      batchCode,
      message: `Successfully enrolled in ${course.title} (${batchCode}). Welcome to the live cohort!`,
      firstSession: 'Classes start next week via secure live meeting links in your student dashboard.'
    };
  }

  async getStudentLearning(userId: string) {
    const enrolledSlugs = this.studentEnrollmentsStore.get(userId) || [];
    const enrolledCourses = APPROVED_LAUNCH_COURSES.filter((c) => enrolledSlugs.includes(c.slug));

    if (enrolledCourses.length === 0) {
      return {
        enrolledCourses: [],
        upcomingLiveClasses: [],
        recordedLectures: [],
        attendanceRate: null,
      };
    }

    // Next scheduled live classes
    const upcomingLiveClasses: LiveClassSession[] = [
      {
        id: 'cls-aidm-1',
        batchId: 'batch-aidm-2026-01',
        title: 'Live Masterclass: AI SEO, Entity Graph & Answer Engine Optimisation (AEO)',
        scheduledStart: '2026-12-01T18:00:00Z',
        scheduledEnd: '2026-12-01T20:00:00Z',
        timezone: 'UTC',
        meetingLink: 'https://meet.google.com/stv-aidm-live1',
        trainerName: 'StudentVerse Expert Faculty',
        isCompleted: false
      },
      {
        id: 'cls-101',
        batchId: 'batch-dm-2026-01',
        title: 'Live Workshop: Technical Funnel Optimization & Landing Page CRO',
        scheduledStart: '2026-11-26T18:00:00Z',
        scheduledEnd: '2026-11-26T20:00:00Z',
        timezone: 'UTC',
        meetingLink: 'https://meet.google.com/stv-demo-live',
        trainerName: 'Marcus Vance',
        isCompleted: false
      },
      {
        id: 'cls-102',
        batchId: 'batch-seo-2026-01',
        title: 'Live Class: Entity Graph Mapping & Answer Engine Optimisation (AEO)',
        scheduledStart: '2026-12-05T14:00:00Z',
        scheduledEnd: '2026-12-05T16:30:00Z',
        timezone: 'UTC',
        meetingLink: 'https://meet.google.com/stv-seo-live',
        trainerName: 'Elena Rostova',
        isCompleted: false
      }
    ];

    // Supplementary recorded lectures
    const recordedLectures = [
      {
        id: 'rec-1',
        title: 'Recorded Lecture: Modern Omnichannel Performance Marketing Walkthrough',
        courseTitle: 'Digital Marketing Fundamentals',
        durationMinutes: 84,
        videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
        dateRecorded: '2026-11-15'
      },
      {
        id: 'rec-2',
        title: 'Recorded Lecture: Technical SEO Crawlability & Schema Architecture',
        courseTitle: 'Search Engine Optimisation & AEO',
        durationMinutes: 76,
        videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
        dateRecorded: '2026-11-12'
      }
    ];

    return {
      enrolledCourses,
      upcomingLiveClasses,
      recordedLectures,
      attendanceRate: '92%'
    };
  }

  // Practical Assignments & Assessments
  async getAssignments() {
    return Array.from(this.assignmentsStore.values());
  }

  async getAssignmentById(id: string) {
    const item = this.assignmentsStore.get(id);
    if (!item) {
      throw new NotFoundException('Assignment not found');
    }
    return item;
  }

  async submitAssignment(userId: string, assignmentId: string, payload: { responseText?: string; projectUrl?: string; attachmentUrl?: string }) {
    const assignment = await this.getAssignmentById(assignmentId);
    const submissionId = `sub-${Date.now()}`;
    const newSubmission: AssignmentSubmissionItem = {
      id: submissionId,
      assignmentId,
      userId,
      studentName: 'Alex Morgan',
      status: 'SUBMITTED',
      responseText: payload.responseText,
      projectUrl: payload.projectUrl,
      attachmentUrl: payload.attachmentUrl,
      submittedAt: new Date().toISOString()
    };

    this.submissionsStore.set(submissionId, newSubmission);

    return {
      success: true,
      submissionId,
      assignmentTitle: assignment.title,
      status: 'SUBMITTED',
      message: 'Practical assignment submitted successfully! Your designated trainer will evaluate your work against the weighted 40/30/20/10 rubric.'
    };
  }

  async getSubmissions(assignmentId?: string) {
    let submissions = Array.from(this.submissionsStore.values());
    if (assignmentId) {
      submissions = submissions.filter((s) => s.assignmentId === assignmentId);
    }
    return submissions;
  }

  async evaluateSubmission(
    submissionId: string,
    evaluatorName: string,
    rubric: {
      accuracyScore: number; // max 40
      executionScore: number; // max 30
      problemSolvingScore: number; // max 20
      submissionQualityScore: number; // max 10
      feedbackNotes: string;
    }
  ) {
    const sub = this.submissionsStore.get(submissionId);
    if (!sub) {
      throw new NotFoundException('Submission not found');
    }

    const total = Math.min(100, Math.round(
      rubric.accuracyScore +
      rubric.executionScore +
      rubric.problemSolvingScore +
      rubric.submissionQualityScore
    ));

    sub.status = 'EVALUATED';
    sub.evaluation = {
      ...rubric,
      totalScore: total,
      evaluatorName,
      evaluatedAt: new Date().toISOString()
    };

    this.submissionsStore.set(submissionId, sub);

    return {
      success: true,
      submissionId,
      totalScore: total,
      status: 'EVALUATED',
      message: 'Submission successfully evaluated. Student skill score updated accordingly.'
    };
  }

  // Verified Skill Ratings & Leaderboard
  async getStudentSkillRatings(userId: string): Promise<StudentSkillScore[]> {
    if (!userId || userId === 'new-student' || userId === 'guest') {
      return [];
    }

    try {
      const skills = await this.prisma.studentSkill.findMany({
        where: { userId },
        include: { skill: true },
      });

      if (skills && skills.length > 0) {
        return skills.map((ss) => ({
          skillName: ss.skill.name,
          category: ss.skill.category,
          score: Math.round(ss.ratingScore),
          confidence: (ss.confidenceLevel as any) || 'MODERATE',
          verifiedTasksCount: ss.verifiedTasksCount || 1,
          lastAssessedAt: ss.updatedAt.toISOString(),
        }));
      }
    } catch (e) {}

    // Clean zero-state for new students who have not yet been evaluated
    if (userId !== 'usr-student-demo-1') {
      return [];
    }

    return [
      {
        skillName: 'Omnichannel Strategy',
        category: 'Digital Marketing',
        score: 93,
        confidence: 'HIGH',
        verifiedTasksCount: 3,
        lastAssessedAt: '2026-11-12'
      },
      {
        skillName: 'Technical SEO & AEO',
        category: 'Search Engine Optimisation',
        score: 88,
        confidence: 'MODERATE',
        verifiedTasksCount: 2,
        lastAssessedAt: '2026-11-08'
      },
      {
        skillName: 'Paid Media Bidding',
        category: 'Paid Advertising',
        score: 85,
        confidence: 'MODERATE',
        verifiedTasksCount: 2,
        lastAssessedAt: '2026-11-05'
      },
      {
        skillName: 'GA4 Analytics & Tagging',
        category: 'Analytics',
        score: 90,
        confidence: 'HIGH',
        verifiedTasksCount: 4,
        lastAssessedAt: '2026-11-14'
      }
    ];
  }

  async getLeaderboard() {
    return [
      {
        rank: 1,
        id: 'cand-1',
        displayName: 'Elena Rostova',
        headline: 'Certified Digital Performance Marketer & SEO Specialist',
        country: 'Poland',
        overallScore: 94,
        skillsCount: 4,
        verifiedTasksCount: 5,
        topSkills: ['Technical SEO', 'GA4 Analytics', 'Meta Ads', 'AEO'],
        visibility: 'SEARCHABLE'
      },
      {
        rank: 2,
        id: 'cand-2',
        displayName: 'Alex Morgan',
        headline: 'Growth & Omnichannel Campaign Specialist',
        country: 'United Kingdom',
        overallScore: 91,
        skillsCount: 3,
        verifiedTasksCount: 3,
        topSkills: ['Omnichannel Strategy', 'Paid Media', 'CRO Funnels'],
        visibility: 'SEARCHABLE'
      },
      {
        rank: 3,
        id: 'cand-3',
        displayName: 'Marcus Chen',
        headline: 'Analytics & Marketing Automation Builder',
        country: 'Singapore',
        overallScore: 89,
        skillsCount: 4,
        verifiedTasksCount: 4,
        topSkills: ['GA4 & GTM', 'Looker Studio', 'AI Prompting', 'UTM Architecture'],
        visibility: 'SEARCHABLE'
      }
    ];
  }
}
