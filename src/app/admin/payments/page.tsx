"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Download, 
  DollarSign,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Eye,
  RefreshCcw
} from "lucide-react"
import { payments as basePayments } from "@/lib/mockData"

const mockPayments = basePayments.map(p => ({
  ...p,
  email: p.customerEmail,
}))

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  failed: { label: "Failed", color: "bg-red-100 text-red-800", icon: XCircle },
  refunded: { label: "Refunded", color: "bg-gray-100 text-gray-800", icon: RefreshCcw },
}

export default function AdminPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.requestId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalRevenue: mockPayments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0),
    pending: mockPayments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0),
    thisMonth: mockPayments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0),
    transactions: mockPayments.length,
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">${stats.pending.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {mockPayments.filter(p => p.status === "pending").length} transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">${stats.thisMonth.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              On track for target
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold">{stats.transactions}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This month
            </p>
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
                placeholder="Search by customer, payment ID, or request ID..."
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
                variant={statusFilter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("completed")}
              >
                Completed
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "failed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("failed")}
              >
                Failed
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Method</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => {
                  const status = statusConfig[payment.status]
                  const StatusIcon = status.icon

                  return (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{payment.id}</p>
                          <p className="text-xs text-muted-foreground">{payment.requestId}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{payment.customer}</p>
                          <p className="text-xs text-muted-foreground">{payment.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{payment.service}</td>
                      <td className="py-3 px-4">
                        <p className="font-semibold">${payment.amount.toLocaleString()}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm">{payment.method}</p>
                            {payment.cardLast4 && (
                              <p className="text-xs text-muted-foreground">****{payment.cardLast4}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {payment.date}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={status.color} variant="secondary">
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {payment.status === "pending" && (
                            <Button variant="ghost" size="sm" className="text-green-600">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPayments.length} of {mockPayments.length} payments
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
  )
}
