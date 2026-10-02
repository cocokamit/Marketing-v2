import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export default function Counter({ value, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(0, value, { duration: 1.2, ease: [0.16, 1, 0.3, 1], onUpdate: setN })
    return () => ctrl.stop()
  }, [inView, value])

  const formatted = n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return (
    <span ref={ref} className="num">
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
