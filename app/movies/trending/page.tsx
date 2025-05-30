'use client'

import { useTrendingMovies } from '@/lib/hooks/use-movies'
import { MovieGrid } from '@/components/movies/movie-grid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TrendingMoviesPage() {
  const { data: dailyData, isLoading: dailyLoading } = useTrendingMovies('day')
  const { data: weeklyData, isLoading: weeklyLoading } = useTrendingMovies('week')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Trending Movies</h1>
        <p className="mt-2 text-muted-foreground">
          Movies trending on MovieFlix right now
        </p>
      </div>

      <Tabs defaultValue="week" className="w-full">
        <TabsList>
          <TabsTrigger value="day">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
        </TabsList>

        <TabsContent value="day" className="mt-6">
          <MovieGrid
            movies={dailyData?.results || []}
            loading={dailyLoading}
          />
        </TabsContent>

        <TabsContent value="week" className="mt-6">
          <MovieGrid
            movies={weeklyData?.results || []}
            loading={weeklyLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}