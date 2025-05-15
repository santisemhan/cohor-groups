import { PaginatedResult } from "./PaginatedResult"
import { PaginationOptions } from "./PaginationOptions"

export class Paginator {
  private static DEFAULT_PAGE_SIZE = 10
  private static MAX_PAGE_SIZE = 100

  public static async paginate<T extends Record<string, unknown>, U>(
    findManyCallback: (options: { skip: number; take: number }) => Promise<U[]>,
    countCallback: () => Promise<number>,
    options: PaginationOptions<T>
  ): Promise<PaginatedResult<U>> {
    const page = this.validatePage(options.page)
    const pageSize = this.validatePageSize(options.pageSize)
    const skip = (page - 1) * pageSize

    const [data, totalItems] = await Promise.all([findManyCallback({ skip, take: pageSize }), countCallback()])

    const totalPages = Math.ceil(totalItems / pageSize)

    return {
      data,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    }
  }

  private static validatePage(page?: number): number {
    const parsedPage = Number(page) || 1
    return Math.max(1, parsedPage)
  }

  private static validatePageSize(pageSize?: number): number {
    const parsedPageSize = Number(pageSize) || this.DEFAULT_PAGE_SIZE
    return Math.min(Math.max(1, parsedPageSize), this.MAX_PAGE_SIZE)
  }
}
