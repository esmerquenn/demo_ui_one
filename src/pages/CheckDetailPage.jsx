import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  Store,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  User,
  Hash,
  Receipt,
  Coins,
  FileText,
  Share2,
  Download
} from 'lucide-react'
import { allChecks } from '@/data/mockData'

function InfoRow({ icon: Icon, label, value, iconColor = 'text-primary' }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-0">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-muted`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}

export default function CheckDetailPage() {
  const { t, i18n } = useTranslation()

  const formatDate = (dateString) => {
    const locale = i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US'
    return new Date(dateString).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (dateString) => {
    const locale = i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US'
    return new Date(dateString).toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  const navigate = useNavigate()
  const { id } = useParams()

  const check = useMemo(() => {
    return allChecks.find(c => c.id === parseInt(id))
  }, [id])

  if (!check) {
    return (
      <div className="min-h-screen bg-background lg:ml-64 flex items-center justify-center">
        <div className="text-center">
          <Receipt className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">{t('checks.empty')}</p>
          <button
            onClick={() => navigate(-1)}
            className="text-primary mt-2"
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background lg:ml-64 pb-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-40 px-4 lg:px-6 py-3"
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full active:bg-card lg:hover:bg-card"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">{t('checks.detail')}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full active:bg-card lg:hover:bg-card">
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-full active:bg-card lg:hover:bg-card">
              <Download className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </motion.header>

      <div className="px-4 lg:px-6 py-4 max-w-4xl mx-auto">
        {/* Desktop Grid */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Left Column */}
          <div className="space-y-4 lg:space-y-6">
            {/* Store Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-5"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{check.storeName}</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {check.storeAddress}
                  </p>
                </div>
              </div>

              {/* Amount & Points */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#162033] rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">{t('qr.success.amount')}</p>
                  <p className="text-2xl font-bold">{check.amount.toFixed(2)} ₼</p>
                </div>
                <div className="hero-gradient rounded-xl p-4 text-center">
                  <p className="text-sm text-white/80 mb-1">{t('qr.success.earned')}</p>
                  <p className="text-2xl font-bold text-white">+{check.points} {t('common.points')}</p>
                </div>
              </div>
            </motion.div>

            {/* Receipt Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-5"
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                {t('checks.detail.receiptImage')}
              </h3>
              <div className="bg-[#162033] rounded-xl h-48 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Receipt className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">{t('checks.detail.noImage')}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 lg:space-y-6 mt-4 lg:mt-0">
            {/* Items List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-card rounded-2xl p-5"
            >
              <h3 className="font-semibold mb-3">{t('checks.detail.products')}</h3>
              <div className="space-y-3">
                {check.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">x{item.qty}</p>
                    </div>
                    <p className="font-semibold">{(item.price * item.qty).toFixed(2)} ₼</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-3 pt-3">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>{t('checks.detail.tax')} ({((check.taxAmount / check.amount) * 100).toFixed(0)}%)</span>
                  <span>{check.taxAmount.toFixed(2)} ₼</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>{t('checks.detail.total')}</span>
                  <span>{check.amount.toFixed(2)} ₼</span>
                </div>
              </div>
            </motion.div>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-5"
            >
              <h3 className="font-semibold mb-3">{t('checks.detail.info')}</h3>

              <InfoRow
                icon={Hash}
                label={t('checks.detail.fiscalId')}
                value={check.fiscalId}
                iconColor="text-accent"
              />
              <InfoRow
                icon={Calendar}
                label={t('checks.detail.date')}
                value={formatDate(check.date)}
                iconColor="text-primary"
              />
              <InfoRow
                icon={Clock}
                label={t('checks.detail.time')}
                value={formatTime(check.date)}
                iconColor="text-primary"
              />
              <InfoRow
                icon={CreditCard}
                label={t('checks.detail.paymentMethod')}
                value={check.paymentMethod === 'card' ? t('checks.detail.card') : t('checks.detail.cash')}
                iconColor="text-destructive"
              />
              <InfoRow
                icon={User}
                label={t('checks.detail.cashier')}
                value={check.cashier}
                iconColor="text-muted-foreground"
              />
              <InfoRow
                icon={Coins}
                label={t('checks.detail.status')}
                value={check.status === 'completed' ? t('checks.detail.confirmed') : t('checks.detail.pending')}
                iconColor="text-accent"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
