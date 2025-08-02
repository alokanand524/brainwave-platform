"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { StudyRoomCard } from "@/components/study-rooms/study-room-card"
import { JoinRoomModal } from "@/components/study-rooms/join-room-modal"
import { Users, Clock, Zap, TrendingUp, Play, Target, Award, BookOpen, Video } from "lucide-react"

interface DashboardContentProps {
  user: any
  studyRooms: any[]
}

export function DashboardContent({ user, studyRooms }: DashboardContentProps) {
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)

  const handleJoinRoom = (room: any) => {
    setSelectedRoom(room)
    setIsJoinModalOpen(true)
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name || "Learner"}! 👋</h1>
          <p className="text-muted-foreground">
            Ready to continue your learning journey? Join a live study room below.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Zap className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.currentStreak || 0} days</div>
              <p className="text-xs text-muted-foreground">Longest: {user?.longestStreak || 0} days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
              <Clock className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.floor((user?.totalStudyTime || 0) / 60)}h {(user?.totalStudyTime || 0) % 60}m
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rooms</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studyRooms.length}</div>
              <p className="text-xs text-muted-foreground">Available now</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online Learners</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {studyRooms.reduce((acc, room) => acc + room.currentParticipants, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Studying now</p>
            </CardContent>
          </Card>
        </div>

        {/* Live Study Rooms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              Live Study Rooms
            </CardTitle>
            <CardDescription>Join others who are studying right now. Click to join any room instantly.</CardDescription>
          </CardHeader>
          <CardContent>
            {studyRooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studyRooms.map((room) => (
                  <StudyRoomCard key={room.id} room={room} onJoin={() => handleJoinRoom(room)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No active study rooms</h3>
                <p className="text-muted-foreground mb-4">Be the first to start a study session!</p>
                <Button>
                  <Play className="mr-2 h-4 w-4" />
                  Create Study Room
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Start Video Call</h3>
              <p className="text-sm text-muted-foreground">Begin a private study session</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Browse Library</h3>
              <p className="text-sm text-muted-foreground">Access free educational resources</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Set Goals</h3>
              <p className="text-sm text-muted-foreground">Plan your study objectives</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">View Progress</h3>
              <p className="text-sm text-muted-foreground">Track your learning journey</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Join Room Modal */}
      <JoinRoomModal room={selectedRoom} isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </>
  )
}
