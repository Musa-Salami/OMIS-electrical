// Type definitions for OMIS Electrical & Solar Installations

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN"
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION"
export type RequestStatus = "PENDING" | "QUOTED" | "ACCEPTED" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTED"
export type UrgencyLevel = "LOW" | "MEDIUM" | "HIGH" | "EMERGENCY"
export type PaymentStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "REFUNDED"

export interface User {
  id: string
  email: string
  name?: string
  role: UserRole
  status: UserStatus
  emailVerified?: Date
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: string
  userId: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  profileImg?: string
  user?: User
}

export interface Technician {
  id: string
  userId: string
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  state: string
  zipCode?: string
  profileImg?: string
  bio?: string
  specializations: string[]
  experienceYears: number
  ratingAverage: number
  totalJobs: number
  verified: boolean
  available: boolean
  serviceAreas: string[]
  hourlyRate?: number
  applicationStatus: string
  user?: User
  certifications?: Certification[]
}

export interface ServiceType {
  id: string
  name: string
  description: string
  category: string
  basePrice: number
  estimatedDuration: number
  icon?: string
  image?: string
  active: boolean
}

export interface ServiceRequest {
  id: string
  customerId: string
  technicianId?: string
  serviceTypeId: string
  status: RequestStatus
  description: string
  locationAddress: string
  locationLat?: number
  locationLng?: number
  urgencyLevel: UrgencyLevel
  preferredDate?: Date
  preferredTime?: string
  estimatedCost?: number
  finalCost?: number
  photos: string[]
  notes?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  customer?: Customer
  technician?: Technician
  serviceType?: ServiceType
  quotes?: Quote[]
  payments?: Payment[]
  reviews?: Review[]
}

export interface Quote {
  id: string
  requestId: string
  amount: number
  breakdown: Record<string, number>
  validUntil: Date
  accepted: boolean
  createdAt: Date
}

export interface Payment {
  id: string
  requestId: string
  amount: number
  method: string
  status: PaymentStatus
  transactionId?: string
  paidAt?: Date
  metadata?: Record<string, unknown>
}

export interface Review {
  id: string
  requestId: string
  customerId: string
  technicianId: string
  rating: number
  comment?: string
  createdAt: Date
  customer?: Customer
  technician?: Technician
}

export interface Certification {
  id: string
  technicianId: string
  name: string
  issuingBody: string
  issueDate: Date
  expiryDate?: Date
  documentUrl: string
  verified: boolean
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: string
  readStatus: boolean
  actionUrl?: string
  createdAt: Date
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  attachments: string[]
  readAt?: Date
  createdAt: Date
}

export interface Appointment {
  id: string
  requestId: string
  technicianId: string
  scheduledDate: Date
  scheduledTime: string
  durationMins: number
  status: string
  notes?: string
  createdAt: Date
}

// API Response types
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Form types
export interface ServiceRequestFormData {
  serviceTypeId: string
  description: string
  locationAddress: string
  locationLat?: number
  locationLng?: number
  urgencyLevel: UrgencyLevel
  preferredDate?: string
  preferredTime?: string
  photos?: File[]
}

export interface TechnicianApplicationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode?: string
  bio?: string
  specializations: string[]
  experienceYears: number
  serviceAreas: string[]
  hourlyRate?: number
  certifications?: {
    name: string
    issuingBody: string
    issueDate: string
    expiryDate?: string
    document?: File
  }[]
}

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  role: "CUSTOMER" | "TECHNICIAN"
}
