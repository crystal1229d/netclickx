import { useCallback, useEffect, useState } from 'react'
import { fetchTrendingMovies } from '@/services/movies'
import { Movie } from '@/types'
import { useModalContext } from '@/contexts/ModalContext'
import { useMoviesStore } from '@/stores/movie'
import ListSkeleton from '@common/ListSkeleton'
import Card from '@common/Card'
import InfiniteScroll from '@common/InfiniteScroll'
import ConditionalRender from '@common/ConditionalRender'
import styles from './Home.module.css'

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const { openModal } = useModalContext()
  const { addMovie } = useMoviesStore()

  const loadMovies = useCallback(
    async (page: number) => {
      if (loading || !hasMore) return
      setLoading(true)

      const movieData = await fetchTrendingMovies(page)
      if (movieData.length > 0) {
        setMovies(prevMovies => [...prevMovies, ...movieData])
      } else {
        setHasMore(false)
      }
      setLoading(false)
    },
    [loading, hasMore]
  )

  useEffect(() => {
    loadMovies(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {loading && movies.length === 0 ? (
        <ListSkeleton count={20} />
      ) : (
        <ConditionalRender
          items={movies}
          render={movies => (
            <InfiniteScroll
              loadMore={loadMovies}
              hasMore={hasMore}
              loading={loading}>
              <ul className={styles.list}>
                {movies.map(movie => (
                  <Card
                    key={movie.id}
                    movie={movie}
                    onSingleClick={handleSingleClick}
                    onDoubleClick={() => handleDoubleClick(movie)}
                  />
                ))}
              </ul>
            </InfiniteScroll>
          )}
          emptyMessage="No Movies or TV series added yet."
        />
      )}
    </div>
  )
}
