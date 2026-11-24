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
  LogIn
} from 'lucide-react';
import { getAuthUser, clearAuthSession, AuthUser, formatStudentName } from '../lib/auth';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const pathname = usePathname() || '';
  const router = useRouter();

  // Dynamic active portal detection based on current route
  const isStudentActive = pathname.startsWith('/student') || pathname.includes('/learn');
  const isEmployerActive = pathname.startsWith('/employer');

  useEffect(() => {
    // Initial fetch of authenticated user
    setUser(getAuthUser());

    // Listen to reactive auth changes
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

          {/* Role Portals & Dynamic Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Student Portal Link - Highlighted ONLY when on /student route */}
            <Link
              href="/student"
              className={`text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${isStudentActive
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 font-semibold'
                }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </Link>

            {/* Employer Portal Link - Highlighted ONLY when on /employer route */}
            <Link
              href="/employer"
              className={`text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${isEmployerActive
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 font-semibold'
                }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Employer Portal</span>
            </Link>

            <div className="h-5 w-px bg-slate-200 mx-1" />

            {/* Authenticated User or Sign In / Get Started */}
            {user ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href={user.roles.includes('EMPLOYER') ? '/employer' : '/student'}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center shadow-sm">
                    {getUserInitials(formatStudentName(user.fullName))}
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-900 block leading-tight max-w-[110px] truncate">
                      {formatStudentName(user.fullName || user.email.split('@')[0])}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium capitalize block -mt-0.5">
                      {user.roles.includes('EMPLOYER') ? 'Employer' : 'Student'}
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
              <div className="flex items-center gap-2">
                <Link
                  href="/get-started"
                  className="text-xs font-bold text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
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
            {/* Student Portal Mobile Button */}
            <Link
              href="/student"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full text-center py-2 text-sm rounded-lg transition-all flex items-center justify-center gap-1.5 ${isStudentActive
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 font-semibold'
                }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Student Portal</span>
            </Link>

            {/* Employer Portal Mobile Button */}
            <Link
              href="/employer"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full text-center py-2 text-sm rounded-lg transition-all flex items-center justify-center gap-1.5 ${isEmployerActive
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 font-semibold'
                }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Employer Portal</span>
            </Link>

            {user ? (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-black flex items-center justify-center">
                    {getUserInitials(user.fullName)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {user.fullName || user.email}
                    </span>
                    <span className="text-[10px] text-slate-500 capitalize">{user.roles.includes('EMPLOYER') ? 'Employer' : 'Student'}</span>
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
              <div className="pt-2 border-t border-slate-100 space-y-2">
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
