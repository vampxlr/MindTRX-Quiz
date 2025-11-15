import { NeuronBackground } from '@/components/neuron-background';

export default function PrivacyPage() {
  return (
    <>
      <NeuronBackground />
      
      <div className="relative z-10 min-h-[calc(100vh-8rem)] py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl font-orbitron font-bold mb-8 glow-text">Privacy Policy</h1>
            
            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Data Collection</h2>
                <p>
                  MINDTRX (Inner Mind Integration Inventory) is designed with your privacy in mind. 
                  Your assessment responses are stored locally in your browser using localStorage by default.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">What We Store</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your quiz answers (stored in your browser)</li>
                  <li>Your calculated scores and results</li>
                  <li>A unique result code for accessing your results</li>
                  <li>Theme preferences (dark/bright mode)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Optional Data Storage</h2>
                <p>
                  If you choose to email your results, we temporarily process your email address 
                  to send you the report. We do not store email addresses or use them for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
                <p>
                  Your data remains on your device unless you explicitly choose to share it. 
                  Result codes are randomly generated and do not contain personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies & Tracking</h2>
                <p>
                  MINDTRX does not use cookies for tracking or analytics. We only use localStorage 
                  for essential functionality (saving your quiz progress and theme preference).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
                <p>
                  You can clear your data at any time by clearing your browser's localStorage. 
                  Your assessment results are tied to your result code, which you control.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
                <p>
                  This application uses Three.js for visual effects and Framer Motion for animations. 
                  These libraries do not collect personal data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Privacy Policy</h2>
                <p>
                  We may update this privacy policy from time to time. Any changes will be reflected 
                  on this page with an updated revision date.
                </p>
              </section>

              <section className="pt-6 border-t border-border">
                <p className="text-sm">
                  <strong>Last Updated:</strong> November 15, 2025
                </p>
                <p className="text-sm mt-4">
                  If you have any questions about this privacy policy, please contact us through our website.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

