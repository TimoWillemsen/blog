import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import { ThemeProvider } from './lib/theme/context'
import { SeasonalDecorations } from './components/layout/SeasonalDecorations'
import { HomePage } from './pages/HomePage'
import { PostPage } from './pages/PostPage'
import { AboutPage } from './pages/AboutPage'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SeasonalDecorations />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/:slug" element={<PostPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App

