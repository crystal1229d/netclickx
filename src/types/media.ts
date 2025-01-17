import { Movie, Tv } from '@/types'

export interface BaseMedia {
  id: number
  backdrop_path: string | null
  poster_path: string | null
  media_type: string // "movie" | "tv"
  overview: string
  vote_average: number
  vote_count: number
  original_language: string
  genre_ids: number[]
  popularity: number
  adult: boolean

  title?: string
  name?: string
  video?: boolean
  origin_country?: string[]
  release_date?: string
  first_air_date?: string
}

export type Media = Movie | Tv

export interface MediaApiResponse {
  page: number
  results: Media[]
  total_pages: number
  total_results: number
}
