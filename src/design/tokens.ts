export const colors = {
  bg: {
    base: "#030305",
    surface: "#0F0F11",
    surfaceDark: "#151517",
  },
  brand: {
    red: "#E33539",
    redHover: "#ff4d52",
    redGlow: "rgba(227, 53, 57, 0.25)",
    teal: "#829796",
    tealLight: "rgba(130, 151, 150, 0.35)",
    tealBg: "rgba(130, 151, 150, 0.10)",
    tealBgHover: "rgba(130, 151, 150, 0.20)",
  },
  text: {
    primary: "#FFFFFF",
    muted: "#B0A8A8",
    faint: "rgba(255, 255, 255, 0.40)",
    white70: "rgba(255, 255, 255, 0.70)",
    white20: "rgba(255, 255, 255, 0.20)",
  },
  border: {
    default: "rgba(255, 255, 255, 0.10)",
    medium: "rgba(255, 255, 255, 0.15)",
    strong: "rgba(255, 255, 255, 0.20)",
  },
  glass: {
    base: "rgba(255, 255, 255, 0.05)",
    hover: "rgba(255, 255, 255, 0.02)",
    input: "rgba(255, 255, 255, 0.05)",
  },
  status: {
    pendingApproval: { text: "#fbbf24", bg: "rgba(251, 191, 36, 0.10)" },
    pendingPayment: { text: "#60a5fa", bg: "rgba(96, 165, 250, 0.10)" },
    inProgress: { text: "#34d399", bg: "rgba(52, 211, 153, 0.10)" },
    cancelled: { text: "#f87171", bg: "rgba(248, 113, 113, 0.10)" },
    confirmed: { text: "#829796", bg: "rgba(130, 151, 150, 0.10)" },
    completed: { text: "#829796", bg: "rgba(130, 151, 150, 0.10)" },
    draft: { text: "rgba(255, 255, 255, 0.40)", bg: "rgba(255, 255, 255, 0.05)" },
  },
  gradient: {
    textWhite: "linear-gradient(135deg, #FFFFFF 0%, #B0A8A8 100%)",
    textTeal: "linear-gradient(135deg, #829796 0%, #5a6e6d 100%)",
    bar: "linear-gradient(to right, #829796, #E33539)",
    heroOverlay: "linear-gradient(to top, #030305, rgba(3, 3, 5, 0.40), transparent)",
    heroSide: "linear-gradient(to right, rgba(3, 3, 5, 0.60), transparent)",
    cardImage: "linear-gradient(to top, #0F0F11, transparent)",
    hoverOverlay: "linear-gradient(to top, rgba(0,0,0,0.40), transparent)",
    authOverlay: "linear-gradient(to top, #030305, rgba(3,3,5,0.80), rgba(3,3,5,0.60))",
  },
} as const;

export const fonts = {
  serif: "'Instrument Serif', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
} as const;

export const typeScale = {
  display: {
    hero: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
    sectionTitle: "text-3xl lg:text-5xl",
    heading2: "text-4xl lg:text-6xl",
  },
  heading: {
    h1: "text-3xl lg:text-4xl",
    h2: "text-2xl lg:text-3xl",
    h3: "text-xl lg:text-2xl",
    h4: "text-lg",
  },
  body: {
    base: "text-sm",
    large: "text-base lg:text-lg",
    small: "text-xs",
    tiny: "text-[10px]",
  },
} as const;

export const motionTokens = {
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    reveal: 1.0,
    heroLine: 1.2,
  },
  stagger: {
    quick: 0.08,
    default: 0.12,
    cards: 0.15,
  },
  delay: {
    heroOverline: 0.2,
    heroTitle: 0.3,
    heroSubtitle: 0.9,
    heroCta: 1.1,
    heroScroll: 1.5,
  },
} as const;

export const spacing = {
  sectionY: "py-24 lg:py-32",
  sectionGap: "gap-12 lg:gap-20",
  container: "max-w-7xl mx-auto px-6 lg:px-8",
  contentWrapper: "w-full max-w-7xl mx-auto px-6 lg:px-8",
} as const;

export const borderRadius = {
  card: "rounded-xl",
  cardLg: "rounded-2xl",
  pill: "rounded-full",
  input: "rounded-lg",
} as const;

export const formInput =
  "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#829796] transition-colors";

export const chip = {
  base: "px-2.5 py-1 rounded-full text-xs capitalize",
  teal: "text-[#829796] bg-[#829796]/10",
  amber: "text-amber-400 bg-amber-400/10",
  blue: "text-blue-400 bg-blue-400/10",
  red: "text-red-400 bg-red-400/10",
  emerald: "text-emerald-400 bg-emerald-400/10",
  ghost: "text-white/40 bg-white/5",
} as const;
