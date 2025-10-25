import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

interface AmazonProductData {
  productURL: string;
  productASIN: string;
  amazonSite: string;
  productTitle: string;
  price: string;
  productImages: string[];
  productCategoryBreadcrumbs: string[];
  attributes: Record<string, string>;
  aboutThisItem: string[];
  averageRating: number;
  totalVotes: number;
  colors: string[];
  styles: string[];
}

function extractASINFromURL(url: string): string | null {
  try {
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
    const urlObj = new URL(cleanUrl);
    const asinParam = urlObj.searchParams.get('ASIN');
    if (asinParam && /^[A-Z0-9]{10}$/i.test(asinParam)) {
      return asinParam.toUpperCase();
    }

    return null;
  } catch (error) {
    console.error('Error extracting ASIN:', error);
    return null;
  }
}

function extractAmazonDomain(url: string): string | null {
  try {
    const urlObj = new URL(url.trim());
    const hostname = urlObj.hostname.toLowerCase().replace('www.', '');
    
    if (AMAZON_DOMAINS.includes(hostname)) {
      return hostname;
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

function isValidAmazonURL(url: string): boolean {
  try {
    const urlObj = new URL(url.trim());
    const hostname = urlObj.hostname.toLowerCase();
    
    const isAmazonDomain = AMAZON_DOMAINS.some(
      (domain) => hostname === domain || hostname === `www.${domain}`
    );
    
    if (!isAmazonDomain) {
      return false;
    }
    
    const asin = extractASINFromURL(url);
    return asin !== null;
  } catch (error) {
    return false;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productUrl, productName } = await req.json();
    
    if (!productUrl) {
      return new Response(
        JSON.stringify({ error: 'Product URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate Amazon URL
    if (!isValidAmazonURL(productUrl)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid Amazon URL. Please provide a valid Amazon product URL with a product ASIN.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract ASIN and domain
    const asin = extractASINFromURL(productUrl);
    const domain = extractAmazonDomain(productUrl);

    if (!asin || !domain) {
      return new Response(
        JSON.stringify({ error: 'Could not extract product ASIN from URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing Amazon product: ASIN=${asin}, Domain=${domain}`);

    // TODO: Integrate with RapidAPI/ScraperAPI for real Amazon product scraping
    // For now, return normalized mock data based on extracted information
    
    const normalizedData: AmazonProductData = {
      productURL: productUrl,
      productASIN: asin,
      amazonSite: domain,
      productTitle: productName || `Product ${asin}`,
      price: '$0.00', // Placeholder - will be scraped
      productImages: [], // Placeholder - will be scraped
      productCategoryBreadcrumbs: [], // Placeholder - will be scraped
      attributes: {}, // Placeholder - will be scraped
      aboutThisItem: [], // Placeholder - will be scraped
      averageRating: 0, // Placeholder - will be scraped
      totalVotes: 0, // Placeholder - will be scraped
      colors: [], // Placeholder - will be scraped
      styles: [], // Placeholder - will be scraped
    };

    console.log('Successfully extracted Amazon product data');
    console.log('NOTE: Real scraping integration pending. Add RapidAPI or ScraperAPI credentials for full functionality.');

    return new Response(
      JSON.stringify({
        ...normalizedData,
        _note: 'This is extracted metadata. Connect to RapidAPI or ScraperAPI for full product details.'
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in scrape-amazon-product:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
