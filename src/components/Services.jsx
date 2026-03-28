import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useLang } from '../context/LanguageContext'
import { services } from '../data/content'
import {
  Layers, Code2, Globe, Cpu, Wrench, Server
} from 'lucide-react'

const ICONS = [Layers, Code2, Globe, Cpu, Wrench, Server]

const ICON_COLORS = [
  '#3b82f6',
  '#06b6d4',
  '#8b5cf6',
  '#f59e0b',
  '#10b981',
  '#ec4899',
]

function ServiceCard({ icon: Icon, title, desc, index, color, isRTL }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl p-6 cursor-default"
      style={{
        background: 'var(--c-surface)',
        border: '1px solid var(--c-border)',
        backdropFilter: 'blur(10px)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}40`
        e.currentTarget.style.boxShadow = `0 0 40px ${color}15, 0 20px 40px var(--c-shadow)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--c-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{
          background: `${color}15`,
          border: `1px solid ${color}30`,
        }}
      >
        <Icon size={22} style={{ color }} strokeWidth={1.5} />
      </div>

      <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--c-text)', textAlign: isRTL ? 'right' : 'left' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)', textAlign: isRTL ? 'right' : 'left' }}>
        {desc}
      </p>

      {/* Hover glow top-left corner accent */}
      <div
        className="absolute top-0 left-0 w-20 h-20 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${color}20, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}

export default function Services() {
  const { t, isRTL } = useLang()
  const [ref, inView] = useInView(0.1)

  return (
    <section id="services" className="relative py-32 overflow-hidden" style={{ background: 'var(--c-bg)' }}>
      {/* Subtle section divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 opacity-40"
        style={{ background: 'linear-gradient(to bottom, transparent, #3b82f6, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        >
          <span className="section-tag">{t.services.tag}</span>
          <h2 className="font-black mt-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--c-text)' }}>
            {t.services.title}
          </h2>
          <p className="mt-4 max-w-2xl" style={{ color: 'var(--c-muted)', fontSize: '1.0625rem', marginLeft: isRTL ? 'auto' : '0', marginRight: isRTL ? '0' : 'auto' }}>
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Grid — reads from src/data/content.js */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <ServiceCard
              key={i}
              icon={ICONS[i % ICONS.length]}
              title={svc.title}
              desc={svc.desc}
              index={i}
              color={ICON_COLORS[i % ICON_COLORS.length]}
              isRTL={isRTL}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
