import { motion } from 'framer-motion'
import { MoreHorizontal } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'

export default function MorePage() {
  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mb-4">
          <MoreHorizontal className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-xl font-semibold mb-2">Daha çox</h1>
        <p className="text-muted-foreground text-center">Tezliklə...</p>
      </motion.div>
    </PageContainer>
  )
}
