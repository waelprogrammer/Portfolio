import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider, useLang } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { settings } from './data/content'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Lazy-load heavy pages (Three.js + Projects only downloaded when visited)
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))

// Apply accent color and SEO settings from content.json on startup
document.documentElement.style.setProperty('--c-accent', settings.accentColor)
if (settings.seo?.title) document.title = settings.seo.title
if (settings.seo?.description) {
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
  meta.content = settings.seo.description
}

// Main single-page layout
function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </>
  )
}

function AppContent() {
  const { isRTL } = useLang()

  useEffect(() => {
    document.documentElement.dir  = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = isRTL ? 'ar'  : 'en'
  }, [isRTL])

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/projects" element={<Suspense fallback={<div style={{background:'#0a0a0a',minHeight:'100vh'}}/>}><ProjectsPage /></Suspense>} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
