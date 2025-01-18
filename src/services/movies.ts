import { Movie } from '@/types'
// import { TRENDING_MOVIES } from '@/data'

export const fetchTrendingMovies = async (
  page: number = 1
): Promise<Movie[] | []> => {
  // await new Promise(resolve => setTimeout(resolve, 1000))
  // const paginatedData = TRENDING_MOVIES.results.slice(
  //   (page - 1) * 20,
  //   page * 20
  // )
  // return paginatedData

  const url = `${import.meta.env.VITE_TMDB_API_URL}/trending/movie/day?language=en-US&page=${page}`
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

export const fetchingNowPlaying = async (
  page: number = 1
): Promise<Movie[] | []> => {
  const url = `${import.meta.env.VITE_TMDB_API_URL}/movie/now_playing?language=en-US&page=${page}`
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
