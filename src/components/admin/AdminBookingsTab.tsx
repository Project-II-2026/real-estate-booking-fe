import React, {useState} from 'react'
import type {Booking, BookingSearchParams} from '../../models/booking.types.ts'
import {BookingStatus} from '../../models/booking.types.ts'
import {useAdminBookings, useAdminDeleteBooking} from '../../hooks/useBookings.ts'
import {formatBookingDateTime} from '../../utils/bookingTime.ts'
import {AdminPagination} from './AdminPagination.tsx'
import {AdminBookingEditModal} from './AdminBookingEditModal.tsx'
import {ConfirmDeleteModal} from './ConfirmDeleteModal.tsx'

const PAGE_SIZE = 12

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

export const AdminBookingsTab = () => {
    const [page, setPage] = useState(1)
    const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all')
    const [editing, setEditing] = useState<Booking | null>(null)
    const [deleting, setDeleting] = useState<Booking | null>(null)

    const params: BookingSearchParams = {
        page,
        pageSize: PAGE_SIZE,
        ...(statusFilter !== 'all' ? {status: statusFilter} : {}),
    }
    const {data, isLoading, isError, error} = useAdminBookings(params)

    const {
        mutate: deleteBooking,
        isPending: isDeleting,
        isError: isDeleteError,
        error: deleteError,
        reset: resetDelete,
    } = useAdminDeleteBooking()

    const handleConfirmDelete = () => {
        if (!deleting) return
        deleteBooking(deleting.id, {onSuccess: () => setDeleting(null)})
    }

    const handleCloseDelete = () => {
        if (!isDeleting) {
            setDeleting(null)
            resetDelete()
        }
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(event.target.value as BookingStatus | 'all')
        setPage(1)
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
                <div>
                    <div className="eyebrow mb-2">All bookings</div>
                    <h2 className="fw-medium tracking-tight mb-0" style={{fontSize: "1.5rem"}}>
                        Visits
                    </h2>
                </div>
                <div className="d-flex align-items-center gap-3">
                    {data && (
                        <span className="text-bone-muted small">
                            {data.totalCount} total
                        </span>
                    )}
                    <select
                        className="form-select form-select-sm"
                        value={statusFilter}
                        onChange={handleStatusChange}
                        style={{minWidth: 160}}
                    >
                        <option value="all">All statuses</option>
                        <option value={BookingStatus.Confirmed}>Confirmed</option>
                        <option value={BookingStatus.Cancelled}>Cancelled</option>
                    </select>
                </div>
            </div>

            {isLoading && (
                <div className="text-center py-7">
                    <div className="spinner-border text-bone-muted" role="status">
                        <span className="visually-hidden">Loading…</span>
                    </div>
                </div>
            )}

            {isError && (
                <div className="alert alert-danger">
                    {error?.message ?? 'Failed to load bookings.'}
                </div>
            )}

            {!isLoading && !isError && data && (
                <>
                    <div className="surface">
                        <div className="d-none d-md-grid px-4 py-3 hairline-bottom"
                             style={{gridTemplateColumns: "2fr 1.5fr 2fr 1fr 1fr"}}>
                            <div className="eyebrow">Property</div>
                            <div className="eyebrow">Visitor</div>
                            <div className="eyebrow">Start time</div>
                            <div className="eyebrow">Status</div>
                            <div className="eyebrow text-end">Actions</div>
                        </div>

                        {data.items.length === 0 ? (
                            <div className="text-center text-bone-muted py-6">
                                No bookings found.
                            </div>
                        ) : (
                            data.items.map((b, idx) => (
                                <div
                                    key={b.id}
                                    className={`px-4 py-3 d-md-grid d-flex flex-column gap-2${idx < data.items.length - 1 ? ' hairline-bottom' : ''}`}
                                    style={{gridTemplateColumns: "2fr 1.5fr 2fr 1fr 1fr"}}
                                >
                                    <div className="text-truncate fw-medium" style={{color: "var(--bone)"}}>
                                        {b.propertyTitle}
                                    </div>
                                    <div className="text-bone-muted small text-truncate">
                                        {b.visitorUsername}
                                    </div>
                                    <div className="text-bone-muted small">
                                        {formatBookingDateTime(b.startTime)}
                                    </div>
                                    <div className="d-inline-flex align-items-center gap-2">
                                        <span className={`status-dot ${statusDotClass(b.status)}`} aria-hidden="true"/>
                                        <span className="small text-bone-muted">{b.status}</span>
                                    </div>
                                    <div className="d-flex gap-2 justify-content-md-end">
                                        <button
                                            type="button"
                                            className="btn btn-light btn-sm fw-medium"
                                            onClick={() => setEditing(b)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm fw-medium"
                                            style={{
                                                background: "transparent",
                                                color: "var(--danger)",
                                                border: "1px solid var(--hairline-strong)",
                                            }}
                                            onClick={() => setDeleting(b)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <AdminPagination
                        page={data.page}
                        totalPages={data.totalPages}
                        hasNextPage={data.hasNextPage}
                        hasPreviousPage={data.hasPreviousPage}
                        onChange={setPage}
                    />
                </>
            )}

            {editing && (
                <AdminBookingEditModal
                    booking={editing}
                    onClose={() => setEditing(null)}
                />
            )}

            {deleting && (
                <ConfirmDeleteModal
                    title="Delete booking?"
                    description={
                        <>
                            <p className="mb-2">
                                You're about to permanently delete the booking for <strong>{deleting.propertyTitle}</strong> by <strong>{deleting.visitorUsername}</strong>.
                            </p>
                            <p className="mb-0">
                                Unlike a user-side cancellation, this is a hard delete — the row is removed entirely. This cannot be undone.
                            </p>
                        </>
                    }
                    confirmLabel="Delete booking"
                    isPending={isDeleting}
                    isError={isDeleteError}
                    error={deleteError}
                    onConfirm={handleConfirmDelete}
                    onClose={handleCloseDelete}
                />
            )}
        </div>
    )
}
