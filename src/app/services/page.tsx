"use client"

import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Sun,
  Home,
  Building2,
  Battery,
  Wrench,
  AlertTriangle,
  Settings,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Award,
} from "lucide-react"

const services = [
  {
    id: "residential-electrical",
    title: "Residential Electrical",
    description: "Complete electrical services for your home including wiring, outlets, panel upgrades, and more.",
    icon: Home,
    color: "bg-blue-100 text-blue-600",
    features: [
      "Electrical panel upgrades",
      "Circuit installation & repair",
      "Outlet & switch installation",
      "Ceiling fan installation",
      "Home safety inspections",
      "Smoke detector installation",
    ],
    priceRange: "$150 - $2,500",
    duration: "2-8 hours",
  },
  {
    id: "commercial-electrical",
    title: "Commercial Electrical",
    description: "Professional electrical solutions for businesses, offices, and commercial properties.",
    icon: Building2,
    color: "bg-purple-100 text-purple-600",
    features: [
      "Commercial wiring & rewiring",
      "Lighting system installation",
      "Power distribution systems",
      "Emergency backup systems",
      "Code compliance upgrades",
      "Electrical maintenance plans",
    ],
    priceRange: "$300 - $10,000+",
    duration: "4 hours - multiple days",
  },
  {
    id: "solar-installation",
    title: "Solar Panel Installation",
    description: "Harness the power of the sun with our professional solar panel installation services.",
    icon: Sun,
    color: "bg-amber-100 text-amber-600",
    features: [
      "Site assessment & design",
      "Rooftop solar installation",
      "Ground-mount systems",
      "Battery storage solutions",
      "Grid connection setup",
      "Monitoring system setup",
    ],
    priceRange: "$8,000 - $25,000",
    duration: "1-3 days",
    popular: true,
  },
  {
    id: "solar-maintenance",
    title: "Solar System Maintenance",
    description: "Keep your solar system performing at peak efficiency with regular maintenance.",
    icon: Settings,
    color: "bg-green-100 text-green-600",
    features: [
      "Panel cleaning & inspection",
      "Inverter diagnostics",
      "Performance optimization",
      "Wiring inspection",
      "Battery health check",
      "Annual maintenance plans",
    ],
    priceRange: "$200 - $500",
    duration: "1-2 hours",
  },
  {
    id: "ev-charger",
    title: "EV Charger Installation",
    description: "Install a Level 2 electric vehicle charger for convenient home charging.",
    icon: Battery,
    color: "bg-emerald-100 text-emerald-600",
    features: [
      "Site assessment",
      "Panel capacity evaluation",
      "Charger installation",
      "Permit handling",
      "All charger brands",
      "Smart charger setup",
    ],
    priceRange: "$800 - $2,500",
    duration: "3-6 hours",
    popular: true,
  },
  {
    id: "panel-upgrade",
    title: "Electrical Panel Upgrade",
    description: "Upgrade your electrical panel for increased capacity, safety, and code compliance.",
    icon: Zap,
    color: "bg-indigo-100 text-indigo-600",
    features: [
      "100A to 200A upgrades",
      "Sub-panel installation",
      "Breaker replacement",
      "Grounding upgrades",
      "Code compliance",
      "Permit & inspection",
    ],
    priceRange: "$1,500 - $4,000",
    duration: "4-8 hours",
  },
  {
    id: "electrical-repair",
    title: "Electrical Repair",
    description: "Fast diagnosis and repair of electrical issues to restore power and safety.",
    icon: Wrench,
    color: "bg-cyan-100 text-cyan-600",
    features: [
      "Troubleshooting & diagnosis",
      "Circuit repair",
      "Outlet & switch repair",
      "Wiring repair",
      "Breaker issues",
      "Flickering lights",
    ],
    priceRange: "$100 - $500",
    duration: "1-3 hours",
  },
  {
    id: "emergency-electrical",
    title: "Emergency Services",
    description: "24/7 emergency electrical services when you need immediate assistance.",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-600",
    features: [
      "24/7 availability",
      "Power outage response",
      "Electrical fire safety",
      "Storm damage repair",
      "Urgent safety issues",
      "Same-day service",
    ],
    priceRange: "$250 - $1,000",
    duration: "1-4 hours",
    emergency: true,
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "All our technicians are fully licensed, bonded, and insured for your protection.",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "We stand behind our work with comprehensive warranties on all services.",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    description: "We respect your time with punctual arrivals and efficient service delivery.",
  },
  {
    icon: CheckCircle,
    title: "Upfront Pricing",
    description: "No surprises - get clear quotes before work begins with no hidden fees.",
  },
]

export default function ServicesPage() {
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
            <Badge className="bg-white/20 text-white mb-4">Professional Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Electrical & Solar Services
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              From residential repairs to commercial installations, we provide comprehensive 
              electrical and solar solutions tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/customer/requests/new">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Request a Service
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Get Free Estimate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <benefit.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">{benefit.title}</p>
                  <p className="text-xs text-muted-foreground hidden md:block">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of electrical and solar services designed to meet 
              all your residential and commercial needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="relative hover:shadow-lg transition-shadow">
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-amber-500">Popular</Badge>
                )}
                {service.emergency && (
                  <Badge className="absolute top-4 right-4 bg-red-500">24/7</Badge>
                )}
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4`}>
                    <service.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="font-semibold text-blue-600">{service.priceRange}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium text-sm">{service.duration}</p>
                    </div>
                  </div>
                  <Link href={`/customer/requests/new?service=${service.id}`}>
                    <Button className="w-full mt-4">
                      Request Service
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and estimate. Our team is ready to help 
            with all your electrical and solar needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customer/requests/new">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                Request a Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
