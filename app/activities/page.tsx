"use client"

import { MainNav } from "@/components/navigation/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gamepad2, Trophy, Target, Clock, Users, Star, Play, Zap, TrendingUp, Bell } from "lucide-react"

const games = [
  {
    id: 1,
    title: "Math Quiz Challenge",
    description: "Test your mathematical skills with timed questions",
    category: "Mathematics",
    difficulty: "Medium",
    players: 1247,
    duration: "15 min",
    points: 500,
    icon: Target,
    color: "bg-green-100 dark:bg-green-900/20 text-green-600",
  },
  {
    id: 2,
    title: "Code Debugging Race",
    description: "Find and fix bugs faster than other programmers",
    category: "Programming",
    difficulty: "Hard",
    players: 892,
    duration: "20 min",
    points: 750,
    icon: Zap,
    color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600",
  },
]

export default function Activities() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Fun Activities</h1>
          <p className="text-muted-foreground">
            Take a break and challenge yourself with educational games and quizzes
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11,250</div>
              <p className="text-xs text-muted-foreground">+420 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Games Played</CardTitle>
              <Gamepad2 className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Zap className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#247</div>
              <p className="text-xs text-muted-foreground">↑12 from last week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="games" className="space-y-6">
          <TabsList>
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="space-y-6">
            {/* Featured Games */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game) => {
                const IconComponent = game.icon
                return (
                  <Card key={game.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${game.color}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{game.title}</CardTitle>
                            <Badge variant="outline" className="mt-1">
                              {game.category}
                            </Badge>
                          </div>
                        </div>
                        <Badge
                          variant={
                            game.difficulty === "Easy"
                              ? "secondary"
                              : game.difficulty === "Medium"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {game.difficulty}
                        </Badge>
                      </div>
                      <CardDescription>{game.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span>{game.players.toLocaleString()} players</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{game.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{game.points} pts</span>
                        </div>
                      </div>

                      <Button className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Play Now
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Leaderboard coming soon</h3>
              <p className="text-muted-foreground">Compete with other learners for the top spot</p>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Achievements coming soon</h3>
              <p className="text-muted-foreground">Unlock badges and rewards as you learn</p>
            </div>
          </TabsContent>

          <TabsContent value="tournaments" className="space-y-4">
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No active tournaments</h3>
              <p className="text-muted-foreground mb-4">Check back soon for exciting tournaments and competitions</p>
              <Button>
                <Bell className="mr-2 h-4 w-4" />
                Notify Me
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
