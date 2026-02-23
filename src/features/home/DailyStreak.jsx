import { motion } from 'framer-motion'
import { Flame, Gift, Check, Coins } from 'lucide-react'

export function DailyStreak({ streakData }) {
  const { currentDay, days, totalEarnedThisWeek } = streakData

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold">Günlük Streak</h3>
            <p className="text-xs text-muted-foreground">
              {currentDay}/7 gün
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-accent font-semibold">
            <Coins className="w-4 h-4" />
            +{totalEarnedThisWeek}
          </div>
          <p className="text-xs text-muted-foreground">bu həftə</p>
        </div>
      </div>

      {/* Streak Days */}
      <div className="flex items-center justify-between gap-1">
        {days.map((day, index) => {
          const isToday = day.day === currentDay && day.isCompleted
          const isNext = day.day === currentDay + 1

          return (
            <motion.div
              key={day.day}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex-1 flex flex-col items-center"
            >
              {/* Day Circle */}
              <div
                className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-1 transition-all ${
                  day.isCompleted
                    ? day.isBonus
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/30'
                      : 'bg-accent'
                    : isNext
                    ? 'bg-primary/20 border-2 border-dashed border-primary'
                    : 'bg-muted'
                }`}
              >
                {day.isCompleted ? (
                  day.isBonus ? (
                    <Gift className="w-5 h-5 text-white" />
                  ) : (
                    <Check className="w-5 h-5 text-white" />
                  )
                ) : (
                  <span className={`text-sm font-medium ${isNext ? 'text-primary' : 'text-muted-foreground'}`}>
                    {day.day}
                  </span>
                )}

                {/* Today indicator */}
                {isToday && (
                  <motion.div
                    className="absolute -bottom-1 w-2 h-2 bg-accent rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}

                {/* Bonus badge */}
                {day.isBonus && !day.isCompleted && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                    <Gift className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>

              {/* Points */}
              <span className={`text-xs font-medium ${
                day.isCompleted
                  ? day.isBonus ? 'text-amber-500' : 'text-accent'
                  : 'text-muted-foreground'
              }`}>
                +{day.points}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentDay / 7) * 100}%` }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-full bg-gradient-to-r from-orange-500 to-accent rounded-full"
        />
      </div>

      {/* Info text */}
      <p className="text-xs text-muted-foreground text-center mt-3">
        {currentDay < 7
          ? `Davam et! Sabah +${days[currentDay]?.points || 6} xal qazanacaqsan`
          : 'Təbriklər! 7 günlük streak tamamlandı!'
        }
      </p>
    </motion.div>
  )
}
