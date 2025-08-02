import { prisma } from "./prisma"

export async function updateUserStreak(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) return null

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const lastStudyDate = user.lastStudyDate ? new Date(user.lastStudyDate) : null
  const lastStudyDateOnly = lastStudyDate
    ? new Date(lastStudyDate.getFullYear(), lastStudyDate.getMonth(), lastStudyDate.getDate())
    : null

  let newStreak = user.currentStreak
  let newLongestStreak = user.longestStreak

  if (!lastStudyDateOnly) {
    // First time studying
    newStreak = 1
  } else {
    const daysDiff = Math.floor((today.getTime() - lastStudyDateOnly.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff === 0) {
      // Same day, no change to streak
      return user
    } else if (daysDiff === 1) {
      // Consecutive day, increment streak
      newStreak = user.currentStreak + 1
    } else {
      // Streak broken, reset to 1
      newStreak = 1
    }
  }

  // Update longest streak if current is higher
  if (newStreak > newLongestStreak) {
    newLongestStreak = newStreak
  }

  return await prisma.user.update({
    where: { id: userId },
    data: {
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastStudyDate: now,
      streakUpdatedAt: now,
    },
  })
}

export async function getUserStreakInfo(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      currentStreak: true,
      longestStreak: true,
      lastStudyDate: true,
      totalStudyTime: true,
    },
  })

  return user
}
