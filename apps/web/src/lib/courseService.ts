import { supabaseServer } from '@/lib/supabaseServer';

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
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface ModuleItem {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  lessons: LessonItem[];
  assignment?: {
    id: string;
    title: string;
    instructions: string;
    deliverables: string[];
    maxScore: number;
  };
}

export interface UniversalCourse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  format: string;
  durationHours: number;
  totalSessions: number;
  price: number;
  originalPrice?: number;
  currency: string;
  description: string;
  thumbnailUrl: string;
  prerequisites: string[];
  learningOutcomes: string[];
  totalModules: number;
  totalLessons: number;
  modules: ModuleItem[];
}

/**
 * Calculates authoritative course price in INR.
 * Handles minor units (paise >= 100000, e.g. 2999900 -> 29999),
 * direct rupee values (>= 1000, e.g. 29999 -> 29999),
 * and prevents corrupted/erroneously divided values (< 1000, e.g. 299, 499) from overriding legitimate prices.
 */
export function resolveCoursePrice(rawPriceMinorUnits?: number | null, fallbackPrice: number = 29999): number {
  if (!rawPriceMinorUnits || rawPriceMinorUnits <= 0) {
    return fallbackPrice;
  }
  // If stored in paise (>= 100,000, e.g. 2999900 paise = ₹29,999)
  if (rawPriceMinorUnits >= 100000) {
    return Math.round(rawPriceMinorUnits / 100);
  }
  // If stored directly in rupees (>= 1,000, e.g. 19999, 24999, 29999, 35999)
  if (rawPriceMinorUnits >= 1000) {
    return rawPriceMinorUnits;
  }
  // Unrealistic/corrupted low value (< 1000, e.g. 299, 349, 499)
  return fallbackPrice;
}

/**
 * Fallback static metadata registry for rich curriculum content
 * (interactive quizzes, lab notes, AI toolstacks, resources)
 */
