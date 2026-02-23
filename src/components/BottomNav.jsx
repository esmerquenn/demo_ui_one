import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, ClipboardList, Users, MoreHorizontal, QrCode } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const navItems = [
    { icon: Home, label: t('nav.home'), path: '/' },
    { icon: ClipboardList, label: t('nav.tasks'), path: '/tasks' },
    { icon: QrCode, label: t('nav.qr'), path: '/qr', isCenter: true },
    { icon: Users, label: t('nav.friends'), path: '/friends' },
    { icon: MoreHorizontal, label: t('nav.more'), path: '/more' },
  ]

  // Hide on checks pages
  if (location.pathname.startsWith('/checks')) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border safe-bottom z-50 lg:hidden">
      <div className="flex items-end justify-around px-2 h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          if (item.isCenter) {
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative -top-4 flex flex-col items-center"
                whileTap={{ scale: 0.9 }}
              >
                <div className="qr-button-gradient w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-primary/25">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs mt-1 text-muted-foreground">{item.label}</span>
              </motion.button>
            )
          }

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center py-2 px-3 min-w-[60px]"
              whileTap={{ scale: 0.9 }}
            >
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span
                className={`text-xs mt-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-0 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
