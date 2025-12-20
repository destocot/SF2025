import { SingleProduct } from "@/components/single-product"
import { Metadata } from "next"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = (await params).id

  const res = await fetch(process.env.API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query SINGLE_PRODUCT_QUERY($id: ID!) {
          product(where: { id: $id }) {
            id
            name
          }
        }
      `,
      variables: { id },
    }),
    cache: "no-store",
  })

  const json = await res.json()
  const product = json.data.product

  return {
    title: product.name,
  }
}

export default async function Page({ params }: PageProps) {
  const id = (await params).id

  return (
    <>
      <SingleProduct productId={id} />
    </>
  )
}
