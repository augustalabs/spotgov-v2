import { BarChart2, Search } from "lucide-react";
export const featureConfigs = {
  featureDeepdive: {
    label: "Deep Dive",
    sublabel: "Advanced Analytics",
    description:
      "Access in-depth analysis and detailed insights about government opportunities",
    icon: Search,
  },
  featureMarketintel: {
    label: "Market Intel",
    sublabel: "Market Intelligence",
    description:
      "Get comprehensive market intelligence and competitive analysis tools",
    icon: BarChart2,
  },
} as const;
// Type helper for feature keys
export type FeatureKey = keyof typeof featureConfigs;
