import { cn } from '@/lib/utils'

export function StatCard({
  icon: Icon,
  label,
  value,
  subValue,
  iconBgColor = 'bg-primary/20',
  iconColor = 'text-primary',
  className,
  onClick
}) {
  const Wrapper = onClick ? 'button' : 'div'

  return (
    <Wrapper
      className={cn(
        'bg-card p-4 rounded-xl text-left w-full',
        onClick && 'active:scale-[0.98] transition-transform',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', iconBgColor)}>
          <Icon className={cn('w-4 h-4', iconColor)} />
        </div>
        <span className="text-muted-foreground text-sm">{label}</span>
      </div>
      <p className="text-xl font-semibold">{value}</p>
      {subValue && (
        <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
      )}
    </Wrapper>
  )
}
