import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Casino Hub - Best Crypto Casino News & Reviews",
  description: "Stay updated with the latest crypto casino news, reviews, and exclusive bonuses. Join our community for expert insights.",
  keywords: "crypto casino, bitcoin casino, crypto gambling, casino news, cryptocurrency betting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />

          {/* Main Content */}
          <div className="pt-16">
            {children}
          </div>

          {/* Footer */}
          <footer className="bg-dark border-t border-white/10">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Brand */}
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                    Crypto Casino Hub
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Your trusted source for crypto casino news, reviews, and expert insights.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="text-gray-400 hover:text-white transition text-sm">
                        News Feed
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile" className="text-gray-400 hover:text-white transition text-sm">
                        Profile
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/privacy" className="text-gray-400 hover:text-white transition text-sm">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-gray-400 hover:text-white transition text-sm">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link href="/responsible-gaming" className="text-gray-400 hover:text-white transition text-sm">
                        Responsible Gaming
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Contact</h4>
                  <p className="text-gray-400 text-sm">
                    Questions? Feedback?
                    <br />
                    <a href="mailto:support@cryptocasinohub.com" className="text-primary hover:text-primary-dark underline">
                      support@cryptocasinohub.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-8 border-t border-white/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-gray-400 text-sm">
                    © 2024 Crypto Casino Hub. All rights reserved.
                  </p>
                  <p className="text-gray-500 text-xs">
                    Gambling can be addictive. Please play responsibly. 18+
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
