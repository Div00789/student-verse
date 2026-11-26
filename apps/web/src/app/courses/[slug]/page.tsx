import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  GraduationCap,
  CheckCircle2,
  Award,
  PlayCircle,
  FileText,
  Layers,
  ShieldCheck,
  ArrowLeft,
  Video,
  Calendar,
  Users,
  Check
} from 'lucide-react';
import { formatINR } from '../../../lib/currency';
import EnrollmentActionButton from '../../../components/EnrollmentActionButton';
import { getCourseBySlug } from '../../../lib/courseService';
import { buildAiBusinessAutomationCurriculum } from '../../../lib/aiBusinessAutomationCurriculum';

const COURSE_DATA: Record<string, any> = {
  'ai-digital-marketing-course': {
    slug: 'ai-digital-marketing-course',
    title: 'AI Digital Marketing Course',
    subtitle: 'Comprehensive 14-Module Professional Programme: SEO, PPC, GA4, Paid Media, Automation & Modern AI Tools',
    category: 'Digital Marketing / Artificial Intelligence / Career Development',
    level: 'BEGINNER TO ADVANCED',
    format: 'LIVE CLASSES + RECORDED LECTURES + PRACTICAL PROJECTS',
    durationHours: 48,
    totalSessions: 16,
    originalPrice: 37499,
    discountPercent: 20,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    trainerName: 'StudentVerse Expert Faculty (Industry Growth Directors & AI Leads)',
    batchCode: 'SV-AIDM-COHORT1',
    batchSchedule: 'Mon & Wed: 18:00 - 20:00 UTC (100% Live Sessions + 24/7 Practical Labs)',
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
    modules: [
      {
        title: 'Module 1: Search Engine Optimisation (SEO)',
        lessons: [
          { title: '1.1 Search Foundations, Indexation & Keyword Intelligence (Topics 1-12)', type: 'LIVE_SESSION', duration: '90 min', freePreview: true },
          { title: '1.2 On-Page SEO, Header Hierarchy & Semantic Content Architecture (Topics 13-27)', type: 'RECORDED_VIDEO', duration: '75 min', freePreview: false },
          { title: '1.3 Technical SEO, Core Web Vitals & Crawlability Audits (Topics 28-43)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '1.4 Off-Page SEO, Digital PR & Ethical Link Building (Topics 44-51)', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: false },
          { title: '1.5 Industry SEO Toolstack Mastery & Analytics Setup (Topics 52-60)', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: false },
          { title: '1.6 AI SEO, Answer Engine Optimisation (AEO) & GEO (Topics 61-72)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: 'Practical Deliverable: Complete SEO Audit & Keyword Architecture Report', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 2: Pay-Per-Click Advertising (Google Ads)',
        lessons: [
          { title: '2.1 Google Ads Architecture & Campaign Types (Topics 1-17)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '2.2 Bidding Strategies, Performance Metrics & ROAS Optimization (Topics 18-34)', type: 'RECORDED_VIDEO', duration: '75 min', freePreview: false },
          { title: '2.3 Campaign Management, Conversion Tracking & Landing Page CRO (Topics 35-49)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '2.4 AI for Google Ads: Keyword Clustering & Performance Automation (Topics 50-56)', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: false },
          { title: 'Practical Deliverable: Complete Google Search & PMax Campaign Build', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 3: Google Analytics 4 (GA4)',
        lessons: [
          { title: '3.1 GA4 Architecture, Tag Installation & Metric Fundamentals (Topics 1-17)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '3.2 Traffic Acquisition, UTM Governance & Attribution Modeling (Topics 18-26)', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: false },
          { title: '3.3 Conversions, Key Events & Executive Looker Studio Dashboards (Topics 27-40)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '3.4 AI Analytics, Automated Insights & Anomaly Detection (Topics 41-45)', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: false },
          { title: 'Practical Deliverable: GA4 Event Tracking & Looker Studio BI Dashboard', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 4: Social Media Marketing (Paid Advertising)',
        lessons: [
          { title: '4.1 Paid Social Media Architecture & Audience Targeting (Topics 1-14)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '4.2 Creative Diversification, Ad Copywriting & Conversion APIs (Topics 15-23)', type: 'RECORDED_VIDEO', duration: '75 min', freePreview: false },
          { title: '4.3 AI-Driven Creative Testing & Lead Gen Campaign Optimization (Topics 24-28)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: 'Practical Deliverable: Meta Ads & LinkedIn B2B Acquisition Campaign Plan', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 5: Social Media Optimisation (SMO)',
        lessons: [
          { title: '5.1 Audience Personas, Editorial Planning & Organic Distribution (Topics 1-10)', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: false },
          { title: '5.2 Community Management, Social Listening & Process Automation (Topics 11-17)', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: false },
          { title: '5.3 AI Content Ideas, AI Video & Sentiment Analysis Workflows (Topics 18-24)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: 'Practical Deliverable: 30-Day Social Content Calendar & Automation Playbook', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 6: Email Marketing',
        lessons: [
          { title: '6.1 Permission List Building, Interactive Design & Sequence Strategy (Topics 1-12)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '6.2 Email Infrastructure, Authentication (SPF/DKIM/DMARC) & High-Volume Compliance (Topics 13-24)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '6.3 Email Metrics, Attribution & AI Copywriting Workflows (Topics 25-40)', type: 'RECORDED_VIDEO', duration: '75 min', freePreview: false },
          { title: 'Practical Deliverable: 5-Part Lead Nurture Sequence with DNS Authentication Specs', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 7: Black Hat SEO and Search Engine Guidelines',
        lessons: [
          { title: '7.1 Deceptive SEO Tactics, Spam Policies & Algorithmic Filters (Topics 1-10)', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: false },
          { title: '7.2 Penalty Remediation, Recovery Protocols & Ethical Alternatives (Topics 11-16)', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: false },
          { title: 'Practical Deliverable: Search Engine Risk Audit & Ethical Remediation Plan', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 8: Affiliate Marketing',
        lessons: [
          { title: '8.1 Affiliate Architecture, Networks, Niche Selection & Disclosures (Topics 1-13)', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: false },
          { title: '8.2 Google AdSense Integration & AI-Powered Affiliate Strategy (Topics 14-20)', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: false },
          { title: 'Practical Deliverable: High-Intent Affiliate Strategy & Revenue Model', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 9: Content Marketing',
        lessons: [
          { title: '9.1 Content Strategy, Topic Clusters & Multi-Platform Distribution (Topics 1-15)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '9.2 Generative AI Content Pipelines, Editorial Fact-Checking & AEO Optimization (Topics 16-22)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: 'Practical Deliverable: Pillar-Cluster Content Campaign & Distribution Plan', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 10: Freelancing and Client Acquisition',
        lessons: [
          { title: '10.1 Freelance Marketplaces, Niche Specialisation & Profile Architecture (Topics 1-12)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '10.2 Project Pricing, Scope of Work (SOW), Client Retention & AI Proposals (Topics 13-23)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: 'Practical Deliverable: Client Acquisition Proposal & Service Scope of Work (SOW)', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 11: Artificial Intelligence Fundamentals for Marketers',
        lessons: [
          { title: '11.1 Generative AI Foundations, LLMs & Advanced Prompt Engineering (Topics 1-10)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '11.2 AI Research, Brand Voice Architecture & Responsible AI Governance (Topics 11-16)', type: 'RECORDED_VIDEO', duration: '75 min', freePreview: false },
          { title: 'Practical Deliverable: Enterprise AI Marketing Prompt Library & Workflow Suite', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 12: AI Content Creation and Video Marketing',
        lessons: [
          { title: '12.1 AI Visual Creative Strategy, Image Generation & Canva AI (Topics 1-5)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '12.2 AI Video Generation, Avatars, Short-Form Storytelling & Platform Rules (Topics 6-17)', type: 'RECORDED_VIDEO', duration: '75 min', freePreview: false },
          { title: 'Practical Deliverable: AI Multi-Format Creative & Video Asset Package', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 13: Marketing Automation, CRM and AI Agents',
        lessons: [
          { title: '13.1 CRM Architecture, Contact Lifecycles & Lead Pipeline Management (Topics 1-11)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '13.2 Multi-Step Integration with Zapier, Make, n8n & Webhooks (Topics 12-15)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '13.3 Autonomous AI Agents, Chatbots & WhatsApp Automation (Topics 16-24)', type: 'RECORDED_VIDEO', duration: '75 min', freePreview: false },
          { title: 'Practical Deliverable: Multi-Step Lead Routing & AI CRM Qualification Workflow', type: 'PROJECT', duration: 'Lab Task', freePreview: false }
        ]
      },
      {
        title: 'Module 14: Digital Marketing Strategy, Reporting and Capstone Project',
        lessons: [
          { title: '14.1 Full-Funnel Strategic Architecture, Budgets & Customer Journey Mapping (Topics 1-8)', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '14.2 Conversion Rate Optimisation (CRO), Attribution & Executive Reporting (Topics 9-16)', type: 'RECORDED_VIDEO', duration: '75 min', freePreview: false },
          { title: '14.3 Capstone Project Submission & Evaluator Defence Briefing', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: 'Final Capstone Project: Comprehensive AI-Powered Digital Marketing Strategy', type: 'PROJECT', duration: 'Capstone', freePreview: false }
        ]
      }
    ]
  },
  'digital-marketing-foundations': {
    slug: 'digital-marketing-foundations',
    title: 'Digital Marketing Fundamentals & Omnichannel Strategy',
    subtitle: '100% Live Instructor-Led Cohort on Acquisition Funnels, Strategy & Multi-Touch Conversion',
    category: 'Digital Marketing',
    level: 'BEGINNER',
    format: '100% LIVE INSTRUCTOR-LED',
    durationHours: 36,
    totalSessions: 12,
    originalPrice: 29999,
    discountPercent: 15,
    price: 24999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    trainerName: 'Marcus Vance (Senior Performance Lead)',
    batchCode: 'SV-DM-NOV26',
    batchSchedule: 'Tue & Thu: 18:00 - 20:00 UTC (100% Live on Google Meet)',
    description: 'Master practical digital marketing strategy through real-time instructor guidance. Build end-to-end customer acquisition funnels, plan multi-channel campaigns, execute content schedules, and measure performance metrics across modern channels.',
    prerequisites: ['Basic web literacy', 'Familiarity with spreadsheets'],
    learningOutcomes: [
      'Architect full-funnel acquisition strategies from initial brand awareness to retention',
      'Execute multi-channel campaign architectures with real-world budget allocations',
      'Deploy conversion rate optimization (CRO) principles on real landing pages',
      'Deliver an evaluated capstone marketing plan reviewed by seasoned industry trainers'
    ],
    modules: [
      {
        title: 'Module 1: Market Research, ICP & Value Propositions',
        lessons: [
          { title: '1.1 Live Class: Foundations of Omnichannel Growth', type: 'LIVE_SESSION', duration: '90 min', freePreview: true },
          { title: '1.2 Live Lab: Customer Persona & Competitor Benchmark Workshop', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '1.3 Practical Deliverable: ICP Specification Sheet', type: 'PROJECT', duration: '60 min', freePreview: false }
        ]
      },
      {
        title: 'Module 2: Channel Architecture & Campaign Execution',
        lessons: [
          { title: '2.1 Live Class: Funnel Optimization & Landing Page CRO', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '2.2 Live Workshop: Paid vs Organic Resource Allocation', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '2.3 Capstone Submission: Live Multi-Channel Campaign Plan Review', type: 'PROJECT', duration: '90 min', freePreview: false }
        ]
      }
    ]
  },
  'seo-and-ai-search-optimization': {
    slug: 'seo-and-ai-search-optimization',
    title: 'Search Engine Optimisation (SEO) & AI Search / AEO',
    subtitle: '100% Live Masterclass in Technical Audits, Keyword Architecture & Answer Engine Optimisation',
    category: 'Search Engine Optimisation',
    level: 'INTERMEDIATE',
    format: '100% LIVE INSTRUCTOR-LED',
    durationHours: 32,
    totalSessions: 10,
    originalPrice: 39999,
    discountPercent: 25,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?w=800&auto=format&fit=crop&q=80',
    trainerName: 'Elena Rostova (Technical SEO Architect)',
    batchCode: 'SV-SEO-DEC26',
    batchSchedule: 'Sat & Sun: 14:00 - 16:30 UTC (100% Live on Google Meet)',
    description: 'Learn modern search mechanics beyond basic keywords. Conduct technical site audits, build topical clusters, optimize for Google Search Console, and master Answer Engine Optimisation (AEO) for AI search engines like ChatGPT Search and Google AI Overviews.',
    prerequisites: ['Basic HTML and CMS understanding'],
    learningOutcomes: [
      'Perform end-to-end technical SEO audits identifying indexation and schema bottlenecks',
      'Build semantic keyword clusters aligning search intent with content architecture',
      'Master Google Search Console and log file analysis for crawl budget optimization',
      'Implement AEO schema and entity optimizations for LLM citation engines'
    ],
    modules: [
      {
        title: 'Module 1: Technical SEO & Crawlability Audits',
        lessons: [
          { title: '1.1 Live Class: Modern Search Algorithms & Crawl Budgets', type: 'LIVE_SESSION', duration: '90 min', freePreview: true },
          { title: '1.2 Live Lab: Executing a Production Technical Audit', type: 'LIVE_SESSION', duration: '90 min', freePreview: false }
        ]
      },
      {
        title: 'Module 2: AEO, Entity Graph & Topical Authority',
        lessons: [
          { title: '2.1 Live Class: Optimizing for AI Overviews and Entity Engines', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '2.2 Capstone Deliverable: Comprehensive Technical & AEO Audit Report', type: 'PROJECT', duration: '90 min', freePreview: false }
        ]
      }
    ]
  },
  'paid-performance-google-meta-ads': {
    slug: 'paid-performance-google-meta-ads',
    title: 'Paid Performance Advertising (Google Ads & Meta Ads)',
    subtitle: '100% Live Cohort on Bidding Strategies, Conversion APIs, Creative Strategy & ROI',
    category: 'Paid Advertising',
    level: 'INTERMEDIATE',
    format: '100% LIVE INSTRUCTOR-LED',
    durationHours: 36,
    totalSessions: 12,
    originalPrice: 44999,
    discountPercent: 20,
    price: 35999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    trainerName: 'David Zhao (Paid Acquisition Director)',
    batchCode: 'SV-ADS-DEC26',
    batchSchedule: 'Mon & Wed: 17:00 - 19:00 UTC (100% Live on Google Meet)',
    description: 'Master high-volume paid media buying. Set up Google Search and Performance Max campaigns, architect Meta Ads creative testing frameworks, configure Server-Side Conversion APIs, and optimize ad spend with rigorous ROAS attribution.',
    prerequisites: ['Basic digital marketing experience'],
    learningOutcomes: [
      'Structure Google Ads Search and PMax campaigns with negative keyword matrices',
      'Execute creative diversification on Meta Ads with dynamic creative testing (DCT)',
      'Deploy server-side Meta Conversions API (CAPI) and Google enhanced conversions',
      'Conduct evaluated weekly performance reviews against real client scenarios'
    ],
    modules: [
      {
        title: 'Module 1: Google Ads Architecture & Smart Bidding',
        lessons: [
          { title: '1.1 Live Class: Advanced Search Account Structuring', type: 'LIVE_SESSION', duration: '90 min', freePreview: true },
          { title: '1.2 Live Lab: Performance Max Campaign Setup & Asset Groups', type: 'LIVE_SESSION', duration: '90 min', freePreview: false }
        ]
      },
      {
        title: 'Module 2: Meta Ads & Conversion Tracking',
        lessons: [
          { title: '2.1 Live Class: Meta Creative Testing Frameworks', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '2.2 Capstone: Live Paid Performance Media Plan & Budget Model', type: 'PROJECT', duration: '90 min', freePreview: false }
        ]
      }
    ]
  },
  'analytics-ga4-google-tag-manager': {
    slug: 'analytics-ga4-google-tag-manager',
    title: 'Marketing Analytics, GA4 & Google Tag Manager',
    subtitle: '100% Live Practical Workshop on Custom Events, DataLayers, UTMs & Looker Dashboards',
    category: 'Analytics & Tracking',
    level: 'INTERMEDIATE',
    format: '100% LIVE INSTRUCTOR-LED',
    durationHours: 30,
    totalSessions: 10,
    originalPrice: 32999,
    discountPercent: 25,
    price: 24999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80',
    trainerName: 'Priya Sharma (Analytics & BI Lead)',
    batchCode: 'SV-GA4-NOV26',
    batchSchedule: 'Tue & Fri: 18:00 - 20:00 UTC (100% Live on Google Meet)',
    description: 'Stop guessing which marketing channels work. Master Google Tag Manager dataLayers, configure custom GA4 conversion events, implement cross-domain tracking, and build interactive client-facing dashboards in Looker Studio.',
    prerequisites: ['Basic spreadsheet and marketing understanding'],
    learningOutcomes: [
      'Build custom Google Tag Manager containers with triggers, variables, and dataLayer events',
      'Configure custom dimensions, metrics, and funnel exploration reports in GA4',
      'Implement bulletproof UTM taxonomy and conversion attribution pipelines',
      'Build automated multi-channel reporting dashboards in Looker Studio'
    ],
    modules: [
      {
        title: 'Module 1: Google Tag Manager & Custom Events',
        lessons: [
          { title: '1.1 Live Class: GTM Container Setup & Architecture', type: 'LIVE_SESSION', duration: '90 min', freePreview: true },
          { title: '1.2 Live Lab: DataLayer Push Implementation & Testing', type: 'LIVE_SESSION', duration: '90 min', freePreview: false }
        ]
      },
      {
        title: 'Module 2: GA4 Explorations & Looker Studio Dashboards',
        lessons: [
          { title: '2.1 Live Class: Funnel & Path Exploration in GA4', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '2.2 Capstone: Verified Looker Studio Executive Marketing Dashboard', type: 'PROJECT', duration: '90 min', freePreview: false }
        ]
      }
    ]
  },
  'social-media-marketing-strategy': {
    slug: 'social-media-marketing-strategy',
    title: 'Social Media Marketing & Content Strategy',
    subtitle: '100% Live Cohort on Organic Distribution, Content Calendars, Brand Voice & Community',
    category: 'Social Media Marketing',
    level: 'BEGINNER',
    format: '100% LIVE INSTRUCTOR-LED',
    durationHours: 28,
    totalSessions: 10,
    originalPrice: 24999,
    discountPercent: 20,
    price: 19999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80',
    trainerName: 'Chloe Bennett (Brand & Social Director)',
    batchCode: 'SV-SMM-DEC26',
    batchSchedule: 'Tue & Thu: 16:00 - 18:00 UTC (100% Live on Google Meet)',
    description: 'Build organic social media systems that drive revenue. Learn platform-specific distribution across LinkedIn, Instagram, and YouTube, engineer high-engagement content calendars, establish distinctive brand voice, and analyze community sentiment.',
    prerequisites: ['Basic social media familiarity'],
    learningOutcomes: [
      'Design strategic editorial calendars mapped to marketing milestones',
      'Write engaging copy and brief creative assets for multi-format social platforms',
      'Establish community engagement and crisis management playbooks',
      'Submit an evaluated comprehensive brand social media playbook'
    ],
    modules: [
      {
        title: 'Module 1: Content Pillar Architecture & Copywriting',
        lessons: [
          { title: '1.1 Live Class: Content Pillars & Narrative Design', type: 'LIVE_SESSION', duration: '90 min', freePreview: true },
          { title: '1.2 Live Lab: Drafting High-Retention Short-Form Scripts', type: 'LIVE_SESSION', duration: '90 min', freePreview: false }
        ]
      }
    ]
  },
  'ai-tools-for-digital-marketers': {
    slug: 'ai-tools-for-digital-marketers',
    title: 'AI Tools & Automation for Digital Marketers',
    subtitle: '100% Live Training on Generative AI, Prompt Workflows, Content Automation & Productivity',
    category: 'AI for Digital Marketing',
    level: 'INTERMEDIATE',
    format: '100% LIVE INSTRUCTOR-LED',
    durationHours: 32,
    totalSessions: 10,
    originalPrice: 39999,
    discountPercent: 25,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    trainerName: 'Dr. Aris Thorne (Marketing Automation Specialist)',
    batchCode: 'SV-AI-NOV26',
    batchSchedule: 'Thu & Sat: 17:30 - 19:30 UTC (100% Live on Google Meet)',
    description: 'Transform modern marketing operations using production AI workflows. Build customized prompt chains for campaign research, automate multi-lingual content variations, integrate marketing automation triggers, and maintain responsible AI governance.',
    prerequisites: ['Basic digital marketing experience'],
    learningOutcomes: [
      'Design reliable multi-step prompt workflows for market research and ad generation',
      'Automate repetitive content and reporting tasks with verified AI tooling',
      'Evaluate AI-generated assets for factual accuracy, brand alignment, and compliance',
      'Submit an evaluated autonomous marketing workflow portfolio piece'
    ],
    modules: [
      {
        title: 'Module 1: Advanced Prompt Engineering & Research Workflows',
        lessons: [
          { title: '1.1 Live Class: Systematic Prompt Engineering for Marketing', type: 'LIVE_SESSION', duration: '90 min', freePreview: true },
          { title: '1.2 Live Lab: Automated Competitive Intelligence Workflows', type: 'LIVE_SESSION', duration: '90 min', freePreview: false }
        ]
      }
    ]
  },
  'ai-business-automation-masterclass': {
    slug: 'ai-business-automation-masterclass',
    title: 'AI & Business Automation Masterclass',
    subtitle: 'Learn AI. Build Automations. Transform Businesses. (Zapier, n8n, HubSpot, Apollo.io, GoHighLevel & Make.com)',
    category: 'Artificial Intelligence & Automation',
    level: 'BEGINNER TO ADVANCED',
    format: 'SELF-PACED + PRACTICAL LABS + PORTFOLIO PROJECTS',
    durationHours: 68,
    totalSessions: 16,
    originalPrice: 37499,
    discountPercent: 20,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    trainerName: 'StudentVerse Expert Automation Faculty',
    batchCode: 'SV-AIBA-COHORT1',
    batchSchedule: 'Self-Paced with 24/7 Practical Lab Access & Weekly Mentor Reviews',
    description: 'Master AI-powered business automation, intelligent workflows, application integrations and modern business systems using industry-leading platforms such as Zapier, n8n, HubSpot, Apollo.io, GoHighLevel and Make.com. Learn to build intelligent AI agents, automate repetitive business processes, integrate applications using APIs and webhooks, develop WhatsApp and voice AI assistants, and implement production-ready automation solutions.',
    prerequisites: [
      'Basic computer knowledge and web literacy',
      'Curiosity to master modern AI automation platforms and intelligent agentic workflows',
      'No prior coding or technical engineering experience required'
    ],
    learningOutcomes: [
      'Build end-to-end multi-step automations in Zapier, n8n, Make.com, HubSpot, Apollo.io, and GoHighLevel',
      'Deploy autonomous AI agents with function calling, vector knowledge retrieval (RAG), and Model Context Protocol (MCP)',
      'Integrate external platforms using RESTful APIs, webhooks, JSON schemas, Postman, and OAuth2 security',
      'Implement AI-powered sales outreach, waterfall data enrichment, and email infrastructure in Clay, Smartlead, and Instantly',
      'Develop conversational AI WhatsApp bots with Meta Cloud API and deploy real-time AI Voice Receptionists using Vapi and Retell AI',
      'Build and submit 15 production portfolio projects and earn your StudentVerse Certified AI & Business Automation Specialist credential'
    ],
    skills: [
      'Zapier', 'n8n', 'HubSpot', 'Apollo.io', 'GoHighLevel', 'Make.com', 'OpenAI', 'Claude', 'Google Gemini',
      'Supabase', 'Airtable', 'Clay', 'Smartlead', 'Instantly.ai', 'Vapi', 'Retell AI', 'WhatsApp Business API',
      'Postman', 'GitHub', 'Docker', 'Stripe'
    ],
    projects: [
      'Automated Lead Capture System',
      'AI Email Management Assistant',
      'AI Lead Qualification Engine',
      'B2B Lead Generation Engine',
      'Automated Sales Outreach System',
      'Automated Marketing & Sales System',
      'Sales Funnel & Appointment System',
      'Multi-Application Automation',
      'AI Customer Support Assistant',
      'WhatsApp AI Sales Assistant',
      'AI Voice Receptionist',
      'Automated Invoice Processing',
      'Automated Recruitment Administration',
      'Automated Business Reporting',
      'Complete AI Business Automation Engine'
    ],
    careerOpportunities: [
      'AI Automation Specialist',
      'Business Automation Consultant',
      'AI Agent Developer',
      'Workflow Automation Specialist',
      'n8n Automation Developer',
      'Zapier Automation Specialist',
      'Business Integration Specialist',
      'HubSpot Automation Specialist',
      'GoHighLevel Specialist',
      'Sales Automation Specialist',
      'No-Code Automation Developer',
      'AI Solutions Consultant',
      'Automation Freelancer'
    ],
    certification: 'StudentVerse Certified AI & Business Automation Specialist',
    modules: buildAiBusinessAutomationCurriculum().map((m) => ({
      title: m.title,
      description: m.description,
      lessons: m.lessons.map((l) => ({
        title: l.title,
        duration: l.duration,
        type: l.type,
        freePreview: l.code === '1.1'
      }))
    }))
  },
  'aman-digital-marketing-course': {
    slug: 'aman-digital-marketing-course',
    title: 'Aman Digital Marketing Course',
    subtitle: 'Comprehensive 15-Module Professional Programme: SEO, Web Development, Google Ads, GA4, Paid Media, Automation & Modern AI',
    category: 'Digital Marketing / Artificial Intelligence / Career Development',
    level: 'BEGINNER TO ADVANCED',
    format: 'LIVE CLASSES + RECORDED LECTURES + PRACTICAL PROJECTS',
    durationHours: 48,
    totalSessions: 16,
    originalPrice: 37499,
    discountPercent: 20,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&auto=format&fit=crop&q=80',
    trainerName: 'StudentVerse Expert Faculty (Industry Growth Directors & AI Leads)',
    batchCode: 'SV-AMDM-COHORT1',
    batchSchedule: 'Mon & Wed: 18:00 - 20:00 UTC (100% Live Sessions + Recorded Video Masterclasses + 24/7 Labs)',
    description: 'A comprehensive digital marketing learning programme designed to provide practical knowledge of Search Engine Optimisation, website development, keyword research, paid advertising, social media marketing, analytics, artificial intelligence and other essential digital marketing skills through live training, recorded lessons, presentations and practical assignments.',
    prerequisites: [
      'Basic web literacy and computer familiarity',
      'Curiosity to master modern AI marketing tools and agentic workflows',
      'No prior coding or technical marketing experience required'
    ],
    learningOutcomes: [
      'Master full-funnel search engine optimisation with dedicated video masterclasses on Keyword Research & On-Page SEO',
      'Set up and configure websites and domains using Hostinger',
      'Build, manage, and scale high-converting Google Ads campaigns and paid social ads across Meta, LinkedIn, and YouTube',
      'Deploy Google Analytics 4, Tag Manager dataLayers, UTM pipelines, and executive Looker Studio performance dashboards',
      'Automate email marketing, lead capture, CRM pipelines, and AI agent workflows using Zapier, Make, and n8n',
      'Deliver practical assignments reviewed by dedicated mentors and launch a verified marketing career'
    ],
    modules: [
      {
        title: 'Module 1: Search Engine Optimisation (SEO)',
        lessons: [
          { title: '1.1 Basic SEO – Introduction to Search Engine Optimisation', type: 'RECORDED_VIDEO', duration: '75 min', freePreview: true },
          { title: '1.2 Keywords and Keyword Research – Part 1', type: 'RECORDED_VIDEO', duration: '80 min', freePreview: false },
          { title: '1.3 Keywords and Keyword Research – Part 2', type: 'RECORDED_VIDEO', duration: '75 min', freePreview: false },
          { title: '1.4 On-Page SEO – Part 1', type: 'RECORDED_VIDEO', duration: '85 min', freePreview: false },
          { title: '1.5 On-Page SEO – Part 2', type: 'RECORDED_VIDEO', duration: '90 min', freePreview: false },
          { title: '1.6 Technical SEO, Core Web Vitals & Crawlability Audits', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
          { title: '1.7 Off-Page SEO, Digital PR & Ethical Link Building', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: false },
          { title: '1.8 AI SEO, Answer Engine Optimisation (AEO) & GEO', type: 'LIVE_SESSION', duration: '90 min', freePreview: false },
        ]
      },
      {
        title: 'Module 2: Website Development & Hosting Architecture',
        lessons: [
          { title: '2.1 Website and Hostinger Setup', type: 'RECORDED_VIDEO', duration: '60 min', freePreview: true },
          { title: '2.2 Domain Registration, DNS Mapping & SSL Configuration', type: 'LIVE_SESSION', duration: '60 min', freePreview: false },
          { title: '2.3 WordPress Installation & High-Converting Landing Page Design', type: 'PROJECT', duration: '90 min', freePreview: false },
        ]
      }
    ]
  }
};

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const dbCourse = await getCourseBySlug(params.slug);
  const fallback = COURSE_DATA[params.slug];

  if (!dbCourse && !fallback) {
    notFound();
  }

  const course = {
    ...fallback,
    ...dbCourse,
    trainerName: fallback?.trainerName || 'StudentVerse Senior Industry Faculty',
    batchCode: fallback?.batchCode || `SV-${(params.slug || 'COURSE').toUpperCase().slice(0, 6)}-COHORT`,
    batchSchedule: fallback?.batchSchedule || 'Live Evening Classes + Dedicated Lab Sessions',
    originalPrice: fallback?.originalPrice || ((dbCourse?.price && dbCourse.price >= 1000) ? Math.round(dbCourse.price * 1.25) : 34999),
    discountPercent: fallback?.discountPercent || 20,
    price: (dbCourse?.price && dbCourse.price >= 1000) ? dbCourse.price : (fallback?.price || 29999),
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Link */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Live Programmes
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-14">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full">
                {course.category}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                <Video className="w-3.5 h-3.5" /> 100% Live Instructor-Led
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              {course.subtitle}
            </p>

            <div className="flex flex-wrap gap-6 text-xs text-slate-500 pt-2 border-y border-slate-200/80 py-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Clock className="w-4 h-4 text-indigo-600" /> Duration: <strong>{course.durationHours} Hours</strong>
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Video className="w-4 h-4 text-indigo-600" /> Total Live Sessions: <strong>{course.totalSessions} Live Cohort Classes</strong>
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <GraduationCap className="w-4 h-4 text-indigo-600" /> Level: <strong>{course.level}</strong>
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Certificate: <strong>StudentVerse Verifiable</strong>
              </span>
            </div>

            {/* Overview text */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xl font-bold text-slate-900">Programme Overview</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Learning Outcomes */}
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-slate-900">Key Learning Competencies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.learningOutcomes.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Enrolment Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Live Cohort Tuition</span>
                  {course.discountPercent && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {course.discountPercent}% OFF
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-900">{formatINR(course.price)}</span>
                  {course.originalPrice && (
                    <span className="text-base font-semibold text-slate-400 line-through">
                      {formatINR(course.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-slate-500">INR</span>
                </div>
                {course.originalPrice && (
                  <span className="text-xs text-emerald-600 font-bold block mt-1">
                    Save {formatINR(course.originalPrice - course.price)} ({course.discountPercent}% Instant Discount)
                  </span>
                )}
              </div>

              {/* Batch info box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block">Upcoming Live Cohort:</span>
                <div className="text-slate-600">
                  <span>Batch: <strong className="text-indigo-700 font-mono">{course.batchCode}</strong></span><br />
                  <span>Schedule: <strong>{course.batchSchedule}</strong></span><br />
                  <span>Lead Trainer: <strong>{course.trainerName}</strong></span>
                </div>
              </div>

              <EnrollmentActionButton slug={course.slug} courseTitle={course.title} />

              <div className="space-y-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Live Interactive Classes on Google Meet</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Assessed Practical Capstone Portfolios</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verifiable Cryptographic Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Access to Vetted Employer Hiring Network</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Syllabus Accordion */}
        <div className="max-w-3xl space-y-6">
          <h2 className="text-2xl font-black text-slate-900">Live Cohort Syllabus</h2>
          <div className="space-y-4">
            {course.modules.map((mod: any, idx: number) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900">{mod.title}</h3>
                <div className="divide-y divide-slate-100">
                  {mod.lessons.map((lesson: any, lIdx: number) => (
                    <div key={lIdx} className="py-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <Video className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        <span className="font-medium text-slate-800">{lesson.title}</span>
                      </div>
                      <span className="text-slate-400 font-medium">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
