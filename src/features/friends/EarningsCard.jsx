import { motion } from 'framer-motion'
import { Coins, Users, TrendingUp, Clock } from 'lucide-react'

export function EarningsCard({ totalEarnings, totalInvited, pendingRewards }) {
  const stats = [
    {
      icon: Coins,
      label: 'Qazanılan',
      value: totalEarnings,
      suffix: 'xal',
      color: 'text-accent',
      bgColor: 'bg-accent/20',
    },
    {
      icon: Users,
      label: 'Dəvət edilən',
      value: totalInvited,
      suffix: 'dost',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    {
      icon: Clock,
      label: 'Gözləyən',
      value: pendingRewards,
      suffix: 'xal',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/20',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Referral qazancları
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-card rounded-xl p-3 text-center"
            >
              <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.suffix}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
