# StudentVerse

> **Global Digital Skills Learning & Talent Hiring Platform**  
> Operating Entity: **StudentVerse [RankGood Tech]**  
> Baseline: PRD & Technical Architecture Version 1.0 (November 2026)

---

## 1. Executive Summary

StudentVerse is an independent, two-sided digital-skills learning and verified recruitment platform:
1. **Learners** develop job-relevant digital skills through structured online programmes, complete assessed capstone projects, earn verifiable credentials, and maintain a consent-controlled talent profile.
2. **Verified Employers** register, complete business verification, publish moderated vacancies, and search an opted-in talent pool of career-ready candidates.
3. **Core Standard:** Career assistance and access to vetted opportunities, **not** a guarantee of employment.

---

## 2. Architecture & Monorepo Layout

Built as an approved modular monolith using **pnpm workspaces**:

```text
StudentVerse/
├── apps/
│   ├── web/                         # Next.js 14 (App Router, Tailwind CSS, Lucide Icons)
│   │   ├── src/app/
│   │   │   ├── page.tsx             # 12-section homepage from PRD 4.1
│   │   │   ├── courses/             # Public course catalogue with filters & search
│   │   │   ├── courses/[slug]/      # Public syllabus, prerequisites, outcomes & fee transparency
│   │   │   ├── jobs/                # Public job directory with verified hiring partner badges
│   │   │   ├── jobs/[slug]/         # Job detail and one-time application workflow
│   │   │   ├── for-employers/       # Employer landing page & business verification intake
│   │   │   ├── certifications/verify/  # Public credential lookup
│   │   │   ├── certifications/verify/[code]/ # Verifiable credential page (Rule AC-05)
│   │   │   ├── student/             # Student portal: LMS player, progress, BR-05 opt-in toggle
│   │   │   ├── employer/            # Employer portal: candidate search, AC-07 vetting gate
│   │   │   ├── privacy/             # Privacy Policy (StudentVerse [RankGood Tech])
│   │   │   └── terms/               # Terms of Service & Placement Disclaimer
│   │   └── src/components/          # Sticky Navbar, Comprehensive 6-column Footer
│   │
│   └── api/                         # NestJS 10 Modular Monolith REST API (/api/v1)
│       ├── prisma/schema.prisma     # Complete PostgreSQL schema (8 domains)
│       └── src/modules/
│           ├── identity/            # Auth, RBAC, registration & sessions
│           ├── courses/             # Course catalogue & module/lesson CMS
│           ├── recruitment/         # Jobs & restricted candidate discovery
│           ├── credentials/         # Verifiable certificate issuance & revocation
│           └── talent/              # Learner career profiles & consent logging
│
└── packages/
    ├── types/                       # Shared domain TypeScript types, enums & legal notice
    └── tsconfig/                    # Shared compiler options
```

---

## 3. Core Invariants & Business Rules Implemented

| Rule ID | Implementation Detail |
| :--- | :--- |
| **BR-05 & BR-06** | **Strict Talent Privacy:** Learner career profiles default to `PRIVATE`. Candidate discovery is restricted strictly to verified employers and only returns candidates with explicit `SEARCHABLE` consent. |
| **BR-01 & AC-07** | **Employer Vetting Gate:** Unverified companies cannot post active jobs or access candidate search. Accounts require manual business review and verification. |
| **AC-04 & AC-05** | **Cryptographic Credential Verification:** Public credentials (e.g. `SV-2026-DM-849201`) verify course completion and competencies. Forged or revoked credentials (e.g. `SV-2026-REV-000000`) are explicitly rejected with logged revocation reasons. |
| **Rule AC-09** | **Single Application:** Students apply once per job with verified credentials and capstone snapshots. |
| **Legal Notice** | All Privacy Policy, Terms, and Credential Issuer records cite **StudentVerse [RankGood Tech]**. |

---

## 4. Getting Started

### Prerequisites
- Node.js (v20+ or v24 LTS)
- pnpm (v12+)
- PostgreSQL (or local connection string)

### Installation
```bash
# Install workspace dependencies
pnpm install

# Generate Prisma Client
pnpm db:generate
```

### Running Locally

```bash
# Start backend API (NestJS on http://localhost:4000)
# Interactive Swagger docs: http://localhost:4000/api/docs
pnpm --filter @studentverse/api dev

# Start frontend Web App (Next.js on http://localhost:3000)
pnpm --filter @studentverse/web dev
```

---

## 5. Sample Verifiable Records

| Identifier | Type | Status | Recipient / Role |
| :--- | :--- | :--- | :--- |
| `SV-2026-DM-849201` | Certificate | **VALID** | Elena Rostova (Digital Marketing Foundations) |
| `SV-2026-AI-772910` | Certificate | **VALID** | Marcus Chen (AI Workflow Automation) |
| `SV-2026-REV-000000` | Certificate | **REVOKED** | Audit flag for non-original capstone |
| `remote-marketing-operations-associate` | Job | **ACTIVE** | Apex Growth Labs (Verified Partner) |

