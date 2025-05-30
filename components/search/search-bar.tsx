'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'
import { useDebounce } from '@/lib/hooks/use-debounce'
import { useSearchMovies } from '@/lib/hooks/use-movies'
import { getImageUrl, formatDate, formatRating } from '@/lib/api/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data, isLoading } = useSearchMovies(debouncedQuery)
  const results = data?.pages[0]?.results.slice(0, 5) || []

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle search submission
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) {
        setIsOpen(false)
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
    },
    [query, router]
  )

  // Clear search
  const handleClear = () => {
    setQuery('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-10 pr-10 bg-secondary border-secondary focus:bg-background"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && debouncedQuery && (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-lg border bg-popover shadow-lg">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="max-h-[400px] overflow-y-auto">
                {results.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    onClick={() => {
                      setIsOpen(false)
                      setQuery('')
                    }}
                    className="flex items-center gap-3 p-3 transition-colors hover:bg-accent"
                  >
                    <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={getImageUrl(movie.poster_path, 'small')}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="truncate font-medium">{movie.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(movie.release_date)} • ★ {formatRating(movie.vote_average)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={() => {
                  setIsOpen(false)
                  setQuery('')
                }}
                className="block border-t p-3 text-center text-sm font-medium text-primary hover:bg-accent"
              >
                View all results for "{query}"
              </Link>
            </>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No results found for "{debouncedQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}