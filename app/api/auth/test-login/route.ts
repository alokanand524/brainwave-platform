import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Create or find test user
    const testUser = await prisma.user.upsert({
      where: { email: 'test@brainwave.com' },
      update: {},
      create: {
        email: 'test@brainwave.com',
        name: 'Test User',
        role: 'STUDENT'
      }
    })

    return NextResponse.json({ 
      message: 'Test user created',
      user: testUser,
      loginUrl: '/api/auth/signin?email=test@brainwave.com'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create test user' }, { status: 500 })
  }
}