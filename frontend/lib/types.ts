export interface TProduct {
  __typename: "Product"
  id: string
  name: string
  price: number
  description: string
  photo: {
    __typename: "ProductImage"
    id: string
    image: {
      __typename: "CloudinaryImage_File"
      publicUrlTransformed: string
    }
  }
}
