import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Media } from '@/types'
import { useMediaStore } from '@/stores'
import { fetchingNowPlaying } from '@/services'
import { useModalContext } from '@/contexts/ModalContext'
import { getAgeLimit, getGenre, getMediaType, getReleaseDate } from '@/utils'
import { IoPlaySharp } from 'react-icons/io5'
import DetailModal from '@common/DetailModal'
import Badge from '@common/Badge'

import styles from './PreviewBanner.module.css'

const PREVIEW_INTERVAL = 8000

export default function PreviewBanner() {
  const location = useLocation()
  const { addMedia } = useMediaStore()
  const { openModal } = useModalContext()

  const [currentPath, setCurrentPath] = useState<string>('/')
  const [mediaList, setMediaList] = useState<Media[]>([])
  const [previewMediaIdx, setPreviewMediaIdx] = useState<number>(0)

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    if (currentPath === '/') {
      async function loadMedia() {
        try {
          const response = await fetchingNowPlaying()
          setMediaList(response)
        } catch (error) {
          console.error('Failed to fetch media:', error)
        }
      }
      loadMedia()
    }
  }, [currentPath])

  useEffect(() => {
    if (mediaList.length > 0) {
      const interval = setInterval(() => {
        setPreviewMediaIdx(prevIndex => (prevIndex + 1) % mediaList.length)
      }, PREVIEW_INTERVAL)
      return () => clearInterval(interval)
    }
  }, [mediaList])

  if (currentPath !== '/' || mediaList.length === 0) return null

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
  } = mediaList[previewMediaIdx] || {}

  const alt = title || name
  const genreNames = getGenre(genre_ids)

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoSection}>
        <h2 className={styles.title}>{alt}</h2>
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

        <p className={styles.overview}>{overview}</p>

        <div className={styles.buttonsList}>
          <button
            type="button"
            onClick={() => addMedia(mediaList[previewMediaIdx])}
            className={styles.button}>
            <IoPlaySharp size="1.3rem" />
            Add to MyList
          </button>
          <button
            type="button"
            onClick={() =>
              openModal(<DetailModal media={mediaList[previewMediaIdx]} />)
            }
            className={`${styles.button} ${styles.info}`}>
            More Info
          </button>
        </div>
      </div>

      <div
        className={styles.imageWrapper}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(26, 25, 25, 1.1) 0%, rgba(26, 25, 25, 0) 100%),
            url('${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w780/${backdrop_path}')
          `
        }}></div>
    </div>
  )
}
