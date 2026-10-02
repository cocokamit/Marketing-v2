import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import SectionHead from './SectionHead'
import useLocalStorage from '../hooks/useLocalStorage'
import { DAYS, seedPosts, channelById, CHANNELS } from '../data'

const pointOf = (e) => {
  const t = e.changedTouches?.[0] ?? e
  return [t.clientX, t.clientY]
}

export default function Calendar() {
  const [posts, setPosts] = useLocalStorage('pulse-v2.posts', seedPosts)
  const [over, setOver] = useState(null)

  const dayAt = (e) => {
    const [x, y] = pointOf(e)
    const el = document.elementsFromPoint(x, y).find((n) => n.dataset?.day)
    return el?.dataset.day ?? null
  }

  const addPost = (day) => {
    const ch = CHANNELS[(Math.random() * CHANNELS.length) | 0]
    setPosts((p) => [...p, { id: `p${Date.now()}`, day, title: `New ${ch.label.toLowerCase()} post`, channel: ch.id, time: '12:00' }])
  }

  return (
    <section id="calendar" className="section">
      <SectionHead index="05" kicker="Content calendar" title="Drag. Drop. Publish.">
        <p>Move any post to another day — touch works too.</p>
      </SectionHead>

      <LayoutGroup id="cal">
        <div className="calendar">
          {DAYS.map((d) => (
            <div key={d} data-day={d} className={`calendar__day ${over === d ? 'is-over' : ''}`}>
              <div className="calendar__head">
                <small>{d}</small>
                <button className="add-btn" onClick={() => addPost(d)} aria-label={`Add post on ${d}`}>
                  +
                </button>
              </div>
              <AnimatePresence>
                {posts
                  .filter((p) => p.day === d)
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((p) => (
                    <motion.div
                      layout
                      layoutId={p.id}
                      key={p.id}
                      className="post"
                      style={{ '--ch': channelById(p.channel).color }}
                      drag
                      dragSnapToOrigin
                      dragElastic={0.4}
                      whileDrag={{ scale: 1.03, zIndex: 50 }}
                      onDrag={(e) => setOver(dayAt(e))}
                      onDragEnd={(e) => {
                        const target = dayAt(e)
                        setOver(null)
                        if (target && target !== p.day) setPosts((ps) => ps.map((x) => (x.id === p.id ? { ...x, day: target } : x)))
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <small className="mono muted">{p.time}</small>
                      <span>{p.title}</span>
                      <button
                        className="post__x"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => setPosts((ps) => ps.filter((x) => x.id !== p.id))}
                        aria-label={`Remove ${p.title}`}
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </LayoutGroup>
    </section>
  )
}
