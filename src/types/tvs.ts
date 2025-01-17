import { BaseMedia } from './media'

export interface Tv extends BaseMedia {
  media_type: string // 'tv'
  name: string
  original_name: string
  first_air_date: string
  origin_country: string[]
}

export interface TvApiResponse {
  page: number
  results: Tv[]
  total_pages: number
  total_results: number
}
