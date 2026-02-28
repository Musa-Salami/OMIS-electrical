import Link from "next/link"
import { Zap } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">OMIS Electrical</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 1, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using the OMIS Electrical &amp; Solar Installations platform (&quot;Service&quot;), you agree to be bound by these 
              Terms of Service (&quot;Terms&quot;). If you do not agree to all the terms and conditions, you may not access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed">
              OMIS Electrical provides an online platform connecting customers with licensed electrical and solar installation 
              technicians. Our services include facilitating service requests, providing cost estimates, scheduling appointments, 
              and processing payments for electrical and solar installation work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
            <p className="text-gray-700 leading-relaxed mb-2">When creating an account, you agree to:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your password and account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Service Requests & Quotes</h2>
            <p className="text-gray-700 leading-relaxed">
              Service requests submitted through the platform are subject to review and acceptance by our team. Quotes provided 
              are estimates and may vary based on actual conditions found during the work. Final pricing will be confirmed before 
              work begins. All quotes are valid for 30 days unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Payment Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              Payment is due upon completion of services unless alternative arrangements have been agreed upon in writing. 
              We accept major credit cards, debit cards, and bank transfers. A deposit may be required for larger projects. 
              Late payments may incur additional fees.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Cancellation Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              Customers may cancel a service request at no charge up to 24 hours before the scheduled appointment. 
              Cancellations made within 24 hours of the appointment may incur a cancellation fee of up to 25% of the 
              quoted amount. Emergency services are non-refundable once a technician has been dispatched.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Warranties & Guarantees</h2>
            <p className="text-gray-700 leading-relaxed">
              OMIS Electrical provides a workmanship warranty on all installations and repairs. Warranty periods vary by 
              service type: 25 years for solar panel installations, 10 years for electrical panel upgrades, and 1 year for 
              general repairs. Product warranties are provided by the respective manufacturers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, OMIS Electrical shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages resulting from your use of or inability to use the Service. 
              Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Technician Conduct</h2>
            <p className="text-gray-700 leading-relaxed">
              All technicians are background-checked, licensed, and insured. Technical work is performed in accordance 
              with local building codes and the National Electrical Code (NEC). Technicians must follow OSHA safety 
              standards at all times during service delivery.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions regarding these Terms, please contact us at:
            </p>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
              <p>OMIS Electrical &amp; Solar Installations</p>
              <p>Email: legal@omis-electrical.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Energy Way, Austin, TX 78701</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2026 OMIS Electrical &amp; Solar Installations. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
