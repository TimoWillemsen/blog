/**
 * Generate URL-friendly slug from title or filename
 * @param input - Title or filename
 * @returns URL-safe slug
 */
export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD') // Normalize unicode characters (é -> e)
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

