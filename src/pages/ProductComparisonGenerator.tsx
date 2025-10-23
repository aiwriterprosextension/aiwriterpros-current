import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Download, Copy, FileText } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { convertMarkdownToHtml } from "@/lib/markdown-to-html";

const ProductComparisonGenerator = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [configuration, setConfiguration] = useState({
    wordCount: 3000,
    tone: "unbiased",
    readingLevel: "general-audience",
    primaryKeyword: "",
    secondaryKeywords: "",
    metaDescription: "",
    productsToCompare: 2,
    comparisonCategories: "",
    declareWinner: true,
    schemaType: "Product",
    faqCount: 8,
    imageCount: 8,
    imageFormat: "WebP",
    ctaCount: 4,
  });
  const [generatedArticle, setGeneratedArticle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter an article topic");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-product-comparison", {
        body: { topic, configuration },
      });

      if (error) throw error;

      setGeneratedArticle(data.content);
      toast.success("Product comparison generated successfully!");
    } catch (error) {
      console.error("Error generating article:", error);
      toast.error("Failed to generate article. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedArticle) {
      toast.error("No article to save");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please log in to save articles");
        navigate("/auth");
        return;
      }

      const { error } = await (supabase as any)
        .from("articles")
        .insert({
          user_id: user.id,
          title: topic,
          content: generatedArticle,
          article_type: "product-comparison",
          configuration,
          word_count: generatedArticle.split(/\s+/).length,
        });

      if (error) throw error;

      toast.success("Article saved successfully!");
      navigate("/dashboard/articles");
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error("Failed to save article");
    }
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([generatedArticle], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/\s+/g, "-").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported as Markdown!");
  };

  const handleExportHTML = async () => {
    const html = await convertMarkdownToHtml(generatedArticle);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/\s+/g, "-").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported as HTML!");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedArticle);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Product Comparison Generator</h1>
            <p className="text-muted-foreground">Create detailed head-to-head product comparisons</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Article Details</CardTitle>
                  <CardDescription>Enter the basic information for your comparison</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="topic">Article Topic *</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., iPhone 15 Pro vs Samsung Galaxy S24 Ultra"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="wordCount">Target Word Count: {configuration.wordCount}</Label>
                    <Slider
                      id="wordCount"
                      min={2000}
                      max={5000}
                      step={500}
                      value={[configuration.wordCount]}
                      onValueChange={(value) => setConfiguration({ ...configuration, wordCount: value[0] })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={configuration.tone} onValueChange={(value) => setConfiguration({ ...configuration, tone: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unbiased">Unbiased</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="analytical">Analytical</SelectItem>
                        <SelectItem value="conversational">Conversational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="readingLevel">Reading Level</Label>
                    <Select value={configuration.readingLevel} onValueChange={(value) => setConfiguration({ ...configuration, readingLevel: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="general-audience">General Audience</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO Configuration</CardTitle>
                  <CardDescription>Optimize your article for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primaryKeyword">Primary Keyword</Label>
                    <Input
                      id="primaryKeyword"
                      placeholder="e.g., iphone vs samsung"
                      value={configuration.primaryKeyword}
                      onChange={(e) => setConfiguration({ ...configuration, primaryKeyword: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="secondaryKeywords">Secondary Keywords (comma-separated)</Label>
                    <Input
                      id="secondaryKeywords"
                      placeholder="e.g., smartphone comparison, flagship phones"
                      value={configuration.secondaryKeywords}
                      onChange={(e) => setConfiguration({ ...configuration, secondaryKeywords: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">Meta Description (optional)</Label>
                    <Textarea
                      id="metaDescription"
                      placeholder="Custom meta description for SEO"
                      value={configuration.metaDescription}
                      onChange={(e) => setConfiguration({ ...configuration, metaDescription: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="schemaType">Schema Type</Label>
                    <Select value={configuration.schemaType} onValueChange={(value) => setConfiguration({ ...configuration, schemaType: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Review">Review</SelectItem>
                        <SelectItem value="Article">Article</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Comparison Settings</CardTitle>
                  <CardDescription>Configure product comparison specifics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="productsToCompare">Products to Compare: {configuration.productsToCompare}</Label>
                    <Slider
                      id="productsToCompare"
                      min={2}
                      max={5}
                      step={1}
                      value={[configuration.productsToCompare]}
                      onValueChange={(value) => setConfiguration({ ...configuration, productsToCompare: value[0] })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="comparisonCategories">Comparison Categories (comma-separated, optional)</Label>
                    <Input
                      id="comparisonCategories"
                      placeholder="e.g., Design, Performance, Camera, Battery"
                      value={configuration.comparisonCategories}
                      onChange={(e) => setConfiguration({ ...configuration, comparisonCategories: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="declareWinner"
                      checked={configuration.declareWinner}
                      onCheckedChange={(checked) => setConfiguration({ ...configuration, declareWinner: checked as boolean })}
                    />
                    <Label htmlFor="declareWinner">Declare Overall Winner</Label>
                  </div>

                  <div>
                    <Label htmlFor="faqCount">FAQ Questions: {configuration.faqCount}</Label>
                    <Slider
                      id="faqCount"
                      min={5}
                      max={15}
                      step={1}
                      value={[configuration.faqCount]}
                      onValueChange={(value) => setConfiguration({ ...configuration, faqCount: value[0] })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="ctaCount">Call-to-Action Count: {configuration.ctaCount}</Label>
                    <Slider
                      id="ctaCount"
                      min={2}
                      max={8}
                      step={1}
                      value={[configuration.ctaCount]}
                      onValueChange={(value) => setConfiguration({ ...configuration, ctaCount: value[0] })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleGenerate} disabled={isGenerating} size="lg" className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Generate Comparison
                  </>
                )}
              </Button>
            </div>

            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Generated Article</CardTitle>
                  <CardDescription>
                    {generatedArticle ? "Your product comparison is ready!" : "Your article will appear here"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedArticle ? (
                    <Tabs defaultValue="preview">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="markdown">Markdown</TabsTrigger>
                      </TabsList>
                      <TabsContent value="preview" className="space-y-4">
                        <div className="prose prose-sm max-w-none max-h-[500px] overflow-y-auto p-4 bg-muted/50 rounded-lg">
                          <div dangerouslySetInnerHTML={{ __html: generatedArticle.replace(/\n/g, "<br/>") }} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button onClick={handleSave} variant="default">Save Article</Button>
                          <Button onClick={handleExportMarkdown} variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export MD
                          </Button>
                          <Button onClick={handleExportHTML} variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export HTML
                          </Button>
                          <Button onClick={handleCopyToClipboard} variant="outline">
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="markdown">
                        <Textarea
                          value={generatedArticle}
                          onChange={(e) => setGeneratedArticle(e.target.value)}
                          className="min-h-[500px] font-mono text-sm"
                        />
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter your topic and click "Generate Comparison" to get started</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductComparisonGenerator;