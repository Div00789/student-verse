'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  PlayCircle,
  CheckCircle2,
  Circle,
  Check,
  Loader2,
  Video,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Award,
  Upload,
  BookOpen,
  Clock,
  Send,
  Layers,
  AlertCircle,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../../../lib/api';
import { getAuthUser, getScopedStorageKey, formatStudentName } from '../../../../lib/auth';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LessonItem {
  id: string;
  title: string;
  type: 'LIVE_SESSION' | 'RECORDED_VIDEO' | 'PROJECT';
  duration: string;
  videoUrl?: string;
  notes: string;
  aiTools: string[];
  resources: { title: string; url: string; type: string }[];
  quiz?: QuizQuestion;
}

interface ModuleItem {
  id: string;
  title: string;
  description: string;
  lessons: LessonItem[];
  assignment: {
    id: string;
    title: string;
    instructions: string;
    deliverables: string[];
    maxScore: number;
  };
}

const COURSE_MODULES: Record<string, ModuleItem[]> = {
  'ai-digital-marketing-course': [
    {
      id: 'mod-1',
      title: 'Module 1: Search Engine Optimisation (SEO)',
      description: 'Foundations of crawling, indexing, keyword research, on-page SEO, technical audits, Core Web Vitals, link building, modern SEO tools, and AI/AEO/GEO optimization.',
      lessons: [
        {
          id: 'l-1-1',
          title: '1.1 Search Foundations, Indexation & Keyword Intelligence',
          type: 'LIVE_SESSION',
          duration: '90 min',
          // videoUrl: pending instructor upload
          notes: 'Master the mechanics of search engine retrieval. Learn how Googlebot discovers URLs through crawling, parses DOM structure, indexes content entities, and computes ranking signals. Develop keyword research taxonomies separating transactional, navigational, informational, and commercial intent.',
          aiTools: ['Ahrefs AI', 'Semrush Keyword Magic', 'ChatGPT Search Intent Classifier'],
          resources: [
            { title: 'Google Crawlability & Indexation Cheat Sheet', url: '#', type: 'PDF' },
            { title: 'Search Intent Mapping Matrix (XLSX)', url: '#', type: 'TEMPLATE' }
          ],
          quiz: {
            question: 'What is the primary difference between crawling and indexing in modern search engines?',
            options: [
              'Crawling is the discovery and fetching of web pages; indexing is parsing, understanding, and storing the page content in the search database.',
              'Crawling only applies to paid ads, while indexing only applies to organic pages.',
              'Indexing happens before crawling can begin.',
              'Crawling is performed by AI chatbots, while indexing is done by human evaluators.'
            ],
            correctIndex: 0,
            explanation: 'Crawling refers to the process where bots (spiders) discover URLs. Indexing is when the discovered content is analyzed, categorized, and stored in search indexes for retrieval.'
          }
        },
        {
          id: 'l-1-2',
          title: '1.2 On-Page SEO, Header Hierarchy & Semantic Content Architecture',
          type: 'RECORDED_VIDEO',
          duration: '75 min',
          // videoUrl: pending instructor upload
          notes: 'Implement semantic on-page optimizations: meta titles (50-60 chars), meta descriptions (150-160 chars), logical H1-H6 hierarchy, image alt attributes, internal link silos, and entity-based topical depth.',
          aiTools: ['Surfer SEO', 'Clearscope', 'Hemingway AI'],
          resources: [
            { title: 'On-Page SEO Checklist & Character Count Guide', url: '#', type: 'PDF' }
          ],
          quiz: {
            question: 'Why should a web page contain exactly one primary H1 tag representing the core topic?',
            options: [
              'It provides search crawlers and screen readers with the definitive semantic headline of the document.',
              'Google will automatically ban any website with two H1 tags.',
              'H1 tags are only used for CSS font sizing.',
              'It reduces server bandwidth costs.'
            ],
            correctIndex: 0,
            explanation: 'The H1 tag serves as the primary document title for semantic hierarchy, assisting both search engine indexers and assistive technologies in understanding page intent.'
          }
        },
        {
          id: 'l-1-3',
          title: '1.3 Technical SEO, Core Web Vitals & Crawlability Audits',
          type: 'LIVE_SESSION',
          duration: '90 min',
          // videoUrl: pending instructor upload
          notes: 'Conduct comprehensive technical SEO audits using Screaming Frog. Diagnose canonical tags, robots.txt directives, XML sitemaps, 301/302 redirects, Core Web Vitals (LCP, INP, CLS), and JSON-LD schema markup.',
          aiTools: ['Screaming Frog SEO Spider', 'Google Search Console', 'PageSpeed Insights'],
          resources: [
            { title: 'Screaming Frog Audit Preset & Error Triage Guide', url: '#', type: 'PDF' }
          ]
        },
        {
          id: 'l-1-4',
          title: '1.4 Off-Page SEO, Digital PR & Ethical Link Building',
          type: 'RECORDED_VIDEO',
          duration: '60 min',
          // videoUrl: pending instructor upload
          notes: 'Learn high-authority white-hat link acquisition strategies: Digital PR data studies, unlinked brand mention reclamation, podcast guesting, HARO/Connectively pitching, and analyzing link equity distributions.',
          aiTools: ['Muck Rack', 'BuzzStream', 'Ahrefs Site Explorer'],
          resources: [
            { title: 'Digital PR Pitch Email Templates', url: '#', type: 'PDF' }
          ]
        },
        {
          id: 'l-1-5',
          title: '1.5 Industry SEO Toolstack Mastery & Analytics Setup',
          type: 'RECORDED_VIDEO',
          duration: '60 min',
          // videoUrl: pending instructor upload
          notes: 'Configure Google Search Console, Google Analytics 4, Global Site Tag (gtag.js), Google Trends, and Screaming Frog for unified enterprise search reporting.',
          aiTools: ['Google Search Console', 'Google Trends', 'Semrush'],
          resources: [
            { title: 'Search Console Verification & Error Guide', url: '#', type: 'PDF' }
          ]
        },
        {
          id: 'l-1-6',
          title: '1.6 AI SEO, Answer Engine Optimisation (AEO) & GEO',
          type: 'LIVE_SESSION',
          duration: '90 min',
          // videoUrl: pending instructor upload
          notes: 'Master generative engine optimization for AI search engines like ChatGPT Search, Perplexity, and Google AI Overviews. Structure entity-based content, optimize for citation probability, and monitor AI search visibility.',
          aiTools: ['Perplexity Pro', 'Claude 3.5 Sonnet', 'Schema Markup Generator AI'],
          resources: [
            { title: 'AEO Entity Schema & Prompt Engineering Guide', url: '#', type: 'PDF' }
          ]
        }
      ],
      assignment: {
        id: 'asg-mod-1',
        title: 'Module 1 Practical Deliverable: Comprehensive Technical SEO Audit & Keyword Architecture Report',
        instructions: 'Select an authorized website. Run a full crawl audit identifying critical technical bottlenecks (redirect chains, orphan pages, Core Web Vitals). Research 20 high-intent keyword opportunities. Formulate an AEO schema roadmap and submit a professional report.',
        deliverables: [
          'Full technical audit report with prioritized issue triage',
          'Keyword intent matrix with search volume and target URL mappings',
          'JSON-LD schema markup ready for deployment',
          'Executive summary presentation slide deck'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-2',
      title: 'Module 2: Pay-Per-Click Advertising (Google Ads)',
      description: 'PPC advertising fundamentals, Search ads, Display, Shopping, Performance Max, smart bidding strategies, conversion tracking, and AI ad copywriting.',
      lessons: [
        {
          id: 'l-2-1',
          title: '2.1 Google Ads Architecture & Campaign Types',
          type: 'LIVE_SESSION',
          duration: '90 min',
          // videoUrl: pending instructor upload
          notes: 'Deep dive into campaign taxonomy: Search, Display, Shopping, Performance Max, and Demand Gen. Architect single-theme ad groups with exact, phrase, and negative keyword match types.',
          aiTools: ['Google Ads Keyword Planner', 'PMax Asset Generator AI'],
          resources: [{ title: 'Google Ads Account Structure Blueprint', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-2-2',
          title: '2.2 Bidding Strategies, Performance Metrics & ROAS Optimization',
          type: 'RECORDED_VIDEO',
          duration: '75 min',
          // videoUrl: pending instructor upload
          notes: 'Calculate and optimize Quality Score, CPC, CPM, CTR, CPA, and ROAS. Calibrate Smart Bidding algorithms (Maximize Conversions, Target CPA, Target ROAS) with statistical significance.',
          aiTools: ['Google Smart Bidding', 'Bid Simulator AI'],
          resources: [{ title: 'PPC Bidding Formula & Metric Calculator', url: '#', type: 'TEMPLATE' }]
        },
        {
          id: 'l-2-3',
          title: '2.3 Campaign Management, Conversion Tracking & Landing Page CRO',
          type: 'LIVE_SESSION',
          duration: '90 min',
          // videoUrl: pending instructor upload
          notes: 'Deploy Google Tag Manager conversion tags, enhanced conversions, negative keyword lists, search terms audits, and high-converting landing page A/B tests.',
          aiTools: ['Google Tag Manager', 'Unbounce AI', 'Google Ads Editor'],
          resources: [{ title: 'Landing Page CRO Wireframe Guide', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-2-4',
          title: '2.4 AI for Google Ads: Keyword Clustering & Performance Automation',
          type: 'RECORDED_VIDEO',
          duration: '60 min',
          // videoUrl: pending instructor upload
          notes: 'Harness LLMs for semantic keyword clustering, automated RSA ad copy generation, performance anomaly alerts, and multi-variant creative testing.',
          aiTools: ['ChatGPT Plus Ad Copywriter', 'Optmyzr AI', 'AdCreative.ai'],
          resources: [{ title: 'AI Ad Copy Prompt Library', url: '#', type: 'PDF' }]
        }
      ],
      assignment: {
        id: 'asg-mod-2',
        title: 'Module 2 Practical Deliverable: Complete Google Search & Performance Max Campaign Build',
        instructions: 'Structure a live or simulated Google Ads account for a B2B or D2C business. Create 3 themed ad groups with tight keyword match types. Write 3 responsive search ads with dynamic keyword insertion. Configure negative keywords and set up conversion tracking.',
        deliverables: [
          'Full campaign spreadsheet or editor file showing ad groups & keywords',
          'Responsive Search Ads (RSAs) with 15 headlines and 4 descriptions each',
          'Negative keyword taxonomy preventing wasted budget spend',
          'Conversion tracking architecture and weekly optimization checklist'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-3',
      title: 'Module 3: Google Analytics 4 (GA4)',
      description: 'Analytics fundamentals, GA4 account setup, event tracking, custom events, UTM parameters, Looker Studio dashboards, and AI predictive analytics.',
      lessons: [
        {
          id: 'l-3-1',
          title: '3.1 GA4 Architecture, Tag Installation & Metric Fundamentals',
          type: 'LIVE_SESSION',
          duration: '90 min',
          // videoUrl: pending instructor upload
          notes: 'Install GA4 via Google Tag Manager. Understand the event-driven data model, users, active users, session duration, engagement rate, and data retention configurations.',
          aiTools: ['Google Tag Assistant', 'GA4 Measurement Protocol'],
          resources: [{ title: 'GA4 Setup & DataLayer Guide', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-3-2',
          title: '3.2 Traffic Acquisition, UTM Governance & Attribution Modeling',
          type: 'RECORDED_VIDEO',
          duration: '60 min',
          // videoUrl: pending instructor upload
          notes: 'Standardize UTM tracking parameters across all digital touchpoints. Analyze default channel groupings, organic vs paid acquisition, and cross-channel attribution models.',
          aiTools: ['Campaign URL Builder', 'UTM Governance Spreadsheet AI'],
          resources: [{ title: 'Enterprise UTM Taxonomy Sheet', url: '#', type: 'TEMPLATE' }]
        },
        {
          id: 'l-3-3',
          title: '3.3 Conversions, Key Events & Executive Looker Studio Dashboards',
          type: 'LIVE_SESSION',
          duration: '90 min',
          // videoUrl: pending instructor upload
          notes: 'Configure key events, form submission triggers, and funnel exploration reports in GA4. Build dynamic multi-channel performance dashboards in Looker Studio.',
          aiTools: ['Looker Studio BI', 'GA4 Exploration Reports'],
          resources: [{ title: 'Looker Studio Executive Dashboard Template', url: '#', type: 'LINK' }]
        },
        {
          id: 'l-3-4',
          title: '3.4 AI Analytics, Automated Insights & Anomaly Detection',
          type: 'RECORDED_VIDEO',
          duration: '60 min',
          // videoUrl: pending instructor upload
          notes: 'Leverage predictive metrics, churn probability, automated insight cards, and LLM-assisted SQL/BigQuery data extractions for strategic marketing decisions.',
          aiTools: ['GA4 Machine Learning Insights', 'Gemini Data Analysis'],
          resources: [{ title: 'AI Analytics Prompt Framework', url: '#', type: 'PDF' }]
        }
      ],
      assignment: {
        id: 'asg-mod-3',
        title: 'Module 3 Practical Deliverable: GA4 Custom Event Architecture & Looker Studio Dashboard',
        instructions: 'Audit or configure a GA4 property. Set up 3 custom event tags via Google Tag Manager (form submission, lead download, button click). Mark key events. Connect data into Looker Studio and build an executive marketing acquisition report.',
        deliverables: [
          'GTM container export or screenshot verification of triggers & tags',
          'GA4 custom event and key event configuration table',
          'Channel traffic analysis identifying top conversion source and medium',
          'Published interactive Looker Studio dashboard link'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-4',
      title: 'Module 4: Social Media Marketing (Paid Advertising)',
      description: 'Meta Ads, Instagram, LinkedIn Ads, YouTube, Pinterest, custom audiences, retargeting, and AI-assisted creative testing.',
      lessons: [
        {
          id: 'l-4-1',
          title: '4.1 Paid Social Media Architecture & Audience Targeting',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'Campaign setup, objectives, custom audiences, lookalike audiences, and high-converting retargeting funnels across Meta and LinkedIn.',
          aiTools: ['Meta Ads Manager', 'LinkedIn Campaign Manager AI'],
          resources: [{ title: 'Social Ads Audience Matrix', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-4-2',
          title: '4.2 Creative Diversification, Ad Copywriting & Conversion APIs',
          type: 'RECORDED_VIDEO',
          duration: '75 min',
          // videoUrl: pending instructor upload
          notes: 'Dynamic creative testing (DCT), ad copywriting angles, server-side Meta Conversions API (CAPI), and advertising compliance.',
          aiTools: ['Meta Conversion API (CAPI)', 'Canva Pro Magic Studio'],
          resources: [{ title: 'CAPI Implementation Guide', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-4-3',
          title: '4.3 AI-Driven Creative Testing & Lead Gen Campaign Optimization',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'AI-generated visual concepts, audience intent research, creative fatigue alerts, and lead generation form optimization.',
          aiTools: ['Midjourney v6', 'AdCreative.ai', 'Copy.ai'],
          resources: [{ title: 'Creative Fatigue Diagnostic Guide', url: '#', type: 'PDF' }]
        }
      ],
      assignment: {
        id: 'asg-mod-4',
        title: 'Module 4 Practical Deliverable: Meta Ads & LinkedIn B2B Acquisition Campaign Plan',
        instructions: 'Design two paid media campaigns: one Meta Ads campaign focused on broad/lookalike acquisition, and one LinkedIn Ads campaign targeting high-value B2B decision makers. Include copy variations, creative briefs, budget pacing, and tracking requirements.',
        deliverables: [
          'Meta Ads campaign architecture (campaign, ad set, dynamic creative testing specs)',
          'LinkedIn Ads B2B targeting breakdown (job titles, industries, company sizes)',
          '5 ad copy variations testing emotional vs rational vs authority angles',
          'Conversion tracking and CPA/ROAS milestone targets'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-5',
      title: 'Module 5: Social Media Optimisation (SMO)',
      description: 'Audience personas, 30-day content calendars, organic social growth, ORM, community engagement, and AI video/caption automation.',
      lessons: [
        {
          id: 'l-5-1',
          title: '5.1 Audience Personas, Editorial Planning & Organic Distribution',
          type: 'RECORDED_VIDEO',
          duration: '60 min',
          // videoUrl: pending instructor upload
          notes: 'Customer personas, content calendar architecture, B2B/B2C distribution portals, and Online Reputation Management (ORM).',
          aiTools: ['MakeMyPersona AI', 'SparkToro Audience Intelligence'],
          resources: [{ title: 'Customer Persona Template', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-5-2',
          title: '5.2 Community Management, Social Listening & Process Automation',
          type: 'RECORDED_VIDEO',
          duration: '60 min',
          // videoUrl: pending instructor upload
          notes: 'Hashtag strategies, community engagement, brand sentiment monitoring, and automated scheduling workflows.',
          aiTools: ['Buffer', 'Hootsuite AI', 'Brand24 Social Listening'],
          resources: [{ title: 'Community Management Playbook', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-5-3',
          title: '5.3 AI Content Ideas, AI Video & Sentiment Analysis Workflows',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'AI-assisted video creation, automatic captioning, sentiment analysis, and multi-format content approval workflows.',
          aiTools: ['Claude 3.5 Sonnet', 'InVideo AI', 'CapCut AI'],
          resources: [{ title: 'AI Social Video Storyboard Guide', url: '#', type: 'PDF' }]
        }
      ],
      assignment: {
        id: 'asg-mod-5',
        title: 'Module 5 Practical Deliverable: 30-Day Social Content Calendar & Automation Playbook',
        instructions: 'Develop an omnichannel organic social media calendar for a chosen brand covering LinkedIn, Instagram, and X. Produce 30 distinct post briefs with hooks, body text, hashtags, design direction, and automated scheduling workflows.',
        deliverables: [
          '30-day editorial calendar in spreadsheet or Notion template format',
          'Platform-specific formatting guidelines and posting time recommendations',
          '5 short-form video scripts designed for Reels/Shorts with AI visual briefs',
          'Automated approval and social posting workflow blueprint'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-6',
      title: 'Module 6: Email Marketing',
      description: 'Permission-based list building, SMTP infrastructure, SPF/DKIM/DMARC authentication, deliverability, high-volume sending compliance, and AI nurture sequences.',
      lessons: [
        {
          id: 'l-6-1',
          title: '6.1 Permission List Building, Interactive Design & Sequence Strategy',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'Ethical lead capture, welcome flows, segmentation triggers, and interactive mobile-first email design.',
          aiTools: ['Klaviyo AI', 'ActiveCampaign', 'BEE Pro Email Editor'],
          resources: [{ title: 'Email Design Best Practice Guide', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-6-2',
          title: '6.2 Email Infrastructure, Authentication (SPF/DKIM/DMARC) & High-Volume Compliance',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'SMTP servers, SPF, DKIM, DMARC, bounce and unsubscribe handling, IP warm-up protocols, and sending up to 100,000 emails/day compliantly.',
          aiTools: ['Mail-Tester', 'Postmark DMARC Monitor', 'Warmup Inbox AI'],
          resources: [{ title: 'DNS Authentication Step-by-Step Guide', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-6-3',
          title: '6.3 Email Metrics, Attribution & AI Copywriting Workflows',
          type: 'RECORDED_VIDEO',
          duration: '75 min',
          // videoUrl: pending instructor upload
          notes: 'Open rates, CTR, revenue attribution, Apple MPP privacy limitations, and AI-assisted subject line testing.',
          aiTools: ['ChatGPT Email Prompt Chains', 'SubjectLine.com AI'],
          resources: [{ title: 'High-Converting Subject Line Framework', url: '#', type: 'PDF' }]
        }
      ],
      assignment: {
        id: 'asg-mod-6',
        title: 'Module 6 Practical Deliverable: 5-Part Lead Nurture Sequence with DNS Authentication Specs',
        instructions: 'Architect an automated 5-part email nurture sequence for newly acquired leads. Write full copy including subject lines, preview text, body content, and call-to-action buttons. Document required DNS authentication records (SPF, DKIM, DMARC) for inbox deliverability.',
        deliverables: [
          '5-email copy package (Welcome, Educational, Case Study, Objection Buster, Offer)',
          'Dynamic personalisation tokens and audience segmentation logic',
          'Complete SPF, DKIM, and DMARC DNS configuration checklist',
          'KPI dashboard projection (open rate, CTR, unsubscribe threshold)'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-7',
      title: 'Module 7: Black Hat SEO and Search Engine Guidelines',
      description: 'Educational risk-awareness module: identifying cloaking, content spinning, doorway pages, manual actions, algorithmic penalties, and ethical recovery.',
      lessons: [
        {
          id: 'l-7-1',
          title: '7.1 Deceptive SEO Tactics, Spam Policies & Algorithmic Filters',
          type: 'RECORDED_VIDEO',
          duration: '60 min',
          // videoUrl: pending instructor upload
          notes: 'Detect and dissect harmful techniques: cloaking, article spinning, abusive automation, doorway pages, link spam, and Google Spam Policies.',
          aiTools: ['Originality.ai Plagiarism Checker', 'Google Spam Policies Guide'],
          resources: [{ title: 'Google Spam Policy Overview', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-7-2',
          title: '7.2 Penalty Remediation, Recovery Protocols & Ethical Alternatives',
          type: 'RECORDED_VIDEO',
          duration: '60 min',
          // videoUrl: pending instructor upload
          notes: 'Managing manual actions, reconsideration requests, toxic link pruning, disavow files, and sustainable white-hat alternatives.',
          aiTools: ['Google Search Console Disavow Tool', 'Spam Score Analyzer'],
          resources: [{ title: 'Penalty Remediation & Disavow Template', url: '#', type: 'TEMPLATE' }]
        }
      ],
      assignment: {
        id: 'asg-mod-7',
        title: 'Module 7 Practical Deliverable: Search Engine Risk Audit & Ethical Remediation Plan',
        instructions: 'Analyze a simulated website affected by sudden organic visibility drop. Identify manipulative practices (cloaked links, doorway pages, uncurated AI spam). Prepare a disavow file, remediation roadmap, and compliant white-hat optimization alternative.',
        deliverables: [
          'Risk triage table mapping observed infractions to Google Spam Policies',
          'Penalty recovery action plan (content clean-up, link pruning, reconsideration request)',
          'Ethical white-hat content alternative plan driving sustainable organic search growth'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-8',
      title: 'Module 8: Affiliate Marketing',
      description: 'Affiliate networks, niche selection, comparison content, commission models, disclosure rules, Google AdSense vs affiliate, and AI content development.',
      lessons: [
        {
          id: 'l-8-1',
          title: '8.1 Affiliate Architecture, Networks, Niche Selection & Disclosures',
          type: 'RECORDED_VIDEO',
          duration: '60 min',
          // videoUrl: pending instructor upload
          notes: 'Affiliate ecosystems, high-paying networks, choosing profitable verticals, tracking cookies, and FTC disclosure compliance.',
          aiTools: ['Impact.com Marketplace', 'Affilimate Analytics'],
          resources: [{ title: 'Affiliate Program Vetting Matrix', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-8-2',
          title: '8.2 Google AdSense Integration & AI-Powered Affiliate Strategy',
          type: 'RECORDED_VIDEO',
          duration: '60 min',
          // videoUrl: pending instructor upload
          notes: 'AdSense monetization, RPM optimization, ad placements, AdSense vs affiliate comparison, and AI-assisted affiliate keyword research.',
          aiTools: ['Google AdSense Console', 'Claude Affiliate Researcher'],
          resources: [{ title: 'Affiliate vs AdSense Financial Comparison Model', url: '#', type: 'TEMPLATE' }]
        }
      ],
      assignment: {
        id: 'asg-mod-8',
        title: 'Module 8 Practical Deliverable: High-Intent Affiliate Strategy & Revenue Model',
        instructions: 'Select a profitable vertical (SaaS, FinTech, E-Commerce). Select 3 top affiliate programmes. Design a comparison landing page layout with compliant FTC disclosures. Outline 10 high-intent search keywords and build a 6-month revenue projection model.',
        deliverables: [
          'Niche analysis matrix with affiliate programme commission tiers',
          'High-intent product comparison article wireframe with disclosure placement',
          'Keyword research table targeting "best", "review", and "vs" keywords',
          '6-month traffic to commission revenue financial projection'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-9',
      title: 'Module 9: Content Marketing',
      description: 'Strategy, blog writing, topic clusters, pillar pages, Quora & third-party distribution, storytelling, and AEO/GEO content optimization.',
      lessons: [
        {
          id: 'l-9-1',
          title: '9.1 Content Strategy, Topic Clusters & Multi-Platform Distribution',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'Topic clusters, pillar content architecture, Quora thought leadership, Medium/Substack syndication, and search intent alignment.',
          aiTools: ['MarketMuse Topic Modeler', 'Notion Editorial Workspace'],
          resources: [{ title: 'Pillar & Cluster Mapping Blueprint', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-9-2',
          title: '9.2 Generative AI Content Pipelines, Editorial Fact-Checking & AEO Optimization',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'Building automated research briefs, editorial fact-checking protocols, video script generation, and Answer Engine Optimisation (AEO).',
          aiTools: ['Claude 3.5 Sonnet', 'Perplexity Pro Fact Checker', 'ChatGPT Voice'],
          resources: [{ title: 'Editorial Fact-Checking Rubric', url: '#', type: 'PDF' }]
        }
      ],
      assignment: {
        id: 'asg-mod-9',
        title: 'Module 9 Practical Deliverable: Pillar-Cluster Content Campaign & Distribution Plan',
        instructions: 'Create an authoritative 1,500-word cornerstone article on a designated digital marketing topic. Create a topic cluster with 4 supporting subtopics. Repurpose the core piece into 3 LinkedIn posts, 1 Twitter/X thread, and a Quora thought leadership answer.',
        deliverables: [
          'Full formatted cornerstone pillar article with SEO title, meta & header tags',
          'Topic cluster visual diagram connecting pillar and cluster URLs',
          'Repurposed multi-platform social asset package (LinkedIn, X, Quora)',
          'Content performance measurement scorecard (organic traffic, time on page, leads)'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-10',
      title: 'Module 10: Freelancing and Client Acquisition',
      description: 'Starting a freelancing career, specialisation, Upwork, Freelancer, Guru, PPH, writing winning proposals, pricing models, SOW, and client retention.',
      lessons: [
        {
          id: 'l-10-1',
          title: '10.1 Freelance Marketplaces, Niche Specialisation & Profile Architecture',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'Navigating Upwork, Freelancer, Guru, and PeoplePerHour. Architecting 100% completed agency-grade freelancer profiles with verified badges.',
          aiTools: ['Upwork Profile Optimizer AI', 'Loom Video Outreach'],
          resources: [{ title: 'High-Converting Upwork Profile Blueprint', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-10-2',
          title: '10.2 Project Pricing, Scope of Work (SOW), Client Retention & AI Proposals',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'Value-based vs hourly pricing, crafting airtight Scope of Work (SOW) documents, handling discovery calls, and AI-assisted proposal research.',
          aiTools: ['PandaDoc Proposal Builder', 'Bonsai Freelance Suite AI'],
          resources: [{ title: 'Standard Digital Marketing SOW Contract Template', url: '#', type: 'TEMPLATE' }]
        }
      ],
      assignment: {
        id: 'asg-mod-10',
        title: 'Module 10 Practical Deliverable: Client Acquisition Proposal & Service Scope of Work (SOW)',
        instructions: 'Build your complete digital marketing freelance service offering. Create an optimized Upwork profile overview. Craft a customized proposal addressing an actual high-value client job brief. Draft a professional Scope of Work (SOW) agreement with pricing and milestones.',
        deliverables: [
          'Optimized Upwork/freelance profile overview and specialized service tiers',
          'Client discovery questionnaire (10 high-impact audit questions)',
          'Personalised client pitch proposal with case study proof points',
          'Formal Scope of Work (SOW) contract template including milestone terms'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-11',
      title: 'Module 11: Artificial Intelligence Fundamentals for Marketers',
      description: 'Generative AI, Large Language Models (ChatGPT, Claude, Gemini), prompt engineering, prompt templates, hallucinations, brand voice, and responsible AI.',
      lessons: [
        {
          id: 'l-11-1',
          title: '11.1 Generative AI Foundations, LLMs & Advanced Prompt Engineering',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'Deep dive into LLM tokenization, temperature, system prompts, role prompting, few-shot prompting, and chain-of-thought marketing workflows.',
          aiTools: ['ChatGPT 4o', 'Claude 3.5 Sonnet', 'Google Gemini 1.5 Pro'],
          resources: [{ title: 'Enterprise Prompt Engineering Field Guide', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-11-2',
          title: '11.2 AI Research, Brand Voice Architecture & Responsible AI Governance',
          type: 'RECORDED_VIDEO',
          duration: '75 min',
          // videoUrl: pending instructor upload
          notes: 'Fact-checking AI hallucinations, copyright constraints, enterprise data privacy, and embedding consistent brand voice across all generated outputs.',
          aiTools: ['Perplexity Pro', 'Anthropic Console Workbench'],
          resources: [{ title: 'Brand Voice AI Configuration Matrix', url: '#', type: 'PDF' }]
        }
      ],
      assignment: {
        id: 'asg-mod-11',
        title: 'Module 11 Practical Deliverable: Enterprise AI Marketing Prompt Library & Workflow Suite',
        instructions: 'Engineer a comprehensive library of 15 advanced prompt chains spanning market research, technical SEO schemas, ad copywriting, data analysis, and email sequences. Include input variables, constraints, few-shot examples, and expected output schemas.',
        deliverables: [
          '15 modular prompt templates structured with system prompt, role, and output format',
          'Prompt testing results comparing outputs across ChatGPT, Claude, and Gemini',
          'Brand voice style guide instructions for consistent AI persona generation',
          'AI governance & fact-checking verification checklist'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-12',
      title: 'Module 12: AI Content Creation and Video Marketing',
      description: 'AI visual creative strategy, image generation, Canva AI, short-form video creation, AI avatars, YouTube SEO, Instagram Reels, and copyright licensing.',
      lessons: [
        {
          id: 'l-12-1',
          title: '12.1 AI Visual Creative Strategy, Image Generation & Canva AI',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'Prompting Midjourney and Firefly for photorealistic commercial ad imagery, consistent character generation, aspect ratio scaling, and Canva AI Magic Studio.',
          aiTools: ['Midjourney v6', 'Canva Magic Studio', 'Adobe Firefly'],
          resources: [{ title: 'Midjourney Commercial Prompt Matrix', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-12-2',
          title: '12.2 AI Video Generation, Avatars, Short-Form Storytelling & Platform Rules',
          type: 'RECORDED_VIDEO',
          duration: '75 min',
          // videoUrl: pending instructor upload
          notes: 'Synthesizing voiceovers with ElevenLabs, generating avatar spokesperson reels with HeyGen, editing in CapCut, and platform disclosure requirements.',
          aiTools: ['HeyGen', 'ElevenLabs Voice AI', 'CapCut AI Editor', 'Runway Gen-3'],
          resources: [{ title: 'AI Avatar Video Production Checklist', url: '#', type: 'PDF' }]
        }
      ],
      assignment: {
        id: 'asg-mod-12',
        title: 'Module 12 Practical Deliverable: AI Multi-Format Creative & Video Asset Package',
        instructions: 'Produce a comprehensive brand creative package for an upcoming campaign: generate 3 high-converting static ad visuals using AI tools, write 2 short-form video scripts with visual storyboard cues, and produce a finished AI-voiceover video reel.',
        deliverables: [
          '3 static advertising creatives with prompts and design briefs',
          '2 short-form video scripts formatted for 9:16 Instagram Reels / YouTube Shorts',
          '1 rendered 30-second video clip using AI voiceover and captions',
          'Platform compliance confirmation and AI content labelling declaration'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-13',
      title: 'Module 13: Marketing Automation, CRM and AI Agents',
      description: 'HubSpot, GoHighLevel, Zapier, Make, n8n, webhooks, lead scoring, AI lead qualification, WhatsApp automation, and AI voice/sales agents.',
      lessons: [
        {
          id: 'l-13-1',
          title: '13.1 CRM Architecture, Contact Lifecycles & Lead Pipeline Management',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'Configuring HubSpot and GoHighLevel CRM pipelines, deal stages, custom properties, automated task reminders, and lead scoring formulas.',
          aiTools: ['HubSpot CRM', 'GoHighLevel CRM Suite'],
          resources: [{ title: 'CRM Lead Scoring Architecture Guide', url: '#', type: 'PDF' }]
        },
        {
          id: 'l-13-2',
          title: '13.2 Multi-Step Integration with Zapier, Make, n8n & Webhooks',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'Building robust automated webhooks, data transformation routines, API authentication, error handlers, and router scenarios.',
          aiTools: ['Zapier Automations', 'Make.com Scenarios', 'n8n Workflow Builder'],
          resources: [{ title: 'Make.com Marketing Scenarios Blueprint', url: '#', type: 'TEMPLATE' }]
        },
        {
          id: 'l-13-3',
          title: '13.3 Autonomous AI Agents, Chatbots & WhatsApp Automation',
          type: 'RECORDED_VIDEO',
          duration: '75 min',
          // videoUrl: pending instructor upload
          notes: 'Deploying autonomous customer qualification chatbots, WhatsApp Business API workflows, and conversational AI sales agents with human escalation fallbacks.',
          aiTools: ['Chatbase AI', 'Retell AI Voice Agents', 'Twilio WhatsApp API'],
          resources: [{ title: 'Autonomous AI Sales Agent System Prompt', url: '#', type: 'PDF' }]
        }
      ],
      assignment: {
        id: 'asg-mod-13',
        title: 'Module 13 Practical Deliverable: Multi-Step Lead Routing & AI CRM Qualification Workflow',
        instructions: 'Design and build an automated workflow connecting a website webhook/lead form to a CRM (HubSpot or GHL). Integrate an AI qualification step that parses the lead submission, assigns a score, and routes a personalized follow-up notification.',
        deliverables: [
          'Workflow blueprint or JSON export from Make/Zapier/n8n',
          'Lead scoring logic and AI evaluation prompt specifications',
          'Live test run log showing verified payload passing from webhook to CRM',
          'Security & privacy protocol documenting safe API credential management'
        ],
        maxScore: 100
      }
    },
    {
      id: 'mod-14',
      title: 'Module 14: Digital Marketing Strategy, Reporting and Capstone Project',
      description: 'Full-funnel digital marketing strategy, channel selection, KPI forecasting, Looker dashboards, presentation skills, and the Final Capstone Project.',
      lessons: [
        {
          id: 'l-14-1',
          title: '14.1 Full-Funnel Strategic Architecture, Budgets & Customer Journey Mapping',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'Synthesizing market research, competitor matrices, multi-touch channel budget allocations, customer journey stages, and executive KPI forecasting.',
          aiTools: ['Miro Strategy Canvas', 'Budget Allocation Modeler AI'],
          resources: [{ title: 'Master Growth Strategy Canvas (PDF & Sheet)', url: '#', type: 'TEMPLATE' }]
        },
        {
          id: 'l-14-2',
          title: '14.2 Conversion Rate Optimisation (CRO), Attribution & Executive Reporting',
          type: 'RECORDED_VIDEO',
          duration: '75 min',
          // videoUrl: pending instructor upload
          notes: 'Statistical hypothesis testing for CRO, multi-touch revenue attribution modeling, and delivering executive board-ready presentation decks.',
          aiTools: ['Looker Studio Executive BI', 'Forecasting Matrix AI'],
          resources: [{ title: 'Executive Marketing Board Deck Template', url: '#', type: 'LINK' }]
        },
        {
          id: 'l-14-3',
          title: '14.3 Capstone Project Submission & Evaluator Defence Briefing',
          type: 'LIVE_SESSION',
          duration: '90 min',
          notes: 'Comprehensive briefing for the final project submission. Covers rubric guidelines, required assets, presentation video guidelines, and industry evaluator defense.',
          aiTools: ['StudentVerse Evaluator Rubric', 'Slide Presentation AI'],
          resources: [{ title: 'Final Capstone Project Evaluation Rubric (40/30/20/10)', url: '#', type: 'PDF' }]
        }
      ],
      assignment: {
        id: 'asg-mod-14',
        title: 'Module 14 Final Capstone Project: Comprehensive AI-Powered Digital Marketing Strategy',
        instructions: 'Deliver a masterwork marketing strategy for an enterprise, scale-up, or local brand. Synthesize all 14 modules into an integrated omnichannel engine: market research, technical SEO audit, Google Ads plan, Meta Ads creative testing, 30-day content calendar, 5-part email nurture sequence, CRM automation workflow, GA4 measurement plan, interactive Looker Studio dashboard, and an executive client pitch presentation.',
        deliverables: [
          'Executive Summary & Market Research with Ideal Customer Personas (ICP)',
          'Complete Technical SEO Audit and Keyword Intent Mapping',
          'Google Ads Search & Performance Max Campaign Structure with Negative Keywords',
          'Meta Ads & LinkedIn Ads Creative Diversification Framework',
          '30-Day Social Media Content Calendar and AI Prompt Package',
          'Automated 5-Part Email Nurture Sequence with DNS Authentication Specs',
          'Marketing Automation Blueprint (Lead Capture -> AI Qualification -> CRM)',
          'GA4 Event Tracking Architecture & Published Looker Studio Dashboard URL',
          'Final 10-Minute Recorded Video Presentation Pitch'
        ],
        maxScore: 100
      }
    }
  ]
};

export default function CourseLearningPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string) || 'ai-digital-marketing-course';

  const modules = COURSE_MODULES[slug] || COURSE_MODULES['ai-digital-marketing-course'];

  // Current Active Module and Lesson
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1': true,
    'mod-2': false
  });

  // Authentication Guard State
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Completed Lessons State - Initialized strictly to 0 / empty
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [courseProgressPct, setCourseProgressPct] = useState<number>(0);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(true);
  const [isLoadingProgress, setIsLoadingProgress] = useState<boolean>(true);
  const [isSavingLesson, setIsSavingLesson] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Active Tab inside Lesson Workspace
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz' | 'assignment' | 'resources'>('notes');

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Assignment Submission State
  const [assignmentResponse, setAssignmentResponse] = useState('');
  const [assignmentUrl, setAssignmentUrl] = useState('');
  const [isSubmittingAssignment, setIsSubmittingAssignment] = useState(false);
  const [assignmentSubmittedSuccess, setAssignmentSubmittedSuccess] = useState(false);

  const currentModule = modules[activeModuleIndex] || modules[0];
  const currentLesson = currentModule?.lessons[activeLessonIndex] || currentModule?.lessons[0];

  // Total published required lessons
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  // 1. Strict Authentication Guard - Guests are redirected to login immediately
  useEffect(() => {
    const user = getAuthUser();
    if (!user || !user.id) {
      setIsAuthorized(false);
      router.replace(`/student/login?redirect=${encodeURIComponent(`/courses/${slug}/learn`)}`);
      return;
    }
    setCurrentUser(user);
    setIsAuthorized(true);
  }, [slug, router]);

  // 2. Load User-Isolated Progress (Only runs when genuine user is authenticated)
  useEffect(() => {
    if (!currentUser || !currentUser.id) return;

    let isMounted = true;
    const storageKey = getScopedStorageKey('course_progress', slug) || `sv_course_progress_${currentUser.id}_${slug}`;

    // Read student-isolated local cache first for instant UI response
    try {
      const localSaved = localStorage.getItem(storageKey);
      if (localSaved) {
        const parsed = JSON.parse(localSaved);
        if (Array.isArray(parsed) && isMounted) {
          setCompletedLessonIds(parsed);
          setCompletedCount(parsed.length);
          if (totalLessons > 0) {
            setCourseProgressPct(Math.round((parsed.length / totalLessons) * 1000) / 10);
          }
        }
      }
    } catch (_) {}

    async function loadStudentProgress() {
      try {
        setIsLoadingProgress(true);
        const res = await api.student.getCourseProgress(slug);
        if (isMounted && res) {
          setIsEnrolled(res.isEnrolled ?? true);
          // Prioritize server completed lessons permanently from PostgreSQL
          const serverCompleted = res.completedLessonIds || [];

          setCompletedLessonIds(serverCompleted);
          setCompletedCount(serverCompleted.length);
          setCourseProgressPct(
            totalLessons > 0 ? Math.round((serverCompleted.length / totalLessons) * 1000) / 10 : (res.progressPct || 0)
          );
          if (storageKey) {
            try {
              localStorage.setItem(storageKey, JSON.stringify(serverCompleted));
            } catch (_) {}
          }
        }
      } catch (err: any) {
        // Backend offline or quiet fallback - keep local state intact
      } finally {
        if (isMounted) setIsLoadingProgress(false);
      }
    }

    loadStudentProgress();
    return () => {
      isMounted = false;
    };
  }, [currentUser, slug, totalLessons]);

  const toggleModuleExpand = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const handleSelectLesson = (modIdx: number, lIdx: number) => {
    setActiveModuleIndex(modIdx);
    setActiveLessonIndex(lIdx);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setActiveTab('notes');
  };

  const handleToggleLesson = async (lessonId: string, markCompleted: boolean) => {
    const targetLesson = modules.flatMap((m) => m.lessons).find((l) => l.id === lessonId);
    if (!targetLesson) return;

    const storageKey = currentUser?.id
      ? (getScopedStorageKey('course_progress', slug) || `sv_course_progress_${currentUser.id}_${slug}`)
      : null;

    // Compute updated completed IDs
    const nextCompletedIds = markCompleted
      ? Array.from(new Set([...completedLessonIds, lessonId]))
      : completedLessonIds.filter((id) => id !== lessonId);

    // Immediately update UI state
    setCompletedLessonIds(nextCompletedIds);
    setCompletedCount(nextCompletedIds.length);
    const newProgressPct = totalLessons > 0
      ? Math.round((nextCompletedIds.length / totalLessons) * 1000) / 10
      : 0;
    setCourseProgressPct(newProgressPct);

    // Save to isolated student localStorage
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(nextCompletedIds));
      } catch (_) {}
    }

    setActionNotice(
      markCompleted
        ? 'Lesson marked as complete!'
        : `Lesson marked as incomplete.`
    );
    setTimeout(() => setActionNotice(null), 2500);

    // Sync with backend API (permanent database persistence)
    setIsSavingLesson(lessonId);
    try {
      const res = await api.student.updateLessonProgress(slug, lessonId, {
        isCompleted: markCompleted,
        status: markCompleted ? 'COMPLETED' : 'NOT_STARTED',
        totalLessons,
        completionMethod: 'MANUAL_VERIFIED',
      });

      if (res && res.success && res.completedLessonIds) {
        setCompletedLessonIds(res.completedLessonIds);
        setCompletedCount(res.completedLessonIds.length);
        if (totalLessons > 0) {
          setCourseProgressPct(Math.round((res.completedLessonIds.length / totalLessons) * 1000) / 10);
        }
        if (storageKey) {
          try {
            localStorage.setItem(storageKey, JSON.stringify(res.completedLessonIds));
          } catch (_) {}
        }
      }
    } catch (err: any) {
      // Quiet fallback - optimistic state remains intact
    } finally {
      setIsSavingLesson(null);
    }
  };

  const handleNextLesson = () => {
    // Navigate without modifying completion status
    if (activeLessonIndex < currentModule.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    } else if (activeModuleIndex < modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
      setActiveLessonIndex(0);
      const nextMod = modules[activeModuleIndex + 1];
      setExpandedModules((prev) => ({ ...prev, [nextMod.id]: true }));
    }
    setActiveTab('notes');
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(activeLessonIndex - 1);
    } else if (activeModuleIndex > 0) {
      setActiveModuleIndex(activeModuleIndex - 1);
      const prevMod = modules[activeModuleIndex - 1];
      setActiveLessonIndex(prevMod.lessons.length - 1);
    }
    setActiveTab('notes');
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAssignment(true);
    setTimeout(() => {
      setIsSubmittingAssignment(false);
      setAssignmentSubmittedSuccess(true);
      setTimeout(() => {
        setAssignmentSubmittedSuccess(false);
        setAssignmentResponse('');
        setAssignmentUrl('');
      }, 3500);
    }, 1000);
  };

  // If unauthorized or pending auth check, render secure redirect loading screen
  if (isAuthorized === false || isAuthorized === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Protected Student Learning Portal</h2>
        <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
          Please sign in to access your course materials, cohort sessions, and verified progress tracking.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href={`/student/login?redirect=${encodeURIComponent(`/courses/${slug}/learn`)}`}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Sign In to Continue
          </Link>
          <Link
            href={`/courses/${slug}`}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Course Syllabus
          </Link>
        </div>
      </div>
    );
  }

  // Dynamic progress percentage from database/local isolation
  const progressPercentage = totalLessons > 0 ? courseProgressPct : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* -------------------------------------------------------------
          TOP APPLICATION BAR
      ------------------------------------------------------------- */}
      <header className="h-16 border-b border-slate-800 bg-slate-900 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link
            href="/student"
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <div className="min-w-0">
            <span className="text-[11px] font-black text-indigo-400 uppercase tracking-wider block truncate">
              StudentVerse Learning LMS
            </span>
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md md:max-w-xl">
              AI Digital Marketing Course &bull; {currentModule.title}
            </h1>
          </div>
        </div>

        {/* Course Progress Indicator */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-400 font-medium block">
              Curriculum Progress: {completedCount} / {totalLessons} Lessons
            </span>
            <span className="text-xs font-black text-emerald-400">
              {totalLessons > 0 ? `${progressPercentage}% Completed` : 'Content Pending'}
            </span>
          </div>
          <div className="w-20 sm:w-32 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------
          MAIN TWO-COLUMN WORKSPACE
      ------------------------------------------------------------- */}
      <div className="flex-1 w-full max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: 72% LEARNING WORKSPACE */}
          <div className="lg:col-span-8 flex flex-col space-y-6 min-w-0">

            {/* Audit Mode Notice if applicable */}
            {!isEnrolled && !isLoadingProgress && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-2xl text-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>You are previewing this course in audit mode. Enrol in an active cohort to save verified lesson completion.</span>
                </div>
                <Link
                  href={`/courses/${slug}`}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex-shrink-0"
                >
                  Enrol Now
                </Link>
              </div>
            )}

            {/* Active Lesson Header & Top Completion Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {currentLesson.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" /> {currentLesson.duration}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {currentLesson.title}
                </h2>
              </div>

              {/* Top Quick Status / Toggle */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {completedLessonIds.includes(currentLesson.id) ? (
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Lesson Completed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleToggleLesson(currentLesson.id, true)}
                    disabled={isSavingLesson === currentLesson.id}
                    className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-md"
                  >
                    {isSavingLesson === currentLesson.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-indigo-200" />
                    )}
                    <span>Mark as Complete</span>
                  </button>
                )}
              </div>
            </div>

            {/* Action Feedback Alerts */}
            {actionNotice && (
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{actionNotice}</span>
              </div>
            )}

            {actionError && (
              <div className="p-3.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{actionError}</span>
              </div>
            )}

            {/* 16:9 4K-STYLED COVER GRAPHIC / VIDEO CONTAINER */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 flex flex-col justify-between p-6 sm:p-8">
              {currentLesson.videoUrl ? (
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  className="w-full h-full absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {/* Subtle Background Mesh Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none" />

                  {/* Top Branding Bar inside Cover Card */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-xs text-white shadow-md">
                        SV
                      </div>
                      <span className="text-xs font-bold text-slate-300 tracking-wide uppercase">
                        StudentVerse Global Learning Studio
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{currentLesson.type === 'LIVE_SESSION' ? '100% Live Instructor-Led Cohort Class' : 'Masterclass Recording'}</span>
                    </span>
                  </div>

                  {/* Center Module and Lesson Title */}
                  <div className="relative z-10 text-center my-auto px-4 max-w-2xl mx-auto space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 mx-auto flex items-center justify-center shadow-lg mb-2">
                      <Video className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                      {currentModule.title}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-snug">
                      {currentLesson.title}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 text-[11px] font-medium mt-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Official Video Recording Coming Soon &bull; Live Cohort Session Scheduled</span>
                    </div>
                  </div>

                  {/* Bottom Footer inside Cover Card */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      StudentVerse Verified Curriculum &bull; Faculty-Led Practical Exercises Below
                    </span>
                    <span className="font-semibold text-slate-300">
                      Duration: {currentLesson.duration}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* UNIFIED CONTROLS BAR: MANUAL COMPLETION & NAVIGATION */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {completedLessonIds.includes(currentLesson.id) ? (
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Lesson Completed</span>
                    </div>
                    <button
                      onClick={() => handleToggleLesson(currentLesson.id, false)}
                      disabled={isSavingLesson === currentLesson.id}
                      className="text-xs font-semibold text-slate-400 hover:text-rose-400 underline underline-offset-4 transition-colors"
                    >
                      {isSavingLesson === currentLesson.id ? 'Updating...' : 'Mark as Incomplete'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleToggleLesson(currentLesson.id, true)}
                    disabled={isSavingLesson === currentLesson.id}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                  >
                    {isSavingLesson === currentLesson.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-indigo-200" />
                    )}
                    <span>Mark as Complete</span>
                  </button>
                )}
              </div>

              {/* Navigation: Previous and Next Lesson (Never Locks!) */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={handlePrevLesson}
                  disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 disabled:opacity-40 disabled:pointer-events-none border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNextLesson}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black border border-slate-700 shadow-md transition-all flex items-center gap-2 group"
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* WORKSPACE NAVIGATION TABS */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                  activeTab === 'notes'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Lesson Notes &amp; Topics</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                  activeTab === 'quiz'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Knowledge Check</span>
              </button>

              <button
                onClick={() => setActiveTab('assignment')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                  activeTab === 'assignment'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Module Practical Assignment</span>
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                  activeTab === 'resources'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Resources ({currentLesson.resources.length})</span>
              </button>
            </div>

            {/* TAB 1: LESSON NOTES & AI TOOLS */}
            {activeTab === 'notes' && (
              <div className="space-y-6">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>Curriculum Breakdown &amp; Core Takeaways</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {currentLesson.notes}
                  </p>
                </div>

                {/* AI Tools Applied in this Session */}
                {currentLesson.aiTools.length > 0 && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>AI Tooling Mastered in this Lesson:</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentLesson.aiTools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: INTERACTIVE KNOWLEDGE CHECK QUIZ */}
            {activeTab === 'quiz' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-white">Lesson Knowledge Assessment</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Test your comprehension before proceeding to the practical assignment.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Passing: 70%
                  </span>
                </div>

                {currentLesson.quiz ? (
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      {currentLesson.quiz.question}
                    </p>

                    <div className="space-y-2.5">
                      {currentLesson.quiz.options.map((opt, optIdx) => {
                        const isSelected = selectedQuizOption === optIdx;
                        const isCorrect = optIdx === currentLesson.quiz?.correctIndex;

                        let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700';
                        if (quizSubmitted) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-950/60 text-emerald-300 border-emerald-500/80';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-rose-950/60 text-rose-300 border-rose-500/80';
                          }
                        } else if (isSelected) {
                          btnStyle = 'bg-indigo-900/60 text-indigo-200 border-indigo-500';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => setSelectedQuizOption(optIdx)}
                            className={`w-full p-4 rounded-xl text-xs text-left font-medium border transition-all flex items-start gap-3 ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1 leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {!quizSubmitted ? (
                      <button
                        onClick={() => setQuizSubmitted(true)}
                        disabled={selectedQuizOption === null}
                        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow"
                      >
                        Check Answer
                      </button>
                    ) : (
                      <div
                        className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 ${
                          selectedQuizOption === currentLesson.quiz.correctIndex
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                            : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                        }`}
                      >
                        <span className="font-bold block">
                          {selectedQuizOption === currentLesson.quiz.correctIndex
                            ? '✓ Correct Answer!'
                            : '✕ Incorrect. Review Explanation:'}
                        </span>
                        <p>{currentLesson.quiz.explanation}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <p className="text-xs">
                      This interactive lecture is verified by the module practical deliverable. Proceed to the assignment tab.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: MODULE PRACTICAL ASSIGNMENT */}
            {activeTab === 'assignment' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
                <div className="pb-4 border-b border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Practical Evaluated Milestone
                  </span>
                  <h3 className="text-lg font-black text-white">{currentModule.assignment.title}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {currentModule.assignment.instructions}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Mandatory Deliverables (Assessed against 40/30/20/10 Rubric):
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {currentModule.assignment.deliverables.map((del, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submission Form */}
                <form onSubmit={handleSubmitAssignment} className="space-y-4 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Submit Your Practical Work for Trainer Review
                  </h4>

                  <div>
                    <label className="text-xs text-slate-400 font-semibold block mb-1.5">
                      Live Project / Document URL (Google Drive, Loom, GitHub, Looker Studio):
                    </label>
                    <input
                      type="url"
                      value={assignmentUrl}
                      onChange={(e) => setAssignmentUrl(e.target.value)}
                      placeholder="https://docs.google.com/... or https://lookerstudio.google.com/..."
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-semibold block mb-1.5">
                      Executive Summary / Technical Notes:
                    </label>
                    <textarea
                      rows={4}
                      value={assignmentResponse}
                      onChange={(e) => setAssignmentResponse(e.target.value)}
                      placeholder="Provide a brief explanation of methodology, key metrics, and tools utilized..."
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {assignmentSubmittedSuccess ? (
                    <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-xs text-emerald-300 flex items-center gap-3 animate-fadeIn">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <strong className="block">Assignment Submitted Successfully!</strong>
                        <span>
                          Your work has been queued for faculty review against the 40/30/20/10 weighted rubric. Results will update in your Student Profile.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmittingAssignment}
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmittingAssignment ? 'Submitting...' : 'Submit Practical Assignment'}</span>
                    </button>
                  )}
                </form>
              </div>
            )}

            {/* TAB 4: RESOURCES & DOWNLOADS */}
            {activeTab === 'resources' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                <h3 className="text-base font-bold text-white mb-2">Lesson Supporting Resources</h3>
                {currentLesson.resources.map((res, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                        {res.type}
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-white block">{res.title}</span>
                        <span className="text-[10px] text-slate-400">StudentVerse Verified Learning Resource</span>
                      </div>
                    </div>

                    <a
                      href={res.url}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold text-white transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Completion & Navigation Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {completedLessonIds.includes(currentLesson.id) ? (
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Lesson Completed</span>
                    </div>
                    <button
                      onClick={() => handleToggleLesson(currentLesson.id, false)}
                      disabled={isSavingLesson === currentLesson.id}
                      className="text-xs font-semibold text-slate-400 hover:text-rose-400 underline underline-offset-4 transition-colors"
                    >
                      {isSavingLesson === currentLesson.id ? 'Updating...' : 'Mark as Incomplete'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleToggleLesson(currentLesson.id, true)}
                    disabled={isSavingLesson === currentLesson.id}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                  >
                    {isSavingLesson === currentLesson.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-indigo-200" />
                    )}
                    <span>Mark as Complete</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={handlePrevLesson}
                  disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 disabled:opacity-40 disabled:pointer-events-none border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNextLesson}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black border border-slate-700 shadow-md transition-all flex items-center gap-2 group"
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 14-MODULE CURRICULUM ACCORDION SIDEBAR */}
          <aside className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col space-y-4 sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                  Course Syllabus
                </span>
                <h3 className="text-sm font-black text-white">All 14 Modules</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                {totalLessons} Lessons
              </span>
            </div>

            {/* Overall Syllabus Progress Bar */}
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Your Progress</span>
                <span className="font-bold text-emerald-400">{progressPercentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Module List Accordion */}
            <div className="space-y-3">
              {modules.map((mod, modIdx) => {
                const isExpanded = !!expandedModules[mod.id];
                const isCurrentModule = activeModuleIndex === modIdx;
                const modCompletedCount = mod.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
                const modTotalLessons = mod.lessons.length;
                const modProgressPct = modTotalLessons > 0
                  ? Math.round((modCompletedCount / modTotalLessons) * 100)
                  : 0;
                const isModCompleted = modTotalLessons > 0 && modCompletedCount >= modTotalLessons;

                return (
                  <div
                    key={mod.id}
                    className={`rounded-2xl border transition-all ${
                      isCurrentModule
                        ? 'border-indigo-500/50 bg-slate-800/40 shadow-sm'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    {/* Module Header Toggle */}
                    <button
                      onClick={() => toggleModuleExpand(mod.id)}
                      className="w-full p-3.5 text-left flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-white block leading-snug truncate">{mod.title}</span>
                          {isModCompleted && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex-shrink-0">
                              <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                              <span>100%</span>
                            </span>
                          )}
                        </div>

                        {/* Dynamic Module Progress Stats */}
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                          <span>{modCompletedCount} of {modTotalLessons} Completed</span>
                          <span className={isModCompleted ? 'text-emerald-400 font-bold' : 'text-slate-400 font-medium'}>
                            {modProgressPct}%
                          </span>
                        </div>

                        {/* Dynamic Module Mini Progress Bar */}
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-1.5">
                          <div
                            className={`h-full transition-all duration-300 ${
                              isModCompleted ? 'bg-emerald-500' : 'bg-indigo-500'
                            }`}
                            style={{ width: `${modProgressPct}%` }}
                          />
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      )}
                    </button>

                    {/* Lessons list with Interactive Checkboxes */}
                    {isExpanded && (
                      <div className="p-2 pt-0 space-y-1 border-t border-slate-800/60 divide-y divide-slate-800/40">
                        {mod.lessons.map((lesson, lIdx) => {
                          const isCurrent = activeModuleIndex === modIdx && activeLessonIndex === lIdx;
                          const isCompleted = completedLessonIds.includes(lesson.id);

                          return (
                            <div
                              key={lesson.id}
                              onClick={() => handleSelectLesson(modIdx, lIdx)}
                              className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                                isCurrent
                                  ? 'bg-indigo-600/90 text-white font-bold shadow'
                                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white font-medium'
                              }`}
                            >
                              {/* Interactive Accessible Checkbox */}
                              <div
                                role="checkbox"
                                aria-checked={isCompleted}
                                aria-label={`Mark ${lesson.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
                                tabIndex={0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleLesson(lesson.id, !isCompleted);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleToggleLesson(lesson.id, !isCompleted);
                                  }
                                }}
                                title={
                                  isCompleted
                                    ? 'Completed • Click to mark as incomplete'
                                    : 'Click to mark as complete'
                                }
                                className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer flex-shrink-0 mt-0.5 ${
                                  isCompleted
                                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-sm'
                                    : 'border-slate-600 bg-slate-950/80 hover:border-indigo-400 text-transparent'
                                } ${isSavingLesson === lesson.id ? 'opacity-50 pointer-events-none' : ''}`}
                              >
                                {isSavingLesson === lesson.id ? (
                                  <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                                ) : isCompleted ? (
                                  <Check className="w-3 h-3 stroke-[3]" />
                                ) : null}
                              </div>

                              <div className="flex-1 overflow-hidden">
                                <span className="block truncate">{lesson.title}</span>
                                <span
                                  className={`text-[10px] block mt-0.5 ${
                                    isCurrent ? 'text-indigo-200' : 'text-slate-500'
                                  }`}
                                >
                                  {lesson.type.replace('_', ' ')} &bull; {lesson.duration}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
