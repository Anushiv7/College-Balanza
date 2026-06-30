import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BarChart3, Wand2, GraduationCap, Github } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useRef } from "react";

const HERO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-32809-large.mp4";
const CTA_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4";

const serif: React.CSSProperties = { fontFamily: "'Instrument Serif', serif", fontWeight: 400 };

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function GlassButton({
  children,
  onClick,
  variant = "glass",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "glass" | "solid";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]";
  const styles =
    variant === "solid"
      ? "bg-white text-black hover:bg-white/90 shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
      : "bg-white/[0.06] text-white border border-white/15 backdrop-blur-xl hover:bg-white/[0.12] hover:border-white/25";
  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  body,
  delay = 0,
}: {
  icon: typeof Sparkles;
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <div
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06] hover:border-white/20 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-2xl mb-3 text-white" style={serif}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/60">{body}</p>
    </div>
  );
}

export default function Landing() {
  const [, navigate] = useLocation();
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force light->dark visual on this page (cinematic).
    document.documentElement.classList.add("dark");
  }, []);

  const goCompare = () => navigate("/compare");

  return (
    <div className="relative min-h-screen bg-[#08080a] text-white overflow-x-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[min(1180px,calc(100%-2rem))] animate-fade-up">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl px-5 py-2.5">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-white/90" />
            <span className="text-[15px] tracking-tight font-medium">College Balanza</span>
          </button>
          <div className="hidden md:flex items-center gap-7 text-[13.5px] text-white/70">
            <button onClick={goCompare} className="hover:text-white transition-colors">Compare</button>
            <button onClick={() => scrollToId("features")} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollToId("rankings")} className="hover:text-white transition-colors">Rankings</button>
            <button onClick={() => scrollToId("about")} className="hover:text-white transition-colors">About</button>
          </div>
          <button
            onClick={goCompare}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-white/[0.08] border border-white/15 text-[13px] hover:bg-white/[0.14] transition-all"
          >
            Get Started <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster=""
          src={HERO_VIDEO}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#08080a]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.05] backdrop-blur-xl text-[12px] text-white/80 mb-8 animate-fade-up">
            <Sparkles className="h-3 w-3" /> AI-powered college intelligence
          </div>

          <h1
            className="text-white text-[clamp(2.75rem,7vw,5.75rem)] leading-[1.02] tracking-[-0.02em] animate-fade-up"
            style={{ ...serif, animationDelay: "120ms" }}
          >
            Choose your college <br className="hidden sm:block" />
            <em className="italic text-white/90">with confidence.</em>
          </h1>

          <p
            className="mt-7 mx-auto max-w-[680px] text-[16.5px] leading-[1.65] text-white/65 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            Compare placements, ROI, tuition fees, campus life, faculty, internships, and student
            experiences using AI-powered insights—all in one place.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            <GlassButton variant="solid" onClick={goCompare}>
              Compare Colleges <ArrowRight className="h-4 w-4" />
            </GlassButton>
            <GlassButton onClick={() => scrollToId("demo")}>See Demo</GlassButton>
          </div>

          <div className="mt-16 animate-fade-up" style={{ animationDelay: "480ms" }}>
            <p className="text-[12px] uppercase tracking-[0.18em] text-white/40">
              Trusted by aspiring engineers, designers, and future innovators
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-white/35 text-[13px]">
              {["IIT Aspirants", "NIT Network", "BITS Circle", "IIIT Forum", "Design Collective"].map((n) => (
                <span key={n} className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5" /> {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative px-6 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[12px] uppercase tracking-[0.2em] text-white/40 mb-4">Features</p>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]" style={serif}>
              Built for the most important decision of your life.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FeatureCard
              icon={Sparkles}
              title="AI College Comparison"
              body="Compare multiple colleges instantly using AI-generated insights synthesized from official sources."
              delay={0}
            />
            <FeatureCard
              icon={BarChart3}
              title="ROI & Placements"
              body="Analyze fees, salary packages, internships, and long-term career outcomes side by side."
              delay={120}
            />
            <FeatureCard
              icon={Wand2}
              title="Smart Recommendations"
              body="Receive personalized college suggestions calibrated to your goals, branch, and budget."
              delay={240}
            />
          </div>
        </div>
      </section>

      {/* RANKINGS / STATS */}
      <section id="rankings" className="relative px-6 py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-[12px] uppercase tracking-[0.2em] text-white/40 mb-4">Rankings</p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] max-w-3xl" style={serif}>
            500+ colleges. 8 metrics. One clear answer.
          </h2>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {[
              { k: "500+", v: "Colleges Indexed" },
              { k: "8", v: "Comparison Metrics" },
              { k: "24/7", v: "AI Insights" },
              { k: "100%", v: "Free to Use" },
            ].map((s) => (
              <div key={s.v} className="bg-[#0c0c10] p-8">
                <div className="text-4xl tracking-tight" style={serif}>{s.k}</div>
                <div className="mt-2 text-[13px] text-white/50">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO placeholder */}
      <section id="demo" className="relative px-6 py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-[12px] uppercase tracking-[0.2em] text-white/40 mb-4">Demo</p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] max-w-3xl" style={serif}>
            A glimpse of the comparison engine.
          </h2>
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl aspect-[16/9] flex items-center justify-center">
            <p className="text-white/40 text-sm">Interactive demo coming soon</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative px-6 py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[12px] uppercase tracking-[0.2em] text-white/40 mb-4">About</p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-[-0.02em]" style={serif}>
            We believe choosing a college shouldn't feel like guesswork.
          </h2>
          <p className="mt-6 text-white/60 text-[16px] leading-[1.7]">
            College Balanza was built to bring clarity to one of the most consequential decisions a
            student makes. We combine official data, real student signals, and AI synthesis to give
            you an honest, side-by-side view.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-32 overflow-hidden border-t border-white/5">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline src={CTA_VIDEO} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080a] via-black/70 to-[#08080a]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.02em]" style={serif}>
            Your future deserves <em className="italic">better decisions.</em>
          </h2>
          <p className="mt-6 text-white/70 max-w-xl mx-auto text-[16px] leading-[1.65]">
            Start comparing colleges today and make one of the most important decisions of your life
            with confidence.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <GlassButton variant="solid" onClick={goCompare}>
              Compare Colleges <ArrowRight className="h-4 w-4" />
            </GlassButton>
            <GlassButton onClick={() => scrollToId("features")}>Learn More</GlassButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/5 px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">College Balanza</span>
          </div>
          <div className="flex items-center gap-7 text-[13px] text-white/55">
            <button onClick={() => scrollToId("features")} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => navigate("/privacy")} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => navigate("/privacy")} className="hover:text-white transition-colors">Terms</button>
            <a href="mailto:hello@collegebalanza.com" className="hover:text-white transition-colors">Contact</a>
            <a
              href="https://github.com/Anushiv7/College-Balanza"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          </div>
          <p className="text-[12px] text-white/35">© 2026 College Balanza</p>
        </div>
      </footer>
    </div>
  );
}
