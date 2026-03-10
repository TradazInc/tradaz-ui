import { Variants } from "framer-motion";

export const TYPING_SPEED = 120;
export const DELETING_SPEED = 80;
export const PAUSE_DURATION = 1800;

export const WORDS = [
  "Custom Website",
  "Online Store",
  "Brand Identity",
  "SaaS Platform",
];

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};


export const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, x: 20 },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 },
  },
};