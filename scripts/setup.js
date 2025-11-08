const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Setting up Brainwave Platform...')

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'TEACHER',
        bio: 'Mathematics teacher with 10+ years experience',
        skills: JSON.stringify(['Mathematics', 'Physics', 'Calculus']),
        subjects: JSON.stringify(['Math', 'Science'])
      }
    }),
    prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'STUDENT',
        bio: 'Computer Science student passionate about AI',
        skills: JSON.stringify(['Programming', 'AI', 'Machine Learning']),
        subjects: JSON.stringify(['Computer Science', 'AI'])
      }
    })
  ])

  // Create sample study rooms
  const studyRooms = await Promise.all([
    prisma.studyRoom.create({
      data: {
        title: 'Mathematics Study Group',
        description: 'Daily math problem solving sessions',
        type: 'PUBLIC',
        isActive: true,
        ownerId: users[0].id,
        tags: JSON.stringify(['Math', 'Problem Solving'])
      }
    }),
    prisma.studyRoom.create({
      data: {
        title: 'AI Research Discussion',
        description: 'Weekly AI and ML research discussions',
        type: 'PUBLIC',
        isActive: true,
        ownerId: users[1].id,
        tags: JSON.stringify(['AI', 'Machine Learning', 'Research'])
      }
    })
  ])

  // Create sample courses
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: 'Introduction to Calculus',
        description: 'Learn the fundamentals of calculus from scratch',
        price: 0,
        isPublished: true,
        creatorId: users[0].id,
        tags: JSON.stringify(['Math', 'Calculus', 'Beginner'])
      }
    }),
    prisma.course.create({
      data: {
        title: 'Machine Learning Basics',
        description: 'Get started with machine learning concepts and applications',
        price: 49.99,
        isPublished: true,
        creatorId: users[1].id,
        tags: JSON.stringify(['AI', 'ML', 'Programming'])
      }
    })
  ])

  // Create sample posts
  await Promise.all([
    prisma.post.create({
      data: {
        title: 'How to solve quadratic equations effectively?',
        content: 'I\'m struggling with quadratic equations. Can someone explain the best approach?',
        authorId: users[1].id,
        tags: JSON.stringify(['Math', 'Algebra', 'Help'])
      }
    }),
    prisma.post.create({
      data: {
        title: 'Best resources for learning machine learning',
        content: 'Here are some great resources I\'ve found for learning ML...',
        authorId: users[0].id,
        tags: JSON.stringify(['AI', 'Resources', 'Learning'])
      }
    })
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`👥 Created ${users.length} users`)
  console.log(`🏠 Created ${studyRooms.length} study rooms`)
  console.log(`📚 Created ${courses.length} courses`)
  console.log('🎉 Setup complete!')
}

main()
  .catch((e) => {
    console.error('❌ Setup failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })