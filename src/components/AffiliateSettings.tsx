import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { ExternalLink } from 'lucide-react';

export interface AffiliateConfig {
  enabled: boolean;
  amazonAssociateId: string;
  ctaStyle: 'button' | 'text' | 'image';
  ctaCount: number;
  ctaPlacement: 'after-intro' | 'mid-article' | 'before-conclusion' | 'all';
}

interface AffiliateSettingsProps {
  config: AffiliateConfig;
  onChange: (config: AffiliateConfig) => void;
}

export const AffiliateSettings = ({ config, onChange }: AffiliateSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Affiliate Settings</CardTitle>
            <CardDescription>
              Configure Amazon affiliate links and CTAs for monetization
            </CardDescription>
          </div>
          <Switch
            checked={config.enabled}
            onCheckedChange={(enabled) => onChange({ ...config, enabled })}
          />
        </div>
      </CardHeader>
      
      {config.enabled && (
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="associate-id">Amazon Associate ID</Label>
            <div className="flex gap-2">
              <Input
                id="associate-id"
                value={config.amazonAssociateId}
                onChange={(e) => onChange({ ...config, amazonAssociateId: e.target.value })}
                placeholder="your-associate-id-20"
              />
              <a
                href="https://affiliate-program.amazon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center whitespace-nowrap text-sm text-primary hover:underline"
              >
                Sign Up
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Your Amazon Associates tracking ID (ends with -20)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta-style">CTA Style</Label>
            <Select 
              value={config.ctaStyle} 
              onValueChange={(value: any) => onChange({ ...config, ctaStyle: value })}
            >
              <SelectTrigger id="cta-style">
                <SelectValue placeholder="Select CTA style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="button">Button</SelectItem>
                <SelectItem value="text">Text Link</SelectItem>
                <SelectItem value="image">Image Link</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              How affiliate links appear in your article
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="cta-count">
              Number of CTAs: {config.ctaCount}
            </Label>
            <Slider
              id="cta-count"
              value={[config.ctaCount]}
              onValueChange={(value) => onChange({ ...config, ctaCount: value[0] })}
              min={2}
              max={8}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              How many affiliate links to include in the article
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta-placement">CTA Placement</Label>
            <Select 
              value={config.ctaPlacement} 
              onValueChange={(value: any) => onChange({ ...config, ctaPlacement: value })}
            >
              <SelectTrigger id="cta-placement">
                <SelectValue placeholder="Select placement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="after-intro">After Introduction</SelectItem>
                <SelectItem value="mid-article">Mid-Article</SelectItem>
                <SelectItem value="before-conclusion">Before Conclusion</SelectItem>
                <SelectItem value="all">All Positions</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Where to place affiliate links throughout the article
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
