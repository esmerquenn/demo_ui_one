import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Phone,
  Lock,
  ChevronLeft,
  ChevronRight,
  Edit3,
  BarChart3,
  Receipt,
  Coins,
  Calendar,
  Store,
  Flame,
  Trophy,
  X,
  Eye,
  EyeOff
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { userData, userStats } from '@/data/mockData'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [showPinModal, setShowPinModal] = useState(false)
  const [editField, setEditField] = useState(null) // 'name' | 'phone'
  const [formData, setFormData] = useState({
    name: userData.name,
    surname: userData.surname,
    phone: userData.phone,
  })

  const stats = [
    {
      icon: Receipt,
      label: 'Ümumi çek',
      value: userStats.totalChecks,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    {
      icon: Coins,
      label: 'Qazanılan xal',
      value: userStats.totalEarned.toLocaleString(),
      color: 'text-accent',
      bgColor: 'bg-accent/20',
    },
    {
      icon: BarChart3,
      label: 'Xərclənən',
      value: `${userStats.totalSpent.toFixed(0)}₼`,
      color: 'text-destructive',
      bgColor: 'bg-destructive/20',
    },
    {
      icon: Store,
      label: 'Orta çek',
      value: `${userStats.avgCheckAmount.toFixed(0)}₼`,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/20',
    },
  ]

  const achievements = [
    {
      icon: Flame,
      label: 'Hazırki streak',
      value: `${userStats.streak} gün`,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/20',
    },
    {
      icon: Trophy,
      label: 'Ən uzun streak',
      value: `${userStats.longestStreak} gün`,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/20',
    },
    {
      icon: Store,
      label: 'Sevimli mağaza',
      value: userStats.favoriteStore.split(' ')[0],
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    {
      icon: Calendar,
      label: 'Bu ay',
      value: `${userStats.thisMonthChecks} çek`,
      color: 'text-accent',
      bgColor: 'bg-accent/20',
    },
  ]

  return (
    <PageContainer>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-card flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">Profil</h1>
      </motion.header>

      {/* Avatar & Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-destructive p-1 mb-4">
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
            <span className="text-3xl font-bold">
              {userData.name[0]}{userData.surname[0]}
            </span>
          </div>
        </div>
        <h2 className="text-xl font-semibold">{userData.name} {userData.surname}</h2>
        <p className="text-sm text-muted-foreground">
          {new Date(userData.joinedAt).toLocaleDateString('az-AZ', {
            month: 'long',
            year: 'numeric'
          })}-dən üzv
        </p>
      </motion.div>

      {/* Profile Fields */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl overflow-hidden mb-6"
      >
        {/* Ad Soyad */}
        <button
          onClick={() => setEditField('name')}
          className="w-full flex items-center gap-3 p-4 border-b border-border hover:bg-muted/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm text-muted-foreground">Ad Soyad</p>
            <p className="font-medium">{formData.name} {formData.surname}</p>
          </div>
          <Edit3 className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Telefon */}
        <button
          onClick={() => setEditField('phone')}
          className="w-full flex items-center gap-3 p-4 border-b border-border hover:bg-muted/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Phone className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm text-muted-foreground">Telefon</p>
            <p className="font-medium">{formData.phone}</p>
          </div>
          <Edit3 className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* PIN dəyiş */}
        <button
          onClick={() => setShowPinModal(true)}
          className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
            <Lock className="w-5 h-5 text-destructive" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm text-muted-foreground">PIN kod</p>
            <p className="font-medium">••••</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </motion.div>

      {/* Desktop Grid for Stats & Achievements */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        {/* Statistikalar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 lg:mb-0"
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Statistikalar
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="bg-card rounded-xl p-4"
                >
                  <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-2`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Nailiyyətlər */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Nailiyyətlər
          </h3>
          <div className="grid grid-cols-2 gap-3">
          {achievements.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="bg-card rounded-xl p-4"
              >
                <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center mb-2`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <p className="text-lg font-bold">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </motion.div>
            )
          })}
          </div>
        </motion.div>
      </div>

      {/* Edit Name Modal */}
      <AnimatePresence>
        {editField === 'name' && (
          <EditNameModal
            name={formData.name}
            surname={formData.surname}
            onSave={(name, surname) => {
              setFormData(prev => ({ ...prev, name, surname }))
              setEditField(null)
            }}
            onClose={() => setEditField(null)}
          />
        )}
      </AnimatePresence>

      {/* Edit Phone Modal */}
      <AnimatePresence>
        {editField === 'phone' && (
          <EditPhoneModal
            phone={formData.phone}
            onSave={(phone) => {
              setFormData(prev => ({ ...prev, phone }))
              setEditField(null)
            }}
            onClose={() => setEditField(null)}
          />
        )}
      </AnimatePresence>

      {/* PIN Modal */}
      <AnimatePresence>
        {showPinModal && (
          <ChangePinModal onClose={() => setShowPinModal(false)} />
        )}
      </AnimatePresence>
    </PageContainer>
  )
}

// Edit Name Modal
function EditNameModal({ name, surname, onSave, onClose }) {
  const [localName, setLocalName] = useState(name)
  const [localSurname, setLocalSurname] = useState(surname)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-lg bg-card rounded-t-3xl p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Ad Soyad dəyiş</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Ad</label>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              className="w-full bg-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Soyad</label>
            <input
              type="text"
              value={localSurname}
              onChange={(e) => setLocalSurname(e.target.value)}
              className="w-full bg-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <button
          onClick={() => onSave(localName, localSurname)}
          className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold"
        >
          Yadda saxla
        </button>
      </motion.div>
    </motion.div>
  )
}

// Edit Phone Modal
function EditPhoneModal({ phone, onSave, onClose }) {
  const [localPhone, setLocalPhone] = useState(phone)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-lg bg-card rounded-t-3xl p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Telefon dəyiş</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <label className="text-sm text-muted-foreground mb-1 block">Telefon nömrəsi</label>
          <input
            type="tel"
            value={localPhone}
            onChange={(e) => setLocalPhone(e.target.value)}
            className="w-full bg-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          onClick={() => onSave(localPhone)}
          className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold"
        >
          Yadda saxla
        </button>
      </motion.div>
    </motion.div>
  )
}

// Change PIN Modal
function ChangePinModal({ onClose }) {
  const [step, setStep] = useState(1) // 1: current, 2: new, 3: confirm
  const [currentPin, setCurrentPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = () => {
    if (step === 1) {
      // Mock: current PIN is 1234
      if (currentPin === '1234') {
        setStep(2)
        setError('')
      } else {
        setError('Cari PIN yanlışdır')
      }
    } else if (step === 2) {
      if (newPin.length !== 4) {
        setError('PIN 4 rəqəm olmalıdır')
      } else {
        setStep(3)
        setError('')
      }
    } else if (step === 3) {
      if (newPin === confirmPin) {
        setSuccess(true)
        setTimeout(onClose, 1500)
      } else {
        setError('PIN-lər uyğun gəlmir')
      }
    }
  }

  const titles = {
    1: 'Cari PIN-i daxil edin',
    2: 'Yeni PIN yaradın',
    3: 'Yeni PIN-i təsdiqləyin',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-lg bg-card rounded-t-3xl p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">PIN dəyiş</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-8 text-center"
          >
            <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <p className="text-lg font-semibold text-accent">PIN uğurla dəyişdirildi!</p>
          </motion.div>
        ) : (
          <>
            {/* Steps indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    s === step ? 'bg-primary w-6' : s < step ? 'bg-accent' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <p className="text-center text-muted-foreground mb-4">{titles[step]}</p>

            <div className="relative mb-4">
              <input
                type={step === 1 ? (showCurrent ? 'text' : 'password') : (showNew ? 'text' : 'password')}
                maxLength={4}
                value={step === 1 ? currentPin : step === 2 ? newPin : confirmPin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '')
                  if (step === 1) setCurrentPin(val)
                  else if (step === 2) setNewPin(val)
                  else setConfirmPin(val)
                  setError('')
                }}
                className="w-full bg-muted rounded-xl px-4 py-4 text-center text-2xl tracking-[1em] font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••"
              />
              <button
                type="button"
                onClick={() => step === 1 ? setShowCurrent(!showCurrent) : setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {(step === 1 ? showCurrent : showNew) ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {error && (
              <p className="text-sm text-destructive text-center mb-4">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={(step === 1 && currentPin.length !== 4) ||
                       (step === 2 && newPin.length !== 4) ||
                       (step === 3 && confirmPin.length !== 4)}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 3 ? 'Təsdiqlə' : 'Davam et'}
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
