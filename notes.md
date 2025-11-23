```
"use client"

import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import Image from "next/image"
import { TypedDocumentNode } from "@apollo/client"

type GET_PRODUCTS_QUERY = {
  products: {
    __typename: "Product"
    id: string
    name: string
    description: string
    price: number
    photo: {
      __typename: "ProductImage"
      image: {
        __typename: "Image"
        publicUrl: string
      } | null
      altText: string | null
    } | null
  }[]
}
type GetProductQueryVariables = Record<string, never>

const GET_PRODUCTS: TypedDocumentNode<
  GET_PRODUCTS_QUERY,
  GetProductQueryVariables
> = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      photo {
        image {
          publicUrl
        }
        altText
      }
    }
  }
`
export default function HomePage() {
  const { loading, error, data } = useQuery(GET_PRODUCTS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.products.map((product) => (
        <div
          key={product.id}
          className="rounded-lg border border-grey bg-lightGrey p-6 shadow-sm"
        >
          {product.photo?.image?.publicUrl && (
            <div className="relative mb-4 h-48 w-full">
              <Image
                src={product.photo.image.publicUrl}
                alt={product.photo.altText || product.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <h3 className="text-lg font-semibold text-black">{product.name}</h3>
          <p className="mt-2 text-sm text-grey">{product.description}</p>
          <p className="mt-4 text-xl font-bold text-red">${product.price}</p>
        </div>
      ))}
    </div>
  )
}
```
