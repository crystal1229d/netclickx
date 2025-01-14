import { useState } from 'react'
import styles from './Search.module.css'

export default function Search() {
  const [keyword, setKeyword] = useState<string>('')

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (keyword.trim() === '') return

    alert('search ' + keyword)
  }

  return (
    <form
      onSubmit={handleSearch}
      className={styles.wrapper}>
      <input
        type="text"
        value={keyword}
        onChange={handleKeywordChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  )
}
