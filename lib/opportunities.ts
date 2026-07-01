import { Opportunity, OpportunityCategory, Metrics, ApiOpportunity, EventType } from './types';

// Re-export CATEGORIES from types
export { CATEGORIES } from './types';

// ─────────────────────────────────────────────────────────
// ID Generation
// ─────────────────────────────────────────────────────────
let idCounter = 1;
const generateId = (): string => `opp-${idCounter++}`;

// ─────────────────────────────────────────────────────────
// Enriched Fallback Data (18 items with eventType variants)
// ─────────────────────────────────────────────────────────
const FALLBACK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'fallback-1',
    title: 'GitHub Student Developer Pack',
    description: 'Get free access to premium developer tools including GitHub Pro, Copilot, domain names, cloud hosting, and more. Over 100 tools and services worth $200K+.',
    category: 'student-packs',
    provider: 'GitHub',
    value: '₹1.7Cr+ value',
    claimed: false,
    featured: true,
    tags: ['Developer Tools', 'Cloud', 'AI'],
    url: 'https://education.github.com/pack',
    source: 'github-education',
    createdAt: new Date().toISOString(),
    eventType: 'discount',
    registrationUrl: 'https://education.github.com/discount_requests/application',
  },
  {
    id: 'fallback-2',
    title: 'AWS Educate - Cloud Credits',
    description: 'Access AWS services, training, and collaborate with the cloud community. Includes $100+ in AWS credits and hands-on labs.',
    category: 'cloud-credits',
    provider: 'Amazon Web Services',
    value: '₹8,500+ credits',
    deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    claimed: false,
    featured: true,
    tags: ['Cloud', 'AWS', 'Credits'],
    url: 'https://aws.amazon.com/education/awseducate/',
    source: 'aws-educate',
    createdAt: new Date().toISOString(),
    eventType: 'discount',
    registrationUrl: 'https://aws.amazon.com/education/awseducate/',
  },
  {
    id: 'fallback-3',
    title: 'Google Cloud Student Innovators',
    description: 'Join the program to get free access to Google Cloud Platform, training, and certification opportunities. Build your cloud skills.',
    category: 'cloud-credits',
    provider: 'Google Cloud',
    value: '₹25,000 credits',
    claimed: true,
    featured: false,
    tags: ['GCP', 'Cloud', 'Certification'],
    url: 'https://cloud.google.com/edu/students',
    source: 'google-cloud',
    createdAt: new Date().toISOString(),
    eventType: 'general',
  },
  {
    id: 'fallback-5',
    title: 'Microsoft Learn Student Ambassadors',
    description: 'Join a global community of student tech leaders. Get Azure credits, early access to Microsoft technologies, and leadership opportunities.',
    category: 'student-packs',
    provider: 'Microsoft',
    value: 'Azure + Tools',
    claimed: false,
    featured: false,
    tags: ['Azure', 'Leadership', 'Community'],
    url: 'https://studentambassadors.microsoft.com',
    source: 'microsoft',
    createdAt: new Date().toISOString(),
    eventType: 'general',
  },
  {
    id: 'fallback-6',
    title: 'JetBrains Academy Free License',
    description: 'Free access to all JetBrains IDEs and learning platform. Perfect for learning Python, Java, Kotlin and more with interactive projects.',
    category: 'tools',
    provider: 'JetBrains',
    value: '₹55,000/yr value',
    deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    claimed: false,
    featured: false,
    tags: ['IDE', 'Python', 'Java'],
    url: 'https://www.jetbrains.com/community/education/',
    source: 'jetbrains',
    createdAt: new Date().toISOString(),
    eventType: 'discount',
    registrationUrl: 'https://www.jetbrains.com/community/education/#students',
  },
  {
    id: 'fallback-7',
    title: 'Coursera for Campus',
    description: 'Free access to 5,000+ courses from top universities. Earn certificates in tech, business, and creative fields.',
    category: 'courses',
    provider: 'Coursera',
    value: '5,000+ Courses',
    claimed: true,
    featured: false,
    tags: ['Learning', 'Certificates', 'Universities'],
    url: 'https://www.coursera.org/campus',
    source: 'coursera',
    createdAt: new Date().toISOString(),
    eventType: 'general',
  },
  {
    id: 'fallback-8',
    title: 'Figma for Education',
    description: 'Professional design tool suite completely free for students. Collaborate on UI/UX projects with advanced prototyping tools.',
    category: 'tools',
    provider: 'Figma',
    value: '₹12,000/yr value',
    claimed: false,
    featured: false,
    tags: ['Design', 'UI/UX', 'Prototyping'],
    url: 'https://www.figma.com/education/',
    source: 'figma',
    createdAt: new Date().toISOString(),
    eventType: 'discount',
    registrationUrl: 'https://www.figma.com/education/',
  },
  {
    id: 'fallback-9',
    title: 'Y Combinator Startup School',
    description: 'Free online course on how to start a startup. Learn from YC partners, get $15K grant through Coolest Projects program.',
    category: 'courses',
    provider: 'Y Combinator',
    value: '₹12.5L grants',
    claimed: false,
    featured: false,
    tags: ['Startup', 'Venture backed', 'Grant'],
    url: 'https://www.startupschool.org',
    source: 'yc',
    createdAt: new Date().toISOString(),
    eventType: 'general',
  },
  {
    id: 'fallback-10',
    title: 'Notion Free Plus for Students',
    description: 'Enhanced Notion workspace for students. Unlimited blocks, file uploads, and advanced collaboration features.',
    category: 'tools',
    provider: 'Notion',
    value: '₹8,000/yr value',
    claimed: false,
    featured: false,
    tags: ['Productivity', 'Notes', 'Projects'],
    url: 'https://www.notion.so/students',
    source: 'notion',
    createdAt: new Date().toISOString(),
    eventType: 'discount',
    registrationUrl: 'https://www.notion.so/product/notion-for-education',
  },
  {
    id: 'fallback-11',
    title: 'DigitalOcean Student Pack',
    description: 'Free cloud credits for students to deploy applications. Includes App Platform credit and managed databases access.',
    category: 'cloud-credits',
    provider: 'DigitalOcean',
    value: '₹17,000 credits',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    claimed: false,
    featured: false,
    tags: ['Cloud', 'Deployment', 'VPS'],
    url: 'https://www.digitalocean.com/github-students',
    source: 'digitalocean',
    createdAt: new Date().toISOString(),
    eventType: 'discount',
    registrationUrl: 'https://www.digitalocean.com/github-students',
  },
  {
    id: 'fallback-12',
    title: 'Hack The Box Student Pass',
    description: 'Free premium access to cybersecurity training platform. Practice penetration testing and earn industry-recognized certifications.',
    category: 'courses',
    provider: 'Hack The Box',
    value: '₹12,000/yr value',
    claimed: true,
    featured: false,
    tags: ['Security', 'Pentesting', 'Certification'],
    url: 'https://www.hackthebox.com/students',
    source: 'htb',
    createdAt: new Date().toISOString(),
    eventType: 'general',
  },
  // ── New enriched items for variant demonstration ──
  {
    id: 'fallback-13',
    title: 'MLH Global Hack Week: AI/ML Edition',
    description: 'A week-long hackathon celebrating artificial intelligence and machine learning. Build projects, attend workshops, and win prizes.',
    category: 'hackathons',
    provider: 'Major League Hacking',
    value: '₹5L+ prizes',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    claimed: false,
    featured: false,
    tags: ['AI/ML', 'Hackathon', 'Prizes'],
    url: 'https://ghw.mlh.io',
    source: 'mlh',
    createdAt: new Date().toISOString(),
    eventType: 'hackathon',
    registrationUrl: 'https://ghw.mlh.io',
    venue: 'Virtual — Global',
  },
  {
    id: 'fallback-14',
    title: 'Building Production-Ready LLM Apps',
    description: 'Live seminar by Andrej Karpathy on deploying transformer models at scale. Covers inference optimization, prompt engineering, and evaluation pipelines.',
    category: 'courses',
    provider: 'Stanford HAI',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    claimed: false,
    featured: false,
    tags: ['LLM', 'AI', 'Production'],
    url: 'https://hai.stanford.edu/events',
    source: 'stanford-hai',
    createdAt: new Date().toISOString(),
    eventType: 'seminar',
    speaker: 'Andrej Karpathy',
    venue: 'Stanford Gates Auditorium',
    liveStreamUrl: 'https://www.youtube.com/@StanfordHAI',
    registrationUrl: 'https://hai.stanford.edu/events',
  },
  {
    id: 'fallback-15',
    title: 'HackMIT 2026',
    description: 'MIT\'s annual flagship hackathon. 1,000+ hackers, 36 hours, build anything. Top prizes include internship fast-tracks at sponsor companies.',
    category: 'hackathons',
    provider: 'MIT',
    value: '₹8L+ prizes',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    claimed: false,
    featured: false,
    tags: ['MIT', 'Flagship', '36hr'],
    url: 'https://hackmit.org',
    source: 'hackmit',
    createdAt: new Date().toISOString(),
    eventType: 'hackathon',
    registrationUrl: 'https://hackmit.org',
    venue: 'MIT Stata Center, Cambridge MA',
  },
  {
    id: 'fallback-16',
    title: 'Open Source Contribution Workshop',
    description: 'Hands-on seminar on making meaningful open source contributions. Learn git workflows, finding good first issues, and building maintainer relationships.',
    category: 'courses',
    provider: 'GitHub Education',
    claimed: false,
    featured: false,
    tags: ['Open Source', 'Git', 'Community'],
    url: 'https://education.github.com/events',
    source: 'github-events',
    createdAt: new Date().toISOString(),
    eventType: 'seminar',
    speaker: 'Mona Octocat',
    liveStreamUrl: 'https://www.youtube.com/@GitHubEducation',
    registrationUrl: 'https://education.github.com/events',
  },
  {
    id: 'fallback-17',
    title: 'Vercel Pro — Free for Students',
    description: 'Deploy frontend projects with zero configuration. Includes serverless functions, edge network, and analytics dashboard access.',
    category: 'tools',
    provider: 'Vercel',
    value: '₹16,000/yr value',
    claimed: false,
    featured: false,
    tags: ['Deployment', 'Serverless', 'Edge'],
    url: 'https://vercel.com/education',
    source: 'vercel',
    createdAt: new Date().toISOString(),
    eventType: 'discount',
    registrationUrl: 'https://vercel.com/education',
  },
  {
    id: 'fallback-18',
    title: 'System Design for ML Engineers',
    description: 'Deep-dive seminar on designing scalable ML infrastructure. Covers feature stores, model serving, A/B testing, and monitoring in production.',
    category: 'courses',
    provider: 'Google DeepMind',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    claimed: false,
    featured: false,
    tags: ['System Design', 'ML Infra', 'Scale'],
    url: 'https://deepmind.google/education',
    source: 'deepmind',
    createdAt: new Date().toISOString(),
    eventType: 'seminar',
    speaker: 'Jeff Dean',
    venue: 'Virtual — Google Meet',
    liveStreamUrl: 'https://www.youtube.com/@GoogleDeepMind',
    registrationUrl: 'https://deepmind.google/education',
  },
];

