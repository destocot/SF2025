import { UpdateProduct } from "@/components/update-product"

interface PageProps {
  searchParams: Promise<{ id: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const id = (await searchParams).id

  return (
    <div>
      <UpdateProduct productId={id} />
    </div>
  )
}
