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
        <div className="w-100">
            <section className="container py-7">
                <div className="mb-5">
                    <div className="eyebrow eyebrow-rule mb-3">Your account</div>
                    <h1 className="fw-semibold tracking-tight mb-0" style={{fontSize: "2.25rem", lineHeight: 1.1}}>
                        My bookings.
                    </h1>
                </div>

                <div className="hairline-bottom d-flex mb-4">
                    <button
                        type="button"
                        className={`tab-link${tab === 'upcoming' ? ' active' : ''}`}
                        onClick={() => setTab('upcoming')}
                    >
                        Upcoming {upcoming.length > 0 && <span className="text-bone-faint ms-2">{upcoming.length}</span>}
                    </button>
                    <button
                        type="button"
                        className={`tab-link${tab === 'past' ? ' active' : ''}`}
                        onClick={() => setTab('past')}
                    >
                        Past {past.length > 0 && <span className="text-bone-faint ms-2">{past.length}</span>}
                    </button>
                </div>

                {isLoading && (
                    <div className="text-center py-7">
                        <div className="spinner-border text-bone-muted" role="status"/>
                    </div>
                )}

                {isError && (
                    <div className="alert alert-danger">
                        {error?.message ?? 'Could not load your bookings.'}
                    </div>
                )}

                {!isLoading && !isError && visible.length === 0 && (
                    <p className="text-bone-muted py-5">
                        {tab === 'upcoming' ? 'No upcoming bookings.' : 'No past bookings.'}
                    </p>
                )}

                {visible.length > 0 && (
                    <div className="d-flex flex-column">
                        {visible.map((booking, idx) => (
                            <BookingRow
                                key={booking.id}
                                booking={booking}
                                hideCancel={tab === 'past'}
                                isLast={idx === visible.length - 1}
                            />
                        ))}
                    </div>
                )}

                {data && data.totalPages > 1 && (
                    <nav className="hairline-top mt-6 pt-4 d-flex justify-content-between align-items-center" aria-label="Bookings pagination">
                        <button
                            type="button"
                            className="btn btn-link link-muted small fw-medium d-inline-flex align-items-center gap-2"
                            disabled={!data.hasPreviousPage}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            style={{opacity: data.hasPreviousPage ? 1 : 0.3}}
                        >
                            <i className="bi bi-arrow-left"/>
                            Previous
                        </button>
                        <span className="small text-bone-muted">
                            Page {data.page} of {data.totalPages}
                        </span>
                        <button
                            type="button"
                            className="btn btn-link link-muted small fw-medium d-inline-flex align-items-center gap-2"
                            disabled={!data.hasNextPage}
                            onClick={() => setPage(p => p + 1)}
                            style={{opacity: data.hasNextPage ? 1 : 0.3}}
                        >
                            Next
                            <i className="bi bi-arrow-right"/>
                        </button>
                    </nav>
                )}
            </section>
        </div>
    )
}

export default MyBookings
