"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  User,
  Wrench,
  Sun,
  Moon
} from "lucide-react"

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const mockSchedule = [
  {
    id: 1,
    date: "2026-03-02",
    dayLabel: "Mon",
    jobs: [
      { time: "9:00 AM", duration: "2h", service: "Solar Maintenance", customer: "Patricia Lewis", address: "555 River Rd", status: "scheduled" },
      { time: "2:00 PM", duration: "3h", service: "Panel Inspection", customer: "William Garcia", address: "987 Cedar Ln", status: "scheduled" },
    ]
  },
  {
    id: 2,
    date: "2026-03-03",
    dayLabel: "Tue",
    jobs: []
  },
  {
    id: 3,
    date: "2026-03-04",
    dayLabel: "Wed",
    jobs: [
      { time: "8:00 AM", duration: "Full day", service: "Solar Installation (Day 1)", customer: "John Smith", address: "123 Main St", status: "scheduled" },
    ]
  },
  {
    id: 4,
    date: "2026-03-05",
    dayLabel: "Thu",
    jobs: [
      { time: "8:00 AM", duration: "Full day", service: "Solar Installation (Day 2)", customer: "John Smith", address: "123 Main St", status: "scheduled" },
    ]
  },
  {
    id: 5,
    date: "2026-03-06",
    dayLabel: "Fri",
    jobs: [
      { time: "8:00 AM", duration: "4h", service: "Solar Installation (Day 3)", customer: "John Smith", address: "123 Main St", status: "scheduled" },
      { time: "2:00 PM", duration: "2h", service: "EV Charger Inspection", customer: "Emily Chen", address: "321 Elm St", status: "pending" },
    ]
  },
  {
    id: 6,
    date: "2026-03-07",
    dayLabel: "Sat",
    jobs: []
  },
  {
    id: 7,
    date: "2026-03-08",
    dayLabel: "Sun",
    jobs: []
  },
]

const upcomingAppointments = [
  { date: "Mar 2", time: "9:00 AM", service: "Solar Maintenance", customer: "Patricia Lewis" },
  { date: "Mar 4-6", time: "8:00 AM", service: "Solar Installation", customer: "John Smith" },
  { date: "Mar 10", time: "10:00 AM", service: "Residential Wiring", customer: "Nancy Clark" },
  { date: "Mar 15", time: "9:00 AM", service: "Panel Upgrade", customer: "Daniel Thompson" },
]

export default function TechnicianSchedulePage() {
  const [weekOffset, setWeekOffset] = useState(0)
  const currentWeekLabel = weekOffset === 0 ? "This Week" : weekOffset === 1 ? "Next Week" : `Week +${weekOffset}`

  const totalHoursThisWeek = 32
  const scheduledJobs = mockSchedule.reduce((acc, day) => acc + day.jobs.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Schedule</h1>
          <p className="text-muted-foreground">Manage your weekly schedule and appointments</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Set Availability
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{scheduledJobs}</div>
            <p className="text-sm text-muted-foreground">Jobs This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalHoursThisWeek}h</div>
            <p className="text-sm text-muted-foreground">Scheduled Hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">2</div>
            <p className="text-sm text-muted-foreground">Days Available</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{currentWeekLabel} — Mar 2-8, 2026</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setWeekOffset(0)}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => setWeekOffset(weekOffset + 1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSchedule.map((day) => (
                  <div key={day.id} className="flex gap-4">
                    <div className="w-20 pt-1">
                      <p className="font-semibold text-sm">{day.dayLabel}</p>
                      <p className="text-xs text-muted-foreground">{day.date.split("-").slice(1).join("/")}</p>
                    </div>
                    <div className="flex-1">
                      {day.jobs.length > 0 ? (
                        <div className="space-y-2">
                          {day.jobs.map((job, i) => (
                            <div
                              key={i}
                              className={`p-3 rounded-lg border-l-4 ${
                                job.status === "pending"
                                  ? "border-l-yellow-500 bg-yellow-50"
                                  : "border-l-blue-500 bg-blue-50"
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-sm">{job.service}</p>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {job.time} ({job.duration})
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <User className="h-3 w-3" />
                                      {job.customer}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {job.address}
                                    </span>
                                  </div>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {job.status === "pending" ? "Pending" : "Confirmed"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg border border-dashed text-center">
                          <p className="text-sm text-muted-foreground">No jobs scheduled</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAppointments.map((apt, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{apt.service}</p>
                      <p className="text-xs text-muted-foreground">{apt.date} • {apt.time}</p>
                      <p className="text-xs text-muted-foreground">{apt.customer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Working Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map(day => (
                  <div key={day} className="flex items-center justify-between py-1">
                    <span className="font-medium">{day}</span>
                    <span className="text-muted-foreground">7:00 AM - 5:00 PM</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-1">
                  <span className="font-medium">Sat</span>
                  <span className="text-muted-foreground">8:00 AM - 2:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-medium">Sun</span>
                  <span className="text-red-500">Off</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
