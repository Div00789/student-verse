'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Video, 
  FileCheck2, 
  Send, 
  Building2, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Layers, 
  LogOut,
  AlertCircle,
  Plus,
  SlidersHorizontal,
  ChevronRight,
  ShieldAlert,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { clearAuthSession } from '../../lib/auth';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'students' | 'employers' | 'courses' | 'batches' | 'assignments' | 'hiring' | 'partners'
  >('overview');

  // Employer verification queue state
  const [pendingEmployers, setPendingEmployers] = useState([
    {
      id: 'emp-101',
      name: 'Apex Growth Labs',
      website: 'https://apexgrowth.example.com',
      contact: 'Sarah Jenkins',
      email: 'sarah@apexgrowth.example.com',
      status: 'VERIFIED',
      date: '12 Nov 2026'
    },
    {
      id: 'emp-102',
      name: 'BrightWave Marketing Group',
      website: 'https://brightwave.example.com',
      contact: 'David Miller',
      email: 'david@brightwave.example.com',
      status: 'PENDING',
      date: '16 Nov 2026'
    }
  ]);

  // Hiring requests coordination state
  const [hiringRequests, setHiringRequests] = useState([
    {
      id: 'hr-demo-1',
      candidateName: 'Elena Rostova',
      companyName: 'Apex Growth Labs',
      jobTitle: 'Senior Performance & SEO Lead',
      salaryRange: '$65,000 - $80,000 USD',
      status: 'STUDENT_CONTACTED',
      internalNotes: 'Contacted Elena on Nov 14. Confirmed interest. Coordinating intro call with Sarah Jenkins.'
    },
    {
      id: 'hr-demo-2',
      candidateName: 'Alex Morgan',
      companyName: 'Nexis Digital Global',
      jobTitle: 'Growth & Omnichannel Specialist',
      salaryRange: '$55,000 - $70,000 USD',
      status: 'UNDER_REVIEW',
      internalNotes: 'Reviewing job description alignment with Alex Morgan’s completed capstones.'
    }
  ]);

  const verifyEmployer = (id: string) => {
    setPendingEmployers(
      pendingEmployers.map((emp) =>
        emp.id === id ? { ...emp, status: 'VERIFIED' } : emp
      )
    );
  };

  const updateHiringStatus = (id: string, newStatus: string) => {
    setHiringRequests(
      hiringRequests.map((hr) =>
        hr.id === id ? { ...hr, status: newStatus } : hr
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* -------------------------------------------------------------
          LEFT SIDEBAR NAVIGATION
      ------------------------------------------------------------- */}
      <aside className="w-full md:w-64 bg-slate-950 text-slate-300 flex-shrink-0 flex flex-col justify-between p-4 md:min-h-screen border-r border-slate-800">
        <div>
          {/* Header */}
          <div className="flex items-center gap-3 px-3 py-4 border-b border-slate-800 mb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md">
              SV
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block">
                Student<span className="text-indigo-400">Verse</span>
              </span>
              <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-bold">
                Admin Management System
              </span>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Overview &amp; Reports</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'students'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Student Management</span>
            </button>

            <button
              onClick={() => setActiveTab('employers')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'employers'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Employer Vetting ({pendingEmployers.filter((e) => e.status === 'PENDING').length})</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'courses'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Course Catalogues</span>
            </button>

            <button
              onClick={() => setActiveTab('batches')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'batches'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Video className="w-4 h-4 text-cyan-400" />
              <span>Live Classes &amp; Batches</span>
            </button>

            <button
              onClick={() => setActiveTab('assignments')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'assignments'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-amber-400" />
              <span>Assignments &amp; Rubrics</span>
            </button>

            <button
              onClick={() => setActiveTab('hiring')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'hiring'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Hiring Enquiries ({hiringRequests.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'partners'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Placement Partners</span>
            </button>
          </nav>
        </div>

        {/* Bottom */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg transition-colors"
          >
            <span>Public Site</span>
          </Link>
          <button
            onClick={() => {
              clearAuthSession();
              window.location.href = '/admin/login';
            }}
            className="w-full flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 px-3 py-2 rounded-lg transition-colors"
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
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">Central Admin Management</h1>
              <span className="text-[11px] bg-amber-500/10 text-amber-400 font-bold px-2.5 py-0.5 rounded-full border border-amber-500/20">
                Super Admin Access
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Development Owner: Nitesh &bull; Full oversight of live cohorts, employer verification, practical grading &amp; hiring coordination
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Database Engine:</span>
            <span className="text-xs font-bold bg-slate-800 text-emerald-400 px-3 py-1 rounded-lg border border-slate-700">
              Supabase PostgreSQL
            </span>
          </div>
        </div>

        {/* -------------------------------------------------------------
            TAB: OVERVIEW & REPORTS
        ------------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Enrolled Students
                </span>
                <span className="text-2xl font-black text-white">1,240</span>
                <span className="text-xs text-emerald-400 font-semibold block mt-1">+14% this month</span>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Active Live Batches
                </span>
                <span className="text-2xl font-black text-white">6 Cohorts</span>
                <span className="text-xs text-indigo-400 font-semibold block mt-1">100% Live Instructor-Led</span>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Vetted Employers
                </span>
                <span className="text-2xl font-black text-white">48 Companies</span>
                <span className="text-xs text-amber-400 font-semibold block mt-1">1 Pending Review</span>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Active Hiring Requests
                </span>
                <span className="text-2xl font-black text-white">{hiringRequests.length} Roles</span>
                <span className="text-xs text-emerald-400 font-semibold block mt-1">Intermediated by Admin</span>
              </div>
            </div>

            {/* Live Cohort Scheduling Table */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow space-y-4">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-400" />
                Active Live Cohorts (100% Instructor-Led)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 uppercase font-bold border-b border-slate-800 text-[10px]">
                    <tr>
                      <th className="pb-3">Batch Code</th>
                      <th className="pb-3">Programme Title</th>
                      <th className="pb-3">Lead Trainer</th>
                      <th className="pb-3">Schedule (UTC)</th>
                      <th className="pb-3">Seats</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
                    <tr>
                      <td className="py-3 font-mono text-indigo-400">SV-DM-NOV26</td>
                      <td className="py-3 text-white font-bold">Digital Marketing Foundations</td>
                      <td className="py-3">Marcus Vance</td>
                      <td className="py-3">Tue &amp; Thu 18:00 - 20:00</td>
                      <td className="py-3">18 / 25</td>
                      <td className="py-3"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">UPCOMING</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-indigo-400">SV-SEO-DEC26</td>
                      <td className="py-3 text-white font-bold">SEO &amp; AI Search (AEO)</td>
                      <td className="py-3">Elena Rostova</td>
                      <td className="py-3">Sat &amp; Sun 14:00 - 16:30</td>
                      <td className="py-3">14 / 20</td>
                      <td className="py-3"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">UPCOMING</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-indigo-400">SV-ADS-DEC26</td>
                      <td className="py-3 text-white font-bold">Paid Performance Media</td>
                      <td className="py-3">David Zhao</td>
                      <td className="py-3">Mon &amp; Wed 17:00 - 19:00</td>
                      <td className="py-3">21 / 25</td>
                      <td className="py-3"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">UPCOMING</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: EMPLOYER VETTING GATE
        ------------------------------------------------------------- */}
        {activeTab === 'employers' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">Employer Business Vetting Review</h2>
              <p className="text-xs text-slate-400">
                Enforce Rule AC-07: Unverified companies cannot post active jobs or access candidate discovery
              </p>
            </div>

            <div className="space-y-4">
              {pendingEmployers.map((emp) => (
                <div key={emp.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{emp.name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        emp.status === 'VERIFIED'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {emp.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Contact: <strong>{emp.contact}</strong> &bull; Work Email: <strong>{emp.email}</strong> &bull; Domain: {emp.website}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {emp.status === 'PENDING' && (
                      <button
                        onClick={() => verifyEmployer(emp.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                      >
                        Approve &amp; Verify Business
                      </button>
                    )}
                    {emp.status === 'VERIFIED' && (
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Vetting Approved
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB: HIRING MANAGEMENT (INTERMEDIARY COORDINATION)
        ------------------------------------------------------------- */}
        {activeTab === 'hiring' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">Platform-Mediated Hiring Enquiries</h2>
              <p className="text-xs text-slate-400">
                StudentVerse coordinates introductions, verifies student interest, and updates external employer status
              </p>
            </div>

            <div className="space-y-4">
              {hiringRequests.map((hr) => (
                <div key={hr.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                        Status: {hr.status}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">
                        {hr.companyName} &rarr; Candidate: {hr.candidateName}
                      </h3>
                      <p className="text-xs text-slate-400">Role: <strong>{hr.jobTitle}</strong> &bull; Compensation: {hr.salaryRange}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={hr.status}
                        onChange={(e) => updateHiringStatus(hr.id, e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-xs text-white p-2 rounded-xl focus:outline-none"
                      >
                        <option value="SUBMITTED">SUBMITTED</option>
                        <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                        <option value="STUDENT_CONTACTED">STUDENT_CONTACTED</option>
                        <option value="STUDENT_INTERESTED">STUDENT_INTERESTED</option>
                        <option value="INTERVIEW_COORDINATION">INTERVIEW_COORDINATION</option>
                        <option value="INTERVIEW_SCHEDULED">INTERVIEW_SCHEDULED</option>
                        <option value="OFFER_EXTENDED">OFFER_EXTENDED</option>
                        <option value="HIRED">HIRED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-slate-400 block mb-0.5">Internal Coordination Notes:</span>
                    <p>{hr.internalNotes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
