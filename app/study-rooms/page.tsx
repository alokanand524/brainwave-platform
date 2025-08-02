"use client"

import { MainNav } from "@/components/navigation/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Clock,
  Search,
  Plus,
  Filter,
  Volume2,
  VolumeX,
  Timer,
  BookOpen,
  Code,
  Calculator,
  Palette,
  Globe,
  Microscope,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const studyRooms = [
  {
    id: 1,
    name: "Mathematics Focus Zone",
    description: "Silent study for math problems and equations",
    participants: 12,
    maxParticipants: 20,
    category: "Mathematics",
    icon: Calculator,
    isActive: true,
    studyTime: "2h 15m",
    type: "silent",
  },
  {
    id: 2,
    name: "Programming Hub",
    description: "Code together, debug together",
    participants: 8,
    maxParticipants: 15,
    category: "Programming",
    icon: Code,
    isActive: true,
    studyTime: "1h 45m",
    type: "collaborative",
  },
  {
    id: 3,
    name: "Literature Circle",
    description: "Reading and discussing classic literature",
    participants: 6,
    maxParticipants: 12,
    category: "Literature",
    icon: BookOpen,
    isActive: true,
    studyTime: "3h 20m",
    type: "discussion",
  },
  {
    id: 4,
    name: "Science Lab",
    description: "Physics, Chemistry, Biology study group",
    participants: 15,
    maxParticipants: 25,
    category: "Science",
    icon: Microscope,
    isActive: true,
    studyTime: "1h 30m",
    type: "collaborative",
  },
  {
    id: 5,
    name: "Art & Design Studio",
    description: "Creative minds working on visual projects",
    participants: 4,
    maxParticipants: 10,
    category: "Art",
    icon: Palette,
    isActive: false,
    studyTime: "0m",
    type: "creative",
  },
  {
    id: 6,
    name: "Language Learning",
    description: "Practice languages with native speakers",
    participants: 9,
    maxParticipants: 15,
    category: "Languages",
    icon: Globe,
    isActive: true,
    studyTime: "2h 45m",
    type: "discussion",
  },
]

export default function StudyRooms() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredRooms = studyRooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || room.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Study Rooms</h1>
            <p className="text-muted-foreground">Join focused study sessions with learners worldwide</p>
          </div>
          <Link href="/study-rooms/create">
            <Button className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              Create Room
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search study rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mathematics">Math</TabsTrigger>
            <TabsTrigger value="programming">Code</TabsTrigger>
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="literature">Literature</TabsTrigger>
            <TabsTrigger value="art">Art</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Study Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => {
            const IconComponent = room.icon
            return (
              <Card key={room.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {room.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {room.type === "silent" ? (
                        <VolumeX className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Participants */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {room.participants}/{room.maxParticipants} participants
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Timer className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{room.studyTime}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${(room.participants / room.maxParticipants) * 100}%` }}
                      ></div>
                    </div>

                    {/* Action Button */}
                    <Link href={`/study-rooms/live/ROOM${room.id}`}>
                      <Button
                        className="w-full"
                        variant={room.isActive ? "default" : "outline"}
                        disabled={room.participants >= room.maxParticipants}
                      >
                        {room.participants >= room.maxParticipants ? "Room Full" : "Join Room"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Active Study Session */}
        <Card className="mt-8 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  Currently in: Mathematics Focus Zone
                </CardTitle>
                <CardDescription>You've been studying for 1h 23m</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Take Break
                </Button>
                <Button variant="destructive" size="sm">
                  Leave Room
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`/placeholder.svg?height=32&width=32&query=user+${i}`}
                      alt={`User ${i}`}
                      className="w-8 h-8 rounded-full border-2 border-background"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs">
                    +8
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">12 people studying</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-mono">01:23:45</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
