import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, configuration } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert buying guide writer specializing in comprehensive, SEO-optimized product guides. You create authoritative content that helps buyers make informed decisions across all budget levels.`;

    const userPrompt = `Create a comprehensive buying guide about: ${topic}

CONFIGURATION:
- Target Word Count: ${configuration.wordCount} words
- Tone: ${configuration.tone}
- Reading Level: ${configuration.readingLevel}
- Primary Keyword: ${configuration.primaryKeyword || 'auto-detect'}
- Secondary Keywords: ${configuration.secondaryKeywords || 'auto-detect'}
- Meta Description: ${configuration.metaDescription || 'auto-generate'}
- Budget Tiers: ${configuration.budgetTiers || 3}
- Product Recommendations: ${configuration.productCount || 10}
- Schema Type: ${configuration.schemaType}
- Include Comparison Table: ${configuration.includeComparison}
- FAQ Count: ${configuration.faqCount}
- Image Guidelines: ${configuration.imageCount} images in ${configuration.imageFormat} format

STRUCTURE (14 Comprehensive Sections):

## 1. Title & Meta
- H1: "[Primary Keyword] - Complete Buying Guide [Current Year]"
- Meta Description (150-160 chars): Compelling summary with primary keyword
- URL Slug: SEO-friendly, keyword-rich

## 2. Executive Summary (200-300 words)
- Quick overview of the guide
- Who this guide is for
- Key takeaways and recommendations
- Article navigation preview

## 3. Quick Reference Table
- Top 3 picks (Budget/Mid-Range/Premium)
- Key specs comparison
- Price ranges
- Best for scenarios

## 4. Understanding [Product Category] (400-600 words)
- What is it and why it matters
- Types and categories explained
- Common use cases
- Industry overview and trends

## 5. Key Features to Consider (600-800 words)
- Essential specifications explained
- Feature priority matrix
- How features impact performance
- Must-have vs nice-to-have features
- Technical terms demystified

## 6. Budget Breakdown (300-400 words)
- Entry-level ($): What to expect
- Mid-range ($$): Sweet spot analysis
- Premium ($$$): Professional/enthusiast tier
- Value proposition for each tier

## 7. Top Product Recommendations (1200-1500 words)
For each recommended product:
- Product name and brief intro
- Key specifications
- Pros and cons (4-6 each)
- Best for (specific use case)
- Price range and value assessment
- Where to buy (affiliate links if enabled)
- Star rating and recommendation strength

## 8. Detailed Comparison Table
- Side-by-side specs
- Performance metrics
- Price comparison
- Value scores
- Winner by category

## 9. Buying Factors Deep Dive (500-700 words)
- Size and portability considerations
- Compatibility requirements
- Brand reliability and warranty
- Customer service reputation
- Long-term cost of ownership
- Maintenance requirements

## 10. Common Mistakes to Avoid (300-400 words)
- Overspending on unnecessary features
- Ignoring compatibility
- Falling for marketing hype
- Not considering long-term needs
- Skipping warranty coverage

## 11. Expert Tips & Tricks (300-400 words)
- Shopping strategies (when to buy)
- How to spot deals vs. traps
- Negotiation tactics
- Extended warranty considerations
- Return policy insights

## 12. FAQ Section (${configuration.faqCount} questions)
Address:
- Common pre-purchase questions
- Technical clarifications
- Comparison queries
- Maintenance and longevity
- Value and pricing concerns
Each with detailed, helpful answers (50-100 words)

## 13. Future-Proofing & Trends (200-300 words)
- Emerging technologies
- What's coming next year
- Should you wait or buy now?
- Upgrade path considerations

## 14. Final Verdict & Recommendations (300-400 words)
- Overall category winner
- Best for specific budgets
- Best for specific use cases
- Editor's personal pick
- Clear call-to-action

SEO REQUIREMENTS:
- Primary keyword in H1, first paragraph, and naturally throughout
- Secondary keywords distributed naturally
- Internal linking opportunities highlighted
- Header hierarchy (H1 > H2 > H3 > H4)
- Schema markup structure for ${configuration.schemaType}
- Image alt text suggestions
- Meta title under 60 characters

WRITING STYLE:
- ${configuration.tone} and authoritative
- ${configuration.readingLevel} reading level
- Active voice preferred
- Short paragraphs (2-4 sentences)
- Bullet points for scannability
- Data and statistics where relevant
- Conversational yet professional

ENGAGEMENT ELEMENTS:
- ${configuration.ctaCount} strategic CTAs throughout
- Pro tips and expert insights highlighted
- Warning boxes for critical information
- Comparison highlights
- Money-saving tips emphasized

Return ONLY the complete markdown article with all sections, no additional commentary.`;

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
      throw new Error(`AI gateway returned ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ content: generatedContent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-buying-guide:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
