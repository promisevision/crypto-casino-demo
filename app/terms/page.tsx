export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-dark-light border border-white/10 rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Crypto Casino Hub, you accept and agree to be bound by the terms and
                provisions of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Service Description</h2>
              <p>
                Crypto Casino Hub provides information, reviews, and promotional offers related to cryptocurrency
                casinos. We are an affiliate marketing platform and may earn commissions from casino referrals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Age Restriction</h2>
              <p>
                You must be at least 18 years old to use this service. Gambling can be addictive and should be
                approached responsibly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Accuracy of Information</h2>
              <p>
                While we strive to provide accurate and up-to-date information about casino bonuses and offers,
                we cannot guarantee the accuracy of all information. Always verify bonus terms directly with the casino.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Third-Party Links</h2>
              <p>
                Our website contains links to third-party casino websites. We are not responsible for the content,
                privacy policies, or practices of these external sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Limitation of Liability</h2>
              <p>
                Crypto Casino Hub is not responsible for any losses incurred through gambling activities. Users are
                solely responsible for their gambling decisions and should only gamble with money they can afford to lose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Newsletter Subscription</h2>
              <p>
                By subscribing to our newsletter, you consent to receive marketing emails. You can unsubscribe at any
                time using the link provided in each email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Responsible Gambling</h2>
              <p>We promote responsible gambling. If you or someone you know has a gambling problem, please seek help:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>GamCare: <a href="https://www.gamcare.org.uk" className="text-primary underline" target="_blank" rel="noopener noreferrer">www.gamcare.org.uk</a></li>
                <li>Gambling Therapy: <a href="https://www.gamblingtherapy.org" className="text-primary underline" target="_blank" rel="noopener noreferrer">www.gamblingtherapy.org</a></li>
                <li>BeGambleAware: <a href="https://www.begambleaware.org" className="text-primary underline" target="_blank" rel="noopener noreferrer">www.begambleaware.org</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of our service after changes
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Contact Information</h2>
              <p>
                For questions about these terms, please contact us at:{' '}
                <a href="mailto:legal@cryptocasinohub.com" className="text-primary underline">
                  legal@cryptocasinohub.com
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
