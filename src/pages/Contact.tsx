import { Helmet } from "react-helmet-async";
import { Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - AIWriterPros | Get Support & Ask Questions</title>
        <meta 
          name="description" 
          content="Have questions about AIWriterPros? Contact our support team. We typically respond within 24 hours. Email: support@aiwriterpros.com" 
        />
        <link rel="canonical" href="https://aiwriterpros.lovable.app/contact" />
        <meta property="og:title" content="Contact Us - AIWriterPros" />
        <meta property="og:description" content="Have questions about AIWriterPros? Contact our support team." />
        <meta property="og:url" content="https://aiwriterpros.lovable.app/contact" />
      </Helmet>

      <div className="min-h-screen">
        <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="card-elevated p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <select id="subject" className="w-full mt-1 px-3 py-2 border border-input rounded-md">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Feature Request</option>
                  <option>Partnership Opportunity</option>
                </select>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" required className="mt-1" rows={6} />
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card-elevated p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email Us</h3>
                  <p className="text-muted-foreground">support@aiwriterpros.com</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Office</h3>
                  <p className="text-muted-foreground">
                    123 Innovation Drive<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9am - 6pm PST<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
