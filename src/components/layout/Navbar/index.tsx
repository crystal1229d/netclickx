import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>Home</li>
        <li>Hot & New</li>
        <li>MyList</li>
      </ul>
    </nav>
  )
}
