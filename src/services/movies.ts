import { Movie } from '@/types'

export const fetchTrendingMovies = async (): Promise<Movie[] | []> => {
  const url = `${import.meta.env.VITE_TMDB_API_URL}/trending/movie/day?language=en-US`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
    }
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error('Failed to fetch movies')
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error(error)
    return []
  }
}
