"use client"

import { Separator } from "@/components/ui/separator"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { io, type Socket } from "socket.io-client"
import { DraggableVideoCard } from "@/components/study-rooms/draggable-video-card"
import { ReportModal } from "@/components/study-rooms/report-modal"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { PhoneOff, Users, MessageCircle, Settings, Timer, Play, Pause, RotateCcw } from "lucide-react"

interface Participant {
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

export default function LiveStudyRoom() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()
  const roomId = params.roomId as string

  // State
  const [participants, setParticipants] = useState<Participant[]>([])
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [reportingUser, setReportingUser] = useState<Participant | null>(null)
  const [room, setRoom] = useState<any>(null)

  // Timer state
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentSession, setCurrentSession] = useState(1)

  // Refs
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map())

  // Initialize media and socket
  useEffect(() => {
    if (!session?.user?.id) return

    const initializeRoom = async () => {
      try {
        // Get user media
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        setLocalStream(stream)

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }

        // Initialize socket
        const newSocket = io()
        setSocket(newSocket)

        // Join room
        newSocket.emit("join-room", {
          roomId,
          userId: session.user.id,
        })

        // Socket event listeners
        newSocket.on("user-joined", (data) => {
          setParticipants(data.participants)
          toast({
            title: "User joined",
            description: "Someone joined the study room",
          })
        })

        newSocket.on("user-left", (data) => {
          setParticipants((prev) => prev.filter((p) => p.user.id !== data.userId))
          // Clean up peer connection
          const pc = peerConnections.current.get(data.userId)
          if (pc) {
            pc.close()
            peerConnections.current.delete(data.userId)
          }
        })

        newSocket.on("user-video-toggle", (data) => {
          setParticipants((prev) =>
            prev.map((p) => (p.user.id === data.userId ? { ...p, isVideoOn: data.isVideoOn } : p)),
          )
        })

        newSocket.on("user-audio-toggle", (data) => {
          setParticipants((prev) =>
            prev.map((p) => (p.user.id === data.userId ? { ...p, isAudioOn: data.isAudioOn } : p)),
          )
        })

        // WebRTC signaling
        newSocket.on("offer", async (data) => {
          await handleOffer(data, stream)
        })

        newSocket.on("answer", async (data) => {
          await handleAnswer(data)
        })

        newSocket.on("ice-candidate", async (data) => {
          await handleIceCandidate(data)
        })

        // Fetch room data
        const roomResponse = await fetch(`/api/study-rooms/${roomId}`)
        if (roomResponse.ok) {
          const roomData = await roomResponse.json()
          setRoom(roomData)
          setParticipants(roomData.participants || [])
        }
      } catch (error) {
        console.error("Error initializing room:", error)
        toast({
          title: "Error",
          description: "Failed to access camera/microphone",
          variant: "destructive",
        })
      }
    }

    initializeRoom()

    return () => {
      // Cleanup
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
      if (socket) {
        socket.emit("leave-room", { roomId, userId: session.user.id })
        socket.disconnect()
      }
      peerConnections.current.forEach((pc) => pc.close())
    }
  }, [session?.user?.id, roomId])

  // WebRTC functions
  const createPeerConnection = (userId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    })

    pc.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit("ice-candidate", {
          roomId,
          candidate: event.candidate,
          targetUserId: userId,
        })
      }
    }

    pc.ontrack = (event) => {
      // Handle remote stream
      console.log("Received remote stream from:", userId)
    }

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream)
      })
    }

    peerConnections.current.set(userId, pc)
    return pc
  }

  const handleOffer = async (data: any, stream: MediaStream) => {
    const pc = createPeerConnection(data.fromUserId)
    await pc.setRemoteDescription(data.offer)
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    if (socket) {
      socket.emit("answer", {
        roomId,
        answer,
        targetUserId: data.fromUserId,
      })
    }
  }

  const handleAnswer = async (data: any) => {
    const pc = peerConnections.current.get(data.fromUserId)
    if (pc) {
      await pc.setRemoteDescription(data.answer)
    }
  }

  const handleIceCandidate = async (data: any) => {
    const pc = peerConnections.current.get(data.fromUserId)
    if (pc) {
      await pc.addIceCandidate(data.candidate)
    }
  }

  // Media controls
  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn
        setIsVideoOn(!isVideoOn)

        if (socket) {
          socket.emit("toggle-video", {
            roomId,
            userId: session?.user?.id,
            isVideoOn: !isVideoOn,
          })
        }
      }
    }
  }

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !isAudioOn
        setIsAudioOn(!isAudioOn)

        if (socket) {
          socket.emit("toggle-audio", {
            roomId,
            userId: session?.user?.id,
            isAudioOn: !isAudioOn,
          })
        }
      }
    }
  }

  const leaveRoom = async () => {
    try {
      await fetch(`/api/study-rooms/${roomId}/leave`, {
        method: "POST",
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("Error leaving room:", error)
      router.push("/dashboard")
    }
  }

  const handlePositionChange = (participantId: string, x: number, y: number) => {
    if (socket) {
      socket.emit("update-position", {
        roomId,
        userId: participantId,
        x,
        y,
      })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsTimerRunning(false)
      toast({
        title: "Pomodoro Complete!",
        description: "Time for a break. Great work! 🎉",
      })
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timeLeft])

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Hidden local video for WebRTC */}
      <video ref={localVideoRef} autoPlay muted playsInline className="hidden" />

      {/* Floating Video Cards */}
      {participants.map((participant) => (
        <DraggableVideoCard
          key={participant.id}
          participant={participant}
          isCurrentUser={participant.user.id === session.user?.id}
          onPositionChange={(x, y) => handlePositionChange(participant.user.id, x, y)}
          onReport={() => setReportingUser(participant)}
          onToggleVideo={participant.user.id === session.user?.id ? toggleVideo : undefined}
          onToggleAudio={participant.user.id === session.user?.id ? toggleAudio : undefined}
        />
      ))}

      {/* Fixed Control Panel */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              {/* Room Info */}
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{participants.length}</span>
                </div>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Timer */}
              <div className="flex items-center space-x-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
                <Button variant="ghost" size="sm" onClick={() => setIsTimerRunning(!isTimerRunning)}>
                  {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTimeLeft(25 * 60)
                    setIsTimerRunning(false)
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={leaveRoom}>
                  <PhoneOff className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Modal */}
      <ReportModal user={reportingUser} isOpen={!!reportingUser} onClose={() => setReportingUser(null)} />
    </div>
  )
}
