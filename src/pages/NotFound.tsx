import { motion } from "framer-motion";
import { Link } from "react-router";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#030305] flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="/images/hero-hall.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/80 to-[#030305]/60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="font-serif text-8xl lg:text-9xl text-white mb-4">404</h1>
        <p className="text-xl text-[#B0A8A8] mb-8">
          This page seems to have vanished into the velvet curtains.
        </p>
        <Link to="/" className="btn-pill-primary inline-flex">
          <Home className="w-4 h-4" />
          Return Home
        </Link>
      </motion.div>
    </main>
  );
}
