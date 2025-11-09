import { describe, it, expect, beforeEach } from 'vitest'
import { highlightCode, isLanguageSupported, initializeHighlighter } from '../../../src/lib/markdown/highlighter'

describe('SyntaxHighlighter', () => {
  beforeEach(() => {
    // Initialize highlighter before each test
    initializeHighlighter()
  })

  describe('isLanguageSupported', () => {
    it('should return true for supported languages', () => {
      expect(isLanguageSupported('javascript')).toBe(true)
      expect(isLanguageSupported('typescript')).toBe(true)
      expect(isLanguageSupported('python')).toBe(true)
      expect(isLanguageSupported('bash')).toBe(true)
      expect(isLanguageSupported('json')).toBe(true)
      expect(isLanguageSupported('markdown')).toBe(true)
      expect(isLanguageSupported('html')).toBe(true)
      expect(isLanguageSupported('css')).toBe(true)
      expect(isLanguageSupported('sql')).toBe(true)
    })

    it('should return false for unsupported languages', () => {
      expect(isLanguageSupported('invalid-language')).toBe(false)
      expect(isLanguageSupported('unknown')).toBe(false)
    })

    it('should return false for empty or null language', () => {
      expect(isLanguageSupported('')).toBe(false)
      // @ts-expect-error - testing invalid input
      expect(isLanguageSupported(null)).toBe(false)
      // @ts-expect-error - testing invalid input
      expect(isLanguageSupported(undefined)).toBe(false)
    })

    it('should handle case-insensitive language identifiers', () => {
      expect(isLanguageSupported('JavaScript')).toBe(true)
      expect(isLanguageSupported('PYTHON')).toBe(true)
      expect(isLanguageSupported('TypeScript')).toBe(true)
    })

    it('should handle language aliases', () => {
      expect(isLanguageSupported('js')).toBe(true)
      expect(isLanguageSupported('ts')).toBe(true)
      expect(isLanguageSupported('py')).toBe(true)
      expect(isLanguageSupported('sh')).toBe(true)
      expect(isLanguageSupported('shell')).toBe(true)
      expect(isLanguageSupported('md')).toBe(true)
    })
  })

  describe('highlight', () => {
    it('should highlight code with supported language', () => {
      const code = 'function hello() { console.log("Hello"); }'
      const result = highlightCode(code, 'javascript')

      // Should contain Prism.js highlighting classes
      expect(result).toContain('token')
      expect(result).toContain('function')
      // Should preserve code content
      expect(result).toContain('hello')
      expect(result).toContain('console')
    })

    it('should return plain HTML when language is missing', () => {
      const code = 'function hello() { console.log("Hello"); }'
      const result = highlightCode(code)

      // Should not contain Prism.js classes
      expect(result).not.toContain('token')
      // Should return escaped HTML (quotes are escaped)
      expect(result).toContain('&quot;')
      expect(result).toContain('function hello()')
    })

    it('should return plain HTML when language is unsupported', () => {
      const code = 'some code here'
      const result = highlightCode(code, 'invalid-language')

      // Should not contain Prism.js classes
      expect(result).not.toContain('token')
      // Should contain escaped code
      expect(result).toBe('some code here')
    })

    it('should handle empty code', () => {
      expect(highlightCode('')).toBe('')
      expect(highlightCode('', 'javascript')).toBe('')
    })

    it('should handle special characters', () => {
      const code = '<div>& "test"</div>'
      const result = highlightCode(code, 'html')

      // Should properly escape or highlight
      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
    })

    it('should handle long code blocks', () => {
      const code = Array(100).fill('const x = 1;').join('\n')
      const result = highlightCode(code, 'javascript')

      // Should complete without error
      expect(result).toBeTruthy()
      expect(result.length).toBeGreaterThan(0)
    })

    it('should handle code with newlines', () => {
      const code = 'function test() {\n  return true;\n}'
      const result = highlightCode(code, 'javascript')

      expect(result).toBeTruthy()
      expect(result).toContain('function')
    })

    it('should handle different languages correctly', () => {
      const jsCode = 'const x = 1;'
      const pyCode = 'x = 1'
      const bashCode = 'echo "hello"'
      const tsCode = 'const x: number = 1;'
      const jsonCode = '{"key": "value"}'
      const mdCode = '# Heading'
      const htmlCode = '<div>test</div>'
      const cssCode = '.class { color: red; }'
      const sqlCode = 'SELECT * FROM users;'

      expect(highlightCode(jsCode, 'javascript')).toContain('token')
      expect(highlightCode(pyCode, 'python')).toContain('token')
      expect(highlightCode(bashCode, 'bash')).toContain('token')
      expect(highlightCode(tsCode, 'typescript')).toContain('token')
      expect(highlightCode(jsonCode, 'json')).toContain('token')
      expect(highlightCode(mdCode, 'markdown')).toContain('token')
      expect(highlightCode(htmlCode, 'html')).toContain('token')
      expect(highlightCode(cssCode, 'css')).toContain('token')
      expect(highlightCode(sqlCode, 'sql')).toContain('token')
    })

    it('should handle language aliases correctly', () => {
      const code = 'const x = 1;'
      
      // Test all aliases
      expect(highlightCode(code, 'js')).toContain('token')
      expect(highlightCode(code, 'JS')).toContain('token')
      expect(highlightCode(code, 'javascript')).toContain('token')
      
      const pyCode = 'x = 1'
      expect(highlightCode(pyCode, 'py')).toContain('token')
      expect(highlightCode(pyCode, 'python')).toContain('token')
      
      const bashCode = 'echo "test"'
      expect(highlightCode(bashCode, 'sh')).toContain('token')
      expect(highlightCode(bashCode, 'shell')).toContain('token')
      expect(highlightCode(bashCode, 'bash')).toContain('token')
      
      const mdCode = '# Test'
      expect(highlightCode(mdCode, 'md')).toContain('token')
      expect(highlightCode(mdCode, 'markdown')).toContain('token')
    })

    it('should handle unsupported language fallback', () => {
      const code = 'some code here'
      const result = highlightCode(code, 'unsupported-lang')
      
      // Should not contain Prism.js tokens
      expect(result).not.toContain('token')
      // Should return plain code
      expect(result).toBe(code)
    })

    it('should normalize language aliases', () => {
      const code = 'const x = 1;'
      
      expect(highlightCode(code, 'js')).toContain('token')
      expect(highlightCode(code, 'JS')).toContain('token')
      expect(highlightCode(code, 'javascript')).toContain('token')
    })
  })

  describe('edge cases', () => {
    it('should handle code with HTML entities', () => {
      const code = '<div>&amp;</div>'
      const result = highlightCode(code, 'html')
      
      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
    })

    it('should handle code with quotes', () => {
      const code = 'const str = "hello \'world\'";'
      const result = highlightCode(code, 'javascript')
      
      expect(result).toBeTruthy()
      expect(result).toContain('token')
    })

    it('should handle very long lines', () => {
      const longLine = 'const x = "' + 'a'.repeat(1000) + '";'
      const result = highlightCode(longLine, 'javascript')
      
      expect(result).toBeTruthy()
      expect(result.length).toBeGreaterThan(0)
    })
  })
})

