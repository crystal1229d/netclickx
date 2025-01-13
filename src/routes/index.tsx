import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@layout/Layout'
import HomePage from '@pages/Home'
import MyListPage from '@pages/MyList'

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
            path="/mylist"
            element={<MyListPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
