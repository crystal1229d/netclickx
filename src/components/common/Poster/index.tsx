import { useEffect, useState } from 'react'
import styles from './Poster.module.css'

interface Props {
  src: string
  alt: string
}

export default function Poster({ src, alt }: Props) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const image = new Image()
    image.src = src

    image.onload = () => {
      setIsLoading(false)
    }

    return () => {
      image.onload = null
    }
  }, [src])

  return (
    <div className={styles.posterWrapper}>
      {isLoading && <div className={styles.skeleton}></div>}
      <img
        src={src}
        alt={alt}
        className={`${styles.poster} ${isLoading ? styles.loading : styles.loaded}`}
        loading="lazy"
      />
    </div>
  )
}
