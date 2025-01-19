import { Media } from '@/types'
import { useModalContext } from '@/contexts/ModalContext'
import { useMediaStore } from '@/stores/media'
import MediaList from '@common/MediaList'
import DetailModal from '@common/DetailModal'
import {
  fetchTrendingAll,
  fetchTrendingMovies,
  fetchTrendingTVs
} from '@/services'

import styles from './Home.module.css'

export default function HomePage() {
  const { openModal } = useModalContext()
  const { addMedia } = useMediaStore()

  const handleSingleClick = (media: Media) => {
    openModal(<DetailModal media={media} />)
  }

  const handleDoubleClick = (media: Media) => {
    addMedia(media)
  }

  return (
    <div className={styles.wrapper}>
      <MediaList
        title="Trending Now"
        fetchData={fetchTrendingAll}
        onSingleClick={handleSingleClick}
        onDoubleClick={handleDoubleClick}
      />
      <MediaList
        title="Trending Movies"
        fetchData={fetchTrendingMovies}
        onSingleClick={handleSingleClick}
        onDoubleClick={handleDoubleClick}
      />
      <MediaList
        title="Trending TV Series"
        fetchData={fetchTrendingTVs}
        onSingleClick={handleSingleClick}
        onDoubleClick={handleDoubleClick}
      />
    </div>
  )
}
