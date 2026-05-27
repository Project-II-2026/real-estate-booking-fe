export const BookingStatus = {
    Confirmed: 'Confirmed',
    Cancelled: 'Cancelled',
} as const

export type BookingStatus = typeof BookingStatus[keyof typeof BookingStatus]

export interface Booking {
    id: number
    propertyId: number
    propertyTitle: string
    visitorId: number
    visitorUsername: string
    startTime: string
    endTime: string
    status: BookingStatus
}

export interface BookingSlot {
    startTime: string
    endTime: string
}

export interface CreateBookingRequest {
    propertyId: number
    startTime: string
}

export interface BookingSearchParams {
    page: number
    pageSize: number
    status?: BookingStatus
    from?: string
    to?: string
}
