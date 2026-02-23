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

      {/* Desktop Layout */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Referral Card - Code & Link */}
          <ReferralCard
            code={referralData.myCode}
            link={referralData.myLink}
          />

          {/* Earnings Stats */}
          <EarningsCard
            totalEarnings={referralData.totalEarnings}
            totalInvited={referralData.totalInvited}
            pendingRewards={referralData.pendingRewards}
          />

          {/* Milestones - Desktop only in left */}
          <div className="hidden lg:block">
            <Milestones
              milestones={referralMilestones}
              currentCount={referralData.totalInvited}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="mt-6 lg:mt-0 space-y-6">
          {/* Milestones - Mobile */}
          <div className="lg:hidden">
            <Milestones
              milestones={referralMilestones}
              currentCount={referralData.totalInvited}
            />
          </div>

          {/* Invited Friends List */}
          <InvitedList friends={invitedFriends} />
        </div>
      </div>
    </PageContainer>
  )
}
