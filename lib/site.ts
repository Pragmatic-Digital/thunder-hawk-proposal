export const site = {
  agency: "Pragmatic Digital",
  client: "ThunderHawk",
  proposalLabel: "Website audit and new website direction",
  prepared: "September 2026",
  email: "hello@pragmaticdigital.co.uk",
  phone: "0113 534 9949",
  address: "Mabgate Business Centre, 93–99 Mabgate, Leeds LS9 7DR",
  heroHeading: "Website audit and new website direction",
  heroBackgroundText: "ThunderHawk",
  recommendation:
    "We've reviewed the current ThunderHawk website and explored how a new site could better showcase your work and start more conversations with clients and agency partners.",
  overviewParagraphs: [
    "Following our conversation with Matt, this document sets out what we found and the ideas we'd like to explore together. The review gives us a starting point for the new build, highlighting what to carry forward and where the experience could improve.",
    "We've also included some creative ideas showing how your motion and 3D expertise could combine with our development experience.","These are initial recommendations for discussion. Once we've agreed the direction and priorities, we can turn them into a defined scope and quote.",
  ],
  tradeoff:
    "This review is designed to align on direction and identify priorities before we commit to detailed estimates or formal proposals.",
} as const;

export const optionsAtAGlance = {
  heading: "Key areas from our review",
  footnote:
    "These themes have emerged from our audit and initial discussions. We’ll explore each area in more detail through the sections below.",
  items: [
    {
      slug: "customer-experience",
      title: "Customer Experience",
      recommended: true,
      price: "",
      body: "Our findings on how customers interact with your platform, key friction points and opportunities for improvement.",
    },
    {
      slug: "technical-foundation",
      title: "Technical Foundation",
      recommended: false,
      price: "",
      body: "Analysis of your current platform architecture, hosting, integrations and the technical roadmap we’d recommend.",
    },
    {
      slug: "operational-impact",
      title: "Operational Impact",
      recommended: false,
      price: "",
      body: "How platform improvements can reduce friction in your team’s day-to-day operations and support future growth.",
    },
  ],
} as const;

export type ComparisonQualities = {
  architecture: string;
  search: string;
  flexibility: string;
  nativeB2B: string;
  bespokeWorkflow: string;
  ongoingDependency: string;
};

/**
 * Qualitative comparison copy keyed by quote slug (the Markdown filename
 * without the extension). Add an entry here when introducing a new quote.
 */
export const comparisonBySlug: Record<string, ComparisonQualities> = {
  vendure: {
    architecture:
      "Vendure Core as the commerce/application layer with a React/Next.js storefront, designed around ThunderHawk’s catalogue, accounts and Orderwise model.",
    search:
      "Algolia, including AI and synonym search, with autocomplete, fuzzy matching and faceted filtering across SKU, product name and attributes.",
    flexibility:
      "High. Organisations, branches, commercial rules and housebuilder/contractor/development relationships can be modelled around how ThunderHawk already trades.",
    nativeB2B:
      "B2B is built into the data model: organisations, multiple users, roles, customer-specific catalogues, pricing and permissions.",
    bespokeWorkflow:
      "Checkout, delivery rules, advanced order management and merchant/key-account portals can follow ThunderHawk’s established processes.",
    ongoingDependency:
      "Open-source commerce core, hosted on AWS/Cloudflare and evolved under ThunderHawk’s control.",
  },
  shopify: {
    architecture:
      "Shopify Plus as the ecommerce and B2B foundation, with a custom storefront/theme and bespoke apps where ThunderHawk’s model extends beyond native Plus.",
    search:
      "Enhanced catalogue search on the Shopify storefront, with filters, autocomplete, fuzzy matching, synonyms, technical attributes and customer-specific product visibility.",
    flexibility:
      "High within Shopify’s B2B model. Companies, locations, catalogues and checkout are used natively; custom apps cover housebuilder/development structures and advanced ThunderHawk Orderwise workflows.",
    nativeB2B:
      "Shopify Companies, Company Locations, catalogues, payment terms and wholesale functionality form the core B2B model.",
    bespokeWorkflow:
      "Custom application work for housebuilder/contractor/development relationships, ThunderHawk Orderwise-sourced account data, merchant portals and post-order amendments.",
    ongoingDependency:
      "Shopify Plus remains the commerce substrate, checkout, B2B accounts, apps and billing, with custom apps and Orderwise integration around it.",
  },
};

