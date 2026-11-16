'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Clock, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

const ALL_COURSES = [
  {
    id: 'c-101',
    slug: 'digital-marketing-foundations',
    title: 'Digital Marketing Foundations',
    subtitle: 'Master omnichannel performance marketing, SEO, and multi-touch analytics',
    category: 'Growth & Marketing',
    level: 'BEGINNER',
    durationHours: 32,
    price: 199,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    description: 'Learn full-funnel acquisition, paid media strategy across Meta & Google Ads, technical SEO architecture, and multi-touch GA4 attribution with an evaluated campaign capstone.',
    skills: ['SEO', 'Google Ads', 'Meta Paid Media', 'GA4 Analytics', 'Email Nurture'],
  },
  {
    id: 'c-102',
    slug: 'hubspot-crm-automation',
    title: 'HubSpot CRM & Marketing Automation',
    subtitle: 'Architect enterprise lead routing, lifecycle stages, and automated CRM workflows',
    category: 'Revenue Operations',
    level: 'INTERMEDIATE',
    durationHours: 28,
    price: 249,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60',
    description: 'Build clean sales pipelines, lead scoring models, multi-branch workflows, and verified customer lifecycle automations tested against production RevOps benchmarks.',
    skills: ['HubSpot CRM', 'Lead Scoring', 'Pipeline Design', 'Lifecycle Stages', 'Automation Triggers'],
  },
  {
    id: 'c-103',
    slug: 'ai-workflow-automation',
    title: 'AI Workflow Automation (n8n & Make)',
    subtitle: 'Deploy enterprise-grade automated AI pipelines, LLM agents, and API integrations',
    category: 'Automation & AI',
    level: 'INTERMEDIATE',
    durationHours: 36,
    price: 299,
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    description: 'Deploy enterprise automated workflows, webhook routers, self-healing retries, and integrate LLM agents into business operations with verified portfolio deliverables.',
    skills: ['n8n', 'Make', 'Webhooks', 'REST APIs', 'LLM Agent Pipelines', 'Error Handlers'],
  },
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'Growth & Marketing', 'Revenue Operations', 'Automation & AI'];

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
        <div className="max-w-3xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Digital Skills Programmes
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Every StudentVerse course includes structured modules, assessed practical coursework, and a verifiable Certificate of Completion issued by <strong>StudentVerse [RankGood Tech]</strong>.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'All Disciplines' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search skill, topic, tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="h-44 bg-slate-800 relative overflow-hidden">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur text-slate-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                  {course.level} &bull; Self-Paced
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                    {course.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {course.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.durationHours} hrs
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      Capstone Evaluated
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-slate-900">${course.price}</span>
                    <span className="text-xs text-slate-500 ml-1">USD</span>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    View Syllabus &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">No matching programmes found</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting your filter or search term.</p>
          </div>
        )}

      </div>
    </div>
  );
}
