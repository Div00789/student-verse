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
  Plus,
  Send,
  SlidersHorizontal,
  FileCheck2,
  TrendingUp,
  Clock,
  Layers,
  LogOut,
  Mail,
  UserCheck
} from 'lucide-react';
import { clearAuthSession } from '../../lib/auth';

interface Candidate {
  id: string;
  name: string;
  headline: string;
  country: string;
  overallScore: number;
  skills: { name: string; score: number }[];
  completedCourses: string[];
  credentialCode: string;
  portfolioUrl: string;
  remote: boolean;
  availability: string;
}

const CANDIDATES_DATA: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Elena Rostova',
    headline: 'Certified Digital Performance Marketer & SEO Specialist',
    country: 'Poland (UTC+1)',
    overallScore: 94,
    skills: [
      { name: 'Technical SEO & AEO', score: 96 },
      { name: 'Google Analytics 4', score: 93 },
      { name: 'Meta Ads', score: 92 },
      { name: 'Omnichannel Strategy', score: 95 }
    ],
    completedCourses: ['Digital Marketing Fundamentals', 'Search Engine Optimisation & AEO'],
    credentialCode: 'SV-2026-DM-849201',
    portfolioUrl: 'https://github.com/elena-marketing/seo-audit-showcase',
    remote: true,
    availability: 'Immediate'
  },
  {
    id: 'cand-2',
    name: 'Alex Morgan',
    headline: 'Growth & Performance Acquisition Marketer',
    country: 'United Kingdom (UTC+0)',
    overallScore: 91,
    skills: [
      { name: 'Omnichannel Strategy', score: 93 },
      { name: 'Paid Media & Google Ads', score: 90 },
      { name: 'CRO Funnel Design', score: 91 },
      { name: 'Analytics & GA4', score: 89 }
    ],
    completedCourses: ['Digital Marketing Fundamentals', 'Paid Performance Advertising'],
    credentialCode: 'SV-2026-DM-772910',
    portfolioUrl: 'https://github.com/alexmorgan-growth/portfolio',
    remote: true,
    availability: '2 Weeks Notice'
  },
  {
    id: 'cand-3',
    name: 'Marcus Chen',
    headline: 'Analytics & Marketing Automation Specialist',
    country: 'Singapore (UTC+8)',
    overallScore: 89,
    skills: [
      { name: 'GA4 & Tag Manager', score: 94 },
      { name: 'Looker Studio BI', score: 91 },
      { name: 'AI Marketing Prompting', score: 88 }
    ],
    completedCourses: ['Marketing Analytics, GA4 & GTM', 'AI Tools & Automation'],
    credentialCode: 'SV-2026-GA-992102',
    portfolioUrl: 'https://portfolio.marcuschen-analytics.dev',
    remote: true,
    availability: 'Immediate'
  }
];

