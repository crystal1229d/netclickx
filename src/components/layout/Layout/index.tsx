import React from 'react'
import Header from '@layout/Header'
import PreviewBanner from '@common/PreviewBanner'
// import Footer from '@layout/Footer'
import ButtonMyList from '@common/ButtonMyList'
import styles from './Layout.module.css'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <PreviewBanner />
      <main>{children}</main>
      {/* <Footer /> */}
      <ButtonMyList />
    </div>
  )
}
