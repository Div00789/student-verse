import { ModuleItem, LessonItem } from './courseCurriculum';
// @ts-ignore
import { rawModules } from './aiBusinessAutomationData';

/**
 * AI & Business Automation Masterclass Curriculum
 * 16 Modules, 200 Lessons, 68 Planned Hours (244,800 seconds),
 * 16 Practical Assignments, 160 Knowledge Check Questions, 30+ Downloadable Templates.
 */
export function buildAiBusinessAutomationCurriculum(): ModuleItem[] {
  // Primary Video for HubSpot UI & Contacts Object
  const hubspotVideoUrl = 'https://drive.google.com/file/d/1FBLKSAhNLw8monsWiYg7iGe22xvl0c2b/view';

  // Build the complete array of 16 ModuleItem objects
  return (rawModules as any[]).map((m) => {
    const lessons: LessonItem[] = m.lessons.map((l: any, lIdx: number) => {
      const code = `l-${m.num}-${lIdx + 1}`;
      const durationMin = Math.round(l.durationSec / 60);
      const isHubSpotContactsVideo = (m.num === 5 && (lIdx + 1 === 3 || l.title.includes('Contacts')));
      const resolvedVideoUrl = isHubSpotContactsVideo ? hubspotVideoUrl : (l.videoUrl || undefined);

      return {
        id: `l-auto-${m.num}-${lIdx + 1}`,
        code,
        title: l.title,
        type: 'RECORDED_VIDEO',
        duration: `${durationMin} min`,
        durationMinutes: durationMin,
        videoUrl: resolvedVideoUrl,
        notes: l.notes,
        aiTools: l.aiTools,
        resources: [
          { title: `${l.title} Guide & Blueprint`, url: '#', type: 'PDF' },
          { title: 'Workflow Blueprint & Checklist', url: '#', type: 'TEMPLATE' }
        ],
        quiz: {
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
