import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const DEFAULT_STEPS = [
  "Collecting placement data",
  "Analyzing ROI",
  "Comparing faculty",
  "Evaluating campus life",
  "Generating AI verdict",
];

/**
 * Intelligent loading progress. Cycles through named steps with a
 * gold check accent — replaces the generic spinner during comparison.
 */
export function LoadingProgress({
  steps = DEFAULT_STEPS,
  stepMs = 900,
  className = "",
}: {
  steps?: string[];
  stepMs?: number;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (active >= steps.length - 1) return;
    const t = setTimeout(() => setActive((s) => s + 1), stepMs);
    return () => clearTimeout(t);
  }, [active, steps.length, stepMs]);

  return (
    <div
      className={`w-full max-w-md rounded-2xl border p-5 backdrop-blur-xl ${className}`}
      style={{
        background: "linear-gradient(160deg, rgba(27,27,27,0.8), rgba(17,17,17,0.7))",
        borderColor: "rgba(201,162,39,0.25)",
      }}
    >
      <div className="mb-3 text-[12px] uppercase tracking-[0.18em]" style={{ color: "#D4AF37" }}>
        Analyzing
      </div>
      <ul className="space-y-2.5">
        {steps.map((label, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li
              key={label}
              className="flex items-center gap-3 text-[13.5px] transition-all duration-500"
              style={{ opacity: done || current ? 1 : 0.4 }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full border"
                style={{
                  borderColor: done ? "#D4AF37" : "rgba(255,255,255,0.15)",
                  background: done ? "rgba(212,175,55,0.15)" : "transparent",
                }}
              >
                {done ? (
                  <Check className="h-3 w-3" style={{ color: "#D4AF37" }} />
                ) : current ? (
                  <Loader2 className="h-3 w-3 animate-spin" style={{ color: "#D4AF37" }} />
                ) : null}
              </span>
              <span className={done ? "text-white/85" : current ? "text-white" : "text-white/50"}>
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LoadingProgress;
