import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Privacy Policy | OMIS Electrical & Solar",
  description: "Privacy policy for OMIS Electrical & Solar Installations platform. Learn how we protect your data.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 1, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-2">We collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and physical address when you create an account</li>
              <li><strong>Service Information:</strong> Details about your property, electrical systems, and service requests</li>
              <li><strong>Payment Information:</strong> Credit card numbers and billing addresses (processed securely via our payment provider)</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our platform, including IP address and browser type</li>
              <li><strong>Communications:</strong> Messages exchanged through our in-app messaging system</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-2">We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Process and fulfill your service requests</li>
              <li>Match you with qualified technicians in your area</li>
              <li>Send service updates, appointment reminders, and quote notifications</li>
              <li>Process payments and manage billing</li>
              <li>Improve our platform and services</li>
              <li>Communicate about new services, promotions, or company updates</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-2">We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Technicians:</strong> Your name, address, and service details to assigned technicians for job completion</li>
              <li><strong>Payment Processors:</strong> Necessary payment information for transaction processing</li>
              <li><strong>Service Providers:</strong> Third-party services that assist in operating our platform (hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental regulation</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              We do <strong>not</strong> sell your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your information, including SSL/TLS encryption 
              for data in transit, encrypted storage for sensitive data, regular security audits, and access controls for 
              employee data access. While we strive to protect your information, no method of electronic storage is 100% 
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Cookies & Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to enhance your experience, remember your preferences, and 
              understand how our platform is used. You can manage cookie preferences in your browser settings. 
              Essential cookies required for platform functionality cannot be disabled.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Access:</strong> Request a copy of personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal retention requirements)</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide services. 
              Service records and transaction history are retained for 7 years for tax and legal compliance purposes. 
              You may request account deletion at any time, after which we will remove your data within 30 days, 
              except where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Service is not directed to individuals under the age of 18. We do not knowingly collect personal 
              information from children. If we become aware that we have collected personal information from a child, 
              we will take steps to delete that information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting 
              a notice on our platform and/or sending an email to your registered address. Your continued use of the 
              Service after changes are posted constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              For privacy-related inquiries or to exercise your rights, please contact us:
            </p>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
              <p>OMIS Electrical &amp; Solar Installations — Privacy Team</p>
              <p>Email: privacy@omis-electrical.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Energy Way, Austin, TX 78701</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-4 mt-2">
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
