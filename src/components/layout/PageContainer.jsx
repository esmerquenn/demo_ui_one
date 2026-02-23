import { cn } from '@/lib/utils'
import { PullToRefresh } from '@/components/shared/PullToRefresh'

export function PageContainer({
  children,
  className,
  pullToRefresh = false,
  onRefresh,
}) {
  const content = (
    <div className={cn('px-4 pt-4 pb-24', className)}>
      {children}
    </div>
  )

  if (pullToRefresh) {
    return (
      <PullToRefresh onRefresh={onRefresh}>
        {content}
      </PullToRefresh>
    )
  }

  return content
}
