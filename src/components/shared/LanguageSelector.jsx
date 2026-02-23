import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Globe, Check, X } from 'lucide-react'

const languages = [
  { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

export function LanguageSelector({ compact = false }) {
  const { i18n, t } = useTranslation()
  const [showModal, setShowModal] = useState(false)

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0]

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code)
    setShowModal(false)
  }

  if (compact) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="p-2 rounded-full bg-card active:scale-95 transition-transform lg:hover:bg-muted"
        >
          <Globe className="w-5 h-5" />
        </button>

        <LanguageModal
          show={showModal}
          onClose={() => setShowModal(false)}
          currentLang={currentLang}
          onSelect={handleLanguageChange}
          t={t}
        />
      </>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{t('more.language.title')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">{currentLang.flag}</span>
          <span className="text-sm font-medium">{currentLang.name}</span>
        </div>
      </button>

      <LanguageModal
        show={showModal}
        onClose={() => setShowModal(false)}
        currentLang={currentLang}
        onSelect={handleLanguageChange}
        t={t}
      />
    </>
  )
}

function LanguageModal({ show, onClose, currentLang, onSelect, t }) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 p-6"
          >
            <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">{t('more.language.select')}</h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelect(lang.code)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                    currentLang.code === lang.code
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  {currentLang.code === lang.code && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
