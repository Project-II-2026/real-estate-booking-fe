import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import type {
    CreateReviewRequest,
    ReviewSearchParams,
    UpdateReviewRequest,
} from '../models/review.types.ts'
import {reviewService} from '../services/reviewService.ts'

const REVIEWS_KEY = ['reviews'] as const

export const usePropertyReviews = (propertyId: number, params: ReviewSearchParams) =>
    useQuery({
        queryKey: [...REVIEWS_KEY, 'property', propertyId, params],
        queryFn: () => reviewService.getForProperty(propertyId, params),
        enabled: Number.isFinite(propertyId) && propertyId > 0,
    })

export const useCreateReview = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateReviewRequest) => reviewService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: REVIEWS_KEY})
        },
    })
}

export const useUpdateReview = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id, data}: {id: number; data: UpdateReviewRequest}) =>
            reviewService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: REVIEWS_KEY})
        },
    })
}

export const useDeleteReview = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => reviewService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: REVIEWS_KEY})
        },
    })
}
