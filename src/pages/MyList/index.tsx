import { useMediaStore } from '@/stores'
import { Media } from '@/types'
import { useModalContext } from '@/contexts/ModalContext'
import ConditionalRender from '@common/ConditionalRender'
import Card from '@common/Card'
import DetailModal from '@common/DetailModal'

import styles from './MyList.module.css'

export default function MyListPage() {
  const { openModal } = useModalContext()
  const { removeMedia, selectedMedia } = useMediaStore()

  const handleSingleClick = (media: Media) => {
    openModal(<DetailModal media={media} />)
  }

  const handleDoubleClick = (id: Media['id']) => {
    removeMedia(id)
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My List</h1>
      <ConditionalRender
        items={selectedMedia}
        render={media => (
          <ul className={styles.list}>
            {media.map(medium => (
              <Card
                key={medium.id}
                media={medium}
                onSingleClick={handleSingleClick}
                onDoubleClick={() => handleDoubleClick(medium.id)}
              />
            ))}
          </ul>
        )}
        emptyMessage="No Movies or TV series added yet."
      />
    </div>
  )
}
