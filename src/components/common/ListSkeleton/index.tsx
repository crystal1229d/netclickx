import styles from './ListSkeleton.module.css'

interface Props {
  count?: number
}

export default function ListSkeleton({ count = 20 }: Props) {
  return (
    <ul className={styles.list}>
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className={`${styles.item}`}>
          <div className={styles.poster}></div>
          <div className={styles.info}>
            <h2 className={styles.title}></h2>
          </div>
        </li>
      ))}
    </ul>
  )
}
