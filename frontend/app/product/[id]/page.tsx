import { SingleProduct } from "@/components/single-product"
import { Metadata } from "next"

interface PageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: "Product Details",
}

export default async function Page({ params }: PageProps) {
  const id = (await params).id

  return (
    <div>
      <SingleProduct productId={id} />
    </div>
  )
}
