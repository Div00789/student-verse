'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Briefcase, 
  Building2, 
  Award, 
  Menu, 
  X, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 text-center border-b border-slate-800">
        <span>
          <strong className="text-white font-medium">StudentVerse</strong> — Global Digital Skills Learning &amp; Verified Hiring Platform. 100% Live Instructor-Led Cohorts.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                SV
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Student<span className="text-indigo-600">Verse</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium -mt-1 tracking-wider uppercase">
                  Global Skills &amp; Hiring
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/courses"
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                Explore Courses
              </Link>
              <Link
                href="/jobs"
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
              >
                <Briefcase className="w-4 h-4 text-slate-500" />
                Career Opportunities
              </Link>
              <Link
                href="/for-employers"
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
              >
                <Building2 className="w-4 h-4 text-slate-500" />
                For Employers
              </Link>
              <Link
                href="/certifications/verify"
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
              >
                <Award className="w-4 h-4 text-slate-500" />
                Verify Credential
              </Link>
            </nav>
          </div>

          {/* Role Portals & Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/student"
              className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Student Portal
            </Link>
            <Link
              href="/employer"
              className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Employer Portal
            </Link>
            <div className="h-5 w-px bg-slate-200 mx-1" />
            <Link
              href="/get-started"
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
          >
            Explore Courses
          </Link>
          <Link
            href="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
          >
            Career Opportunities
          </Link>
          <Link
            href="/for-employers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
          >
            For Employers
          </Link>
          <Link
            href="/certifications/verify"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
          >
            Verify Credential
          </Link>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/get-started"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg shadow-sm"
            >
              Get Started
            </Link>
            <Link
              href="/student"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg"
            >
              Student Portal
            </Link>
            <Link
              href="/employer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-lg"
            >
              Employer Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

