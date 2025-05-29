'use client'

import { HeroSection } from '@/components/home/hero-section'
import { MovieSection } from '@/components/home/movie-section'
import { GenreSection } from '@/components/home/genre-section'
import { StatsSection } from '@/components/home/stats-section'
import {
  usePopularMovies,
  useTrendingMovies,
  useTopRatedMovies,
  useUpcomingMovies,
} from '@/lib/hooks/use-movies'

export default function HomePage() {
  const { data: trendingData, isLoading: trendingLoading } = useTrendingMovies('week')
  const { data: popularData, isLoading: popularLoading } = usePopularMovies()
  const { data: topRatedData, isLoading: topRatedLoading } = useTopRatedMovies()
  const { data: upcomingData, isLoading: upcomingLoading } = useUpcomingMovies()

  const trendingMovies = trendingData?.results || []
  const popularMovies = popularData?.pages[0]?.results || []
  const topRatedMovies = topRatedData?.pages[0]?.results || []
  const upcomingMovies = upcomingData?.results || []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {trendingMovies.length > 0 && (
        <HeroSection movies={trendingMovies.slice(0, 5)} />
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Trending Now */}
        <MovieSection
          title="Trending Now"
          movies={trendingMovies}
          loading={trendingLoading}
          viewAllHref="/movies/trending"
        />

        {/* Genre Section */}
        <GenreSection />

        {/* Popular Movies */}
        <MovieSection
          title="Popular Movies"
          movies={popularMovies}
          loading={popularLoading}
          viewAllHref="/movies/popular"
        />

        {/* Stats Section */}
        <StatsSection />

        {/* Top Rated */}
        <MovieSection
          title="Top Rated"
          movies={topRatedMovies}
          loading={topRatedLoading}
          viewAllHref="/movies/top-rated"
        />

        {/* Coming Soon */}
        <MovieSection
          title="Coming Soon"
          movies={upcomingMovies}
          loading={upcomingLoading}
          viewAllHref="/movies/upcoming"
        />
      </div>
    </div>
  )
}