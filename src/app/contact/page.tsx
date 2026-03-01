"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Zap,
  AlertCircle,
} from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Office Location",
    details: ["123 Electric Ave", "Austin, TX 78701"],
    action: "Get Directions",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    title: "Phone Number",
    details: ["Main: (512) 555-0123", "Emergency: (512) 555-0911"],
    action: "Call Now",
    href: "tel:+15125550123",
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["info@omiselectrical.com", "support@omiselectrical.com"],
    action: "Send Email",
    href: "mailto:info@omiselectrical.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 7:00 AM - 6:00 PM", "Sat: 8:00 AM - 4:00 PM", "Sun: Emergency Only"],
    action: null,
    href: null,
  },
]

const services = [
  "Residential Electrical",
  "Commercial Electrical",
  "Solar Installation",
  "EV Charger Installation",
  "Electrical Repair",
  "Emergency Service",
  "Other",
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/20 text-white mb-4">Get In Touch</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Have questions or need a quote? Our team is here to help. 
              Reach out to us and we&apos;ll respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <info.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                      ))}
                      {info.action && info.href && (
                        <a 
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                        >
                          {info.action} →
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <Badge className="mb-4">Send a Message</Badge>
                <h2 className="text-3xl font-bold mb-4">Request a Free Quote</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and one of our team members will get back to you 
                  within 24 business hours.
                </p>
              </div>

              {isSubmitted ? (
                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-emerald-900 mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-emerald-700 mb-6">
                        Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline">
                        Send Another Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(512) 555-0123"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service">Service Interested In</Label>
                          <select
                            id="service"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">Select a service</option>
                            {services.map((service) => (
                              <option key={service} value={service}>{service}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message *</Label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your project or question..."
                          className="min-h-[150px]"
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-blue-900">OMIS Electrical</p>
                    <p className="text-sm text-blue-700">123 Electric Ave, Austin, TX</p>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-4"
                    >
                      <Button size="sm">Open in Google Maps</Button>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Immediate Help?</CardTitle>
                  <CardDescription>Choose the best way to reach us</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a href="tel:+15125550123" className="block">
                    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                        <Phone className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Call Us</p>
                        <p className="text-sm text-muted-foreground">(512) 555-0123</p>
                      </div>
                      <Badge variant="secondary">Fastest</Badge>
                    </div>
                  </a>

                  <a href="mailto:info@omiselectrical.com" className="block">
                    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Email Us</p>
                        <p className="text-sm text-muted-foreground">info@omiselectrical.com</p>
                      </div>
                    </div>
                  </a>

                  <Link href="/customer/requests/new">
                    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                        <Zap className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Request Service Online</p>
                        <p className="text-sm text-muted-foreground">Get a quote in minutes</p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>

              {/* Emergency Banner */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <AlertCircle className="h-6 w-6 text-red-600 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-900">Emergency Service Available 24/7</h4>
                      <p className="text-sm text-red-700 mt-1">
                        For electrical emergencies, call our emergency line immediately.
                      </p>
                      <a href="tel:+15125550911" className="inline-block mt-3">
                        <Button variant="destructive" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          (512) 555-0911
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How quickly can you respond to a service request?",
                a: "For standard requests, we typically respond within 24 hours and can schedule service within 2-3 business days. Emergency services are available 24/7 with response times under 2 hours.",
              },
              {
                q: "Do you provide free estimates?",
                a: "Yes! We provide free estimates for most services. Our technician will assess your needs and provide a detailed quote before any work begins.",
              },
              {
                q: "Are your technicians licensed and insured?",
                a: "Absolutely. All our technicians are fully licensed, bonded, and insured. We also carry comprehensive liability insurance for your protection.",
              },
              {
                q: "What areas do you serve?",
                a: "We serve the entire Central Texas region, including Austin, Round Rock, Cedar Park, Pflugerville, Georgetown, and surrounding areas.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
