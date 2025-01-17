import { useCallback, useEffect, useState } from 'react'
import { Media } from '@/types'
import { useMediaStore } from '@/stores'
import { fetchTrendingAll } from '@/services'
import { useModalContext } from '@/contexts/ModalContext'
import ListSkeleton from '@common/ListSkeleton'
import Card from '@common/Card'
import InfiniteScroll from '@common/InfiniteScroll'
import ConditionalRender from '@common/ConditionalRender'
import DetailModal from '@common/DetailModal'

import styles from './Trending.module.css'

export default function TrendingPage() {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const { openModal } = useModalContext()
  const { addMedia } = useMediaStore()

  const loadMedia = useCallback(
    async (page: number) => {
      if (loading || !hasMore) return
      setLoading(true)

      const mediaData = await fetchTrendingAll(page)
      if (mediaData.length > 0) {
        setMedia(prevMedia => [...prevMedia, ...mediaData])
      } else {
        setHasMore(false)
      }
      setLoading(false)
    },
    [loading, hasMore]
  )

  useEffect(() => {
    loadMedia(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSingleClick = (media: Media) => {
    openModal(<DetailModal media={media} />)
  }

  const handleDoubleClick = (media: Media) => {
    addMedia(media)
  }

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <ListSkeleton count={15} />
      ) : (
        <ConditionalRender
          items={media}
          render={media => (
            <InfiniteScroll
              loadMore={loadMedia}
              hasMore={hasMore}
              loading={loading}>
              <ul className={styles.list}>
                {media.map(medium => (
                  <Card
                    key={medium.id}
                    media={medium}
                    onSingleClick={handleSingleClick}
                    onDoubleClick={() => handleDoubleClick(medium)}
                  />
                ))}
              </ul>
            </InfiniteScroll>
          )}
          emptyMessage="No Movies or TV series."
        />
      )}
    </div>
  )
}
