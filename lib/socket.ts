import type { Server as NetServer } from "http"
import type { NextApiRequest, NextApiResponse } from "next"
import { Server as ServerIO } from "socket.io"
import { prisma } from "./prisma"

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: ServerIO
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (res.socket.server.io) {
    console.log("Socket is already running")
  } else {
    console.log("Socket is initializing")
    const io = new ServerIO(res.socket.server)
    res.socket.server.io = io

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id)

      // Join room
      socket.on("join-room", async (data: { roomId: string; userId: string }) => {
        socket.join(data.roomId)

        // Update participant count
        const room = await prisma.studyRoom.update({
          where: { id: data.roomId },
          data: {
            currentParticipants: {
              increment: 1,
            },
          },
          include: {
            participants: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    avatar: true,
                    currentStreak: true,
                  },
                },
              },
            },
          },
        })

        // Broadcast to room
        socket.to(data.roomId).emit("user-joined", {
          userId: data.userId,
          participants: room.participants,
        })
      })

      // Leave room
      socket.on("leave-room", async (data: { roomId: string; userId: string }) => {
        socket.leave(data.roomId)

        // Update participant count
        await prisma.studyRoom.update({
          where: { id: data.roomId },
          data: {
            currentParticipants: {
              decrement: 1,
            },
          },
        })

        // Remove participant
        await prisma.roomParticipant.deleteMany({
          where: {
            roomId: data.roomId,
            userId: data.userId,
          },
        })

        socket.to(data.roomId).emit("user-left", {
          userId: data.userId,
        })
      })

      // WebRTC signaling
      socket.on("offer", (data) => {
        socket.to(data.roomId).emit("offer", data)
      })

      socket.on("answer", (data) => {
        socket.to(data.roomId).emit("answer", data)
      })

      socket.on("ice-candidate", (data) => {
        socket.to(data.roomId).emit("ice-candidate", data)
      })

      // Media controls
      socket.on("toggle-video", (data: { roomId: string; userId: string; isVideoOn: boolean }) => {
        socket.to(data.roomId).emit("user-video-toggle", data)
      })

      socket.on("toggle-audio", (data: { roomId: string; userId: string; isAudioOn: boolean }) => {
        socket.to(data.roomId).emit("user-audio-toggle", data)
      })

      // Card position updates
      socket.on("update-position", async (data: { roomId: string; userId: string; x: number; y: number }) => {
        await prisma.roomParticipant.updateMany({
          where: {
            roomId: data.roomId,
            userId: data.userId,
          },
          data: {
            positionX: data.x,
            positionY: data.y,
          },
        })

        socket.to(data.roomId).emit("position-updated", data)
      })

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id)
      })
    })
  }
  res.end()
}
