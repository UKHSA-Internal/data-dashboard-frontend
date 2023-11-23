// Calculate the offset based on the current page and page size
export function calculatePageOffset(currentPage: number, pageSize: number) {
  return (currentPage - 1) * pageSize
}
