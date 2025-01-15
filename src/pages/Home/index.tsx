import { useEffect, useState } from 'react'
import { fetchTrendingMovies } from '@/services/movies'
import { Movie } from '@/types'
import { useModalContext } from '@/contexts/ModalContext'
import { useMoviesStore } from '@/stores/movie'
import ListSkeleton from '@common/ListSkeleton'
import Card from '@common/Card'
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
    const { title, backdrop_path, overview } = movie

    openModal(
      <div>
        <img
          src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w500/${backdrop_path}`}
          alt={title}
          className={styles.modalImage}
        />
        <h2>{title}</h2>
        <p>{overview}</p>
      </div>
    )
  }

  const handleDoubleClick = (movie: Movie) => {
    addMovie(movie)
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Trending Now</h1>
      {loading ? (
        <ListSkeleton count={20} />
      ) : (
        <ul className={styles.moviesList}>
          {movies.map(movie => (
            <Card
              key={movie.id}
              movie={movie}
              onSingleClick={handleSingleClick}
              onDoubleClick={handleDoubleClick}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
