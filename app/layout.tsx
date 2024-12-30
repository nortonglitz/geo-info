import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Topbar } from "@/components"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Geographic Information",
  description: "Shows data about a place."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50`}>
        <Topbar />
        {children}
      </body>
    </html>
  )
}
