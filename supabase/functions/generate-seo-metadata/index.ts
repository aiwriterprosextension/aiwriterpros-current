import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SEOMetadata {
  titles: Array<{
    type: 'keyword-focused' | 'benefit-driven' | 'question';
    text: string;
    charCount: number;
  }>;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaDescription: string;
  characterCounts: {
    metaDescription: number;
    selectedTitle?: number;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, articleType, productName } = await req.json();
    
    if (!topic || !articleType) {
      return new Response(
        JSON.stringify({ error: 'Topic and articleType are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert SEO specialist with 10+ years of experience optimizing content for search engines. Your expertise includes:
- Creating titles that are 50-60 characters, placing primary keywords at the front
- Writing meta descriptions that are 150-155 characters with compelling CTAs
- Using power words (Best, Ultimate, Complete, Essential, Proven, Expert) strategically
- Including year 2025 for freshness signals
- Front-loading important keywords
- Creating urgency and curiosity`;

    const productContext = productName ? ` for the product "${productName}"` : '';
    const userPrompt = `Generate SEO metadata for a ${articleType} article about: "${topic}"${productContext}

Requirements:
1. Generate 3 title options (EXACTLY 50-60 characters each):
   - Keyword-focused: Start with primary keyword, clear and direct
   - Benefit-driven: Emphasize value proposition and results
   - Question: Engaging question format that targets search intent
   
2. Primary Keyword: The main 2-4 word phrase that best represents the topic

3. Secondary Keywords: Provide exactly 5 related keywords/phrases that support the primary keyword

4. Meta Description: Write a compelling 150-155 character description that:
   - Includes the primary keyword naturally
   - Has a clear call-to-action
   - Mentions key benefits
   - Creates urgency or curiosity

Return ONLY a valid JSON object in this exact format (no markdown, no extra text):
{
  "titles": [
    {"type": "keyword-focused", "text": "Title here", "charCount": 55},
    {"type": "benefit-driven", "text": "Title here", "charCount": 58},
    {"type": "question", "text": "Title here", "charCount": 52}
  ],
  "primaryKeyword": "keyword phrase",
  "secondaryKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "metaDescription": "Description here",
  "characterCounts": {
    "metaDescription": 152
  }
}`;

    console.log('Calling Lovable AI for SEO metadata generation...');
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a few moments.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway returned ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;
    
    // Parse the JSON response
    let seoMetadata: SEOMetadata;
    try {
      // Remove markdown code blocks if present
      const cleanContent = generatedContent.replace(/```json\n?|\n?```/g, '').trim();
      seoMetadata = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', generatedContent);
      throw new Error('Failed to parse SEO metadata from AI response');
    }

    // Validate the response structure
    if (!seoMetadata.titles || seoMetadata.titles.length !== 3) {
      throw new Error('Invalid SEO metadata structure: missing or invalid titles');
    }

    console.log('Successfully generated SEO metadata');

    return new Response(
      JSON.stringify(seoMetadata),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-seo-metadata:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