// ─────────────────────────────────────────────────────────
// Category Detection
// ─────────────────────────────────────────────────────────
function detectCategory(data: ApiOpportunity, fallback: OpportunityCategory): OpportunityCategory {
  const title = (data.title || '').toLowerCase();
  const desc = (data.description || '').toLowerCase();
  const event_type = (data.event_type || '').toLowerCase();
  const combined = `${title} ${desc} ${event_type}`;

  if (combined.includes('hackathon') || combined.includes('codefest') || combined.includes('build challenge')) {
    return 'hackathons';
  }
  if (combined.includes('internship') || combined.includes('summer analyst') || combined.includes('fellow')) {
    return 'internships';
  }
  if (combined.includes('cloud') || combined.includes('aws') || combined.includes('gcp') || combined.includes('azure credits')) {
    return 'cloud-credits';
  }
  if (combined.includes('student pack') || combined.includes('student developer') || combined.includes('education pack')) {
    return 'student-packs';
  }
  if (combined.includes('course') || combined.includes('certification') || combined.includes('training') || combined.includes('bootcamp')) {
    return 'courses';
  }

  return fallback;
}

// ─────────────────────────────────────────────────────────
// Event Type Detection
// ─────────────────────────────────────────────────────────
function detectEventType(data: ApiOpportunity): EventType {
  const combined = `${data.title || ''} ${data.description || ''} ${data.event_type || ''}`.toLowerCase();

  if (combined.includes('seminar') || combined.includes('workshop') || combined.includes('talk') || combined.includes('webinar') || combined.includes('lecture')) {
    return 'seminar';
  }
  if (combined.includes('hackathon') || combined.includes('codefest') || combined.includes('hack week') || combined.includes('buildathon')) {
    return 'hackathon';
  }
  if (combined.includes('discount') || combined.includes('free') || combined.includes('student pack') || combined.includes('coupon')) {
    return 'discount';
  }

  return 'general';
}

