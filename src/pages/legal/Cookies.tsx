import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiesPage = () => {
  const lastUpdated = "January 1, 2024";

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
              <p className="text-muted-foreground">
                Cookies are small text files placed on your device when you visit our website. They help us provide you with
                a better experience by remembering your preferences, analyzing site usage, and personalizing content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Essential Cookies</h3>
              <p className="text-muted-foreground">
                These cookies are necessary for our website to function properly. They enable core functionality such as
                security, network management, and accessibility.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Analytics Cookies</h3>
              <p className="text-muted-foreground">
                These cookies help us understand how visitors interact with our website by collecting and reporting information
                anonymously. This helps us improve our services.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Functional Cookies</h3>
              <p className="text-muted-foreground">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences and
                settings.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Marketing Cookies</h3>
              <p className="text-muted-foreground">
                These cookies track your browsing habits to deliver advertisements more relevant to you and your interests.
                They may be set by third-party advertising networks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We use services from trusted third parties that may set cookies on your device:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Google Analytics - for website analytics</li>
                <li>Payment processors - for secure transaction processing</li>
                <li>Social media platforms - for social sharing features</li>
                <li>Advertising networks - for targeted advertising</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Browser settings: Most browsers allow you to refuse or delete cookies</li>
                <li>Third-party tools: Use cookie management tools and browser extensions</li>
                <li>Opt-out links: Visit third-party websites to opt out of their cookies</li>
                <li>Do Not Track: Enable Do Not Track signals in your browser</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Note that blocking certain cookies may impact your experience and limit functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cookie Duration</h2>
              <p className="text-muted-foreground mb-4">We use both session and persistent cookies:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Session cookies:</strong> Temporary cookies that expire when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain on your device until expiry date or manual deletion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our
                business practices. Please check this page periodically for updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about our use of cookies, please contact us at:<br />
                Email: privacy@aiwriterpros.com<br />
                Address: 123 Innovation Drive, San Francisco, CA 94105
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiesPage;
