import { motion } from 'framer-motion'
import { ChevronRight, Receipt, Store } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Bugün'
  if (diffDays === 1) return 'Dünən'
  return date.toLocaleDateString('az-AZ', { day: 'numeric', month: 'short' })
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString('az-AZ', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function CheckItem({ check, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 py-3 border-b border-border last:border-0"
    >
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
        <Store className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{check.storeName}</p>
        <p className="text-xs text-muted-foreground">
          {formatDate(check.date)} · {formatTime(check.date)}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold">{check.amount.toFixed(2)} ₼</p>
        <p className="text-xs text-accent">+{check.points} xal</p>
      </div>
    </motion.div>
  )
}

export function RecentChecks({ checks }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Son çeklər</h3>
        </div>
        <button
          onClick={() => navigate('/checks')}
          className="flex items-center gap-1 text-sm text-primary"
        >
          Hamısı
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {checks.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          <Receipt className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Hələ çek yoxdur</p>
        </div>
      ) : (
        <div>
          {checks.slice(0, 5).map((check, index) => (
            <CheckItem key={check.id} check={check} index={index} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
