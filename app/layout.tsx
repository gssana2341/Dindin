import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import { Toaster } from "@/components/ui/toaster"

// กำหนดฟอนต์ Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "DInDIn - Real Estate Platform",
  description: "Find your dream property with DInDIn",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Header />
            <main className="min-h-screen">{children}</main>
            <footer className="bg-teal-800 text-white p-6">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">DInDIn</h3>
                    <p>Your trusted real estate platform</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Contact</h3>
                    <p>Email: contact@dindin.com</p>
                    <p>Phone: 123-456-7890</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="hover:text-teal-300">
                        Facebook
                      </a>
                      <a href="#" className="hover:text-teal-300">
                        Twitter
                      </a>
                      <a href="#" className="hover:text-teal-300">
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <p>© {new Date().getFullYear()} DInDIn. All rights reserved.</p>
                </div>
              </div>
            </footer>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
