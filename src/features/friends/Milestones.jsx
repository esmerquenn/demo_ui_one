import { motion } from 'framer-motion'
import {
  Trophy,
  UserPlus,
  Users,
  Crown,
  Gem,
  Check,
  Lock,
  Coins
} from 'lucide-react'

const iconMap = {
  'user-plus': UserPlus,
  'users': Users,
  'crown': Crown,
  'trophy': Trophy,
  'gem': Gem,
}

export function Milestones({ milestones, currentCount }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Hədəflər
        </h3>
        <span className="text-sm text-muted-foreground">
          {milestones.filter(m => m.isCompleted).length}/{milestones.length}
        </span>
      </div>

      <div className="space-y-3">
        {milestones.map((milestone, index) => {
          const Icon = iconMap[milestone.icon] || Trophy
          const progress = Math.min((currentCount / milestone.target) * 100, 100)
          const isNext = !milestone.isCompleted &&
            (index === 0 || milestones[index - 1].isCompleted)

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`bg-card rounded-xl p-4 relative overflow-hidden ${
                milestone.isCompleted ? 'opacity-70' : ''
              } ${isNext ? 'ring-2 ring-primary/50' : ''}`}
            >
              {/* Background decoration for completed */}
              {milestone.isCompleted && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              )}

              <div className="flex items-center gap-4 relative">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  milestone.isCompleted
                    ? 'bg-accent/20'
                    : isNext
                    ? 'bg-primary/20'
                    : 'bg-muted'
                }`}>
                  {milestone.isCompleted ? (
                    <Check className="w-6 h-6 text-accent" />
                  ) : (
                    <Icon className={`w-6 h-6 ${isNext ? 'text-primary' : 'text-muted-foreground'}`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{milestone.title}</p>
                    {!milestone.isCompleted && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                        {milestone.target} dost
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>

                  {/* Progress bar for next milestone */}
                  {isNext && !milestone.isCompleted && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{currentCount}/{milestone.target}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Reward */}
                <div className={`text-right flex-shrink-0 ${
                  milestone.isCompleted ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  <div className="flex items-center gap-1 font-semibold">
                    <Coins className="w-4 h-4" />
                    +{milestone.reward}
                  </div>
                  {milestone.isCompleted && (
                    <span className="text-xs text-accent">Alındı</span>
                  )}
                  {!milestone.isCompleted && !isNext && (
                    <Lock className="w-4 h-4 mx-auto mt-1" />
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
