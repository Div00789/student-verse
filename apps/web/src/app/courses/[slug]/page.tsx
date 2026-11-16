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
  ArrowLeft 
} from 'lucide-react';

const COURSE_DATA: Record<string, any> = {
  'digital-marketing-foundations': {
    slug: 'digital-marketing-foundations',
    title: 'Digital Marketing Foundations',
    subtitle: 'Master omnichannel performance marketing, SEO, and multi-touch analytics',
    category: 'Growth & Marketing',
    level: 'BEGINNER',
    format: 'SELF_PACED',
    durationHours: 32,
    price: 199,
    description: 'A comprehensive, practice-first foundation in modern performance marketing. Build actual multi-channel campaigns, optimize search rankings, craft high-converting email sequences, and implement verified Google Analytics 4 dashboards.',
    prerequisites: ['Basic web literacy', 'Familiarity with spreadsheets'],
    learningOutcomes: [
      'Architect full-funnel acquisition strategies from awareness to retention',
      'Execute technical and content-led SEO audits with measurable ranking gains',
      'Deploy and optimize Google Ads and Meta paid media budgets',
      'Submit an evaluated real-world digital marketing campaign portfolio piece'
    ],
    modules: [
      {
        title: 'Module 1: Market Research & Audience Segmentation',
        lessons: [
          { title: '1.1 Foundations of Digital Growth', type: 'VIDEO', duration: '18 min', freePreview: true },
          { title: '1.2 Customer Persona & Competitor Mapping', type: 'READING', duration: '25 min', freePreview: true },
          { title: '1.3 Practical Exercise: ICP Specification Sheet', type: 'PROJECT', duration: '60 min', freePreview: false }
        ]
      },
      {
        title: 'Module 2: Search Engine Optimization & Content Ops',
        lessons: [
          { title: '2.1 Modern Search Algorithms & User Intent', type: 'VIDEO', duration: '24 min', freePreview: false },
          { title: '2.2 Keyword Clustering & Search Console Walkthrough', type: 'VIDEO', duration: '30 min', freePreview: false },
          { title: '2.3 Assessment Quiz: Technical SEO Factors', type: 'QUIZ', duration: '20 min', freePreview: false }
        ]
      },
      {
        title: 'Module 3: Paid Performance Media & Campaign Capstone',
        lessons: [
          { title: '3.1 Ad Creative Psychology & A/B Testing', type: 'VIDEO', duration: '22 min', freePreview: false },
          { title: '3.2 Conversion API & Multi-Touch Attribution Models', type: 'VIDEO', duration: '35 min', freePreview: false },
          { title: '3.3 Capstone Project: Live Multi-Channel Campaign Review', type: 'PROJECT', duration: '90 min', freePreview: false }
        ]
      }
    ]
  },
  'hubspot-crm-automation': {
    slug: 'hubspot-crm-automation',
    title: 'HubSpot CRM & Marketing Automation',
    subtitle: 'Architect enterprise lead routing, lifecycle stages, and automated CRM workflows',
    category: 'Revenue Operations',
    level: 'INTERMEDIATE',
    format: 'SELF_PACED',
    durationHours: 28,
    price: 249,
    description: 'Bridge marketing and sales through automated CRM systems. Learn deal pipelines, lead scoring rules, webhook triggers, custom property modeling, and automated nurture sequences tested by certified operations leads.',
    prerequisites: ['Basic digital marketing understanding', 'Understanding of sales pipelines'],
    learningOutcomes: [
      'Configure full lifecycle stages and automated SLA lead routing',
      'Build multi-branch nurture and onboarding automated workflows',
      'Design clean custom object architectures and data hygiene triggers',
      'Complete an assessed portfolio-ready RevOps system blueprint'
    ],
    modules: [
      {
        title: 'Module 1: CRM Architecture & Data Modeling',
        lessons: [
          { title: '1.1 The RevOps Engine: Why Clean CRM Data Wins', type: 'VIDEO', duration: '16 min', freePreview: true },
          { title: '1.2 Custom Properties & Object Association Rules', type: 'READING', duration: '25 min', freePreview: false },
          { title: '1.3 Practical Lab: Setting Up a Clean Sales Pipeline', type: 'PROJECT', duration: '45 min', freePreview: false }
        ]
      },
      {
        title: 'Module 2: Automation Workflows & Lead Scoring',
        lessons: [
          { title: '2.1 If/Then Branches & Delay Logic in Workflows', type: 'VIDEO', duration: '28 min', freePreview: false },
          { title: '2.2 Building Predictive & Behavioral Lead Scoring Models', type: 'VIDEO', duration: '32 min', freePreview: false },
          { title: '2.3 Capstone: Automated Customer Lifecycle Workflow Plan', type: 'PROJECT', duration: '80 min', freePreview: false }
        ]
      }
    ]
  },
  'ai-workflow-automation': {
    slug: 'ai-workflow-automation',
    title: 'AI Workflow Automation (n8n & Make)',
    subtitle: 'Deploy enterprise-grade automated AI pipelines, LLM agents, and API integrations',
    category: 'Automation & AI',
    level: 'INTERMEDIATE',
    format: 'SELF_PACED',
    durationHours: 36,
    price: 299,
    description: 'Transform manual operations into resilient, automated AI workflows. Connect REST APIs, automate complex multi-app data transfers, implement self-healing error handlers, and integrate LLM agents into production enterprise processes.',
    prerequisites: ['Basic understanding of webhooks and JSON data structures'],
    learningOutcomes: [
      'Master n8n and Make visual workflow engines with modular patterns',
      'Integrate LLM APIs with structured outputs, validation, and error guards',
      'Implement robust production monitoring, rate-limiting, and alerts',
      'Submit an evaluated autonomous ops agent workflow to your portfolio'
    ],
    modules: [
      {
        title: 'Module 1: Webhook Architecture & API Fundamentals',
        lessons: [
          { title: '1.1 The Anatomy of an Enterprise Automated Workflow', type: 'VIDEO', duration: '20 min', freePreview: true },
          { title: '1.2 Handling Webhooks, Authentication & JSON Arrays', type: 'VIDEO', duration: '30 min', freePreview: false },
          { title: '1.3 Practical Lab: Two-Way Data Sync Engine', type: 'PROJECT', duration: '60 min', freePreview: false }
        ]
      },
      {
        title: 'Module 2: LLM Pipelines, Error Retries & Deployment',
        lessons: [
          { title: '2.1 Orchestrating LLMs Inside Automated Flows', type: 'VIDEO', duration: '26 min', freePreview: false },
          { title: '2.2 Building Self-Healing Nodes & Fallback Alerts', type: 'VIDEO', duration: '34 min', freePreview: false },
          { title: '2.3 Capstone Project: Production Autonomous Workflow Agent', type: 'PROJECT', duration: '90 min', freePreview: false }
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
        
        {/* Back navigation */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course Catalogue
        </Link>

        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                {course.category}
              </span>
              <span className="text-xs font-medium text-slate-500">
                &bull; Level: <strong>{course.level}</strong>
              </span>
              <span className="text-xs font-medium text-slate-500">
                &bull; Mode: <strong>Self-Paced with Evaluated Capstone</strong>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {course.title}
            </h1>

            <p className="text-base text-slate-600 leading-relaxed">
              {course.subtitle}
            </p>

            <div className="pt-2 text-sm text-slate-700 leading-relaxed">
              {course.description}
            </div>

            {/* Learning Outcomes */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Key Competencies You Will Build</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.learningOutcomes.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Prerequisites</h3>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                {course.prerequisites.map((req: string, i: number) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing & Checkout Sidebar */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Tuition</div>
              <div className="text-3xl font-black text-slate-900 mt-1">
                ${course.price} <span className="text-xs font-normal text-slate-500">USD</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                One-time payment &bull; Full course access &bull; Rubric grading &bull; Credential included
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Duration: <strong>{course.durationHours} estimated learning hours</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Certificate: <strong>StudentVerse [RankGood Tech]</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Refund Guarantee: <strong>14-day policy (terms apply)</strong></span>
              </div>
            </div>

            <Link
              href={`/student?enrol=${course.slug}`}
              className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow transition-colors text-center"
            >
              Enrol in Course
            </Link>

            <div className="text-[11px] text-slate-400 text-center leading-snug">
              Secure checkout &bull; Instant LMS access &bull; Server-enforced role access
            </div>
          </div>
        </div>

        {/* Public Syllabus Section */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">Curriculum Transparency</h2>
            <h3 className="text-2xl font-extrabold text-slate-900">Complete Public Syllabus</h3>
            <p className="text-xs text-slate-500 mt-1">
              Every lesson, exercise, quiz, and project deliverable is transparently published before purchase.
            </p>
          </div>

          <div className="space-y-6">
            {course.modules.map((mod: any, mIdx: number) => (
              <div key={mIdx} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800">{mod.title}</span>
                  <span className="text-xs text-slate-500">{mod.lessons.length} Lessons</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {mod.lessons.map((lesson: any, lIdx: number) => (
                    <div key={lIdx} className="px-5 py-3 flex items-center justify-between text-xs hover:bg-slate-50/60">
                      <div className="flex items-center gap-3">
                        {lesson.type === 'VIDEO' ? (
                          <PlayCircle className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        ) : lesson.type === 'PROJECT' ? (
                          <Layers className="w-4 h-4 text-purple-600 flex-shrink-0" />
                        ) : (
                          <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                        <span className="font-medium text-slate-800">{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {lesson.freePreview && (
                          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                            Free Preview
                          </span>
                        )}
                        <span className="text-slate-400">{lesson.duration}</span>
                      </div>
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
