import type { Metadata } from "next"
import "./globals.css"
import Manifest from "@/lib/manifest"
import LocalFont from "next/font/local"

const fontSans = LocalFont({
  src: [
    {
      path: "../components/fonts/OpenSauceOne-Bold.ttf",
      weight: "700",
      style: "normal"
    },
    {
      path: "../components/fonts/OpenSauceOne-Medium.ttf",
      weight: "500",
      style: "normal"
    },
    {
      path: "../components/fonts/OpenSauceOne-Regular.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../components/fonts/OpenSauceOne-Semibold.ttf",
      weight: "600",
      style: "normal"
    }
  ],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: Manifest.PROJECT_NAME,
  description: Manifest.PROJECT_DESCRIPTION
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`min-h-screen ${fontSans.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
