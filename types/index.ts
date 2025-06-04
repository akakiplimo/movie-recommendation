// Movie types from TMDB API
export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  popularity: number
}

export interface MovieDetails extends Movie {
  runtime: number
  genres: Genre[]
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  budget: number
  revenue: number
  homepage: string | null
  imdb_id: string | null
}

export interface MovieCredits {
  cast: Cast[]
  crew: Crew[]
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
  known_for_department: string
}

export interface Crew {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
  english_name: string
}

// API Response types
export interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface ApiError {
  status_code: number
  status_message: string
  success: boolean
}

// Filter and search types
export interface MovieFilters {
  genre?: number
  year?: number
  sort_by?: SortOption
  page?: number
  minRating?: number
}

export type SortOption = 
  | 'popularity.desc' 
  | 'popularity.asc'
  | 'vote_average.desc' 
  | 'vote_average.asc'
  | 'release_date.desc' 
  | 'release_date.asc'
  | 'revenue.desc'
  | 'revenue.asc'
  | 'primary_release_date.desc'
  | 'primary_release_date.asc'
  | 'original_title.desc'
  | 'original_title.asc'
  | 'vote_count.desc'
  | 'vote_count.asc'
  | 'title.asc'
  | 'title.desc'

// User types
export interface User {
  id: string
  email: string
  name: string | null
  image: string | null
}

export interface UserPreferences {
  favoriteGenres: number[]
  watchlist: number[]
  favorites: number[]
  ratings: Record<number, number>
}