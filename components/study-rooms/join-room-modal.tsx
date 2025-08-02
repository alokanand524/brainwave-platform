"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Video, VideoOff, Mic, MicOff, Users, Loader2 } from "lucide-react"

interface JoinRoomModalProps {
  room: any
  isOpen: boolean
  onClose: () => void
}

export function JoinRoomModal({ room, isOpen, onClose }: JoinRoomModalProps) {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const requestMediaPermissions = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: isVideoOn,
        audio: isAudioOn,
      })
      setStream(mediaStream)
      return true
    } catch (error) {
      toast({
        title: "Camera/Microphone Access Required",
        description: "Please allow camera and microphone access to join the study room.",
        variant: "destructive",
      })
      return false
    }
  }

  const handleJoinRoom = async () => {
    setIsJoining(true)

    const hasPermissions = await requestMediaPermissions()
    if (!hasPermissions) {
      setIsJoining(false)
      return
    }

    try {
      // Create room participant
      const response = await fetch("/api/study-rooms/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: room.id,
          isVideoOn,
          isAudioOn,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to join room")
      }

      // Navigate to the study room
      router.push(`/study-rooms/live/${room.id}`)
      onClose()
    } catch (error) {
      toast({
        title: "Failed to join room",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsJoining(false)
    }
  }

  if (!room) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            Join Study Room
          </DialogTitle>
          <DialogDescription>
            You're about to join "{room.name}" with {room.currentParticipants} other learners
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Room Info */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">{room.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{room.description || "No description available"}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {room.currentParticipants}/{room.maxParticipants} participants
                </span>
              </div>
              <Badge variant="secondary">Live</Badge>
            </div>
          </div>

          {/* Current Participants */}
          <div>
            <h4 className="text-sm font-medium mb-2">Currently studying:</h4>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {room.participants.slice(0, 6).map((participant: any) => (
                  <Avatar key={participant.id} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={participant.user.avatar || ""} />
                    <AvatarFallback className="text-xs">{participant.user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              {room.participants.length > 6 && (
                <span className="text-sm text-muted-foreground">+{room.participants.length - 6} more</span>
              )}
            </div>
          </div>

          {/* Media Controls */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Camera & Microphone Settings</h4>
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant={isVideoOn ? "default" : "outline"}
                size="lg"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className="rounded-full w-12 h-12"
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>

              <Button
                variant={isAudioOn ? "default" : "outline"}
                size="lg"
                onClick={() => setIsAudioOn(!isAudioOn)}
                className="rounded-full w-12 h-12"
              >
                {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              You can change these settings anytime during the session
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleJoinRoom} disabled={isJoining} className="flex-1">
              {isJoining ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join Room"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
