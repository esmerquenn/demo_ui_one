import { motion } from 'framer-motion'
import {
  Instagram,
  Send,
  Youtube,
  Globe,
  Receipt,
  Facebook,
  Music2,
  ExternalLink,
  Check,
  Clock,
  Coins,
  Users,
  Loader2
} from 'lucide-react'

// Icon mapping
const iconMap = {
  instagram: Instagram,
  telegram: Send,
  youtube: Youtube,
  facebook: Facebook,
  tiktok: Music2,
  globe: Globe,
  receipt: Receipt,
  bravo: Receipt,
  araz: Receipt,
  'coca-cola': Receipt,
}

// Brend rəngləri
const brandColors = {
  instagram: { bg: 'bg-gradient-to-br from-purple-500 to-pink-500', icon: 'text-white' },
  telegram: { bg: 'bg-[#0088cc]', icon: 'text-white' },
  youtube: { bg: 'bg-[#FF0000]', icon: 'text-white' },
  facebook: { bg: 'bg-[#1877F2]', icon: 'text-white' },
  tiktok: { bg: 'bg-black', icon: 'text-white' },
  bravo: { bg: 'bg-[#E31E24]', icon: 'text-white' },
  araz: { bg: 'bg-[#00A651]', icon: 'text-white' },
  'coca-cola': { bg: 'bg-[#F40009]', icon: 'text-white' },
  receipt: { bg: 'bg-accent/20', icon: 'text-accent' },
  globe: { bg: 'bg-primary/20', icon: 'text-primary' },
}

function getButtonConfig(task) {
  const hasLink = !!task.link

  switch (task.userStatus) {
    case 'completed':
      return { text: 'Bitdi', variant: 'completed', disabled: true }
    case 'pending':
      return { text: 'Yoxla', variant: 'pending', disabled: false }
    case 'idle':
    default:
      if (hasLink) {
        return { text: 'Keç', variant: 'primary', disabled: false }
      } else {
        return { text: 'Yoxla', variant: 'primary', disabled: false }
      }
  }
}

function getTimeRemaining(endDate) {
  if (!endDate) return null

  const now = new Date()
  const end = new Date(endDate)
  const diff = end - now

  if (diff < 0) return { text: 'Müddəti bitib', urgent: true, expired: true }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  if (days > 7) return { text: `${days} gün`, urgent: false }
  if (days > 0) return { text: `${days} gün ${hours} saat`, urgent: days <= 2 }
  if (hours > 0) return { text: `${hours} saat`, urgent: true }
  return { text: 'Son saatlar', urgent: true }
}

function getLimitStatus(task) {
  if (!task.limit) return null

  const remaining = task.limit - task.currentParticipants
  const percentUsed = (task.currentParticipants / task.limit) * 100

  if (remaining <= 0) return { text: 'Limit dolub', full: true }
  if (percentUsed >= 90) return { text: `Son ${remaining} yer`, urgent: true }
  if (percentUsed >= 70) return { text: `${remaining} yer qalıb`, urgent: false }
  return null
}

export function TaskCard({ task, index, onAction, isProcessing }) {
  const Icon = iconMap[task.icon] || Receipt
  const colors = brandColors[task.icon] || brandColors.receipt
  const buttonConfig = getButtonConfig(task)
  const timeRemaining = getTimeRemaining(task.endDate)
  const limitStatus = getLimitStatus(task)

  const isExpired = timeRemaining?.expired
  const isLimitFull = limitStatus?.full
  const isDisabled = buttonConfig.disabled || isExpired || isLimitFull

  // Progress for receipt count tasks
  const hasProgress = task.receiptCondition?.type === 'count'
  const progressPercent = hasProgress
    ? (task.receiptCondition.currentCount / task.receiptCondition.targetCount) * 100
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-card rounded-xl p-4 ${
        task.userStatus === 'completed' || isExpired || isLimitFull ? 'opacity-60' : ''
      }`}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold truncate">{task.name}</h3>
            <div className="flex items-center gap-1 text-accent flex-shrink-0">
              <Coins className="w-4 h-4" />
              <span className="font-semibold">+{task.reward}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {task.description}
          </p>

          {/* Progress bar for count-based tasks */}
          {hasProgress && task.userStatus !== 'completed' && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>İrəliləyiş</span>
                <span>{task.receiptCondition.currentCount}/{task.receiptCondition.targetCount}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                  className="h-full bg-accent rounded-full"
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-2">
            {/* Status badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {task.userStatus === 'completed' && (
                <span className="flex items-center gap-1 text-xs text-accent">
                  <Check className="w-3.5 h-3.5" />
                  Tamamlandı
                </span>
              )}

              {task.userStatus !== 'completed' && timeRemaining && (
                <span className={`flex items-center gap-1 text-xs ${
                  timeRemaining.urgent ? 'text-destructive' : 'text-muted-foreground'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  {timeRemaining.text}
                </span>
              )}

              {task.userStatus !== 'completed' && limitStatus && (
                <span className={`flex items-center gap-1 text-xs ${
                  limitStatus.urgent || limitStatus.full ? 'text-amber-500' : 'text-muted-foreground'
                }`}>
                  <Users className="w-3.5 h-3.5" />
                  {limitStatus.text}
                </span>
              )}
            </div>

            {/* Action button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onAction(task)}
              disabled={isDisabled || isProcessing}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                isDisabled
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : buttonConfig.variant === 'pending'
                  ? 'bg-amber-500 text-white'
                  : 'bg-primary text-white'
              }`}
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {buttonConfig.text}
                  {buttonConfig.variant === 'primary' && task.link && (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
