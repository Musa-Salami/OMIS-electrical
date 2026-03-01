import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AnimatedElectricalBackground } from "@/components/ui/animated-electrical-bg"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  Sun, 
  Shield, 
  Clock, 
  Star, 
  ArrowRight,
  CheckCircle2,
  Home,
  Building2,
  Wrench,
  AlertTriangle,
  Users,
  Award,
  HeadphonesIcon
} from "lucide-react"

export const metadata: Metadata = {
  title: "OMIS Electrical & Solar | Professional Installation Services",
  description: "Professional electrical and solar installation services in Austin, TX. Request services, track progress, and connect with certified technicians.",
  openGraph: {
    title: "OMIS Electrical & Solar | Professional Installation Services",
    description: "Professional electrical and solar installation services. Trusted by 500+ homeowners.",
    type: "website",
  },
}

const services = [
  {
    icon: Home,
    title: "Residential Electrical",
    description: "Complete electrical services for homes including wiring, outlets, panel upgrades, and smart home installations.",
    price: "From $150",
  },
  {
    icon: Building2,
    title: "Commercial Electrical",
    description: "Professional electrical solutions for businesses, offices, and commercial properties.",
    price: "From $300",
  },
  {
    icon: Sun,
    title: "Solar Installation",
    description: "Full solar panel system installation with inverters, monitoring, and battery storage options.",
    price: "From $5,000",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repair",
    description: "Regular maintenance, troubleshooting, and repair services for electrical and solar systems.",
    price: "From $100",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Services",
    description: "24/7 emergency electrical repairs for urgent issues. Fast response times guaranteed.",
    price: "From $250",
  },
  {
    icon: Zap,
    title: "EV Charger Installation",
    description: "Electric vehicle charging station installation for homes and businesses.",
    price: "From $800",
  },
]

const steps = [
  {
    number: "01",
    title: "Request a Service",
    description: "Fill out our simple form describing your electrical or solar needs. Upload photos if needed.",
  },
  {
    number: "02",
    title: "Get a Quote",
    description: "Receive a detailed quote within 24 hours. No hidden fees, transparent pricing.",
  },
  {
    number: "03",
    title: "Schedule Service",
    description: "Choose a convenient date and time. Our certified technician will arrive on schedule.",
  },
  {
    number: "04",
    title: "Job Complete",
    description: "Quality work guaranteed. Rate your experience and enjoy your upgraded electrical system.",
  },
]

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Certified Technicians" },
  { value: "15K+", label: "Projects Completed" },
  { value: "24/7", label: "Emergency Support" },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    rating: 5,
    comment: "OMIS Electrical did an amazing job installing solar panels on my roof. Professional, punctual, and the quality of work exceeded my expectations!",
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    rating: 5,
    comment: "We needed emergency electrical repairs for our restaurant and they responded within an hour. Highly recommend their services!",
  },
  {
    name: "Emily Williams",
    role: "Property Manager",
    rating: 5,
    comment: "I manage multiple properties and OMIS Electrical is my go-to for all electrical needs. Reliable, fair pricing, and excellent communication.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <AnimatedElectricalBackground />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Sun className="h-3 w-3 mr-1" />
              Powering a Sustainable Future
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Professional Electrical & Solar{" "}
              <span className="text-amber-400">Installation Services</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
              Connect with certified technicians for all your electrical and solar needs. 
              From residential repairs to commercial installations, we&apos;ve got you covered.
            </p>
            <div className="inline-flex flex-col sm:flex-row gap-3 rounded-full bg-white/10 backdrop-blur-sm px-3 py-3 border border-white/20">
              <Link href="/register">
                <Button size="xl" className="bg-white text-blue-700 hover:bg-gray-100 gap-2 w-full sm:w-auto rounded-full">
                  Request a Service
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/careers">
                <Button size="xl" className="bg-white/90 text-blue-700 hover:bg-white w-full sm:w-auto rounded-full">
                  Join as Technician
                </Button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span className="text-sm">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400" />
                <span className="text-sm">24/7 Emergency Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Electrical & Solar Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From simple repairs to complete solar installations, our certified technicians 
              deliver quality work you can trust.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <service.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-blue-600">{service.price}</span>
                    <Link href="/services">
                      <Button variant="ghost" size="sm" className="gap-1 group-hover:text-blue-600">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting professional electrical or solar service has never been easier.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-blue-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full border-t-2 border-dashed border-blue-200 translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Trusted by Thousands of Homeowners & Businesses
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Users, title: "Certified Professionals", desc: "All technicians are licensed, insured, and background-checked" },
                  { icon: Award, title: "Quality Guaranteed", desc: "We stand behind our work with comprehensive warranties" },
                  { icon: Clock, title: "Fast Response", desc: "Same-day service for emergencies, quick scheduling for all jobs" },
                  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Our support team is always available to help you" },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
                <AnimatedElectricalBackground />
                <div className="h-full flex flex-col justify-between relative z-10">
                  <div>
                    <Sun className="h-16 w-16 text-amber-400 mb-6" />
                    <h3 className="text-2xl font-bold mb-2">Go Solar Today</h3>
                    <p className="text-blue-100">
                      Save up to 70% on energy bills with our professional solar installation services.
                    </p>
                  </div>
                  <div className="space-y-2">
                    {["Free consultation", "Flexible financing", "25-year warranty"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">&quot;{testimonial.comment}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <AnimatedElectricalBackground />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you need electrical repairs, solar installation, or want to join our team of technicians, 
            we&apos;re here to help.
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-3 justify-center rounded-full bg-white/10 backdrop-blur-sm px-3 py-3 border border-white/20">
            <Link href="/register">
              <Button size="xl" className="bg-white text-blue-700 hover:bg-gray-100 gap-2 w-full sm:w-auto rounded-full">
                Request a Service
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/careers">
              <Button size="xl" className="bg-white/90 text-blue-700 hover:bg-white border-0 w-full sm:w-auto rounded-full">
                Join Our Team
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="xl" className="bg-white/90 text-blue-700 hover:bg-white border-0 w-full sm:w-auto rounded-full">
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
