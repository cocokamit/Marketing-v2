import { motion } from 'framer-motion'
import SectionHead from './SectionHead'
import Counter from '../components/Counter'
import Reveal from '../components/Reveal'
import { kpis } from '../data'

function Spark({ data }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const d = data
    .map((v, i) => `${i ? 'L' : 'M'}${((i / (data.length - 1)) * 100).toFixed(1)} ${(34 - ((v - min) / (max - min || 1)) * 30).toFixed(1)}`)
    .join(' ')
  return (
    <svg viewBox="0 0 100 38" className="spark" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </svg>
  )
}

export default function Overview({ campaigns }) {
  const active = campaigns.filter((c) => c.status === 'Active').length
  const budget = campaigns.reduce((s, c) => s + c.budget, 0)
  const spent = campaigns.reduce((s, c) => s + c.spent, 0)
  const pct = budget ? Math.round((spent / budget) * 100) : 0

  return (
    <section id="overview" className="section">
      <SectionHead index="01" kicker="Overview" title="Your growth, at a glance.">
        <p>
          {active} campaigns live, {pct}% of the quarterly budget deployed.
        </p>
      </SectionHead>

      <div className="kpi-grid">
        {kpis.map((k, i) => {
          const good = k.invert ? k.delta < 0 : k.delta > 0
          return (
            <Reveal key={k.label} delay={i * 0.05} className="kpi">
              <small className="muted">{k.label}</small>
              <div className="kpi__value">
                <Counter value={k.value} prefix={k.prefix} suffix={k.suffix} decimals={k.decimals} />
              </div>
              <div className="row-between">
                <small className={`delta ${good ? 'delta--up' : 'delta--down'}`}>
                  {k.delta > 0 ? '+' : '−'}
                  {Math.abs(k.delta)}%
                </small>
                <Spark data={k.spark} />
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal className="budget">
        <div className="row-between">
          <small className="muted">Quarter budget</small>
          <small className="num">{pct}%</small>
        </div>
        <div className="budget__num">
          <Counter value={spent} prefix="$" /> <span className="muted">/ ${budget.toLocaleString()}</span>
        </div>
        <div className="bar">
          <motion.div
            className="bar__fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </Reveal>
    </section>
  )
}
