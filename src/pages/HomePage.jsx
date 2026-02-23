import { useState, useCallback } from 'react'
import { Bell, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PageContainer } from '@/components/layout/PageContainer'
import { PointsBalance, StatsRow, RecentChecks, DailySpinner, DailyStreak } from '@/features/home'
import { LanguageSelector } from '@/components/shared/LanguageSelector'
import { userData, recentChecks, spinnerPrizes, streakData } from '@/data/mockData'
import { useTheme } from '@/contexts/ThemeContext'

export default function HomePage() {
  const [user, setUser] = useState(userData)
  const [checks, setChecks] = useState(recentChecks)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()

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
          <p className="text-muted-foreground text-sm">{t('home.greeting')}</p>
          <h1 className="text-xl font-semibold">{user.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <LanguageSelector compact />

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-card active:scale-95 transition-transform lg:hover:bg-muted"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </motion.button>

          {/* Notifications */}
          <button className="relative p-2 rounded-full bg-card active:scale-95 transition-transform lg:hover:bg-muted">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background" />
          </button>
        </div>
      </motion.header>

      {/* Desktop Grid Layout */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        {/* Left Column */}
        <div className="space-y-4 lg:space-y-6">
          {/* Points Balance - Hero */}
          <PointsBalance points={user.points} />

          {/* Daily Streak */}
          <DailyStreak streakData={streakData} />

          {/* Stats Row - Friends & Upgrade */}
          <StatsRow
            friendsCount={user.friendsCount}
            isUpgradeActive={user.isUpgradeActive}
            upgradeExpiresAt={user.upgradeExpiresAt}
          />

          {/* Daily Spinner - Desktop only in left column */}
          <div className="hidden lg:block">
            <DailySpinner
              isAvailable={user.dailySpinAvailable}
              prizes={spinnerPrizes}
              onSpin={handleSpin}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="mt-4 lg:mt-0">
          {/* Recent Checks */}
          <RecentChecks checks={checks} />
        </div>
      </div>

      {/* Daily Spinner - Mobile */}
      <div className="mt-4 lg:hidden">
        <DailySpinner
          isAvailable={user.dailySpinAvailable}
          prizes={spinnerPrizes}
          onSpin={handleSpin}
        />
      </div>
    </PageContainer>
  )
}
