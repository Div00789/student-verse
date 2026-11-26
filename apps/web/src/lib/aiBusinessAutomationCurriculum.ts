import { ModuleItem, LessonItem } from './courseCurriculum';
// @ts-ignore
import { rawModules } from './aiBusinessAutomationData';

/**
 * AI & Business Automation Masterclass Curriculum
 * 16 Modules, 200 Lessons, 68 Planned Hours (244,800 seconds),
 * 16 Practical Assignments, 160 Knowledge Check Questions, 30+ Downloadable Templates.
 */
export function buildAiBusinessAutomationCurriculum(): ModuleItem[] {
  // Build the complete array of 16 ModuleItem objects
  return (rawModules as any[]).map((m) => {
    const lessons: LessonItem[] = m.lessons.map((l: any, lIdx: number) => {
      const code = `l-${m.num}-${lIdx + 1}`;
      const durationMin = Math.round((l.durationSec || 1200) / 60);
      const resolvedVideoUrl = l.videoUrl || undefined;
      const isAvailable = Boolean(resolvedVideoUrl);
      const isHubSpotMarketingEmailVideo = Boolean(l.title && l.title.includes('Marketing Email'));

      return {
        id: `l-auto-${m.num}-${lIdx + 1}`,
        code,
        title: l.title,
        type: 'RECORDED_VIDEO',
        duration: `${durationMin} min`,
        durationMinutes: durationMin,
        videoUrl: resolvedVideoUrl,
        isAvailable,
        notes: l.notes,
        aiTools: l.aiTools,
        resources: [
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
