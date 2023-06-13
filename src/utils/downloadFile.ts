/**
 * Download a file programatically via JavaScript
 */
export async function downloadFile(name: string, data: Blob) {
  const url = window.URL.createObjectURL(data)
  const link = document.createElement('a')

  link.href = url
  link.download = name
  link.target = '_blank'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
