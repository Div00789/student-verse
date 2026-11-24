import { PrismaClient, Role, CourseLevel, CourseFormat, CoursePublishStatus, WorkplaceType, EmployerVerificationStatus, TalentVisibility } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { seedAiDigitalMarketingCourse } from './seed-ai-course';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Supabase PostgreSQL database for StudentVerse...');

  // 1. Placement Partners
  const partners = [
    {
      name: 'Apex Growth Labs',
      slug: 'apex-growth',
      industry: 'Digital Performance & Growth Advisory',
      website: 'https://apexgrowth.example.com',
      location: 'London & Global Remote',
      description: 'Premier growth consultancy partnering with high-velocity SaaS and D2C brands. Actively hiring certified StudentVerse talent for acquisition and media buying tracks.',
      isVerified: true,
      activeHiringTracks: ['Performance Marketing', 'Paid Media (Meta/Google)', 'CRO Funnels']
    },
    {
      name: 'Nexis Digital Global',
      slug: 'nexis-digital',
      industry: 'Enterprise SEO & Search Operations',
      website: 'https://nexisdigital.example.com',
      location: 'Berlin & Singapore',
      description: 'Global search and content engineering firm helping brands thrive across modern search engines and AI answer engines. Recruits technical SEO and analytics graduates.',
      isVerified: true,
      activeHiringTracks: ['Technical SEO', 'Entity & AEO Optimization', 'Analytics & GA4']
    },
    {
      name: 'Vanguard Media Group',
      slug: 'vanguard-media',
      industry: 'Omnichannel Advertising Agency',
      website: 'https://vanguardmedia.example.com',
      location: 'New York, Toronto & Remote',
      description: 'Full-service digital media agency managing ₹250 Cr+ annual paid advertising budgets across Google, Meta, and emerging channels.',
      isVerified: true,
      activeHiringTracks: ['Media Buying', 'Social Media Strategy', 'Campaign Analytics']
    }
  ];

  for (const p of partners) {
    await prisma.placementPartner.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log('✓ Placement partners seeded.');

  // 2. Verified Skills
  const skills = [
    { name: 'Omnichannel Acquisition Strategy', slug: 'omnichannel-strategy', category: 'Digital Marketing', description: 'Full-funnel customer acquisition, budget allocation, and multi-touch conversion strategy.' },
    { name: 'Technical SEO & AEO', slug: 'technical-seo-aeo', category: 'Search Engine Optimisation', description: 'Crawlability, Core Web Vitals, JSON-LD Schema markup, and Answer Engine Optimisation.' },
    { name: 'Google Ads & Performance Max', slug: 'google-ads-pmax', category: 'Paid Advertising', description: 'Search campaign structure, smart bidding (tCPA/tROAS), and negative keyword taxonomy.' },
    { name: 'Meta Ads & Conversion API (CAPI)', slug: 'meta-ads-capi', category: 'Paid Advertising', description: 'Dynamic creative testing, broad audience targeting, and server-side tracking.' },
    { name: 'Google Analytics 4 & Tag Manager', slug: 'ga4-gtm-analytics', category: 'Analytics & Tracking', description: 'DataLayers, custom events, UTM governance, and funnel exploration.' },
    { name: 'Looker Studio Executive Dashboards', slug: 'looker-studio-bi', category: 'Analytics & Tracking', description: 'Multi-channel attribution reporting, ROAS pacing, and client dashboards.' },
    { name: 'AI Workflows & Prompt Engineering', slug: 'ai-marketing-workflows', category: 'AI for Digital Marketing', description: 'Prompt chains, market research workflows, and marketing automation.' },
  ];

  for (const s of skills) {
    await prisma.skill.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log('✓ Verified skills seeded.');

  // 3. Approved Launch Courses
  const courses = [
    {
      slug: 'digital-marketing-foundations',
      title: 'Digital Marketing Fundamentals & Omnichannel Strategy',
      subtitle: '100% Live Instructor-Led Cohort on Acquisition Funnels, Strategy & Multi-Touch Conversion',
      category: 'Digital Marketing',
      level: CourseLevel.BEGINNER,
      format: CourseFormat.LIVE_ONLINE,
      status: CoursePublishStatus.PUBLISHED,
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
    },
    {
      slug: 'seo-and-ai-search-optimization',
      title: 'Search Engine Optimisation (SEO) & AI Search / AEO',
      subtitle: '100% Live Masterclass in Technical Audits, Keyword Architecture & Answer Engine Optimisation',
      category: 'Search Engine Optimisation',
      level: CourseLevel.INTERMEDIATE,
      format: CourseFormat.LIVE_ONLINE,
      status: CoursePublishStatus.PUBLISHED,
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
    },
    {
      slug: 'paid-performance-google-meta-ads',
      title: 'Paid Performance Advertising (Google Ads & Meta Ads)',
      subtitle: '100% Live Cohort on Bidding Strategies, Conversion APIs, Creative Strategy & ROI',
      category: 'Paid Advertising',
      level: CourseLevel.INTERMEDIATE,
      format: CourseFormat.LIVE_ONLINE,
      status: CoursePublishStatus.PUBLISHED,
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
    },
    {
      slug: 'analytics-ga4-google-tag-manager',
      title: 'Marketing Analytics, GA4 & Google Tag Manager',
      subtitle: '100% Live Practical Workshop on Custom Events, DataLayers, UTMs & Looker Dashboards',
      category: 'Analytics & Tracking',
      level: CourseLevel.INTERMEDIATE,
      format: CourseFormat.LIVE_ONLINE,
      status: CoursePublishStatus.PUBLISHED,
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
    },
    {
      slug: 'social-media-marketing-strategy',
      title: 'Social Media Marketing & Content Strategy',
      subtitle: '100% Live Cohort on Organic Distribution, Content Calendars, Brand Voice & Community',
      category: 'Social Media Marketing',
      level: CourseLevel.BEGINNER,
      format: CourseFormat.LIVE_ONLINE,
      status: CoursePublishStatus.PUBLISHED,
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
    },
    {
      slug: 'ai-tools-for-digital-marketers',
      title: 'AI Tools & Automation for Digital Marketers',
      subtitle: '100% Live Training on Generative AI, Prompt Workflows, Content Automation & Productivity',
      category: 'AI for Digital Marketing',
      level: CourseLevel.INTERMEDIATE,
      format: CourseFormat.LIVE_ONLINE,
      status: CoursePublishStatus.PUBLISHED,
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
    }
  ];

  for (const c of courses) {
    await prisma.course.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }
  console.log('✓ Approved live digital marketing programmes seeded.');

  // 4. Default Seed Users (Student, Employer, Admin, Trainer)
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('StudentVerse@2026', salt);

  // Student Account
  const student = await prisma.user.upsert({
    where: { email: 'student@studentverse.com' },
    update: {},
    create: {
      email: 'student@studentverse.com',
      passwordHash,
      fullName: 'Alex Morgan',
      country: 'United Kingdom',
      timezone: 'UTC',
      isEmailVerified: true,
      roles: {
        create: [{ role: Role.STUDENT }, { role: Role.LEARNER }],
      },
      learnerProfile: {
        create: {
          headline: 'Growth & Omnichannel Campaign Specialist',
          bio: 'Completed Digital Marketing Fundamentals with assessed campaign capstone on StudentVerse.',
          visibility: TalentVisibility.SEARCHABLE,
          skills: ['Omnichannel Acquisition Strategy', 'Google Ads & Performance Max', 'Google Analytics 4 & Tag Manager'],
          portfolioLinks: ['https://github.com/alexmorgan-growth/portfolio'],
        },
      },
    },
  });

  // Employer Organisation Account
  const employer = await prisma.user.upsert({
    where: { email: 'employer@studentverse.com' },
    update: {},
    create: {
      email: 'employer@studentverse.com',
      passwordHash,
      fullName: 'Sarah Jenkins (Apex Growth Labs)',
      country: 'United Kingdom',
      timezone: 'UTC',
      isEmailVerified: true,
      roles: {
        create: [{ role: Role.EMPLOYER }, { role: Role.EMPLOYER_OWNER }],
      },
      orgMemberships: {
        create: {
          role: Role.EMPLOYER_OWNER,
          organisation: {
            create: {
              name: 'Apex Growth Labs',
              slug: 'apex-growth-labs',
              website: 'https://apexgrowth.example.com',
              country: 'United Kingdom',
              verificationStatus: EmployerVerificationStatus.VERIFIED,
              verifiedAt: new Date(),
            },
          },
        },
      },
    },
  });

  // Platform Admin Account (Owner: Nitesh)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@studentverse.com' },
    update: {},
    create: {
      email: 'admin@studentverse.com',
      passwordHash,
      fullName: 'Nitesh (Platform Admin)',
      country: 'Global',
      timezone: 'UTC',
      isEmailVerified: true,
      roles: {
        create: [{ role: Role.ADMIN }, { role: Role.PLATFORM_ADMIN }, { role: Role.SUPER_ADMIN }],
      },
    },
  });

  console.log('✓ Test user accounts seeded (student, employer, admin).');

  // 5. Seed Flagship AI Digital Marketing Course and all 14 Modules
  await seedAiDigitalMarketingCourse(prisma);

  console.log('All StudentVerse database entities successfully seeded to Supabase PostgreSQL!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
