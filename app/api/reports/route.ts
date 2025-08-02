import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { reportedUserId, reason, description } = await request.json()

    // Validate input
    if (!reportedUserId || !reason) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user exists
    const reportedUser = await prisma.user.findUnique({
      where: { id: reportedUserId },
    })

    if (!reportedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Create report
    const report = await prisma.report.create({
      data: {
        reporterId: session.user.id,
        reportedId: reportedUserId,
        reason,
        description,
      },
    })

    return NextResponse.json({ success: true, report })
  } catch (error) {
    console.error("Error creating report:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
