import { Media } from '@/types'
import Poster from '@common/Poster'

interface Props {
  media: Media
}

export default function DetailModal({ media }: Props) {
  const { title, name, backdrop_path, overview } = media
  const alt = title || name || ''

  return (
    <div>
      <Poster
        src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w500/${backdrop_path}`}
        alt={alt}
      />
      <h2>{title}</h2>
      <p>{overview}</p>
    </div>
  )
}
