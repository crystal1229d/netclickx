import { memo } from 'react'
import { Media } from '@/types'
import { useClick } from '@/hooks/useClick'
import Poster from '@common/Poster'
import styles from './Card.module.css'

interface Props {
  media: Media
  onSingleClick: (media: Media) => void
  onDoubleClick: (media: Media | Media['id']) => void
  className?: string
}

export default memo(function Card({
  media,
  onSingleClick,
  onDoubleClick,
  className
}: Props) {
  const { title, name, poster_path } = media
  const displayTitle = title || name || ''

  const handleClick = useClick<Media>({
    onSingleClick,
    onDoubleClick
  })

  return (
    <li
      className={`${styles.card} ${className || ''}`}
      onClick={() => handleClick(media)}>
      <Poster
        src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w185/${poster_path}`}
        alt={displayTitle}
      />
    </li>
  )
})
