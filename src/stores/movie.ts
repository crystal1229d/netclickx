import { Movie } from '@/types'
import { create } from 'zustand'

interface MoviesStore {
  selectedMovies: Movie[]
  addMovie: (movie: Movie) => void
  removeMovie: (movieId: number) => void
}

export const useMoviesStore = create<MoviesStore>(set => ({
  selectedMovies: [],
  addMovie: movie =>
    set(state => ({
      selectedMovies: [...state.selectedMovies, movie]
    })),
  removeMovie: movieId =>
    set(state => ({
      selectedMovies: state.selectedMovies.filter(m => m.id !== movieId)
    }))
}))
