export const site = {
  agency: "Pragmatic Digital",
  client: "Thunder Hawk",
  proposalLabel: "Thunder Hawk Digital Platform Proposal",
  prepared: "September 2026",
  email: "hello@pragmaticdigital.co.uk",
  phone: "0113 534 9949",
  address: "Mabgate Business Centre, 93–99 Mabgate, Leeds LS9 7DR",
  heroHeading: "Our recommendation for Verona",
  recommendation:
    "We recommend a Vendure Core rebuild with a Next.js frontend, with an indicative project investment of £116,200 + VAT.",
  overviewParagraphs: [
    "Verona’s requirements extend beyond a new website. The platform needs to support different customer groups, account relationships, pricing arrangements and delivery rules, while keeping Orderwise at the centre of the operation.",
    "Vendure Core gives us the flexibility to build around those requirements rather than adapting Verona’s processes to fit a more prescriptive ecommerce platform. Combined with a Next.js frontend, it gives us the foundation to deliver a modern customer experience while retaining control over the bespoke commerce and integration logic behind it.",
    "The main priorities are to make products easier to find, give customers clearer access to stock, pricing and order information, and reduce routine administration for Verona’s teams. The rebuild would also provide more flexible content management and a clearer group website, with appropriate experiences for each customer audience.",
  ],
  tradeoff:
    "Shopify Plus reduces the amount of platform functionality we need to build from scratch. Vendure Core provides greater freedom to model the platform around Verona's existing business processes.",
} as const;

