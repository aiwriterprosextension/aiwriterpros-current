import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ImageMetadata {
  filename: string;
  altText: string;
  placement: string;
  aiPrompt: string;
  dimensions: {
    width: number;
    height: number;
  };
  type: 'featured' | 'inline' | 'decorative';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageCount, articleContext, primaryKeyword, articleType } = await req.json();
    
    if (!imageCount || !articleContext || !primaryKeyword || !articleType) {
      return new Response(
        JSON.stringify({ error: 'All parameters are required: imageCount, articleContext, primaryKeyword, articleType' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert image optimization specialist with deep knowledge of SEO, accessibility, and visual storytelling. You excel at:
- Creating descriptive, keyword-rich image filenames in kebab-case
- Writing alt text that is 10-15 words, descriptive, and includes relevant keywords naturally
- Determining optimal image placement within article structure
- Creating detailed AI image generation prompts
- Selecting appropriate dimensions based on image purpose`;

    const userPrompt = `Generate metadata for ${imageCount} images for a ${articleType} article about "${primaryKeyword}".

Article context: ${articleContext}

For each image, provide:
1. Filename: Kebab-case, SEO-optimized, includes primary keyword where relevant, descriptive
2. Alt Text: 10-15 words, descriptive, accessible, includes keywords naturally
3. Placement: Specify after which section heading (e.g., "After Introduction", "After Key Features Section", "Before Conclusion")
4. AI Prompt: Detailed prompt for image generation (style, composition, mood, colors, elements)
5. Dimensions: 
   - Featured/Hero images: 1200x630
   - Inline content images: 800x600
   - Decorative/supporting: 600x400
6. Type: featured (main hero image) | inline (content image) | decorative (supporting visual)

Return ONLY a valid JSON array in this exact format (no markdown, no extra text):
[
  {
    "filename": "best-wireless-headphones-2025-comparison",
    "altText": "Side by side comparison of top rated wireless headphones with features labeled",
    "placement": "After Introduction",
    "aiPrompt": "Professional product photography of 3-4 wireless headphones arranged on a clean white surface, studio lighting, detailed close-up showing build quality, modern minimal aesthetic",
    "dimensions": {"width": 1200, "height": 630},
    "type": "featured"
  }
]`;

    console.log(`Generating metadata for ${imageCount} images...`);
    
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
    let imageMetadata: ImageMetadata[];
    try {
      // Remove markdown code blocks if present
      const cleanContent = generatedContent.replace(/```json\n?|\n?```/g, '').trim();
      imageMetadata = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', generatedContent);
      throw new Error('Failed to parse image metadata from AI response');
    }

    // Validate the response structure
    if (!Array.isArray(imageMetadata) || imageMetadata.length === 0) {
      throw new Error('Invalid image metadata structure: expected non-empty array');
    }

    // Validate each image metadata object
    for (const img of imageMetadata) {
      if (!img.filename || !img.altText || !img.placement || !img.aiPrompt || !img.dimensions || !img.type) {
        throw new Error('Invalid image metadata: missing required fields');
      }
    }

    console.log(`Successfully generated metadata for ${imageMetadata.length} images`);

    return new Response(
      JSON.stringify({ images: imageMetadata }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in optimize-images:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
