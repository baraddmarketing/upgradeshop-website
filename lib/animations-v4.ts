import { Variants } from "framer-motion";

/**
 * Journey-specific animation variants for home-v4
 * Focused on calm, gentle, purposeful motion
 */

// Entry Animations

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// Container for staggered children

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// Viewport-triggered animations (scroll-based)

export const viewportFadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const viewportScale = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

// Continuous animations (use sparingly)

export const breathingAnimation = {
  animate: {
    scale: [1, 1.02, 1],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const slowRotation = {
  animate: {
    rotate: 360,
  },
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: "linear",
  },
};

export const gentleFloat = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Hover states

export const hoverLift = {
  whileHover: {
    y: -4,
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
  },
  transition: { duration: 0.2 },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: "0 8px 32px rgba(231, 210, 142, 0.5)",
    scale: 1.02,
  },
  transition: { duration: 0.3 },
};

// Special effects

export const wordFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export const drawLine = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 1.2, ease: "easeInOut" },
};

// Badge-specific animations

export const badgePulse = {
  animate: { scale: [1, 1.1, 1] },
  transition: { duration: 1, repeat: 0 },
};

export const badgePulseDouble = {
  animate: { scale: [1, 1.1, 1, 1.1, 1] },
  transition: { duration: 1.5, repeat: 0 },
};

// Ease curve presets
export const easeConfig = {
  smooth: "easeInOut",
  gentle: "easeOut",
  sharp: "easeIn",
  spring: { type: "spring", stiffness: 100, damping: 15 },
};

// Duration presets (in seconds)
export const duration = {
  fast: 0.3,
  medium: 0.6,
  slow: 0.9,
  verySlow: 1.2,
};
