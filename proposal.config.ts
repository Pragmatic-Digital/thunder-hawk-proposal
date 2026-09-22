import type { ProposalConfig } from "@/lib/config-schema";

const config: ProposalConfig = {
  site: {
    agency: "Pragmatic Digital",
    client: "Thunder Hawk",
    proposalLabel: "Thunder Hawk Digital Platform Proposal",
    prepared: "September 2026",
    email: "hello@pragmaticdigital.co.uk",
    phone: "0113 534 9949",
    address: "Mabgate Business Centre, 93–99 Mabgate, Leeds LS9 7DR",
    gtmId: "GTM-KZ4QZP7L",
    robotsIndex: false,
    description:
      "A technical and commercial proposal for the Thunder Hawk digital platform redesign, presenting Vendure Core, Shopify Plus, and Magento improvement options.",
  },
  theme: {
    colorPage: "#f3efe8",
    colorPageDeep: "#e8ddd0",
    colorPaper: "#fbf8f2",
    colorInk: "#1b1a17",
    colorInkSoft: "#54534f",
    colorInkMuted: "#8a8985",
    colorSage: "#5f6b58",
    colorSageDeep: "#45523e",
    colorSageMist: "#e8ede5",
    colorRule: "#e5dfd4",
    colorRuleStrong: "#c9bfb0",
    colorRecommend: "#5f6b58",
  },
  nav: [
    { id: "overview", label: "Overview", matchIds: ["overview"] },
    { id: "options", label: "Options", matchIds: ["options", "comparison"] },
    { id: "why-pragmatic", label: "Why Pragmatic", matchIds: ["why-pragmatic"] },
    { id: "benefits", label: "Benefits", matchIds: ["benefits"] },
    { id: "scope-and-pricing", label: "Scope & Pricing", matchIds: "auto-quotes" },
    { id: "ongoing-costs", label: "Ongoing Costs", matchIds: ["ongoing-costs"] },
    { id: "delivery", label: "Delivery", matchIds: ["delivery"] },
    { id: "phasing", label: "Phasing", matchIds: ["phasing"] },
    { id: "next-steps", label: "Next Steps", matchIds: ["next-steps"] },
  ],
  sections: [
    { slug: "overview", component: "hero" },
    { slug: "options", component: "options-cards", quoteGroup: "all" },
    { slug: "comparison", component: "comparison-table", quoteGroup: "rebuild" },
    { slug: "why-pragmatic" },
    { slug: "benefits" },
    {
      slug: "scope-and-pricing",
      component: "group",
      children: [
        { quoteGroup: "rebuild" },
        { quoteGroup: "retool", tone: "retool" },
        { slug: "cost-savings" },
      ],
    },
    { slug: "ongoing-costs" },
    { slug: "delivery" },
    { slug: "phasing" },
    { slug: "next-steps" },
  ],
};

export default config;
