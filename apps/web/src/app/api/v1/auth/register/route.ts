import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabaseServer, JWT_SECRET } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName, country, role, companyName, website, industry, designation } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { message: 'Full name, email, and password are required.' },
        { status: 400 }
      );
    }

    const emailNorm = email.toLowerCase().trim();

    // 1. Check if user already exists in PostgreSQL
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

    // 2. Hash password securely
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userId = crypto.randomUUID();
    const isEmployer = role === 'EMPLOYER';
    // Strictly isolate roles: students only receive STUDENT; employers only receive EMPLOYER
    const assignedRoles = isEmployer ? ['EMPLOYER'] : ['STUDENT'];

    // 3. Create permanent User record
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

    // 4. Assign role in UserRoleAssignment
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
      orgName = companyName || `${fullName}'s Organization`;
      const cleanSlug = `${orgName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;
      await supabaseServer.from('Organisation').insert({
        id: orgId,
        name: orgName,
        slug: cleanSlug,
        website: website || 'https://company.com',
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
        headline: designation || 'Digital Skills Learner',
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
      headline: designation || (isEmployer ? 'Hiring Partner' : 'Digital Skills Learner'),
      companyName: orgName || undefined,
      isEmployerVerified: isEmployer ? false : undefined,
      createdAt: new Date().toISOString(),
    };

    // 6. Generate verified JWT session token
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
      accessToken,
      user: userData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Internal server error during registration.' },
      { status: 500 }
    );
  }
}
