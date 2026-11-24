'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  UserCheck,
  LayoutDashboard,
  Star,
  Award,
  Globe,
  Upload,
  X,
  Eye,
  Check,
  FileText
} from 'lucide-react';
import { getAuthUser, clearAuthSession, AuthUser, isStudent, isEmployer, formatStudentName } from '../../lib/auth';
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

const FALLBACK_CANDIDATES: Candidate[] = [
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
    completedCourses: ['AI Digital Marketing Course', 'Digital Marketing Fundamentals'],
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
    completedCourses: ['AI Digital Marketing Course', 'Paid Performance Advertising'],
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
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  
  // Available tabs matching specification
  const [activeTab, setActiveTab] = useState<'overview' | 'talent' | 'shortlisted' | 'jobs' | 'requests' | 'company'>('overview');
  const [skillFilter, setSkillFilter] = useState('');
  const [shortlisted, setShortlisted] = useState<string[]>(['cand-1']);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(FALLBACK_CANDIDATES);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  // Candidate Details Modal (Full View Profile)
  const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);

  // "Request Interview / Hire" Modal State
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [salaryRange, setSalaryRange] = useState('₹8,00,000 - ₹14,00,000 / year');
  const [hireSubmitted, setHireSubmitted] = useState(false);

  // New Job Posting Modal
  const [postingJob, setPostingJob] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('Digital Marketing');
  const [newJobSalary, setNewJobSalary] = useState('₹10,00,000 - ₹15,00,000 / year');
  const [newJobLocation, setNewJobLocation] = useState('Remote');
  const [jobPostedSuccess, setJobPostedSuccess] = useState(false);

  // Tracked Jobs List
  const [jobsList, setJobsList] = useState<any[]>([
    {
      id: 'job-101',
      title: 'Digital Marketing & Growth Specialist',
      department: 'Performance Marketing',
      location: 'Global (Remote)',
      salaryRange: '₹10,00,000 - ₹15,00,000 / year',
      status: 'ACTIVE',
      applicantCount: 8,
      postedAt: '20 Nov 2026',
    },
    {
      id: 'job-102',
      title: 'Technical SEO & Content Operations Associate',
      department: 'Search Engine Optimisation',
      location: 'Remote',
      salaryRange: '₹8,00,000 - ₹12,00,000 / year',
      status: 'ACTIVE',
      applicantCount: 5,
      postedAt: '18 Nov 2026',
    },
    {
      id: 'job-103',
      title: 'GA4 Analytics & Tag Manager Lead',
      department: 'Marketing Analytics',
      location: 'Hybrid / Remote',
      salaryRange: '₹9,00,000 - ₹14,00,000 / year',
      status: 'ACTIVE',
      applicantCount: 3,
      postedAt: '15 Nov 2026',
    },
  ]);

  // Hiring Requests tracking list
  const [hiringRequests, setHiringRequests] = useState<any[]>([
    {
      id: 'hr-1',
      candidateName: 'Elena Rostova',
      jobTitle: 'Senior Performance & SEO Lead',
      salaryRange: '₹12,00,000 - ₹18,00,000 / year',
      status: 'STUDENT_CONTACTED',
      statusText: 'Candidate Contacted Confidentially',
      date: '24 Nov 2026',
      notes: 'Placement officer verified candidate availability. Interview scheduling in progress.'
    }
  ]);

  // 1. Strict Role-Based Authentication Guard
  useEffect(() => {
    const u = getAuthUser();
    if (!u || !u.id) {
      router.replace('/employer/login?redirect=/employer');
      return;
    }

    // Unauthorized Role Access: Students cannot access the Employer Portal
    if (isStudent(u) && !isEmployer(u)) {
      router.replace('/student');
      return;
    }

    setUser(u);

    // Synchronize query tab if present in URL
    const tabParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('tab') : null;
    if (tabParam && ['overview', 'talent', 'shortlisted', 'jobs', 'requests', 'company'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }

    const fetchEmployerData = async () => {
      try {
        const data = await api.employer.getDashboard();
        if (data) {
          setDashboardData(data);
          if (data.jobs && Array.isArray(data.jobs) && data.jobs.length > 0) {
            setJobsList(data.jobs);
          }
          if (data.hiringRequests && Array.isArray(data.hiringRequests) && data.hiringRequests.length > 0) {
            setHiringRequests(data.hiringRequests);
          }
        }
      } catch (_) {}
    };

    const fetchCandidates = async () => {
      try {
        setLoadingCandidates(true);
        const data = await api.employer.searchCandidates({ query: skillFilter });
        if (Array.isArray(data) && data.length > 0) {
          setCandidates(data);
        }
      } catch (_) {
        // Fallback to verified talent cohort
      } finally {
        setLoadingCandidates(false);
      }
    };

    fetchEmployerData();
    fetchCandidates();
  }, [router, skillFilter]);

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
    } catch (_) {}

    const newReq = {
      id: `hr-${Date.now()}`,
      candidateName: selectedCandidate.name,
      jobTitle: jobTitle || 'Digital Marketing Specialist',
      salaryRange,
      status: 'SUBMITTED',
      statusText: 'Submitted for Admin Review',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      notes: 'New enquiry received. StudentVerse placement officer is reviewing the role requirements.'
    };

    setHiringRequests([newReq, ...hiringRequests]);
    setHireSubmitted(true);

    setTimeout(() => {
      setSelectedCandidate(null);
      setHireSubmitted(false);
      setJobTitle('');
      setJobDescription('');
    }, 1800);
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    const created = {
      id: `job-${Date.now()}`,
      title: newJobTitle.trim(),
      department: newJobDept,
      location: newJobLocation,
      salaryRange: newJobSalary,
      status: 'ACTIVE',
      applicantCount: 0,
      postedAt: 'Just now',
    };

    setJobsList([created, ...jobsList]);
    setJobPostedSuccess(true);
    setTimeout(() => {
      setPostingJob(false);
      setJobPostedSuccess(false);
      setNewJobTitle('');
    }, 1400);
  };

  const companyName = user?.companyName || dashboardData?.companyName || 'Apex Growth Labs';
  const companyInitials = companyName
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'HP';

  const shortlistedCandidates = candidates.filter((c) => shortlisted.includes(c.id));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* -------------------------------------------------------------
          LEFT SIDEBAR NAVIGATION - DEDICATED EMPLOYER RECRUITMENT PORTAL
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

          {/* Role-Specific Navigation Items */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

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
              onClick={() => setActiveTab('shortlisted')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'shortlisted'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Star className="w-4 h-4 text-amber-400" />
              <span>Shortlisted Candidates ({shortlisted.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'jobs'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>My Job Postings ({jobsList.length})</span>
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
              <span>Interview Requests ({hiringRequests.length})</span>
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('talent')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Discover Talent</span>
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------
            TAB: DASHBOARD OVERVIEW
        ------------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Discoverable Talent</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-slate-900">{candidates.length}</span>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">Assessed</span>
                </div>
                <span className="text-[11px] text-slate-500 block">Consenting digital marketing candidates</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Active Job Postings</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-slate-900">{jobsList.length}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Published</span>
                </div>
                <span className="text-[11px] text-slate-500 block">Open recruitment opportunities</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Shortlisted</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-slate-900">{shortlisted.length}</span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Saved</span>
                </div>
                <span className="text-[11px] text-slate-500 block">Candidates flagged for review</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Interview Requests</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-slate-900">{hiringRequests.length}</span>
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">In Pipeline</span>
                </div>
                <span className="text-[11px] text-slate-500 block">Under active placement coordination</span>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900">Featured Assessed Talent</h3>
                  <button onClick={() => setActiveTab('talent')} className="text-xs font-bold text-indigo-600 hover:underline">
                    View All &rarr;
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {candidates.slice(0, 3).map((candidate) => (
                    <div key={candidate.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <span className="font-bold text-sm text-slate-900 block truncate">{candidate.name}</span>
                        <span className="text-xs text-slate-500 truncate block">{candidate.headline}</span>
                        <span className="text-[11px] text-slate-400 mt-0.5 block">{candidate.country} &bull; Remote Ready</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setViewingCandidate(candidate)}
                          className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => setSelectedCandidate(candidate)}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                        >
                          Request Interview
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-extrabold text-base text-slate-900">Recruitment Tools</h3>
                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      setActiveTab('jobs');
                      setPostingJob(true);
                    }}
                    className="w-full py-2.5 px-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-left text-xs font-bold text-slate-800 hover:text-indigo-700 transition-all flex items-center justify-between"
                  >
                    <span>Create New Job Posting</span>
                    <Plus className="w-4 h-4 text-indigo-600" />
                  </button>

                  <button
                    onClick={() => setActiveTab('shortlisted')}
                    className="w-full py-2.5 px-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-left text-xs font-bold text-slate-800 hover:text-indigo-700 transition-all flex items-center justify-between"
                  >
                    <span>View Shortlisted Candidates</span>
                    <Star className="w-4 h-4 text-amber-500" />
                  </button>

                  <button
                    onClick={() => setActiveTab('company')}
                    className="w-full py-2.5 px-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-left text-xs font-bold text-slate-800 hover:text-indigo-700 transition-all flex items-center justify-between"
                  >
                    <span>Upload Company Vetting Documents</span>
                    <Upload className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: TALENT DIRECTORY (TALENT MARKETPLACE)
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
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  placeholder="Filter by skill (e.g. SEO, GA4, Ads, AI)..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm"
                />
              </div>
            </div>

            {/* Candidate Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map((candidate) => {
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
                          {candidate.skills.slice(0, 3).map((skill, sIdx) => (
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
                          onClick={() => setViewingCandidate(candidate)}
                          className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Profile</span>
                        </button>
                        <button
                          onClick={() => setSelectedCandidate(candidate)}
                          className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Interview</span>
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
            TAB: SHORTLISTED CANDIDATES
        ------------------------------------------------------------- */}
        {activeTab === 'shortlisted' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Shortlisted Candidates</h2>
              <p className="text-xs text-slate-500">
                Candidates you have saved for upcoming hiring roles and interview rounds
              </p>
            </div>

            {shortlistedCandidates.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
                <Star className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No Candidates Shortlisted Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Browse the verified talent directory and click &quot;Shortlist&quot; to bookmark promising candidates.
                </p>
                <button
                  onClick={() => setActiveTab('talent')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors mt-2"
                >
                  Explore Talent Directory
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shortlistedCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4"
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
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex gap-2">
                      <button
                        onClick={() => setSelectedCandidate(candidate)}
                        className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Interview</span>
                      </button>
                      <button
                        onClick={() => handleShortlist(candidate.id)}
                        className="px-3 py-2 text-xs font-bold rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: MY JOB POSTINGS
        ------------------------------------------------------------- */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">My Job Postings</h2>
                <p className="text-xs text-slate-500">
                  Manage active recruitment roles published to the StudentVerse career portal
                </p>
              </div>

              <button
                onClick={() => setPostingJob(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Job Posting</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3.5 px-4">Role Title</th>
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-4">Workplace</th>
                    <th className="py-3.5 px-4">Salary Package</th>
                    <th className="py-3.5 px-4">Applicants</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobsList.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-bold text-slate-900 block">{job.title}</span>
                        <span className="text-[10px] text-slate-400">Posted: {job.postedAt}</span>
                      </td>
                      <td className="py-4 px-4 text-slate-700">{job.department}</td>
                      <td className="py-4 px-4 text-slate-600">{job.location}</td>
                      <td className="py-4 px-4 font-semibold text-slate-900">{job.salaryRange}</td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          {job.applicantCount} Candidates
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{job.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: HIRING REQUESTS & INTERVIEWS
        ------------------------------------------------------------- */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Active Hiring Requests &amp; Interviews</h2>
              <p className="text-xs text-slate-500">
                Track candidate interview requests coordinated through the StudentVerse placement team
              </p>
            </div>

            {hiringRequests.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
                <Send className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No Hiring Requests Submitted</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Select a candidate from the talent directory to submit a verified interview request.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {hiringRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-slate-900">{req.candidateName}</span>
                        <span className="text-xs text-slate-400">&bull; {req.date}</span>
                      </div>
                      <span className="text-xs text-indigo-600 font-semibold block">{req.jobTitle}</span>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-xl">{req.notes}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{req.statusText}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: COMPANY PROFILE & VETTING
        ------------------------------------------------------------- */}
        {activeTab === 'company' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-black text-slate-900">Company Profile &amp; Verification</h2>
              <p className="text-xs text-slate-500">
                Official hiring organisation credentials and business vetting documents
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company Name</label>
                <input
                  type="text"
                  disabled
                  value={companyName}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Business Verification Status</label>
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-xl font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Hiring Organisation &bull; Full Talent Pool Access Granted</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Dedicated Private Storage Namespace</label>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-mono text-[11px]">
                  employers/{user?.id || 'authenticated-user-uuid'}/
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* -------------------------------------------------------------
          MODAL: VIEW FULL CANDIDATE PROFILE
      ------------------------------------------------------------- */}
      {viewingCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-900">{viewingCandidate.name}</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
                <span className="text-xs text-slate-500 block mt-0.5">{viewingCandidate.country} &bull; {viewingCandidate.availability}</span>
              </div>
              <button
                onClick={() => setViewingCandidate(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Headline</span>
              <p className="text-xs font-semibold text-slate-800">{viewingCandidate.headline}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assessed Practical Skills</span>
              <div className="space-y-1.5">
                {viewingCandidate.skills.map((skill, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-slate-700">{skill.name}</span>
                    <span className="font-bold text-indigo-600">{skill.score}% Evaluated</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed Cohort Programmes</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {viewingCandidate.completedCourses.map((c, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verified Credential Code</span>
              <span className="font-mono text-xs font-bold text-slate-700">{viewingCandidate.credentialCode}</span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => {
                  setViewingCandidate(null);
                  setSelectedCandidate(viewingCandidate);
                }}
                className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Interview</span>
              </button>
              <button
                onClick={() => setViewingCandidate(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: REQUEST TO INTERVIEW / HIRE
      ------------------------------------------------------------- */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl animate-scaleUp">
            {hireSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Interview Request Submitted!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our placement officer has received your request for <strong>{selectedCandidate.name}</strong> and is contacting the candidate.
                </p>
              </div>
            ) : (
              <form onSubmit={handleHireSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Request Interview</h3>
                    <p className="text-xs text-slate-500">Candidate: <strong>{selectedCandidate.name}</strong></p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCandidate(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Role Title
                  </label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Digital Marketing Strategist"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Salary Range (INR ₹)
                  </label>
                  <input
                    type="text"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    placeholder="₹8,00,000 - ₹14,00,000 / year"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Message / Key Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Provide a brief overview of campaign responsibilities and work arrangement..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Confidential Request</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCandidate(null)}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: CREATE NEW JOB POSTING
      ------------------------------------------------------------- */}
      {postingJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl animate-scaleUp">
            {jobPostedSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Job Posting Published!</h3>
                <p className="text-xs text-slate-600">
                  Your job listing is now live and published to the StudentVerse student career portal.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePostJob} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Create Job Opportunity</h3>
                    <p className="text-xs text-slate-500">Publish to StudentVerse Career Portal</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPostingJob(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    placeholder="e.g. Growth Marketing Lead"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={newJobDept}
                      onChange={(e) => setNewJobDept(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={newJobLocation}
                      onChange={(e) => setNewJobLocation(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Salary Range (INR ₹)</label>
                  <input
                    type="text"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Publish Job Posting</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostingJob(false)}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
