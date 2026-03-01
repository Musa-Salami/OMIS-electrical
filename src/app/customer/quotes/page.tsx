"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle,
  DollarSign,
  Calendar,
  Wrench,
  ArrowRight,
  Download,
  MessageSquare
} from "lucide-react"
import { quotes as baseQuotes } from "@/lib/mockData"

type QuoteStatus = "pending" | "accepted" | "declined" | "expired"

const mockQuotes = baseQuotes.map(q => ({
  ...q,
  totalCost: q.totalAmount,
  status: q.status as QuoteStatus,
}))

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  accepted: { label: "Accepted", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  declined: { label: "Declined", color: "bg-red-100 text-red-800", icon: XCircle },
  expired: { label: "Expired", color: "bg-gray-100 text-gray-800", icon: Clock },
}

export default function CustomerQuotesPage() {
  const [selectedQuote, setSelectedQuote] = useState<typeof mockQuotes[0] | null>(null)
  const [quoteList, setQuoteList] = useState(mockQuotes)

  const handleAcceptQuote = (quoteId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setQuoteList(prev => prev.map(q => q.id === quoteId ? { ...q, status: "accepted" as QuoteStatus } : q))
    if (selectedQuote?.id === quoteId) setSelectedQuote(prev => prev ? { ...prev, status: "accepted" as QuoteStatus } : null)
  }

  const handleDeclineQuote = (quoteId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setQuoteList(prev => prev.map(q => q.id === quoteId ? { ...q, status: "declined" as QuoteStatus } : q))
    if (selectedQuote?.id === quoteId) setSelectedQuote(prev => prev ? { ...prev, status: "declined" as QuoteStatus } : null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Quotes</h1>
          <p className="text-muted-foreground">Review and manage quotes from technicians</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">1</div>
            <p className="text-sm text-muted-foreground">Accepted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-600">1</div>
            <p className="text-sm text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quotes List */}
        <div className="lg:col-span-2 space-y-4">
          {quoteList.map((quote) => {
            const status = statusConfig[quote.status]
            const StatusIcon = status.icon

            return (
              <Card
                key={quote.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedQuote?.id === quote.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedQuote(quote)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {quote.techInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{quote.service}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {quote.technician} • {quote.id}
                        </p>
                      </div>
                    </div>
                    <Badge className={status.color} variant="secondary">
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {quote.submittedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {quote.estimatedDuration}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-green-600">
                      ${quote.totalCost.toLocaleString()}
                    </p>
                  </div>

                  {quote.status === "pending" && (
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <Button className="flex-1" size="sm" onClick={(e) => handleAcceptQuote(quote.id, e)}>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Accept Quote
                      </Button>
                      <Button variant="outline" className="flex-1" size="sm" onClick={(e) => { e.stopPropagation(); window.location.href = "/customer/messages" }}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Discuss
                      </Button>
                      <Button variant="outline" className="text-red-600" size="sm" onClick={(e) => handleDeclineQuote(quote.id, e)}>
                        <XCircle className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quote Details */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Quote Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedQuote ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedQuote.service}</h3>
                    <p className="text-sm text-muted-foreground">{selectedQuote.id} • {selectedQuote.requestId}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Cost Breakdown</h4>
                    <div className="space-y-2">
                      {selectedQuote.breakdown.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>{item.item}</span>
                          <span className="font-medium">${item.cost.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex justify-between pt-2 border-t font-bold">
                        <span>Total</span>
                        <span className="text-green-600">${selectedQuote.totalCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Details</h4>
                    <div className="text-sm space-y-1">
                      <p><span className="text-muted-foreground">Duration:</span> {selectedQuote.estimatedDuration}</p>
                      <p><span className="text-muted-foreground">Valid Until:</span> {selectedQuote.validUntil}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Notes</h4>
                    <p className="text-sm">{selectedQuote.notes}</p>
                  </div>

                  <Button variant="outline" className="w-full" size="sm" onClick={() => alert(`PDF download for ${selectedQuote.id} would start here.`)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a quote to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
