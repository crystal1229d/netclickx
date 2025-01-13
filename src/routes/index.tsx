import HomePage from '@/pages/Home'
import MyListPage from '@/pages/MyList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function Router() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
