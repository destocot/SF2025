import { ApolloClient, ApolloLink } from "@apollo/client"
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs"
import { ErrorLink } from "@apollo/client/link/error"
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors"
import { InMemoryCache } from "@apollo/client"

const ENDPOINT = "http://localhost:3000/api/graphql"

function createClient() {
  return new ApolloClient({
    link: ApolloLink.from([
      new ErrorLink(({ error }) => {
        if (CombinedGraphQLErrors.is(error)) {
          error.errors.forEach(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          })
        } else if (CombinedProtocolErrors.is(error)) {
          error.errors.forEach(({ message, extensions }) => {
            console.log(
              `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
                extensions
              )}`
            )
          })
        } else {
          console.log(
            `[Network error]: ${error}. Backend is unreachable. Is it running?`
          )
        }
      }),
      new UploadHttpLink({
        uri: ENDPOINT,
        fetchOptions: { credentials: "include" },
      }),
    ]),
    cache: new InMemoryCache(),
  })
}

export const client = createClient()
