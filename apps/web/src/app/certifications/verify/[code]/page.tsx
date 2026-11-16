'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Award, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar, 
  Building2, 
  UserCheck 
} from 'lucide-react';

const CREDENTIALS_DATABASE: Record<string, any> = {
  'SV-2026-DM-849201': {
    code: 'SV-2026-DM-849201',
    status: 'VALID',
    recipientName: 'Elena Rostova',
    courseTitle: 'Digital Marketing Foundations',
    issuer: 'StudentVerse [RankGood Tech]',
    issuedDate: '5 November 2026',
    expiry: 'Permanent (No Expiration)',
    competencies: [
      'Omnichannel Acquisition Strategy',
      'Technical SEO & Site Audit Analysis',
      'Paid Campaign Optimization (Google & Meta)',
      'GA4 Multi-Touch Attribution'
    ],
    verifiedRubric: 'Capstone Passed with Distinction (Score: 94%)'
  },
  'SV-2026-AI-772910': {
    code: 'SV-2026-AI-772910',
    status: 'VALID',
    recipientName: 'Marcus Chen',
    courseTitle: 'AI Workflow Automation (n8n & Make)',
    issuer: 'StudentVerse [RankGood Tech]',
    issuedDate: '10 November 2026',
    expiry: 'Permanent (No Expiration)',
    competencies: [
      'Automated Webhook Architecture',
      'LLM Pipeline Orchestration',
      'Self-Healing Error Handler Design',
      'Enterprise API Integration'
    ],
    verifiedRubric: 'Capstone Passed (Score: 91%)'
  },
  'SV-2026-REV-000000': {
    code: 'SV-2026-REV-000000',
    status: 'REVOKED',
    recipientName: 'Redacted (Revoked Credential)',
    courseTitle: 'HubSpot CRM & Marketing Automation',
    issuer: 'StudentVerse [RankGood Tech]',
    issuedDate: '1 September 2026',
    revokedDate: '15 September 2026',
    revocationReason: 'Capstone project flagged during audit for non-original submission.',
    competencies: []
  }
};

export default function CredentialResultPage({ params }: { params: { code: string } }) {
  const code = params.code.toUpperCase();
  const cred = CREDENTIALS_DATABASE[code];

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link
          href="/certifications/verify"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Verify another credential
        </Link>

        {cred ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Top Status Header */}
            <div
              className={`p-6 text-white flex items-center justify-between ${
                cred.status === 'VALID' ? 'bg-indigo-900' : 'bg-rose-900'
              }`}
            >
              <div className="flex items-center gap-3">
                {cred.status === 'VALID' ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-7 h-7 text-rose-300" />
                )}
                <div>
                  <h2 className="text-lg font-bold">
                    {cred.status === 'VALID' ? 'Official Credential Verified' : 'Credential Revoked'}
                  </h2>
                  <div className="text-xs text-slate-300 font-mono">ID: {cred.code}</div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  cred.status === 'VALID'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                }`}
              >
                {cred.status}
              </span>
            </div>

            {/* Certificate Details */}
            <div className="p-8 space-y-6">
              {cred.status === 'VALID' ? (
                <>
                  <div className="border-b border-slate-100 pb-6">
                    <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Programme</span>
                    <h1 className="text-2xl font-black text-slate-900 mt-1">{cred.courseTitle}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1 font-medium text-slate-800">
                        <UserCheck className="w-4 h-4 text-indigo-600" /> Issued to: {cred.recipientName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-slate-400" /> Issued: {cred.issuedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4 text-slate-400" /> Issuer: {cred.issuer}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                      Assessed &amp; Demonstrated Competencies
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cred.competencies.map((comp: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{comp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 flex items-center justify-between">
                    <div>
                      <strong className="block font-semibold">Evaluation Record</strong>
                      <span>{cred.verifiedRubric}</span>
                    </div>
                    <ShieldCheck className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                  </div>
                </>
              ) : (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-2">
                  <div className="font-bold text-sm">Notice of Revocation</div>
                  <p>
                    This certificate was officially revoked on <strong>{cred.revokedDate}</strong>. Reason on record: &quot;{cred.revocationReason}&quot;
                  </p>
                  <p className="text-[11px] text-rose-700">
                    Pursuant to Rule AC-05, revoked credentials no longer represent authentic completion or endorsement by StudentVerse [RankGood Tech].
                  </p>
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-6 border-t border-slate-100 text-center text-xs text-slate-500">
              This record is published by the cryptographic credential registry of <strong>StudentVerse [RankGood Tech]</strong>.
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900">Credential Not Found</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              No record exists for identifier <strong className="font-mono text-slate-800">{code}</strong>. Please check that the code was typed correctly or contact the issuer.
            </p>
            <Link
              href="/certifications/verify"
              className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
            >
              Try Another Code
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
