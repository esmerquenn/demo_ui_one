import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Settings,
  User,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { useTheme } from '@/contexts/ThemeContext'

const menuItems = [
  {
    id: 'profile',
    icon: User,
    label: 'Profil',
    description: 'Şəxsi məlumatlar',
    link: '/profile',
  },
  {
    id: 'notifications',
    icon: Bell,
    label: 'Bildirişlər',
    description: 'Bildiriş parametrləri',
  },
  {
    id: 'privacy',
    icon: Shield,
    label: 'Gizlilik',
    description: 'Məxfilik parametrləri',
  },
  {
    id: 'help',
    icon: HelpCircle,
    label: 'Kömək',
    description: 'FAQ və dəstək',
  },
]

export default function MorePage() {
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const handleMenuClick = (item) => {
    if (item.link) {
      navigate(item.link)
    }
  }

  return (
    <PageContainer>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold">Parametrlər</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Tətbiq ayarlarını idarə et
        </p>
      </motion.header>

      {/* Theme Toggle Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl p-4 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              {isDark ? (
                <Moon className="w-5 h-5 text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
            </div>
            <div>
              <p className="font-semibold">Tema</p>
              <p className="text-sm text-muted-foreground">
                {isDark ? 'Qaranlıq rejim' : 'İşıqlı rejim'}
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </motion.div>

      {/* Menu Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl overflow-hidden mb-6"
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className={`w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          )
        })}
      </motion.div>

      {/* Logout Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full flex items-center gap-3 p-4 bg-destructive/10 rounded-xl hover:bg-destructive/20 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
          <LogOut className="w-5 h-5 text-destructive" />
        </div>
        <span className="font-medium text-destructive">Çıxış</span>
      </motion.button>

      {/* App Version */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-muted-foreground mt-8"
      >
        Birbir v1.0.0
      </motion.p>
    </PageContainer>
  )
}
