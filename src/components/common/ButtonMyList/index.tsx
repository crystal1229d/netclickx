import { useEffect, useState } from 'react'
import { TiStarOutline, TiStar } from 'react-icons/ti'
import { Media } from '@/types'
import { useMediaStore } from '@/stores'
import { useModalContext } from '@/contexts/ModalContext'
import ConditionalRender from '@common/ConditionalRender'
import Card from '@common/Card'
import DetailModal from '@common/DetailModal'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

import styles from './ButtonMyList.module.css'

export default function ButtonMyList() {
  const [isOpen, setIsOpen] = useState(false)
  const { openModal } = useModalContext()
  const {
    removeMedia,
    selectedMedia,
    isMyListBtnBouncing,
    setIsMyListBtnBouncing
  } = useMediaStore()

  const [displayedMedia, setDisplayedMedia] = useState<Media[]>([])
  const [visibleCount, setVisibleCount] = useState(7)

  useEffect(() => {
    setDisplayedMedia(selectedMedia.slice(0, visibleCount))
  }, [selectedMedia, visibleCount])

  useEffect(() => {
    if (isMyListBtnBouncing) {
      const timeout = setTimeout(() => {
        setIsMyListBtnBouncing(false)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [isMyListBtnBouncing, setIsMyListBtnBouncing])

  const toggleList = () => {
    setIsOpen(prev => !prev)
  }

  const handleSingleClick = (media: Media) => {
    openModal(<DetailModal media={media} />)
  }

  const handleDoubleClick = (id: Media['id']) => {
    removeMedia(id)
  }

  const handleReachEnd = () => {
    if (visibleCount >= selectedMedia.length) return
    setVisibleCount(prev => prev + 5)
  }

  return (
    <>
      <button
        type="button"
        className={`${styles.floatingButton} ${isMyListBtnBouncing ? styles.animate : ''}`}
        onClick={toggleList}>
        {isOpen ? <TiStarOutline size="2rem" /> : <TiStar size="2rem" />}
      </button>
      {isOpen && (
        <div className={styles.floatingPanel}>
          <ConditionalRender
            items={displayedMedia}
            render={media => (
              <Swiper
                slidesPerView="auto"
                spaceBetween={40}
                freeMode={true}
                modules={[FreeMode]}
                style={{ width: '100%', paddingRight: '40px' }}
                onReachEnd={handleReachEnd}>
                {media.map(medium => (
                  <SwiperSlide
                    key={medium.id}
                    style={{ width: '120px' }}>
                    <Card
                      key={medium.id}
                      media={medium}
                      onSingleClick={handleSingleClick}
                      onDoubleClick={() => handleDoubleClick(medium.id)}
                      className={styles.card}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            emptyMessage="No Movies or TV series added yet."
            emptyTextColor="black"
          />
        </div>
      )}
    </>
  )
}
