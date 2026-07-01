import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { UserPlus, ArrowLeft, Loader2 } from "lucide-react";
import { trpc } from "@/providers/trpc";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signupMutation = trpc.auth.signup.useMutation({
    onSuccess: () => navigate("/"),
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    signupMutation.mutate({ name, email, password });
  };

  return (
    <main className="relative min-h-screen bg-[#030305] flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="/images/hero-hall.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/80 to-[#030305]/60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#B0A8A8] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="liquid-glass-strong rounded-2xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-white mb-2">Create Account</h1>
            <p className="text-sm text-[#B0A8A8]">
              Sign up to start booking events at BeeVelt Halls
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#B0A8A8] mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#829796] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#B0A8A8] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#829796] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#B0A8A8] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#829796] transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="w-full btn-pill-primary justify-center"
            >
              {signupMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-center text-[#B0A8A8] mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#829796] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}