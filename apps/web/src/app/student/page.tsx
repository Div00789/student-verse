'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  BookOpen,
  Award,
  Lock,
  Globe,
  CheckCircle2,
  PlayCircle,
  Upload,
  ExternalLink,
  ShieldCheck,
  FileCheck2,
  Calendar as CalendarIcon,
  Video,
  Clock,
  Briefcase,
  Layers,
  Bell,
  User,
  LogOut,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Building2,
  FileText,
  Compass,
  Check,
  AlertCircle,
  CreditCard,
  Loader2
} from 'lucide-react';
import { getAuthUser, updateAuthUser, clearAuthSession, AuthUser, formatStudentName, isStudent, isEmployer } from '../../lib/auth';
import { formatINR } from '../../lib/currency';
import { api } from '../../lib/api';

const ALL_EXPLORE_COURSES = [
  {
    slug: 'ai-digital-marketing-course',
    title: 'AI Digital Marketing Course',
    subtitle: 'Comprehensive 14-Module Professional Programme: SEO, PPC, GA4, Paid Media, Automation & Modern AI Tools',
    category: 'Digital Marketing / Artificial Intelligence',
    durationHours: 48,
    totalSessions: 16,
    modulesCount: 14,
    level: 'Beginner to Advanced',
    originalPrice: 37499,
    discountPercent: 20,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    description: 'Master digital marketing with artificial intelligence through hands-on training in SEO, Google Ads, GA4, Paid Social Media, Email Marketing, Content Marketing, Marketing Automation, Affiliate Marketing, and Freelancing.',
    trainerName: 'StudentVerse Expert Faculty'
  },
  {
    slug: 'digital-marketing-foundations',
    title: 'Digital Marketing Fundamentals & Omnichannel Strategy',
    subtitle: '100% Live Instructor-Led Cohort on Acquisition Funnels, Strategy & Multi-Touch Conversion',
    category: 'Digital Marketing',
    durationHours: 36,
    totalSessions: 12,
    modulesCount: 2,
    level: 'Beginner',
    originalPrice: 29999,
    discountPercent: 15,
    price: 24999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    description: 'Master practical digital marketing strategy through real-time instructor guidance. Build end-to-end customer acquisition funnels, plan multi-channel campaigns, execute content schedules, and measure performance metrics.',
    trainerName: 'Marcus Vance'
  },
  {
    slug: 'seo-and-ai-search-optimization',
    title: 'Search Engine Optimisation (SEO) & AI Search / AEO',
    subtitle: '100% Live Masterclass in Technical Audits, Keyword Architecture & Answer Engine Optimisation',
    category: 'Search Engine Optimisation',
    durationHours: 32,
    totalSessions: 10,
    modulesCount: 2,
    level: 'Intermediate',
    originalPrice: 39999,
    discountPercent: 25,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?w=800&auto=format&fit=crop&q=60',
    description: 'Learn modern search mechanics beyond basic keywords. Conduct technical site audits, build topical clusters, optimize for Google Search Console, and master Answer Engine Optimisation (AEO).',
    trainerName: 'Elena Rostova'
  },
  {
    slug: 'paid-performance-google-meta-ads',
    title: 'Paid Performance Advertising (Google Ads & Meta Ads)',
    subtitle: '100% Live Cohort on Bidding Strategies, Conversion APIs, Creative Strategy & ROI',
    category: 'Paid Advertising',
    durationHours: 36,
    totalSessions: 12,
    modulesCount: 2,
    level: 'Intermediate',
    originalPrice: 44999,
    discountPercent: 20,
    price: 35999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    description: 'Master high-volume paid media buying. Set up Google Search and Performance Max campaigns, architect Meta Ads creative testing frameworks, configure Server-Side Conversion APIs, and optimize ad spend.',
    trainerName: 'David Zhao'
  },
  {
    slug: 'analytics-ga4-google-tag-manager',
    title: 'Marketing Analytics, GA4 & Google Tag Manager',
    subtitle: '100% Live Practical Workshop on Custom Events, DataLayers, UTMs & Looker Dashboards',
    category: 'Analytics & Tracking',
    durationHours: 30,
    totalSessions: 10,
    modulesCount: 2,
    level: 'Intermediate',
    originalPrice: 32999,
    discountPercent: 25,
    price: 24999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=60',
    description: 'Stop guessing which marketing channels work. Master Google Tag Manager dataLayers, configure custom GA4 conversion events, implement cross-domain tracking, and build interactive client-facing dashboards.',
    trainerName: 'Priya Sharma'
  },
  {
    slug: 'social-media-marketing-strategy',
    title: 'Social Media Marketing & Content Strategy',
    subtitle: '100% Live Cohort on Organic Distribution, Content Calendars, Brand Voice & Community',
    category: 'Social Media Marketing',
    durationHours: 28,
    totalSessions: 10,
    modulesCount: 1,
    level: 'Beginner',
    originalPrice: 24999,
    discountPercent: 20,
    price: 19999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
    description: 'Build organic social media systems that drive revenue. Learn platform-specific distribution across LinkedIn, Instagram, and YouTube, engineer high-engagement content calendars, and establish distinctive brand voice.',
    trainerName: 'Chloe Bennett'
  },
  {
    slug: 'ai-tools-for-digital-marketers',
    title: 'AI Tools & Automation for Digital Marketers',
    subtitle: '100% Live Training on Generative AI, Prompt Workflows, Content Automation & Productivity',
    category: 'AI for Digital Marketing',
    durationHours: 32,
    totalSessions: 10,
    modulesCount: 1,
    level: 'Intermediate',
    originalPrice: 39999,
    discountPercent: 25,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    description: 'Transform modern marketing operations using production AI workflows. Build customized prompt chains for campaign research, automate multi-lingual content variations, and integrate marketing automation triggers.',
    trainerName: 'Dr. Aris Thorne'
  }
];

