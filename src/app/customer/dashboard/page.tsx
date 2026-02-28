"use client"

import Link from "next/link"
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  Plus,
  ArrowRight,
  Calendar,
  Star,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const stats = [
  {
    title: "Active Requests",
    value: "3",
    change: "+1 this week",
    icon: Wrench,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Pending Quotes",
    value: "2",
    change: "Awaiting response",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    title: "Completed Jobs",
    value: "12",
    change: "+3 this month",
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Total Spent",
    value: "$4,580",
    change: "Lifetime value",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

const recentRequests = [
  {
    id: "REQ-001",
    title: "Electrical Panel Upgrade",
    status: "in_progress",
    date: "Mar 15, 2024",
    technician: "Mike Johnson",
    avatar: "MJ",
  },
  {
    id: "REQ-002",
    title: "Solar Panel Installation",
    status: "quote_pending",
    date: "Mar 14, 2024",
    technician: null,
    avatar: null,
  },
  {
    id: "REQ-003",
    title: "Emergency Rewiring",
    status: "completed",
    date: "Mar 10, 2024",
    technician: "Sarah Williams",
    avatar: "SW",
  },
]

const upcomingAppointments = [
  {
    id: 1,
    title: "Panel Installation",
    date: "Tomorrow",
    time: "9:00 AM - 12:00 PM",
    technician: "Mike Johnson",
  },
  {
    id: 2,
    title: "Site Inspection",
    date: "Mar 20, 2024",
    time: "2:00 PM - 3:00 PM",
    technician: "Sarah Williams",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "in_progress":
      return <Badge variant="info">In Progress</Badge>
    case "quote_pending":
      return <Badge variant="warning">Quote Pending</Badge>
    case "completed":
      return <Badge variant="success">Completed</Badge>
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome back, John!</h2>
            <p className="text-blue-100">Track your service requests and manage your electrical needs.</p>
          </div>
          <Link href="/customer/requests/new">
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              <Plus className="h-4 w-4 mr-2" />
              New Service Request
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Requests */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Requests</CardTitle>
                <CardDescription>Your latest service requests</CardDescription>
              </div>
              <Link href="/customer/requests">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <Wrench className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{request.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{request.id}</span>
                          <span>•</span>
                          <span>{request.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {request.technician && (
                        <div className="hidden md:flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{request.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{request.technician}</span>
                        </div>
                      )}
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex gap-3 p-3 border rounded-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{appointment.title}</p>
                    <p className="text-xs text-muted-foreground">{appointment.date}</p>
                    <p className="text-xs text-muted-foreground">{appointment.time}</p>
                  </div>
                </div>
              ))}
              <Link href="/customer/appointments">
                <Button variant="outline" size="sm" className="w-full">
                  View Calendar
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/customer/requests/new">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  New Service Request
                </Button>
              </Link>
              <Link href="/customer/messages">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquareIcon className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </Link>
              <Link href="/customer/reviews">
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Leave a Review
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Alert */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                <div>
                  <p className="font-medium text-amber-900 text-sm">Action Required</p>
                  <p className="text-xs text-amber-700 mt-1">
                    You have 2 pending quotes waiting for your approval.
                  </p>
                  <Link href="/customer/quotes">
                    <Button variant="link" size="sm" className="p-0 h-auto text-amber-700 mt-2">
                      View Quotes →
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
