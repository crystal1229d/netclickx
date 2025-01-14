import { useState } from 'react'
import { FiStar } from 'react-icons/fi'
import styles from './ButtonMyList.module.css'

export default function ButtonMyList() {
  const [isOpen, setIsOpen] = useState(false)

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
          <h3>My Movies</h3>
          <p>No movies added yet.</p>
        </div>
      )}
    </>
  )
}
