import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CHANNELS, STATUSES } from '../data'

const blank = () => ({
  name: '',
  channel: 'social',
  status: 'Scheduled',
  budget: 10000,
  spent: 0,
  leads: 0,
  roi: 0,
  owner: 'AM',
  end: new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10),
})

export default function CampaignModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(() => initial ?? blank())
  const set = (k) => (e) => {
    const v = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    setForm((f) => ({ ...f, [k]: v }))
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const esc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', esc)
    }
  }, [onClose])

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onSave({ ...form, name: form.name.trim(), id: form.id ?? `c${Date.now()}` })
  }

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.form
        className="modal__panel"
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="row-between">
          <h3 id="modal-title">{initial ? 'Edit campaign' : 'New campaign'}</h3>
          <button type="button" className="text-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <label className="field">
          <span>Name</span>
          <input autoFocus value={form.name} onChange={set('name')} placeholder="e.g. Holiday Glow-up" required />
        </label>

        <fieldset className="field">
          <span>Channel</span>
          <div className="chips">
            {CHANNELS.map((c) => (
              <button
                type="button"
                key={c.id}
                className={`chip ${form.channel === c.id ? 'is-on' : ''}`}
                onClick={() => setForm((f) => ({ ...f, channel: c.id }))}
                aria-pressed={form.channel === c.id}
              >
                <i className="swatch" style={{ background: c.color }} />
                {c.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="field-row">
          <label className="field">
            <span>Status</span>
            <select value={form.status} onChange={set('status')}>
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>End date</span>
            <input type="date" value={form.end} onChange={set('end')} />
          </label>
        </div>

        <div className="field-row">
          <label className="field">
            <span>Budget ($)</span>
            <input type="number" min="0" step="500" value={form.budget} onChange={set('budget')} />
          </label>
          <label className="field">
            <span>Spent ($)</span>
            <input type="number" min="0" step="100" value={form.spent} onChange={set('spent')} />
          </label>
        </div>

        <div className="field-row">
          <label className="field">
            <span>Leads</span>
            <input type="number" min="0" value={form.leads} onChange={set('leads')} />
          </label>
          <label className="field">
            <span>Owner</span>
            <select value={form.owner} onChange={set('owner')}>
              {['AM', 'JK', 'RS', 'LP'].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        </div>

        <button className="btn btn--primary btn--lg btn--block" type="submit">
          {initial ? 'Save changes' : 'Launch campaign'}
        </button>
      </motion.form>
    </motion.div>
  )
}
