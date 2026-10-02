import SectionHead from './SectionHead'
import Reveal from '../components/Reveal'
import { team } from '../data'

export default function Team({ campaigns }) {
  return (
    <section id="team" className="section">
      <SectionHead index="06" kicker="Team" title="The people behind the pulse." />
      <div className="team-grid">
        {team.map((m, i) => {
          const owned = campaigns.filter((c) => c.owner === m.initials).length
          return (
            <Reveal key={m.name} delay={i * 0.05} className="member">
              <span className="member__mono" style={{ '--h': m.hue }}>
                {m.initials}
              </span>
              <div>
                <b>{m.name}</b>
                <small className="muted">{m.role}</small>
              </div>
              <div className="member__stats">
                <small>
                  <span className="num">{owned}</span> campaigns
                </small>
                <small>
                  <span className="num">{m.tasks}</span> tasks
                </small>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
