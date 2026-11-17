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

const COURSE_DATA: Record<string, any> = {
  'digital-marketing-foundations': {
    slug: 'digital-marketing-foundations',
    title: 'Digital Marketing Fundamentals & Omnichannel Strategy',
    subtitle: '100% Live Instructor-Led Cohort on Acquisition Funnels, Strategy & Multi-Touch Conversion',
    category: 'Digital Marketing',
    level: 'BEGINNER',
    format: '100% LIVE INSTRUCTOR-LED',
    durationHours: 36,
    totalSessions: 12,
    price: 299,
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
    price: 349,
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
    price: 399,
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
    price: 299,
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
    price: 249,
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
    price: 349,
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
  }
};

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = COURSE_DATA[params.slug];

  if (!course) {
    notFound();
  }

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
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Live Cohort Tuition</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-900">${course.price}</span>
                  <span className="text-xs font-semibold text-slate-500">USD (Complete Live Programme)</span>
                </div>
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

              <Link
                href="/student/login"
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                Enroll in Live Batch
              </Link>

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
