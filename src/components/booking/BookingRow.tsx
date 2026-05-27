import React from 'react'
import {Link} from "react-router";
import type {Booking} from "../../models/booking.types.ts";
import {formatBookingDateTime, isWithinCancellationCutoff} from "../../utils/bookingTime.ts";
import {useCancelBooking} from "../../hooks/useBookings.ts";

interface Props {
    booking: Booking
    hideCancel?: boolean
    showVisitor?: boolean
}

export const BookingRow: React.FC<Props> = ({booking, hideCancel, showVisitor}) => {
    const {mutate: cancel, isPending, isError, error, reset} = useCancelBooking()

    const isConfirmed = booking.status === 'Confirmed'
    const tooLate = isWithinCancellationCutoff(booking.startTime)
    const canCancel = !hideCancel && isConfirmed && !tooLate

    const statusClass = isConfirmed ? 'text-bg-light' : 'text-bg-dark bg-opacity-75'

    const handleCancel = () => {
        reset()
        cancel(booking.id)
    }

    return (
        <div className="bg-body-tertiary rounded-4 shadow-sm p-4 mb-3">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                <div>
                    {showVisitor ? (
                        <p className="fw-semibold mb-1">{booking.visitorUsername}</p>
                    ) : (
                        <Link
                            to={`/properties/${booking.propertyId}`}
                            className="fw-semibold text-decoration-none text-body"
                        >
                            {booking.propertyTitle}
                        </Link>
                    )}
                    <p className="small text-body-secondary mb-0">
                        {formatBookingDateTime(booking.startTime)}
                    </p>
                </div>
                <span className={`badge ${statusClass} rounded-pill px-3 py-2 shadow-sm`}>
                    {booking.status}
                </span>
            </div>

            {isError && (
                <div className="alert alert-danger py-2 small mb-2">
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
                                className="btn btn-light rounded-pill btn-sm fw-medium shadow-sm px-3"
                            >
                                Cancel
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-light rounded-pill btn-sm shadow-sm px-3"
                                disabled
                            >
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                                Cancelling...
                            </button>
                        )
                    ) : (
                        <span
                            className="small text-body-secondary"
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
