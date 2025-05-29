'use client'

import Link from 'next/link'
import { Film, Heart, Laugh, Ghost, Rocket, Swords, Sparkles, Map } from 'lucide-react'
import { cn } from '@/lib/utils'

const genres = [
  { id: 28, name: 'Action', icon: Swords, color: 'bg-red-500/10 hover:bg-red-500/20 text-red-500' },
  { id: 35, name: 'Comedy', icon: Laugh, color: 'bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500' },
  { id: 18, name: 'Drama', icon: Film, color: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-500' },
  { id: 27, name: 'Horror', icon: Ghost, color: 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-500' },
  { id: 10749, name: 'Romance', icon: Heart, color: 'bg-pink-500/10 hover:bg-pink-500/20 text-pink-500' },
  { id: 878, name: 'Sci-Fi', icon: Rocket, color: 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500' },
  { id: 14, name: 'Fantasy', icon: Sparkles, color: 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500' },
  { id: 12, name: 'Adventure', icon: Map, color: 'bg-green-500/10 hover:bg-green-500/20 text-green-500' },
]

export function GenreSection() {
  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Browse by Genre</h2>
        <p className="mt-2 text-muted-foreground">Find movies that match your mood</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {genres.map((genre) => {
          const Icon = genre.icon
          return (
            <Link
              key={genre.id}
              href={`/movies?genre=${genre.id}`}
              className={cn(
                'group flex flex-col items-center gap-3 rounded-lg p-6 text-center transition-all',
                genre.color
              )}
            >
              <Icon className="h-8 w-8 transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">{genre.name}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}