export const comparisonRows: Array<{
  key: keyof ComparisonQualities | "platform" | "price" | "hours" | "days";
  label: string;
  source: "frontmatter" | "qualitative";
}> = [
  { key: "platform", label: "Platform", source: "frontmatter" },
  { key: "price", label: "Total cost", source: "frontmatter" },
  { key: "hours", label: "Hours", source: "frontmatter" },
  { key: "days", label: "Days", source: "frontmatter" },
  { key: "architecture", label: "Architecture approach", source: "qualitative" },
  { key: "search", label: "Search", source: "qualitative" },
  { key: "flexibility", label: "Flexibility", source: "qualitative" },
  { key: "nativeB2B", label: "Native B2B capability", source: "qualitative" },
  { key: "bespokeWorkflow", label: "Bespoke workflow capability", source: "qualitative" },
  { key: "ongoingDependency", label: "Ongoing platform dependency", source: "qualitative" },
];

export function getComparison(slug: string): ComparisonQualities | null {
  return comparisonBySlug[slug] ?? null;
}

export const retoolAlternative = {
  kicker: "Magento improvement programme",
  heading: "Magento improvement programme",
  lede:
    "The Magento improvement programme represents a different level of investment to the Vendure and Shopify rebuilds and should not be viewed as a lower cost route to the same end result.",
  body:
    "This option retains the existing Magento platform and focuses investment on a defined set of improvements to the areas creating the greatest friction for Verona and its customers.",
  message:
    "This option does not attempt to deliver the full transformation offered by Vendure Core or Shopify Plus. It is an investment in improving the existing platform.",
  panelTitle: "Magento improvement programme",
  pullQuote:
    "Improve the existing service and extend its useful life without replacing the underlying platform.",
  cta: "Explore the Magento improvement programme",
  outcomesFallback: [
    "Complete frontend redesign",
    "Algolia-powered search",
    "Improved customer relationships and permissions",
    "Platform stabilisation and bug fixing",
    "Improved CMS flexibility",
  ],
  tradeoff:
    "The Magento improvement programme offers a lower initial investment, but does not provide the same architectural freedom or breadth of new functionality as a full platform rebuild.",
  costContextLabel: "Lower initial investment",
  costContextNote: "A narrower scope at significantly lower cost.",
} as const;

export const whyPragmatic = {
  heading: "Why Pragmatic Digital",
  paragraphs: [
    "We’ve built our reputation on deep expertise in web platforms, from concept through launch and beyond. Over the past decade, we’ve worked with studios, agencies and brands on some of the most visually ambitious websites in the market, many involving complex animations, 3D graphics, video integration and high-performance interactive experiences.",
    "That experience extends to working alongside creative agencies as trusted technical partners. We understand the challenges of bridging beautiful design with robust technical delivery, and we know how to navigate the demands of premium clients and complex briefs.",
    "For ThunderHawk Studio specifically, this expertise translates into practical value. Your platform needs to showcase world-class creative work without compromising on performance or reliability. That’s exactly the problem we’ve spent our careers solving.",
  ],
  points: [
    {
      title: "We’ve delivered complex web experiences at scale",
      body: "Our portfolio includes animated microsites, 3D-heavy portfolios, video-driven storytelling platforms and interactive installations. We understand the technical patterns that make rich visual experiences work reliably: lazy loading, asset optimisation, progressive enhancement and caching strategies that don’t compromise on visual impact.",
    },
    {
      title: "We’re trusted partners for creative agencies",
      body: "We’ve worked with multiple agencies as their go-to technical partner for premium projects. We speak the language of creative briefs, understand tight timelines and know how to translate bold design ideas into platforms that perform as well as they look. We’re comfortable working alongside your team, your current platform partners or whoever else is involved in decisions.",
    },
    {
      title: "We understand the Webflow ecosystem deeply",
      body: "Your current platform is built on Webflow, a tool we know well. We understand its strengths for rapid iteration and its limitations when it comes to performance and edge cases. This context means we’re not suggesting change for change’s sake; we can assess what Webflow can realistically handle and where you’d benefit from different approaches.",
    },
    {
      title: "We know what matters to creative studios",
      body: "ThunderHawk’s reputation depends on your platform reflecting your creative standard. We’ve worked with studios where every pixel matters, where performance is part of the brand promise and where technical debt quietly kills the user experience. We know how to prioritise accordingly.",
    },
  ],
  relevantExperience: {
    heading: "Our experience with similar challenges",
    lede: "We’ve tackled problems directly relevant to your situation:",
    cases: [
      {
        title: "High-performance creative platforms",
        paragraphs: [
          "We’ve built and optimised portfolio sites featuring 3D graphics, video and complex animations. We know how to load Spline scenes efficiently, handle large video assets without killing performance and structure code so animations don’t create bottlenecks.",
          "The Webflow video asset 429 errors you’re experiencing? We’ve seen this before. It’s a symptom of improper caching configuration or CDN rate limiting: fixable problems that don’t require a full platform rebuild.",
        ],
      },
      {
        title: "CDN and asset delivery optimisation",
        paragraphs: [
          "We’ve migrated video and asset delivery from platform-native CDNs to dedicated services, improving both performance and cost. This is directly relevant to the video loading issues we flagged in our audit.",
        ],
      },
      {
        title: "Webflow implementation and troubleshooting",
        paragraphs: [
          "We’ve extended Webflow with custom code, debugged performance issues and scaled platforms beyond Webflow’s default capabilities. We know when Webflow is the right choice and when something custom makes more sense.",
        ],
      },
    ],
  },
} as const;

