'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Clock, BookOpen, CheckCircle, ArrowRight, Video, Sparkles } from 'lucide-react';
import { formatINR } from '../../lib/currency';

const ALL_COURSES = [
  {
    id: 'c-aidm-100',
    slug: 'ai-digital-marketing-course',
    title: 'AI Digital Marketing Course',
    subtitle: 'Comprehensive 14-Module Professional Programme: SEO, PPC, GA4, Paid Media, Automation & Modern AI Tools',
    category: 'Digital Marketing',
    level: 'BEGINNER TO ADVANCED',
    durationHours: 48,
    totalSessions: 16,
    price: 49999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    description: 'Master digital marketing with artificial intelligence through hands-on training in SEO, Google Ads, GA4, Social Media Marketing, Email Marketing, Content Marketing, Marketing Automation, Affiliate Marketing, and Freelancing.',
    skills: ['AI-Driven Technical SEO', 'Google Ads & PMax', 'GA4 & GTM DataLayers', 'CRM & Agent Automation', 'GenAI Creative Studio', 'Full-Funnel Capstone'],
    nextBatch: '01 Dec 2026 (Live + Hybrid)'
  },
  {
    id: 'c-dm-101',
    slug: 'digital-marketing-foundations',
    title: 'Digital Marketing Fundamentals & Omnichannel Strategy',
    subtitle: '100% Live Instructor-Led Cohort on Acquisition Funnels, Strategy & Multi-Touch Conversion',
    category: 'Digital Marketing',
    level: 'BEGINNER',
    durationHours: 36,
    totalSessions: 12,
    price: 24999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    description: 'Master practical digital marketing strategy through real-time instructor guidance. Build end-to-end customer acquisition funnels, plan multi-channel campaigns, execute content schedules, and measure performance metrics across modern channels.',
    skills: ['Funnel Architecture', 'Omnichannel Strategy', 'Paid Media Pacing', 'CRO & Landing Pages'],
    nextBatch: '25 Nov 2026 (Live Evening)'
  },
  {
    id: 'c-seo-102',
    slug: 'seo-and-ai-search-optimization',
    title: 'Search Engine Optimisation (SEO) & AI Search / AEO',
    subtitle: '100% Live Masterclass in Technical Audits, Keyword Architecture & Answer Engine Optimisation',
    category: 'Search Engine Optimisation',
    level: 'INTERMEDIATE',
    durationHours: 32,
    totalSessions: 10,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?w=800&auto=format&fit=crop&q=60',
    description: 'Learn modern search mechanics beyond basic keywords. Conduct technical site audits, build topical clusters, optimize for Google Search Console, and master Answer Engine Optimisation (AEO) for AI search engines.',
    skills: ['Technical Crawl Audits', 'AEO Entity Schema', 'Topical Authority', 'Search Console'],
    nextBatch: '05 Dec 2026 (Live Weekend)'
  },
  {
    id: 'c-ads-103',
    slug: 'paid-performance-google-meta-ads',
    title: 'Paid Performance Advertising (Google Ads & Meta Ads)',
    subtitle: '100% Live Cohort on Bidding Strategies, Conversion APIs, Creative Strategy & ROI',
    category: 'Paid Advertising',
    level: 'INTERMEDIATE',
    durationHours: 36,
    totalSessions: 12,
    price: 34999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    description: 'Master high-volume paid media buying. Set up Google Search and Performance Max campaigns, architect Meta Ads creative testing frameworks, configure Server-Side Conversion APIs, and optimize ad spend with rigorous ROAS attribution.',
    skills: ['Google Search & PMax', 'Meta Creative Testing', 'Conversion API (CAPI)', 'ROAS Attribution'],
    nextBatch: '01 Dec 2026 (Live Cohort)'
  },
  {
    id: 'c-ga4-104',
    slug: 'analytics-ga4-google-tag-manager',
    title: 'Marketing Analytics, GA4 & Google Tag Manager',
    subtitle: '100% Live Practical Workshop on Custom Events, DataLayers, UTMs & Looker Dashboards',
    category: 'Analytics & Tracking',
    level: 'INTERMEDIATE',
    durationHours: 30,
    totalSessions: 10,
    price: 24999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=60',
    description: 'Stop guessing which marketing channels work. Master Google Tag Manager dataLayers, configure custom GA4 conversion events, implement cross-domain tracking, and build interactive client-facing dashboards in Looker Studio.',
    skills: ['GTM DataLayers', 'GA4 Custom Events', 'Looker Studio BI', 'Attribution Modeling'],
    nextBatch: '28 Nov 2026 (Live Cohort)'
  },
  {
    id: 'c-smm-105',
    slug: 'social-media-marketing-strategy',
    title: 'Social Media Marketing & Content Strategy',
    subtitle: '100% Live Cohort on Organic Distribution, Content Calendars, Brand Voice & Community',
    category: 'Social Media Marketing',
    level: 'BEGINNER',
    durationHours: 28,
    totalSessions: 10,
    price: 19999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
    description: 'Build organic social media systems that drive revenue. Learn platform-specific distribution across LinkedIn, Instagram, and YouTube, engineer high-engagement content calendars, establish distinctive brand voice, and analyze community sentiment.',
    skills: ['Content Architecture', 'Short-Form Scripts', 'Community Governance', 'Editorial Calendars'],
    nextBatch: '08 Dec 2026 (Live Cohort)'
  },
  {
    id: 'c-ai-106',
    slug: 'ai-tools-for-digital-marketers',
    title: 'AI Tools & Automation for Digital Marketers',
    subtitle: '100% Live Training on Generative AI, Prompt Workflows, Content Automation & Productivity',
    category: 'AI for Digital Marketing',
    level: 'INTERMEDIATE',
    durationHours: 32,
    totalSessions: 10,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    description: 'Transform modern marketing operations using production AI workflows. Build customized prompt chains for campaign research, automate multi-lingual content variations, integrate marketing automation triggers, and maintain responsible AI governance.',
    skills: ['Systematic Prompt Chains', 'Competitive Intelligence AI', 'Content Automation', 'AI Ethics & Review'],
    nextBatch: '26 Nov 2026 (Live Cohort)'
  }
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'ALL',
    'Digital Marketing',
    'Search Engine Optimisation',
    'Paid Advertising',
    'Analytics & Tracking',
    'Social Media Marketing',
    'AI for Digital Marketing'
  ];

  const filteredCourses = ALL_COURSES.filter((course) => {
    const matchesCategory = selectedCategory === 'ALL' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
            <Video className="w-3.5 h-3.5 text-indigo-600" />
            <span>100% Live Online Instructor-Led Training</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            Live Digital Marketing Programmes. <br />
            <span className="text-indigo-600">Assessed by Industry Leaders.</span>
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Every programme is delivered 100% live in small cohorts. Build assessed capstone projects, earn verifiable credentials, and unlock platform-mediated introductions to vetted hiring partners.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Categories Pill Selector */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search topics or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                {/* Course Cover Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold uppercase rounded-md tracking-wider">
                      {course.level}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-600/90 backdrop-blur text-white text-[10px] font-bold rounded-md flex items-center gap-1">
                      <Video className="w-3 h-3" /> 100% Live
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                    {course.category}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  {/* Skills tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {course.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 pt-3">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" /> {course.durationHours} Hours ({course.totalSessions} Live Sessions)
                  </span>
                  <span className="font-black text-base text-slate-900">
                    {formatINR(course.price)}
                  </span>
                </div>

                <div className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg font-semibold">
                  Next Batch: {course.nextBatch}
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  View Live Syllabus &amp; Enroll
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
