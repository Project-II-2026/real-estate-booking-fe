import type {PaginationResponse} from './pagination.types.ts'

export interface Review {
    id: number
    propertyId: number
    propertyTitle: string
    reviewerId: number
    reviewerUsername: string
    rating: number
    comment: string
    createdAt: string
    updatedAt: string
}

export interface PropertyReviews extends PaginationResponse<Review> {
    averageRating: number
}

export interface CreateReviewRequest {
    propertyId: number
    rating: number
    comment: string
}

export interface UpdateReviewRequest {
    rating: number
    comment: string
}

export interface ReviewSearchParams {
    page: number
    pageSize: number
}
