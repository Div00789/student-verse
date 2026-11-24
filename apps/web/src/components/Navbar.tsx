'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  Briefcase,
  Building2,
  Award,
  Menu,
  X,
  ShieldCheck,
  UserCheck,
  LogOut,
  User as UserIcon,
  LogIn,
  Search,
  Users,
  CheckCircle2,
  LayoutDashboard,
  FileCheck2,
  GraduationCap
} from 'lucide-react';
import { getAuthUser, clearAuthSession, AuthUser, formatStudentName, isStudent, isEmployer, isAdmin } from '../lib/auth';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const pathname = usePathname() || '';
  const router = useRouter();

  useEffect(() => {
    setUser(getAuthUser());

    const handleAuthChange = () => {
      setUser(getAuthUser());
    };

    window.addEventListener('sv_auth_changed', handleAuthChange);
    return () => {
      window.removeEventListener('sv_auth_changed', handleAuthChange);
    };
  }, []);

  const handleSignOut = () => {
    clearAuthSession();
    setUser(null);
    setMobileMenuOpen(false);
    router.push('/');
  };

  const getUserInitials = (name?: string): string => {
    if (!name) return 'SV';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const isStudentUser = Boolean(user && isStudent(user) && !isEmployer(user));
  const isEmployerUser = Boolean(user && isEmployer(user));
  const isAdminUser = Boolean(user && isAdmin(user));

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

            {/* Desktop Navigation - Strictly Role-Based */}
            <nav className="hidden md:flex items-center gap-6">
              {/* CASE 1: Authenticated Student */}
              {isStudentUser && (
                <>
                  <Link
                    href="/student"
                    className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      pathname === '/student' ? 'text-indigo-600 font-bold' : 'text-slate-700 hover:text-indigo-600'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-500" />
                    Dashboard
                  </Link>
                  <Link
                    href="/courses"
                    className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      pathname.startsWith('/courses') ? 'text-indigo-600 font-bold' : 'text-slate-700 hover:text-indigo-600'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-slate-500" />
                    Explore Courses
                  </Link>
                  <Link
                    href="/student?tab=courses"
                    className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-slate-500" />
                    My Courses
                  </Link>
                  <Link
                    href="/jobs"
                    className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      pathname.startsWith('/jobs') ? 'text-indigo-600 font-bold' : 'text-slate-700 hover:text-indigo-600'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-slate-500" />
                    Career Opportunities
                  </Link>
                  <Link
                    href="/student?tab=profile"
                    className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-slate-500" />
                    My Profile
                  </Link>
                </>
              )}

              {/* CASE 2: Authenticated Employer */}
              {isEmployerUser && (
                <>
                  <Link
                    href="/employer"
                    className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      pathname === '/employer' ? 'text-indigo-600 font-bold' : 'text-slate-700 hover:text-indigo-600'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-500" />
                    Dashboard
                  </Link>
                  <Link
                    href="/employer?tab=talent"
                    className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
                  >
                    <Search className="w-4 h-4 text-slate-500" />
                    Discover Talent
                  </Link>
                  <Link
                    href="/employer?tab=jobs"
                    className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
                  >
                    <Briefcase className="w-4 h-4 text-slate-500" />
                    My Job Postings
                  </Link>
                  <Link
                    href="/employer?tab=shortlisted"
                    className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-slate-500" />
                    Shortlisted Candidates
                  </Link>
                  <Link
                    href="/employer?tab=requests"
                    className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
                  >
                    <FileCheck2 className="w-4 h-4 text-slate-500" />
                    Interview Requests
                  </Link>
                  <Link
                    href="/employer?tab=company"
                    className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-slate-500" />
                    Company Profile
                  </Link>
                </>
              )}

              {/* CASE 3: Authenticated Admin */}
              {isAdminUser && (
                <>
                  <Link
                    href="/admin"
                    className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      pathname === '/admin' ? 'text-indigo-600 font-bold' : 'text-slate-700 hover:text-indigo-600'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-500" />
                    Admin Portal
                  </Link>
                  <Link
                    href="/courses"
                    className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-slate-500" />
                    Courses
                  </Link>
                  <Link
                    href="/jobs"
                    className="text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
                  >
                    <Briefcase className="w-4 h-4 text-slate-500" />
                    Job Opportunities
                  </Link>
                </>
              )}

              {/* CASE 4: Public Guest (Before Login) */}
              {!user && (
                <>
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
                </>
              )}
            </nav>
          </div>

          {/* Right Action Controls - Strictly Role-Based */}
          <div className="hidden lg:flex items-center gap-3">
            {/* If Authenticated: Only show User Profile Badge and Sign Out (NO Portal Switching) */}
            {user ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href={isEmployerUser ? '/employer' : isAdminUser ? '/admin' : '/student'}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center shadow-sm">
                    {getUserInitials(formatStudentName(user.fullName))}
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-900 block leading-tight max-w-[120px] truncate">
                      {formatStudentName(user.fullName || user.email.split('@')[0])}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium capitalize block -mt-0.5">
                      {isEmployerUser ? 'Employer' : isAdminUser ? 'Admin' : 'Student'}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* If Guest: Show Portal Access Options & Registration Call-to-Action */
              <div className="flex items-center gap-2.5">
                <Link
                  href="/student/login"
                  className="text-xs px-3.5 py-1.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 font-semibold transition-all flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Student Portal</span>
                </Link>

                <Link
                  href="/employer/login"
                  className="text-xs px-3.5 py-1.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 font-semibold transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Employer Portal</span>
                </Link>

                <div className="h-5 w-px bg-slate-200 mx-0.5" />

                <Link
                  href="/get-started"
                  className="text-xs font-bold text-slate-700 hover:text-indigo-600 px-2.5 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/get-started"
                  className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
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

      {/* Mobile Menu Dropdown - Strictly Role-Based */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          {/* Authenticated Student Mobile Nav */}
          {isStudentUser && (
            <div className="space-y-2">
              <Link
                href="/student"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
              >
                Dashboard
              </Link>
              <Link
                href="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
              >
                Explore Courses
              </Link>
              <Link
                href="/student?tab=courses"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
              >
                My Courses
              </Link>
              <Link
                href="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
              >
                Career Opportunities
              </Link>
              <Link
                href="/student?tab=profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
              >
                My Profile
              </Link>
            </div>
          )}

          {/* Authenticated Employer Mobile Nav */}
          {isEmployerUser && (
            <div className="space-y-2">
              <Link
                href="/employer"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
              >
                Dashboard
              </Link>
              <Link
                href="/employer?tab=talent"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
              >
                Discover Talent
              </Link>
              <Link
                href="/employer?tab=jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
              >
                My Job Postings
              </Link>
              <Link
                href="/employer?tab=shortlisted"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
              >
                Shortlisted Candidates
              </Link>
              <Link
                href="/employer?tab=requests"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
              >
                Interview Requests
              </Link>
              <Link
                href="/employer?tab=company"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-800 hover:text-indigo-600 py-1"
              >
                Company Profile
              </Link>
            </div>
          )}

          {/* Public Guest Mobile Nav */}
          {!user && (
            <div className="space-y-2">
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
            </div>
          )}

          {/* User Session or Mobile Login Action */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-black flex items-center justify-center">
                    {getUserInitials(user.fullName)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {formatStudentName(user.fullName || user.email)}
                    </span>
                    <span className="text-[10px] text-slate-500 capitalize">
                      {isEmployerUser ? 'Employer' : isAdminUser ? 'Admin' : 'Student'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full text-center py-2 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/student/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Student Portal</span>
                </Link>
                <Link
                  href="/employer/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Employer Portal</span>
                </Link>
                <Link
                  href="/get-started"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg shadow-sm block"
                >
                  Get Started / Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
