import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, Sun, Moon } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { lang, toggleLang, t, isRTL } = useLang()
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-links only make sense on the home page
  const scrollLinks = [
    { label: t.nav.home,      href: '#home'      },
    { label: t.nav.services,  href: '#services'  },
    { label: t.nav.portfolio, href: '#portfolio' },
    { label: t.nav.skills,    href: '#skills'    },
    { label: t.nav.about,     href: '#about'     },
    { label: t.nav.contact,   href: '#contact'   },
  ]

  const handleScrollNav = (href) => {
    setMenuOpen(false)
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 300)
    }
  }

  const handleHireMeClick = (e) => {
    e.preventDefault()
    handleScrollNav('#contact')
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-2xl border-b shadow-2xl'
          : 'bg-transparent'
      }`}
      style={scrolled ? {
        background: 'var(--c-nav-solid)',
        borderColor: 'var(--c-border)',
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleScrollNav('#home') }}
          className="flex items-center gap-2 font-bold text-xl no-underline"
          style={{ color: 'var(--c-text)' }}
          whileHover={{ scale: 1.02 }}
        >
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
            W
          </span>
          <span className="hidden sm:block">
            Wael <span style={{ color: '#3b82f6' }}>Taleb</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {scrollLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleScrollNav(link.href) }}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 no-underline"
              style={{ color: 'var(--c-text-dim)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--c-text)'; e.currentTarget.style.background = 'var(--c-surface-2)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--c-text-dim)'; e.currentTarget.style.background = 'transparent' }}
            >
              {link.label}
            </a>
          ))}
          {/* Projects page link */}
          <Link
            to="/projects"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 no-underline"
            style={{
              color: location.pathname === '/projects' ? '#3b82f6' : 'var(--c-text-dim)',
              background: location.pathname === '/projects' ? 'rgba(59,130,246,0.1)' : 'transparent',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#3b82f6'; e.currentTarget.style.background = 'rgba(59,130,246,0.1)' }}
            onMouseLeave={e => {
              e.currentTarget.style.color = location.pathname === '/projects' ? '#3b82f6' : 'var(--c-text-dim)'
              e.currentTarget.style.background = location.pathname === '/projects' ? 'rgba(59,130,246,0.1)' : 'transparent'
            }}
          >
            {lang === 'en' ? 'Projects' : 'المشاريع'}
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 border"
            style={{
              color: isDark ? '#f59e0b' : '#3b82f6',
              borderColor: isDark ? 'rgba(245,158,11,0.3)' : 'rgba(59,130,246,0.3)',
              background: isDark ? 'rgba(245,158,11,0.08)' : 'rgba(59,130,246,0.08)',
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>

          {/* Language Toggle */}
          <motion.button
            onClick={toggleLang}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border"
            style={{
              color: '#3b82f6',
              borderColor: 'rgba(59,130,246,0.3)',
              background: 'rgba(59,130,246,0.08)',
            }}
          >
            <Globe size={14} />
            <span>{lang === 'en' ? 'AR' : 'EN'}</span>
          </motion.button>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            onClick={handleHireMeClick}
            className="hidden md:flex btn-primary text-sm py-2 px-5"
          >
            {lang === 'en' ? 'Hire Me' : 'وظّفني'}
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: 'var(--c-text-dim)' }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t"
            style={{
              background: 'var(--c-floating)',
              backdropFilter: 'blur(20px)',
              borderColor: 'var(--c-border)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {scrollLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleScrollNav(link.href) }}
                  className="px-4 py-3 rounded-lg text-sm font-medium no-underline transition-colors"
                  style={{ color: 'var(--c-text-dim)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--c-text)'; e.currentTarget.style.background = 'var(--c-surface-2)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--c-text-dim)'; e.currentTarget.style.background = 'transparent' }}
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/projects"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium no-underline transition-colors"
                style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.08)' }}
              >
                {lang === 'en' ? 'Projects' : 'المشاريع'}
              </Link>
              <a
                href="#contact"
                onClick={handleHireMeClick}
                className="mt-2 btn-primary text-center text-sm"
              >
                {lang === 'en' ? 'Hire Me' : 'وظّفني'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
