import { Media } from '@/types'
import Poster from '@common/Poster'
import styles from './PreviewBanner.module.css'

interface Props {
  media: Media
}

export default function PreviewBanner({ media }: Props) {
  const {
    title,
    name,
    backdrop_path,
    overview,
    release_date,
    first_air_date,
    adult,
    media_type,
    vote_average,
    vote_count
  } = media
  const alt = title || name || ''
  const date = release_date || first_air_date
  const displayedReleaseDate = date && date.split('-')[0]
  const displayedAdult = adult ? '19+' : '15+'
  const displayedMediaType = media_type === 'movie' ? '영화' : 'TV 시리즈'

  return (
    <div className={styles.wrapper}>
      <Poster
        src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w780/${backdrop_path}`}
        alt={alt}
      />
      <div className={styles.infoList}>
        <div className={styles.badge}>{displayedReleaseDate}</div>
        <div className={styles.badge}>{displayedAdult}</div>
        <div className={styles.badge}>{displayedMediaType}</div>
        <div className={styles.badge}>드라마 장르</div>
        <div className={styles.badge}>
          {vote_average} ({vote_count})
        </div>
      </div>

      <h2>{alt}</h2>
      <p className={styles.overview}>{overview}</p>
    </div>
  )
}