export default function EmployerPortalPage() {
  const [activeTab, setActiveTab] = useState<'talent' | 'requests' | 'company'>('talent');
  const [isVerified, setIsVerified] = useState(true);
  const [skillFilter, setSkillFilter] = useState('');
  const [shortlisted, setShortlisted] = useState<string[]>(['cand-1']);

  // "Request to Hire" Modal State
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [salaryRange, setSalaryRange] = useState('$55,000 - $70,000 USD');
  const [hireSubmitted, setHireSubmitted] = useState(false);

  // Hiring Requests tracking list
  const [hiringRequests, setHiringRequests] = useState([
    {
      id: 'hr-demo-1',
      candidateName: 'Elena Rostova',
      jobTitle: 'Senior Performance & SEO Lead',
      salaryRange: '$65,000 - $80,000 USD',
      status: 'STUDENT_CONTACTED',
      statusText: 'Candidate Contacted Confidentially',
      date: '14 Nov 2026',
      notes: 'Student contacted by StudentVerse Placement Team. Elena confirmed interest. Interview scheduling in progress.'
    }
  ]);

  const handleShortlist = (id: string) => {
    if (shortlisted.includes(id)) {
      setShortlisted(shortlisted.filter((x) => x !== id));
    } else {
      setShortlisted([...shortlisted, id]);
    }
  };

  const handleHireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    const newReq = {
      id: `hr-${Date.now()}`,
      candidateName: selectedCandidate.name,
      jobTitle: jobTitle || 'Digital Marketing Specialist',
      salaryRange,
      status: 'SUBMITTED',
      statusText: 'Submitted for Admin Review',
      date: 'Today',
      notes: 'New enquiry received. StudentVerse placement officer is reviewing the role requirements.'
    };

    setHiringRequests([newReq, ...hiringRequests]);
    setHireSubmitted(true);

    setTimeout(() => {
      setSelectedCandidate(null);
      setHireSubmitted(false);
      setJobTitle('');
      setJobDescription('');
    }, 2200);
  };

  const filteredCandidates = CANDIDATES_DATA.filter((c) =>
    skillFilter === ''
      ? true
      : c.skills.some((s) => s.name.toLowerCase().includes(skillFilter.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* -------------------------------------------------------------
          LEFT SIDEBAR NAVIGATION
      ------------------------------------------------------------- */}
      <aside className="w-full md:w-64 bg-slate-950 text-slate-300 flex-shrink-0 flex flex-col justify-between p-4 md:min-h-screen border-r border-slate-900">
        <div>
          {/* Brand header */}
          <div className="flex items-center gap-3 px-3 py-4 border-b border-slate-800 mb-4">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white font-black text-lg shadow-md">
              SV
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block">
                Student<span className="text-indigo-400">Verse</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block -mt-0.5">
                Employer Hiring Portal
              </span>
            </div>
          </div>

          {/* Company Quick Badge */}
          <div className="px-3 py-3 bg-slate-900 rounded-xl mb-6 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow">
              AG
            </div>
            <div className="overflow-hidden">
              <span className="font-bold text-xs text-white block truncate">Apex Growth Labs</span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Business Verified
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('talent')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'talent'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Discover Talent</span>
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'requests'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Hiring Requests ({hiringRequests.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('company')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'company'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Company Profile &amp; Vetting</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-900 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg transition-colors"
          >
            <span>Public Website</span>
          </Link>
          <button
            onClick={() => {
              clearAuthSession();
              window.location.href = '/employer/login';
            }}
            className="w-full flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 px-3 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* -------------------------------------------------------------
          MAIN VIEWPORT
      ------------------------------------------------------------- */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">Apex Growth Labs Workspace</h1>
              <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Hiring Partner
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Search assessed candidates who have consented to employer discovery. Contact details remain confidential until mutually confirmed.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Shortlisted:</span>
            <span className="text-xs font-black bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-200">
              {shortlisted.length} Candidates
            </span>
          </div>
        </div>

        {/* -------------------------------------------------------------
            TAB: DISCOVER TALENT
        ------------------------------------------------------------- */}
        {activeTab === 'talent' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  placeholder="Filter by skill (e.g. SEO, GA4, Meta Ads)..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 w-full sm:w-auto justify-end">
                <span>Showing <strong>{filteredCandidates.length}</strong> assessed candidates</span>
              </div>
            </div>

            {/* Candidate Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((cand) => {
                const isShort = shortlisted.includes(cand.id);

                return (
                  <div
                    key={cand.id}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-4">
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-extrabold text-slate-900">{cand.name}</h3>
                          <span className="text-xs text-slate-500 block">{cand.country}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Score</span>
                          <span className="text-lg font-black text-indigo-600">{cand.overallScore}%</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {cand.headline}
                      </p>

                      {/* Evaluated Skills Matrix */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          Verified Skill Rubrics
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cand.skills.map((s, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded"
                            >
                              {s.name} ({s.score}%)
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Verifiable Credential */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-indigo-700 font-semibold text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{cand.credentialCode}</span>
                        </div>
                        <Link
                          href={`/certifications/verify/${cand.credentialCode}`}
                          target="_blank"
                          className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-0.5"
                        >
                          Verify <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        <span>Availability: <strong>{cand.availability}</strong></span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-5 border-t border-slate-100 flex items-center gap-2 mt-4">
                      <button
                        onClick={() => handleShortlist(cand.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                          isShort
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {isShort ? 'Shortlisted' : 'Shortlist'}
                      </button>

                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Request to Hire
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: HIRING REQUESTS (INTERMEDIATED WORKFLOW)
        ------------------------------------------------------------- */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Platform-Mediated Hiring Enquiries</h2>
              <p className="text-xs text-slate-500">
                Track status updates as our placement team reviews roles, contacts candidates, and coordinates interviews
              </p>
            </div>

            <div className="space-y-4">
              {hiringRequests.map((req) => (
                <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded">
                        Status: {req.statusText}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 mt-1">
                        Candidate: {req.candidateName} &bull; Role: {req.jobTitle}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400">{req.date}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <strong>Placement Coordinator Update:</strong> {req.notes}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>Proposed Compensation: <strong>{req.salaryRange}</strong></span>
                    <span className="text-[11px] font-bold text-indigo-600">ID: {req.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: COMPANY PROFILE
        ------------------------------------------------------------- */}
        {activeTab === 'company' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-slate-900">Organisation Vetting Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company Name</label>
                <input
                  type="text"
                  readOnly
                  value="Apex Growth Labs"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Official Website</label>
                <input
                  type="text"
                  readOnly
                  value="https://apexgrowth.example.com"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Verification Status</label>
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approved &bull; Vetted Business Entity</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Active Hiring Track</label>
                <input
                  type="text"
                  readOnly
                  value="Digital Marketing & Omnichannel Performance"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            MODAL: REQUEST TO HIRE
        ------------------------------------------------------------- */}
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Request to Hire Candidate</h3>
                  <span className="text-xs text-indigo-600 font-bold">{selectedCandidate.name}</span>
                </div>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Close
                </button>
              </div>

              {hireSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Hiring Enquiry Received</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    StudentVerse placement officers have received your request for <strong>{selectedCandidate.name}</strong>. We will review the job criteria, privately contact the student, and coordinate the introduction.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHireSubmit} className="space-y-4">
                  <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-[11px] text-indigo-900 leading-relaxed">
                    <strong>Intermediary Protection:</strong> Candidate contact details remain private. StudentVerse manages student outreach to ensure verified role alignment and prevent spam.
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Job Title / Vacancy</label>
                    <input
                      type="text"
                      required
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior Digital Marketing Specialist"
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role Description &amp; Scope</label>
                    <textarea
                      required
                      rows={3}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Summarize key responsibilities, campaign targets, and expected day-to-day work..."
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Compensation / Salary Range</label>
                    <input
                      type="text"
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      placeholder="$50,000 - $70,000 USD / year"
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedCandidate(null)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow"
                    >
                      Submit Hiring Enquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
