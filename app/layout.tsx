import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { BackgroundOrbs } from "@/components/background-orbs"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "WildRose Painters | Professional Painting Services in Calgary, Edmonton & Alberta",
  description:
    "Alberta's trusted painting contractor network. Connect with top-rated local painters in Calgary, Edmonton, Red Deer, Lethbridge & across Alberta. Residential & commercial painting services. Free quotes.",
  keywords: [
    "painters Calgary",
    "painters Edmonton",
    "painting services Alberta",
    "house painters Calgary",
    "commercial painters Edmonton",
    "residential painting Alberta",
    "deck staining Calgary",
    "fence painting Edmonton",
    "interior painting Red Deer",
    "exterior painting Lethbridge",
    "painting contractors Alberta",
    "local painters near me",
  ].join(", "),
  authors: [{ name: "Karim Youssef", url: "https://kygroup.ca" }],
  creator: "Karim Youssef",
  publisher: "WildRose Painters",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://wildrosepainters.ca",
    title: "WildRose Painters | Alberta's Premier Painting Contractor Network",
    description:
      "Connect with the best local painting contractors in Calgary, Edmonton & across Alberta. Professional residential & commercial painting services.",
    siteName: "WildRose Painters",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "WildRose Painters - Alberta Painting Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WildRose Painters | Alberta Painting Services",
    description: "Connect with top-rated local painters in Calgary, Edmonton & across Alberta",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://wildrosepainters.ca",
  },
  other: {
    "geo.region": "CA-AB",
    "geo.placename": "Alberta",
    "geo.position": "53.9333;-116.5765", // Edmonton coordinates
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable}`}>
        <BackgroundOrbs />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
