/**
 * Normalize a single tag string for consistent matching and storage.
 * Converts to lowercase and trims whitespace.
 *
 * @param tag - Tag string to normalize
 * @returns Normalized tag string (lowercase, trimmed), or empty string if invalid
 */
export function normalizeTag(tag: string): string {
  if (!tag || typeof tag !== 'string') {
    return ''
  }
  return tag.trim().toLowerCase()
}

/**
 * Normalize an array of tag strings.
 * Normalizes each tag, removes duplicates, and filters out empty strings.
 *
 * @param tags - Array of tag strings to normalize
 * @returns Array of normalized, unique tag strings
 */
export function normalizeTags(tags: string[]): string[] {
  if (!Array.isArray(tags)) {
    return []
  }

  const normalized = tags
    .map((tag) => normalizeTag(tag))
    .filter((tag) => tag.length > 0)

  // Remove duplicates by converting to Set and back to array
  return Array.from(new Set(normalized))
}

/**
 * Parse tags from frontmatter value (handles both array and string formats).
 * Normalizes the parsed tags.
 *
 * @param value - Frontmatter tags value (array, string, or other)
 * @returns Array of normalized tag strings
 */
export function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    // Handle array format: ["tag1", "tag2"]
    return normalizeTags(value.map((item) => String(item)))
  }

  if (typeof value === 'string') {
    if (value.trim() === '') {
      return []
    }
    // Handle comma-separated string format: "tag1, tag2"
    return normalizeTags(
      value
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
    )
  }

  // Invalid input: return empty array
  return []
}

