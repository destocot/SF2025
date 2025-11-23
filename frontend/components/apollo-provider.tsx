"use client"

import { ApolloProvider as Provider } from "@apollo/client/react"
import { client } from "@/lib/with-apollo"

export function ApolloProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Provider client={client}>{children}</Provider>
}
