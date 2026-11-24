'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  LineChart, 
  Layers, 
  Award, 
  Search, 
  Users, 
  FileCheck2,
  Lock,
  ChevronDown,
  Building2
} from 'lucide-react';

export default function HomePage() {
  const [audienceTab, setAudienceTab] = useState<'learn' | 'hire'>('learn');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setFaqOpen(faqOpen === idx ? null : idx);
  };

  return (
    <div className="flex flex-col">
      {/* -------------------------------------------------------------
          1. HERO SECTION
      ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-slate-50 pt-16 pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>The Two-Sided Platform for Digital Competence &amp; Verified Hiring</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
                Learn Practical Digital Skills. <br />
                <span className="text-indigo-600">Prove It with Real Work.</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                StudentVerse bridges the gap between digital training and career opportunities. Master job-ready workflows in Growth, RevOps, and AI Automation through evaluated capstones, verifiable credentials, and direct access to vetted hiring partners.
              </p>

              {/* Dual Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-0.5"
                >
                  <GraduationCap className="w-5 h-5" />
                  Explore Courses
                </Link>
                <Link
                  href="/for-employers"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-base shadow-sm transition-all hover:-translate-y-0.5"
                >
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Hire Talent
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Assessed Capstone Projects</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>Vetted Hiring Partners</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  <span>100% Consent-Based Profiles</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Card Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Candidate Quality Standard</span>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Verified Rubric</span>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Curriculum Completion</span>
                      <span className="font-semibold text-slate-800">100% (All Modules)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-2 rounded-full w-full" />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Assessed Capstone Evidence</span>
                      <span className="font-semibold text-slate-800">Grade: 94% Passed</span>
                    </div>
                    <p className="text-xs text-slate-600 italic">
                      &quot;Comprehensive multi-channel attribution model with working GA4 triggers and campaign ROI audit.&quot;
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-indigo-950">Credential ID: SV-2026-DM-849201</div>
                      <div className="text-[11px] text-indigo-700">Issuer: StudentVerse</div>
                    </div>
                    <Link
                      href="/certifications/verify/SV-2026-DM-849201"
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
                    >
                      Verify &rarr;
                    </Link>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    Private until learner opts in
                  </span>
                  <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Audit Logged
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. AUDIENCE SELECTOR
      ------------------------------------------------------------- */}
      <section className="bg-white py-8 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">Choose Your Objective</p>
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setAudienceTab('learn')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                audienceTab === 'learn'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              I want to learn digital skills
            </button>
            <button
              onClick={() => setAudienceTab('hire')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                audienceTab === 'hire'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-600" />
              I want to hire career-ready talent
            </button>
          </div>

          <div className="mt-4 text-sm text-slate-600 max-w-xl mx-auto">
            {audienceTab === 'learn' ? (
              <p>
                Browse comprehensive syllabi, complete practical assignments reviewed by experts, build an assessed portfolio, and access career guidance.
              </p>
            ) : (
              <p>
                Stop sifting through unverified CV claims. Search consented, assessed portfolios of candidates with verifiable skills in growth, RevOps, and workflow automation.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. EXPLORE DIGITAL SKILLS (CATEGORIES)
      ------------------------------------------------------------- */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Curated Pathways</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">High-Demand Digital Domains</h3>
            <p className="text-slate-600 mt-2 text-sm">
              Every track is designed with real workplace deliverables—not theoretical lectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Growth &amp; Performance Marketing</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Master full-funnel acquisition, paid media strategy across Meta &amp; Google Ads, technical SEO architecture, and multi-touch GA4 attribution.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">SEO</span>
                <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Paid Media</span>
                <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Analytics</span>
              </div>
              <Link href="/courses" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                Explore Pathway &rarr;
              </Link>
            </div>

            {/* Category 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Revenue Operations (RevOps)</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Architect CRM pipelines in HubSpot, automate lifecycle lead routing, build SLA triggers, and construct clean custom object data models.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">HubSpot</span>
                <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Lifecycle Stages</span>
                <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Pipelines</span>
              </div>
              <Link href="/courses" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                Explore Pathway &rarr;
              </Link>
            </div>

            {/* Category 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">AI Workflow Automation</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Build production automated agents using n8n and Make, handle webhooks, automate error retries, and integrate LLMs into business processes.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">n8n</span>
                <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Make</span>
                <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">LLM Agents</span>
              </div>
              <Link href="/courses" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                Explore Pathway &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. FEATURED COURSES
      ------------------------------------------------------------- */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Flagship Programmes</h2>
              <h3 className="text-3xl font-extrabold text-slate-900">Featured Courses with Assessed Portfolios</h3>
            </div>
            <Link
              href="/courses"
              className="mt-4 md:mt-0 text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              View Full Course Catalogue &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Course Card 1 */}
            <div className="flex flex-col bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-44 bg-slate-800 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"
                  alt="Digital Marketing Foundations"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur text-slate-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                  Beginner &bull; Self-Paced
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Growth &amp; Marketing</div>
                  <h4 className="text-lg font-bold text-slate-950 mb-2">Digital Marketing Foundations</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Master SEO, paid ads, campaign architecture, email nurture sequences, and assessed GA4 attribution capstone.
                  </p>
                  <div className="text-xs text-slate-500 space-y-1 mb-5">
                    <div>&bull; Duration: <strong>32 hours</strong></div>
                    <div>&bull; Deliverable: <strong>Evaluated Campaign Portfolio</strong></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-slate-900">₹24,999</span>
                  <Link
                    href="/courses/digital-marketing-foundations"
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 rounded-lg transition-colors"
                  >
                    View Syllabus
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="flex flex-col bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-44 bg-slate-800 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60"
                  alt="HubSpot CRM & Automation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur text-slate-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                  Intermediate &bull; Self-Paced
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Revenue Operations</div>
                  <h4 className="text-lg font-bold text-slate-950 mb-2">HubSpot CRM &amp; Automation</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Build clean sales pipelines, lead scoring models, multi-branch workflows, and verified customer lifecycle automations.
                  </p>
                  <div className="text-xs text-slate-500 space-y-1 mb-5">
                    <div>&bull; Duration: <strong>28 hours</strong></div>
                    <div>&bull; Deliverable: <strong>RevOps System Blueprint</strong></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-slate-900">₹24,999</span>
                  <Link
                    href="/courses/hubspot-crm-automation"
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 rounded-lg transition-colors"
                  >
                    View Syllabus
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="flex flex-col bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-44 bg-slate-800 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60"
                  alt="AI Workflow Automation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur text-slate-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                  Intermediate &bull; Self-Paced
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Automation &amp; AI</div>
                  <h4 className="text-lg font-bold text-slate-950 mb-2">AI Workflow Automation (n8n &amp; Make)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Deploy enterprise automated workflows, webhook routers, self-healing retries, and integrate LLM agents into business operations.
                  </p>
                  <div className="text-xs text-slate-500 space-y-1 mb-5">
                    <div>&bull; Duration: <strong>36 hours</strong></div>
                    <div>&bull; Deliverable: <strong>Autonomous Ops Agent Project</strong></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-slate-900">₹29,999</span>
                  <Link
                    href="/courses/ai-workflow-automation"
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 rounded-lg transition-colors"
                  >
                    View Syllabus
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          5. HOW IT WORKS (TABBED LEARNER / EMPLOYER JOURNEY)
      ------------------------------------------------------------- */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">End-to-End Pathways</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">How StudentVerse Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Learner Flow */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                <h4 className="text-xl font-bold text-slate-900">Learner Pathway: Learn to Opportunities</h4>
              </div>
              <ol className="space-y-4 text-xs text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center flex-shrink-0">1</span>
                  <div>
                    <strong className="text-slate-900 font-semibold block text-sm">Transparent Enrolment</strong>
                    Review the full syllabus and project deliverables before purchase. Enrol and access bite-sized lessons.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center flex-shrink-0">2</span>
                  <div>
                    <strong className="text-slate-900 font-semibold block text-sm">Evaluated Practical Work</strong>
                    Complete hands-on quizzes and submit rubric-evaluated capstone projects verified by real practitioners.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center flex-shrink-0">3</span>
                  <div>
                    <strong className="text-slate-900 font-semibold block text-sm">Verifiable Credential</strong>
                    Earn an authentic StudentVerse Certificate of Completion with a non-sequential, public verification ID.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center flex-shrink-0">4</span>
                  <div>
                    <strong className="text-slate-900 font-semibold block text-sm">Consent-Controlled Discovery</strong>
                    Separately choose if and when to opt in to the employer talent discovery pool. Apply to vetted jobs with full privacy controls.
                  </div>
                </li>
              </ol>
            </div>

            {/* Employer Flow */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <Building2 className="w-6 h-6 text-indigo-600" />
                <h4 className="text-xl font-bold text-slate-900">Hiring Partner Pathway: Verified Talent</h4>
              </div>
              <ol className="space-y-4 text-xs text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center flex-shrink-0">1</span>
                  <div>
                    <strong className="text-slate-900 font-semibold block text-sm">Organisation Vetting</strong>
                    Register your company and submit business verification. Admin review prevents fake job posts and talent scams.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center flex-shrink-0">2</span>
                  <div>
                    <strong className="text-slate-900 font-semibold block text-sm">Moderated Job Postings</strong>
                    Publish vacancies with explicit requirements, compensation disclosures, and screening questions.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center flex-shrink-0">3</span>
                  <div>
                    <strong className="text-slate-900 font-semibold block text-sm">Filter Consenting Candidates</strong>
                    Search active candidates by demonstrated skills, portfolio links, and timezone readiness. No scraper or cold spam tools.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center flex-shrink-0">4</span>
                  <div>
                    <strong className="text-slate-900 font-semibold block text-sm">Platform-Mediated Hiring</strong>
                    Shortlist, coordinate interviews, and extend offers with auditable stage tracking and candidate consent.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          6. TALENT QUALITY & CERTIFICATION FRAMEWORK
      ------------------------------------------------------------- */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Proof Over Claims</span>
              <h3 className="text-3xl font-extrabold text-slate-900">
                The StudentVerse Candidate Quality Framework
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Most platforms let candidates write whatever keywords they want on a resume. StudentVerse evaluates proof before candidates enter the hiring pipeline.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <FileCheck2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-sm block">Rubric-Evaluated Submissions:</strong>
                    <span className="text-xs text-slate-600">Capstones are scored against production benchmarks, ensuring work is original and functional.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-sm block">Verifiable Credential IDs:</strong>
                    <span className="text-xs text-slate-600">Every completion certificate carries a permanent, cryptographic verification link issued by StudentVerse.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-sm block">Zero Impersonation or Scraping:</strong>
                    <span className="text-xs text-slate-600">Bulk exports, CV scrapers, and unmoderated outreach are strictly blocked to protect student privacy.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900 text-slate-200 p-8 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-300">PUBLIC VERIFICATION RECORD</span>
                </div>
                <span className="text-xs text-emerald-400 font-mono">STATUS: ISSUED</span>
              </div>
              <div className="mt-6 space-y-3 font-mono text-xs">
                <div>
                  <span className="text-slate-500">ID:</span> <span className="text-white font-bold">SV-2026-DM-849201</span>
                </div>
                <div>
                  <span className="text-slate-500">ISSUER:</span> <span className="text-indigo-300 font-semibold">StudentVerse</span>
                </div>
                <div>
                  <span className="text-slate-500">RECIPIENT:</span> <span className="text-slate-300">Elena Rostova</span>
                </div>
                <div>
                  <span className="text-slate-500">PROGRAMME:</span> <span className="text-slate-300">Digital Marketing Foundations</span>
                </div>
                <div>
                  <span className="text-slate-500">COMPETENCIES:</span>
                  <div className="mt-1 pl-4 space-y-1 text-slate-400">
                    <div>&gt; Omnichannel Acquisition Strategy</div>
                    <div>&gt; Technical SEO &amp; Site Audit Analysis</div>
                    <div>&gt; Paid Campaign Optimization (Google &amp; Meta)</div>
                    <div>&gt; GA4 Multi-Touch Attribution</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                <Link
                  href="/certifications/verify/SV-2026-DM-849201"
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline"
                >
                  Inspect Public Record &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          7. TRUST, DISCLOSURES & FAQS
      ------------------------------------------------------------- */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Frequently Asked Questions</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">Policies, Outcomes &amp; Integrity</h3>
            <p className="text-sm text-slate-600 mt-2">
              Clear commitments, transparent expectations, and zero exaggerated claims.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Does StudentVerse guarantee job placement or employment?",
                a: "No. StudentVerse offers career support, portfolio reviews, interview preparation, and direct introductions to verified hiring partners. We do not make or tolerate guaranteed employment claims, job promises, or visa sponsorships. Placement is earned through merit, skill, and mutual employer agreement."
              },
              {
                q: "How is student privacy protected in employer talent searches?",
                a: "Student profiles are 100% private by default (Rule BR-05). Enrolling in or completing a course never exposes your information. You must explicitly opt in to the talent search pool, and you retain the right to switch your profile back to Private or delete your account at any time."
              },
              {
                q: "Who is the official operating entity behind StudentVerse?",
                a: "StudentVerse is operated by StudentVerse, providing verified digital skill credentials and ethical recruitment workflows globally."
              },
              {
                q: "How are employers vetted on the platform?",
                a: "Employers must submit verified business documentation, corporate email verification, and official company records. Our administration team manually reviews each account before job posting and candidate search features are unlocked (Rule AC-07)."
              },
              {
                q: "What is the refund and cancellation policy?",
                a: "Learners may request a refund within our published grace window provided less than 20% of course content has been accessed. Capstone evaluations and issued certificates are non-refundable."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-slate-900 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      faqOpen === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {faqOpen === idx && (
                  <div className="px-6 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          8. FINAL DUAL CTA
      ------------------------------------------------------------- */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Build Real Digital Skills or Hire Assessed Talent?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Join thousands of ambitious international learners and vetted global employers on StudentVerse.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/courses"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Start Learning Today
            </Link>
            <Link
              href="/for-employers"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur transition-transform hover:-translate-y-0.5"
            >
              Become a Hiring Partner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
