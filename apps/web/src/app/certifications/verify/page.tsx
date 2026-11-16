'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, Search, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function VerifySearchPage() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/certifications/verify/${encodeURIComponent(code.trim().toUpperCase())}`);
    }
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 border border-indigo-100 shadow-sm">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Certificate &amp; Credential Verification
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            Validate the authenticity, issuer status, and evaluated competencies of any Certificate of Completion issued by <strong>StudentVerse [RankGood Tech]</strong>.
          </p>
        </div>

        {/* Verification Input Box */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Enter Credential ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. SV-2026-DM-849201"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 text-sm font-mono tracking-wide uppercase bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Verify Credential Status
            </button>
          </form>

          {/* Quick sample chips */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500">
            <span className="font-semibold text-slate-700 block mb-2">Try Sample Verified Credentials:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCode('SV-2026-DM-849201')}
                className="font-mono text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded transition-colors"
              >
                SV-2026-DM-849201 (Valid DM Certificate)
              </button>
              <button
                onClick={() => setCode('SV-2026-AI-772910')}
                className="font-mono text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded transition-colors"
              >
                SV-2026-AI-772910 (Valid AI Automation)
              </button>
              <button
                onClick={() => setCode('SV-2026-REV-000000')}
                className="font-mono text-[11px] bg-rose-50 hover:bg-rose-100 text-rose-700 px-2.5 py-1 rounded transition-colors"
              >
                SV-2026-REV-000000 (Revoked Example)
              </button>
            </div>
          </div>
        </div>

        {/* Verification Guidelines */}
        <div className="bg-slate-100/70 rounded-xl p-6 border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Rule AC-05: Authenticity &amp; Integrity Invariant
          </div>
          <p>
            The StudentVerse verification ledger strictly rejects forged, unrecognized, and revoked credential IDs. Recipient privacy is maintained per consent settings, displaying only verified competencies and completion confirmation.
          </p>
        </div>

      </div>
    </div>
  );
}
