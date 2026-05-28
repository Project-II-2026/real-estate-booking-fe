import React from 'react'
import {Link} from "react-router";
import type {Booking} from "../../models/booking.types.ts";
import {formatBookingDateTime, isWithinCancellationCutoff} from "../../utils/bookingTime.ts";
import {useCancelBooking} from "../../hooks/useBookings.ts";

interface Props {
    booking: Booking
    hideCancel?: boolean
    showVisitor?: boolean
    isLast?: boolean
}

const statusDotClass = (status: string) => {
    switch (status) {
        case 'Confirmed':
            return 'confirmed'
        case 'Cancelled':
            return 'cancelled'
        default:
            return 'pending'
    }
}

export const BookingRow: React.FC<Props> = ({booking, hideCancel, showVisitor, isLast}) => {
    const {mutate: cancel, isPending, isError, error, reset} = useCancelBooking()

    const isConfirmed = booking.status === 'Confirmed'
    const tooLate = isWithinCancellationCutoff(booking.startTime)
    const canCancel = !hideCancel && isConfirmed && !tooLate

    const handleCancel = () => {
        reset()
        cancel(booking.id)
    }

    return (
        <div className={`d-flex flex-column py-4${isLast ? '' : ' hairline-bottom'}`}>
            <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                <div className="flex-grow-1 min-width-0">
                    {showVisitor ? (
                        <div className="fw-medium tracking-snug mb-1" style={{fontSize: "1rem"}}>
                            {booking.visitorUsername}
                        </div>
                    ) : (
                        <Link
                            to={`/properties/${booking.propertyId}`}
                            className="d-block fw-medium tracking-snug mb-1 text-truncate"
                            style={{fontSize: "1rem", color: "var(--bone)"}}
                        >
                            {booking.propertyTitle}
                        </Link>
                    )}
                    <p className="small text-bone-muted mb-0">
                        {formatBookingDateTime(booking.startTime)}
                    </p>
                </div>
                <div className="d-inline-flex align-items-center gap-2 flex-shrink-0">
                    <span className={`status-dot ${statusDotClass(booking.status)}`} aria-hidden="true"/>
                    <span className="small text-bone-muted">{booking.status}</span>
                </div>
            </div>

            {isError && (
                <div className="alert alert-danger mb-2">
                    {error?.message ?? 'Could not cancel booking.'}
                </div>
            )}

            {!hideCancel && isConfirmed && (
                <div className="d-flex justify-content-end">
                    {canCancel ? (
                        !isPending ? (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="btn btn-light btn-sm fw-medium"
                            >
                                Cancel
                            </button>
                        ) : (
                            <button type="button" className="btn btn-light btn-sm" disabled>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                                Cancelling…
                            </button>
                        )
                    ) : (
                        <span
                            className="small text-bone-faint"
                            title="Cancellations close 12 hours before the visit"
                        >
                            Cancellation closed
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}
