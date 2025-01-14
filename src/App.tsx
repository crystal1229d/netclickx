import Router from './routes'
import { ModalProvider } from '@contexts/ModalContext'
import Modal from '@common/Modal'

function App() {
  return (
    <ModalProvider>
      <Router />
      <Modal />
    </ModalProvider>
  )
}

export default App
