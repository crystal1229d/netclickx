import { BaseMedia } from './media'

export interface Movie extends BaseMedia {
  media_type: string // 'movie'
  title: string
  original_title: string
  release_date: string
  video: boolean
}
export interface MovieApiResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
