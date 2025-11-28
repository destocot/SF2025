import { useState } from "react"

export const useForm = <T extends object>(initial: T) => {
  const [inputs, setInputs] = useState<T>(initial)

  function handleChange(
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value: rawValue, name, type } = evt.target

    let value: string | number | File = rawValue

    if (type === "number") {
      value = rawValue === "" ? "" : parseInt(rawValue, 10)
    }

    if (type === "file") {
      const files = (evt.target as HTMLInputElement).files
      if (files && files.length > 0) {
        value = files[0]
      }
    }

    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  function resetForm() {
    setInputs(initial)
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]: (keyof T)[]) => [key, ""])
    ) as T
    setInputs(blankState)
  }

  return { inputs, handleChange, resetForm, clearForm }
}
