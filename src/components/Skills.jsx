import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useLang } from '../context/LanguageContext'
import { skills } from '../data/content'

// ── Icons at 22×22 ────────────────────────────────────────────────────────
const SKILL_ICONS = {
  'HTML5': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
    </svg>
  ),
  'CSS3': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
    </svg>
  ),
  'JavaScript': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  ),
  'React': (
    <svg viewBox="-11.5 -10.23 23 20.46" fill="none" stroke="currentColor" strokeWidth="1.2" width="20" height="20">
      <circle r="2.05" fill="currentColor" stroke="none" />
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392c1.307,0.654,2.108-0.116,2.108-0.890V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"/>
    </svg>
  ),
  'Express': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.284c-.054-.27-.073-.54-.13-.78a18.44 18.44 0 010-.62zm1.114-.227c-.067.59.13 1.95.385 2.33h8.991a4.158 4.158 0 00-4.247-4.125 4.109 4.109 0 00-5.13 1.795z"/>
    </svg>
  ),
  'PHP': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.25 16.518l-4.5-4.319L12 7.757l5.75 4.442-4.5 4.319H10.75zm-.25-8.697l-4.742 3.694-3.51-3.37C3.07 6.96 4.53 6 6.24 6l4.26.001v1.82zm1 0V6l4.26-.001c1.71 0 3.17.96 3.742 2.145l-3.51 3.37L11.5 7.82zm-1 8.18v-6.5l4.5 4.319-4.5 2.181zm-1 0l-4.5-2.181 4.5-4.319v6.5z"/>
    </svg>
  ),
  'MongoDB': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.051-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
    </svg>
  ),
  'MySQL': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.19.214.274.054.072.108.147.158.22l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.047-.113-.08-.186-.052zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.534-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.38.026.276 0 .496-.174.657-.523.181-.354.181-.657 0-.915l-1.158-3.489h.76l.758 2.719c.1.09.112.2.112.3h.012c.06-.139.12-.299.18-.479l.717-2.54h.72zm9.217 4.08h-.393v-2.438c0-.566-.212-.846-.636-.846-.424 0-.636.28-.636.846v2.438h-.393v-2.438c0-.566-.212-.846-.636-.846-.424 0-.636.28-.636.846v2.438h-.393v-2.718c0-.283.07-.503.212-.657.141-.154.33-.231.566-.231.283 0 .496.118.636.354h.012c.141-.236.354-.354.636-.354.236 0 .425.077.566.231.141.154.212.374.212.657v2.718zm1.272-5.53h-1.39v5.53h.393v-2.165h.997c.354 0 .636-.105.843-.315.207-.21.311-.484.311-.823 0-.339-.104-.613-.311-.823-.207-.21-.489-.315-.843-.315zm-.997.354h.997c.236 0 .42.07.55.21.13.14.195.33.195.57 0 .24-.065.43-.195.57-.13.14-.314.21-.55.21h-.997v-1.56z"/>
    </svg>
  ),
  'PostgreSQL': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M17.128 0a10.134 10.134 0 00-2.755.403l-.063.02A10.922 10.922 0 0012.6.258C11.422.238 10.497.46 9.733.756c-.268-.114-.537-.23-.788-.328C7.338-.113 5.894-.07 4.74.618 3.585 1.308 2.87 2.61 2.51 4.15c-.49 2.073-.38 4.315.51 5.938.27.492.58.906.926 1.205-.042.29-.067.58-.063.864.01.776.261 1.449.782 1.947.22.21.48.355.763.456.151.476.42.907.872 1.15.637.34 1.37.361 2.212.196 1.186-.233 2.254-.987 2.914-1.86a7.197 7.197 0 001.039.099c.442.004.878-.04 1.306-.13.024.028.048.054.073.082.522.581 1.211.982 2.092 1.035.465.029.998-.059 1.488-.348.494-.29.88-.763 1.113-1.398.254.033.505.04.749.015.697-.074 1.338-.409 1.73-1.11.463-.831.49-1.98.17-3.117a.945.945 0 00-.023-.08c.483-.523.802-1.181.948-1.85.213-.977.115-2.077-.308-2.912-.48-.959-1.3-1.556-2.35-1.655z"/>
    </svg>
  ),
  'WordPress': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM2.007 12c0-1.301.245-2.546.682-3.696L7.064 19.56A10.013 10.013 0 012.007 12zm9.993 10c-1.48 0-2.886-.322-4.147-.895l4.402-12.79.04-.11 4.532 12.411A9.976 9.976 0 0112 22zM14.337 7.02l2.79 8.329-3.476-1.73L9.12 15.35l-2.58-7.71a9.94 9.94 0 015.457-1.58c.787 0 1.554.088 2.292.254l-.027-.027-.043.018-.032-.09.15-.196zm7.656 4.98c0 2.358-.82 4.524-2.178 6.23l-2.692-7.34 2.79-8.329A9.984 9.984 0 0121.993 12z"/>
    </svg>
  ),
  'Git': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.604 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
    </svg>
  ),
  'GitHub': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  'REST API': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  ),
  'VS Code': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.261A1 1 0 00.326 8.74L3.899 12 .326 15.26a1 1 0 00.001 1.479L1.65 17.94a.999.999 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 20.06V3.939a1.5 1.5 0 00-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
    </svg>
  ),
}

