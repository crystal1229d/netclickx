import { useMoviesStore } from '@/stores/movie'
import { Movie } from '@/types'
import { useModalContext } from '@/contexts/ModalContext'
import ConditionalRender from '@common/ConditionalRender'
import Card from '@common/Card'
import styles from './MyList.module.css'

export default function MyListPage() {
  const { openModal } = useModalContext()
  const { removeMovie, selectedMovies } = useMoviesStore()

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

  const handleDoubleClick = (id: Movie['id']) => {
    removeMovie(id)
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My List</h1>
      <ConditionalRender
        items={selectedMovies}
        render={movies => (
          <ul className={styles.list}>
            {movies.map(movie => (
              <Card
                key={movie.id}
                movie={movie}
                onSingleClick={handleSingleClick}
                onDoubleClick={() => handleDoubleClick(movie.id)}
              />
            ))}
          </ul>
        )}
        emptyMessage="No Movies or TV series added yet."
      />
    </div>
  )
}
