import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { List, Target, TrendingUp, Users, ChevronRight, Award, Trophy, Star, CheckCircle, DollarSign, Sparkles, Medal } from "lucide-react";

const ProductRoundupsPage = () => {
  return (
    <>
      <Helmet>
        <title>Product Roundup Generator | AIWriterPros - Create "Best Of" List Articles</title>
        <meta 
          name="description" 
          content="Generate comprehensive product roundup articles with curated lists, category winners, detailed mini-reviews, and comparison tables. Perfect for 'best of' SEO content." 
        />
        <meta name="keywords" content="product roundup generator, best of lists, top product lists, affiliate roundup articles, SEO list content" />
        <link rel="canonical" href="https://aiwriterpros.com/product-roundups" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Product Roundup Generator | AIWriterPros" />
        <meta property="og:description" content="Generate comprehensive product roundup articles with curated lists and category winners." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aiwriterpros.com/product-roundups" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Product Roundup Generator | AIWriterPros" />
        <meta name="twitter:description" content="Generate comprehensive product roundup articles with curated lists and category winners." />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Product Roundup Article Generator",
            "description": "AI-powered tool to generate comprehensive 'Best Of' product roundup articles with curated recommendations",
            "brand": {
              "@type": "Brand",
              "name": "AIWriterPros"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "134"
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
            <li className="text-foreground font-medium">Product Roundups</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-accent/20 px-4 py-2 rounded-full text-sm font-semibold text-accent mb-6 backdrop-blur-sm">
                🏆 Best Of List Content
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Product Roundup Generator
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-foreground/90">
                Create compelling "Best Of" product lists with curated recommendations, category winners, 
                and detailed mini-reviews that drive clicks and affiliate commissions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard/create/product-roundup">
                  <Button size="lg" className="btn-hero">
                    Generate Roundup Article <ChevronRight className="ml-2 h-5 w-5" />
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
              <h2 className="text-4xl font-bold text-center mb-12">What Your Product Roundup Includes</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: List, title: "Curated Product List", desc: "5-10 top products in the category with clear organization" },
                  { icon: Trophy, title: "Category Winners", desc: "Best Overall, Best Budget, Best Premium, and more" },
                  { icon: Star, title: "Mini-Reviews for Each Product", desc: "Concise reviews highlighting key features and benefits" },
                  { icon: Award, title: "Pros & Cons for Each", desc: "Quick-scan advantages and limitations" },
                  { icon: CheckCircle, title: "Quick Comparison Table", desc: "At-a-glance comparison of all products" },
                  { icon: Target, title: "Best For Recommendations", desc: "Match each product to ideal user types" },
                  { icon: DollarSign, title: "Price Range Indicators", desc: "Help readers find options in their budget" },
                  { icon: Sparkles, title: "Standout Features", desc: "Highlight what makes each product unique" },
                  { icon: Medal, title: "Ranking Methodology", desc: "Transparent explanation of how products were evaluated" },
                  { icon: Users, title: "User Experience Focus", desc: "Real-world performance and customer satisfaction" },
                  { icon: TrendingUp, title: "Value Assessment", desc: "Which products offer the best bang for buck" },
                  { icon: CheckCircle, title: "FAQ Integration", desc: "Answer common questions about the product category" }
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
              <h2 className="text-4xl font-bold text-center mb-12">Optimized for High-Converting List Keywords</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="card-elevated p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">High Commercial Intent</h3>
                  <p className="text-muted-foreground">
                    Target lucrative "best [product]" keywords that capture ready-to-buy shoppers.
                  </p>
                </div>
                <div className="card-elevated p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">List Format Appeal</h3>
                  <p className="text-muted-foreground">
                    Scannable list format matches user intent and earns high engagement metrics.
                  </p>
                </div>
                <div className="card-elevated p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Multiple Affiliate Opportunities</h3>
                  <p className="text-muted-foreground">
                    Feature 5-10 products per article, multiplying your commission potential.
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
              <h2 className="text-4xl font-bold text-center mb-12">Perfect Roundup Article Examples</h2>
              <div className="space-y-6">
                {[
                  { title: "Tech Product Roundups", example: "10 Best Wireless Earbuds in 2024: Tested & Ranked" },
                  { title: "Home & Kitchen Roundups", example: "Best Air Fryers 2024: Top 7 Models for Every Budget" },
                  { title: "Software & App Roundups", example: "Top 8 Project Management Tools for Remote Teams" },
                  { title: "Seasonal Gift Guides", example: "Best Tech Gifts for Dad 2024: 12 Perfect Presents" },
                  { title: "Category Deep-Dives", example: "Best Running Shoes for Beginners: 9 Top Picks for Every Foot Type" }
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
              <h2 className="text-3xl font-bold text-center mb-12">What List Content Creators Say</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="card-elevated p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className="h-5 w-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">
                    "My roundup articles consistently rank in top 3 for 'best [product]' keywords. They're my highest-earning content type."
                  </p>
                  <p className="font-semibold">- Rachel T., Affiliate Site Owner</p>
                </div>
                <div className="card-elevated p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className="h-5 w-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">
                    "Having 7-10 affiliate links per article has tripled my commission potential. Plus the category winner format drives more clicks."
                  </p>
                  <p className="font-semibold">- Michael S., Tech Reviewer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Start Creating Best Of Lists That Convert</h2>
              <p className="text-xl mb-8 text-foreground/90">
                Capture high-intent shoppers with compelling product roundups that rank and earn commissions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard/create/product-roundup">
                  <Button size="lg" className="btn-hero">
                    Generate Your First Roundup <ChevronRight className="ml-2 h-5 w-5" />
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

export default ProductRoundupsPage;
