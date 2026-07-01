import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Maximize, Car, Sparkles, Wind, ChefHat, Zap, Wifi } from "lucide-react";

const amenities = [
  { icon: Users, label: "500 Guest Capacity" },
  { icon: Maximize, label: "1,200 sqm Floor Area" },
  { icon: Car, label: "200 Parking Spaces" },
  { icon: Wind, label: "Full AC" },
  { icon: Zap, label: "Backup Generator" },
  { icon: ChefHat, label: "Commercial Kitchen" },
  { icon: Sparkles, label: "Bridal Suite" },
  { icon: Wifi, label: "High-Speed Wi-Fi" },
];

const galleryImages = [
  { src: "/images/venue-wedding.jpg", alt: "Wedding setup" },
  { src: "/images/venue-conference.jpg", alt: "Conference setup" },
  { src: "/images/venue-birthday.jpg", alt: "Birthday celebration" },
  { src: "/images/venue-concert.jpg", alt: "Concert stage" },
];

export default function VenueSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="venue" className="relative w-full py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#E33539]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#E33539] font-medium">
                The Venue
              </span>
            </div>

            <h2 className="font-serif text-3xl lg:text-5xl text-white mb-6 leading-tight">
              Where elegance
              <br />
              <span className="text-[#829796]">meets grandeur.</span>
            </h2>

            <p className="text-[#B0A8A8] leading-relaxed mb-6">
              Nestled in the heart of Lekki, Velvet Hall is an architectural
              masterpiece designed to transform your most cherished moments into
              timeless memories. With soaring ceilings adorned with hand-painted
              frescoes, crystal chandeliers that cast ethereal light, and Italian
              marble floors that echo with elegance.
            </p>

            <p className="text-[#B0A8A8] leading-relaxed mb-10">
              Our dedicated team of event specialists ensures every detail is
              executed with precision, from custom lighting design to curated
              catering experiences. The main hall accommodates up to 500 guests,
              while our intimate garden terrace provides a serene outdoor option.
            </p>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 gap-3">
              {amenities.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  <item.icon className="w-4 h-4 text-[#829796]" />
                  <span className="text-sm text-white/80">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image Grid */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-3 lg:gap-4"
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative overflow-hidden rounded-lg group ${
                  i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
