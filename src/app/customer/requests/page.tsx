"use client"

import Link from "next/link"
import { useState } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  Wrench,
  Eye,
  Calendar,
  MapPin
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const requests = [
  {
    id: "REQ-001",
    title: "Electrical Panel Upgrade",
    description: "Upgrade from 100A to 200A panel for home expansion",
    serviceType: "Panel Upgrade",
    status: "in_progress",
    urgency: "standard",
    date: "Mar 15, 2024",
    address: "123 Oak Street, Austin, TX",
    technician: { name: "Mike Johnson", avatar: "MJ" },
    estimatedCost: "$2,500",
  },
  {
    id: "REQ-002",
    title: "Solar Panel Installation",
    description: "Install 20-panel solar system with battery backup",
    serviceType: "Solar Installation",
    status: "quote_pending",
    urgency: "standard",
    date: "Mar 14, 2024",
    address: "456 Elm Ave, Austin, TX",
    technician: null,
    estimatedCost: "Pending",
  },
  {
    id: "REQ-003",
    title: "Emergency Rewiring",
    description: "Rewiring after water damage in basement",
    serviceType: "Rewiring",
    status: "completed",
    urgency: "emergency",
    date: "Mar 10, 2024",
    address: "789 Pine Rd, Austin, TX",
    technician: { name: "Sarah Williams", avatar: "SW" },
    estimatedCost: "$1,800",
  },
  {
    id: "REQ-004",
    title: "Outdoor Lighting Setup",
    description: "Install landscape lighting in backyard",
    serviceType: "Lighting",
    status: "scheduled",
    urgency: "flexible",
    date: "Mar 8, 2024",
    address: "321 Maple St, Austin, TX",
    technician: { name: "David Chen", avatar: "DC" },
    estimatedCost: "$950",
  },
  {
    id: "REQ-005",
    title: "EV Charger Installation",
    description: "Install Level 2 EV charger in garage",
    serviceType: "EV Charger",
    status: "pending",
    urgency: "standard",
    date: "Mar 5, 2024",
    address: "654 Cedar Ln, Austin, TX",
    technician: null,
    estimatedCost: "Pending",
  },
]

const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { variant: "default" | "success" | "warning" | "info" | "pending" | "destructive"; label: string }> = {
    pending: { variant: "pending", label: "Pending" },
    quote_pending: { variant: "warning", label: "Quote Pending" },
    scheduled: { variant: "info", label: "Scheduled" },
    in_progress: { variant: "default", label: "In Progress" },
    completed: { variant: "success", label: "Completed" },
    cancelled: { variant: "destructive", label: "Cancelled" },
  }
  const { variant, label } = statusMap[status] || { variant: "default", label: status }
  return <Badge variant={variant}>{label}</Badge>
}

const getUrgencyBadge = (urgency: string) => {
  const urgencyMap: Record<string, { variant: "default" | "destructive" | "warning" | "secondary"; label: string }> = {
    emergency: { variant: "destructive", label: "Emergency" },
    urgent: { variant: "warning", label: "Urgent" },
    standard: { variant: "default", label: "Standard" },
    flexible: { variant: "secondary", label: "Flexible" },
  }
  const { variant, label } = urgencyMap[urgency] || { variant: "default", label: urgency }
  return <Badge variant={variant}>{label}</Badge>
}

export default function CustomerRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || request.status === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Requests</h1>
          <p className="text-muted-foreground">Manage and track your service requests</p>
        </div>
        <Link href="/customer/requests/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No requests found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? "Try a different search term" : "You haven't made any service requests yet"}
                  </p>
                  <Link href="/customer/requests/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Request
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Icon */}
                      <div className="hidden lg:flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                        <Wrench className="h-6 w-6 text-blue-600" />
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{request.title}</h3>
                          <span className="text-sm text-muted-foreground">#{request.id}</span>
                          {getStatusBadge(request.status)}
                          {getUrgencyBadge(request.urgency)}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{request.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {request.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {request.address}
                          </div>
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="flex items-center gap-4">
                        {request.technician && (
                          <div className="hidden md:flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">{request.technician.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <p className="font-medium">{request.technician.name}</p>
                              <p className="text-muted-foreground">Assigned</p>
                            </div>
                          </div>
                        )}
                        <div className="text-right">
                          <p className="font-semibold">{request.estimatedCost}</p>
                          <p className="text-xs text-muted-foreground">Est. Cost</p>
                        </div>
                        <Link href={`/customer/requests/${request.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
