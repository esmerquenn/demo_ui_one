import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-muted p-1 transition-colors"
      aria-label={isDark ? 'Light mode aktiv et' : 'Dark mode aktiv et'}
    >
      <motion.div
        className="absolute inset-1 w-6 h-6 rounded-full bg-card shadow-md flex items-center justify-center"
        animate={{ x: isDark ? 0 : 22 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-primary" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </motion.div>
    </button>
  )
}
