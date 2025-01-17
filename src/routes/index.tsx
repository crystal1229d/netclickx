import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@layout/Layout'
import HomePage from '@pages/Home'
import MyListPage from '@pages/MyList'
import TrendingPage from '@/pages/Trending'

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
