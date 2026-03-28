import { Suspense, lazy, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, Mail, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useLang } from '../context/LanguageContext'
import { personal, stats } from '../data/content'

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

// 3D photo with orbital rings + mouse tilt
function HeroPhoto() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { stiffness: 350, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 350, damping: 30 })

  const glowX = useTransform(mouseX, [-0.5, 0.5], ['20%', '80%'])
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['20%', '80%'])

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
        width: '560px', height: '560px',
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        perspective: '1000px',
      }}
    >
      {/* ── Ambient glow ── */}
      <div style={{
        position: 'absolute', inset: '40px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(6,182,212,0.12) 50%, transparent 75%)',
        filter: 'blur(32px)', pointerEvents: 'none',
      }} />

      {/* ── Outer orbital ring ── */}
      <div style={{
        position: 'absolute', inset: '4px', borderRadius: '50%',
        border: '1px solid rgba(59,130,246,0.25)',
        animation: 'orbit1 9s linear infinite',
        transformStyle: 'preserve-3d',
      }}>
        <div style={{
          position: 'absolute', top: '-7px', left: '50%', transform: 'translateX(-50%)',
          width: '14px', height: '14px', borderRadius: '50%',
          background: '#3b82f6', boxShadow: '0 0 18px 6px rgba(59,130,246,0.8)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)',
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#60a5fa', boxShadow: '0 0 10px rgba(96,165,250,0.6)',
        }} />
      </div>

      {/* ── Middle orbital ring ── */}
      <div style={{
        position: 'absolute', inset: '56px', borderRadius: '50%',
        border: '1px solid rgba(139,92,246,0.3)',
        animation: 'orbit2 7s linear infinite',
        transformStyle: 'preserve-3d',
      }}>
        <div style={{
          position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)',
          width: '12px', height: '12px', borderRadius: '50%',
          background: '#8b5cf6', boxShadow: '0 0 16px 4px rgba(139,92,246,0.8)',
        }} />
      </div>

      {/* ── Inner orbital ring ── */}
      <div style={{
        position: 'absolute', inset: '108px', borderRadius: '50%',
        border: '1px solid rgba(6,182,212,0.25)',
        animation: 'orbit3 12s linear infinite',
        transformStyle: 'preserve-3d',
      }}>
        <div style={{
          position: 'absolute', top: '-5px', left: '50%', transform: 'translateX(-50%)',
          width: '10px', height: '10px', borderRadius: '50%',
          background: '#06b6d4', boxShadow: '0 0 14px 4px rgba(6,182,212,0.7)',
        }} />
      </div>

      {/* ── Photo card with 3D tilt ── */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', position: 'relative', zIndex: 10 }}
      >
        {/* Card */}
        <div style={{
          width: '260px', height: '340px', borderRadius: '28px',
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

          {/* Moving shimmer that follows mouse */}
          <motion.div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.06) 0%, transparent 60%)',
          }} />

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
            position: 'absolute', top: '30px', right: '20px', zIndex: 20,
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

      {/* ── Floating stat — left ── */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: '8px', top: '160px', zIndex: 20,
          padding: '16px 20px', borderRadius: '18px',
          background: 'var(--c-floating)',
          border: '1px solid var(--c-border-md)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          minWidth: '120px',
        }}
      >
        <p style={{ fontSize: '32px', fontWeight: 900, color: '#3b82f6', lineHeight: 1 }}>
          {stats[0]?.value ?? '3+'}
        </p>
        <p style={{ fontSize: '11px', color: 'var(--c-muted)', marginTop: '5px' }}>
          {stats[0]?.label}
        </p>
      </motion.div>

      {/* ── Floating stat — right ── */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        style={{
          position: 'absolute', right: '8px', bottom: '150px', zIndex: 20,
          padding: '16px 20px', borderRadius: '18px',
          background: 'var(--c-floating)',
          border: '1px solid var(--c-border-md)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          minWidth: '120px',
        }}
      >
        <p style={{ fontSize: '32px', fontWeight: 900, color: '#06b6d4', lineHeight: 1 }}>
          {stats[1]?.value ?? '20+'}
        </p>
        <p style={{ fontSize: '11px', color: 'var(--c-muted)', marginTop: '5px' }}>
          {stats[1]?.label}
        </p>
      </motion.div>

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
