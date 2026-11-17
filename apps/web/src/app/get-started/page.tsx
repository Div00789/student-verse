'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Video, 
  FileCheck2, 
  Award, 
  Users, 
  Briefcase,
  Lock,
  UserCheck
} from 'lucide-react';

export default function GetStartedPage() {
  const [mode, setMode] = useState<'register' | 'login'>('register');

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-md">
              SV
            </div>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            Welcome to StudentVerse
          </h1>
          <p className="mt-2 text-base text-slate-600">
            Select your account type to proceed to your dedicated portal
          </p>

          {/* Toggle between Register and Sign In */}
          <div className="inline-flex items-center p-1 bg-slate-200/80 rounded-xl mt-6 border border-slate-300">
            <button
              onClick={() => setMode('register')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              I want to Register (New Account)
            </button>
            <button
              onClick={() => setMode('login')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              I already have an Account (Sign In)
            </button>
          </div>
        </div>

        {/* Dual Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* -------------------------------------------------------------
              CARD 1: STUDENT / LEARNER
          ------------------------------------------------------------- */}
          <div className="bg-white rounded-3xl border-2 border-indigo-200 p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full">
                  For Students &amp; Job Seekers
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  {mode === 'register' ? 'I will Register as Student' : 'I am Registered as Student'}
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Join 100% live instructor-led cohorts in digital marketing, submit assessed capstone tasks, build verified skill ratings, and access vetted hiring partner opportunities.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% Live Cohorts with Google Meet links</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Practical assignments graded with 40/30/20/10 rubrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Permanent verifiable cryptographic certificates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Consent-controlled employer talent pool (private by default)</span>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-3">
              {mode === 'register' ? (
                <>
                  <Link
                    href="/student/register"
                    className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Register as Student</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-center text-xs text-slate-500">
                    Already registered?{' '}
                    <Link href="/student/login" className="font-bold text-indigo-600 hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <Link
                    href="/student/login"
                    className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Sign In to Student Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-center text-xs text-slate-500">
                    Don&apos;t have an account?{' '}
                    <Link href="/student/register" className="font-bold text-indigo-600 hover:underline">
                      Register as Student
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* -------------------------------------------------------------
              CARD 2: EMPLOYER / HIRING PARTNER
          ------------------------------------------------------------- */}
          <div className="bg-white rounded-3xl border-2 border-slate-300 p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center shadow-inner">
                  <Building2 className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full">
                  For Hiring Partners &amp; Recruiters
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  {mode === 'register' ? 'I will Register as Employer' : 'I am Registered as Employer'}
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Access our vetted candidate discovery pool, inspect verified skill scores &amp; capstone submissions, and submit hiring requests with full platform intermediary support.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Verified business vetting gate (Rule AC-07)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Discover assessed candidates with transparent scores</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Submit &ldquo;Request to Hire&rdquo; with 9-stage status tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Confidential student introduction through placement officers</span>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-3">
              {mode === 'register' ? (
                <>
                  <Link
                    href="/employer/register"
                    className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Register as Employer</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-center text-xs text-slate-500">
                    Already verified?{' '}
                    <Link href="/employer/login" className="font-bold text-slate-900 hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <Link
                    href="/employer/login"
                    className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Sign In to Employer Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-center text-xs text-slate-500">
                    Need business verification?{' '}
                    <Link href="/employer/register" className="font-bold text-slate-900 hover:underline">
                      Register as Employer
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Admin Link footer */}
        <div className="text-center mt-12 text-xs text-slate-400">
          Internal Team or Course Administrator?{' '}
          <Link href="/admin/login" className="text-indigo-600 hover:underline font-bold">
            Sign in to Admin Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}
