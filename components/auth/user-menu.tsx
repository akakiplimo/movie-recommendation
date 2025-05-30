'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { User, LogOut, Settings, Heart, Clock } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

export function UserMenu() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Skeleton className="h-8 w-8 rounded-full" />
  }

  if (!session) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signIn(undefined, { callbackUrl: '/' })}
        className="gap-2"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Sign In</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.image || undefined} alt={session.user.name || 'User'} />
            <AvatarFallback>
              {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{session.user.name || 'User'}</p>
            <p className="text-xs text-muted-foreground">{session.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/favorites" className="cursor-pointer">
            <Heart className="mr-2 h-4 w-4" />
            Favorites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/watchlist" className="cursor-pointer">
            <Clock className="mr-2 h-4 w-4" />
            Watchlist
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: '/' })}
          className="cursor-pointer text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}