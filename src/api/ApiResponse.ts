type ApiResponse<T> = {
  errorCode: string | null,
  message: string | null,
  result: T | null
}

export default ApiResponse

