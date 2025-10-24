import { Helmet } from "react-helmet-async";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const SettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tone, setTone] = useState("balanced");
  const [wordCount, setWordCount] = useState(6000);
  const [exportFormat, setExportFormat] = useState("html");
  const [layout, setLayout] = useState("comfortable");

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await (supabase as any)
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Customize your content preferences and export options</p>
          </div>

          {/* Content Preferences */}
          <div className="card-elevated p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Content Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="tone" className="text-base font-semibold mb-2 block">Default Tone</Label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="professional">Professional</option>
                  <option value="balanced">Balanced</option>
                  <option value="conversational">Conversational</option>
                  <option value="technical">Technical</option>
                  <option value="enthusiastic">Enthusiastic</option>
                </select>
              </div>

              <div>
                <Label htmlFor="wordCount" className="text-base font-semibold mb-2 block">
                  Default Word Count: {wordCount.toLocaleString()}
                </Label>
                <input
                  id="wordCount"
                  type="range"
                  min="3000"
                  max="10000"
                  step="500"
                  value={wordCount}
                  onChange={(e) => setWordCount(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>3,000</span>
                  <span>10,000</span>
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Auto-Include Sections</Label>
                <div className="space-y-3">
                  {[
                    { id: "schema", label: "Schema Markup" },
                    { id: "faq", label: "FAQ Section" },
                    { id: "comparison", label: "Comparison Tables" },
                    { id: "reviews", label: "Customer Review Analysis" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={item.id}
                        defaultChecked
                        className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                      />
                      <label htmlFor={item.id} className="ml-2 text-sm">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Export Preferences */}
          <div className="card-elevated p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Export Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">Format</Label>
                <div className="space-y-2">
                  {[
                    { value: "html", label: "HTML" },
                    { value: "markdown", label: "Markdown" },
                    { value: "text", label: "Plain Text" },
                  ].map((format) => (
                    <div key={format.value} className="flex items-center">
                      <input
                        type="radio"
                        id={format.value}
                        name="exportFormat"
                        value={format.value}
                        checked={exportFormat === format.value}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <label htmlFor={format.value} className="ml-2 text-sm">
                        {format.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Include in Export</Label>
                <div className="space-y-3">
                  {[
                    { id: "meta", label: "Meta Tags" },
                    { id: "schemaSeparate", label: "Schema Markup (Separate File)" },
                    { id: "images", label: "Image Placeholders" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={item.id}
                        defaultChecked
                        className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                      />
                      <label htmlFor={item.id} className="ml-2 text-sm">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interface Preferences */}
          <div className="card-elevated p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Interface Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">Dashboard Layout</Label>
                <div className="space-y-2">
                  {[
                    { value: "compact", label: "Compact" },
                    { value: "comfortable", label: "Comfortable (Default)" },
                    { value: "spacious", label: "Spacious" },
                  ].map((layoutOption) => (
                    <div key={layoutOption.value} className="flex items-center">
                      <input
                        type="radio"
                        id={layoutOption.value}
                        name="layout"
                        value={layoutOption.value}
                        checked={layout === layoutOption.value}
                        onChange={(e) => setLayout(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <label htmlFor={layoutOption.value} className="ml-2 text-sm">
                        {layoutOption.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-2 block">Theme</Label>
                <p className="text-sm text-muted-foreground">Light (Only option currently)</p>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="card-elevated p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Account Information</h2>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email || ''} disabled className="mt-1" />
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold">Current Plan: {profile?.subscription_tier || 'Free'}</p>
                      <p className="text-sm text-muted-foreground">
                        {profile?.articles_created_this_month || 0} articles created this month
                      </p>
                    </div>
                    {profile?.subscription_tier === 'free' && (
                      <Link to="/pricing">
                        <Button className="bg-primary text-primary-foreground">
                          Upgrade to Pro
                        </Button>
                      </Link>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Usage resets on: {profile?.usage_reset_date ? new Date(profile.usage_reset_date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="btn-hero gap-2">
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
