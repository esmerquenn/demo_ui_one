import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ClipboardList,
  Coins,
  CheckCircle2,
  X,
  ExternalLink,
  Loader2,
  AlertCircle,
  Receipt
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { TaskCard, TaskFilters } from '@/features/tasks'
import { tasks as initialTasks, allChecks } from '@/data/mockData'

export default function TasksPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState(initialTasks)
  const [activeFilter, setActiveFilter] = useState('all')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Modal states
  const [activeModal, setActiveModal] = useState(null) // 'verifying' | 'success' | 'failed'
  const [processingTaskId, setProcessingTaskId] = useState(null)
  const [verificationResult, setVerificationResult] = useState(null)

  // Filter tasks based on type
  const filteredTasks = useMemo(() => {
    if (activeFilter === 'all') return tasks

    return tasks.filter(task => {
      if (activeFilter === 'link') return !!task.link
      if (activeFilter === 'receipt') return !task.link
      return true
    })
  }, [tasks, activeFilter])

  // Count tasks by type
  const counts = useMemo(() => {
    const available = tasks.filter(t => t.userStatus !== 'completed')
    return {
      all: available.length,
      link: available.filter(t => !!t.link).length,
      receipt: available.filter(t => !t.link).length,
    }
  }, [tasks])

  // Stats
  const stats = useMemo(() => {
    const available = tasks.filter(t => t.userStatus !== 'completed').length
    const completed = tasks.filter(t => t.userStatus === 'completed').length
    const totalReward = tasks
      .filter(t => t.userStatus !== 'completed')
      .reduce((sum, t) => sum + t.reward, 0)
    return { available, completed, totalReward }
  }, [tasks])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }, [])

  // Check if user has a qualifying receipt for the task
  const checkReceiptCondition = (task) => {
    if (!task.receiptCondition) return false

    const taskStartDate = new Date(task.startDate)
    const relevantChecks = allChecks.filter(check => {
      const checkDate = new Date(check.date)
      return checkDate >= taskStartDate
    })

    switch (task.receiptCondition.type) {
      case 'store':
        return relevantChecks.some(check => {
          const matchStore = check.storeName === task.receiptCondition.store
          const matchAmount = task.receiptCondition.minAmount
            ? check.amount >= task.receiptCondition.minAmount
            : true
          return matchStore && matchAmount
        })

      case 'minAmount':
        return relevantChecks.some(check =>
          check.amount >= task.receiptCondition.minAmount
        )

      case 'product':
        return relevantChecks.some(check =>
          check.items.some(item =>
            task.receiptCondition.productKeywords.some(keyword =>
              item.name.toLowerCase().includes(keyword.toLowerCase())
            )
          )
        )

      case 'count':
        return relevantChecks.length >= task.receiptCondition.targetCount

      default:
        return false
    }
  }

  const handleTaskAction = async (task) => {
    if (task.userStatus === 'completed') return

    setProcessingTaskId(task.id)

    // Link tapşırığı - Keç statusunda
    if (task.link && task.userStatus === 'idle') {
      // Linki aç
      window.open(task.link, '_blank')

      // Status-u pending-ə dəyiş
      setTasks(prev => prev.map(t =>
        t.id === task.id ? { ...t, userStatus: 'pending' } : t
      ))

      setProcessingTaskId(null)
      return
    }

    // Yoxlama prosesi
    setActiveModal('verifying')

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    let isVerified = false

    if (task.link) {
      // Link tapşırığı - 80% şansla uğurlu (demo üçün)
      isVerified = Math.random() > 0.2
    } else {
      // Çek tapşırığı - real yoxlama
      isVerified = checkReceiptCondition(task)
    }

    if (isVerified) {
      // Uğurlu
      setTasks(prev => prev.map(t =>
        t.id === task.id ? { ...t, userStatus: 'completed' } : t
      ))
      setVerificationResult({ task, success: true })
      setActiveModal('success')
    } else {
      // Uğursuz
      setTasks(prev => prev.map(t =>
        t.id === task.id ? { ...t, userStatus: 'idle' } : t
      ))
      setVerificationResult({ task, success: false })
      setActiveModal('failed')
    }

    setProcessingTaskId(null)
  }

  const closeModal = () => {
    setActiveModal(null)
    setVerificationResult(null)
  }

  return (
    <PageContainer pullToRefresh onRefresh={handleRefresh}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-semibold">{t('tasks.title')}</h1>
          <div className="flex items-center gap-1 text-accent">
            <Coins className="w-5 h-5" />
            <span className="font-semibold">+{stats.totalReward}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {t('tasks.available', { count: stats.available })}
        </p>
      </motion.header>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
      >
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">{t('tasks.stats.available')}</span>
          </div>
          <p className="text-2xl font-bold">{stats.available}</p>
        </div>
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="text-sm text-muted-foreground">{t('tasks.stats.completed')}</span>
          </div>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-4"
      >
        <TaskFilters
          activeFilter={activeFilter}
          onChange={setActiveFilter}
          counts={counts}
        />
      </motion.div>

      {/* Task List */}
      <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        {filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 lg:col-span-2"
          >
            <ClipboardList className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">{t('tasks.empty')}</p>
          </motion.div>
        ) : (
          filteredTasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onAction={handleTaskAction}
              isProcessing={processingTaskId === task.id}
            />
          ))
        )}
      </div>

      {/* Verifying Modal */}
      <AnimatePresence>
        {activeModal === 'verifying' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-3xl p-8 text-center max-w-xs mx-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-16 h-16 mx-auto mb-4"
              >
                <Loader2 className="w-16 h-16 text-primary" />
              </motion.div>
              <h2 className="text-lg font-semibold mb-2">{t('tasks.verification.verifying')}</h2>
              <p className="text-sm text-muted-foreground">
                {t('tasks.verification.checking')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {activeModal === 'success' && verificationResult && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-card rounded-3xl p-6 z-50 max-w-sm mx-auto"
            >
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
                <h2 className="text-xl font-bold mb-1">{t('tasks.verification.success')}</h2>
                <p className="text-muted-foreground">{t('tasks.verification.successDesc')}</p>
              </div>

              <div className="hero-gradient rounded-xl p-4 mb-6 text-center">
                <p className="text-white/80 text-sm mb-1">{t('tasks.verification.addedToBalance')}</p>
                <p className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                  +{verificationResult.task.reward} {t('common.points')}
                  <Coins className="w-6 h-6" />
                </p>
              </div>

              <button
                onClick={closeModal}
                className="w-full py-3 rounded-xl bg-primary text-white font-medium"
              >
                {t('common.confirm')}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Failed Modal */}
      <AnimatePresence>
        {activeModal === 'failed' && verificationResult && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-card rounded-3xl p-6 z-50 max-w-sm mx-auto"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-1"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>

              <div className="text-center mb-6">
                <h2 className="text-lg font-bold mb-1">{t('tasks.verification.failed')}</h2>
                <p className="text-sm text-muted-foreground">
                  {verificationResult.task.link
                    ? t('tasks.verification.failedLink')
                    : t('tasks.verification.failedReceipt')}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl bg-muted text-muted-foreground font-medium"
                >
                  {t('common.close')}
                </button>
                {!verificationResult.task.link && (
                  <button
                    onClick={() => {
                      closeModal()
                      navigate('/qr')
                    }}
                    className="flex-1 py-3 rounded-xl bg-primary text-white font-medium flex items-center justify-center gap-2"
                  >
                    <Receipt className="w-5 h-5" />
                    {t('tasks.verification.uploadReceipt')}
                  </button>
                )}
                {verificationResult.task.link && (
                  <button
                    onClick={() => {
                      window.open(verificationResult.task.link, '_blank')
                      closeModal()
                    }}
                    className="flex-1 py-3 rounded-xl bg-primary text-white font-medium flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    {t('tasks.verification.tryAgain')}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageContainer>
  )
}
