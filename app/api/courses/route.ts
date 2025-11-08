import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      include: {
        creator: { select: { name: true, image: true } },
        _count: { select: { enrollments: true, lessons: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, price, tags } = await request.json()
    
    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: parseFloat(price) || 0,
        tags: JSON.stringify(tags || []),
        creatorId: session.user.id
      }
    })
    
    return NextResponse.json(course)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
  }
}