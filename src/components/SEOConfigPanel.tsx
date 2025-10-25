import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface SEOConfig {
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaDescription: string;
  schemaType: string;
}

interface SEOConfigPanelProps {
  topic: string;
  articleType: string;
  config: SEOConfig;
  onChange: (config: SEOConfig) => void;
  productName?: string;
}

interface TitleOption {
  type: string;
  text: string;
  charCount: number;
}

export const SEOConfigPanel = ({ topic, articleType, config, onChange, productName }: SEOConfigPanelProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [titleOptions, setTitleOptions] = useState<TitleOption[]>([]);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState<number | null>(null);

  const handleAutoFill = async () => {
    if (!topic) {
      toast({
        title: 'Topic Required',
        description: 'Please enter a topic before generating SEO metadata',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-seo-metadata', {
        body: { topic, articleType, productName },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setTitleOptions(data.titles || []);
      
      onChange({
        ...config,
        primaryKeyword: data.primaryKeyword || '',
        secondaryKeywords: data.secondaryKeywords || [],
        metaDescription: data.metaDescription || '',
      });

      toast({
        title: 'SEO Metadata Generated',
        description: 'AI has generated optimized SEO metadata. Select a title option below.',
      });
    } catch (error: any) {
      console.error('Error generating SEO metadata:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'Failed to generate SEO metadata. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleSelect = (index: number) => {
    setSelectedTitleIndex(index);
    onChange({
      ...config,
      title: titleOptions[index].text,
    });
  };

  const metaDescLength = config.metaDescription.length;
  const metaDescValid = metaDescLength >= 120 && metaDescLength <= 160;

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Configuration</CardTitle>
        <CardDescription>
          Optimize your article for search engines with AI-powered metadata
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={handleAutoFill} 
          disabled={isLoading || !topic}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Auto-Fill with AI
            </>
          )}
        </Button>

        {titleOptions.length > 0 && (
          <div className="space-y-3">
            <Label>Select Title (50-60 characters optimal)</Label>
            <RadioGroup 
              value={selectedTitleIndex?.toString()} 
              onValueChange={(value) => handleTitleSelect(parseInt(value))}
            >
              {titleOptions.map((option, index) => (
                <div key={index} className="flex items-start space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`title-${index}`} className="mt-1" />
                  <Label htmlFor={`title-${index}`} className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm capitalize mb-1">{option.type}</div>
                    <div className="text-sm">{option.text}</div>
                    <div className={`text-xs mt-1 ${option.charCount >= 50 && option.charCount <= 60 ? 'text-green-600' : 'text-amber-600'}`}>
                      {option.charCount} characters
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="primary-keyword">Primary Keyword</Label>
          <Input
            id="primary-keyword"
            value={config.primaryKeyword}
            onChange={(e) => onChange({ ...config, primaryKeyword: e.target.value })}
            placeholder="e.g., wireless headphones"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondary-keywords">Secondary Keywords (comma-separated)</Label>
          <Input
            id="secondary-keywords"
            value={config.secondaryKeywords.join(', ')}
            onChange={(e) => onChange({ 
              ...config, 
              secondaryKeywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) 
            })}
            placeholder="e.g., bluetooth headphones, noise cancelling, wireless audio"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta-description">
            Meta Description
            <span className={`ml-2 text-sm ${metaDescValid ? 'text-green-600' : 'text-amber-600'}`}>
              ({metaDescLength}/155 characters)
            </span>
          </Label>
          <Textarea
            id="meta-description"
            value={config.metaDescription}
            onChange={(e) => onChange({ ...config, metaDescription: e.target.value })}
            placeholder="Compelling description that appears in search results (120-160 characters)"
            rows={3}
            maxLength={160}
          />
          {!metaDescValid && metaDescLength > 0 && (
            <p className="text-xs text-amber-600">
              Optimal length is 120-160 characters for best SEO results
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="schema-type">Schema Markup Type</Label>
          <Select 
            value={config.schemaType} 
            onValueChange={(value) => onChange({ ...config, schemaType: value })}
          >
            <SelectTrigger id="schema-type">
              <SelectValue placeholder="Select schema type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
              <SelectItem value="Product+Review">Product + Review</SelectItem>
              <SelectItem value="Article">Article</SelectItem>
              <SelectItem value="HowTo">How-To</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
