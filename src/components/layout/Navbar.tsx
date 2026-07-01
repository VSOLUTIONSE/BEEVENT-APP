import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, User, Calendar, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Explore", href: "#venue" },
    { label: "Packages", href: "#packages" },
    { label: "Availability", href: "#calendar" },
  ];

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "liquid-glass" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="font-serif text-xl lg:text-2xl text-white tracking-tight hover:opacity-80 transition-opacity"
            >
              BeeVelt Halls
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                  <div className="w-px h-5 bg-white/20" />
                  <button
                    onClick={() => navigate("/book")}
                    className="btn-pill-primary"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Now
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Account
                  </Link>
                  <Link to="/book" className="btn-pill-primary">
                    <Calendar className="w-4 h-4" />
                    Book Now
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#030305]/95 backdrop-blur-xl pt-20"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-serif text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="w-16 h-px bg-white/20" />
              <Link
                to="/book"
                onClick={() => setMenuOpen(false)}
                className="btn-pill-primary text-lg"
              >
                Book Now
              </Link>
              {isAuthenticated && (
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setMenuOpen(false);
                  }}
                  className="text-lg text-white/70 hover:text-white"
                >
                  Dashboard
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
