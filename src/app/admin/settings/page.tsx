"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Settings,
  User,
  Building,
  Bell,
  Shield,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
  Camera,
  Key,
  Smartphone,
  Clock,
  DollarSign,
  Zap,
  Sun,
  Palette,
  Database,
  Trash2,
  Download,
  Upload
} from "lucide-react"

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
]

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === section.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <section.icon className="h-5 w-5" />
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeSection === "profile" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your admin account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/avatars/admin.jpg" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl">
                          AD
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Admin User</h3>
                      <p className="text-muted-foreground">Super Administrator</p>
                      <Badge className="mt-2 bg-purple-100 text-purple-800">Admin</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Admin" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="User" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="admin@omis.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="(555) 000-0000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      defaultValue="System administrator for OMIS Electrical & Solar platform."
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "company" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Update your company details and branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue="OMIS Electrical & Solar" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="website" className="pl-10" defaultValue="www.omis-electrical.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Company Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="companyEmail" className="pl-10" defaultValue="info@omis-electrical.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Company Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="companyPhone" className="pl-10" defaultValue="(512) 555-OMIS" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="address"
                        className="pl-10"
                        defaultValue="1234 Energy Drive, Suite 100&#10;Austin, TX 78701"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Business Hours</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Mon-Fri:</span>
                        <Input defaultValue="7:00 AM - 6:00 PM" className="flex-1" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Sat:</span>
                        <Input defaultValue="8:00 AM - 4:00 PM" className="flex-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Areas</CardTitle>
                  <CardDescription>Define the areas where you provide services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Austin", "Round Rock", "Cedar Park", "Pflugerville", "Georgetown", "Leander"].map(area => (
                      <Badge key={area} variant="secondary" className="text-sm py-1 px-3">
                        {area}
                        <button className="ml-2 text-muted-foreground hover:text-foreground">×</button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Add new service area..." />
                    <Button variant="outline">Add</Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "notifications" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { title: "New Service Requests", description: "Get notified when a new service request is submitted", email: true, push: true },
                    { title: "Payment Received", description: "Receive alerts when payments are processed", email: true, push: false },
                    { title: "Technician Applications", description: "Notifications for new job applications", email: true, push: true },
                    { title: "Customer Reviews", description: "Get notified when customers leave reviews", email: false, push: true },
                    { title: "System Alerts", description: "Important system and security notifications", email: true, push: true },
                    { title: "Weekly Reports", description: "Receive weekly summary reports", email: true, push: false },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
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
            </>
          )}

          {activeSection === "security" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>
                      <Key className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-800">2FA is enabled</p>
                        <p className="text-sm text-green-600">Your account is protected with two-factor authentication</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Manage devices where you&apos;re logged in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { device: "Windows PC - Chrome", location: "Austin, TX", current: true, time: "Active now" },
                      { device: "iPhone 14 Pro", location: "Austin, TX", current: false, time: "2 hours ago" },
                      { device: "MacBook Pro - Safari", location: "Round Rock, TX", current: false, time: "1 day ago" },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Smartphone className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium flex items-center gap-2">
                              {session.device}
                              {session.current && <Badge className="bg-green-100 text-green-800">Current</Badge>}
                            </p>
                            <p className="text-sm text-muted-foreground">{session.location} • {session.time}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <Button variant="ghost" size="sm" className="text-red-600">
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "billing" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Manage your subscription and billing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg">
                    <div>
                      <p className="text-sm opacity-80">Current Plan</p>
                      <p className="text-2xl font-bold">Business Pro</p>
                      <p className="text-sm opacity-80 mt-1">Unlimited technicians, advanced analytics</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">$199</p>
                      <p className="text-sm opacity-80">/month</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="flex-1">Change Plan</Button>
                    <Button variant="outline" className="flex-1">View Invoices</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Manage your payment information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2027</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Default</Badge>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: "Feb 1, 2026", amount: "$199.00", status: "Paid" },
                      { date: "Jan 1, 2026", amount: "$199.00", status: "Paid" },
                      { date: "Dec 1, 2025", amount: "$199.00", status: "Paid" },
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{invoice.date}</p>
                          <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">{invoice.status}</Badge>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Save Button */}
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
