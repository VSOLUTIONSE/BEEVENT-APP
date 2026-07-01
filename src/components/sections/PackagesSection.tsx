import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";

const fallbackPackages = [
  {
    id: 1,
    name: "The Gala — Full Day",
    durationHours: 12,
    price: "2500000",
    includes: "Full venue access,Tables & chairs for 300,Basic sound system,Standard lighting,2 security personnel,Cleaning crew,Event coordinator",
    maxCapacity: 500,
    imageUrl: "/images/package-fullday.jpg",
  },
  {
    id: 2,
    name: "The Conference — Half Day",
    durationHours: 6,
    price: "1200000",
    includes: "Main hall access,Conference seating for 200,Projector & screen,Podium & microphones,Wi-Fi,Coffee break setup,1 security personnel",
    maxCapacity: 200,
    imageUrl: "/images/package-halfday.jpg",
  },
  {
    id: 3,
    name: "The Celebration — Weekend",
    durationHours: 24,
    price: "4500000",
    includes: "Full weekend venue access,Tables & chairs for 500,Premium sound & lighting,Stage setup,4 security personnel,VIP cleaning crew,Dedicated event manager,Bridal suite access",
    maxCapacity: 500,
    imageUrl: "/images/package-weekend.jpg",
  },
];

function formatPrice(price: string) {
  const n = parseFloat(price);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function PackagesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { data: apiPackages } = trpc.venue.packages.useQuery();
  const displayPackages = apiPackages && apiPackages.length > 0 ? apiPackages : fallbackPackages;

  return (
    <section id="packages" className="relative w-full py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#829796]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#829796] font-medium">
              Packages
            </span>
            <div className="w-8 h-px bg-[#829796]" />
          </div>
          <h2 className="font-serif text-3xl lg:text-5xl text-white mb-4">
            Curated experiences
          </h2>
          <p className="text-[#B0A8A8] max-w-lg mx-auto">
            Each package is designed to provide everything you need for a
            flawless event, from intimate gatherings to grand celebrations.
          </p>
        </motion.div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPackages.map((pkg, i) => {
            const features = pkg.includes ? pkg.includes.split(",") : [];
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative rounded-xl overflow-hidden cursor-pointer"
              >
                {/* Liquid Glass Card */}
                <div
                  className={`liquid-glass rounded-xl overflow-hidden transition-all duration-500 ${
                    isHovered ? "scale-[1.02]" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pkg.imageUrl || "/images/package-fullday.jpg"}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl lg:text-2xl text-white mb-2">
                      {pkg.name}
                    </h3>

                    <div className="flex items-center gap-4 mb-4 text-sm text-[#B0A8A8]">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#829796]" />
                        {pkg.durationHours}h
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#829796]" />
                        up to {pkg.maxCapacity}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {features.slice(0, 5).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-[#B0A8A8]"
                        >
                          <Check className="w-3.5 h-3.5 text-[#829796] mt-0.5 shrink-0" />
                          <span>{feature.trim()}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="text-xs text-[#B0A8A8] uppercase tracking-wider">
                          From
                        </span>
                        <p className="text-xl font-semibold text-[#829796]">
                          {formatPrice(pkg.price)}
                        </p>
                      </div>
                      <Link
                        to="/book"
                        className="flex items-center gap-1.5 text-sm text-[#E33539] hover:text-[#ff4d52] transition-colors group/link"
                      >
                        Book
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
