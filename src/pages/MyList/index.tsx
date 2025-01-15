import { useMoviesStore } from '@/stores/movie'
import ConditionalRender from '@common/ConditionalRender'
import styles from './MyList.module.css'

export default function MyListPage() {
  const { selectedMovies } = useMoviesStore()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My List</h1>
      <ConditionalRender
        items={selectedMovies}
        render={movies => (
          <ul className={styles.moviesList}>
            {movies.map(movie => (
              <li
                key={movie.id}
                className={styles.movieCard}>
                <img
                  src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w185/${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.moviePoster}
                />
                <div className={styles.movieInfo}>
                  <h3 className={styles.movieTitle}>{movie.title}</h3>
                </div>
              </li>
            ))}
          </ul>
        )}
        emptyMessage="No Movies or TV series added yet."
      />
    </div>
  )
}
