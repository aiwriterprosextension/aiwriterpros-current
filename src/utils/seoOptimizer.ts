/**
 * SEO Optimization Utilities
 * Handles SEO filename generation, meta validation, and keyword extraction
 */

export interface ValidationResult {
  valid: boolean;
  length: number;
  message: string;
}

/**
 * Generate SEO-friendly filename from keyword
 * @param keyword - Primary keyword or phrase
 * @param index - Image index for uniqueness (optional)
 * @param format - Image format extension (default: 'webp')
 * @returns SEO-optimized filename
 */
export function generateSEOFilename(
  keyword: string,
  index?: number,
  format: string = 'webp'
): string {
  try {
    if (!keyword || typeof keyword !== 'string') {
      throw new Error('Keyword is required');
    }

    // Clean and normalize the keyword
    let filename = keyword
      .toLowerCase()
      .trim()
      // Remove special characters except spaces and hyphens
      .replace(/[^a-z0-9\s-]/g, '')
      // Replace multiple spaces with single space
      .replace(/\s+/g, ' ')
      // Replace spaces with hyphens
      .replace(/\s/g, '-')
      // Replace multiple hyphens with single hyphen
      .replace(/-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '');

    // Truncate if too long (max 50 chars for the keyword part)
    if (filename.length > 50) {
      filename = filename.substring(0, 50).replace(/-+$/, '');
    }

    // Add timestamp for uniqueness
    const timestamp = Date.now();
    
    // Add index if provided
    const indexSuffix = typeof index === 'number' ? `-${index}` : '';
    
    // Clean format extension
    const cleanFormat = format.toLowerCase().replace(/^\./, '');

    return `${filename}${indexSuffix}-${timestamp}.${cleanFormat}`;
  } catch (error) {
    console.error('Error generating SEO filename:', error);
    // Fallback to timestamp-based filename
    return `image-${Date.now()}.${format}`;
  }
}

/**
 * Validate meta description for SEO compliance
 * @param text - Meta description text
 * @returns Validation result with status and message
 */
export function validateMetaDescription(text: string): ValidationResult {
  try {
    if (!text || typeof text !== 'string') {
      return {
        valid: false,
        length: 0,
        message: 'Meta description is required',
      };
    }

    const trimmedText = text.trim();
    const length = trimmedText.length;

    // Optimal range: 120-160 characters
    const MIN_LENGTH = 120;
    const MAX_LENGTH = 160;

    if (length < MIN_LENGTH) {
      return {
        valid: false,
        length,
        message: `Meta description is too short. Add ${MIN_LENGTH - length} more characters (optimal: ${MIN_LENGTH}-${MAX_LENGTH}).`,
      };
    }

    if (length > MAX_LENGTH) {
      return {
        valid: false,
        length,
        message: `Meta description is too long. Remove ${length - MAX_LENGTH} characters (optimal: ${MIN_LENGTH}-${MAX_LENGTH}).`,
      };
    }

    return {
      valid: true,
      length,
      message: 'Meta description length is optimal.',
    };
  } catch (error) {
    return {
      valid: false,
      length: 0,
      message: 'Error validating meta description',
    };
  }
}

/**
 * Validate title for SEO compliance
 * @param title - Page/article title
 * @returns Validation result with status and message
 */
export function validateTitle(title: string): ValidationResult {
  try {
    if (!title || typeof title !== 'string') {
      return {
        valid: false,
        length: 0,
        message: 'Title is required',
      };
    }

    const trimmedTitle = title.trim();
    const length = trimmedTitle.length;

    // Optimal range: 30-60 characters
    const MIN_LENGTH = 30;
    const MAX_LENGTH = 60;

    if (length < MIN_LENGTH) {
      return {
        valid: false,
        length,
        message: `Title is too short. Add ${MIN_LENGTH - length} more characters (optimal: ${MIN_LENGTH}-${MAX_LENGTH}).`,
      };
    }

    if (length > MAX_LENGTH) {
      return {
        valid: false,
        length,
        message: `Title is too long. Remove ${length - MAX_LENGTH} characters (optimal: ${MIN_LENGTH}-${MAX_LENGTH}).`,
      };
    }

    return {
      valid: true,
      length,
      message: 'Title length is optimal.',
    };
  } catch (error) {
    return {
      valid: false,
      length: 0,
      message: 'Error validating title',
    };
  }
}

/**
 * Extract keywords from topic text
 * Basic keyword extraction without external dependencies
 * @param topic - Topic or article text
 * @returns Array of extracted keywords
 */
export function extractKeywordsFromTopic(topic: string): string[] {
  try {
    if (!topic || typeof topic !== 'string') {
      return [];
    }

    // Common stop words to filter out
    const stopWords = new Set([
      'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
      'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
      'to', 'was', 'will', 'with', 'can', 'how', 'what', 'when', 'where',
      'which', 'who', 'why', 'this', 'these', 'those', 'they', 'them',
      'their', 'there', 'than', 'then', 'have', 'had', 'but', 'or',
    ]);

    // Clean and normalize text
    const cleanText = topic
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Split into words
    const words = cleanText.split(' ');

    // Count word frequency
    const wordFrequency = new Map<string, number>();
    
    for (const word of words) {
      // Skip short words and stop words
      if (word.length < 3 || stopWords.has(word)) {
        continue;
      }

      wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
    }

    // Sort by frequency and return top keywords
    const sortedKeywords = Array.from(wordFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word)
      .slice(0, 10); // Return top 10 keywords

    return sortedKeywords;
  } catch (error) {
    console.error('Error extracting keywords:', error);
    return [];
  }
}

/**
 * Generate slug from title
 * @param title - Article or page title
 * @returns URL-friendly slug
 */
export function generateSlug(title: string): string {
  try {
    if (!title || typeof title !== 'string') {
      return '';
    }

    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  } catch (error) {
    console.error('Error generating slug:', error);
    return '';
  }
}
