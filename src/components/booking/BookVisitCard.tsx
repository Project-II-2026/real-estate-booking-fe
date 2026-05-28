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
            <div className="hairline-top pt-4">
                <div className="eyebrow mb-2">Book a visit</div>
                <p className="text-bone-muted small mb-0">
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
        <div className="hairline-top pt-4">
            <div className="eyebrow mb-3">Book a visit</div>

            <div className="d-flex align-items-center justify-content-between mb-3">
                <button
                    type="button"
                    className="icon-btn"
                    style={{width: 32, height: 32}}
                    onClick={handlePrevDay}
                    disabled={!canGoPrev}
                    aria-label="Previous day"
                >
                    <i className="bi bi-chevron-left" style={{fontSize: 12}}/>
                </button>
                <span className="fw-medium" style={{fontSize: "0.9375rem"}}>{dayLabel}</span>
                <button
                    type="button"
                    className="icon-btn"
                    style={{width: 32, height: 32}}
                    onClick={handleNextDay}
                    disabled={!canGoNext}
                    aria-label="Next day"
                >
                    <i className="bi bi-chevron-right" style={{fontSize: 12}}/>
                </button>
            </div>

            {isLoadingSlots ? (
                <div className="text-center py-4">
                    <div className="spinner-border spinner-border-sm text-bone-muted" role="status"/>
                </div>
            ) : (
                <div className="row row-cols-4 g-2 mb-3">
                    {slots.length === 0 && (
                        <div className="col-12">
                            <p className="text-bone-muted small mb-0">No available slots on this day.</p>
                        </div>
                    )}
                    {slots.map(slot => {
                        const isSelected = slot.isoStart === selectedIso
                        return (
                            <div key={slot.isoStart} className="col">
                                <button
                                    type="button"
                                    disabled={slot.past}
                                    onClick={() => {
                                        setSelectedIso(slot.isoStart)
                                        reset()
                                    }}
                                    className={`slot-pill w-100${isSelected ? ' active' : ''}`}
                                >
                                    {slot.label}
                                </button>
                            </div>
                        )
                    })}
                </div>
            )}

            {isError && (
                <div className="alert alert-danger mb-3">
                    {error?.message ?? 'Could not create booking.'}
                </div>
            )}
            {isSuccess && (
                <div className="alert alert-success mb-3">
                    Booking confirmed.
                </div>
            )}

            <p className="text-bone-muted small mb-3">
                {selectedIso ? `Selected: ${formatBookingDateTime(selectedIso)}` : 'Pick a 30-minute slot.'}
            </p>

            {!isPending ? (
                <button
                    type="button"
                    className="btn btn-primary w-100 fw-medium d-flex align-items-center justify-content-center gap-2"
                    onClick={handleConfirm}
                    disabled={!selectedIso}
                >
                    <i className="bi bi-calendar-check"/>
                    Confirm visit
                </button>
            ) : (
                <button className="btn btn-primary w-100" type="button" disabled>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                    Booking…
                </button>
            )}
        </div>
    )
}
