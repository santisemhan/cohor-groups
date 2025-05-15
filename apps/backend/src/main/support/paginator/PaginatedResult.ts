export interface PaginatedResult<T> {
  data: T[]
  pagination: {
    totalItems: number
    totalPages: number
    currentPage: number
    pageSize: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}
