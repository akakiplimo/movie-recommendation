import { TMDB_CONFIG } from './config'

/**
 * Get the full URL for a TMDB image
 */
export function getImageUrl(
  path: string | null | undefined,
  size: keyof typeof TMDB_CONFIG.IMAGE_SIZES.poster = 'medium'
): string {
  if (!path) {
    return '/images/placeholder-movie.png'
  }

  // Determine the size string based on the image type
  let sizeString = 'w500' // default
  
  if (path.includes('profile')) {
    sizeString = TMDB_CONFIG.IMAGE_SIZES.profile[size] || TMDB_CONFIG.IMAGE_SIZES.profile.medium
  } else if (path.includes('backdrop')) {
    sizeString = TMDB_CONFIG.IMAGE_SIZES.backdrop[size] || TMDB_CONFIG.IMAGE_SIZES.backdrop.medium
  } else {
    sizeString = TMDB_CONFIG.IMAGE_SIZES.poster[size] || TMDB_CONFIG.IMAGE_SIZES.poster.medium
  }

  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${sizeString}${path}`
}

/**
 * Format movie release date
 */
export function formatDate(dateString: string | null | undefined, format: string | null | undefined): string {
  if (!dateString) return 'TBA'
  
  try {
    const date = new Date(dateString)
    if (format === 'full') {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } else {
      return date.getFullYear().toString()
    }

  } catch {
    return 'TBA'
  }
}

/**
 * Format movie rating
 */
export function formatRating(rating: number | null | undefined): string {
  if (!rating) return 'N/A'
  return rating.toFixed(1)
}

/**
 * Format runtime in minutes to hours and minutes
 */
export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes) return 'N/A'
  
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours === 0) return `${mins}m`
  return `${hours}h ${mins}m`
}

/**
 * Format currency
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (!amount) return 'N/A'
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Get year from date string
 */
export function getYear(dateString: string | null | undefined): number | null {
  if (!dateString) return null
  
  try {
    return new Date(dateString).getFullYear()
  } catch {
    return null
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}