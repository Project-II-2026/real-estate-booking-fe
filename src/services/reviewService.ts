import type {
    CreateReviewRequest,
    PropertyReviews,
    Review,
    ReviewSearchParams,
    UpdateReviewRequest,
} from '../models/review.types.ts'
import {api} from '../api/api.ts'

export const reviewService = {
    getForProperty: (propertyId: number, params: ReviewSearchParams) =>
        api.get<PropertyReviews>(
            `/reviews/property/${propertyId}`,
            params as unknown as Record<string, unknown>,
        ),

    create: (data: CreateReviewRequest) =>
        api.post<Review>('/reviews', data),

    update: (id: number, data: UpdateReviewRequest) =>
        api.put<Review>(`/reviews/${id}`, data),

    remove: (id: number) =>
        api.delete<void>(`/reviews/${id}`),
}
