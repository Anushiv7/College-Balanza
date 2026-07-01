import type { LucideIcon } from "lucide-react";

/**
 * Floating glass feature card used in the hero split layout.
 * Gold-bordered, subtle blur, staggered entrance handled via inline delay.
 */
export function FloatingFeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  offsetX = 0,
  offsetY = 0,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  offsetX?: number;
  offsetY?: number;
}) {
  return (
    <div
      className="cb-float-card group rounded-2xl border p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1"
      style={{
        animationDelay: `${delay}ms`,
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        background: "linear-gradient(160deg, rgba(27,27,27,0.72) 0%, rgba(17,17,17,0.6) 100%)",
        borderColor: "rgba(201,162,39,0.28)",
        boxShadow: "0 20px 60px -30px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
          style={{
            borderColor: "rgba(212,175,55,0.35)",
            background: "linear-gradient(135deg, rgba(212,175,55,0.14), rgba(154,123,32,0.06))",
            color: "#E7C558",
          }}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="text-[13.5px] font-medium text-white tracking-tight">{title}</div>
          <div className="mt-1 text-[12px] leading-relaxed text-white/55">{description}</div>
        </div>
      </div>
    </div>
  );
}

export default FloatingFeatureCard;
