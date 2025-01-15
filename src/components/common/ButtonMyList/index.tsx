import { useState } from 'react'
import { TiStarOutline, TiStar } from 'react-icons/ti'
import { useMoviesStore } from '@/stores/movie'
import ConditionalRender from '@common/ConditionalRender'
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
        {isOpen ? <TiStarOutline size="2rem" /> : <TiStar size="2rem" />}
      </button>
      {isOpen && (
        <div className={styles.floatingPanel}>
          <ConditionalRender
            items={selectedMovies}
            render={movies => (
              <ul className={styles.list}>
                {movies.map(({ id, title, poster_path }) => (
                  <li
                    key={id}
                    className={styles.card}>
                    <img
                      src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}w185/${poster_path}`}
                      alt={title}
                      className={styles.poster}
                    />
                    <div className={styles.info}>
                      <h3 className={styles.title}>{title}</h3>
                    </div>
                  </li>
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
