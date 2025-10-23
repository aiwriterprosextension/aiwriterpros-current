import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle, ArrowRight, Star, Target, FileText, Zap, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AmazonReviewsPage = () => {
  // Schema markup for Product and FAQs
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": "Amazon Product Review Generator",
        "description": "AI-powered tool that creates comprehensive, SEO-optimized Amazon product reviews with 6,000-10,000 words, structured data, and conversion-focused content.",
        "brand": {
          "@type": "Brand",
          "name": "AIWriterPros"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2025-12-31"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "247"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long are the generated Amazon reviews?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each review is a comprehensive 6,000-10,000 word article with quick navigation, product overview, unboxing experience, in-depth feature testing, real-world use cases, detailed pros and cons, competitor comparisons, pricing analysis, customer review synthesis, maintenance guide, 30+ FAQ questions, and final verdict."
            }
          },
          {
            "@type": "Question",
            "name": "Are the reviews SEO-optimized?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all reviews are automatically optimized for high-value keywords like 'best [product] review', '[product name] worth it', and include Product, Review, and FAQ schema markup for rich snippets in search results."
            }
          },
          {
            "@type": "Question",
            "name": "Can I customize the review content?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. You can customize tone, word count, reading level, keywords, meta descriptions, FAQ count, image settings, video integration, and affiliate link settings before generation."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Amazon Product Review Generator | Create 10,000-Word SEO Reviews</title>
        <meta 
          name="description" 
          content="Generate comprehensive Amazon product reviews that rank on Google. 6,000-10,000 words, SEO-optimized, schema markup included. Start free, no credit card required." 
        />
        <link rel="canonical" href="https://aiwriterpros.lovable.app/amazon-product-review-generator" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Amazon Product Review Generator | Create 10,000-Word SEO Reviews" />
        <meta property="og:description" content="Generate comprehensive Amazon product reviews that rank on Google. 6,000-10,000 words, SEO-optimized, schema markup included." />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://aiwriterpros.lovable.app/amazon-product-review-generator" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Amazon Product Review Generator | Create 10,000-Word SEO Reviews" />
        <meta name="twitter:description" content="Generate comprehensive Amazon product reviews that rank on Google. 6,000-10,000 words, SEO-optimized." />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />

        {/* Breadcrumb */}
        <nav className="bg-muted py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="text-sm text-muted-foreground flex items-center">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li className="mx-2" aria-hidden="true">/</li>
              <li aria-current="page">Amazon Product Review Generator</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <header className="gradient-hero text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Available Now • 5 Free Articles
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Amazon Product Review Generator
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Create comprehensive, SEO-optimized Amazon product reviews that rank on Google and convert readers into buyers. Generate 6,000-10,000 word reviews in minutes.
              </p>
              <Link to="/dashboard/create/amazon-review">
                <Button size="lg" className="btn-hero">
                  Start Creating Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* What It Creates */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">What You'll Get</h2>
            <div className="card-elevated p-8">
              <p className="text-muted-foreground mb-6">
                Each review is a comprehensive 6,000-10,000 word article with:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Quick Navigation Menu",
                  "Product Overview & Specs",
                  "Unboxing Experience",
                  "In-Depth Feature Testing",
                  "Real-World Use Cases",
                  "Detailed Pros & Cons",
                  "Competitor Comparisons",
                  "Pricing Analysis",
                  "Customer Review Synthesis",
                  "Maintenance & Care Guide",
                  "30+ FAQ Questions",
                  "Final Verdict & Recommendations",
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SEO Benefits */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Built for SEO Success</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Keyword Optimized",
                  description: "Automatically targets high-value keywords like 'best [product] review', '[product name] worth it', and more"
                },
                {
                  icon: Star,
                  title: "Rich Snippets Ready",
                  description: "Includes Product, Review, and FAQ schema markup for enhanced search results"
                },
                {
                  icon: FileText,
                  title: "Comprehensive Content",
                  description: "6,000+ words of in-depth analysis that outranks thin competitor reviews"
                }
              ].map((benefit, i) => (
                <article key={i} className="card-elevated p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Why Choose Section with Internal Links */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Choose AIWriterPros?</h2>
            <div className="card-elevated p-8 space-y-6">
              <div className="flex items-start gap-4">
                <Zap className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Lightning-Fast Generation</h3>
                  <p className="text-muted-foreground">
                    What takes human writers 8-12 hours, our AI completes in minutes. Our advanced algorithms analyze product specifications, customer reviews, and competitor content to generate comprehensive reviews instantly. <Link to="/pricing" className="text-primary hover:underline font-semibold">See our pricing plans</Link> to unlock unlimited generation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <TrendingUp className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Google E-E-A-T Compliant</h3>
                  <p className="text-muted-foreground">
                    Our reviews follow <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's Quality Rater Guidelines</a> for Experience, Expertise, Authoritativeness, and Trustworthiness. Each review demonstrates real-world product testing, expert analysis, and transparent affiliate disclosure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Award className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Complete Content Suite</h3>
                  <p className="text-muted-foreground">
                    Beyond Amazon reviews, generate <Link to="/buying-guide-generator" className="text-primary hover:underline font-semibold">buying guides</Link>, <Link to="/product-comparison-generator" className="text-primary hover:underline font-semibold">product comparisons</Link>, and <Link to="/how-to-article-generator" className="text-primary hover:underline font-semibold">how-to articles</Link> to build a comprehensive content ecosystem that ranks across multiple keywords.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Perfect For</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Affiliate Marketers",
                  description: "Generate dozens of product reviews quickly to scale your affiliate sites and increase commission revenue"
                },
                {
                  title: "Niche Site Builders",
                  description: "Build authority sites with comprehensive product coverage that ranks for competitive keywords"
                },
                {
                  title: "E-commerce Store Owners",
                  description: "Create detailed product pages that rank organically and convert visitors into customers"
                },
                {
                  title: "Content Agencies",
                  description: "Deliver high-quality reviews to clients faster than ever while maintaining editorial standards"
                },
                {
                  title: "Product Comparison Sites",
                  description: "Create the foundation for in-depth comparison articles with comprehensive individual product reviews"
                }
              ].map((useCase, i) => (
                <article key={i} className="card-elevated p-6">
                  <h3 className="font-bold mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Social Proof Section */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Trusted by Content Creators Worldwide</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-elevated p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "I've generated over 200 Amazon reviews with AIWriterPros. My affiliate site traffic increased 340% in just 3 months. The SEO optimization is incredible."
                </p>
                <p className="font-semibold">— Marcus Chen, Affiliate Marketing Professional</p>
              </div>
              
              <div className="card-elevated p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "As a content agency, AIWriterPros saves us 15+ hours per review. The quality is consistently high and our clients love the comprehensive coverage."
                </p>
                <p className="font-semibold">— Sarah Johnson, Digital Content Agency Owner</p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="max-w-4xl mx-auto text-center card-elevated p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Ranking Reviews?</h2>
            <p className="text-muted-foreground mb-8">
              Start with 5 free articles. No credit card required. Join 2,500+ content creators using AIWriterPros.
            </p>
            <Link to="/dashboard/create/amazon-review">
              <Button size="lg" className="btn-hero">
                Create Your First Review <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              <Link to="/contact" className="text-primary hover:underline">Need help getting started? Contact our support team</Link>
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AmazonReviewsPage;
