import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const lineVariants = {
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
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-hall.jpg"
          alt="Velvet Hall interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030305]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-[#829796]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#829796] font-medium">
              Lagos&apos; Premier Event Centre
            </span>
          </motion.div>

          {/* Main Heading - Kinetic Typography */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              variants={lineVariants}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight"
            >
              Moments that
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              variants={lineVariants}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-gradient"
            >
              transcend time.
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-base lg:text-lg text-[#B0A8A8] max-w-md mb-10 leading-relaxed"
          >
            An architectural masterpiece in the heart of Lagos, crafted for
            weddings, galas, conferences, and celebrations that echo through
            generations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/book" className="btn-pill-primary group">
              View Availability
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() =>
                document
                  .querySelector("#venue")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-pill-secondary"
            >
              Explore Venue
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
