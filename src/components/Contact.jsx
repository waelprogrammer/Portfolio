import { motion } from 'framer-motion'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useInView } from '../hooks/useInView'
import { useLang } from '../context/LanguageContext'
import { personal } from '../data/content'

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function Contact() {
  const { t, isRTL } = useLang()
  const [ref, inView] = useInView(0.1)

  const whatsappUrl = `https://wa.me/${personal.whatsapp?.replace(/\D/g, '')}?text=${encodeURIComponent("Hello Wael, I visited your portfolio and I'd like to work with you!")}`
  const emailUrl = `mailto:${personal.email}?subject=Project Inquiry from Portfolio&body=Hi Wael,%0D%0A%0D%0AI visited your portfolio and I'd like to discuss a project with you.%0D%0A%0D%0A`

  const infoCards = [
    {
      icon: Mail,
      label: t.contact.info.emailLabel,
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: MapPin,
      label: t.contact.info.locationLabel,
      value: personal.location,
      href: null,
    },
  ]

  const socials = [
    { icon: GithubIcon, href: personal.github, label: 'GitHub' },
    { icon: LinkedinIcon, href: personal.linkedin, label: 'LinkedIn' },
  ]

  return (
    <section id="contact" className="relative pt-16 pb-32 overflow-hidden" style={{ background: 'var(--c-bg)' }}>
      {/* Top border line */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-10"
        style={{ background: 'linear-gradient(to right, transparent, #3b82f6, transparent)' }}
      />

      {/* BG orbs */}
      <div
        className="absolute left-0 bottom-0 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: '#06b6d4' }}
      />
      <div
        className="absolute right-0 top-0 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: '#3b82f6' }}
      />

      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center"
        >
          <span className="section-tag">{t.contact.tag}</span>
          <h2 className="font-black mt-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--c-text)' }}>
            {t.contact.title}
          </h2>
          
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-3xl p-8 md:p-12"
          style={{
            background: 'var(--c-surface)',
            border: '1px solid var(--c-border)',
          }}
        >
          {/* Info cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {infoCards.map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-2xl"
                style={{
                  background: 'var(--c-bg)',
                  border: '1px solid var(--c-border)',
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
                >
                  <Icon size={18} style={{ color: '#3b82f6' }} strokeWidth={1.5} />
                </div>
                <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: 'var(--c-submuted)' }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="text-sm font-medium no-underline" style={{ color: 'var(--c-text-dim)' }}>
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium" style={{ color: 'var(--c-text-dim)' }}>{value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Availability banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl mb-10"
            style={{
              background: 'rgba(16,185,129,0.05)',
              border: '1px solid rgba(16,185,129,0.2)',
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: '#10b981', boxShadow: '0 0 10px #10b981' }}
            />
            <p className="text-sm font-medium" style={{ color: '#6ee7b7' }}>
              {t.contact.info.avail}
            </p>
          </motion.div>

          

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {/* Email button */}
            <motion.a
              href={emailUrl}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: '#fff',
                boxShadow: '0 12px 32px rgba(59,130,246,0.3)',
                textDecoration: 'none',
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                <Mail size={22} />
              </div>
              <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>Send Email</p>
                <p style={{ fontWeight: 400, fontSize: '12px', opacity: 0.75 }}>Opens your email app</p>
              </div>
            </motion.a>

            {/* WhatsApp button */}
            {personal.whatsapp && (
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-4 p-5 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #25d366, #128c7e)',
                  color: '#fff',
                  boxShadow: '0 12px 32px rgba(37,211,102,0.3)',
                  textDecoration: 'none',
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <WhatsAppIcon size={22} />
                </div>
                <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>Chat on WhatsApp</p>
                  <p style={{ fontWeight: 400, fontSize: '12px', opacity: 0.75 }}>{personal.whatsapp}</p>
                </div>
              </motion.a>
            )}
          </div>

          {/* Socials */}
          <div className="flex items-center justify-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--c-submuted)' }}>
              Find me on
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--c-bg)',
                    border: '1px solid var(--c-border)',
                    color: 'var(--c-muted)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#3b82f6'
                    e.currentTarget.style.color = '#3b82f6'
                    e.currentTarget.style.background = 'rgba(59,130,246,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--c-border)'
                    e.currentTarget.style.color = 'var(--c-muted)'
                    e.currentTarget.style.background = 'var(--c-bg)'
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
