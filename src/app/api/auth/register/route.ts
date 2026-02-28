import { NextResponse } from "next/server"
import { z } from "zod"

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  role: z.enum(["CUSTOMER", "TECHNICIAN"]).default("CUSTOMER"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = registerSchema.parse(body)
    
    // In real implementation:
    // 1. Check if user already exists
    // 2. Hash password with bcrypt
    // 3. Create user in database
    // 4. Send verification email
    
    // Mock response
    const newUser = {
      id: `user-${Date.now()}`,
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      role: validatedData.role,
      status: "PENDING_VERIFICATION",
      createdAt: new Date().toISOString(),
    }
    
    return NextResponse.json(
      { 
        success: true, 
        data: newUser,
        message: "Registration successful. Please check your email to verify your account."
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
    console.error("Registration error:", error)
    return NextResponse.json(
      { success: false, error: "Registration failed" },
      { status: 500 }
    )
  }
}
