import { ModuleItem, LessonItem } from './courseCurriculum';
// @ts-ignore
import { rawModules } from './aiBusinessAutomationData';

/**
 * AI & Business Automation Masterclass Curriculum
 * 16 Modules, 200 Lessons, 68 Planned Hours (244,800 seconds),
 * 16 Practical Assignments, 160 Knowledge Check Questions, 30+ Downloadable Templates.
 */
export function buildAiBusinessAutomationCurriculum(): ModuleItem[] {
  // Primary Videos for HubSpot
  const hubspotVideoUrl = 'https://drive.google.com/file/d/1FBLKSAhNLw8monsWiYg7iGe22xvl0c2b/view';
  const hubspotMeetingLoomUrl = 'https://www.loom.com/share/dd97e7cbe9ad4e34a418c169568c1a55';
  const hubspotMarketingEmailVideoUrl =
    'https://folfptytrdsltklqutjv.supabase.co/storage/v1/object/public/course-assets/videos/How_to_create_Marketing_Emails_in_HubSpot.mp4';

  // Build the complete array of 16 ModuleItem objects
  return (rawModules as any[]).map((m) => {
    const lessons: LessonItem[] = m.lessons.map((l: any, lIdx: number) => {
      const code = `l-${m.num}-${lIdx + 1}`;
      const durationMin = Math.round(l.durationSec / 60);
      const isHubSpotContactsVideo = (m.num === 5 && (lIdx + 1 === 3 || l.title.includes('Contacts')));
      const isHubSpotMeetingVideo = (m.num === 5 && (lIdx + 1 === 18 || l.title.toLowerCase().includes('meeting') || l.title.toLowerCase().includes('scheduler')));
      const isHubSpotMarketingEmailVideo = (m.num === 5 && (lIdx + 1 === 10 || l.title.includes('Marketing Emails')));
      const resolvedVideoUrl = isHubSpotContactsVideo
        ? hubspotVideoUrl
        : isHubSpotMeetingVideo
          ? hubspotMeetingLoomUrl
          : isHubSpotMarketingEmailVideo
            ? hubspotMarketingEmailVideoUrl
            : (l.videoUrl || undefined);

      return {
        id: `l-auto-${m.num}-${lIdx + 1}`,
        code,
        title: l.title,
        type: 'RECORDED_VIDEO',
        duration: isHubSpotMarketingEmailVideo ? '5 min (4m 39s)' : `${durationMin} min`,
        durationMinutes: durationMin,
        videoUrl: resolvedVideoUrl,
        notes: l.notes,
        aiTools: l.aiTools,
        resources: isHubSpotMarketingEmailVideo ? [
          { title: 'HubSpot Marketing Email Best Practices Guide', url: '#', type: 'PDF' },
          { title: 'Email Deliverability & Personalization Tokens Checklist', url: '#', type: 'TEMPLATE' }
        ] : [
          { title: `${l.title} Guide & Blueprint`, url: '#', type: 'PDF' },
          { title: 'Workflow Blueprint & Checklist', url: '#', type: 'TEMPLATE' }
        ],
        quiz: isHubSpotMarketingEmailVideo ? {
          question: 'In HubSpot Marketing Email editor, what is the best practice before sending an automated campaign to your full list?',
          options: [
            'Preview the email layout on desktop and mobile, and send a test email to verify personalization tokens and rendering.',
            'Send directly to the entire database without testing tokens or links.',
            'Delete the unsubscribe link to increase deliverability metrics.',
            'Use unverified sender addresses that have no SPF or DKIM DNS records.'
          ],
          correctIndex: 0,
          explanation: 'Before publishing or sending a marketing email in HubSpot, you must preview both desktop and mobile versions and send a test email to ensure all personalization tokens, formatting, and CTAs function properly.'
        } : {
          question: `In ${l.title}, what is the critical architectural principle for building scalable, production-grade business automations?`,
          options: [
            'Designing for idempotency, strict schema validation, and fault-tolerant error recovery.',
            'Executing ad-hoc unmonitored scripts without error logging or rate limits.',
            'Relying exclusively on hardcoded credentials stored in plain text.',
            'Ignoring API status codes and execution retries.'
          ],
          correctIndex: 0,
          explanation: 'Production business automations must prioritize idempotency (preventing duplicate transactions), payload schema validation, and automated error handling with backoff retries.'
        }
      };
    });

    return {
      id: `mod-auto-${m.num}`,
      title: m.title,
      description: m.description,
      orderIndex: m.num,
      lessons,
      assignment: {
        id: `asg-auto-${m.num}`,
        title: m.assignmentTitle,
        instructions: m.assignmentInstructions,
        deliverables: m.deliverables,
        maxScore: 100
      }
    };
  });
}
