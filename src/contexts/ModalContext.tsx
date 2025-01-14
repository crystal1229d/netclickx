import { createContext, useContext } from 'react'
import { useModal } from '@/hooks/useModal'

const ModalContext = createContext<ReturnType<typeof useModal> | null>(null)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modal = useModal()
  return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }
  return context
}
