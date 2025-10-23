import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Users, Zap, Award } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About AIWriterPros | AI-Powered SEO Content Platform</title>
        <meta 
          name="description" 
          content="Learn about AIWriterPros - the AI content platform built by SEO experts. Our mission is to democratize SEO content creation through powerful AI tools." 
        />
        <link rel="canonical" href="https://aiwriterpros.lovable.app/about" />
        <meta property="og:title" content="About AIWriterPros" />
        <meta property="og:description" content="Learn about AIWriterPros - the AI content platform built by SEO experts." />
        <meta property="og:url" content="https://aiwriterpros.lovable.app/about" />
      </Helmet>

      <div className="min-h-screen">
        <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About AIWriterPros</h1>
          <p className="text-xl text-muted-foreground">
            We're on a mission to democratize SEO content creation through AI-powered tools
            built by industry experts.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              To empower content creators, marketers, and businesses with AI tools that generate
              comprehensive, SEO-optimized articles that actually rank and convert.
            </p>
            <p className="text-muted-foreground">
              We believe that everyone should have access to enterprise-level content creation
              capabilities, regardless of their budget or technical expertise.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-3">
              {[
                "Quality over quantity in every article",
                "Transparency in our AI processes",
                "Continuous improvement and innovation",
                "Customer success as our primary metric",
              ].map((value, i) => (
                <li key={i} className="flex items-start">
                  <Award className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Sarah Chen", role: "CEO & Co-Founder", image: "https://i.pravatar.cc/300?img=1" },
              { name: "Michael Rodriguez", role: "CTO & Co-Founder", image: "https://i.pravatar.cc/300?img=2" },
              { name: "Jennifer Park", role: "Head of AI", image: "https://i.pravatar.cc/300?img=3" },
              { name: "David Thompson", role: "SEO Director", image: "https://i.pravatar.cc/300?img=4" },
            ].map((member, i) => (
              <div key={i} className="card-elevated p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="card-elevated p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Technology</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            We combine cutting-edge natural language processing with proven SEO strategies,
            trained on thousands of top-ranking articles. Our AI doesn't just write—it understands
            search intent, competitive landscape, and conversion optimization.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Zap, label: "Advanced AI Models" },
              { icon: Target, label: "SEO Optimization" },
              { icon: Users, label: "Human Oversight" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="p-4 bg-primary/10 rounded-lg mb-3">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <p className="font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
