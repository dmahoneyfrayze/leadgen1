import {
  Zap,
  Bot,
  Building2,
  BarChart3,
} from "lucide-react";

export type IconType = typeof Bot;

export const getCategoryIcon = (category: string): IconType => {
  const iconMap: Record<string, IconType> = {
    automation: Zap,
    ai: Bot,
    business: Building2,
    analytics: BarChart3,
  };

  return iconMap[category.toLowerCase()] || Zap;
};