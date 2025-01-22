import { Media } from '@/types'
import { create } from 'zustand'

interface MediaStore {
  selectedMedia: Media[]
  isMyListBtnBouncing: boolean

  mediaExists: (mediaId: number) => boolean
  addMedia: (media: Media) => void
  removeMedia: (mediaId: number) => void
  setIsMyListBtnBouncing: (state: boolean) => void
}

export const useMediaStore = create<MediaStore>((set, get) => ({
  selectedMedia: [],
  isMyListBtnBouncing: false,

  mediaExists: mediaId => {
    return get().selectedMedia.some(m => m.id === mediaId)
  },

  addMedia: media =>
    set(state => {
      const { mediaExists, removeMedia } = get()
      if (mediaExists(media.id)) {
        removeMedia(media.id)
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
