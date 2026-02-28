"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Calendar, 
  MapPin,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { SERVICE_TYPES, URGENCY_LEVELS } from "@/lib/constants"

const steps = [
  { id: 1, title: "Service Type" },
  { id: 2, title: "Details" },
  { id: 3, title: "Schedule" },
  { id: 4, title: "Review" },
]

export default function NewRequestPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    serviceType: "",
    title: "",
    description: "",
    urgency: "MEDIUM",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    preferredDate: "",
    preferredTime: "",
    alternateDate: "",
    photos: [] as File[],
  })

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.push("/customer/requests?success=true")
    } catch {
      console.error("Request failed")
    } finally {
      setIsLoading(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.serviceType !== ""
      case 2:
        return formData.title && formData.description && formData.address
      case 3:
        return formData.preferredDate && formData.preferredTime
      default:
        return true
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">What type of service do you need?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SERVICE_TYPES.map((service) => (
                  <Card 
                    key={service.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.serviceType === service.id 
                        ? "ring-2 ring-blue-600 bg-blue-50" 
                        : "hover:border-blue-300"
                    }`}
                    onClick={() => setFormData({ ...formData, serviceType: service.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          formData.serviceType === service.id 
                            ? "bg-blue-600 text-white" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          <span className="text-xl">{service.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">How urgent is your request?</h3>
              <div className="flex flex-wrap gap-3">
                {URGENCY_LEVELS.map((level) => (
                  <Badge
                    key={level.value}
                    variant={formData.urgency === level.value ? "default" : "outline"}
                    className={`cursor-pointer py-2 px-4 text-sm ${
                      formData.urgency === level.value ? "" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setFormData({ ...formData, urgency: level.value })}
                  >
                    {level.label}
                    <span className="ml-2 text-xs opacity-70">{level.description}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Request Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Kitchen electrical outlet installation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Describe Your Issue *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Please provide as much detail as possible about the work needed..."
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Photos (Optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each (max 5 files)</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Service Location
              </h4>
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
                    placeholder="Austin"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="TX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="78701"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Preferred Scheduling
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Choose your preferred date and time. We&apos;ll do our best to accommodate your schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Preferred Date & Time</h4>
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Time Slot *</Label>
                  <select
                    id="preferredTime"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="">Select a time slot</option>
                    <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                    <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-muted-foreground">Alternate Date (Optional)</h4>
                <div className="space-y-2">
                  <Label htmlFor="alternateDate">Date</Label>
                  <Input
                    id="alternateDate"
                    type="date"
                    value={formData.alternateDate}
                    onChange={(e) => setFormData({ ...formData, alternateDate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                <div>
                  <p className="font-medium text-amber-900 text-sm">Emergency Service</p>
                  <p className="text-xs text-amber-700 mt-1">
                    If you selected &quot;Emergency&quot; urgency, a technician will contact you within 2 hours 
                    regardless of your selected schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h4 className="font-semibold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Review Your Request
              </h4>
              <p className="text-sm text-emerald-700 mt-1">
                Please review your information before submitting.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Type:</span>
                  <span className="font-medium">{SERVICE_TYPES.find(s => s.id === formData.serviceType)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgency:</span>
                  <Badge variant={formData.urgency === "EMERGENCY" ? "destructive" : "default"}>
                    {URGENCY_LEVELS.find(u => u.value === formData.urgency)?.label}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Title:</span>
                  <span className="font-medium">{formData.title}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Description:</span>
                  <p className="mt-1">{formData.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.state} {formData.zipCode}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Preferred Date:</span>
                  <span className="font-medium">{formData.preferredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Slot:</span>
                  <span className="font-medium capitalize">{formData.preferredTime}</span>
                </div>
                {formData.alternateDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alternate Date:</span>
                    <span className="font-medium">{formData.alternateDate}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                By submitting this request, you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                {" "}and authorize OMIS Electrical to contact you regarding your service request.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/customer/requests">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">New Service Request</h1>
          <p className="text-muted-foreground">Fill out the form to request electrical services</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                currentStep >= step.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.id}
            </div>
            <span className={`text-xs mt-2 ${currentStep >= step.id ? "text-blue-600 font-medium" : "text-muted-foreground"}`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`absolute top-4 left-1/2 w-full h-0.5 ${
                currentStep > step.id ? "bg-blue-600" : "bg-gray-200"
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
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(prev => prev - 1)}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        {currentStep < steps.length ? (
          <Button onClick={() => setCurrentStep(prev => prev + 1)} disabled={!canProceed()}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} loading={isLoading}>
            Submit Request
          </Button>
        )}
      </div>
    </div>
  )
}
