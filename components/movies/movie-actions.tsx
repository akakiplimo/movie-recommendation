'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Heart, Clock, Share2, Play, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface MovieActionsProps {
  movieId: number
  className?: string
}

export function MovieActions({ movieId, className }: MovieActionsProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [inWatchlist, setInWatchlist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Check if movie is in favorites/watchlist
  useEffect(() => {
    if (session?.user?.id) {
      checkUserLists()
    }
  }, [session, movieId])

  const checkUserLists = async () => {
    try {
      const [favResponse, watchResponse] = await Promise.all([
        fetch('/api/favorites'),
        fetch('/api/watchlist'),
      ])

      if (favResponse.ok) {
        const favorites = await favResponse.json()
        setIsFavorite(favorites.some((f: any) => f.movieId === movieId))
      }

      if (watchResponse.ok) {
        const watchlist = await watchResponse.json()
        setInWatchlist(watchlist.some((w: any) => w.movieId === movieId))
      }
    } catch (error) {
      console.error('Failed to check user lists:', error)
    }
  }

  const handleFavorite = async () => {
    if (!session) {
      router.push('/login')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId }),
      })

      if (response.ok) {
        setIsFavorite(!isFavorite)
        toast(isFavorite ? 'Removed from favorites' : 'Added to favorites',{
          description: isFavorite 
            ? 'Movie removed from your favorites list'
            : 'Movie added to your favorites list',
        })
      }
    } catch (error) {
      toast.error(isFavorite ? 'Removed from favorites' : 'Added to favorites', {
        description: 'Failed to update favorites',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleWatchlist = async () => {
    if (!session) {
      router.push('/login')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId }),
      })

      if (response.ok) {
        setInWatchlist(!inWatchlist)
        toast(inWatchlist ? 'Removed from watchlist' : 'Added to watchlist', {
          description: inWatchlist
            ? 'Movie removed from your watchlist'
            : 'Movie added to your watchlist',
        })
      }
    } catch (error) {
      toast.error('Error', {
        description: 'Failed to update watchlist',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = 'Check out this movie on MovieFlix!'

    switch (platform) {
      case 'Twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`)
        break
      case 'Facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
        break
      case 'WhatsApp':
        window.open(`https://wa.me/?text=${title} ${url}`)
        break
    }
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
        disabled={isLoading}
        className="gap-2"
      >
        <Heart className={cn('h-5 w-5', isFavorite && 'fill-current')} />
        {isFavorite ? 'Favorited' : 'Favorite'}
      </Button>

      <Button
        size="lg"
        variant={inWatchlist ? 'default' : 'outline'}
        onClick={handleWatchlist}
        disabled={isLoading}
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