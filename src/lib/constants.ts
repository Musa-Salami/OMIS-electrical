// Application constants

export const APP_NAME = "OMIS Electrical"
export const APP_DESCRIPTION = "Professional Electrical and Solar Installation Services"
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

// Service categories
export const SERVICE_CATEGORIES = [
  { id: "electrical", name: "Electrical", icon: "Zap" },
  { id: "solar", name: "Solar", icon: "Sun" },
  { id: "maintenance", name: "Maintenance", icon: "Wrench" },
  { id: "emergency", name: "Emergency", icon: "AlertTriangle" },
] as const

// Service types
export const SERVICE_TYPES = [
  {
    id: "residential-electrical",
    name: "Residential Electrical",
    category: "electrical",
    description: "Complete electrical services for homes including wiring, outlets, and panel upgrades",
    basePrice: 150,
    estimatedDuration: 120,
    icon: "Home",
  },
  {
    id: "commercial-electrical",
    name: "Commercial Electrical",
    category: "electrical",
    description: "Professional electrical solutions for businesses and commercial properties",
    basePrice: 300,
    estimatedDuration: 240,
    icon: "Building2",
  },
  {
    id: "solar-installation",
    name: "Solar Panel Installation",
    category: "solar",
    description: "Full solar panel system installation with inverters and monitoring",
    basePrice: 5000,
    estimatedDuration: 480,
    icon: "Sun",
  },
  {
    id: "solar-maintenance",
    name: "Solar System Maintenance",
    category: "solar",
    description: "Regular maintenance and cleaning of solar panel systems",
    basePrice: 200,
    estimatedDuration: 90,
    icon: "Settings",
  },
  {
    id: "electrical-repair",
    name: "Electrical Repair",
    category: "maintenance",
    description: "Diagnosis and repair of electrical issues",
    basePrice: 100,
    estimatedDuration: 60,
    icon: "Wrench",
  },
  {
    id: "panel-upgrade",
    name: "Electrical Panel Upgrade",
    category: "electrical",
    description: "Upgrade your electrical panel for more capacity and safety",
    basePrice: 1500,
    estimatedDuration: 360,
    icon: "Box",
  },
  {
    id: "emergency-electrical",
    name: "Emergency Electrical Service",
    category: "emergency",
    description: "24/7 emergency electrical repairs and troubleshooting",
    basePrice: 250,
    estimatedDuration: 60,
    icon: "AlertTriangle",
  },
  {
    id: "ev-charger",
    name: "EV Charger Installation",
    category: "electrical",
    description: "Electric vehicle charging station installation",
    basePrice: 800,
    estimatedDuration: 180,
    icon: "Battery",
  },
] as const

// Urgency levels
export const URGENCY_LEVELS = [
  { value: "LOW", label: "Low", description: "Not urgent, can be scheduled anytime", color: "text-gray-500" },
  { value: "MEDIUM", label: "Medium", description: "Within the next few days", color: "text-blue-500" },
  { value: "HIGH", label: "High", description: "Within 24 hours", color: "text-amber-500" },
  { value: "EMERGENCY", label: "Emergency", description: "Immediate assistance needed", color: "text-red-500" },
] as const

// Request status
export const REQUEST_STATUS = [
  { value: "PENDING", label: "Pending", color: "bg-gray-100 text-gray-700" },
  { value: "QUOTED", label: "Quoted", color: "bg-blue-100 text-blue-700" },
  { value: "ACCEPTED", label: "Accepted", color: "bg-emerald-100 text-emerald-700" },
  { value: "ASSIGNED", label: "Assigned", color: "bg-purple-100 text-purple-700" },
  { value: "IN_PROGRESS", label: "In Progress", color: "bg-amber-100 text-amber-700" },
  { value: "COMPLETED", label: "Completed", color: "bg-green-100 text-green-700" },
  { value: "CANCELLED", label: "Cancelled", color: "bg-red-100 text-red-700" },
  { value: "DISPUTED", label: "Disputed", color: "bg-orange-100 text-orange-700" },
] as const

// Specializations for technicians
export const SPECIALIZATIONS = [
  "Residential Electrical",
  "Commercial Electrical",
  "Industrial Electrical",
  "Solar Installation",
  "Solar Maintenance",
  "EV Charger Installation",
  "Smart Home Systems",
  "Emergency Repairs",
  "Panel Upgrades",
  "Lighting Design",
] as const

// US States
export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
] as const

// Navigation links
export const NAV_LINKS = {
  main: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  customer: [
    { href: "/customer/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/customer/requests", label: "My Requests", icon: "FileText" },
    { href: "/customer/requests/new", label: "New Request", icon: "Plus" },
    { href: "/customer/messages", label: "Messages", icon: "MessageSquare" },
    { href: "/customer/profile", label: "Profile", icon: "User" },
  ],
  technician: [
    { href: "/technician/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/technician/jobs", label: "Jobs", icon: "Briefcase" },
    { href: "/technician/schedule", label: "Schedule", icon: "Calendar" },
    { href: "/technician/earnings", label: "Earnings", icon: "DollarSign" },
    { href: "/technician/profile", label: "Profile", icon: "User" },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/admin/users", label: "Users", icon: "Users" },
    { href: "/admin/technicians", label: "Technicians", icon: "Wrench" },
    { href: "/admin/requests", label: "Requests", icon: "FileText" },
    { href: "/admin/payments", label: "Payments", icon: "CreditCard" },
    { href: "/admin/reports", label: "Reports", icon: "BarChart" },
    { href: "/admin/settings", label: "Settings", icon: "Settings" },
  ],
} as const

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    image: "/testimonials/sarah.jpg",
    rating: 5,
    comment: "OMIS Electrical did an amazing job installing solar panels on my roof. Professional, punctual, and the quality of work exceeded my expectations!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Owner",
    image: "/testimonials/michael.jpg",
    rating: 5,
    comment: "We needed emergency electrical repairs for our restaurant and they responded within an hour. Highly recommend their services!",
  },
  {
    id: 3,
    name: "Emily Williams",
    role: "Property Manager",
    image: "/testimonials/emily.jpg",
    rating: 5,
    comment: "I manage multiple properties and OMIS Electrical is my go-to for all electrical needs. Reliable, fair pricing, and excellent communication.",
  },
] as const

// FAQ items
export const FAQ_ITEMS = [
  {
    question: "How quickly can you respond to emergencies?",
    answer: "Our emergency response team is available 24/7 and typically arrives within 1-2 hours depending on your location. We prioritize safety and understand the urgency of electrical emergencies.",
  },
  {
    question: "Are your technicians licensed and insured?",
    answer: "Yes, all our technicians are fully licensed, insured, and background-checked. They undergo regular training to stay up-to-date with the latest electrical codes and solar technology.",
  },
  {
    question: "How much does solar panel installation cost?",
    answer: "The cost varies based on your energy needs, roof size, and system specifications. We offer free consultations and provide detailed quotes. Most homeowners see ROI within 5-7 years.",
  },
  {
    question: "Do you offer warranties on your work?",
    answer: "Yes, we offer a 1-year warranty on all electrical work and a 25-year warranty on solar panel installations. This covers both parts and labor.",
  },
  {
    question: "Can I track my service request?",
    answer: "Absolutely! Once you submit a request, you can track its status in real-time through your customer dashboard. You'll also receive notifications at each stage.",
  },
] as const
