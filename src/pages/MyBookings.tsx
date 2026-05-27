import {useMemo, useState} from 'react'
import {useMyBookings} from "../hooks/useBookings.ts";
import {splitUpcomingPast} from "../utils/bookingTime.ts";
import {BookingRow} from "../components/booking/BookingRow.tsx";

type Tab = 'upcoming' | 'past'

const MyBookings = () => {
    const [tab, setTab] = useState<Tab>('upcoming')
    const [page, setPage] = useState(1)
    const pageSize = 20

    const {data, isLoading, isError, error} = useMyBookings({page, pageSize})

    const {upcoming, past} = useMemo(
        () => splitUpcomingPast(data?.items ?? []),
        [data?.items],
    )

    const visible = tab === 'upcoming' ? upcoming : past

    return (
        <div className="align-self-start w-100 py-5">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                    <h3 className="fw-semibold mb-0">My bookings</h3>
                    <div className="btn-group" role="tablist">
                        <button
                            type="button"
                            className={`btn rounded-pill px-3 me-2 shadow-sm ${tab === 'upcoming' ? 'btn-dark' : 'btn-light'}`}
                            onClick={() => setTab('upcoming')}
                        >
                            Upcoming
                        </button>
                        <button
                            type="button"
                            className={`btn rounded-pill px-3 shadow-sm ${tab === 'past' ? 'btn-dark' : 'btn-light'}`}
                            onClick={() => setTab('past')}
                        >
                            Past
                        </button>
                    </div>
                </div>

                {isLoading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-dark border-2" role="status"/>
                    </div>
                )}

                {isError && (
                    <div className="alert alert-danger py-2 small">
                        {error?.message ?? 'Could not load your bookings.'}
                    </div>
                )}

                {!isLoading && !isError && visible.length === 0 && (
                    <p className="text-body-secondary">
                        {tab === 'upcoming' ? 'No upcoming bookings.' : 'No past bookings.'}
                    </p>
                )}

                {visible.map(booking => (
                    <BookingRow key={booking.id} booking={booking} hideCancel={tab === 'past'}/>
                ))}

                {data && data.totalPages > 1 && (
                    <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                        <button
                            type="button"
                            className="btn btn-light rounded-pill btn-sm shadow-sm"
                            disabled={!data.hasPreviousPage}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        >
                            Previous
                        </button>
                        <span className="small text-body-secondary">
                            Page {data.page} of {data.totalPages}
                        </span>
                        <button
                            type="button"
                            className="btn btn-light rounded-pill btn-sm shadow-sm"
                            disabled={!data.hasNextPage}
                            onClick={() => setPage(p => p + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyBookings
