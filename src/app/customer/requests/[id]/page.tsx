"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { getRequestById, technicians, quotes } from "@/lib/mockData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Wrench,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  FileText,
  Star,
  Camera
} from "lucide-react"

function getRequestDetail(id: string) {
  const req = getRequestById(id)
  if (!req) return null

  const tech = req.techId ? technicians.find(t => t.id === req.techId) : null
  const quote = quotes.find(q => q.requestId === req.id)

  return {
    id: req.id,
    title: `${req.service} - ${req.address.split(",")[0]}`,
    service: req.service,
    status: req.status,
    priority: req.priority,
    createdAt: req.createdAt,
    scheduledDate: req.scheduledDate,
    completedDate: req.status === "completed" ? req.scheduledDate : null,
    description: req.description,
    address: req.address,
    estimatedCost: req.estimatedCost,
    urgency: req.priority === "urgent" ? "Urgent" : req.priority === "high" ? "High" : req.priority === "medium" ? "Medium" : "Low",
    technician: tech ? {
      name: tech.name,
      initials: tech.initials,
      phone: tech.phone,
      email: tech.email,
      rating: tech.rating,
      completedJobs: tech.completedJobs,
    } : null,
    timeline: [
      { date: req.createdAt, status: "Request Submitted", description: "Your service request has been received." },
      ...(quote ? [{ date: quote.submittedDate, status: "Quote Sent", description: `${tech?.name || "Technician"} sent a quote for $${req.estimatedCost.toLocaleString()}.` }] : []),
      ...(quote?.status === "accepted" ? [{ date: quote.submittedDate, status: "Quote Accepted", description: "You accepted the quote." }] : []),
      ...(req.scheduledDate ? [{ date: req.scheduledDate, status: "Service Scheduled", description: `Service scheduled for ${req.scheduledDate}.` }] : []),
    ],
    photos: [] as string[],
    quoteBreakdown: quote?.breakdown || [],
  }
}

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  quoted: { label: "Quote Received", color: "bg-blue-100 text-blue-800" },
  in_progress: { label: "In Progress", color: "bg-orange-100 text-orange-800" },
  scheduled: { label: "Scheduled", color: "bg-purple-100 text-purple-800" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-800" },
}

export default function RequestDetailPage() {
  const params = useParams()
  const requestId = typeof params.id === "string" ? params.id : params.id?.[0] || "REQ-001"
  const request = getRequestDetail(requestId) || getRequestDetail("REQ-001")!
  const status = statusConfig[request.status] || statusConfig.pending

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link href="/customer/requests" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Requests
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{request.id}</h1>
            <Badge className={status.color} variant="secondary">{status.label}</Badge>
            <Badge className="bg-orange-100 text-orange-800" variant="secondary">{request.urgency} Priority</Badge>
          </div>
          <p className="text-muted-foreground mt-1">{request.title}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message Technician
          </Button>
          <Button variant="outline" size="sm" className="text-red-600">
            Cancel Request
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Service Type</p>
                  <p className="font-medium flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-blue-600" />
                    {request.service}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Estimated Cost</p>
                  <p className="font-medium flex items-center gap-2 text-green-600">
                    <DollarSign className="h-4 w-4" />
                    ${request.estimatedCost.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Scheduled Date</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    {request.scheduledDate || "Not scheduled"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Service Address</p>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    {request.address}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm">{request.description}</p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">Photos</p>
                <div className="flex gap-3">
                  <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground hover:bg-gray-50 cursor-pointer">
                    <Camera className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">No photos uploaded yet</p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {request.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === request.timeline.length - 1
                          ? "bg-blue-600 text-white"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {index === request.timeline.length - 1 ? (
                          <Clock className="h-4 w-4" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </div>
                      {index < request.timeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-200" />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assigned Technician */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assigned Technician</CardTitle>
            </CardHeader>
            <CardContent>
              {request.technician ? (
                <>
                  <div className="text-center mb-4">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-lg">
                        {request.technician.initials}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{request.technician.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-amber-500 text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      {request.technician.rating} • {request.technician.completedJobs} jobs
                    </div>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{request.technician.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{request.technician.email}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </>
              ) : (
                <p className="text-center text-muted-foreground py-4">No technician assigned yet</p>
              )}
            </CardContent>
          </Card>

          {/* Quote Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quote Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {request.quoteBreakdown.length > 0 ? (
                <div className="space-y-3">
                  {request.quoteBreakdown.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.item}</span>
                      <span>${item.cost.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold pt-3 border-t">
                    <span>Total</span>
                    <span className="text-green-600">${request.estimatedCost.toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No quote available yet</p>
              )}
              <Button variant="outline" className="w-full mt-4" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                View Full Quote
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                Report an Issue
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
