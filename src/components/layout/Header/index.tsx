import Logo from '@/components/common/Logo'
import Navbar from '../Navbar'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <Logo />
      <Navbar />
      <div>
        <input type="text" />
        <button type="button">Search</button>
      </div>
    </header>
  )
}
