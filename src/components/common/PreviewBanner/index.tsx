import { Media } from '@/types'
import styles from './PreviewBanner.module.css'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Props {
  media: Media
}

export default function PreviewBanner({ media }: Props) {
  const location = useLocation()
  const [currentPath, setCurrentPath] = useState('/')

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location.pathname])

  if (currentPath !== '/') return null

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
      <div className={styles.infoSection}>
        <h2 className={styles.title}>{alt}</h2>
        <div className={styles.infoList}>
          <div className={styles.badge}>{displayedReleaseDate}</div>
          <div className={styles.badge}>{displayedAdult}</div>
          <div className={styles.badge}>{displayedMediaType}</div>
          <div className={styles.badge}>드라마 장르</div>
          <div className={styles.badge}>
            {vote_average} ({vote_count})
          </div>
        </div>
        <p className={styles.overview}>{overview}</p>
      </div>

      <div
        className={styles.imageWrapper}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(26, 25, 25, 1.1) 0%, rgba(26, 25, 25, 0) 100%),
            linear-gradient(to top, rgba(26, 25, 25) 0%, rgba(26, 25, 25, 0.8) 1%,  rgba(26, 25, 25, 0) 5%),
            linear-gradient(to bottom, rgba(26, 25, 25) 0%, rgba(26, 25, 25, 0.8) 1%, rgba(26, 25, 25, 0) 5%),
            url('${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w780/${backdrop_path}')
          `
        }}></div>
    </div>
  )
}
