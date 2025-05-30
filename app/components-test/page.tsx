'use client'

import { MovieGrid } from '@/components/movies'
import { MovieCarousel } from '@/components/movies'
import { MovieList } from '@/components/movies'
import { usePopularMovies, useTrendingMovies, useTopRatedMovies } from '@/lib/hooks/use-movies'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ComponentsTestPage() {
  const { data: popularData, isLoading: popularLoading } = usePopularMovies()
  const { data: trendingData, isLoading: trendingLoading } = useTrendingMovies()
  const { data: topRatedData, isLoading: topRatedLoading } = useTopRatedMovies()

  const popularMovies = popularData?.pages[0]?.results || []
  const trendingMovies = trendingData?.results || []
  const topRatedMovies = topRatedData?.pages[0]?.results || []

  return (
    <div className="container mx-auto space-y-8 py-8">
      <h1 className="text-3xl font-bold">MovieFlix Components Test</h1>

      {/* Movie Carousels */}
      <div className="space-y-8">
        <MovieCarousel
          title="Trending Now"
          movies={trendingMovies}
          loading={trendingLoading}
          viewAllHref="/movies/trending"
        />

        <MovieCarousel
          title="Popular Movies"
          movies={popularMovies}
          loading={popularLoading}
          viewAllHref="/movies/popular"
        />

        <MovieCarousel
          title="Top Rated"
          movies={topRatedMovies}
          loading={topRatedLoading}
          viewAllHref="/movies/top-rated"
        />
      </div>

      {/* Different Layout Options */}
      <Tabs defaultValue="grid" className="mt-12">
        <TabsList>
          <TabsTrigger value="grid">Grid Layout</TabsTrigger>
          <TabsTrigger value="list">List Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-6">
          <h2 className="mb-4 text-2xl font-bold">Grid Layout</h2>
          <MovieGrid
            movies={popularMovies}
            loading={popularLoading}
          />
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <h2 className="mb-4 text-2xl font-bold">List Layout</h2>
          <MovieList movies={popularMovies.slice(0, 5)} />
        </TabsContent>
      </Tabs>
    </div>
  )
}