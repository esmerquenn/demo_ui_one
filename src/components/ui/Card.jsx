import { cn } from '@/lib/utils'

export function Card({ className, children, elevated = false, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl p-4',
        elevated ? 'bg-[#162033]' : 'bg-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('flex items-center justify-between mb-3', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn('font-semibold', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}
