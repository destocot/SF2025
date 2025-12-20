import type { Metadata } from "next"
import LocalFont from "next/font/local"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { TopLoader } from "@/components/layout/top-loader"
import { ApolloProvider } from "@/components/providers/apollo-provider"

const radnika = LocalFont({
  src: "../public/radnikanext-medium.woff2",
  weight: "400",
  style: "normal",
})

export const metadata: Metadata = {
  title: {
    template: "Sick Fits | %s",
    default: "Sick Fits",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${radnika.className} antialiased`}>
        <ApolloProvider>
          <TopLoader />

          <Header />

          <div className="container">{children}</div>
        </ApolloProvider>
      </body>
    </html>
  )
}
