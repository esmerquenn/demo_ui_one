import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import {
  ReferralCard,
  EarningsCard,
  InvitedList,
  Milestones
} from '@/features/friends'
import {
  referralData,
  invitedFriends,
  referralMilestones
} from '@/data/mockData'

export default function FriendsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }, [])

  const activeFriendsCount = invitedFriends.filter(f => f.status === 'active').length

  return (
    <PageContainer pullToRefresh onRefresh={handleRefresh}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold">Dostlar</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Dəvət et, qazan, birlikdə böyü!
        </p>
      </motion.header>

      {/* Referral Card - Code & Link */}
      <div className="mb-6">
        <ReferralCard
          code={referralData.myCode}
          link={referralData.myLink}
        />
      </div>

      {/* Earnings Stats */}
      <div className="mb-6">
        <EarningsCard
          totalEarnings={referralData.totalEarnings}
          totalInvited={referralData.totalInvited}
          pendingRewards={referralData.pendingRewards}
        />
      </div>

      {/* Milestones */}
      <div className="mb-6">
        <Milestones
          milestones={referralMilestones}
          currentCount={referralData.totalInvited}
        />
      </div>

      {/* Invited Friends List */}
      <InvitedList friends={invitedFriends} />
    </PageContainer>
  )
}
