import Reveal from '../components/Reveal'

export default function SectionHead({ index, kicker, title, children }) {
  return (
    <Reveal as="header" className="section-head">
      <p className="kicker">
        <span className="mono">{index}</span> {kicker}
      </p>
      <h2>{title}</h2>
      {children && <div className="section-head__aside">{children}</div>}
    </Reveal>
  )
}
