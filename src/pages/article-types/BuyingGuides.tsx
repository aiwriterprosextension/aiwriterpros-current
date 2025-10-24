import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, TrendingUp, Users, ChevronRight, DollarSign, Award, Shield, Compass, CheckCircle, Lightbulb, Star } from "lucide-react";

const BuyingGuidesPage = () => {
  return (
    <>
      <Helmet>
        <title>Buying Guide Generator | AIWriterPros - Create Expert Purchasing Guides</title>
        <meta 
          name="description" 
          content="Generate comprehensive buying guides with expert advice, budget tiers, key features explained, and top product picks. Perfect for informational SEO content." 
        />
        <meta name="keywords" content="buying guide generator, purchasing guide creator, product buying advice, affiliate buying guides, SEO buying content" />
        <link rel="canonical" href="https://aiwriterpros.com/buying-guides" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Buying Guide Generator | AIWriterPros" />
        <meta property="og:description" content="Generate comprehensive buying guides with expert advice, budget tiers, and top product picks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aiwriterpros.com/buying-guides" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buying Guide Generator | AIWriterPros" />
        <meta name="twitter:description" content="Generate comprehensive buying guides with expert advice, budget tiers, and top product picks." />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Buying Guide Article Generator",
            "description": "AI-powered tool to generate comprehensive buying guides with expert advice and product recommendations",
            "brand": {
              "@type": "Brand",
              "name": "AIWriterPros"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "143"
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
            <li className="text-foreground font-medium">Buying Guides</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-accent/20 px-4 py-2 rounded-full text-sm font-semibold text-accent mb-6 backdrop-blur-sm">
                📚 Expert Guidance Content
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Buying Guide Generator
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-foreground/90">
                Create comprehensive buying guides that educate readers, build trust, and guide them to 
                the perfect product for their needs—complete with budget tiers and expert recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard/create/buying-guide">
                  <Button size="lg" className="btn-hero">
                    Generate Buying Guide <ChevronRight className="ml-2 h-5 w-5" />
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
              <h2 className="text-4xl font-bold text-center mb-12">What Your Buying Guide Includes</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: BookOpen, title: "Educational Introduction", desc: "Explain the product category and why readers need this guide" },
                  { icon: Lightbulb, title: "Key Features Explained", desc: "Breakdown of technical specs and features in plain language" },
                  { icon: DollarSign, title: "Budget Tier Recommendations", desc: "Best options for budget, mid-range, and premium shoppers" },
                  { icon: Target, title: "Use Case Matching", desc: "Product recommendations based on specific user needs" },
                  { icon: Shield, title: "What to Avoid", desc: "Red flags and common mistakes when purchasing" },
                  { icon: Compass, title: "Decision Framework", desc: "Help readers prioritize what matters most for their situation" },
                  { icon: Star, title: "Top Picks Section", desc: "Curated recommendations with clear justifications" },
                  { icon: CheckCircle, title: "Feature Comparison Tables", desc: "Easy-to-scan tables comparing key product attributes" },
                  { icon: Award, title: "Expert Tips & Advice", desc: "Professional insights and insider knowledge" },
                  { icon: Users, title: "User Experience Focus", desc: "Real-world usage scenarios and practical considerations" },
                  { icon: TrendingUp, title: "Future-Proofing Advice", desc: "Help readers make purchases that last" },
                  { icon: CheckCircle, title: "FAQ Integration", desc: "Answer common buyer questions with FAQ schema markup" }
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
              <h2 className="text-4xl font-bold text-center mb-12">Optimized for Informational Keywords</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="card-elevated p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Research Phase Intent</h3>
                  <p className="text-muted-foreground">
                    Target high-volume keywords like "how to choose [product]" and "best [product] buying guide" that capture early-stage shoppers.
                  </p>
                </div>
                <div className="card-elevated p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Trust-Building Content</h3>
                  <p className="text-muted-foreground">
                    Educational approach aligns with <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's helpful content guidelines</a>.
                  </p>
                </div>
                <div className="card-elevated p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Long-Term Rankings</h3>
                  <p className="text-muted-foreground">
                    Evergreen buying guides continue driving traffic and affiliate commissions for years.
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
              <h2 className="text-4xl font-bold text-center mb-12">Perfect Buying Guide Examples</h2>
              <div className="space-y-6">
                {[
                  { title: "Beginner Equipment Guides", example: "How to Choose Your First DSLR Camera: A Complete Buying Guide" },
                  { title: "Home Improvement Guides", example: "Ultimate Guide to Buying a Robot Vacuum: Features, Budget, & Top Picks" },
                  { title: "Tech Purchasing Guides", example: "Gaming Laptop Buying Guide 2024: Performance, Budget & Recommendations" },
                  { title: "Lifestyle Product Guides", example: "How to Choose the Perfect Running Shoes: Buyer's Guide for All Levels" },
                  { title: "B2B Solution Guides", example: "Small Business CRM Buying Guide: Features to Look For & Best Options" }
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
              <h2 className="text-3xl font-bold text-center mb-12">What Content Creators Say</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="card-elevated p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className="h-5 w-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">
                    "My buying guides now rank #1 for competitive informational keywords. The structure is perfect for capturing featured snippets."
                  </p>
                  <p className="font-semibold">- Sarah M., Niche Site Owner</p>
                </div>
                <div className="card-elevated p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className="h-5 w-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">
                    "The budget tier recommendations are genius. Readers love having options for every price point, and my conversion rates have doubled."
                  </p>
                  <p className="font-semibold">- Tom L., Affiliate Marketer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Start Creating Expert Buying Guides Today</h2>
              <p className="text-xl mb-8 text-foreground/90">
                Build trust with your audience through educational content that ranks and converts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard/create/buying-guide">
                  <Button size="lg" className="btn-hero">
                    Generate Your First Guide <ChevronRight className="ml-2 h-5 w-5" />
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

export default BuyingGuidesPage;
