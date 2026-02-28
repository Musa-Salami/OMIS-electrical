import { NextResponse } from "next/server"
import { z } from "zod"

const technicianApplicationSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().optional(),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  experienceYears: z.number().min(0),
  specializations: z.array(z.string()).min(1, "Select at least one specialization"),
  serviceAreas: z.string().min(5),
  hourlyRate: z.number().optional(),
  certifications: z.array(z.object({
    name: z.string(),
    issuingBody: z.string(),
  })).optional(),
})

// Mock data
const mockApplications = [
  {
    id: "APP-001",
    firstName: "David",
    lastName: "Chen",
    email: "david@example.com",
    status: "pending",
    appliedAt: "2024-03-15T10:00:00Z",
  },
]

// GET /api/technicians/apply - Get applications (admin only)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let applications = [...mockApplications]
    
    if (status) {
      applications = applications.filter(app => app.status === status)
    }

    return NextResponse.json({
      success: true,
      data: applications,
      total: applications.length,
    })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications" },
      { status: 500 }
    )
  }
}

// POST /api/technicians/apply - Submit application
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Parse and validate
    const validatedData = technicianApplicationSchema.parse({
      ...body,
      experienceYears: Number(body.experienceYears),
      hourlyRate: body.hourlyRate ? Number(body.hourlyRate) : undefined,
    })
    
    // Generate application ID
    const applicationId = `APP-${String(mockApplications.length + 1).padStart(3, "0")}`
    
    const newApplication = {
      id: applicationId,
      ...validatedData,
      status: "pending",
      appliedAt: new Date().toISOString(),
    }
    
    // In real implementation, save to database and send confirmation email
    
    return NextResponse.json(
      { 
        success: true, 
        data: { 
          applicationId,
          message: "Application submitted successfully. We will review your application and contact you within 2-3 business days."
        }
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      )
    }
    console.error("Application error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to submit application" },
      { status: 500 }
    )
  }
}
