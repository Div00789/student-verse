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
  AlertCircle
} from 'lucide-react';

export default function StudentPortalPage() {
  const [activeTab, setActiveTab] = useState<'learning' | 'profile' | 'credentials'>('learning');
  const [talentVisibility, setTalentVisibility] = useState<'PRIVATE' | 'SEARCHABLE'>('PRIVATE');
  const [headline, setHeadline] = useState('Aspiring Growth & Performance Marketing Specialist');
  const [skills, setSkills] = useState(['SEO', 'Google Analytics 4', 'Paid Media', 'Meta Ads']);
  const [consentSavedNotice, setConsentSavedNotice] = useState(false);

  const toggleVisibility = () => {
    const next = talentVisibility === 'PRIVATE' ? 'SEARCHABLE' : 'PRIVATE';
    setTalentVisibility(next);
    setConsentSavedNotice(true);
    setTimeout(() => setConsentSavedNotice(false), 3000);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Portal Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
              AM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">Alex Morgan</h1>
                <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold px-2 py-0.5 rounded">
                  Learner Account
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Student ID: SV-STU-88291 &bull; Location: United Kingdom (UTC+0)
              </p>
            </div>
          </div>

          {/* Quick Visibility Pill */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Employer Discovery
              </span>
              <span className="text-xs font-bold text-slate-800">
                {talentVisibility === 'PRIVATE' ? 'Status: Private (Hidden)' : 'Status: Searchable (Opted In)'}
              </span>
            </div>
            <button
              onClick={toggleVisibility}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                talentVisibility === 'PRIVATE'
                  ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {talentVisibility === 'PRIVATE' ? 'Opt In to Talent Pool' : 'Switch to Private'}
            </button>
          </div>
        </div>

        {/* Notice of consent change */}
        {consentSavedNotice && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              Visibility preference updated! Consent log recorded under <strong>StudentVerse [RankGood Tech]</strong> compliance records.
            </span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('learning')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'learning'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Active Learning &amp; Course Player
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            Talent Profile &amp; Privacy (BR-05)
          </button>

          <button
            onClick={() => setActiveTab('credentials')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'credentials'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            Earned Credentials
          </button>
        </div>

        {/* ---------------- Tab 1: Learning ---------------- */}
        {activeTab === 'learning' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                    Enrolled Programme
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Digital Marketing Foundations
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Progress: <strong>78% Completed</strong> (7 of 9 modules finished)
                  </p>
                </div>
                <div className="w-full sm:w-48">
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-2.5 rounded-full w-[78%]" />
                  </div>
                </div>
              </div>

              {/* Learning Player Simulation */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                <div className="lg:col-span-8 bg-slate-900 rounded-xl overflow-hidden aspect-video flex flex-col justify-between p-6 text-white relative">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Lesson 3.2: Multi-Touch Attribution in GA4</span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px]">1080p Stream</span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-auto">
                    <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg hover:scale-105 cursor-pointer transition-transform">
                      <PlayCircle className="w-8 h-8" />
                    </div>
                    <span className="text-xs text-slate-300 mt-3 font-medium">Click to resume lesson (08:42 / 24:10)</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
                    <span>Subtitles: English (CC)</span>
                    <button className="text-xs font-bold text-emerald-400 hover:underline">
                      Mark Lesson Complete &rarr;
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                      Course Curriculum
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between text-slate-700">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          1.1 Foundations of Digital Growth
                        </span>
                        <span className="text-slate-400">Done</span>
                      </div>
                      <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between text-slate-700">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          2.1 Search Engine Optimization
                        </span>
                        <span className="text-slate-400">Done</span>
                      </div>
                      <div className="p-2 rounded bg-indigo-50 border border-indigo-200 flex items-center justify-between text-indigo-950 font-bold">
                        <span className="flex items-center gap-2">
                          <PlayCircle className="w-3.5 h-3.5 text-indigo-600" />
                          3.2 Multi-Touch Attribution
                        </span>
                        <span className="text-indigo-600">Current</span>
                      </div>
                      <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between text-slate-500">
                        <span className="flex items-center gap-2">
                          <FileCheck2 className="w-3.5 h-3.5 text-purple-600" />
                          3.3 Capstone Campaign Project
                        </span>
                        <span className="text-slate-400">Pending</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <button className="w-full py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700">
                      Submit Capstone for Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- Tab 2: Talent Profile & Privacy ---------------- */}
        {activeTab === 'profile' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Career Profile &amp; Privacy Safeguards</h2>
              <p className="text-xs text-slate-500 mt-1">
                Rule BR-05: Your talent profile is strictly private until you choose to opt in. Verified employers see only your approved evidence and skills.
              </p>
            </div>

            {/* Privacy Toggle Box */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">Employer Search Visibility</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      talentVisibility === 'SEARCHABLE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {talentVisibility}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  When <strong>Searchable</strong>, verified hiring partners can find your skills and request an introduction. Your direct email and phone remain shielded.
                </p>
              </div>

              <button
                onClick={toggleVisibility}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
                  talentVisibility === 'PRIVATE'
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-slate-800 text-white hover:bg-slate-900'
                }`}
              >
                {talentVisibility === 'PRIVATE' ? 'Opt In to Employer Search' : 'Revoke Visibility (Set Private)'}
              </button>
            </div>

            {/* Profile Fields */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assessed &amp; Demonstrated Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((s) => (
                    <span key={s} className="text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Evaluated Portfolio Links
                </label>
                <input
                  type="text"
                  readOnly
                  value="https://github.com/alexmorgan-growth/portfolio"
                  className="w-full p-2.5 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-600"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-600">
                <strong>Consent Policy Notice:</strong> All consent state changes are immutably logged with timestamp, version identifier, and user ID under StudentVerse [RankGood Tech] compliance guidelines.
              </div>
            </div>
          </div>
        )}

        {/* ---------------- Tab 3: Credentials ---------------- */}
        {activeTab === 'credentials' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Earned Certificates &amp; Credentials</h2>
              <p className="text-xs text-slate-500 mt-1">
                Public verification links can be shared on LinkedIn, CVs, or directly with recruiters.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Certificate of Completion
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Active &bull; Verified
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  Digital Marketing Foundations
                </h3>
                <div className="text-xs text-slate-500 space-y-0.5 font-mono">
                  <div>ID: <strong>SV-2026-DM-849201</strong></div>
                  <div>Issuer: StudentVerse [RankGood Tech]</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  href="/certifications/verify/SV-2026-DM-849201"
                  target="_blank"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Public Verification Page
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

