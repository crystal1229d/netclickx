import { useEffect, useRef, useState, useCallback, ReactNode } from 'react'
import { throttle } from 'lodash'

interface Props {
  loadMore: (page: number) => Promise<unknown>
  hasMore: boolean
  loading: boolean
  children: ReactNode
  initialPage?: number
}

export default function InfiniteScroll({
  loadMore,
  hasMore,
  loading,
  children,
  initialPage = 1
}: Props) {
  const [page, setPage] = useState<number>(initialPage)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const pageRef = useRef(page)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledLoadMore = useCallback(
    throttle(async () => {
      if (loading || !hasMore) return
      console.log('throttledLoadMore')
      const newPage = pageRef.current + 1
      await loadMore(newPage)
      setPage(newPage)
      pageRef.current = newPage
    }, 1000),
    [loading, hasMore, loadMore]
  )

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && !loading && hasMore) {
        throttledLoadMore()
      }
    },
    [throttledLoadMore, loading, hasMore]
  )

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '25px'
    })

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerRef.current?.unobserve(loadMoreRef.current)
      }
    }
  }, [handleObserver])

  return (
    <div>
      {children}
      {hasMore && <div ref={loadMoreRef} />}
      {loading && <p>Loading...</p>}
    </div>
  )
}
