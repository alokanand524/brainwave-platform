import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isPublic = searchParams.get("public") !== "false"

    const studyRooms = await prisma.studyRoom.findMany({
      where: {
        isPublic: isPublic,
        isActive: true,
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
      orderBy: {
        currentParticipants: "desc",
      },
    })

    return NextResponse.json(studyRooms)
  } catch (error) {
    console.error("Error fetching study rooms:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const studyRoom = await prisma.studyRoom.create({
      data: {
        name: data.name,
        description: data.description,
        isPublic: data.isPublic,
        maxParticipants: data.maxParticipants,
        allowChat: data.allowChat,
        allowScreenShare: data.allowScreenShare,
        requireCamera: data.requireCamera,
        timerMode: data.timerMode,
        sessionDuration: data.sessionDuration,
        breakDuration: data.breakDuration,
      },
    })

    return NextResponse.json(studyRoom)
  } catch (error) {
    console.error("Error creating study room:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
