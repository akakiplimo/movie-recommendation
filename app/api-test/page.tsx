'use client'

import { usePopularMovies, useTrendingMovies, useGenres } from '@/lib/hooks/use-movies'
import { getImageUrl, formatRating, formatDate } from '@/lib/api/utils'

export default function ApiTestPage() {
  const { data: popularData, isLoading: popularLoading, error: popularError } = usePopularMovies()
  const { data: trendingData, isLoading: trendingLoading, error: trendingError } = useTrendingMovies()
  const { data: genres, isLoading: genresLoading } = useGenres()

  if (popularError || trendingError) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
          <h2 className="text-red-500 font-bold mb-2">API Error</h2>
          <p className="text-red-400">
            {(popularError as Error)?.message || (trendingError as Error)?.message}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Please check your TMDB API key in .env.local
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">TMDB API Test Page</h1>
        <p className="text-muted-foreground">
          This page tests your TMDB API integration. If you see movie data below, your API is working correctly!
        </p>
      </div>

      {/* API Status */}
      <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
        <h2 className="text-green-500 font-bold">✓ API Connected Successfully</h2>
      </div>

      {/* Genres */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Genres</h2>
        {genresLoading ? (
          <p>Loading genres...</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Popular Movies */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
        {popularLoading ? (
          <p>Loading popular movies...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {popularData?.pages[0].results.slice(0, 5).map((movie) => (
              <div key={movie.id} className="space-y-2">
                <img
                  src={getImageUrl(movie.poster_path, 'medium')}
                  alt={movie.title}
                  className="w-full rounded-lg"
                />
                <h3 className="font-semibold text-sm">{movie.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {formatDate(movie.release_date, 'year')} • ★ {formatRating(movie.vote_average)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trending Movies */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Trending This Week</h2>
        {trendingLoading ? (
          <p>Loading trending movies...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {trendingData?.results.slice(0, 5).map((movie) => (
              <div key={movie.id} className="space-y-2">
                <img
                  src={getImageUrl(movie.poster_path, 'medium')}
                  alt={movie.title}
                  className="w-full rounded-lg"
                />
                <h3 className="font-semibold text-sm">{movie.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {formatDate(movie.release_date, 'year')} • ★ {formatRating(movie.vote_average)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Raw API Response */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Raw API Response (First Movie)</h2>
        <pre className="bg-secondary p-4 rounded-lg overflow-auto text-xs">
          {JSON.stringify(popularData?.pages[0].results[0], null, 2)}
        </pre>
      </section>
    </div>
  )
}