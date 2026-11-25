'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  PlayCircle,
  ExternalLink,
  Calendar as CalendarIcon,
  Video,
  Layers,
  User,
  LogOut,
  ChevronRight,
  Sparkles,
  Compass,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  FileCheck2,
  Award,
  Loader2,
  ArrowRight,
  Search,
  X
} from 'lucide-react';
import { getAuthUser, updateAuthUser, clearAuthSession, AuthUser, formatStudentName, isStudent, isEmployer } from '../../lib/auth';
import { formatINR } from '../../lib/currency';
import { api } from '../../lib/api';
import { searchAndFilterCourses } from '../../lib/courseSearch';

const ALL_EXPLORE_COURSES = [
  {
    slug: 'ai-digital-marketing-course',
    title: 'AI Digital Marketing Course',
    subtitle: 'Comprehensive 14-Module Professional Programme: SEO, PPC, GA4, Paid Media, Automation & Modern AI Tools',
    category: 'Digital Marketing / Artificial Intelligence',
    durationHours: 48,
    totalLessons: 41,
    level: 'Beginner to Advanced',
    originalPrice: 37499,
    discountPercent: 20,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    description: 'Master digital marketing with artificial intelligence through hands-on training in SEO, Google Ads, GA4, Paid Social Media, Email Marketing, Content Marketing, Marketing Automation, Affiliate Marketing, and Freelancing.',
  },
  {
    slug: 'aman-digital-marketing-course',
    title: 'Aman Digital Marketing Course',
    subtitle: 'Comprehensive 15-Module Professional Programme: SEO, Web Development, Google Ads, GA4, Automation & AI',
    category: 'Digital Marketing',
    durationHours: 48,
    totalLessons: 44,
    level: 'Beginner to Advanced',
    originalPrice: 37499,
    discountPercent: 20,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    description: 'A comprehensive digital marketing learning programme designed to provide practical knowledge of Search Engine Optimisation, website development, keyword research, paid advertising, social media marketing, analytics, artificial intelligence and other essential digital marketing skills through live training, recorded lessons, presentations and practical assignments.',
  },
  {
    slug: 'digital-marketing-foundations',
    title: 'Digital Marketing Fundamentals & Omnichannel Strategy',
    subtitle: '100% Live Instructor-Led Cohort on Acquisition Funnels, Strategy & Multi-Touch Conversion',
    category: 'Digital Marketing',
    durationHours: 36,
    totalLessons: 8,
    level: 'Beginner',
    originalPrice: 29999,
    discountPercent: 15,
    price: 24999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    description: 'Master practical digital marketing strategy through real-time instructor guidance. Build end-to-end customer acquisition funnels, plan multi-channel campaigns, execute content schedules, and measure performance metrics.',
  },
  {
    slug: 'seo-and-ai-search-optimization',
    title: 'Search Engine Optimisation (SEO) & AI Search / AEO',
    subtitle: '100% Live Masterclass in Technical Audits, Keyword Architecture & Answer Engine Optimisation',
    category: 'Search Engine Optimisation',
    durationHours: 32,
    totalLessons: 8,
    level: 'Intermediate',
    originalPrice: 39999,
    discountPercent: 25,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?w=800&auto=format&fit=crop&q=60',
    description: 'Learn modern search mechanics beyond basic keywords. Conduct technical site audits, build topical clusters, optimize for Google Search Console, and master Answer Engine Optimisation (AEO).',
  },
  {
    slug: 'paid-performance-google-meta-ads',
    title: 'Paid Performance Advertising (Google Ads & Meta Ads)',
    subtitle: '100% Live Cohort on Bidding Strategies, Conversion APIs, Creative Strategy & ROI',
    category: 'Paid Advertising',
    durationHours: 36,
    totalLessons: 8,
    level: 'Intermediate',
    originalPrice: 44999,
    discountPercent: 20,
    price: 35999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    description: 'Master high-volume paid media buying. Set up Google Search and Performance Max campaigns, architect Meta Ads creative testing frameworks, configure Server-Side Conversion APIs, and optimize ad spend.',
  },
  {
    slug: 'analytics-ga4-google-tag-manager',
    title: 'Marketing Analytics, GA4 & Google Tag Manager',
    subtitle: '100% Live Practical Workshop on Custom Events, DataLayers, UTMs & Looker Dashboards',
    category: 'Analytics & Tracking',
    durationHours: 30,
    totalLessons: 8,
    level: 'Intermediate',
    originalPrice: 32999,
    discountPercent: 25,
    price: 24999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=60',
    description: 'Stop guessing which marketing channels work. Master Google Tag Manager dataLayers, configure custom GA4 conversion events, implement cross-domain tracking, and build interactive client-facing dashboards.',
  },
  {
    slug: 'social-media-marketing-strategy',
    title: 'Social Media Marketing & Content Strategy',
    subtitle: '100% Live Cohort on Organic Distribution, Content Calendars, Brand Voice & Community',
    category: 'Social Media Marketing',
    durationHours: 28,
    totalLessons: 6,
    level: 'Beginner',
    originalPrice: 24999,
    discountPercent: 20,
    price: 19999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
    description: 'Build organic social media systems that drive revenue. Learn platform-specific distribution across LinkedIn, Instagram, and YouTube, engineer high-engagement content calendars, and establish distinctive brand voice.',
  },
  {
    slug: 'ai-tools-for-digital-marketers',
    title: 'AI Tools & Automation for Digital Marketers',
    subtitle: '100% Live Training on Generative AI, Prompt Workflows, Content Automation & Productivity',
    category: 'AI for Digital Marketing',
    durationHours: 32,
    totalLessons: 8,
    level: 'Intermediate',
    originalPrice: 39999,
    discountPercent: 25,
    price: 29999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    description: 'Transform modern marketing operations using production AI workflows. Build customized prompt chains for campaign research, automate multi-lingual content variations, and integrate marketing automation triggers.',
  }
];

