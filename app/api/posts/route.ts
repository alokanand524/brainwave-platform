import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: { select: { name: true, image: true } },
        _count: { select: { comments: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, content, tags } = await request.json()
    
    const post = await prisma.post.create({
      data: {
        title,
        content,
        tags: JSON.stringify(tags || []),
        authorId: session.user.id
      },
      include: {
        author: { select: { name: true, image: true } }
      }
    })
    
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}