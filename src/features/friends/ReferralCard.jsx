import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Share2, Check, Link, QrCode } from 'lucide-react'

export function ReferralCard({ code, link }) {
  const [copied, setCopied] = useState(null) // 'code' | 'link'

  const copyToClipboard = async (text, type) => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'birbir - Dostunu dəvət et',
          text: `birbir tətbiqinə qoşul və xal qazan! Mənim referral kodum: ${code}`,
          url: link,
        })
      } catch (err) {
        // User cancelled
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="hero-gradient rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white/70 text-sm">Dostlarını dəvət et</p>
          <p className="text-white/90 text-xs mt-1">Hər dost üçün bonus qazan</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <QrCode className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* My Code */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3">
        <p className="text-white/60 text-xs mb-1">Mənim kodum</p>
        <div className="flex items-center justify-between">
          <code className="text-xl font-bold text-white tracking-wider">{code}</code>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => copyToClipboard(code, 'code')}
            className="p-2 bg-white/20 rounded-lg"
          >
            {copied === 'code' ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <Copy className="w-5 h-5 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* My Link */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4">
        <p className="text-white/60 text-xs mb-1">Mənim linkim</p>
        <div className="flex items-center gap-2">
          <Link className="w-4 h-4 text-white/60 flex-shrink-0" />
          <code className="text-sm text-white truncate flex-1">{link}</code>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => copyToClipboard(link, 'link')}
            className="p-2 bg-white/20 rounded-lg flex-shrink-0"
          >
            {copied === 'link' ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <Copy className="w-5 h-5 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Share Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleShare}
        className="w-full py-3 bg-white text-primary font-semibold rounded-xl flex items-center justify-center gap-2"
      >
        <Share2 className="w-5 h-5" />
        Paylaş
      </motion.button>
    </motion.div>
  )
}
