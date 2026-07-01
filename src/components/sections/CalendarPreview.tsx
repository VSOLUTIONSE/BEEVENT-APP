import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

// Demo blocked dates for visual
const demoBlockedDates = [
  new Date(2026, 5, 5),
  new Date(2026, 5, 12),
  new Date(2026, 5, 14),
  new Date(2026, 5, 15),
  new Date(2026, 5, 20),
  new Date(2026, 5, 21),
  new Date(2026, 5, 28),
];

const demoBookedDates = [
  new Date(2026, 5, 7),
  new Date(2026, 5, 8),
  new Date(2026, 5, 18),
  new Date(2026, 5, 19),
  new Date(2026, 5, 25),
  new Date(2026, 5, 26),
];

export default function CalendarPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 1));

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const calStart = startOfWeek(monthStart);
    const calEnd = endOfWeek(monthEnd);

    const days: Date[] = [];
    let day = calStart;
    while (day <= calEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const getDayStatus = (day: Date) => {
    if (demoBlockedDates.some((d) => isSameDay(d, day))) return "blocked";
    if (demoBookedDates.some((d) => isSameDay(d, day))) return "booked";
    return "available";
  };

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <section id="calendar" className="relative w-full py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass rounded-2xl p-6 lg:p-8"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl text-white">
                {format(currentMonth, "MMMM yyyy")}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-white/70" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-white/70" />
                </button>
              </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs text-[#B0A8A8] uppercase tracking-wider py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                const inMonth = isSameMonth(day, currentMonth);
                const status = getDayStatus(day);

                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className={`
                      relative aspect-square rounded-lg flex items-center justify-center text-sm transition-all duration-200
                      ${!inMonth ? "text-white/20" : "text-white/90"}
                      ${status === "blocked" && inMonth ? "bg-white/[0.03] line-through decoration-[#E33539] decoration-2" : ""}
                      ${status === "booked" && inMonth ? "bg-[#E33539]/20 text-[#E33539]" : ""}
                      ${status === "available" && inMonth ? "hover:bg-[#829796]/20 cursor-pointer" : ""}
                    `}
                  >
                    {format(day, "d")}
                    {status === "booked" && inMonth && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E33539]" />
                    )}
                    {status === "available" && inMonth && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#829796]/50" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#829796]" />
                <span className="text-xs text-[#B0A8A8]">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E33539]" />
                <span className="text-xs text-[#B0A8A8]">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-xs text-[#B0A8A8]">Blocked</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays className="w-5 h-5 text-[#E33539]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#E33539] font-medium">
                Availability
              </span>
            </div>

            <h2 className="font-serif text-3xl lg:text-5xl text-white mb-6 leading-tight">
              Plan your perfect
              <br />
              <span className="text-[#829796]">date with us.</span>
            </h2>

            <p className="text-[#B0A8A8] leading-relaxed mb-6">
              Our real-time availability calendar helps you find the perfect
              date for your event. Booked dates are marked in red, while blocked
              dates indicate maintenance or private holds. Every booking
              includes a 2-hour setup and teardown buffer.
            </p>

            <p className="text-[#B0A8A8] leading-relaxed mb-10">
              For weekend celebrations and peak season events, we recommend
              booking at least 3 months in advance to secure your preferred
              dates.
            </p>

            <Link
              to="/book"
              className="btn-pill-primary inline-flex group"
            >
              Check Full Calendar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
