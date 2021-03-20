export function validateStatus(statusCode: number): boolean {
  if (statusCode >= 200 && statusCode <= 299) {
    return true
  }
  return false
}
