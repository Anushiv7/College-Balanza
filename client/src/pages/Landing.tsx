import { ArrowRight, Sparkles, BarChart3, Wand2, Github, ShieldCheck, TrendingUp, Users, FileCheck2, Eye } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { FloatingFeatureCard } from "@/components/FloatingFeatureCard";

const HERO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-32809-large.mp4";
const CTA_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4";

const serif: React.CSSProperties = { fontFamily: "'Instrument Serif', serif", fontWeight: 400 };

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Unified button system: primary (gold), secondary (dark + gold border), ghost. */
function CBButton({
  children,
  onClick,
  variant = "ghost",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-[13.5px] font-medium tracking-tight transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40";
  const styles =
    variant === "primary"
      ? "text-black shadow-[0_10px_40px_-10px_rgba(212,175,55,0.55)]"
      : variant === "secondary"
      ? "text-white border border-[color:var(--cb-border-gold)] bg-[#111111]/60 backdrop-blur-xl hover:bg-[#171717]/80"
      : "text-white/85 border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.08] hover:text-white";
  const style =
    variant === "primary"
      ? { background: "linear-gradient(135deg, #E7C558 0%, #D4AF37 55%, #B8912A 100%)" }
      : undefined;
  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`} style={style}>
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
      className="group relative rounded-2xl border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 cb-float-card"
      style={{
        animationDelay: `${delay}ms`,
        borderColor: "rgba(201,162,39,0.22)",
        background: "linear-gradient(160deg, rgba(27,27,27,0.7), rgba(17,17,17,0.55))",
        boxShadow: "0 30px 80px -40px rgba(212,175,55,0.25)",
      }}
    >
      <div
        className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border"
        style={{
          borderColor: "rgba(212,175,55,0.35)",
          background: "linear-gradient(135deg, rgba(212,175,55,0.14), rgba(154,123,32,0.05))",
          color: "#E7C558",
        }}
      >
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

  useEffect(() => {
    // Force dark visual on this cinematic page.
    document.documentElement.classList.add("dark");
  }, []);

  const goCompare = () => navigate("/compare");

  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-white"
      style={{ background: "#080808", fontFamily: "Inter, sans-serif" }}
    >
      {/* NAV */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[min(1180px,calc(100%-2rem))]">
        <div
          className="flex items-center justify-between rounded-full border px-5 py-2.5 backdrop-blur-2xl"
          style={{
            borderColor: "rgba(201,162,39,0.25)",
            background: "rgba(8,8,8,0.55)",
            boxShadow: "0 10px 40px -20px rgba(212,175,55,0.25)",
          }}
        >
          <button onClick={() => navigate("/")} className="flex items-center">
            <BrandLogo size={26} />
          </button>
          <div className="hidden md:flex items-center gap-7 text-[13px] text-white/65">
            <button onClick={goCompare} className="hover:text-white transition-colors">Compare</button>
            <button onClick={() => scrollToId("features")} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollToId("rankings")} className="hover:text-white transition-colors">Rankings</button>
            <button onClick={() => scrollToId("about")} className="hover:text-white transition-colors">About</button>
          </div>
          <button
            onClick={goCompare}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-medium text-black transition-all hover:-translate-y-[1px]"
            style={{ background: "linear-gradient(135deg, #E7C558, #D4AF37 60%, #B8912A)" }}
          >
            Get Started <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>

      {/* HERO — split layout */}
      <section className="relative min-h-screen flex items-center px-6 pt-32 pb-24">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
          src={HERO_VIDEO}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.7) 50%, #080808 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(600px 400px at 20% 40%, rgba(212,175,55,0.10), transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: content */}
          <div className="lg:col-span-7">
            <div
              className="cb-float-card inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] mb-8 backdrop-blur-xl"
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "rgba(212,175,55,0.35)",
                background: "rgba(212,175,55,0.06)",
                color: "#E7C558",
              }}
            >
              <Sparkles className="h-3 w-3" /> AI-powered college intelligence
            </div>

            <h1
              className="text-white text-[clamp(2.6rem,6.5vw,5.25rem)] leading-[1.03] tracking-[-0.02em] cb-float-card"
              style={{ ...serif, animationDelay: "120ms" }}
            >
              Choose your college <br className="hidden sm:block" />
              <em className="italic gradient-text">with confidence.</em>
            </h1>

            <p
              className="mt-7 max-w-[560px] text-[16px] leading-[1.65] text-white/65 cb-float-card"
              style={{ animationDelay: "240ms" }}
            >
              Compare placements, ROI, tuition fees, campus life, faculty, internships, and student
              experiences using AI-powered insights—all in one place.
            </p>

            <div
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 cb-float-card"
              style={{ animationDelay: "360ms" }}
            >
              <CBButton variant="primary" onClick={goCompare}>
                Compare Colleges <ArrowRight className="h-4 w-4" />
              </CBButton>
              <CBButton variant="secondary" onClick={() => scrollToId("demo")}>
                See Demo
              </CBButton>
            </div>

            <div
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-white/45 cb-float-card"
              style={{ animationDelay: "480ms" }}
            >
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" style={{ color: "#D4AF37" }} /> Cited sources</span>
              <span className="inline-flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" style={{ color: "#D4AF37" }} /> Anonymous by default</span>
              <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" style={{ color: "#D4AF37" }} /> Free to use</span>
            </div>
          </div>

          {/* Right: floating feature cards */}
          <div className="lg:col-span-5 relative h-[440px] hidden lg:block">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-[260px] animate-float">
                <FloatingFeatureCard
                  icon={Sparkles}
                  title="AI Verdict"
                  description="A synthesized recommendation with confidence score."
                  delay={200}
                />
              </div>
              <div className="absolute top-12 right-0 w-[240px] animate-float-slow">
                <FloatingFeatureCard
                  icon={TrendingUp}
                  title="ROI Analysis"
                  description="Fees vs. median outcome, projected over 4 years."
                  delay={340}
                />
              </div>
              <div className="absolute top-[180px] left-6 w-[250px] animate-float-slow">
                <FloatingFeatureCard
                  icon={BarChart3}
                  title="Placement Insights"
                  description="Median, top, and dispersion of recent packages."
                  delay={480}
                />
              </div>
              <div className="absolute top-[210px] right-4 w-[230px] animate-float">
                <FloatingFeatureCard
                  icon={Users}
                  title="Faculty Reviews"
                  description="Signal aggregated from verified student sources."
                  delay={620}
                />
              </div>
              <div className="absolute bottom-2 left-0 w-[240px] animate-float">
                <FloatingFeatureCard
                  icon={FileCheck2}
                  title="Transparent Sources"
                  description="Every metric links back to an official citation."
                  delay={760}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative px-6 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[12px] uppercase tracking-[0.2em] mb-4" style={{ color: "#D4AF37" }}>Features</p>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]" style={serif}>
              Built for the most important decision of your life.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FeatureCard icon={Sparkles} title="AI College Comparison" body="Compare multiple colleges instantly using AI-generated insights synthesized from official sources." delay={0} />
            <FeatureCard icon={BarChart3} title="ROI & Placements" body="Analyze fees, salary packages, internships, and long-term career outcomes side by side." delay={120} />
            <FeatureCard icon={Wand2} title="Smart Recommendations" body="Receive personalized college suggestions calibrated to your goals, branch, and budget." delay={240} />
          </div>
        </div>
      </section>

      {/* RANKINGS / STATS */}
      <section id="rankings" className="relative px-6 py-32 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-[12px] uppercase tracking-[0.2em] mb-4" style={{ color: "#D4AF37" }}>Rankings</p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] max-w-3xl" style={serif}>
            500+ colleges. 8 metrics. One clear answer.
          </h2>
          <div
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border"
            style={{ borderColor: "rgba(201,162,39,0.18)", background: "rgba(201,162,39,0.12)" }}
          >
            {[
              { k: "500+", v: "Colleges Indexed" },
              { k: "8", v: "Comparison Metrics" },
              { k: "24/7", v: "AI Insights" },
              { k: "100%", v: "Free to Use" },
            ].map((s) => (
              <div key={s.v} className="p-8" style={{ background: "#0c0c0c" }}>
                <div className="text-4xl tracking-tight gradient-text" style={serif}>{s.k}</div>
                <div className="mt-2 text-[13px] text-white/50">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="relative px-6 py-32 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-[12px] uppercase tracking-[0.2em] mb-4" style={{ color: "#D4AF37" }}>Demo</p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] max-w-3xl" style={serif}>
            A glimpse of the comparison engine.
          </h2>
          <div
            className="mt-12 rounded-2xl border backdrop-blur-xl aspect-[16/9] flex items-center justify-center"
            style={{
              borderColor: "rgba(201,162,39,0.22)",
              background: "linear-gradient(160deg, rgba(27,27,27,0.7), rgba(17,17,17,0.55))",
            }}
          >
            <p className="text-white/40 text-sm">Interactive demo coming soon</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative px-6 py-32 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[12px] uppercase tracking-[0.2em] mb-4" style={{ color: "#D4AF37" }}>About</p>
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
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-32 overflow-hidden border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <video className="absolute inset-0 h-full w-full object-cover opacity-40" autoPlay muted loop playsInline src={CTA_VIDEO} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #080808 0%, rgba(8,8,8,0.7) 50%, #080808 100%)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.02em]" style={serif}>
            Your future deserves <em className="italic gradient-text">better decisions.</em>
          </h2>
          <p className="mt-6 text-white/65 max-w-xl mx-auto text-[16px] leading-[1.65]">
            Start comparing colleges today and make one of the most important decisions of your life
            with confidence.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <CBButton variant="primary" onClick={goCompare}>
              Compare Colleges <ArrowRight className="h-4 w-4" />
            </CBButton>
            <CBButton variant="secondary" onClick={() => scrollToId("features")}>Learn More</CBButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t px-6 py-12" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <BrandLogo size={22} />
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
