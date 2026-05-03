export interface PaginationRequest {
    page: number
    pageSize: number
}

export interface PaginationResponse<T> {
    items: T[]
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}
