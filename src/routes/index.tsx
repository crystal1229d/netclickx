import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@layout/Layout'
import HomePage from '@/app/Home'
import MyListPage from '@/app/MyList'
import TrendingPage from '@/app/Trending'

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/trending"
            element={<TrendingPage />}
          />
          <Route
            path="/mylist"
            element={<MyListPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
