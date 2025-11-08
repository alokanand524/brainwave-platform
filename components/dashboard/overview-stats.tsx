'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, MessageSquare, Video } from 'lucide-react'

interface StatsProps {
  studyRooms: number
  courses: number
  posts: number
  activeUsers: number
}

export function OverviewStats({ studyRooms, courses, posts, activeUsers }: StatsProps) {
  const stats = [
    {
      title: 'Active Study Rooms',
      value: studyRooms,
      icon: Video,
      color: 'text-blue-600'
    },
    {
      title: 'Available Courses',
      value: courses,
      icon: BookOpen,
      color: 'text-green-600'
    },
    {
      title: 'Knowledge Posts',
      value: posts,
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      title: 'Active Users',
      value: activeUsers,
      icon: Users,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}