export default function StudentPortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'courses' | 'purchases' | 'explore-courses' | 'live-classes' | 'recorded' | 'calendar' | 'assignments' | 'skills' | 'profile' | 'placement'
  >('overview');

  // Dynamic user data from API & Database - Truthful multi-user state
  const [enrolledCourseSlugs, setEnrolledCourseSlugs] = useState<string[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [purchasesData, setPurchasesData] = useState<any[]>([]);
  const [loadingDashboard, setLoadingDashboard] = useState<boolean>(true);
  const [loadingPurchases, setLoadingPurchases] = useState<boolean>(false);
  const [enrollSuccessMessage, setEnrollSuccessMessage] = useState<string | null>(null);

  const [talentVisibility, setTalentVisibility] = useState<'PRIVATE' | 'SEARCHABLE'>('PRIVATE');
  const [consentSavedNotice, setConsentSavedNotice] = useState(false);

  // Profile editing state
  const [editName, setEditName] = useState('');
  const [editHeadline, setEditHeadline] = useState('');
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Load genuine purchase history from database
  const loadPurchases = async () => {
    try {
      setLoadingPurchases(true);
      const res = await api.student.getPurchases();
      setPurchasesData(Array.isArray(res) ? res : []);
    } catch (_) {
      setPurchasesData([]);
    } finally {
      setLoadingPurchases(false);
    }
  };

  // Synchronize authenticated user and fetch live database records
  const loadDashboard = async (u: AuthUser | null) => {
    if (!u) {
      setLoadingDashboard(false);
      return;
    }

    try {
      setLoadingDashboard(true);
      const [data, purchases] = await Promise.all([
        api.student.getDashboard().catch(() => null),
        api.student.getPurchases().catch(() => []),
      ]);

      if (data) {
        setDashboardData(data);
        if (data.enrollments && Array.isArray(data.enrollments)) {
          const slugs = data.enrollments.map((e: any) => e.slug || e.courseSlug || e.course?.slug).filter(Boolean);
          setEnrolledCourseSlugs(slugs);
        } else {
          setEnrolledCourseSlugs([]);
        }
        setTalentVisibility(data.talentPoolOptIn ? 'SEARCHABLE' : 'PRIVATE');
      }

      if (Array.isArray(purchases)) {
        setPurchasesData(purchases);
      }
    } catch (err) {
      setEnrolledCourseSlugs([]);
      setPurchasesData([]);
    } finally {
      setLoadingDashboard(false);
    }
  };

  useEffect(() => {
    const authUser = getAuthUser();
    if (!authUser || !authUser.id) {
      router.replace('/student/login?redirect=/student');
      return;
    }

    // Role-based protection: Employers cannot access Student Portal
    if (isEmployer(authUser) && !isStudent(authUser)) {
      router.replace('/employer');
      return;
    }

    setUser(authUser);
    setEditName(authUser.fullName || '');
    setEditHeadline(authUser.headline || 'Student Learner');
    loadDashboard(authUser);
  }, [router]);

  const handleEnrollCourse = async (slug: string, courseTitle: string) => {
    try {
      const res = await api.student.enroll(slug);
      setEnrollSuccessMessage(res?.message || `Successfully enrolled in ${courseTitle}!`);
      setTimeout(() => {
        setEnrollSuccessMessage(null);
        setActiveTab('courses');
      }, 1500);

      if (user) {
        loadDashboard(user);
      }
    } catch (err: any) {
      alert(err?.message || 'Could not complete enrolment. Please try again.');
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    setIsSavingProfile(true);

    try {
      await api.auth.updateProfile({
        fullName: editName.trim(),
        headline: editHeadline.trim(),
      });
      updateAuthUser({
        fullName: formatStudentName(editName.trim()),
        headline: editHeadline.trim(),
      });
      setProfileSaveSuccess(true);
      setTimeout(() => setProfileSaveSuccess(false), 3000);
    } catch (err: any) {
      alert(err?.message || 'Failed to update profile.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const toggleVisibility = async () => {
    const next = talentVisibility === 'PRIVATE' ? 'SEARCHABLE' : 'PRIVATE';
    setTalentVisibility(next);
    try {
      await api.student.updateTalentPool(next === 'SEARCHABLE');
      setConsentSavedNotice(true);
      setTimeout(() => setConsentSavedNotice(false), 3500);
    } catch (_) {}
  };

  const displayName = formatStudentName(user?.fullName || (user?.email ? user.email.split('@')[0] : 'Student'));
  const userInitials = displayName
    ? displayName.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'SV';

  const enrolledCount = enrolledCourseSlugs.length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* -------------------------------------------------------------
          LEFT SIDEBAR NAVIGATION
      ------------------------------------------------------------- */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between p-4 md:min-h-screen">
        <div>
          {/* Brand header */}
          <div className="flex items-center gap-3 px-3 py-4 border-b border-slate-800 mb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md">
              SV
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block">
                Student<span className="text-indigo-400">Verse</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block -mt-0.5">
                Student Learning Portal
              </span>
            </div>
          </div>

          {/* Student Profile Quick Tile */}
          <div className="px-3 py-3 bg-slate-800/60 rounded-xl mb-6 border border-slate-700/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white font-black flex items-center justify-center text-sm shadow flex-shrink-0">
              {userInitials}
            </div>
            <div className="overflow-hidden min-w-0">
              <span className="font-bold text-xs text-white block truncate">{displayName}</span>
              <span className={`text-[11px] flex items-center gap-1 ${enrolledCount > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${enrolledCount > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                {enrolledCount > 0 ? `${enrolledCount} Active Cohort${enrolledCount > 1 ? 's' : ''}` : 'No Active Cohort'}
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'courses'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>My Enrolled Courses ({enrolledCount})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('purchases');
                loadPurchases();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'purchases'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>My Purchases &amp; Orders ({purchasesData.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('explore-courses')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'explore-courses'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Explore All Courses (INR)</span>
            </button>

            <button
              onClick={() => setActiveTab('live-classes')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'live-classes'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Video className="w-4 h-4 text-emerald-400" />
              <span>Live Classes &amp; Cohorts</span>
            </button>

            <button
              onClick={() => setActiveTab('recorded')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'recorded'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>Recorded Lectures</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'calendar'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Class Calendar</span>
            </button>

            <button
              onClick={() => setActiveTab('assignments')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'assignments'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-amber-400" />
              <span>Practical Assignments</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'skills'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Verified Skill Ratings</span>
            </button>

            <button
              onClick={() => setActiveTab('placement')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'placement'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>Placement &amp; Partners</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Career Profile</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public Portal</span>
          </Link>
          <button
            onClick={() => {
              clearAuthSession();
              window.location.href = '/student/login';
            }}
            className="w-full flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 px-3 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
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
              <h1 className="text-2xl font-black text-slate-900">Welcome, {displayName}</h1>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                enrolledCount > 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {enrolledCount > 0 ? `${enrolledCount} Active Cohort Enrolled` : 'Student Account'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Account Email: <strong className="text-slate-700">{user?.email}</strong> &bull; Country: <strong className="text-slate-700">{user?.country || 'India'}</strong> &bull; Authenticated Profile
            </p>
          </div>

          {/* Privacy Consent Opt-in Switch */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Employer Discovery Pool
              </span>
              <span className="text-xs font-bold text-slate-800">
                {talentVisibility === 'SEARCHABLE' ? 'Searchable by Employers' : 'Private (Opted Out)'}
              </span>
            </div>
            <button
              onClick={toggleVisibility}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                talentVisibility === 'SEARCHABLE' ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md" />
            </button>
          </div>
        </div>

        {consentSavedNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>Your employer talent visibility preference has been updated and securely recorded.</span>
          </div>
        )}

        {enrollSuccessMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{enrollSuccessMessage}</span>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: OVERVIEW
        ------------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Enrolled Courses</span>
                <span className="text-3xl font-black text-slate-900 mt-2 block">{enrolledCount}</span>
                <span className="text-[11px] text-indigo-600 font-semibold mt-1 block">Live &amp; Recorded Cohorts</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Assessed Skill Score</span>
                <span className="text-3xl font-black text-slate-900 mt-2 block">
                  {dashboardData?.overallSkillScore ? `${dashboardData.overallSkillScore}%` : 'N/A'}
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                  {dashboardData?.assessmentStatus === 'VERIFIED' ? 'Verified by Faculty' : 'Pending First Project'}
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Practical Tasks</span>
                <span className="text-3xl font-black text-slate-900 mt-2 block">
                  {dashboardData?.assignments?.length || 0}
                </span>
                <span className="text-[11px] text-amber-600 font-semibold mt-1 block">Assessed Portfolio Milestones</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Placement Status</span>
                <span className="text-sm font-black text-slate-900 mt-2 block truncate">
                  {talentVisibility === 'SEARCHABLE' ? 'Profile Discoverable' : 'Private Profile'}
                </span>
                <span className="text-[11px] text-indigo-600 font-semibold mt-1 block">Vetted Hiring Network</span>
              </div>
            </div>

            {/* Next Scheduled Live Class */}
            {dashboardData?.nextLiveClass ? (
              <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Next Live Cohort Class
                    </span>
                    <span className="text-xs text-indigo-200 font-mono">
                      {dashboardData.nextLiveClass.batchCode}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {dashboardData.nextLiveClass.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Lead Faculty: <strong>{dashboardData.nextLiveClass.trainerName}</strong> &bull; Scheduled Start: {new Date(dashboardData.nextLiveClass.scheduledStart).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-bold rounded-xl flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>Cohort Schedule Synchronized</span>
                  </span>
                </div>
              </div>
            ) : null}

            {/* Quick Enrolled Courses Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">Your Enrolled Courses</h3>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <span>View All ({enrolledCount})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {enrolledCount === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
                  <p className="text-xs text-slate-500">You are not currently enrolled in any live cohorts.</p>
                  <button
                    onClick={() => setActiveTab('explore-courses')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    Browse Live Catalog
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboardData?.enrollments?.map((e: any) => (
                    <div key={e.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">Live Cohort Programme</span>
                        <h4 className="text-base font-bold text-slate-900 mt-1">{e.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{e.subtitle}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-xs text-slate-500">Enrolled &bull; 100% Live Classes</span>
                        <Link
                          href={`/courses/${e.slug}/learn`}
                          className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                        >
                          <span>Open Workspace</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: ENROLLED COURSES ("MY COURSES")
        ------------------------------------------------------------- */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">My Enrolled Programmes</h2>
                <p className="text-xs text-slate-500">Live cohorts, curriculum progression &amp; practical project workspaces</p>
              </div>
              <button
                onClick={() => setActiveTab('explore-courses')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-2 self-start sm:self-auto"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Explore All Courses (INR)</span>
              </button>
            </div>

            {enrolledCount === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">You haven&apos;t enrolled in any courses yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Explore our verified live instructor-led cohorts in Digital Marketing, SEO, Paid Performance, and AI Automation to launch your learning journey.
                </p>
                <button
                  onClick={() => setActiveTab('explore-courses')}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  Explore Course Catalog (INR ₹)
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {dashboardData?.enrollments?.map((e: any) => (
                  <div key={e.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active Enrolled
                        </span>
                        <span className="text-xs text-slate-400">Duration: {e.durationHours || 48} Hours</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{e.title || e.courseTitle}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{e.subtitle || e.course?.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/courses/${e.slug || e.courseSlug || e.course?.slug}/learn`}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-2"
                      >
                        <span>Launch Course Player</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: MY PURCHASES & ORDER HISTORY (DATABASE RECORDED)
        ------------------------------------------------------------- */}
        {activeTab === 'purchases' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">My Purchases &amp; Orders</h2>
                <p className="text-xs text-slate-500">
                  Verified transactional records, invoices &amp; cohort access &bull; All pricing in <strong>Indian Rupees (INR - ₹)</strong>
                </p>
              </div>
              <button
                onClick={() => setActiveTab('explore-courses')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-2 self-start sm:self-auto"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Browse More Courses</span>
              </button>
            </div>

            {loadingPurchases ? (
              <div className="p-12 text-center text-slate-500 text-xs">
                Loading purchase records from database...
              </div>
            ) : purchasesData.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No Purchase History Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  You have not completed any course purchases yet. Explore our verified live cohorts to enroll.
                </p>
                <button
                  onClick={() => setActiveTab('explore-courses')}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  Explore Course Catalog (INR ₹)
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-[11px] font-bold">
                        <th className="py-3.5 px-4">Course Programme</th>
                        <th className="py-3.5 px-4">Order Reference</th>
                        <th className="py-3.5 px-4">Purchase Date</th>
                        <th className="py-3.5 px-4">Amount Paid</th>
                        <th className="py-3.5 px-4">Payment Status</th>
                        <th className="py-3.5 px-4 text-right">Access</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {purchasesData.map((p, idx) => (
                        <tr key={p.id || idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-bold text-slate-900 block">{p.courseTitle}</span>
                            <span className="text-[10px] text-slate-400">100% Live Instructor-Led Cohort</span>
                          </td>
                          <td className="py-4 px-4 font-mono text-[11px] text-slate-600">
                            {p.orderReference}
                          </td>
                          <td className="py-4 px-4 text-slate-500">
                            {new Date(p.purchaseDate).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                          <td className="py-4 px-4 font-bold text-slate-900">
                            {formatINR(p.amount)}
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>{p.status || 'COMPLETED'}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Link
                              href={`/courses/${p.courseSlug}/learn`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] transition-colors shadow-sm"
                            >
                              <span>Continue Learning</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: EXPLORE COURSES (PRICED IN INR ₹)
        ------------------------------------------------------------- */}
        {activeTab === 'explore-courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Explore Course Catalog</h2>
                <p className="text-xs text-slate-500">
                  Live cohort programmes &amp; hands-on practical masterclasses &bull; All pricing in <strong>Indian Rupees (INR - ₹)</strong>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ALL_EXPLORE_COURSES.map((course) => {
                const isEnrolled = enrolledCourseSlugs.includes(course.slug);
                return (
                  <div key={course.slug} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                        <span>{course.category}</span>
                        <span>{course.durationHours} Hours</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">{course.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{course.description}</p>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400 block font-bold">Tuition (INR)</span>
                          {course.discountPercent && (
                            <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded">
                              {course.discountPercent}% OFF
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-slate-900">{formatINR(course.price)}</span>
                          {course.originalPrice && (
                            <span className="text-[11px] font-semibold text-slate-400 line-through">
                              {formatINR(course.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {isEnrolled ? (
                        <Link
                          href={`/courses/${course.slug}/learn`}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                        >
                          Enrolled &bull; Learn
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleEnrollCourse(course.slug, course.title)}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                        >
                          Enrol Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: PROFILE & ACCOUNT SETTINGS
        ------------------------------------------------------------- */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Student Profile &amp; Account Settings</h2>
              <p className="text-xs text-slate-500 mt-1">
                Your credentials and personal information are permanently secured in our PostgreSQL database.
              </p>
            </div>

            {profileSaveSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Profile updated successfully! Changes saved permanently.</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address (Permanent Identity)
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-4 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Headline / Career Focus
                </label>
                <input
                  type="text"
                  value={editHeadline}
                  onChange={(e) => setEditHeadline(e.target.value)}
                  placeholder="e.g. AI Digital Marketing & Growth Specialist"
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Country of Residence
                </label>
                <input
                  type="text"
                  disabled
                  value={user?.country || 'India'}
                  className="w-full px-4 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2"
                >
                  {isSavingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <span>Save Profile Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Remaining Tabs (Live Classes, Recorded, Calendar, Assignments, Skills, Placement) */}
        {activeTab === 'live-classes' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <Video className="w-10 h-10 text-indigo-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Live Cohort Classes</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Your live cohort schedule is coordinated with Senior Faculty leads. Cohort dates and curriculum milestones are scheduled directly with your batch.
            </p>
          </div>
        )}

        {activeTab === 'recorded' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <PlayCircle className="w-10 h-10 text-indigo-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Recorded Masterclass Library</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Full HD lecture recordings and interactive code walkthroughs are available inside each module in your Course Player.
            </p>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <CalendarIcon className="w-10 h-10 text-indigo-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Cohort Calendar</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Cohorts meet Mon &amp; Wed 18:00 - 20:00 UTC. Check your enrolled course syllabus for specific dates and milestones.
            </p>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <FileCheck2 className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Practical Evaluated Milestones</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Submit your module assignments and capstone portfolios directly inside each module tab in the Course Player to receive trainer review.
            </p>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <Award className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Verified Skill Ratings</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Skill scores are computed directly from faculty-evaluated practical deliverables and capstones. Complete your module assignments to establish ratings.
            </p>
          </div>
        )}

        {activeTab === 'placement' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-cyan-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Hiring Partners &amp; Placement Tracks</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Student profiles opted into the Employer Discovery Pool are discoverable by verified hiring partners upon completing 70% of course deliverables.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}
