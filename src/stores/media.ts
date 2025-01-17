import { Media } from '@/types'
import { create } from 'zustand'

interface MediaStore {
  selectedMedia: Media[]
  isMyListBtnBouncing: boolean

  addMedia: (media: Media) => void
  removeMedia: (mediaId: number) => void
  setIsMyListBtnBouncing: (state: boolean) => void
}

export const useMediaStore = create<MediaStore>(set => ({
  selectedMedia: [],
  isMyListBtnBouncing: false,

  addMedia: media =>
    set(state => {
      const mediaExists = state.selectedMedia.some(m => m.id === media.id)
      if (mediaExists) {
        return state
      }
      return {
        selectedMedia: [...state.selectedMedia, media],
        isMyListBtnBouncing: true
      }
    }),
  removeMedia: mediaId =>
    set(state => ({
      selectedMedia: state.selectedMedia.filter(m => m.id !== mediaId)
    })),
  setIsMyListBtnBouncing: (state: boolean) =>
    set({ isMyListBtnBouncing: state })
}))
