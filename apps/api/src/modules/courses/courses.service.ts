import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface CourseData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  format: string;
  durationHours: number;
  priceMinorUnits: number;
  currency: string;
  description: string;
  prerequisites: string[];
  learningOutcomes: string[];
  thumbnailUrl: string;
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
    }[];
  }[];
}

const INITIAL_COURSES: CourseData[] = [
  {
    id: 'c-101',
    slug: 'digital-marketing-foundations',
    title: 'Digital Marketing Foundations',
    subtitle: 'Master omnichannel performance marketing, SEO, and multi-touch analytics',
    category: 'Growth & Marketing',
    level: 'BEGINNER',
    format: 'SELF_PACED',
    durationHours: 32,
    priceMinorUnits: 19900, // $199.00
    currency: 'USD',
    description: 'A comprehensive, practice-first foundation in modern performance marketing. Build actual multi-channel campaigns, optimize search rankings, craft high-converting email sequences, and implement verified Google Analytics 4 dashboards.',
    prerequisites: ['Basic web literacy', 'Familiarity with spreadsheets'],
    learningOutcomes: [
      'Architect full-funnel acquisition funnels from awareness to retention',
      'Execute technical and content-led SEO strategies with measurable ROI',
      'Deploy and optimize Google Ads and Meta paid media budgets',
      'Submit an evaluated real-world digital marketing campaign portfolio piece'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    modules: [
      {
        id: 'm-101-1',
        title: 'Module 1: Market Research & Audience Segmentation',
        orderIndex: 1,
        description: 'Define ICPs, value propositions, and competitor benchmarks.',
        lessons: [
          { id: 'l-1', title: '1.1 Foundations of Digital Growth', orderIndex: 1, contentType: 'VIDEO', durationMinutes: 18, isFreePreview: true },
          { id: 'l-2', title: '1.2 Customer Persona & Competitor Mapping', orderIndex: 2, contentType: 'READING', durationMinutes: 25, isFreePreview: true },
          { id: 'l-3', title: '1.3 Practical Exercise: ICP Specification Sheet', orderIndex: 3, contentType: 'PROJECT', durationMinutes: 60, isFreePreview: false }
        ]
      },
      {
        id: 'm-101-2',
        title: 'Module 2: Search Engine Optimization & Content Ops',
        orderIndex: 2,
        description: 'Technical audits, keyword architecture, and content velocity.',
        lessons: [
          { id: 'l-4', title: '2.1 Modern Search Algorithms & Intent', orderIndex: 1, contentType: 'VIDEO', durationMinutes: 24, isFreePreview: false },
          { id: 'l-5', title: '2.2 Keyword Clustering & Search Console Walkthrough', orderIndex: 2, contentType: 'VIDEO', durationMinutes: 30, isFreePreview: false },
          { id: 'l-6', title: '2.3 Assessment Quiz: Technical SEO Factors', orderIndex: 3, contentType: 'QUIZ', durationMinutes: 20, isFreePreview: false }
        ]
      },
      {
        id: 'm-101-3',
        title: 'Module 3: Paid Performance Media & Campaign Capstone',
        orderIndex: 3,
        description: 'Meta & Google Ads bidding, ad copy, conversion tracking, and final campaign presentation.',
        lessons: [
          { id: 'l-7', title: '3.1 Ad Creative Psychology & A/B Testing', orderIndex: 1, contentType: 'VIDEO', durationMinutes: 22, isFreePreview: false },
          { id: 'l-8', title: '3.2 Conversion API & Tracking Dashboards', orderIndex: 2, contentType: 'VIDEO', durationMinutes: 35, isFreePreview: false },
          { id: 'l-9', title: '3.3 Capstone Submission: Live Multi-Channel Campaign Review', orderIndex: 3, contentType: 'PROJECT', durationMinutes: 90, isFreePreview: false }
        ]
      }
    ]
  },
  {
    id: 'c-102',
    slug: 'hubspot-crm-automation',
    title: 'HubSpot CRM & Marketing Automation',
    subtitle: 'Architect enterprise lead routing, lifecycle stages, and automated CRM workflows',
    category: 'Revenue Operations',
    level: 'INTERMEDIATE',
    format: 'SELF_PACED',
    durationHours: 28,
    priceMinorUnits: 24900, // $249.00
    currency: 'USD',
    description: 'Bridge marketing and sales through automated CRM systems. Learn deal pipelines, lead scoring rules, webhook triggers, custom property modeling, and automated nurture sequences tested by certified operations leads.',
    prerequisites: ['Basic digital marketing understanding', 'Understanding of sales pipelines'],
    learningOutcomes: [
      'Configure full lifecycle stages and automated SLA lead routing',
      'Build multi-branch nurture and onboarding automated workflows',
      'Design clean custom object architectures and data hygiene triggers',
      'Complete an assessed portfolio-ready RevOps system blueprint'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60',
    modules: [
      {
        id: 'm-102-1',
        title: 'Module 1: CRM Architecture & Data Modeling',
        orderIndex: 1,
        description: 'Objects, standard fields, associations, and deduplication.',
        lessons: [
          { id: 'l-10', title: '1.1 The RevOps Engine: Why Clean CRM Data Wins', orderIndex: 1, contentType: 'VIDEO', durationMinutes: 16, isFreePreview: true },
          { id: 'l-11', title: '1.2 Custom Properties & Object Association Rules', orderIndex: 2, contentType: 'READING', durationMinutes: 25, isFreePreview: false },
          { id: 'l-12', title: '1.3 Practical Lab: Setting Up a Clean Sales Pipeline', orderIndex: 3, contentType: 'PROJECT', durationMinutes: 45, isFreePreview: false }
        ]
      },
      {
        id: 'm-102-2',
        title: 'Module 2: Automation Workflows & Lead Scoring',
        orderIndex: 2,
        description: 'Branching logic, deal automation, and automated notification alerts.',
        lessons: [
          { id: 'l-13', title: '2.1 If/Then Branches & Delay Logic in Workflows', orderIndex: 1, contentType: 'VIDEO', durationMinutes: 28, isFreePreview: false },
          { id: 'l-14', title: '2.2 Building Predictive & Behavioral Lead Scoring Models', orderIndex: 2, contentType: 'VIDEO', durationMinutes: 32, isFreePreview: false },
          { id: 'l-15', title: '2.3 Capstone: Automated Customer Lifecycle Workflow Plan', orderIndex: 3, contentType: 'PROJECT', durationMinutes: 80, isFreePreview: false }
        ]
      }
    ]
  },
  {
    id: 'c-103',
    slug: 'ai-workflow-automation',
    title: 'AI Workflow Automation with n8n & Make',
    subtitle: 'Deploy enterprise-grade automated AI pipelines, LLM agents, and API integrations',
    category: 'Automation & AI',
    level: 'INTERMEDIATE',
    format: 'SELF_PACED',
    durationHours: 36,
    priceMinorUnits: 29900, // $299.00
    currency: 'USD',
    description: 'Transform manual operations into resilient, automated AI workflows. Connect REST APIs, automate complex multi-app data transfers, implement self-healing error handlers, and integrate LLM agents into production enterprise processes.',
    prerequisites: ['Basic understanding of webhooks and JSON data structures'],
    learningOutcomes: [
      'Master n8n and Make visual workflow engines with modular patterns',
      'Integrate LLM APIs with structured outputs, validation, and error guards',
      'Implement robust production monitoring, rate-limiting, and alerts',
      'Submit an evaluated autonomous ops agent workflow to your portfolio'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    modules: [
      {
        id: 'm-103-1',
        title: 'Module 1: Webhook Architecture & API Fundamentals',
        orderIndex: 1,
        description: 'HTTP methods, JSON transformations, headers, and authentication tokens.',
        lessons: [
          { id: 'l-16', title: '1.1 The Anatomy of an Enterprise Automated Workflow', orderIndex: 1, contentType: 'VIDEO', durationMinutes: 20, isFreePreview: true },
          { id: 'l-17', title: '1.2 Handling Webhooks, Authentication & JSON Arrays', orderIndex: 2, contentType: 'VIDEO', durationMinutes: 30, isFreePreview: false },
          { id: 'l-18', title: '1.3 Practical Lab: Two-Way Data Sync Engine', orderIndex: 3, contentType: 'PROJECT', durationMinutes: 60, isFreePreview: false }
        ]
      },
      {
        id: 'm-103-2',
        title: 'Module 2: LLM Pipelines, Error Retries & Deployment',
        orderIndex: 2,
        description: 'Prompt templates, structured JSON outputs, fallback routes, and queue monitors.',
        lessons: [
          { id: 'l-19', title: '2.1 Orchestrating LLMs Inside Automated Flows', orderIndex: 1, contentType: 'VIDEO', durationMinutes: 26, isFreePreview: false },
          { id: 'l-20', title: '2.2 Building Self-Healing Nodes & Fallback Alerts', orderIndex: 2, contentType: 'VIDEO', durationMinutes: 34, isFreePreview: false },
          { id: 'l-21', title: '2.3 Capstone Project: Production Autonomous Workflow Agent', orderIndex: 3, contentType: 'PROJECT', durationMinutes: 90, isFreePreview: false }
        ]
      }
    ]
  }
];

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { category?: string; search?: string }) {
    let courses = INITIAL_COURSES;
    if (query?.category) {
      courses = courses.filter((c) => c.category.toLowerCase().includes(query.category!.toLowerCase()));
    }
    if (query?.search) {
      const q = query.search.toLowerCase();
      courses = courses.filter((c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }
    return courses;
  }

  async findBySlug(slug: string) {
    const course = INITIAL_COURSES.find((c) => c.slug === slug);
    if (!course) {
      throw new NotFoundException(`Course with slug '${slug}' not found`);
    }
    return course;
  }
}

