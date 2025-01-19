/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, useCallback, ReactNode } from 'react'
import { throttle } from 'lodash'
import ListSkeleton from '../ListSkeleton'

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

  const throttledLoadMore = useCallback(
    throttle(async () => {
      if (loading || !hasMore) return

      const newPage = pageRef.current + 1
      await loadMore(newPage)
      setPage(newPage)
      pageRef.current = newPage
    }, 1500),
    []
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
        observerRef.current?.unobserve(loadMoreRef.current)
      }
    }
  }, [handleObserver])

  return (
    <div>
      {children}
      {loading && <ListSkeleton count={15} />}
      {hasMore && <div ref={loadMoreRef} />}
    </div>
  )
}
