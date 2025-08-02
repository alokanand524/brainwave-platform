"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/navigation/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Video,
  MessageCircle,
  Timer,
  Lock,
  Globe,
  Settings,
  Play,
  BookOpen,
  Code,
  Calculator,
  Microscope,
  Palette,
  Languages,
} from "lucide-react"

const categories = [
  { id: "mathematics", name: "Mathematics", icon: Calculator, color: "bg-blue-100 text-blue-600" },
  { id: "programming", name: "Programming", icon: Code, color: "bg-green-100 text-green-600" },
  { id: "science", name: "Science", icon: Microscope, color: "bg-purple-100 text-purple-600" },
  { id: "literature", name: "Literature", icon: BookOpen, color: "bg-orange-100 text-orange-600" },
  { id: "art", name: "Art & Design", icon: Palette, color: "bg-pink-100 text-pink-600" },
  { id: "languages", name: "Languages", icon: Languages, color: "bg-indigo-100 text-indigo-600" },
]

export default function CreateStudyRoom() {
  const router = useRouter()
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    category: "",
    maxParticipants: 8,
    isPublic: true,
    allowChat: true,
    allowScreenShare: true,
    requireCamera: false,
    timerMode: "pomodoro",
    sessionDuration: 25,
    breakDuration: 5,
    password: "",
  })

  const handleCreateRoom = () => {
    // Generate a random room ID
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase()

    // In a real app, you would save the room data to your backend
    console.log("Creating room with data:", roomData)

    // Navigate to the created room
    router.push(`/study-rooms/live/${roomId}`)
  }

  const updateRoomData = (key: string, value: any) => {
    setRoomData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Study Room</h1>
          <p className="text-muted-foreground">Set up a live study session and invite others to join your focus time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Room Details</CardTitle>
                <CardDescription>Basic information about your study room</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="room-name">Room Name</Label>
                  <Input
                    id="room-name"
                    placeholder="e.g., Math Study Group, React Learning Session"
                    value={roomData.name}
                    onChange={(e) => updateRoomData("name", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="What will you be studying? Any specific goals or topics?"
                    value={roomData.description}
                    onChange={(e) => updateRoomData("description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {categories.map((category) => {
                      const IconComponent = category.icon
                      return (
                        <div
                          key={category.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            roomData.category === category.id
                              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => updateRoomData("category", category.id)}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${category.color}`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <p className="text-sm font-medium">{category.name}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Room Settings</CardTitle>
                <CardDescription>Configure how your study room will work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Room</Label>
                    <p className="text-sm text-muted-foreground">Allow anyone to discover and join your room</p>
                  </div>
                  <Switch
                    checked={roomData.isPublic}
                    onCheckedChange={(checked) => updateRoomData("isPublic", checked)}
                  />
                </div>

                {!roomData.isPublic && (
                  <div>
                    <Label htmlFor="password">Room Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter a password for private access"
                      value={roomData.password}
                      onChange={(e) => updateRoomData("password", e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <Label>Maximum Participants</Label>
                  <Select
                    value={roomData.maxParticipants.toString()}
                    onValueChange={(value) => updateRoomData("maxParticipants", Number.parseInt(value))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 participants</SelectItem>
                      <SelectItem value="6">6 participants</SelectItem>
                      <SelectItem value="8">8 participants</SelectItem>
                      <SelectItem value="12">12 participants</SelectItem>
                      <SelectItem value="16">16 participants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Chat</Label>
                      <p className="text-sm text-muted-foreground">Allow participants to send messages</p>
                    </div>
                    <Switch
                      checked={roomData.allowChat}
                      onCheckedChange={(checked) => updateRoomData("allowChat", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Screen Sharing</Label>
                      <p className="text-sm text-muted-foreground">Allow participants to share their screens</p>
                    </div>
                    <Switch
                      checked={roomData.allowScreenShare}
                      onCheckedChange={(checked) => updateRoomData("allowScreenShare", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Camera</Label>
                      <p className="text-sm text-muted-foreground">Participants must have their camera on</p>
                    </div>
                    <Switch
                      checked={roomData.requireCamera}
                      onCheckedChange={(checked) => updateRoomData("requireCamera", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timer Settings</CardTitle>
                <CardDescription>Configure the focus timer for your room</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Timer Mode</Label>
                  <Select value={roomData.timerMode} onValueChange={(value) => updateRoomData("timerMode", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pomodoro">Pomodoro (25/5 min)</SelectItem>
                      <SelectItem value="custom">Custom Timer</SelectItem>
                      <SelectItem value="stopwatch">Stopwatch</SelectItem>
                      <SelectItem value="none">No Timer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {roomData.timerMode === "custom" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Study Duration (minutes)</Label>
                      <Input
                        type="number"
                        value={roomData.sessionDuration}
                        onChange={(e) => updateRoomData("sessionDuration", Number.parseInt(e.target.value))}
                        min="1"
                        max="120"
                      />
                    </div>
                    <div>
                      <Label>Break Duration (minutes)</Label>
                      <Input
                        type="number"
                        value={roomData.breakDuration}
                        onChange={(e) => updateRoomData("breakDuration", Number.parseInt(e.target.value))}
                        min="1"
                        max="30"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Room Preview</CardTitle>
                <CardDescription>How your room will appear to others</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg flex items-center justify-center">
                  <Play className="h-12 w-12 text-purple-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{roomData.name || "Untitled Study Room"}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {roomData.description || "No description provided"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {roomData.category && (
                    <Badge variant="secondary">{categories.find((c) => c.id === roomData.category)?.name}</Badge>
                  )}
                  <Badge variant="outline" className="flex items-center space-x-1">
                    {roomData.isPublic ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                    <span>{roomData.isPublic ? "Public" : "Private"}</span>
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>Max {roomData.maxParticipants} participants</span>
                  </div>
                  {roomData.allowChat && (
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-gray-400" />
                      <span>Chat enabled</span>
                    </div>
                  )}
                  {roomData.allowScreenShare && (
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4 text-gray-400" />
                      <span>Screen sharing allowed</span>
                    </div>
                  )}
                  {roomData.timerMode !== "none" && (
                    <div className="flex items-center space-x-2">
                      <Timer className="h-4 w-4 text-gray-400" />
                      <span>
                        {roomData.timerMode === "pomodoro" && "Pomodoro timer"}
                        {roomData.timerMode === "custom" &&
                          `${roomData.sessionDuration}/${roomData.breakDuration} min timer`}
                        {roomData.timerMode === "stopwatch" && "Stopwatch"}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button onClick={handleCreateRoom} className="w-full" size="lg" disabled={!roomData.name.trim()}>
                Create & Join Room
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <Settings className="h-8 w-8 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">You can modify these settings after creating the room</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
