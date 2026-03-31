import { Suspense, lazy, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, Mail, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useLang } from '../context/LanguageContext'
import { personal } from '../data/content'

// Lazy-load Three.js — only downloads after the rest of the page loads
const Scene3D = lazy(() => import('./Scene3D'))

// Subtle grid overlay
function GridOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

// Glowing sphere badges that orbit the photo
function SkillBadge({ skill }) {
  const badges = {
    react: {
      sphere: 'radial-gradient(circle at 35% 30%, rgba(97,218,251,0.55) 0%, rgba(97,218,251,0.2) 45%, rgba(10,60,100,0.6) 100%)',
      border: 'rgba(97,218,251,0.7)',
      glow: '0 0 22px 6px rgba(97,218,251,0.65)',
      highlight: 'rgba(97,218,251,0.55)',
      icon: (
        <svg width="24" height="24" viewBox="-11.5 -10.23 23 20.46" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.1">
          <circle r="2.05" fill="rgba(255,255,255,0.9)" stroke="none" />
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </svg>
      ),
    },
    js: {
      sphere: 'radial-gradient(circle at 35% 30%, rgba(247,223,30,0.55) 0%, rgba(247,223,30,0.2) 45%, rgba(80,60,0,0.6) 100%)',
      border: 'rgba(247,223,30,0.7)',
      glow: '0 0 22px 6px rgba(247,223,30,0.6)',
      highlight: 'rgba(247,223,30,0.55)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
          <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.686-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.44-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.36-.297-.147-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.169 1.095-.519 1.358-1.059.384-.697.302-1.553.298-2.509.012-1.541 0-3.083 0-4.635l.004-.043z" />
        </svg>
      ),
    },
    node: {
      sphere: 'radial-gradient(circle at 35% 30%, rgba(104,160,99,0.55) 0%, rgba(104,160,99,0.2) 45%, rgba(10,50,10,0.6) 100%)',
      border: 'rgba(104,160,99,0.7)',
      glow: '0 0 22px 6px rgba(104,160,99,0.6)',
      highlight: 'rgba(104,160,99,0.55)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
          <path d="M11.998.016a1.273 1.273 0 00-.636.18L1.245 5.863a1.273 1.273 0 00-.636 1.105v11.57c0 .457.244.879.636 1.106l10.117 5.666a1.273 1.273 0 001.274 0l10.118-5.666a1.273 1.273 0 00.636-1.105V6.968a1.273 1.273 0 00-.636-1.105L12.634.196a1.273 1.273 0 00-.636-.18z" opacity=".5"/>
          <path d="M11.79 4.456c.047 0 .092.01.134.03l3.558 2.052a.27.27 0 01.135.232v4.103a.27.27 0 01-.135.232l-3.558 2.053a.27.27 0 01-.27 0L8.096 11.11a.27.27 0 01-.135-.232V6.774a.27.27 0 01.135-.233L11.654 4.49a.27.27 0 01.136-.034z" />
        </svg>
      ),
    },
    mongo: {
      sphere: 'radial-gradient(circle at 35% 30%, rgba(71,162,72,0.55) 0%, rgba(71,162,72,0.2) 45%, rgba(5,40,5,0.6) 100%)',
      border: 'rgba(71,162,72,0.7)',
      glow: '0 0 22px 6px rgba(71,162,72,0.6)',
      highlight: 'rgba(71,162,72,0.55)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
          <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
        </svg>
      ),
    },
    css: {
      sphere: 'radial-gradient(circle at 35% 30%, rgba(21,114,182,0.55) 0%, rgba(21,114,182,0.2) 45%, rgba(5,20,60,0.6) 100%)',
      border: 'rgba(21,114,182,0.7)',
      glow: '0 0 22px 6px rgba(21,114,182,0.6)',
      highlight: 'rgba(21,114,182,0.55)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.413z" />
        </svg>
      ),
    },
  }

  const b = badges[skill]
  if (!b) return null

  return (
    <div style={{
      width: '52px', height: '52px',
      borderRadius: '50%',
      background: b.sphere,
      border: `1.5px solid ${b.border}`,
      boxShadow: `${b.glow}, inset 0 2px 6px rgba(255,255,255,0.18), inset 0 -2px 6px rgba(0,0,0,0.3)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(6px)',
      position: 'relative',
    }}>
      {/* Top-left specular highlight */}
      <div style={{
        position: 'absolute',
        top: '6px', left: '8px',
        width: '14px', height: '8px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.25)',
        filter: 'blur(3px)',
        pointerEvents: 'none',
      }} />
      {b.icon}
    </div>
  )
}

// 3D photo with orbital rings + mouse tilt
function HeroPhoto() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { stiffness: 350, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 350, damping: 30 })

  const onMove = (e) => {
    const r = containerRef.current?.getBoundingClientRect()
    if (!r) return
    mouseX.set((e.clientX - r.left) / r.width - 0.5)
    mouseY.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        width: '680px', height: '680px',
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        perspective: '1200px',
      }}
    >
      {/* ── Outer orbital ring — React (top) + JS (bottom) ── */}
      <div style={{
        position: 'absolute', inset: '4px', borderRadius: '50%',
        border: '2px solid rgba(59,130,246,0.35)',
        boxShadow: '0 0 18px 2px rgba(59,130,246,0.18), inset 0 0 18px 2px rgba(59,130,246,0.08)',
        animation: 'orbit1 9s linear infinite',
        transformStyle: 'preserve-3d',
      }}>
        <div style={{ position: 'absolute', top: '-26px', left: '50%', transform: 'translateX(-50%)' }}>
          <SkillBadge skill="react" />
        </div>
        <div style={{ position: 'absolute', bottom: '-26px', left: '50%', transform: 'translateX(-50%)' }}>
          <SkillBadge skill="js" />
        </div>
      </div>

      {/* ── Middle orbital ring — Node.js + CSS ── */}
      <div style={{
        position: 'absolute', inset: '80px', borderRadius: '50%',
        border: '2px solid rgba(139,92,246,0.35)',
        boxShadow: '0 0 18px 2px rgba(139,92,246,0.18), inset 0 0 18px 2px rgba(139,92,246,0.08)',
        animation: 'orbit2 7s linear infinite',
        transformStyle: 'preserve-3d',
      }}>
        <div style={{ position: 'absolute', top: '-26px', left: '50%', transform: 'translateX(-50%)' }}>
          <SkillBadge skill="node" />
        </div>
        <div style={{ position: 'absolute', bottom: '-26px', left: '50%', transform: 'translateX(-50%)' }}>
          <SkillBadge skill="css" />
        </div>
      </div>

      {/* ── Inner orbital ring — MongoDB ── */}
      <div style={{
        position: 'absolute', inset: '158px', borderRadius: '50%',
        border: '2px solid rgba(6,182,212,0.35)',
        boxShadow: '0 0 18px 2px rgba(6,182,212,0.18), inset 0 0 18px 2px rgba(6,182,212,0.08)',
        animation: 'orbit3 11s linear infinite',
        transformStyle: 'preserve-3d',
      }}>
        <div style={{ position: 'absolute', top: '-26px', left: '50%', transform: 'translateX(-50%)' }}>
          <SkillBadge skill="mongo" />
        </div>
      </div>

      {/* ── Photo card with 3D tilt ── */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', position: 'relative', zIndex: 10 }}
      >
        <div style={{
          width: '300px', height: '400px', borderRadius: '28px',
          overflow: 'hidden', position: 'relative',
          border: '1px solid rgba(59,130,246,0.45)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)',
        }}>
          {personal.photo ? (
            <img
              src={personal.photo}
              alt={personal.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(160deg, #1e3a5f 0%, #0f172a 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '80px', fontWeight: 900, color: '#3b82f6',
            }}>
              {personal.name.charAt(0)}
            </div>
          )}

          {/* Bottom gradient + name */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '110px',
            background: 'linear-gradient(to top, rgba(4,4,18,0.95) 0%, transparent 100%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '14px 16px',
          }}>
            <p style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '14px', letterSpacing: '0.01em' }}>
              {personal.name}
            </p>
            <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>
              {personal.title}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Available badge ── */}
      {personal.available && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{
            position: 'absolute', top: '50px', right: '40px', zIndex: 20,
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '9px 16px', borderRadius: '20px',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.35)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#10b981', boxShadow: '0 0 10px #10b981',
            animation: 'heroping 2s ease-in-out infinite', flexShrink: 0,
          }} />
          <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
            Available for work
          </span>
        </motion.div>
      )}

      <style>{`
        @keyframes orbit1 {
          from { transform: rotateX(72deg) rotateZ(0deg); }
          to   { transform: rotateX(72deg) rotateZ(360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotateX(72deg) rotateZ(50deg); }
          to   { transform: rotateX(72deg) rotateZ(410deg); }
        }
        @keyframes orbit3 {
          from { transform: rotateX(72deg) rotateZ(170deg); }
          to   { transform: rotateX(72deg) rotateZ(-190deg); }
        }
        @keyframes heroping {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.5); }
        }
      `}</style>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Hero() {
  const { t, isRTL } = useLang()
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--c-bg)', paddingTop: '80px', paddingBottom: '80px' }}
    >
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <GridOverlay />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div
          className="flex flex-col lg:flex-row items-center gap-16"
          style={{ flexDirection: isRTL ? 'row-reverse' : undefined }}
        >
          {/* ── Text side ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 min-w-0"
            style={{ textAlign: isRTL ? 'right' : 'left' }}
          >
            <motion.div variants={itemVariants} className="flex"
              style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              <span className="section-tag">
                <Sparkles size={12} />
                {t.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-black leading-tight tracking-tight mt-4"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)', lineHeight: '1.05' }}
            >
              <span style={{ color: 'var(--c-text)' }}>{t.hero.heading1}</span>
              <br />
              <span className="gradient-text glow-text">{t.hero.heading2}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 leading-relaxed max-w-xl"
              style={{
                color: 'var(--c-muted)',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                marginLeft: isRTL ? 'auto' : 0,
              }}
            >
              {t.hero.sub}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4"
              style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              <button onClick={() => scrollTo('#portfolio')} className="btn-primary">
                {t.hero.cta1}
                <ArrowDown size={16} />
              </button>
              <button onClick={() => scrollTo('#contact')} className="btn-outline">
                {t.hero.cta2}
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex items-center gap-4"
              style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              <span style={{ color: 'var(--c-faint)', fontSize: '12px', fontWeight: 500 }}>
                Find me on
              </span>
              <div className="flex gap-3">
                {[
                  { icon: GithubIcon,   href: personal.github,           label: 'GitHub'   },
                  { icon: LinkedinIcon, href: personal.linkedin,          label: 'LinkedIn' },
                  { icon: Mail,         href: `mailto:${personal.email}`, label: 'Email'    },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{ background: 'var(--c-surface-2)', border: '1px solid var(--c-border-md)', color: 'var(--c-muted)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#3b82f6'
                      e.currentTarget.style.color = '#3b82f6'
                      e.currentTarget.style.background = 'rgba(59,130,246,0.1)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--c-border-md)'
                      e.currentTarget.style.color = 'var(--c-muted)'
                      e.currentTarget.style.background = 'var(--c-surface-2)'
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── 3D Photo side ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="shrink-0 hidden lg:flex items-center justify-center"
          >
            <HeroPhoto />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--c-faint)' }}
      >
        <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {t.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
