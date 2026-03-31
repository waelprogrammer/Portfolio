import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GithubIcon } from './Icons'
import { useInView } from '../hooks/useInView'
import { useLang } from '../context/LanguageContext'
import { projects } from '../data/content'
import { GRADIENT_MAP, PATTERN_COLORS } from '../config/gradients'

function PatternSVG({ gradient }) {
  const c = PATTERN_COLORS[gradient] ?? PATTERN_COLORS.blue
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full opacity-20">
      <circle cx="150" cy="90" r="50" stroke={c.stroke} strokeWidth="1" fill="none" />
      <circle cx="150" cy="90" r="80" stroke={c.stroke} strokeWidth="0.5" fill="none" />
      <line x1="0" y1="90" x2="300" y2="90" stroke={c.stroke} strokeWidth="0.5" />
      <line x1="150" y1="0" x2="150" y2="180" stroke={c.stroke} strokeWidth="0.5" />
      <polygon points="150,55 180,110 120,110" stroke={c.accent} strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function ProjectCard({ project, index, isRTL, liveDemo, sourceCode }) {
  const grad = GRADIENT_MAP[project.gradient] ?? GRADIENT_MAP.blue

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8 }}
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'var(--c-surface)',
        border: '1px solid var(--c-border)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
        e.currentTarget.style.boxShadow = `0 20px 60px var(--c-shadow)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--c-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Gradient image area */}
      <div className="relative h-52 overflow-hidden" style={{ background: grad }}>
        <PatternSVG gradient={project.gradient} />
        <div
          className="absolute top-4 left-4 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{ background: 'rgba(0,0,0,0.4)', color: '#94a3b8' }}
        >
          0{index + 1}
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
        >
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => project.liveUrl === '#' && e.preventDefault()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: '#3b82f6', color: 'white' }}
          >
            <ExternalLink size={14} />
            {liveDemo}
          </a>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => project.sourceUrl === '#' && e.preventDefault()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <GithubIcon size={14} />
            {sourceCode}
          </a>
        </div>
      </div>

      {/* Card content */}
      <div className="p-6 flex flex-col flex-1" style={{ textAlign: isRTL ? 'right' : 'left' }}>
        <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--c-text)' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--c-muted)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5" style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(59,130,246,0.1)',
                color: '#60a5fa',
                border: '1px solid rgba(59,130,246,0.2)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3" style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => project.liveUrl === '#' && e.preventDefault()}
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: '#3b82f6' }}
            onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
            onMouseLeave={e => e.currentTarget.style.color = '#3b82f6'}
          >
            <ExternalLink size={14} />
            {liveDemo}
          </a>
          <span style={{ color: 'var(--c-faintest)' }}>|</span>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => project.sourceUrl === '#' && e.preventDefault()}
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: 'var(--c-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--c-text-dim)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--c-muted)'}
          >
            <GithubIcon size={14} />
            {sourceCode}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Portfolio() {
  const { t, isRTL } = useLang()
  const [ref, inView] = useInView(0.1)

  // Only show featured projects on the homepage
  const featured = projects.filter(p => p.featured)

  return (
    <section id="portfolio" className="relative pt-16 pb-32 overflow-hidden" style={{ background: 'var(--c-bg-alt)' }}>
      <div
        className="absolute top-0 inset-x-0 h-px opacity-20"
        style={{ background: 'linear-gradient(to right, transparent, #3b82f6, #06b6d4, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
          style={{ flexDirection: isRTL ? 'row-reverse' : undefined }}
        >
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            <span className="section-tag">{t.portfolio.tag}</span>
            <h2 className="font-black mt-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--c-text)' }}>
              {t.portfolio.title}
            </h2>
            <p className="mt-4 max-w-2xl" style={{ color: 'var(--c-muted)', fontSize: '1.0625rem' }}>
              {t.portfolio.subtitle}
            </p>
          </div>

          {/* "See all projects" link */}
          <Link
            to="/projects"
            className="shrink-0 flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: '#3b82f6', whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
            onMouseLeave={e => e.currentTarget.style.color = '#3b82f6'}
          >
            {isRTL ? 'كل المشاريع' : 'All Projects'}
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Project grid — only featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isRTL={isRTL}
              liveDemo={t.portfolio.liveDemo}
              sourceCode={t.portfolio.sourceCode}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
