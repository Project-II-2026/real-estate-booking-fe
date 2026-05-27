import React, {useMemo, useState} from 'react'
import type {PropertyResponseDto} from "../../models/property.types.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {useAvailability, useCreateBooking} from "../../hooks/useBookings.ts";
import {
    addDays,
    buildDaySlots,
    formatBookingDateTime,
    startOfLocalDay,
    takenSetFromSlots,
} from "../../utils/bookingTime.ts";
import {DAY_PICKER_MAX_AHEAD_DAYS} from "../../config/booking.ts";

interface Props {
    property: PropertyResponseDto
}

export const BookVisitCard: React.FC<Props> = ({property}) => {
    const {user} = useAuth()
    const isOwner = user?.id === property.ownerId

    const [selectedDay, setSelectedDay] = useState<Date>(() => addDays(startOfLocalDay(new Date()), 1))
    const [selectedIso, setSelectedIso] = useState<string | null>(null)

    const {data: takenSlots, isLoading: isLoadingSlots} = useAvailability(property.id)
    const {mutate: createBooking, isPending, isError, error, isSuccess, reset} = useCreateBooking()

    const takenSet = useMemo(() => takenSetFromSlots(takenSlots ?? []), [takenSlots])
    const slots = useMemo(() => buildDaySlots(selectedDay, takenSet), [selectedDay, takenSet])

    if (isOwner) {
        return (
            <div className="bg-body-tertiary rounded-4 shadow-sm p-4">
                <h5 className="fw-semibold mb-1">Book a visit</h5>
                <p className="text-body-secondary small mb-0">
                    You own this listing — bookings are made by other users.
                </p>
            </div>
        )
    }

    const minDay = addDays(startOfLocalDay(new Date()), 1)
    const maxDay = addDays(minDay, DAY_PICKER_MAX_AHEAD_DAYS)
    const canGoPrev = selectedDay.getTime() > minDay.getTime()
    const canGoNext = selectedDay.getTime() < maxDay.getTime()

    const dayLabel = new Intl.DateTimeFormat(undefined, {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(selectedDay)

    const handlePrevDay = () => {
        if (!canGoPrev) return
        setSelectedDay(prev => addDays(prev, -1))
        setSelectedIso(null)
        reset()
    }

    const handleNextDay = () => {
        if (!canGoNext) return
        setSelectedDay(prev => addDays(prev, 1))
        setSelectedIso(null)
        reset()
    }

    const handleConfirm = () => {
        if (!selectedIso) return
        if (takenSet.has(selectedIso)) {
            setSelectedIso(null)
            return
        }
        createBooking(
            {propertyId: property.id, startTime: selectedIso},
            {onSuccess: () => setSelectedIso(null)},
        )
    }

    return (
        <div className="bg-body-tertiary rounded-4 shadow-sm p-4">
            <h5 className="fw-semibold mb-1">Book a visit</h5>
            <p className="text-body-secondary small mb-4">Pick a 30-minute slot to schedule a viewing.</p>

            <div className="d-flex align-items-center justify-content-between mb-3">
                <button
                    type="button"
                    className="btn btn-light rounded-pill btn-sm shadow-sm"
                    onClick={handlePrevDay}
                    disabled={!canGoPrev}
                    aria-label="Previous day"
                >
                    <i className="bi bi-chevron-left"/>
                </button>
                <span className="fw-semibold">{dayLabel}</span>
                <button
                    type="button"
                    className="btn btn-light rounded-pill btn-sm shadow-sm"
                    onClick={handleNextDay}
                    disabled={!canGoNext}
                    aria-label="Next day"
                >
                    <i className="bi bi-chevron-right"/>
                </button>
            </div>

            {isLoadingSlots ? (
                <div className="text-center py-4">
                    <div className="spinner-border spinner-border-sm text-dark" role="status"/>
                </div>
            ) : (
                <div className="d-flex flex-wrap gap-2 mb-3">
                    {slots.length === 0 && (
                        <p className="text-body-secondary small mb-0">No available slots on this day.</p>
                    )}
                    {slots.map(slot => {
                        const isSelected = slot.isoStart === selectedIso
                        return (
                            <button
                                key={slot.isoStart}
                                type="button"
                                disabled={slot.past}
                                onClick={() => {
                                    setSelectedIso(slot.isoStart)
                                    reset()
                                }}
                                className={`btn btn-sm rounded-pill shadow-sm ${isSelected ? 'btn-dark' : 'btn-light'}`}
                            >
                                {slot.label}
                            </button>
                        )
                    })}
                </div>
            )}

            {isError && (
                <div className="alert alert-danger py-2 small mb-3">
                    {error?.message ?? 'Could not create booking.'}
                </div>
            )}
            {isSuccess && (
                <div className="alert alert-success py-2 small mb-3">
                    Booking confirmed.
                </div>
            )}

            <p className="text-body-secondary small mb-2">
                {selectedIso ? `Selected: ${formatBookingDateTime(selectedIso)}` : 'Select a time slot above.'}
            </p>

            {!isPending ? (
                <button
                    type="button"
                    className="btn btn-dark btn-lg w-100 fw-semibold rounded-pill shadow-sm"
                    onClick={handleConfirm}
                    disabled={!selectedIso}
                >
                    <i className="bi bi-calendar-check-fill me-2"/>
                    Confirm visit
                </button>
            ) : (
                <button className="btn btn-dark btn-lg w-100 rounded-pill shadow-sm" type="button" disabled>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                    Booking...
                </button>
            )}
        </div>
    )
}
