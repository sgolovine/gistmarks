/** Via: https://stackoverflow.com/a/53449590 */
export const downloadFile = (jsonData: string, filename: string) => {
  const blob = new Blob([jsonData], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.download = filename
  link.href = url
  link.click()
}
