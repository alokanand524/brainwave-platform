"use client"

import { MainNav } from "@/components/navigation/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Eye,
  Calendar,
  User,
  TrendingUp,
  Clock,
  Plus,
} from "lucide-react"
import { useState } from "react"

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Education: Transforming Learning Experiences",
    excerpt:
      "Exploring how artificial intelligence is revolutionizing the way we learn and teach, from personalized learning paths to intelligent tutoring systems.",
    author: "Dr. Sarah Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedDate: "2024-02-10",
    readTime: "8 min read",
    category: "Technology",
    tags: ["AI", "Education", "Future"],
    likes: 234,
    comments: 45,
    views: 1250,
    image: "/placeholder.svg?height=200&width=400",
    isBookmarked: false,
    isTrending: true,
  },
  {
    id: 2,
    title: "Mastering React Hooks: A Complete Guide for Beginners",
    excerpt:
      "Learn everything you need to know about React Hooks, from useState and useEffect to creating custom hooks for your applications.",
    author: "Alex Chen",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedDate: "2024-02-08",
    readTime: "12 min read",
    category: "Programming",
    tags: ["React", "JavaScript", "Web Development"],
    likes: 189,
    comments: 32,
    views: 890,
    image: "/placeholder.svg?height=200&width=400",
    isBookmarked: true,
    isTrending: false,
  },
]

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Blog</h1>
            <p className="text-muted-foreground">
              Discover insights, tutorials, and stories from our learning community
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Write Post
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search posts, topics, authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="latest" className="space-y-6">
              <TabsList>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              </TabsList>

              <TabsContent value="latest" className="space-y-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline">{post.category}</Badge>
                                {post.isTrending && (
                                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-xl mb-2 hover:text-purple-600 cursor-pointer">
                                {post.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="ml-2">
                              <Bookmark
                                className={`h-4 w-4 ${post.isBookmarked ? "fill-current text-purple-600" : ""}`}
                              />
                            </Button>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={post.authorAvatar || "/placeholder.svg"}
                                  alt={post.author}
                                  className="w-6 h-6 rounded-full"
                                />
                                <span className="text-sm text-muted-foreground">{post.author}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{post.readTime}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{post.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="h-3 w-3" />
                                <span>{post.comments}</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Share className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No trending posts</h3>
                  <p className="text-muted-foreground">Check back later for trending content</p>
                </div>
              </TabsContent>

              <TabsContent value="following" className="space-y-6">
                <div className="text-center py-12">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No posts from followed authors</h3>
                  <p className="text-muted-foreground">Follow authors to see their latest posts here</p>
                </div>
              </TabsContent>

              <TabsContent value="bookmarked" className="space-y-6">
                <div className="text-center py-12">
                  <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No bookmarked posts</h3>
                  <p className="text-muted-foreground">Bookmark posts to read them later</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "JavaScript",
                    "Python",
                    "AI",
                    "Machine Learning",
                    "Web Development",
                    "Data Science",
                    "Study Tips",
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/20"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
