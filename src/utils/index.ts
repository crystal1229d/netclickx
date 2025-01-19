import { MOVIE_GENRES, TV_GENRES } from '@/constants'
import { Media } from '@/types'

export function getReleaseDate(date: string | undefined): string {
  if (!date) return ''
  return date.split('-')[0]
}

export function getMediaType(mediaType: string | undefined): string {
  switch (mediaType) {
    case 'movie':
      return '영화'
    case 'tv':
      return 'TV 시리즈'
    default:
      return ''
  }
}

export function getAgeLimit(isAdult: boolean | undefined): string {
  if (!isAdult) return '15+'
  else return '19+'
}

export function getGenre(genreIds: Media['genre_ids']): string[] {
  if (!genreIds || genreIds.length === 0) return []

  const movie_genres = genreIds
    .map(id => MOVIE_GENRES.genres.find(genre => genre.id === id)?.name)
    .filter((name): name is string => !!name)

  const tv_genres = genreIds
    .map(id => TV_GENRES.genres.find(genre => genre.id === id)?.name)
    .filter((name): name is string => !!name)

  return [...movie_genres, ...tv_genres]
}
