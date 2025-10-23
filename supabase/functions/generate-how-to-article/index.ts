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

    const systemPrompt = `You are an expert tutorial writer specializing in clear, actionable how-to guides. You create comprehensive, SEO-optimized instructional content that helps readers accomplish specific tasks successfully.`;

    const userPrompt = `Create a comprehensive how-to article about: ${topic}

CONFIGURATION:
- Target Word Count: ${configuration.wordCount} words
- Tone: ${configuration.tone}
- Reading Level: ${configuration.readingLevel}
- Primary Keyword: ${configuration.primaryKeyword || 'auto-detect'}
- Secondary Keywords: ${configuration.secondaryKeywords || 'auto-detect'}
- Meta Description: ${configuration.metaDescription || 'auto-generate'}
- Difficulty Level: ${configuration.difficulty || 'Beginner to Intermediate'}
- Number of Steps: ${configuration.stepCount || 'auto-determine'}
- Schema Type: ${configuration.schemaType}
- Include Troubleshooting: ${configuration.includeTroubleshooting !== false}
- FAQ Count: ${configuration.faqCount}
- Image Guidelines: ${configuration.imageCount} images in ${configuration.imageFormat} format

STRUCTURE (14 Comprehensive Sections):

## 1. Title & Meta
- H1: "How to [Task]: Complete Step-by-Step Guide [Year]"
- Meta Description (150-160 chars): Action-oriented with primary keyword
- URL Slug: how-to-[task-description]

## 2. Introduction & Overview (200-300 words)
- What you'll learn
- Why this matters/benefits
- Who this guide is for
- Difficulty level and time required
- Final outcome preview
- Prerequisites check

## 3. What You'll Need (150-200 words)
**Required Materials/Tools:**
- Item 1 (with specs if relevant)
- Item 2
- Item 3

**Optional But Helpful:**
- Item A
- Item B

**Skills/Knowledge Required:**
- Prerequisite 1
- Prerequisite 2

**Estimated Time:** X hours/minutes
**Difficulty:** Beginner/Intermediate/Advanced

## 4. Before You Begin (200-300 words)
- Safety precautions and warnings
- Workspace preparation
- Important things to know
- Common pitfalls to avoid
- When to seek professional help
- Legal/warranty considerations if applicable

## 5. Quick Reference Summary
- TL;DR version (5-7 bullet points)
- Key steps at a glance
- Critical success factors
- Estimated completion time breakdown

## 6. Step-by-Step Instructions (Main Content - 1500-2000 words)

### Step 1: [Action Title]
**Time Required:** X minutes
**Difficulty:** Easy/Medium/Hard

Detailed instructions paragraph explaining what to do and why.

**How to do it:**
1. Specific action 1
2. Specific action 2
3. Specific action 3

**Pro Tips:**
- Expert insight 1
- Expert insight 2

**Common Mistakes:**
- What to avoid and why

**You'll know you're done when:** Success indicator

**Image suggestion:** [Description]

[Repeat for each step - typically ${configuration.stepCount || '8-12'} steps]

## 7. Verification & Quality Check (200-300 words)
- How to verify you did it correctly
- Quality checkpoints
- Testing procedures
- What success looks like
- Signs something went wrong

## 8. Troubleshooting Guide (400-600 words)
**Problem 1:** [Common Issue]
- **Symptoms:** What you'll notice
- **Likely Causes:** Why it happens
- **Solutions:** How to fix it (step by step)
- **Prevention:** How to avoid it

**Problem 2:** [Another Issue]
[Same format]

**Problem 3:** [Third Issue]
[Same format]

[Include 5-8 common problems]

**Still Having Issues?**
- When to start over
- Expert help resources
- Community forums/support

## 9. Advanced Tips & Variations (300-400 words)
- Professional-level techniques
- Time-saving shortcuts
- Alternative methods
- Customization options
- How to adapt for different scenarios
- Scaling up or down
- Advanced optimizations

## 10. Common Mistakes & How to Avoid Them (300-400 words)
**Mistake 1:** [Description]
- Why people make this error
- Consequences
- How to avoid it
- How to fix if you've already made it

[Repeat for 5-7 common mistakes]

## 11. Maintenance & Longevity (200-300 words)
- How to maintain results
- Upkeep schedule
- When to redo/refresh
- Long-term care tips
- Extending lifespan
- When replacement is needed

## 12. Cost Breakdown & Budgeting (200-300 words)
- Total cost estimate
- Budget-friendly alternatives
- Where to save money
- Where NOT to cheap out
- DIY vs professional cost comparison
- Hidden costs to consider

## 13. FAQ Section (${configuration.faqCount} questions)
Address:
- "How long does this take?"
- "Is this suitable for beginners?"
- "What if I don't have [tool/material]?"
- "Can I do this without [something]?"
- "How much does this cost?"
- "What's the hardest part?"
- Process questions
- Troubleshooting questions
Each with detailed answers (75-100 words)

## 14. Conclusion & Next Steps (200-300 words)
- Recap of what was accomplished
- Benefits of following this guide
- What to do next
- Related skills to learn
- Upgrades and improvements
- Share your results (social CTA)
- Questions? (community engagement)

SEO REQUIREMENTS:
- Primary keyword in H1, first 100 words, H2s where natural
- Secondary keywords distributed naturally (8-12 instances)
- Action words and power verbs
- Header hierarchy (H1 > H2 > H3 > H4)
- Schema markup for ${configuration.schemaType} (HowTo structured data)
- Image suggestions with descriptive alt text
- Featured snippet optimization (numbered steps)

WRITING STYLE:
- ${configuration.tone} and encouraging
- ${configuration.readingLevel} reading level
- Second person ("you")
- Active voice and imperative mood
- Clear, concise instructions
- One action per step
- Short sentences (10-15 words average)
- White space and formatting for scannability

ENGAGEMENT ELEMENTS:
- ${configuration.ctaCount} strategic CTAs
- Encouragement after difficult steps
- Progress indicators
- Safety warnings highlighted
- Pro tips in callout boxes
- Before/after comparisons
- Success stories if relevant

INSTRUCTIONAL BEST PRACTICES:
- Steps in logical order
- Prerequisites clearly stated
- Visual descriptions where needed
- Measurements and specifics (not "some" or "a bit")
- Time estimates for each major step
- Difficulty ratings to set expectations
- Multiple paths when relevant

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
    console.error("Error in generate-how-to-article:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