export const benefits = {
  kicker: "Opportunities",
  heading: "Where we see value in improvement",
  lede: "Our review has identified several areas where investment in the platform could create meaningful value for both ThunderHawk and your customers. These are grounded in what we’ve observed during our audit and what we’ve heard from you during our initial discussions.",
  points: [
    {
      title: "Customer experience and discovery",
      body: "We’ve identified friction points in how customers find products, access information and move through key journeys. Improvements here could reduce support enquiries and increase online orders.",
    },
    {
      title: "Operational efficiency",
      body: "There are areas where your team is investing time in manual processes or workarounds that the platform could support directly. Addressing these could free up capacity and reduce operational friction.",
    },
    {
      title: "Data and integration",
      body: "We’ve noted opportunities to improve how data flows between your platform and backend systems. Better integration could reduce errors and improve data consistency.",
    },
    {
      title: "Flexibility and control",
      body: "Some current limitations make it harder for your team to manage content, pricing and customer rules without development support. Improving this flexibility would give you more autonomy.",
    },
    {
      title: "Technical foundation",
      body: "Your platform’s architecture has both strengths and constraints. We’ve identified where modernising the foundation would enable easier maintenance and future development.",
    },
  ],
  measuringSuccess: {
    heading: "How to assess what works",
    paragraphs: [
      "Before committing to any significant work, it’s important to agree how you’ll assess whether improvements have worked.",
      "This might include metrics around customer experience, team efficiency, order volume, support ticket volume or operational burden.",
      "Our review has flagged specific areas where we could establish baselines from your current platform and track improvements after any changes are made.",
    ],
  },
} as const;

export const scopeAndPricing = {
  kicker: "Next Steps",
  heading: "Moving from review to planning",
  lede: "Once we've discussed these findings and aligned on priorities, the next step would be to move into more detailed scoping. This section will be populated with that work once we've agreed the direction.",
} as const;

