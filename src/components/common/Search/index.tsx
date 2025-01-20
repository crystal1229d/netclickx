import { useState } from 'react'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import styles from './Search.module.css'
import { Media } from '@/types'
import { searchAllByKeyword } from '@/services'

export default function Search() {
  const [keyword, setKeyword] = useState<string>('')
  const [result, setResult] = useState<Media[] | []>([])
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false)

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (keyword.trim() === '') return

    const searchResult = await searchAllByKeyword(keyword)
    setResult(searchResult)
    setIsResultModalOpen(true)
    console.log(searchResult)
  }

  const closeResultModal = () => setIsResultModalOpen(false)

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={handleSearch}
        className={styles.form}>
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Search"
        />
        <button type="submit">
          <HiOutlineMagnifyingGlass />
        </button>
      </form>

      {isResultModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeResultModal}>
              ✖
            </button>
            {result.length > 0 ? (
              <ul>
                {result.map(res => (
                  <li key={res.id}>{res.name}</li>
                ))}
              </ul>
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
