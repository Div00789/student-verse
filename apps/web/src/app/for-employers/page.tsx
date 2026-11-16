'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Lock, 
  FileCheck2, 
  Users, 
  ArrowRight,
  Send
} from 'lucide-react';

export default function ForEmployersPage() {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Hiring Partner Discovery Network</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Hire Consenting Candidates with <br />
            <span className="text-indigo-600">Assessed, Verifiable Skills.</span>
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Stop sorting through keyword-stuffed resumes. StudentVerse candidates complete rigorous digital skill curricula, build evaluated capstones, and explicitly opt in to employer discovery.
          </p>
        </div>

        {/* 3 Pillars of Candidate Quality */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" id="quality">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Evaluated Capstone Portfolios</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every candidate in our talent discovery pool has completed evaluated coursework in growth marketing, HubSpot RevOps, or workflow automation (n8n/Make).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Opt-In Consent Only</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No scraped databases or cold outreach lists. Candidates explicitly opt in to employer visibility, meaning higher response rates and mutual respect.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Strict Business Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We vet all hiring partners before candidate search or job posting is enabled. This protects our community and maintains a premium recruitment environment.
            </p>
          </div>
        </div>

        {/* Verification & Registration Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-12 max-w-3xl mx-auto" id="verify">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">Register as a Hiring Partner</h2>
            <p className="text-xs text-slate-500 mt-1">
              Manual business review is required before access to candidate search is approved (Rule AC-07).
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900">Verification Request Received</h3>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                Thank you for applying. Our employer-success team at <strong>StudentVerse [RankGood Tech]</strong> will review your organization details ({companyName}) and follow up via {workEmail} within 1 business day.
              </p>
              <div className="pt-2">
                <Link
                  href="/employer"
                  className="inline-flex text-xs font-semibold text-emerald-700 underline"
                >
                  Preview Employer Portal &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Digital Labs"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Website</label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="recruiting@example.com"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Country / Headquarters</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Germany">Germany</option>
                    <option value="India">India</option>
                    <option value="Other">Other Global</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span>
                    I confirm that I represent a legitimate hiring organization and agree to StudentVerse [RankGood Tech] recruitment, fair-hiring, and anti-fraud terms.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Company for Verification
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

