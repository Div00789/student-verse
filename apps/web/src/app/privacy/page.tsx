import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Globe, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Data Protection &amp; Consent Framework</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              Version 1.0 &bull; Effective Date: 16 November 2026 &bull; StudentVerse [RankGood Tech]
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-xs leading-relaxed text-slate-600 space-y-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Data Controller &amp; Operating Entity</h2>
              <p>
                This Privacy Policy governs the collection, processing, and disclosure of personal and educational data across the <strong>StudentVerse</strong> platform. The operating entity and data controller is <strong>StudentVerse [RankGood Tech]</strong> (&quot;StudentVerse&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
              </p>
              <p>
                Inquiries regarding data protection, access requests, or revocation of consent may be submitted to our designated privacy officer at <strong>privacy@studentverse.com</strong>.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. Privacy-First Talent Discovery (Rule BR-05 &amp; BR-06)</h2>
              <p>
                StudentVerse operates on strict consent boundaries:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Default Private State:</strong> Enrolling in or completing a digital skills programme never automatically exposes your name, profile, or contact details to hiring partners or employers.
                </li>
                <li>
                  <strong>Explicit Opt-In:</strong> Learners must manually and separately opt in to the employer talent discovery pool.
                </li>
                <li>
                  <strong>Contact Shielding:</strong> Employers can view demonstrated skills, completed coursework, and approved portfolio links. Direct personal contact information (email address, telephone number) is never displayed in public searches or bulk-exported to third parties.
                </li>
                <li>
                  <strong>Instant Revocation:</strong> You retain the unilateral right to switch your profile back to Private at any time through your Student Portal settings.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Information We Collect</h2>
              <p>We collect and process the following categories of data:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Account Identity:</strong> Full name, verified email address, country of residence, and timezone.</li>
                <li><strong>Educational Records:</strong> Lesson completion timestamps, quiz attempts, scores, and capstone project submissions.</li>
                <li><strong>Credentials:</strong> Public credential IDs, issue dates, and demonstrated competencies.</li>
                <li><strong>Hiring Partner Information:</strong> Corporate identity, registered domain, and authorized recruiter accounts.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. No Data Brokering or Scraping</h2>
              <p>
                StudentVerse [RankGood Tech] strictly prohibits the automated scraping, bulk harvesting, or third-party resale of learner or candidate information. Employer accounts found attempting mass export or abusive scraping are immediately suspended under Rule AC-10.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">5. User Rights &amp; Retention</h2>
              <p>
                You may request an export of your personal data or permanent deletion of your account by submitting a support ticket. Financial transaction logs and issued credential verification records are retained for statutory legal and compliance accounting periods.
              </p>
            </section>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>&copy; 2026 StudentVerse [RankGood Tech]</span>
            <Link href="/terms" className="text-indigo-600 hover:underline">
              View Terms of Service &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
