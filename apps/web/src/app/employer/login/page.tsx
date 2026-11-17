'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { setAuthSession } from '../../../lib/auth';

export default function EmployerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('employer@studentverse.com');
  const [password, setPassword] = useState('Employer@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      id: 'usr-employer-demo-1',
      email,
      fullName: 'Apex Growth Labs (Hiring Lead)',
      roles: ['EMPLOYER', 'EMPLOYER_OWNER'],
      country: 'Global',
      companyName: 'Apex Growth Labs',
      isEmployerVerified: true,
    };

    setAuthSession(`sv-jwt-token-${Date.now()}`, user);
    router.push('/employer');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-900 flex items-center justify-center text-white font-black text-2xl shadow-md">
            SV
          </div>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Hiring Partner Portal</span>
        </div>
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">Employer Login</h2>
        <p className="mt-2 text-sm text-slate-600">
          Search assessed candidates, review verified skill rubrics &amp; submit hiring requests
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Business Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <a href="#" className="text-xs text-indigo-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Verifying...' : 'Sign In as Hiring Partner'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Test credentials box */}
          <div className="mt-6 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
            <span className="font-bold block mb-1">Test Employer Account:</span>
            <span>Email: <code>employer@studentverse.com</code></span><br />
            <span>Password: <code>Employer@123</code></span>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
            Need to register your organisation?{' '}
            <Link href="/employer/register" className="font-bold text-indigo-600 hover:underline">
              Submit Employer Verification
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
