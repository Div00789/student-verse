export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonItem {
  id: string;
  code?: string;
  title: string;
  type: 'LIVE_SESSION' | 'RECORDED_VIDEO' | 'PROJECT';
  duration: string;
  durationMinutes?: number;
  videoUrl?: string;
  notes: string;
  aiTools: string[];
  resources: { title: string; url: string; type: string }[];
  quiz?: QuizQuestion;
}

export interface ModuleItem {
  id: string;
  title: string;
  description: string;
  orderIndex?: number;
  lessons: LessonItem[];
  assignment: {
    id: string;
    title: string;
    instructions: string;
    deliverables: string[];
    maxScore: number;
  };
}

export const RICH_CURRICULUM_DATA: Record<string, ModuleItem[]> = {
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

function buildAmanCurriculum(): ModuleItem[] {
  const baseAiModules = RICH_CURRICULUM_DATA['ai-digital-marketing-course'] || [];

  const mod1: ModuleItem = {
    id: 'mod-1',
    title: 'Module 1: Search Engine Optimisation (SEO)',
    description: 'Foundations of crawling, indexing, keyword research, on-page SEO, technical audits, Core Web Vitals, link building, modern SEO tools, and AI/AEO/GEO optimization with dedicated recorded masterclasses and presentation slide decks.',
    orderIndex: 1,
    lessons: [
      {
        id: 'l-1-1',
        code: 'l-1-1',
        title: '1.1 Basic SEO – Introduction to Search Engine Optimisation',
        type: 'RECORDED_VIDEO',
        duration: '75 min',
        durationMinutes: 75,
        videoUrl: 'https://drive.google.com/file/d/13neNPg-I_vlLa8PBrgLhzv7Z8oMP8NUF/preview',
        notes: 'Understand the fundamentals of SEO, the role of search engines, importance of organic website traffic, and basic SEO terminology. Master the crawling, indexing, and ranking architecture.',
        aiTools: ['Ahrefs AI', 'Semrush Keyword Magic', 'ChatGPT Search Intent Classifier'],
        resources: [
          { title: 'SEO Module 1 – Presentation Slides', url: 'https://docs.google.com/presentation/d/1QTwmRAZF0dv1pIanpvk1LVcRf3qvDtL4/preview', type: 'PRESENTATION' },
          { title: 'SEO Module 2 – Presentation Slides', url: 'https://docs.google.com/presentation/d/1xp3iJ58g74lOsJmc9e1ng8Jum_j8q1U5/preview', type: 'PRESENTATION' },
          { title: 'Google Crawlability & Indexation Cheat Sheet', url: '#', type: 'PDF' },
        ],
        quiz: {
          question: 'What is the primary role of a search engine index?',
          options: [
            'A massive, structured database where web pages are organized, parsed, and retrieved for ranking.',
            'A tool for running paid search advertisements.',
            'A firewall blocking unauthorized web scrapers.',
            'A cache storing only image thumbnails.'
          ],
          correctIndex: 0,
          explanation: 'The search index is the parsed repository from which Google evaluates relevance and computes rankings in milliseconds.'
        }
      },
      {
        id: 'l-1-2',
        code: 'l-1-2',
        title: '1.2 Keywords and Keyword Research – Part 1',
        type: 'RECORDED_VIDEO',
        duration: '80 min',
        durationMinutes: 80,
        videoUrl: 'https://drive.google.com/file/d/1BcrzWo1VshLsH1JJXWTa5vCF3E-tlCnW/preview',
        notes: 'Understand keywords, search intent, keyword research fundamentals, search volumes, competition, and how to identify high-converting keyword opportunities.',
        aiTools: ['Semrush Keyword Magic', 'Ahrefs Keywords Explorer', 'Google Keyword Planner'],
        resources: [
          { title: 'Keyword Intent Categorization Matrix', url: '#', type: 'TEMPLATE' },
          { title: 'Search Volume & Difficulty Calculator', url: '#', type: 'SHEET' }
        ],
        quiz: {
          question: 'Which search intent indicates a user looking to buy a specific software subscription immediately?',
          options: [
            'Transactional intent',
            'Informational intent',
            'Navigational intent',
            'Broad exploratory intent'
          ],
          correctIndex: 0,
          explanation: 'Transactional intent denotes high buying readiness where commercial terms (e.g., pricing, discount, buy) dominate.'
        }
      },
      {
        id: 'l-1-3',
        code: 'l-1-3',
        title: '1.3 Keywords and Keyword Research – Part 2',
        type: 'RECORDED_VIDEO',
        duration: '75 min',
        durationMinutes: 75,
        videoUrl: 'https://drive.google.com/file/d/1k7COQRLOQeMbcJLAUgaIX6dODGBtp5ZE/preview',
        notes: 'Develop keyword research skills, explore keyword selection frameworks, map keywords to website pages, and avoid keyword cannibalization.',
        aiTools: ['ChatGPT Topical Cluster Generator', 'SurferSEO Content Planner'],
        resources: [
          { title: 'Keyword-to-URL Mapping Blueprint (XLSX)', url: '#', type: 'TEMPLATE' },
          { title: 'Topical Authority Cluster Guide', url: '#', type: 'PDF' }
        ],
        quiz: {
          question: 'What is keyword cannibalization?',
          options: [
            'When multiple pages on the same website compete for the same keyword and intent, diluting rankings.',
            'When competitors copy your keyword targets.',
            'When search engines delete old indexed keywords.',
            'When keywords have zero search volume.'
          ],
          correctIndex: 0,
          explanation: 'Keyword cannibalization splits link equity and confuses search crawlers regarding which page is authoritative.'
        }
      },
      {
        id: 'l-1-4',
        code: 'l-1-4',
        title: '1.4 On-Page SEO – Part 1',
        type: 'RECORDED_VIDEO',
        duration: '85 min',
        durationMinutes: 85,
        videoUrl: 'https://drive.google.com/file/d/1WSQwKhvFsceflR5s-gzevKYnO4MYjfD4/preview',
        notes: 'Understand on-page optimisation, learn page titles, meta descriptions, heading structures (H1-H6), and optimize website content for maximum organic relevance.',
        aiTools: ['Yoast SEO / RankMath', 'Claude 3.5 Sonnet for Title Rewrites'],
        resources: [
          { title: 'On-Page SEO Optimization Checklist', url: '#', type: 'PDF' },
          { title: 'Meta Title & Description CTR Formula', url: '#', type: 'TEMPLATE' }
        ],
        quiz: {
          question: 'What is the recommended character count for Google SERP title tags to prevent truncation?',
          options: [
            '50 to 60 characters (approximately 580 pixels)',
            '90 to 110 characters',
            '20 to 30 characters',
            'Over 150 characters'
          ],
          correctIndex: 0,
          explanation: 'Desktop and mobile SERPs truncate titles wider than 580-600px, which corresponds to 50-60 characters.'
        }
      },
      {
        id: 'l-1-5',
        code: 'l-1-5',
        title: '1.5 On-Page SEO – Part 2',
        type: 'RECORDED_VIDEO',
        duration: '90 min',
        durationMinutes: 90,
        videoUrl: 'https://drive.google.com/file/d/1b9MuzcId5SSuhZn-gE3QJ6SZ9iKd8f-G/preview',
        notes: 'Advanced on-page optimisation: internal linking strategies, image SEO with alt text, schema markup basics, and practical on-page implementation.',
        aiTools: ['Schema App', 'TinyPNG', 'Screaming Frog InLinks'],
        resources: [
          { title: 'Internal Linking Silo Architecture Model', url: '#', type: 'PDF' },
          { title: 'Image SEO & Compression SOP', url: '#', type: 'DOC' }
        ],
        quiz: {
          question: 'Why are descriptive anchor texts critical for internal linking?',
          options: [
            'They pass explicit contextual relevance and link equity to the destination page for targeted keywords.',
            'They make links look like paid banner ads.',
            'They guarantee an instant #1 ranking on Google.',
            'They prevent the browser from caching CSS files.'
          ],
          correctIndex: 0,
          explanation: 'Descriptive anchor text provides both search engines and users clear contextual signals about target page topics.'
        }
      },
      {
        id: 'l-1-6',
        code: 'l-1-6',
        title: '1.6 Technical SEO, Core Web Vitals & Crawlability Audits',
        type: 'LIVE_SESSION',
        duration: '90 min',
        durationMinutes: 90,
        notes: 'Conduct comprehensive technical SEO audits using Screaming Frog. Diagnose canonical tags, robots.txt directives, XML sitemaps, 301/302 redirects, Core Web Vitals (LCP, INP, CLS), and JSON-LD schema markup.',
        aiTools: ['Screaming Frog SEO Spider', 'Google PageSpeed Insights', 'Google Search Console'],
        resources: [
          { title: 'Technical SEO Audit SOP & Diagnostic Sheet (100+ Checkpoints)', url: '#', type: 'TEMPLATE' },
          { title: 'Core Web Vitals Optimization Guide (LCP, INP, CLS)', url: '#', type: 'PDF' }
        ],
        quiz: {
          question: 'Which Core Web Vital measures visual loading performance and flags when the main content block has rendered?',
          options: [
            'Largest Contentful Paint (LCP)',
            'Interaction to Next Paint (INP)',
            'Cumulative Layout Shift (CLS)',
            'Time to First Byte (TTFB)'
          ],
          correctIndex: 0,
          explanation: 'LCP measures the time from when the user initiates loading to when the largest image or text block is rendered on screen. Target: under 2.5 seconds.'
        }
      },
      {
        id: 'l-1-7',
        code: 'l-1-7',
        title: '1.7 Off-Page SEO, Digital PR & Ethical Link Building',
        type: 'RECORDED_VIDEO',
        duration: '60 min',
        durationMinutes: 60,
        notes: 'Learn high-authority white-hat link acquisition strategies: Digital PR data studies, unlinked brand mention reclamation, competitor backlink gap analysis, and analyzing link equity distributions.',
        aiTools: ['Hunter.io', 'Buzzstream', 'Ahrefs Link Intersect'],
        resources: [
          { title: 'Cold Digital PR Outreach Email Templates (High Response Rate)', url: '#', type: 'TEMPLATE' },
          { title: 'Backlink Quality Evaluation Rubric', url: '#', type: 'PDF' }
        ],
        quiz: {
          question: 'What distinguishes a high-value editorial backlink from a low-quality web directory submission?',
          options: [
            'Topical relevance of the referring domain, high organic traffic, and natural in-content placement without commercial manipulation flags.',
            'The sheer quantity of outbound links present on the referring page.',
            'Whether the link was purchased on a forum signature.',
            'Directory submissions always carry more Domain Authority than tier-1 publications.'
          ],
          correctIndex: 0,
          explanation: 'Google Penguin and modern spam algorithms evaluate topical context, referring domain organic visibility, and editorial intent.'
        }
      },
      {
        id: 'l-1-8',
        code: 'l-1-8',
        title: '1.8 AI SEO, Answer Engine Optimisation (AEO) & GEO',
        type: 'LIVE_SESSION',
        duration: '90 min',
        durationMinutes: 90,
        notes: 'Master generative engine optimization for AI search engines like ChatGPT Search, Perplexity, and Google AI Overviews. Structure entity-based content and optimize for citation probability.',
        aiTools: ['Perplexity Pro', 'Google Gemini Advanced', 'ChatGPT with Search'],
        resources: [
          { title: 'AEO Entity Optimization Framework', url: '#', type: 'PDF' },
          { title: 'Citation Density & LLM Extraction Blueprint', url: '#', type: 'TEMPLATE' }
        ],
        quiz: {
          question: 'How do AI Search Engines (Perplexity, ChatGPT Search, Google AI Overviews) select sources for citations?',
          options: [
            'They evaluate semantic fact clarity, entity authority, topical consensus, and direct answers to user queries.',
            'They strictly choose the page with the highest number of keyword repetitions.',
            'They only cite paid Wikipedia contributors.',
            'They randomly rotate through all indexable URLs.'
          ],
          correctIndex: 0,
          explanation: 'LLM retrieval mechanisms rank citations based on information gain, conciseness, structured factual density, and source trustworthiness.'
        }
      }
    ],
    assignment: {
      id: 'asg-mod-1',
      title: 'Module 1 Practical Deliverable: Comprehensive Technical SEO & Keyword Architecture Audit',
      instructions: 'Conduct an end-to-end SEO audit for a live commercial or staging website. Deliver an audit spreadsheet diagnosing technical crawlability, keyword intent mapping, on-page optimization, and an AEO readiness plan.',
      deliverables: [
        'Screaming Frog / Site Audit CSV Export highlighting HTTP status errors and canonical conflicts',
        'Topical Keyword Map (100+ keywords) grouped by search intent and target landing pages',
        'On-Page Optimization Checklist for 3 target URLs (Meta, H1, Schema, Internal Links)',
        'Executive SEO Strategy Summary with prioritised 90-day action items'
      ],
      maxScore: 100
    }
  };

  const mod2: ModuleItem = {
    id: 'mod-2',
    title: 'Module 2: Website Development & Hosting Architecture',
    description: 'Practical training on web hosting environments, Hostinger hPanel configuration, DNS record mapping, SSL certificate deployment, WordPress administration, and high-converting landing page creation.',
    orderIndex: 2,
    lessons: [
      {
        id: 'l-2-1',
        code: 'l-2-1',
        title: '2.1 Website and Hostinger Setup',
        type: 'RECORDED_VIDEO',
        duration: '60 min',
        durationMinutes: 60,
        videoUrl: 'https://drive.google.com/file/d/1irSf7agAAyNsTYY2IDV3QPSr1ZFwtNSN/preview',
        notes: 'Understand website hosting fundamentals, the Hostinger platform architecture, domain association, hPanel navigation, server location selection, and the end-to-end setup process.',
        aiTools: ['Hostinger AI Website Builder', 'Cloudflare CDN'],
        resources: [
          { title: 'Hostinger Quick Setup & hPanel Configuration Guide', url: '#', type: 'PDF' },
          { title: 'Web Hosting Benchmark & TTFB Comparison Checklist', url: '#', type: 'SHEET' }
        ],
        quiz: {
          question: 'What is the role of web hosting in the website deployment architecture?',
          options: [
            'Web hosting provides the server hardware, storage, and networking that serves website files to internet visitors.',
            'Web hosting only acts as the domain registrar.',
            'Web hosting is only needed when creating email campaigns.',
            'Web hosting converts JavaScript directly into Python code.'
          ],
          correctIndex: 0,
          explanation: 'A web host runs web servers (e.g. LiteSpeed, NGINX) that store site files and deliver them over HTTP/HTTPS when visitors request the domain.'
        }
      },
      {
        id: 'l-2-2',
        code: 'l-2-2',
        title: '2.2 Domain Registration, DNS Mapping & SSL Configuration',
        type: 'LIVE_SESSION',
        duration: '60 min',
        durationMinutes: 60,
        notes: 'Practical workshop on domain DNS mapping (A records, CNAME, TXT, MX), Nameserver pointing, Cloudflare CDN integration, and automated Let\'s Encrypt SSL certificate deployment.',
        aiTools: ['Cloudflare Dashboard', 'DNSChecker.org', 'SSL Labs'],
        resources: [
          { title: 'DNS Record Management & Troubleshooting SOP', url: '#', type: 'PDF' },
          { title: 'Cloudflare Free CDN & Security Baseline Configuration', url: '#', type: 'TEMPLATE' }
        ],
        quiz: {
          question: 'Which DNS record points a root domain (e.g. example.com) directly to a server\'s IPv4 address?',
          options: [
            'A Record',
            'CNAME Record',
            'MX Record',
            'TXT Record'
          ],
          correctIndex: 0,
          explanation: 'An "A" (Address) record maps a hostname to a 32-bit IPv4 address, directing internet traffic to the host server.'
        }
      },
      {
        id: 'l-2-3',
        code: 'l-2-3',
        title: '2.3 WordPress Installation & High-Converting Landing Page Design',
        type: 'PROJECT',
        duration: '90 min',
        durationMinutes: 90,
        notes: 'Deploy WordPress via Hostinger 1-click installer, configure SEO-friendly permalinks, install core performance and security plugins, and design a responsive lead generation landing page.',
        aiTools: ['Elementor AI', 'Astra Pro', 'WP Rocket'],
        resources: [
          { title: 'WordPress Essential Plugins & Security Hardening SOP', url: '#', type: 'PDF' },
          { title: 'High-Converting Landing Page Wireframe & Copy Template', url: '#', type: 'TEMPLATE' }
        ],
        quiz: {
          question: 'What is the recommended WordPress permalink structure for optimal SEO crawlability?',
          options: [
            'Post name (/%postname%/)',
            'Plain (/?p=123)',
            'Numeric (/archives/123)',
            'Day and name (/%year%/%monthnum%/%day%/%postname%/)'
          ],
          correctIndex: 0,
          explanation: 'The /%postname%/ structure produces clean, human-readable URLs that contain targeted keywords without unnecessary date or numeric bloat.'
        }
      }
    ],
    assignment: {
      id: 'asg-mod-2',
      title: 'Module 2 Practical Deliverable: Live Website & Landing Page Deployment on Hostinger',
      instructions: 'Deploy a live WordPress website on Hostinger with custom domain DNS, active SSL certificate, SEO permalinks, and a responsive lead-capture landing page.',
      deliverables: [
        'Live published website URL with verified active HTTPS/SSL certificate',
        'Screenshot of Hostinger hPanel DNS records (A record, CNAME, SSL status)',
        'Screenshot of WordPress dashboard showing SEO permalink structure and core plugins',
        'Lead capture form functional test submission confirmation'
      ],
      maxScore: 100
    }
  };

  // Modules 3 to 15: Map remaining 13 modules from ai-digital-marketing-course
  const remainingModules = baseAiModules.slice(1).map((m, idx) => {
    const newModOrder = idx + 3;
    return {
      ...m,
      id: `mod-${newModOrder}`,
      orderIndex: newModOrder,
      lessons: m.lessons.map((l, lIdx) => ({
        ...l,
        code: `l-${newModOrder}-${lIdx + 1}`
      })),
      assignment: {
        ...m.assignment,
        id: `asg-mod-${newModOrder}`
      }
    };
  });

  return [mod1, mod2, ...remainingModules];
}

RICH_CURRICULUM_DATA['aman-digital-marketing-course'] = buildAmanCurriculum();

/**
 * Universal helper that takes course slug and database modules/lessons,
 * and produces rich interactive ModuleItem[] for the universal learning player.
 */
export function getCurriculumForCourse(slug: string, dbCourse?: any): ModuleItem[] {
  const richData = RICH_CURRICULUM_DATA[slug];

  // If dbCourse is provided, build dynamic ModuleItem[] from database records merged with rich metadata
  if (dbCourse && Array.isArray(dbCourse.modules) && dbCourse.modules.length > 0) {
    return dbCourse.modules.map((m: any, mIdx: number) => {
      const modOrder = m.orderIndex || mIdx + 1;
      const richMod = richData?.[mIdx];

      const lessons: LessonItem[] = (m.lessons || []).map((l: any, lIdx: number) => {
        const lessonOrder = l.orderIndex || lIdx + 1;
        const code = `l-${modOrder}-${lessonOrder}`;
        const richLesson = richMod?.lessons?.[lIdx];

        return {
          id: l.id || richLesson?.id || code,
          code,
          title: l.title || richLesson?.title || `Lesson ${modOrder}.${lessonOrder}`,
          type: l.type || richLesson?.type || 'LIVE_SESSION',
          duration: l.duration || richLesson?.duration || `${l.durationMinutes || 60} min`,
          durationMinutes: l.durationMinutes || richLesson?.durationMinutes || 60,
          videoUrl: l.videoUrl || richLesson?.videoUrl,
          notes: richLesson?.notes || l.notes || `Master the core principles of ${l.title}. Learn concepts, architecture, and practical application.`,
          aiTools: richLesson?.aiTools || (Array.isArray(l.aiTools) && l.aiTools.length > 0 ? l.aiTools : ['Gemini Pro', 'ChatGPT Plus']),
          resources: richLesson?.resources || (Array.isArray(l.resources) && l.resources.length > 0 ? l.resources : [
            { title: `${l.title} Guide & Blueprint`, url: '#', type: 'PDF' },
            { title: 'Implementation Template & Checklist', url: '#', type: 'TEMPLATE' }
          ]),
          quiz: richLesson?.quiz || l.quiz || {
            question: `What is the primary objective of ${l.title}?`,
            options: [
              'Systematic execution, data-driven optimization, and verified mastery.',
              'Ad-hoc experimentation without baseline metrics or documentation.',
              'Manual execution without leveraging modern AI acceleration.',
              'Ignoring performance feedback and attribution loops.'
            ],
            correctIndex: 0,
            explanation: 'Modern digital workflows require data governance, systematic frameworks, and continuous optimization.'
          }
        };
      });

      return {
        id: m.id || `mod-${modOrder}`,
        title: m.title || richMod?.title || `Module ${modOrder}`,
        description: richMod?.description || m.description || `Module ${modOrder} curriculum and practical coursework.`,
        orderIndex: modOrder,
        lessons,
        assignment: richMod?.assignment || m.assignment || {
          id: `asg-${m.id || modOrder}`,
          title: `${m.title} Practical Deliverable`,
          instructions: `Complete the practical milestone for ${m.title}. Execute the lab tasks, verify results, and submit your deliverables.`,
          deliverables: [
            'Technical audit, implementation sheet or configuration export',
            'Performance report or campaign architecture document',
            'Summary presentation highlighting key optimization insights'
          ],
          maxScore: 100
        }
      };
    });
  }

  // Fallback: If no dbCourse but rich data exists, return rich curriculum with canonical codes
  if (richData && richData.length > 0) {
    return richData.map((m, mIdx) => ({
      ...m,
      lessons: m.lessons.map((l, lIdx) => ({
        ...l,
        code: l.code || `l-${mIdx + 1}-${lIdx + 1}`
      }))
    }));
  }

  return [];
}
