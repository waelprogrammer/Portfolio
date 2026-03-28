import { motion } from 'framer-motion'
import { MapPin, Download, Code, Users, Briefcase } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { useLang } from '../context/LanguageContext'
import { personal, bio, stats } from '../data/content'

const STAT_ICONS = [Code, Briefcase, Users]

export default function About() {
  const { t, isRTL } = useLang()
  const [ref, inView] = useInView(0.1)

  return (
    <section id="about" className="relative py-32" style={{ background: 'var(--c-bg-alt)', overflowX: 'clip' }}>
      <div
        className="absolute top-0 inset-x-0 h-px opacity-10"
        style={{ background: 'linear-gradient(to right, transparent, #8b5cf6, transparent)' }}
      />
      <div
        className="absolute right-0 top-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: '#3b82f6' }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Photo / Avatar column ── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center"
            style={{ order: isRTL ? 2 : 1 }}
          >
            <div className="relative" style={{ width: '340px', height: '460px' }}>

              {/* Glow blob behind the card */}
              <div
                className="absolute blur-3xl opacity-20 pointer-events-none"
                style={{
                  width: '300px', height: '380px',
                  left: '20px', top: '40px',
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)',
                  borderRadius: '40px',
                }}
              />

              {/* Main photo card */}
              <div
                style={{
                  position: 'absolute',
                  left: '30px', top: '20px',
                  width: '280px', height: '380px',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  border: '1px solid rgba(59,130,246,0.3)',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              >
                {personal.photo ? (
                  <img
                    src={personal.photo}
                    alt={personal.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%', height: '100%',
                      background: 'linear-gradient(160deg, #1e3a5f 0%, #0f172a 100%)',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '96px', height: '96px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '40px', fontWeight: 900, color: '#fff',
                        boxShadow: '0 0 40px rgba(59,130,246,0.5)',
                      }}
                    >
                      {personal.name.charAt(0)}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ color: '#f1f5f9', fontWeight: 700 }}>{personal.name}</p>
                      <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>{personal.title}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
                        <MapPin size={12} style={{ color: '#3b82f6' }} />
                        <span style={{ color: '#475569', fontSize: '12px' }}>{personal.location}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom gradient overlay */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
                  background: 'linear-gradient(to top, rgba(5,5,15,0.88) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }} />
                {/* Name overlay on photo */}
                {personal.photo && (
                  <div style={{ position: 'absolute', bottom: '16px', left: '18px', right: '18px' }}>
                    <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '14px' }}>{personal.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '2px' }}>{personal.title}</p>
                  </div>
                )}
              </div>

              {/* Availability badge */}
              {personal.available && (
                <div
                  style={{
                    position: 'absolute', top: '0', left: '0',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '9px 14px', borderRadius: '14px',
                    background: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.3)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#10b981', boxShadow: '0 0 8px #10b981',
                    animation: 'ping2 2s ease-in-out infinite', flexShrink: 0,
                  }} />
                  <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Available for work
                  </span>
                </div>
              )}

              {/* Code badge */}
              <div
                style={{
                  position: 'absolute', top: '0', right: '0',
                  padding: '9px 14px', borderRadius: '14px',
                  background: 'rgba(59,130,246,0.12)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#60a5fa', fontSize: '13px', fontWeight: 700,
                  fontFamily: 'monospace', backdropFilter: 'blur(12px)',
                }}
              >
                {'</>'}
              </div>

              {/* Floating stat: years */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', bottom: '50px', left: '0',
                  padding: '14px 18px', borderRadius: '16px',
                  background: 'var(--c-floating)',
                  border: '1px solid var(--c-border-md)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                  minWidth: '115px',
                }}
              >
                <p style={{ fontSize: '28px', fontWeight: 900, color: '#3b82f6', lineHeight: 1 }}>
                  {stats[0]?.value ?? '3+'}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--c-muted)', marginTop: '4px' }}>
                  {stats[0]?.label ?? 'Years Coding'}
                </p>
              </motion.div>

              {/* Floating stat: projects */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                style={{
                  position: 'absolute', bottom: '50px', right: '0',
                  padding: '14px 18px', borderRadius: '16px',
                  background: 'var(--c-floating)',
                  border: '1px solid var(--c-border-md)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                  minWidth: '115px',
                }}
              >
                <p style={{ fontSize: '28px', fontWeight: 900, color: '#06b6d4', lineHeight: 1 }}>
                  {stats[1]?.value ?? '20+'}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--c-muted)', marginTop: '4px' }}>
                  {stats[1]?.label ?? 'Projects'}
                </p>
              </motion.div>

            </div>
          </motion.div>

          {/* ── Text column ── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            style={{ order: isRTL ? 1 : 2, textAlign: isRTL ? 'right' : 'left' }}
          >
            <span className="section-tag">{t.about.tag}</span>
            <h2
              className="font-black mt-3"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--c-text)', lineHeight: 1.1 }}
            >
              {t.about.title}
            </h2>

            <p className="mt-6 leading-relaxed" style={{ color: 'var(--c-muted)', fontSize: '1.0625rem' }}>
              {bio.about1}
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: 'var(--c-muted)', fontSize: '1.0625rem' }}>
              {bio.about2}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {stats.map((stat, i) => {
                const Icon = STAT_ICONS[i]
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="p-4 rounded-xl text-center"
                    style={{
                      background: 'var(--c-surface)',
                      border: '1px solid var(--c-border)',
                    }}
                  >
                    {Icon && (
                      <Icon size={20} style={{ color: '#3b82f6', margin: '0 auto 8px' }} strokeWidth={1.5} />
                    )}
                    <p className="font-black text-2xl gradient-text">{stat.value}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--c-submuted)' }}>{stat.label}</p>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
              style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}
            >
              <a
                href={personal.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Download size={16} />
                {t.about.cta}
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-outline"
              >
                {t.contact.tag}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes ping2 {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
    </section>
  )
}
