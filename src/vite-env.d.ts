/// <reference types="vite/client" />

// Buffer polyfill for browser
declare global {
  interface Window {
    Buffer: typeof Buffer
  }
}

export {}

