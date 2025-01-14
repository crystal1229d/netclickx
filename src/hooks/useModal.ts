import React, { useState } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [content, setContent] = useState<React.ReactNode>(null)

  const openModal = (modalContent: React.ReactNode) => {
    setContent(modalContent)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setContent(null)
  }

  return { isOpen, content, openModal, closeModal }
}
