import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductRoundupsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-accent/10 px-4 py-2 rounded-full text-sm font-semibold text-accent mb-6">
            Coming Soon
          </div>
          <div className="mb-8">
            <Construction className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          </div>
          <h1 className="text-4xl font-bold mb-6">Product Roundup Generator</h1>
          <p className="text-xl text-muted-foreground mb-8">
            This feature is coming soon. Create "Best of" lists with multiple product recommendations,
            category winners, detailed reviews, and quick comparisons.
          </p>

          <div className="card-elevated p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Get Notified When It Launches</h2>
            <p className="text-muted-foreground mb-6">
              Be the first to know when Product Roundup Generator becomes available.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="your@email.com" />
              <Button className="bg-primary text-primary-foreground whitespace-nowrap">
                Notify Me
              </Button>
            </div>
          </div>

          <Link to="/">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductRoundupsPage;
