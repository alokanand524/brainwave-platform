"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Clock, Video } from "lucide-react"

interface StudyRoomCardProps {
  room: any
  onJoin: () => void
}

export function StudyRoomCard({ room, onJoin }: StudyRoomCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Room Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg truncate">{room.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{room.description || "No description"}</p>
            </div>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live</span>
            </Badge>
          </div>

          {/* Participants Preview */}
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {room.participants.slice(0, 4).map((participant: any, index: number) => (
                <div key={participant.id} className="relative">
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={participant.user.avatar || ""} />
                    <AvatarFallback className="text-xs">{participant.user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  {/* Streak indicator */}
                  {participant.user.currentStreak > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{participant.user.currentStreak}</span>
                    </div>
                  )}
                </div>
              ))}
              {room.participants.length > 4 && (
                <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium">+{room.participants.length - 4}</span>
                </div>
              )}
            </div>
          </div>

          {/* Room Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>
                  {room.currentParticipants}/{room.maxParticipants}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Video className="h-4 w-4" />
                <span>HD</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Active</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{
                width: `${(room.currentParticipants / room.maxParticipants) * 100}%`,
              }}
            />
          </div>

          {/* Join Button */}
          <Button onClick={onJoin} className="w-full" disabled={room.currentParticipants >= room.maxParticipants}>
            {room.currentParticipants >= room.maxParticipants ? (
              "Room Full"
            ) : (
              <>
                <Video className="mr-2 h-4 w-4" />
                Join Study Room
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
