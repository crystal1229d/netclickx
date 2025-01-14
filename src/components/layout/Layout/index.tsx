import React from 'react'
import Header from '@layout/Header'
import Footer from '@layout/Footer'
import ButtonMyList from '@/components/common/ButtonMyList'
import styles from './Layout.module.css'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>{children}</main>
      <Footer />
      <ButtonMyList />
    </div>
  )
}
