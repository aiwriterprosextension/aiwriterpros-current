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

    const systemPrompt = `You are an expert comparison writer specializing in detailed side-by-side product analysis. You create comprehensive, SEO-optimized comparison content that helps buyers make informed decisions between specific products.`;

    const userPrompt = `Create a comprehensive product comparison article about: ${topic}

CONFIGURATION:
- Target Word Count: ${configuration.wordCount} words
- Tone: ${configuration.tone}
- Reading Level: ${configuration.readingLevel}
- Primary Keyword: ${configuration.primaryKeyword || 'auto-detect'}
- Secondary Keywords: ${configuration.secondaryKeywords || 'auto-detect'}
- Meta Description: ${configuration.metaDescription || 'auto-generate'}
- Products to Compare: ${configuration.productCount || 2}
- Comparison Categories: ${configuration.comparisonCategories || 8}
- Schema Type: ${configuration.schemaType}
- Include Winner Selection: ${configuration.includeWinner !== false}
- FAQ Count: ${configuration.faqCount}
- Image Guidelines: ${configuration.imageCount} images in ${configuration.imageFormat} format

STRUCTURE (14 Comprehensive Sections):

## 1. Title & Meta
- H1: "[Product A] vs [Product B]: Which Should You Buy? [Year]"
- Meta Description (150-160 chars): Comparison hook with primary keyword
- URL Slug: [product-a]-vs-[product-b]-comparison

## 2. Quick Verdict (200-300 words)
- At-a-glance winner announcement
- Key differentiators summary
- Who should buy Product A
- Who should buy Product B
- Price difference highlight
- TL;DR recommendation table

## 3. Side-by-Side Comparison Table
**Quick Specs Comparison:**
| Feature | Product A | Product B | Winner |
|---------|-----------|-----------|--------|
| Price | $XXX | $XXX | 🏆 |
| Key Spec 1 | Value | Value | 🏆 |
| Key Spec 2 | Value | Value | 🏆 |
[8-12 key specifications]

## 4. Product Overviews (400-600 words)

### Product A Overview
- Brief history/background
- Target audience
- Key selling points
- Market position
- Overall rating: ⭐⭐⭐⭐⭐

### Product B Overview
- Brief history/background
- Target audience
- Key selling points
- Market position
- Overall rating: ⭐⭐⭐⭐⭐

**First Impressions:**
- Unboxing experience comparison
- Build quality observations
- Initial setup differences

## 5. Detailed Feature Comparison (1000-1500 words)

### Category 1: [e.g., Performance]
**Product A:**
- Detailed analysis
- Benchmark results
- Real-world performance

**Product B:**
- Detailed analysis
- Benchmark results
- Real-world performance

**Winner:** [Product] because [reason]
**Margin:** Significant/Moderate/Slight

[Repeat for ${configuration.comparisonCategories || 8} categories]:
- Performance
- Design & Build Quality
- Features & Functionality
- User Experience
- Value for Money
- Durability & Reliability
- Customer Support
- Ecosystem & Compatibility

## 6. Pros & Cons Breakdown (300-400 words)

### Product A
**Strengths:**
- Pro 1 (detailed explanation)
- Pro 2 (detailed explanation)
- Pro 3 (detailed explanation)
- Pro 4 (detailed explanation)

**Weaknesses:**
- Con 1 (detailed explanation)
- Con 2 (detailed explanation)
- Con 3 (detailed explanation)

### Product B
**Strengths:**
- Pro 1 (detailed explanation)
- Pro 2 (detailed explanation)
- Pro 3 (detailed explanation)
- Pro 4 (detailed explanation)

**Weaknesses:**
- Con 1 (detailed explanation)
- Con 2 (detailed explanation)
- Con 3 (detailed explanation)

## 7. Use Case Analysis (400-600 words)

**Best for Product A:**
- Use case 1 (detailed scenario)
- Use case 2 (detailed scenario)
- Use case 3 (detailed scenario)
- Ideal user profile

**Best for Product B:**
- Use case 1 (detailed scenario)
- Use case 2 (detailed scenario)
- Use case 3 (detailed scenario)
- Ideal user profile

**Scenarios Compared:**
- Scenario 1: Which performs better and why
- Scenario 2: Which performs better and why
- Scenario 3: Which performs better and why

## 8. Price & Value Comparison (300-400 words)
- Current pricing (both products)
- Historical pricing trends
- What you get for the price
- Price-to-performance ratio
- Long-term value assessment
- Total cost of ownership
- When each is worth the premium/savings
- Best deals and where to buy

## 9. Real-World Testing Results (400-500 words)
- Testing methodology
- Duration of testing
- Conditions and scenarios
- Performance metrics
- Reliability observations
- User experience findings
- Unexpected discoveries
- Long-term ownership insights

## 10. Upgrade & Alternative Considerations (300-400 words)
- Is upgrading from A to B worth it?
- Is downgrading from B to A acceptable?
- Alternative products to consider
- When to choose neither
- Future models on the horizon
- Should you wait?

## 11. Expert Recommendations (300-400 words)

**Choose Product A if:**
- Criterion 1
- Criterion 2
- Criterion 3

**Choose Product B if:**
- Criterion 1
- Criterion 2
- Criterion 3

**Avoid both if:**
- Criterion 1
- Criterion 2

**Better alternatives if:**
- Criterion 1
- Criterion 2

## 12. Winner by Category
- Overall Winner: 🏆 [Product]
- Best Value: 🏆 [Product]
- Best Performance: 🏆 [Product]
- Best Features: 🏆 [Product]
- Best Design: 🏆 [Product]
- Best for Beginners: 🏆 [Product]
- Best for Professionals: 🏆 [Product]

**Final Score:**
- Product A: X/10
- Product B: X/10

## 13. FAQ Section (${configuration.faqCount} questions)
Address:
- "Which is better for [specific use]?"
- "Is the price difference worth it?"
- "Can Product A do what Product B does?"
- "Which lasts longer?"
- "Which is easier to use?"
- "Which has better support?"
- Compatibility questions
- Upgrade path questions
Each with comprehensive answers (75-125 words)

## 14. Final Verdict (300-400 words)
- Clear winner declaration (if applicable)
- Nuanced recommendation
- Summary of key differences
- Bottom line for each product
- Personal recommendation
- Future outlook
- Strong call-to-action

SEO REQUIREMENTS:
- Primary keyword in H1, first paragraph, naturally throughout
- Comparison keywords ("vs", "compared to", "better than")
- Secondary keywords distributed (8-12 instances)
- Header hierarchy optimized
- Schema markup for ${configuration.schemaType}
- Image alt text with product names
- Featured snippet optimization (comparison table)

WRITING STYLE:
- ${configuration.tone} and balanced
- ${configuration.readingLevel} reading level
- Objective and unbiased
- Data-driven arguments
- Short paragraphs (2-4 sentences)
- Clear winner declarations
- Specific rather than vague

ENGAGEMENT ELEMENTS:
- ${configuration.ctaCount} strategic CTAs
- Winner badges throughout
- Score comparisons
- Visual comparison suggestions
- Summary boxes
- Decision flowchart suggestions

COMPARISON BEST PRACTICES:
- Fair and balanced analysis
- Same testing conditions
- Specific data points
- Real-world context
- Clear criteria
- Consistent rating system
- Updated pricing information
- No favoritism or bias

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
    console.error("Error in generate-product-comparison:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