export const COURSE_METADATA_FALLBACKS: Record<string, Partial<UniversalCourse>> = {
  'seo-and-ai-search-optimization': {
    title: 'Search Engine Optimisation (SEO) & AI Search / AEO',
    subtitle: '100% Live Masterclass in Technical Audits, Keyword Architecture & Answer Engine Optimisation',
    category: 'Search Engine Optimisation',
    durationHours: 32,
    totalSessions: 10,
    price: 29999,
    thumbnailUrl: '/images/courses/seo-and-ai-search-optimization.jpg',
    description: 'Learn modern search mechanics beyond basic keywords. Conduct technical site audits, build topical clusters, optimize for Google Search Console, and master Answer Engine Optimisation (AEO) for AI search engines like ChatGPT Search and Google AI Overviews.',
  },
  'digital-marketing-foundations': {
    title: 'Digital Marketing Fundamentals & Omnichannel Strategy',
    subtitle: '100% Live Instructor-Led Cohort on Acquisition Funnels, Strategy & Multi-Touch Conversion',
    category: 'Digital Marketing',
    durationHours: 36,
    totalSessions: 12,
    price: 24999,
    thumbnailUrl: '/images/courses/digital-marketing-foundations.jpg',
    description: 'Master practical digital marketing strategy through real-time instructor guidance. Build end-to-end customer acquisition funnels, plan multi-channel campaigns, execute content schedules, and measure performance metrics across modern channels.',
  },
  'paid-performance-google-meta-ads': {
    title: 'Paid Performance Advertising (Google Ads & Meta Ads)',
    subtitle: '100% Live Cohort on Bidding Strategies, Conversion APIs, Creative Strategy & ROI',
    category: 'Paid Advertising',
    durationHours: 36,
    totalSessions: 12,
    price: 35999,
    thumbnailUrl: '/images/courses/paid-performance-google-meta-ads.jpg',
    description: 'Master high-volume paid media buying. Set up Google Search and Performance Max campaigns, architect Meta Ads creative testing frameworks, configure Server-Side Conversion APIs, and optimize ad spend with rigorous ROAS attribution.',
  },
  'analytics-ga4-google-tag-manager': {
    title: 'Marketing Analytics, GA4 & Google Tag Manager',
    subtitle: '100% Live Practical Workshop on Custom Events, DataLayers, UTMs & Looker Dashboards',
    category: 'Analytics & Tracking',
    durationHours: 30,
    totalSessions: 10,
    price: 24999,
    thumbnailUrl: '/images/courses/analytics-ga4-google-tag-manager.jpg',
    description: 'Stop guessing which marketing channels work. Master Google Tag Manager dataLayers, configure custom GA4 conversion events, implement cross-domain tracking, and build interactive client-facing dashboards in Looker Studio.',
  },
  'social-media-marketing-strategy': {
    title: 'Social Media Marketing & Content Strategy',
    subtitle: '100% Live Cohort on Organic Distribution, Content Calendars, Brand Voice & Community',
    category: 'Social Media Marketing',
    durationHours: 24,
    totalSessions: 8,
    price: 19999,
    thumbnailUrl: '/images/courses/social-media-marketing-strategy.jpg',
    description: 'Build organic social distribution that compounds. Develop platform-native content pillars, write high-retention hooks and video scripts, manage brand communities, and deploy automated multi-channel posting workflows.',
  },
  'ai-tools-for-digital-marketers': {
    title: 'AI Tools & Automation for Digital Marketers',
    subtitle: '100% Live Hands-On Workshop on Prompt Systems, Make/Zapier Automations & Custom AI Agents',
    category: 'AI for Digital Marketing',
    durationHours: 24,
    totalSessions: 8,
    price: 24999,
    thumbnailUrl: '/images/courses/ai-tools-for-digital-marketers.jpg',
    description: 'Transform manual marketing tasks into automated AI workflows. Build chain-of-thought prompt templates, orchestrate multi-step data pipelines with webhooks, and deploy custom customer research agents.',
  },
  'ai-digital-marketing-course': {
    title: 'AI Digital Marketing Course',
    subtitle: 'Comprehensive 14-Module Professional Programme: SEO, PPC, GA4, Paid Media, Automation & Modern AI Tools',
    category: 'Digital Marketing / Artificial Intelligence / Career Development',
    durationHours: 48,
    totalSessions: 16,
    price: 29999,
    thumbnailUrl: '/images/courses/ai-digital-marketing-course.jpg',
    description: 'Master digital marketing with artificial intelligence through hands-on training in SEO, Google Ads, GA4, Social Media Marketing, Email Marketing, Content Marketing, Marketing Automation, Affiliate Marketing, and Freelancing.',
  },
  'aman-digital-marketing-course': {
    title: 'Aman Digital Marketing Course',
    subtitle: 'Comprehensive 15-Module Professional Programme: SEO, Web Development, Google Ads, GA4, Automation & AI Tools',
    category: 'Digital Marketing',
    durationHours: 48,
    totalSessions: 16,
    price: 29999,
    thumbnailUrl: '/images/courses/aman-digital-marketing-course.jpg',
    description: 'A comprehensive digital marketing learning programme designed to provide practical knowledge of Search Engine Optimisation, website development, keyword research, paid advertising, social media marketing, analytics, artificial intelligence and other essential digital marketing skills through live training, recorded lessons, presentations and practical assignments.',
  },
  'ai-business-automation-masterclass': {
    title: 'AI & Business Automation Masterclass',
    subtitle: 'Learn AI. Build Automations. Transform Businesses. (Zapier, n8n, HubSpot, Apollo.io, GoHighLevel & Make.com)',
    category: 'Artificial Intelligence & Automation',
    level: 'BEGINNER TO ADVANCED',
    format: 'SELF_PACED',
    durationHours: 68,
    totalSessions: 16,
    totalModules: 16,
    totalLessons: 200,
    price: 29999,
    thumbnailUrl: '/images/courses/ai-business-automation-masterclass.jpg',
    description: 'Master AI-powered business automation, intelligent workflows, application integrations and modern business systems using industry-leading platforms such as Zapier, n8n, HubSpot, Apollo.io, GoHighLevel and Make.com. Learn to build intelligent AI agents, automate repetitive business processes, integrate applications using APIs and webhooks, develop WhatsApp and voice AI assistants, and implement production-ready automation solutions.',
  }
};

