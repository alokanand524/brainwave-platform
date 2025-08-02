"use client"

import { MainNav } from "@/components/navigation/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Bookmark,
  Star,
  Eye,
  Calendar,
  User,
  FileText,
  Video,
  Headphones,
} from "lucide-react"
import { useState } from "react"

const libraryItems = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    author: "Dr. Sarah Johnson",
    type: "book",
    category: "Technology",
    pages: 324,
    rating: 4.8,
    downloads: 15420,
    publishedDate: "2024-01-15",
    description: "A comprehensive guide to machine learning fundamentals and applications.",
    thumbnail: "/placeholder.svg?height=200&width=150",
    isFree: true,
    isBookmarked: false,
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    author: "Alex Chen",
    type: "video",
    category: "Programming",
    duration: "4h 32m",
    rating: 4.9,
    views: 8750,
    publishedDate: "2024-02-20",
    description: "Master advanced React patterns and best practices for scalable applications.",
    thumbnail: "/placeholder.svg?height=200&width=150",
    isFree: true,
    isBookmarked: true,
  },
  {
    id: 3,
    title: "The Art of Problem Solving",
    author: "Prof. Michael Davis",
    type: "book",
    category: "Mathematics",
    pages: 456,
    rating: 4.7,
    downloads: 23100,
    publishedDate: "2023-11-10",
    description: "Mathematical problem-solving techniques and strategies.",
    thumbnail: "/placeholder.svg?height=200&width=150",
    isFree: true,
    isBookmarked: false,
  },
]

const categories = ["All", "Technology", "Programming", "Mathematics", "Science", "Computer Science"]

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("all")

  const filteredItems = libraryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesType = selectedType === "all" || item.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "book":
        return BookOpen
      case "video":
        return Video
      case "audio":
        return Headphones
      case "document":
        return FileText
      default:
        return FileText
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">E-Library</h1>
          <p className="text-muted-foreground">
            Access thousands of free educational resources, books, videos, and documents
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search books, videos, documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Type Tabs */}
        <Tabs value={selectedType} onValueChange={setSelectedType} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Types</TabsTrigger>
            <TabsTrigger value="book">Books</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">Showing {filteredItems.length} results</p>
        </div>

        {/* Library Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const TypeIcon = getTypeIcon(item.type)
            return (
              <Card key={item.id} className="hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <TypeIcon className="h-3 w-3" />
                      {item.type}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                      <Bookmark className={`h-4 w-4 ${item.isBookmarked ? "fill-current text-purple-600" : ""}`} />
                    </Button>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{item.author}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>

                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="outline">{item.category}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>{item.type === "video" ? `${item.views} views` : `${item.downloads} downloads`}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(item.publishedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      {item.type === "video" ? "Watch" : item.type === "audio" ? "Listen" : "Read"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
