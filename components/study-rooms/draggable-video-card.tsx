"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Video, VideoOff, Mic, MicOff, MoreVertical, Flag, Minimize2, Maximize2 } from "lucide-react"

interface DraggableVideoCardProps {
  participant: {
    id: string
    user: {
      id: string
      name: string
      avatar?: string
      currentStreak: number
    }
    isVideoOn: boolean
    isAudioOn: boolean
    isHost: boolean
    positionX?: number
    positionY?: number
  }
  userStatus?: {
    status?: string
    reflection?: string
    mood?: string
  }
  isCurrentUser?: boolean
  onPositionChange?: (x: number, y: number) => void
  onReport?: () => void
  onToggleVideo?: () => void
  onToggleAudio?: () => void
}

export function DraggableVideoCard({
  participant,
  userStatus,
  isCurrentUser = false,
  onPositionChange,
  onReport,
  onToggleVideo,
  onToggleAudio,
}: DraggableVideoCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({
    x: participant.positionX || 20,
    y: participant.positionY || 20,
  })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      // Constrain to viewport
      const maxX = window.innerWidth - 320
      const maxY = window.innerHeight - 240
      const constrainedX = Math.max(0, Math.min(newX, maxX))
      const constrainedY = Math.max(0, Math.min(newY, maxY))

      setPosition({ x: constrainedX, y: constrainedY })
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        onPositionChange?.(position.x, position.y)
      }
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, position, onPositionChange])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setIsDragging(true)
  }

  return (
    <Card
      ref={cardRef}
      className={`fixed z-50 transition-shadow ${
        isDragging ? "shadow-2xl cursor-grabbing" : "shadow-lg cursor-grab hover:shadow-xl"
      } ${isMinimized ? "w-48 h-32" : "w-80 h-60"}`}
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
    >
      <CardContent className="p-0 h-full relative overflow-hidden">
        {/* Video/Avatar Area */}
        <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
          {participant.isVideoOn ? (
            <video ref={videoRef} autoPlay muted={isCurrentUser} playsInline className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400">
              <Avatar className="w-16 h-16">
                <AvatarImage src={participant.user.avatar || ""} />
                <AvatarFallback className="text-2xl font-bold text-white">
                  {participant.user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          )}

          {/* Top Controls */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {participant.isHost && (
                <Badge variant="secondary" className="text-xs">
                  Host
                </Badge>
              )}
              {participant.user.currentStreak > 0 && (
                <Badge className="bg-orange-500 hover:bg-orange-600 text-xs">{participant.user.currentStreak}🔥</Badge>
              )}
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 bg-black/50 hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMinimized(!isMinimized)
                }}
              >
                {isMinimized ? (
                  <Maximize2 className="h-3 w-3 text-white" />
                ) : (
                  <Minimize2 className="h-3 w-3 text-white" />
                )}
              </Button>

              {!isCurrentUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 bg-black/50 hover:bg-black/70"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-3 w-3 text-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onReport}>
                      <Flag className="mr-2 h-4 w-4" />
                      Report User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate text-sm">{participant.user.name}</p>
                {userStatus?.status && !isMinimized && (
                  <p className="text-white/80 text-xs truncate">{userStatus.status}</p>
                )}
                {userStatus?.reflection && !isMinimized && (
                  <p className="text-white/60 text-xs truncate mt-1">💭 {userStatus.reflection}</p>
                )}
              </div>

              <div className="flex items-center space-x-1 ml-2">
                {isCurrentUser ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleAudio?.()
                      }}
                    >
                      {participant.isAudioOn ? (
                        <Mic className="h-3 w-3 text-green-400" />
                      ) : (
                        <MicOff className="h-3 w-3 text-red-400" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleVideo?.()
                      }}
                    >
                      {participant.isVideoOn ? (
                        <Video className="h-3 w-3 text-green-400" />
                      ) : (
                        <VideoOff className="h-3 w-3 text-red-400" />
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    {participant.isAudioOn ? (
                      <Mic className="h-3 w-3 text-green-400" />
                    ) : (
                      <MicOff className="h-3 w-3 text-red-400" />
                    )}
                    {participant.isVideoOn ? (
                      <Video className="h-3 w-3 text-green-400" />
                    ) : (
                      <VideoOff className="h-3 w-3 text-red-400" />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Connection Status Indicator */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
