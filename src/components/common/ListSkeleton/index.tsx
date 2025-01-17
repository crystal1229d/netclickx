import styles from './ListSkeleton.module.css'

interface Props {
  count?: number
  line?: number
}

export default function ListSkeleton({ count = 20, line }: Props) {
  const gridStyle =
    line === 1 ? { gridTemplateRows: '1fr', gridAutoFlow: 'column' } : {}

  return (
    <ul
      className={styles.list}
      style={gridStyle}>
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className={`${styles.item}`}>
          <div className={styles.poster}></div>
        </li>
      ))}
    </ul>
  )
}
