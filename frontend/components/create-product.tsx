"use client"

import { useForm } from "@/components/hooks/use-form"

interface FormInput {
  image: string
  name: string
  price: number
  description: string
}

const LabelClasses = "block mb-4"

const InputClasses =
  "w-full p-2 text-[1rem] border focus:outline-0 focus:border-red"

const ButtonClasses =
  "w-auto bg-red mr-[0.25em] my-[0.25em] text-white border-0 text-[2rem] font-semibold py-2 px-[1.2rem]"

export const CreateProduct = () => {
  const { inputs, handleChange } = useForm<FormInput>({
    image: "",
    name: "Nice Shoes",
    price: 54234,
    description: "These are the best shoes!",
  })

  return (
    <form
      onSubmit={async (evt) => {
        evt.preventDefault()
        console.dir({ inputs }, { colors: true })
      }}
      className="shadow-[0_0_5px_3px_rgba(0,0,0,0.05)] bg-[rgba(0,0,0,0.02)] border-[5px] border-white p-5 text-[1.5rem] leading-normal font-semibold"
    >
      <fieldset
        className="border-0 p-0 disabled:opacity-[0.5] 
       [&::before]:h-2.5
       [&::before]:[content:'']
       [&::before]:block
       [&::before]:bg-[linear-gradient(to_right,#ff3019_0%,#e2b04a_50%,#ff3019_100%)]
       [&[aria-busy='true']::before]:bg-size-[50%_auto]
       [&[aria-busy='true']::before]:animate-loading
      "
      >
        <label htmlFor="image" className={LabelClasses}>
          Image
        </label>
        <input
          required
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
          className={InputClasses}
        />

        <label htmlFor="name" className={LabelClasses}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
          className={InputClasses}
        />

        <label htmlFor="price" className={LabelClasses}>
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          value={inputs.price}
          onChange={handleChange}
          className={InputClasses}
        />

        <label htmlFor="description" className={LabelClasses}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={inputs.description}
          onChange={handleChange}
          className={InputClasses}
        />

        <button type="submit" className={ButtonClasses}>
          + Add Product
        </button>
      </fieldset>
    </form>
  )
}
