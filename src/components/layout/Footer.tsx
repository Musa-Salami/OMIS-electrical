import Link from "next/link"
import { 
  Zap, 
  Sun, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin
} from "lucide-react"

const footerLinks = {
  services: [
    { href: "/services#electrical", label: "Electrical Services" },
    { href: "/services#solar", label: "Solar Installation" },
    { href: "/services#maintenance", label: "Maintenance" },
    { href: "/services#emergency", label: "Emergency Services" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
    { href: "/services", label: "All Services" },
  ],
  support: [
    { href: "/contact#faq", label: "FAQ" },
    { href: "/contact", label: "Help & Support" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
}

const socialLinks = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                <Zap className="h-6 w-6 text-white" />
                <Sun className="absolute -right-1 -top-1 h-4 w-4 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">OMIS</span>
                <span className="text-xs text-gray-400">Electrical & Solar</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              Professional electrical and solar installation services. 
              Powering homes and businesses with reliable, sustainable energy solutions.
            </p>
            <div className="space-y-3">
              <a href="tel:+1234567890" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-blue-400" />
                (123) 456-7890
              </a>
              <a href="mailto:info@omis-electrical.com" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-blue-400" />
                info@omis-electrical.com
              </a>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-blue-400" />
                123 Energy Street, Solar City, SC 12345
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} OMIS Electrical & Solar. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
