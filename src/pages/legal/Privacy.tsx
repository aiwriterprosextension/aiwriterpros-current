import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPage = () => {
  const lastUpdated = "January 1, 2024";

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground">
                AIWriterPros ("we," "our," or "us") respects your privacy and is committed to protecting your personal data.
                This privacy policy explains how we collect, use, and safeguard your information when you use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">We collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Account information (name, email address)</li>
                <li>Usage data (articles created, features used)</li>
                <li>Technical data (IP address, browser type, device information)</li>
                <li>Payment information (processed securely by third-party providers)</li>
                <li>Content you create using our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use your data to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide and maintain our services</li>
                <li>Process your transactions</li>
                <li>Send you updates and marketing communications (with your consent)</li>
                <li>Improve our services and develop new features</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Storage and Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your data against unauthorized access,
                alteration, disclosure, or destruction. Your data is stored on secure servers with encryption both in transit and at rest.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and personalize content.
                You can control cookie preferences through your browser settings. See our Cookie Policy for more details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground">
                We may share your data with trusted third-party service providers who assist us in operating our services,
                such as payment processors, analytics providers, and cloud hosting services. These providers are contractually
                obligated to protect your data and use it only for specified purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information
                from children. If you believe we have collected data from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy
                on this page and updating the "Last Updated" date. Continued use of our services after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this privacy policy or wish to exercise your rights, please contact us at:
              </p>
              <p className="text-muted-foreground mt-4">
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

export default PrivacyPage;
