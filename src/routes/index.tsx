import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@layout/Layout'
import HomePage from '@/pages/Home'
import TrendingPage from '@/pages/Trending'
import MyListPage from '@/pages/MyList'
import SearchPage from '@/pages/Search'

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
          <Route
            path="/search"
            element={<SearchPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
