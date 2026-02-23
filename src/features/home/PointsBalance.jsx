import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Coins, TrendingUp } from 'lucide-react'

export function PointsBalance({ points }) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="hero-gradient rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-white/80 text-sm">{t('home.totalPoints')}</p>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Coins className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-end gap-2 mb-4">
        <h2 className="text-4xl font-bold text-white">{points.toLocaleString()}</h2>
        <span className="text-white/60 text-lg mb-1">{t('common.points')}</span>
      </div>
      <div className="flex items-center gap-2 text-white/80 text-sm">
        <TrendingUp className="w-4 h-4" />
        <span>+245 {t('home.streak.thisWeek')}</span>
      </div>
    </motion.div>
  )
}
