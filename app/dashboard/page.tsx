import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock, Users, BookOpen, MessageSquare, Video, Plus } from "lucide-react"
import { OverviewStats } from "@/components/dashboard/overview-stats"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function DashboardPage() {
  // Fetch real data from database
  const [studyRooms, courses, posts, users] = await Promise.all([
    prisma.studyRoom.count({ where: { isActive: true } }),
    prisma.course.count({ where: { isPublished: true } }),
    prisma.post.count(),
    prisma.user.count()
  ])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/study-rooms/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Room
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <OverviewStats 
        studyRooms={studyRooms}
        courses={courses}
        posts={posts}
        activeUsers={users}
      />

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Join Study Room</CardTitle>
            <CardDescription>Connect with peers in live study sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/study-rooms">
                <Video className="mr-2 h-4 w-4" />
                Browse Rooms
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Explore Courses</CardTitle>
            <CardDescription>Discover new learning opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/marketplace">
                <BookOpen className="mr-2 h-4 w-4" />
                View Courses
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Hub</CardTitle>
            <CardDescription>Share ideas and get answers</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/blog">
                <MessageSquare className="mr-2 h-4 w-4" />
                Join Discussion
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Study Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/placeholder-user.jpg`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Mathematics Study Group</p>
                  <p className="text-xs text-muted-foreground">2 hours ago • 12 participants</p>
                </div>
                <Badge variant="secondary">Completed</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <CalendarDays className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Physics Discussion</p>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    Tomorrow at 3:00 PM
                  </p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}