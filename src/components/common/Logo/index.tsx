import { Link } from 'react-router-dom'
import styles from './Logo.module.css'

interface Props {
  linked?: boolean
  to?: string
}

export default function Logo({ linked = true, to = '/' }: Props) {
  const logoContent = <div className={styles.logo}>netclicks</div>

  return linked ? <Link to={{ pathname: to }}>{logoContent}</Link> : logoContent
}
