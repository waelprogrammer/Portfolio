import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useLang } from '../context/LanguageContext'
import { personal } from '../data/content'

export default function Footer() {
  const { t, isRTL } = useLang()

  const links = [
    { icon: GithubIcon, href: personal.github, label: 'GitHub' },
    { icon: LinkedinIcon, href: personal.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
  ]

  return (
    <footer
      className="relative py-12 border-t"
      style={{
        background: 'var(--c-bg)',
        borderColor: 'var(--c-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
            >
              W
            </span>
            <span className="font-semibold" style={{ color: 'var(--c-submuted)' }}>Wael Taleb</span>
          </div>

          {/* Copyright */}
          <p
            className="text-sm flex items-center gap-1.5"
            style={{ color: 'var(--c-faint)' }}
          >
            {t.footer.rights}
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {links.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{
                  color: 'var(--c-submuted)',
                  border: '1px solid var(--c-border)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#3b82f6'
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--c-submuted)'
                  e.currentTarget.style.borderColor = 'var(--c-border)'
                }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: 'var(--c-faintest)' }}>
          {t.footer.tagline}
        </p>
      </div>
    </footer>
  )
}
