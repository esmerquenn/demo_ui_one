import { motion } from 'framer-motion'
import { Sparkles, Link, Receipt } from 'lucide-react'

const filters = [
  { id: 'all', label: 'Hamısı', icon: Sparkles },
  { id: 'link', label: 'Sosial', icon: Link },
  { id: 'receipt', label: 'Çek', icon: Receipt },
]

export function TaskFilters({ activeFilter, onChange, counts }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      {filters.map((filter) => {
        const Icon = filter.icon
        const isActive = activeFilter === filter.id
        const count = counts?.[filter.id] || 0

        return (
          <motion.button
            key={filter.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-card text-muted-foreground'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{filter.label}</span>
            {count > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-white/20' : 'bg-muted'
              }`}>
                {count}
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
