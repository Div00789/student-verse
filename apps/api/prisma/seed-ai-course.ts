import { PrismaClient, CourseLevel, CourseFormat, CoursePublishStatus, LessonContentType, BatchStatus } from '@prisma/client';

export async function seedAiDigitalMarketingCourse(prisma: PrismaClient) {
  console.log('Seeding AI Digital Marketing Course and all 14 Modules...');

  // 1. Course Record
  const course = await prisma.course.upsert({
    where: { slug: 'ai-digital-marketing-course' },
    update: {
      title: 'AI Digital Marketing Course',
      subtitle: 'Comprehensive 14-Module Professional Programme: SEO, PPC, GA4, Paid Media, Automation & Modern AI Tools',
      category: 'Digital Marketing / Artificial Intelligence / Career Development',
      level: CourseLevel.BEGINNER,
      format: CourseFormat.HYBRID,
      status: CoursePublishStatus.PUBLISHED,
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
      thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'
    },
    create: {
      slug: 'ai-digital-marketing-course',
      title: 'AI Digital Marketing Course',
      subtitle: 'Comprehensive 14-Module Professional Programme: SEO, PPC, GA4, Paid Media, Automation & Modern AI Tools',
      category: 'Digital Marketing / Artificial Intelligence / Career Development',
      level: CourseLevel.BEGINNER,
      format: CourseFormat.HYBRID,
      status: CoursePublishStatus.PUBLISHED,
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
      thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'
    }
  });

  // 2. Verified Flagship Batch
  const batch = await prisma.batch.upsert({
    where: { batchCode: 'SV-AIDM-COHORT1' },
    update: {
      title: 'AI Digital Marketing Master Cohort (Global Live + Hybrid)',
      startDate: new Date('2026-12-01T18:00:00Z'),
      endDate: '2027-02-15T20:00:00Z',
      scheduleTimezone: 'UTC',
      scheduleDescription: 'Mon & Wed: 18:00 - 20:00 UTC (Live Classes + 24/7 Practical Labs)',
      maxSeats: 35,
      status: BatchStatus.UPCOMING
    },
    create: {
      courseId: course.id,
      batchCode: 'SV-AIDM-COHORT1',
      title: 'AI Digital Marketing Master Cohort (Global Live + Hybrid)',
      startDate: new Date('2026-12-01T18:00:00Z'),
      endDate: new Date('2027-02-15T20:00:00Z'),
      scheduleTimezone: 'UTC',
      scheduleDescription: 'Mon & Wed: 18:00 - 20:00 UTC (Live Classes + 24/7 Practical Labs)',
      maxSeats: 35,
      status: BatchStatus.UPCOMING
    }
  });

  // 3. Live Classes
  const liveClassesData = [
    {
      title: 'Live Masterclass: AI SEO, Entity Graph & Answer Engine Optimisation (AEO)',
      description: 'Live interactive session on reverse-engineering LLM search citations, Core Web Vitals, and JSON-LD schema architectures.',
      scheduledStart: new Date('2026-12-01T18:00:00Z'),
      scheduledEnd: new Date('2026-12-01T20:00:00Z'),
      meetingLink: 'https://meet.google.com/stv-aidm-live1'
    },
    {
      title: 'Live Workshop: Google Ads Performance Max & AI Bidding Calibration',
      description: 'Hands-on live laboratory structuring Google Search and PMax campaigns, negative keyword taxonomies, and tCPA bidding simulators.',
      scheduledStart: new Date('2026-12-03T18:00:00Z'),
      scheduledEnd: new Date('2026-12-03T20:00:00Z'),
      meetingLink: 'https://meet.google.com/stv-aidm-live2'
    },
    {
      title: 'Live Lab: Google Analytics 4, Tag Manager DataLayers & Looker Studio BI',
      description: 'Live implementation of custom GA4 conversion events, UTM governance, cross-domain tracking, and executive client dashboards.',
      scheduledStart: new Date('2026-12-08T18:00:00Z'),
      scheduledEnd: new Date('2026-12-08T20:00:00Z'),
      meetingLink: 'https://meet.google.com/stv-aidm-live3'
    },
    {
      title: 'Live Studio: Marketing Automation, CRM Pipelines & AI Agent Workflows',
      description: 'Building multi-step autonomous workflows with HubSpot, GoHighLevel, Zapier, Make, and n8n AI sales assistants.',
      scheduledStart: new Date('2026-12-10T18:00:00Z'),
      scheduledEnd: new Date('2026-12-10T20:00:00Z'),
      meetingLink: 'https://meet.google.com/stv-aidm-live4'
    }
  ];

  for (const lc of liveClassesData) {
    const existing = await prisma.liveClass.findFirst({
      where: { batchId: batch.id, title: lc.title }
    });
    if (!existing) {
      await prisma.liveClass.create({
        data: {
          batchId: batch.id,
          title: lc.title,
          description: lc.description,
          scheduledStart: lc.scheduledStart,
          scheduledEnd: lc.scheduledEnd,
          meetingLink: lc.meetingLink,
          timezone: 'UTC',
          isCompleted: false
        }
      });
    }
  }

  // 4. Enroll Default Student Account
  const studentUser = await prisma.user.findUnique({
    where: { email: 'student@studentverse.com' }
  });

  if (studentUser) {
    await prisma.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: studentUser.id,
          courseId: course.id
        }
      },
      update: {
        progressPct: 0.0
      },
      create: {
        userId: studentUser.id,
        courseId: course.id,
        progressPct: 0.0,
        isCompleted: false
      }
    });

    await prisma.batchStudent.upsert({
      where: {
        batchId_userId: {
          batchId: batch.id,
          userId: studentUser.id
        }
      },
      update: {},
      create: {
        batchId: batch.id,
        userId: studentUser.id
      }
    });
    console.log('✓ Alex Morgan (student@studentverse.com) enrolled in AI Digital Marketing Course.');
  }

  // 5. All 14 Modules & Lessons
  const modulesDefinition = [
    {
      orderIndex: 1,
      title: 'Module 1 — Search Engine Optimisation (SEO)',
      description: 'Foundations of crawling, indexing, keyword research, on-page SEO, technical audits, Core Web Vitals, link building, modern SEO tools, and AI/AEO/GEO optimization.',
      lessons: [
        {
          orderIndex: 1,
          title: '1.1 Search Foundations, Indexation & Keyword Intelligence',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: true,
          // videoUrl: pending upload
          notes: 'Covering topics 1-12: Introduction to SEO, How search engines work, Crawling, Indexing, Retrieving and information retrieval, Ranking fundamentals, Keyword research, Short-tail and long-tail keywords, Keyword difficulty, Keyword intent and search intent, Competitive analysis, and How to check keyword rankings.',
          aiToolsUsed: ['Ahrefs AI', 'Semrush Keyword Magic', 'ChatGPT Search Intent Classifier']
        },
        {
          orderIndex: 2,
          title: '1.2 On-Page SEO, Header Hierarchy & Semantic Content Architecture',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 75,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 13-27: Meta titles & recommended lengths, Meta descriptions, Header tags H1-H6, Image alt tags, Keyword density, Keyword proximity, Keyword consistency, Content depth, Content quality & plagiarism detection, Internal linking, Inbound links, Outbound links, Semantic SEO, and Content optimisation.',
          aiToolsUsed: ['Surfer SEO', 'Clearscope', 'Hemingway AI']
        },
        {
          orderIndex: 3,
          title: '1.3 Technical SEO, Core Web Vitals & Crawlability Audits',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 28-43: Website audit, Page loading speed, Core Web Vitals (LCP, INP, CLS), Gzip compression, XML sitemaps, HTML sitemaps, Robots.txt, Canonical tags, Mobile-first optimisation, URL structure, Redirects, Broken links, Structured data, Google rich results & snippets, Data highlighting & historical Google tools, and JavaScript SEO fundamentals.',
          aiToolsUsed: ['Screaming Frog SEO Spider', 'Google Search Console', 'PageSpeed Insights']
        },
        {
          orderIndex: 4,
          title: '1.4 Off-Page SEO, Digital PR & Ethical Link Building',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 60,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 44-51: Backlink generation, Effective vs ineffective backlink practices, Domain Authority (DA), Page Authority (PA), Digital PR, Brand mentions, Link quality analysis, and Ethical link building.',
          aiToolsUsed: ['Muck Rack', 'BuzzStream', 'Ahrefs Site Explorer']
        },
        {
          orderIndex: 5,
          title: '1.5 Industry SEO Toolstack Mastery & Analytics Setup',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 60,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 52-60: Google Search Console setup, Google Analytics setup, Google Tag / Global Site Tag (gtag.js), Google Keyword Planner, Google Trends, Screaming Frog, Ahrefs, Semrush, and PageSpeed Insights.',
          aiToolsUsed: ['Google Search Console', 'Google Trends', 'Semrush']
        },
        {
          orderIndex: 6,
          title: '1.6 AI SEO, Answer Engine Optimisation (AEO) & GEO',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 61-72: Answer Engine Optimisation (AEO), Generative Engine Optimisation (GEO), SEO for AI-powered search experiences, LLMs and text generation, AI-assisted keyword research, AI-generated content review & editing, AI content briefs, Entity-based optimisation, AI search visibility monitoring, Brand mentions and AI citations, AI content accuracy & fact-checking, and AI-assisted competitor analysis.',
          aiToolsUsed: ['Perplexity Pro', 'Claude 3.5 Sonnet', 'Schema Markup Generator AI']
        }
      ],
      assignment: {
        slug: 'assignment-seo-audit',
        title: 'Module 1 Practical Assignment: Comprehensive Technical SEO & Keyword Audit',
        description: 'Perform a complete SEO audit for a real website, conduct keyword research, create an optimisation plan, and submit a report with screenshots and recommendations.',
        instructions: 'Select an approved target website. Run a full crawl audit (identifying indexation, Core Web Vitals, and broken link bottlenecks). Extract 20 target keywords mapped by search intent. Construct an actionable AEO and schema optimization roadmap. Submit your findings in a professional client-ready report.',
        deliverables: [
          'Full technical site crawl audit summary with critical error triage',
          'Keyword research matrix (search volume, intent, difficulty, target URL)',
          'On-page title/meta/header recommendations for 5 key URLs',
          'AEO & entity optimization proposal for AI answer engines'
        ],
        difficulty: 'INTERMEDIATE',
        maxScore: 100
      }
    },
    {
      orderIndex: 2,
      title: 'Module 2 — Pay-Per-Click Advertising (Google Ads)',
      description: 'PPC advertising fundamentals, Search ads, Display, Shopping, Performance Max, smart bidding strategies, conversion tracking, and AI ad copywriting.',
      lessons: [
        {
          orderIndex: 1,
          title: '2.1 Google Ads Architecture & Campaign Types',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 1-17: Introduction to PPC, Account setup, Search ads, Display ads, App promotion ads, YouTube ads, Shopping ads, Performance Max, Demand Gen, Campaigns, Ad groups, Ads, Keywords, Short/long-tail keywords, Match types, and Negative keywords.',
          aiToolsUsed: ['Google Ads Keyword Planner', 'PMax Asset Generator AI']
        },
        {
          orderIndex: 2,
          title: '2.2 Bidding Strategies, Performance Metrics & ROAS Optimization',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 75,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 18-34: Quality Score, CPC, CPM, CTR & calculation ((Clicks / Impressions) × 100), Conversion rate, CPL, CPA, ROAS, ROI, Bid Simulator, Manual bidding, Automated bidding, Smart Bidding (tCPA/tROAS), Historical accelerated delivery & current practices, Historical manual delivery terminology, and Bidding strategy selection.',
          aiToolsUsed: ['Google Smart Bidding', 'Bid Simulator AI']
        },
        {
          orderIndex: 3,
          title: '2.3 Campaign Management, Conversion Tracking & Landing Page CRO',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 35-49: Campaign setup, Budget planning, Creative specifications, Google Display Network, Remarketing, Audience targeting, Conversion goals, Conversion tracking, Google Tag Manager, Ad Preview & Diagnosis Tool, Search terms analysis, Campaign optimisation, Landing page optimisation, A/B testing, and Google Ads policies.',
          aiToolsUsed: ['Google Tag Manager', 'Unbounce AI', 'Google Ads Editor']
        },
        {
          orderIndex: 4,
          title: '2.4 AI for Google Ads: Keyword Clustering & Performance Automation',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 60,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 50-56: AI-powered keyword clustering, AI-assisted ad copywriting, AI campaign research, AI-driven performance analysis, Automated reporting, Conversion quality analysis, and AI-assisted budget & campaign planning.',
          aiToolsUsed: ['ChatGPT Plus Ad Copywriter', 'Optmyzr AI', 'AdCreative.ai']
        }
      ],
      assignment: {
        slug: 'assignment-google-ads',
        title: 'Module 2 Practical Assignment: Complete Google Search & PMax Campaign Structure',
        description: 'Build a complete Google Search campaign structure, including keyword research, ad groups, responsive search ads, negative keywords, budgets, conversion tracking plan, and an optimisation checklist.',
        instructions: 'Structure a live or simulated Google Ads account for a B2B or D2C business. Create 3 themed ad groups with tight keyword match types. Write 3 responsive search ads with dynamic keyword insertion. Configure a negative keyword list and set up conversion tracking specifications.',
        deliverables: [
          'Full campaign spreadsheet or editor file showing ad groups & keywords',
          'Responsive Search Ads (RSAs) with 15 headlines and 4 descriptions each',
          'Negative keyword taxonomy preventing wasted budget spend',
          'Conversion tracking architecture and weekly optimization checklist'
        ],
        difficulty: 'INTERMEDIATE',
        maxScore: 100
      }
    },
    {
      orderIndex: 3,
      title: 'Module 3 — Google Analytics 4 (GA4)',
      description: 'Analytics fundamentals, GA4 account setup, event tracking, custom events, UTM parameters, Looker Studio dashboards, and AI predictive analytics.',
      lessons: [
        {
          orderIndex: 1,
          title: '3.1 GA4 Architecture, Tag Installation & Metric Fundamentals',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 1-17: What is Google Analytics, GA4 overview, Account & property setup, Installation, Google Tag / gtag.js, Google Tag Manager integration, Traffic analysis, Users, Active users, Visitors, New/returning visitors, Bounce rate, Engagement rate, Sessions, Session duration, Average engagement time, and Real-time users.',
          aiToolsUsed: ['Google Tag Assistant', 'GA4 Measurement Protocol']
        },
        {
          orderIndex: 2,
          title: '3.2 Traffic Acquisition, UTM Governance & Attribution Modeling',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 60,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 18-26: Direct traffic, Organic search traffic, Referral traffic, Social traffic, Paid traffic, Campaign tracking, UTM parameters, Source and medium, and Default channel groups.',
          aiToolsUsed: ['Campaign URL Builder', 'UTM Governance Spreadsheet AI']
        },
        {
          orderIndex: 3,
          title: '3.3 Conversions, Key Events & Executive Looker Studio Dashboards',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 27-40: Goals and GA4 key events, Historical Smart Goals & current alternatives, Event tracking, Custom events, Key event configuration, Form submission tracking, Button click tracking, IP exclusion, Conversion funnels, Exploration reports, Looker Studio dashboards, Google Ads integration, Consent & privacy fundamentals, and Data retention limitations.',
          aiToolsUsed: ['Looker Studio BI', 'GA4 Exploration Reports']
        },
        {
          orderIndex: 4,
          title: '3.4 AI Analytics, Automated Insights & Anomaly Detection',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 60,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 41-45: AI-assisted analytics interpretation, Anomaly detection, Automated performance summaries, AI-generated marketing insights, and Predictive analytics fundamentals.',
          aiToolsUsed: ['GA4 Machine Learning Insights', 'Gemini Data Analysis']
        }
      ],
      assignment: {
        slug: 'assignment-ga4-dashboard',
        title: 'Module 3 Practical Assignment: Production GA4 & Looker Studio Measurement Setup',
        description: 'Configure a GA4 demo or authorised website property, create events, analyse traffic, and build a performance dashboard.',
        instructions: 'Audit or configure a GA4 property. Set up 3 custom event tags via Google Tag Manager (e.g. form submission, lead download, button click). Mark key events. Connect data into Looker Studio and build an executive marketing acquisition report.',
        deliverables: [
          'GTM container export or screenshot verification of triggers & tags',
          'GA4 custom event and key event configuration table',
          'Channel traffic analysis identifying top conversion source and medium',
          'Published interactive Looker Studio dashboard link'
        ],
        difficulty: 'INTERMEDIATE',
        maxScore: 100
      }
    },
    {
      orderIndex: 4,
      title: 'Module 4 — Social Media Marketing (Paid Advertising)',
      description: 'Facebook Ads, Instagram Ads, LinkedIn Ads, X, YouTube, Pinterest, custom audiences, lookalikes, creative testing, and AI-assisted campaigns.',
      lessons: [
        {
          orderIndex: 1,
          title: '4.1 Paid Social Media Architecture & Audience Targeting',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 1-14: Paid social media overview, Facebook Ads, Instagram Ads, LinkedIn Ads, X Ads, YouTube Ads, Pinterest Ads, Campaign setup, Objectives, Campaign structure, Audience targeting, Custom audiences, Lookalike audiences, and Retargeting.',
          aiToolsUsed: ['Meta Ads Manager', 'LinkedIn Campaign Manager AI']
        },
        {
          orderIndex: 2,
          title: '4.2 Creative Diversification, Ad Copywriting & Conversion APIs',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 75,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 15-23: Ad creatives, Ad copywriting, Campaign bidding, Campaign optimisation, Budget optimisation, Conversion tracking, Ad platform guidelines, Advertising policies, and Industry case studies.',
          aiToolsUsed: ['Meta Conversion API (CAPI)', 'Canva Pro Magic Studio']
        },
        {
          orderIndex: 3,
          title: '4.3 AI-Generated Creative Testing & Lead Gen Campaign Optimization',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 24-28: AI-generated creative concepts, AI-powered audience research, AI-assisted campaign analysis, AI-based creative testing, and Lead generation campaign optimisation.',
          aiToolsUsed: ['Midjourney v6', 'AdCreative.ai', 'Copy.ai']
        }
      ],
      assignment: {
        slug: 'assignment-meta-linkedin-ads',
        title: 'Module 4 Practical Assignment: Meta & LinkedIn Paid Advertising Strategy',
        description: 'Develop a Meta Ads campaign and a LinkedIn Ads campaign with targeting, budget, creatives, copy, and measurable conversion goals.',
        instructions: 'Design two paid media campaigns: one Meta Ads campaign focused on broad/lookalike acquisition, and one LinkedIn Ads campaign targeting high-value B2B decision makers. Include copy variations, creative briefs, budget pacing, and tracking requirements.',
        deliverables: [
          'Meta Ads campaign architecture (campaign, ad set, dynamic creative testing specs)',
          'LinkedIn Ads B2B targeting breakdown (job titles, industries, company sizes)',
          '5 ad copy variations testing emotional vs rational vs authority angles',
          'Conversion tracking and CPA/ROAS milestone targets'
        ],
        difficulty: 'INTERMEDIATE',
        maxScore: 100
      }
    },
    {
      orderIndex: 5,
      title: 'Module 5 — Social Media Optimisation (SMO)',
      description: 'Target audiences, customer personas, 30-day content calendars, organic social growth, ORM, community engagement, and AI video/caption automation.',
      lessons: [
        {
          orderIndex: 1,
          title: '5.1 Audience Personas, Editorial Planning & Organic Distribution',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 60,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 1-10: Introduction to SMO, Understanding target audiences, Customer personas, B2B and B2C promotion portals, Developing content plans, Social media content calendar, Platform-specific strategies, Organic social growth, User sentiment analysis, and Online Reputation Management (ORM).',
          aiToolsUsed: ['MakeMyPersona AI', 'SparkToro Audience Intelligence']
        },
        {
          orderIndex: 2,
          title: '5.2 Community Management, Social Listening & Process Automation',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 60,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 11-17: Hashtag marketing, Social engagement strategies, Community management, Social listening, Social media analytics, Automating social media processes, and Social media scheduling.',
          aiToolsUsed: ['Buffer', 'Hootsuite AI', 'Brand24 Social Listening']
        },
        {
          orderIndex: 3,
          title: '5.3 AI Content Ideas, AI Video & Sentiment Analysis Workflows',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 18-24: AI content ideas, AI caption generation, AI-assisted graphics, AI video creation, AI-powered social media calendar creation, Automated content approval workflows, and AI-powered sentiment analysis.',
          aiToolsUsed: ['Claude 3.5 Sonnet', 'InVideo AI', 'CapCut AI']
        }
      ],
      assignment: {
        slug: 'assignment-smo-calendar',
        title: 'Module 5 Practical Assignment: 30-Day AI-Powered Content Calendar & Playbook',
        description: 'Create a 30-day social media content calendar with captions, design briefs, video ideas, scheduling recommendations, and an automation workflow.',
        instructions: 'Develop an omnichannel organic social media calendar for a chosen brand covering LinkedIn, Instagram, and X. Produce 30 distinct post briefs with hooks, body text, hashtags, design direction, and automated scheduling workflows.',
        deliverables: [
          '30-day editorial calendar in spreadsheet or Notion template format',
          'Platform-specific formatting guidelines and posting time recommendations',
          '5 short-form video scripts designed for Reels/Shorts with AI visual briefs',
          'Automated approval and social posting workflow blueprint'
        ],
        difficulty: 'BEGINNER',
        maxScore: 100
      }
    },
    {
      orderIndex: 6,
      title: 'Module 6 — Email Marketing',
      description: 'Permission-based list building, SMTP servers, SPF/DKIM/DMARC authentication, deliverability, high-volume sending compliance, and AI nurture sequences.',
      lessons: [
        {
          orderIndex: 1,
          title: '6.1 Permission List Building, Interactive Design & Sequence Strategy',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 1-12: Introduction to email marketing, Permission-based email list building, Ethical data collection & web scraping, Email campaign setup, Interactive email design, Email keyword & audience research, Personalised mailing, Audience segmentation, Email automation, Welcome sequences, Promotional campaigns, and Nurture campaigns.',
          aiToolsUsed: ['Klaviyo AI', 'ActiveCampaign', 'BEE Pro Email Editor']
        },
        {
          orderIndex: 2,
          title: '6.2 Email Infrastructure, Authentication (SPF/DKIM/DMARC) & High-Volume Compliance',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 13-24: What is an email server, SMTP fundamentals, Email authentication, SPF, DKIM, DMARC, Deliverability, Bounce management, Unsubscribe management, Email warm-up principles, High-volume email infrastructure, and Sending up to 100,000 emails per day: consent, compliance (CAN-SPAM, GDPR), provider limits, infrastructure, and deliverability considerations.',
          aiToolsUsed: ['Mail-Tester', 'Postmark DMARC Monitor', 'Warmup Inbox AI']
        },
        {
          orderIndex: 3,
          title: '6.3 Email Metrics, Attribution & AI Copywriting Workflows',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 75,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 25-40: Campaign reporting, Open rate, Click rate, Subscription rate, Unsubscribe rate, Click-to-open rate, Email conversion rate, Email revenue attribution, A/B testing, Privacy-related limitations of open tracking (Apple MPP), AI email copywriting, AI subject lines, AI personalisation, AI segmentation, AI-powered email workflows, and AI-assisted email analysis.',
          aiToolsUsed: ['ChatGPT Email Prompt Chains', 'SubjectLine.com AI']
        }
      ],
      assignment: {
        slug: 'assignment-email-nurture',
        title: 'Module 6 Practical Assignment: 5-Part Automated Nurture Sequence with Deliverability Specs',
        description: 'Design and configure a permission-based five-email nurture sequence with segmentation, personalisation, and reporting.',
        instructions: 'Architect an automated 5-part email nurture sequence for newly acquired leads. Write full copy including subject lines, preview text, body content, and call-to-action buttons. Document required DNS authentication records (SPF, DKIM, DMARC) for flawless inbox deliverability.',
        deliverables: [
          '5-email copy package (Welcome, Educational, Case Study, Objection Buster, Offer)',
          'Dynamic personalisation tokens and audience segmentation logic',
          'Complete SPF, DKIM, and DMARC DNS configuration checklist',
          'KPI dashboard projection (open rate, CTR, unsubscribe threshold)'
        ],
        difficulty: 'INTERMEDIATE',
        maxScore: 100
      }
    },
    {
      orderIndex: 7,
      title: 'Module 7 — Black Hat SEO and Search Engine Guidelines',
      description: 'Educational risk-awareness module: identifying cloaking, content spinning, doorway pages, manual actions, algorithmic penalties, and ethical recovery.',
      lessons: [
        {
          orderIndex: 1,
          title: '7.1 Deceptive SEO Tactics, Spam Policies & Algorithmic Filters',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 60,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 1-10: Introduction to Black Hat SEO, Cloaking, Article spinning, Abusive content automation, Keyword stuffing, Link wheels, Cloaked links, Doorway pages, Link spam, and Search engine spam policies.',
          aiToolsUsed: ['Originality.ai Plagiarism Checker', 'Google Spam Policies Guide']
        },
        {
          orderIndex: 2,
          title: '7.2 Penalty Remediation, Recovery Protocols & Ethical Alternatives',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 60,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 11-16: Manual actions, Algorithmic ranking issues, How to identify suspicious SEO practices, Ethical SEO alternatives, AI-generated spam risks, and SEO recovery and remediation.',
          aiToolsUsed: ['Google Search Console Disavow Tool', 'Spam Score Analyzer']
        }
      ],
      assignment: {
        slug: 'assignment-blackhat-audit',
        title: 'Module 7 Practical Assignment: SEO Risk Audit & Ethical Remediation Plan',
        description: 'Review an example website audit and identify risky SEO practices, explain their consequences, and recommend compliant alternatives.',
        instructions: 'Analyze a simulated website affected by sudden organic visibility drop. Identify manipulative practices (e.g. cloaked links, doorway pages, uncurated AI spam). Prepare a disavow file, remediation roadmap, and compliant white-hat optimization alternative.',
        deliverables: [
          'Risk triage table mapping observed infractions to Google Spam Policies',
          'Penalty recovery action plan (content clean-up, link pruning, reconsideration request)',
          'Ethical white-hat content alternative plan driving sustainable organic search growth'
        ],
        difficulty: 'INTERMEDIATE',
        maxScore: 100
      }
    },
    {
      orderIndex: 8,
      title: 'Module 8 — Affiliate Marketing',
      description: 'Affiliate networks, niche selection, comparison content, commission models, disclosure rules, Google AdSense vs affiliate, and AI content development.',
      lessons: [
        {
          orderIndex: 1,
          title: '8.1 Affiliate Architecture, Networks, Niche Selection & Disclosures',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 60,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 1-13: What is affiliate marketing, How affiliate marketing works, Earning money, Affiliate networks (ShareASale, CJ, Impact, Amazon Associates), Programme selection, Choosing a niche, Affiliate keyword research, Landing pages, Product comparison content, Tracking links, Conversion tracking, Commission models, and Advertising disclosure requirements (FTC guidelines).',
          aiToolsUsed: ['Impact.com Marketplace', 'Affilimate Analytics']
        },
        {
          orderIndex: 2,
          title: '8.2 Google AdSense Integration & AI-Powered Affiliate Strategy',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 60,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 14-20: Introduction to Google AdSense, Creating an AdSense account, Activating an AdSense account, AdSense versus affiliate marketing, AI-assisted affiliate content research, AI-powered affiliate content development, and Affiliate marketing analytics.',
          aiToolsUsed: ['Google AdSense Console', 'Claude Affiliate Researcher']
        }
      ],
      assignment: {
        slug: 'assignment-affiliate-strategy',
        title: 'Module 8 Practical Assignment: High-Intent Affiliate Strategy & Revenue Model',
        description: 'Build an affiliate marketing strategy for a selected niche with a content plan, disclosure examples, and revenue projection.',
        instructions: 'Select a profitable vertical (SaaS, FinTech, E-Commerce). Select 3 top affiliate programmes. Design a comparison landing page layout with compliant FTC disclosures. Outline 10 high-intent search keywords and build a 6-month revenue projection model.',
        deliverables: [
          'Niche analysis matrix with affiliate programme commission tiers',
          'High-intent product comparison article wireframe with disclosure placement',
          'Keyword research table targeting "best", "review", and "vs" keywords',
          '6-month traffic to commission revenue financial projection'
        ],
        difficulty: 'BEGINNER',
        maxScore: 100
      }
    },
    {
      orderIndex: 9,
      title: 'Module 9 — Content Marketing',
      description: 'Content strategy, blog writing, topic clusters, pillar pages, Quora & third-party distribution, storytelling, and AEO/GEO content optimization.',
      lessons: [
        {
          orderIndex: 1,
          title: '9.1 Content Strategy, Topic Clusters & Multi-Platform Distribution',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 1-15: Introduction to content marketing, Content strategy, Blog writing, Content calendars, Publishing on third-party sites (Medium, Substack), Distribution through Quora, Distribution on industry platforms, Audience research, Search intent mapping, Topic clusters, Pillar pages, SEO content writing, Storytelling and brand voice, Content repurposing, and Content performance measurement.',
          aiToolsUsed: ['MarketMuse Topic Modeler', 'Notion Editorial Workspace']
        },
        {
          orderIndex: 2,
          title: '9.2 Generative AI Content Pipelines, Editorial Fact-Checking & AEO Optimization',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 16-22: AI-powered content research, AI blog outlining, AI-assisted content drafting, AI fact-checking & editorial review, AI-assisted video scripts, AI content repurposing, and AEO & GEO content optimisation.',
          aiToolsUsed: ['Claude 3.5 Sonnet', 'Perplexity Pro Fact Checker', 'ChatGPT Voice']
        }
      ],
      assignment: {
        slug: 'assignment-content-campaign',
        title: 'Module 9 Practical Assignment: Pillar-Cluster Content Campaign & Distribution Engine',
        description: 'Create a complete content marketing campaign with a blog article, SEO metadata, social posts, a distribution strategy, and a reporting plan.',
        instructions: 'Create an authoritative 1,500-word cornerstone article on a designated digital marketing topic. Create a topic cluster with 4 supporting subtopics. Repurpose the core piece into 3 LinkedIn posts, 1 Twitter/X thread, and a Quora thought leadership answer.',
        deliverables: [
          'Full formatted cornerstone pillar article with SEO title, meta & header tags',
          'Topic cluster visual diagram connecting pillar and cluster URLs',
          'Repurposed multi-platform social asset package (LinkedIn, X, Quora)',
          'Content performance measurement scorecard (organic traffic, time on page, leads)'
        ],
        difficulty: 'INTERMEDIATE',
        maxScore: 100
      }
    },
    {
      orderIndex: 10,
      title: 'Module 10 — Freelancing and Client Acquisition',
      description: 'Starting a freelancing career, specialisation, Upwork, Freelancer, Guru, PPH, writing winning proposals, pricing models, SOW, and client retention.',
      lessons: [
        {
          orderIndex: 1,
          title: '10.1 Freelance Marketplaces, Niche Specialisation & Profile Architecture',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 1-12: How to start a digital marketing freelancing career, Choosing a specialisation, Building a professional portfolio, How to write a business proposal, Understanding client requirements, Project discovery calls, Using Upwork, Using Freelancer, Using Guru, Using PeoplePerHour (PPH), Creating a strong freelancer profile, and Writing personalised proposals.',
          aiToolsUsed: ['Upwork Profile Optimizer AI', 'Loom Video Outreach']
        },
        {
          orderIndex: 2,
          title: '10.2 Project Pricing, Scope of Work (SOW), Client Retention & AI Proposals',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 13-23: Project pricing, Hourly versus fixed-price contracts, Client communication, Scope of Work (SOW), Reporting deliverables, Project management, Client retention, AI-assisted proposal drafting, AI-assisted client research, AI-supported project delivery, and Professional ethics & platform compliance.',
          aiToolsUsed: ['PandaDoc Proposal Builder', 'Bonsai Freelance Suite AI']
        }
      ],
      assignment: {
        slug: 'assignment-freelance-portfolio',
        title: 'Module 10 Practical Assignment: Client Acquisition Proposal & Service Scope of Work',
        description: 'Develop a freelance profile, portfolio, service offering, proposal, client discovery questionnaire, and sample project plan.',
        instructions: 'Build your complete digital marketing freelance service offering. Create an optimized Upwork profile overview. Craft a customized proposal addressing an actual high-value client job brief. Draft a professional Scope of Work (SOW) agreement with pricing and milestones.',
        deliverables: [
          'Optimized Upwork/freelance profile overview and specialized service tiers',
          'Client discovery questionnaire (10 high-impact audit questions)',
          'Personalised client pitch proposal with case study proof points',
          'Formal Scope of Work (SOW) contract template including milestone terms'
        ],
        difficulty: 'INTERMEDIATE',
        maxScore: 100
      }
    },
    {
      orderIndex: 11,
      title: 'Module 11 — Artificial Intelligence Fundamentals for Marketers',
      description: 'Generative AI, Large Language Models (ChatGPT, Claude, Gemini), prompt engineering, prompt templates, hallucinations, brand voice, and responsible AI.',
      lessons: [
        {
          orderIndex: 1,
          title: '11.1 Generative AI Foundations, LLMs & Advanced Prompt Engineering',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 1-10: Introduction to AI, Generative AI, Machine Learning basics, Large Language Models, ChatGPT, Claude, Gemini, AI prompting fundamentals, Prompt engineering (Role, Context, Task, Constraints, Few-Shot), and Prompt templates.',
          aiToolsUsed: ['ChatGPT 4o', 'Claude 3.5 Sonnet', 'Google Gemini 1.5 Pro']
        },
        {
          orderIndex: 2,
          title: '11.2 AI Research, Brand Voice Architecture & Responsible AI Governance',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 75,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 11-16: AI research, AI-assisted marketing strategy, Hallucinations and fact-checking, Privacy and responsible AI usage, AI brand voice, and AI workflow design.',
          aiToolsUsed: ['Perplexity Pro', 'Anthropic Console Workbench']
        }
      ],
      assignment: {
        slug: 'assignment-ai-prompt-library',
        title: 'Module 11 Practical Assignment: Enterprise AI Marketing Prompt Library & Workflow Suite',
        description: 'Create a reusable AI marketing prompt library containing research, SEO, advertising, analytics, and content prompts.',
        instructions: 'Engineer a comprehensive library of 15 advanced prompt chains spanning market research, technical SEO schemas, ad copywriting, data analysis, and email sequences. Include input variables, constraints, few-shot examples, and expected output schemas.',
        deliverables: [
          '15 modular prompt templates structured with system prompt, role, and output format',
          'Prompt testing results comparing outputs across ChatGPT, Claude, and Gemini',
          'Brand voice style guide instructions for consistent AI persona generation',
          'AI governance & fact-checking verification checklist'
        ],
        difficulty: 'INTERMEDIATE',
        maxScore: 100
      }
    },
    {
      orderIndex: 12,
      title: 'Module 12 — AI Content Creation and Video Marketing',
      description: 'AI visual creative strategy, image generation, Canva AI, short-form video creation, AI avatars, YouTube SEO, Instagram Reels, and copyright licensing.',
      lessons: [
        {
          orderIndex: 1,
          title: '12.1 AI Visual Creative Strategy, Image Generation & Canva AI',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 1-5: AI creative strategy, AI image generation, AI image editing, Canva AI, and AI marketing graphics.',
          aiToolsUsed: ['Midjourney v6', 'Canva Magic Studio', 'Adobe Firefly']
        },
        {
          orderIndex: 2,
          title: '12.2 AI Video Generation, Avatars, Short-Form Storytelling & Platform Compliance',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 75,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 6-17: AI video generation, AI short-form video creation, AI voiceovers, AI video scripts, AI avatar videos, Video content planning, YouTube SEO, Instagram Reels strategy, Short-form video storytelling, Editing and repurposing, Copyright and licensed asset usage, and AI-generated content labelling and platform rules.',
          aiToolsUsed: ['HeyGen', 'ElevenLabs Voice AI', 'CapCut AI Editor', 'Runway Gen-3']
        }
      ],
      assignment: {
        slug: 'assignment-ai-video-package',
        title: 'Module 12 Practical Assignment: AI Multi-Format Creative & Video Asset Package',
        description: 'Produce a complete brand content package containing static creatives, short-form video concepts, scripts, and social captions.',
        instructions: 'Produce a comprehensive brand creative package for an upcoming campaign: generate 3 high-converting static ad visuals using AI tools, write 2 short-form video scripts with visual storyboard cues, and produce a finished AI-voiceover video reel.',
        deliverables: [
          '3 static advertising creatives with prompts and design briefs',
          '2 short-form video scripts formatted for 9:16 Instagram Reels / YouTube Shorts',
          '1 rendered 30-second video clip using AI voiceover and captions',
          'Platform compliance confirmation and AI content labelling declaration'
        ],
        difficulty: 'INTERMEDIATE',
        maxScore: 100
      }
    },
    {
      orderIndex: 13,
      title: 'Module 13 — Marketing Automation, CRM and AI Agents',
      description: 'HubSpot, GoHighLevel, Zapier, Make, n8n, webhooks, lead scoring, AI lead qualification, WhatsApp automation, and AI voice/sales agents.',
      lessons: [
        {
          orderIndex: 1,
          title: '13.1 CRM Architecture, Contact Lifecycles & Lead Pipeline Management',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 1-11: Introduction to CRM, Customer lifecycle management, Introduction to HubSpot, Introduction to GoHighLevel, Lead capture, Lead management, Contact segmentation, Email workflows, Automated follow-ups, Lead scoring, and Pipeline management.',
          aiToolsUsed: ['HubSpot CRM', 'GoHighLevel CRM Suite']
        },
        {
          orderIndex: 2,
          title: '13.2 Multi-Step Integration with Zapier, Make, n8n & Webhooks',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 12-15: Introduction to Zapier, Introduction to Make, Introduction to n8n, and Webhooks and APIs.',
          aiToolsUsed: ['Zapier Automations', 'Make.com Scenarios', 'n8n Workflow Builder']
        },
        {
          orderIndex: 3,
          title: '13.3 Autonomous AI Agents, Chatbots & WhatsApp Automation',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 75,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 16-24: AI lead qualification, AI chatbots, WhatsApp automation concepts, AI voice agents, AI sales assistants, Multi-step AI workflows, Human approval and quality checks, CRM reporting, and AI automation privacy and security.',
          aiToolsUsed: ['Chatbase AI', 'Retell AI Voice Agents', 'Twilio WhatsApp API']
        }
      ],
      assignment: {
        slug: 'assignment-crm-automation',
        title: 'Module 13 Practical Assignment: Multi-Step Lead Routing & AI CRM Qualification Workflow',
        description: 'Build an automation that captures an authorised test lead, records it in a CRM, qualifies it, and initiates a personalised follow-up.',
        instructions: 'Design and build an automated workflow connecting a website webhook/lead form to a CRM (HubSpot or GHL). Integrate an AI qualification step that parses the lead submission, assigns a score, and routes a personalized follow-up notification.',
        deliverables: [
          'Workflow blueprint or JSON export from Make/Zapier/n8n',
          'Lead scoring logic and AI evaluation prompt specifications',
          'Live test run log showing verified payload passing from webhook to CRM',
          'Security & privacy protocol documenting safe API credential management'
        ],
        difficulty: 'ADVANCED',
        maxScore: 100
      }
    },
    {
      orderIndex: 14,
      title: 'Module 14 — Digital Marketing Strategy, Reporting and Capstone Project',
      description: 'Full-funnel digital marketing strategy, channel selection, KPI forecasting, Looker dashboards, presentation skills, and the Final Capstone Project.',
      lessons: [
        {
          orderIndex: 1,
          title: '14.1 Full-Funnel Strategic Architecture, Budgets & Customer Journey Mapping',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Covering topics 1-8: Creating a complete digital marketing strategy, Market and competitor research, Defining business objectives, Selecting marketing channels, Building a campaign budget, Creating marketing funnels, Customer journey mapping, and KPI selection.',
          aiToolsUsed: ['Miro Strategy Canvas', 'Budget Allocation Modeler AI']
        },
        {
          orderIndex: 2,
          title: '14.2 Conversion Rate Optimisation (CRO), Attribution & Executive Reporting',
          contentType: LessonContentType.RECORDED_VIDEO,
          durationMinutes: 75,
          isFreePreview: false,
          // videoUrl: pending upload
          notes: 'Covering topics 9-16: Lead generation strategy, Conversion Rate Optimisation (CRO), Marketing dashboards, Reporting and attribution, AI-powered reporting summaries, Campaign testing, Marketing performance forecasting, and Final presentation techniques.',
          aiToolsUsed: ['Looker Studio Executive BI', 'Forecasting Matrix AI']
        },
        {
          orderIndex: 3,
          title: '14.3 Capstone Project Submission & Evaluator Defence Briefing',
          contentType: LessonContentType.LIVE_SESSION,
          durationMinutes: 90,
          isFreePreview: false,
          notes: 'Comprehensive briefing for the final project submission. Covers rubric guidelines, required assets, presentation video guidelines, and industry evaluator defense.',
          aiToolsUsed: ['StudentVerse Evaluator Rubric', 'Slide Presentation AI']
        }
      ],
      assignment: {
        slug: 'assignment-final-capstone',
        title: 'Module 14 Final Capstone Project: Comprehensive AI-Powered Digital Marketing Strategy',
        description: 'Each student must produce a complete AI-powered digital marketing strategy for a real or simulated business.',
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
        difficulty: 'ADVANCED',
        maxScore: 100
      }
    }
  ];

  // 6. Iterate and Upsert Modules, Lessons & Assignments
  for (const mod of modulesDefinition) {
    // Upsert Module
    const existingMod = await prisma.courseModule.findFirst({
      where: { courseId: course.id, orderIndex: mod.orderIndex }
    });

    const moduleRecord = existingMod
      ? await prisma.courseModule.update({
          where: { id: existingMod.id },
          data: {
            title: mod.title,
            description: mod.description,
            orderIndex: mod.orderIndex
          }
        })
      : await prisma.courseModule.create({
          data: {
            courseId: course.id,
            title: mod.title,
            description: mod.description,
            orderIndex: mod.orderIndex
          }
        });

    // Upsert Lessons for Module
    for (const l of mod.lessons) {
      const existingLesson = await prisma.lesson.findFirst({
        where: { moduleId: moduleRecord.id, orderIndex: l.orderIndex }
      });

      const lessonRecord = existingLesson
        ? await prisma.lesson.update({
            where: { id: existingLesson.id },
            data: {
              title: l.title,
              contentType: l.contentType,
              durationMinutes: l.durationMinutes,
              isFreePreview: l.isFreePreview,
              videoUrl: (l as any).videoUrl || null,
              notes: l.notes,
              aiToolsUsed: l.aiToolsUsed
            }
          })
        : await prisma.lesson.create({
            data: {
              moduleId: moduleRecord.id,
              title: l.title,
              orderIndex: l.orderIndex,
              contentType: l.contentType,
              durationMinutes: l.durationMinutes,
              isFreePreview: l.isFreePreview,
              videoUrl: (l as any).videoUrl || null,
              notes: l.notes,
              aiToolsUsed: l.aiToolsUsed
            }
          });

      // Add resource to lesson
      const existingResource = await prisma.lessonResource.findFirst({
        where: { lessonId: lessonRecord.id }
      });
      if (!existingResource) {
        await prisma.lessonResource.create({
          data: {
            lessonId: lessonRecord.id,
            title: `${l.title} — Resource Guide & Prompt Sheet`,
            url: `https://docs.studentverse.com/resources/mod${mod.orderIndex}-l${l.orderIndex}.pdf`,
            resourceType: 'PDF'
          }
        });
      }

      // Add knowledge-check quiz to lesson
      const existingQuiz = await prisma.quiz.findFirst({
        where: { lessonId: lessonRecord.id }
      });
      if (!existingQuiz) {
        const quiz = await prisma.quiz.create({
          data: {
            lessonId: lessonRecord.id,
            courseId: course.id,
            title: `Knowledge Check: ${l.title}`,
            description: `Verify your understanding of key concepts taught in ${l.title}.`,
            passingScorePct: 70.0
          }
        });

        await prisma.quizQuestion.create({
          data: {
            quizId: quiz.id,
            question: `What is the primary practical goal of ${l.title}?`,
            options: [
              'Execute industry best practices using verified frameworks and modern AI tools',
              'Rely solely on manual spreadsheets without automation',
              'Memorise obsolete marketing theory without live execution',
              'Avoid conversion tracking or audience measurement'
            ],
            correctOptionIndex: 0,
            explanation: 'StudentVerse emphasizes practical, hands-on digital marketing combined with verified AI workflows.'
          }
        });
      }
    }

    // Upsert Module Practical Assignment
    await prisma.assignment.upsert({
      where: { slug: mod.assignment.slug },
      update: {
        title: mod.assignment.title,
        description: mod.assignment.description,
        instructions: mod.assignment.instructions,
        deliverables: mod.assignment.deliverables,
        difficulty: mod.assignment.difficulty,
        maxScore: mod.assignment.maxScore,
        courseId: course.id
      },
      create: {
        slug: mod.assignment.slug,
        title: mod.assignment.title,
        description: mod.assignment.description,
        instructions: mod.assignment.instructions,
        deliverables: mod.assignment.deliverables,
        difficulty: mod.assignment.difficulty,
        maxScore: mod.assignment.maxScore,
        courseId: course.id
      }
    });

    console.log(`  ✓ ${mod.title} seeded (${mod.lessons.length} lessons + assignment).`);
  }

  console.log('✓ Successfully seeded all 14 modules, lessons, quizzes, and practical assignments for AI Digital Marketing Course!');
}
