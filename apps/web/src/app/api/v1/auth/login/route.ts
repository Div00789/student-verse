import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabaseServer, JWT_SECRET } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const emailNorm = email.toLowerCase().trim();

    // 1. Query user from PostgreSQL via Supabase
    const { data: user, error: userErr } = await supabaseServer
      .from('User')
      .select('id, email, passwordHash, fullName, country, timezone, createdAt')
      .eq('email', emailNorm)
      .maybeSingle();

    if (userErr || !user) {
      return NextResponse.json(
        { message: 'Invalid email address or password.' },
        { status: 401 }
      );
    }

    // 2. Validate password
    let passwordValid = false;
    if (user.passwordHash) {
      passwordValid = await bcrypt.compare(password, user.passwordHash);
    }

    // Support canonical passwords for demo/system accounts
    const canonicalEmails = [
      'student@studentverse.com',
      'employer@studentverse.com',
      'admin@studentverse.com',
    ];
    if (!passwordValid && canonicalEmails.includes(emailNorm)) {
      if (password === 'StudentVerse@2026' || password === 'Student@123' || password === 'Employer@123' || password === 'Admin@123') {
        passwordValid = true;
      }
    }

    if (!passwordValid) {
      return NextResponse.json(
        { message: 'Invalid email address or password.' },
        { status: 401 }
      );
    }

    // 3. Query user roles
    const { data: rolesData } = await supabaseServer
      .from('UserRoleAssignment')
      .select('role')
      .eq('userId', user.id);

    const roles = rolesData && rolesData.length > 0 ? rolesData.map((r: any) => r.role) : ['STUDENT'];

    // 4. Query learner profile or organisation membership
    const { data: learnerProfile } = await supabaseServer
      .from('LearnerProfile')
      .select('headline, avatarUrl')
      .eq('userId', user.id)
      .maybeSingle();

    const { data: orgMember } = await supabaseServer
      .from('OrganisationMember')
      .select('role, organisation:Organisation(name, verificationStatus)')
      .eq('userId', user.id)
      .maybeSingle();

    const org = (orgMember as any)?.organisation;

    const userData = {
      id: user.id,
      email: user.email,
      fullName: user.fullName || emailNorm.split('@')[0],
      roles,
      country: user.country || 'India',
      headline: learnerProfile?.headline || (roles.includes('EMPLOYER') ? 'Hiring Partner' : 'Student Learner'),
      companyName: org?.name,
      isEmployerVerified: org?.verificationStatus === 'VERIFIED',
      profilePicture: learnerProfile?.avatarUrl,
      createdAt: user.createdAt,
    };

    // 5. Generate verified JWT
    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        roles,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      accessToken,
      user: userData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Authentication failed.' },
      { status: 500 }
    );
  }
}
