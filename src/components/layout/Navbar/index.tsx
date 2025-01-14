import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [selectedPath, setSelectedPath] = useState<string>('/')

  const isActive = (path: string) => selectedPath === path

  useEffect(() => {
    setSelectedPath(location.pathname)
  }, [location.pathname])

  return (
    <nav className={styles.navbar}>
      <ul>
        <Link to="/">
          <li className={isActive('/') ? styles.active : ''}>Home</li>
        </Link>
        <Link to="/new">
          <li className={isActive('/new') ? styles.active : ''}>
            New & Popular
          </li>
        </Link>
        <Link to="/mylist">
          <li className={isActive('/mylist') ? styles.active : ''}>MyList</li>
        </Link>
      </ul>
    </nav>
  )
}
