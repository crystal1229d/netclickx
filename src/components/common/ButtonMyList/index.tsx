import { useState } from 'react'
import { TiStarOutline, TiStar } from 'react-icons/ti'
import { useMoviesStore } from '@/stores/movie'
import ConditionalRender from '@common/ConditionalRender'
import styles from './ButtonMyList.module.css'
import Card from '../Card'
import { Movie } from '@/types'
import { useModalContext } from '@/contexts/ModalContext'

export default function ButtonMyList() {
  const [isOpen, setIsOpen] = useState(false)
  const { openModal } = useModalContext()
  const { removeMovie, selectedMovies } = useMoviesStore()

  const toggleList = () => {
    setIsOpen(prev => !prev)
  }

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
    <>
      <button
        type="button"
        className={styles.floatingButton}
        onClick={toggleList}>
        {isOpen ? <TiStarOutline size="2rem" /> : <TiStar size="2rem" />}
      </button>
      {isOpen && (
        <div className={styles.floatingPanel}>
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
                    className={styles.card}
                  />
                ))}
              </ul>
            )}
            emptyMessage="No Movies or TV series added yet."
            emptyTextColor="black"
          />
        </div>
      )}
    </>
  )
}
