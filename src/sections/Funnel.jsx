import { motion } from 'framer-motion'
import SectionHead from './SectionHead'
import Reveal from '../components/Reveal'
import { funnel } from '../data'

export default function Funnel() {
  return (
    <section id="funnel" className="section">
      <SectionHead index="03" kicker="Funnel" title="From first glance to closed‑won.">
        <p>2.4M impressions become 1.9K customers.</p>
      </SectionHead>

      <ol className="funnel">
        {funnel.map((s, i) => (
          <Reveal as="li" key={s.stage} delay={i * 0.05} className="funnel__row">
            <span className="mono muted">0{i + 1}</span>
            <div className="funnel__label">
              <b>{s.stage}</b>
              <small className="muted">{s.note}</small>
            </div>
            <div className="funnel__track">
              <motion.span
                className="funnel__fill"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: s.pct / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="funnel__value num">{s.value}</span>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
