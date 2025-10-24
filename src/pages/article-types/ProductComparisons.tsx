import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Target, TrendingUp, Users, ChevronRight, Zap, Award, BarChart3, Eye, ShoppingCart } from "lucide-react";

const ProductComparisonsPage = () => {
  return (
    <>
      <Helmet>
        <title>Product Comparison Generator | AIWriterPros - Create Data-Driven Comparison Articles</title>
        <meta 
          name="description" 
          content="Generate comprehensive product comparison articles with side-by-side analysis, feature tables, and winner declarations. Perfect for affiliate marketers." 
        />
        <meta name="keywords" content="product comparison generator, comparison articles, side-by-side product analysis, affiliate marketing comparisons, SEO comparison content" />
        <link rel="canonical" href="https://aiwriterpros.com/product-comparisons" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Product Comparison Generator | AIWriterPros" />
        <meta property="og:description" content="Generate comprehensive product comparison articles with side-by-side analysis, feature tables, and winner declarations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aiwriterpros.com/product-comparisons" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Product Comparison Generator | AIWriterPros" />
        <meta name="twitter:description" content="Generate comprehensive product comparison articles with side-by-side analysis, feature tables, and winner declarations." />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Product Comparison Article Generator",
            "description": "AI-powered tool to generate comprehensive product comparison articles with feature tables and analysis",
            "brand": {
              "@type": "Brand",
              "name": "AIWriterPros"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />

        {/* Breadcrumb Navigation */}
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-4 w-4 text-muted-foreground" /></li>
            <li className="text-foreground font-medium">Product Comparisons</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-accent/20 px-4 py-2 rounded-full text-sm font-semibold text-accent mb-6 backdrop-blur-sm">
                ⚡ Data-Driven Comparison Content
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Product Comparison Generator
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-foreground/90">
                Create comprehensive side-by-side product comparisons with detailed feature tables, 
                pros/cons analysis, and clear winner declarations that help readers make informed decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard/create/product-comparison">
                  <Button size="lg" className="btn-hero">
                    Generate Comparison <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" className="btn-secondary-hero">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Get Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">What Your Comparison Article Includes</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: BarChart3, title: "Side-by-Side Comparison Tables", desc: "Professional tables comparing specs, features, and pricing across all products" },
                  { icon: Award, title: "Winner Declaration", desc: "Clear recommendation with justification based on value, performance, or use case" },
                  { icon: CheckCircle, title: "Detailed Pros & Cons", desc: "Honest analysis of advantages and limitations for each product" },
                  { icon: Target, title: "Use Case Matching", desc: "Best product recommendations for different user needs and budgets" },
                  { icon: Zap, title: "Key Differences Highlighted", desc: "Focus on what truly sets each product apart from competitors" },
                  { icon: Eye, title: "Visual Comparison Guides", desc: "Optimized for infographics and visual content creation" },
                  { icon: ShoppingCart, title: "Price-to-Value Analysis", desc: "Help readers understand which product offers the best value" },
                  { icon: Users, title: "User Experience Insights", desc: "Real-world usage scenarios and customer satisfaction analysis" },
                  { icon: TrendingUp, title: "Performance Metrics", desc: "Objective performance data and benchmark comparisons" },
                  { icon: CheckCircle, title: "FAQ Schema Integration", desc: "Built-in FAQ sections optimized for Google rich snippets" },
                  { icon: Award, title: "Affiliate Link Integration", desc: "Seamlessly integrate your affiliate links for each product" },
                  { icon: BarChart3, title: "Scoring System", desc: "Transparent rating methodology with category-specific scores" }
                ].map((feature, index) => (
                  <div key={index} className="card-elevated p-6 hover:shadow-lg transition-shadow">
                    <feature.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">SEO Optimized for Comparison Keywords</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="card-elevated p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Comparison Search Intent</h3>
                  <p className="text-muted-foreground">
                    Optimized for high-intent keywords like "X vs Y" and "best [product] comparison" that drive conversions.
                  </p>
                </div>
                <div className="card-elevated p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Featured Snippets Ready</h3>
                  <p className="text-muted-foreground">
                    Structured comparison tables and FAQ sections designed to capture Google featured snippets.
                  </p>
                </div>
                <div className="card-elevated p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">E-E-A-T Compliant</h3>
                  <p className="text-muted-foreground">
                    Demonstrates expertise through detailed analysis and transparent methodology aligned with <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's quality guidelines</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Perfect For These Comparison Scenarios</h2>
              <div className="space-y-6">
                {[
                  { title: "Tech Product Comparisons", example: "iPhone 15 vs Samsung Galaxy S24 vs Google Pixel 8" },
                  { title: "Software & Tool Comparisons", example: "Shopify vs WooCommerce vs BigCommerce - Which is Best?" },
                  { title: "Service Provider Comparisons", example: "Best Web Hosting: Bluehost vs SiteGround vs HostGator" },
                  { title: "Budget vs Premium Comparisons", example: "Budget Gaming Laptops vs High-End Models - Worth the Upgrade?" },
                  { title: "Category Roundup Comparisons", example: "Top 5 Wireless Earbuds Compared: Features, Price, Sound Quality" }
                ].map((useCase, index) => (
                  <div key={index} className="card-interactive p-6 hover:border-primary transition-colors">
                    <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground italic">Example: "{useCase.example}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">What Affiliate Marketers Say</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="card-elevated p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className="h-5 w-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">
                    "The comparison tables are incredibly detailed. My comparison posts now rank on page 1 for competitive keywords like 'X vs Y'."
                  </p>
                  <p className="font-semibold">- Marcus R., Tech Affiliate Site Owner</p>
                </div>
                <div className="card-elevated p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className="h-5 w-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">
                    "I used to spend 6+ hours creating comparison articles. Now it takes 10 minutes and the quality is better than what I wrote manually."
                  </p>
                  <p className="font-semibold">- Jennifer K., Content Creator</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Start Creating High-Converting Comparison Articles Today</h2>
              <p className="text-xl mb-8 text-foreground/90">
                Join thousands of affiliate marketers using AIWriterPros to dominate comparison keywords and drive qualified traffic.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard/create/product-comparison">
                  <Button size="lg" className="btn-hero">
                    Generate Your First Comparison <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" className="btn-secondary-hero">
                    View Pricing Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProductComparisonsPage;
