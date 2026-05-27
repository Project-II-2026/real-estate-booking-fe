import {
    CANCELLATION_CUTOFF_HOURS,
    SLOT_DURATION_MINUTES,
    SLOT_GRID_END_HOUR,
    SLOT_GRID_START_HOUR,
} from "../config/booking.ts";
import type {Booking, BookingSlot} from "../models/booking.types.ts";

export interface DaySlot {
    isoStart: string
    label: string
    past: boolean
}

export const addDays = (date: Date, n: number): Date => {
    const out = new Date(date)
    out.setDate(out.getDate() + n)
    return out
}

export const startOfLocalDay = (date: Date): Date => {
    const out = new Date(date)
    out.setHours(0, 0, 0, 0)
    return out
}

export const buildDaySlots = (
    day: Date,
    takenSet: Set<string>,
): DaySlot[] => {
    const slots: DaySlot[] = []
    const now = Date.now()
    const base = startOfLocalDay(day)
    const stepMs = SLOT_DURATION_MINUTES * 60_000
    const firstSlot = new Date(base)
    firstSlot.setHours(SLOT_GRID_START_HOUR, 0, 0, 0)
    const lastSlotExclusive = new Date(base)
    lastSlotExclusive.setHours(SLOT_GRID_END_HOUR, 0, 0, 0)

    for (let t = firstSlot.getTime(); t < lastSlotExclusive.getTime(); t += stepMs) {
        const slotDate = new Date(t)
        const isoStart = slotDate.toISOString()
        if (takenSet.has(isoStart)) continue
        slots.push({
            isoStart,
            label: slotDate.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'}),
            past: t <= now,
        })
    }
    return slots
}

export const formatBookingDateTime = (iso: string): string =>
    new Intl.DateTimeFormat(undefined, {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(iso))

export const formatBookingDateOnly = (iso: string): string =>
    new Intl.DateTimeFormat(undefined, {dateStyle: 'medium'}).format(new Date(iso))

export const formatBookingTimeOnly = (iso: string): string =>
    new Intl.DateTimeFormat(undefined, {timeStyle: 'short'}).format(new Date(iso))

export const isWithinCancellationCutoff = (startTimeIso: string): boolean => {
    const diffMs = new Date(startTimeIso).getTime() - Date.now()
    return diffMs < CANCELLATION_CUTOFF_HOURS * 60 * 60 * 1000
}

export const hasVisitedProperty = (bookings: Booking[], propertyId: number): boolean => {
    const now = Date.now()
    return bookings.some(b =>
        b.propertyId === propertyId
        && b.status === 'Confirmed'
        && new Date(b.endTime).getTime() < now,
    )
}

export const splitUpcomingPast = (bookings: Booking[]): { upcoming: Booking[]; past: Booking[] } => {
    const now = Date.now()
    const upcoming: Booking[] = []
    const past: Booking[] = []
    bookings.forEach(b => {
        if (new Date(b.endTime).getTime() >= now) upcoming.push(b)
        else past.push(b)
    })
    return {upcoming, past}
}

export const takenSetFromSlots = (slots: BookingSlot[]): Set<string> =>
    new Set(slots.map(s => new Date(s.startTime).toISOString()))