/**
 * Universal service to fetch all published courses with dynamic module and lesson counts directly from Supabase
 */
export async function getAllCourses(): Promise<UniversalCourse[]> {
  try {
    const { data: courses, error } = await supabaseServer
      .from('Course')
      .select(`
        id,
        slug,
        title,
        subtitle,
        category,
        level,
        format,
        durationHours,
        totalSessions,
        priceMinorUnits,
        currency,
        description,
        thumbnailUrl,
        CourseModule (
          id,
          title,
          orderIndex,
          Lesson (
            id,
            title,
            orderIndex,
            durationMinutes,
            contentType,
            videoUrl,
            notes,
            aiToolsUsed
          )
        )
      `)
      .order('title');

    if (error || !courses) {
      console.error('Error fetching courses from DB:', error);
      return [];
    }

    return courses.map((c: any) => {
      const fallback = COURSE_METADATA_FALLBACKS[c.slug] || {};
      const modules = (c.CourseModule || []).sort((a: any, b: any) => a.orderIndex - b.orderIndex);
      const totalLessons = modules.reduce((acc: number, m: any) => acc + (m.Lesson?.length || 0), 0);

      return {
        id: c.id,
        slug: c.slug,
        title: c.title || fallback.title || 'Course',
        subtitle: c.subtitle || fallback.subtitle || '',
        category: c.category || fallback.category || 'Digital Marketing',
        level: c.level || 'BEGINNER TO ADVANCED',
        format: c.format || 'LIVE_ONLINE',
        durationHours: c.durationHours || fallback.durationHours || 30,
        totalSessions: c.totalSessions || fallback.totalSessions || 10,
        price: resolveCoursePrice(c.priceMinorUnits, fallback.price || 24999),
        currency: c.currency || 'INR',
        description: c.description || fallback.description || '',
        thumbnailUrl: c.thumbnailUrl || fallback.thumbnailUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
        prerequisites: c.prerequisites || [],
        learningOutcomes: c.learningOutcomes || [],
        totalModules: modules.length,
        totalLessons,
        modules: modules.map((m: any) => ({
          id: m.id,
          title: m.title,
          description: m.description || '',
          orderIndex: m.orderIndex,
          lessons: (m.Lesson || [])
            .sort((a: any, b: any) => a.orderIndex - b.orderIndex)
            .map((l: any) => ({
              id: l.id,
              code: `l-${m.orderIndex}-${l.orderIndex}`,
              title: l.title,
              type: l.contentType === 'PROJECT' ? 'PROJECT' : (l.contentType === 'RECORDED_VIDEO' ? 'RECORDED_VIDEO' : 'LIVE_SESSION'),
              duration: `${l.durationMinutes || 60} min`,
              durationMinutes: l.durationMinutes || 60,
              videoUrl: l.videoUrl || undefined,
              notes: l.notes || '',
              aiTools: l.aiToolsUsed || [],
              resources: [],
            }))
        }))
      };
    });
  } catch (err: any) {
    console.error('getAllCourses failed:', err);
    return [];
  }
}

/**
 * Universal service to fetch a single course by slug with its complete module and lesson curriculum
 */
