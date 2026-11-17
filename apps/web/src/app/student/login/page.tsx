'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { setAuthSession } from '../../../lib/auth';

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('student@studentverse.com');
  const [password, setPassword] = useState('Student@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Direct mock session provisioning for seamless client testing
      const user = {
        id: 'usr-student-demo-1',
        email,
        fullName: 'Alex Morgan',
        roles: ['STUDENT', 'LEARNER'],
        country: 'United Kingdom',
      };
      setAuthSession(`sv-jwt-token-${Date.now()}`, user);
      router.push('/student');
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-md">
            SV
          </div>
        </Link>
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">Student Portal Login</h2>
        <p className="mt-2 text-sm text-slate-600">
          Access your live classes, assignments, skill ratings &amp; placement resources
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Student Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                  placeholder="student@studentverse.com"
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
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to Student Portal'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Helper Box */}
          <div className="mt-6 p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900">
            <span className="font-bold block mb-1">Test Demo Account:</span>
            <span>Email: <code>student@studentverse.com</code></span><br />
            <span>Password: <code>Student@123</code></span>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
            Don&apos;t have an account?{' '}
            <Link href="/student/register" className="font-bold text-indigo-600 hover:underline">
              Register as a Student
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
