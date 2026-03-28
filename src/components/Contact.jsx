import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle, Loader } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useInView } from '../hooks/useInView'
import { useLang } from '../context/LanguageContext'
import { personal } from '../data/content'

export default function Contact() {
  const { t, isRTL } = useLang()
  const [ref, inView] = useInView(0.1)

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    }, 1500)
  }

  const contactItems = [
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
    { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
  ]

  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ background: 'var(--c-bg)' }}>
      <div
        className="absolute top-0 inset-x-0 h-px opacity-10"
        style={{ background: 'linear-gradient(to right, transparent, #3b82f6, transparent)' }}
      />

      {/* BG orbs */}
      <div
        className="absolute left-0 bottom-0 w-80 h-80 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: '#06b6d4' }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="section-tag">{t.contact.tag}</span>
          <h2 className="font-black mt-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--c-text)' }}>
            {t.contact.title}
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--c-muted)', fontSize: '1.0625rem' }}>
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-10 items-start`}>
          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
            style={{ order: isRTL ? 2 : 1 }}
          >
            {/* Contact info cards */}
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{
                  background: 'var(--c-surface)',
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
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--c-submuted)' }}>
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium no-underline transition-colors"
                      style={{ color: 'var(--c-text-dim)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#3b82f6'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--c-text-dim)'}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium" style={{ color: 'var(--c-text-dim)' }}>{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Availability card */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(16,185,129,0.05)',
                border: '1px solid rgba(16,185,129,0.15)',
              }}
            >
              <div className="flex items-center gap-2 mb-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }}
                />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#10b981' }}>
                  {t.contact.info.availLabel}
                </span>
              </div>
              <p className="text-sm" style={{ color: '#6ee7b7', textAlign: isRTL ? 'right' : 'left' }}>
                {t.contact.info.avail}
              </p>
            </div>

            {/* Socials */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--c-submuted)', textAlign: isRTL ? 'right' : 'left' }}
              >
                Social
              </p>
              <div className="flex gap-3" style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                    style={{
                      background: 'var(--c-surface)',
                      border: '1px solid var(--c-border-md)',
                      color: 'var(--c-muted)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#3b82f6'
                      e.currentTarget.style.color = '#3b82f6'
                      e.currentTarget.style.background = 'rgba(59,130,246,0.1)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--c-border-md)'
                      e.currentTarget.style.color = 'var(--c-muted)'
                      e.currentTarget.style.background = 'var(--c-surface)'
                    }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
            style={{ order: isRTL ? 1 : 2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl"
              style={{
                background: 'var(--c-surface)',
                border: '1px solid var(--c-border)',
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--c-submuted)', textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {t.contact.form.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.contact.form.name}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
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

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--c-submuted)', textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {t.contact.form.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.contact.form.email}
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
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
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 mt-5">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--c-submuted)', textAlign: isRTL ? 'right' : 'left' }}
                >
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t.contact.form.message}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
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

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status !== 'idle'}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                className="mt-6 w-full btn-primary justify-center py-4"
                style={status !== 'idle' ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
              >
                {status === 'idle' && <><Send size={16} />{t.contact.form.submit}</>}
                {status === 'sending' && <><Loader size={16} className="animate-spin" />{t.contact.form.sending}</>}
                {status === 'success' && <><CheckCircle size={16} />{t.contact.form.success}</>}
              </motion.button>

              {/* Success toast */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 p-4 rounded-xl flex items-center gap-3"
                    style={{
                      background: 'rgba(16,185,129,0.1)',
                      border: '1px solid rgba(16,185,129,0.3)',
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                    }}
                  >
                    <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                    <p className="text-sm" style={{ color: '#6ee7b7', textAlign: isRTL ? 'right' : 'left' }}>
                      {t.contact.form.success}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
