import { ErrorLike } from "@apollo/client"

type NetworkErrorWithResult = {
  networkError?: { result: { errors: { message: string }[] } }
  message?: string
}

type ErrorMessageProps = {
  error: ErrorLike | NetworkErrorWithResult | undefined
}

const hasNetworkError = (
  error: ErrorLike | NetworkErrorWithResult | undefined
): error is { networkError: { result: { errors: { message: string }[] } } } => {
  return !!(
    error &&
    "networkError" in error &&
    error.networkError?.result?.errors
  )
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error || !error.message) return null

  if (hasNetworkError(error)) {
    return error.networkError.result.errors.map(
      (err: { message: string }, i: number) => (
        <div
          key={i}
          className="p-8 bg-white my-8 border border-[rgba(0,0,0,0.05)] border-l-[5px] border-l-red"
        >
          <p data-test="graphql-error" className="m-0 font-thin">
            <strong className="mr-4">Shoot!</strong>
            {err.message.replace("GraphQL error: ", "")}
          </p>
        </div>
      )
    )
  }

  return (
    <div className="p-8 bg-white my-8 border border-[rgba(0,0,0,0.05)] border-l-[5px] border-l-red">
      <p data-test="graphql-error" className="m-0 font-thin">
        <strong className="mr-4">Shoot!</strong>
        {error.message.replace("GraphQL error: ", "")}
      </p>
    </div>
  )
}
