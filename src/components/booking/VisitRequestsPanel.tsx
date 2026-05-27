import React from 'react'
import {usePropertyBookings} from "../../hooks/useBookings.ts";
import {BookingRow} from "./BookingRow.tsx";

interface Props {
    propertyId: number
}

export const VisitRequestsPanel: React.FC<Props> = ({propertyId}) => {
    const {data, isLoading, isError, error} = usePropertyBookings(propertyId, {page: 1, pageSize: 20})

    return (
        <div className="bg-body-tertiary rounded-4 shadow-sm p-4 mt-4">
            <h5 className="fw-semibold mb-3">Visit requests</h5>

            {isLoading && (
                <div className="text-center py-4">
                    <div className="spinner-border spinner-border-sm text-dark" role="status"/>
                </div>
            )}

            {isError && (
                <div className="alert alert-danger py-2 small mb-0">
                    {error?.message ?? 'Could not load visit requests.'}
                </div>
            )}

            {data && data.items.length === 0 && (
                <p className="text-body-secondary small mb-0">No visit requests yet.</p>
            )}

            {data && data.items.map(booking => (
                <BookingRow key={booking.id} booking={booking} hideCancel showVisitor/>
            ))}
        </div>
    )
}
