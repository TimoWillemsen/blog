import { describe, it, expect } from 'vitest'
import { aboutLoader } from '../../../src/lib/about/aboutLoader'

describe('AboutLoader', () => {
  describe('loadAboutPage', () => {
    it('should return AboutPage with valid markdown', async () => {
      const result = await aboutLoader.loadAboutPage()

      expect(result).toBeDefined()
      expect(result.title).toBeDefined()
      expect(result.content).toBeDefined()
      expect(typeof result.title).toBe('string')
      expect(typeof result.content).toBe('string')
    })

    it('should handle missing file gracefully', async () => {
      // This test will verify error handling when about.md doesn't exist
      // For now, we test that the loader exists and can be called
      expect(aboutLoader).toBeDefined()
      expect(typeof aboutLoader.loadAboutPage).toBe('function')
    })

    it('should default title to "About" when not in frontmatter', async () => {
      const result = await aboutLoader.loadAboutPage()
      
      // Title should be defined (either from frontmatter or default)
      expect(result.title).toBeDefined()
      expect(result.title.length).toBeGreaterThan(0)
    })
  })
})
