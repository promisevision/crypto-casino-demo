export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-dark-light border border-white/10 rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
              <p>
                We collect your email address when you subscribe to our newsletter. This information is used solely
                for the purpose of sending you casino bonuses, reviews, and updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
              <p>Your email address is used to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send you our weekly newsletter with crypto casino bonuses and reviews</li>
                <li>Notify you about exclusive promotions and offers</li>
                <li>Provide you with relevant casino industry news and updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Data Storage</h2>
              <p>
                Your data is securely stored in MongoDB Atlas with industry-standard encryption and security measures.
                We do not share, sell, or distribute your email address to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unsubscribe from our newsletter at any time using the unsubscribe link in every email</li>
                <li>Request deletion of your data by contacting us</li>
                <li>Access the information we have about you</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Cookies</h2>
              <p>
                Our website uses minimal cookies for basic functionality. We do not use tracking cookies or
                third-party analytics.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. GDPR Compliance</h2>
              <p>
                We are committed to GDPR compliance. We only collect data with your explicit consent and process it
                lawfully and transparently.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Contact Us</h2>
              <p>
                For any privacy-related questions or requests, please contact us at:{' '}
                <a href="mailto:privacy@cryptocasinohub.com" className="text-primary underline">
                  privacy@cryptocasinohub.com
                </a>
              </p>
            </section>

            <section>
              <p className="text-gray-400 text-sm mt-12">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
