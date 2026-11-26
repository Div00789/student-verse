const { createClient } = require('../apps/web/node_modules/@supabase/supabase-js');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local or .env if present
const envFiles = [
  path.resolve(__dirname, '../apps/web/.env.local'),
  path.resolve(__dirname, '../apps/web/.env'),
  path.resolve(__dirname, '../.env.local'),
  path.resolve(__dirname, '../.env'),
];

for (const envFile of envFiles) {
  if (fs.existsSync(envFile)) {
    try {
      const content = fs.readFileSync(envFile, 'utf8');
      for (const line of content.split('\n')) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let val = (match[2] || '').trim();
          if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
          if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    } catch (_) {}
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured in environment or .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Import curriculum builder from compiled or directly emulate
const hubspotVideoUrl = 'https://drive.google.com/file/d/1FBLKSAhNLw8monsWiYg7iGe22xvl0c2b/view';

// Read curriculum definitions
async function runSeed() {
  console.log('--- Starting Idempotent Seed for AI & Business Automation Masterclass ---');

  // 1. Upsert Course
  const courseData = {
    slug: 'ai-business-automation-masterclass',
    title: 'AI & Business Automation Masterclass',
    subtitle: 'Learn AI. Build Automations. Transform Businesses. (Zapier, n8n, HubSpot, Apollo.io, GoHighLevel & Make.com)',
    category: 'Artificial Intelligence & Automation',
    level: 'BEGINNER',
    format: 'SELF_PACED',
    status: 'PUBLISHED',
    durationHours: 68,
    totalSessions: 16,
    priceMinorUnits: 2999900,
    currency: 'INR',
    description: 'Master AI-powered business automation, intelligent workflows, application integrations and modern business systems using industry-leading platforms such as Zapier, n8n, HubSpot, Apollo.io, GoHighLevel and Make.com. Learn to build intelligent AI agents, automate repetitive business processes, integrate applications using APIs and webhooks, develop WhatsApp and voice AI assistants, and implement production-ready automation solutions.',
    prerequisites: [
      'Basic computer knowledge and web literacy',
      'Curiosity to master modern AI automation platforms and intelligent agentic workflows',
      'No prior coding or engineering experience required'
    ],
    learningOutcomes: [
      'Build end-to-end multi-step automations in Zapier, n8n, Make.com, HubSpot, Apollo.io, and GoHighLevel',
      'Deploy autonomous AI agents with function calling, vector knowledge retrieval (RAG), and Model Context Protocol (MCP)',
      'Integrate external platforms using RESTful APIs, webhooks, JSON schemas, Postman, and OAuth2 security',
      'Implement AI-powered sales outreach, waterfall data enrichment, and email infrastructure in Clay, Smartlead, and Instantly',
      'Develop conversational AI WhatsApp bots with Meta Cloud API and deploy real-time AI Voice Receptionists using Vapi and Retell AI',
      'Build and submit 15 production portfolio projects and earn your StudentVerse Certified AI & Business Automation Specialist credential'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
  };

  const { data: existingCourse } = await supabase
    .from('Course')
    .select('id, slug')
    .eq('slug', courseData.slug)
    .maybeSingle();

  let courseId = existingCourse?.id;

  if (courseId) {
    console.log(`Course exists (ID: ${courseId}). Updating...`);
    const { error: updateErr } = await supabase
      .from('Course')
      .update({
        ...courseData,
        updatedAt: new Date().toISOString()
      })
      .eq('id', courseId);
    if (updateErr) console.error('Course update error:', updateErr);
  } else {
    console.log('Creating new course...');
    const generatedCourseId = crypto.randomUUID();
    const { data: newCourse, error: insertErr } = await supabase
      .from('Course')
      .insert({
        id: generatedCourseId,
        ...courseData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select('id')
      .single();
    if (insertErr) {
      console.error('Course insert error:', insertErr);
      process.exit(1);
    }
    courseId = newCourse.id;
    console.log(`Created course with ID: ${courseId}`);
  }

  // 2. Fetch Module and Lesson blueprints from aiBusinessAutomationData
  const { rawModules } = require('../apps/web/src/lib/aiBusinessAutomationData');
  const modules = rawModules;

  console.log(`Processing ${modules.length} modules and 200 lessons...`);

  let totalLessonsProcessed = 0;

  for (let mIdx = 0; mIdx < modules.length; mIdx++) {
    const mod = modules[mIdx];
    const modOrder = mod.orderIndex || (mIdx + 1);

    // Upsert CourseModule
    const { data: existingMod } = await supabase
      .from('CourseModule')
      .select('id')
      .eq('courseId', courseId)
      .eq('orderIndex', modOrder)
      .maybeSingle();

    let moduleId = existingMod?.id;

    if (moduleId) {
      await supabase
        .from('CourseModule')
        .update({
          title: mod.title,
          description: mod.description,
          updatedAt: new Date().toISOString()
        })
        .eq('id', moduleId);
    } else {
      const generatedModId = crypto.randomUUID();
      const { data: newMod, error: modErr } = await supabase
        .from('CourseModule')
        .insert({
          id: generatedModId,
          courseId,
          title: mod.title,
          orderIndex: modOrder,
          description: mod.description,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        .select('id')
        .single();
      if (modErr) {
        console.error(`Error inserting module ${mod.title}:`, modErr);
        continue;
      }
      moduleId = newMod.id;
    }

    // Upsert Assignment for module
    if (mod.assignmentTitle || mod.assignment) {
      const asgSlug = `asg-auto-${modOrder}`;
      const { data: existingAsg } = await supabase
        .from('Assignment')
        .select('id')
        .eq('courseId', courseId)
        .eq('slug', asgSlug)
        .maybeSingle();

      const asgPayload = {
        courseId,
        title: mod.assignmentTitle || mod.assignment?.title,
        slug: asgSlug,
        description: mod.description,
        instructions: mod.assignmentInstructions || mod.assignment?.instructions,
        deliverables: mod.deliverables || mod.assignment?.deliverables,
        difficulty: 'INTERMEDIATE',
        maxScore: 100,
        updatedAt: new Date().toISOString()
      };

      if (existingAsg) {
        await supabase.from('Assignment').update(asgPayload).eq('id', existingAsg.id);
      } else {
        await supabase.from('Assignment').insert({
          id: crypto.randomUUID(),
          ...asgPayload,
          createdAt: new Date().toISOString()
        });
      }
    }

    // Upsert Lessons in this module
    for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
      const lesson = mod.lessons[lIdx];
      const lessonOrder = lIdx + 1;

      const { data: existingLesson } = await supabase
        .from('Lesson')
        .select('id, videoUrl')
        .eq('moduleId', moduleId)
        .eq('orderIndex', lessonOrder)
        .maybeSingle();

      // Check if this is the HubSpot UI & Contacts Object video
      const isHubSpotVideo = (modOrder === 5 && (lessonOrder === 3 || lesson.title.includes('Contacts')));
      const resolvedVideoUrl = isHubSpotVideo ? hubspotVideoUrl : (lesson.videoUrl || null);
      const durationMin = lesson.durationMinutes || Math.round((lesson.durationSec || 1200) / 60);

      const lessonPayload = {
        moduleId,
        title: lesson.title,
        orderIndex: lessonOrder,
        contentType: 'RECORDED_VIDEO',
        videoUrl: resolvedVideoUrl,
        durationMinutes: durationMin,
        isFreePreview: modOrder === 1 && lessonOrder === 1,
        aiToolsUsed: lesson.aiTools || [],
        notes: lesson.notes,
        updatedAt: new Date().toISOString()
      };

      if (existingLesson) {
        await supabase
          .from('Lesson')
          .update(lessonPayload)
          .eq('id', existingLesson.id);
      } else {
        await supabase
          .from('Lesson')
          .insert({
            id: crypto.randomUUID(),
            ...lessonPayload,
            createdAt: new Date().toISOString()
          });
      }
      totalLessonsProcessed++;
    }
    console.log(`✓ Module ${modOrder}: "${mod.title}" (${mod.lessons.length} lessons) synced.`);
  }

  console.log(`=== Successfully seeded ${modules.length} modules and ${totalLessonsProcessed} lessons! ===`);
  console.log(`HubSpot Contacts video URL set to: ${hubspotVideoUrl}`);
}

runSeed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal seed error:', err);
    process.exit(1);
  });
