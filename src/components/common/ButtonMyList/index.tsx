import { useState } from 'react'
import { FiStar } from 'react-icons/fi'
import { useMoviesStore } from '@/stores/movie'
import styles from './ButtonMyList.module.css'

export default function ButtonMyList() {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedMovies } = useMoviesStore()

  const toggleList = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      <button
        type="button"
        className={styles.floatingButton}
        onClick={toggleList}>
        <FiStar size="1.5rem" />
      </button>
      {isOpen && (
        <div className={styles.floatingPanel}>
          {selectedMovies.length === 0 ? (
            <div className={styles.noData}>
              <h3>My Movies</h3>
              <p>No movies added yet.</p>
            </div>
          ) : (
            <ul className={styles.movieList}>
              {selectedMovies.map(movie => (
                <li
                  key={movie.id}
                  className={styles.movieCard}>
                  <img
                    src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w92/${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.moviePoster}
                  />
                  <div className={styles.movieInfo}>
                    <h3 className={styles.movieTitle}>{movie.title}</h3>
                    <p className={styles.movieReleaseDate}>
                      {movie.release_date}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  )
}
