"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  UserPlus, 
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Wrench,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { serviceRequests } from "@/lib/mockData"

const mockRequests = serviceRequests.map(req => ({
  ...req,
  email: req.customerEmail,
  phone: req.customerPhone,
}))

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  quoted: { label: "Quoted", color: "bg-blue-100 text-blue-800", icon: AlertCircle },
  scheduled: { label: "Scheduled", color: "bg-purple-100 text-purple-800", icon: Calendar },
  in_progress: { label: "In Progress", color: "bg-orange-100 text-orange-800", icon: Wrench },
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-800", icon: XCircle },
}

const priorityConfig: Record<string, { label: string; color: string }> = {
  low: { label: "Low", color: "bg-slate-100 text-slate-600" },
  medium: { label: "Medium", color: "bg-blue-100 text-blue-600" },
  high: { label: "High", color: "bg-orange-100 text-orange-600" },
  urgent: { label: "Urgent", color: "bg-red-100 text-red-600" },
}

export default function AdminRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<typeof mockRequests[0] | null>(null)

  const filteredRequests = mockRequests.filter(req => {
    const matchesSearch = req.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.service.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || req.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockRequests.length,
    pending: mockRequests.filter(r => r.status === "pending").length,
    inProgress: mockRequests.filter(r => r.status === "in_progress").length,
    completed: mockRequests.filter(r => r.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">{stats.inProgress}</div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer, ID, or service..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "in_progress" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("in_progress")}
              >
                In Progress
              </Button>
              <Button
                variant={statusFilter === "scheduled" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("scheduled")}
              >
                Scheduled
              </Button>
              <Button
                variant={statusFilter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("completed")}
              >
                Completed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Requests List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Service Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRequests.map((request) => {
                  const status = statusConfig[request.status]
                  const priority = priorityConfig[request.priority]
                  const StatusIcon = status.icon

                  return (
                    <div
                      key={request.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedRequest?.id === request.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedRequest(request)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{request.id}</span>
                            <Badge className={priority.color} variant="secondary">
                              {priority.label}
                            </Badge>
                          </div>
                          <h3 className="font-medium">{request.service}</h3>
                          <p className="text-sm text-muted-foreground">{request.customer}</p>
                        </div>
                        <Badge className={status.color} variant="secondary">
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {request.createdAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {request.address.split(",")[0]}
                        </span>
                        {request.assignedTech && (
                          <span className="flex items-center gap-1">
                            <Wrench className="h-3 w-3" />
                            {request.assignedTech}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredRequests.length} of {mockRequests.length} requests
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request Details */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Request Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedRequest ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold">{selectedRequest.id}</span>
                      <Badge className={statusConfig[selectedRequest.status].color} variant="secondary">
                        {statusConfig[selectedRequest.status].label}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{selectedRequest.service}</h3>
                    <p className="text-2xl font-bold text-green-600">
                      ${selectedRequest.estimatedCost.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Customer Info</h4>
                    <div className="space-y-2">
                      <p className="font-medium">{selectedRequest.customer}</p>
                      <p className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {selectedRequest.email}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {selectedRequest.phone}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {selectedRequest.address}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Schedule</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Created:</span> {selectedRequest.createdAt}</p>
                      <p>
                        <span className="text-muted-foreground">Scheduled:</span>{" "}
                        {selectedRequest.scheduledDate || "Not scheduled"}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Technician:</span>{" "}
                        {selectedRequest.assignedTech || "Unassigned"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Button className="w-full" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Details
                    </Button>
                    {!selectedRequest.assignedTech && (
                      <Button variant="outline" className="w-full" size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Assign Technician
                      </Button>
                    )}
                    {selectedRequest.status === "in_progress" && (
                      <Button variant="outline" className="w-full text-green-600" size="sm">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a request to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
