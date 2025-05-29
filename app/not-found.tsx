import Link from 'next/link'
import { Film } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <Film className="mb-4 h-16 w-16 text-muted-foreground" />
      <h1 className="mb-2 text-4xl font-bold">404</h1>
      <h2 className="mb-2 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-6 text-center text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}