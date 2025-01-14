import Logo from '@common/Logo'
import Navbar from '@layout/Navbar'
import Search from '@common/Search'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <Logo />
      <Navbar />
      <Search />
    </header>
  )
}
