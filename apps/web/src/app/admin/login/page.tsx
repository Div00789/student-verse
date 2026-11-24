'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { setAuthSession } from '../../../lib/auth';
import { api } from '../../../lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@studentverse.com');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const emailNorm = email.toLowerCase().trim();
      const res = await api.auth.login(emailNorm, password);

      if (res && res.accessToken && res.user) {
        const roles = res.user.roles || [];
        const isAdmin = roles.some((r: string) => ['ADMIN', 'SUPER_ADMIN', 'PLATFORM_ADMIN'].includes(r));
        if (!isAdmin) {
          throw new Error('Access denied. Administrator privileges are required to access this portal.');
        }

        setAuthSession(res.accessToken, {
          id: res.user.id,
          email: res.user.email,
          fullName: res.user.fullName || 'Platform Admin',
          roles: res.user.roles,
          country: res.user.country || 'Global',
          createdAt: res.user.createdAt,
        });
        router.push('/admin');
      } else {
        throw new Error('Invalid response received from authentication server.');
      }
    } catch (err: any) {
      if (err.message && (err.message.includes('fetch') || err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
        setError('Unable to connect to authentication server. Please ensure the backend is running on port 4000.');
      } else {
        setError(err?.message || 'Invalid administrator credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
            SV
          </div>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Authorised Personnel Only</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">Internal Admin Management</h2>
        <p className="mt-2 text-sm text-slate-400">
          Access course scheduling, employer vetting, assignment evaluations &amp; hiring coordination
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-6 border border-slate-800 rounded-2xl sm:px-10 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/60 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="admin@studentverse.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Admin Secret Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Verifying...' : 'Authenticate Admin Session'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400">
            <span className="font-bold text-slate-300 block mb-1">Development Admin Access:</span>
            <span>Email: <code>admin@studentverse.com</code></span><br />
            <span>Password: <code>Admin@123</code></span>
          </div>
        </div>
      </div>
    </div>
  );
}
