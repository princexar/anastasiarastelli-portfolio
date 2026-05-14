import { useEffect } from 'react'
import type { ReactNode } from 'react'

type AppWindowProps = {
  title: string
  onClose: () => void
  children: ReactNode
  /** Tailwind max-width for the panel (default: max-w-sm). */
  maxWidthClass?: string
}

export function AppWindow({ title, onClose, children, maxWidthClass = 'max-w-sm' }: AppWindowProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className={`relative z-50 w-full ${maxWidthClass} overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--elevated)] shadow-xl`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-window-title"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-3 py-2">
          <span id="app-window-title" className="text-sm font-medium text-[var(--text)]">
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded text-lg leading-none text-[var(--muted)] hover:bg-[var(--border)] hover:text-[var(--text)]"
            aria-label="Close window"
          >
            ×
          </button>
        </div>
        <div className="flex max-h-[min(75vh,32rem)] flex-col gap-3 overflow-y-auto overscroll-contain p-4 text-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
