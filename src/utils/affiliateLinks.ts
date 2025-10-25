/**
 * Affiliate Links Utilities
 * Handles affiliate link configuration, CTA generation, and content insertion
 */

export type CTAStyle = 'button' | 'text' | 'image';
export type CTAPlacement = 'after-intro' | 'mid-article' | 'before-conclusion' | 'all';

export interface AffiliateConfig {
  enabled: boolean;
  amazonAssociateId?: string;
  ctaStyle: CTAStyle;
  ctaCount: number;
  ctaPlacement: CTAPlacement;
}

/**
 * Default CTA templates for different styles
 */
export const defaultCTATemplates = {
  button: [
    'Check Latest Price on Amazon',
    'View on Amazon',
    'See Current Price',
    'Get It on Amazon',
    'Buy Now on Amazon',
  ],
  text: [
    'Click here to see the latest price and reviews on Amazon',
    'You can find this product on Amazon with free shipping',
    'Check out the customer reviews and current deals on Amazon',
    'Available now on Amazon with Prime shipping',
    'See what other customers are saying on Amazon',
  ],
};

/**
 * Generate a random affiliate CTA based on configuration
 * @param config - Affiliate configuration
 * @param productName - Optional product name to personalize CTA
 * @returns CTA text string
 */
export function generateAffiliateCTA(
  config: AffiliateConfig,
  productName?: string
): string {
  try {
    if (!config.enabled) {
      return '';
    }

    const templates = defaultCTATemplates[config.ctaStyle] || defaultCTATemplates.button;
    const randomIndex = Math.floor(Math.random() * templates.length);
    let ctaText = templates[randomIndex];

    // Personalize with product name if provided
    if (productName && config.ctaStyle === 'text') {
      ctaText = ctaText.replace('this product', productName);
    }

    return ctaText;
  } catch (error) {
    console.error('Error generating affiliate CTA:', error);
    return 'View on Amazon';
  }
}

/**
 * Insert affiliate link into content at specified placement
 * @param content - Original markdown content
 * @param affiliateURL - Affiliate link URL
 * @param ctaText - Call-to-action text
 * @param placement - Where to insert the link
 * @returns Modified content with affiliate link inserted
 */
export function insertAffiliateLinkInContent(
  content: string,
  affiliateURL: string,
  ctaText: string,
  placement: CTAPlacement
): string {
  try {
    if (!content || !affiliateURL || !ctaText) {
      return content;
    }

    // Split content into paragraphs
    const paragraphs = content.split('\n\n');
    
    if (paragraphs.length === 0) {
      return content;
    }

    // Create affiliate link markdown
    const affiliateLink = `\n\n[${ctaText}](${affiliateURL})\n\n`;

    // Determine insertion points based on placement
    switch (placement) {
      case 'after-intro': {
        // Insert after first 2-3 paragraphs
        const insertIndex = Math.min(2, Math.floor(paragraphs.length * 0.15));
        paragraphs.splice(insertIndex, 0, affiliateLink.trim());
        break;
      }

      case 'mid-article': {
        // Insert in the middle of the article
        const insertIndex = Math.floor(paragraphs.length / 2);
        paragraphs.splice(insertIndex, 0, affiliateLink.trim());
        break;
      }

      case 'before-conclusion': {
        // Insert before last 2-3 paragraphs
        const insertIndex = Math.max(
          paragraphs.length - 3,
          Math.floor(paragraphs.length * 0.85)
        );
        paragraphs.splice(insertIndex, 0, affiliateLink.trim());
        break;
      }

      case 'all': {
        // Insert at multiple strategic points
        const positions = [
          Math.min(2, Math.floor(paragraphs.length * 0.15)), // After intro
          Math.floor(paragraphs.length / 2), // Middle
          Math.max(paragraphs.length - 3, Math.floor(paragraphs.length * 0.85)), // Before conclusion
        ];

        // Insert in reverse order to maintain correct indices
        for (let i = positions.length - 1; i >= 0; i--) {
          paragraphs.splice(positions[i], 0, affiliateLink.trim());
        }
        break;
      }

      default:
        return content;
    }

    return paragraphs.join('\n\n');
  } catch (error) {
    console.error('Error inserting affiliate link:', error);
    return content;
  }
}

/**
 * Insert multiple affiliate links into content
 * @param content - Original markdown content
 * @param affiliateURL - Affiliate link URL
 * @param config - Affiliate configuration
 * @param productName - Optional product name
 * @returns Modified content with affiliate links inserted
 */
export function insertMultipleAffiliateLinks(
  content: string,
  affiliateURL: string,
  config: AffiliateConfig,
  productName?: string
): string {
  try {
    if (!config.enabled || config.ctaCount <= 0) {
      return content;
    }

    let modifiedContent = content;

    // If placement is 'all', insert once with all positions
    if (config.ctaPlacement === 'all') {
      const ctaText = generateAffiliateCTA(config, productName);
      return insertAffiliateLinkInContent(
        modifiedContent,
        affiliateURL,
        ctaText,
        'all'
      );
    }

    // Otherwise, insert multiple times at the specified placement
    for (let i = 0; i < config.ctaCount; i++) {
      const ctaText = generateAffiliateCTA(config, productName);
      modifiedContent = insertAffiliateLinkInContent(
        modifiedContent,
        affiliateURL,
        ctaText,
        config.ctaPlacement
      );
    }

    return modifiedContent;
  } catch (error) {
    console.error('Error inserting multiple affiliate links:', error);
    return content;
  }
}

/**
 * Wrap CTA text with button styling (for markdown to HTML conversion)
 * @param ctaText - Call-to-action text
 * @param affiliateURL - Affiliate link URL
 * @returns HTML button markup
 */
export function formatCTAAsButton(ctaText: string, affiliateURL: string): string {
  return `<a href="${affiliateURL}" class="affiliate-button" target="_blank" rel="noopener noreferrer sponsored">${ctaText}</a>`;
}

/**
 * Add rel attributes to affiliate links for SEO compliance
 * @param url - Affiliate URL
 * @returns URL metadata for proper link attribution
 */
export function getAffiliateLinkAttributes(): {
  target: string;
  rel: string;
} {
  return {
    target: '_blank',
    rel: 'noopener noreferrer sponsored', // 'sponsored' tells search engines it's an affiliate link
  };
}
