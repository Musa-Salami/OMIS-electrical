"use client"

import Link from "next/link"
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  Calendar,
  Star,
  TrendingUp,
  MapPin,
  ArrowRight,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { technicianJobs, availableJobs, techEarningsMonthly, techPendingPayments, technicians } from "@/lib/mockData"

const currentTech = technicians.find(t => t.id === "TECH-001")!
const currentMonthEarnings = techEarningsMonthly[techEarningsMonthly.length - 1].amount

const stats = [
  {
    title: "Active Jobs",
    value: String(currentTech.activeJobs),
    change: `${technicianJobs.length} assigned`,
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Pending Quotes",
    value: String(techPendingPayments.length),
    change: "Awaiting customer",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    title: "Completed Jobs",
    value: String(currentTech.completedJobs),
    change: "Total completed",
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "This Month",
    value: `$${currentMonthEarnings.toLocaleString()}`,
    change: "Current earnings",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

const todaysJobs = technicianJobs.map(job => ({
  id: job.id,
  title: job.service,
  customer: job.customer,
  time: "9:00 AM - 12:00 PM",
  address: job.address,
  status: job.status,
  payment: `$${job.estimatedPay.toLocaleString()}`,
}))

const newRequests = availableJobs.map(job => ({
  id: job.id,
  title: job.service,
  customer: job.customer,
  urgency: job.urgency,
  location: job.address.split(",").slice(-2).join(",").trim(),
  posted: job.postedDate,
  estimatedValue: `$${job.estimatedPay.toLocaleString()}`,
}))

const getStatusBadge = (status: string) => {
  switch (status) {
    case "in_progress":
      return <Badge variant="info">In Progress</Badge>
    case "scheduled":
      return <Badge variant="secondary">Scheduled</Badge>
    case "completed":
      return <Badge variant="success">Completed</Badge>
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

const getUrgencyBadge = (urgency: string) => {
  switch (urgency) {
    case "emergency":
      return <Badge variant="destructive">Emergency</Badge>
    case "urgent":
      return <Badge variant="warning">Urgent</Badge>
    case "standard":
      return <Badge variant="default">Standard</Badge>
    case "flexible":
      return <Badge variant="secondary">Flexible</Badge>
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

export default function TechnicianDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Good morning, {currentTech.name.split(" ")[0]}!</h2>
            <p className="text-slate-300">You have {technicianJobs.length} jobs assigned and {availableJobs.length} new requests waiting.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-slate-400">Your Rating</p>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-xl font-bold">{currentTech.rating}</span>
                <span className="text-sm text-slate-400">({currentTech.completedJobs} reviews)</span>
              </div>
            </div>
          </div>
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
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today&apos;s Schedule</CardTitle>
                <CardDescription>Your jobs for today</CardDescription>
              </div>
              <Link href="/technician/schedule">
                <Button variant="ghost" size="sm">
                  View Calendar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                      <Briefcase className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{job.title}</p>
                        {getStatusBadge(job.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {job.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.address}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-600">{job.payment}</p>
                    <p className="text-xs text-muted-foreground">{job.customer}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* New Job Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>New Requests</CardTitle>
                <CardDescription>Job requests in your area</CardDescription>
              </div>
              <Link href="/technician/jobs/available">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {newRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{request.title}</h4>
                        {getUrgencyBadge(request.urgency)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{request.customer}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{request.posted}</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {request.location}
                      </span>
                      <span className="font-medium text-emerald-600">{request.estimatedValue}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm">Send Quote</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Earnings Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-xl font-bold text-emerald-600">${Math.round(currentMonthEarnings / 4).toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pending Payments</span>
                  <span className="font-medium">${techPendingPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Jobs This Week</span>
                  <span className="font-medium">6</span>
                </div>
              </div>
              <Link href="/technician/earnings">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Response Rate</span>
                  <span className="font-medium text-emerald-600">98%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="w-[98%] h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">On-Time Rate</span>
                  <span className="font-medium text-emerald-600">95%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="w-[95%] h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-medium text-emerald-600">100%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="w-full h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 shrink-0" />
                <div>
                  <p className="font-medium text-blue-900 text-sm">Certification Reminder</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Your electrician license expires in 30 days. Please renew to continue accepting jobs.
                  </p>
                  <Link href="/technician/settings/certifications">
                    <Button variant="link" size="sm" className="p-0 h-auto text-blue-700 mt-2">
                      Update Certifications →
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
