import styles from './Poster.module.css'

interface Props {
  src: string
  alt: string
}

export default function Poster({ src, alt }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`${styles.poster}`}
    />
  )
}
