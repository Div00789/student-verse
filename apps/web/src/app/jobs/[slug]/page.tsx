'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Send,
  AlertCircle
} from 'lucide-react';

const JOBS_DICT: Record<string, any> = {
  'remote-marketing-operations-associate': {
    id: 'job-101',
    title: 'Remote Marketing Operations Associate',
    company: 'Apex Growth Labs',
    isCompanyVerified: true,
    location: 'Global (Remote)',
    compensation: '$48,000 - $65,000 USD / yr',
    jobType: 'Full-Time (Remote)',
    description: `Apex Growth Labs is a performance growth agency servicing B2B SaaS and high-velocity digital brands. We are seeking a proactive Marketing Operations Associate to oversee campaign execution, tracking taxonomy, email workflow automation, and attribution reporting.

Key Responsibilities:
- Configure and validate UTM campaign parameters and GA4 conversion events.
- Build and maintain automated email sequences and lead handoff triggers in HubSpot CRM.
- Audit paid media tracking across Google Ads and Meta platforms to eliminate attribution leakage.
- Generate weekly performance dashboards and actionable funnel efficiency recommendations.

Requirements:
- Completion or demonstrated mastery of performance digital marketing & analytics principles.
- Working knowledge of CRM automation (HubSpot or equivalent).
- Comfort with remote, asynchronous communication and clear written documentation.
- Capstone or portfolio evidence of campaign attribution setup.`,
    requiredSkills: ['Digital Marketing', 'Google Analytics 4', 'HubSpot CRM', 'Campaign Tracking', 'UTM Taxonomy'],
    screeningQuestions: [
      'Have you completed an evaluated multi-channel campaign capstone or project?',
      'What timezone overlap can you comfortably commit to (UTC)?'
    ]
  },
  'junior-automation-workflow-engineer': {
    id: 'job-102',
    title: 'Junior Automation & Workflow Engineer',
    company: 'Nexis Digital Services',
    isCompanyVerified: true,
    location: 'Remote (EMEA / APAC friendly)',
    compensation: '$52,000 - $70,000 USD / yr',
    jobType: 'Full-Time (Remote)',
    description: `Nexis Digital Services specializes in automated enterprise operations. We are looking for an Automation Engineer proficient in webhook architecture, low-code iPaaS platforms (n8n, Make), and REST API integrations.

Key Responsibilities:
- Design and test automated data sync pipelines between billing, CRM, and customer support tools.
- Implement robust error handling, webhook rate-limiting, and retry logic.
- Integrate LLM reasoning nodes into operational triage workflows.
- Monitor execution telemetry and maintain technical workflow documentation.

Requirements:
- Practical fluency in visual workflow tools (n8n, Make, Zapier).
- Strong understanding of REST API payloads, JSON structures, headers, and authentication tokens.
- Ability to independently debug broken webhook triggers.
- Portfolio project demonstrating an active automated system.`,
    requiredSkills: ['n8n', 'Make / Integromat', 'REST APIs', 'JSON Transformation', 'Error Handling', 'LLM Agents'],
    screeningQuestions: [
      'Share a link or description of an automated pipeline you designed.',
      'How do you manage API rate-limits and retries in automated nodes?'
    ]
  }
};

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = JOBS_DICT[params.slug];
  const [applied, setApplied] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!job) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <h2 className="text-xl font-bold text-slate-800">Job position not found</h2>
        <Link href="/jobs" className="mt-4 inline-block text-sm text-indigo-600 underline">
          Return to jobs directory
        </Link>
      </div>
    );
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setApplied(true);
    }, 600);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all vacancies
        </Link>

        {/* Job Header */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-500" />
              {job.company}
            </span>
            {job.isCompanyVerified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Vetted Hiring Partner
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-slate-400" /> {job.compensation}
            </span>
            <span className="font-medium text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded">
              {job.jobType}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {job.requiredSkills.map((s: string) => (
              <span key={s} className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Job Body & Apply Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Job Description &amp; Requirements</h2>
            <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
              {job.description}
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              <strong>StudentVerse Hiring Standard:</strong> Candidate applications submit verifiable course completions and capstone evidence alongside profile details.
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Apply for this Position</h3>
            
            {applied ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Application Submitted!
                </div>
                <p className="text-xs leading-relaxed">
                  Your application, verified student credentials, and profile snapshot have been delivered to <strong>{job.company}</strong>. You can monitor status in your Student Portal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div className="text-xs text-slate-500">
                  Logged in as a StudentVerse learner. Your verified competencies and portfolio links will be shared with this vetted employer.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Screening: {job.screeningQuestions[0]}
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={answer1}
                    onChange={(e) => setAnswer1(e.target.value)}
                    placeholder="Briefly state your capstone or experience..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Introduction / Note to Hiring Manager
                  </label>
                  <textarea
                    rows={3}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Why this role fits your career focus..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? 'Submitting Application...' : 'Submit Application'}
                </button>

                <p className="text-[10px] text-slate-400 text-center leading-tight">
                  Rule AC-09: One application per job. Career assistance and introductions provided; no guarantee of employment.
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