// ─────────────────────────────────────────────────────────
// Provider Extraction from URL
// ─────────────────────────────────────────────────────────
function extractProviderFromUrl(url: string): string | null {
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.replace('www.', '').split('.');
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────
// Normalize External API Data → Opportunity
// ─────────────────────────────────────────────────────────
/** Prevents XSS via javascript: or data: URIs */
export function sanitizeUrl(url: string | undefined): string {
  if (!url) return '#';
  const trimmed = url.trim();
  // Allow only http://, https://, mailto:, tel:, relative path, or hash
  if (/^(https?|mailto|tel):/i.test(trimmed) || trimmed.startsWith('/') || trimmed === '#') {
    return trimmed;
  }
  return '#';
}

function normalizeOpportunity(apiData: ApiOpportunity, defaultCategory: OpportunityCategory = 'tools'): Opportunity {
  return {
    id: generateId(),
    title: apiData.title || 'Untitled Opportunity',
    description: apiData.description || 'No description available',
    category: detectCategory(apiData, defaultCategory),
    provider: apiData.provider || extractProviderFromUrl(apiData.url) || 'Unknown Provider',
    value: apiData.value,
    deadline: apiData.end_date || apiData.start_date,
    claimed: false,
    featured: false,
    tags: apiData.tags || [],
    url: sanitizeUrl(apiData.url || '#'),
    source: apiData.source || 'external',
    createdAt: apiData.start_date || new Date().toISOString(),
    eventType: detectEventType(apiData),
  };
}

// ─────────────────────────────────────────────────────────
// In-Memory Cache (Rate Limiting & Latency Mitigation)
// ─────────────────────────────────────────────────────────
let cachedOpportunities: Opportunity[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes cache TTL

// ─────────────────────────────────────────────────────────
// Fetch with Timeout & ISR Cache
// ─────────────────────────────────────────────────────────
async function fetchWithTimeout(url: string, timeout = 5000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 }, // ISR: 1 hour cache
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeout}ms`);
    }
    throw error;
  }
}


// ─────────────────────────────────────────────────────────
// Markdown Table Parser (Internships)
// Parses pipe-delimited tables: | Company | Role | Location | Link |
// ─────────────────────────────────────────────────────────
function parseMarkdownTable(markdown: string, defaultCategory: OpportunityCategory): Opportunity[] {
  const opportunities: Opportunity[] = [];
  const lines = markdown.split('\n');
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect table rows (pipe-delimited, at least 3 columns)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.split('|').filter(c => c.trim().length > 0);

      // Skip separator rows (e.g., |---|---|---|)
      if (cells.every(c => /^[\s-:]+$/.test(c))) {
        inTable = true;
        continue;
      }

      // Skip header rows (first row before separator)
      if (!inTable) continue;

      if (cells.length >= 2) {
        // Extract link from any cell: [Text](url)
        const linkMatch = trimmed.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
        if (!linkMatch) continue;

        const linkUrl = linkMatch[2];
        const linkTitle = linkMatch[1].trim();

        // Skip GitHub meta links, badges, and generic titles
        const isGitHubMeta = /github\.com\/[^/]+\/[^/]+\/(issues|pulls?|actions|wiki|blob|tree|commit|compare|new|contribute)/i.test(linkUrl);
        const isBadgeOrImage = /\.(png|jpg|jpeg|svg|gif|ico)(\?|$)/i.test(linkUrl) || /shields\.io|img\.shields|badge/i.test(linkUrl);
        const isGenericTitle = /^(issue|contribute|contributing|readme|license|pr|pull request|edit|click here|here|link|new|blank)$/i.test(linkTitle);

        if (isGitHubMeta || isBadgeOrImage || isGenericTitle) continue;

        // Extract company from first cell
        const companyCell = cells[0].trim();
        const companyMatch = companyCell.match(/\[([^\]]+)\]/);
        const company = companyMatch ? companyMatch[1] : companyCell.replace(/[*_`]/g, '').trim();

        // Extract location from cells if available
        const locationCell = cells.length >= 3 ? cells[2].trim().replace(/[*_`]/g, '') : undefined;

        opportunities.push({
          ...normalizeOpportunity({
            title: linkTitle.length > 3 ? linkTitle : company,
            url: linkUrl,
            event_type: 'internship',
            provider: company || undefined,
            description: locationCell ? `Location: ${locationCell}` : undefined,
          }, defaultCategory),
        });
      }
    } else {
      // Reset table state when leaving a table block
      inTable = false;
    }
  }

  return opportunities;
}

// ─────────────────────────────────────────────────────────
// Markdown Link List Parser (Hackathons, Events)
// Parses bullet lists: - [Event Name](url) — Description
// ─────────────────────────────────────────────────────────
function parseMarkdownLinks(markdown: string, defaultCategory: OpportunityCategory): Opportunity[] {
  const opportunities: Opportunity[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    // Match markdown links in bullet points or headings
    const match = line.match(/[-*#]\s*\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
    if (!match) continue;

    const [, title, url] = match;

    // Skip GitHub infra links
    const isGitHubMeta = /github\.com\/[^/]+\/[^/]+\/(issues|pulls?|actions|wiki|blob|tree|commit)/i.test(url);
    const isBadgeOrImage = /\.(png|jpg|jpeg|svg|gif|ico)(\?|$)/i.test(url) || /shields\.io/i.test(url);
    const isGenericTitle = /^(issue|contribute|contributing|readme|license|pr|here|link)$/i.test(title.trim());

    if (isGitHubMeta || isBadgeOrImage || isGenericTitle) continue;

    // Extract optional description after the link
    const descMatch = line.match(/\]\([^)]+\)\s*[-–—:]\s*(.+)/);
    const description = descMatch ? descMatch[1].trim() : undefined;

    opportunities.push(normalizeOpportunity({
      title: title.trim(),
      url,
      description,
      event_type: defaultCategory === 'hackathons' ? 'hackathon' : undefined,
    }, defaultCategory));
  }

  return opportunities;
}

// ─────────────────────────────────────────────────────────
// Source Fetchers
// ─────────────────────────────────────────────────────────

/** Fetch hackathon event data from public GitHub sources */
async function fetchHackathons(): Promise<Opportunity[]> {
  const HACKATHON_DATA_URL = process.env.NEXT_PUBLIC_HACKATHON_DATA_URL
    || 'https://raw.githubusercontent.com/SumedhSA3021/Student_Stack/main/data/hackathons.json';

  try {
    const response = await fetchWithTimeout(HACKATHON_DATA_URL, 8000);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    if (Array.isArray(data)) {
      return data.slice(0, 20).map((item: ApiOpportunity) => ({
        ...normalizeOpportunity(item, 'hackathons'),
        eventType: 'hackathon' as EventType,
      }));
    }

    return [];
  } catch (error) {
    console.warn('[StudentStack] Failed to fetch hackathons from URL, falling back to local database:', error instanceof Error ? error.message : error);
    try {
      const localData = require('../data/hackathons.json');
      if (Array.isArray(localData)) {
        return localData.slice(0, 20).map((item: ApiOpportunity) => ({
          ...normalizeOpportunity(item, 'hackathons'),
          eventType: 'hackathon' as EventType,
        }));
      }
    } catch (localErr) {
      console.error('[StudentStack] Local hackathons fallback also failed:', localErr);
    }
    return [];
  }
}

/** Fetch student pack opportunities from curated database */
async function fetchStudentPacks(): Promise<Opportunity[]> {
  const STUDENT_PACKS_URL = process.env.NEXT_PUBLIC_STUDENT_PACKS_URL
    || 'https://raw.githubusercontent.com/SumedhSA3021/Student_Stack/main/data/student_packs.json';

  try {
    const response = await fetchWithTimeout(STUDENT_PACKS_URL, 8000);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    if (Array.isArray(data)) {
      return data.slice(0, 20).map((item: ApiOpportunity) => 
        normalizeOpportunity(item, 'student-packs')
      );
    }

    return [];
  } catch (error) {
    console.warn('[StudentStack] Failed to fetch student packs from URL, falling back to local database:', error instanceof Error ? error.message : error);
    try {
      const localData = require('../data/student_packs.json');
      if (Array.isArray(localData)) {
        return localData.slice(0, 20).map((item: ApiOpportunity) => 
          normalizeOpportunity(item, 'student-packs')
        );
      }
    } catch (localErr) {
      console.error('[StudentStack] Local student packs fallback also failed:', localErr);
    }
    return [];
  }
}

/** Fetch internship listings from markdown-formatted GitHub repos */
async function fetchInternships(): Promise<Opportunity[]> {
  const INTERNSHIP_DATA_URL = process.env.NEXT_PUBLIC_INTERNSHIP_DATA_URL
    || 'https://raw.githubusercontent.com/SimplifyJobs/Summer2026-Internships/dev/README.md';

  try {
    const response = await fetchWithTimeout(INTERNSHIP_DATA_URL, 8000);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const text = await response.text();

    // Try table parser first (structured data), fall back to link parser
    let opportunities = parseMarkdownTable(text, 'internships');
    if (opportunities.length === 0) {
      opportunities = parseMarkdownLinks(text, 'internships');
    }

    return opportunities.slice(0, 15);
  } catch (error) {
    console.error('[StudentStack] Failed to fetch internships:', error instanceof Error ? error.message : error);
    return [];
  }
}

// ─────────────────────────────────────────────────────────
// Main Export: getLiveOpportunities()
// ─────────────────────────────────────────────────────────

/** Fetches from multiple live sources in parallel, merges with enriched fallback */
export async function getLiveOpportunities(): Promise<Opportunity[]> {
  const now = Date.now();
  if (cachedOpportunities && (now - cacheTimestamp < CACHE_TTL)) {
    return cachedOpportunities;
  }

  try {
    const [hackathons, studentPacks, internships] = await Promise.allSettled([
      fetchHackathons(),
      fetchStudentPacks(),
      fetchInternships(),
    ]);

    const liveOpportunities: Opportunity[] = [];

    if (hackathons.status === 'fulfilled') {
      liveOpportunities.push(...hackathons.value);
    }
    if (studentPacks.status === 'fulfilled') {
      liveOpportunities.push(...studentPacks.value);
    }
    if (internships.status === 'fulfilled') {
      liveOpportunities.push(...internships.value);
    }

    let combined: Opportunity[] = [];

    // Merge with fallback, preferring live data; deduplicate by title prefix
    if (liveOpportunities.length > 0) {
      const [first, second] = liveOpportunities;
      if (first) first.featured = true;
      if (second) second.featured = true;

      combined = [...liveOpportunities, ...FALLBACK_OPPORTUNITIES.filter(
        (fallback) => !liveOpportunities.some((live) =>
          live.title.toLowerCase().includes(fallback.title.toLowerCase().split(' ')[0])
        )
      )];
    } else {
      combined = FALLBACK_OPPORTUNITIES;
    }

    // Deep-sanitize all URLs before serving
    const sanitized = combined.map((opp) => ({
      ...opp,
      url: sanitizeUrl(opp.url),
      registrationUrl: opp.registrationUrl ? sanitizeUrl(opp.registrationUrl) : undefined,
      liveStreamUrl: opp.liveStreamUrl ? sanitizeUrl(opp.liveStreamUrl) : undefined,
    }));

    // Cache the sanitized result
    cachedOpportunities = sanitized;
    cacheTimestamp = now;

    return sanitized;
  } catch (error) {
    console.error('[StudentStack] getLiveOpportunities failed completely, serving fallback:', error instanceof Error ? error.message : error);

    // Deep-sanitize fallback URLs in case of complete error
    const sanitizedFallback = FALLBACK_OPPORTUNITIES.map((opp) => ({
      ...opp,
      url: sanitizeUrl(opp.url),
      registrationUrl: opp.registrationUrl ? sanitizeUrl(opp.registrationUrl) : undefined,
      liveStreamUrl: opp.liveStreamUrl ? sanitizeUrl(opp.liveStreamUrl) : undefined,
    }));

    return sanitizedFallback;
  }
}

// ─────────────────────────────────────────────────────────
// Query Utilities
// ─────────────────────────────────────────────────────────

/** Get featured opportunities */
export function getFeaturedOpportunities(opportunities: Opportunity[]): Opportunity[] {
  return opportunities.filter(opp => opp.featured);
}

/** Get opportunities by category */
export function getOpportunitiesByCategory(opportunities: Opportunity[], category: OpportunityCategory): Opportunity[] {
  return opportunities.filter(opp => opp.category === category);
}

/** Check if deadline is closing soon (within 7 days) */
export function isClosingSoon(deadline: string | undefined): boolean {
  if (!deadline) return false;
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diff = deadlineDate.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 && days <= 7;
}

/** Format date for human-readable display */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days < 0) return 'Expired';
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days <= 7) return `${days} days left`;
  if (days <= 30) return `${Math.ceil(days / 7)} weeks left`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/** Get closing soon opportunities */
export function getClosingSoonOpportunities(opportunities: Opportunity[]): Opportunity[] {
  return opportunities.filter(opp => opp.deadline && isClosingSoon(opp.deadline));
}

/** Calculate metrics from opportunities */
export function getMetrics(opportunities: Opportunity[]): Metrics {
  return {
    total: opportunities.length,
    claimed: opportunities.filter(opp => opp.claimed).length,
    closingSoon: opportunities.filter(opp => opp.deadline && isClosingSoon(opp.deadline)).length,
    featured: opportunities.filter(opp => opp.featured).length,
  };
}

// Re-export types for consumer convenience
export type { Opportunity, OpportunityCategory, Metrics, EventType };
