/**
 * Check if file should be ignored (temp, backup, hidden files)
 * @param filename - File name to check
 * @returns true if file should be ignored
 */
export function shouldIgnoreFile(filename: string): boolean {
  // Ignore hidden files
  if (filename.startsWith('.')) {
    return true
  }

  // Ignore temporary/backup files
  const tempExtensions = ['.tmp', '.bak', '.swp', '~']
  if (tempExtensions.some(ext => filename.endsWith(ext))) {
    return true
  }

  // Only accept markdown files
  const validExtensions = ['.md', '.markdown']
  if (!validExtensions.some(ext => filename.endsWith(ext))) {
    return true
  }

  return false
}

