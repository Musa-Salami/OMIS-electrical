import { NextResponse } from "next/server"

// GET /api/quotes/[id] - Get a single quote
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Mock data
    const quote = {
      id,
      requestId: "REQ-001",
      request: {
        id: "REQ-001",
        title: "Electrical Panel Upgrade",
        serviceType: "panel_upgrade",
        address: "123 Oak Street, Austin, TX 78701",
      },
      technicianId: "tech-1",
      technician: {
        id: "tech-1",
        name: "Mike Johnson",
        phone: "(512) 555-1234",
        email: "mike@example.com",
        rating: 4.9,
        completedJobs: 47,
        responseTime: "< 1 hour",
      },
      amount: 2500,
      laborCost: 1500,
      materialCost: 1000,
      description: "Full electrical panel upgrade from 100A to 200A including all labor and materials.",
      breakdown: [
        { item: "200A Main Panel", quantity: 1, unitPrice: 500, total: 500 },
        { item: "Circuit Breakers", quantity: 20, unitPrice: 15, total: 300 },
        { item: "Wiring & Connectors", quantity: 1, unitPrice: 200, total: 200 },
        { item: "Labor (8 hours)", quantity: 8, unitPrice: 187.50, total: 1500 },
      ],
      validUntil: "2024-03-25T00:00:00Z",
      status: "pending",
      notes: "Work can be completed in one day. All materials included.",
      createdAt: "2024-03-16T10:00:00Z",
    }

    return NextResponse.json({
      success: true,
      data: quote,
    })
  } catch (error) {
    console.error("Error fetching quote:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch quote" },
      { status: 500 }
    )
  }
}

// PATCH /api/quotes/[id] - Update quote status (accept/reject)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { action } = body

    if (!["accept", "reject"].includes(action)) {
      return NextResponse.json(
        { success: false, error: "Invalid action. Use 'accept' or 'reject'" },
        { status: 400 }
      )
    }

    const updatedQuote = {
      id,
      status: action === "accept" ? "accepted" : "rejected",
      [action === "accept" ? "acceptedAt" : "rejectedAt"]: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In real implementation:
    // 1. Update quote status in database
    // 2. If accepted, update service request status
    // 3. Send notifications to technician and customer
    // 4. Create appointment if accepted

    return NextResponse.json({
      success: true,
      data: updatedQuote,
      message: action === "accept" 
        ? "Quote accepted. The technician will contact you to schedule the work."
        : "Quote rejected. You can request quotes from other technicians.",
    })
  } catch (error) {
    console.error("Error updating quote:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update quote" },
      { status: 500 }
    )
  }
}
