import { useRef } from 'react'

type Click<T> = {
  onSingleClick: (item: T) => void
  onDoubleClick: (item: T) => void
  delay?: number
}

export function useClick<T>({
  onSingleClick,
  onDoubleClick,
  delay = 530
}: Click<T>) {
  const clickTimer = useRef<number | null>(null)

  const handleClick = (item: T) => {
    if (clickTimer.current) {
      window.clearTimeout(clickTimer.current)
      clickTimer.current = null
      onDoubleClick(item)
    } else {
      clickTimer.current = window.setTimeout(() => {
        onSingleClick(item)
        clickTimer.current = null
      }, delay)
    }
  }

  return handleClick
}
