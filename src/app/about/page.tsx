"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Users,
  Award,
  Target,
  Heart,
  Leaf,
  CheckCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Shield,
  Star,
} from "lucide-react"

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "5,000+", label: "Projects Completed" },
  { value: "50+", label: "Expert Technicians" },
  { value: "98%", label: "Customer Satisfaction" },
]

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "We prioritize safety in every project, following strict protocols and industry standards to protect our customers and team.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We deliver exceptional craftsmanship using premium materials and the latest techniques in electrical and solar installation.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description: "Our customers are at the heart of everything we do. We listen, understand, and deliver solutions that exceed expectations.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We're committed to promoting clean energy solutions and environmentally responsible practices in all our services.",
  },
]

const milestones = [
  { year: "2009", title: "Company Founded", description: "Started as a small residential electrical service in Austin, TX" },
  { year: "2012", title: "Expanded Services", description: "Added commercial electrical services and grew our team to 10 technicians" },
  { year: "2015", title: "Solar Division Launch", description: "Introduced solar installation services to meet growing demand for clean energy" },
  { year: "2018", title: "Regional Expansion", description: "Expanded operations to serve the entire Central Texas region" },
  { year: "2021", title: "Digital Transformation", description: "Launched our online platform for seamless service booking and management" },
  { year: "2024", title: "Industry Recognition", description: "Named Top Electrical & Solar Service Provider in Texas" },
]

const team = [
  {
    name: "Michael Rodriguez",
    role: "Founder & CEO",
    bio: "25+ years of electrical industry experience with a passion for sustainable energy solutions.",
    initials: "MR",
  },
  {
    name: "Sarah Chen",
    role: "Operations Director",
    bio: "Ensures seamless service delivery and maintains our high standards of customer satisfaction.",
    initials: "SC",
  },
  {
    name: "David Thompson",
    role: "Lead Solar Engineer",
    bio: "Expert in solar system design with certifications from NABCEP and multiple manufacturers.",
    initials: "DT",
  },
  {
    name: "Emily Martinez",
    role: "Customer Experience Manager",
    bio: "Dedicated to ensuring every customer has an exceptional experience with our services.",
    initials: "EM",
  },
]

const certifications = [
  "Licensed Electrical Contractors",
  "NABCEP Certified Solar Installers",
  "OSHA Safety Certified",
  "BBB A+ Rated",
  "EPA Lead-Safe Certified",
  "Tesla Powerwall Certified",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-blue-600 text-white mb-4">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powering Homes & Businesses Since 2009
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              OMIS Electrical is a leading provider of electrical and solar installation services, 
              dedicated to delivering safe, reliable, and sustainable energy solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Our Story</Badge>
              <h2 className="text-3xl font-bold mb-6">Built on Trust, Powered by Excellence</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  OMIS Electrical was founded in 2009 by Michael Rodriguez, a master electrician 
                  with a vision to provide exceptional electrical services that prioritize safety, 
                  quality, and customer satisfaction.
                </p>
                <p>
                  What started as a small residential service company in Austin, Texas has grown 
                  into a full-service electrical and solar installation provider serving thousands 
                  of customers across Central Texas.
                </p>
                <p>
                  Today, our team of over 50 licensed technicians continues to uphold the values 
                  that built our reputation: integrity, expertise, and an unwavering commitment 
                  to our customers&apos; needs.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/services">
                  <Button>
                    Explore Our Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Contact Us</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <Zap className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-blue-900">OMIS Electrical</h3>
                  <p className="text-blue-700">Excellence in Every Connection</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div>
                    <p className="font-bold">4.9/5 Rating</p>
                    <p className="text-sm text-muted-foreground">Based on 2,000+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Mission & Values</Badge>
            <h2 className="text-3xl font-bold mb-4">What Drives Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our mission is to provide safe, reliable, and sustainable electrical and solar 
              solutions while delivering an exceptional customer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl font-bold mb-4">Company Milestones</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200" />
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                    }`}
                  >
                    <span className="text-sm font-bold text-blue-600">{milestone.year}</span>
                    <h4 className="font-semibold">{milestone.title}</h4>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl font-bold mb-4">Meet the Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced leadership team brings decades of industry expertise to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    {member.initials}
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-blue-600 mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">Certifications & Accreditations</h3>
            <p className="text-muted-foreground">Recognized for excellence and compliance</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="outline" className="py-2 px-4 text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust OMIS Electrical for their 
            electrical and solar needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customer/requests/new">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Request a Service
              </Button>
            </Link>
            <Link href="/careers">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Join Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
