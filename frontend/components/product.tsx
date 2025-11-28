import type { TProduct } from "@/lib/types"
import { formatMoney } from "@/lib/utils"
import Link from "next/link"

interface ProductProps {
  product: TProduct
}

export const Product = ({ product }: ProductProps) => {
  return (
    <div className="bg-white border border-offWhite shadow-(--bs) flex flex-col relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
        className="w-full h-[400px] object-cover"
      />
      <h3 className="mx-4 -mt-12 skew-x-[-5deg] -rotate-1 text-center     [text-shadow:2px_2px_0_rgba(0,0,0,0.1)]">
        <Link
          href={`/product/${product.id}`}
          className="bg-red inline leading-[1.3] text-[4rem] text-center text-white px-4"
        >
          {product.name}
        </Link>
      </h3>
      <span className="bg-red rotate-3 text-white font-semibold p-[5px] leading-none text-[3rem] inline-block absolute top-[-3px] right-[-3px]">
        {formatMoney(product.price)}
      </span>
      <p>{product.description}</p>
      {/* TODO: Add buttons to edit and delete item */}
    </div>
  )
}
