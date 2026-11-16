import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Globe, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-base">
                SV
              </div>
              <span className="text-xl font-bold text-white tracking-tight">StudentVerse</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Global digital skills learning &amp; verified hiring platform. Structured coursework, assessed capstone portfolios, and verifiable credentials connecting learners with verified hiring partners.
            </p>
            <div className="pt-2 text-xs text-slate-400 flex flex-col gap-1">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Operating entity: StudentVerse [RankGood Tech]
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" /> privacy@studentverse.com
              </span>
            </div>
          </div>

          {/* Learn Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Learn</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/courses" className="hover:text-white transition-colors">All Courses</Link></li>
              <li><Link href="/courses?category=growth" className="hover:text-white transition-colors">Growth &amp; Marketing</Link></li>
              <li><Link href="/courses?category=revops" className="hover:text-white transition-colors">Revenue Operations</Link></li>
              <li><Link href="/courses?category=automation" className="hover:text-white transition-colors">AI &amp; Automation</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Learning Paths</Link></li>
            </ul>
          </div>

          {/* Careers Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Careers</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/jobs" className="hover:text-white transition-colors">Public Job Board</Link></li>
              <li><Link href="/student" className="hover:text-white transition-colors">Talent Profile (Opt-In)</Link></li>
              <li><Link href="/certifications/verify" className="hover:text-white transition-colors">Verify Credential</Link></li>
              <li><Link href="/jobs" className="hover:text-white transition-colors">Remote Roles</Link></li>
            </ul>
          </div>

          {/* Employers Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Hiring Partners</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/for-employers" className="hover:text-white transition-colors">Hire Talent</Link></li>
              <li><Link href="/for-employers#quality" className="hover:text-white transition-colors">Candidate Quality</Link></li>
              <li><Link href="/for-employers#verify" className="hover:text-white transition-colors">Business Vetting</Link></li>
              <li><Link href="/employer" className="hover:text-white transition-colors">Employer Portal</Link></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Trust &amp; Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy#consent" className="hover:text-white transition-colors">Consent &amp; Opt-In</Link></li>
              <li><Link href="/terms#placement" className="hover:text-white transition-colors">Career Policy Notice</Link></li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Career Support Disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 text-[11px] leading-relaxed text-slate-400 space-y-2">
          <p>
            <strong>Career Assistance Disclaimer:</strong> StudentVerse offers skill-building courses, assessed portfolios, resume feedback, and platform-mediated introductions to approved hiring partners. We do not guarantee employment, offer letters, immigration sponsorships, or specific compensation outcomes. Placement support is strictly an assistance layer.
          </p>
          <p>
            <strong>Privacy &amp; Data Control Notice:</strong> In accordance with StudentVerse [RankGood Tech] data policies, all student career profiles remain strictly private by default. Candidates are discoverable in the employer talent pool only after explicit, revocable opt-in consent. Direct personal contacts (phone, email) are never sold or bulk-exported.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-slate-400">
            <span>&copy; {new Date().getFullYear()} StudentVerse [RankGood Tech]. All rights reserved.</span>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> TLS Encrypted</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-indigo-400" /> Business Vetted Employers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

