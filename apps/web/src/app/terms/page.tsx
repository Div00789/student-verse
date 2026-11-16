import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, AlertCircle } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Platform Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              Version 1.0 &bull; Effective Date: 16 November 2026 &bull; StudentVerse [RankGood Tech]
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-xs leading-relaxed text-slate-600 space-y-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the StudentVerse platform, you agree to be bound by these Terms of Service entered into with <strong>StudentVerse [RankGood Tech]</strong>. If you do not agree, you must discontinue access immediately.
              </p>
            </section>

            <section className="space-y-2" id="placement">
              <h2 className="text-base font-bold text-slate-900">2. Placement &amp; Employment Disclaimer (Rule BR-11)</h2>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <strong>IMPORTANT NOTICE:</strong> StudentVerse is an educational and skills-matching platform. We provide practical training, assessed capstone project evaluations, resume reviews, and introductions to verified hiring partners. <strong>StudentVerse does not guarantee employment, job offers, immigration visas, work permits, or specific compensation outcomes.</strong>
              </div>
              <p>
                All hiring decisions are made solely at the discretion of independent hiring partners based on candidate qualifications and mutual agreement.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Business Vetting of Hiring Partners (Rule AC-07)</h2>
              <p>
                Organizations registering as hiring partners must complete business verification before accessing candidate searches or posting jobs. StudentVerse [RankGood Tech] reserves the absolute right to suspend or reject any employer account that fails verification or violates fair-hiring principles.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. Certificates of Completion &amp; Authenticity</h2>
              <p>
                Certificates of Completion are issued exclusively by <strong>StudentVerse [RankGood Tech]</strong> upon successful completion of required lessons and passing rubric scores on capstone submissions. Any attempt to forge, modify, or falsify credential identifiers constitutes a material violation resulting in permanent revocation under Rule AC-05.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">5. Payment &amp; Refund Policy</h2>
              <p>
                Course fees are denominated in the currency displayed at checkout. Standard refunds are available within 14 calendar days of purchase provided fewer than 20% of curriculum lessons have been completed and no capstone evaluation has been submitted.
              </p>
            </section>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>&copy; 2026 StudentVerse [RankGood Tech]</span>
            <Link href="/privacy" className="text-indigo-600 hover:underline">
              View Privacy Policy &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

