'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  Search, 
  ExternalLink,
  Lock
} from 'lucide-react';

const JOBS_DATA = [
  {
    id: 'job-101',
    slug: 'remote-marketing-operations-associate',
    title: 'Remote Marketing Operations Associate',
    company: 'Apex Growth Labs',
    isCompanyVerified: true,
    location: 'Global (Remote)',
    workplaceType: 'REMOTE',
    jobType: 'Full-Time',
    compensation: '$48,000 - $65,000 USD / yr',
    summary: 'Oversee campaign tracking taxonomy, email workflow automation, Google Analytics 4 attribution reporting, and lead routing.',
    skills: ['Digital Marketing', 'GA4 Attribution', 'HubSpot CRM', 'Campaign Tracking'],
    posted: '6 days ago',
  },
  {
    id: 'job-102',
    slug: 'junior-automation-workflow-engineer',
    title: 'Junior Automation & Workflow Engineer',
    company: 'Nexis Digital Services',
    isCompanyVerified: true,
    location: 'Remote (EMEA / APAC friendly)',
    workplaceType: 'REMOTE',
    jobType: 'Full-Time',
    compensation: '$52,000 - $70,000 USD / yr',
    summary: 'Design robust automated webhook routers, integrate low-code nodes in n8n and Make, handle JSON error fallbacks, and support automated operations.',
    skills: ['n8n', 'Make', 'REST APIs', 'JSON Transformation', 'Error Handling'],
    posted: '4 days ago',
  },
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = JOBS_DATA.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Vetted Hiring Partners Only &bull; Zero Recruitment Scams</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Career Opportunities &amp; Verified Roles
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Every job listed on StudentVerse has passed business moderation. Positions are aligned with our digital training curricula in growth marketing, RevOps, and workflow automation.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 max-w-xl">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by role title, skill, or hiring partner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {job.company}
                  </span>
                  {job.isCompanyVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Partner
                    </span>
                  )}
                  <span className="text-xs text-slate-400">&bull; {job.posted}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-950">
                  <Link href={`/jobs/${job.slug}`} className="hover:text-indigo-600 transition-colors">
                    {job.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {job.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" /> {job.compensation}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {job.jobType}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 flex-shrink-0">
                <Link
                  href={`/jobs/${job.slug}`}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors text-center w-full md:w-auto"
                >
                  View Details &amp; Apply
                </Link>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Consent-controlled
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

