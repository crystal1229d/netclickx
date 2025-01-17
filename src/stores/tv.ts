import { Tv } from '@/types'
import { create } from 'zustand'

interface TvsStore {
  selectedTvs: Tv[]

  addTv: (tv: Tv) => void
  removeTv: (tvId: number) => void
}

export const useTvsStore = create<TvsStore>(set => ({
  selectedTvs: [],

  addTv: tv =>
    set(state => {
      const tvExists = state.selectedTvs.some(t => t.id === tv.id)
      if (tvExists) {
        return state
      }
      return {
        selectedTvs: [...state.selectedTvs, tv]
      }
    }),
  removeTv: tvId =>
    set(state => ({
      selectedTvs: state.selectedTvs.filter(t => t.id !== tvId)
    }))
}))
