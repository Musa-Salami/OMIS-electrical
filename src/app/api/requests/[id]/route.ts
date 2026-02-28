import { NextResponse } from "next/server"

// GET /api/requests/[id] - Get a single request
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Mock data - in real implementation, fetch from database
    const mockRequest = {
      id,
      customerId: "user-1",
      customer: {
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        phone: "(123) 456-7890",
      },
      serviceType: "panel_upgrade",
      title: "Electrical Panel Upgrade",
      description: "Upgrade from 100A to 200A panel for home expansion. Need additional capacity for new appliances and potential EV charger installation.",
      urgency: "standard",
      status: "in_progress",
      address: "123 Oak Street",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      preferredDate: "2024-03-20",
      preferredTime: "morning",
      technicianId: "tech-1",
      technician: {
        id: "tech-1",
        name: "Mike Johnson",
        phone: "(512) 555-1234",
        rating: 4.9,
      },
      estimatedCost: 2500,
      quotes: [
        {
          id: "quote-1",
          amount: 2500,
          description: "Full panel upgrade including labor and materials",
          validUntil: "2024-03-25",
          status: "accepted",
        },
      ],
      timeline: [
        { date: "2024-03-15", event: "Request submitted", type: "created" },
        { date: "2024-03-16", event: "Quote received from Mike Johnson", type: "quote" },
        { date: "2024-03-16", event: "Quote accepted", type: "quote_accepted" },
        { date: "2024-03-18", event: "Work scheduled", type: "scheduled" },
        { date: "2024-03-20", event: "Work started", type: "in_progress" },
      ],
      createdAt: "2024-03-15T10:00:00Z",
      updatedAt: "2024-03-20T09:00:00Z",
    }

    return NextResponse.json({
      success: true,
      data: mockRequest,
    })
  } catch (error) {
    console.error("Error fetching request:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch request" },
      { status: 500 }
    )
  }
}

// PATCH /api/requests/[id] - Update a request
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // In real implementation, update in database
    const updatedRequest = {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: updatedRequest,
    })
  } catch (error) {
    console.error("Error updating request:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update request" },
      { status: 500 }
    )
  }
}

// DELETE /api/requests/[id] - Cancel a request
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // In real implementation, soft delete or cancel in database

    return NextResponse.json({
      success: true,
      message: `Request ${id} has been cancelled`,
    })
  } catch (error) {
    console.error("Error cancelling request:", error)
    return NextResponse.json(
      { success: false, error: "Failed to cancel request" },
      { status: 500 }
    )
  }
}
