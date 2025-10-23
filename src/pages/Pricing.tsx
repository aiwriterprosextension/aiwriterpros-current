import { Link } from "react-router-dom";
import { CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PricingPage = () => {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for trying out AIWriterPros",
      features: [
        "5 articles per month",
        "All article types",
        "6,000+ word articles",
        "Basic SEO optimization",
        "Schema markup included",
        "Email support",
        "Export to HTML/Markdown",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "Best for serious content creators",
      features: [
        "50 articles per month",
        "All article types",
        "Up to 10,000 words",
        "Advanced SEO optimization",
        "Priority support",
        "API access",
        "Custom templates",
        "Team collaboration (coming soon)",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Business",
      price: "$149",
      period: "/month",
      description: "For agencies and large teams",
      features: [
        "Unlimited articles",
        "All article types",
        "Up to 10,000 words",
        "White-label options",
        "Dedicated support",
        "Custom integrations",
        "Team collaboration",
        "Analytics dashboard",
        "Priority generation",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "Can I change plans later?",
      a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
      q: "What happens if I exceed my article limit?",
      a: "You can purchase additional articles or upgrade to a higher plan. We'll notify you before you hit your limit.",
    },
    {
      q: "Do you offer refunds?",
      a: "Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.",
    },
    {
      q: "Is there a free trial for paid plans?",
      a: "Yes, Pro and Business plans come with a 14-day free trial. No credit card required.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, PayPal, and wire transfers for Business plans.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Absolutely. You can cancel your subscription at any time with no penalties.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that's right for you. All plans include our core features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`card-elevated p-8 relative ${
                tier.popular ? "ring-2 ring-primary shadow-xl" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/dashboard">
                <Button
                  className={`w-full ${
                    tier.popular ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Detailed Feature Comparison</h2>
          <div className="card-elevated overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Free</th>
                  <th className="text-center p-4 font-semibold">Pro</th>
                  <th className="text-center p-4 font-semibold">Business</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Articles per month", "5", "50", "Unlimited"],
                  ["Max word count", "6,000", "10,000", "10,000"],
                  ["All article types", "✓", "✓", "✓"],
                  ["SEO optimization", "Basic", "Advanced", "Advanced"],
                  ["Schema markup", "✓", "✓", "✓"],
                  ["Support", "Email", "Priority", "Dedicated"],
                  ["API access", "—", "✓", "✓"],
                  ["Team collaboration", "—", "—", "✓"],
                  ["White-label", "—", "—", "✓"],
                ].map((row, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="p-4">{row[0]}</td>
                    <td className="p-4 text-center">{row[1]}</td>
                    <td className="p-4 text-center">{row[2]}</td>
                    <td className="p-4 text-center">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card-elevated p-6">
                <h3 className="font-bold mb-2 flex items-center">
                  <HelpCircle className="h-5 w-5 text-primary mr-2" />
                  {faq.q}
                </h3>
                <p className="text-muted-foreground pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;
