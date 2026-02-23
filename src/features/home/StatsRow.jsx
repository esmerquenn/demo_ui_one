import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Users, Zap } from 'lucide-react'

export function StatsRow({ friendsCount, isUpgradeActive, upgradeExpiresAt }) {
  const { t } = useTranslation()

  const daysLeft = upgradeExpiresAt
    ? Math.ceil((new Date(upgradeExpiresAt) - new Date()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="grid grid-cols-2 gap-3">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card p-4 rounded-xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <span className="text-muted-foreground text-sm">{t('home.stats.friends')}</span>
        </div>
        <p className="text-2xl font-semibold">{friendsCount}</p>
        <p className="text-xs text-accent mt-1">+3 {t('common.month')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card p-4 rounded-xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isUpgradeActive ? 'bg-accent/20' : 'bg-muted'
          }`}>
            <Zap className={`w-4 h-4 ${isUpgradeActive ? 'text-accent' : 'text-muted-foreground'}`} />
          </div>
          <span className="text-muted-foreground text-sm">{t('home.stats.upgrade')}</span>
        </div>
        {isUpgradeActive ? (
          <>
            <p className="text-lg font-semibold text-accent">{t('home.stats.active')}</p>
            <p className="text-xs text-muted-foreground mt-1">{daysLeft} {t('common.days')}</p>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold text-muted-foreground">Deaktiv</p>
            <p className="text-xs text-primary mt-1">Aktivləşdir →</p>
          </>
        )}
      </motion.div>
    </div>
  )
}
