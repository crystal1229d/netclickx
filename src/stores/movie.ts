import { Movie } from '@/types'
import { create } from 'zustand'

interface MoviesStore {
  selectedMovies: Movie[]
  isMyListBtnBouncing: boolean

  addMovie: (movie: Movie) => void
  removeMovie: (movieId: number) => void
  setIsMyListBtnBouncing: (state: boolean) => void
}

export const useMoviesStore = create<MoviesStore>(set => ({
  selectedMovies: [],
  isMyListBtnBouncing: false,

  addMovie: movie =>
    set(state => {
      const movieExists = state.selectedMovies.some(m => m.id === movie.id)
      if (movieExists) {
        return state
      }
      return {
        selectedMovies: [...state.selectedMovies, movie],
        isMyListBtnBouncing: true
      }
    }),
  removeMovie: movieId =>
    set(state => ({
      selectedMovies: state.selectedMovies.filter(m => m.id !== movieId)
    })),
  setIsMyListBtnBouncing: (state: boolean) =>
    set({ isMyListBtnBouncing: state })
}))
