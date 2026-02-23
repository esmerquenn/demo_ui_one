import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Gift, Sparkles } from 'lucide-react'

export function DailySpinner({ isAvailable, prizes, onSpin }) {
  const { t } = useTranslation()
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState(null)

  const handleSpin = async () => {
    if (!isAvailable || isSpinning) return

    setIsSpinning(true)
    setResult(null)

    // Mock spin - random prize
    await new Promise(resolve => setTimeout(resolve, 2000))
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)]
    setResult(randomPrize)
    setIsSpinning(false)
    onSpin?.(randomPrize)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-[#162033] rounded-xl p-4 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 qr-button-gradient rounded-xl flex items-center justify-center">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              {t('home.spinner.title')}
              <Sparkles className="w-4 h-4 text-accent" />
            </h3>
            <p className="text-sm text-muted-foreground">
              {isAvailable ? t('home.spinner.subtitle') : t('home.spinner.subtitleUsed')}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-4"
            >
              <p className="text-muted-foreground text-sm mb-1">{t('home.spinner.congrats')}</p>
              <p className="text-2xl font-bold" style={{ color: result.color }}>
                {result.label}
              </p>
              {result.type !== 'empty' && (
                <p className="text-sm text-accent mt-1">{t('home.spinner.addedToBalance')}</p>
              )}
            </motion.div>
          ) : (
            <motion.button
              key="button"
              onClick={handleSpin}
              disabled={!isAvailable || isSpinning}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                isAvailable
                  ? 'qr-button-gradient text-white active:scale-[0.98]'
                  : 'bg-muted text-muted-foreground'
              }`}
              whileTap={isAvailable ? { scale: 0.98 } : {}}
            >
              {isSpinning ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="inline-block"
                >
                  🎡
                </motion.span>
              ) : isAvailable ? (
                t('home.spinner.spin')
              ) : (
                t('home.spinner.spinning')
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
