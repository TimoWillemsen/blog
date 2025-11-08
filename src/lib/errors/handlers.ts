/**
 * Error handling utilities
 */

export class BlogError extends Error {
  constructor(
    message: string,
    public code?: string,
    public cause?: unknown
  ) {
    super(message)
    this.name = 'BlogError'
  }
}

export function handleError(error: unknown, context?: string): void {
  if (error instanceof BlogError) {
    console.error(`[BlogError${context ? ` in ${context}` : ''}]:`, error.message)
    if (error.cause) {
      console.error('Cause:', error.cause)
    }
  } else if (error instanceof Error) {
    console.error(`[Error${context ? ` in ${context}` : ''}]:`, error.message)
  } else {
    console.error(`[Unknown error${context ? ` in ${context}` : ''}]:`, error)
  }
}

