import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import SectionHead from './SectionHead'
import { STATUSES, channelById } from '../data'

const FILTERS = ['All', ...STATUSES]
const NEXT = { Active: 'Paused', Paused: 'Active', Scheduled: 'Active', Completed: 'Completed' }

const money = (n) => (n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 ? 1 : 0)}k` : `$${n}`)
const shortDate = (d) => new Date(d + 'T00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default function Campaigns({ campaigns, setCampaigns, onNew, onEdit }) {
  const [filter, setFilter] = useState('All')
  const [q, setQ] = useState('')

  const list = useMemo(
    () =>
      campaigns.filter(
        (c) => (filter === 'All' || c.status === filter) && c.name.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [campaigns, filter, q],
  )

  const toggle = (id) => setCampaigns((cs) => cs.map((c) => (c.id === id ? { ...c, status: NEXT[c.status] } : c)))
  const remove = (id) => setCampaigns((cs) => cs.filter((c) => c.id !== id))

  return (
    <section id="campaigns" className="section">
      <SectionHead index="02" kicker="Campaigns" title="Every launch, one board.">
        <button className="btn btn--primary" onClick={onNew}>
          New campaign
        </button>
      </SectionHead>

      <div className="toolbar">
        <LayoutGroup id="filters">
          <div className="tabs" role="tablist" aria-label="Filter by status">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={`tab ${filter === f ? 'is-active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
                {filter === f && <motion.span layoutId="tab-line" className="tab__line" />}
              </button>
            ))}
          </div>
        </LayoutGroup>
        <label className="search">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.75" />
            <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" aria-label="Search campaigns" />
        </label>
      </div>

      <div className="table" role="table" aria-label="Campaigns">
        <div className="table__head" role="row">
          <span role="columnheader">Campaign</span>
          <span role="columnheader">Status</span>
          <span role="columnheader">Leads</span>
          <span role="columnheader">ROI</span>
          <span role="columnheader">Ends</span>
          <span role="columnheader">Budget</span>
          <span role="columnheader" className="sr-only">
            Actions
          </span>
        </div>
        <AnimatePresence initial={false}>
          {list.map((c) => {
            const ch = channelById(c.channel)
            const pct = c.budget ? Math.min(100, Math.round((c.spent / c.budget) * 100)) : 0
            return (
              <motion.div
                layout
                key={c.id}
                role="row"
                className="table__row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.25 }}
                onClick={() => onEdit(c)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && e.target === e.currentTarget && onEdit(c)}
              >
                <span role="cell" className="cell-name">
                  <b>{c.name}</b>
                  <small className="muted">
                    <i className="swatch" style={{ background: ch.color }} /> {ch.label} · {c.owner}
                  </small>
                </span>
                <span role="cell">
                  <span className={`status status--${c.status.toLowerCase()}`}>{c.status}</span>
                </span>
                <span role="cell" className="num" data-label="Leads">
                  {c.leads.toLocaleString()}
                </span>
                <span role="cell" className="num" data-label="ROI">
                  {c.roi ? `${c.roi}×` : '—'}
                </span>
                <span role="cell" className="num" data-label="Ends">
                  {shortDate(c.end)}
                </span>
                <span role="cell" className="cell-budget">
                  <small className="num muted">
                    {money(c.spent)} / {money(c.budget)}
                  </small>
                  <span className="bar bar--thin">
                    <span className="bar__fill" style={{ width: `${pct}%`, background: ch.color }} />
                  </span>
                </span>
                <span role="cell" className="cell-actions">
                  {c.status !== 'Completed' && (
                    <button
                      className="text-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggle(c.id)
                      }}
                    >
                      {c.status === 'Active' ? 'Pause' : 'Activate'}
                    </button>
                  )}
                  <button
                    className="text-btn text-btn--danger"
                    onClick={(e) => {
                      e.stopPropagation()
                      remove(c.id)
                    }}
                    aria-label={`Delete ${c.name}`}
                  >
                    Delete
                  </button>
                </span>
              </motion.div>
            )
          })}
        </AnimatePresence>
        {list.length === 0 && <p className="empty">Nothing here — try another filter or start something new.</p>}
      </div>
    </section>
  )
}
