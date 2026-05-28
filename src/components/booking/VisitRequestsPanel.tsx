import React from 'react'
import {usePropertyBookings} from "../../hooks/useBookings.ts";
import {BookingRow} from "./BookingRow.tsx";

interface Props {
    propertyId: number
}

export const VisitRequestsPanel: React.FC<Props> = ({propertyId}) => {
    const {data, isLoading, isError, error} = usePropertyBookings(propertyId, {page: 1, pageSize: 20})

    return (
        <div className="surface p-4">
            <div className="eyebrow mb-3">Visit requests</div>

            {isLoading && (
                <div className="text-center py-4">
                    <div className="spinner-border spinner-border-sm text-bone-muted" role="status"/>
                </div>
            )}

            {isError && (
                <div className="alert alert-danger mb-0">
                    {error?.message ?? 'Could not load visit requests.'}
                </div>
            )}

            {data && data.items.length === 0 && (
                <p className="text-bone-muted small mb-0">No visit requests yet.</p>
            )}

            {data && data.items.length > 0 && (
                <div className="d-flex flex-column">
                    {data.items.map((booking, idx) => (
                        <BookingRow
                            key={booking.id}
                            booking={booking}
                            hideCancel
                            showVisitor
                            isLast={idx === data.items.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
