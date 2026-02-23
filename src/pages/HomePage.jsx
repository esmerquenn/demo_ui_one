import { useState, useCallback } from 'react'
import { Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageContainer } from '@/components/layout/PageContainer'
import { PointsBalance, StatsRow, RecentChecks, DailySpinner } from '@/features/home'
import { userData, recentChecks, spinnerPrizes } from '@/data/mockData'

export default function HomePage() {
  const [user, setUser] = useState(userData)
  const [checks, setChecks] = useState(recentChecks)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }, [])

  const handleSpin = (prize) => {
    if (prize.type === 'points') {
      setUser(prev => ({
        ...prev,
        points: prev.points + prize.value,
        dailySpinAvailable: false
      }))
    }
  }

  return (
    <PageContainer pullToRefresh onRefresh={handleRefresh}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <p className="text-muted-foreground text-sm">Salam</p>
          <h1 className="text-xl font-semibold">{user.name}</h1>
        </div>
        <button className="relative p-2 rounded-full bg-card active:scale-95 transition-transform">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background" />
        </button>
      </motion.header>

      {/* Points Balance - Hero */}
      <div className="mb-4">
        <PointsBalance points={user.points} />
      </div>

      {/* Stats Row - Friends & Upgrade */}
      <div className="mb-4">
        <StatsRow
          friendsCount={user.friendsCount}
          isUpgradeActive={user.isUpgradeActive}
          upgradeExpiresAt={user.upgradeExpiresAt}
        />
      </div>

      {/* Recent Checks */}
      <div className="mb-4">
        <RecentChecks checks={checks} />
      </div>

      {/* Daily Spinner */}
      <DailySpinner
        isAvailable={user.dailySpinAvailable}
        prizes={spinnerPrizes}
        onSpin={handleSpin}
      />
    </PageContainer>
  )
}
