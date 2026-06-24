import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useLocation } from "wouter";

export default function Privacy() {
  const { theme, toggleTheme } = useTheme();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/50 border-b border-accent/30">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            College Balanza
          </button>
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-12">
        <div className="container max-w-3xl">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 text-white">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: June 24, 2026
            </p>
          </div>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            {/* Introduction */}
            <section className="bg-card/50 border border-accent/30 rounded-lg p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                College Balanza ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our college comparison services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="bg-card/50 border border-accent/30 rounded-lg p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-2">Personal Information</h3>
                  <p>
                    When you create an account or use our services, we collect information such as your name, email address, and authentication credentials. This information is used to provide you with personalized college comparison experiences and maintain your comparison history.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-2">Usage Data</h3>
                  <p>
                    We automatically collect information about your interactions with our platform, including the colleges you search for, comparisons you make, and features you use. This helps us improve our services and provide better recommendations.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-2">Device Information</h3>
                  <p>
                    We collect information about the devices you use to access College Balanza, including device type, operating system, and browser type. This information helps us optimize our platform for different devices and browsers.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="bg-card/50 border border-accent/30 rounded-lg p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>Provide and maintain our college comparison services</li>
                <li>Generate personalized AI-powered comparison summaries</li>
                <li>Store and retrieve your comparison history</li>
                <li>Improve and optimize our platform and user experience</li>
                <li>Send you updates about new features or colleges added to our database</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Comply with legal obligations and enforce our terms of service</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="bg-card/50 border border-accent/30 rounded-lg p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Your data is encrypted in transit and at rest. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section className="bg-card/50 border border-accent/30 rounded-lg p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
              <p>
                We retain your personal information for as long as your account is active or as needed to provide you with our services. You can request deletion of your account and associated data at any time by contacting us. Some information may be retained for legal or operational purposes.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="bg-card/50 border border-accent/30 rounded-lg p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">6. Third-Party Services</h2>
              <p>
                College Balanza uses third-party services for authentication (Manus OAuth), database management (Supabase), and AI-powered analysis (LLM services). These third parties have their own privacy policies, and we encourage you to review them. We do not share your personal information with third parties for their marketing purposes without your consent.
              </p>
            </section>

            {/* Your Rights */}
            <section className="bg-card/50 border border-accent/30 rounded-lg p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate data</li>
                <li>The right to request deletion of your data</li>
                <li>The right to opt-out of certain data processing activities</li>
                <li>The right to data portability</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at privacy@collegebalanza.com.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="bg-card/50 border border-accent/30 rounded-lg p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date at the top of this page.
              </p>
            </section>

            {/* Contact Us */}
            <section className="bg-card/50 border border-accent/30 rounded-lg p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong className="text-accent">Email:</strong> privacy@collegebalanza.com
                </p>
                <p>
                  <strong className="text-accent">Website:</strong> www.collegebalanza.com
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-8 backdrop-blur">
              <p className="text-center text-accent font-semibold">
                By using College Balanza, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 flex justify-center">
            <Button
              onClick={() => navigate('/')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-accent/20 py-8 bg-background/50 backdrop-blur">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 College Balanza. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
