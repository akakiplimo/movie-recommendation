import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { tmdbService } from '@/lib/api/tmdb.service'
import { MovieFilters } from '@/types'

// Popular movies hook
export function usePopularMovies() {
  return useInfiniteQuery({
    queryKey: ['movies', 'popular'],
    queryFn: ({ pageParam = 1 }) => tmdbService.getPopularMovies(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  })
}

// Trending movies hook
export function useTrendingMovies(timeWindow: 'day' | 'week' = 'week') {
  return useQuery({
    queryKey: ['movies', 'trending', timeWindow],
    queryFn: () => tmdbService.getTrendingMovies(timeWindow),
  })
}

// Top rated movies hook
export function useTopRatedMovies() {
  return useInfiniteQuery({
    queryKey: ['movies', 'top-rated'],
    queryFn: ({ pageParam = 1 }) => tmdbService.getTopRatedMovies(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  })
}

// Upcoming movies hook
export function useUpcomingMovies() {
  return useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: () => tmdbService.getUpcomingMovies(),
  })
}

// Movie details hook
export function useMovieDetails(movieId: string | number) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => tmdbService.getMovieDetailsComplete(movieId),
    enabled: !!movieId,
  })
}

// Search movies hook
export function useSearchMovies(query: string) {
  return useInfiniteQuery({
    queryKey: ['movies', 'search', query],
    queryFn: ({ pageParam = 1 }) => tmdbService.searchMovies(query, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: query.length > 0,
  })
}

// Discover movies hook
export function useDiscoverMovies(filters: MovieFilters) {
  return useInfiniteQuery({
    queryKey: ['movies', 'discover', filters],
    queryFn: ({ pageParam = 1 }) =>
      tmdbService.discoverMovies({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  })
}

// Genres hook
export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => tmdbService.getGenres(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  })
}