"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight,
  UserCog,
  Wrench,
  CheckCircle2,
  Clock,
  Award,
  Zap,
  Sun,
  Filter,
  MoreVertical
} from "lucide-react"

const mockTechnicians = [
  {
    id: "TECH-001",
    name: "Mike Wilson",
    email: "mike.w@omis.com",
    phone: "(555) 111-2222",
    address: "Austin, TX",
    joinedDate: "2022-03-15",
    status: "available",
    rating: 4.9,
    completedJobs: 156,
    activeJobs: 2,
    specializations: ["Solar Installation", "Electrical Panels"],
    certifications: ["NABCEP", "Master Electrician"],
    avatar: null,
  },
  {
    id: "TECH-002",
    name: "James Brown",
    email: "james.b@omis.com",
    phone: "(555) 222-3333",
    address: "Austin, TX",
    joinedDate: "2021-08-20",
    status: "busy",
    rating: 4.8,
    completedJobs: 234,
    activeJobs: 3,
    specializations: ["Emergency Repairs", "Commercial Electrical"],
    certifications: ["Journeyman Electrician"],
    avatar: null,
  },
  {
    id: "TECH-003",
    name: "Tom Harris",
    email: "tom.h@omis.com",
    phone: "(555) 333-4444",
    address: "Round Rock, TX",
    joinedDate: "2023-01-10",
    status: "available",
    rating: 4.7,
    completedJobs: 89,
    activeJobs: 1,
    specializations: ["Residential Wiring", "EV Chargers"],
    certifications: ["Journeyman Electrician", "EV Certified"],
    avatar: null,
  },
  {
    id: "TECH-004",
    name: "David Lee",
    email: "david.l@omis.com",
    phone: "(555) 444-5555",
    address: "Cedar Park, TX",
    joinedDate: "2023-06-01",
    status: "off_duty",
    rating: 4.6,
    completedJobs: 45,
    activeJobs: 0,
    specializations: ["Solar Maintenance", "Inspections"],
    certifications: ["NABCEP Associate"],
    avatar: null,
  },
  {
    id: "TECH-005",
    name: "Carlos Martinez",
    email: "carlos.m@omis.com",
    phone: "(555) 555-6666",
    address: "Pflugerville, TX",
    joinedDate: "2022-11-15",
    status: "available",
    rating: 5.0,
    completedJobs: 112,
    activeJobs: 1,
    specializations: ["Commercial Solar", "Panel Upgrades"],
    certifications: ["NABCEP", "Master Electrician", "OSHA 30"],
    avatar: null,
  },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  available: { label: "Available", color: "bg-green-100 text-green-800" },
  busy: { label: "Busy", color: "bg-orange-100 text-orange-800" },
  off_duty: { label: "Off Duty", color: "bg-gray-100 text-gray-800" },
  on_leave: { label: "On Leave", color: "bg-blue-100 text-blue-800" },
}

export default function AdminTechniciansPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTech, setSelectedTech] = useState<typeof mockTechnicians[0] | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTechnicians = mockTechnicians.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tech.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tech.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tech.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || tech.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockTechnicians.length,
    available: mockTechnicians.filter(t => t.status === "available").length,
    busy: mockTechnicians.filter(t => t.status === "busy").length,
    totalJobs: mockTechnicians.reduce((sum, t) => sum + t.completedJobs, 0),
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserCog className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-sm text-muted-foreground">Total Technicians</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.available}</div>
                <p className="text-sm text-muted-foreground">Available Now</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.busy}</div>
                <p className="text-sm text-muted-foreground">Currently Busy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Wrench className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.totalJobs}</div>
                <p className="text-sm text-muted-foreground">Jobs Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search technicians by name, skill, or ID..."
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
                variant={statusFilter === "available" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("available")}
              >
                Available
              </Button>
              <Button
                variant={statusFilter === "busy" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("busy")}
              >
                Busy
              </Button>
              <Button
                variant={statusFilter === "off_duty" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("off_duty")}
              >
                Off Duty
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Technicians List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Technicians</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Technician
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredTechnicians.map((tech) => {
                  const status = statusConfig[tech.status]

                  return (
                    <div
                      key={tech.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedTech?.id === tech.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedTech(tech)}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={tech.avatar || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                            {tech.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{tech.name}</h3>
                              <Badge className={status.color} variant="secondary">
                                {status.label}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="font-medium">{tech.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{tech.id}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {tech.specializations.slice(0, 2).map((spec) => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                            {tech.specializations.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{tech.specializations.length - 2}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              {tech.completedJobs} completed
                            </span>
                            {tech.activeJobs > 0 && (
                              <span className="flex items-center gap-1 text-orange-600">
                                <Clock className="h-3 w-3" />
                                {tech.activeJobs} active
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTechnicians.length} of {mockTechnicians.length} technicians
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

        {/* Technician Details */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Technician Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTech ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-3">
                      <AvatarImage src={selectedTech.avatar || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-xl">
                        {selectedTech.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{selectedTech.name}</h3>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <Badge className={statusConfig[selectedTech.status].color} variant="secondary">
                        {statusConfig[selectedTech.status].label}
                      </Badge>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium">{selectedTech.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTech.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTech.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTech.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {selectedTech.joinedDate}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      Specializations
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedTech.specializations.map((spec) => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedTech.certifications.map((cert) => (
                        <Badge key={cert} className="text-xs bg-amber-100 text-amber-800">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{selectedTech.completedJobs}</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{selectedTech.activeJobs}</p>
                      <p className="text-xs text-muted-foreground">Active Jobs</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Button className="w-full" size="sm">
                      View Full Profile
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Assign to Job
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <UserCog className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a technician to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
