import { FILMS } from '@/data/film'

export default function HomePage() {
  return (
    <div>
      <ul>
        {FILMS.map(film => (
          <li key={film.movieCd}>{film.movieNm}</li>
        ))}
      </ul>
    </div>
  )
}
