import { MovieCarousel } from '@/components/movies/movie-carousel'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to MovieFlix
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover your next favorite movie
        </p>
      </div>
      
      {/* We'll add movie sections here in the next step */}
      <div className="space-y-12">
        <p className="text-center text-muted-foreground">
          Movie sections will appear here...
        </p>
      </div>
    </div>
  )
}