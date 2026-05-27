import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import type {BookingSearchParams, CreateBookingRequest} from "../models/booking.types.ts";
import {bookingService} from "../services/bookingService.ts";

const BOOKINGS_KEY = ['bookings'] as const

export const useAvailability = (propertyId: number) =>
    useQuery({
        queryKey: [...BOOKINGS_KEY, 'availability', propertyId],
        queryFn: () => bookingService.getAvailability(propertyId),
        enabled: Number.isFinite(propertyId) && propertyId > 0,
    })

export const useMyBookings = (params: BookingSearchParams) =>
    useQuery({
        queryKey: [...BOOKINGS_KEY, 'me', params],
        queryFn: () => bookingService.getMine(params),
    })

export const useBooking = (id: number) =>
    useQuery({
        queryKey: [...BOOKINGS_KEY, id],
        queryFn: () => bookingService.getById(id),
        enabled: Number.isFinite(id) && id > 0,
    })

export const usePropertyBookings = (propertyId: number, params: BookingSearchParams) =>
    useQuery({
        queryKey: [...BOOKINGS_KEY, 'property', propertyId, params],
        queryFn: () => bookingService.getPropertyBookings(propertyId, params),
        enabled: Number.isFinite(propertyId) && propertyId > 0,
    })

export const useCreateBooking = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateBookingRequest) => bookingService.create(data),
        onSuccess: (_booking, vars) => {
            queryClient.invalidateQueries({queryKey: [...BOOKINGS_KEY, 'availability', vars.propertyId]})
            queryClient.invalidateQueries({queryKey: [...BOOKINGS_KEY, 'me']})
            queryClient.invalidateQueries({queryKey: [...BOOKINGS_KEY, 'property', vars.propertyId]})
        },
    })
}

export const useCancelBooking = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => bookingService.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: BOOKINGS_KEY})
        },
    })
}
