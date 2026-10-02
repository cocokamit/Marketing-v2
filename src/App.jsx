import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useScroll } from 'framer-motion'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Overview from './sections/Overview'
import Campaigns from './sections/Campaigns'
import CampaignModal from './sections/CampaignModal'
import Funnel from './sections/Funnel'
import Channels from './sections/Channels'
import Calendar from './sections/Calendar'
import Team from './sections/Team'
import Footer from './sections/Footer'
import useLocalStorage from './hooks/useLocalStorage'
import { seedCampaigns } from './data'

export default function App() {
  const [campaigns, setCampaigns] = useLocalStorage('pulse-v2.campaigns', seedCampaigns)
  const [editing, setEditing] = useState(null) // null = closed, {} = new, campaign = edit
  const { scrollYProgress } = useScroll()

  const openNew = useCallback(() => setEditing({}), [])
  const close = useCallback(() => setEditing(null), [])

  const save = (c) => {
    setCampaigns((cs) => (cs.some((x) => x.id === c.id) ? cs.map((x) => (x.id === c.id ? c : x)) : [c, ...cs]))
    setEditing(null)
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <Nav onNew={openNew} />
      <main>
        <Hero onNew={openNew} />
        <Overview campaigns={campaigns} />
        <Campaigns campaigns={campaigns} setCampaigns={setCampaigns} onNew={openNew} onEdit={setEditing} />
        <Funnel />
        <Channels />
        <Calendar />
        <Team campaigns={campaigns} />
      </main>
      <Footer onNew={openNew} />

      <AnimatePresence>
        {editing && <CampaignModal initial={editing.id ? editing : null} onSave={save} onClose={close} />}
      </AnimatePresence>
    </MotionConfig>
  )
}
