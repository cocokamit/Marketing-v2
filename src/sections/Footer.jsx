import Reveal from '../components/Reveal'
import { scrollTo } from './Nav'

export default function Footer({ onNew }) {
  return (
    <footer className="footer">
      <Reveal className="footer__cta">
        <h2>Let’s make noise.</h2>
        <button className="btn btn--primary btn--lg" onClick={onNew}>
          Start a campaign
        </button>
      </Reveal>
      <div className="footer__bar">
        <small className="muted">© 2026 Pulse Marketing OS</small>
        <button className="text-btn" onClick={() => scrollTo('top')}>
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
