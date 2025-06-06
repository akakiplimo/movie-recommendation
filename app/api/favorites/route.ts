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
    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(favorites)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Failed to fetch favorites' },
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

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_movieId: {
          userId: session.user.id,
          movieId: movieId,
        },
      },
    })

    if (existingFavorite) {
      // Remove from favorites
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      })

      return NextResponse.json({ message: 'Removed from favorites' })
    } else {
      // Add to favorites
      const favorite = await prisma.favorite.create({
        data: {
          userId: session.user.id,
          movieId: movieId,
        },
      })

      return NextResponse.json(favorite)
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Failed to update favorites' },
      { status: 500 }
    )
  }
}