export const ongoingCosts = {
  kicker: "Key Questions",
  heading: "Areas we want to discuss with you",
  paragraphs: [
    "Based on our review, we have several questions and areas we'd like to explore with you before moving into detailed planning.",
    "These aren't issues we've found, but rather areas where your input will help us understand priorities, constraints and what success looks like from your perspective.",
    "This discussion will shape how we approach any subsequent work or proposals.",
  ],
  recommendedSupport: {
    heading: "Understanding your constraints",
    paragraphs: [
      "We want to understand more about how any changes would fit with your broader business objectives, timelines and commercial constraints.",
      "It would be helpful to discuss budget parameters, team availability for any transition or testing, and how you’d measure success.",
      "This will help us recommend an approach that’s realistic and grounded in your actual situation rather than a generic template.",
    ],
  },
  retainer: {
    heading: "Delivery and investment model",
    current: {
      heading: "How we typically work",
      paragraphs: [
        "Based on our experience delivering similar projects, we typically approach platform improvements in one of two ways:",
        "Either as a defined project with clear scope and timeline, or as an ongoing engagement where we blend maintenance, support and continuous improvement under a retainer arrangement.",
      ],
      tableLabel: "Typical investment models",
      rows: [
        { area: "Project-based", allowance: "Fixed timeline and scope with clear deliverables" },
        { area: "Ongoing retainer", allowance: "Continuous improvement and maintenance under an agreed commitment" },
        { area: "Hybrid", allowance: "Initial project phase followed by ongoing support" },
      ],
      total: { area: "Each approach has trade-offs", allowance: "We’d discuss which fits your situation best" },
      rateNote: "Our commercial structure adapts to what works best for you.",
    },
    vendure: {
      heading: "Areas we need to explore",
      paragraphs: [
        "Before recommending a specific approach, we want to understand more about:",
        "Your preferred working style and decision-making process",
        "Whether you have budget parameters or constraints we should factor in",
        "How you’d typically handle a transition or major platform change",
        "Whether ongoing support and continuous improvement matter to you beyond the initial delivery",
      ],
      tableLabel: "Key discussion areas",
      columns: ["Area", "Consideration"],
      rows: [
        { area: "Timeline & phasing", current: "When would you prefer to invest?", proposed: "Phased approach or comprehensive?" },
        { area: "Commercial model", current: "Preferred engagement type?", proposed: "Project, retainer, or hybrid?" },
        { area: "Team availability", current: "Who’ll be involved from your side?", proposed: "How much capacity can you commit?" },
      ],
      totals: [],
      closing: [
        "This review gives us a strong foundation for that conversation. Once we’ve discussed these findings and aligned on your priorities, we can recommend an approach that’s genuinely tailored to ThunderHawk rather than a template solution.",
      ],
    },
  },
  platformDependency: {
    heading: "Platform dependency and future control",
    paragraphs: [
      "The choice between Vendure Core and Shopify Plus is not only about the initial build or ongoing cost. It also affects how much control Verona has over the platform, how future requirements can be delivered and how dependent the business becomes on a particular technology provider.",
      "Both approaches are viable, but they represent different long-term operating models.",
    ],
    platforms: [
      {
        title: "Vendure Core",
        paragraphs: [
          "Vendure Core provides a different model.",
          "For Verona, we are proposing Vendure Core, the open-source framework, rather than the commercial Vendure Platform product. Vendure Core provides an extensible ecommerce foundation that we can develop around Verona’s operating model and bespoke requirements.",
          "This gives Verona greater flexibility over how the application is structured, extended and hosted, particularly where requirements are specific to Verona’s customer relationships, pricing model or integration with Orderwise.",
          "It also provides more choice over how the platform is supported in future. The implementation can be maintained by Pragmatic or another appropriately experienced development team without the entire commerce application being tied to a single hosted platform.",
          "That flexibility does not mean there are no dependencies or ongoing responsibilities. A Vendure Core implementation still requires hosting, maintenance, monitoring, documentation and appropriate technical expertise. Vendure Core itself is free to use and self-host under the GPLv3 licence, so there is no Vendure Platform subscription included in our proposal. Verona would still have ongoing costs for the infrastructure and services required to operate the application, together with Pragmatic’s maintenance and support.",
        ],
      },
      {
        title: "Shopify Plus",
        paragraphs: [
          "Shopify Plus provides a mature, fully managed commerce platform, with the core service and underlying infrastructure operated and maintained by Shopify.",
          "This removes a significant amount of responsibility for running the core ecommerce platform and gives Verona access to the wider Shopify ecosystem. The trade-off is that the commerce platform remains dependent on Shopify’s service, commercial terms and supported methods of extending the platform.",
          "For Verona, this is particularly relevant because the proposed portal goes beyond a standard ecommerce implementation.",
          "Customer relationships, account-specific functionality and the Orderwise workflows would need to operate within Shopify’s capabilities or be delivered through bespoke applications and integrations around the platform.",
          "This does not prevent those requirements from being delivered, but it means future changes may sometimes need to be approached in a way that fits the Shopify architecture rather than being designed entirely around Verona’s preferred process.",
          "If Verona chose to move away from Shopify in future, this would require a migration project. Functionality developed specifically around Shopify would also need to be reviewed and, where necessary, rebuilt for the replacement platform.",
        ],
      },
    ],
    implications: {
      heading: "What this means for Verona",
      paragraphs: [
        "The distinction is therefore less about one platform being ‘open’ and another being ‘closed’, and more about the level of control Verona wants over a business-critical system.",
        "Shopify Plus provides the convenience and operational benefits of a managed commerce platform, but with greater dependency on the Shopify ecosystem and commercial model.",
        "Vendure Core places more responsibility around the application and its operation with the implementation team, but provides greater flexibility to shape the platform around Verona and more choice over how it is hosted, developed and supported in future.",
        "Given the level of bespoke customer functionality and Orderwise integration required for this project, we believe that additional flexibility is an important advantage of the Vendure Core approach and is one of the reasons it is our recommended option.",
      ],
    },
    licensing: {
      heading: "Vendure licensing",
      paragraphs: [
        "The proposed solution is based on Vendure Core.",
        "Vendure Core is the open-source framework underneath Vendure and is free to use and self-host under the GPLv3 licence. The proposal does not assume a Vendure Platform subscription or Vendure Cloud.",
        "This means there is no recurring Vendure software subscription included in the proposed solution. Ongoing costs will instead relate to the infrastructure and services used to run the application, including hosting, database, storage, monitoring, backups and any separately selected third-party services, together with Pragmatic’s maintenance and support.",
        "The implementation should be designed so Verona’s bespoke functionality sits within the appropriate Vendure extension model rather than modifying the Vendure Core source directly. This supports a cleaner upgrade path while retaining the flexibility that is one of the main reasons for recommending Vendure Core.",
      ],
    },
  },
} as const;

