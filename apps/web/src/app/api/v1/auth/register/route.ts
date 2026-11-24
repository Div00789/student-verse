import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabaseServer, JWT_SECRET } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName, country, role, companyName } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { message: 'Full name, email, and password are required.' },
        { status: 400 }
      );
    }

    const emailNorm = email.toLowerCase().trim();

    // 1. Check if user already exists
    const { data: existingUser } = await supabaseServer
      .from('User')
      .select('id')
      .eq('email', emailNorm)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { message: 'An account with this email address already exists. Please sign in instead.' },
        { status: 409 }
      );
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userId = crypto.randomUUID();
    const isEmployer = role === 'EMPLOYER';
    const assignedRoles = isEmployer ? ['EMPLOYER', 'EMPLOYER_OWNER'] : ['STUDENT', 'LEARNER'];

    // 3. Create User record
    const { error: userErr } = await supabaseServer.from('User').insert({
      id: userId,
      email: emailNorm,
      passwordHash,
      fullName: fullName.trim(),
      country: country || 'India',
      timezone: 'UTC',
      isEmailVerified: true,
    });

    if (userErr) {
      return NextResponse.json(
        { message: `Failed to create user: ${userErr.message}` },
        { status: 500 }
      );
    }

    // 4. Assign roles
    const roleInserts = assignedRoles.map((r) => ({
      id: crypto.randomUUID(),
      userId,
      role: r,
    }));
    await supabaseServer.from('UserRoleAssignment').insert(roleInserts);

    // 5. Create LearnerProfile or Organisation
    let orgName = '';
    if (isEmployer) {
      const orgId = crypto.randomUUID();
      orgName = companyName || 'Hiring Partner';
      await supabaseServer.from('Organisation').insert({
        id: orgId,
        name: orgName,
        slug: `${orgName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`,
        website: 'https://studentverse.com',
        country: country || 'India',
        verificationStatus: 'PENDING',
      });
      await supabaseServer.from('OrganisationMember').insert({
        id: crypto.randomUUID(),
        organisationId: orgId,
        userId,
        role: 'EMPLOYER_OWNER',
      });
    } else {
      await supabaseServer.from('LearnerProfile').insert({
        id: crypto.randomUUID(),
        userId,
        headline: 'Digital Skills Learner',
        visibility: 'PRIVATE',
        skills: [],
      });
    }

    const userData = {
      id: userId,
      email: emailNorm,
      fullName: fullName.trim(),
      roles: assignedRoles,
      country: country || 'India',
      headline: isEmployer ? 'Hiring Partner' : 'Digital Skills Learner',
      companyName: orgName || undefined,
      isEmployerVerified: false,
      createdAt: new Date().toISOString(),
    };

    const accessToken = jwt.sign(
      {
        sub: userId,
        email: emailNorm,
        roles: assignedRoles,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      accessToken,
      user: userData,
      message: isEmployer
        ? 'Company account registered successfully. Verification request submitted for review.'
        : 'Welcome to StudentVerse! Your student account is now active.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Registration failed.' },
      { status: 500 }
    );
  }
}
