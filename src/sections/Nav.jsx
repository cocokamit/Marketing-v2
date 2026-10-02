import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const LINKS = [
  ['overview', 'Overview'],
  ['campaigns', 'Campaigns'],
  ['funnel', 'Funnel'],
  ['channels', 'Channels'],
  ['calendar', 'Calendar'],
  ['team', 'Team'],
]

export const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Nav({ onNew }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(id)
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="logo" onClick={go('top')}>
          <svg viewBox="0 0 64 64" width="20" height="20" aria-hidden="true">
            <path d="M8 34h12l6-14 10 26 6-12h14" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Pulse
        </a>

        <nav className="nav__links" aria-label="Sections">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={go(id)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <button className="btn btn--primary hide-sm" onClick={onNew}>
            New campaign
          </button>
          <button
            className="menu-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ul>
              {LINKS.map(([id, label], i) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={go(id)}>
                    <span className="mono muted">0{i + 1}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="btn btn--primary btn--block"
              onClick={() => {
                setOpen(false)
                onNew()
              }}
            >
              New campaign
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
