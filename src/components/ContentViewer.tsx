import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Copy, Download } from 'lucide-react';
import { ArticleEditor } from './ArticleEditor';
import { toast } from '@/hooks/use-toast';
import TurndownService from 'turndown';
import DOMPurify from 'dompurify';
import { markdownToHtml } from '@/lib/markdown-to-html';

interface ContentViewerProps {
  content: string;
  onContentChange: (content: string) => void;
  format: 'markdown' | 'html' | 'richtext';
}

export const ContentViewer = ({ content, onContentChange, format }: ContentViewerProps) => {
  const [activeTab, setActiveTab] = useState<string>('richtext');
  const [htmlContent, setHtmlContent] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');

  // Initialize content based on format
  useEffect(() => {
    if (format === 'markdown') {
      setMarkdownContent(content);
      setHtmlContent(markdownToHtml(content));
    } else if (format === 'html') {
      setHtmlContent(content);
      const turndownService = new TurndownService();
      setMarkdownContent(turndownService.turndown(content));
    } else {
      // richtext format is HTML
      setHtmlContent(content);
      const turndownService = new TurndownService();
      setMarkdownContent(turndownService.turndown(content));
    }
  }, [content, format]);

  const handleRichTextChange = (newContent: string) => {
    setHtmlContent(newContent);
    const turndownService = new TurndownService();
    setMarkdownContent(turndownService.turndown(newContent));
    onContentChange(newContent);
  };

  const handleMarkdownChange = (newMarkdown: string) => {
    setMarkdownContent(newMarkdown);
    const newHtml = markdownToHtml(newMarkdown);
    setHtmlContent(newHtml);
    onContentChange(newMarkdown);
  };

  const handleCopy = () => {
    const textToCopy = activeTab === 'markdown' ? markdownContent : htmlContent;
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: 'Copied to Clipboard',
      description: `${activeTab === 'markdown' ? 'Markdown' : 'HTML'} content copied successfully`,
    });
  };

  const handleExport = (type: 'markdown' | 'html') => {
    const content = type === 'markdown' ? markdownContent : htmlContent;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `article.${type === 'markdown' ? 'md' : 'html'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Exported Successfully',
      description: `Article exported as ${type.toUpperCase()}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-end">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy {activeTab === 'markdown' ? 'Markdown' : 'HTML'}
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleExport('markdown')}>
          <Download className="mr-2 h-4 w-4" />
          Export MD
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleExport('html')}>
          <Download className="mr-2 h-4 w-4" />
          Export HTML
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="richtext">Rich Text</TabsTrigger>
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="richtext" className="mt-4">
          <ArticleEditor 
            content={htmlContent} 
            onChange={handleRichTextChange}
            placeholder="Edit your article content..."
          />
        </TabsContent>

        <TabsContent value="markdown" className="mt-4">
          <Textarea
            value={markdownContent}
            onChange={(e) => handleMarkdownChange(e.target.value)}
            className="min-h-[500px] font-mono text-sm"
            placeholder="# Your Markdown Content"
          />
        </TabsContent>

        <TabsContent value="html" className="mt-4">
          <Textarea
            value={htmlContent}
            readOnly
            className="min-h-[500px] font-mono text-sm bg-muted"
            placeholder="<h1>Generated HTML</h1>"
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <div 
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none border rounded-lg p-6 bg-background min-h-[500px]"
            dangerouslySetInnerHTML={{ 
              __html: DOMPurify.sanitize(htmlContent) 
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
