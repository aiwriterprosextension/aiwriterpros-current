import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsPage = () => {
  const lastUpdated = "January 1, 2024";

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using AIWriterPros services, you agree to be bound by these Terms of Service and all applicable
                laws and regulations. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Service Description</h2>
              <p className="text-muted-foreground">
                AIWriterPros provides AI-powered content generation tools for creating SEO-optimized articles, product reviews,
                and other written content. We reserve the right to modify, suspend, or discontinue any aspect of our services
                at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
              <p className="text-muted-foreground mb-4">You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not attempt to reverse engineer or exploit our systems</li>
                <li>Not share your account with others</li>
                <li>Review and edit AI-generated content before publishing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground">
                Content you create using our services belongs to you. However, you grant us a license to use, store, and process
                your content to provide our services. Our platform, technology, and underlying AI models remain our exclusive property.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
              <p className="text-muted-foreground mb-4">For paid subscriptions:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                <li>All payments are non-refundable except as required by law</li>
                <li>We may change pricing with 30 days notice</li>
                <li>You may cancel your subscription at any time</li>
                <li>Unpaid accounts may be suspended or terminated</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                AIWriterPros is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental,
                special, or consequential damages arising from your use of our services. Our total liability shall not exceed
                the amount you paid us in the past 12 months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Content Accuracy Disclaimer</h2>
              <p className="text-muted-foreground">
                While our AI strives for accuracy, generated content may contain errors or inaccuracies. You are responsible
                for reviewing, fact-checking, and editing all content before publication. We do not guarantee the accuracy,
                completeness, or quality of AI-generated content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate your account at any time for violation of these terms, fraudulent
                activity, or any other reason we deem appropriate. Upon termination, your right to use our services ceases immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
              <p className="text-muted-foreground">
                Any disputes arising from these terms or our services shall be resolved through binding arbitration in accordance
                with the rules of the American Arbitration Association. You waive any right to participate in class action lawsuits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We may modify these terms at any time. We will notify you of significant changes via email or platform notification.
                Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, contact us at:<br />
                Email: legal@aiwriterpros.com<br />
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

export default TermsPage;
