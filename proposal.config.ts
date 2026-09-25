import type { ProposalConfig } from "@/lib/config-schema";

const config: ProposalConfig = {
  site: {
    agency: "Pragmatic Digital",
    client: "ThunderHawk",
    proposalLabel: "ThunderHawk, website audit and new website direction",
    prepared: "September 2026",
    email: "hello@pragmaticdigital.co.uk",
    phone: "0113 534 9949",
    address: "Mabgate Business Centre, 93–99 Mabgate, Leeds LS9 7DR",
    // gtmId: "GTM-KZ4QZP7L",
    robotsIndex: false,
    description:
      "Initial review and discovery findings following our audit of ThunderHawk's digital platform, with ideas and recommendations to discuss.",
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
};

export default config;
