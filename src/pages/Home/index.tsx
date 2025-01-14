import { useEffect, useState } from 'react'
import { fetchTrendingMovies } from '@/services/movies'
import { Movie } from '@/types'
import { useModalContext } from '@/contexts/ModalContext'
import { useClick } from '@/hooks/useClick'
import { useMoviesStore } from '@/stores/movie'
import styles from './Home.module.css'

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { openModal } = useModalContext()
  const { addMovie } = useMoviesStore()

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true)
      const movieData = await fetchTrendingMovies()
      setMovies(movieData)
      setLoading(false)
    }

    getMovies()
  }, [])

  const handleSingleClick = (movie: Movie) => {
    openModal(
      <div>
        <img
          src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w500/${movie.backdrop_path}`}
          alt={movie.title}
          className={styles.modalImage}
        />
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
      </div>
    )
  }

  const handleDoubleClick = (movie: Movie) => {
    addMovie(movie)
  }

  const handleClick = useClick<Movie>({
    onSingleClick: handleSingleClick,
    onDoubleClick: handleDoubleClick
  })

  if (loading) {
    return <p className={styles.loading}>Loading...</p>
  }

  if (!movies.length) {
    return <p className={styles.noData}>No Data</p>
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Trending Now</h1>
      <ul className={styles.moviesList}>
        {movies.map(movie => (
          <li
            key={movie.id}
            className={styles.movieCard}
            onClick={() => handleClick(movie)}>
            <img
              src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w185/${movie.poster_path}`}
              alt={movie.title}
              className={styles.moviePoster}
            />
            <div className={styles.movieInfo}>
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <p className={styles.movieReleaseDate}>{movie.release_date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
