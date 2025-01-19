import styles from './Badge.module.css'

interface Props {
  label: string
}

export default function Badge({ label }: Props) {
  if (!label) return null
  return <div className={styles.wrapper}>{label}</div>
}
