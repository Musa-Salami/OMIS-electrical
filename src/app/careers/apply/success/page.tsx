"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  FileText,
  ArrowRight,
  Home,
} from "lucide-react"

const nextSteps = [
  {
    icon: Mail,
    title: "Check Your Email",
    description: "We've sent a confirmation email with your application details.",
  },
  {
    icon: Clock,
    title: "Review Process",
    description: "Our team will review your application within 2-3 business days.",
  },
  {
    icon: Phone,
    title: "Phone Interview",
    description: "If selected, we'll contact you to schedule a brief phone interview.",
  },
  {
    icon: FileText,
    title: "Background Check",
    description: "Final step includes verification of certifications and background check.",
  },
]

export default function ApplicationSuccessPage() {
  const referenceNumber = useMemo(
    () => `OMIS-TECH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    []
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Thank you for applying to join the OMIS Electrical team. We've received your application
            and will be in touch soon.
          </p>

          {/* Confirmation Card */}
          <Card className="mb-8 text-left">
            <CardHeader>
              <CardTitle>Application Reference</CardTitle>
              <CardDescription>Save this for your records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Reference Number</p>
                <p className="text-2xl font-mono font-bold text-emerald-600">
                  {referenceNumber}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="text-left mb-8">
            <h2 className="text-xl font-semibold mb-4">What Happens Next?</h2>
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <step.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/careers">
              <Button>
                View Other Opportunities
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Contact */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Questions?</h3>
            <p className="text-sm text-blue-700">
              If you have any questions about your application, please contact us at{" "}
              <a href="mailto:careers@omiselectrical.com" className="font-medium hover:underline">
                careers@omiselectrical.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
