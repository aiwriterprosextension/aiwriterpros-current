import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { GraduationCap, Target, TrendingUp, Users, ChevronRight, Clock, Award, ListChecks, AlertCircle, CheckCircle, Lightbulb, Video } from "lucide-react";

const HowToArticlesPage = () => {
  return (
    <>
      <Helmet>
        <title>How-To Article Generator | AIWriterPros - Create Step-by-Step Tutorial Content</title>
        <meta 
          name="description" 
          content="Generate comprehensive how-to articles with detailed step-by-step instructions, troubleshooting tips, and visual guide optimization. Perfect for tutorial SEO." 
        />
        <meta name="keywords" content="how-to article generator, tutorial content creator, step-by-step guides, instructional content, SEO tutorial articles" />
        <link rel="canonical" href="https://aiwriterpros.com/how-to-articles" />
        
        {/* Open Graph */}
        <meta property="og:title" content="How-To Article Generator | AIWriterPros" />
        <meta property="og:description" content="Generate comprehensive how-to articles with detailed step-by-step instructions and troubleshooting tips." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aiwriterpros.com/how-to-articles" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How-To Article Generator | AIWriterPros" />
        <meta name="twitter:description" content="Generate comprehensive how-to articles with detailed step-by-step instructions and troubleshooting tips." />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "How-To Article Generator",
            "description": "AI-powered tool to generate comprehensive how-to articles with step-by-step instructions and troubleshooting",
            "brand": {
              "@type": "Brand",
              "name": "AIWriterPros"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "156"
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
            <li className="text-foreground font-medium">How-To Articles</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-accent/20 px-4 py-2 rounded-full text-sm font-semibold text-accent mb-6 backdrop-blur-sm">
                📖 Educational Tutorial Content
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                How-To Article Generator
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-foreground/90">
                Create detailed step-by-step tutorials that teach readers exactly how to accomplish tasks—
                with clear instructions, troubleshooting tips, and optimized for tutorial-seeking traffic.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard/create/how-to-article">
                  <Button size="lg" className="btn-hero">
                    Generate How-To Article <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="btn-secondary-hero">
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
              <h2 className="text-4xl font-bold text-center mb-12">What Your How-To Article Includes</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: ListChecks, title: "Numbered Step-by-Step Instructions", desc: "Clear, sequential steps that are easy to follow" },
                  { icon: Clock, title: "Time & Difficulty Estimates", desc: "Help readers know what to expect before starting" },
                  { icon: Lightbulb, title: "Required Materials/Tools", desc: "Complete list of everything needed to complete the task" },
                  { icon: Video, title: "Visual Guide Optimization", desc: "Structure optimized for adding images and video" },
                  { icon: AlertCircle, title: "Safety Warnings & Precautions", desc: "Important warnings to keep readers safe" },
                  { icon: Target, title: "Common Mistakes to Avoid", desc: "Help readers sidestep typical pitfalls" },
                  { icon: GraduationCap, title: "Expert Tips & Tricks", desc: "Pro-level insights that improve results" },
                  { icon: CheckCircle, title: "Troubleshooting Section", desc: "Solutions for when things don't go as planned" },
                  { icon: Award, title: "Success Verification", desc: "How to know when the task is completed correctly" },
                  { icon: Users, title: "Alternative Methods", desc: "Different approaches for different situations" },
                  { icon: TrendingUp, title: "Next Steps Recommendations", desc: "What to do after completing the tutorial" },
                  { icon: CheckCircle, title: "FAQ Integration", desc: "Answer common questions with schema markup" }
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
              <h2 className="text-4xl font-bold text-center mb-12">Optimized for Tutorial Search Traffic</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="card-elevated p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">High-Intent Keywords</h3>
                  <p className="text-muted-foreground">
                    Target valuable "how to [do X]" keywords that capture users actively looking for solutions.
                  </p>
                </div>
                <div className="card-elevated p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">HowTo Schema Ready</h3>
                  <p className="text-muted-foreground">
                    Structured with proper HowTo schema markup for enhanced search visibility and rich snippets.
                  </p>
                </div>
                <div className="card-elevated p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Helpful Content Standard</h3>
                  <p className="text-muted-foreground">
                    Tutorial format aligns perfectly with <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's helpful content system</a>.
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
              <h2 className="text-4xl font-bold text-center mb-12">Perfect How-To Tutorial Examples</h2>
              <div className="space-y-6">
                {[
                  { title: "Tech & Software Tutorials", example: "How to Set Up a WordPress Blog in 15 Minutes (Complete Guide)" },
                  { title: "DIY & Home Improvement", example: "How to Install a Smart Thermostat: Step-by-Step Installation Guide" },
                  { title: "Productivity & Work", example: "How to Use Google Analytics 4: Beginner to Advanced Tutorial" },
                  { title: "Creative & Hobby Guides", example: "How to Start a Podcast: Complete Equipment, Recording & Publishing Guide" },
                  { title: "Health & Fitness", example: "How to Build a Home Gym on a Budget: Equipment Guide & Setup Tutorial" }
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
              <h2 className="text-3xl font-bold text-center mb-12">What Tutorial Creators Say</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="card-elevated p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className="h-5 w-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">
                    "My how-to articles now appear in featured snippets with the step-by-step carousel. Traffic has increased 300% in 3 months."
                  </p>
                  <p className="font-semibold">- David P., Tech Tutorial Site</p>
                </div>
                <div className="card-elevated p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className="h-5 w-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">
                    "The troubleshooting sections are brilliant. Readers comment that my tutorials are the most complete they've found."
                  </p>
                  <p className="font-semibold">- Lisa K., DIY Content Creator</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Start Creating Comprehensive Tutorial Content Today</h2>
              <p className="text-xl mb-8 text-foreground/90">
                Help your audience learn new skills while building authority and driving organic traffic.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard/create/how-to-article">
                  <Button size="lg" className="btn-hero">
                    Generate Your First Tutorial <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="btn-secondary-hero">
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

export default HowToArticlesPage;
