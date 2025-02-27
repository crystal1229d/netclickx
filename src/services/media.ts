import { Media } from '@/types'
// import { TRENDING_ALL } from '@/data'

export const fetchTrendingAll = async (
  page: number = 1
): Promise<Media[] | []> => {
  // await new Promise(resolve => setTimeout(resolve, 1000))
  // const paginatedData = TRENDING_ALL.results.slice((page - 1) * 20, page * 20)
  // return paginatedData

  const url = `${import.meta.env.VITE_TMDB_API_URL}/trending/all/day?language=en-US&page=${page}`
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
    const filteredResults = data.results.filter(
      (item: Media) => item.media_type !== 'person'
    )
    return filteredResults
  } catch (error) {
    console.error(error)
    return []
  }
}

export const searchAllByKeyword = async (
  keyword: string = '',
  page: number = 1
): Promise<Media[] | []> => {
  const url = `${import.meta.env.VITE_TMDB_API_URL}/search/keyword?query=${keyword}&page=${page}`
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
      throw new Error('Failed to fetch media')
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error(error)
    return []
  }
}
