import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { RefreshCw } from 'lucide-react'

const PULL_THRESHOLD = 80

export function PullToRefresh({ children, onRefresh }) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const containerRef = useRef(null)
  const startY = useRef(0)
  const pullDistance = useMotionValue(0)

  const spinnerOpacity = useTransform(pullDistance, [0, PULL_THRESHOLD], [0, 1])
  const spinnerScale = useTransform(pullDistance, [0, PULL_THRESHOLD], [0.5, 1])
  const spinnerRotate = useTransform(pullDistance, [0, PULL_THRESHOLD * 2], [0, 360])

  const handleTouchStart = (e) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY
    }
  }

  const handleTouchMove = (e) => {
    if (isRefreshing) return
    if (containerRef.current?.scrollTop > 0) return

    const currentY = e.touches[0].clientY
    const diff = currentY - startY.current

    if (diff > 0) {
      pullDistance.set(Math.min(diff * 0.5, PULL_THRESHOLD * 1.5))
    }
  }

  const handleTouchEnd = async () => {
    const currentPull = pullDistance.get()

    if (currentPull >= PULL_THRESHOLD && !isRefreshing) {
      setIsRefreshing(true)
      animate(pullDistance, PULL_THRESHOLD, { duration: 0.2 })

      try {
        await onRefresh?.()
      } finally {
        setIsRefreshing(false)
        animate(pullDistance, 0, { duration: 0.3 })
      }
    } else {
      animate(pullDistance, 0, { duration: 0.3 })
    }
  }

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto overflow-x-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="flex justify-center items-center"
        style={{ height: pullDistance }}
      >
        <motion.div
          style={{
            opacity: spinnerOpacity,
            scale: spinnerScale,
            rotate: isRefreshing ? undefined : spinnerRotate
          }}
          animate={isRefreshing ? { rotate: 360 } : {}}
          transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: 'linear' } : {}}
        >
          <RefreshCw className="w-6 h-6 text-primary" />
        </motion.div>
      </motion.div>
      {children}
    </div>
  )
}
