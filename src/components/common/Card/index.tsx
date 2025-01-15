import { Movie } from '@/types'
import { useClick } from '@/hooks/useClick'
import Poster from '@common/Poster'
import styles from './Card.module.css'

interface Props {
  movie: Movie
  onSingleClick: (movie: Movie) => void
  onDoubleClick: (movie: Movie) => void
}

export default function Card({ movie, onSingleClick, onDoubleClick }: Props) {
  const { title, poster_path } = movie

  const handleClick = useClick<Movie>({
    onSingleClick,
    onDoubleClick
  })

  return (
    <li
      className={styles.card}
      onClick={() => handleClick(movie)}>
      <Poster
        src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w185/${poster_path}`}
        alt={title}
      />
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </li>
  )
}
