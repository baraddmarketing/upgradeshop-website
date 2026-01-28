/**
 * Framer Motion Animation Variants for V3 Organic Minimalism
 */

import { Variants } from "framer-motion";

// Fade up animation (elements entering from below)
export const fadeUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeUpTransition = {
  duration: 0.6,
  ease: "easeOut",
};

// Staggered children animation
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Scale in animation
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const scaleInTransition = {
  duration: 0.5,
  ease: "easeOut",
};

// Blob breathing animation (infinite loop)
export const blobBreathe = {
  scale: [1, 1.05, 1],
  opacity: [0.6, 0.8, 0.6],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Floating animation (gentle up/down movement)
export const floating = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Hover lift effect
export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

// Glow effect on hover
export const hoverGlow = {
  rest: { boxShadow: "0 8px 32px rgba(156, 175, 136, 0.15)" },
  hover: {
    boxShadow: "0 8px 32px rgba(156, 175, 136, 0.4)",
    transition: { duration: 0.2 },
  },
};

// Gradient shift on scroll
export const gradientShift = (scrollY: number) => ({
  backgroundPosition: `${scrollY * 0.5}px ${scrollY * 0.3}px`,
});

// Parallax effect (different speeds for different layers)
export const parallax = {
  slow: (scrollY: number) => scrollY * 0.2,
  medium: (scrollY: number) => scrollY * 0.5,
  fast: (scrollY: number) => scrollY * 0.8,
};

// Underline slide animation for links
export const underlineSlide: Variants = {
  rest: { width: "0%" },
  hover: {
    width: "100%",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Organic shape morph
export const shapeMorph = {
  animate: {
    d: [
      "M40,-50C50,-40,55,-30,55,-20C55,-10,50,0,40,10C30,20,15,30,0,30C-15,30,-30,20,-40,10C-50,0,-55,-10,-55,-20C-55,-30,-50,-40,-40,-50C-30,-60,-15,-70,0,-70C15,-70,30,-60,40,-50Z",
      "M35,-45C45,-35,50,-25,50,-15C50,-5,45,5,35,15C25,25,10,35,-5,35C-20,35,-35,25,-45,15C-55,5,-60,-5,-60,-15C-60,-25,-55,-35,-45,-45C-35,-55,-20,-65,-5,-65C10,-65,25,-55,35,-45Z",
      "M40,-50C50,-40,55,-30,55,-20C55,-10,50,0,40,10C30,20,15,30,0,30C-15,30,-30,20,-40,10C-50,0,-55,-10,-55,-20C-55,-30,-50,-40,-40,-50C-30,-60,-15,-70,0,-70C15,-70,30,-60,40,-50Z",
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Viewport-based animation (triggers when element enters viewport)
export const viewportFade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" },
};
