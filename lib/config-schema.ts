export type ThemeConfig = {
  colorPage: string;
  colorPageDeep: string;
  colorPaper: string;
  colorInk: string;
  colorInkSoft: string;
  colorInkMuted: string;
  colorSage: string;
  colorSageDeep: string;
  colorSageMist: string;
  colorRule: string;
  colorRuleStrong: string;
  colorRecommend?: string;
  fontSans?: string;
  fontDisplay?: string;
};

export type SiteConfig = {
  agency: string;
  client: string;
  proposalLabel: string;
  prepared: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
  gtmId?: string;
  robotsIndex: boolean;
  description: string;
};

export type ProposalConfig = {
  site: SiteConfig;
  theme: ThemeConfig;
};

export function assertProposalConfig(config: unknown): asserts config is ProposalConfig {
  if (!config || typeof config !== "object") {
    throw new Error("proposal.config.ts must export a valid ProposalConfig object");
  }

  const cfg = config as Record<string, unknown>;

  if (!cfg.site || typeof cfg.site !== "object") {
    throw new Error("proposal.config.ts.site is missing or invalid");
  }

  if (!cfg.theme || typeof cfg.theme !== "object") {
    throw new Error("proposal.config.ts.theme is missing or invalid");
  }
}
