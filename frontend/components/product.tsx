import { TProduct } from "@/lib/types"
import Link from "next/link"

interface ProductProps {
  product: TProduct
}
/**
 * 
 * @param param0   background: white;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
  display: flex;
  flex-direction: column;
 * @returns 
 */

export const Product = ({ product }: ProductProps) => {
  return (
    <div className="bg-white border border-offWhite shadow-(--bs) flex flex-col relative">
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
        className="w-full h-[400px] object-cover"
      />
      <Link
        href={`/product/${product.id}`}
        className="-mt-12  my-4 shadow-[2px_2px_0_rgba(0,0,0,0.1)] skew-x-[-5deg] py-4 -rotate-1 text-center"
      >
        <h3 className="bg-red px-2 text-[4rem] inline text-center text-white leading-[1.3]">
          {product.name}
        </h3>
      </Link>
    </div>
  )
}
