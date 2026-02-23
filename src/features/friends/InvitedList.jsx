import { motion } from 'framer-motion'
import { Users, Coins, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('az-AZ', {
    day: 'numeric',
    month: 'short',
  })
}

function getTimeAgo(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) return `${diffMins} dəq əvvəl`
  if (diffHours < 24) return `${diffHours} saat əvvəl`
  if (diffDays < 7) return `${diffDays} gün əvvəl`
  return formatDate(dateString)
}

const statusConfig = {
  active: {
    label: 'Aktiv',
    color: 'text-accent',
    bgColor: 'bg-accent/20',
    icon: CheckCircle2,
  },
  pending: {
    label: 'Gözləyir',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/20',
    icon: Clock,
  },
  inactive: {
    label: 'Deaktiv',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
    icon: AlertCircle,
  },
}

function FriendItem({ friend, index }) {
  const status = statusConfig[friend.status]
  const StatusIcon = status.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 py-3 border-b border-border last:border-0"
    >
      {/* Avatar */}
      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-primary font-semibold">{getInitials(friend.name)}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">{friend.name}</p>
          <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${status.bgColor} ${status.color}`}>
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Qoşuldu: {formatDate(friend.joinedAt)}
        </p>
      </div>

      {/* Earnings */}
      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-accent flex items-center gap-1 justify-end">
          <Coins className="w-4 h-4" />
          +{friend.earnedFromThem}
        </p>
        <p className="text-xs text-muted-foreground">
          {getTimeAgo(friend.lastActive)}
        </p>
      </div>
    </motion.div>
  )
}

export function InvitedList({ friends }) {
  const sortedFriends = [...friends].sort((a, b) =>
    new Date(b.joinedAt) - new Date(a.joinedAt)
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Dəvət etdiklərim
        </h3>
        <span className="text-sm text-muted-foreground">{friends.length} dost</span>
      </div>

      {friends.length === 0 ? (
        <div className="bg-card rounded-xl p-8 text-center">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">Hələ dost dəvət etməmisən</p>
          <p className="text-sm text-muted-foreground mt-1">Linkini paylaşaraq başla!</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl p-4">
          {sortedFriends.map((friend, index) => (
            <FriendItem key={friend.id} friend={friend} index={index} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
