export default function ResponsibleGamingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-dark-light border border-white/10 rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Responsible Gaming</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <section className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
              <p className="text-yellow-200 font-semibold text-lg">
                Gambling should be entertaining and fun, not a way to make money. Please gamble responsibly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Understanding Responsible Gambling</h2>
              <p>
                Responsible gambling means making informed decisions about gambling and understanding the risks involved.
                It's about keeping gambling fun and within your control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Warning Signs of Problem Gambling</h2>
              <p>You may have a gambling problem if you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Spend more money or time gambling than you can afford</li>
                <li>Chase losses or gamble to win back money you've lost</li>
                <li>Borrow money or sell possessions to gamble</li>
                <li>Neglect work, school, or family responsibilities due to gambling</li>
                <li>Feel guilty, anxious, or depressed about gambling</li>
                <li>Lie to others about your gambling activities</li>
                <li>Have difficulty controlling or stopping your gambling</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Tips for Responsible Gambling</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Set a budget:</strong> Only gamble with money you can afford to lose</li>
                <li><strong>Set time limits:</strong> Don't let gambling interfere with daily responsibilities</li>
                <li><strong>Never chase losses:</strong> Accept losses as part of the game</li>
                <li><strong>Take breaks:</strong> Regular breaks help maintain perspective</li>
                <li><strong>Don't gamble when upset:</strong> Avoid gambling when stressed or emotional</li>
                <li><strong>Balance gambling with other activities:</strong> Keep it as one form of entertainment</li>
                <li><strong>Don't borrow to gamble:</strong> Never use credit or loans for gambling</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Self-Exclusion Tools</h2>
              <p>
                Most reputable casinos offer self-exclusion programs that allow you to voluntarily ban yourself from
                gambling for a set period. Use these tools if you feel your gambling is becoming problematic.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Get Help</h2>
              <p>
                If you're concerned about your gambling or someone else's, help is available. These organizations
                provide free, confidential support:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-dark border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-2">GamCare</h3>
                  <p className="text-sm mb-2">Free support and counseling for problem gamblers</p>
                  <a
                    href="https://www.gamcare.org.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline text-sm"
                  >
                    www.gamcare.org.uk
                  </a>
                  <p className="text-sm mt-2">Helpline: 0808 8020 133</p>
                </div>

                <div className="bg-dark border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-2">Gambling Therapy</h3>
                  <p className="text-sm mb-2">Global support network for problem gamblers</p>
                  <a
                    href="https://www.gamblingtherapy.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline text-sm"
                  >
                    www.gamblingtherapy.org
                  </a>
                </div>

                <div className="bg-dark border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-2">BeGambleAware</h3>
                  <p className="text-sm mb-2">UK-based support and information</p>
                  <a
                    href="https://www.begambleaware.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline text-sm"
                  >
                    www.begambleaware.org
                  </a>
                  <p className="text-sm mt-2">Helpline: 0808 8020 133</p>
                </div>

                <div className="bg-dark border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-2">Gamblers Anonymous</h3>
                  <p className="text-sm mb-2">Fellowship of recovering problem gamblers</p>
                  <a
                    href="https://www.gamblersanonymous.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline text-sm"
                  >
                    www.gamblersanonymous.org
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Age Restrictions</h2>
              <p>
                You must be at least 18 years old to gamble. Underage gambling is illegal and harmful. Operators
                should have strict age verification processes in place.
              </p>
            </section>

            <section className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mt-8">
              <p className="text-red-200 font-semibold">
                If you or someone you know needs immediate help, please contact a helpline or seek professional support.
                Gambling addiction is treatable, and recovery is possible.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
