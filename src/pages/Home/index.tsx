import { useEffect, useState } from 'react'
import { fetchTrendingMovies } from '@/services/movies'
import { Movie } from '@/types'
import styles from './Home.module.css'

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true)
      const movieData = await fetchTrendingMovies()
      setMovies(movieData)
      setLoading(false)
    }

    getMovies()
  }, [])

  if (loading) {
    return <p className={styles.loading}>Loading...</p>
  }

  if (!movies.length) {
    return <p className={styles.noData}>No Data</p>
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Trending Movies</h1>
      <ul className={styles.moviesList}>
        {movies.map(movie => (
          <li
            key={movie.id}
            className={styles.movieCard}>
            <img
              src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w300/${movie.poster_path}`}
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
