import { Media } from '@/types'
import { useMediaStore } from '@/stores'
import { getAgeLimit, getGenre, getMediaType, getReleaseDate } from '@/utils'
import { SlArrowRight } from 'react-icons/sl'
import Poster from '@common/Poster'
import Badge from '@common/Badge'

import styles from './DetailModal.module.css'

interface Props {
  media: Media
}

export default function DetailModal({ media }: Props) {
  const { addMedia } = useMediaStore()

  const {
    title,
    name,
    backdrop_path,
    overview,
    release_date,
    first_air_date,
    adult,
    genre_ids,
    media_type,
    vote_average,
    vote_count
  } = media
  const alt = title || name || ''
  const genreNames = getGenre(genre_ids)

  return (
    <div className={styles.wrapper}>
      <Poster
        src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w500/${backdrop_path}`}
        alt={alt}
      />
      <div className={styles.infoList}>
        <Badge label={getReleaseDate(release_date || first_air_date)} />
        <Badge label={getAgeLimit(adult)} />
        <Badge label={getMediaType(media_type)} />
        {genreNames.map((name, index) => (
          <Badge
            key={index}
            label={name}
          />
        ))}
        <Badge label={`Rating : ${vote_average} (${vote_count})`} />
      </div>

      <h2>{alt}</h2>
      <p className={styles.overview}>{overview}</p>

      <button
        type="button"
        onClick={() => addMedia(media)}
        className={styles.button}>
        Add to MyList
        <SlArrowRight size="1rem" />
      </button>
    </div>
  )
}
