import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { colors, formInput, chip } from "./tokens";

/* ─── Glass Card ─────────────────────────── */
interface GlassCardProps extends HTMLMotionProps<"div"> {
  strong?: boolean;
}

export function GlassCard({ strong, className, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        strong
          ? "rounded-2xl bg-gradient-to-b from-white/[0.18] to-white/[0.08] backdrop-blur-[12px] saturate-[150%] border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.4)]"
          : "rounded-xl bg-gradient-to-b from-white/[0.12] to-white/[0.05] backdrop-blur-[6px] saturate-[140%] border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3)]",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── Overline Label (decorative section eyebrow) ─── */
interface OverlineProps {
  label: string;
  color?: "teal" | "red";
  className?: string;
}

export function Overline({ label, color = "teal", className }: OverlineProps) {
  const accentColor = color === "red" ? colors.brand.red : colors.brand.teal;
  return (
    <div className={cn("flex items-center gap-3 mb-6", className)}>
      <div className="w-8 h-px shrink-0" style={{ backgroundColor: accentColor }} />
      <span
        className="text-xs uppercase tracking-[0.2em] font-medium"
        style={{ color: accentColor }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Section Heading (title + subtitle) ─── */
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      <h2 className="font-serif text-3xl lg:text-5xl text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#B0A8A8] max-w-lg mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

/* ─── Section Wrapper ──────────────────────────── */
interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative w-full py-24 lg:py-32", className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}

/* ─── Form Field ────────────────────────────── */
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-xs uppercase tracking-wider text-[#B0A8A8]">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ─── Styled Input ──────────────────────────── */
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function FormInput({ className, ...props }: FormInputProps) {
  return <input className={cn(formInput, className)} {...props} />;
}

/* ─── Styled Textarea ────────────────────────── */
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function FormTextarea({ className, ...props }: FormTextareaProps) {
  return (
    <textarea
      className={cn(formInput, "resize-none", className)}
      {...props}
    />
  );
}

/* ─── Status Badge ────────────────────────── */
interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusClass = (chip as Record<string, string>)[
    status
      .replace("pending_approval", "amber")
      .replace("pending_payment", "blue")
      .replace("cancelled_by_customer", "red")
      .replace("cancelled_by_staff", "red")
      .replace("rejected", "red")
      .replace("in_progress", "emerald")
      .replace("confirmed", "teal")
      .replace("completed", "teal")
      .replace("draft", "ghost")
  ] || chip.ghost;

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs capitalize", statusClass)}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

/* ─── Pill Buttons (mapped from CSS classes to components) ─── */
interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  as?: "button" | "a";
  href?: string;
}

export function PillButton({
  variant = "primary",
  className,
  children,
  ...props
}: PillButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300",
        variant === "primary"
          ? "bg-[#E33539] text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-[#E33539]/25"
          : "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-[1.02]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ─── Stat Card (used in dashboards) ─── */
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  delay?: number;
}

export function StatCard({ label, value, icon: Icon, color = "text-white", delay = 0 }: StatCardProps) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={cn("w-4 h-4", color)} />
        <span className="text-xs text-[#B0A8A8] uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className={cn("font-serif text-2xl lg:text-3xl", color)}>{value}</p>
    </GlassCard>
  );
}

/* ─── Section Layout (two-column) ─── */
interface TwoColumnSectionProps {
  id?: string;
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  reverse?: boolean;
}

export function TwoColumnSection({ id, left, right, className, reverse }: TwoColumnSectionProps) {
  return (
    <Section id={id} className={className}>
      <div
        className={cn(
          "grid lg:grid-cols-2 gap-12 lg:gap-20 items-start",
          reverse && "direction-ltr",
        )}
      >
        <div className={reverse ? "lg:order-2" : ""}>{left}</div>
        <div className={reverse ? "lg:order-1" : ""}>{right}</div>
      </div>
    </Section>
  );
}

/* ─── Icon Badge (small circle with icon) ─── */
interface IconBadgeProps {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function IconBadge({ icon: Icon, className }: IconBadgeProps) {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-lg bg-[#829796]/10 flex items-center justify-center",
        className,
      )}
    >
      <Icon className="w-5 h-5 text-[#829796]" />
    </div>
  );
}
