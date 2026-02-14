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
}

export const slides: Slide[] = [
  {
    id: 'title',
    type: 'title',
    title: 'Practical AI for Manufacturing and Supply Chain Leaders',
    subtitle: 'ACKU-AI Masterclass',
    content: 'Apple keynote clarity, consulting rigor, and practical execution playbooks for regulated operations.',
  },
  {
    id: 'facilitator-intro',
    type: 'content',
    title: 'Facilitator Positioning: Practitioner, not theorist',
    subtitle: 'Built inside global regulated manufacturing operations',
    content:
      'This session is not software theater. It is an execution system built with operators, quality teams, legal partners, and business leaders.',
  },

  {
    id: 'module-1',
    type: 'module-divider',
    module: 1,
    title: 'WHERE ARE YOU NOW?',
    subtitle: 'Module 1',
    content: 'Honest maturity assessment before strategy.',
  },
  {
    id: 'ai-theater-problem',
    type: 'stat',
    module: 1,
    title: 'The AI Theater Problem',
    stats: [
      { value: '70', suffix: '%', label: 'MIT Sloan: minimal or no business impact from AI' },
      { value: '87', suffix: '%', label: 'VentureBeat: projects that never reach production' },
      { value: '1', prefix: '#', label: 'HBR failure reason: poor process alignment' },
    ],
    notes: 'Sources: MIT Sloan, VentureBeat, Harvard Business Review',
  },
  {
    id: 'maturity-model',
    type: 'visualization',
    module: 1,
    title: 'AI Maturity Model',
    visualization: 'maturity-model',
    subtitle: 'Unaware > Experimenting > Implementing > Scaling > Transforming',
  },
  {
    id: 'ai-theater-signs',
    type: 'list',
    module: 1,
    title: 'Signs of AI Theater',
    items: [
      'Center of Excellence outputs decks, not deployed tools',
      'Board demos impress, operators never use the workflow',
      'Data teams spend most time cleaning data, not shipping value',
      'Strategy documents age faster than implementation decisions',
      'Leaders can name initiatives, not active weekly users',
    ],
  },
  {
    id: 'predictive-maintenance-story',
    type: 'story',
    module: 1,
    title: 'Predictive Maintenance Anecdote',
    quote:
      'A model predicted failures 48 hours ahead. The plant scheduled maintenance weekly. The model was accurate, but the workflow fit was wrong.',
    attribution: 'Great model, zero adoption',
  },
  {
    id: 'self-assessment',
    type: 'interaction',
    module: 1,
    title: 'Self Assessment Framework',
    interaction: 'Score your organization honestly, then compare at your table.',
    items: [
      'Data: access, quality, trust, and integration speed',
      'Talent: readiness, confidence, and champion density',
      'Governance: policy, accountability, and controls',
      'Leadership: funding, alignment, and sponsorship',
    ],
    content: 'Use a 1 to 5 score in each category, then identify your lowest confidence area.',
  },
  {
    id: 'quick-wins-matrix',
    type: 'matrix',
    module: 1,
    title: 'Quick Wins vs Strategic Bets',
    visualization: 'impact-matrix',
    subtitle: 'Low effort plus high impact first, then scale ambition.',
  },
  {
    id: 'quick-wins-list',
    type: 'list',
    module: 1,
    title: 'Quick Wins Examples',
    items: [
      'Document summarization and secure search',
      'Meeting note automation and action capture',
      'Standard report generation and drafting',
      'Quality trend analysis and anomaly flags',
      'Communication templates for recurring responses',
    ],
  },
  {
    id: 'strategic-bets-list',
    type: 'list',
    module: 1,
    title: 'Strategic Bets Examples',
    items: [
      'Predictive quality for defect prevention',
      'Demand forecasting with planner in the loop',
      'Regulatory documentation co-pilot workflows',
      'Supply chain risk prediction and scenario planning',
      'Digital twins for production optimization',
    ],
  },
  {
    id: 'module-1-close',
    type: 'story',
    module: 1,
    title: 'Module 1 Closing',
    quote:
      'Honest maturity assessment is not a weakness. It is the fastest route to credible strategy and measurable outcomes.',
    attribution: 'Transition: strategy that executes in the real world',
  },

  {
    id: 'module-2',
    type: 'module-divider',
    module: 2,
    title: 'BUILDING YOUR STRATEGY',
    subtitle: 'Module 2',
    content: 'Prioritize, govern, and fund with execution discipline.',
  },
  {
    id: 'strategy-failure-reasons',
    type: 'list',
    module: 2,
    title: 'Why Strategies Fail',
    items: [
      'Too Ambitious: trying to transform all sites in one motion',
      'No Governance: compliance, risk, and ownership defined too late',
      'Wrong Talent Model: over-hiring specialists, under-enabling domain experts',
    ],
    content: 'Three causes, one outcome: strategy stalls before deployment.',
  },
  {
    id: 'acku-framework',
    type: 'framework',
    module: 2,
    title: 'ACKU Framework',
    visualization: 'acku-pipeline',
    subtitle: 'Learn > Plan > Build > Scale',
  },
  {
    id: 'learn-phase',
    type: 'list',
    module: 2,
    title: 'Learn Phase Detail',
    subtitle: 'Weeks 1 to 4',
    items: [
      'Assess maturity and data reality with facts',
      'Interview stakeholders on painful workflows',
      'Identify champions and baseline adoption metrics',
      'Define current-state constraints without optimism bias',
    ],
  },
  {
    id: 'plan-phase',
    type: 'list',
    module: 2,
    title: 'Plan Phase Detail',
    subtitle: 'Weeks 5 to 8',
    items: [
      'Prioritize use cases with impact and feasibility scoring',
      'Set governance guardrails and decision rights',
      'Define business metrics and funding envelope',
      'Build a realistic 90 day roadmap with owners',
    ],
  },
  {
    id: 'build-phase',
    type: 'list',
    module: 2,
    title: 'Build Phase Detail',
    subtitle: 'Months 3 to 6',
    items: [
      'Ship one focused use case for a 20 to 50 user pilot',
      'Run weekly feedback and workflow fit loops',
      'Track adoption alongside quality and cycle time',
      'Document decisions and risk findings as you go',
    ],
  },
  {
    id: 'scale-phase',
    type: 'list',
    module: 2,
    title: 'Scale Phase Detail',
    subtitle: 'Months 6 to 18',
    items: [
      'Expand only from proven wins and demand pull',
      'Institutionalize training and support channels',
      'Operationalize governance reviews by risk tier',
      'Add use cases as capacity and trust increase',
    ],
  },
  {
    id: 'impact-feasibility-scoring',
    type: 'interaction',
    module: 2,
    title: 'Impact vs Feasibility Scoring System',
    interaction: 'Score one real use case now, impact 1 to 5 and feasibility 1 to 5.',
    items: [
      'Impact criteria: hours, users affected, error exposure, financial value',
      'Feasibility criteria: data readiness, tooling complexity, compliance burden',
      'Shortlist threshold: score above 15',
      'Starting threshold: score above 20',
    ],
    content: 'Final score = Impact x Feasibility',
  },
  {
    id: 'business-case-template',
    type: 'list',
    module: 2,
    title: 'One Page Business Case Template',
    items: [
      'Problem statement in plain language',
      'Proposed solution and target users',
      'Investment required: technology, people, implementation',
      'Expected return: savings, quality lift, payback period',
      'Risk and mitigation plan with exit criteria',
      'Governance ownership and approval path',
    ],
  },
  {
    id: 'stakeholder-mapping',
    type: 'list',
    module: 2,
    title: 'Stakeholder Mapping: Core Team',
    items: [
      'Business sponsor with P and L authority',
      'IT and data lead for architecture and delivery',
      'Legal and compliance from day one',
      'HR and talent lead for workforce capability',
      'Finance lead for ROI and investment control',
      'Operations champion from frontline workflows',
    ],
  },

  {
    id: 'module-3',
    type: 'module-divider',
    module: 3,
    title: 'IMPLEMENTATION THAT STICKS',
    subtitle: 'Module 3',
    content: 'Design for scale from day one, or pilots decay.',
  },
  {
    id: 'pilot-trap',
    type: 'stat',
    module: 3,
    title: 'The Pilot Trap',
    stats: [{ value: '80', suffix: '%', label: 'of AI pilots never scale to production' }],
    content: 'Three failure modes: success theater, scale blindness, champion dependency.',
    notes: 'Design for 1,000 users while testing with 20.',
  },
  {
    id: 'change-management-80',
    type: 'stat',
    module: 3,
    title: 'Change Management is 80%',
    stats: [{ value: '80', suffix: '%', label: 'of delivery effort should support adoption and trust' }],
    content: 'Technology integration is necessary, behavior change is decisive.',
  },
  {
    id: 'three-fears',
    type: 'list',
    module: 3,
    title: 'The Three Fears',
    items: [
      'Replacement: people fear AI is a headcount program',
      'Incompetence: experts fear becoming beginners again',
      'Accountability: teams need clear ownership on errors',
    ],
  },
  {
    id: 'adoption-curve',
    type: 'visualization',
    module: 3,
    title: 'Adoption Curve',
    visualization: 'adoption-curve',
    subtitle: '10 to 15% champions, 60 to 70% majority, 15 to 20% resistors, 5% never',
  },
  {
    id: 'practical-tactics',
    type: 'interaction',
    module: 3,
    title: 'Practical Change Tactics',
    interaction: 'Choose one tactic your team can apply this week.',
    items: [
      'Visible executive sponsorship with recurring cadence',
      'Peer champion model by function',
      'Short practical training plus office hours',
      'Immediate quick win in week one',
      'Feedback loops with visible fixes',
    ],
  },
  {
    id: 'capability-model',
    type: 'visualization',
    module: 3,
    title: 'Capability Model',
    visualization: 'capability-tiers',
    subtitle: 'Users 80%, Power Users 15%, Builders 5%',
  },
  {
    id: 'measuring-matters',
    type: 'list',
    module: 3,
    title: 'Measuring What Matters',
    items: [
      'Adoption: active users, usage depth, voluntary pull',
      'Efficiency: hours saved, cycle time, rework reduction',
      'Business impact: cost, quality, and working capital outcomes',
      'Trust: satisfaction, override rate, escalation frequency',
    ],
  },
  {
    id: 'case-study-timeline',
    type: 'case-study',
    module: 3,
    title: 'Case Study Timeline: 0 to 18 Months',
    visualization: 'timeline',
    subtitle: 'From baseline to 1,000+ engaged users',
  },
  {
    id: 'key-lessons',
    type: 'list',
    module: 3,
    title: 'Key Lessons',
    items: [
      'Start with practical workflows, not flashy demos',
      'Bring governance and legal partners in early',
      'Scale through champions, not mandates',
      'Track adoption and business outcomes together',
      'Fund change support as a first-class workstream',
    ],
  },

  {
    id: 'module-4',
    type: 'module-divider',
    module: 4,
    title: 'GOVERNANCE FIRST',
    subtitle: 'Module 4',
    content: 'Trust by design, before scale by default.',
  },
  {
    id: 'governance-before-scale',
    type: 'stat',
    module: 4,
    title: 'Why Governance Before Scale',
    stats: [
      { value: '74', suffix: '%', label: 'IBM: organizations lacking adequate AI trust controls' },
      { value: '61', suffix: '%', label: 'KPMG: executives concerned about AI related risk' },
    ],
    notes: 'Governance first accelerates safe scale.',
  },
  {
    id: 'risk-framework',
    type: 'visualization',
    module: 4,
    title: 'Risk Framework',
    visualization: 'risk-framework',
    subtitle: 'Data Privacy, Accuracy, Bias, Regulatory, Organizational',
  },
  {
    id: 'risk-tiers',
    type: 'visualization',
    module: 4,
    title: 'Risk Tiers',
    visualization: 'risk-tiers',
    subtitle: 'Low, Medium, High with clear approval requirements',
  },
  {
    id: 'policy-templates',
    type: 'interaction',
    module: 4,
    title: 'Policy Templates',
    interaction: 'Draft your first three policy bullets now.',
    items: [
      'AI Acceptable Use Policy',
      'AI Governance Charter',
      'Use Case Approval Template',
      'AI Incident Response Plan',
    ],
  },
  {
    id: 'trust-equation',
    type: 'visualization',
    module: 4,
    title: 'Trust Equation',
    visualization: 'trust-equation',
    subtitle: 'Trust = (Transparency + Consistency + Competence) / Self Interest',
  },
  {
    id: 'monday-commitment',
    type: 'interaction',
    module: 4,
    title: 'Monday Morning Commitment',
    interaction: 'When I return to the office, my first action will be:',
    items: [
      'One use case selected',
      'One owner assigned',
      'One governance checkpoint scheduled',
    ],
    content: 'Execution starts with one committed action.',
  },
  {
    id: 'contact-cta',
    type: 'title',
    title: 'ACKU-AI Consulting',
    subtitle: 'Practical AI Strategy for Regulated Industries',
    content: 'acku.ai | Strategy Sprint | Governance Design | Capability Build',
  },
];

export const modules = [
  { number: 1, title: 'Where Are You Now?', color: '#00d4aa', duration: '90 min' },
  { number: 2, title: 'Building Your Strategy', color: '#3b82f6', duration: '90 min' },
  { number: 3, title: 'Implementation That Sticks', color: '#06b6d4', duration: '90 min' },
  { number: 4, title: 'Governance First', color: '#22c55e', duration: '60 min' },
];