export const delivery = {
  kicker: "Our Findings",
  heading: "What we discovered during the audit",
  paragraphs: [
    "Our review covered your current platform architecture, customer experience, operational integration points and technical foundation. Below is a summary of what we found.",
    "We’ve tried to be specific about findings and flag areas where more investigation would be valuable. This is the basis for the conversation we’d like to have with you.",
  ],
  workingTogether: {
    heading: "How we approached this review",
    paragraphs: [
      "We spent time understanding your current platform, customer base and business model before drawing conclusions.",
      "We looked at your architecture and technical implementation, reviewed customer-facing flows and journeys, spoke with your team about operational challenges and priorities, and considered what competitive or market developments might affect your platform strategy.",
      "Rather than recommending a wholesale replacement, we tried to identify which improvements would create the most value and which are realistic given your circumstances.",
      "We’ve flagged areas where we’d need more information before being able to estimate scope or impact, and identified questions we think matter for your decision-making.",
      "The goal is to have an honest conversation about what’s genuinely worth doing, in what order and by when, not to oversell a solution we’d like to deliver.",
    ],
  },
  programme: {
    heading: "The review findings",
    paragraphs: [
      "We’ve organised our findings into these themes, which we’ll expand on in the sections below:",
    ],
    stages: [
      {
        title: "Customer experience",
        body: "How customers currently interact with your platform, where friction exists, and opportunities to improve key journeys.",
      },
      {
        title: "Platform architecture and technology",
        body: "Your current technical foundation, what’s working well, and areas where modernisation would create value.",
      },
      {
        title: "Integration and data flow",
        body: "How your platform connects with backend systems, and where better integration could improve accuracy and efficiency.",
      },
      {
        title: "Operational impact",
        body: "Where platform improvements would reduce friction for your team and enable more efficient operations.",
      },
      {
        title: "Content and management",
        body: "Your current approach to managing content, product information and rules, and how we could improve flexibility.",
      },
      {
        title: "Growth and scalability",
        body: "How the platform could better support future growth and new customer segments.",
      },
    ],
    closing: [
      "Each of these areas is addressed in more detail below. We’d like to walk through these findings with you, understand which resonate most strongly, and identify your priorities before moving into detailed scoping or commercial discussion.",
    ],
  },
  protectingTrading: {
    heading: "Risk and complexity",
    paragraphs: [
      "We’ve also identified several areas of complexity or risk that would need careful attention in any subsequent work.",
      "These aren’t show-stoppers, but they are areas where clear thinking and planning would be important. We’ve flagged these in our detailed findings and want to discuss them with you.",
      "Our view is that these are manageable challenges that a team with the right experience can navigate successfully. Part of the value of working with us would be drawing on our experience with similar complexity in other projects.",
      "We’ll walk through these risks during our discussion and explain how we’d recommend approaching them.",
    ],
  },
} as const;

