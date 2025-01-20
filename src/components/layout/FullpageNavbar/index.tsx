import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import styles from './FullpageNavbar.module.css'

export default function FullpageNavbar() {
  const location = useLocation()
  const [selectedPath, setSelectedPath] = useState<string>('/')
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

  const isActive = (path: string) => selectedPath === path

  useEffect(() => {
    setSelectedPath(location.pathname)
  }, [location.pathname])

  const handleClickHamburger = () => setIsNavOpen(prev => !prev)

  return (
    <nav className={`${styles.navbar} ${isNavOpen ? styles.open : ''}`}>
      <ul onClick={() => setIsNavOpen(false)}>
        <Link to="/">
          <li className={isActive('/') ? styles.active : ''}>Home</li>
        </Link>
        <Link to="/trending">
          <li className={isActive('/trending') ? styles.active : ''}>
            New & Popular
          </li>
        </Link>
        <Link to="/mylist">
          <li className={isActive('/mylist') ? styles.active : ''}>MyList</li>
        </Link>
      </ul>

      <RxHamburgerMenu
        className={styles.hamburger}
        onClick={handleClickHamburger}
      />
    </nav>
  )
}
