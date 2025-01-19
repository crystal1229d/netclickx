/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react'
import { Media } from '@/types'
import Card from '@common/Card'
import ConditionalRender from '@common/ConditionalRender'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import styles from './MediaList.module.css'

interface Props {
  title?: string
  fetchData: (page: number) => Promise<Media[]>
  onSingleClick: (media: Media) => void
  onDoubleClick: (media: Media) => void
}

export default function MediaList({
  title,
  fetchData,
  onSingleClick,
  onDoubleClick
}: Props) {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const loadMedia = useCallback(
    async (page: number) => {
      if (loading || !hasMore) return
      setLoading(true)

      try {
        const data = await fetchData(page)
        if (data.length > 0) {
          setMedia(prev => [...prev, ...data])
        } else {
          setHasMore(false)
        }
      } catch (error) {
        console.error('Failed to load media:', error)
      } finally {
        setLoading(false)
      }
    },
    [hasMore, loading]
  )

  useEffect(() => {
    loadMedia(1)
  }, [])

  const handleReachEnd = () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      loadMedia(nextPage)
    }
  }

  return (
    <div className={styles.wrapper}>
      {title && <h1 className={styles.title}>{title}</h1>}
      <ConditionalRender
        items={media}
        render={items => (
          <Swiper
            slidesPerView="auto"
            spaceBetween={40}
            freeMode
            navigation
            modules={[FreeMode, Navigation]}
            style={{ width: '100%', paddingRight: '40px' }}
            onReachEnd={handleReachEnd}>
            {items.map(item => (
              <SwiperSlide
                key={item.id}
                style={{ width: '120px' }}>
                <Card
                  key={item.id}
                  media={item}
                  onSingleClick={() => onSingleClick(item)}
                  onDoubleClick={() => onDoubleClick(item)}
                  className={styles.card}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        emptyMessage="No media available."
      />
    </div>
  )
}
