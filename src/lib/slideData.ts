export type SlideType =
  | 'title'
  | 'module-divider'
  | 'content'
  | 'stat'
  | 'story'
  | 'interaction'
  | 'visualization'
  | 'framework'
  | 'matrix'
  | 'list'
  | 'case-study'
  | 'closing';

export type SlideLayout =
  | 'default'
  | 'split'
  | 'quote-full'
  | 'comparison'
  | 'icon-grid'
  | 'number-spotlight';

export type SlideAnimation = 'fade-up' | 'scale-in' | 'stagger-left' | 'typewriter';

export interface Slide {
  id: string;
  type: SlideType;
  module?: number;
  title?: string;
  subtitle?: string;
  content?: string;
  items?: string[];
  stats?: { value: string; label: string; prefix?: string; suffix?: string }[];
  quote?: string;
  attribution?: string;
  visualization?: string;
  interaction?: string;
  notes?: string;
  layout?: SlideLayout;
  animation?: SlideAnimation;
  atmosphereImage?: string;
  atmosphereAlt?: string;
}

export const atmosphereImages = {
  factory: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200',
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
  data: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
  strategy: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
} as const;

export const slides: Slide[] = [
  // ============================================================
  // TITLE SLIDE
  // ============================================================
  {
    id: 'title',
    type: 'title',
    title: 'Practical AI for Manufacturing & Supply Chain Leaders',
    subtitle: 'A Masterclass by ACKU-AI',
    content: 'From AI Theater to Real Results: A practitioner\'s guide to building an AI program that actually works.',
  },

  // ============================================================
  // MODULE 1: "Where Are You Now?"
  // ============================================================
  {
    id: 'module-1',
    type: 'module-divider',
    module: 1,
    title: 'Where Are You Now?',
    subtitle: '90 Minutes',
    content: 'Honest assessment. No theater. Where your organization actually stands on AI maturity.',
  },

  {
    id: 'opening-question',
    type: 'story',
    module: 1,
    title: 'The Question Most Consultants Skip',
    quote: 'Before we talk about AI strategy, AI tools, AI anything - where are you, honestly, right now? Not where your board thinks you are. Where you actually are.',
    attribution: 'ACKU-AI Masterclass',
    content: 'That honesty is where real progress starts.',
    layout: 'quote-full',
    animation: 'typewriter',
    atmosphereImage: atmosphereImages.team,
    atmosphereAlt: 'Team in discussion',
  },

  {
    id: 'conference-delusion',
    type: 'story',
    module: 1,
    title: 'The Conference Delusion',
    quote: 'Every panel had someone talking about their AI transformation. Incredible demos. Beautiful slides. Then I\'d ask at the bar: "How many people actually use these tools day to day?" Long pause. "We\'re still in pilot phase." Every. Time.',
    attribution: 'The gap between what companies present and what\'s actually happening',
    content: 'AI Theater: Great performance, empty seats.',
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.team,
    atmosphereAlt: 'Collaboration meeting',
  },

  {
    id: 'maturity-model',
    type: 'visualization',
    module: 1,
    title: 'The AI Maturity Model',
    visualization: 'maturity-model',
    subtitle: 'Five levels of AI adoption - where does your organization sit?',
  },

  {
    id: 'maturity-stats',
    type: 'stat',
    module: 1,
    title: 'The Reality Check',
    stats: [
      { value: '11', suffix: '%', label: 'of companies report significant financial impact from AI', prefix: 'Only' },
      { value: '85', suffix: '%', label: 'of AI projects fail to deliver intended value' },
      { value: '3', suffix: 'x', label: 'return for companies focused on deployment over development' },
    ],
    notes: 'Sources: McKinsey 2024, Gartner, BCG',
  },

  {
    id: 'ai-theater',
    type: 'list',
    module: 1,
    title: 'Signs You\'re Doing AI Theater',
    items: [
      'Your "Center of Excellence" produces slide decks, not deployed tools',
      'AI demos wow the board but nobody on the floor has seen them',
      'Data scientists spend 80% of their time cleaning data',
      'Your AI strategy document is 40 pages and six months old',
      'You can name your AI initiatives but not your AI users',
    ],
    content: 'The root cause: organizations start with technology and work backward to problems.',
    layout: 'icon-grid',
    animation: 'stagger-left',
    atmosphereImage: atmosphereImages.ai,
    atmosphereAlt: 'AI technology abstract',
  },

  {
    id: 'ai-theater-story',
    type: 'story',
    module: 1,
    title: 'The Predictive Maintenance Demo',
    quote: 'Beautiful model. Six months of development. The plant manager watched, nodded, said "That\'s great." Never used it. Why? The model predicted failures 48 hours out, but maintenance scheduling worked on weekly cycles. Nobody asked what he actually needed.',
    attribution: 'AI Theater in action',
    layout: 'number-spotlight',
    animation: 'scale-in',
    atmosphereImage: atmosphereImages.factory,
    atmosphereAlt: 'Factory production line',
  },

  {
    id: 'ai-theater-stats',
    type: 'stat',
    module: 1,
    title: 'The Hard Numbers',
    stats: [
      { value: '70', suffix: '%', label: 'of companies report minimal or no impact from AI' },
      { value: '87', suffix: '%', label: 'of data science projects never reach production' },
    ],
    notes: 'Sources: MIT Sloan, VentureBeat',
    content: 'The #1 reason AI projects fail: lack of alignment with business processes. - Harvard Business Review',
  },

  {
    id: 'self-assessment',
    type: 'interaction',
    module: 1,
    title: 'Self-Assessment Framework',
    interaction: 'Honest Questions. Not the questions your board asks.',
    items: [
      'Data Readiness: Can you access manufacturing data in one place?',
      'Talent & Culture: Would your workforce voluntarily sign up for AI training?',
      'Governance: Does Legal know what AI tools employees already use?',
      'Leadership: Can your CEO articulate what AI means in three sentences?',
    ],
    content: 'Score yourselves honestly. Most hands go up when asked "Who scored lower than expected?"',
  },

  {
    id: 'quick-wins-matrix',
    type: 'matrix',
    module: 1,
    title: 'Quick Wins vs Strategic Bets',
    visualization: 'impact-matrix',
    subtitle: 'Not everything needs to be a moonshot. Start where the wins are fastest.',
  },

  {
    id: 'first-wins-story',
    type: 'story',
    module: 1,
    title: 'Our First Real Wins',
    quote: 'Our first wins weren\'t glamorous. Summarizing regulatory documents. Drafting SOPs faster. Analyzing complaint trends. None of that makes a keynote. But it saved people hours every week, and those people became evangelists.',
    attribution: 'Within 18 months: 1,000+ people actively using AI tools',
    content: 'Not because I told them to. Because early adopters told them it actually worked.',
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.data,
    atmosphereAlt: 'Analytics dashboard',
  },

  // ============================================================
  // MODULE 2: "Building Your Strategy"
  // ============================================================
  {
    id: 'module-2',
    type: 'module-divider',
    module: 2,
    title: 'Building Your Strategy',
    subtitle: '90 Minutes',
    content: 'From awareness to action. A strategy you can actually execute, not a 50-page deck that sits on a shelf.',
  },

  {
    id: 'strategy-fail',
    type: 'list',
    module: 2,
    title: 'Why Most AI Strategies Fail',
    items: [
      'Too Ambitious: "Deploy across all 12 plants in 18 months." You won\'t.',
      'No Governance: Legal finds out you\'re using AI for batch records without sign-off. Program dead.',
      'Wrong Talent Model: You don\'t need 20 data scientists. You need to upskill your domain experts.',
    ],
    content: 'Most AI strategies are dead on arrival. They fail before the first model is built.',
    layout: 'comparison',
    animation: 'scale-in',
    atmosphereImage: atmosphereImages.strategy,
    atmosphereAlt: 'Strategy planning table',
  },

  {
    id: 'strategy-stats',
    type: 'stat',
    module: 2,
    title: 'The Strategy Gap',
    stats: [
      { value: '74', suffix: '%', label: 'of companies find AI implementation harder than expected' },
      { value: '2.5', suffix: 'x', label: 'ROI from workforce training vs technology-only investment' },
      { value: '25', suffix: '%', label: 'of AI strategies include governance from the start', prefix: 'Only' },
    ],
    notes: 'Sources: Deloitte, Accenture, PwC',
  },

  {
    id: 'three-strategies',
    type: 'story',
    module: 2,
    title: 'Three Types of AI Strategy',
    quote: 'Type one: "Innovation Theater" - 40 beautiful pages, presented to the board, never referenced again. Type two: "IT Project" - everything through the tech lens, dies when the CTO moves on. Type three: the one that works.',
    attribution: 'A living document owned by the business, with clear use cases tied to real pain points',
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.strategy,
    atmosphereAlt: 'Strategic workshop',
  },

  {
    id: 'acku-framework',
    type: 'framework',
    module: 2,
    title: 'The ACKU Framework',
    visualization: 'acku-pipeline',
    subtitle: 'Four phases. Each must happen before the next. Skip a step and you\'ll be back here in 12 months.',
  },

  {
    id: 'use-case-tiers',
    type: 'visualization',
    module: 2,
    title: 'Use Case Prioritization',
    visualization: 'use-case-tiers',
    subtitle: 'Multiply Impact (1-5) by Feasibility (1-5). Above 15 = shortlist. Above 20 = start here.',
  },

  {
    id: 'deviation-story',
    type: 'story',
    module: 2,
    title: 'The Highest-Scoring Use Case',
    quote: 'It wasn\'t anything sexy. Helping quality engineers write deviation investigations faster. 2-3 hours per investigation, hundreds per month. AI drafting cut that to 30-45 minutes. Engineers loved it - freed them for actual root cause analysis.',
    attribution: 'The kind of win that builds momentum',
    layout: 'quote-full',
    animation: 'typewriter',
    atmosphereImage: atmosphereImages.data,
    atmosphereAlt: 'Data and analysis interface',
  },

  {
    id: 'business-case',
    type: 'list',
    module: 2,
    title: 'The One-Page Business Case',
    subtitle: 'Your CFO doesn\'t care about neural networks.',
    items: [
      'The Problem: 2 sentences max. What pain point? Who feels it?',
      'The Solution: 3 sentences. What, who, and how in plain English.',
      'Investment: Technology + People + Implementation + Timeline',
      'Return: Hours saved, errors reduced, revenue impact, payback period',
      'Risks: What could go wrong? Prevention? Exit strategy?',
      'Governance: Who owns this? Compliance path?',
    ],
    layout: 'split',
    animation: 'stagger-left',
    atmosphereImage: atmosphereImages.strategy,
    atmosphereAlt: 'Business planning session',
  },

  {
    id: 'business-case-stats',
    type: 'stat',
    module: 2,
    title: 'Making the Case',
    stats: [
      { value: '1.5', suffix: 'x', label: 'more likely to see ROI when tied to specific outcomes' },
      { value: '500', prefix: '$', suffix: 'K-$2M', label: 'average AI pilot cost, 60% wasted on failure' },
      { value: '100', prefix: '<$', suffix: 'K', label: 'our first use case cost, generating $500K+ annually' },
    ],
    notes: 'Sources: McKinsey, Bain, Internal benchmark',
  },

  {
    id: 'stakeholder-map',
    type: 'list',
    module: 2,
    title: 'Who Needs to Be in the Room',
    subtitle: 'The biggest mistake: AI strategy built by IT and presented as a finished product.',
    items: [
      'Business Sponsor: VP or above, owns the P&L',
      'IT/Data Leader: Technical feasibility and infrastructure',
      'Legal/Compliance: Governance, risk, regulatory',
      'HR/Talent: Workforce development, change management',
      'Finance: Budget and ROI tracking',
      'Operations Champion: Someone who knows the real workflows',
    ],
    layout: 'icon-grid',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.team,
    atmosphereAlt: 'Cross-functional team',
  },

  {
    id: 'three-conversations',
    type: 'list',
    module: 2,
    title: 'The Three Conversations',
    items: [
      'CEO: "90-day plan, one use case, ROI, guardrails. I need your visible sponsorship."',
      'CFO: "Investment, return, payback period, exit ramp if it doesn\'t work."',
      'CHRO: "Here\'s how we develop our people, not replace them."',
    ],
    content: 'The CHRO conversation is often skipped. Don\'t skip it.',
    layout: 'comparison',
    animation: 'scale-in',
    atmosphereImage: atmosphereImages.team,
    atmosphereAlt: 'Executive collaboration',
  },

  // ============================================================
  // MODULE 3: "Implementation That Sticks"
  // ============================================================
  {
    id: 'module-3',
    type: 'module-divider',
    module: 3,
    title: 'Implementation That Sticks',
    subtitle: '90 Minutes',
    content: 'Strategy without execution is just hope. This is where most programs fail. And this is where it gets hard.',
  },

  {
    id: 'pilot-trap',
    type: 'stat',
    module: 3,
    title: 'The Pilot Trap',
    stats: [
      { value: '80', suffix: '%', label: 'of AI pilots never scale to production' },
    ],
    content: 'Four out of five times an organization tries AI, the pilot runs for 6 months, the champion leaves, the budget gets reallocated, and the whole thing quietly dies.',
  },

  {
    id: 'pilot-trap-detail',
    type: 'list',
    module: 3,
    title: 'Why Pilots Die',
    items: [
      'Success Theater: Works with enthusiastic volunteers and a dedicated support team. Remove the support, remove the success.',
      'Scale Blindness: 20 to 2,000 users isn\'t 100x the same thing. It\'s a fundamentally different problem.',
      'Champion Dependency: Sarah in Plant 3 manually solves every problem. When Sarah gets promoted, the pilot dies.',
    ],
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.factory,
    atmosphereAlt: 'Industrial manufacturing floor',
  },

  {
    id: 'pilot-stats',
    type: 'stat',
    module: 3,
    title: 'The Scaling Challenge',
    stats: [
      { value: '53', suffix: '%', label: 'of AI projects don\'t make it from prototype to production' },
      { value: '2', suffix: 'x', label: 'more likely to achieve deployment when planning for scale from day one' },
    ],
    notes: 'Sources: Gartner, Deloitte. McKinsey: Primary barriers to scaling AI are organizational, not technical.',
  },

  {
    id: 'change-management',
    type: 'content',
    module: 3,
    title: 'The 80/20 Rule',
    subtitle: 'The technology is 20% of the work',
    content: 'Building a model? Connecting an API? Deploying a tool? That\'s the easy part. The other 80% is getting people to actually use it. Every day. Because it makes their job better.',
  },

  {
    id: 'three-fears',
    type: 'list',
    module: 3,
    title: 'The Three Fears',
    items: [
      'Fear of Replacement: "Is this going to take my job?" Address directly, repeatedly, honestly.',
      'Fear of Incompetence: "I\'m not a tech person." 20-year experts don\'t want to feel like beginners.',
      'Fear of Accountability: "If the AI is wrong and I act on it, who\'s responsible?"',
    ],
    content: 'In manufacturing, the answer is almost always: this takes the boring parts so you can focus on what requires your expertise.',
  },

  {
    id: 'adoption-curve',
    type: 'visualization',
    module: 3,
    title: 'The Adoption Curve',
    visualization: 'adoption-curve',
    subtitle: 'Find your champions. Build social proof. Momentum does the rest.',
  },

  {
    id: 'change-tactics',
    type: 'list',
    module: 3,
    title: 'Change Management That Works',
    items: [
      'Executive sponsorship that\'s visible - not a one-time email. Regular check-ins, public recognition.',
      'Peer champions, not IT trainers - a quality engineer teaching another quality engineer.',
      'Training that respects time - 30 minutes to start, then office hours. Not a 4-hour workshop.',
      'Quick wins first - save someone 30 minutes THIS WEEK. Then talk vision.',
      'Feedback loops that matter - ask what\'s not working, then fix it visibly.',
    ],
    layout: 'icon-grid',
    animation: 'stagger-left',
    atmosphereImage: atmosphereImages.team,
    atmosphereAlt: 'Team workshop',
  },

  {
    id: 'maria-story',
    type: 'story',
    module: 3,
    title: 'Maria Changed Everything',
    quote: 'Maria had done the same job for 15 years. Skeptical of AI. She tried one tool: an AI assistant for investigation reports. After a week: "I just got two hours of my life back today." Within six months, she was training other departments.',
    attribution: 'Maria sold our AI program better than any executive presentation ever could. Because she was credible. She was one of them.',
    layout: 'quote-full',
    animation: 'typewriter',
    atmosphereImage: atmosphereImages.team,
    atmosphereAlt: 'Experienced team members collaborating',
  },

  {
    id: 'capability-model',
    type: 'visualization',
    module: 3,
    title: 'The Capability Model',
    visualization: 'capability-tiers',
    subtitle: 'Build internal capability. Don\'t just outsource everything.',
  },

  {
    id: 'capability-stats',
    type: 'stat',
    module: 3,
    title: 'Invest in Your People',
    stats: [
      { value: '50', suffix: '%', label: 'of employees will need reskilling by 2025' },
      { value: '3.50', prefix: '$', label: 'returned for every $1 invested in AI workforce training' },
    ],
    notes: 'Sources: World Economic Forum, Accenture',
    content: 'We didn\'t hire a single data scientist. We taught quality engineers, planners, and analysts to use AI tools. Within a year: 1,000+ proficient users.',
  },

  {
    id: 'measure-right',
    type: 'list',
    module: 3,
    title: 'Measuring What Matters',
    subtitle: '"Our model is 94% accurate!" Great. Nobody\'s using it.',
    items: [
      'Adoption: Daily active users, voluntary adoption rate, feature utilization',
      'Efficiency: Hours saved per week, reduction in rework, cycle time improvement',
      'Business Impact: Cost savings, quality improvement, working capital impact',
      'Trust: User satisfaction, override rate, Net Promoter Score for AI tools',
    ],
    layout: 'comparison',
    animation: 'stagger-left',
    atmosphereImage: atmosphereImages.data,
    atmosphereAlt: 'Business dashboard view',
  },

  {
    id: 'voluntary-adoption',
    type: 'story',
    module: 3,
    title: 'The One Metric That Changed Everything',
    quote: 'We stopped tracking how many people we trained. We started tracking how many used the tool the week AFTER training without being reminded. Below 40%: product problem. Above 60%: winner, scale it.',
    attribution: 'Voluntary adoption rate - saved us from investing in tools that died in practice',
  },

  {
    id: 'case-study-timeline',
    type: 'case-study',
    module: 3,
    title: '0 to 1,000+ AI Users in 18 Months',
    visualization: 'timeline',
    subtitle: 'Not theory. What actually happened.',
  },

  {
    id: 'case-study-lessons',
    type: 'list',
    module: 3,
    title: 'Key Lessons',
    items: [
      'Start boring. Document drafting isn\'t exciting, but it touches everyone.',
      'Governance first. Zero compliance incidents because Legal was at the table from day one.',
      'Champions over mandates. Never mandated adoption. Made tools good enough that people chose it.',
      'Measure adoption, not accuracy. A tool nobody uses is a failed tool.',
      'Budget for change management. We spent more on training than technology. Right call.',
    ],
    layout: 'icon-grid',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.factory,
    atmosphereAlt: 'Factory operations team',
  },

  // ============================================================
  // MODULE 4: "Governance First"
  // ============================================================
  {
    id: 'module-4',
    type: 'module-divider',
    module: 4,
    title: 'Governance First',
    subtitle: '60 Minutes',
    content: 'Governance isn\'t the thing that slows you down. It\'s the thing that lets you go fast without breaking things.',
  },

  {
    id: 'governance-why',
    type: 'content',
    module: 4,
    title: 'Why Governance Before Scale',
    subtitle: 'The first thing we built wasn\'t a tool. It was a governance framework.',
    content: 'Before deploying anything, before training anyone, we brought Legal, Compliance, Privacy, and IT Security into a room and said: "We\'re going to start using AI. Help us do it right."',
  },

  {
    id: 'governance-stats',
    type: 'stat',
    module: 4,
    title: 'The Governance Gap',
    stats: [
      { value: '74', suffix: '%', label: 'of organizations not taking adequate steps for AI trustworthiness' },
      { value: '61', suffix: '%', label: 'of executives concerned about AI risks' },
      { value: '17', suffix: '%', label: 'have comprehensive governance programs', prefix: 'Only' },
    ],
    notes: 'Sources: IBM, KPMG. EU AI Act: Regulation is coming whether you\'re ready or not.',
  },

  {
    id: 'quality-analogy',
    type: 'story',
    module: 4,
    title: 'The Quality System Analogy',
    quote: 'In FDA-regulated manufacturing, you don\'t ship product and then figure out quality controls. You build quality into the process from the start. The same principle applies to AI. Governance isn\'t bureaucracy. It\'s the quality system for your AI program.',
    attribution: 'When we brought Legal in on day one, they said: "Thank you for including us before this became a problem."',
  },

  {
    id: 'legal-partnership',
    type: 'list',
    module: 4,
    title: 'Legal as Partners, Not Blockers',
    subtitle: 'The relationship doesn\'t have to be adversarial.',
    items: [
      'Educate Together: Invite Legal to the same training your business users attend.',
      'Co-Create: Ask them to help design the governance structure, not just review it.',
      'Define Risk Tiers Together: Not all AI use cases carry the same risk.',
      'Make Compliance Easy: If approval takes 6 weeks, people go around it.',
    ],
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.team,
    atmosphereAlt: 'Legal and business stakeholders in session',
  },

  {
    id: 'risk-framework',
    type: 'visualization',
    module: 4,
    title: 'AI Risk Framework',
    visualization: 'risk-framework',
    subtitle: 'Five categories of risk. Specific prevention for each.',
  },

  {
    id: 'risk-tiers',
    type: 'visualization',
    module: 4,
    title: 'Risk Tier Model',
    visualization: 'risk-tiers',
    subtitle: 'Fast track for low risk. Thorough review for high risk. Never more than 2 weeks.',
  },

  {
    id: 'policy-templates',
    type: 'list',
    module: 4,
    title: 'Governance Building Blocks',
    subtitle: 'Starting points you can customize. Not final policies.',
    items: [
      'AI Acceptable Use Policy: What\'s approved, what data, required reviews. One page max.',
      'AI Governance Charter: Council membership, decision authority, risk tiers. Living document.',
      'Use Case Approval Template: Business problem, data needs, risk tier, compliance review.',
      'AI Incident Response Plan: Have this BEFORE you need it. Like a fire drill, not a fire.',
    ],
    layout: 'icon-grid',
    animation: 'scale-in',
    atmosphereImage: atmosphereImages.ai,
    atmosphereAlt: 'AI technology visualization',
  },

  {
    id: 'trust-equation',
    type: 'visualization',
    module: 4,
    title: 'The Trust Equation',
    visualization: 'trust-equation',
    subtitle: 'AI adoption, at its core, is a trust problem. And trust has a formula.',
  },

  {
    id: 'trust-story',
    type: 'story',
    module: 4,
    title: 'The Moment Trust Was Earned',
    quote: 'A plant manager, skeptical from the start, called me and said: "My team is asking for more AI tools. What else do you have?" He didn\'t call because I asked him to. He called because his team experienced the value.',
    attribution: 'Trust: you can\'t mandate it, you can\'t rush it. You build it through transparency, consistency, competence, and genuine care.',
    layout: 'quote-full',
    animation: 'typewriter',
    atmosphereImage: atmosphereImages.ai,
    atmosphereAlt: 'AI infrastructure and data network',
  },

  // ============================================================
  // CLOSING
  // ============================================================
  {
    id: 'closing',
    type: 'closing',
    title: 'Lead the Transformation',
    content: 'AI in manufacturing isn\'t about replacing your workforce. It\'s about amplifying the expertise that already exists.',
    subtitle: 'The question isn\'t whether AI will transform manufacturing. It will. The question is whether you\'ll lead that transformation or react to it.',
  },

  {
    id: 'action',
    type: 'interaction',
    title: 'Your Monday Morning Action',
    interaction: 'When I get back to the office, I will ___________',
    content: 'One use case. One quick win. One group of champions. Build from there.',
    items: [
      'You have a maturity assessment',
      'You have a strategy framework',
      'You have an implementation playbook',
      'You have a governance toolkit',
    ],
  },

  {
    id: 'final',
    type: 'title',
    title: 'ACKU-AI',
    subtitle: 'Practical AI Strategy for Regulated Industries',
    content: 'acku-ai.com',
  },
];

