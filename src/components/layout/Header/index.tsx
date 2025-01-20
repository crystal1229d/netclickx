import Logo from '@common/Logo'
import Navbar from '@layout/Navbar'
import FullpageNavbar from '@layout/FullpageNavbar'
import Search from '@common/Search'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <Logo />
      <Navbar />
      <FullpageNavbar />
      <Search />
    </header>
  )
}
