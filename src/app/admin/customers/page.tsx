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
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  DollarSign,
  Wrench,
  Star,
  ChevronLeft,
  ChevronRight,
  Users,
  UserPlus,
  TrendingUp,
  Filter
} from "lucide-react"

const mockCustomers = [
  {
    id: "CUS-001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Austin, TX 78701",
    joinedDate: "2024-03-15",
    totalSpent: 28500,
    totalRequests: 5,
    activeRequests: 1,
    status: "active",
    rating: 4.8,
    avatar: null,
  },
  {
    id: "CUS-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 234-5678",
    address: "456 Oak Ave, Austin, TX 78702",
    joinedDate: "2024-06-20",
    totalSpent: 15200,
    totalRequests: 3,
    activeRequests: 1,
    status: "active",
    rating: 5.0,
    avatar: null,
  },
  {
    id: "CUS-003",
    name: "Robert Davis",
    email: "robert.d@example.com",
    phone: "(555) 345-6789",
    address: "789 Pine Rd, Austin, TX 78703",
    joinedDate: "2024-01-10",
    totalSpent: 42000,
    totalRequests: 8,
    activeRequests: 0,
    status: "active",
    rating: 4.5,
    avatar: null,
  },
  {
    id: "CUS-004",
    name: "Emily Chen",
    email: "emily.c@example.com",
    phone: "(555) 456-7890",
    address: "321 Elm St, Austin, TX 78704",
    joinedDate: "2025-01-05",
    totalSpent: 2200,
    totalRequests: 1,
    activeRequests: 1,
    status: "new",
    rating: null,
    avatar: null,
  },
  {
    id: "CUS-005",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "(555) 567-8901",
    address: "654 Maple Dr, Austin, TX 78705",
    joinedDate: "2023-11-20",
    totalSpent: 67800,
    totalRequests: 12,
    activeRequests: 2,
    status: "vip",
    rating: 4.9,
    avatar: null,
  },
  {
    id: "CUS-006",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "(555) 678-9012",
    address: "987 Cedar Ln, Austin, TX 78706",
    joinedDate: "2024-08-15",
    totalSpent: 500,
    totalRequests: 1,
    activeRequests: 0,
    status: "inactive",
    rating: 3.0,
    avatar: null,
  },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Active", color: "bg-green-100 text-green-800" },
  new: { label: "New", color: "bg-blue-100 text-blue-800" },
  vip: { label: "VIP", color: "bg-purple-100 text-purple-800" },
  inactive: { label: "Inactive", color: "bg-gray-100 text-gray-800" },
}

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null)

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: mockCustomers.length,
    active: mockCustomers.filter(c => c.status === "active" || c.status === "vip").length,
    newThisMonth: mockCustomers.filter(c => c.status === "new").length,
    totalRevenue: mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0),
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.active}</div>
                <p className="text-sm text-muted-foreground">Active Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UserPlus className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.newThisMonth}</div>
                <p className="text-sm text-muted-foreground">New This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">${(stats.totalRevenue / 1000).toFixed(0)}k</div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
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
                placeholder="Search customers by name, email, or ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customers List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredCustomers.map((customer) => {
                  const status = statusConfig[customer.status]

                  return (
                    <div
                      key={customer.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedCustomer?.id === customer.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={customer.avatar || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                            {customer.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold truncate">{customer.name}</h3>
                              <Badge className={status.color} variant="secondary">
                                {status.label}
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">{customer.id}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Wrench className="h-3 w-3" />
                              {customer.totalRequests} requests
                            </span>
                            <span className="flex items-center gap-1 text-green-600 font-medium">
                              <DollarSign className="h-3 w-3" />
                              ${customer.totalSpent.toLocaleString()}
                            </span>
                            {customer.rating && (
                              <span className="flex items-center gap-1 text-amber-600">
                                <Star className="h-3 w-3 fill-current" />
                                {customer.rating}
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
                  Showing {filteredCustomers.length} of {mockCustomers.length} customers
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

        {/* Customer Details */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Customer Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCustomer ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-3">
                      <AvatarImage src={selectedCustomer.avatar || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xl">
                        {selectedCustomer.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{selectedCustomer.name}</h3>
                    <Badge className={statusConfig[selectedCustomer.status].color} variant="secondary">
                      {statusConfig[selectedCustomer.status].label}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{selectedCustomer.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {selectedCustomer.joinedDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        ${selectedCustomer.totalSpent.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Total Spent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{selectedCustomer.totalRequests}</p>
                      <p className="text-xs text-muted-foreground">Total Requests</p>
                    </div>
                  </div>

                  {selectedCustomer.activeRequests > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">{selectedCustomer.activeRequests}</span> active request(s)
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 pt-4 border-t">
                    <Button className="w-full" size="sm">
                      View Full Profile
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      View Requests
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a customer to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
