import { GoInbox } from 'react-icons/go'
import styles from './NoData.module.css'

interface Props {
  message?: string
  color?: 'black' | 'white'
}

export default function NoData({
  message = 'No Movies or TV series.',
  color = 'white'
}: Props) {
  return (
    <div
      className={styles.wrapper}
      style={{ color }}>
      <GoInbox size="2.5rem" />
      <p>{message}</p>
    </div>
  )
}
