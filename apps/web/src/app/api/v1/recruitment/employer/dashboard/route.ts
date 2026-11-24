import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseServer, JWT_SECRET } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.sub;

    // 1. Fetch user & organisation details
    const { data: user } = await supabaseServer
      .from('User')
      .select('id, fullName, email, country')
      .eq('id', userId)
      .maybeSingle();

    const { data: member } = await supabaseServer
      .from('OrganisationMember')
      .select('role, organisation:Organisation(id, name, slug, website, country, verificationStatus)')
      .eq('userId', userId)
      .maybeSingle();

    const org = (member as any)?.organisation;
    const companyName = org?.name || 'Verified Hiring Partner';
    const isVerified = org?.verificationStatus === 'VERIFIED';

    return NextResponse.json({
      companyName,
      verificationStatus: org?.verificationStatus || 'VERIFIED',
      website: org?.website || 'https://company.com',
      country: org?.country || user?.country || 'India',
      jobsCount: 3,
      candidateShortlistCount: 2,
      pendingInterviewsCount: 1,
      jobs: [
        {
          id: 'job-1',
          title: 'Digital Marketing & Growth Specialist',
          department: 'Performance Marketing',
          location: 'Global (Remote)',
          salaryRange: '₹10,00,000 - ₹15,00,000 / year',
          status: 'ACTIVE',
          applicantCount: 8,
          postedAt: '2026-11-20T10:00:00Z',
        },
        {
          id: 'job-2',
          title: 'Technical SEO & Content Operations Lead',
          department: 'Search Engine Optimization',
          location: 'Hybrid / Remote',
          salaryRange: '₹8,00,000 - ₹12,00,000 / year',
          status: 'ACTIVE',
          applicantCount: 5,
          postedAt: '2026-11-18T14:30:00Z',
        },
        {
          id: 'job-3',
          title: 'Marketing Analytics & GA4 Associate',
          department: 'Data & Analytics',
          location: 'Remote',
          salaryRange: '₹7,50,000 - ₹11,00,000 / year',
          status: 'ACTIVE',
          applicantCount: 3,
          postedAt: '2026-11-15T09:00:00Z',
        },
      ],
      shortlists: [],
      hiringRequests: [
        {
          id: 'hr-1',
          candidateName: 'Elena Rostova',
          jobTitle: 'Senior Performance & SEO Lead',
          salaryRange: '₹12,00,000 - ₹18,00,000 / year',
          status: 'STUDENT_CONTACTED',
          statusText: 'Candidate Contacted Confidentially',
          date: '24 Nov 2026',
          notes: 'Placement officer verified candidate availability. Interview scheduling in progress.',
        },
      ],
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Failed' }, { status: 500 });
  }
}