export const optionsAtAGlance = {
  heading: "Options at a glance",
  footnote:
    "These figures are budget estimates, subject to agreed scope and technical validation. Ongoing platform, infrastructure, third-party service and support costs will be confirmed alongside the delivery programme before commitment to the build.",
  items: [
    {
      slug: "vendure",
      title: "Vendure Core rebuild with Next.js",
      recommended: true,
      price: "£116,200 + VAT",
      body: "The recommended route for delivering the full customer and operational model, including Verona’s bespoke account relationships and Orderwise integration.",
    },
    {
      slug: "shopify",
      title: "Shopify Plus rebuild",
      recommended: false,
      price: "£123,200 + VAT",
      body: "A managed commerce platform with bespoke applications and integrations required around Shopify to support Verona’s more complex requirements.",
    },
    {
      slug: "magento",
      title: "Magento improvement programme",
      recommended: false,
      price: "£44,100 + VAT",
      body: "A focused programme to improve the existing customer experience and extend the useful life of Magento while deferring broader structural changes.",
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
      "Vendure Core as the commerce/application layer with a React/Next.js storefront, designed around Verona’s catalogue, accounts and Orderwise model.",
    search:
      "Algolia, including AI and synonym search, with autocomplete, fuzzy matching and faceted filtering across SKU, product name and attributes.",
    flexibility:
      "High. Organisations, branches, commercial rules and housebuilder/contractor/development relationships can be modelled around how Verona already trades.",
    nativeB2B:
      "B2B is built into the data model: organisations, multiple users, roles, customer-specific catalogues, pricing and permissions.",
    bespokeWorkflow:
      "Checkout, delivery rules, advanced order management and merchant/key-account portals can follow Verona’s established processes.",
    ongoingDependency:
      "Open-source commerce core, hosted on AWS/Cloudflare and evolved under Verona’s control.",
  },
  shopify: {
    architecture:
      "Shopify Plus as the ecommerce and B2B foundation, with a custom storefront/theme and bespoke apps where Verona’s model extends beyond native Plus.",
    search:
      "Enhanced catalogue search on the Shopify storefront, with filters, autocomplete, fuzzy matching, synonyms, technical attributes and customer-specific product visibility.",
    flexibility:
      "High within Shopify’s B2B model. Companies, locations, catalogues and checkout are used natively; custom apps cover housebuilder/development structures and advanced Orderwise workflows.",
    nativeB2B:
      "Shopify Companies, Company Locations, catalogues, payment terms and wholesale functionality form the core B2B model.",
    bespokeWorkflow:
      "Custom application work for housebuilder/contractor/development relationships, Orderwise-sourced account data, merchant portals and post-order amendments.",
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
    "Our work on Verona’s current platform gives us a practical understanding of the customer journeys, Orderwise integration and operational processes the new service needs to support. That helps us identify the areas requiring early validation and reduces the time Verona’s teams need to spend explaining the existing operation.",
    "The current platform was designed primarily around independent retailers. Supporting Verona’s wider customer base now requires changes to the underlying account structure, permissions and commercial workflows. Those changes need a defined development programme beyond routine maintenance.",
    "We would use the rebuild to review those foundations, agree how the most complex journeys should work and test them with representative accounts before launch.",
  ],
  points: [
    {
      title: "We already maintain the Magento platform",
      body: "We currently maintain the existing Magento platform and have an established track record of supporting Verona with ongoing bug fixing, maintenance and new feature development. This gives us a detailed understanding of how the current trade portal operates in practice, including the areas that work well, the limitations of the existing implementation and the operational processes that sit behind it.",
    },
    {
      title: "We already understand the Orderwise API",
      body: "We are already familiar with the Orderwise API and the practical challenges involved in synchronising data between Orderwise and the website, including product data, customer information and order processing. We understand the pitfalls around data quality, sync timing, failure handling and keeping the website aligned with Orderwise as the operational source of truth.",
    },
    {
      title: "We already understand the business",
      body: "This existing knowledge means we are not starting the project from zero. We already understand much of Verona’s terminology, commercial model, customer structure and underlying systems, allowing the project to focus more quickly on improving the platform rather than first having to reverse-engineer the current operation.",
    },
    {
      title: "An established working relationship",
      body: "Combined with our experience of delivering and supporting Verona’s existing websites, and our relationships with your key stakeholders, this puts Pragmatic Digital in a strong position to deliver a solution that is technically robust, commercially appropriate and grounded in how Thunder Hawk actually operates.",
    },
  ],
  relevantExperience: {
    heading: "Relevant experience",
    lede: "Our experience with Verona gives us useful context for this project. Alongside that knowledge, the examples below explain the work we have delivered and how it relates to the proposed platform.",
    cases: [
      {
        title: "Verona Architectural",
        paragraphs: [
          "We designed and built the Verona Architectural website. That work gives us existing knowledge of Verona’s brand and product presentation, which will help inform the group website and the way customers move between its divisions.",
          "Its relevance to this proposal is our experience of delivering a Verona website and working with the business. The trade portal also involves customer accounts, commercial rules and operational integrations, so those requirements need their own validation.",
        ],
      },
    ],
  },
} as const;

export const benefits = {
  kicker: "Benefits",
  heading: "What this means for Verona",
  lede: "The new portal is an opportunity to improve more than the technology behind the website. The aim is to make it easier for customers to find what they need, place and manage orders, and access the information relevant to their account, while reducing the amount of day-to-day administration required from Verona’s team.",
  points: [
    {
      title: "Make products easier to find",
      body: "Improved search and filtering will help customers get to the right products more quickly, particularly across Verona’s large and varied product catalogue.",
    },
    {
      title: "Give customers the information they need",
      body: "Customers will have clearer access to the pricing, stock and delivery information available to their account, helping them make decisions and place orders with greater confidence.",
    },
    {
      title: "Increase customer self-service",
      body: "The portal will give customers more ways to manage routine tasks themselves, including accessing account and order information. This should reduce the number of everyday enquiries that need to be handled manually by Verona’s team.",
    },
    {
      title: "Make the platform easier for Verona to manage",
      body: "The new platform will give Verona greater control over content and day-to-day updates, reducing reliance on development support for routine changes.",
    },
    {
      title: "Support how Verona’s customers actually work",
      body: "The platform will be designed around the different customer, group, division and housebuilder relationships set out in the brief, rather than forcing those relationships into a standard ecommerce model.",
    },
  ],
  measuringSuccess: {
    heading: "Measuring success",
    paragraphs: [
      "At the start of the project, we will agree a small set of measures with Verona and establish a baseline from the current platform where the data is available.",
      "These could include product search success, use of online ordering and customer accounts, the volume of routine stock and delivery enquiries, and the time required to manage content.",
      "This gives us a practical way to assess the impact of the new portal after launch. The objective is not simply to replace Magento with newer technology, but to deliver a platform that is easier for Verona’s customers to use and more efficient for Verona to operate.",
    ],
  },
} as const;

export const scopeAndPricing = {
  kicker: "Scope & Pricing",
  heading: "Detailed scope and estimates",
  lede: "The detailed Vendure Core and Shopify Plus rebuild scopes sit here, alongside the Magento improvement programme and an explanation of how these estimates have developed since 2024.",
} as const;

export const ongoingCosts = {
  kicker: "Ongoing Costs",
  heading: "Ongoing costs and support",
  paragraphs: [
    "The build estimates cover the delivery work described in this proposal, but the initial development cost is only one part of the commercial decision.",
    "Each option has a different ongoing cost profile across platform and commercial licences, hosting and infrastructure, search and paid applications, maintenance and support, and any applicable payment or transaction charges.",
    "These costs should be considered alongside the initial investment when comparing the three routes.",
  ],
  recommendedSupport: {
    heading: "Recommended support",
    paragraphs: [
      "Whichever platform Verona chooses, we recommend retaining an ongoing support arrangement covering essential platform maintenance and operational support, with planned improvements managed separately.",
      "The maintenance element would cover the agreed responsibilities for software updates, monitoring, backups and the health of the custom integrations. Operational support would provide Verona with a clear route for reporting problems, assessing their impact and coordinating a response.",
      "For Shopify Plus, Shopify would manage the core commerce platform. Pragmatic’s responsibilities would focus on the bespoke applications, Orderwise integration and other custom elements developed as part of the project.",
      "For Vendure Core, Pragmatic’s support responsibilities would extend to the application itself, its hosting environment and infrastructure, monitoring and backups, alongside the Orderwise integration and bespoke functionality.",
      "The Magento improvement programme would continue to require support for the existing Magento application, infrastructure and integrations, together with any additional services introduced as part of the improvement work.",
      "The final support arrangement will define the included services, support hours, incident priorities and escalation process. Response targets will be distinguished from resolution times, particularly where resolving an issue requires input from Orderwise or another third party.",
      "Following launch, we recommend reviewing actual support demand once the new platform has been operating normally. This will allow the ongoing maintenance allowance to reflect the support Verona genuinely requires rather than simply carrying the existing arrangement forward unchanged.",
    ],
  },
  recurringCosts: {
    heading: "Recurring costs by option",
    options: [
      {
        title: "Vendure Core",
        paragraphs: [
          "Ongoing costs would include application hosting and infrastructure, monitoring and backups, search services, maintenance and support, together with any paid third-party services selected for the implementation.",
          "Vendure Core does not introduce a recurring Vendure software subscription. Unlike a SaaS platform, Verona would not be paying a single platform fee that bundles the application, infrastructure and platform services together. This provides greater flexibility over the technical architecture, but the individual services required to operate the platform need to be allowed for separately.",
        ],
      },
      {
        title: "Shopify Plus",
        paragraphs: [
          "Ongoing costs would include the Shopify Plus platform subscription, any paid applications, applicable payment and transaction charges, and the hosting and support required for bespoke applications and integrations.",
          "Although Shopify manages the core commerce platform and its underlying infrastructure, this does not remove the requirement to maintain Verona’s Orderwise integration, bespoke customer functionality or any other custom applications developed around Shopify.",
          "The Shopify subscription should therefore be considered alongside, rather than instead of, the ongoing technical support requirement.",
        ],
      },
      {
        title: "Magento improvement programme",
        paragraphs: [
          "This option would retain the existing Magento hosting, infrastructure and maintenance requirements.",
          "Additional recurring costs may also be introduced where new services are required, for example an external search platform such as Algolia or other third-party tools used to improve the existing experience.",
          "Because the underlying Magento platform remains in place, this route does not remove the existing requirement for application and infrastructure maintenance.",
        ],
      },
    ],
  },
  retainer: {
    heading: "Reviewing the retainer",
    current: {
      heading: "Current support arrangement",
      paragraphs: [
        "Verona currently retains Pragmatic for 37.5 hours per month, charged at our existing rate of £700 per day / £3,500 per month.",
        "This is currently allocated as:",
      ],
      tableLabel: "Current monthly retainer allocation",
      rows: [
        { area: "Portal maintenance", allowance: "7.5 hours" },
        { area: "Portal development", allowance: "22.5 hours" },
        { area: "Verona Architectural maintenance and development", allowance: "7.5 hours" },
      ],
      total: { area: "Total", allowance: "37.5 hours / £3,500 per month" },
      rateNote: "We propose keeping the existing £700 day rate unchanged.",
    },
    vendure: {
      heading: "Reduced support requirement with Vendure",
      paragraphs: [
        "One of the benefits we would expect from a full Vendure Core rebuild is a reduction in the amount of ongoing maintenance required simply to keep the portal stable and deal with issues created by the existing Magento platform.",
        "The new platform would be built around the current Orderwise integration, customer rules and agreed workflows rather than continuing to maintain and extend a platform that has evolved over a number of years. Verona’s team would also have better tools for managing routine content and platform updates themselves.",
        "For that reason, our proposed ongoing arrangement for the Vendure Core route would reduce the dedicated portal maintenance allowance from 7.5 hours to 3.75 hours per month once the new platform has completed its post-launch support period and is operating normally.",
        "The existing 22.5 hours of portal development and 7.5 hours for Verona Architectural can remain available, meaning Verona continues to have development capacity for improvements rather than using as much of the retainer on routine maintenance.",
        "This would give an ongoing allocation of:",
      ],
      tableLabel: "Proposed Vendure Core monthly retainer compared with the current arrangement",
      columns: ["Area", "Current", "Proposed with Vendure Core"],
      rows: [
        { area: "Portal maintenance", current: "7.5 hours", proposed: "3.75 hours" },
        { area: "Portal development", current: "22.5 hours", proposed: "22.5 hours" },
        {
          area: "Verona Architectural maintenance and development",
          current: "7.5 hours",
          proposed: "7.5 hours",
        },
      ],
      totals: [
        { area: "Total", current: "37.5 hours", proposed: "33.75 hours" },
        { area: "Monthly cost at existing £700/day rate", current: "£3,500", proposed: "£3,150" },
      ],
      closing: [
        "This represents a £350 monthly reduction, or £4,200 per year, while retaining the same development allowance and Verona Architectural support.",
        "Alternatively, Verona could retain the existing £3,500 monthly commitment and use the released maintenance capacity for additional development and continuous improvement.",
        "We would review the maintenance allowance with Verona following launch to make sure it remains appropriate for the live platform. This reduction relates specifically to the Vendure Core option and does not include hosting, infrastructure, commercial licences or other third-party services, which are shown separately within the ongoing cost comparison.",
        "The objective is to make the ongoing cost benefit of replacing Magento tangible, while maintaining enough support capacity for a business-critical platform.",
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
  kicker: "Delivery",
  heading: "Delivery and launch",
  paragraphs: [
    "Our approach is designed to keep the project moving in clear stages, validate the more complex requirements early and protect Verona’s ability to trade throughout the transition.",
    "The development estimates in this proposal represent the anticipated effort required to deliver the scope. Calendar duration will also depend on project sequencing, Verona’s availability for decisions and testing, access to Orderwise and other systems, and the speed at which agreed feedback can be provided.",
  ],
  workingTogether: {
    heading: "How we will work together",
    paragraphs: [
      "We propose an initial discovery and technical validation stage, followed by design and development in agreed stages.",
      "Discovery will confirm the detailed scope, integration approach, prioritised delivery backlog and acceptance criteria for the main customer journeys. We will use this stage to validate the more complex customer relationships and Orderwise workflows before dependent functionality is developed.",
      "During design, we will agree the key page templates and customer journeys with Verona before moving into the relevant areas of development.",
      "Throughout the build we will demonstrate progress regularly, giving Verona clear opportunities to review the platform and provide consolidated feedback. We will maintain a shared record of key decisions, dependencies and outstanding questions so both teams have visibility of what is required to keep the programme moving.",
      "Where a new requirement changes the agreed scope, we will explain the effect on cost and timing before proceeding.",
      "Testing will combine Pragmatic’s technical and functional QA with Verona’s review of representative customer journeys. We will agree the appropriate decision makers on both sides for design approval, scope decisions and final launch approval.",
      "The objective is to make progress visible, identify difficult questions early and avoid significant issues being discovered late in the project.",
    ],
  },
  programme: {
    heading: "Proposed programme",
    paragraphs: [
      "Verona’s brief sets an objective to agree costs and begin the project in 2026, with the new portal launching in 2027. We would plan the delivery programme around that objective.",
      "The project would progress through the following stages:",
    ],
    stages: [
      {
        title: "Discovery and technical validation",
        body: "Confirm the detailed scope, validate the Vendure Core architecture and establish the approach to Orderwise, customer relationships, pricing and other key integrations.",
      },
      {
        title: "UX and design",
        body: "Agree the main customer journeys, information architecture, page templates and responsive designs before dependent development begins.",
      },
      {
        title: "Platform and integration development",
        body: "Build the Vendure Core platform, frontend experience, administration functionality and integrations in agreed stages. Where practical, workstreams will run alongside each other to keep the programme moving efficiently.",
      },
      {
        title: "Internal QA and integration testing",
        body: "Test the platform end to end, including customer access, product visibility, pricing, ordering, permissions, delivery rules and Orderwise integration.",
      },
      {
        title: "Verona UAT and customer testing",
        body: "Provide Verona with a structured UAT period and involve representative customers where appropriate. Feedback will be prioritised and resolved against the agreed launch criteria.",
      },
      {
        title: "Migration rehearsal and launch preparation",
        body: "Rehearse the migration, reconcile agreed data, complete final checks and agree the cutover and recovery plan before launch.",
      },
      {
        title: "Launch and post-launch support",
        body: "Move the new portal into production and closely monitor ordering, integrations, errors and customer feedback during the initial live period.",
      },
    ],
    closing: [
      "The detailed milestone dates and final elapsed delivery period will be agreed following technical validation and resource planning. The main dependencies will be timely access to Orderwise and other required services, availability of content and data, consolidated feedback from Verona and access to representative users for testing.",
    ],
  },
  protectingTrading: {
    heading: "Testing, migration and protecting trading",
    paragraphs: [
      "Protecting Verona’s ability to trade will be a key consideration throughout delivery.",
      "The existing Magento portal will continue to support customers while the Vendure Core replacement is developed and tested separately. The intention is that normal ordering activity can continue throughout the majority of the project without disruption from the rebuild.",
      "Testing will use representative customer accounts and cover the key journeys required for launch, including catalogue and product visibility, account-specific pricing, customer permissions, delivery rules and the successful transfer of orders into Orderwise.",
      "Before launch, we will carry out a migration rehearsal and reconcile the agreed product, customer and order data. This gives both teams an opportunity to validate the process before the live cutover.",
      "Verona and Pragmatic will agree clear launch criteria before the migration takes place. This will include the critical journeys that must pass testing, outstanding issues that would prevent launch, the cutover process and the handling of any orders or data created during the transition.",
      "The launch plan will also include a defined recovery and rollback approach if a critical issue is identified during cutover. This will cover how the existing service can be retained or restored where appropriate and how orders and data would be reconciled before customers move permanently to the new platform.",
      "Following launch, Pragmatic will provide an agreed period of enhanced monitoring and support, with clear responsibilities and an escalation route for any critical issues.",
      "The priority is to give Verona’s customers a reliable route to ordering throughout the transition and to move to the new platform only when the agreed launch criteria have been met.",
    ],
  },
} as const;

export const phasing = {
  kicker: "Phasing",
  heading: "Phasing and the initial investment",
  paragraphs: [
    "The proposed phases follow the priorities identified through our discussions and workshops with Verona.",
    "For both rebuild options, the majority of the investment sits within the first phase because this is where the core platform, integrations and essential customer journeys need to be established.",
    "Under the current scope, approximately 91% of the Vendure Core estimate and 90% of the Shopify Plus estimate sit within Phase 1.",
    "This is important when considering phasing commercially. The proposed approach allows Verona to sequence delivery, launch the core service first and introduce additional functionality afterwards, but it does not currently create a significantly lower-cost first release.",
  ],
  whyPhaseOne: {
    heading: "Why Phase 1 represents most of the investment",
    paragraphs: [
      "The first release needs to establish the foundations that the later functionality depends on.",
      "For the Vendure Core route this includes the core commerce application, frontend experience, customer and account structure, product catalogue, pricing, ordering, administration functionality and the key Orderwise integration.",
      "These elements account for a significant proportion of the overall development effort regardless of whether some secondary functionality is introduced immediately or in a later phase.",
      "Once those foundations are in place, subsequent phases can build on the same platform rather than repeating that initial investment.",
    ],
  },
  benefits: {
    heading: "What phasing gives Verona",
    paragraphs: [
      "The main benefit of phasing is therefore delivery control rather than simply reducing the overall project cost.",
      "It gives Verona the opportunity to:",
    ],
    points: [
      "Focus the first release on the most important customer journeys",
      "Validate the new platform with real customers before introducing further functionality",
      "Spread some of the development investment beyond the initial launch",
      "Use feedback and live platform data to influence later priorities",
      "Avoid delaying the core replacement while lower-priority functionality is completed",
    ],
    closing: [
      "The later phases can then focus on extending the platform once the core service is established and operating successfully.",
    ],
  },
  smallerInvestment: {
    heading: "If Verona wants a smaller initial investment",
    paragraphs: [
      "If reducing the initial commitment is a priority, we can review the Phase 1 scope with Verona and identify whether a genuinely smaller first release is practical.",
      "This would require more than simply moving secondary features into a later phase. We would need to agree which customer groups, account types or workflows could reasonably remain on an alternative process while the first version of the new portal is launched.",
      "For example, this could mean initially supporting a narrower group of customers or deferring more complex account functionality until a later release.",
      "Any such change would need to consider how affected customers continue to order in the meantime, whether temporary processes are required and whether deferring functionality creates additional development or migration work later.",
      "We would then re-estimate the revised Phase 1 rather than assuming that moving a feature automatically removes its full cost from the initial build.",
    ],
  },
  allocations: {
    heading: "Indicative phase allocations",
    paragraphs: [
      "The phase values shown in this proposal should be treated as indicative allocations of the overall project estimate until the detailed scope and technical validation have been completed.",
      "The overall current budget estimates remain:",
    ],
    totals: [
      { platform: "Vendure Core rebuild", amount: "£116,200 + VAT" },
      { platform: "Shopify Plus rebuild", amount: "£123,200 + VAT" },
    ],
    options: [
      {
        title: "Vendure Core",
        tableLabel: "Indicative Vendure Core phase allocations",
        columns: ["Phase", "Scope", "Indicative hours", "Indicative cost"],
        rows: [
          {
            phase: "MVP / Phase 1",
            scope:
              "Retain core current-site functionality and deliver all Priority 1 requirements. Includes new design and Next.js storefront, Vendure Core foundation, CMS, group/division architecture, customer and organisation model, housebuilder/contractor/development model, roles and permissions, customer-specific catalogues and pricing, core Orderwise syncs, online ordering, stock, search, product catalogue, checkout, delivery rules, resources, merchant/key-account portals, WIZMO/tracking, payments, migration, analytics, accessibility and deployment.",
            hours: "1,135 hrs",
            cost: "£105,934 + VAT",
          },
          {
            phase: "Phase 2",
            scope:
              "Priority 2 requirements including enhanced order amendments, reorder/saved baskets/quick ordering, invoices, partial deliveries, enhanced stock/alternative-product functionality, auto-generated PDFs, privacy mode, account information, damage requests and enhanced stockist/discontinued-product functionality.",
            hours: "85 hrs",
            cost: "£7,933 + VAT",
          },
          {
            phase: "Optional / Phase 3",
            scope:
              "Priority 3 requirements including extended delivery reservation windows, customer-specific login pop-ups and Wickes InSitu functionality.",
            hours: "25 hrs",
            cost: "£2,333 + VAT",
          },
          {
            phase: "Excluded / separately quoted",
            scope:
              "Priority 4 requirements: product batch information, sample ordering and subscription ordering. These should be technically scoped before pricing.",
            hours: "TBC",
            cost: "TBC",
          },
        ],
        total: {
          phase: "Quoted project total",
          scope: "Existing Vendure Core estimate excluding separately quoted Priority 4 items.",
          hours: "1,245 hrs",
          cost: "£116,200 + VAT",
        },
      },
      {
        title: "Shopify Plus",
        tableLabel: "Indicative Shopify Plus phase allocations",
        columns: ["Phase", "Scope", "Indicative hours", "Indicative cost"],
        rows: [
          {
            phase: "MVP / Phase 1",
            scope:
              "Retain core current-site functionality and deliver Priority 1 requirements using Shopify Plus B2B wherever practical. Includes theme/storefront, CMS, Companies/Locations, customer and branch model, housebuilder custom application layer, catalogues, pricing, Orderwise integrations, ordering, stock, search, product catalogue, B2B checkout, core delivery rules, resources, merchant/key-account portals, WIZMO/tracking, migration, analytics, security and deployment.",
            hours: "1,185 hrs",
            cost: "£110,600 + VAT",
          },
          {
            phase: "Phase 2",
            scope:
              "Priority 2 functionality requiring additional Shopify configuration and custom-app workflows, including post-order amendments, reorder/saved basket journeys, invoices/account data, partial/back-order processes, auto-generated documents, privacy mode and additional support functionality.",
            hours: "105 hrs",
            cost: "£9,800 + VAT",
          },
          {
            phase: "Optional / Phase 3",
            scope:
              "Priority 3 enhancements including extended delivery scheduling, account-specific notifications/pop-ups and Wickes InSitu integration.",
            hours: "30 hrs",
            cost: "£2,800 + VAT",
          },
          {
            phase: "Excluded / separately quoted",
            scope:
              "Priority 4 requirements: product batch information, sample ordering and subscription ordering. These would require further Shopify/Orderwise feasibility work.",
            hours: "TBC",
            cost: "TBC",
          },
        ],
        total: {
          phase: "Quoted project total",
          scope: "Existing Shopify Plus estimate excluding separately quoted Priority 4 items.",
          hours: "1,320 hrs",
          cost: "£123,200 + VAT",
        },
      },
    ],
    closing: [
      "The objective of the phasing is to give Verona a controlled route through delivery and launch while keeping the commercial implications clear.",
    ],
  },
} as const;

export const nextSteps = {
  kicker: "Next Steps",
  heading: "Next steps",
  paragraphs: [
    "Our recommendation is to proceed with the Vendure Core rebuild.",
    "We believe this provides the strongest fit for the requirements Verona has set out and the way the portal needs to operate in practice. It gives us the flexibility to build around Verona’s customer relationships, account-specific functionality and Orderwise integration without forcing those requirements into the constraints of a more prescriptive ecommerce platform.",
    "The current budget estimate for this route is £116,200 + VAT, subject to final scope and technical validation.",
    "The Magento improvement programme remains available if Verona’s priority is to make targeted improvements while making a significantly lower initial investment. However, it should be viewed as an investment in extending and improving the existing platform rather than an alternative route to the same end result.",
    "Shopify Plus is also a viable rebuild option, but based on the requirements currently understood, we believe Vendure Core provides Verona with greater flexibility and long-term control for a platform with this level of bespoke customer and integration functionality.",
  ],
  confirming: {
    heading: "Confirming the approach",
    paragraphs: [
      "The next step would be to work through the proposal with Verona and confirm the preferred route.",
      "If Verona wishes to proceed with Vendure Core, we would then move into final technical validation and project planning before development begins.",
      "This would allow us to:",
    ],
    points: [
      "Confirm the detailed scope and assumptions behind the £116,200 budget estimate",
      "Validate the more complex customer, pricing and Orderwise workflows",
      "Confirm the technical architecture and required third-party services",
      "Finalise the ongoing infrastructure and support costs",
      "Agree the Phase 1 scope and any functionality to be introduced later",
      "Confirm the delivery programme, milestones and target launch window",
      "Agree the commercial structure and commencement date",
    ],
    closing: [
      "Once these points are confirmed, we can produce the final delivery plan and move into the discovery and technical validation stage.",
    ],
  },
  growth: {
    heading: "A platform for the next stage of Verona’s growth",
    paragraphs: [
      "The objective of this project is not simply to replace Magento.",
      "It is an opportunity to give Verona a portal that is easier for customers to use, more efficient for the internal team to manage and better suited to the customer relationships and operational processes that have developed around the business.",
      "Our existing relationship with Verona gives us a strong starting point. We already understand much of the current platform, its integration with Orderwise and the areas where the existing service creates friction.",
      "The Vendure Core rebuild gives us the opportunity to combine that knowledge with a fresh customer experience and a technical foundation that can continue to evolve with Verona over the long term.",
      "We would welcome the opportunity to work through the proposal with the Verona team, answer any questions on the scope and budget, and agree the route forward.",
    ],
  },
} as const;

export const costSavings = {
  heading: "How the estimate has developed",
  paragraphs: [
    "Our understanding of Verona’s platform, customers and technical requirements has developed considerably since the original 2024 estimate.",
    "At that stage, a significant part of the challenge was estimating a complex platform and integration from the outside. Since then, Pragmatic has worked directly with Verona’s existing platform and gained a much more detailed understanding of how the service operates in practice.",
    "We now have first-hand knowledge of the existing Magento application, the Orderwise integration, product and customer structures, account-specific requirements and many of the operational processes that sit behind the portal.",
    "That accumulated knowledge reduces uncertainty.",
    "Rather than beginning the project with a lengthy exercise to establish how the existing platform works, we can focus discovery and technical validation on the areas that need to change and on confirming the architecture of the new Vendure Core platform.",
  ],
  reuse: {
    heading: "Reusing what we have learned",
    paragraphs: [
      "The benefit is not simply that we know the existing codebase.",
      "Through ongoing support and development we have already encountered many of the practical scenarios that a new supplier would need to discover during the project, including customer account relationships, product data, pricing, Orderwise workflows and the areas that regularly create friction.",
      "We can carry that understanding into the new platform without carrying forward the limitations of the existing Magento architecture.",
      "This gives us a stronger basis for estimating the work and should reduce time spent on avoidable investigation, rework and rediscovery.",
    ],
  },
  deliveryApproach: {
    heading: "A more efficient delivery approach",
    paragraphs: [
      "Our development process has also continued to evolve since the earlier estimate.",
      "We now make greater use of reusable technical foundations, established development patterns, automated testing and modern engineering tools to accelerate appropriate parts of the delivery process.",
      "AI-assisted development tools form one part of that workflow and can help with repetitive development, analysis and testing tasks. They are not the basis of the commercial estimate and they do not replace the engineering team responsible for the project.",
      "Architecture, implementation decisions, code review, testing and production changes remain the responsibility of Pragmatic’s development team.",
    ],
  },
  commercially: {
    heading: "What this means commercially",
    paragraphs: [
      "The current £116,200 + VAT Vendure Core estimate reflects our present understanding of Verona’s requirements and the scope described in this proposal.",
      "The commercial benefit of the existing relationship is that we are starting from a much stronger position than we were in 2024. We have greater certainty around the work, can focus technical discovery more precisely and can make use of the knowledge and delivery foundations developed since the original estimate.",
      "We do not believe it is useful to present the difference from the 2024 estimate as a simple like-for-like saving unless the two scopes are directly comparable.",
      "Instead, the current figure should be assessed against the functionality, assumptions and exclusions set out in this proposal.",
      "The important point is that the estimate reflects what we now know about Verona and how we would build the platform today, rather than pricing the project as though we were approaching the business and its systems for the first time.",
    ],
  },
} as const;
