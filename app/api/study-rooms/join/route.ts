import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { updateUserStreak } from "@/lib/streak"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { roomId, isVideoOn, isAudioOn } = await request.json()

    // Check if room exists and has space
    const room = await prisma.studyRoom.findUnique({
      where: { id: roomId },
      include: {
        participants: true,
      },
    })

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 })
    }

    if (room.currentParticipants >= room.maxParticipants) {
      return NextResponse.json({ error: "Room is full" }, { status: 400 })
    }

    // Check if user is already in the room
    const existingParticipant = await prisma.roomParticipant.findUnique({
      where: {
        userId_roomId: {
          userId: session.user.id,
          roomId: roomId,
        },
      },
    })

    if (existingParticipant) {
      return NextResponse.json({ error: "Already in room" }, { status: 400 })
    }

    // Add user to room
    const participant = await prisma.roomParticipant.create({
      data: {
        userId: session.user.id,
        roomId: roomId,
        isVideoOn,
        isAudioOn,
        isHost: room.participants.length === 0, // First participant is host
      },
    })

    // Update room participant count
    await prisma.studyRoom.update({
      where: { id: roomId },
      data: {
        currentParticipants: {
          increment: 1,
        },
      },
    })

    // Update user streak
    await updateUserStreak(session.user.id)

    // Start study session
    await prisma.studySession.create({
      data: {
        userId: session.user.id,
        roomId: roomId,
      },
    })

    return NextResponse.json({ success: true, participant })
  } catch (error) {
    console.error("Error joining room:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
