import { Calendar, Clock, DollarSign, Globe, Star } from 'lucide-react'
import { MovieDetails } from '@/types'
import { formatDate, formatRuntime, formatCurrency, formatRating } from '@/lib/api/utils'
import { Badge } from '@/components/ui/badge'

interface MovieInfoProps {
  movie: MovieDetails
}

export function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <div className="space-y-6">
      {/* Genres */}
      <div className="flex flex-wrap gap-2">
        {movie.genres.map((genre) => (
          <Badge key={genre.id} variant="secondary">
            {genre.name}
          </Badge>
        ))}
      </div>

      {/* Overview */}
      <div>
        <h3 className="mb-2 text-lg font-semibold">Overview</h3>
        <p className="text-muted-foreground">
          {movie.overview || 'No overview available.'}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Release Date</span>
          </div>
          <p className="mt-1 font-medium">{formatDate(movie.release_date, 'full')}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Runtime</span>
          </div>
          <p className="mt-1 font-medium">{formatRuntime(movie.runtime)}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4" />
            <span>Rating</span>
          </div>
          <p className="mt-1 font-medium">
            {formatRating(movie.vote_average)} ({movie.vote_count.toLocaleString()} votes)
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>Language</span>
          </div>
          <p className="mt-1 font-medium uppercase">{movie.original_language}</p>
        </div>

        {movie.budget > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>Budget</span>
            </div>
            <p className="mt-1 font-medium">{formatCurrency(movie.budget)}</p>
          </div>
        )}

        {movie.revenue > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>Revenue</span>
            </div>
            <p className="mt-1 font-medium">{formatCurrency(movie.revenue)}</p>
          </div>
        )}
      </div>

      {/* Tagline */}
      {movie.tagline && (
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
          "{movie.tagline}"
        </blockquote>
      )}
    </div>
  )
}