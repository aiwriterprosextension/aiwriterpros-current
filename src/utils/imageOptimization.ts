/**
 * Image Optimization Utilities
 * Handles image dimension calculations and optimization presets
 */

export type ImageFormat = 'WebP' | 'JPEG' | 'PNG' | 'GIF';

export interface ImageOptimizationConfig {
  format: ImageFormat;
  quality: number;
  maxWidth: number;
  maxHeight: number;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Predefined image optimization presets
 */
export const imagePresets: Record<string, ImageOptimizationConfig> = {
  featured: {
    format: 'WebP',
    quality: 85,
    maxWidth: 1200,
    maxHeight: 630, // Optimal for Open Graph
  },
  inline: {
    format: 'WebP',
    quality: 80,
    maxWidth: 800,
    maxHeight: 600,
  },
  thumbnail: {
    format: 'WebP',
    quality: 75,
    maxWidth: 300,
    maxHeight: 300,
  },
  hero: {
    format: 'WebP',
    quality: 90,
    maxWidth: 1920,
    maxHeight: 1080,
  },
  gallery: {
    format: 'WebP',
    quality: 80,
    maxWidth: 600,
    maxHeight: 600,
  },
};

/**
 * Calculate optimized image dimensions while maintaining aspect ratio
 * @param originalWidth - Original image width
 * @param originalHeight - Original image height
 * @param maxWidth - Maximum allowed width
 * @param maxHeight - Maximum allowed height
 * @returns Calculated dimensions maintaining aspect ratio
 */
export function calculateImageDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): ImageDimensions {
  try {
    // Validate inputs
    if (
      originalWidth <= 0 ||
      originalHeight <= 0 ||
      maxWidth <= 0 ||
      maxHeight <= 0
    ) {
      throw new Error('Invalid dimensions provided');
    }

    // If image is already smaller than max dimensions, return original
    if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
      return {
        width: originalWidth,
        height: originalHeight,
      };
    }

    // Calculate aspect ratio
    const aspectRatio = originalWidth / originalHeight;

    // Calculate dimensions based on width constraint
    let newWidth = maxWidth;
    let newHeight = Math.round(newWidth / aspectRatio);

    // If height exceeds max, recalculate based on height constraint
    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = Math.round(newHeight * aspectRatio);
    }

    return {
      width: newWidth,
      height: newHeight,
    };
  } catch (error) {
    console.error('Error calculating image dimensions:', error);
    // Return safe default dimensions
    return {
      width: maxWidth,
      height: maxHeight,
    };
  }
}

/**
 * Get preset configuration by name
 * @param presetName - Name of the preset
 * @returns Image optimization configuration
 */
export function getImagePreset(
  presetName: keyof typeof imagePresets
): ImageOptimizationConfig {
  const preset = imagePresets[presetName];
  if (!preset) {
    console.warn(`Preset "${presetName}" not found, using "inline" preset`);
    return imagePresets.inline;
  }
  return preset;
}

/**
 * Calculate file size reduction percentage
 * @param originalSize - Original file size in bytes
 * @param optimizedSize - Optimized file size in bytes
 * @returns Percentage reduction (0-100)
 */
export function calculateSizeReduction(
  originalSize: number,
  optimizedSize: number
): number {
  try {
    if (originalSize <= 0 || optimizedSize <= 0) {
      return 0;
    }

    const reduction = ((originalSize - optimizedSize) / originalSize) * 100;
    return Math.max(0, Math.min(100, Math.round(reduction)));
  } catch (error) {
    console.error('Error calculating size reduction:', error);
    return 0;
  }
}

/**
 * Format file size for display
 * @param bytes - File size in bytes
 * @returns Formatted file size string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  try {
    if (bytes === 0) return '0 Bytes';
    if (bytes < 0) return 'Invalid';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  } catch (error) {
    console.error('Error formatting file size:', error);
    return 'Unknown';
  }
}

/**
 * Validate image format
 * @param format - Image format string
 * @returns true if valid format
 */
export function isValidImageFormat(format: string): format is ImageFormat {
  const validFormats: ImageFormat[] = ['WebP', 'JPEG', 'PNG', 'GIF'];
  return validFormats.includes(format as ImageFormat);
}

/**
 * Get optimal preset based on image dimensions
 * @param width - Image width
 * @param height - Image height
 * @returns Recommended preset name
 */
export function getOptimalPreset(
  width: number,
  height: number
): keyof typeof imagePresets {
  const aspectRatio = width / height;

  // Featured image aspect ratio (1.91:1)
  if (Math.abs(aspectRatio - 1.91) < 0.1 && width >= 1000) {
    return 'featured';
  }

  // Hero image (wide landscape)
  if (width >= 1500 && aspectRatio > 1.5) {
    return 'hero';
  }

  // Thumbnail (small or square)
  if (width <= 400 || height <= 400) {
    return 'thumbnail';
  }

  // Gallery (squarish)
  if (Math.abs(aspectRatio - 1) < 0.3 && width <= 800) {
    return 'gallery';
  }

  // Default to inline for most content images
  return 'inline';
}

/**
 * Generate responsive image srcset
 * @param baseUrl - Base image URL
 * @param widths - Array of widths for responsive images
 * @returns srcset string
 */
export function generateSrcSet(baseUrl: string, widths: number[]): string {
  try {
    if (!baseUrl || !widths || widths.length === 0) {
      return baseUrl;
    }

    return widths
      .map((width) => `${baseUrl}?w=${width} ${width}w`)
      .join(', ');
  } catch (error) {
    console.error('Error generating srcset:', error);
    return baseUrl;
  }
}
