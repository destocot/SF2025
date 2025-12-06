"use client"

import type { TProduct } from "@/lib/types"
import { gql, TypedDocumentNode } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { Product } from "./product"

export const ALL_PRODUCTS_QUERY: TypedDocumentNode<
  { products: Array<TProduct> },
  Record<string, never>
> = gql`
  query ALL_PRODUCTS_QUERY {
    products {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

export const Products = () => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <div className="grid grid-cols-2 gap-[60px]">
        {data?.products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
