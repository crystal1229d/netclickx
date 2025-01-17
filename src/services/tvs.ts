import { Tv } from '@/types'
// import { TRENDING_TV } from '@/data'

export const fetchTrendingTVs = async (
  page: number = 1
): Promise<Tv[] | []> => {
  // await new Promise(resolve => setTimeout(resolve, 1000))
  // const paginatedData = TRENDING_TV.results.slice((page - 1) * 20, page * 20)
  // return paginatedData

  const url = `${import.meta.env.VITE_TMDB_API_URL}/trending/tv/day?language=en-US&page=${page}`
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
