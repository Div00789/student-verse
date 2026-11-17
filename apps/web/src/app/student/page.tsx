'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  FileText
} from 'lucide-react';
import { getAuthUser, clearAuthSession } from '../../lib/auth';

export default function StudentPortalPage() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'courses' | 'live-classes' | 'recorded' | 'calendar' | 'assignments' | 'skills' | 'profile' | 'placement'
  >('overview');

  const [talentVisibility, setTalentVisibility] = useState<'PRIVATE' | 'SEARCHABLE'>('PRIVATE');
  const [consentSavedNotice, setConsentSavedNotice] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // Assignment submission modal state
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const toggleVisibility = () => {
    const next = talentVisibility === 'PRIVATE' ? 'SEARCHABLE' : 'PRIVATE';
    setTalentVisibility(next);
    setConsentSavedNotice(true);
    setTimeout(() => setConsentSavedNotice(false), 3500);
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSelectedAssignment(null);
      setSubmissionSuccess(false);
      setSubmissionText('');
      setProjectUrl('');
    }, 2000);
  };

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
            <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white font-black flex items-center justify-center text-sm shadow">
              AM
            </div>
            <div className="overflow-hidden">
              <span className="font-bold text-xs text-white block truncate">Alex Morgan</span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Active Cohort
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <Layers className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'courses'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>My Enrolled Courses</span>
            </button>

            <button
              onClick={() => setActiveTab('live-classes')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'live-classes'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <Video className="w-4 h-4 text-emerald-400" />
              <span>Live Classes &amp; Cohorts</span>
            </button>

            <button
              onClick={() => setActiveTab('recorded')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'recorded'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>Recorded Lectures</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'calendar'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Class Calendar</span>
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
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'skills'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <Award className="w-4 h-4" />
              <span>Verified Skill Ratings</span>
            </button>

            <button
              onClick={() => setActiveTab('placement')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'placement'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>Placement &amp; Partners</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'profile'
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
              <h1 className="text-2xl font-black text-slate-900">Welcome, Alex Morgan</h1>
              <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% Live Cohort Enrolled
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Student ID: SV-STU-88291 &bull; Enrolled Track: Digital Marketing &amp; Omnichannel Performance &bull; Timezone: UTC+0
            </p>
          </div>

          {/* Privacy Consent Opt-in Switch */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Employer Discovery Pool
              </span>
              <span className="text-xs font-bold text-slate-800">
                {talentVisibility === 'PRIVATE' ? 'Hidden (Private Default)' : 'Opted-In (Searchable)'}
              </span>
            </div>
            <button
              onClick={toggleVisibility}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${talentVisibility === 'PRIVATE'
                ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                }`}
            >
              {talentVisibility === 'PRIVATE' ? 'Opt In to Talent Pool' : 'Switch to Private'}
            </button>
          </div>
        </div>

        {/* Consent Feedback Banner */}
        {consentSavedNotice && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              Visibility preference updated! Consent log recorded under <strong>StudentVerse</strong> data compliance records.
            </span>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: DASHBOARD OVERVIEW
        ------------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 4 Metric Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enrolled Courses</span>
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">2 Programmes</div>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">1 Ongoing Cohort &bull; 1 Completed</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next Live Class</span>
                  <Video className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-base font-black text-slate-900 truncate">Tomorrow, 18:00 UTC</div>
                <span className="text-[11px] text-slate-500 mt-1 block">Funnel CRO Workshop</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Skill Score</span>
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-black text-indigo-600">91 / 100</div>
                <span className="text-[11px] text-indigo-700 font-semibold mt-1 block">High Confidence (3 Evaluated Tasks)</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Placement Readiness</span>
                  <Briefcase className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">Eligible</div>
                <span className="text-[11px] text-cyan-700 font-semibold mt-1 block">3 Active Partner Tracks</span>
              </div>
            </div>

            {/* Live Class Spotlight Banner */}
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Upcoming Live Online Session
                </div>
                <h3 className="text-xl sm:text-2xl font-black">
                  Funnel CRO &amp; Landing Page Multi-Touch Tracking
                </h3>
                <p className="text-xs text-indigo-200 leading-relaxed">
                  Cohort: <strong>SV-DM-NOV26</strong> &bull; Trainer: <strong>Marcus Vance (Lead Growth Trainer)</strong> &bull; Scheduled: <strong>Tomorrow, 18:00 - 20:00 UTC</strong>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="https://meet.google.com/stv-demo-live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  Join Live Class (Google Meet)
                </a>
              </div>
            </div>

            {/* Two Column Grid: Pending Tasks & Skill Ratings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Practical Assignments Section */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-indigo-600" />
                    Practical Tasks &amp; Project Submissions
                  </h3>
                  <button
                    onClick={() => setActiveTab('assignments')}
                    className="text-xs text-indigo-600 font-bold hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        Pending Submission
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">
                        Technical SEO Crawl Audit &amp; Schema JSON-LD Graph
                      </h4>
                      <p className="text-[11px] text-slate-500">Course: Search Engine Optimisation &bull; Due Dec 20</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedAssignment('asg-2');
                        setActiveTab('assignments');
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                    >
                      Submit
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        Evaluated (Score: 93/100)
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">
                        Omnichannel Customer Acquisition Campaign Plan
                      </h4>
                      <p className="text-[11px] text-slate-500">Evaluated by Marcus Vance &bull; Rubric Distinction</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('skills')}
                      className="text-xs text-slate-600 font-semibold hover:text-indigo-600"
                    >
                      View Rubric &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Verified Skill Ratings Preview */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-600" />
                    Verified Skill Ratings (Upwork-Style Rubrics)
                  </h3>
                  <button
                    onClick={() => setActiveTab('skills')}
                    className="text-xs text-indigo-600 font-bold hover:underline"
                  >
                    Details
                  </button>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span>Omnichannel Strategy &amp; Funnel CRO</span>
                      <span className="text-indigo-600">93% &bull; High Confidence</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '93%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span>Google Analytics 4 &amp; Tag Manager</span>
                      <span className="text-indigo-600">90% &bull; High Confidence</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span>Technical SEO &amp; AEO Architecture</span>
                      <span className="text-indigo-600">88% &bull; Moderate Confidence</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: LIVE CLASSES & COHORTS
        ------------------------------------------------------------- */}
        {activeTab === 'live-classes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Scheduled Live Classes</h2>
                <p className="text-xs text-slate-500">100% Live Instructor-Led Sessions with Google Meet / Zoom Links</p>
              </div>
              <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-200">
                Attendance Rate: 92%
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                      Upcoming Class
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Batch: SV-DM-NOV26</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Funnel CRO &amp; Landing Page Multi-Touch Tracking
                  </h3>
                  <p className="text-xs text-slate-600">
                    Trainer: <strong>Marcus Vance</strong> &bull; Scheduled: <strong>Nov 26, 18:00 - 20:00 UTC</strong>
                  </p>
                </div>
                <a
                  href="https://meet.google.com/stv-demo-live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 self-start md:self-center"
                >
                  <Video className="w-4 h-4" />
                  Join Google Meet
                </a>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded">
                      Scheduled Cohort
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Batch: SV-SEO-DEC26</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Entity Graph Mapping &amp; Answer Engine Optimisation (AEO)
                  </h3>
                  <p className="text-xs text-slate-600">
                    Trainer: <strong>Elena Rostova</strong> &bull; Scheduled: <strong>Dec 05, 14:00 - 16:30 UTC</strong>
                  </p>
                </div>
                <a
                  href="https://meet.google.com/stv-seo-live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 self-start md:self-center"
                >
                  <Video className="w-4 h-4" />
                  Join Google Meet
                </a>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: RECORDED LECTURES
        ------------------------------------------------------------- */}
        {activeTab === 'recorded' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Supplementary Recorded Lecture Library</h2>
              <p className="text-xs text-slate-500">
                Review past cohort sessions and supplementary deep-dives anytime
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="relative aspect-video bg-slate-900 flex items-center justify-center group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"
                    alt="Recording"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                  />
                  <div className="absolute w-12 h-12 rounded-full bg-white/90 text-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-6 h-6" />
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-[10px] font-bold rounded">
                    84 mins
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    Session 1.1 Recording
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    Modern Omnichannel Acquisition &amp; Budget Optimization
                  </h3>
                  <p className="text-xs text-slate-500">
                    Recorded Nov 15 &bull; Covers full-funnel budget modeling &amp; CAC benchmarks.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="relative aspect-video bg-slate-900 flex items-center justify-center group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?w=800&auto=format&fit=crop&q=60"
                    alt="Recording"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                  />
                  <div className="absolute w-12 h-12 rounded-full bg-white/90 text-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-6 h-6" />
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-[10px] font-bold rounded">
                    76 mins
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    Session 2.1 Recording
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    Technical SEO Crawlability &amp; Schema JSON-LD Deep-Dive
                  </h3>
                  <p className="text-xs text-slate-500">
                    Recorded Nov 12 &bull; Walkthrough of Google Search Console &amp; crawl budget optimization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: PRACTICAL ASSIGNMENTS & RUBRIC SUBMISSION
        ------------------------------------------------------------- */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Upwork-Style Practical Assignments</h2>
              <p className="text-xs text-slate-500">
                Complete verified deliverables evaluated against the weighted 40/30/20/10 rubric
              </p>
            </div>

            {selectedAssignment && (
              <div className="bg-white p-6 rounded-2xl border-2 border-indigo-500 shadow-md mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-extrabold text-slate-900">
                    Submit Project Deliverable
                  </h3>
                  <button
                    onClick={() => setSelectedAssignment(null)}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                </div>

                {submissionSuccess ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Project deliverable submitted! Your evaluator has been notified.</span>
                  </div>
                ) : (
                  <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Executive Summary &amp; Submission Notes
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        placeholder="Detail your methodology, key findings, and conversion recommendations..."
                        className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Project Repository / Live Deliverable URL
                      </label>
                      <input
                        type="url"
                        required
                        value={projectUrl}
                        onChange={(e) => setProjectUrl(e.target.value)}
                        placeholder="https://github.com/your-username/seo-audit-deliverable"
                        className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedAssignment(null)}
                        className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow"
                      >
                        Submit to Evaluator
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Open for Submission &bull; Due Dec 20
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      Execute a Comprehensive Technical SEO &amp; Answer Engine Audit
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedAssignment('asg-2')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow self-start sm:self-auto"
                  >
                    Submit Project
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conduct a real-world crawl audit of an e-commerce or SaaS site. Identify crawl indexation bottlenecks, schema.org markup errors, Core Web Vitals issues, and formulate entity optimizations for AI Overviews.
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                  <span className="font-bold block mb-1">Required Deliverables:</span>
                  <ul className="list-disc pl-5 space-y-0.5 text-[11px] text-slate-600">
                    <li>Technical crawl audit report and priority fixes matrix</li>
                    <li>JSON-LD entity schema snippet validated against Schema.org</li>
                    <li>Target keyword cluster mapping query intent</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      Evaluated &bull; Passed with Distinction (93/100)
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      Design a Complete Multi-Channel Acquisition Campaign Plan
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-indigo-600">Graded by Marcus Vance</span>
                </div>
                {/* Weighted rubric breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Task Accuracy (40%)</span>
                    <span className="text-base font-black text-slate-900">38 / 40</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Execution (30%)</span>
                    <span className="text-base font-black text-slate-900">28 / 30</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Problem Solving (20%)</span>
                    <span className="text-base font-black text-slate-900">18 / 20</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Quality (10%)</span>
                    <span className="text-base font-black text-slate-900">9 / 10</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                  Trainer Feedback: &ldquo;Exceptional strategic depth and realistic budget pacing. Excellent conversion funnel attribution model.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: PLACEMENT & VERIFIED PARTNERS
        ------------------------------------------------------------- */}
        {activeTab === 'placement' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Placement Support &amp; Hiring Partner Directory</h2>
              <p className="text-xs text-slate-500">
                Career assistance, interview readiness &amp; vetted partner organisations
              </p>
            </div>

            {/* Disclaimer pill */}
            <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed">
              <strong>Career Policy Notice:</strong> StudentVerse provides structured live training, assessed skill portfolios, and platform-intermediated access to approved hiring partners. We do not provide guarantees of employment.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  AG
                </div>
                <h3 className="text-base font-bold text-slate-900">Apex Growth Labs</h3>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                  Verified Partner
                </span>
                <p className="text-xs text-slate-600">
                  London &amp; Remote &bull; Actively hiring Performance Marketers and Media Buyers.
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-indigo-600">Hiring Track: Omnichannel Growth</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  ND
                </div>
                <h3 className="text-base font-bold text-slate-900">Nexis Digital Global</h3>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                  Verified Partner
                </span>
                <p className="text-xs text-slate-600">
                  Berlin, Singapore &amp; Remote &bull; Recruits Technical SEO and Analytics specialists.
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-indigo-600">Hiring Track: Technical SEO &amp; AEO</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  VM
                </div>
                <h3 className="text-base font-bold text-slate-900">Vanguard Media Group</h3>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                  Verified Partner
                </span>
                <p className="text-xs text-slate-600">
                  New York &amp; Remote &bull; Paid advertising agency managing $30M+ annual budgets.
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-indigo-600">Hiring Track: Paid Ads &amp; GA4</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: PROFILE & PRIVACY CONTROLS
        ------------------------------------------------------------- */}
        {activeTab === 'profile' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-slate-900">Student Profile &amp; Talent Controls</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value="Alex Morgan"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location</label>
                <input
                  type="text"
                  readOnly
                  value="United Kingdom (UTC+0)"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Professional Headline</label>
                <input
                  type="text"
                  defaultValue="Growth & Omnichannel Performance Marketing Specialist"
                  className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Remote Preference</label>
                <input
                  type="text"
                  readOnly
                  value="Remote Only / Global Friendly"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-xs text-slate-900 block">Employer Discovery Preference</span>
              <p className="text-xs text-slate-600">
                Current Status: <strong>{talentVisibility === 'PRIVATE' ? 'Private (Hidden)' : 'Searchable (Opted In)'}</strong>.
                When opted in, verified employers can review your rubric scores, completed capstone projects, and certifications. Your private phone number and email address remain hidden.
              </p>
              <button
                onClick={toggleVisibility}
                className="mt-2 px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow"
              >
                {talentVisibility === 'PRIVATE' ? 'Opt In to Employer Talent Pool' : 'Revert to Private'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
