import { describe, it, expect } from 'vitest'
import { normalizeTag, normalizeTags, parseTags } from '../../../src/lib/posts/tagNormalizer'

describe('normalizeTag', () => {
  it('should convert tag to lowercase', () => {
    expect(normalizeTag('React')).toBe('react')
    expect(normalizeTag('TYPESCRIPT')).toBe('typescript')
    expect(normalizeTag('Web-Development')).toBe('web-development')
  })

  it('should trim whitespace', () => {
    expect(normalizeTag(' react ')).toBe('react')
    expect(normalizeTag('  typescript  ')).toBe('typescript')
  })

  it('should preserve hyphens and underscores', () => {
    expect(normalizeTag('react-native')).toBe('react-native')
    expect(normalizeTag('react_native')).toBe('react_native')
    expect(normalizeTag('web-development')).toBe('web-development')
  })

  it('should return empty string for invalid input', () => {
    expect(normalizeTag('')).toBe('')
    expect(normalizeTag('   ')).toBe('')
  })

  it('should handle mixed case and whitespace', () => {
    expect(normalizeTag('  React  ')).toBe('react')
    expect(normalizeTag('TypeScript ')).toBe('typescript')
  })
})

describe('normalizeTags', () => {
  it('should normalize each tag in array', () => {
    expect(normalizeTags(['React', 'TypeScript', 'Web-Dev'])).toEqual([
      'react',
      'typescript',
      'web-dev',
    ])
  })

  it('should remove duplicates', () => {
    expect(normalizeTags(['React', 'react', 'REACT'])).toEqual(['react'])
    expect(normalizeTags(['react', 'typescript', 'react'])).toEqual(['react', 'typescript'])
  })

  it('should remove empty strings', () => {
    expect(normalizeTags(['react', '', 'typescript'])).toEqual(['react', 'typescript'])
    expect(normalizeTags(['', 'react', '  ', 'typescript'])).toEqual(['react', 'typescript'])
  })

  it('should handle empty array', () => {
    expect(normalizeTags([])).toEqual([])
  })

  it('should normalize and deduplicate whitespace variations', () => {
    expect(normalizeTags([' react ', 'react', '  react  '])).toEqual(['react'])
  })
})

describe('parseTags', () => {
  it('should handle array format', () => {
    expect(parseTags(['react', 'typescript'])).toEqual(['react', 'typescript'])
    expect(parseTags(['React', 'TypeScript'])).toEqual(['react', 'typescript'])
  })

  it('should handle comma-separated string format', () => {
    expect(parseTags('react, typescript')).toEqual(['react', 'typescript'])
    expect(parseTags('React, TypeScript, Web-Dev')).toEqual(['react', 'typescript', 'web-dev'])
  })

  it('should handle single string', () => {
    expect(parseTags('react')).toEqual(['react'])
    expect(parseTags('React')).toEqual(['react'])
  })

  it('should return empty array for invalid input', () => {
    expect(parseTags(null)).toEqual([])
    expect(parseTags(undefined)).toEqual([])
    expect(parseTags('')).toEqual([])
    expect(parseTags(123)).toEqual([])
    expect(parseTags({})).toEqual([])
  })

  it('should normalize parsed tags', () => {
    expect(parseTags(['  React  ', 'TypeScript'])).toEqual(['react', 'typescript'])
    expect(parseTags('  react  ,  typescript  ')).toEqual(['react', 'typescript'])
  })

  it('should handle empty array input', () => {
    expect(parseTags([])).toEqual([])
  })
})

