"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  User,
  Award,
  Bell,
  Shield,
  CreditCard,
  Camera,
  Save,
  Key,
  Mail,
  Phone,
  MapPin,
  Smartphone,
  Wrench,
  Upload,
  Calendar,
  AlertCircle
} from "lucide-react"

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "payment", label: "Payment", icon: CreditCard },
]

export default function TechnicianSettingsPage() {
  const [activeSection, setActiveSection] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your technician profile and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-56 space-y-1">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors text-sm ${
                activeSection === section.id
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-6">
          {activeSection === "profile" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your technician profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl">MW</AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 p-1.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700">
                        <Camera className="h-3 w-3" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold">Mike Wilson</h3>
                      <p className="text-sm text-muted-foreground">Senior Solar Technician</p>
                      <Badge className="mt-1 bg-emerald-100 text-emerald-800">Verified</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input defaultValue="Mike" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input defaultValue="Wilson" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" defaultValue="mike.w@omis.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input defaultValue="(555) 111-2222" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea defaultValue="Experienced solar installation technician with 5+ years in residential and commercial projects. NABCEP certified with expertise in panel installation, inverter setup, and system optimization." />
                  </div>

                  <div className="space-y-2">
                    <Label>Specializations</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Solar Installation", "Electrical Panels", "EV Chargers", "Emergency Repairs"].map(spec => (
                        <Badge key={spec} variant="secondary" className="py-1.5 px-3">
                          {spec}
                          <button className="ml-2 text-muted-foreground hover:text-foreground">×</button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Hourly Rate ($)</Label>
                      <Input type="number" defaultValue="85" />
                    </div>
                    <div className="space-y-2">
                      <Label>Service Radius (miles)</Label>
                      <Input type="number" defaultValue="30" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "certifications" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Certifications & Licenses</CardTitle>
                  <CardDescription>Keep your credentials up to date</CardDescription>
                </div>
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "NABCEP PV Installation Professional", issuer: "NABCEP", expiry: "2027-06-15", status: "active" },
                  { name: "Master Electrician License", issuer: "State of Texas", expiry: "2026-12-31", status: "active" },
                  { name: "OSHA 30-Hour Construction", issuer: "OSHA", expiry: "N/A", status: "active" },
                  { name: "First Aid / CPR", issuer: "Red Cross", expiry: "2026-04-20", status: "expiring" },
                ].map((cert, i) => (
                  <div key={i} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Award className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          Expires: {cert.expiry}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {cert.status === "expiring" ? (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Expiring Soon
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      )}
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you receive updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "New Job Requests", desc: "Available jobs in your area", email: true, push: true },
                  { title: "Schedule Updates", desc: "Changes to your schedule", email: true, push: true },
                  { title: "Customer Messages", desc: "New messages from customers", email: false, push: true },
                  { title: "Payment Received", desc: "When payments are processed", email: true, push: true },
                  { title: "New Reviews", desc: "Customer reviews on your work", email: true, push: false },
                  { title: "Certification Reminders", desc: "Expiring certifications", email: true, push: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked={item.email} className="rounded" />
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked={item.push} className="rounded" />
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                      </label>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === "security" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" />
                  </div>
                  <Button><Key className="h-4 w-4 mr-2" />Update Password</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">2FA is not enabled</p>
                      <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "payment" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>How you receive payments for completed jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-4 border rounded-lg mb-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Direct Deposit</p>
                      <p className="text-sm text-muted-foreground">Bank of America ****4567</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 ml-auto">Active</Badge>
                  </div>
                  <Button variant="outline" className="w-full">Update Banking Details</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tax Information</CardTitle>
                  <CardDescription>W-9 and tax documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">W-9 on file</p>
                      <p className="text-sm text-green-600">Last updated: January 15, 2026</p>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
