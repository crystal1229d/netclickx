import { useModalContext } from '@/contexts/ModalContext'
import styles from './Modal.module.css'

export default function Modal() {
  const { content, isOpen, closeModal } = useModalContext()

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={closeModal}>
          &times;
        </button>
        {content}
      </div>
    </div>
  )
}
