import { cn } from '@/lib/utils'

// ─── StatCard ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  icon?: React.ReactNode
  accent?: 'gold' | 'red' | 'blue' | 'green'
  delay?: number
}

export function StatCard({ label, value, sub, icon, accent = 'gold', delay = 0 }: StatCardProps) {
  const accentColors = {
    gold:  'text-[#C9A84C]',
    red:   'text-[#CC0000]',
    blue:  'text-[#3B82F6]',
    green: 'text-[#22C55E]',
  }
  return (
    <div
      className="card-glow bg-[#111827] rounded-xl p-5 border border-[rgba(201,168,76,0.08)] animate-count"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">{label}</p>
        {icon && <div className={cn('opacity-60', accentColors[accent])}>{icon}</div>}
      </div>
      <p className={cn('text-3xl font-display font-bold', accentColors[accent])}>{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
    </div>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps { children: React.ReactNode; className?: string }
export function Badge({ children, className }: BadgeProps) {
  return <span className={cn('badge', className)}>{children}</span>
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
interface SectionHeaderProps { title: string; sub?: string; className?: string }
export function SectionHeader({ title, sub, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">{title}</h2>
      {sub && <p className="text-gray-400 mt-1 text-sm">{sub}</p>}
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent" />
    </div>
  )
}

// ─── ProgressBar ──────────────────────────────────────────────────────────────
interface ProgressBarProps { value: number; color?: string; className?: string; animated?: boolean }
export function ProgressBar({ value, color = '#C9A84C', className, animated = false }: ProgressBarProps) {
  return (
    <div className={cn('h-2 bg-white/5 rounded-full overflow-hidden', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-1000', animated && 'shimmer')}
        style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color }}
      />
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps { children: React.ReactNode; className?: string }
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('card-glow bg-[#111827] rounded-xl border border-[rgba(201,168,76,0.08)]', className)}>
      {children}
    </div>
  )
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
interface EmptyStateProps { icon: React.ReactNode; title: string; sub?: string }
export function EmptyState({ icon, title, sub }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-gray-600 mb-3">{icon}</div>
      <p className="text-gray-400 font-medium">{title}</p>
      {sub && <p className="text-gray-600 text-sm mt-1">{sub}</p>}
    </div>
  )
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center py-12', className)}>
      <div className="w-8 h-8 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin" />
    </div>
  )
}
