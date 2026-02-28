"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase,
  Award,
  CheckCircle2,
  Upload,
  MapPin,
  Zap,
} from "lucide-react"
import { SPECIALIZATIONS } from "@/lib/constants"

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Experience", icon: Briefcase },
  { id: 3, title: "Certifications", icon: Award },
  { id: 4, title: "Review", icon: CheckCircle2 },
]

export default function TechnicianApplyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Experience
    bio: "",
    experienceYears: "",
    specializations: [] as string[],
    serviceAreas: "",
    hourlyRate: "",
    // Certifications
    certifications: [{ name: "", issuingBody: "", document: null as File | null }],
  })

  const handleSpecializationToggle = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec]
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.push("/careers/apply/success")
    } catch {
      console.error("Application failed")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main Street"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="New York"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="NY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="10001"
                />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about your experience and expertise..."
                className="min-h-[120px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experienceYears">Years of Experience *</Label>
                <Input
                  id="experienceYears"
                  type="number"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  placeholder="5"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Preferred Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  placeholder="75"
                  min="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Specializations *</Label>
              <p className="text-sm text-muted-foreground mb-3">Select all that apply</p>
              <div className="flex flex-wrap gap-2">
                {SPECIALIZATIONS.map((spec) => (
                  <Badge
                    key={spec}
                    variant={formData.specializations.includes(spec) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => handleSpecializationToggle(spec)}
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceAreas">Service Areas *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Textarea
                  id="serviceAreas"
                  value={formData.serviceAreas}
                  onChange={(e) => setFormData({ ...formData, serviceAreas: e.target.value })}
                  placeholder="List the cities or regions you're willing to work in..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Required Documents</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Valid electrician license</li>
                <li>• Insurance certificate (if available)</li>
                <li>• Any additional certifications</li>
              </ul>
            </div>
            {formData.certifications.map((cert, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">Certification {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Certification Name *</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => {
                        const newCerts = [...formData.certifications]
                        newCerts[index].name = e.target.value
                        setFormData({ ...formData, certifications: newCerts })
                      }}
                      placeholder="e.g., Master Electrician License"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuing Body *</Label>
                    <Input
                      value={cert.issuingBody}
                      onChange={(e) => {
                        const newCerts = [...formData.certifications]
                        newCerts[index].issuingBody = e.target.value
                        setFormData({ ...formData, certifications: newCerts })
                      }}
                      placeholder="e.g., State Licensing Board"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Document</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => setFormData({
                ...formData,
                certifications: [...formData.certifications, { name: "", issuingBody: "", document: null }]
              })}
            >
              + Add Another Certification
            </Button>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h4 className="font-semibold text-emerald-900 mb-2">Application Summary</h4>
              <p className="text-sm text-emerald-700">Please review your information before submitting.</p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                  <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                  <p><span className="font-medium">Address:</span> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><span className="font-medium">Experience:</span> {formData.experienceYears} years</p>
                  <p><span className="font-medium">Hourly Rate:</span> ${formData.hourlyRate}/hr</p>
                  <p><span className="font-medium">Specializations:</span> {formData.specializations.join(", ") || "None selected"}</p>
                  <p><span className="font-medium">Service Areas:</span> {formData.serviceAreas || "Not specified"}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {formData.certifications.filter(c => c.name).map((cert, index) => (
                    <p key={index}>• {cert.name} - {cert.issuingBody}</p>
                  ))}
                  {!formData.certifications.some(c => c.name) && <p className="text-muted-foreground">No certifications added</p>}
                </CardContent>
              </Card>
            </div>
            <div className="flex items-start gap-2 p-4 bg-gray-50 rounded-lg">
              <input type="checkbox" id="terms" className="mt-1" />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I confirm that all information provided is accurate and I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </label>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Technician Application</h1>
            <p className="text-muted-foreground">Complete all steps to submit your application</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    currentStep >= step.id
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span className={`text-sm mt-2 ${currentStep >= step.id ? "text-emerald-600 font-medium" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`absolute top-5 left-1/2 w-full h-0.5 ${
                    currentStep > step.id ? "bg-emerald-600" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>Step {currentStep} of {steps.length}</CardDescription>
            </CardHeader>
            <CardContent>{renderStep()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={() => setCurrentStep(prev => prev + 1)}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} loading={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
