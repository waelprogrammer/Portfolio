import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowLeft, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GithubIcon } from '../components/Icons'
import { projects } from '../data/content'
import Navbar from '../components/Navbar'
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

function ProjectCard({ project, index }) {
  const grad = GRADIENT_MAP[project.gradient] ?? GRADIENT_MAP.blue

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'var(--c-surface)',
        border: '1px solid var(--c-border)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
        e.currentTarget.style.boxShadow = '0 20px 60px var(--c-shadow)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--c-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Image area */}
      <div className="relative h-44 overflow-hidden" style={{ background: grad }}>
        <PatternSVG gradient={project.gradient} />
        {project.featured && (
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold"
            style={{
              background: 'rgba(59,130,246,0.3)',
              border: '1px solid rgba(59,130,246,0.5)',
              color: '#93c5fd',
              backdropFilter: 'blur(4px)',
            }}
          >
            Featured
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
        >
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => project.liveUrl === '#' && e.preventDefault()}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold"
            style={{ background: '#3b82f6', color: 'white' }}
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => project.sourceUrl === '#' && e.preventDefault()}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <GithubIcon size={13} />
            Source
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base mb-2" style={{ color: 'var(--c-text)' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--c-muted)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full text-xs font-semibold"
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
      </div>
    </motion.article>
  )
}

// Collect all unique tags across all projects
function getAllTags(list) {
  const set = new Set()
  list.forEach(p => p.tags.forEach(t => set.add(t)))
  return ['All', ...Array.from(set)]
}

export default function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const tags = getAllTags(projects)

  const filtered = projects.filter(p => {
    const matchTag = activeTag === 'All' || p.tags.includes(activeTag)
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  })

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16" style={{ paddingTop: '96px' }}>
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-6"
        >
          <div>
            <h1 className="font-black" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--c-text)' }}>
              All <span className="gradient-text">Projects</span>
            </h1>
            <p className="mt-3" style={{ color: 'var(--c-muted)', fontSize: '1.0625rem' }}>
              Every project I've built — filterable by technology.
            </p>
          </div>
          <span
            className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-full shrink-0"
            style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}
          >
            {filtered.length} projects
          </span>
        </motion.div>

        {/* Search + Filter row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--c-submuted)' }}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: 'var(--c-surface-2)',
                border: '1px solid var(--c-border-md)',
                color: 'var(--c-text)',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--c-border-md)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                style={
                  activeTag === tag
                    ? { background: '#3b82f6', color: 'white' }
                    : {
                        background: 'var(--c-surface-2)',
                        color: 'var(--c-muted)',
                        border: '1px solid var(--c-border-md)',
                      }
                }
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24" style={{ color: 'var(--c-faint)' }}>
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-semibold text-lg" style={{ color: 'var(--c-submuted)' }}>No projects found</p>
            <p className="text-sm mt-2">Try a different search or tag filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
