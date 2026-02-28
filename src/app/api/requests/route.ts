import { NextResponse } from "next/server"
import { z } from "zod"

// Validation schemas
const serviceRequestSchema = z.object({
  serviceType: z.string().min(1, "Service type is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  urgency: z.enum(["flexible", "standard", "urgent", "emergency"]),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().optional(),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  alternateDate: z.string().optional(),
})

// Mock data for demonstration
const mockRequests = [
  {
    id: "REQ-001",
    customerId: "user-1",
    serviceType: "panel_upgrade",
    title: "Electrical Panel Upgrade",
    description: "Upgrade from 100A to 200A panel for home expansion",
    urgency: "standard",
    status: "in_progress",
    address: "123 Oak Street",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    preferredDate: "2024-03-20",
    preferredTime: "morning",
    technicianId: "tech-1",
    estimatedCost: 2500,
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "REQ-002",
    customerId: "user-1",
    serviceType: "solar_installation",
    title: "Solar Panel Installation",
    description: "Install 20-panel solar system with battery backup",
    urgency: "standard",
    status: "quote_pending",
    address: "456 Elm Ave",
    city: "Austin",
    state: "TX",
    zipCode: "78702",
    preferredDate: "2024-03-25",
    preferredTime: "afternoon",
    technicianId: null,
    estimatedCost: null,
    createdAt: "2024-03-14T14:00:00Z",
    updatedAt: "2024-03-14T14:00:00Z",
  },
]

// GET /api/requests - Get all requests (with auth & filtering)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const customerId = searchParams.get("customerId")
    const technicianId = searchParams.get("technicianId")

    let filteredRequests = [...mockRequests]

    if (status) {
      filteredRequests = filteredRequests.filter(r => r.status === status)
    }
    if (customerId) {
      filteredRequests = filteredRequests.filter(r => r.customerId === customerId)
    }
    if (technicianId) {
      filteredRequests = filteredRequests.filter(r => r.technicianId === technicianId)
    }

    return NextResponse.json({
      success: true,
      data: filteredRequests,
      total: filteredRequests.length,
    })
  } catch (error) {
    console.error("Error fetching requests:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch requests" },
      { status: 500 }
    )
  }
}

// POST /api/requests - Create a new service request
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = serviceRequestSchema.parse(body)
    
    // Generate new request ID
    const newId = `REQ-${String(mockRequests.length + 1).padStart(3, "0")}`
    
    const newRequest = {
      id: newId,
      customerId: "user-1", // Would come from auth session
      ...validatedData,
      status: "pending",
      technicianId: null,
      estimatedCost: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    // In real implementation, save to database
    // await prisma.serviceRequest.create({ data: newRequest })
    
    return NextResponse.json(
      { success: true, data: newRequest },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      )
    }
    console.error("Error creating request:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create request" },
      { status: 500 }
    )
  }
}