const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
)

// ── Single skill card used in marquee ─────────────────────────────────────
function SkillCard({ skill }) {
  const icon = SKILL_ICONS[skill.name] ?? FALLBACK_ICON
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '11px 20px', borderRadius: '14px', flexShrink: 0,
        background: `linear-gradient(135deg, ${skill.color}1c 0%, ${skill.color}09 100%)`,
        border: `1px solid ${skill.color}45`,
        backdropFilter: 'blur(10px)',
        cursor: 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      <span style={{ color: skill.color, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {icon}
      </span>
      <span style={{ color: 'var(--c-text)', fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap' }}>
        {skill.name}
      </span>
    </div>
  )
}

// ── Infinite marquee row ──────────────────────────────────────────────────
function MarqueeRow({ items, reverse, speed = 35 }) {
  const [paused, setPaused] = useState(false)
  // Triple-duplicate so there's always content filling the viewport
  const repeated = [...items, ...items, ...items]
  const duration = `${items.length * speed}s`
  const anim = reverse ? 'sk-right' : 'sk-left'

  return (
    <div
      style={{
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage:        'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{
        display: 'flex', gap: '12px', width: 'max-content',
        animation: `${anim} ${duration} linear infinite`,
        animationPlayState: paused ? 'paused' : 'running',
      }}>
        {repeated.map((skill, i) => <SkillCard key={i} skill={skill} />)}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────
export default function Skills() {
  const { t, isRTL } = useLang()
  const [ref, inView] = useInView(0.1)

  const row1 = skills.filter(s => s.category === 'Frontend')
  const row2 = skills.filter(s => ['Backend', 'Database'].includes(s.category))
  const row3 = skills.filter(s => ['Tools', 'CMS'].includes(s.category))

  // Summary counts for header
  const cats = [...new Set(skills.map(s => s.category))].length

  return (
    <section
      id="skills"
      className="relative pt-16 pb-24 overflow-hidden"
      style={{ background: 'var(--c-bg-alt)' }}
    >
      {/* Top separator line */}
      <div className="absolute top-0 inset-x-0 h-px opacity-10"
        style={{ background: 'linear-gradient(to right, transparent, #06b6d4, transparent)' }} />

      {/* Subtle radial background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)',
      }} />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="section-tag">{t.skills.tag}</span>
          <h2
            className="font-black mt-3"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--c-text)' }}
          >
            {t.skills.title}
          </h2>
          {/* Stat chips */}
          <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
            {[
              { label: `${skills.length} Technologies`, color: '#3b82f6' },
              { label: `${cats} Categories`,            color: '#8b5cf6' },
              { label: 'Hover to pause',                color: '#06b6d4' },
            ].map(({ label, color }) => (
              <span key={label} style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 600,
                background: `${color}14`, border: `1px solid ${color}35`, color,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Marquee rows ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          {/* Row labels + rows */}
          {[
            { label: 'Frontend',      items: row1, reverse: false, speed: 40, color: '#61dafb' },
            { label: 'Backend & DB',  items: row2, reverse: true,  speed: 38, color: '#68a063' },
            { label: 'Tools & CMS',   items: row3, reverse: false, speed: 36, color: '#f7df1e' },
          ].filter(r => r.items.length > 0).map(({ label, items, reverse, speed, color }, i) => (
            <div key={label} className="relative">
              {/* Floating category label */}
              <div style={{
                position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                zIndex: 10, pointerEvents: 'none',
              }}>
                <span style={{
                  fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color,
                  writingMode: 'vertical-rl', textOrientation: 'mixed',
                  opacity: 0.7,
                }}>
                  {label}
                </span>
              </div>

              <div style={{ paddingLeft: '22px' }}>
                <MarqueeRow items={items} reverse={reverse} speed={speed} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes sk-left {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes sk-right {
          from { transform: translateX(calc(-100% / 3)); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
