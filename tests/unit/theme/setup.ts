/**
 * Test setup utilities for theme system tests
 * 
 * Provides helper functions and mocks for testing theme-related functionality
 */

import { beforeEach, afterEach, vi } from 'vitest'

/**
 * Mock localStorage for testing
 */
export function createMockLocalStorage(): Storage {
  const store: Record<string, string> = {}

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((key) => delete store[key])
    }),
    get length() {
      return Object.keys(store).length
    },
    key: vi.fn((index: number) => {
      const keys = Object.keys(store)
      return keys[index] || null
    }),
  }
}

/**
 * Setup localStorage mock before each test
 */
export function setupLocalStorageMock() {
  const mockStorage = createMockLocalStorage()
  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true,
  })
  return mockStorage
}

/**
 * Clean up localStorage mock after each test
 */
export function cleanupLocalStorageMock() {
  delete (window as any).localStorage
}

/**
 * Mock Date for testing seasonal theme availability
 */
export function mockDate(year: number, month: number, day: number = 1) {
  const mockDate = new Date(year, month, day)
  vi.useFakeTimers()
  vi.setSystemTime(mockDate)
  return mockDate
}

/**
 * Restore real Date after test
 */
export function restoreDate() {
  vi.useRealTimers()
}

/**
 * Setup function to run before each theme test
 */
export function setupThemeTests() {
  beforeEach(() => {
    setupLocalStorageMock()
  })

  afterEach(() => {
    cleanupLocalStorageMock()
    restoreDate()
    vi.clearAllMocks()
  })
}

