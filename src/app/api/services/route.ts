import { NextResponse } from "next/server"

// Service types data
const serviceTypes = [
  {
    id: "panel_upgrade",
    name: "Panel Upgrade",
    description: "Upgrade your electrical panel for increased capacity and safety",
    icon: "⚡",
    category: "electrical",
    priceRange: {
      min: 1500,
      max: 4000,
    },
    estimatedDuration: "4-8 hours",
    popular: true,
  },
  {
    id: "solar_installation",
    name: "Solar Installation",
    description: "Professional solar panel installation with battery backup options",
    icon: "☀️",
    category: "solar",
    priceRange: {
      min: 8000,
      max: 25000,
    },
    estimatedDuration: "1-3 days",
    popular: true,
  },
  {
    id: "ev_charger",
    name: "EV Charger Installation",
    description: "Level 2 electric vehicle charger installation for your home",
    icon: "🔌",
    category: "electrical",
    priceRange: {
      min: 800,
      max: 2500,
    },
    estimatedDuration: "2-4 hours",
    popular: true,
  },
  {
    id: "rewiring",
    name: "Home Rewiring",
    description: "Complete or partial home rewiring for safety and code compliance",
    icon: "🏠",
    category: "electrical",
    priceRange: {
      min: 3000,
      max: 15000,
    },
    estimatedDuration: "3-7 days",
    popular: false,
  },
  {
    id: "lighting",
    name: "Lighting Installation",
    description: "Indoor and outdoor lighting design and installation",
    icon: "💡",
    category: "electrical",
    priceRange: {
      min: 200,
      max: 3000,
    },
    estimatedDuration: "2-6 hours",
    popular: true,
  },
  {
    id: "generator",
    name: "Generator Installation",
    description: "Backup generator installation for power outage protection",
    icon: "🔋",
    category: "electrical",
    priceRange: {
      min: 5000,
      max: 15000,
    },
    estimatedDuration: "1-2 days",
    popular: false,
  },
  {
    id: "inspection",
    name: "Electrical Inspection",
    description: "Comprehensive electrical safety inspection and assessment",
    icon: "🔍",
    category: "inspection",
    priceRange: {
      min: 150,
      max: 500,
    },
    estimatedDuration: "1-2 hours",
    popular: false,
  },
  {
    id: "emergency_repair",
    name: "Emergency Repair",
    description: "24/7 emergency electrical repair services",
    icon: "🚨",
    category: "repair",
    priceRange: {
      min: 200,
      max: 1000,
    },
    estimatedDuration: "1-4 hours",
    isEmergency: true,
    popular: true,
  },
]

// GET /api/services - Get all service types
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const popular = searchParams.get("popular")

    let services = [...serviceTypes]

    if (category) {
      services = services.filter(s => s.category === category)
    }
    if (popular === "true") {
      services = services.filter(s => s.popular)
    }

    return NextResponse.json({
      success: true,
      data: services,
      total: services.length,
    })
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch services" },
      { status: 500 }
    )
  }
}
