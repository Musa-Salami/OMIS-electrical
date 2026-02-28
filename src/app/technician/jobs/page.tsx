"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Search,
  Filter,
  Eye,
  Send,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Wrench
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { technicianJobs, completedJobs, availableJobs as mockAvailableJobs } from "@/lib/mockData"

const mockJobs = [
  ...technicianJobs.map(j => ({
    id: j.id,
    requestId: j.requestId,
    customer: j.customer,
    initials: j.customerInitials,
    service: j.service,
    address: j.address,
    scheduledDate: j.scheduledDate,
    status: j.status,
    priority: j.priority,
    estimatedPay: j.estimatedPay,
    estimatedDuration: j.estimatedDuration,
  })),
  ...completedJobs.map(j => ({
    id: j.id,
    requestId: j.requestId,
    customer: j.customer,
    initials: j.customerInitials,
    service: j.service,
    address: j.address,
    scheduledDate: j.completedDate,
    status: j.status,
    priority: "medium" as const,
    estimatedPay: j.payment,
    estimatedDuration: "2-3 hours",
  })),
]

const availableJobs = mockAvailableJobs

const statusConfig: Record<string, { label: string; color: string }> = {
  scheduled: { label: "Scheduled", color: "bg-purple-100 text-purple-800" },
  in_progress: { label: "In Progress", color: "bg-orange-100 text-orange-800" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800" },
}

const priorityConfig: Record<string, { label: string; color: string }> = {
  low: { label: "Low", color: "bg-slate-100 text-slate-600" },
  medium: { label: "Medium", color: "bg-blue-100 text-blue-600" },
  high: { label: "High", color: "bg-orange-100 text-orange-600" },
  urgent: { label: "Urgent", color: "bg-red-100 text-red-600" },
}

export default function TechnicianJobsPage() {
  const [activeTab, setActiveTab] = useState<"my" | "available">("my")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredJobs = mockJobs.filter(job =>
    job.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.customer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Jobs</h1>
          <p className="text-muted-foreground">Manage your assigned and available jobs</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "my" ? "border-blue-600 text-blue-600" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("my")}
        >
          My Jobs ({mockJobs.length})
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "available" ? "border-blue-600 text-blue-600" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("available")}
        >
          Available Jobs ({availableJobs.length})
        </button>
      </div>

      {activeTab === "my" ? (
        <>
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const status = statusConfig[job.status]
              const priority = priorityConfig[job.priority]

              return (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {job.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{job.service}</h3>
                            <Badge className={priority.color} variant="secondary">{priority.label}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{job.customer} • {job.id}</p>
                        </div>
                      </div>
                      <Badge className={status.color} variant="secondary">{status.label}</Badge>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.address}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {job.scheduledDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {job.estimatedDuration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <p className="font-semibold text-green-600 flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        ${job.estimatedPay.toLocaleString()}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {job.status === "scheduled" && (
                          <Button size="sm">
                            <Wrench className="h-4 w-4 mr-2" />
                            Start Job
                          </Button>
                        )}
                        {job.status === "in_progress" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </>
      ) : (
        /* Available Jobs */
        <div className="space-y-4">
          {availableJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{job.service}</h3>
                    <p className="text-sm text-muted-foreground">{job.customer}</p>
                  </div>
                  <Badge className={priorityConfig[job.urgency]?.color || "bg-gray-100"} variant="secondary">
                    {job.urgency}
                  </Badge>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.address} ({job.distance})
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Posted {job.postedDate}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <p className="font-semibold text-green-600 flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    ${job.estimatedPay.toLocaleString()} est.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Send Quote
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