export const phasing = {
  kicker: "After This Review",
  heading: "The conversation ahead",
  paragraphs: [
    "This review document is the foundation for a discussion we want to have with you.",
    "Rather than presenting finished proposals or commercial terms, we've brought our findings and ideas. We want to understand what resonates, what we've missed and what your real priorities are.",
    "That conversation will shape everything that follows: whether we move to detailed scoping, commercial proposals or a different approach altogether.",
  ],
  whyPhaseOne: {
    heading: "What we want from your feedback",
    paragraphs: [
      "We'd specifically like to understand:",
      "Which of the issues we've identified matter most to you and your customers",
      "Whether our prioritisation aligns with how you're thinking about the platform",
      "Where we've missed things or misunderstood the situation",
      "What constraints or considerations we should factor in",
      "Whether you see opportunities we haven't mentioned",
    ],
  },
  benefits: {
    heading: "Timing and next steps",
    paragraphs: [
      "We're ready to discuss this review whenever works best for you. We don't have a fixed agenda: we're happy to go deep into areas that matter most or move quickly through the findings.",
      "The objective is to have a genuine conversation, not to pitch proposals or rush towards commercial terms.",
    ],
    points: [
      "Discuss findings and gather your perspective",
      "Identify shared priorities and areas of concern",
      "Clarify questions we have about your platform or business",
      "Agree next steps and how to move forward together",
    ],
    closing: [
      "We've put effort into this review because we believe there are real opportunities to improve your platform. We want to make sure we're focusing on what matters most to you.",
    ],
  },
  smallerInvestment: {
    heading: "",
    paragraphs: [],
  },
  allocations: {
    heading: "",
    paragraphs: [],
    totals: [],
    options: [],
    closing: [],
  },
} as const;

export const nextSteps = {
  kicker: "Next Steps",
  heading: "What comes next",
  paragraphs: [
    "This review is the beginning of a conversation, not the end of our thinking.",
    "We’d like to sit down with you and walk through these findings, understand your perspective and agree on priorities before we move into detailed scoping or commercial proposals.",
    "There’s real value we believe we can create here. Our findings are based on genuine analysis of your platform and business, not a template we’re trying to fit.",
  ],
  confirming: {
    heading: "Getting the conversation started",
    paragraphs: [
      "We suggest we schedule a meeting to discuss this review. We can tailor the discussion to what matters most to you.",
      "Some possible approaches:",
    ],
    points: [
      "Walk through the key findings across all areas and gather your initial thoughts",
      "Focus in depth on the areas you care most about",
      "Discuss specific questions or concerns you have",
      "Explore how we’d approach any of the work we’re suggesting",
      "Talk about commercial structure, timing and how we’d work together",
    ],
    closing: [
      "We’re flexible on format and depth. The goal is to make sure this review reflects your reality and priorities, and that you have confidence in any recommendations we make.",
    ],
  },
  growth: {
    heading: "Why this matters",
    paragraphs: [
      "Your platform is business-critical. Investment in it should make genuine sense, grounded in your actual situation rather than in technology trends or what we think we’d enjoy building.",
      "This review is our attempt to do that: to understand your platform and business well enough to make honest recommendations.",
      "We’d welcome the opportunity to discuss these findings with your team and understand whether we’re seeing the situation clearly.",
    ],
  },
} as const;

export const costSavings = {
  heading: "About this document",
  paragraphs: [
    "This review represents a few days of focused work on your platform, your business and the opportunities we see.",
    "It’s not a formal proposal and there are no commercial terms attached to it. It’s our honest assessment of where we see value, where we have questions and what we think matters.",
  ],
  reuse: {
    heading: "What you’ll find here",
    paragraphs: [
      "The main body of this document walks through our findings across the key areas we reviewed: customer experience, technology, operations and growth.",
      "Each section explains what we found, why it matters and what questions we have. We’ve tried to be specific rather than generic and to flag where we’d need more information before estimating scope or impact.",
      "We’ve also included our thoughts on commercial approach and how we’d typically work on projects like this.",
    ],
  },
  deliveryApproach: {
    heading: "How we approach this kind of work",
    paragraphs: [
      "We believe the right approach depends on understanding what actually matters to you, not just technology trends or what we’d like to build.",
      "This review is our attempt to be grounded in your reality. We’ve asked questions, listened carefully and tried to prioritise based on impact rather than complexity.",
      "If we move forward, we’d continue that same approach through scoping, planning and delivery.",
    ],
  },
  commercially: {
    heading: "No pressure, just conversation",
    paragraphs: [
      "We’ve brought this review to you because we think there’s real potential here. But we want to move at your pace and in a direction that makes sense for you.",
      "The next step is to have a conversation. Whether that leads to a formal proposal, a phased approach, or something different entirely depends on what you learn from our findings and what your priorities actually are.",
      "We’re ready to discuss whenever that works for you.",
    ],
  },
} as const;
