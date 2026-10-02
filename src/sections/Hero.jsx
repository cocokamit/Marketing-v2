import { motion } from 'framer-motion'
import { scrollTo } from './Nav'
import { CHANNELS } from '../data'

const ease = [0.22, 1, 0.36, 1]
const LINE = 'M0 90 C30 80 45 85 70 70 S110 40 140 52 S190 20 220 30 S270 8 300 12'

export default function Hero({ onNew }) {
  return (
    <section id="top" className="hero">
      <div className="hero__grid">
        <motion.div
          className="hero__copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="kicker">
            <span className="dot" /> Marketing command center · Q4 2026
          </p>
          <h1>
            Orchestrate every campaign, <span className="muted">calmly.</span>
          </h1>
          <p className="lead">
            Plan, launch and measure across social, email, search, video and events — in one quiet workspace.
          </p>
          <div className="row">
            <button className="btn btn--primary btn--lg" onClick={onNew}>
              Launch a campaign
            </button>
            <button className="btn btn--ghost btn--lg" onClick={() => scrollTo('overview')}>
              See the numbers →
            </button>
          </div>
        </motion.div>

        <motion.div
          className="card hero-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <div className="row-between">
            <small className="muted">Revenue · last 12 weeks</small>
            <small className="delta delta--up">+18.2%</small>
          </div>
          <div className="hero-card__value num">$1.28M</div>
          <svg viewBox="0 0 300 110" className="hero-card__chart" aria-hidden="true">
            <motion.path
              d={LINE}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 1.6, ease }}
            />
          </svg>
          <dl className="hero-card__foot">
            <div>
              <dt>Leads</dt>
              <dd className="num">8,432</dd>
            </div>
            <div>
              <dt>ROI</dt>
              <dd className="num">4.1×</dd>
            </div>
            <div>
              <dt>Social</dt>
              <dd className="num">34%</dd>
            </div>
          </dl>
        </motion.div>
      </div>

      <ul className="channel-strip" aria-label="Channels">
        {[...CHANNELS.map((c) => c.label), 'Influencers', 'SEO', 'Partnerships'].map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </section>
  )
}
