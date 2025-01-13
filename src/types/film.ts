export type MovieData = {
  movieCd: string
  movieNm: string
  movieNmEn: string
  prdtYear: string // Production year
  openDt: string // Opening date (YYYYMMDD)
  typeNm: string // Movie type (e.g., "장편", "단편")
  prdtStatNm: string // Production status (e.g., "개봉예정", "기타", "개봉완료")
  nationAlt: string // Country of production
  genreAlt: string // Genres in text format
  repNationNm: string // Main production country
  repGenreNm: string // Main genre
  directors: string[]
  companys: string[]
  actors: string[]
}
