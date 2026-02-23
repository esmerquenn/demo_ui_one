import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  QrCode,
  Camera,
  Image,
  Keyboard,
  X,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Coins,
  Store,
  Sparkles
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'

const scanOptions = [
  {
    id: 'camera',
    icon: Camera,
    title: 'QR Skan',
    description: 'Kamera ilə skan et',
    color: 'bg-primary',
  },
  {
    id: 'gallery',
    icon: Image,
    title: 'Qalereyadan',
    description: 'Şəkil seç',
    color: 'bg-accent',
  },
  {
    id: 'manual',
    icon: Keyboard,
    title: 'Manual',
    description: 'Fiskal ID daxil et',
    color: 'bg-destructive',
  },
]

export default function QRPage() {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [manualId, setManualId] = useState('')
  const [showManualInput, setShowManualInput] = useState(false)

  // Mock scan result
  const mockResult = {
    storeName: 'Bravo Supermarket',
    amount: 78.50,
    points: 79,
    fiscalId: 'FI-2025-0223-009999',
  }

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId)

    if (optionId === 'manual') {
      setShowManualInput(true)
    } else {
      // Simulate scanning
      setIsScanning(true)
      setTimeout(() => {
        setIsScanning(false)
        setShowSuccess(true)
      }, 2000)
    }
  }

  const handleManualSubmit = () => {
    if (!manualId.trim()) return

    setShowManualInput(false)
    setIsScanning(true)

    setTimeout(() => {
      setIsScanning(false)
      setShowSuccess(true)
    }, 1500)
  }

  const handleClose = () => {
    setSelectedOption(null)
    setIsScanning(false)
    setShowSuccess(false)
    setShowManualInput(false)
    setManualId('')
  }

  const handleDone = () => {
    handleClose()
    navigate('/')
  }

  return (
    <PageContainer className="flex flex-col min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-xl font-semibold">Çek Skan</h1>
          <p className="text-sm text-muted-foreground">Çeki skan edərək xal qazan</p>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* QR Preview Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-3xl p-6 mb-6 flex-1 flex flex-col items-center justify-center relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 via-accent/10 to-destructive/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-2xl animate-pulse" />
              <div className="absolute inset-2 bg-[#162033] rounded-xl flex items-center justify-center">
                <QrCode className="w-16 h-16 text-primary/50" />
              </div>
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-lg" />
            </div>

            <h2 className="text-lg font-semibold mb-2">Skan üsulunu seç</h2>
            <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
              Çekin üzərindəki QR kodu skan et və xal qazan
            </p>
          </div>
        </motion.div>

        {/* Scan Options */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {scanOptions.map((option, index) => {
            const Icon = option.icon
            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOptionSelect(option.id)}
                whileTap={{ scale: 0.95 }}
                className="bg-card rounded-2xl p-4 flex flex-col items-center text-center"
              >
                <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-sm">{option.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
              </motion.button>
            )
          })}
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#162033] rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Coins className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-medium">Xal qazanma qaydası</p>
              <p className="text-sm text-muted-foreground mt-1">
                Hər 1 ₼ alış-veriş = 1 xal. Upgrade aktivdirsə 2x xal qazanırsan!
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scanning Overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-16 h-16 mx-auto mb-4"
              >
                <Loader2 className="w-16 h-16 text-primary" />
              </motion.div>
              <p className="text-lg font-medium">Yoxlanılır...</p>
              <p className="text-sm text-muted-foreground mt-1">Çek məlumatları alınır</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-card rounded-3xl p-6 z-50 max-w-sm mx-auto"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-4 relative"
              >
                <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
                <div className="relative w-20 h-20 bg-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-1">Uğurlu!</h2>
                <p className="text-muted-foreground">Çek uğurla əlavə edildi</p>
              </div>

              {/* Result Details */}
              <div className="bg-[#162033] rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{mockResult.storeName}</p>
                    <p className="text-sm text-muted-foreground">{mockResult.fiscalId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card rounded-xl p-3 text-center">
                    <p className="text-sm text-muted-foreground">Məbləğ</p>
                    <p className="text-lg font-bold">{mockResult.amount} ₼</p>
                  </div>
                  <div className="hero-gradient rounded-xl p-3 text-center">
                    <p className="text-sm text-white/80">Qazandın</p>
                    <p className="text-lg font-bold text-white flex items-center justify-center gap-1">
                      +{mockResult.points}
                      <Sparkles className="w-4 h-4" />
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl bg-muted text-muted-foreground font-medium"
                >
                  Başqa skan
                </button>
                <button
                  onClick={handleDone}
                  className="flex-1 py-3 rounded-xl bg-primary text-white font-medium"
                >
                  Tamam
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Manual Input Modal */}
      <AnimatePresence>
        {showManualInput && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setShowManualInput(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 p-6"
            >
              {/* Handle */}
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Fiskal ID daxil et</h2>
                <button onClick={() => setShowManualInput(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Fiskal ID
                </label>
                <input
                  type="text"
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  placeholder="FI-2025-XXXX-XXXXXX"
                  className="w-full bg-muted rounded-xl px-4 py-3 text-lg font-mono"
                  autoFocus
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Çekin altında yerləşən Fiskal ID-ni daxil edin
                </p>
              </div>

              <button
                onClick={handleManualSubmit}
                disabled={!manualId.trim()}
                className={`w-full py-4 rounded-xl font-medium transition-colors ${
                  manualId.trim()
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                Yoxla
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageContainer>
  )
}
