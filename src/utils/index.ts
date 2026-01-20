// =============================================================================
// SMOOTH BUILDER PRO - UTILITY FUNCTIONS
// =============================================================================

// =============================================================================
// COLOR UTILITIES
// =============================================================================

/**
 * Convert hex to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

/**
 * Calculate relative luminance (WCAG)
 */
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors (WCAG 2.1)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check WCAG contrast level
 */
export function getContrastLevel(
  foreground: string,
  background: string
): { ratio: number; level: 'AAA' | 'AA' | 'fail'; passes: boolean } {
  const ratio = getContrastRatio(foreground, background);
  let level: 'AAA' | 'AA' | 'fail' = 'fail';

  if (ratio >= 7) level = 'AAA';
  else if (ratio >= 4.5) level = 'AA';

  return {
    ratio: Math.round(ratio * 100) / 100,
    level,
    passes: ratio >= 4.5,
  };
}

/**
 * Lighten a color
 */
export function lighten(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * amount));
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * amount));
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * amount));

  return rgbToHex(r, g, b);
}

/**
 * Darken a color
 */
export function darken(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const r = Math.max(0, Math.round(rgb.r * (1 - amount)));
  const g = Math.max(0, Math.round(rgb.g * (1 - amount)));
  const b = Math.max(0, Math.round(rgb.b * (1 - amount)));

  return rgbToHex(r, g, b);
}

// =============================================================================
// HTML SANITIZER
// =============================================================================

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'blockquote',
];

const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'width', 'height'],
  '*': ['class', 'id'],
};

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  
  const sanitize = (node: Element) => {
    // Remove disallowed tags
    if (!ALLOWED_TAGS.includes(node.tagName.toLowerCase())) {
      node.remove();
      return;
    }

    // Remove disallowed attributes
    const allowedAttrs = [
      ...(ALLOWED_ATTRIBUTES[node.tagName.toLowerCase()] || []),
      ...(ALLOWED_ATTRIBUTES['*'] || []),
    ];

    Array.from(node.attributes).forEach(attr => {
      if (!allowedAttrs.includes(attr.name)) {
        node.removeAttribute(attr.name);
      }

      // Sanitize href to prevent javascript:
      if (attr.name === 'href') {
        const value = attr.value.trim().toLowerCase();
        if (value.startsWith('javascript:') || value.startsWith('data:')) {
          node.removeAttribute('href');
        }
      }
    });

    // Recurse
    Array.from(node.children).forEach(child => sanitize(child));
  };

  Array.from(doc.body.children).forEach(child => sanitize(child));
  return doc.body.innerHTML;
}

/**
 * Escape HTML entities
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// =============================================================================
// URL UTILITIES
// =============================================================================

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Parse URL components
 */
export function parseUrl(url: string): {
  protocol: string;
  host: string;
  pathname: string;
  search: string;
  hash: string;
} | null {
  try {
    const parsed = new URL(url);
    return {
      protocol: parsed.protocol,
      host: parsed.host,
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash,
    };
  } catch {
    return null;
  }
}

/**
 * Normalize URL (add https if missing)
 */
export function normalizeUrl(url: string): string {
  if (!url) return '';
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
}

// =============================================================================
// STRING UTILITIES
// =============================================================================

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Slugify string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[äàáâ]/g, 'a')
    .replace(/[öòóô]/g, 'o')
    .replace(/[üùúû]/g, 'u')
    .replace(/[ß]/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Truncate string
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length - 3) + '...';
}

// =============================================================================
// DEEP CLONE & MERGE
// =============================================================================

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(output[key] || {} as any, source[key] as any);
    } else if (source[key] !== undefined) {
      (output as any)[key] = source[key];
    }
  }

  return output;
}
