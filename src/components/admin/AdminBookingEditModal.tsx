import * as React from 'react'
import {useState} from 'react'
import type {Booking} from '../../models/booking.types.ts'
import {BookingStatus} from '../../models/booking.types.ts'
import {useAdminUpdateBooking} from '../../hooks/useBookings.ts'

interface Props {
    booking: Booking
    onClose: () => void
}

const BACKDROP_STYLE: React.CSSProperties = {
    backgroundColor: "rgba(10, 9, 7, 0.75)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
}

const toLocalInput = (iso: string): string => {
    const d = new Date(iso)
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const toIsoUtc = (local: string): string => new Date(local).toISOString()

export const AdminBookingEditModal: React.FC<Props> = ({booking, onClose}) => {
    const [startTime, setStartTime] = useState(toLocalInput(booking.startTime))
    const [endTime, setEndTime] = useState(toLocalInput(booking.endTime))
    const [status, setStatus] = useState<BookingStatus>(booking.status)
    const [localError, setLocalError] = useState('')

    const {mutate, reset, isPending, isError, error} = useAdminUpdateBooking()

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!startTime || !endTime) {
            setLocalError('Start and end time are required.')
            return
        }
        if (new Date(endTime) <= new Date(startTime)) {
            setLocalError('End time must be after start time.')
            return
        }

        setLocalError('')
        reset()
        mutate(
            {
                id: booking.id,
                data: {
                    startTime: toIsoUtc(startTime),
                    endTime: toIsoUtc(endTime),
                    status,
                },
            },
            {onSuccess: () => onClose()},
        )
    }

    return (
        <div
            className="modal show d-block"
            tabIndex={-1}
            style={BACKDROP_STYLE}
            onClick={() => !isPending && onClose()}
        >
            <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between align-items-start">
                            <div>
                                <div className="eyebrow mb-1">Admin · Edit booking</div>
                                <h2 className="fw-semibold tracking-tight mb-0" style={{fontSize: "1.5rem"}}>
                                    {booking.propertyTitle}
                                </h2>
                                <p className="small text-bone-muted mb-0 mt-1">
                                    Visitor: {booking.visitorUsername}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="icon-btn"
                                onClick={onClose}
                                aria-label="Close"
                                disabled={isPending}
                            >
                                <i className="bi bi-x-lg"/>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="alert alert-warning py-2 small mb-4">
                                Cancellation cutoff and slot-overlap checks are bypassed for admin updates.
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-sm-6">
                                    <label htmlFor="startTime" className="form-label">Start time</label>
                                    <input
                                        id="startTime"
                                        type="datetime-local"
                                        className="form-control"
                                        value={startTime}
                                        onChange={e => setStartTime(e.target.value)}
                                        disabled={isPending}
                                        required
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="endTime" className="form-label">End time</label>
                                    <input
                                        id="endTime"
                                        type="datetime-local"
                                        className="form-control"
                                        value={endTime}
                                        onChange={e => setEndTime(e.target.value)}
                                        disabled={isPending}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="status" className="form-label">Status</label>
                                <select
                                    id="status"
                                    className="form-select"
                                    value={status}
                                    onChange={e => setStatus(e.target.value as BookingStatus)}
                                    disabled={isPending}
                                >
                                    <option value={BookingStatus.Confirmed}>Confirmed</option>
                                    <option value={BookingStatus.Cancelled}>Cancelled</option>
                                </select>
                            </div>

                            {localError && (
                                <div className="alert alert-warning mt-3 mb-0">
                                    {localError}
                                </div>
                            )}
                            {isError && (
                                <div className="alert alert-danger mt-3 mb-0">
                                    {error?.message ?? 'Could not update booking.'}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-light fw-medium"
                                onClick={onClose}
                                disabled={isPending}
                            >
                                Cancel
                            </button>
                            {!isPending ? (
                                <button type="submit" className="btn btn-primary fw-medium">
                                    Save changes
                                </button>
                            ) : (
                                <button type="button" className="btn btn-primary" disabled>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                                    Saving…
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
