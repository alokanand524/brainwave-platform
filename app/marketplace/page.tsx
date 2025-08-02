"use client"

import { MainNav } from "@/components/navigation/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ShoppingCart,
  Search,
  Filter,
  Star,
  Clock,
  BookOpen,
  Video,
  FileText,
  Headphones,
  Plus,
  Heart,
  Eye,
} from "lucide-react"
import { useState } from "react"

const courses = [
  {
    id: 1,
    title: "Complete React Development Bootcamp",
    description: "Master React from basics to advanced concepts with hands-on projects and real-world applications.",
    instructor: "Sarah Johnson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    students: 12450,
    duration: "42 hours",
    lessons: 156,
    level: "Beginner to Advanced",
    category: "Programming",
    type: "course",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["React", "JavaScript", "Web Development"],
    bestseller: true,
    updated: "2024-02-01",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description:
      "Learn the core concepts of machine learning with Python, including supervised and unsupervised learning.",
    instructor: "Dr. Michael Chen",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    price: 129.99,
    originalPrice: 249.99,
    rating: 4.9,
    students: 8920,
    duration: "38 hours",
    lessons: 124,
    level: "Intermediate",
    category: "Data Science",
    type: "course",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["Machine Learning", "Python", "AI"],
    bestseller: false,
    updated: "2024-01-28",
  },
]

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return Video
      case "book":
        return BookOpen
      case "audio":
        return Headphones
      case "material":
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Marketplace</h1>
            <p className="text-muted-foreground">
              Discover and purchase high-quality courses, books, and learning materials
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Sell Your Course
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search courses, books, materials..."
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

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => {
            const TypeIcon = getTypeIcon(course.type)
            return (
              <Card key={course.id} className="hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <TypeIcon className="h-3 w-3" />
                      {course.type}
                    </Badge>
                  </div>
                  {course.bestseller && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">
                        {course.category}
                      </Badge>
                      <CardTitle className="text-lg line-clamp-2 mb-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-2">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src={course.instructorAvatar || "/placeholder.svg"}
                      alt={course.instructor}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-muted-foreground">{course.instructor}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span>{course.rating}</span>
                      <span className="text-muted-foreground">({course.students.toLocaleString()})</span>
                    </div>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{course.duration}</span>
                      </div>
                      {course.lessons > 0 && (
                        <div className="flex items-center space-x-1">
                          <Video className="h-3 w-3" />
                          <span>{course.lessons} lessons</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">${course.price}</span>
                      {course.originalPrice > course.price && (
                        <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
                      )}
                    </div>
                    <div className="text-xs text-green-600">
                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
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
