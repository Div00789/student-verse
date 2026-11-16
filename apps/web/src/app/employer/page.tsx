'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  AlertCircle, 
  Search, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  Plus
} from 'lucide-react';

const CANDIDATES_DATA = [
  {
    id: 'cand-1',
    name: 'Elena Rostova',
    headline: 'Certified Digital Performance Marketer & SEO Specialist',
    country: 'Poland (UTC+1)',
    skills: ['SEO', 'Google Analytics 4', 'Meta Ads', 'Conversion Rate Optimization'],
    completedCourses: ['Digital Marketing Foundations'],
    credentialCode: 'SV-2026-DM-849201',
    portfolioUrl: 'https://github.com/elena-marketing/seo-audit-showcase',
    remote: true,
  },
  {
    id: 'cand-2',
    name: 'Marcus Chen',
    headline: 'RevOps Specialist & Workflow Automation Builder',
    country: 'Singapore (UTC+8)',
    skills: ['HubSpot CRM', 'n8n', 'Make', 'Lead Scoring', 'REST APIs'],
    completedCourses: ['HubSpot CRM & Automation', 'AI Workflow Automation'],
    credentialCode: 'SV-2026-AI-772910',
    portfolioUrl: 'https://portfolio.marcuschen-ops.dev',
    remote: true,
  },
];

export default function EmployerPortalPage() {
  const [activeTab, setActiveTab] = useState<'talent' | 'jobs' | 'pipeline'>('talent');
  const [isVerified, setIsVerified] = useState(true); // Toggle to demonstrate AC-07 / BR-06
  const [skillFilter, setSkillFilter] = useState('');
  const [shortlisted, setShortlisted] = useState<string[]>([]);

  const handleShortlist = (id: string) => {
    if (shortlisted.includes(id)) {
      setShortlisted(shortlisted.filter((x) => x !== id));
    } else {
      setShortlisted([...shortlisted, id]);
    }
  };

  const filteredCandidates = CANDIDATES_DATA.filter((c) =>
    skillFilter === ''
      ? true
      : c.skills.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()))
  );

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xl shadow-md">
              AG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">Apex Growth Labs</h1>
                {isVerified ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Hiring Partner
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Pending Business Review
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Employer ID: ORG-8492 &bull; Workspace: Recruitment Team &bull; StudentVerse [RankGood Tech]
              </p>
            </div>
          </div>

          {/* Interactive Demo Toggle for AC-07 Enforcement */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Vetting Simulator (AC-07)
              </span>
              <span className="text-xs font-bold text-slate-800">
                {isVerified ? 'Status: Approved' : 'Status: Unverified'}
              </span>
            </div>
            <button
              onClick={() => setIsVerified(!isVerified)}
              className="px-3 py-1.5 text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition-colors"
            >
              Toggle Vetting
            </button>
          </div>
        </div>

        {/* Unverified Warning Banner (Rule AC-07 & BR-06) */}
        {!isVerified && (
          <div className="p-5 mb-8 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-sm">Access Gate: Employer Verification Pending</h4>
              <p className="leading-relaxed">
                Pursuant to Rule AC-07 and BR-06, unverified employers cannot discover candidate profiles or publish active vacancies. Business identity review is in progress by our operations team.
              </p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('talent')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'talent'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            Candidate Discovery Pool (Consenting)
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'jobs'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Active Job Vacancies
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'pipeline'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Applicant Pipeline
          </button>
        </div>

        {/* ---------------- Tab 1: Talent Discovery ---------------- */}
        {activeTab === 'talent' && (
          <div>
            {!isVerified ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <Lock className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">Candidate Discovery is Locked</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Only verified organizations with approved legal standing can access our consenting candidate talent pool. Toggle the vetting simulator above to inspect the approved view.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Filter by skill (e.g. SEO, n8n, HubSpot)..."
                      value={skillFilter}
                      onChange={(e) => setSkillFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    Showing <strong>{filteredCandidates.length}</strong> consenting candidates with evaluated capstones
                  </span>
                </div>

                {/* Candidate Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCandidates.map((cand) => (
                    <div
                      key={cand.id}
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-base font-bold text-slate-950">{cand.name}</h3>
                            <p className="text-xs text-indigo-600 font-medium mt-0.5">{cand.headline}</p>
                          </div>
                          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                            Opted In
                          </span>
                        </div>

                        <div className="text-xs text-slate-500 space-y-1">
                          <div>&bull; Location: <strong>{cand.country}</strong></div>
                          <div>&bull; Completed Track: <strong>{cand.completedCourses.join(', ')}</strong></div>
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="text-slate-400">Verified Credential:</span>
                            <Link
                              href={`/certifications/verify/${cand.credentialCode}`}
                              target="_blank"
                              className="font-mono text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                            >
                              {cand.credentialCode} <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {cand.skills.map((s) => (
                            <span key={s} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <a
                          href={cand.portfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                        >
                          View Capstone Portfolio
                        </a>
                        <button
                          onClick={() => handleShortlist(cand.id)}
                          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                            shortlisted.includes(cand.id)
                              ? 'bg-emerald-600 text-white'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                          }`}
                        >
                          {shortlisted.includes(cand.id) ? 'Shortlisted' : 'Request Contact'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------- Tab 2: Jobs ---------------- */}
        {activeTab === 'jobs' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Your Organization&apos;s Vacancies</h2>
                <p className="text-xs text-slate-500">Moderated and published on the global StudentVerse directory.</p>
              </div>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700">
                <Plus className="w-4 h-4" /> Post a Vacancy
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Remote Marketing Operations Associate</h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Full-Time &bull; $48k-$65k &bull; 14 Applications Received
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Active
                  </span>
                  <Link href="/jobs/remote-marketing-operations-associate" className="text-xs font-bold text-indigo-600 underline">
                    View Live &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- Tab 3: Pipeline ---------------- */}
        {activeTab === 'pipeline' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Applicant Tracking Stages</h2>
              <p className="text-xs text-slate-500">
                Rule BR-08: Application status changes are server-enforced, timestamped, and auditable.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { stage: 'New', count: 4 },
                { stage: 'Reviewing', count: 6 },
                { stage: 'Shortlisted', count: 2 },
                { stage: 'Interview', count: 1 },
                { stage: 'Hired', count: 1 },
              ].map((s) => (
                <div key={s.stage} className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{s.stage}</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">{s.count}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
