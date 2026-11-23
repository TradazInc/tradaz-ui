import { Card, CardProps } from "@/components/puck/Card";
import { CTA, CTAProps } from "@/components/puck/CTA";
import { FeatureGrid, FeatureGridProps } from "@/components/puck/FeatureGrid";
import { Hero, HeroProps } from "@/components/puck/Hero";
import { Stats, StatsProps } from "@/components/puck/Stats";
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
