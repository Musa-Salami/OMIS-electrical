import { NextResponse } from "next/server"
import { z } from "zod"

const quoteSchema = z.object({
  requestId: z.string().min(1, "Request ID is required"),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  laborCost: z.number().optional(),
  materialCost: z.number().optional(),
  validDays: z.number().default(7),
  notes: z.string().optional(),
})

// Mock data
const mockQuotes = [
  {
    id: "QUOTE-001",
    requestId: "REQ-001",
    technicianId: "tech-1",
    technician: {
      name: "Mike Johnson",
      rating: 4.9,
      completedJobs: 47,
    },
    amount: 2500,
    laborCost: 1500,
    materialCost: 1000,
    description: "Full electrical panel upgrade from 100A to 200A including all labor and materials.",
    validUntil: "2024-03-25T00:00:00Z",
    status: "accepted",
    createdAt: "2024-03-16T10:00:00Z",
  },
  {
    id: "QUOTE-002",
    requestId: "REQ-002",
    technicianId: "tech-2",
    technician: {
      name: "Sarah Williams",
      rating: 4.8,
      completedJobs: 35,
    },
    amount: 8500,
    laborCost: 3500,
    materialCost: 5000,
    description: "20-panel solar system installation with 10kWh battery backup.",
    validUntil: "2024-03-28T00:00:00Z",
    status: "pending",
    createdAt: "2024-03-17T14:00:00Z",
  },
]

// GET /api/quotes - Get quotes
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const requestId = searchParams.get("requestId")
    const technicianId = searchParams.get("technicianId")
    const customerId = searchParams.get("customerId")
    const status = searchParams.get("status")

    let quotes = [...mockQuotes]

    if (requestId) {
      quotes = quotes.filter(q => q.requestId === requestId)
    }
    if (technicianId) {
      quotes = quotes.filter(q => q.technicianId === technicianId)
    }
    if (status) {
      quotes = quotes.filter(q => q.status === status)
    }

    return NextResponse.json({
      success: true,
      data: quotes,
      total: quotes.length,
    })
  } catch (error) {
    console.error("Error fetching quotes:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch quotes" },
      { status: 500 }
    )
  }
}

// POST /api/quotes - Create a new quote (technician only)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const validatedData = quoteSchema.parse(body)
    
    const quoteId = `QUOTE-${String(mockQuotes.length + 1).padStart(3, "0")}`
    
    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + validatedData.validDays)
    
    const newQuote = {
      id: quoteId,
      technicianId: "tech-1", // Would come from auth session
      ...validatedData,
      validUntil: validUntil.toISOString(),
      status: "pending",
      createdAt: new Date().toISOString(),
    }
    
    return NextResponse.json(
      { success: true, data: newQuote },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      )
    }
    console.error("Error creating quote:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create quote" },
      { status: 500 }
    )
  }
}
