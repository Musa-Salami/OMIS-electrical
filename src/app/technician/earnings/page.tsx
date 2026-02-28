"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Download,
  CheckCircle2,
  Clock,
  CreditCard,
  Wallet,
  BarChart3
} from "lucide-react"
import { techEarningsMonthly as earningsData, techRecentPayments as recentPayments, techPendingPayments as pendingPayments } from "@/lib/mockData"

export default function TechnicianEarningsPage() {
  const totalEarnings = earningsData.reduce((sum, d) => sum + d.amount, 0)
  const thisMonth = earningsData[earningsData.length - 1].amount
  const lastMonth = earningsData[earningsData.length - 2].amount
  const growth = ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1)
  const maxEarning = Math.max(...earningsData.map(d => d.amount))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Earnings</h1>
          <p className="text-muted-foreground">Track your income and payment history</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Statement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">${thisMonth.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className={`flex items-center gap-1 mt-2 text-sm ${Number(growth) >= 0 ? "text-green-600" : "text-red-600"}`}>
              {Number(growth) >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              <span>{growth}% vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">YTD Earnings</p>
                <p className="text-2xl font-bold">${totalEarnings.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ${pendingPayments.reduce((s, p) => s + p.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Per Job</p>
                <p className="text-2xl font-bold">$660</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Earnings Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Monthly Earnings</CardTitle>
              <Badge variant="secondary">Last 6 months</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {earningsData.map((item) => (
                  <div key={item.month} className="flex items-center gap-4">
                    <div className="w-10 text-sm font-medium">{item.month}</div>
                    <div className="flex-1">
                      <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-end pr-2"
                          style={{ width: `${(item.amount / maxEarning) * 100}%` }}
                        >
                          <span className="text-xs text-white font-medium">
                            ${(item.amount / 1000).toFixed(1)}k
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{payment.service}</p>
                        <p className="text-xs text-muted-foreground">{payment.customer} • {payment.date}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-600">+${payment.amount}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingPayments.map((payment) => (
                  <div key={payment.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{payment.service}</p>
                      <p className="font-semibold">${payment.amount.toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{payment.customer}</p>
                    <p className="text-xs text-yellow-700 mt-1">Due: {payment.dueDate}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">Direct Deposit</p>
                  <p className="text-xs text-muted-foreground">****4567 • Bank of America</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3" size="sm">
                Update Payment Info
              </Button>
            </CardContent>
          </Card>

          {/* Tax Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tax Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Download className="h-4 w-4 mr-2" />
                2025 1099 Form
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Download className="h-4 w-4 mr-2" />
                YTD Earnings Summary
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
