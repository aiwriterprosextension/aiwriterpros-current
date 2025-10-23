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

    const systemPrompt = `You are an expert product reviewer specializing in "Best of" roundup articles. You create comprehensive, SEO-optimized comparison content that showcases multiple products with detailed analysis.`;

    const userPrompt = `Create a comprehensive product roundup article about: ${topic}

CONFIGURATION:
- Target Word Count: ${configuration.wordCount} words
- Tone: ${configuration.tone}
- Reading Level: ${configuration.readingLevel}
- Primary Keyword: ${configuration.primaryKeyword || 'auto-detect'}
- Secondary Keywords: ${configuration.secondaryKeywords || 'auto-detect'}
- Meta Description: ${configuration.metaDescription || 'auto-generate'}
- Number of Products: ${configuration.productCount || 10}
- Categories to Include: ${configuration.categories || 'auto-detect'}
- Schema Type: ${configuration.schemaType}
- Include Comparison Table: ${configuration.includeComparison}
- FAQ Count: ${configuration.faqCount}
- Image Guidelines: ${configuration.imageCount} images in ${configuration.imageFormat} format

STRUCTURE (14 Comprehensive Sections):

## 1. Title & Meta
- H1: "Best [Product Category] of [Year] - Top ${configuration.productCount || 10} Picks Reviewed"
- Meta Description (150-160 chars): Compelling summary with primary keyword
- URL Slug: best-[category]-[year]

## 2. At-a-Glance Summary (200-300 words)
- Quick verdict paragraph
- Top 3 overall winners
- Who each product is best for
- Key takeaway highlights
- Updated date badge

## 3. Quick Comparison Table
- All products side-by-side
- Key specs (5-7 columns)
- Ratings (out of 5)
- Price points
- Best for categories
- Links to detailed reviews

## 4. How We Test & Review (300-400 words)
- Testing methodology
- Criteria and weighting
- Hands-on experience duration
- Lab tests performed
- Real-world usage scenarios
- Rating system explained
- Editorial independence statement

## 5. Category Winners (200-300 words)
- Best Overall
- Best Value
- Best Premium
- Best for Beginners
- Best for Professionals
- Most Innovative
- Editor's Choice
Brief explanation for each (30-50 words)

## 6. Detailed Product Reviews (150-200 words each)
For each of the ${configuration.productCount || 10} products:

### Product Name
- Overall Rating: ⭐⭐⭐⭐⭐
- Quick Verdict (2-3 sentences)
- Image placement suggestion

**Key Specifications:**
- Spec 1
- Spec 2
- Spec 3
- Price

**What We Love:**
- Pro 1
- Pro 2
- Pro 3
- Pro 4

**What Could Be Better:**
- Con 1
- Con 2
- Con 3

**Best For:** Specific use case

**Performance Analysis:**
- Real-world testing results
- Standout features
- Unique selling points

**Value Assessment:**
- Price-to-performance ratio
- Competitor comparison
- Long-term value

**Bottom Line:** Final recommendation (2-3 sentences)

## 7. Head-to-Head Comparisons (400-600 words)
- Premium vs Mid-Range showdown
- Brand A vs Brand B comparison
- Feature-specific battles
- Value champion analysis
- Performance benchmarks

## 8. Buying Considerations (500-700 words)
- How to choose the right one for you
- Size and space requirements
- Budget planning guide
- Feature priority matrix
- Compatibility checklist
- Future-proofing factors
- Warranty and support considerations

## 9. What to Avoid (300-400 words)
- Red flags in this category
- Overpriced features
- Common marketing traps
- Brands to be cautious of
- Features that don't justify cost
- Deal-breakers explained

## 10. Price & Value Analysis (300-400 words)
- Price range breakdown
- Best deals currently available
- Seasonal pricing patterns
- When to buy for best prices
- Refurbished vs new considerations
- Total cost of ownership

## 11. Alternative & Runner-Up Products (300-400 words)
- Honorable mentions (3-5 products)
- Why they didn't make the main list
- Specific scenarios where they excel
- Emerging products to watch

## 12. FAQ Section (${configuration.faqCount} questions)
Address:
- Product comparison questions
- Feature explanations
- Price and value queries
- Durability and longevity
- Compatibility concerns
- Maintenance questions
Each with comprehensive answers (75-125 words)

## 13. Expert Shopping Tips (300-400 words)
- Where to buy (online vs retail)
- Best time of year to purchase
- How to spot fake reviews
- Extended warranty worth it?
- Negotiation strategies
- Bundle deals analysis
- Return policy insights

## 14. Final Recommendations (300-400 words)
- Overall winner restated
- Best for different budgets
- Best for specific use cases
- Future outlook for category
- Clear call-to-action
- Last updated date

SEO REQUIREMENTS:
- Primary keyword in H1, first paragraph, naturally throughout
- Secondary keywords distributed (5-10 instances)
- Internal linking opportunities (8-12)
- Header hierarchy optimized
- Schema markup for ${configuration.schemaType}
- Image alt text suggestions (descriptive + keyword)
- Featured snippet optimization

WRITING STYLE:
- ${configuration.tone} and helpful
- ${configuration.readingLevel} reading level
- Active voice (80%+)
- Short paragraphs (2-4 sentences)
- Scannable with bullet points
- Data-driven where possible
- Unbiased and balanced

ENGAGEMENT ELEMENTS:
- ${configuration.ctaCount} strategic CTAs
- Summary boxes for each product
- Winner badges/icons suggestions
- Comparison highlights
- Price alerts/deals callouts
- Expert tips highlighted

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
    console.error("Error in generate-product-roundup:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
