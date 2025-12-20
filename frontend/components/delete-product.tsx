"use client"

import { TProduct } from "@/lib/types"
import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"

interface DeleteProductProps {
  productId: string
  children: Readonly<React.ReactNode>
}

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
    }
  }
`

export const DeleteProduct = ({ productId, children }: DeleteProductProps) => {
  const [deleteProduct, { error, loading }] = useMutation<
    { deleteProduct: Pick<TProduct, "id" | "__typename"> },
    { id: string }
  >(DELETE_PRODUCT_MUTATION)

  return (
    <button
      type="button"
      className="bg-white px-2 disabled:opacity-50"
      disabled={loading}
      onClick={async () => {
        if (confirm("Are you sure you want to delete this item?")) {
          await deleteProduct({
            variables: { id: productId },
            update: (cache, { data }) => {
              if (!data) return
              cache.evict({ id: cache.identify(data.deleteProduct) })
              cache.gc()
            },
          })

          if (error) alert(error.message)
        }
      }}
    >
      {children}
    </button>
  )
}
