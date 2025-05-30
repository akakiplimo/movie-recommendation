'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Calendar, Filter, RotateCcw } from 'lucide-react'
import { useGenres } from '@/lib/hooks/use-movies'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

const sortOptions = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'release_date.desc', label: 'Newest First' },
  { value: 'release_date.asc', label: 'Oldest First' },
  { value: 'title.asc', label: 'Title (A-Z)' },
  { value: 'title.desc', label: 'Title (Z-A)' },
]

interface SearchFiltersProps {
  className?: string
}

export function SearchFilters({ className }: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: genres } = useGenres()

  // Get current filter values
  const currentQuery = searchParams.get('q') || ''
  const currentGenre = searchParams.get('genre') || ''
  const currentYear = searchParams.get('year') || ''
  const currentSort = searchParams.get('sort') || 'popularity.desc'
  const currentMinRating = searchParams.get('min_rating') || '0'

  // Update URL with new filters
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    // Reset to page 1 when filters change
    params.delete('page')
    
    router.push(`/search?${params.toString()}`)
  }

  // Reset all filters
  const resetFilters = () => {
    const params = new URLSearchParams()
    if (currentQuery) {
      params.set('q', currentQuery)
    }
    router.push(`/search?${params.toString()}`)
  }

  const hasActiveFilters = currentGenre || currentYear || currentSort !== 'popularity.desc' || currentMinRating !== '0'

  return (
    <div className={className}>
      {/* Desktop Filters */}
      <div className="hidden lg:flex items-center gap-4">
        <Select value={currentGenre} onValueChange={(value) => updateFilters('genre', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Genres</SelectItem>
            {genres?.map((genre) => (
              <SelectItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentYear} onValueChange={(value) => updateFilters('year', value)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Any Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Year</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentSort} onValueChange={(value) => updateFilters('sort', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {[currentGenre, currentYear, currentMinRating !== '0'].filter(Boolean).length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filter Results</SheetTitle>
              <SheetDescription>
                Refine your search results
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Sort */}
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={currentSort} onValueChange={(value) => updateFilters('sort', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Genre */}
              <div className="space-y-2">
                <Label>Genre</Label>
                <Select value={currentGenre} onValueChange={(value) => updateFilters('genre', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Genres</SelectItem>
                    {genres?.map((genre) => (
                      <SelectItem key={genre.id} value={genre.id.toString()}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Year */}
              <div className="space-y-2">
                <Label>Release Year</Label>
                <Select value={currentYear} onValueChange={(value) => updateFilters('year', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Year</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>Minimum Rating: {currentMinRating}</Label>
                <Slider
                  value={[Number(currentMinRating)]}
                  onValueChange={(value) => updateFilters('min_rating', value[0].toString())}
                  min={0}
                  max={9}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Reset Button */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="w-full gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}