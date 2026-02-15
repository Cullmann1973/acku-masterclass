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
  timeline: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200',
  sensors: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
  product: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
  tools: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200',
  ironman: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200',
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
  // MODULE 5: "Let's Take a Deep Breath"
  // ============================================================
  {
    id: 'module-5',
    type: 'module-divider',
    module: 5,
    title: 'Let\'s Take a Deep Breath',
    subtitle: '90 Minutes',
    content: 'The last 24 months in AI. What happened, where it\'s going, and what it means for manufacturing leaders.',
  },

  {
    id: 'deep-breath-opening',
    type: 'story',
    module: 5,
    title: 'The Pace Nobody Expected',
    quote: 'Think back to February 2020. If someone told you they were stockpiling toilet paper, you would\'ve thought they were nuts. Then, over three weeks, everything changed. We\'re in the "this seems overblown" phase of something much bigger.',
    attribution: 'Matt Shumer, "Something Big Is Happening" (February 2026)',
    content: 'The leaders who understood Covid early didn\'t panic. They prepared. That\'s what this module is about.',
    layout: 'quote-full',
    animation: 'typewriter',
    atmosphereImage: atmosphereImages.ai,
    atmosphereAlt: 'AI technology abstract',
  },

  {
    id: 'ai-timeline',
    type: 'visualization',
    module: 5,
    title: 'The AI Timeline: Six Years That Changed Everything',
    visualization: 'ai-timeline',
    subtitle: 'From research curiosity to "does my job better than I can" in under six years.',
  },

  {
    id: 'timeline-stats',
    type: 'stat',
    module: 5,
    title: 'The Speed of Change',
    stats: [
      { value: '100', suffix: 'M', label: 'ChatGPT users in 2 months - fastest adoption in history' },
      { value: '90', suffix: 'th', label: 'percentile: GPT-4 on the bar exam (GPT-3 scored 10th)' },
      { value: '7', suffix: ' months', label: 'AI task capability is doubling every 7 months (METR)' },
    ],
    notes: 'Sources: OpenAI, METR AI Evaluation',
  },

  {
    id: 'feb-2026',
    type: 'story',
    module: 5,
    title: 'February 5, 2026: The Day That Changed the Conversation',
    quote: 'I describe what I want built, in plain English, walk away from my computer for four hours, and come back to find the work done. Done well. Done better than I would have done it myself.',
    attribution: 'Matt Shumer, tech CEO, on GPT-5.3 Codex and Opus 4.6',
    content: 'GPT-5.3 Codex was "instrumental in creating itself" - AI is now helping build the next generation of AI.',
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.timeline,
    atmosphereAlt: 'Technology timeline visualization',
  },

  {
    id: 'ai-categories',
    type: 'list',
    module: 5,
    title: 'The AI Toolbox: Six Categories',
    subtitle: 'Different types of AI solve different problems. Don\'t use a hammer to turn a screw.',
    items: [
      'Generative AI / LLMs - Your tireless analyst who reads everything and never sleeps',
      'Computer Vision - A quality inspector with perfect eyesight who never blinks',
      'Predictive Analytics / ML - A crystal ball powered by your own data',
      'Robotic Process Automation - A reliable intern who works 24/7 without typos',
      'AI Agents - A colleague who anticipates work and does it without being asked',
      'Specialized AI - Expert tools for expert problems (speech, translation, molecular design)',
    ],
    layout: 'icon-grid',
    animation: 'stagger-left',
    atmosphereImage: atmosphereImages.ai,
    atmosphereAlt: 'AI tools and technology',
  },

  {
    id: 'self-improvement-loop',
    type: 'content',
    module: 5,
    title: 'Why This Time Is Different',
    subtitle: 'AI is helping build better AI. Each generation makes the next come faster.',
    content: 'Moore\'s Law doubled computing power every 18-24 months and drove the entire computing revolution. AI capability is improving 3 to 5 times faster than that. Dario Amodei, CEO of Anthropic, predicts AI will be "substantially smarter than almost all humans at almost all tasks" by 2026-2027.',
  },

  {
    id: 'pace-stats',
    type: 'stat',
    module: 5,
    title: 'The Numbers Behind the Pace',
    stats: [
      { value: '7', suffix: 'T', label: 'Goldman Sachs: AI could raise global GDP by $7 trillion', prefix: '$' },
      { value: '90', suffix: '%', label: 'drop in cost of training leading AI models in 3 years' },
      { value: '97', suffix: 'M', label: 'new jobs AI creates (vs 85M displaced) - net positive, turbulent transition' },
    ],
    notes: 'Sources: Goldman Sachs, MIT Technology Review, World Economic Forum',
  },

  {
    id: 'deviation-80-95',
    type: 'story',
    module: 5,
    title: 'From 80% to 95% in Two Years',
    quote: 'In March 2023, GPT-4 produced a deviation investigation draft that was 80% of the way there. I did the same exercise with the February 2026 models. The output wasn\'t 80%. It was 95%. And it took context into account that David would\'ve had to look up separately.',
    attribution: 'Two years. That\'s how fast the gap closed.',
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.data,
    atmosphereAlt: 'Data analysis interface',
  },

  {
    id: 'what-it-means',
    type: 'list',
    module: 5,
    title: 'What This Means for Your Organization',
    items: [
      'The window for "wait and see" is closing - every quarter you delay, the competitive gap widens',
      'You don\'t need to be an engineer - you interact with AI in plain language, your domain expertise is MORE valuable now',
      'Your people are already using it - shadow AI is real, the question is whether they have governance and guardrails',
      'The transformation won\'t be optional - AI is a general-purpose technology like electricity or the internet',
    ],
    content: 'The companies that figured out the internet early didn\'t just do better. They dominated.',
    layout: 'comparison',
    animation: 'scale-in',
    atmosphereImage: atmosphereImages.strategy,
    atmosphereAlt: 'Strategic planning',
  },

  // ============================================================
  // MODULE 6: "Data Is the Fuel"
  // ============================================================
  {
    id: 'module-6',
    type: 'module-divider',
    module: 6,
    title: 'Data Is the Fuel',
    subtitle: '90 Minutes',
    content: 'Digitalization, IIoT, and Industry 4.0. None of the AI magic works if your data isn\'t ready.',
  },

  {
    id: 'forget-ai',
    type: 'story',
    module: 6,
    title: 'Forget AI for 90 Minutes',
    quote: 'AI is the engine. Data is the fuel. You can have the most powerful engine ever built, but if you put dirty fuel in it - or no fuel at all - you\'re not going anywhere. Right now, too many companies are buying Ferraris and filling them with swamp water.',
    attribution: 'The most common pattern: excited about AI, stalled six months later because the data is a mess.',
    layout: 'quote-full',
    animation: 'typewriter',
    atmosphereImage: atmosphereImages.sensors,
    atmosphereAlt: 'Technology sensors and data',
  },

  {
    id: 'data-reality-stats',
    type: 'stat',
    module: 6,
    title: 'The Data Reality',
    stats: [
      { value: '87', suffix: '%', label: 'of AI projects never make it to production' },
      { value: '12.9', suffix: 'M', label: 'average annual cost of poor data quality per organization', prefix: '$' },
      { value: '80', suffix: '%', label: 'of a data scientist\'s time spent cleaning data, not analyzing it' },
    ],
    notes: 'Sources: Gartner, IBM, VentureBeat',
  },

  {
    id: 'data-hierarchy',
    type: 'visualization',
    module: 6,
    title: 'The Data Hierarchy: You Can\'t Skip Steps',
    visualization: 'data-hierarchy',
    subtitle: 'Like Maslow\'s hierarchy: you can\'t self-actualize if you\'re starving. Build from the bottom up.',
  },

  {
    id: 'data-hierarchy-list',
    type: 'list',
    module: 6,
    title: 'Six Levels of Data Readiness',
    subtitle: 'Most companies try to jump straight to Level 6. They\'re building on sand.',
    items: [
      'Level 1 - Collection: Can you capture the data? Sensors on equipment, digital not clipboards?',
      'Level 2 - Storage: Is data accessible or trapped in local machines and individual spreadsheets?',
      'Level 3 - Quality: Is data accurate, consistent, complete? Calibrated sensors or noise?',
      'Level 4 - Integration: Can MES talk to ERP? Quality data connect with process data?',
      'Level 5 - Accessibility: Can people and AI systems get to data without a 3-week IT ticket?',
      'Level 6 - Intelligence: NOW you can do AI. Only if you\'ve built the pyramid beneath it.',
    ],
    layout: 'icon-grid',
    animation: 'stagger-left',
    atmosphereImage: atmosphereImages.data,
    atmosphereAlt: 'Data systems architecture',
  },

  {
    id: 'pump-failure-story',
    type: 'story',
    module: 6,
    title: 'Same Failure, Three Descriptions',
    quote: 'One technician wrote "pump failure." Another wrote "pmp fail." A third wrote "pump - see notes" with no notes attached. Same failure, three different descriptions. You can\'t train an AI model on that.',
    attribution: 'Before we could do any AI, we spent six months standardizing failure codes and cleaning historical data.',
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.factory,
    atmosphereAlt: 'Manufacturing equipment',
  },

  {
    id: 'industry-4-pillars',
    type: 'list',
    module: 6,
    title: 'Industry 4.0: The Foundation for AI',
    subtitle: 'Don\'t skip fundamentals in your rush to adopt AI. Industry 4.0 IS the road to AI.',
    items: [
      'IIoT Sensors and Connectivity - Without sensors, AI has nothing to learn from',
      'Manufacturing Execution Systems (MES) - The backbone of manufacturing data',
      'ERP Integration - The magic happens when ERP connects with MES, quality, and sensor data',
      'Cloud and Edge Computing - Cloud for scale, edge for real-time decisions at the machine',
      'Cybersecurity for OT - If you connect everything and secure nothing, you create vulnerability',
    ],
    layout: 'comparison',
    animation: 'scale-in',
    atmosphereImage: atmosphereImages.sensors,
    atmosphereAlt: 'Industrial IoT sensors',
  },

  {
    id: 'tale-of-two-plants',
    type: 'story',
    module: 6,
    title: 'A Tale of Two Plants',
    quote: 'Plant A spent three years on Industry 4.0 fundamentals. Deployed a predictive maintenance model in six weeks. Plant B skipped the fundamentals, went straight to hiring a data science team. Nine months in, models couldn\'t be deployed because the data infrastructure didn\'t exist.',
    attribution: 'Plant B ended up 12 months behind, not ahead. Industry 4.0 isn\'t a detour. It IS the road.',
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.factory,
    atmosphereAlt: 'Manufacturing plant floor',
  },

  {
    id: 'industry-4-stats',
    type: 'stat',
    module: 6,
    title: 'The Industry 4.0 Payoff',
    stats: [
      { value: '10-12', suffix: '%', label: 'increase in manufacturing output from smart factory implementations' },
      { value: '30-50', suffix: '%', label: 'reduction in machine downtime from Industry 4.0 technologies' },
      { value: '40', suffix: '%', label: 'faster ROI on AI for manufacturers who invest in IIoT first' },
    ],
    notes: 'Sources: Deloitte, McKinsey, Cisco',
  },

  {
    id: 'ot-it-convergence',
    type: 'content',
    module: 6,
    title: 'The OT/IT Convergence Challenge',
    subtitle: 'AI requires two separate worlds to work together. That\'s a people problem, not a technology problem.',
    content: 'OT cares about uptime, safety, and reliability. IT cares about data, connectivity, and security. The companies that solve it put one leader in charge of the bridge and create shared KPIs that align both teams around the same outcomes.',
  },

  {
    id: 'digital-twins',
    type: 'list',
    module: 6,
    title: 'Digital Twins and Edge Computing',
    subtitle: 'Your factory in a computer. Intelligence at the machine.',
    items: [
      'Digital twins let you test AI decisions before making them in the real world',
      'Start with one line, one process - don\'t try to twin your entire operation at once',
      'Edge computing processes data at the machine for millisecond decisions',
      'Cloud computing handles large-scale training and analysis',
      'Real-time defect detection: edge. Demand forecasting: cloud. You need both.',
    ],
    layout: 'split',
    animation: 'stagger-left',
    atmosphereImage: atmosphereImages.sensors,
    atmosphereAlt: 'Digital twin visualization',
  },

  {
    id: 'data-governance',
    type: 'list',
    module: 6,
    title: 'Data Governance: The Unglamorous Necessity',
    subtitle: 'Without it, everything falls apart. With it, AI has a foundation.',
    items: [
      'Data Ownership - Business owns the data, IT provides the infrastructure',
      'Data Standards - If three plants measure the same thing three different ways, your data is useless',
      'Master Data Management - One source of truth for products, suppliers, equipment',
      'Data Quality Monitoring - Measure data quality like you measure OEE and yield',
      'Access and Security - Who can see what? Regulatory implications in pharma, food, medical devices',
    ],
    layout: 'icon-grid',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.data,
    atmosphereAlt: 'Data governance framework',
  },

  {
    id: 'complaint-recategorization',
    type: 'story',
    module: 6,
    title: 'The Complaint That Wasn\'t',
    quote: 'The data showed a dramatic improvement in complaint rates. Leadership was thrilled. I was suspicious. Turns out, the plant hadn\'t improved quality. They\'d just changed how they categorized complaints. What used to be a "complaint" was now "customer feedback."',
    attribution: 'Without data governance, we almost made a strategic decision based on a data entry change.',
  },

  // ============================================================
  // MODULE 7: "What You Sell, Not Just How You Make It"
  // ============================================================
  {
    id: 'module-7',
    type: 'module-divider',
    module: 7,
    title: 'What You Sell, Not Just How You Make It',
    subtitle: '90 Minutes',
    content: 'The biggest AI opportunity isn\'t in how you make your product. It\'s in what your product actually IS.',
  },

  {
    id: 'operations-trap',
    type: 'story',
    module: 7,
    title: 'The Operations Trap',
    quote: 'When you think about AI, where does your mind go? Cost reduction? Efficiency? That\'s important, but incomplete. What if AI could fundamentally change what you sell? What value you deliver? This is the conversation most manufacturing companies aren\'t having. And it\'s the one their competitors ARE having.',
    attribution: 'The Operations Trap: thinking AI is only for making things better, not for making better things.',
    layout: 'quote-full',
    animation: 'typewriter',
    atmosphereImage: atmosphereImages.product,
    atmosphereAlt: 'Product innovation',
  },

  {
    id: 'three-levels-ai',
    type: 'list',
    module: 7,
    title: 'Three Levels of AI Value',
    subtitle: 'Most companies are at Level 1. The real disruption happens at Level 3.',
    items: [
      'Level 1 - AI for Efficiency: Do what you already do, faster and cheaper. Table stakes, not competitive advantage.',
      'Level 2 - AI for Experience: Enhance how customers interact with your product. Personalization, intelligent support.',
      'Level 3 - AI for Transformation: Fundamentally change what you sell. New revenue streams, market creation.',
    ],
    content: 'Only 16% of companies use AI for product innovation. 72% focus exclusively on process efficiency.',
    layout: 'comparison',
    animation: 'scale-in',
    atmosphereImage: atmosphereImages.product,
    atmosphereAlt: 'Product transformation',
  },

  {
    id: 'ai-inside-behind-around',
    type: 'framework',
    module: 7,
    title: 'AI Inside / AI Behind / AI Around',
    visualization: 'ai-framework',
    subtitle: 'Behind: operations efficiency. Inside: the product has AI. Around: customer experience. The power play: all three together.',
  },

  {
    id: 'netflix-story',
    type: 'story',
    module: 7,
    title: 'From DVD Logistics to $250 Billion',
    quote: 'Netflix could\'ve invested all their AI efforts in optimizing DVD distribution. Instead, they used AI to change what they sell. Recommendation algorithms, personalized content, original shows greenlit by data. The DVD optimization would\'ve saved millions. The product transformation made them worth $250 billion.',
    attribution: 'That\'s the difference between "AI Behind" and "AI Inside."',
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.product,
    atmosphereAlt: 'Digital transformation',
  },

  {
    id: 'ai-native-products',
    type: 'list',
    module: 7,
    title: 'AI-Native Products: What Couldn\'t Exist Before',
    items: [
      'Consumer Goods: Personalized formulations for each customer based on AI skin analysis and climate data',
      'Industrial: Equipment that monitors itself, predicts its own failures, and orders its own parts',
      'Pharma: Drug discovery compressed from 10-15 years to 18 months with AI compound screening',
      'Agriculture: John Deere\'s See & Spray uses computer vision to reduce herbicide use by 77%',
      'Finance: Insurance premiums based on YOUR actual risk, not broad demographic categories',
    ],
    layout: 'icon-grid',
    animation: 'stagger-left',
    atmosphereImage: atmosphereImages.ai,
    atmosphereAlt: 'AI-native product innovation',
  },

  {
    id: 'new-business-models',
    type: 'list',
    module: 7,
    title: 'New Business Models Enabled by AI',
    items: [
      'Outcome-Based Pricing - Sell hours of uptime, not a machine. Sell clean air, not a filter.',
      'Product-as-a-Service - AI-monitored products you maintain for the customer. Capital expense becomes operating expense.',
      'Data-as-a-Service - Your manufacturing generates enormous data. Anonymized benchmarking could be valuable to others.',
      'AI-as-a-Service - Once you\'ve built AI for yourself, offer it to customers and partners.',
    ],
    content: 'Rolls-Royce doesn\'t just sell jet engines. They sell "TotalCare" - a service where the engine monitors itself. AI turned a product company into a service company.',
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.strategy,
    atmosphereAlt: 'Business model innovation',
  },

  {
    id: 'smart-pump-story',
    type: 'story',
    module: 7,
    title: 'The Smart Pump',
    quote: 'A mid-size pump manufacturer in a commoditized market with razor-thin margins. We asked: what if the pump was smart? Sensors and AI that predict failure 30 days out, optimize energy in real time, and auto-order replacement parts. Their VP of Sales almost fell out of his chair.',
    attribution: '"You mean I could sell a pump subscription? Guaranteed uptime, we handle everything?" Their competitors are still selling dumb pumps.',
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.factory,
    atmosphereAlt: 'Industrial equipment',
  },

  {
    id: 'competitive-moat',
    type: 'list',
    module: 7,
    title: 'The Competitive Moat',
    subtitle: 'Operational AI reaches parity quickly. The real moat is harder to replicate.',
    items: [
      'Proprietary Data - Same AI tools are available to everyone. Your 20 years of process data isn\'t.',
      'AI-Embedded Products - Switching costs go up when AI learns and improves for each customer over time.',
      'Organizational Capability - Being good at deploying AI is the most underappreciated moat.',
    ],
    content: 'By 2027, 25% of current S&P 500 companies will be displaced by AI-native competitors. - Gartner',
    layout: 'comparison',
    animation: 'scale-in',
    atmosphereImage: atmosphereImages.strategy,
    atmosphereAlt: 'Competitive strategy',
  },

  {
    id: 'kodak-warning',
    type: 'story',
    module: 7,
    title: 'Don\'t Be Kodak',
    quote: 'Kodak invented the digital camera in 1975. They had a 20-year head start. But they were so focused on optimizing film manufacturing that they missed the transformation in what customers actually wanted.',
    attribution: 'The AI equivalent is happening right now. Companies optimizing current products while competitors reimagine what the product IS.',
  },

  {
    id: 'portfolio-scan-stats',
    type: 'stat',
    module: 7,
    title: 'The Product AI Opportunity',
    stats: [
      { value: '13', suffix: 'T', label: 'McKinsey: AI could create $13 trillion in new economic activity by 2030', prefix: '$' },
      { value: '2', suffix: 'x', label: 'BCG: revenue impact from AI-enhanced products vs operations-only AI' },
      { value: '25', suffix: '%', label: 'higher customer retention for companies that embed AI in products' },
    ],
    notes: 'Sources: McKinsey, BCG, PwC',
  },

  // ============================================================
  // MODULE 8: "The Game Changers"
  // ============================================================
  {
    id: 'module-8',
    type: 'module-divider',
    module: 8,
    title: 'The Game Changers',
    subtitle: '60 Minutes',
    content: 'Companies and tools you need to know. A map of the AI landscape for manufacturing leaders.',
  },

  {
    id: 'picks-and-shovels',
    type: 'story',
    module: 8,
    title: 'Picks and Shovels',
    quote: 'During the California gold rush, the people who made the most consistent money weren\'t the miners. They were the people selling picks, shovels, and jeans. You don\'t need to build your own AI models. You need to know who\'s selling the best tools and how to evaluate them.',
    attribution: 'Think of this module as your guide to the general store.',
    layout: 'quote-full',
    animation: 'typewriter',
    atmosphereImage: atmosphereImages.tools,
    atmosphereAlt: 'Technology tools landscape',
  },

  {
    id: 'foundation-models',
    type: 'list',
    module: 8,
    title: 'Foundation Model Companies: Who\'s Building the Brains',
    items: [
      'OpenAI (GPT-5.3, ChatGPT Enterprise) - Started the revolution. Fastest-moving, broadest adoption.',
      'Anthropic (Claude, Opus 4.6) - Safety-first, best for complex analysis. Strongest enterprise compliance positioning.',
      'Google DeepMind (Gemini) - Integrated across Google Workspace. Easiest on-ramp if you\'re in the Google ecosystem.',
      'Meta (Llama) - Open-source, free to customize. Run AI on your own infrastructure with full data sovereignty.',
      'xAI (Grok) - Real-time internet access. Useful for market intelligence and competitive monitoring.',
    ],
    layout: 'icon-grid',
    animation: 'stagger-left',
    atmosphereImage: atmosphereImages.ai,
    atmosphereAlt: 'AI foundation models',
  },

  {
    id: 'foundation-stats',
    type: 'stat',
    module: 8,
    title: 'The Foundation Model Landscape',
    stats: [
      { value: '200', suffix: 'M+', label: 'ChatGPT weekly active users' },
      { value: '350', suffix: 'M+', label: 'Llama model downloads - most popular open-source AI' },
      { value: '3', suffix: 'B+', label: 'Google Workspace users with Gemini integration' },
    ],
    notes: 'Sources: OpenAI, Meta, Google (as of early 2026)',
  },

  {
    id: 'data-trust-story',
    type: 'story',
    module: 8,
    title: 'The Trust Question',
    quote: 'When choosing our first AI platform, the conversation with Legal was the deciding factor. Where does our data go? Who can see it? Can it train someone else\'s model? The provider who could give clear, contractual answers won the business.',
    attribution: 'It wasn\'t about who had the "best" AI. It was about who we could trust with our data.',
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.strategy,
    atmosphereAlt: 'Enterprise trust and compliance',
  },

  {
    id: 'infrastructure-players',
    type: 'list',
    module: 8,
    title: 'Infrastructure Players: Who\'s Building the Plumbing',
    subtitle: 'Your choice of platform significantly influences your AI options.',
    items: [
      'NVIDIA - The chips that power all AI. The ultimate "picks and shovels" play.',
      'Microsoft (Azure + Copilot) - Deepest enterprise integration. AI inside Word, Excel, Teams, Outlook.',
      'AWS (Bedrock + SageMaker) - Largest cloud provider. Mix and match AI models without vendor lock-in.',
      'Google Cloud (Vertex AI) - Strong if you\'re already in the Google ecosystem.',
    ],
    content: 'If you\'re on Microsoft, Copilot is your on-ramp. If you\'re on Google, Gemini. If you want flexibility, AWS Bedrock.',
    layout: 'split',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.tools,
    atmosphereAlt: 'Cloud infrastructure',
  },

  {
    id: 'manufacturing-ai-vendors',
    type: 'list',
    module: 8,
    title: 'Manufacturing-Specific AI',
    subtitle: 'Companies that speak your language and build for your shop floor.',
    items: [
      'Siemens - Digital twins, MindSphere IoT. The 800-pound gorilla of industrial AI.',
      'Rockwell Automation - AI/ML in their automation platform. North American counterpart to Siemens.',
      'Sight Machine - Manufacturing data platform. Solves the "data in 15 different systems" problem.',
      'Augury - Machine health monitoring. Predicts failures days or weeks before they happen.',
      'Cognex - AI-powered visual inspection. Defect detection rates 20-40% higher than rule-based systems.',
    ],
    layout: 'icon-grid',
    animation: 'stagger-left',
    atmosphereImage: atmosphereImages.factory,
    atmosphereAlt: 'Manufacturing technology',
  },

  {
    id: 'boring-vendor-story',
    type: 'story',
    module: 8,
    title: 'Pick Boring Over Flashy',
    quote: 'The flashiest demo came from a startup with beautiful dashboards. The most boring demo simply showed: "Here\'s the sensor. Here\'s the alert. Here\'s the work order it generated. Here\'s the cost avoidance." We went with the boring one. Plant maintenance trusts it.',
    attribution: 'They don\'t trust the dashboards. They trust the alert that says "bearing on Motor 7 will fail in 14 days."',
  },

  {
    id: 'tools-to-try',
    type: 'list',
    module: 8,
    title: 'Tools Every Leader Should Try',
    subtitle: 'Not for your company. For YOU. The best way to understand AI is to use it.',
    items: [
      'ChatGPT Plus / Claude Pro / Gemini Advanced - Pick one, use it every day for a month. $20/month.',
      'Microsoft Copilot - AI in Word, Excel, PowerPoint, Outlook. Near-zero adoption barrier.',
      'Gamma - AI presentation builder. 80% of a slide deck in 5 minutes instead of 2 hours.',
      'Perplexity - Google that reads everything, synthesizes it, and cites its sources.',
    ],
    content: 'If your people are paying for AI tools out of their own pocket, your organization is behind.',
    layout: 'comparison',
    animation: 'scale-in',
    atmosphereImage: atmosphereImages.tools,
    atmosphereAlt: 'AI productivity tools',
  },

  {
    id: 'vendor-red-flags',
    type: 'list',
    module: 8,
    title: 'Evaluating AI Vendors: Red Flags',
    items: [
      'They can\'t explain how their AI works in plain English',
      'They won\'t let you pilot with YOUR data before committing',
      'They guarantee specific accuracy numbers before seeing your data',
      'They need 6+ months of integration before you see any value',
      'Their case studies are all from different industries than yours',
      'They refuse to discuss data privacy and model training',
    ],
    content: 'A vendor promised their AI would reduce deviations by 40%. I asked what data of ours they\'d seen. None. That vendor shut down six months later.',
    layout: 'icon-grid',
    animation: 'fade-up',
    atmosphereImage: atmosphereImages.strategy,
    atmosphereAlt: 'Vendor evaluation',
  },

  {
    id: 'manufacturing-ai-stats',
    type: 'stat',
    module: 8,
    title: 'The Manufacturing AI Market',
    stats: [
      { value: '20.8', suffix: 'B', label: 'manufacturing AI market by 2028 (from $3.8B in 2024)', prefix: '$' },
      { value: '10', suffix: 'x', label: 'average ROI from predictive maintenance AI within 2 years' },
      { value: '100', suffix: '%+', label: 'year-over-year growth in foundation model API spending' },
    ],
    notes: 'Sources: Markets and Markets, LNS Research',
  },

  // ============================================================
  // APPENDIX: The Iron Man Suit
  // ============================================================
  {
    id: 'module-ironman',
    type: 'module-divider',
    module: 9,
    title: 'The Iron Man Suit',
    subtitle: 'Bonus Appendix',
    content: 'AI tools for every supply chain role. Your people don\'t get replaced. They get amplified.',
  },

  {
    id: 'ironman-analogy',
    type: 'story',
    module: 9,
    title: 'The Iron Man Analogy',
    quote: 'Tony Stark is already brilliant. The suit doesn\'t replace him. It amplifies him. It lets him fly, lift impossible weight, see through walls. Take the suit off and he\'s still Tony Stark. But with the suit on? He\'s something else entirely. That\'s what AI does for your workforce.',
    attribution: 'Andrej Karpathy, founding member of OpenAI - "Software Is Changing (Again)"',
    layout: 'quote-full',
    animation: 'typewriter',
    atmosphereImage: atmosphereImages.ironman,
    atmosphereAlt: 'AI amplification concept',
  },

  {
    id: 'ironman-demand-planner',
    type: 'content',
    module: 9,
    title: 'Demand Planner',
    subtitle: 'From 60% data wrangling to 70% analysis and strategy',
    content: 'Pre-AI: 60% of time cleaning data, reconciling numbers, chasing inputs. Post-AI: Copilot for Excel automates pivots and anomaly detection. Perplexity delivers market intelligence in 30 seconds. Claude drafts forecast narratives for S&OP. The human handles the judgment calls.',
  },

  {
    id: 'ironman-quality-engineer',
    type: 'content',
    module: 9,
    title: 'Quality Engineer',
    subtitle: 'From 70% documentation to 70% root cause and prevention',
    content: 'Pre-AI: A single deviation investigation takes 3-4 hours of drafting. Post-AI: Claude drafts investigations from structured data. Cognex AI Vision catches defects the human eye misses. Augury prevents deviations at the source. The 3.5 hours saved go to actual root cause analysis.',
  },

  {
    id: 'ironman-plant-manager',
    type: 'content',
    module: 9,
    title: 'Plant Manager',
    subtitle: 'From 60% firefighting to 70% proactive management',
    content: 'Pre-AI: Morning firefighting, reviewing KPIs, managing shift handovers. Post-AI: Copilot summarizes overnight reports before the 7AM meeting. Siemens digital twins simulate schedule changes. Augury predicts which machines fail next week. 20 years of experience, amplified by data.',
  },

  {
    id: 'ironman-procurement',
    type: 'content',
    module: 9,
    title: 'Procurement Manager',
    subtitle: 'From 80% transactional to 60% strategic',
    content: 'Pre-AI: Chasing quotes, comparing bids, reviewing contracts. Post-AI: Claude summarizes 30-page contracts and flags non-standard terms in minutes. Perplexity delivers real-time commodity intelligence. Copilot for Excel runs spend analysis that used to take a week in an afternoon.',
  },

  {
    id: 'ironman-supply-chain',
    type: 'content',
    module: 9,
    title: 'Supply Chain Analyst',
    subtitle: 'From "builds the deck" to "drives the insight"',
    content: 'Pre-AI: Pulling data from 5 systems, reconciling, building dashboards. Post-AI: Copilot for Excel handles natural language data queries. ChatGPT generates scenario narratives. Power BI Copilot surfaces drivers without manual drill-down. Monday to Wednesday building slides becomes analyzing scenarios.',
  },

  {
    id: 'ironman-maintenance',
    type: 'content',
    module: 9,
    title: 'Maintenance Engineer',
    subtitle: 'From 70% reactive to 80% predictive and preventive',
    content: 'Pre-AI: Fixing what broke, following the PM schedule, hoping for time to do reliability projects. Post-AI: Augury is their Jarvis - "Bearing wear on Motor B, 2-3 weeks to failure." Rockwell AI predicts PLC issues before line stoppages. The human still makes the call, but with data instead of instinct.',
  },

  {
    id: 'ironman-regulatory',
    type: 'content',
    module: 9,
    title: 'Regulatory Affairs Specialist',
    subtitle: 'From 70% reading and summarizing to 70% strategic interpretation',
    content: 'Pre-AI: Monitoring regulatory changes, interpreting guidance, writing submissions. Post-AI: Claude analyzes a 200-page FDA guidance and delivers structured summaries with page references in minutes. Perplexity monitors new guidance in real time. The suit reads the 200 pages. The human decides what it means.',
  },

  {
    id: 'ironman-summary',
    type: 'list',
    module: 9,
    title: 'The Pattern: Every Role Shifts the Same Way',
    subtitle: 'Nobody gets replaced. Everybody gets amplified.',
    items: [
      'Less time on data gathering, documentation, and administration',
      'More time on judgment, relationships, strategy, and human skills',
      'The suit handles the grunt work. The human handles the decisions.',
      'Tony Stark doesn\'t become less important with the suit on - he becomes the person he was always capable of being',
    ],
    content: 'The tools exist today, are commercially available, and are being deployed right now. The question isn\'t whether your team needs the suit. It\'s how fast you can get it to them.',
    layout: 'icon-grid',
    animation: 'stagger-left',
    atmosphereImage: atmosphereImages.ironman,
    atmosphereAlt: 'AI-amplified workforce',
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
    content: 'One tool to try. One conversation to start. One use case to champion.',
    items: [
      'You have a maturity assessment and strategy framework',
      'You have an implementation playbook and governance toolkit',
      'You understand the pace of change and the data foundation required',
      'You know how AI transforms products, not just operations',
      'You have a map of the tools and companies reshaping your industry',
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
  { number: 5, title: 'Let\'s Take a Deep Breath', color: '#ef4444', duration: '90 min' },
  { number: 6, title: 'Data Is the Fuel', color: '#06b6d4', duration: '90 min' },
  { number: 7, title: 'What You Sell, Not Just How You Make It', color: '#f97316', duration: '90 min' },
  { number: 8, title: 'The Game Changers', color: '#8b5cf6', duration: '60 min' },
  { number: 9, title: 'The Iron Man Suit', color: '#eab308', duration: 'Bonus' },
];

export const moduleThemes: Record<number, { gradient: string; glowA: string; glowB: string }> = {
  1: {
    gradient: 'linear-gradient(145deg, #08080d 0%, rgba(245, 158, 11, 0.18) 45%, rgba(249, 115, 22, 0.22) 100%)',
    glowA: '#f59e0b',
    glowB: '#fb923c',
  },
  2: {
    gradient: 'linear-gradient(145deg, #08080d 0%, rgba(0, 212, 170, 0.20) 40%, rgba(6, 182, 212, 0.16) 100%)',
    glowA: '#00d4aa',
    glowB: '#22d3ee',
  },
  3: {
    gradient: 'linear-gradient(145deg, #08080d 0%, rgba(79, 109, 245, 0.22) 45%, rgba(99, 102, 241, 0.16) 100%)',
    glowA: '#4f6df5',
    glowB: '#6366f1',
  },
  4: {
    gradient: 'linear-gradient(145deg, #08080d 0%, rgba(217, 70, 239, 0.20) 44%, rgba(236, 72, 153, 0.16) 100%)',
    glowA: '#d946ef',
    glowB: '#ec4899',
  },
  5: {
    gradient: 'linear-gradient(145deg, #08080d 0%, rgba(239, 68, 68, 0.20) 45%, rgba(220, 38, 38, 0.16) 100%)',
    glowA: '#ef4444',
    glowB: '#dc2626',
  },
  6: {
    gradient: 'linear-gradient(145deg, #08080d 0%, rgba(6, 182, 212, 0.20) 42%, rgba(14, 165, 233, 0.16) 100%)',
    glowA: '#06b6d4',
    glowB: '#0ea5e9',
  },
  7: {
    gradient: 'linear-gradient(145deg, #08080d 0%, rgba(249, 115, 22, 0.20) 44%, rgba(234, 88, 12, 0.16) 100%)',
    glowA: '#f97316',
    glowB: '#ea580c',
  },
  8: {
    gradient: 'linear-gradient(145deg, #08080d 0%, rgba(139, 92, 246, 0.20) 45%, rgba(124, 58, 237, 0.16) 100%)',
    glowA: '#8b5cf6',
    glowB: '#7c3aed',
  },
  9: {
    gradient: 'linear-gradient(145deg, #08080d 0%, rgba(234, 179, 8, 0.20) 43%, rgba(202, 138, 4, 0.16) 100%)',
    glowA: '#eab308',
    glowB: '#ca8a04',
  },
};
