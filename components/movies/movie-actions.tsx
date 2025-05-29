'use client'

import { useState } from 'react'
import { Heart, Clock, Share2, Play, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {toast} from "sonner"
import { cn } from '@/lib/utils'

interface MovieActionsProps {
  movieId: number
  className?: string
}

export function MovieActions({ movieId, className }: MovieActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [inWatchlist, setInWatchlist] = useState(false)

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast(isFavorite ? 'Removed from favorites' : 'Added to favorites', {
      description: isFavorite 
        ? 'Movie removed from your favorites list'
        : 'Movie added to your favorites list',
    })
  }

  const handleWatchlist = () => {
    setInWatchlist(!inWatchlist)
    toast(inWatchlist ? 'Removed from watchlist' : 'Added to watchlist', {
      description: inWatchlist
        ? 'Movie removed from your watchlist'
        : 'Movie added to your watchlist',
    })
  }

  const handleShare = (platform: string) => {
    toast('Sharing...', {
      description: `Sharing to ${platform}`,
    })
    // Implement actual sharing logic here
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <Button size="lg" className="gap-2">
        <Play className="h-5 w-5" />
        Watch Trailer
      </Button>

      <Button
        size="lg"
        variant={isFavorite ? 'default' : 'outline'}
        onClick={handleFavorite}
        className="gap-2"
      >
        <Heart className={cn('h-5 w-5', isFavorite && 'fill-current')} />
        {isFavorite ? 'Favorited' : 'Favorite'}
      </Button>

      <Button
        size="lg"
        variant={inWatchlist ? 'default' : 'outline'}
        onClick={handleWatchlist}
        className="gap-2"
      >
        <Clock className="h-5 w-5" />
        {inWatchlist ? 'In Watchlist' : 'Watchlist'}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" variant="outline" className="gap-2">
            <Share2 className="h-5 w-5" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleShare('Twitter')}>
            Share on Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('Facebook')}>
            Share on Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('WhatsApp')}>
            Share on WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            toast('Link copied!', {
              description: 'Movie link copied to clipboard',
            })
          }}>
            Copy Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}