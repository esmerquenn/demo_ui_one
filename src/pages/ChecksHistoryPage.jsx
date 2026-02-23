import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Store,
  Filter,
  X,
  Calendar,
  Building2,
  Banknote,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react'
import { allChecks, stores } from '@/data/mockData'

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('az-AZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString('az-AZ', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const amountRanges = [
  { label: 'Hamısı', min: 0, max: Infinity },
  { label: '0 - 50 ₼', min: 0, max: 50 },
  { label: '50 - 100 ₼', min: 50, max: 100 },
  { label: '100 - 500 ₼', min: 100, max: 500 },
  { label: '500+ ₼', min: 500, max: Infinity },
]

export default function ChecksHistoryPage() {
  const navigate = useNavigate()
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    store: null,
    amountRange: amountRanges[0],
    dateFrom: null,
    dateTo: null,
  })

  // Filter checks
  const filteredChecks = useMemo(() => {
    return allChecks.filter(check => {
      // Store filter
      if (filters.store && check.storeName !== filters.store) return false

      // Amount filter
      if (check.amount < filters.amountRange.min || check.amount > filters.amountRange.max) return false

      // Date filter
      if (filters.dateFrom) {
        const checkDate = new Date(check.date)
        const fromDate = new Date(filters.dateFrom)
        if (checkDate < fromDate) return false
      }
      if (filters.dateTo) {
        const checkDate = new Date(check.date)
        const toDate = new Date(filters.dateTo)
        toDate.setHours(23, 59, 59)
        if (checkDate > toDate) return false
      }

      return true
    })
  }, [filters])

  // Group checks by date
  const groupedChecks = useMemo(() => {
    return filteredChecks.reduce((groups, check) => {
      const date = formatDate(check.date)
      if (!groups[date]) groups[date] = []
      groups[date].push(check)
      return groups
    }, {})
  }, [filteredChecks])

  const activeFiltersCount = [
    filters.store,
    filters.amountRange !== amountRanges[0],
    filters.dateFrom,
    filters.dateTo
  ].filter(Boolean).length

  const clearFilters = () => {
    setFilters({
      store: null,
      amountRange: amountRanges[0],
      dateFrom: null,
      dateTo: null,
    })
  }

  return (
    <div className="min-h-screen bg-background lg:ml-64">
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
            <h1 className="text-lg font-semibold">Çek Tarixçəsi</h1>
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="p-2 rounded-full active:bg-card lg:hover:bg-card relative"
          >
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-xs flex items-center justify-center text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </motion.header>

      {/* Content */}
      <div className="px-4 lg:px-6 py-4 max-w-4xl mx-auto">
        {filteredChecks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Store className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Çek tapılmadı</p>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-primary mt-2"
              >
                Filterləri təmizlə
              </button>
            )}
          </motion.div>
        ) : (
          Object.entries(groupedChecks).map(([date, checks], groupIndex) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="mb-6"
            >
              <p className="text-sm text-muted-foreground mb-3">{date}</p>
              <div className="bg-card rounded-xl overflow-hidden">
                {checks.map((check, index) => (
                  <motion.button
                    key={check.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                    onClick={() => navigate(`/checks/${check.id}`)}
                    className="flex items-center gap-3 p-4 border-b border-border last:border-0 active:bg-[#162033] w-full text-left"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Store className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{check.storeName}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatTime(check.date)}
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <p className="font-semibold">{check.amount.toFixed(2)} ₼</p>
                        <p className="text-sm text-accent">+{check.points} xal</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))
        )}

        {/* Summary */}
        {filteredChecks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-[#162033] rounded-xl p-4 mt-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Ümumi çek</span>
              <span className="font-semibold">{filteredChecks.length}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-muted-foreground">Ümumi məbləğ</span>
              <span className="font-semibold">
                {filteredChecks.reduce((sum, c) => sum + c.amount, 0).toFixed(2)} ₼
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-muted-foreground">Ümumi xal</span>
              <span className="font-semibold text-accent">
                +{filteredChecks.reduce((sum, c) => sum + c.points, 0)}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Filter Bottom Sheet */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="p-4">
                {/* Handle */}
                <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-4" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filterlər</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Store Filter */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">Obyekt</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilters(f => ({ ...f, store: null }))}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        !filters.store
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      Hamısı
                    </button>
                    {stores.map(store => (
                      <button
                        key={store}
                        onClick={() => setFilters(f => ({ ...f, store }))}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          filters.store === store
                            ? 'bg-primary text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {store}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Filter */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Banknote className="w-5 h-5 text-accent" />
                    <span className="font-medium">Məbləğ</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {amountRanges.map(range => (
                      <button
                        key={range.label}
                        onClick={() => setFilters(f => ({ ...f, amountRange: range }))}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          filters.amountRange.label === range.label
                            ? 'bg-primary text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Filter */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-destructive" />
                    <span className="font-medium">Tarix</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Başlanğıc</label>
                      <input
                        type="date"
                        value={filters.dateFrom || ''}
                        onChange={(e) => setFilters(f => ({ ...f, dateFrom: e.target.value || null }))}
                        className="w-full bg-muted rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Son</label>
                      <input
                        type="date"
                        value={filters.dateTo || ''}
                        onChange={(e) => setFilters(f => ({ ...f, dateTo: e.target.value || null }))}
                        className="w-full bg-muted rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    onClick={clearFilters}
                    className="flex-1 py-3 rounded-xl bg-muted text-muted-foreground font-medium"
                  >
                    Təmizlə
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-3 rounded-xl bg-primary text-white font-medium"
                  >
                    Tətbiq et
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
