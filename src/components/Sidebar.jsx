import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Home,
  ClipboardList,
  Users,
  Settings,
  QrCode,
  Receipt,
  Coins,
  TrendingUp
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { userData } from '@/data/mockData'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()

  const navItems = [
    { icon: Home, label: t('nav.home'), path: '/' },
    { icon: QrCode, label: t('qr.title'), path: '/qr' },
    { icon: ClipboardList, label: t('nav.tasks'), path: '/tasks' },
    { icon: Users, label: t('nav.friends'), path: '/friends' },
    { icon: Receipt, label: t('checks.title'), path: '/checks' },
    { icon: Settings, label: t('more.title'), path: '/more' },
  ]

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-card border-r border-border fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Birbir</h1>
            <p className="text-xs text-muted-foreground">{t('qr.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-destructive p-0.5">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <span className="text-sm font-bold">{userData.name[0]}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{userData.name}</p>
            <div className="flex items-center gap-1 text-sm text-primary">
              <Coins className="w-4 h-4" />
              <span className="font-medium">{userData.points.toLocaleString()}</span>
            </div>
          </div>
          {userData.isUpgradeActive && (
            <div className="px-2 py-1 bg-accent/20 rounded-full">
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path ||
              (item.path === '/checks' && location.pathname.startsWith('/checks'))

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeSidebar"
                    className="ml-auto w-1.5 h-1.5 bg-primary rounded-full"
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </nav>

      {/* Theme Toggle & Footer */}
      <div className="p-4 border-t border-border">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
        >
          <span className="text-sm text-muted-foreground">
            {isDark ? t('more.theme.dark') : t('more.theme.light')}
          </span>
          <div className="w-12 h-6 rounded-full bg-card p-1 relative">
            <motion.div
              className="w-4 h-4 rounded-full bg-primary"
              animate={{ x: isDark ? 0 : 24 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        </button>
        <p className="text-xs text-center text-muted-foreground mt-4">
          {t('more.version')}
        </p>
      </div>
    </aside>
  )
}
