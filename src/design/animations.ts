import { motionTokens as t } from "./tokens";
import type { Variants } from "framer-motion";

/* ─── Container stagger ─── */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: t.stagger.default, delayChildren: 0.3 },
  },
};

/* ─── Kinetic text reveal (Hero lines) ─── */
export const lineReveal: Variants = {
  hidden: {
    y: "150%",
    clipPath: "inset(100% 0 0 0)",
    filter: "blur(8px)",
  },
  visible: {
    y: 0,
    clipPath: "inset(0 0 0 0)",
    filter: "blur(0px)",
    transition: {
      duration: t.duration.heroLine,
      ease: t.ease,
    },
  },
};

/* ─── Fade + slide up ─── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: t.duration.slow, ease: t.ease },
  },
};

export const fadeUpBig: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: t.duration.slow, ease: t.ease },
  },
};

/* ─── Fade + slide in from sides ─── */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: t.duration.slow, ease: t.ease },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: t.duration.slow, ease: t.ease },
  },
};

/* ─── Scale in ─── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: t.duration.normal, ease: t.ease },
  },
};

/* ─── Step transition (for multi-step flows) ─── */
export const stepTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: t.duration.fast },
};

/* ─── Confirmation scale bounce ─── */
export const springScale: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { duration: 0.5, delay: 0.2, type: "spring" },
  },
};

/* ─── Navbar slide down ─── */
export const navReveal = {
  initial: { y: -100 },
  animate: { y: 0 },
  transition: { duration: t.duration.slow, ease: t.ease },
};

/* ─── Mobile menu ─── */
export const mobileMenu = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

/* ─── Scroll indicator bounce ─── */
export const bounceY = {
  animate: { y: [0, 8, 0] },
  transition: { duration: 1.5, repeat: Infinity },
};

/* ─── Simple fade in (no slide) ─── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: t.duration.slow },
  },
};