export default function StudentPortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'purchases' | 'assignments' | 'certificates' | 'profile'>('overview');

  const [enrolledCourseSlugs, setEnrolledCourseSlugs] = useState<string[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [purchasesData, setPurchasesData] = useState<any[]>([]);
  const [loadingDashboard, setLoadingDashboard] = useState<boolean>(true);
  const [courseFilter, setCourseFilter] = useState<'ALL' | 'IN_PROGRESS' | 'COMPLETED'>('ALL');
  const [myCoursesSearch, setMyCoursesSearch] = useState<string>('');

  // Profile editing state
  const [editName, setEditName] = useState('');
  const [editHeadline, setEditHeadline] = useState('');
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

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
      }

      if (Array.isArray(purchases)) {
        setPurchasesData(purchases);
      }
    } catch {
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

    if (isEmployer(authUser) && !isStudent(authUser)) {
      router.replace('/employer');
      return;
    }

    setUser(authUser);
    setEditName(authUser.fullName || '');
    setEditHeadline(authUser.headline || 'Student Learner');
    loadDashboard(authUser);
  }, [router]);

  // Support direct URL query parameter tab selection (client safe)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && ['overview', 'courses', 'purchases', 'assignments', 'certificates', 'profile'].includes(tabParam)) {
        setActiveTab(tabParam as any);
      }
    }
  }, []);

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

  const displayName = formatStudentName(user?.fullName || (user?.email ? user.email.split('@')[0] : 'Student'));
  const firstName = displayName.split(' ')[0] || displayName;
  const userInitials = displayName
    ? displayName.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'SV';

  const enrollments = dashboardData?.enrollments || [];
  const enrolledCount = enrollments.length;

  const filteredEnrollments = React.useMemo(() => {
    let list = enrollments.filter((e: any) => {
      if (courseFilter === 'COMPLETED') return (e.progressPct || 0) >= 100;
      if (courseFilter === 'IN_PROGRESS') return (e.progressPct || 0) > 0 && (e.progressPct || 0) < 100;
      return true;
    });

    if (!myCoursesSearch.trim()) return list;
    return searchAndFilterCourses(list, myCoursesSearch);
  }, [enrollments, courseFilter, myCoursesSearch]);

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
                {enrolledCount > 0 ? `${enrolledCount} Active Course${enrolledCount > 1 ? 's' : ''}` : 'No Active Courses'}
              </span>
            </div>
          </div>

          {/* Clean, Focused Nav Items */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <Layers className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'courses'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>My Courses ({enrolledCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('assignments')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'assignments'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <FileCheck2 className="w-4 h-4 text-amber-400" />
              <span>Practical Assignments</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'certificates'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>My Certificates</span>
            </button>

            <button
              onClick={() => setActiveTab('purchases')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'purchases'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <CreditCard className="w-4 h-4 text-cyan-400" />
              <span>Purchase History ({purchasesData.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'profile'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            href="/courses"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Course Catalog</span>
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
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
        {/* =============================================================
            TAB: OVERVIEW (SIMPLIFIED FOCUSED LEARNING DASHBOARD)
        ============================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            {/* SECTION 1: PERSONALIZED WELCOME */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Welcome back, {firstName}!
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Ready to continue your digital skills journey? Here are your active learning programs.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                  {enrolledCount} Active Course{enrolledCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* SECTION 2: MY ACTIVE COURSES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">My Active Courses</h2>
                  <p className="text-xs text-slate-500">Resume your learning right where you left off</p>
                </div>
                {enrolledCount > 0 && (
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <span>View All ({enrolledCount})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {loadingDashboard ? (
                <div className="p-12 text-center text-slate-500 text-xs bg-white rounded-2xl border border-slate-200 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  <span>Loading your courses...</span>
                </div>
              ) : enrolledCount === 0 ? (
                <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">No active courses yet</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                      Enroll in our industry-recognized cohorts to master AI Digital Marketing, SEO, and Paid Media.
                    </p>
                  </div>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Explore Available Courses</span>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrollments.map((course: any) => {
                    const slug = course.slug || course.courseSlug || 'ai-digital-marketing-course';
                    const progress = typeof course.progressPercentage === 'number'
                      ? course.progressPercentage
                      : (typeof course.progressPct === 'number' ? course.progressPct : 0);
                    const completedLessons = course.completedLessons ?? course.completedCount ?? 0;
                    const totalLessons = course.totalLessons || 41;
                    const duration = course.durationHours || 48;
                    const thumb = course.thumbnailUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80';

                    return (
                      <div
                        key={course.id || slug}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        {/* Course Card Header with Thumbnail */}
                        <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={thumb}
                            alt={course.title}
                            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-indigo-600/90 text-white shadow">
                              {course.category || 'Professional Cohort'}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <h3 className="font-bold text-base leading-snug drop-shadow-sm">{course.title}</h3>
                          </div>
                        </div>

                        {/* Course Card Body */}
                        <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                              <span>Progress</span>
                              <span className="text-indigo-600 font-bold">{progress}% Completed</span>
                            </div>
                            {/* Permanent Progress Bar */}
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
                              <div
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                              <span>{completedLessons} of {totalLessons} lessons completed</span>
                              <span>Curriculum: {course.totalModules || course.modulesCount || 1} Modules</span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                            <Link
                              href={`/courses/${slug}`}
                              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                            >
                              Course Details
                            </Link>
                            <Link
                              href={`/courses/${slug}/learn`}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                            >
                              <span>{progress >= 100 ? 'Review Course' : 'Continue Learning'}</span>
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SECTION 3: EXPLORE MORE COURSES CTA */}
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-indigo-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-xl">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  Catalog Expansion
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Ready to learn something new?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Expand your competitive edge with our 100% live cohorts in SEO, Performance PPC, GA4 Analytics, and Generative AI.
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl shadow transition-colors self-start sm:self-auto flex-shrink-0"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* SECTION 4: QUICK LINKS */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Quick Navigation</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('courses')}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow hover:border-indigo-200 transition-all text-left flex flex-col justify-between group"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-xs text-slate-800 block">My Courses</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{enrolledCount} Active</span>
                </button>

                <button
                  onClick={() => setActiveTab('assignments')}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow hover:border-amber-200 transition-all text-left flex flex-col justify-between group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-xs text-slate-800 block">Practical Assignments</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Tasks &amp; Review</span>
                </button>

                <button
                  onClick={() => setActiveTab('certificates')}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow hover:border-emerald-200 transition-all text-left flex flex-col justify-between group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-xs text-slate-800 block">My Certificates</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Credentials</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow hover:border-indigo-200 transition-all text-left flex flex-col justify-between group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-3 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-xs text-slate-800 block">My Profile</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Settings &amp; Info</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =============================================================
            TAB: MY COURSES (DEDICATED FULL COURSE MANAGEMENT)
        ============================================================= */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Courses</h1>
                <p className="text-xs text-slate-500">
                  Manage your enrolled courses, filter by progress status, and continue your lessons
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors self-start sm:self-auto"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Explore More Courses</span>
              </Link>
            </div>

            {/* Filter Pills and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCourseFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${courseFilter === 'ALL'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  All Courses ({enrollments.length})
                </button>
                <button
                  onClick={() => setCourseFilter('IN_PROGRESS')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${courseFilter === 'IN_PROGRESS'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => setCourseFilter('COMPLETED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${courseFilter === 'COMPLETED'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  Completed
                </button>
              </div>

              {/* Quick Search inside Enrolled Courses */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search my courses..."
                  value={myCoursesSearch}
                  onChange={(e) => setMyCoursesSearch(e.target.value)}
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-slate-900 placeholder:text-slate-400"
                />
                {myCoursesSearch && (
                  <button
                    onClick={() => setMyCoursesSearch('')}
                    title="Clear filter"
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {filteredEnrollments.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No courses match this filter</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Browse our full curriculum of live digital marketing and AI courses to get started.
                </p>
                <Link
                  href="/courses"
                  className="inline-block px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  Explore Course Catalog
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEnrollments.map((course: any) => {
                  const slug = course.slug || course.courseSlug || 'ai-digital-marketing-course';
                  const progress = typeof course.progressPercentage === 'number'
                    ? course.progressPercentage
                    : (typeof course.progressPct === 'number' ? course.progressPct : 0);
                  const completedLessons = course.completedLessons ?? course.completedCount ?? 0;
                  const totalLessons = course.totalLessons ?? 0;
                  const totalModules = course.totalModules || course.modulesCount || 1;
                  const duration = course.durationHours || 30;

                  return (
                    <div
                      key={course.id || slug}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${progress >= 100
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : (progress > 0 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-700 border border-slate-200')
                            }`}>
                            {progress >= 100 ? 'Completed' : (progress > 0 ? 'In Progress' : 'Not Started')}
                          </span>
                          <span className="text-xs text-slate-400">Duration: {duration} Hours</span>
                          <span className="text-xs text-slate-400">&bull; {totalModules} Modules</span>
                          <span className="text-xs font-bold text-indigo-600">&bull; {completedLessons} of {totalLessons} lessons completed ({progress}%)</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{course.subtitle}</p>

                        <div className="w-full max-w-md bg-slate-100 rounded-full h-1.5 overflow-hidden mt-2">
                          <div
                            className="bg-indigo-600 h-1.5 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/courses/${slug}/learn`}
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-2"
                        >
                          <span>{progress >= 100 ? 'Review Course' : 'Continue Learning'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =============================================================
            TAB: PRACTICAL ASSIGNMENTS
        ============================================================= */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Practical Assignments</h1>
              <p className="text-xs text-slate-500">Hands-on tasks and evaluated module projects</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <FileCheck2 className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Module Project Workspaces</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Practical assignments and case studies are embedded inside each module of your Course Player. Complete the exercises inside your active course to submit them for faculty review.
              </p>
              {enrolledCount > 0 && (
                <Link
                  href={`/courses/${enrollments[0]?.slug || 'ai-digital-marketing-course'}/learn`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  <span>Open Active Course</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* =============================================================
            TAB: CERTIFICATES
        ============================================================= */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Certificates</h1>
              <p className="text-xs text-slate-500">Verified credentials and completion certificates</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <Award className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Verified Completion Credentials</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Complete all required lessons and capstone submissions in your enrolled program to automatically generate your verified Certificate of Completion.
              </p>
            </div>
          </div>
        )}

        {/* =============================================================
            TAB: PURCHASES & ORDER HISTORY
        ============================================================= */}
        {activeTab === 'purchases' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Purchase History</h1>
                <p className="text-xs text-slate-500">
                  Verified transactional records &bull; All pricing in <strong>Indian Rupees (INR - ₹)</strong>
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors self-start sm:self-auto"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Browse Courses</span>
              </Link>
            </div>

            {purchasesData.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No Purchase History Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  You have not completed any course purchases yet. Explore our verified cohorts to enroll.
                </p>
                <Link
                  href="/courses"
                  className="inline-block px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  Explore Course Catalog (INR ₹)
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-[11px] font-bold">
                        <th className="py-3.5 px-4">Course</th>
                        <th className="py-3.5 px-4">Order Reference</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4">Amount</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {purchasesData.map((p, idx) => (
                        <tr key={p.id || idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-4 font-bold text-slate-900">{p.courseTitle}</td>
                          <td className="py-4 px-4 font-mono text-[11px] text-slate-600">{p.orderReference}</td>
                          <td className="py-4 px-4 text-slate-500">
                            {new Date(p.purchaseDate).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                          <td className="py-4 px-4 font-bold text-slate-900">{formatINR(p.amount)}</td>
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
                              <span>Continue</span>
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

        {/* =============================================================
            TAB: PROFILE & ACCOUNT SETTINGS
        ============================================================= */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Student Profile</h1>
              <p className="text-xs text-slate-500 mt-1">
                Your credentials and personal information are permanently stored in your Supabase PostgreSQL account.
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
                  Email Address
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
      </main>
    </div>
  );
}
