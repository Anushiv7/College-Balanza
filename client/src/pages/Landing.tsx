import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";

export default function Landing() {
  const { user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [, navigate] = useLocation();

  const handleStartComparing = () => {
    if (isAuthenticated) {
      navigate("/compare");
    } else {
      window.location.href = getLoginUrl();
      // After login, user will be redirected to /compare
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/50 border-b border-accent/30">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold gradient-text">College Balanza</div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            {isAuthenticated && (
              <div className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center relative pt-20">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-hero text-white mb-4">
                Find Your Perfect College
              </h1>
              <p className="text-subtitle text-white/80 max-w-md">
                Compare colleges side-by-side across placements, fees, faculty, and more. Make informed decisions with AI-powered insights.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartComparing}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                Start Comparing
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/privacy")}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div>
                <div className="text-3xl font-bold gradient-text">500+</div>
                <p className="text-sm text-white/60">Colleges Indexed</p>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">8</div>
                <p className="text-sm text-white/60">Comparison Metrics</p>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Product Card */}
          <div className="relative h-96 lg:h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-cyan-500/20 rounded-3xl blur-3xl animate-pulse" />
            
            <div className="relative animate-float">
              <div className="bg-card border border-accent/30 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center">
                      <span className="text-white font-bold">CB</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Compare Colleges</h3>
                      <p className="text-xs text-muted-foreground">AI-Powered Analysis</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      "Placements & Salary",
                      "Faculty Quality",
                      "Campus Life",
                      "ROI & Value",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-accent/30">
                    <p className="text-xs text-muted-foreground">
                      Real-time data from 500+ colleges
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Why Choose College Balanza?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Data",
                description: "AI-powered web scraping fetches the latest college information from official sources.",
              },
              {
                title: "Comprehensive Comparison",
                description: "Compare 8 key metrics: placements, location, faculty, fees, ROI, industry value, brand, and college life.",
              },
              {
                title: "Smart Insights",
                description: "LLM-generated summaries synthesize complex college data into actionable insights.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-card/50 backdrop-blur border border-accent/20 rounded-xl p-6 hover:border-accent/50 transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/20 py-8 bg-background/50 backdrop-blur">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 College Balanza. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => navigate("/privacy")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
