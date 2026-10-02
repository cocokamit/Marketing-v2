import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHead from './SectionHead'
import Reveal from '../components/Reveal'
import { channelPerf, channelById } from '../data'

function Donut({ active, setActive }) {
  const R = 70
  const C = 2 * Math.PI * R
  let offset = 0
  const cur = channelPerf.find((c) => c.id === active)
  return (
    <div className="donut">
      <svg viewBox="0 0 200 200" role="img" aria-label="Budget share by channel">
        <circle cx="100" cy="100" r={R} fill="none" stroke="var(--line)" strokeWidth="10" />
        {channelPerf.map((c) => {
          const len = (c.share / 100) * C
          const seg = (
            <motion.circle
              key={c.id}
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={channelById(c.id).color}
              strokeWidth="10"
              strokeDasharray={`${len - 2} ${C}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 100 100)"
              animate={{ opacity: active && active !== c.id ? 0.15 : 1 }}
              transition={{ duration: 0.25 }}
              onPointerEnter={() => setActive(c.id)}
              onPointerLeave={() => setActive(null)}
            />
          )
          offset += len
          return seg
        })}
      </svg>
      <div className="donut__center">
        <b className="num">{cur ? `${cur.share}%` : '100%'}</b>
        <small className="muted">{cur ? channelById(cur.id).label : 'Budget share'}</small>
      </div>
    </div>
  )
}

export default function Channels() {
  const [active, setActive] = useState(null)
  const hover = (id) => ({
    onPointerEnter: () => setActive(id),
    onPointerLeave: () => setActive(null),
    onClick: () => setActive((a) => (a === id ? null : id)),
  })

  return (
    <section id="channels" className="section">
      <SectionHead index="04" kicker="Channels" title="Where the attention lives.">
        <p>Hover a channel to isolate it.</p>
      </SectionHead>

      <div className="channels">
        <Reveal className="panel">
          <div className="row-between panel__head">
            <small>Reach index</small>
            <small className="muted">Conversion</small>
          </div>
          <ul className="hbars">
            {channelPerf.map((c, i) => {
              const ch = channelById(c.id)
              return (
                <li key={c.id} {...hover(c.id)} className={active && active !== c.id ? 'is-dim' : ''}>
                  <span className="hbars__label">{ch.label}</span>
                  <span className="hbars__rail">
                    <motion.span
                      className="hbars__fill"
                      style={{ background: ch.color }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: c.reach / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                  <span className="num">{c.reach}</span>
                  <span className="num muted">{c.conv}%</span>
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal className="panel panel--donut" delay={0.08}>
          <Donut active={active} setActive={setActive} />
          <ul className="legend">
            {channelPerf.map((c) => {
              const ch = channelById(c.id)
              return (
                <li key={c.id} {...hover(c.id)} className={active && active !== c.id ? 'is-dim' : ''}>
                  <i className="swatch" style={{ background: ch.color }} /> {ch.label}
                  <span className="num muted">{c.share}%</span>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
