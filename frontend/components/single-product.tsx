"use client"

import { TProduct } from "@/lib/types"
import { gql, TypedDocumentNode } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { ErrorMessage } from "./error-message"
import { notFound } from "next/navigation"

const SINGLE_PRODUCT_QUERY: TypedDocumentNode<{
  product: TProduct
}> = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`

interface SingleProductProps {
  productId: string
}

export const SingleProduct = ({ productId }: SingleProductProps) => {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: productId },
  })

  if (loading) return <p>Loading...</p>

  if (error) return <ErrorMessage error={error} />

  if (!data) notFound()

  const product = data.product

  return (
    <div className="grid auto-cols-[1fr] grid-flow-col min-h-[800px items-start max-w-[--maxWidth] gap-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="w-full object-contain"
        src={product.photo.image.publicUrlTransformed}
        alt={product.photo.altText}
      />

      <div>
        <h2 className="text-[1.5em]">{product.name}</h2>

        <p>{product.description}</p>
      </div>
    </div>
  )
}
