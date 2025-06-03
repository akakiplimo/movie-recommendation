import { tmdbClient } from './client'
import {
  Movie,
  MovieDetails,
  MovieResponse,
  Genre,
  MovieCredits,
  Cast,
  Crew,
  MovieFilters,
} from '@/types'

class TMDBService {
  // Get popular movies
  async getPopularMovies(page = 1): Promise<MovieResponse> {
    const { data } = await tmdbClient.get<MovieResponse>('/movie/popular', {
      params: { page },
    })
    return data
  }

  // Get trending movies
  async getTrendingMovies(
    timeWindow: 'day' | 'week' = 'week',
    page = 1
  ): Promise<MovieResponse> {
    const { data } = await tmdbClient.get<MovieResponse>(
      `/trending/movie/${timeWindow}`,
      {
        params: { page },
      }
    )
    return data
  }

  // Get top rated movies
  async getTopRatedMovies(page = 1): Promise<MovieResponse> {
    const { data } = await tmdbClient.get<MovieResponse>('/movie/top_rated', {
      params: { page },
    })
    return data
  }

  // Get upcoming movies
  async getUpcomingMovies(page = 1): Promise<MovieResponse> {
    const { data } = await tmdbClient.get<MovieResponse>('/movie/upcoming', {
      params: { page },
    })
    return data
  }

  // Get now playing movies
  async getNowPlayingMovies(page = 1): Promise<MovieResponse> {
    const { data } = await tmdbClient.get<MovieResponse>('/movie/now_playing', {
      params: { page },
    })
    return data
  }

  // Get movie details
  async getMovieDetails(movieId: number | string): Promise<MovieDetails> {
    const { data } = await tmdbClient.get<MovieDetails>(`/movie/${movieId}`)
    return data
  }

  // Get movie credits (cast and crew)
  async getMovieCredits(movieId: number | string): Promise<MovieCredits> {
    const { data } = await tmdbClient.get<MovieCredits>(
      `/movie/${movieId}/credits`
    )
    return data
  }

  // Get similar movies
  async getSimilarMovies(
    movieId: number | string,
    page = 1
  ): Promise<MovieResponse> {
    const { data } = await tmdbClient.get<MovieResponse>(
      `/movie/${movieId}/similar`,
      {
        params: { page },
      }
    )
    return data
  }

  // Get recommended movies
  async getRecommendedMovies(
    movieId: number | string,
    page = 1
  ): Promise<MovieResponse> {
    const { data } = await tmdbClient.get<MovieResponse>(
      `/movie/${movieId}/recommendations`,
      {
        params: { page },
      }
    )
    return data
  }

  // Search movies
  async searchMovies(query: string, page = 1): Promise<MovieResponse> {
    const { data } = await tmdbClient.get<MovieResponse>('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    })
    return data
  }

  // Discover movies with filters - FIXED VERSION
  async discoverMovies(filters: MovieFilters): Promise<MovieResponse> {
    const params: any = {
      page: filters.page || 1,
      include_adult: false,
      include_video: false,
      language: 'en-US',
    }

    // Add genre filter if provided
    if (filters.genre) {
      params.with_genres = filters.genre
    }

    // Add year filter if provided
    if (filters.year) {
      params.primary_release_year = filters.year
    }

    // Add sort parameter
    if (filters.sort_by) {
      params.sort_by = filters.sort_by
    } else {
      params.sort_by = 'popularity.desc'
    }

    // Add minimum rating if provided
    if (filters.minRating) {
      params['vote_average.gte'] = filters.minRating
      params['vote_count.gte'] = 50 // Ensure movies have enough votes
    }

    console.log('Discover params:', params) // Debug log

    const { data } = await tmdbClient.get<MovieResponse>('/discover/movie', {
      params,
    })
    
    return data
  }

  // Get all genres
  async getGenres(): Promise<Genre[]> {
    const { data } = await tmdbClient.get<{ genres: Genre[] }>(
      '/genre/movie/list'
    )
    return data.genres
  }

  // Get movie details with credits and similar movies in one call
  async getMovieDetailsComplete(movieId: number | string): Promise<{
    details: MovieDetails
    credits: MovieCredits
    similar: MovieResponse
    recommendations: MovieResponse
  }> {
    const [details, credits, similar, recommendations] = await Promise.all([
      this.getMovieDetails(movieId),
      this.getMovieCredits(movieId),
      this.getSimilarMovies(movieId),
      this.getRecommendedMovies(movieId),
    ])

    return {
      details,
      credits,
      similar,
      recommendations,
    }
  }
}

// Export singleton instance
export const tmdbService = new TMDBService()