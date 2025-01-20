import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <h3>Netclickx Korea</h3>
      <p>
        This is a Netflix clone website created for educational purposes.
        <br />
        It aims to showcase web development skills by replicating key features
        of the Netflix platform.
        <br />
        Please note that it is not affiliated with or endorsed by Netflix, Inc.
        <br />
        2025-01-20
      </p>
    </footer>
  )
}
