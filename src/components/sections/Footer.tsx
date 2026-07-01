import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="relative w-full pt-24 lg:pt-32 pb-8" ref={ref}>
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl liquid-glass p-12 lg:p-20 text-center"
        >
          <div className="absolute inset-0 opacity-20">
            <img
              src="/images/venue-exterior.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="font-serif text-4xl lg:text-6xl text-white mb-4">
              Begin your journey
            </h2>
            <p className="text-[#B0A8A8] max-w-md mx-auto mb-8">
              Let us help you create an event that will be remembered for a
              lifetime. Get in touch with our team today.
            </p>
            <Link to="/book" className="btn-pill-primary inline-flex">
              Book a Tour
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-serif text-2xl text-white mb-4">Velvet Hall</h3>
            <p className="text-sm text-[#B0A8A8] leading-relaxed mb-4">
              Lagos&apos; premier event destination. Where moments become
              memories and celebrations find their perfect stage.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm uppercase tracking-[0.15em] text-white/60 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Explore Venue", "Packages", "Availability", "Dashboard"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to={link === "Dashboard" ? "/dashboard" : link === "Explore Venue" ? "#venue" : link === "Packages" ? "#packages" : "/book"}
                      className="text-sm text-[#B0A8A8] hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm uppercase tracking-[0.15em] text-white/60 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-[#B0A8A8]">
                <MapPin className="w-4 h-4 text-[#829796] mt-0.5 shrink-0" />
                1 Velvet Drive, Lekki Phase 1, Lagos, Nigeria
              </li>
              <li className="flex items-center gap-3 text-sm text-[#B0A8A8]">
                <Phone className="w-4 h-4 text-[#829796] shrink-0" />
                +234 800 VELVET HALL
              </li>
              <li className="flex items-center gap-3 text-sm text-[#B0A8A8]">
                <Mail className="w-4 h-4 text-[#829796] shrink-0" />
                hello@velvethall.ng
              </li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-sm uppercase tracking-[0.15em] text-white/60 mb-4">
              Office Hours
            </h4>
            <ul className="space-y-3 text-sm text-[#B0A8A8]">
              <li className="flex justify-between">
                <span>Mon — Fri</span>
                <span>9:00 AM — 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM — 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; 2026 Velvet Hall. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/40 hover:text-white/60 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-xs text-white/40 hover:text-white/60 cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
