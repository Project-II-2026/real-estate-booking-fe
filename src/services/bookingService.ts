import type {PaginationResponse} from "../models/pagination.types.ts";
import type {
    Booking,
    BookingAdminUpdateRequest,
    BookingSearchParams,
    BookingSlot,
    CreateBookingRequest,
} from "../models/booking.types.ts";
import {api} from "../api/api.ts";

export const bookingService = {
    getAvailability: (propertyId: number) =>
        api.get<BookingSlot[]>(`/properties/${propertyId}/availability`),

    create: (data: CreateBookingRequest) =>
        api.post<Booking>('/bookings', data),

    getMine: (params: BookingSearchParams) =>
        api.get<PaginationResponse<Booking>>('/bookings/me', params as unknown as Record<string, unknown>),

    getById: (id: number) =>
        api.get<Booking>(`/bookings/${id}`),

    cancel: (id: number) =>
        api.delete<void>(`/bookings/${id}`),

    getPropertyBookings: (propertyId: number, params: BookingSearchParams) =>
        api.get<PaginationResponse<Booking>>(
            `/properties/${propertyId}/bookings`,
            params as unknown as Record<string, unknown>,
        ),

    getAll: (params: BookingSearchParams) =>
        api.get<PaginationResponse<Booking>>('/admin/bookings', params as unknown as Record<string, unknown>),

    adminUpdate: (id: number, data: BookingAdminUpdateRequest) =>
        api.put<Booking>(`/admin/bookings/${id}`, data),

    adminDelete: (id: number) =>
        api.delete<void>(`/admin/bookings/${id}`),
}