export const modules = [
  { number: 1, title: 'Where Are You Now?', color: '#f59e0b', duration: '90 min' },
  { number: 2, title: 'Building Your Strategy', color: '#00d4aa', duration: '90 min' },
  { number: 3, title: 'Implementation That Sticks', color: '#4f6df5', duration: '90 min' },
  { number: 4, title: 'Governance First', color: '#d946ef', duration: '60 min' },
];

export const moduleThemes: Record<number, { gradient: string; glowA: string; glowB: string }> = {
  1: {
    gradient: 'linear-gradient(145deg, #0a0a0f 0%, rgba(245, 158, 11, 0.12) 45%, rgba(249, 115, 22, 0.16) 100%)',
    glowA: '#f59e0b',
    glowB: '#fb923c',
  },
  2: {
    gradient: 'linear-gradient(145deg, #0a0a0f 0%, rgba(0, 212, 170, 0.14) 40%, rgba(6, 182, 212, 0.12) 100%)',
    glowA: '#00d4aa',
    glowB: '#22d3ee',
  },
  3: {
    gradient: 'linear-gradient(145deg, #0a0a0f 0%, rgba(79, 109, 245, 0.15) 45%, rgba(99, 102, 241, 0.12) 100%)',
    glowA: '#4f6df5',
    glowB: '#6366f1',
  },
  4: {
    gradient: 'linear-gradient(145deg, #0a0a0f 0%, rgba(217, 70, 239, 0.14) 44%, rgba(236, 72, 153, 0.12) 100%)',
    glowA: '#d946ef',
    glowB: '#ec4899',
  },
};
