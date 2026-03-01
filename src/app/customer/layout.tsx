"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Wrench, 
  FileText, 
  MessageSquare, 
  Settings, 
  Bell, 
  LogOut,
  User,
  Zap,
  Menu,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/customer/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Requests",
    href: "/customer/requests",
    icon: Wrench,
  },
  {
    title: "Quotes",
    href: "/customer/quotes",
    icon: FileText,
    badge: "2",
  },
  {
    title: "Messages",
    href: "/customer/messages",
    icon: MessageSquare,
    badge: "5",
  },
  {
    title: "Settings",
    href: "/customer/settings",
    icon: Settings,
  },
]

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold">OMIS</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/customer.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r flex flex-col transition-transform duration-300",
        "lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold">OMIS Electrical</p>
                <p className="text-xs text-muted-foreground">Customer Portal</p>
              </div>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <link.icon className="h-5 w-5" />
                  {link.title}
                </div>
                {link.badge && (
                  <Badge variant="info" className="text-xs">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src="/avatars/customer.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/customer/profile" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Desktop Header */}
        <header className="hidden lg:flex sticky top-0 z-40 bg-white border-b px-6 py-4 items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">
              {sidebarLinks.find(l => l.href === pathname)?.title || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <Avatar>
                <AvatarImage src="/avatars/customer.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-xs text-muted-foreground">Customer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6 pt-20 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  )
}
