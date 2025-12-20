"use client"

import { TProduct } from "@/lib/types"
import { gql, TypedDocumentNode } from "@apollo/client"
import { ErrorMessage } from "@/components/error-message"
import { useMutation, useQuery } from "@apollo/client/react"
import { notFound } from "next/navigation"
import { useForm } from "@/components/hooks/use-form"
import { ALL_PRODUCTS_QUERY } from "@/components/products"

interface UpdateProductProps {
  productId: string
}
const SINGLE_PRODUCT_QUERY: TypedDocumentNode<{
  product: TProduct
}> = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      price
      description
    }
  }
`

const UPDATE_PRODUCT_MUTATION: TypedDocumentNode<{
  updateProduct: { id: string }
}> = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      where: { id: $id }
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`

interface FormInput {
  name: string
  price: number
  description: string
}

export const UpdateProduct = ({ productId }: UpdateProductProps) => {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: productId },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <ErrorMessage error={error} />

  const product = data?.product
  if (!product) notFound()

  return <Form product={product} />
}

interface FormProps {
  product: TProduct
}

const Form = ({ product }: FormProps) => {
  const [updateProduct, { error, loading }] = useMutation(
    UPDATE_PRODUCT_MUTATION
  )

  const { inputs, handleChange } = useForm<FormInput>({
    name: product.name,
    price: product.price,
    description: product.description,
  })

  return (
    <form
      onSubmit={async (evt) => {
        evt.preventDefault()
        await updateProduct({
          variables: {
            id: product.id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
          refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
        })

        console.log(error)
      }}
      className="shadow-[0_0_5px_3px_rgba(0,0,0,0.05)] bg-[rgba(0,0,0,0.02)] border-[5px] border-white p-5 text-[1.5rem] leading-normal font-semibold product__form"
    >
      <ErrorMessage error={error} />
      <fieldset
        disabled={loading}
        aria-busy={loading}
        className="border-0 p-0 disabled:opacity-[0.5] 
        [&::before]:h-4
        [&::before]:[content:'']
        [&::before]:block
        [&::before]:bg-[linear-gradient(to_right,#ff3019_0%,#e2b04a_50%,#ff3019_100%)]
        [&[aria-busy='true']::before]:bg-size-[50%_auto]
        [&[aria-busy='true']::before]:animate-loading
       "
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          value={inputs.price}
          onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={inputs.description}
          onChange={handleChange}
        />

        <button type="submit">+ Update Product</button>
      </fieldset>
    </form>
  )
}
