import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth.config'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const watchlist = await prisma.watchlistItem.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(watchlist)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Failed to fetch watchlist' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { movieId } = await request.json()

    const existingItem = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId: session.user.id,
          movieId: movieId,
        },
      },
    })

    if (existingItem) {
      // Remove from watchlist
      await prisma.watchlistItem.delete({
        where: { id: existingItem.id },
      })

      return NextResponse.json({ message: 'Removed from watchlist' })
    } else {
      // Add to watchlist
      const item = await prisma.watchlistItem.create({
        data: {
          userId: session.user.id,
          movieId: movieId,
        },
      })

      return NextResponse.json(item)
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Failed to update watchlist' },
      { status: 500 }
    )
  }
}