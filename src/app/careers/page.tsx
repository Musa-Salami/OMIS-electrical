import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Sun,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Clock,
  Calendar,
  Shield,
  Award,
  TrendingUp,
  Users,
  Briefcase
} from "lucide-react"

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description: "Earn top rates for your expertise. Set your own prices and keep more of what you earn.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Work when you want. Accept jobs that fit your schedule and availability.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Access a steady stream of customers. Build your reputation and grow your client base.",
  },
  {
    icon: Shield,
    title: "Insurance Coverage",
    description: "We provide liability coverage for all jobs completed through our platform.",
  },
  {
    icon: Users,
    title: "Support Team",
    description: "24/7 support for any questions or issues. We're here to help you succeed.",
  },
  {
    icon: Award,
    title: "Training & Certification",
    description: "Access to training resources and help obtaining additional certifications.",
  },
]

const requirements = [
  "Valid electrician license in your state",
  "Minimum 2 years of professional experience",
  "Reliable transportation",
  "Smartphone with internet access",
  "Own tools and equipment",
  "Ability to pass background check",
  "Insurance (or willingness to obtain)",
  "Excellent communication skills",
]

const steps = [
  {
    number: "1",
    title: "Create Account",
    description: "Sign up and fill out your basic information.",
  },
  {
    number: "2",
    title: "Complete Application",
    description: "Upload certifications and complete your profile.",
  },
  {
    number: "3",
    title: "Verification",
    description: "We verify your credentials and background.",
  },
  {
    number: "4",
    title: "Start Working",
    description: "Get approved and start receiving job requests!",
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Briefcase className="h-3 w-3 mr-1" />
              Join Our Team
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Become an OMIS{" "}
              <span className="text-amber-400">Certified Technician</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl">
              Join our network of skilled electrical and solar technicians. 
              Enjoy flexible hours, competitive pay, and a steady stream of customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/careers/apply">
                <Button size="xl" className="bg-white text-emerald-700 hover:bg-gray-100 gap-2 w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#requirements">
                <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                  View Requirements
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "$75/hr", label: "Average Earning" },
              { value: "500+", label: "Active Technicians" },
              { value: "4.9/5", label: "Technician Rating" },
              { value: "15K+", label: "Jobs Completed" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Benefits</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Join OMIS Electrical?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to build a successful career as an independent technician.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Started in 4 Easy Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-12 w-full border-t-2 border-dashed border-emerald-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20" id="requirements">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Requirements</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What You Need to Apply
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We&apos;re looking for experienced professionals who are committed to 
                providing excellent service to our customers.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Zap className="h-12 w-12 text-amber-400" />
                      <Sun className="h-10 w-10 text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Ready to Start?</h3>
                    <p className="text-emerald-100">
                      Join hundreds of technicians already earning on our platform.
                    </p>
                  </div>
                  <div>
                    <Link href="/careers/apply">
                      <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 gap-2">
                        Start Application
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Earning Today
          </h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join our growing network of professional technicians. 
            Complete your application in just 10 minutes.
          </p>
          <Link href="/careers/apply">
            <Button size="xl" className="bg-white text-emerald-700 hover:bg-gray-100 gap-2">
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
