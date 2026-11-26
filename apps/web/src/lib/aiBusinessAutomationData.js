// Common curriculum raw modules for AI & Business Automation Masterclass
// Shared across frontend TypeScript components and backend/database seeders.

const rawModules = [
  {
    num: 1,
    title: 'Module 1: AI & Business Automation Fundamentals',
    durationHours: 2.0,
    totalSeconds: 7200,
    description: 'Foundations of artificial intelligence in business operations, robotic and workflow automation, no-code architecture, trigger-action mechanics, and process ROI estimation.',
    assignmentTitle: 'Module 1 Practical Assignment: Business Process Audit & Workflow Architecture',
    assignmentInstructions: 'Identify five repetitive, high-friction operational workflows in a real or simulated business. Document the current manual bottleneck, design target trigger-action-condition architectures, estimate time and cost savings, and define error-handling requirements.',
    deliverables: [
      'Business Process Audit Matrix identifying 5 repetitive workflows with time/cost friction metrics',
      'End-to-end visual workflow architecture diagrams for each process with triggers and conditional branches',
      'ROI and efficiency estimation model detailing projected hours saved and operational break-even points',
      'Technical prerequisite specification covering authentication, data schemas, and failover fallbacks'
    ],
    lessons: [
      { code: '1.1', title: '1.1 Introduction to Artificial Intelligence', durationSec: 1200, aiTools: ['ChatGPT 4o', 'Claude 3.5 Sonnet', 'Gemini Pro'], notes: 'Understand the foundations of artificial intelligence in commercial enterprises. Explore predictive vs generative models, deep learning concepts, and commercial AI integration.' },
      { code: '1.2', title: '1.2 Introduction to Business Process Automation', durationSec: 1200, aiTools: ['Process St', 'Lucidchart AI', 'Notion AI'], notes: 'Study Business Process Automation (BPA) principles. Differentiate Robotic Process Automation (RPA), digital process automation, and intelligent AI agent workflows.' },
      { code: '1.3', title: '1.3 No-Code, Low-Code & Custom Automation', durationSec: 1200, aiTools: ['Zapier', 'Make.com', 'n8n'], notes: 'Compare no-code platforms (Zapier, Make), low-code self-hosted platforms (n8n), and custom coded API microservices (Node.js/Python). Select tools based on security, cost, and complexity.' },
      { code: '1.4', title: '1.4 Understanding Triggers, Actions & Conditions', durationSec: 1200, aiTools: ['Zapier', 'n8n Workflow Engine'], notes: 'Master event-driven architecture: polling triggers vs instant webhooks, atomic actions, idempotency, conditional branching, multi-path routing, and filter logic.' },
      { code: '1.5', title: '1.5 Business Process Mapping & Workflow Architecture', durationSec: 1200, aiTools: ['Whimsical AI', 'Miro AI', 'Eraser.io'], notes: 'Learn standard BPMN 2.0 flow charting notation. Map operational states, user decision nodes, data schema transformations, and asynchronous approval gates.' },
      { code: '1.6', title: '1.6 Automation Use Cases, Business Efficiency & ROI', durationSec: 1200, aiTools: ['HubSpot CRM', 'Apollo.io', 'Google Sheets'], notes: 'Calculate automation ROI, time-value metrics, cost-per-execution economics, and business impact across sales, marketing, support, and billing operations.' }
    ]
  },
  {
    num: 2,
    title: 'Module 2: APIs, Webhooks & Data Integration',
    durationHours: 2.5,
    totalSeconds: 9000,
    description: 'Master RESTful API mechanics, HTTP methods, JSON data structures, API key and OAuth2 security, webhooks, Postman testing, data validation, rate limiting, and error handling.',
    assignmentTitle: 'Module 2 Practical Assignment: External API & Webhook Data Automation Engine',
    assignmentInstructions: 'Build a production-grade data collection pipeline connecting an external REST API (e.g. OpenWeather, Stripe, or CRM) to a Google Sheets or Supabase database with data transformation and error handling.',
    deliverables: [
      'Exported Postman Collection with saved requests, environment variables, and pre-request scripts',
      'Live automated webhook listener pipeline logging incoming payloads with verification headers',
      'Data transformation script converting nested JSON into normalized relational tabular format',
      'Error handling document detailing rate-limit retry logic (exponential backoff) and HTTP status handling'
    ],
    lessons: [
      { code: '2.1', title: '2.1 Introduction to APIs', durationSec: 1125, aiTools: ['Postman', 'Swagger', 'HTTPie'], notes: 'Learn how modern cloud applications communicate over Application Programming Interfaces (APIs). Explore client-server architecture, endpoints, and protocol abstractions.' },
      { code: '2.2', title: '2.2 REST APIs & HTTP Methods', durationSec: 1125, aiTools: ['Postman', 'curl', 'Thunder Client'], notes: 'Master RESTful architectural constraints. Learn HTTP verbs: GET (read), POST (create), PUT/PATCH (update), DELETE (destroy), and HTTP status codes (2xx, 3xx, 4xx, 5xx).' },
      { code: '2.3', title: '2.3 Understanding JSON & Data Structures', durationSec: 1125, aiTools: ['JSONLint', 'JQ Playground', 'VSCode'], notes: 'Parse, navigate, and transform JavaScript Object Notation (JSON). Work with nested objects, arrays of objects, key-value typing, boolean flags, and null values.' },
      { code: '2.4', title: '2.4 API Keys, OAuth & Authentication', durationSec: 1125, aiTools: ['Postman Auth Helper', 'OAuth2 Playground'], notes: 'Implement industry standard API authentication: Basic Auth, Bearer API Tokens, HMAC signature validation, and multi-step OAuth 2.0 Authorization Code grant flows.' },
      { code: '2.5', title: '2.5 Understanding Webhooks', durationSec: 1125, aiTools: ['Webhook.site', 'Beeceptor', 'ngrok'], notes: 'Differentiate polling intervals from instant event-driven Webhooks. Configure webhook listener URLs, payload headers, challenge handshakes, and secret verification.' },
      { code: '2.6', title: '2.6 API Testing Using Postman', durationSec: 1125, aiTools: ['Postman Collection Runner', 'Newman CLI'], notes: 'Build, parameterize, and automate API test suites in Postman. Use environment variables, test assertion scripts, mock servers, and automated collection runs.' },
      { code: '2.7', title: '2.7 Data Mapping, Transformation & Validation', durationSec: 1125, aiTools: ['Postman', 'JavaScript JSON.parse', 'Zod'], notes: 'Cleanse and normalize payload data schemas. Apply schema validation, cast stringified timestamps into ISO 8601, and format currency values.' },
      { code: '2.8', title: '2.8 API Errors, Rate Limits, Pagination & Security', durationSec: 1125, aiTools: ['Postman', 'Wireshark', 'Burp Suite'], notes: 'Handle rate limits (429 Too Many Requests), cursor and offset pagination, exponential backoff retries, TLS encryption, and API credential rotation.' }
    ]
  },
  {
    num: 3,
    title: 'Module 3: Zapier Automation Masterclass',
    durationHours: 7.0,
    totalSeconds: 25200,
    description: 'Comprehensive mastery of Zapier: multi-step Zaps, conditional paths, Formatter utilities, Zapier Tables, Zapier Forms, custom Python & JS code blocks, and enterprise CRM sync.',
    assignmentTitle: 'Module 3 Practical Assignment: Multi-Step AI Lead Capture & Qualification Zap',
    assignmentInstructions: 'Design and deploy a complete Zapier business automation system that captures incoming leads from web forms, validates phone/email, enriches lead data with AI, conditionally routes by score, and notifies sales.',
    deliverables: [
      'Shared or exported Zapier blueprint showing multi-step trigger, path filters, and actions',
      'Custom Code by Zapier step implementing algorithmic lead scoring or payload validation',
      'Zapier Tables data model with configured views, relational columns, and linked fields',
      'Error logs and test run proof demonstrating successful end-to-end execution across all paths'
    ],
    lessons: [
      { code: '3.1', title: '3.1 Introduction to Zapier', durationSec: 1260, aiTools: ['Zapier', 'Zapier AI Assistant'], notes: 'Understand Zapier architecture, app directory of 6,000+ connectors, task consumption economics, and enterprise workflow governance.' },
      { code: '3.2', title: '3.2 Account Setup & Dashboard', durationSec: 1260, aiTools: ['Zapier Dashboard', 'Zapier CLI'], notes: 'Configure workspace settings, connected app accounts, multi-user role permissions, folder taxonomies, and audit logging.' },
      { code: '3.3', title: '3.3 Understanding Zaps, Triggers & Actions', durationSec: 1260, aiTools: ['Zapier Editor', 'Zapier History'], notes: 'Explore trigger types (polling vs instant webhook), action steps, searches (Find or Create Record), and execution lifecycles.' },
      { code: '3.4', title: '3.4 Creating Your First Zap', durationSec: 1260, aiTools: ['Google Forms', 'Slack', 'Gmail'], notes: 'Build a production Zap linking Google Forms submissions to Slack team channel alerts and automated personalized Gmail confirmations.' },
      { code: '3.5', title: '3.5 Single-Step & Multi-Step Automation', durationSec: 1260, aiTools: ['Zapier Multi-Step Editor'], notes: 'Expand single-step automations into multi-stage pipelines: pull records, cross-reference external databases, calculate values, and update multiple systems.' },
      { code: '3.6', title: '3.6 Application Connections & Field Mapping', durationSec: 1260, aiTools: ['Zapier Data Mapper'], notes: 'Master static vs dynamic field mapping, fallback values, string templating, and handling undefined or empty attributes safely.' },
      { code: '3.7', title: '3.7 Filters by Zapier', durationSec: 1260, aiTools: ['Filter by Zapier'], notes: 'Implement conditional guardrails using Filters: text contains, numeric greater than, date before/after, and boolean match criteria to stop unnecessary runs.' },
      { code: '3.8', title: '3.8 Paths & Conditional Logic', durationSec: 1260, aiTools: ['Paths by Zapier'], notes: 'Build sophisticated decision trees with Paths (A, B, C, D). Route enterprise leads to VIP reps and small-tier inquiries to self-serve email sequences.' },
      { code: '3.9', title: '3.9 Formatter by Zapier', durationSec: 1260, aiTools: ['Formatter by Zapier'], notes: 'Transform data on the fly: text manipulation (split, capitalize, regex extract), number formatting, currency conversion, and date/time timezone shifts.' },
      { code: '3.10', title: '3.10 Delay & Schedule by Zapier', durationSec: 1260, aiTools: ['Delay by Zapier', 'Schedule by Zapier'], notes: 'Introduce intentional time offsets: Delay For (hours/days), Delay Until (dynamic timestamp), and cron-like recurring triggers (Daily, Weekly, Monthly).' },
      { code: '3.11', title: '3.11 Looping by Zapier', durationSec: 1260, aiTools: ['Looping by Zapier'], notes: 'Iterate over line items, comma-separated lists, and multi-row datasets to execute discrete actions for each individual item in an array.' },
      { code: '3.12', title: '3.12 Webhooks by Zapier', durationSec: 1260, aiTools: ['Webhooks by Zapier'], notes: 'Connect bespoke and unlisted platforms using Catch Hook, Retrieve Poll, and Custom Webhook Requests (POST/PUT/GET with custom headers).' },
      { code: '3.13', title: '3.13 Zapier Tables', durationSec: 1260, aiTools: ['Zapier Tables'], notes: 'Design relational no-code databases inside Zapier: field typing, linked records, view filters, formula columns, and native trigger buttons.' },
      { code: '3.14', title: '3.14 Zapier Forms', durationSec: 1260, aiTools: ['Zapier Interfaces / Forms'], notes: 'Construct branded client-facing portals, lead intake forms, and approval dashboards wired directly into Zapier Tables and automated Zaps.' },
      { code: '3.15', title: '3.15 Code by Zapier – Python & JavaScript', durationSec: 1260, aiTools: ['Code by Zapier (Node.js)', 'Python 3'], notes: 'Execute serverless scripts inside Zapier: custom regex parsing, array slicing, cryptographic hashing (SHA256), and complex mathematical models.' },
      { code: '3.16', title: '3.16 Gmail, Google Sheets & Slack Automation', durationSec: 1260, aiTools: ['Google Workspace', 'Slack API'], notes: 'Automate day-to-day operations: parse Gmail receipts, append synchronized ledger rows in Google Sheets, and publish interactive Slack buttons.' },
      { code: '3.17', title: '3.17 AI Integration with Zapier', durationSec: 1260, aiTools: ['OpenAI by Zapier', 'ChatGPT'], notes: 'Integrate LLMs into workflows: classify customer email sentiment, draft contextual support replies, and extract structured data from unstructured text.' },
      { code: '3.18', title: '3.18 Lead Management & Business Automation', durationSec: 1260, aiTools: ['HubSpot', 'Apollo.io', 'Zapier'], notes: 'Build an automated revenue pipeline: ingest Meta lead ads, verify email deliverability, enrich with company data, and assign to CRM sales reps.' },
      { code: '3.19', title: '3.19 Error Handling & Task Optimization', durationSec: 1260, aiTools: ['Zapier Error Handling', 'Zapier Manager'], notes: 'Optimize task costs, configure automatic replay on failure, handle rate limit errors, and build dedicated monitoring Zaps for system anomalies.' },
      { code: '3.20', title: '3.20 Complete Business Automation Project', durationSec: 1260, aiTools: ['Zapier Full Suite'], notes: 'Capstone project: construct an autonomous customer onboarding engine connecting payment webhooks, CRM records, contract generation, and welcome SMS.' }
    ]
  },
  {
    num: 4,
    title: 'Module 4: n8n Automation Masterclass',
    durationHours: 9.0,
    totalSeconds: 32400,
    description: 'Master enterprise-grade open-source workflow automation with n8n: self-hosting on Docker, custom nodes, JavaScript coding, database transactions, AI agents, sub-workflows, and error handling.',
    assignmentTitle: 'Module 4 Practical Assignment: Self-Hosted Production n8n AI Workflow System',
    assignmentInstructions: 'Deploy an n8n instance (Cloud or Docker). Construct a production multi-branch workflow with HTTP request nodes, JavaScript data manipulation, database connection, and an autonomous AI agent step with error-recovery sub-workflows.',
    deliverables: [
      'Complete workflow JSON export with sanitized credentials and annotated nodes',
      'Docker compose configuration file used for container deployment and persistent volume mounts',
      'Custom JavaScript code node snippet performing complex data mapping and array transformations',
      'Execution run screenshot showing successful data ingestion, AI processing, and error-catch triggers'
    ],
    lessons: [
      { code: '4.1', title: '4.1 Introduction to n8n', durationSec: 1350, aiTools: ['n8n Cloud', 'n8n Community'], notes: 'Explore n8n node-based architecture, open-source licensing, fair-code principles, privacy benefits, and enterprise advantages over cloud-only tools.' },
      { code: '4.2', title: '4.2 n8n Cloud vs Self-Hosted', durationSec: 1350, aiTools: ['n8n Cloud', 'DigitalOcean', 'AWS EC2'], notes: 'Evaluate deployment models: n8n Cloud convenience vs self-hosted VPS instances with zero per-execution fees and complete data sovereignty.' },
      { code: '4.3', title: '4.3 Installing n8n Using Docker', durationSec: 1350, aiTools: ['Docker', 'Docker Compose', 'Traefik'], notes: 'Deploy production n8n via Docker Compose: configure environment variables, PostgreSQL database backend, volume persistence, SSL certificates, and webhook tunnels.' },
      { code: '4.4', title: '4.4 Dashboard & Workflow Editor', durationSec: 1350, aiTools: ['n8n Canvas UI'], notes: 'Master the infinite workflow canvas: navigating nodes, pin data features, viewing raw execution schemas, and executing partial test runs.' },
      { code: '4.5', title: '4.5 Understanding Nodes & Triggers', durationSec: 1350, aiTools: ['n8n Node Directory'], notes: 'Understand core node classifications: Trigger Nodes (Poll/Webhook), Action Nodes (App integrations), Logic Nodes, and Transform Nodes.' },
      { code: '4.6', title: '4.6 Creating Your First Workflow', durationSec: 1350, aiTools: ['n8n', 'Webhook Node', 'Gmail Node'], notes: 'Build your first n8n workflow from scratch: capture an incoming JSON payload, format parameters, and send an automated transactional alert.' },
      { code: '4.7', title: '4.7 Credentials & Application Connections', durationSec: 1350, aiTools: ['n8n Credentials Vault'], notes: 'Manage encrypted credentials safely: OAuth2 application grants, Header Auth, API Keys, credential sharing across team members, and environment variables.' },
      { code: '4.8', title: '4.8 Expressions & Dynamic Data Mapping', durationSec: 1350, aiTools: ['n8n JMESPath', 'Expressions Editor'], notes: 'Write dynamic n8n expressions: dot notation, item matching (`$json.id`), referencing parent execution nodes (`$(\'Node Name\').item.json`), and date utilities.' },
      { code: '4.9', title: '4.9 IF & Switch Nodes', durationSec: 1350, aiTools: ['IF Node', 'Switch Node'], notes: 'Implement conditional branching: binary IF conditions (string, number, boolean) and multi-channel Switch routing based on complex rules.' },
      { code: '4.10', title: '4.10 Filter & Edit Fields Nodes', durationSec: 1350, aiTools: ['Filter Node', 'Edit Fields (Set) Node'], notes: 'Manipulate JSON objects: keep/discard specific fields, rename keys, set default values, and enforce type conversions.' },
      { code: '4.11', title: '4.11 Merge & Aggregate Nodes', durationSec: 1350, aiTools: ['Merge Node', 'Aggregate Node'], notes: 'Combine parallel execution streams: append data, combine by position, match on common key, and aggregate multiple items into a single array payload.' },
      { code: '4.12', title: '4.12 Loops & Batch Processing', durationSec: 1350, aiTools: ['Loop Over Items Node'], notes: 'Process large datasets reliably: configure batch size limits, rate throttle delays, and aggregate outputs to prevent API rate limit penalties.' },
      { code: '4.13', title: '4.13 HTTP Request Node', durationSec: 1350, aiTools: ['HTTP Request Node', 'cURL Import'], notes: 'Master universal API connectivity: import cURL commands, configure multipart form-data, query parameters, custom headers, and binary file streaming.' },
      { code: '4.14', title: '4.14 Webhook Node', durationSec: 1350, aiTools: ['Webhook Node (Test & Production)'], notes: 'Configure bidirectional webhooks: Test vs Production URLs, synchronous response modes (Respond to Webhook), and custom HTTP status responses.' },
      { code: '4.15', title: '4.15 Schedule Trigger & Event-Based Automation', durationSec: 1350, aiTools: ['Schedule Trigger (Cron)'], notes: 'Configure precision recurring jobs: cron expressions (interval, hourly, daily, business days), timezone handling, and calendar-based triggers.' },
      { code: '4.16', title: '4.16 JavaScript Code Node', durationSec: 1350, aiTools: ['Code Node (JS/TS)'], notes: 'Write custom JavaScript in n8n: process all input items, use built-in helpers (`$input.all()`), regex string parsing, and synchronous library executions.' },
      { code: '4.17', title: '4.17 Working with JSON & Complex Data', durationSec: 1350, aiTools: ['JSON Flattening', 'XML to JSON'], notes: 'Transform nested enterprise schemas: flatten deep hierarchical trees, parse XML/CSV strings, map array items, and handle binary PDF attachments.' },
      { code: '4.18', title: '4.18 Database Integration', durationSec: 1350, aiTools: ['PostgreSQL Node', 'MySQL Node', 'Supabase'], notes: 'Direct database communication: write SQL queries, execute atomic transactions, upsert relational records, and handle connection pools securely.' },
      { code: '4.19', title: '4.19 OpenAI, Claude & Gemini Integration', durationSec: 1350, aiTools: ['OpenAI Node', 'Anthropic Claude Node', 'LangChain'], notes: 'Connect top-tier LLMs: configure system prompts, temperature, model variants (GPT-4o, Claude 3.5, Gemini 1.5), and structured output formatting.' },
      { code: '4.20', title: '4.20 Building Your First AI Agent', durationSec: 1350, aiTools: ['n8n AI Agent Node', 'LangChain Tools'], notes: 'Architect autonomous AI Agents in n8n: configure memory buffers, attach tool calling nodes, and define agent reasoning goals.' },
      { code: '4.21', title: '4.21 Sub-Workflows & Reusable Automation', durationSec: 1350, aiTools: ['Execute Workflow Node'], notes: 'Build modular enterprise architectures: extract recurring logic into callable sub-workflows, pass parameters cleanly, and return normalized responses.' },
      { code: '4.22', title: '4.22 Error Handling, Retries & Duplicate Prevention', durationSec: 1350, aiTools: ['Error Trigger Node', 'Stop and Error'], notes: 'Implement fault-tolerant designs: Global Error Workflows, node-level retry on fail (wait between retries), and database idempotency keys.' },
      { code: '4.23', title: '4.23 Workflow Optimization & Monitoring', durationSec: 1350, aiTools: ['n8n Execution Logs', 'Prometheus', 'Grafana'], notes: 'Tune performance: prune execution history tables, configure memory allocations, monitor queue workers, and track execution throughput.' },
      { code: '4.24', title: '4.24 Production-Ready Business Automation Project', durationSec: 1350, aiTools: ['n8n Enterprise Suite'], notes: 'End-to-end Capstone: build an automated client invoice parser that extracts data from PDF emails, updates accounting DB, and triggers payment links.' }
    ]
  },
  {
    num: 5,
    title: 'Module 5: HubSpot Business Automation',
    durationHours: 8.0,
    totalSeconds: 28800,
    description: 'End-to-end HubSpot CRM automation: Contacts, Companies, Deals, Lifecycle stages, automated sales pipelines, meeting scheduling, ticket automation, and external API integrations.',
    assignmentTitle: 'Module 5 Practical Assignment: Full-Lifecycle HubSpot Marketing & Sales Automation Engine',
    assignmentInstructions: 'Configure a HubSpot CRM portal with custom properties, lifecycle stages, lead capture forms, automated lead scoring, deal creation workflows, and automated email sequences.',
    deliverables: [
      'HubSpot property dictionary export detailing custom contact and deal properties',
      'Documented Workflow logic diagrams for automated lead assignment and deal stage transitions',
      'Lead scoring model criteria breakdown separating explicit demographic and implicit engagement signals',
      'Custom executive reporting dashboard screenshot displaying deal velocity and pipeline conversions'
    ],
    lessons: [
      { code: '5.1', title: '5.1 Introduction to the HubSpot Ecosystem', durationSec: 1200, aiTools: ['HubSpot CRM', 'Marketing Hub', 'Sales Hub'], notes: 'Explore HubSpot architectural foundations: CRM objects, Smart CRM database architecture, and integration across marketing, sales, and service hubs.' },
      { code: '5.2', title: '5.2 HubSpot Account Setup & Configuration', durationSec: 1200, aiTools: ['HubSpot Admin Settings'], notes: 'Configure organizational settings: custom domain DNS records (SPF, DKIM, DMARC), currency rules, user permissions, and audit logs.' },
      { code: '5.3', title: '5.3 HubSpot UI & Contacts Object', durationSec: 1200, videoUrl: 'https://drive.google.com/file/d/1FBLKSAhNLw8monsWiYg7iGe22xvl0c2b/view', aiTools: ['HubSpot Contacts', 'CRM Object Model'], notes: 'Deep-dive into the HubSpot UI and standard CRM objects: Contacts, Companies, Deals, Tickets, and custom record associations.' },
      { code: '5.4', title: '5.4 Properties & Record Associations', durationSec: 1200, aiTools: ['HubSpot Property Manager'], notes: 'Create custom field properties: text, number, dropdown, calculation properties, and define one-to-many and many-to-many record associations.' },
      { code: '5.5', title: '5.5 Data Import, Export & Management', durationSec: 1200, aiTools: ['HubSpot Import Wizard', 'Data Sync'], notes: 'Import CSV data safely: deduplication rules based on Email and Record ID, column mapping, resolving sync conflicts, and historical data exports.' },
      { code: '5.6', title: '5.6 Customer Lifecycle & Lead Management', durationSec: 1200, aiTools: ['HubSpot Lifecycle Stages'], notes: 'Define customer journey stages: Subscriber, Lead, Marketing Qualified Lead (MQL), Sales Qualified Lead (SQL), Opportunity, Customer, and Evangelist.' },
      { code: '5.7', title: '5.7 Data Segmentation & Lists', durationSec: 1200, aiTools: ['HubSpot Active & Static Lists'], notes: 'Build dynamic segmentations: Active Lists (real-time behavioral and demographic filter updates) vs Static Lists for specific historical campaigns.' },
      { code: '5.8', title: '5.8 Forms & Lead Capture', durationSec: 1200, aiTools: ['HubSpot Forms Builder'], notes: 'Build lead capture forms: embedded forms, standalone pages, popup banners, progressive profiling fields, and automated notifications.' },
      { code: '5.9', title: '5.9 Landing Pages & CTAs', durationSec: 1200, aiTools: ['HubSpot CMS / Landing Pages'], notes: 'Design high-converting landing pages: responsive modules, dynamic personalization tokens, A/B variant testing, and custom thank-you redirects.' },
      { code: '5.10', title: '5.10 Email Marketing Automation', durationSec: 1200, aiTools: ['HubSpot Drag-and-Drop Email'], notes: 'Draft automated email marketing templates: subject line A/B testing, personalization tokens, sender profiles, and CAN-SPAM / GDPR compliance.' },
      { code: '5.11', title: '5.11 Marketing Campaign Management', durationSec: 1200, aiTools: ['HubSpot Campaigns Tool'], notes: 'Orchestrate multi-asset campaigns: tag landing pages, forms, emails, social posts, and UTM tracking links under unified campaign dashboards.' },
      { code: '5.12', title: '5.12 Workflow Fundamentals', durationSec: 1200, aiTools: ['HubSpot Workflows'], notes: 'Master workflow automation: enrollment triggers, re-enrollment criteria, action execution order, delay steps, and unenrollment rules.' },
      { code: '5.13', title: '5.13 Advanced Workflow Automation', durationSec: 1200, aiTools: ['HubSpot Advanced Logic'], notes: 'Build complex branch trees: if/then branches, branching based on multiple property conditions, webhooks actions, and cross-object workflows.' },
      { code: '5.14', title: '5.14 Lead Scoring & Qualification', durationSec: 1200, aiTools: ['HubSpot Lead Scoring Engine'], notes: 'Implement algorithmic lead scoring: positive behavioral score additions (page views, form submits) and negative decay deductions (inactivity, bounces).' },
      { code: '5.15', title: '5.15 Automated Lead Assignment', durationSec: 1200, aiTools: ['HubSpot Round-Robin Assignment'], notes: 'Distribute qualified opportunities: round-robin sales assignment, territory-based routing, and immediate task/notification creation for sales reps.' },
      { code: '5.16', title: '5.16 Sales Pipelines & Deal Automation', durationSec: 1200, aiTools: ['HubSpot Deals & Pipelines'], notes: 'Structure deal pipelines: stage probability metrics, mandatory fields on stage exit, automated deal creation upon MQL qualification, and won/lost tracking.' },
      { code: '5.17', title: '5.17 Sales Sequences & Follow-Ups', durationSec: 1200, aiTools: ['HubSpot Sequences'], notes: 'Create automated 1-to-1 sales outreach sequences: scheduled personal emails, automated task reminders, LinkedIn messaging steps, and auto-unenrollment.' },
      { code: '5.18', title: '5.18 Meeting Scheduling & Task Automation', durationSec: 1200, videoUrl: 'https://www.loom.com/share/dd97e7cbe9ad4e34a418c169568c1a55', aiTools: ['HubSpot Meetings Tool'], notes: 'Deploy friction-free calendar scheduling: calendar syncing (Google/Outlook), buffer times, pre-meeting qualifying questions, and automatic deal creation.' },
      { code: '5.19', title: '5.19 Customer Support & Ticket Automation', durationSec: 1200, aiTools: ['HubSpot Service Hub / Tickets'], notes: 'Automate post-sales support: convert incoming emails to tickets, route by SLA urgency, automated status notification emails, and CSAT surveys.' },
      { code: '5.20', title: '5.20 Customer Onboarding & Renewal Automation', durationSec: 1200, aiTools: ['HubSpot Onboarding Pipelines'], notes: 'Drive customer retention: automated onboarding checklists, milestone celebration emails, usage check-ins, and automated renewal reminder tasks.' },
      { code: '5.21', title: '5.21 HubSpot AI & Intelligent Automation', durationSec: 1200, aiTools: ['HubSpot Breeze AI', 'Content Assistant'], notes: 'Leverage HubSpot AI: automated email copy generation, predictive deal close probabilities, conversational chatbots, and automated call transcription analysis.' },
      { code: '5.22', title: '5.22 HubSpot APIs & External Integrations', durationSec: 1200, aiTools: ['HubSpot Private Apps', 'API Keys'], notes: 'Connect HubSpot to custom databases: generate Private App access tokens, manage OAuth scopes, write webhooks, and sync bi-directionally with external apps.' },
      { code: '5.23', title: '5.23 Custom Reports & Business Dashboards', durationSec: 1200, aiTools: ['HubSpot Custom Report Builder'], notes: 'Build executive reporting dashboards: pipeline conversion funnels, rep activity metrics, marketing attribution reports, and recurring scheduled PDF emails.' },
      { code: '5.24', title: '5.24 End-to-End HubSpot Business Automation Project', durationSec: 1200, aiTools: ['HubSpot Complete Platform'], notes: 'Capstone Project: assemble a fully automated commercial engine from visitor capture through sales close, onboarding, and NPS satisfaction feedback.' }
    ]
  },
  {
    num: 6,
    title: 'Module 6: Apollo.io & B2B Lead Generation',
    durationHours: 5.0,
    totalSeconds: 18000,
    description: 'Master B2B prospecting with Apollo.io: Ideal Customer Profile (ICP) architecture, verified data enrichment, intent data, deliverability setup, and automated multi-step cold outreach.',
    assignmentTitle: 'Module 6 Practical Assignment: B2B Prospecting Database & Automated Outreach Engine',
    assignmentInstructions: 'Define an Ideal Customer Profile (ICP). Build a targeted list of 100 verified B2B decision-makers in Apollo.io, configure custom sequence copy with AI personalization, and integrate directly with CRM.',
    deliverables: [
      'Documented Ideal Customer Profile (ICP) and Buyer Persona criteria sheet',
      'Exported and enriched prospect dataset (100 verified B2B contacts with custom variables)',
      'Multi-step cold outreach email sequence copy featuring personalized dynamic snippets',
      'Apollo integration configuration report verifying CRM synchronization and deliverability settings'
    ],
    lessons: [
      { code: '6.1', title: '6.1 Introduction to Apollo.io', durationSec: 1125, aiTools: ['Apollo.io Dashboard'], notes: 'Learn Apollo B2B intelligence engine: database of 275M+ contacts, search filtering mechanics, and lead engagement suite.' },
      { code: '6.2', title: '6.2 Account Setup & Dashboard', durationSec: 1125, aiTools: ['Apollo Settings'], notes: 'Configure Apollo workspace: seat permissions, credit allocations, mailbox connections, and custom field mapping.' },
      { code: '6.3', title: '6.3 Introduction to B2B Lead Generation', durationSec: 1125, aiTools: ['Apollo Search'], notes: 'Explore modern B2B outbound prospecting: outbound economics, data hygiene, compliance guidelines (CAN-SPAM, GDPR), and reply benchmarks.' },
      { code: '6.4', title: '6.4 Ideal Customer Profile (ICP)', durationSec: 1125, aiTools: ['ICP Matrix Template'], notes: 'Define precise ICP targeting parameters: company employee headcount, annual revenue brackets, geography, industry verticals, and tech stack.' },
      { code: '6.5', title: '6.5 Buyer Personas & Target Accounts', durationSec: 1125, aiTools: ['Persona Blueprint'], notes: 'Map organizational buying committees: Economic Buyers, Champions, Evaluators, and Gatekeepers across targeted accounts.' },
      { code: '6.6', title: '6.6 People Search & Advanced Filters', durationSec: 1125, aiTools: ['Apollo People Search'], notes: 'Execute high-precision searches: filter by job titles, seniority levels, departments, keywords, past company history, and verified status.' },
      { code: '6.7', title: '6.7 Company Search & Account-Based Prospecting', durationSec: 1125, aiTools: ['Apollo Companies Search'], notes: 'Target high-fit accounts: filter by technology stack installed (e.g. Shopify, Salesforce), recent funding rounds, and job hiring trends.' },
      { code: '6.8', title: '6.8 Contact Enrichment & Email Verification', durationSec: 1125, aiTools: ['Apollo Data Enrichment'], notes: 'Verify contact deliverability: catch-all verification, bounce-risk flags, direct dial phone enrichment, and mobile number retrieval.' },
      { code: '6.9', title: '6.9 Buying Intent & Lead Qualification', durationSec: 1125, aiTools: ['Apollo Intent Topics'], notes: 'Leverage third-party intent data: detect accounts actively researching relevant solution keywords across B2B publications.' },
      { code: '6.10', title: '6.10 Prospect Lists & Segmentation', durationSec: 1125, aiTools: ['Apollo Saved Lists'], notes: 'Organize high-value prospects: static target lists, dynamic persona segments, tagging strategies, and suppression lists.' },
      { code: '6.11', title: '6.11 Email Configuration & Deliverability', durationSec: 1125, aiTools: ['Mail-Tester', 'Google Workspace'], notes: 'Establish bulletproof email deliverability: secondary domains, SPF, DKIM, DMARC, custom tracking domains, and warmup pacing.' },
      { code: '6.12', title: '6.12 Creating Outreach Sequences', durationSec: 1125, aiTools: ['Apollo Sequences'], notes: 'Build multi-touch cadences: automated emails, manual review tasks, LinkedIn touchpoints, phone calls, and optimal day/time sending windows.' },
      { code: '6.13', title: '6.13 AI-Powered Personalized Outreach', durationSec: 1125, aiTools: ['Apollo AI Assistant', 'Claude 3.5'], notes: 'Draft AI-personalized copy: dynamic icebreakers based on company news, prospect LinkedIn bios, pain points, and strong value propositions.' },
      { code: '6.14', title: '6.14 Apollo Workflows & Sales Automation', durationSec: 1125, aiTools: ['Apollo Plays / Workflows'], notes: 'Automate pipeline actions: auto-add prospects to sequences upon intent surge, change status on email reply, and trigger task creation.' },
      { code: '6.15', title: '6.15 Apollo APIs, HubSpot Integration & Compliance', durationSec: 1125, aiTools: ['Apollo API', 'HubSpot Integration'], notes: 'Bi-directional CRM synchronization: map custom fields, sync call logs, maintain opt-out suppression lists, and automate lead creation via API.' },
      { code: '6.16', title: '6.16 Complete B2B Lead Generation Project', durationSec: 1125, aiTools: ['Apollo Complete Platform'], notes: 'Capstone Project: launch an automated outbound engine that discovers 500 target accounts, enriches decision-makers, and executes verified sequence cadences.' }
    ]
  },
  {
    num: 7,
    title: 'Module 7: GoHighLevel Automation Masterclass',
    durationHours: 8.0,
    totalSeconds: 28800,
    description: 'Comprehensive GoHighLevel masterclass: Agency sub-accounts, funnel builders, calendar appointment scheduling, SMS/WhatsApp marketing, automated missed-call text back, and SaaS mode.',
    assignmentTitle: 'Module 7 Practical Assignment: Automated Lead Funnel & Appointment Booking System',
    assignmentInstructions: 'Build a GoHighLevel sub-account with an automated appointment booking funnel, calendar integration, automated SMS/email reminders, missed-call text back, and review automation.',
    deliverables: [
      'Published GoHighLevel sales funnel link with functional appointment booking widget',
      'Workflow snapshot or automation flowchart detailing confirmation, reminder, and no-show sequences',
      'Custom SMS and email notification copy templates with dynamic merge fields',
      'Test execution verification demonstrating end-to-end booking and automated CRM status updates'
    ],
    lessons: [
      { code: '7.1', title: '7.1 Introduction to GoHighLevel', durationSec: 1200, aiTools: ['GoHighLevel (GHL) Dashboard'], notes: 'Understand GoHighLevel all-in-one architecture: agency management, sub-account tenancy, and client acquisition features.' },
      { code: '7.2', title: '7.2 Agency Dashboard & Sub-Accounts', durationSec: 1200, aiTools: ['GHL Agency View'], notes: 'Manage client accounts: creating sub-accounts, configuring permissions, user roles, user logins, and white-label agency branding.' },
      { code: '7.3', title: '7.3 Business Configuration & Domain Setup', durationSec: 1200, aiTools: ['GHL Domain Manager', 'Twilio / LC Phone'], notes: 'Configure telephony and domain infrastructure: LeadConnector Phone, A2P 10DLC compliance registration, LC Email, and custom domains.' },
      { code: '7.4', title: '7.4 Contact Management', durationSec: 1200, aiTools: ['GHL Contacts'], notes: 'Organize client data: contact records, conversation unified inbox, activity timeline history, and notes.' },
      { code: '7.5', title: '7.5 Smart Lists, Tags & Segmentation', durationSec: 1200, aiTools: ['GHL Smart Lists'], notes: 'Segment contacts dynamically: applying tags, creating saved Smart Lists, bulk actions (SMS, email, pipeline update), and export permissions.' },
      { code: '7.6', title: '7.6 Custom Fields & Custom Values', durationSec: 1200, aiTools: ['GHL Custom Fields'], notes: 'Customize data models: creating text, date, and dropdown custom fields, and defining global Custom Values (e.g. business hours, logo URL).' },
      { code: '7.7', title: '7.7 Opportunities & Sales Pipelines', durationSec: 1200, aiTools: ['GHL Opportunities'], notes: 'Track sales cycles: building visual kanban pipelines, stage monetary values, automated opportunity creation, and stage win/loss tracking.' },
      { code: '7.8', title: '7.8 Website Builder', durationSec: 1200, aiTools: ['GHL Website Builder'], notes: 'Build client websites: global header/footer navigation, responsive layouts, blog publishing, and SEO metadata configuration.' },
      { code: '7.9', title: '7.9 Sales Funnel Builder', durationSec: 1200, aiTools: ['GHL Funnel Builder'], notes: 'Architect high-converting funnels: step-by-step funnel sequences, 1-click upsells, downsell logic, and order confirmation pages.' },
      { code: '7.10', title: '7.10 Landing Pages & Lead Generation', durationSec: 1200, aiTools: ['GHL Page Builder'], notes: 'Create conversion-focused lead squeeze pages: mobile optimization, sticky CTAs, video players, and tracking pixel installations.' },
      { code: '7.11', title: '7.11 Forms & Surveys', durationSec: 1200, aiTools: ['GHL Forms & Surveys'], notes: 'Capture verified leads: standard forms, multi-step qualification surveys, conditional logic questions, and sticky contact data.' },
      { code: '7.12', title: '7.12 Calendars & Appointment Booking', durationSec: 1200, aiTools: ['GHL Calendars'], notes: 'Deploy scheduling widgets: round-robin team calendars, class booking, recurring appointments, buffer times, and payment deposits.' },
      { code: '7.13', title: '7.13 Email Marketing', durationSec: 1200, aiTools: ['GHL Email Builder'], notes: 'Design branded email campaigns: drag-and-drop builder, dynamic custom value tokens, email blast scheduling, and deliverability stats.' },
      { code: '7.14', title: '7.14 SMS & WhatsApp Automation', durationSec: 1200, aiTools: ['GHL Conversations', 'SMS Builder'], notes: 'Deploy conversational text messaging: SMS campaigns, WhatsApp conversations, automated opt-out stop words, and compliance.' },
      { code: '7.15', title: '7.15 Workflow Triggers & Actions', durationSec: 1200, aiTools: ['GHL Workflows Builder'], notes: 'Master GHL workflow automations: form submitted, appointment status changed, tag added, and executing multi-channel sequences.' },
      { code: '7.16', title: '7.16 Advanced Workflow Conditions', durationSec: 1200, aiTools: ['GHL If/Else Logic'], notes: 'Implement complex decision paths: If/Else conditional logic, wait steps (time delay or appointment-relative), and webhook calls.' },
      { code: '7.17', title: '7.17 Lead Qualification & Follow-Ups', durationSec: 1200, aiTools: ['GHL Speed to Lead'], notes: 'Engineer instant speed-to-lead systems: immediate auto-SMS response within 60 seconds, internal team phone calls, and reminder cadences.' },
      { code: '7.18', title: '7.18 Appointment Reminders & No-Show Automation', durationSec: 1200, aiTools: ['GHL Appointment Workflows'], notes: 'Eliminate missed appointments: 24h, 2h, and 10min SMS reminders with confirmation replies (1 to confirm, 2 to reschedule), and no-show nurture.' },
      { code: '7.19', title: '7.19 Conversation AI & Voice AI', durationSec: 1200, aiTools: ['GHL Conversation AI'], notes: 'Deploy autonomous conversational bots: train AI bots on company FAQ docs to auto-respond to SMS/webchat inquiries and book appointments.' },
      { code: '7.20', title: '7.20 Payments, Products & Order Forms', durationSec: 1200, aiTools: ['GHL Stripe Integration'], notes: 'Monetize services: connect Stripe, build 2-step order forms, subscription recurring billing, invoice automation, and payment coupons.' },
      { code: '7.21', title: '7.21 Reputation & Review Management', durationSec: 1200, aiTools: ['GHL Reputation Manager'], notes: 'Automate 5-star Google review generation: post-purchase review request SMS/emails, negative review triage, and public review widgets.' },
      { code: '7.22', title: '7.22 Snapshots, White-Label & SaaS Models', durationSec: 1200, aiTools: ['GHL Snapshots & SaaS Configurator'], notes: 'Scale as an agency: package complete sub-account configurations into 1-click deployable Snapshots, and configure white-label SaaS re-billing.' },
      { code: '7.23', title: '7.23 GHL APIs, Webhooks & Reporting', durationSec: 1200, aiTools: ['GHL API v2', 'Postman'], notes: 'Connect GHL externally: call GHL API v2 endpoints with OAuth2, trigger outgoing webhooks to n8n/Zapier, and build custom reporting widgets.' },
      { code: '7.24', title: '7.24 Complete Business Automation Project', durationSec: 1200, aiTools: ['GHL Complete Platform'], notes: 'Capstone Project: build an all-in-one local business acquisition system with funnel, calendar, missed-call text back, and CRM pipeline.' }
    ]
  },
  {
    num: 8,
    title: 'Module 8: Make.com Automation',
    durationHours: 3.0,
    totalSeconds: 10800,
    description: 'Visual automation with Make.com: Scenarios, Modules, Routers, Iterators, Aggregators, Data Stores, custom webhook handshakes, and platform comparison with Zapier and n8n.',
    assignmentTitle: 'Module 8 Practical Assignment: Multi-Application Make.com Data Processing Scenario',
    assignmentInstructions: 'Construct a multi-branch scenario in Make.com that ingests external webhooks, splits array payloads with an Iterator, applies complex filtering via Routers, transforms data, and stores records.',
    deliverables: [
      'Exported Make.com scenario blueprint (.json file)',
      'Annotated diagram explaining router filter criteria and data transformation logic',
      'Data Store schema definition showing indexed keys and data typing',
      'Execution run log validating successful error-handling and data aggregation'
    ],
    lessons: [
      { code: '8.1', title: '8.1 Introduction to Make.com', durationSec: 1080, aiTools: ['Make.com Dashboard'], notes: 'Understand Make (formerly Integromat) visual execution engine, operational pricing, execution operations economics, and workflow structure.' },
      { code: '8.2', title: '8.2 Scenarios, Modules & Connections', durationSec: 1080, aiTools: ['Make Scenario Editor'], notes: 'Explore scenario architecture: Triggers (ACID instant vs polling), Actions, Searches, and managing OAuth2 / API key connections.' },
      { code: '8.3', title: '8.3 Creating Your First Scenario', durationSec: 1080, aiTools: ['Make.com Canvas'], notes: 'Build a production scenario: connect Airtable records to Slack channel notifications and dynamic Google Docs contract generation.' },
      { code: '8.4', title: '8.4 Routers & Filters', durationSec: 1080, aiTools: ['Make Router Module'], notes: 'Split execution streams: using Routers to create multi-path logic, applying advanced text/number filters, and configuring fallback routes.' },
      { code: '8.5', title: '8.5 Iterators & Aggregators', durationSec: 1080, aiTools: ['Iterator Module', 'Array / Text Aggregator'], notes: 'Transform array structures: unpack list items with Iterators to run actions per item, and bundle multiple outputs back with Aggregators.' },
      { code: '8.6', title: '8.6 Data Stores & Data Mapping', durationSec: 1080, aiTools: ['Make Data Stores'], notes: 'Utilize internal key-value storage: create Data Stores, query records by key, manage state across scenario runs, and deduplicate events.' },
      { code: '8.7', title: '8.7 HTTP Requests & Webhooks', durationSec: 1080, aiTools: ['Make HTTP App', 'Custom Webhook'], notes: 'Execute custom REST calls: make raw HTTP GET/POST calls, parse response bodies, and set up Custom Webhook response codes.' },
      { code: '8.8', title: '8.8 AI-Powered Automation', durationSec: 1080, aiTools: ['OpenAI App on Make', 'Claude API'], notes: 'Integrate generative AI: summarize customer calls, generate personalized outreach snippets, and classify support ticket sentiment.' },
      { code: '8.9', title: '8.9 Error Handling & Scenario Optimization', durationSec: 1080, aiTools: ['Make Error Directives (Resume, Commit, Rollback, Ignore)'], notes: 'Implement fault tolerance: configure Error Handler routes with directives (Resume, Ignore, Break, Rollback), and optimize operation counts.' },
      { code: '8.10', title: '8.10 Make vs Zapier vs n8n – Practical Implementation', durationSec: 1080, aiTools: ['Zapier', 'n8n', 'Make.com'], notes: 'Architectural comparison: benchmark cost per execution, developer flexibility, hosting requirements, and select the right tool for any project.' }
    ]
  },
  {
    num: 9,
    title: 'Module 9: AI Agents & Intelligent Workflows',
    durationHours: 5.0,
    totalSeconds: 18000,
    description: 'Build autonomous AI agents: LLM models (OpenAI, Claude, Gemini), prompt engineering, tool calling, agent memory, structured outputs, RAG architectures, and Model Context Protocol (MCP).',
    assignmentTitle: 'Module 9 Practical Assignment: Autonomous Business AI Agent with Knowledge Retrieval & Tools',
    assignmentInstructions: 'Develop an autonomous AI business agent using n8n or Python. Provide the agent with vector search knowledge retrieval (RAG) and approved tool execution capabilities (CRM lookup, scheduling, email dispatch).',
    deliverables: [
      'Complete agent architecture specification detailing system prompts, guardrails, and tools',
      'Exported workflow or Python script demonstrating tool-calling logic and memory management',
      'Vector knowledge base ingestion script with chunking and embedding configuration',
      'Conversational test transcript demonstrating tool execution, guardrail refusal, and accurate response synthesis'
    ],
    lessons: [
      { code: '9.1', title: '9.1 Introduction to Large Language Models', durationSec: 1285, aiTools: ['Transformers', 'OpenAI', 'Anthropic'], notes: 'Understand the mechanics of Large Language Models: tokenization, attention mechanisms, context windows, parameters, and fine-tuning vs prompting.' },
      { code: '9.2', title: '9.2 OpenAI, Claude & Gemini', durationSec: 1285, aiTools: ['GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro'], notes: 'Compare leading frontier models: strengths in coding, reasoning, multimodality, latency, pricing economics, and context window limits.' },
      { code: '9.3', title: '9.3 Prompt Engineering for Business Automation', durationSec: 1285, aiTools: ['Prompt Perfect', 'OpenAI Playground'], notes: 'Master enterprise prompt engineering: system vs user roles, few-shot prompting, chain-of-thought reasoning, negative constraints, and delimiters.' },
      { code: '9.4', title: '9.4 AI APIs & Model Integration', durationSec: 1285, aiTools: ['OpenAI SDK', 'Anthropic SDK', 'Postman'], notes: 'Integrate LLM endpoints programmatically: configure temperature, top_p, frequency penalties, streaming responses, and token budget management.' },
      { code: '9.5', title: '9.5 AI Workflows vs AI Agents', durationSec: 1285, aiTools: ['LangChain', 'n8n AI'], notes: 'Differentiate deterministic AI pipelines (chained single-step completions) from autonomous AI Agents (reasoning loops, decision planning, dynamic tool calling).' },
      { code: '9.6', title: '9.6 Building AI Agents Using n8n', durationSec: 1285, aiTools: ['n8n AI Agent Node'], notes: 'Assemble autonomous agents on n8n canvas: configure agent types (ReAct, Plan-and-Solve), memory buffers, and tool connection interfaces.' },
      { code: '9.7', title: '9.7 AI Agent Tools & Function Calling', durationSec: 1285, aiTools: ['Function Calling Schema', 'Custom Tools'], notes: 'Equip agents with practical capabilities: define JSON function schemas for database queries, calendar booking, weather checks, and CRM record creation.' },
      { code: '9.8', title: '9.8 AI Agent Memory & Context', durationSec: 1285, aiTools: ['Window Buffer Memory', 'Redis Chat Memory'], notes: 'Implement conversational memory: short-term window memory, summary memory for long chats, and persistent Redis session storage.' },
      { code: '9.9', title: '9.9 Structured Outputs & AI Data Extraction', durationSec: 1285, aiTools: ['JSON Mode', 'Instructor', 'Zod'], notes: 'Force 100% reliable structured outputs: enforce strict JSON schemas for invoice extraction, lead classification, and CRM property updates.' },
      { code: '9.10', title: '9.10 RAG – Retrieval-Augmented Generation', durationSec: 1285, aiTools: ['RAG Pipeline', 'Text Embeddings'], notes: 'Master RAG principles: eliminate hallucinations by retrieving factual company documents, chunking text, generating embeddings, and injecting context.' },
      { code: '9.11', title: '9.11 Vector Databases & AI Knowledge Bases', durationSec: 1285, aiTools: ['Supabase pgvector', 'Pinecone', 'Qdrant'], notes: 'Deploy vector databases: store document vector embeddings, run cosine similarity searches, and manage knowledge base updates.' },
      { code: '9.12', title: '9.12 Model Context Protocol (MCP)', durationSec: 1285, aiTools: ['Anthropic MCP SDK', 'FastMCP'], notes: 'Learn Anthropic Model Context Protocol (MCP): standardize how AI assistants securely access local files, tools, and enterprise databases.' },
      { code: '9.13', title: '9.13 Human Approval, Guardrails & AI Evaluation', durationSec: 1285, aiTools: ['NeMo Guardrails', 'Slack Approval Webhook'], notes: 'Ensure safe enterprise execution: human-in-the-loop approval gates for financial transactions, prompt injection defense, and eval metrics.' },
      { code: '9.14', title: '9.14 Building a Complete Business AI Assistant', durationSec: 1295, aiTools: ['Autonomous Enterprise Agent Suite'], notes: 'Capstone Project: construct an executive AI assistant capable of answering questions from private docs, querying live metrics, and drafting emails.' }
    ]
  },
  {
    num: 10,
    title: 'Module 10: Databases – Supabase & Airtable',
    durationHours: 2.5,
    totalSeconds: 9000,
    description: 'Master relational data storage: Supabase PostgreSQL, tables, foreign keys, Row Level Security (RLS), Airtable bases, automated syncing, and database-driven workflow triggers.',
    assignmentTitle: 'Module 10 Practical Assignment: Centralized Cloud Business Database with Automation Sync',
    assignmentInstructions: 'Design and deploy a relational database in Supabase and/or Airtable. Model customers, orders, and interactions. Implement secure Row Level Security policies and automated syncing with n8n/Zapier.',
    deliverables: [
      'SQL schema migration script or Airtable base structure export with defined relationships',
      'Row Level Security (RLS) policy definitions enforcing role-based tenant data separation',
      'Database trigger / webhook configuration notifying automation platforms on new record inserts',
      'Data integrity test report verifying foreign key constraints, cascade rules, and query performance'
    ],
    lessons: [
      { code: '10.1', title: '10.1 Database Fundamentals', durationSec: 1125, aiTools: ['DBDiagram.io'], notes: 'Learn database architecture: relational SQL vs non-relational NoSQL, tables, columns, rows, primary keys, foreign keys, and normalization.' },
      { code: '10.2', title: '10.2 SQL & Relational Databases', durationSec: 1125, aiTools: ['PostgreSQL', 'pgAdmin'], notes: 'Write production SQL queries: SELECT, INSERT, UPDATE, DELETE, WHERE filtering, INNER/LEFT JOINs, aggregate functions (COUNT, SUM), and GROUP BY.' },
      { code: '10.3', title: '10.3 Introduction to Supabase', durationSec: 1125, aiTools: ['Supabase Studio'], notes: 'Explore Supabase open-source Firebase alternative: managed PostgreSQL database, auto-generated REST/GraphQL APIs, and real-time websockets.' },
      { code: '10.4', title: '10.4 Tables, Relationships & Data Management', durationSec: 1125, aiTools: ['Supabase Table Editor'], notes: 'Design schemas: create tables, define data types (UUID, text, timestamptz, jsonb), set default values, configure foreign key constraints, and indexes.' },
      { code: '10.5', title: '10.5 Authentication & Row Level Security', durationSec: 1125, aiTools: ['Supabase Auth & RLS'], notes: 'Enforce enterprise security with Row Level Security (RLS): write SQL security policies restricting users to only viewing their own tenant records.' },
      { code: '10.6', title: '10.6 Introduction to Airtable', durationSec: 1125, aiTools: ['Airtable Workspace'], notes: 'Master Airtable visual databases: bases, tables, linked records, lookup fields, rollup calculations, formula syntax, and interface designer.' },
      { code: '10.7', title: '10.7 Database Integration with n8n & Zapier', durationSec: 1125, aiTools: ['n8n Supabase Node', 'Zapier Airtable Integration'], notes: 'Connect databases to workflows: listen to database triggers via Database Webhooks, run upsert operations, and handle batch synchronization.' },
      { code: '10.8', title: '10.8 Building an Automated Business Database', durationSec: 1125, aiTools: ['Supabase + Airtable Integration'], notes: 'Capstone Project: architect a centralized customer & transactions repository synchronizing live orders across Stripe, CRM, and internal dashboards.' }
    ]
  },
  {
    num: 11,
    title: 'Module 11: AI-Powered Sales & Outreach Automation',
    durationHours: 2.5,
    totalSeconds: 9000,
    description: 'Modern outbound sales stack: Clay AI prospect research, waterfall data enrichment, Smartlead & Instantly.ai email infrastructure, AI reply classification, and sales handover.',
    assignmentTitle: 'Module 11 Practical Assignment: AI-Powered Cold Outbound Revenue Machine',
    assignmentInstructions: 'Build a compliant B2B sales automation engine: research prospects with Clay, execute waterfall email enrichment, configure secondary sending domains in Smartlead/Instantly, and classify replies.',
    deliverables: [
      'Clay enrichment table blueprint showing multi-provider waterfall routing',
      'Email deliverability setup checklist covering SPF, DKIM, DMARC, and custom tracking domains',
      'AI prompt template for dynamic lead research and personalized email icebreakers',
      'Automated reply management workflow routing positive replies to sales calendars and handling opt-outs'
    ],
    lessons: [
      { code: '11.1', title: '11.1 Introduction to Automated Sales Systems', durationSec: 1125, aiTools: ['Clay', 'Smartlead', 'Instantly.ai'], notes: 'Study modern outbound sales architectures: waterfall enrichment, secondary domain infrastructure, deliverability preservation, and AI personalization.' },
      { code: '11.2', title: '11.2 Clay – AI-Powered Prospect Research', durationSec: 1125, aiTools: ['Clay.com'], notes: 'Master Clay data engine: import target accounts, scrape live website content, research company hiring signals, and synthesize custom value props.' },
      { code: '11.3', title: '11.3 Waterfall Data Enrichment', durationSec: 1125, aiTools: ['Clay Waterfall Providers'], notes: 'Optimize data coverage and cost: configure waterfall enrichment cascades across Apollo, Hunter, Dropcontact, Findymail, and Prospeo.' },
      { code: '11.4', title: '11.4 Smartlead & Instantly.ai', durationSec: 1125, aiTools: ['Smartlead.ai', 'Instantly.ai'], notes: 'Configure dedicated cold outreach platforms: managing hundreds of mailboxes, unified master inboxes, automated warmup networks, and lead rotation.' },
      { code: '11.5', title: '11.5 Email Infrastructure & Deliverability', durationSec: 1125, aiTools: ['Google Workspace', 'Microsoft 365', 'Cloudflare DNS'], notes: 'Build resilient sending domains: domain purchase best practices, DNS records (SPF, DKIM, DMARC, MX), custom tracking domains, and daily send limits.' },
      { code: '11.6', title: '11.6 AI-Powered Lead Scoring & Personalization', durationSec: 1125, aiTools: ['Claygent AI', 'OpenAI API'], notes: 'Deploy AI research agents: visit prospect LinkedIn profiles, analyze recent press releases, and output bespoke 1-to-1 personalized email introductions.' },
      { code: '11.7', title: '11.7 Automated Reply Classification, Opt-Outs & Sales Handover', durationSec: 1125, aiTools: ['Smartlead Webhooks', 'n8n'], notes: 'Process incoming responses: classify replies with AI (Interested, Not Interested, Out of Office), trigger instant SMS to sales rep, and handle unsubscribes.' },
      { code: '11.8', title: '11.8 Complete AI-Powered Outbound Sales Engine', durationSec: 1125, aiTools: ['Full Outbound Tech Stack'], notes: 'Capstone Project: assemble an autonomous outbound sales machine generating verified leads, personalized emails, and booking meetings automatically.' }
    ]
  },
  {
    num: 12,
    title: 'Module 12: WhatsApp AI & Chatbot Automation',
    durationHours: 3.0,
    totalSeconds: 10800,
    description: 'Enterprise WhatsApp Business API automation: Meta Business Manager setup, message templates, webhook event streaming, AI conversational chatbots, and CRM synchronization.',
    assignmentTitle: 'Module 12 Practical Assignment: Conversational AI WhatsApp Booking & Support Assistant',
    assignmentInstructions: 'Deploy an automated WhatsApp Business assistant integrated with Meta Cloud API. Connect an AI knowledge base, capture customer inquiries, qualify leads, and sync contact details to CRM.',
    deliverables: [
      'Approved Meta WhatsApp message template definitions with dynamic variables',
      'Webhook listener and message routing workflow diagram (n8n or Make)',
      'Conversational AI prompt instructions and knowledge base documentation',
      'Recorded demonstration showing live WhatsApp message interaction, qualification, and appointment booking'
    ],
    lessons: [
      { code: '12.1', title: '12.1 Introduction to WhatsApp Business Automation', durationSec: 1350, aiTools: ['WhatsApp Business Platform'], notes: 'Understand WhatsApp commercial power: 98% open rates, global messaging footprint, Cloud API vs Business App, and compliance guidelines.' },
      { code: '12.2', title: '12.2 WhatsApp Business API Configuration', durationSec: 1350, aiTools: ['Meta Business Manager', 'Meta Developer Portal'], notes: 'Configure Meta Cloud API: verify business manager, register dedicated phone numbers, configure payment methods, and generate system user tokens.' },
      { code: '12.3', title: '12.3 Message Templates, Consent & Webhooks', durationSec: 1350, aiTools: ['WhatsApp Template Manager'], notes: 'Manage WhatsApp templates: Marketing, Utility, Authentication categories, opt-in consent guidelines, and setting up incoming message webhooks.' },
      { code: '12.4', title: '12.4 Building an AI WhatsApp Chatbot', durationSec: 1350, aiTools: ['n8n Webhook Node', 'OpenAI API'], notes: 'Architect conversational flow: receive message webhooks, parse text/media payloads, invoke LLM agent, and dispatch response messages via WhatsApp API.' },
      { code: '12.5', title: '12.5 Knowledge Base & AI Conversations', durationSec: 1350, aiTools: ['Vector Store', 'Supabase pgvector'], notes: 'Empower chatbot with business answers: inject product pricing, service offerings, and refund policies into conversational prompt context.' },
      { code: '12.6', title: '12.6 Automated Lead Qualification', durationSec: 1350, aiTools: ['Conversational AI State Machine'], notes: 'Extract customer qualification details: dynamically collect budget, company size, timeline, and location through natural dialogue.' },
      { code: '12.7', title: '12.7 HubSpot & GoHighLevel Integration', durationSec: 1350, aiTools: ['HubSpot API', 'GHL API'], notes: 'Sync WhatsApp chat history: update CRM contact records, log full transcript conversations, update deal stages, and trigger sales tasks.' },
      { code: '12.8', title: '12.8 Human Handover, Testing & Deployment', durationSec: 1350, aiTools: ['Live Agent Handover Workflow'], notes: 'Implement smooth human escalation: detect frustrated sentiment or request for human, pause AI bot, and alert live support team via Slack/CRM.' }
    ]
  },
  {
    num: 13,
    title: 'Module 13: Voice AI & Calling Automation',
    durationHours: 3.0,
    totalSeconds: 10800,
    description: 'Voice AI agents with Vapi and Retell AI: Speech-to-Text (STT), Large Language Models (LLM), Text-to-Speech (TTS), latency optimization, inbound receptionists, and appointment booking.',
    assignmentTitle: 'Module 13 Practical Assignment: AI Voice Receptionist with Automated Calendar Booking',
    assignmentInstructions: 'Configure and deploy an autonomous AI Voice Agent using Vapi or Retell AI. Connect a live phone number, integrate calendar booking functions, and test inbound call handling.',
    deliverables: [
      'Voice agent prompt architecture and system prompt configuration export',
      'Function calling schema connecting the voice agent to live calendar scheduling',
      'Latency benchmark report detailing STT, LLM inference, and TTS response times',
      'Audio recording and transcript of a live phone call successfully handled by the AI agent'
    ],
    lessons: [
      { code: '13.1', title: '13.1 Introduction to AI Voice Agents', durationSec: 1350, aiTools: ['Vapi.ai', 'Retell AI', 'Bland AI'], notes: 'Understand the Voice AI stack: pipeline of Audio In -> Speech-to-Text (Deepgram) -> LLM Reasoning (GPT-4o) -> Text-to-Speech (ElevenLabs/Cartesia) -> Audio Out.' },
      { code: '13.2', title: '13.2 Vapi & Retell AI', durationSec: 1350, aiTools: ['Vapi Dashboard', 'Retell AI Dashboard'], notes: 'Configure leading Voice AI platforms: purchasing phone numbers, configuring SIP trunks, managing webhooks, and monitoring call logs.' },
      { code: '13.3', title: '13.3 Speech-to-Text & Text-to-Speech', durationSec: 1350, aiTools: ['Deepgram Nova-2', 'ElevenLabs', 'Cartesia'], notes: 'Optimize voice quality and latency: voice cloning, emotional inflection, speech rate, silence detection thresholds, and background noise filters.' },
      { code: '13.4', title: '13.4 Voice Agent Configuration & Prompt Engineering', durationSec: 1350, aiTools: ['Voice Prompt Engineering'], notes: 'Design conversational speech prompts: concise answers, handling interruptions gracefully, fillers/acknowledgments, and conversational guardrails.' },
      { code: '13.5', title: '13.5 Inbound & Consented Outbound Calling', durationSec: 1350, aiTools: ['Twilio', 'SIP Trunking'], notes: 'Handle calling workflows: inbound business receptionist call flows, consented outbound follow-up calls, and compliance regulations (TCPA, DNC list).' },
      { code: '13.6', title: '13.6 Automated Appointment Booking', durationSec: 1350, aiTools: ['Cal.com API', 'Google Calendar API'], notes: 'Real-time tool execution during calls: voice agent queries available calendar slots, proposes times to caller, and confirms bookings instantly.' },
      { code: '13.7', title: '13.7 Call Summaries & Business System Integration', durationSec: 1350, aiTools: ['n8n End-of-Call Webhook'], notes: 'Process call outcomes: receive post-call webhooks with audio recording, full transcript, AI summary, sentiment rating, and update CRM records.' },
      { code: '13.8', title: '13.8 Voice Agent Testing, Human Handover & Deployment', durationSec: 1350, aiTools: ['Live Call Transfer (SIP Referral)'], notes: 'Deploy production voice agents: real-time call transfer to human operators on complex issues, load testing, latency optimization (<800ms), and analytics.' }
    ]
  },
  {
    num: 14,
    title: 'Module 14: Cross-Platform Business Integrations',
    durationHours: 3.0,
    totalSeconds: 10800,
    description: 'Architecting multi-platform ecosystems: syncing HubSpot, GoHighLevel, Apollo, Meta Ads, Google Workspace, Slack, and Stripe into a unified, synchronized business automation engine.',
    assignmentTitle: 'Module 14 Practical Assignment: Unified Multi-Platform Revenue Operations Ecosystem',
    assignmentInstructions: 'Architect and execute an end-to-end integration connecting paid advertising (Meta/Google), CRM (HubSpot/GHL), payment processing (Stripe), internal alerts (Slack), and database records.',
    deliverables: [
      'Comprehensive multi-platform architecture diagram illustrating data flow and integration points',
      'Stripe webhook integration workflow handling customer checkout, invoice generation, and CRM update',
      'Meta Ads webhook pipeline capturing lead forms and instant routing to sales channels',
      'End-to-end transaction test log validating data consistency across all connected platforms'
    ],
    lessons: [
      { code: '14.1', title: '14.1 Multi-Platform Automation Architecture', durationSec: 1350, aiTools: ['Lucidchart', 'Architecture Blueprints'], notes: 'Design enterprise integration architectures: hub-and-spoke vs point-to-point, single source of truth data governance, and event streaming.' },
      { code: '14.2', title: '14.2 HubSpot with Zapier & n8n', durationSec: 1350, aiTools: ['HubSpot Webhooks', 'n8n', 'Zapier'], notes: 'Extend HubSpot capabilities: connect external microservices, trigger specialized AI processing, and sync non-standard data models via webhooks.' },
      { code: '14.3', title: '14.3 Apollo with HubSpot & n8n', durationSec: 1350, aiTools: ['Apollo API', 'HubSpot Workflows'], notes: 'Automate sales pipeline handovers: push interested Apollo replies into HubSpot as high-priority deals and auto-assign to account executives.' },
      { code: '14.4', title: '14.4 GoHighLevel with Zapier & n8n', durationSec: 1350, aiTools: ['GHL Custom Webhooks', 'n8n'], notes: 'Integrate GHL with external backends: stream booking appointments to analytics warehouses, fire external billing systems, and sync customer data.' },
      { code: '14.5', title: '14.5 Meta Lead Ads & Business Automation', durationSec: 1350, aiTools: ['Meta Graph API', 'Lead Ads Webhook'], notes: 'Capture paid social leads in real-time: subscribe to Meta Webhook feeds, decrypt lead payloads, and distribute to CRM and SMS within 30 seconds.' },
      { code: '14.6', title: '14.6 Google Sheets, Gmail & Slack Integration', durationSec: 1350, aiTools: ['Google Workspace', 'Slack Webhooks'], notes: 'Build internal operational transparency: automated spreadsheet logging, email confirmation receipts, and interactive team alerts in Slack.' },
      { code: '14.7', title: '14.7 Stripe Payments & Invoice Automation', durationSec: 1350, aiTools: ['Stripe Webhooks', 'Stripe API'], notes: 'Automate financial revenue operations: handle checkout.session.completed, invoice.paid, customer.subscription.deleted, and issue tax receipts.' },
      { code: '14.8', title: '14.8 Building a Multi-Platform AI Business System', durationSec: 1350, aiTools: ['Universal Integration Engine'], notes: 'Capstone Project: orchestrate a multi-platform corporate automation network connecting marketing ads, CRM sales, billing, and fulfillment.' }
    ]
  },
  {
    num: 15,
    title: 'Module 15: Deployment, Security & Maintenance',
    durationHours: 2.0,
    totalSeconds: 7200,
    description: 'Production infrastructure: Git & GitHub version control, Docker containerization, cloud hosting (AWS, DigitalOcean, Hetzner), API secret management, logging, monitoring, and backups.',
    assignmentTitle: 'Module 15 Practical Assignment: Production Workflow Deployment, Security & Monitoring Suite',
    assignmentInstructions: 'Deploy an automated workflow infrastructure to a cloud server using Docker. Implement environment variable secrets management, automated backup routines, and uptime monitoring alerts.',
    deliverables: [
      'GitHub repository link containing version-controlled workflow templates and Docker compose configs',
      'Security hardening audit report verifying API secret masking, HTTPS encryption, and firewall rules',
      'Automated database and workflow backup script configuration with scheduled cloud storage upload',
      'Uptime and health-check monitoring dashboard screenshot with configured alert notifications'
    ],
    lessons: [
      { code: '15.1', title: '15.1 Git & GitHub Fundamentals', durationSec: 1200, aiTools: ['Git CLI', 'GitHub Desktop'], notes: 'Version-control automation code: repositories, branches, commit hygiene, pull requests, and managing workflow JSON configuration files.' },
      { code: '15.2', title: '15.2 Docker & Cloud Hosting', durationSec: 1200, aiTools: ['Docker', 'DigitalOcean', 'Hetzner Cloud'], notes: 'Deploy scalable servers: provision Linux VPS instances, install Docker engine, manage container lifecycles, and configure UFW firewall security.' },
      { code: '15.3', title: '15.3 Production Workflow Deployment', durationSec: 1200, aiTools: ['Docker Compose', 'Reverse Proxy (Nginx/Traefik)'], notes: 'Run services in production: SSL certificate automation via Let\'s Encrypt, domain DNS mapping, health checks, and container auto-restart policies.' },
      { code: '15.4', title: '15.4 API Security, Secrets & Access Management', durationSec: 1200, aiTools: ['Infisical', 'Vault', 'Environment Secrets'], notes: 'Protect credentials: never hardcode API keys, use encrypted environment variables, manage IAM principle of least privilege, and rotate keys.' },
      { code: '15.5', title: '15.5 Logging, Monitoring, Backups & Error Recovery', durationSec: 1200, aiTools: ['Uptime Kuma', 'Better Uptime', 'Postgres pg_dump'], notes: 'Ensure 99.9% reliability: configure uptime ping monitoring, automated daily database snapshots to S3, and incident triage alerts.' },
      { code: '15.6', title: '15.6 Automation Maintenance & Cost Optimization', durationSec: 1200, aiTools: ['Cost Calculator', 'Performance Profiler'], notes: 'Maintain healthy systems: monitor monthly API and task spend, audit inactive workflows, optimize execution times, and refactor bottlenecks.' }
    ]
  },
  {
    num: 16,
    title: 'Module 16: Real-World Projects & Career Development',
    durationHours: 2.5,
    totalSeconds: 9000,
    description: 'Professional career launch: Client business auditing, enterprise architecture documentation, project pricing, automation consulting proposals, client handover, and Final Capstone Project.',
    assignmentTitle: 'Module 16 Final Capstone Project: Comprehensive AI & Business Automation System',
    assignmentInstructions: 'Design, build, document, and submit an end-to-end commercial AI & Business Automation System solving a significant business challenge. Must incorporate multi-platform integration, an AI agent, database storage, and error recovery.',
    deliverables: [
      'Complete executive client proposal and technical architecture blueprint document',
      'Functional production automation system with live video walkthrough demonstrating execution',
      'Exported workflow configurations, database schemas, and AI agent prompt specifications',
      'Client onboarding guide and operational maintenance documentation for business stakeholders'
    ],
    lessons: [
      { code: '16.1', title: '16.1 Understanding Client Business Requirements', durationSec: 1125, aiTools: ['Client Discovery Framework'], notes: 'Conduct client discovery interviews: uncover operational pain points, quantify labor hours lost, map existing technology stacks, and set project goals.' },
      { code: '16.2', title: '16.2 Business Process Auditing', durationSec: 1125, aiTools: ['Process Audit Matrix'], notes: 'Deliver formal automation audits: evaluate feasibility, calculate ROI projections, and produce actionable automation roadmaps.' },
      { code: '16.3', title: '16.3 Automation Architecture & Documentation', durationSec: 1125, aiTools: ['Notion', 'Mermaid.js', 'Eraser.io'], notes: 'Write professional technical documentation: system architecture diagrams, data dictionaries, error runbooks, and credential matrices.' },
      { code: '16.4', title: '16.4 Industry-Specific Automation Solutions', durationSec: 1125, aiTools: ['Vertical Industry Blueprints'], notes: 'Study vertical use cases: automations for Real Estate, Legal & Accounting firms, E-commerce D2C brands, Healthcare clinics, and B2B SaaS.' },
      { code: '16.5', title: '16.5 Building a Complete Business Automation System', durationSec: 1125, aiTools: ['Enterprise Architecture Stack'], notes: 'Synthesize all course skills: lead generation, CRM pipelines, AI knowledge bots, database logging, voice notifications, and executive BI dashboards.' },
      { code: '16.6', title: '16.6 Project Testing, Deployment & Client Handover', durationSec: 1125, aiTools: ['Client Handover Checklist'], notes: 'Execute seamless client handovers: User Acceptance Testing (UAT), client training video tutorials, and ongoing maintenance SLA agreements.' },
      { code: '16.7', title: '16.7 Freelancing, Project Pricing & Automation Consulting', durationSec: 1125, aiTools: ['Proposal Templates', 'Pricing Calculator'], notes: 'Package high-ticket consulting services: value-based pricing ($2k - $10k+ per build), monthly retainer maintenance, and proposal closing tactics.' },
      { code: '16.8', title: '16.8 Final Capstone Project & Certification Assessment', durationSec: 1125, aiTools: ['StudentVerse Certification Assessment'], notes: 'Complete and submit your comprehensive Capstone system for evaluation to receive your StudentVerse Certified AI & Business Automation Specialist credential.' }
    ]
  }
];

module.exports = { rawModules };
