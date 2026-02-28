"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Star, 
  ThumbsUp,
  MessageSquare,
  Calendar,
  TrendingUp,
  Award
} from "lucide-react"

const overallStats = {
  average: 4.9,
  total: 156,
  fiveStar: 128,
  fourStar: 22,
  threeStar: 4,
  twoStar: 1,
  oneStar: 1,
}

const mockReviews = [
  {
    id: 1,
    customer: "John Smith",
    initials: "JS",
    rating: 5,
    date: "2026-02-25",
    service: "Solar Panel Installation",
    comment: "Mike did an excellent job with our solar installation. Very professional, clean work, and explained everything thoroughly. The system is performing even better than expected!",
    response: "Thank you John! It was great working on your project. Enjoy the clean energy!",
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    initials: "SJ",
    rating: 5,
    date: "2026-02-20",
    service: "Electrical Panel Upgrade",
    comment: "Outstanding work! Arrived on time, completed the upgrade faster than expected, and cleaned up perfectly. Highly recommend!",
    response: null,
  },
  {
    id: 3,
    customer: "Robert Davis",
    initials: "RD",
    rating: 4,
    date: "2026-02-18",
    service: "Emergency Repair",
    comment: "Quick response for an emergency situation. Fixed the issue within an hour. Only reason for 4 stars is the slightly higher emergency rate, but understanding given the circumstances.",
    response: "Thanks Robert! Glad we could get there quickly. Emergency rates are standard for after-hours calls, but we always aim to provide the best value.",
  },
  {
    id: 4,
    customer: "Emily Chen",
    initials: "EC",
    rating: 5,
    date: "2026-02-10",
    service: "EV Charger Installation",
    comment: "Perfect installation of our Level 2 charger. Mike was knowledgeable about the best placement and handled all the electrical work professionally.",
    response: "Thank you Emily! Enjoy your new EV charger. Let me know if you need anything.",
  },
  {
    id: 5,
    customer: "Michael Brown",
    initials: "MB",
    rating: 5,
    date: "2026-02-05",
    service: "Residential Wiring",
    comment: "Rewired our entire garage including adding new circuits for a workshop. Neat, organized work and very fair pricing.",
    response: null,
  },
]

export default function TechnicianReviewsPage() {
  const maxReviews = overallStats.fiveStar

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">Customer feedback on your work</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 text-center">
            <div className="text-5xl font-bold text-amber-500 mb-2">{overallStats.average}</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`h-5 w-5 ${i <= Math.round(overallStats.average) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{overallStats.total} total reviews</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="h-3 w-3 mr-1" />
                Top 5% Technician
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { stars: 5, count: overallStats.fiveStar },
                { stars: 4, count: overallStats.fourStar },
                { stars: 3, count: overallStats.threeStar },
                { stars: 2, count: overallStats.twoStar },
                { stars: 1, count: overallStats.oneStar },
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{item.stars}</span>
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${(item.count / maxReviews) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground w-10 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "100+ Reviews", icon: Award, color: "bg-amber-100 text-amber-700" },
          { label: "Response Rate", icon: MessageSquare, color: "bg-blue-100 text-blue-700", value: "92%" },
          { label: "On-Time Rate", icon: Calendar, color: "bg-green-100 text-green-700", value: "98%" },
          { label: "Recommend Rate", icon: ThumbsUp, color: "bg-purple-100 text-purple-700", value: "99%" },
        ].map((badge, i) => (
          <Card key={i}>
            <CardContent className="pt-6 text-center">
              <div className={`w-12 h-12 rounded-full ${badge.color} flex items-center justify-center mx-auto mb-2`}>
                <badge.icon className="h-6 w-6" />
              </div>
              <p className="font-semibold text-sm">{badge.value || badge.label}</p>
              <p className="text-xs text-muted-foreground">{badge.value ? badge.label : "Milestone"}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="pb-6 border-b last:border-0 last:pb-0">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {review.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="font-semibold">{review.customer}</span>
                        <span className="text-sm text-muted-foreground ml-2">• {review.service}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className={`h-4 w-4 ${i <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
                    
                    {review.response ? (
                      <div className="ml-4 p-3 bg-gray-50 rounded-lg border-l-2 border-emerald-500">
                        <p className="text-xs font-medium text-emerald-700 mb-1">Your Response:</p>
                        <p className="text-sm text-gray-600">{review.response}</p>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-3 w-3 mr-2" />
                        Respond
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
