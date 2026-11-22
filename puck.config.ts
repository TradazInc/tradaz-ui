import type { CardProps } from "@/components/puck/Card";
import { Card } from "@/components/puck/Card";
import type { CTAProps } from "@/components/puck/CTA";
import { CTA } from "@/components/puck/CTA";
import type { FeatureGridProps } from "@/components/puck/FeatureGrid";
import { FeatureGrid } from "@/components/puck/FeatureGrid";
import type { HeroProps } from "@/components/puck/Hero";
import { Hero } from "@/components/puck/Hero";
import type { StatsProps } from "@/components/puck/Stats";
import { Stats } from "@/components/puck/Stats";
import { Config } from "@puckeditor/core";

export interface PuckProps {
  Hero: HeroProps;
  FeatureGrid: FeatureGridProps;
  Card: CardProps;
  Stats: StatsProps;
  CTA: CTAProps;
}

export interface PuckRootProps {
  title: string;
}

export const puckConfig: Config<PuckProps, PuckRootProps> = {
  root: {
    fields: { title: { type: "text" } },
    defaultProps: { title: "Home" },
  },
  categories: {
    sections: {
      title: "Sections",
      components: ["Hero", "FeatureGrid", "Stats", "CTA"],
    },
    content: { title: "Content", components: ["Card"] },
  },
  components: { Hero, FeatureGrid, Card, Stats, CTA },
};
