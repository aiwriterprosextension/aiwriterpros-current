/**
 * Amazon Product Scraper Utilities
 * Handles Amazon URL parsing, ASIN extraction, and affiliate link generation
 */

export interface AmazonProductData {
  productURL: string;
  productASIN: string;
  amazonSite: string;
  productCategoryBreadcrumbs: string[];
  productTitle: string;
  productImages: string[];
  price: string;
  colors: string[];
  styles: string[];
  attributes: Record<string, string>;
  aboutThisItem: string[];
  averageRating: number;
  totalVotes: number;
}

/**
 * Valid Amazon domain patterns
 */
const AMAZON_DOMAINS = [
  'amazon.com',
  'amazon.ca',
  'amazon.co.uk',
  'amazon.de',
  'amazon.fr',
  'amazon.in',
  'amazon.it',
  'amazon.es',
  'amazon.com.au',
  'amazon.co.jp',
];

/**
 * Extract ASIN (Amazon Standard Identification Number) from Amazon product URL
 * @param url - Amazon product URL
 * @returns ASIN string or null if not found
 */
export function extractASINFromURL(url: string): string | null {
  try {
    // Validate URL
    if (!url || typeof url !== 'string') {
      return null;
    }

    // Remove whitespace and convert to lowercase for matching
    const cleanUrl = url.trim();

    // Pattern 1: /dp/ASIN
    const dpPattern = /\/dp\/([A-Z0-9]{10})/i;
    const dpMatch = cleanUrl.match(dpPattern);
    if (dpMatch && dpMatch[1]) {
      return dpMatch[1].toUpperCase();
    }

    // Pattern 2: /gp/product/ASIN
    const gpPattern = /\/gp\/product\/([A-Z0-9]{10})/i;
    const gpMatch = cleanUrl.match(gpPattern);
    if (gpMatch && gpMatch[1]) {
      return gpMatch[1].toUpperCase();
    }

    // Pattern 3: ASIN query parameter
    const asinParam = new URL(cleanUrl).searchParams.get('ASIN');
    if (asinParam && /^[A-Z0-9]{10}$/i.test(asinParam)) {
      return asinParam.toUpperCase();
    }

    return null;
  } catch (error) {
    console.error('Error extracting ASIN from URL:', error);
    return null;
  }
}

/**
 * Validate if a URL is a valid Amazon product URL
 * @param url - URL to validate
 * @returns true if valid Amazon URL, false otherwise
 */
export function isValidAmazonURL(url: string): boolean {
  try {
    if (!url || typeof url !== 'string') {
      return false;
    }

    const urlObj = new URL(url.trim());
    const hostname = urlObj.hostname.toLowerCase();

    // Check if hostname matches any Amazon domain
    const isAmazonDomain = AMAZON_DOMAINS.some(
      (domain) => hostname === domain || hostname === `www.${domain}`
    );

    if (!isAmazonDomain) {
      return false;
    }

    // Check if URL contains a valid ASIN
    const asin = extractASINFromURL(url);
    return asin !== null;
  } catch (error) {
    return false;
  }
}

/**
 * Format Amazon affiliate URL with associate ID
 * @param asin - Product ASIN
 * @param associateId - Amazon Associate ID (tag)
 * @param domain - Amazon domain (default: amazon.com)
 * @returns Formatted affiliate URL
 */
export function formatAmazonAffiliateURL(
  asin: string,
  associateId: string,
  domain: string = 'amazon.com'
): string {
  try {
    // Validate inputs
    if (!asin || !associateId) {
      throw new Error('ASIN and Associate ID are required');
    }

    // Validate ASIN format
    if (!/^[A-Z0-9]{10}$/i.test(asin)) {
      throw new Error('Invalid ASIN format');
    }

    // Clean and validate domain
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').trim();
    if (!AMAZON_DOMAINS.includes(cleanDomain)) {
      throw new Error(`Invalid Amazon domain: ${cleanDomain}`);
    }

    // Build affiliate URL
    const baseUrl = `https://www.${cleanDomain}/dp/${asin.toUpperCase()}`;
    const affiliateUrl = `${baseUrl}?tag=${encodeURIComponent(associateId)}`;

    return affiliateUrl;
  } catch (error) {
    console.error('Error formatting affiliate URL:', error);
    throw error;
  }
}

/**
 * Extract domain from Amazon URL
 * @param url - Amazon product URL
 * @returns Amazon domain or default amazon.com
 */
export function extractAmazonDomain(url: string): string {
  try {
    const urlObj = new URL(url.trim());
    const hostname = urlObj.hostname.toLowerCase().replace('www.', '');
    
    if (AMAZON_DOMAINS.includes(hostname)) {
      return hostname;
    }
    
    return 'amazon.com';
  } catch (error) {
    return 'amazon.com';
  }
}

/**
 * Generate affiliate link from product URL
 * @param productUrl - Original Amazon product URL
 * @param associateId - Amazon Associate ID
 * @returns Affiliate URL or original URL if conversion fails
 */
export function convertToAffiliateLink(
  productUrl: string,
  associateId: string
): string {
  try {
    if (!isValidAmazonURL(productUrl)) {
      return productUrl;
    }

    const asin = extractASINFromURL(productUrl);
    if (!asin) {
      return productUrl;
    }

    const domain = extractAmazonDomain(productUrl);
    return formatAmazonAffiliateURL(asin, associateId, domain);
  } catch (error) {
    console.error('Error converting to affiliate link:', error);
    return productUrl;
  }
}
