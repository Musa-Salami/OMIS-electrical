"use client"

import Link from "next/link"
import { 
  Users, 
  Wrench, 
  UserCog,
  DollarSign, 
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Calendar
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  adminDashboardStats,
  adminRecentRequests,
  adminTopTechnicians,
  adminPendingApplications,
  customers,
} from "@/lib/mockData"

const formatCurrency = (value: number) =>
  value >= 1000 ? `$${value.toLocaleString()}` : `$${value}`

const stats = [
  {
    title: "Total Revenue",
    value: formatCurrency(adminDashboardStats.totalRevenue),
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Active Requests",
    value: String(adminDashboardStats.activeRequests),
    change: "+8",
    trend: "up",
    icon: Wrench,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Total Customers",
    value: customers.length.toLocaleString(),
    change: "+15%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Active Technicians",
    value: String(adminDashboardStats.totalTechnicians),
    change: "+3",
    trend: "up",
    icon: UserCog,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
]

const recentRequests = adminRecentRequests.map((r) => ({
  id: r.id,
  customer: r.customer,
  service: r.service,
  status: r.status,
  value: formatCurrency(r.estimatedCost),
  date: r.createdAt,
}))

const pendingApplications = adminPendingApplications.map((app, index) => ({
  id: index + 1,
  name: app.name,
  specialty: app.specialty,
  experience: app.experience,
  date: app.appliedDate,
}))

const topTechnicians = adminTopTechnicians.map((t) => ({
  name: t.name,
  jobs: t.jobs,
  rating: t.rating,
  earnings: formatCurrency(t.earnings),
}))

const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { variant: "default" | "success" | "warning" | "info" | "pending" | "destructive"; label: string; icon: typeof Clock }> = {
    pending: { variant: "pending", label: "Pending", icon: Clock },
    quote_sent: { variant: "info", label: "Quote Sent", icon: Clock },
    quoted: { variant: "info", label: "Quoted", icon: Clock },
    scheduled: { variant: "warning", label: "Scheduled", icon: Calendar },
    in_progress: { variant: "default", label: "In Progress", icon: Wrench },
    completed: { variant: "success", label: "Completed", icon: CheckCircle },
    cancelled: { variant: "destructive", label: "Cancelled", icon: XCircle },
  }
  const config = statusMap[status] || { variant: "default", label: status, icon: Clock }
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
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
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
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
                <CardDescription>Latest service requests from customers</CardDescription>
              </div>
              <Link href="/admin/requests">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-sm text-muted-foreground">
                      <th className="text-left font-medium pb-3">Request</th>
                      <th className="text-left font-medium pb-3">Customer</th>
                      <th className="text-left font-medium pb-3">Status</th>
                      <th className="text-right font-medium pb-3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((request) => (
                      <tr key={request.id} className="border-b last:border-0">
                        <td className="py-3">
                          <div>
                            <p className="font-medium text-sm">{request.service}</p>
                            <p className="text-xs text-muted-foreground">#{request.id} • {request.date}</p>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="text-sm">{request.customer}</span>
                        </td>
                        <td className="py-3">
                          {getStatusBadge(request.status)}
                        </td>
                        <td className="py-3 text-right">
                          <span className="font-medium">{request.value}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Pending Applications</CardTitle>
              <Badge variant="warning">5 new</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{app.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{app.name}</p>
                      <p className="text-xs text-muted-foreground">{app.specialty}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Review</Button>
                </div>
              ))}
              <Link href="/admin/applications">
                <Button variant="outline" size="sm" className="w-full">
                  View All Applications
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Top Technicians */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Technicians</CardTitle>
              <CardDescription>This month&apos;s best performers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topTechnicians.map((tech, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      index === 0 ? "bg-yellow-100 text-yellow-700" :
                      index === 1 ? "bg-gray-100 text-gray-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{tech.name}</p>
                      <p className="text-xs text-muted-foreground">{tech.jobs} jobs • ⭐ {tech.rating}</p>
                    </div>
                  </div>
                  <span className="font-medium text-sm text-emerald-600">{tech.earnings}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                <div>
                  <p className="font-medium text-amber-900 text-sm">System Alert</p>
                  <p className="text-xs text-amber-700 mt-1">
                    3 technician certifications are expiring within the next 7 days.
                  </p>
                  <Link href="/admin/technicians?filter=expiring">
                    <Button variant="link" size="sm" className="p-0 h-auto text-amber-700 mt-2">
                      View Details →
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
