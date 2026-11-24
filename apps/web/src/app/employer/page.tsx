'use client';

import React, { useState, useEffect } from 'react';
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
import { getAuthUser, clearAuthSession, AuthUser } from '../../lib/auth';
import { api } from '../../lib/api';

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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState<'talent' | 'requests' | 'company'>('talent');
  const [skillFilter, setSkillFilter] = useState('');
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);

  // "Request to Hire" Modal State
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [salaryRange, setSalaryRange] = useState('₹8,00,000 - ₹14,00,000 / year');
  const [hireSubmitted, setHireSubmitted] = useState(false);

  // Hiring Requests tracking list
  const [hiringRequests, setHiringRequests] = useState<any[]>([]);

  useEffect(() => {
    const u = getAuthUser();
    setUser(u);

    const fetchEmployerData = async () => {
      try {
        const data = await api.employer.getDashboard();
        if (data) {
          setDashboardData(data);
          if (data.hiringRequests && Array.isArray(data.hiringRequests)) {
            setHiringRequests(data.hiringRequests);
          }
        }
      } catch (err) {
        // Fallback demo request if mock user
        if (u?.email === 'employer@studentverse.com') {
          setHiringRequests([
            {
              id: 'hr-demo-1',
              candidateName: 'Elena Rostova',
              jobTitle: 'Senior Performance & SEO Lead',
              salaryRange: '₹12,00,000 - ₹18,00,000 / year',
              status: 'STUDENT_CONTACTED',
              statusText: 'Candidate Contacted Confidentially',
              date: '14 Nov 2026',
              notes: 'Student contacted by StudentVerse Placement Team. Elena confirmed interest. Interview scheduling in progress.'
            }
          ]);
        }
      }
    };

    fetchEmployerData();
  }, []);

  const handleShortlist = (id: string) => {
    if (shortlisted.includes(id)) {
      setShortlisted(shortlisted.filter((x) => x !== id));
    } else {
      setShortlisted([...shortlisted, id]);
    }
  };

  const handleHireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    try {
      await api.employer.createHiringRequest({
        candidateId: selectedCandidate.id,
        candidateName: selectedCandidate.name,
        jobTitle: jobTitle || 'Digital Marketing Specialist',
        jobDescription,
        salaryRange,
      });
    } catch (e) {}

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

  const companyName = user?.companyName || dashboardData?.companyName || 'Hiring Partner';
  const companyInitials = companyName
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'HP';

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
              {companyInitials}
            </div>
            <div className="overflow-hidden">
              <span className="font-bold text-xs text-white block truncate">{companyName}</span>
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
            className="w-full flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 px-3 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* -------------------------------------------------------------
          MAIN CONTENT VIEWPORT
      ------------------------------------------------------------- */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">
                {companyName}
              </h1>
              <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Vetted Partner
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Search assessed students, review practical task deliverables &amp; submit confidential hiring requests
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl font-medium">
              Currency: <strong>INR (₹)</strong>
            </span>
          </div>
        </div>

        {/* -------------------------------------------------------------
            TAB: TALENT DIRECTORY
        ------------------------------------------------------------- */}
        {activeTab === 'talent' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Verified Talent Directory</h2>
                <p className="text-xs text-slate-500">
                  Every candidate is evaluated through real-world client briefs using our 40/30/20/10 rubric
                </p>
              </div>

              {/* Search filter */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  placeholder="Filter by skill (e.g. SEO, GA4, Ads)..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm"
                />
              </div>
            </div>

            {/* Candidate Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate) => {
                const isShortlisted = shortlisted.includes(candidate.id);
                return (
                  <div
                    key={candidate.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                            {candidate.name}
                          </h3>
                          <span className="text-xs text-slate-500 block mt-0.5">{candidate.country}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-indigo-600">{candidate.overallScore}</span>
                          <span className="text-[10px] text-slate-400 font-bold block">/ 100</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {candidate.headline}
                      </p>

                      {/* Verified skills pills */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          Evaluated Skill Ratings:
                        </span>
                        <div className="space-y-1.5">
                          {candidate.skills.map((skill, sIdx) => (
                            <div key={sIdx} className="flex justify-between items-center text-[11px]">
                              <span className="text-slate-700 font-medium">{skill.name}</span>
                              <span className="font-bold text-indigo-600">{skill.score}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Availability: <strong>{candidate.availability}</strong></span>
                        <span className="text-emerald-600 font-bold">Remote Ready</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedCandidate(candidate)}
                          className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Request to Hire</span>
                        </button>
                        <button
                          onClick={() => handleShortlist(candidate.id)}
                          className={`px-3 py-2 text-xs font-bold rounded-xl border transition-colors ${
                            isShortlisted
                              ? 'bg-amber-50 border-amber-300 text-amber-700'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {isShortlisted ? 'Saved' : 'Shortlist'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: HIRING REQUESTS
        ------------------------------------------------------------- */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Active Hiring Requests</h2>
              <p className="text-xs text-slate-500">
                Track candidates you have requested to interview through the StudentVerse placement team
              </p>
            </div>

            {hiringRequests.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
                <Send className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No Hiring Requests Submitted</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Browse the verified talent directory to review assessed student deliverables and submit interview requests.
                </p>
                <button
                  onClick={() => setActiveTab('talent')}
                  className="mt-2 px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Discover Talent
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {hiringRequests.map((req) => (
                  <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                          {req.statusText || req.status}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-1">
                          Role: {req.jobTitle} &bull; Candidate: {req.candidateName}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">Submitted: {req.date}</span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <p>Target Compensation: <strong>{req.salaryRange}</strong></p>
                      <p className="text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                        Placement Note: &ldquo;{req.notes}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: COMPANY PROFILE
        ------------------------------------------------------------- */}
        {activeTab === 'company' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Verified Employer Profile</h2>
                <p className="text-xs text-slate-500">Corporate vetting credentials &amp; active hiring partner tracks</p>
              </div>
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Vetted Business Entity</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company Name</label>
                <input
                  type="text"
                  readOnly
                  value={companyName}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Account Contact Email</label>
                <input
                  type="text"
                  readOnly
                  value={user?.email || 'employer@studentverse.com'}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Official Website</label>
                <input
                  type="text"
                  readOnly
                  value={dashboardData?.website || 'https://studentverse.com'}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Country / HQ</label>
                <input
                  type="text"
                  readOnly
                  value={user?.country || dashboardData?.country || 'India'}
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
                      placeholder="₹8,00,000 - ₹15,00,000 / year"
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