export async function getCourseBySlug(slug: string): Promise<UniversalCourse | null> {
  try {
    const { data: course, error } = await supabaseServer
      .from('Course')
      .select(`
        id,
        slug,
        title,
        subtitle,
        category,
        level,
        format,
        durationHours,
        totalSessions,
        priceMinorUnits,
        currency,
        description,
        thumbnailUrl,
        prerequisites,
        learningOutcomes,
        CourseModule (
          id,
          title,
          description,
          orderIndex,
          Lesson (
            id,
            title,
            orderIndex,
            durationMinutes,
            contentType,
            notes,
            videoUrl,
            aiToolsUsed
          )
        )
      `)
      .eq('slug', slug)
      .maybeSingle();

    if (error || !course) {
      console.warn(`Course ${slug} not found in DB`);
      return null;
    }

    const fallback = COURSE_METADATA_FALLBACKS[slug] || {};
    const rawModules = (course.CourseModule || []).sort((a: any, b: any) => a.orderIndex - b.orderIndex);

    const modules: ModuleItem[] = rawModules.map((m: any, mIdx: number) => {
      const sortedLessons = (m.Lesson || []).sort((a: any, b: any) => a.orderIndex - b.orderIndex);
      return {
        id: m.id,
        title: m.title,
        description: m.description || `Module ${m.orderIndex || mIdx + 1} curriculum and practical coursework.`,
        orderIndex: m.orderIndex || mIdx + 1,
        lessons: sortedLessons.map((l: any, lIdx: number) => {
          const modOrder = m.orderIndex || mIdx + 1;
          const lessonOrder = l.orderIndex || lIdx + 1;
          const code = `l-${modOrder}-${lessonOrder}`;
          return {
            id: l.id,
            code,
            title: l.title,
            type: l.contentType === 'PROJECT' ? 'PROJECT' : (l.contentType === 'RECORDED_VIDEO' ? 'RECORDED_VIDEO' : 'LIVE_SESSION'),
            duration: `${l.durationMinutes || 60} min`,
            durationMinutes: l.durationMinutes || 60,
            videoUrl: l.videoUrl || undefined,
            notes: l.notes || `Comprehensive curriculum and study guidelines for ${l.title}. Learn concepts, architecture, and practical application.`,
            aiTools: l.aiToolsUsed || ['Gemini Pro', 'ChatGPT Plus'],
            resources: [
              { title: `${l.title} Guide & Blueprint`, url: '#', type: 'PDF' },
              { title: 'Implementation Template & Checklist', url: '#', type: 'TEMPLATE' }
            ],
            quiz: {
              question: `What is the core strategic principle taught in ${l.title}?`,
              options: [
                'Data-driven execution, verified architecture, and continuous performance optimization.',
                'Unstructured manual testing without governance or attribution.',
                'Relying entirely on legacy tactics without AI assistance.',
                'Prioritizing vanity metrics over business outcomes.'
              ],
              correctIndex: 0,
              explanation: 'Effective modern workflows combine systematic frameworks with automated AI tools and measurable KPI attribution.'
            }
          };
        }),
        assignment: {
          id: `asg-${m.id}`,
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

    const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

    return {
      id: course.id,
      slug: course.slug,
      title: course.title || fallback.title || 'Course',
      subtitle: course.subtitle || fallback.subtitle || '',
      category: course.category || fallback.category || 'Digital Marketing',
      level: course.level || 'BEGINNER TO ADVANCED',
      format: course.format || 'LIVE_ONLINE',
      durationHours: course.durationHours || fallback.durationHours || 30,
      totalSessions: course.totalSessions || fallback.totalSessions || 10,
      price: resolveCoursePrice(course.priceMinorUnits, fallback.price || 29999),
      currency: course.currency || 'INR',
      description: course.description || fallback.description || '',
      thumbnailUrl: course.thumbnailUrl || fallback.thumbnailUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
      prerequisites: course.prerequisites || ['Basic computer literacy', 'Curiosity to learn modern digital skills'],
      learningOutcomes: course.learningOutcomes || [
        'Master end-to-end practical workflows through live instructor coaching',
        'Build real-world campaign and technical deliverables for your portfolio',
        'Receive verified industry skill credentials upon rubric evaluation'
      ],
      totalModules: modules.length,
      totalLessons,
      modules
    };
  } catch (err: any) {
    console.error(`getCourseBySlug failed for ${slug}:`, err);
    return null;
  }
}
