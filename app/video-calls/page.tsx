"use client"

import { MainNav } from "@/components/navigation/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, Users, Calendar, Clock, Plus, FileText } from "lucide-react"
import { useState } from "react"

const upcomingMeetings = [
  {
    id: 1,
    title: "React Study Group",
    participants: ["Alice", "Bob", "Charlie"],
    scheduledTime: "2024-02-15T14:00:00",
    duration: 60,
    type: "study",
    roomId: "react-study-123",
  },
  {
    id: 2,
    title: "Math Tutoring Session",
    participants: ["Dr. Smith", "Emma"],
    scheduledTime: "2024-02-15T16:30:00",
    duration: 90,
    type: "tutoring",
    roomId: "math-tutor-456",
  },
]

export default function VideoCalls() {
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Video Calls</h1>
            <p className="text-muted-foreground">Connect with learners through high-quality video conferencing</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Start Instant Meeting
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Start Instant Meeting</h3>
              <p className="text-sm text-muted-foreground">Begin a video call right now</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Schedule Meeting</h3>
              <p className="text-sm text-muted-foreground">Plan a meeting for later</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Join Meeting</h3>
              <p className="text-sm text-muted-foreground">Enter a meeting ID to join</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Meetings</TabsTrigger>
            <TabsTrigger value="active">Active Rooms</TabsTrigger>
            <TabsTrigger value="recordings">Recordings</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4">
              {upcomingMeetings.map((meeting) => (
                <Card key={meeting.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{meeting.title}</CardTitle>
                        <CardDescription>
                          {new Date(meeting.scheduledTime).toLocaleString()} • {meeting.duration} minutes
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {meeting.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{meeting.participants.join(", ")}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{meeting.duration}m</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">Join</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="text-center py-12">
              <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No active rooms</h3>
              <p className="text-muted-foreground">Start a meeting to see active rooms here</p>
            </div>
          </TabsContent>

          <TabsContent value="recordings" className="space-y-4">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No recordings yet</h3>
              <p className="text-muted-foreground">Your meeting recordings will appear here</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Join Meeting Modal */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Join a Meeting</CardTitle>
            <CardDescription>Enter a meeting ID or personal link name</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Enter meeting ID" className="flex-1" />
              <Button>Join</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
