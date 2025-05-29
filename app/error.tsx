'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
      <h2 className="mb-2 text-2xl font-bold">Something went wrong!</h2>
      <p className="mb-6 text-center text-muted-foreground">
        We encountered an error while loading the movies. Please try again.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" onClick={() => window.location.href = '/'}>
          Go home
        </Button>
      </div>
    </div>
  )
}